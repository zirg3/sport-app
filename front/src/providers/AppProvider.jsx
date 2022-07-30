import {useContext, useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import Routes from '../Routes'

const AppProvider = () => {

	const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'))
	const [userLogin, setUserLogin] = useState(JSON.parse(localStorage.getItem('token'))?.user.login)

	return (
		<AuthContext.Provider value={{ isAuth, setIsAuth, userLogin, setUserLogin}}>
			<Routes />
		</AuthContext.Provider>
	)
}

export default AppProvider
