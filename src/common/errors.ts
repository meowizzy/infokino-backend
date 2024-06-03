export enum ErrorsType {
    USER_EXIST = "USER_EXIST",
    USER_NOT_FOUND = "USER_NOT_FOUND",
    INCORRECT_ERROR = "INCORRECT_ERROR",
    FAVORITES_NOT_FOUND = "FAVORITES_NOT_FOUND",
}
export const AppErrors = {
    [ErrorsType.USER_EXIST]: "Пользователь с переданными данными уже существует.",
    [ErrorsType.USER_NOT_FOUND]: "Пользователь с переданным email не найден.",
    [ErrorsType.INCORRECT_ERROR]: "Указанны некорректные данные.",
    [ErrorsType.FAVORITES_NOT_FOUND]: "Ваш список избранных пуст."
};