import * as bodyParser from "body-parser";
import * as express from "express";
import { TaskController } from "./controller/task.controller";
import { APILogger } from "./logger/api.logger";
import swaggerUi = require("swagger-ui-express");
import fs = require("fs");

class App {
  public express: express.Application;
  public logger: APILogger;
  public taskController: TaskController;

  private swaggerFile: any = (process.cwd() + "/swagger/swagger.json");
  private swaggerData: any = fs.readFileSync(this.swaggerFile, "utf8");
  private customCss: any = fs.readFileSync((process.cwd() + "/swagger/swagger.css"), "utf8");
  private swaggerDocument = JSON.parse(this.swaggerData);

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.logger = new APILogger();
    this.taskController = new TaskController();

  }

  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.express.get("/api/tasks", (req, res) => {
      this.taskController.getTasks().then(data => res.json(data));
    });

    this.express.post("/api/task", (req, res) => {
      console.log(req.body);
      this.taskController.createTask(req.body).then(data => res.json(data));
    });

    this.express.put("/api/task", (req, res) => {
      this.taskController.updateTask(req.body).then(data => res.json(data));
    });

    this.express.delete("/api/task/:id", (req, res) => {
      this.taskController.deleteTask(req.params.id).then(data => res.json(data));
    });

    this.express.get("/healthcheck", (req, res, next) => {
      res.status(200).send("App works!");
    });

    this.express.use("/api/docs", swaggerUi.serve, swaggerUi.setup(this.swaggerDocument, null, null, this.customCss));
  }
}

export default new App().express;