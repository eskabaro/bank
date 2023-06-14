import { FC, useState } from "react";
import { TransactionService } from "@/services/transaction.service";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setBalance } from "@/store/slices/transaction";
import { setExpense, setIncome } from "@/store/slices/statistics";
import { addNewBlock } from "@/store/slices/informations";
import type { IStatisticBlock } from "@/interfaces/data";
import s from './Transaction.module.scss';

interface IProps {
    id: string;
    income: number;
    expense: number;
    infoBlocks: IStatisticBlock[]
}

export const Transaction: FC<IProps> = ({ id, income, expense, infoBlocks }) => {
    const [amount, setAmount] = useState<string>('');
    const balance = useAppSelector((state) => state.transaction.balance);
    const dispatch = useAppDispatch();

    const handleTopUp = async () => {
        if (amount) {
            try {
                await TransactionService.topUp(parseInt(amount), id, balance, 'INCOME', infoBlocks, income)
                    .then(res => {
                        if (res) {
                            dispatch(setBalance(balance + parseInt(amount)))
                            dispatch(addNewBlock(res))
                            dispatch(setIncome(parseInt(amount)))
                        }
                    })
            } catch (error) {
                alert(error)
            } finally {
                setAmount('')
            }
        }
    };

    const handleWithdrawal = async () => {
        if (balance >= parseInt(amount) && amount) {
            try {
                await TransactionService.withdrawal(parseInt(amount), id, balance, 'EXPENSE', infoBlocks, undefined, expense)
                    .then(res => {
                        if (res) {
                            dispatch(setBalance(balance - parseInt(amount)))
                            dispatch(setExpense(parseInt(amount)))
                            dispatch(addNewBlock(res))
                        }
                    })
            } catch (error) {
                console.error(error)
            } finally {
                setAmount('')
            }
        }
    };

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
                <button onClick={handleTopUp}>Top-Up</button>
                <button onClick={handleWithdrawal}>Withdrawal</button>
            </div>
        </div>
    );
};