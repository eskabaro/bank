import { FC, useState } from "react";
import Image from "next/image";
import { useQuery } from "react-query";
import { Item } from "./item/Item";
import { UsersService } from "@/services/user.service";
import { IFriend, ISortUser, User } from "@/interfaces/data";
import s from './Search.module.scss';

interface IProps {
    name: string
    userId: string
    userFriends: IFriend[]
}

export const Search: FC<IProps> = ({ name, userId, userFriends }) => {
    const [value, setValue] = useState('')
    const [users, setUsers] = useState<ISortUser[]>()

    const { isError } = useQuery(
        'get user by name',
        () => UsersService.getUsersByName(),
        {
            onSuccess: (data: User[]) => {
                setUsers(data.filter(e => e.login !== name))
            },
            onError: () => {
                alert('error')
            }
        }
    )

    const filteredUsers = () => {
        if (value && users) {
            const sortUsers = users.filter(e => e.login.includes(value))
            return sortUsers
        }
    }

    if (isError) return <h1>error</h1>

    return <div className={s.wrapper}>
        <label>
            <input
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Search users"
                type="text"
            />
            <Image src={'/Search.svg'} width={15} height={15} alt="Search" />
        </label>
        <ul className={s.wrapper__inputbox}>
            {filteredUsers()?.map(e =>
                <Item
                    id={e.id}
                    key={e.id}
                    name={e.login}
                    avatar={e.avatar}
                    setValue={setValue}
                    userId={userId}
                    userFriends={userFriends}
                />
            )}
        </ul>
    </div>
}