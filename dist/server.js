"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3003;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Root route to confirm API is live
app.get('/', (req, res) => {
    res.send('🌐 API is working! Try /api/users or /api/thoughts');
});
// API routes
app.use('/api', routes_1.default);
// MongoDB connection
mongoose_1.default.connect('mongodb://127.0.0.1:27017/socialNetworkDB')
    .then(() => {
    console.log('🌱 Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
})
    .catch((err) => console.error('❌ MongoDB connection error:', err));
