"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tsyringe_1 = require("tsyringe");
const auth_service_1 = require("./auth.service");
class AuthController {
    constructor() {
        this.service = tsyringe_1.container.resolve(auth_service_1.AuthService);
    }
    async register(req, res) {
        try {
            const { email, password, role } = req.body;
            const user = await this.service.register(email, password, role);
            res.status(201).json({ message: 'User created', user });
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await this.service.login(email, password);
            res.json(result);
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
}
exports.AuthController = AuthController;
