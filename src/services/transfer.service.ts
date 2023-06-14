import type { User } from "@/interfaces/data"
import type { IStatisticBlock } from "@/interfaces/data"
import axios from "axios"

axios.defaults.baseURL = 'http://localhost:4200'

export const TransferService = {
    async handleNumber(friendNumber: string, amount: number, id: string, currentBalance: number, infoBlocks: IStatisticBlock[], expense: number) {
        // CREATE GENERATES FUNCION ========================
        const block: IStatisticBlock = {
            date: String(new Date),
            name: 'Income',
            amount
        }
        const block1: IStatisticBlock = {
            date: String(new Date),
            name: 'Expense',
            amount
        }
        // ==================
        try {
            const user = await axios.get<User[]>(`/users?card.number=${friendNumber}&_limit=1`)
            if (user.status === 200) {
                await axios.patch(`/users/${user.data[0].id}`, {
                    balance: user.data[0].balance + amount,
                    infoBlocks: [...user.data[0].infoBlocks, block],
                    income: user.data[0].income + amount
                })
                await axios.patch(`users/${id}`, {
                    balance: currentBalance - amount,
                    infoBlocks: [...infoBlocks, block1],
                    expense: expense + amount
                })
            }
            return block1
        } catch (error) {
            console.error(error)
        }
    },
    async transfer(id: string, balance: number, amount: number) {
        try {
            await axios.patch(`/users/${id}`, { balance: balance + amount })
        } catch (error) {
            console.error(error)
        }
    },
    async transForAutUser(id: string, balance: number, amount: number) {
        try {
            await axios.patch(`/users/${id}`, { balance: balance - amount })
        } catch (error) {
            console.error(error)
        }
    }
}