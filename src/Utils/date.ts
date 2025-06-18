function formatDate(date: Date): string {
    const formatter = new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    return formatter.format(date);
}

export default formatDate;