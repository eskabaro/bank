import { FC } from "react";
import { useAppDispatch } from "@/store/hook";
import { deleteFriend } from "@/store/slices/transfer";
import { UsersService } from "@/services/user.service";
import { useMutation } from "react-query";
import { useAlert } from "@/hooks/useAlert";
import type { IFriend } from "@/interfaces/data";
import s from './Modal.module.scss';

interface IProps {
   myId: string,
   friendId: string,
   name: string,
   setActive: (meaning: boolean) => void
   myFriends: IFriend[]
}

export const Modal: FC<IProps> = ({ myId, name, setActive, myFriends, friendId }) => {
   const dispatch = useAppDispatch()
   const [notify] = useAlert()

   const newfriends = myFriends.filter(e => e.id !== friendId)

   const removeFriend = useMutation('remove-friend',
      () => UsersService.deleteFriend(myId, newfriends),
      {
         onSuccess: () => {
            dispatch(deleteFriend(friendId))
            setActive(false)
            notify('User successfully removed from friends list', 'success', 3000)
         },
         onError: () => {
            notify('Unable to remove user from friends list', 'error', 3000)
         }
      }
   )

   return <div className={s.backg}>
      <div className={s.backg__modal}>
         <p>You really want delete {name} from list friends?</p>
         <button className={s.btn_1} onClick={() => removeFriend.mutateAsync()}>Yas</button>
         <button className={s.btn_2} onClick={() => setActive(false)}>Cancel</button>
      </div>
   </div>
}