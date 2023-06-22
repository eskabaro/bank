import { useMutation } from "react-query"
import { TransferService } from "@/services/transfer.service"
import { ITransferProps } from "@/components/transfer"
import { useAppDispatch, useAppSelector } from "@/store/hook"
import { setBalance } from "@/store/slices/transaction"
import { setExpense } from "@/store/slices/statistics"
import { addNewBlock } from "@/store/slices/informations"
import { useAlert } from "./useAlert"

export const useTransfer = (): [(props: ITransferProps) => void] => {
    const dispatch = useAppDispatch()
    const balance = useAppSelector(state => state.transaction.balance)
    const infBlocks = useAppSelector(state => state.informations.blocks)
    const expense = useAppSelector(state => state.statistics.expense)

    const [notify] = useAlert()

    const transfer = useMutation('transfer',
        (props: ITransferProps) => TransferService.handleNumber(props.cardNumber, parseInt(props.amount), props.id, balance, infBlocks, expense),
        {
            onSuccess(data, variables) {
                data && dispatch(addNewBlock(data))
                dispatch(setBalance(balance - parseInt(variables.amount)))
                dispatch(setExpense(parseInt(variables.amount)))
                notify('Transaction successful', 'success', 3000)
                variables.reset && variables.reset()
            },
            onError: () => {
                notify('Transaction error', 'error', 3000)
            }
        }
    )

    const handleTransfer = async (props: ITransferProps) => {
        await transfer.mutateAsync(props)
    }

    return [handleTransfer]
}