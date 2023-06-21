import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setFriends } from "@/store/slices/transfer";
import { IFriend } from "@/interfaces/data";
import { Item } from "./friend-item";
import { useTransfer } from "@/hooks/useTransfer";
import { useAlert } from "@/hooks/useAlert";
import s from './Transfer.module.scss'

export interface IFormInput {
    number: string
}

export interface ITransferProps {
    cardNumber: string
    amount: string,
    id: string
    reset?: () => void
}

interface IProps {
    id: string,
    cardNumber: string
    myFriends: IFriend[]
}

export const Transfer: FC<IProps> = ({ id, cardNumber, myFriends }) => {
    const balance = useAppSelector(state => state.transaction.balance)

    const dispatch = useAppDispatch()
    const regex = /^[0-9]+$/

    const {
        register,
        handleSubmit,
        reset
    } = useForm<IFormInput>()

    const [handleTransfer] = useTransfer()
    const [notify] = useAlert()

    const transfer: SubmitHandler<IFormInput> = (data): void => {
        const amount = prompt(`Enter amount for transfer:`)
        if (amount) {
            if (regex.test(amount) && parseInt(amount) <= balance && amount !== cardNumber) {
                const props: ITransferProps = {
                    cardNumber: data.number,
                    amount,
                    id,
                    reset
                }
                handleTransfer(props)
            } else if (!regex.test(amount)) {
                notify('You entered an invalid value', 'error', 3000)
            } else if (parseInt(amount) >= balance) {
                notify('You don\'t have enough money', 'error', 3000)
            }
        }
    }

    useEffect(() => {
        dispatch(setFriends(myFriends))
    }, [])

    const friends = useAppSelector(state => state.transfer.friends)

    return <form className={s.wrapper} onSubmit={handleSubmit(transfer)}>
        <h3>Transfer money</h3>
        <label>
            <input {...register('number', {
                required: true,
                minLength: 16,
                maxLength: 16
            })}
                type="number"
                placeholder="Enter card number" />
            <button type="submit">Send</button>
        </label>
        <div style={{ marginTop: '10px' }}>
            {friends
                .map((e: IFriend) =>
                    <Item key={e.id}
                        id={e.id}
                        idAuthUser={id}
                        name={e.name}
                        avatar={e.avatar}
                        cardNumberFriend={e.cardNumber}
                        myFriends={myFriends} />
                )}
        </div>
    </form>
}