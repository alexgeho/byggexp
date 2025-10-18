"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
const router_1 = __importDefault(require("./routes/router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(router_1.default);
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Mongo connected'))
    .catch(err => console.error('❌ Mongo error:', err));
exports.default = app;
