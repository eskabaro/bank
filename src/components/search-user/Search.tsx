import { FC, useEffect, useState } from "react";
import { Item } from "./item/Item";
import { UsersService } from "@/services/user.service";
import { ISortUser } from "@/interfaces/data";
import Image from "next/image";
import s from './Search.module.scss';

interface IProps {
    name: string
}

export const Search: FC<IProps> = ({ name }) => {
    const [value, setValue] = useState('')
    const [users, setUsers] = useState<ISortUser[]>()

    useEffect(() => {
        UsersService.getUsersByName()
            .then(res => {
                if (res) {
                    setUsers(res.filter(e => e.login !== name))
                }
            })
    }, [])

    const filteredUsers = () => {
        if (value && users) {
            const sortUsers = users.filter(e => e.login.includes(value))
            return sortUsers
        }
    }

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
                />
            )}
        </ul>
    </div>
}