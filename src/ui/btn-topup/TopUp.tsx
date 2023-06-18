import { FC } from "react";
import { TransactionService } from "@/services/transaction.service";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { addNewBlock } from "@/store/slices/informations";
import { setIncome } from "@/store/slices/statistics";
import { setBalance } from "@/store/slices/transaction";
import { useMutation } from "react-query";
import type { IStatisticBlock } from "@/interfaces/data";

interface IProps {
    id: string,
    amount: number
    setAmount: (value: string) => void
}

export const TopUp: FC<IProps> = ({ id, amount, setAmount }) => {
    const balance = useAppSelector(state => state.transaction.balance)
    const blocks = useAppSelector(state => state.informations.blocks)
    const income = useAppSelector(state => state.statistics.income)

    const dispatch = useAppDispatch()

    const { isLoading, mutateAsync } = useMutation(
        'top-up',
        () => TransactionService.topUp(amount, id, balance, 'INCOME', blocks, income),
        {
            onSuccess: (data: IStatisticBlock) => {
                dispatch(setBalance(balance + amount))
                dispatch(setIncome(amount))
                dispatch(addNewBlock(data))
                setAmount('')
            },
            onError: () => {
                alert('Failed to top up balance')
            }
        }
    )

    const handleTopUp = async () => {
        if (amount) await mutateAsync()
    }

    return <button onClick={() => handleTopUp()} disabled={isLoading}>Top-Up</button>
}