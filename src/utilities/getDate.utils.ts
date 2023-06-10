export const GetDate = {
   getDate(date: string): string {
      const monthIndex = new Date(date).getMonth();
      const monthFullName = new Date(0, monthIndex).toLocaleString('en-US', { month: 'long' });

      const day = String(new Date(date).getDay())

      const year = String(new Date(date).getFullYear())

      return monthFullName + ' ' + day + ', ' + year
   }
}