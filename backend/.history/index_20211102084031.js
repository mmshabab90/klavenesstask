const fs = require("fs");
const express = require("express");
const cors = require("cors");
const Joi = require("joi");
const querystring = require("querystring");
const { SERVER_ROOT_URI, GOOGLE_CLIENT_ID } = require("./config");
const app = express();
const filename = "./sampleData.json";
const data = require(filename);

app.use(express.json());
app.use(cors());

// Joi Validation Section
// Joi Schema
const schema = {
  company: Joi.string().min(3).required(),
  periodEnd: Joi.date().iso().required(),
  periodStart: Joi.date().iso().required(),
  scheduledForRenewal: Joi.boolean().required(),
  negotiationRenewalDate: Joi.date().iso().required(),
};
// Joi Validation Section

// Authentication section
const redirectURI = "/auth/google";
function getGoogleAuthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: `${SERVER_ROOT_URI}/${redirectURI}`,
    client_id: GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  return `${rootUrl}?${querystring.stringify(options)}`;
}
// Getting login URL
app.get("/auth/google/url", (req, res) => {
  return res.send(getGoogleAuthURL());
});
// Getting the user from google with the code
// Getting the current user
// Authentication section

// Route to get all contracts
app.get("/contracts", (req, res) => {
  res.status(200).json(data);
});

// Route to get a single contract
app.get("/contract/:id", (req, res) => {
  const id = req.params.id;
  const obj = data.find((item) => item.contractId === id);

  if (!obj) return res.status(404).send(`No data available with ID: ${id}`);

  res.status(200).json(obj);
});

// Route to create a contract
app.post("/contract", (req, res) => {
  const result = Joi.validate(req.body, schema);
  const obj = data.find((i) => i.company === req.body.company);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  if (obj) {
    res.status(400).send(`Item with ${req.body.company} already exists`);
    return;
  }

  const newId = parseInt(data[data.length - 1].contractId) + 1;

  const newContract = {
    company: req.body.company,
    contractId: newId.toString(),
    periodEnd: req.body.periodEnd,
    periodStart: req.body.periodStart,
    scheduledForRenewal: req.body.scheduledForRenewal,
    negotiationRenewalDate: req.body.negotiationRenewalDate,
  };

  fs.readFile(filename, function (err, data) {
    var json = JSON.parse(data);
    json.push(newContract);

    fs.writeFile(filename, JSON.stringify(json), function writeJSON(err) {
      if (err) return console.log(err.message);
    });
  });
  res.status(201).send(newContract);
});

// Route to edit a contract
app.patch("/contract/:id", (req, res) => {
  const result = Joi.validate(req.body, schema);
  console.log(result);

  const id = req.params.id;
  const obj = data.find((item) => item.contractId === id);
  const contractId = req.body.contractId;

  if (!obj) {
    res.status(404).send(`No data available with ID: ${id}`);
    return;
  }

  if (contractId) {
    res.status(400).send("Not allowed to change contract ID!");
    return;
  }

  obj.company = req.body.company;
  fs.writeFile(filename, JSON.stringify(data), function writeJSON(err) {
    if (err) return console.log(err.message);
    console.log(JSON.stringify(data, null, 2));
  });
  res.status(201).json(obj);
});

// Route to delete a contract
app.delete("/contract/:id", (req, res) => {
  const id = req.params.id;

  const obj = data.find((i) => i.contractId === id);

  if (!obj) {
    res.status(401).send(`Item with ID: ${id} not found!`);
    return;
  }

  const index = data.indexOf(obj);
  data.splice(index, 1);

  fs.writeFile(filename, JSON.stringify(data), function writeJSON(err) {
    if (err) return console.log(err.message);
  });

  res.send(obj);
});

const port = process.env.PORT || 1337;
app.listen(port, () => console.log(`Server is running on port: ${port}`));
