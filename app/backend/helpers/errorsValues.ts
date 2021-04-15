const enum errorsValues {
    DuplicatedEmail = "The entered email is already in use",
    PasswordsDontMatch = "The entered passwords must match",
    EmailBadSyntax = "The entered email is not valid",
    BadArguments = "You must entered the required data",
    UnsafePass = "The password must be at least 6 characters long",
    WrongData = "The entered data is incorrect, please, try again",
    UserNotFound = "User could not be found",
    TokenDoesNotProvided = "There is not any token provided. Unauthorized access",
    TokenDoesNotMatch = "The token provided is not correct. Unauthorized access",
    UserNotDeleted = "User could not be deleted",
    ThereIsNothingToMod = "There is nothing to be modified",
    NotNewPass = "You must entered a new password",
};

export default errorsValues;
