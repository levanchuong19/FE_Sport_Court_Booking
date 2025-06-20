function formatVND(amount: number): string {
    const fomartter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
    });
    return fomartter.format(amount);
}

export default formatVND;
