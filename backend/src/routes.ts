import { Router } from "express";
const router = Router();

import { SignUpController } from "./Controllers/login/SignUpController";
import { SingInController } from "./Controllers/login/SingInController";

import { ListQuestionsByUsersController } from "./Controllers/quiz/ListQuestionsByUsersController";
import { ListOneQuestionsController } from "./Controllers/quiz/ListOneQuestionsController";
import { CreateQuizController } from "./Controllers/quiz/CreatQuizController";
import { DeleteQuizController } from "./Controllers/quiz/DeleteQuizController";
import { RespondQuestionController } from "./Controllers/quiz/RespondQuestionController";

import { ListAnswerOneQuizController } from "./Controllers/Answer/ListAnswerOneQuizController";

router.post("/singup", new SignUpController().handle)
router.post("/singin", new SingInController().handle)

router.get("/quiz/:userId", new ListQuestionsByUsersController().handle)
router.get("/quizone/:quizId", new ListOneQuestionsController().handle)
router.post("/creatquiz", new CreateQuizController().handle)
router.delete("/deletequiz/:quizId", new DeleteQuizController().handle)

router.post('/responde/:quizId', new RespondQuestionController().handle);

router.get("/answer/:quizId", new ListAnswerOneQuizController().handle)

export = router;