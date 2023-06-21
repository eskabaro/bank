import { ComponentType } from "react"
import { IPropsWitHoc } from "@/components/transaction"
import { TransactionService } from "@/services/transaction.service"
import { useAppDispatch, useAppSelector } from "@/store/hook"
import { useMutation } from "react-query"
import { setBalance } from "@/store/slices/transaction"
import { setExpense, setIncome } from "@/store/slices/statistics"
import { addNewBlock } from "@/store/slices/informations"
import { IStatisticBlock } from "@/interfaces/data"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


export const withTransaction = (Component: ComponentType<IPropsWitHoc>) => {
    return function (props: IPropsWitHoc) {
        const { id, setAmount, amount, infoType } = props
        const balance = useAppSelector(state => state.transaction.balance)
        const blocks = useAppSelector(state => state.informations.blocks)
        const statistic = useAppSelector(state => state.statistics)

        const dispatch = useAppDispatch()

        const notify = (message: string, type: "success" | "error") => {
            toast[type](message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }

        const income = useMutation('income',
            () => TransactionService.topUp(amount, id, balance, infoType, blocks, statistic.income),
            {
                onSuccess: (data: IStatisticBlock) => {
                    setAmount('')
                    dispatch(setBalance(balance + amount))
                    dispatch(setIncome(amount))
                    dispatch(addNewBlock(data))
                    notify('Balance successfully replenished', 'success')
                },
                onError: () => {
                    notify('Failed to top up balance', 'error')
                }
            })

        const expense = useMutation('expense',
            () => TransactionService.withdrawal(amount, id, balance, infoType, blocks, undefined, statistic.expense),
            {
                onSuccess: (data: IStatisticBlock) => {
                    setAmount('')
                    dispatch(setBalance(balance - amount))
                    dispatch(setExpense(amount))
                    dispatch(addNewBlock(data))
                    notify('Funds have been successfully withdrawn', 'success')
                },
                onError: () => {
                    notify('Failed to withdrawal balance', 'error')
                }
            })

        const transaction = async (): Promise<void> => {
            if (infoType === 'INCOME') {
                if (amount) await income.mutateAsync()
            } else {
                if (amount && balance >= amount) await expense.mutateAsync()
            }
        }

        return <Component
            {...props}
            transaction={transaction}
        />
    }
}