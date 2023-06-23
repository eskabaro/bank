import { useMutation, useQueryClient } from "react-query";
import { TransferService } from "@/services/transfer.service";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setBalance } from "@/store/slices/transaction";
import { setExpense } from "@/store/slices/statistics";
import { addNewBlock } from "@/store/slices/informations";
import { useAlert } from "./useAlert";
import { User } from "@/interfaces/data";

interface ITransferProps {
    cardNumber: string
    amount: string,
    id: string
    reset?: () => void
}

export const useTransfer = (): [(props: ITransferProps) => void, boolean] => {
    const dispatch = useAppDispatch();
    const balance = useAppSelector(state => state.transaction.balance);
    const infBlocks = useAppSelector(state => state.informations.blocks);
    const expense = useAppSelector(state => state.statistics.expense);

    const useClient = useQueryClient();

    const [notify] = useAlert();

    const handleUpDateUser = useMutation('UpDateUser',
        (variables: { data: User, id: string, amount: number }) => {
            return TransferService.patchUser(variables.data, variables.id, variables.amount, balance, infBlocks, expense);
        },
        {
            onSuccess: (variables) => {
                dispatch(addNewBlock(variables));
                dispatch(setBalance(balance - variables.amount));
                dispatch(setExpense(variables.amount));
                notify('Transfer success', 'success', 3000);
            },
            onError: () => notify('Transfer error', 'error', 3000)
        }
    );

    const handleTransfer = async (props: ITransferProps) => {
        await useClient.fetchQuery('getUserByCardNumber', () => TransferService.fetchByCardNumber(props.cardNumber)
            .then(data => {
                if (data) {
                    handleUpDateUser.mutateAsync({ data, id: props.id, amount: parseInt(props.amount) });
                } else notify('User not found', 'error', 3000)
            }))
    };

    return [handleTransfer, handleUpDateUser.isLoading];
};