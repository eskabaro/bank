export const GesUtils = {
   getDate(date: string): string {
      const monthIndex = new Date(date).getMonth();
      const monthFullName = new Date(0, monthIndex).toLocaleString('en-US', { month: 'long' });

      const day = new Date(date).getDate().toString();

      const year = String(new Date(date).getFullYear())

      return monthFullName + ' ' + day + ', ' + year
   },
   getTitle(title: string): string {
      return `${title} | Bank`
   }
}