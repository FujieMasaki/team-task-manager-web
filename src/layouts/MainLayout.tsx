import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentUserState, authTokenState } from '../recoil/auth';
import { logout } from '../api/auth';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const currentUser = useRecoilValue(currentUserState);
  const setAuthToken = useSetRecoilState(authTokenState);
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await logout();
      setAuthToken(null);
      history.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <Link to="/dashboard">タスク管理</Link>
        </div>
        <nav className="main-nav">
          <ul>
            <li><Link to="/dashboard">ダッシュボード</Link></li>
            <li><Link to="/tasks">タスク一覧</Link></li>
          </ul>
        </nav>
        <div className="user-nav">
          {currentUser && <span className="user-name">{currentUser.name}</span>}
          <button onClick={handleLogout} className="btn-secondary">ログアウト</button>
        </div>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 タスク管理アプリ</p>
      </footer>
    </div>
  );
};

export default MainLayout;
