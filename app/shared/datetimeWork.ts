export class DateTimeWork {
    static getDtByMs(ms: number): string {
        const date = new Date(ms);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    static getMsByDateTimeStr(date: string, time: string): number {
        const newDate = new Date(date);
        const [hours, minutes] = time.split(':').map(Number);
        newDate.setHours(hours, minutes);
        return newDate.getTime();
    }
}
