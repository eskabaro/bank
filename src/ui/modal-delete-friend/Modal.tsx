import { FC } from "react";
import { useAppDispatch } from "@/store/hook";
import { deleteFriend } from "@/store/slices/transfer";
import type { IFriend } from "@/interfaces/data";
import s from './Modal.module.scss';
import { UsersService } from "@/services/user.service";

interface IProps {
   myId: string,
   friendId: string,
   name: string,
   setActive: (meaning: boolean) => void
   myFriends: IFriend[]
}

export const Modal: FC<IProps> = ({ myId, name, setActive, myFriends, friendId }) => {
   const dispatch = useAppDispatch()
   const newfriends = myFriends.filter(e => e.id !== friendId)

   const removeFriend = () => {
      UsersService.deleteFriend(myId, newfriends)
         .then(res => res && dispatch(deleteFriend(friendId)))
         .finally(() => setActive(false))
   }

   return <div className={s.backg}>
      <div className={s.backg__modal}>
         <p>You really want delete {name} from list friends?</p>
         <button className={s.btn_1} onClick={removeFriend}>Yas</button>
         <button className={s.btn_2} onClick={() => setActive(false)}>Cancel</button>
      </div>
   </div>
}