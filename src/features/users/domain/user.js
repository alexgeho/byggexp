"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    email;
    password;
    role;
    createdAt;
    constructor(email, password, role = 'worker', createdAt = new Date()) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdAt = createdAt;
    }
    // Бизнес-логика, независимая от базы
    isAdmin() {
        return this.role === 'superAdmin' || this.role === 'companyAdmin';
    }
    canManageProjects() {
        return ['superAdmin', 'companyAdmin', 'projectAdmin'].includes(this.role);
    }
}
exports.User = User;
