function formatTime(date: Date): string {
    const formatter = new Intl.DateTimeFormat('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
    return formatter.format(date);
}

export default formatTime;