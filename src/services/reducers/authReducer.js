// src/reducers/authReducer.js
import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    VALIDATE_TOKEN_FAILURE, VALIDATE_TOKEN_REQUEST,
    VALIDATE_TOKEN_SUCCESS
} from "../types/actionTypes";

const initialState = {
    token: sessionStorage.getItem('token') || null,
    isTokenValidated: false,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case VALIDATE_TOKEN_REQUEST:
            return { ...state, loading: true, error: null };
        case LOGIN_SUCCESS:
            return { ...state, token: action.payload, loading: false, error: null };
        case LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case LOGOUT:
            return { ...state, token: null };
        case VALIDATE_TOKEN_SUCCESS:
            return {
                ...state,
                isTokenValidated: true,  // Define como validado
            };
        case VALIDATE_TOKEN_FAILURE:
            return {
                ...state,
                isTokenValidated: false,
                token: null,  // Limpa o token se a validação falhar
            };
        default:
            return state;
    }
};

export default authReducer;
