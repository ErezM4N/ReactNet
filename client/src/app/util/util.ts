export function getCookie(key: string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
}

export function currencyFormat(amount: number) {
    return '$' + (amount / 100).toFixed(2);
}

export function dateFormat(strDate: string) {
    const date = strDate.split('T')[0];
    const time = strDate.split('T')[1].split('.')[0];
    return `${date} - ${time}`;
}

