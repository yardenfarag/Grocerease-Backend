"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const port = process.env.PORT || 5555;
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173', 'http://127.0.0.1:5555', 'http://localhost:5555'],
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.get("/", (req, res) => {
    res.send("hi there bud");
});
app.get("/hi", (req, res) => {
    res.send("bye");
});
app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});
