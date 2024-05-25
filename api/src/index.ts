import * as dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import WebSocket from "ws";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/public/images", express.static(__dirname + "/public/images"));
app.use("/public", express.static("public"));

module.exports = app;
