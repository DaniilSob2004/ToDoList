export class DateTimeWork {
    static getDtByMs(ms: number): string {
        const date = new Date(ms);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
}