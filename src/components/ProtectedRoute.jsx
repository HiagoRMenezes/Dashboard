import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Navigate, NavLink} from 'react-router-dom';
import {VALIDATE_TOKEN_REQUEST} from "../services/types/actionTypes";

const ProtectedRoute = ({ children }) => {
    const token = useSelector((state) => state.auth.token);
    const isTokenValidated = useSelector((state) => state.auth.isTokenValidated);
    const dispatch = useDispatch();

    useEffect(() => {
        if (token && !isTokenValidated) {
            // Só dispara a validação se o token ainda não foi validado
            dispatch({ type: VALIDATE_TOKEN_REQUEST });
        }
    }, [token, isTokenValidated, dispatch]);

    if (!token) {
        // Aqui, o Navigate só será renderizado uma vez
        return (<Navigate to={'/login'} />);
    }

    if (!isTokenValidated) {
        // Enquanto o token está sendo validado, exibe um "loading"
        return <div>Validando o token...</div>;
    }

    return children;
};

export default ProtectedRoute;
