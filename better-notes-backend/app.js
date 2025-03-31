import express from 'express';
import notesRouter from './routes/notes.js';
import { checkSchema, ExpressValidator, matchedData, validationResult } from 'express-validator';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authToken from './utilities.js';
import config from "./config.json" assert { type: "json" };
import jwt from 'jsonwebtoken';
import userValidationSchema from './validation/user_validation.js';
import userModel from './models/user_model.js';

const app = express();
const port = 3000;


app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors(
    {
        origin: '*', // Allow requests from this origin
    }
)); // Enable CORS for all routes

mongoose.connect(config.connectionString);
dotenv.config(); // Load environment variables from .env file

app.post('/create-account', checkSchema(userValidationSchema), async (req, res) => {
    //Validate the request body against the schema
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const data = matchedData(req);
    const isUser = await userModel.findOne({ email: data.email });

    //Check if the user already exists
    if (isUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    //Create a new user
    const newUser = new userModel({
        email: data.email,
        password: data.password
    });
    console.log(newUser);
    //Save the user to the database
    await newUser.save();
    const accessToken = jwt.sign({ _id: newUser._id, email: newUser.email }, process.env.Access_Token_Secret, { expiresIn: '1h' });
    return res.status(201).json({ message: 'User created successfully', accessToken });
});

app.post('/login', checkSchema(userValidationSchema), async (req, res) => {
    //Validate the request body against the schema
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const data = matchedData(req);
    const isUser = await userModel.findOne({ email: data.email });

    //Check if the user exists
    if (!isUser) {
        return res.status(400).json({ message: 'User does not exist' });
    }
    //Check if the password is correct
    if (isUser.password !== data.password) {
        return res.status(401).json({ message: 'Incorrect password' });
    }
    //Create a new token
    const accessToken = jwt.sign({ _id: isUser._id, email: isUser.email }, process.env.Access_Token_Secret, { expiresIn: '1h' });
    return res.status(200).json({ message: 'User logged in successfully', accessToken });
});

app.use('/notes', notesRouter); // Use the notes router for all routes starting with /notes


app.listen(port, () => {
    console.log(`Server online on port ${port}`)
});