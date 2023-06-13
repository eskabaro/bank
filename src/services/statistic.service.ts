import axios from "axios"

axios.defaults.baseURL = 'http://localhost:4200'

export const StatisticService = {
    async setStatistic(id: string, amount: number, income?: number, expense?: number, friendId?: string) {
        try {
            if (income !== undefined) {
                await axios.patch(`/users/${id}`, { income: income + amount })
            } else if (expense !== undefined) {
                await axios.patch(`/users/${id}`, { expense: expense + amount })
            } else if (friendId !== undefined && expense !== undefined) {
                const friendIncome = await axios.get(`/users/${friendId}`).then(res => res.data.income)
                await axios.patch(`/users/${friendId}`, { income: friendIncome + amount })
                await axios.patch(`/users/${id}`, { expense: expense + amount })
            }
        } catch (error) {
            console.error(error)
        }
    }
}