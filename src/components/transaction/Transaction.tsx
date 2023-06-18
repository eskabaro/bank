import { FC, useState } from "react";
import { TopUp } from "@/ui/btn-topup";
import { Withdrawal } from "@/ui/btn-withdrawal";
import s from './Transaction.module.scss';

interface IProps {
    id: string; 
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
                <TopUp id={id} amount={parseInt(amount)} setAmount={setAmount} />
                <Withdrawal id={id} amount={parseInt(amount)} setAmount={setAmount} />
            </div>
        </div>
    );
};