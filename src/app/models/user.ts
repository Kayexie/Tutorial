export class User{
    userId: string;
    userName: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;

    constructor() {
        this.userId = '';
        this.userName = '';
        this.email = '';
        this.role = '';
        this.createdAt = '';
        this.updatedAt = '';
    }
}

export interface UserResponse {
    _id:'string',
    userName:'string',
    email:'string',
    role:'string',
    updatedAt:'string',
    createdAt: 'string'
}