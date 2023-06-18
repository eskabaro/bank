import axios from "axios";
import { GenerationUtils } from "@/utilities/generation.utils";
import type { User } from "@/interfaces/data";
import type { IStatisticBlock } from "@/interfaces/data";

axios.defaults.baseURL = 'http://localhost:4200';

export const TransferService = {
    async handleNumber(friendNumber: string, amount: number, id: string, currentBalance: number, infoBlocks: IStatisticBlock[], expense: number): Promise<IStatisticBlock | undefined> {
        const blockExpense = GenerationUtils.generationInfoBlock('Expense', amount)

        try {
            const user = await axios.get<User[]>(`/users?card.number=${friendNumber}&_limit=1`)
            if (user.status === 200) {
                await axios.patch(`/users/${user.data[0].id}`, {
                    balance: user.data[0].balance + amount,
                    infoBlocks: [...user.data[0].infoBlocks, GenerationUtils.generationInfoBlock('Income', amount)],
                    income: user.data[0].income + amount
                })
                await axios.patch(`users/${id}`, {
                    balance: currentBalance - amount,
                    infoBlocks: [...infoBlocks, blockExpense],
                    expense: expense + amount
                })
                return blockExpense
            }
        } catch (error) {
            console.error(error)
        }
    }
}