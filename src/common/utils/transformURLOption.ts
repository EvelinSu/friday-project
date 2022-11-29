export const transformURLOption = (URLOption: string | null) => {
    const options: any = {
        "0updated": "Updated recently",
        "1updated": "Updated long ago",
        "0cardsCount": "Lots of cards",
        "1cardsCount": "Few cards",
        "0grade": "Low rating",
        "1grade": "High rating",
    };
    return URLOption ? options[URLOption] : "";
};

export const transformToURLOption = (option: string | null) => {
    const options: any = {
        "Updated recently": "0updated",
        "Updated long ago": "1updated",
        "Lots of cards": "0cardsCount",
        "Few cards": "1cardsCount",
        "Low rating": "0grade",
        "High rating": "1grade",
    };
    return option ? options[option] : "";
};
