export function testEmail(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return { errorTxt: 'Не верный формат email', isValid: false };
    return { errorTxt: "", isValid: true }
}