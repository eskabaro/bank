import { FC } from "react";
import { useLogout } from "@/hooks/useLogout";
import s from './Logout.module.scss';

export const Logout: FC = () => {
    const { logout } = useLogout();

    return <button className={s.btn} onClick={logout}>Logout</button>
};