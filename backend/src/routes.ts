import { Router } from "express";
const router = Router();

import { TesteController } from "./Controllers/testeController";

router.get('/test/:mensagem', new TesteController().handle)

export = router;