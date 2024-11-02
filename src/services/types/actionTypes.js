// actionTypes.js

// Ações relacionadas à autenticação e validação de token
export const VALIDATE_TOKEN_REQUEST = 'VALIDATE_TOKEN_REQUEST';  // Dispara quando a validação do token é solicitada
export const VALIDATE_TOKEN_SUCCESS = 'VALIDATE_TOKEN_SUCCESS';  // Dispara quando a validação do token é bem-sucedida
export const VALIDATE_TOKEN_FAILURE = 'VALIDATE_TOKEN_FAILURE';  // Dispara quando a validação do token falha

// Outras ações relacionadas à autenticação (se precisar)
export const LOGIN_REQUEST = 'LOGIN_REQUEST';  // Dispara quando o login é solicitado
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';  // Dispara quando o login é bem-sucedido
export const LOGIN_FAILURE = 'LOGIN_FAILURE';  // Dispara quando o login falha

export const LOGOUT = 'LOGOUT';  // Dispara quando o logout é solicitado

export const REQUEST_PASSWORD_RESET = 'REQUEST_PASSWORD_RESET';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_FAILURE = 'PASSWORD_RESET_FAILURE';