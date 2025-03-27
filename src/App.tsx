import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authTokenState, currentUserState, isAuthenticatedState } from './recoil/auth';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './layouts/MainLayout';
import api from './api/axios';
import { User } from './types';
import './assets/styles.css';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const token = useRecoilValue(authTokenState);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!token) return;

      try {
        // カレントユーザー取得 - 実際のエンドポイントに合わせて調整
        const response = await api.get<User>('/api/v1/me');
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Failed to fetch current user:', error);
      }
    };

    if (token && !currentUser) {
      fetchCurrentUser();
    }
  }, [token, currentUser, setCurrentUser]);

  return (
    <Router>
      <Switch>
        <Route path="/login" exact>
          {isAuthenticated ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
        <Route path="/register" exact>
          {isAuthenticated ? <Redirect to="/dashboard" /> : <Register />}
        </Route>

        <Route path="/">
          {!isAuthenticated ? (
            <Redirect to="/login" />
          ) : (
            <MainLayout>
              <Switch>
                <PrivateRoute path="/dashboard" exact component={Dashboard} />
                <PrivateRoute path="/tasks" exact component={Tasks} />
                <Redirect from="/" exact to="/dashboard" />
              </Switch>
            </MainLayout>
          )}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
