import express from "express";
import cors from "cors";
import { routes } from "./routes";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.static("public"));
app.use(cors());
routes(app);
app.get("/", (_req, res) => {
  res.status(200).json({
    status: 200,
    message: "Server is running",
  });
});
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));