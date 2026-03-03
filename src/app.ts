import express , {Request, Response} from "express"
import { logger } from "./middleware/eventLogger"
import { router } from "./routes/routes";
export const app = express()

//custom middlewares
app.use(logger)
//in built middle wares
app.use(express.json())

app.use("/api", router);