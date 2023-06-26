'use client'

import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { Logo } from "@/ui/logo";
import { Login } from "@/ui/btn-login";
import { Logout } from "@/ui/btn-logout";
import { Search } from "@/components/search-user";

import type { User } from "@/interfaces/data";

import s from './Header.module.scss';

export const Header: FC = () => {
    const [authorized, setAuthorized] = useState<User>();
    const pathname = usePathname();

    useEffect(() => {
        const cookie = document.cookie.split('=')[1]
        const user = cookie ? JSON.parse(cookie) : null

        if (cookie) {
            setAuthorized(user)
        } else setAuthorized(user)
    }, [pathname]);

    return <header className={s.head}>
        <Logo />
        <nav>
            {authorized?.id && authorized.login && authorized.friends && (
                <>
                    <Search name={authorized.login} userId={authorized.id} userFriends={authorized.friends} />
                    <span>
                        <Image src={authorized.avatar ? authorized.avatar : ''} alt="Avatar" width={18} height={18} />
                        {authorized.login}
                    </span>
                </>
            )}
            {authorized ? <Logout /> : pathname === '/login' ? null : <Login />}
        </nav>
    </header>
};

export default Header;
