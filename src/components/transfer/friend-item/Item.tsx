import { FC, useState } from "react";
import Image from "next/image";
import { Modal } from "@/ui/modal-delete-friend/Modal";
import { TransferService } from "@/services/transfer.service";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setBalance } from "@/store/slices/transaction";
import { setExpense } from "@/store/slices/statistics";
import { addNewBlock } from "@/store/slices/informations";
import { InformationService } from "@/services/information.service";
import { StatisticService } from "@/services/statistic.service";
import s from './Item.module.scss';
import { IStatisticBlock } from "@/interfaces/data";

interface IProps {
   id: string,
   avatar: string,
   name: string,
   cardNumber: string,
   cardNumberFriend: string,
   idAuthUser: string
   expense: number
   infoBlocks: IStatisticBlock[]
}

export const Item: FC<IProps> = ({ avatar, name, id, cardNumber, cardNumberFriend, idAuthUser, expense, infoBlocks }) => {
   const balance = useAppSelector(state => state.transaction.balance)
   const dispatch = useAppDispatch()
   const [active, setActive] = useState(false)
   const removeFriend = () => setActive(true)
   const regex = /^[0-9]+$/

   const transferFriend = () => {
      const amount = prompt(`Enter amount for ${name}:`)
      if (amount && regex.test(amount) && parseInt(amount) <= balance && amount !== cardNumberFriend) {
         TransferService.handleNumber(cardNumberFriend, parseInt(amount), idAuthUser, balance, infoBlocks, expense)
            .then(res => res && dispatch(addNewBlock(res)))
            .finally(() => {
               dispatch(setBalance(balance - parseInt(amount)))
               dispatch(setExpense(parseInt(amount)))
            })
      }
   }

   return <>
      <div className={s.wrapper} title="You can transfer money your friends">
         <div onClick={transferFriend}>
            <Image priority src={avatar} width={15} height={15} alt="Avatar" />
            <span>{name}</span>
         </div>
         <button onClick={removeFriend}>
            <Image src={'/Xmark.svg'} width={15} height={15} alt="Button" />
         </button>
      </div>
      {active && <Modal id={id} name={name} setActive={setActive} />}
   </>
} 