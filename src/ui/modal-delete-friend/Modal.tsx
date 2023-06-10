import { FC } from "react";
import s from './Modal.module.scss'
import { useAppDispatch } from "@/store/hook";
import { deleteFriend } from "@/store/slices/transfer";

interface IProps {
   id: string,
   name: string,
   setActive: (meaning: boolean) => void
}

export const Modal: FC<IProps> = ({ id, name, setActive }) => {  
   const dispatch = useAppDispatch()
   const removeFriend = () => dispatch(deleteFriend(id))

   return <div className={s.backg}>
      <div className={s.backg__modal}>
         <p>You really want delete {name} from list friends?</p>
         <button className={s.btn_1} onClick={removeFriend}>Yas</button>
         <button className={s.btn_2} onClick={() => setActive(false)}>Cancel</button>
      </div>
   </div>
}