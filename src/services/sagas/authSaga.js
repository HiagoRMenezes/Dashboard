// src/sagas/authSaga.js
import { call, put, takeLatest} from 'redux-saga/effects';
import {
    VALIDATE_TOKEN_REQUEST,
    VALIDATE_TOKEN_SUCCESS,
    VALIDATE_TOKEN_FAILURE,
    LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, REQUEST_PASSWORD_RESET
} from '../types/actionTypes';
import {passwordResetFailure, passwordResetSuccess} from "../creators/actionCreators";
// import { validateTokenApi } from './api';

// Helper para pegar o token do Redux state
const getToken = (state) => state.auth.token;

function* handlePasswordReset(action) {
    try {
        // Substitua com a chamada para sua API de recuperação de senha
        const response = '';
        // const response = yield call(apiRequestPasswordReset, action.payload.email);

        if (response.success) {
            yield put(passwordResetSuccess());
        } else {
            yield put(passwordResetFailure('Erro ao enviar o email de recuperação.'));
        }
    } catch (error) {
        yield put(passwordResetFailure(error.message));
    }
}

function* loginSaga(action) {
    try {
        if (action.payload.email === 'hiago@gmail.com' || action.payload.email === 'bruno@gmail.com') {
            sessionStorage.setItem('token', '123456789');
            yield put({ type: LOGIN_SUCCESS, payload: '123456789' });
        }


        // const response = yield call(fetch, 'http://localhost:8080/v1/auth/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         "Access-Control-Allow-Origin": "*",
        //         "login": action.payload.email,
        //         "senha": action.payload.password,
        //     },
        // });

        // const data = yield response.json();

        // if (response.ok) {
        //     sessionStorage.setItem('token', data.token);
        //     yield put({ type: LOGIN_SUCCESS, payload: data.token });
        // } else {
        //     yield put({ type: LOGIN_FAILURE, payload: data.message });
        // }
    } catch (error) {
        yield put({ type: LOGIN_FAILURE, payload: error.message });
    }
}

function* validateTokenSaga() {
    try {

        return yield put({ type: VALIDATE_TOKEN_SUCCESS });

        const response = null;
        // const response = yield call(validateTokenApi);
        // if (response.isValid) {
        //     yield put({ type: VALIDATE_TOKEN_SUCCESS });
        // } else {
        //     yield put({ type: VALIDATE_TOKEN_FAILURE });
        // }
    } catch (error) {
        yield put({ type: VALIDATE_TOKEN_FAILURE });
    }
}

export function* authSaga() {
    yield takeLatest(LOGIN_REQUEST, loginSaga);
    yield takeLatest(VALIDATE_TOKEN_REQUEST, validateTokenSaga);
    yield takeLatest(REQUEST_PASSWORD_RESET, handlePasswordReset);
}
