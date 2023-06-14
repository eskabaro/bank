import axios from "axios"
import type { IStatisticBlock } from "@/interfaces/data"

axios.defaults.baseURL = 'http://localhost:4200'

export const TransactionService = {
    dateNow: String(new Date),
    async topUp(amount: number, id: string, currentBalance: number, infoType: string, blocks: IStatisticBlock[], income?: number) {
        const block: IStatisticBlock = {
            date: this.dateNow,
            name: infoType === 'INCOME' ? 'Income' : 'Expense',
            amount
        }
        try {
            await axios.patch(`/users/${id}`, {
                balance: currentBalance + amount,
                income: income !== undefined ? income + amount : income,
                infoBlocks: [...blocks, block]
            })
            return block
        } catch (error) {
            alert('Unable to top up balance(')
            console.error(error)
        }
    },
    async withdrawal(amount: number, id: string, currentBalance: number, infoType: string, blocks: IStatisticBlock[], _: any, expense?: number) {
        const block: IStatisticBlock = {
            date: this.dateNow,
            name: infoType === 'INCOME' ? 'Income' : 'Expense',
            amount
        }
        try {
            await axios.patch(`/users/${id}`, {
                balance: currentBalance - amount,
                expense: expense !== undefined ? expense + amount : expense,
                infoBlocks: [...blocks, block]
            })
            return block
        } catch (error) {
            alert('Unable to withdraw funds(')
            console.error(error)
        }
    }
}
