import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TransferService } from "@/services/transfer.service";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setBalance } from "@/store/slices/transaction";
import { setFriends } from "@/store/slices/transfer";
import { User } from "@/interfaces/data";
import { Item } from "./friend-item";
import { setExpense } from "@/store/slices/statistics";
import { addNewBlock } from "@/store/slices/informations";
import s from './Transfer.module.scss'
import { InformationService } from "@/services/information.service";

export interface IFormInput {
    number: string
}

interface IProps {
    id: string,
    cardNumber: string
}

export const Transfer: FC<IProps> = ({ id, cardNumber }) => {
    const balance = useAppSelector(state => state.transaction.balance)
    const dispatch = useAppDispatch()
    const regex = /^[0-9]+$/

    const {
        register,
        handleSubmit,
        reset
    } = useForm<IFormInput>()

    const transfer: SubmitHandler<IFormInput> = (data): void => {
        TransferService.handleNumber(data.number, cardNumber).then(res => {
            if (res) {
                const amount = prompt(`Enter amount for ${res.userName}:`)
                if (amount && regex.test(amount) && parseInt(amount) <= balance) {
                    TransferService.transfer(res.id, res.balance, parseInt(amount))
                        .finally(() => {
                            TransferService.transForAutUser(id, balance, parseInt(amount))
                            dispatch(setBalance(balance - parseInt(amount)))
                            dispatch(setExpense(parseInt(amount)))
                            InformationService.addNewBlock(parseInt(amount), id, 'EXPENSE', res.id).then(res => {
                                dispatch(addNewBlock(res))
                            })
                        })
                    reset()
                }
            }
        })
    }

    useEffect(() => {
        const friendsStorage = localStorage.getItem('friends')
        if (friendsStorage) dispatch(setFriends(JSON.parse(friendsStorage)))
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
                .map((e: User) =>
                    <Item key={e.id}
                        id={e.id}
                        idAuthUser={id}
                        name={e.login}
                        avatar={e.avatar}
                        cardNumber={cardNumber}
                        cardNumberFriend={e.card.number} />
                )}
        </div>
    </form>
}