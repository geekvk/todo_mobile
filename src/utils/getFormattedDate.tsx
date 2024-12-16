export const getFormattedDate = (date : Date) => {;
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month : 'short'});
    const dayOfWeek = date.toLocaleDateString('en-US', {weekday : 'long'})

    return `${day}.${month} ${dayOfWeek}`
}