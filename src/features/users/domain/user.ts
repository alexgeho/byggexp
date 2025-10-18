export class User {
    constructor(
        public email: string,
        public password: string,
        public role: 'superAdmin' | 'companyAdmin' | 'projectAdmin' | 'worker' = 'worker',
        public createdAt: Date = new Date()
    ) {}

    // Бизнес-логика, независимая от базы
    isAdmin() {
        return this.role === 'superAdmin' || this.role === 'companyAdmin';
    }

    canManageProjects() {
        return ['superAdmin', 'companyAdmin', 'projectAdmin'].includes(this.role);
    }
}
