import express from "express";

const app = express();
const port = 3000;
app.use(express.json());

app.get("/webhook", (req, res) => {
  let challenge = req.query["hub.challenge"];
  if (challenge) {
    console.log("WEBHOOK_VERIFIED");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post("/webhook", handleWebhook);

function handleWebhook(req, res) {
  let body = req.body;

  console.log(`\u{1F7EA} Received webhook:`);
  console.dir(body, { depth: null });

  res.status(200).send("EVENT_RECEIVED");
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
