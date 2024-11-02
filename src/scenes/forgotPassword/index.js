import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {requestPasswordReset} from "../../services/creators/actionCreators";

const ForgotPasswordPage = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const { loading, error, success } = useSelector(state => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(requestPasswordReset(email));
    };

    return (
        <div className="forgot-password-page">
            <h2>Recuperação de Senha</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Digite seu email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Enviando...' : 'Recuperar Senha'}
                </button>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">Instruções enviadas com sucesso!</p>}
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
