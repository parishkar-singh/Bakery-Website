import Express from "express";
import {getLatestUpdateHandler,createUpdateHandler,getUpdateHandler} from "../Controllers/update.controller";
// Routes
const router = Express.Router();

router.get('/',getUpdateHandler);
router.post('/',createUpdateHandler);
router.get('/latest',getLatestUpdateHandler);
export default router;
