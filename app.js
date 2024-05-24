const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/v1/auth");
const usersRouter = require("./routes/v1/user");
const categoryRouter = require("./routes/v1/category");
const productRouter = require("./routes/v1/product");
const orderRouter = require("./routes/v1/order");
const commentRouter = require("./routes/v1/comment");
const ticketRouter = require("./routes/v1/ticket");
const todoRouter = require("./routes/v1/todo");
const noteRouter = require("./routes/v1/note");
const offRouter = require("./routes/v1/off");
const notifRouter = require("./routes/v1/notification");
const costRouter = require("./routes/v1/cost");
const eventRouter = require("./routes/v1/event");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, PUT, POST, DELETE",
  credentials: true,
  allowedHeaders:
    "Content-Type, Authorization, Content-Length, X-Requested-With",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors());

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/products/covers",
  express.static(path.join(__dirname, "public", "products", "covers")),
);
app.use(
  "/users/avatar",
  express.static(path.join(__dirname, "public", "users", "avatar")),
);

app.use("/v1/auth", authRouter);
app.use("/v1/users", usersRouter);
app.use("/v1/category", categoryRouter);
app.use("/v1/products", productRouter);
app.use("/v1/orders", orderRouter);
app.use("/v1/comments", commentRouter);
app.use("/v1/tickets", ticketRouter);
app.use("/v1/todos", todoRouter);
app.use("/v1/notes", noteRouter);
app.use("/v1/offs", offRouter);
app.use("/v1/notifs", notifRouter);
app.use("/v1/costs", costRouter);
app.use("/v1/events", eventRouter);

module.exports = app;
