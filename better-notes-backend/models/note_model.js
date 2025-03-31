import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        reqired: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Note", noteSchema);