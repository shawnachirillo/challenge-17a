"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionSchema = void 0;
// src/models/Reaction.ts
const mongoose_1 = require("mongoose");
const dayjs_1 = __importDefault(require("dayjs"));
exports.ReactionSchema = new mongoose_1.Schema({
    reactionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: () => new mongoose_1.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => (0, dayjs_1.default)(timestamp).format('MMM D, YYYY [at] h:mm A'),
    },
}, {
    toJSON: { getters: true },
    id: false,
});
