import axios from "axios"
import { GenerationUtils } from "@/utilities/generation.utils"

axios.defaults.baseURL = 'http://localhost:4200'

export const InformationService = {
    async addNewBlock(amount: number, id: string, name: string, friendId?: string) {

        const allBlocks = await axios.get(`/users/${id}`).then(res => res.data.infoBlocks)
        
        const block = GenerationUtils.generationInfoBlock(name === 'INCOME' ? 'Income' : 'Expense', amount)
        allBlocks.push(block)
        await axios.patch(`/users/${id}`, { infoBlocks: allBlocks })

        if (friendId) {
            const allBlocksFriend = await axios.get(`/users/${friendId}`).then(res => res.data.infoBlocks)
            const block = GenerationUtils.generationInfoBlock('Income', amount) 
            
            allBlocksFriend.push(block)
            await axios.patch(`/users/${friendId}`, { infoBlocks: allBlocksFriend })
        }

        return block
    }
}