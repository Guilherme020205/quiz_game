import { Response, Request } from 'express';
import prisma from '../../database';

class ListAnswerOneQuizController {
    async handle(req: Request, res: Response) {
        const {quizId} = req.params;
        try {
            const response = await prisma.answer.findMany({
                where: { 
                    quizId: quizId
                }
            })
            res.status(201).json(response)
        } catch (error) {
            res.status(500).json({error:"Erro ao listar"})
        }
    }
}

export { ListAnswerOneQuizController };