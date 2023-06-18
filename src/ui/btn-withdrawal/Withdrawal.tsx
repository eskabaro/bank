import { FC } from "react";
import { TransactionService } from "@/services/transaction.service";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { addNewBlock } from "@/store/slices/informations";
import { setExpense } from "@/store/slices/statistics";
import { setBalance } from "@/store/slices/transaction";
import { useMutation } from "react-query";
import type { IStatisticBlock } from "@/interfaces/data";

interface IProps {
    id: string
    amount: number
    setAmount: (value: string) => void
}

export const Withdrawal: FC<IProps> = ({ id, amount, setAmount }) => {
    const balance = useAppSelector(state => state.transaction.balance)
    const blocks = useAppSelector(state => state.informations.blocks)
    const expense = useAppSelector(state => state.statistics.expense)

    const dispatch = useAppDispatch()

    const { isLoading, mutateAsync } = useMutation(
        'withdrawal',
        () => TransactionService.withdrawal(amount, id, balance, 'EXPENSE', blocks, undefined, expense),
        {
            onSuccess: (data: IStatisticBlock) => {
                dispatch(setBalance(balance - amount))
                dispatch(setExpense(amount))
                dispatch(addNewBlock(data))
                setAmount('')
            },
            onError: () => {
                alert('Falied to withdrawal balance')
            }
        }
    )

    const handleWithdrawal = async () => {
        if (amount && balance >= amount) {
            await mutateAsync()
        }
    }

    return <button onClick={() => handleWithdrawal()} disabled={isLoading}>Withdrawal</button>
}