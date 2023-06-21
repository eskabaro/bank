import { FC } from "react";
import { withTransaction } from "@/hocs/withTransaction";
import { IPropsWitHoc } from "@/components/transaction";
import s from '../../components/transaction/Transaction.module.scss'

const Income: FC<IPropsWitHoc> = ({ transaction }) => {
    return <button className={s.income} onClick={transaction}>Top-Up</button>
}

export default withTransaction(Income)