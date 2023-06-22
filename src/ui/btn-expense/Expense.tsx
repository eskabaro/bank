import { FC } from "react";
import { Loader } from "../loader";
import { withTransaction } from "@/hocs/withTransaction";
import { IPropsWitHoc } from "@/components/transaction";
import s from '../../components/transaction/Transaction.module.scss';

const Expense: FC<IPropsWitHoc> = ({ transaction, isLoadingExpense }) => {
    return <button className={s.expense} onClick={transaction}>
        {isLoadingExpense ? (
            <Loader hieght="15px" width="15px" />
        ) : (
            'Withdrawal'
        )}
    </button>
}

export default withTransaction(Expense)