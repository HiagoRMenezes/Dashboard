// src/sagas/index.js
import { all } from 'redux-saga/effects';
import { authSaga } from './authSaga';  // Vamos criar

export default function* rootSaga() {
    yield all([authSaga()]);
}
