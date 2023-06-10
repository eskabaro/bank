import axios from "axios"

axios.defaults.baseURL = 'http://localhost:4200'

export const TransactionService = {
    async topUp(amount: number, id: string, currentBalance: number) {
        try {
            await axios.patch(`/users/${id}`, { balance: currentBalance + amount })
        } catch (error) {
            alert('Unable to top up balance(')
            console.error(error)
        }
    },
    async withdrawal(amount: number, id: string, currentBalance: number) { 
        try {
            await axios.patch(`/users/${id}`, { balance: currentBalance - amount })
        } catch (error) {
            alert('Unable to withdraw funds(')
            console.error(error)
        }
    }
}
