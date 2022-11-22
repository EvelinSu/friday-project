export const getCountArray = (count: number | string) => {
    const counts = []
    for (let i = 0; i < +count; i++) counts.push(i)
    return counts
}