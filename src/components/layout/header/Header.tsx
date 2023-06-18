import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Logo } from "@/ui/logo";
import { Login } from "@/ui/btn-login";
import { Logout } from "@/ui/btn-logout";
import { Search } from "@/components/search-user";
import type { IFriend } from "@/interfaces/data";
import s from './Header.module.scss'

interface IProps {
    userName?: string
    userAvatar?: string
    userId?: string
    userFriends?: IFriend[]
}

export const Header: FC<IProps> = ({ userName, userAvatar, userId, userFriends }) => {
    const [authorized, setAuthorized] = useState<boolean>()

    useEffect(() => {
        const userAuthorized: string = document.cookie

        if (userAuthorized) {
            setAuthorized(true)
        } else setAuthorized(false)
    }, [])

    return <header className={s.head}>
        <Logo />
        <nav>
            {userName && (
                <>
                    <Search name={userName} userId={userId} userFriends={userFriends}/>
                    <span>
                        <Image src={userAvatar ? userAvatar : ''} alt="Avatar" width={18} height={18} />
                        {userName}
                    </span>
                </>
            )}
            {authorized ? <Logout /> : <Login />}
        </nav>
    </header>
}

export default Header
