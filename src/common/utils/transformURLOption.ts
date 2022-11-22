export const transformURLOption = (URLOption: string | null) => {
    const options: any = {
        "0updated": "Updated recently",
        "1updated": "Updated long ago",
        "1cardsCount": "Few cards",
        "0cardsCount": "Lots of cards"
    }
    return URLOption ? options[URLOption] : ""
}

export const transformToURLOption = (option: string | null) => {
    const options: any = {
        "Updated recently": "0updated",
        "Updated long ago": "1updated",
        "Few cards": "1cardsCount",
        "Lots of cards": "0cardsCount"
    }
    return option ? options[option] : ""
}