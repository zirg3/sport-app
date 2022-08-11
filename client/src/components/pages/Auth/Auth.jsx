import React, {useState} from 'react';
import bgImage from '../../../images/auth-bg.png'
import Layout from '../../Layout';
// import bgImage from '../../../images/new-workout-bg.jpg';
import Field from '../../ui/Field/Field';
import Button from '../../ui/Button/Button';
import styles from './Auth.module.scss'
import Alert from '../../ui/Alert/Alert';
import {useMutation, useQuery} from 'react-query';
import {$api} from '../../../api/api';
import Loader from '../../ui/Loader';
import {useNavigate}  from 'react-router-dom'
import {useAuth} from '../../../hooks/useAuth';

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState('')
  const [type, setType] = useState('auth')
  const [switchAuthReg, setSwitchAuthReg] = useState('auth')
  const navigate = useNavigate()
  let {setIsAuth, setUserLogin} = useAuth()

  const successLogin = (token, login) => {
    localStorage.setItem('token', JSON.stringify(token))
    setIsAuth(false)
    setUserLogin(login)
    setPassword('')
    setEmail('')
    setLogin('')
    navigate('/', {replace: true})
  }

  const {mutate: register, isLoading, error} = useMutation(
      'Registration',
      () => $api({
        url: '/users',
        type: 'POST',
        body: {email, password, login},
        auth: false
      }),
      {
        onSuccess(data) {
          successLogin(data, data.user.login)
          setIsAuth(true)
        }
      }
   )

  const {mutate: auth, isLoading: isLoadingAuth, error: errorAuth,} = useMutation(
      'Auth',
      () => $api({
            url: '/users/login',
            type: 'POST',
            body: { email, password },
            auth: false,
          }),
      {
        onSuccess(data) {
          successLogin(data, data.user.login)
          setIsAuth(true)
        },
      }
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (type === 'auth') {
      auth()
    } else {
      register()
    }
  }

  return (
      <>
        <Layout bgImage={bgImage} heading='Войти или зарегистрироваться'/>
          <div className='wrapper-inner-page'>
            {error && <Alert type='error' text={error}/>}
            {errorAuth && <Alert type='error' text={errorAuth} />}
            {(isLoading || isLoadingAuth) && <Loader/>}
            <form onSubmit={handleSubmit}>
              {switchAuthReg === 'auth' ?
                (<><Field
                    placeholder='Ваша почта'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <Field
                    placeholder='Ваш пароль'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <div className={styles.wrapperButtons}>
                <Button text='Войти' callback={() => setType('auth')}/>
                <Button text='Регистрация' callback={() => setSwitchAuthReg('reg')}/>
                </div></>
                ) : (
                <><Field
                  placeholder='Ваша почта'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <Field
                  placeholder='Ваш пароль'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                  <Field
                      placeholder='Ваш логин'
                      value={login}
                      onChange={e => setLogin(e.target.value)}
                      required
                  />
                <div className={styles.wrapperButtons}>
                <Button text='Вход' callback={() => setSwitchAuthReg('auth')}/>
                <Button text='Зарегистрироваться' callback={() => setType('reg')}/>
                </div></>)
              }
            </form>
          </div>
        </>
  );
};

export default Auth;
