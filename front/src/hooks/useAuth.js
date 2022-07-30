import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext';

export const useAuth = () => {
  const {isAuth, setIsAuth, userLogin, setUserLogin} = useContext(AuthContext)
  return {isAuth, setIsAuth, userLogin, setUserLogin}
}