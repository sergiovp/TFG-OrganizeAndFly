export default function decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
}
