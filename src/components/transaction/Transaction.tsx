import { FC, useState } from "react"
import { TransactionService } from "@/services/transaction.service"
import { useAppDispatch, useAppSelector } from "@/store/hook"
import { setBalance } from "@/store/slices/transaction"
import { setExpense, setIncome } from "@/store/slices/statistics"
import { addNewBlock } from "@/store/slices/informations"
import { InformationService } from "@/services/information.service"
import { StatisticService } from "@/services/statistic.service"
import s from './Transaction.module.scss'

interface IProps {
    id: string
    income: number
    expense: number
}

export const Transaction: FC<IProps> = ({ id, income, expense }) => {
    const [amount, setAmount] = useState<string>('')
    const balance = useAppSelector(state => state.transaction.balance)
    const dispatch = useAppDispatch()

    const topUp = () => {
        if (amount) {
            TransactionService.topUp(parseInt(amount), id, balance)
                .finally(() => {
                    dispatch(setBalance(balance + parseInt(amount)))
                    StatisticService.setStatistic(id, parseInt(amount), income).finally(() => {
                        dispatch(setIncome(parseInt(amount)))
                    })
                    InformationService.addNewBlock(parseInt(amount), id, 'INCOME').then(res => {
                        dispatch(addNewBlock(res))
                    })
                })
            setAmount('')
        }
    }

    const withdrawal = () => {
        if (balance >= parseInt(amount) && amount) {
            TransactionService.withdrawal(parseInt(amount), id, balance)
                .finally(() => {
                    dispatch(setBalance(balance - parseInt(amount)))
                    StatisticService.setStatistic(id, parseInt(amount), undefined, expense).finally(() => {
                        dispatch(setExpense(parseInt(amount)))
                    })
                    InformationService.addNewBlock(parseInt(amount), id, 'EXPENSE').then(res => {
                        dispatch(addNewBlock(res))
                    })
                })
            setAmount('')
        }
    }

    return <div className={s.wrapper}>
        <label>
            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={e => setAmount(e.target.value)} />
        </label>
        <div>
            <button onClick={topUp}>Top-Up</button>
            <button onClick={withdrawal}>Withdrawal</button>
        </div>
    </div>
}