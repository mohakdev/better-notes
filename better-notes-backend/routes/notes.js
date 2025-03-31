import { Router } from "express";
import jwt from "jsonwebtoken";
import note_model from "../models/note_model.js";
import authToken from "../utilities.js";
import { checkSchema, matchedData, validationResult } from "express-validator";
import noteValidationSchema from "../validation/note_validation.js";

const router = Router();

router.post("/add", authToken, checkSchema(noteValidationSchema), async (req, res) => {
    // Validate the request body against the schema
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const data = matchedData(req);

    try {
        const newNote = new note_model({
            userId: req.user._id, // Use the user ID from the token
            title: data.title,
            content: data.content,
        });
        await newNote.save(); // Save the note to the database
        return res.status(200).json({ message: "Note created successfully" });
    }
    catch {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/fetch/:noteId", authToken, async (req, res) => {
    const noteId = req.params.noteId; // Get the note ID from the request parameters
    try {
        const note = await note_model.findOne({ _id: noteId, userId: req.user._id }); // Find the note by ID
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        return res.status(200).json(note); // Return the note data
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/edit/:noteId", authToken, checkSchema(noteValidationSchema), async (req, res) => {
    const noteId = req.params.noteId; // Get the note ID from the request parameters
    // Validate the request body against the schema
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const data = matchedData(req);

    try {
        const note = await note_model.findOne({ _id: noteId, userId: req.user._id }); // Find the note by ID
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        note.title = data.title;
        note.content = data.content;

        await note.save(); // Save the note to the database
        return res.status(200).json({ message: "Note updated successfully" });
    }
    catch {
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default router;