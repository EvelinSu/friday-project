export const transformDate = (dataWithServe: string) => {
    const currentDate = new Date(dataWithServe);
    const day = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate();
    return `${day}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;
};
