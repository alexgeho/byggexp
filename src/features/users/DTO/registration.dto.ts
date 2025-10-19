export interface RegistrationDTO {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    company?: string;
    phone?: string;
    role?: 'superAdmin' | 'companyAdmin' | 'projectAdmin' | 'worker';
}