export enum UserRole {
	SUPER_ADMIN = "SUPER_ADMIN",
	ADMIN = "ADMIN",
	DATA_EDITOR = "DATA_EDITOR",
	VIEWER = "VIEWER",
}

export interface UserType {
	_id: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	active: boolean; // accepted the request or not
	phone?: string;
	role: UserRole; // "SuperAdmin" | "Admin" | "DataManager" | "Viewer"
}