import {Router} from "express";
import {Request, Response} from "express";
import path from "path";
const router:Router = Router();

router.get('/', (req: Request, res: Response) => {
    // res.status(200).send('Express Server Online');
    res.status(200).sendFile(path.resolve(__dirname, '../Views/Home.html'));
});

export default router;
