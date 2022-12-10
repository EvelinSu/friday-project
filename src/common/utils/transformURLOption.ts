export type TURLSortOptions = ReturnType<typeof URLOptions>
const URLOptions = () => ({
    "0updated": "Updated recently",
    "1updated": "Updated long ago",
    "0cardsCount": "Lot of cards",
    "1cardsCount": "Few cards",
    "0grade": "Low rating",
    "1grade": "High rating",
    "0publicCardPacksCount": "Lot of packs",
    "1publicCardPacksCount": "Few packs",
    "0created": "New users",
    "1created": "Old users"
} as const);

export const transformURLOption = (URLOption: keyof TURLSortOptions): keyof TSortOptions | "" => {
    return URLOption ? URLOptions()[URLOption] : "";
};

export type TSortOptions = ReturnType<typeof options>
const options = () => ({
    "Updated recently": "0updated",
    "Updated long ago": "1updated",
    "Lot of cards": "0cardsCount",
    "Few cards": "1cardsCount",
    "Low rating": "0grade",
    "High rating": "1grade",
    "Lot of packs": "0publicCardPacksCount",
    "Few packs": "1publicCardPacksCount",
    "New users": "0created",
    "Old users": "1created"
} as const);

export const transformToURLOption = (option: keyof TSortOptions): keyof TURLSortOptions | "" => {
    return option ? options()[option] : "";
};
