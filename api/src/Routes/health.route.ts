import Express from "express";
import {Request, Response} from "express";
const router = Express.Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).send('Express Server Online');
});


export default router;
