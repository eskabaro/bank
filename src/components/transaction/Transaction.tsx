import { FC, useState } from "react";
import { TransactionService } from "@/services/transaction.service";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setBalance } from "@/store/slices/transaction";
import { setExpense, setIncome } from "@/store/slices/statistics";
import { addNewBlock } from "@/store/slices/informations";
import s from './Transaction.module.scss';

interface IProps {
    id: string;
}

export const Transaction: FC<IProps> = ({ id }) => {
    const [amount, setAmount] = useState<string>('')

    const balance = useAppSelector(state => state.transaction.balance)
    const infBlocks = useAppSelector(state => state.informations.blocks)
    const finance = useAppSelector(state => state.statistics) 

    const dispatch = useAppDispatch()

    const handleTopUp = async () => {
        if (amount) {
            try {
                await TransactionService.topUp(parseInt(amount), id, balance, 'INCOME', infBlocks, finance.income)
                    .then(res => {
                        if (res) {
                            dispatch(setBalance(balance + parseInt(amount)))
                            dispatch(setIncome(parseInt(amount)))
                            dispatch(addNewBlock(res))
                        }
                    })
            } catch (error) {
                alert(error)
            } finally {
                setAmount('')
            }
        }
    }

    const handleWithdrawal = async () => {
        if (balance >= parseInt(amount) && amount) {
            try {
                await TransactionService.withdrawal(parseInt(amount), id, balance, 'EXPENSE', infBlocks, undefined, finance.expense)
                    .then(res => {
                        if (res) {
                            dispatch(setBalance(balance - parseInt(amount)))
                            dispatch(setExpense(parseInt(amount)))
                            dispatch(addNewBlock(res))
                        }
                    })
            } catch (error) {
                alert(error)
            } finally {
                setAmount('')
            }
        }
    }

    return (
        <div className={s.wrapper}>
            <label>
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </label>
            <div>
                <button onClick={handleTopUp}>Top-Up</button>
                <button onClick={handleWithdrawal}>Withdrawal</button>
            </div>
        </div>
    );
};