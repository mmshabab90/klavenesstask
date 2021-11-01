const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();
const filename = "./sampleData.json";
const data = require(filename);

app.use(express.json());
app.use(cors());

app.get("/api/contracts", (req, res) => {
  res.status(200).json(data);
});

app.get("/api/contract/:id", (req, res) => {
  const id = req.params.id;
  const obj = data.find((item) => item.contractId === id);

  if (!obj) return res.status(404).send(`No data available with ID: ${id}`);

  res.status(200).json(obj);
});

app.patch("/api/contract/:id", (req, res) => {
  const id = req.params.id;
  const obj = data.find((item) => item.contractId === id);
  const contractId = req.body.contractId;

  if (!obj) {
    res.status(404).send(`No data available with ID: ${id}`);
    return;
  }

  if (contractId)
    return res.status(400).send("Not allowed to change contract ID!");

  obj.company = req.body.company;
  fs.writeFile(filename, JSON.stringify(data), function writeJSON(err) {
    if (err) return console.log(err.message);
    console.log(JSON.stringify(data, null, 2));
  });
  res.status(201).json(obj);
});

const port = process.env.PORT || 1337;
app.listen(port, () => console.log(`Server is running on port: ${port}`));
