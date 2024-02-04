import express from "express";
import helmet from "helmet";

import passport from "./config/saml-auth";
import router from "./routes";
import "dotenv/config";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(helmet());

app.use(passport.initialize());
// app.use(passport.session());

app.use("/user", router);

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
