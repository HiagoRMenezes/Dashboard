
// Criadores de ação
import {PASSWORD_RESET_FAILURE, PASSWORD_RESET_SUCCESS, REQUEST_PASSWORD_RESET} from "../types/actionTypes";

export const requestPasswordReset = (email) => ({
    type: REQUEST_PASSWORD_RESET,
    payload: { email },
});

export const passwordResetSuccess = () => ({
    type: PASSWORD_RESET_SUCCESS,
});

export const passwordResetFailure = (error) => ({
    type: PASSWORD_RESET_FAILURE,
    payload: { error },
});