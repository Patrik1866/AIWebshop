export interface User {
    id: number;
    username: string;
    surname: string;
    firstname: string;
    email: string;
    password: string;
    phone: string;
    isAdmin: boolean;
    isModerator: boolean;
}