import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TransferService } from "@/services/transfer.service";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setBalance } from "@/store/slices/transaction";
import { setFriends } from "@/store/slices/transfer";
import { IStatisticBlock, User } from "@/interfaces/data";
import { Item } from "./friend-item";
import { setExpense } from "@/store/slices/statistics";
import { addNewBlock } from "@/store/slices/informations";
import s from './Transfer.module.scss'
import { InformationService } from "@/services/information.service";
import { StatisticService } from "@/services/statistic.service";

export interface IFormInput {
    number: string
}

interface IProps {
    id: string,
    cardNumber: string
    income: number
    expense: number
    infoBlocks: IStatisticBlock[]
}

export const Transfer: FC<IProps> = ({ id, cardNumber, expense, income, infoBlocks }) => {
    const balance = useAppSelector(state => state.transaction.balance)
    const dispatch = useAppDispatch()
    const regex = /^[0-9]+$/

    const {
        register,
        handleSubmit,
        reset
    } = useForm<IFormInput>()

    const transfer: SubmitHandler<IFormInput> = (data): void => {
        const amount = prompt(`Enter amount for transfer:`)
        if (amount && regex.test(amount) && parseInt(amount) <= balance && amount !== cardNumber) {
            TransferService.handleNumber(data.number, parseInt(amount), id, balance, infoBlocks, expense)
                .then(res => res && dispatch(addNewBlock(res)))
                .finally(() => {
                    dispatch(setBalance(balance - parseInt(amount)))
                    dispatch(setExpense(parseInt(amount)))
                    reset()
                })
        }
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
                        cardNumberFriend={e.card.number}
                        expense={expense}
                        infoBlocks={infoBlocks} />
                )}
        </div>
    </form>
}