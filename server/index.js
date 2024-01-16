import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import cors from 'cors'
import programRoutes from './routes/programs.js';
import userRoutes from './routes/users.js';


dotenv.config();
const app = express();

app.use(cors());

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.use('/programs', programRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});