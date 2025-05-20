import { Request, Response } from "express";

class TesteController {
    async handle(req: Request, res: Response) {
        const { mensagem } = req.params

        try {
            const response = mensagem
            res.status(201).json(response)
        } catch (error) {
            console.error(error)
        }
    }
}

export { TesteController }