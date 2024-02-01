"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
app.get("/", function (req, res) {
    res.send("Hello from Server");
});
app.listen(3000, function () {
    console.log("Server started at port 3000");
});
