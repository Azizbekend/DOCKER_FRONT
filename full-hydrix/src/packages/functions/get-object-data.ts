export function getObjectId() {
    return JSON.parse(localStorage.getItem('objectData') || "").id
}
