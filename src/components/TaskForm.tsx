import React, { useState } from 'react';
import { createTask, updateTask } from '../api/tasks';

interface TaskFormProps {
  initialValues?: {
    title: string;
    description: string;
    status: 'todo' | 'in_progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    due_date: string | null;
  };
  taskId?: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialValues = {
    title: '',
    description: '',
    status: 'todo' as const,
    priority: 'medium' as const,
    due_date: null
  },
  taskId,
  onSuccess,
  onCancel
}) => {
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const [status, setStatus] = useState<'todo' | 'in_progress' | 'done'>(initialValues.status);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(initialValues.priority);
  const [dueDate, setDueDate] = useState<string>(initialValues.due_date || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const taskData = {
      title,
      description,
      status,
      priority,
      due_date: dueDate || null,
      assignee_id: null // 簡易実装のため固定
    };

    try {
      if (taskId) {
        await updateTask(taskId, taskData);
      } else {
        await createTask(taskData);
      }
      onSuccess();
    } catch (err) {
      console.error('Form submission error:', err);
      setError('タスクの保存に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h3>{taskId ? 'タスク編集' : 'タスク作成'}</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">タイトル *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">説明</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>
        <div className="form-row">
          <div className="form-group form-group-half">
            <label htmlFor="status">ステータス *</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'todo' | 'in_progress' | 'done')}
              required
            >
              <option value="todo">未着手</option>
              <option value="in_progress">進行中</option>
              <option value="done">完了</option>
            </select>
          </div>
          <div className="form-group form-group-half">
            <label htmlFor="priority">優先度 *</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              required
            >
              <option value="low">低</option>
              <option value="medium">中</option>
              <option value="high">高</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">期限</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? '保存中...' : '保存'}
          </button>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
