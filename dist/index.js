"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const port = process.env.PORT || 5555;
const setupAls_middleware_1 = __importDefault(require("./middlewares/setupAls.middleware"));
const product_routes_1 = __importDefault(require("./api/product/product.routes"));
const auth_routes_1 = __importDefault(require("./api/auth/auth.routes"));
const store_routes_1 = __importDefault(require("./api/store/store.routes"));
const price_routes_1 = __importDefault(require("./api/price/price.routes"));
const receipt_routes_1 = __importDefault(require("./api/receipt/receipt.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173', 'http://127.0.0.1:5555', 'http://localhost:5555', 'http://127.0.0.1:5174', 'http://localhost:5174',],
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.all('*', setupAls_middleware_1.default);
app.use('/api/product', product_routes_1.default);
app.use('/api/auth', auth_routes_1.default);
app.use('/api/store', store_routes_1.default);
app.use('/api/price', price_routes_1.default);
app.use('/api/receipt', receipt_routes_1.default);
app.get('/**', (req, res) => {
    res.send('Hello, world!');
});
app.listen(port, () => {
    console.log(`Server is live!! Now listening on port ${port}`);
});
