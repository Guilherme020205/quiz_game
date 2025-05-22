import { Response, Request } from 'express';
import prisma from '../../database';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

class SingInController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const userExist = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });

            if (!userExist) {
                res.status(404).json({ error: 'The user does not exist' });
                return
            }

            const passwordValid = await bcrypt.compare(password, userExist.password);
            if (!passwordValid) {
                res.status(401).json({ error: 'Password incorrect' });
                return

            }


            const token = jwt.sign(
                {
                    userId: userExist.id,
                    name: userExist.name,
                    email: userExist.email,
                },
                process.env.JWT_SECRET as string,
                { expiresIn: '30d' }
            );

            res.status(200).json({ message: 'Login ok', token });
        } catch (error) { 
            res.status(500).json({ error: 'Erro login' });
        }
    }
}

export { SingInController }