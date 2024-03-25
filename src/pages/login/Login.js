import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../hooks/useAuth';
import schema from './validation';
import './Login.css';
import { getToken } from './axios';

function Login(props) {
    const location = useLocation();
    const history = useHistory();
    const { signIn } = useAuth();
    const [disable, setDisable] = useState(false);
    const [error, setError] = useState(false);

    const { register, handleSubmit, reset } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        let stateRole = null;
        let role = ['HEAD_OF_DEPARTMENT', 'RECTOR', 'DEAN'];

        if (localStorage.getItem('user')) {
            JSON.parse(localStorage.getItem('user')).roles.forEach((el) => {
                stateRole = stateRole + role.includes(el);
            });
            signIn(JSON.parse(localStorage.getItem('user')), () =>
                history.replace(location.state ? location.state?.from : '/vstu/plans')
            );
        }
    }, [location, history, signIn]);

    function getFormData(object) {
        let formData = new FormData();
        Object.keys(object).forEach((key) => {
            formData.append(key, object[key]);
        });
        return formData;
    }

    const onSubmit = (data) => {
        setDisable(true);
        getToken(getFormData(data))
            .then((data) => {
                localStorage.setItem('user', JSON.stringify(data));
                reset();
                signIn(data, () =>
                    history.replace('/vstu', {
                        replace: true,
                    })
                );
            })
            .catch((e) => {
                console.log(e);
                setError(true);
                setDisable(false);
                setTimeout(() => setError(false), 5000);
            });
    };

    return (
        <div className="container">
            <div className="form-wrapper">
                <h3 className="form-title">Вход в личный кабинет</h3>
                {error ? (
                    <p className="form-error">Ошибка авторизации, попробуйте ещё раз</p>
                ) : null}
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className="form-input"
                        {...register('username')}
                        type="email"
                        placeholder="Введите имя пользователя"
                        required
                    />
                    <input
                        className="form-input"
                        {...register('password')}
                        type="password"
                        placeholder="Введите пароль"
                        required
                    />
                    <button className="login-form__submit" type="submit" disabled={disable}>
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
