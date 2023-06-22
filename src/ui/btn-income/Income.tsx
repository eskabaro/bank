import { FC } from "react";
import { Loader } from "../loader";
import { withTransaction } from "@/hocs/withTransaction";
import { IPropsWitHoc } from "@/components/transaction";
import s from '../../components/transaction/Transaction.module.scss';

const Income: FC<IPropsWitHoc> = ({ transaction, isLoadingIncome }) => {
    return <button className={s.income} onClick={transaction}>
        {isLoadingIncome ? (
            <Loader hieght="15px" width="15px" />
        ) : (
            'Top-Up'
        )}
    </button>
}

export default withTransaction(Income)