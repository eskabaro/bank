export const CardUtils = {
    createCardNumber(numbers: string[]): string {
        let cardNumber = ''
        do {
            for (let i = 0; i < 16; i++) {
                const digit = Math.floor((Math.random() * 10))
                cardNumber += digit
            }
        } while (numbers.includes(cardNumber))
        return cardNumber
    },
    createCardDate(): string {
        const year = new Date().getFullYear() + 5
        const month = new Date().toLocaleString('default', { month: '2-digit' })
        const date = `${month}/${year.toString().slice(2)}`
        return date
    },
    createCardCvv(): number {
        let cvv = ''
        do {
            for (let i = 0; i < 3; i++) {
                const digit = Math.floor((Math.random() * 10))
                cvv += digit
            }
            return parseInt(cvv)
        } while (cvv.length === 3)
    }
}
