import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

import {query} from "../db.js";

dotenv.config();
const secretString = process.env.SECRET_STRING;

export const signin = async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password)

    try {
        const existingUser = await query('SELECT * FROM users WHERE "email" = $1', [email]);

        if(existingUser.rows.length==0) {
            return res.status(404).json({ message: "User doesn't exist." });
        }

        const user = existingUser.rows[0];

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials! "});

        const token = jwt.sign({ email: user.email, user_id: user.user_id }, secretString, { expiresIn: "24h" });
        
        const response = { 
            user_id: user.user_id,
            name: user.name,
            email: user.email
        }
        
        res.status(200).json({ result: response, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
}

export const signup = async (req, res) => {
    var { name, email, password } = req.body;
    // console.log(name, email, password)
    try {
        const existingUser = await query('SELECT * FROM users WHERE "email" = $1', [email]);

        if(existingUser.rows.length > 0) return res.status(400).json({ message: "User already exists." });

        const hashedPassword = await bcrypt.hash(password, 12);
        // console.log(hashedPassword);

        const result = await query('INSERT INTO users ("name", "email", "password") VALUES ($1, $2, $3) RETURNING *', [name, email, hashedPassword]);
        
        const user = result.rows[0];
        
        const token = jwt.sign({ email: user.email, user_id: user.user_id }, secretString, { expiresIn: "24h" });

        const response = { 
            user_id: user.user_id,
            name: user.name,
            email: user.email
        }

        res.status(200).json({ result: response, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
}