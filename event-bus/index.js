const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

//!If other microservices wants a list of event that has occured in the past
const events = [];

app.get('/events', (req, res) => res.send(events));

//!This event bus basic implementation echoes the events received to other microservices
app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  //! Broadcast to post service
  axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
    console.log(err.message);
  });

  // //! Broadcast to comment service
  axios.post("http://comments-srv:4001/events", event).catch((err) => {
    console.log(err.message);
  });

  // //! Broadcast to query service
  axios.post("http://query-srv:4002/events", event).catch((err) => {
    console.log(err.message);
  });

  // //! Broadcast to moderation service
  axios.post("http://moderation-srv:4003/events", event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log('v4');
  console.log("Listening on 4005");
});
