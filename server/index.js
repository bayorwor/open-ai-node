require("dotenv").config();
const express = require("express");
const readline = require("readline");
const { generateMeta } = require("./controllers/openai.controllers");
const morgan = require("morgan");

const openAIRoutes = require("./routes/openai.routes");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/openai", openAIRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started running on PORT : ${port}`));
