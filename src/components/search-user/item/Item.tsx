import { FC, useState } from "react";
import Image from "next/image";
import { UsersService } from "@/services/user.service";
import { useAppDispatch } from "@/store/hook";
import { addFriend } from "@/store/slices/transfer";
import { useMutation } from "react-query";
import type { IFriend } from "@/interfaces/data";
import s from './Item.module.scss';

interface IProps {
    id: string
    name: string
    avatar: string
    setValue: (value: string) => void
    userId: string
    userFriends: IFriend[]
}

export const Item: FC<IProps> = ({ name, avatar, id, setValue, userId, userFriends }) => {
    const [active, setActive] = useState(false)
    setTimeout(() => setActive(true), 300)

    const dispatch = useAppDispatch()

    const { mutateAsync } = useMutation(
        'add new friend',
        () => UsersService.addNewFriend(id, userId, userFriends),
        {
            onSuccess: (data: IFriend) => {
                dispatch(addFriend(data))
                setValue('')
            },
            onError: () => {
                alert('error')
            }
        }
    )

    const handleAddFriend = async () => {
        const friend = userFriends?.find(e => e.id === id)
        if (!friend) {
            await mutateAsync()
        }
    }

    return <button
        onClick={handleAddFriend}
        className={`${s.item} ${active && s.active}`}>
        <Image priority src={avatar} width={15} height={15} alt="Avatar" />
        <span>{name}</span>
    </button>
}
