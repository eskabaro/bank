import { InformationService } from "@/services/information.service"
import { StatisticService } from "@/services/statistic.service"
import { TransactionService } from "@/services/transaction.service"

export const TransactionUtils = {
    async topUp(amount: number, id: string, balance: number, income: number, expense: number) {
        try {
            await TransactionService.topUp(amount, id, balance)
            await StatisticService.setStatistic(id, amount, income)
            const res = await InformationService.addNewBlock(amount, id, 'INCOME')
            return res
        } catch (error) {
            alert(error)
        }
    }
}