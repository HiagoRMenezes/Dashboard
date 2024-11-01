import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {Box, Card, CardActions, CardContent, CircularProgress} from "@mui/material";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { loading, error, token } = useSelector((state) => state.auth);

    const FIXED_EMAIL = "hiago@gmail.com"; // Email fixo
    const FIXED_PASSWORD = "123456"; // Senha fixa
    const FIXED_TOKEN = "token-fixo-para-desenvolvimento"; // Use um token fixo para testes

const handleSubmit = (e) => {
        e.preventDefault();
        // Verificar credenciais fixas
        if (email === FIXED_EMAIL && password === FIXED_PASSWORD) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: { token: FIXED_TOKEN } });
        } else {
            dispatch({ type: 'LOGIN_FAILURE', payload: 'Email ou senha incorretos' });
        }
    };

    // Redirecionar após o login
    if (token) {
        return <Link to={'/dashboard'} />;
    }

    return (
        <Box style={{
            background: `linear-gradient(#290077, #290077, #290077, #FF4D00FF)`}}  width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center' >
            <Card style={{
                borderRadius: `3%`}}  >
                <CardContent>
                    <Box display='flex' flexDirection='column' gap={6} width={450}>

        <div style={styles.container}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <CardActions style={{ textAlign: 'center', justifyContent: 'center'}}>
                    <button type="submit" style={styles.button}  disabled={loading} onSubmit={handleSubmit}>
                        {loading ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : 'Entrar'}
                    </button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </CardActions>
            </form>
        </div>

                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        marginBottom: '10px',
        // padding: '8px',
        fontSize: '16px',
        margin: '8px',
    },
    button: {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '7px',
        cursor: 'pointer',
        marginTop: '-3%'
    },
};

export default Login;
