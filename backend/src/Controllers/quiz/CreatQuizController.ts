import { Response, Request } from 'express';
import prisma from '../../database';

class CreateQuizController {
    async handle(req: Request, res: Response) {
        const { title, userId, questions } = req.body;

        try {
            const response = await prisma.quiz.create({
                data: {
                    title,
                    user: {
                        connect: { id: userId }
                    },
                    questions: {
                        create: questions.map((question: { text: string; options: { text: string; isCorrect: boolean }[] }) => ({
                            text: question.text,
                            options: {
                                create: question.options.map((option) => ({
                                    text: option.text,
                                    isCorrect: option.isCorrect
                                }))
                            }
                        }))
                    }
                },
                include: {
                    questions: {
                        include: {
                            options: true
                        }
                    }
                }
            });
            res.status(201).json(response)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao criar quiz' });
        }
    }
}

export { CreateQuizController };
