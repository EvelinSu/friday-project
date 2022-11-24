export const transformDate = (dataWithServe: string, time?: boolean) => {
    const currentDate = new Date(dataWithServe);
    const day = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate();
    const hours = currentDate.getHours() < 10 ? `0${currentDate.getHours()}` : currentDate.getHours()
    const minutes = currentDate.getMinutes() < 10 ? `0${currentDate.getMinutes()}` : currentDate.getMinutes()

    if (time) {
        return `${day}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()} ${hours}:${minutes} `
    }

    return `${day}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;

};
