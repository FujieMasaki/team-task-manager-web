import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../recoil/auth';
import { getTasks } from '../api/tasks';
import { Task } from '../types';
import TaskItem from '../components/TaskItem';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useRecoilValue(currentUserState);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div className="loading">読み込み中...</div>;
  }

  return (
    <div className="dashboard">
      <h1>ダッシュボード</h1>
      <p className="welcome-message">こんにちは、{currentUser?.name || 'ゲスト'}さん！</p>

      <div className="dashboard-section">
        <h2>自分のタスク</h2>
        {tasks.length > 0 ? (
          <div className="task-list">
            {tasks.slice(0, 5).map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <p className="no-data-message">割り当てられたタスクはありません。</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
