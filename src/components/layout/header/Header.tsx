import { FC, useEffect, useState } from "react";
import { Logo } from "@/ui/logo";
import { Login } from "@/ui/btn-login";
import { Logout } from "@/ui/btn-logout";
import { Search } from "@/components/search-user";
import Image from "next/image";
import s from './Header.module.scss'

interface IProps {
    userName?: string
    userAvatar?: string
}

export const Header: FC<IProps> = ({ userName, userAvatar }) => {
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
                    <Search name={userName} />
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
