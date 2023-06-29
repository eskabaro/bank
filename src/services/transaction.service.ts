import axios from "axios"
import { GenerationUtils } from "@/utils/generation.utils"
import type { IStatisticBlock, User } from "@/interfaces/data"

axios.defaults.baseURL = 'https://users-bank-data.onrender.com'

export const TransactionService = {
    async topUp(amount: number, id: string, currentBalance: number, infoType: string, blocks: IStatisticBlock[], income: number) {
        const block = GenerationUtils.generationInfoBlock(infoType === 'INCOME' ? 'Income' : 'Expense', amount)

        await axios.patch<User>(`/users/${id}`, {
            balance: currentBalance + amount,
            income: income + amount,
            infoBlocks: [...blocks, block]
        })
        return block
    },
    async withdrawal(amount: number, id: string, currentBalance: number, infoType: string, blocks: IStatisticBlock[], _: any, expense: number) {
        const block = GenerationUtils.generationInfoBlock(infoType === 'INCOME' ? 'Income' : 'Expense', amount)

        await axios.patch<User>(`/users/${id}`, {
            balance: currentBalance - amount,
            expense: expense + amount,
            infoBlocks: [...blocks, block]
        })
        return block
    }
}
