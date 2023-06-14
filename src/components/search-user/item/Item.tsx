import { FC, useState } from "react";
import { UsersService } from "@/services/user.service";
import { useAppDispatch } from "@/store/hook";
import { addFriend } from "@/store/slices/transfer";
import Image from "next/image";
import s from './Item.module.scss'  

interface IProps {
    id: string
    name: string
    avatar: string
    setValue: (value: string) => void
}

export const Item: FC<IProps> = ({ name, avatar, id, setValue }) => {
    const [active, setActive] = useState(false)
    setTimeout(() => setActive(true), 300)
    
    

    const dispatch = useAppDispatch()

    const handleAddFriend = () => {
        UsersService.getSingleUser(id)
            .then(res => res && dispatch(addFriend(res)))
            .finally(() => setValue(''))
    }

    return <button
        onClick={handleAddFriend}
        className={`${s.item} ${active && s.active}`}>
        <Image priority src={avatar} width={15} height={15} alt="Avatar" />
        <span>{name}</span>
    </button>
}
