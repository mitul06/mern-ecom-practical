export const formattedCurrency = (amount: number | undefined) => {
    return (
        Number(amount).toLocaleString('en-IN', { currency: 'USD', style: 'currency' })
    )
}