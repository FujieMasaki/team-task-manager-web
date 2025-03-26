// ユーザー情報の型
export interface User {
    id: number;
    email: string;
    name: string;
    created_at: string;
  }
  
  // タスクの型
  export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'todo' | 'in_progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    due_date: string | null;
    assignee_id: number | null;
    created_by_id: number;
    created_at: string;
    updated_at: string;
  }
  
  // 認証レスポンスの型
  export interface AuthResponse {
    status: {
      code: number;
      message: string;
    };
    data: User;
    token?: string;
  }
  