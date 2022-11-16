export const transformDate = (dataWithServe: string) => {
    const currentdate = new Date(dataWithServe);
    const day = currentdate.getDate() < 10 ? `0${currentdate.getDate()}` : currentdate.getDate();
    return `${day}.${currentdate.getMonth() + 1}.${currentdate.getFullYear()}`;
};
