// Feito com IA :)

import { Request, Response } from 'express';
import prisma from '../../database';

class RespondQuestionController {
    async handle(req: Request, res: Response) {
        const { quizId } = req.params;
        const { answers, name } = req.body;

        try {
            // Busca o quiz completo
            const quiz = await prisma.quiz.findUnique({
                where: { id: quizId },
                include: {
                    questions: {
                        include: {
                            options: true
                        }
                    }
                }
            });

            if (!quiz) {
                res.status(404).json({ error: 'Quiz não encontrado' });
                return;
            }

            let correctCount = 0;

            // Calcula o número de acertos
            answers.forEach((userAnswer: { questionId: string; optionId: string }) => {
                const question = quiz.questions.find(q => q.id === userAnswer.questionId);
                const correctOption = question?.options.find(o => o.isCorrect);
                if (correctOption?.id === userAnswer.optionId) {
                    correctCount++;
                }
            });

            // Calcula a pontuação: acertos / total
            const score = (correctCount / quiz.questions.length) * 100;  

            // Salva o resultado no banco
            const savedAnswer = await prisma.answer.create({
                data: {
                    name,
                    score,
                    quizId
                }
            });
 
            res.status(201).json({
                message: 'Resposta registrada com sucesso',
                answerId: savedAnswer.id,
                name: savedAnswer.name,
                score: savedAnswer.score,
                quizId: savedAnswer.quizId
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao processar a resposta do quiz' });
        }
    }
}

export { RespondQuestionController };
