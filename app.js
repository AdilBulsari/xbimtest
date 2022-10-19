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
  const id_number = Number(id);
  if (isNaN(id_number)) {
    res.status(400).send({ message: "id does not exist / invalid id" });
  }
  const data = rooms.filter((room) => room.id === id_number);
  if (data.length === 0) {
    res.status(200).send({ message: `room with id ${id_number} not present` });
  }
  res.status(200).send(data);
});

app.get("/api/rooms/:id/furnitures", (req, res, next) => {
  const { id } = req.params;
  const id_number = Number(id);
  if (isNaN(id_number)) {
    res.status(400).send({ message: "id does not exist / invalid id" });
  }

  const data = rooms.filter((room) => room.id === Number(id));
  if (data.length === 0) {
    res.status(200).send({ message: `room with id ${id_number} not present` });
  }
  res.status(200).send({ furnitures: data[0].furnitures });
});

app.use((req, res) =>
  res.status(404).send({ message: "Route does not exist" })
);

app.listen(9000, () => {
  console.log("connected");
});

module.exports = app;
