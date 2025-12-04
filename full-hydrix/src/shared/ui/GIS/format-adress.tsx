export function formatAddress(address: string) {
    const pattern1 = /^Россия, Республика Татарстан \(Татарстан\),\s*/;
    const pattern2 = /^\d{6}, Республика Татарстан,\s*/;

    let formattedAddress = address;

    if (pattern1.test(address)) {
        formattedAddress = address.replace(pattern1, '');
    } else if (pattern2.test(address)) {
        formattedAddress = address.replace(pattern2, '');
    }

    const maxlength = 35;
    return (formattedAddress.length > maxlength)
        ? formattedAddress.slice(0, maxlength - 1) + '…'
        : formattedAddress;
}
