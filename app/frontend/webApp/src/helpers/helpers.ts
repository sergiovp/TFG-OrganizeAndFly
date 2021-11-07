export function parseEmail(email: string) {
    let parsedEmail = '';

    for (let i = 0; i < email.length; i++) {
        if (email[i] !== '@') {
            parsedEmail += email[i];
        } else {
            return parsedEmail;
        }
    }
    return parsedEmail;
}

export function checkEnteredFieldsLogin(email: string, pass: string) {
    return email.length > 0 && pass.length > 0;
}

export function checkEnteredFieldsSignUp(email: string, pass: string, confirmedPass: string) {
    return email.length > 0 && pass.length > 0 && confirmedPass.length > 0;
}

export function validateEmail(email: string): boolean {
    const re: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
