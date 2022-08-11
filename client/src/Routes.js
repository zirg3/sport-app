import React from 'react';
import Home from './components/pages/Home/Home';
import { routes } from './dataRoutes'
import { useAuth } from './hooks/useAuth'
import Error404 from './components/pages/404'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

const App = () => {
  const { isAuth } = useAuth()
  return (
      <Router>
        <Routes>
          {routes.map(route => {
            if (route.auth && !isAuth) {
              return false
            }
            return (
                <Route path={route.path} exact={route.exact} element={<route.element/>} key={`route ${route.path}`}/>
            )
          })}
          <Route path='*' exact element={<Error404/>}/>
        </Routes>
      </Router>
  );
};

export default App;
