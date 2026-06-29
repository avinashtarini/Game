import express, { Express } from "express"
import cors from "cors"

import { healthRouter } from "./routes/health.routes"
import { roomRouter } from "./routes/room.routes"
import { gameRouter } from "./routes/game.routes"
import { moveRouter } from "./routes/move.routes"

export const app: Express = express()

app.use(cors())

app.use(express.json())

app.use("/health", healthRouter)
app.use("/rooms", roomRouter)
app.use("/games", gameRouter)
app.use("/games", moveRouter)
