import { Request, Response } from 'express';
import prisma from '../../database';

class ListOneQuestionsController {
    async handle(req: Request, res: Response) {
        const {quizId} = req.params;
        try {
            const response = await prisma.quiz.findFirst({
                where: {
                    id: quizId
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

export { ListOneQuestionsController };