export class DateTimeWork {
    static getDtByMs(ms: number): string {
        const date = new Date(ms);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    static getMsByDateTimeStr(date: string, time: string): number {
        const newDate = new Date(date);
        const [hours, minutes] = time.split(':').map(Number);  // получаем часы и минуты
        newDate.setHours(hours, minutes);
        return newDate.getTime();
    }

    static getDateWithoutTime(ms: number): string {
        const date = new Date(ms);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    }

    static getTimeWithoutDate(ms: number): string {
        const date = new Date(ms);
        const hour = date.getHours();
        const minute = date.getMinutes();
        return `${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}`;
    }
}
