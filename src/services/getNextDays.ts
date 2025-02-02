export const getNextDays = (dayOfWeek: number, count: number) => {
    const dates = [];
    const today = new Date();
    
    while (dates.length < count) {
      today.setDate(today.getDate() + 1); // Move to the next day
      if (today.getDay() === dayOfWeek) {
        dates.push(today.toISOString().split("T")[0]); // Format YYYY-MM-DD
      }
    }
  
    return dates;
  };