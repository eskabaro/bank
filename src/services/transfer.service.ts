import { User } from "@/interfaces/data"
import axios from "axios"

axios.defaults.baseURL = 'http://localhost:4200'

export const TransferService = {
    async handleNumber(number: string, cardNumber: string) {
        try {
            const { data } = await axios.get<User[]>('/users')
            const handleUser = data.find(e => e.card.number === number)
            if (handleUser && handleUser.card.number !== cardNumber) {
                return {
                    balance: handleUser.balance,
                    id: handleUser.id,
                    userName: handleUser.login
                }
            } else return null
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