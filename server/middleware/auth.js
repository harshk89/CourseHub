import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretString = process.env.SECRET_STRING;

const auth = async (req, res, next) => {
    
    try {
        if(req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];

            if(token) {
                const decodedData = jwt.verify(token, secretString);
                req.user_id = decodedData?.user_id;
            }
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;