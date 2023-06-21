import { FC } from "react";
import s from './Loader.module.scss'

interface IProps {
    width: string
    hieght: string
}

export const Loader: FC<IProps> = ({ width, hieght }) => {
    return <div
        className={s.loader}
        style={{
            width: width,
            height: hieght
        }}></div>
}