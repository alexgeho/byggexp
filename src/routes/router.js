"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../features/users/auth.controller");
const router = (0, express_1.Router)();
const controller = new auth_controller_1.AuthController();
// router.get('/', (req, res) => {
//     res.send('Hello World!');
// })
router.post('/auth/register', controller.register.bind(controller));
router.post('/auth/login', controller.login.bind(controller));
exports.default = router;
