export interface UserParams {
  usuario: string;
  correo: string;
  password: string;

  admin?: boolean;
  created_at?: string;
  updated_at?: string;
  last_active_at?: string | null;
  deleted_at?: string | null;
}

export type CreateUserParams = Omit<
  UserParams,
  "created_at" | "updated_at" | "last_active_at" | "deleted_at"
>;

export type CreateUserResult =
  | { success: true; insertId: number, errorCode?: never }
  | { success: false; errorCode: string, insertId?: never };
