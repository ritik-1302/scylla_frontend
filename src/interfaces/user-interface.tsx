export type UserRole = 'admin' | 'front_desk_manager' | 'housekeeping_manager' | 'kitchen_manager' | 'staff';

export interface User {
    id: string;
    name: string;
    role: UserRole;
    department?: 'front_desk' | 'housekeeping' | 'kitchen';
  }