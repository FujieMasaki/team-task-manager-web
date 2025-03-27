import React from 'react';
import { Link } from 'react-router-dom';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  // 優先度に応じたクラス名
  const priorityClass = `priority-${task.priority}`;

  // 期限が近い場合のクラス
  const now = new Date();
  const isDueSoon = task.due_date &&
    new Date(task.due_date) <= new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000) &&
    new Date(task.due_date) >= now;
  const isOverdue = task.due_date && new Date(task.due_date) < now;

  let dueDateClass = '';
  if (isOverdue) {
    dueDateClass = 'overdue';
  } else if (isDueSoon) {
    dueDateClass = 'due-soon';
  }

  // ステータスの日本語表示
  const statusText = {
    'todo': '未着手',
    'in_progress': '進行中',
    'done': '完了'
  }[task.status];

  return (
    <div className={`task-item ${priorityClass}`}>
      <div className={`status status-${task.status}`}>{statusText}</div>
      <h3 className="task-title">
        <Link to={`/tasks/${task.id}`}>{task.title}</Link>
      </h3>
      <div className="task-content">
        <p className="task-description">{task.description?.substring(0, 100)}{task.description?.length > 100 ? '...' : ''}</p>
        {task.due_date && (
          <div className={`due-date ${dueDateClass}`}>
            期限: {new Date(task.due_date).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
