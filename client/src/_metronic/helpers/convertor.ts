export function bytesToString(bytes: number) {
    const nDigits = bytes.toString().replace(".", "").length

    if (nDigits < 7)
        return (bytes * 0.001).toFixed(2) + " Kb" //  0.000976563
    if (nDigits < 10)
        return (bytes * 1e-6).toFixed(2) + " Mb" // 9.5367e-7

    return (bytes * 1e-9).toFixed(2) + " Gb" //1e-9 9.3132e-10
}