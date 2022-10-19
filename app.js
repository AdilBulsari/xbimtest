const express = require("express");
const cors = require("cors");
const rooms = require("./data/rooms");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/rooms", (req, res, next) => {
  const data = rooms.map((room) => room.name);
  res.status(200).send(data);
});

app.get("/api/rooms/:id", (req, res, next) => {
  const { id } = req.params;
  const id_number = id;
  if (typeof id_number !== "number") {
    res.status(500).send({ message: "does not exist" });
  }
  const data = rooms.filter((room) => room.id === id_number);
  res.status(200).send(data);
});

app.get("/api/rooms/:id/furnitures", (req, res, next) => {
  const { id } = req.params;
  const data = rooms.filter((room) => room.id === Number(id));

  res.status(200).send({ furnitures: data[0].furnitures });
});

app.use("*", (err, req, res, next) => {
  res.status(500).send({ msg: "does not exist" });
});

app.listen(9000, () => {
  console.log("connected");
});

module.exports = app;
