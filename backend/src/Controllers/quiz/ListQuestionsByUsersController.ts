import { Request, Response } from 'express';
import prisma from '../../database';

class ListQuestionsByUsersController {
    async handle(req: Request, res: Response) {
        const {userId} = req.params;
        try {
            const response = await prisma.quiz.findMany({
                where: {
                    userId
                },
                include: {
                    questions: {
                        include: {
                            options: true
                        }
                    }
                }
            })
            res.status(201).json(response)
        } catch (error) {
            res.status(500).json({erro: 'erro ao listar'})
        }
    }
}

export { ListQuestionsByUsersController };