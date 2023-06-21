import { FC } from "react";
import { withTransaction } from "@/hocs/withTransaction";
import { IPropsWitHoc } from "@/components/transaction";
import s from '../../components/transaction/Transaction.module.scss'

const Expense: FC<IPropsWitHoc> = ({ transaction }) => {
    return <button className={s.expense} onClick={transaction}>Withdrawal</button>
}

export default withTransaction(Expense)