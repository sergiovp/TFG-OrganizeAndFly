export default function generateHeader(token: string) {
    return { Authorization: 'Bearer ' + token };
}
