"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeReaction = exports.addReaction = exports.deleteThought = exports.updateThought = exports.createThought = exports.getSingleThought = exports.getThoughts = void 0;
const Thought_1 = require("../models/Thought");
const User_1 = require("../models/User");
const getThoughts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thoughts = yield Thought_1.Thought.find();
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getThoughts = getThoughts;
const getSingleThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_1.Thought.findById(req.params.thoughtId);
        if (!thought)
            return res.status(404).json({ message: 'Thought not found' });
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getSingleThought = getSingleThought;
const createThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { thoughtText, username, userId } = req.body;
        const newThought = yield Thought_1.Thought.create({ thoughtText, username });
        yield User_1.User.findByIdAndUpdate(userId, { $push: { thoughts: newThought._id } }, { new: true });
        res.status(201).json(newThought);
    }
    catch (err) {
        console.error('[createThought error]', err);
        res.status(400).json(err);
    }
});
exports.createThought = createThought;
const updateThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield Thought_1.Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
        if (!updated)
            return res.status(404).json({ message: 'Thought not found' });
        res.json(updated);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
exports.updateThought = updateThought;
const deleteThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield Thought_1.Thought.findByIdAndDelete(req.params.thoughtId);
        if (!deleted)
            return res.status(404).json({ message: 'Thought not found' });
        yield User_1.User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } });
        res.json({ message: 'Thought deleted' });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.deleteThought = deleteThought;
const addReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield Thought_1.Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true, runValidators: true });
        if (!updated)
            return res.status(404).json({ message: 'Thought not found' });
        res.json(updated);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
exports.addReaction = addReaction;
const removeReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield Thought_1.Thought.findByIdAndUpdate(req.params.thoughtId, {
            $pull: { reactions: { reactionId: req.params.reactionId } }
        }, { new: true });
        if (!updated)
            return res.status(404).json({ message: 'Thought not found' });
        res.json(updated);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.removeReaction = removeReaction;
