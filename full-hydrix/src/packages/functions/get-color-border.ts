export const getColorBorder = (txt: string) => {

    

    if (txt) {
        if (txt.includes("Пуск") || txt == "1") {
            return "text-green-600"
        } else {
            return "text-red-700"
            // return "text-gray-700"
        }
    }
}