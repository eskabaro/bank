import type { IStatisticBlock } from "@/interfaces/data"

export const GenerationUtils = {
    generationInfoBlock(type: string, amount: number): IStatisticBlock {
        const block: IStatisticBlock = {
            name: type,
            date:  String(new Date),
            amount
        }
        return block
    }
}