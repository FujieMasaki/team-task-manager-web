import React, { useEffect, useState } from 'react';
import { getTasks } from '../api/tasks';
import { Task } from '../types';
import TaskItem from '../components/TaskItem';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('タスクの取得に失敗しました。');
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
    <div className="tasks-page">
      <div className="page-header">
        <h1>タスク一覧</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      {tasks.length > 0 ? (
        <div className="task-list">
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <p className="no-data-message">タスクがありません。</p>
      )}
    </div>
  );
};

export default Tasks;
