import { FC, useEffect } from "react";
import { Mukta } from "next/font/google";
import { useLogout } from "@/hooks/useLogout";
import Link from "next/link";
import s from './NotFound.module.scss';

const mukta = Mukta({
    weight: '600',
    fallback: ['false'],
    subsets: ['latin']
});

export const NotFound: FC = () => {
    const { logout } = useLogout();

    useEffect(() => {
        logout()
    }, []);

    return <div className={s.wrapper}>
        <div className={mukta.className}>
            <h2>404</h2>
            <h1>This page is not be found</h1>
        </div>
        <Link href={'/'} title="asdasd" className={mukta.className}>
            Go back to main page
        </Link>
    </div>
};