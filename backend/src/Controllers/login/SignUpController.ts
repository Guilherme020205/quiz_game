import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import prisma from '../../database';

class SignUpController {
    async handle(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10); // criptografia da senha

        try {
            const response = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword
                }
            })
            res.status(201).json(response)
        } catch (error) {
            console.error(`Erro no cadastro: ${error}`)
        }
    }
}

export { SignUpController };