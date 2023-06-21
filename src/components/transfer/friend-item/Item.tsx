import Image from "next/image";
import { FC, useState } from "react";
import { Modal } from "@/ui/modal-delete-friend/Modal";
import { useAppSelector } from "@/store/hook";
import { useTransfer } from "@/hooks/useTransfer";
import { useAlert } from "@/hooks/useAlert";
import type { IFriend } from "@/interfaces/data";
import s from './Item.module.scss';

interface IProps {
   id: string,
   avatar: string,
   name: string,
   cardNumberFriend: string,
   idAuthUser: string
   myFriends: IFriend[]
}

export const Item: FC<IProps> = ({ avatar, name, id, cardNumberFriend, idAuthUser, myFriends }) => {
   const [active, setActive] = useState(false)
   const balance = useAppSelector(state => state.transaction.balance)

   const removeFriend = () => setActive(true)
   const regex = /^[0-9]+$/

   const [handleTransfer] = useTransfer()
   const [notify] = useAlert()

   const transferFriend = () => {
      const amount = prompt(`Enter amount for ${name}:`)
      if (amount) {
         if (regex.test(amount) && parseInt(amount) <= balance) {
            const props = {
               cardNumber: cardNumberFriend,
               amount,
               id: idAuthUser,
            }
            handleTransfer(props)
         } else if (!regex.test(amount)) {
            notify('You entered an invalid value', 'error', 3000)
         } else if (parseInt(amount) >= balance) {
            notify('You don\'t have enough money', 'error', 3000)
         }
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
      {active && <Modal friendId={id} myId={idAuthUser} name={name} setActive={setActive} myFriends={myFriends} />}
   </>
} 