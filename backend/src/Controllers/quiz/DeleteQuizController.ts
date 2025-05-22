import { Request, Response } from 'express';
import prisma from '../../database';

class DeleteQuizController {
    async handle(req: Request, res: Response) {
        const { quizId } = req.params;

        try {
            await prisma.option.deleteMany({
                where: {
                    question: {
                        quizId
                    }
                }
            });

            await prisma.question.deleteMany({
                where: { quizId }
            });

            await prisma.answer.deleteMany({
                where: { quizId }
            });

            const response = await prisma.quiz.delete({
                where: { id: quizId }
            });

             res.status(200).json({
                message: 'Quiz deletado com sucesso!',
                quiz: response
            });
        } catch (error) {
            console.error(error);
             res.status(500).json({ error: 'Erro ao deletar quiz' });
        }
    }
}

export { DeleteQuizController };
