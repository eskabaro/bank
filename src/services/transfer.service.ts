import axios from "axios";
import { GenerationUtils } from "@/utils/generation.utils";
import type { User } from "@/interfaces/data";
import type { IStatisticBlock } from "@/interfaces/data";

axios.defaults.baseURL = 'http://localhost:4200';

export const TransferService = {
    async fetchByCardNumber(friendCardNumber: string): Promise<User> {
        const { data } = (await axios.get(`users?card.number=${friendCardNumber}&_limit=1`))
        return data[0]
    },
    async patchUser(friendUser: User, authId: string, amount: number, currentBalance: number, infoBlocks: IStatisticBlock[], expense: number) {
        const blockExpense = GenerationUtils.generationInfoBlock('Expense', amount)
        await axios.all([
            axios.patch<User>(`/users/${friendUser.id}`, {
                balance: friendUser.balance + amount,
                infoBlocks: [...friendUser.infoBlocks, GenerationUtils.generationInfoBlock('Income', amount)],
                income: friendUser.income + amount
            }),
            axios.patch<User>(`users/${authId}`, {
                balance: currentBalance - amount,
                infoBlocks: [...infoBlocks, blockExpense],
                expense: expense + amount
            })
        ]).catch(console.log)
        return blockExpense
    }
}