

export const getNextSundays = (count: number): string[] => {

    // initialize sundays as an empty array of strings
    const sundays: string[] = [];
    const today = new Date();
    let date = new Date(today);

    // Start from the upcoming sunday
    date.setDate(date.getDate() + ((7 - date.getDay()) % 7));

    while (sundays.length < count) {
        // format the date as YYYY-MM-DD without timezone issues
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        sundays.push(`${year}-${month}-${day}`);
        date.setDate(date.getDate() + 7); // Move to the next sunday
    }

    return sundays;
};