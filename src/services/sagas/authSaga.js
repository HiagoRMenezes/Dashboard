// src/sagas/authSaga.js
import { call, put, takeLatest} from 'redux-saga/effects';
import {
    VALIDATE_TOKEN_REQUEST,
    VALIDATE_TOKEN_SUCCESS,
    VALIDATE_TOKEN_FAILURE,
    LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST
} from '../types/actionTypes';
// import { validateTokenApi } from './api';

// Helper para pegar o token do Redux state
const getToken = (state) => state.auth.token;


function* loginSaga(action) {
    try {
        const response = yield call(fetch, 'http://localhost:8080/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "login": action.payload.email,
                "senha": action.payload.password,
            },
        });

        const data = yield response.json();

        if (response.ok) {
            sessionStorage.setItem('token', data.token);
            yield put({ type: LOGIN_SUCCESS, payload: data.token });
        } else {
            yield put({ type: LOGIN_FAILURE, payload: data.message });
        }
    } catch (error) {
        yield put({ type: LOGIN_FAILURE, payload: error.message });
    }
}

function* validateTokenSaga() {
    try {
        const response = null;
        // const response = yield call(validateTokenApi);
        if (response.isValid) {
            yield put({ type: VALIDATE_TOKEN_SUCCESS });
        } else {
            yield put({ type: VALIDATE_TOKEN_FAILURE });
        }
    } catch (error) {
        yield put({ type: VALIDATE_TOKEN_FAILURE });
    }
}

export function* authSaga() {
    yield takeLatest(LOGIN_REQUEST, loginSaga);
    yield takeLatest(VALIDATE_TOKEN_REQUEST, validateTokenSaga);
}
