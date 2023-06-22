import { FC, useState } from "react";
import Income from "@/ui/btn-income/Income";
import Expense from "@/ui/btn-expense/Expense";
import s from './Transaction.module.scss';

export interface IPropsWitHoc {
    id: string
    amount: number
    infoType: string
    setAmount: (e: string) => void
    transaction?: () => void
    isLoadingExpense?: boolean
    isLoadingIncome?: boolean
}

interface IProps {
    id: string
}

export const Transaction: FC<IProps> = ({ id }) => {
    const [amount, setAmount] = useState<string>('')

    return (
        <div className={s.wrapper}>
            <label>
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </label>
            <div>
                <Income id={id} amount={parseInt(amount)} setAmount={setAmount} infoType='INCOME' />
                <Expense id={id} amount={parseInt(amount)} setAmount={setAmount} infoType='EXPENSE' />
            </div>
        </div>
    )
}