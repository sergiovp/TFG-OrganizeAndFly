export default function decodeToken(token: string) {
    return token && JSON.parse(atob(token.split('.')[1]));
}
