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
const express_1 = require("express");
const thoughtController_1 = require("../controller/thoughtController");
const router = (0, express_1.Router)();
router.route('/')
    .get(thoughtController_1.getThoughts)
    .post(thoughtController_1.createThought);
const fetchSingleThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Your existing logic
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
const handleUpdateThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Your existing logic
        res.status(200).json({ message: 'Thought updated successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
const handleDeleteThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Your existing logic
        res.status(200).json({ message: 'Thought deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.route('/:thoughtId')
    .get(fetchSingleThought)
    .put(handleUpdateThought)
    .delete(handleDeleteThought);
const handleAddReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Your existing logic
        res.status(200).json({ message: 'Reaction added successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.route('/:thoughtId/reactions')
    .post(handleAddReaction);
router.route('/:thoughtId/reactions/:reactionId')
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, thoughtController_1.removeReaction)(req, res);
        res.status(200).json({ message: 'Reaction removed successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = router;
