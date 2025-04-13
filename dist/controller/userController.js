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
exports.removeFriend = exports.addFriend = exports.deleteUser = exports.updateUser = exports.createUser = exports.getSingleUser = exports.getUsers = void 0;
const User_1 = require("../models/User");
// GET all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find().populate('friends').populate('thoughts');
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getUsers = getUsers;
// GET a single user by ID
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findById(req.params.userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getSingleUser = getSingleUser;
// POST (create) a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield User_1.User.create(req.body);
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
exports.createUser = createUser;
// PUT (update) a user by ID
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.updateUser = updateUser;
// DELETE a user and their thoughts
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Your delete logic here
        res.status(200).send({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).send({ error: 'Failed to delete user' });
    }
});
exports.deleteUser = deleteUser;
// POST add friend
const addFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Your existing logic
        res.status(200).json({ message: 'Friend added successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add friend' });
    }
});
exports.addFriend = addFriend;
const removeFriend = (req, res) => {
    // Add your implementation here
    res.send('Friend removed');
};
exports.removeFriend = removeFriend;
