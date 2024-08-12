# Very Basic Microservices with React, Node.js & Express.js 

## Event Driven Architecture (Event Bus Design Pattern)

This is a very basic proof-of-concept app for my learning in the implementation of event driven architecture for asynchronous communication between backend microservices.
- Client is using React.js
- Backend is using Express.js (Node.js)

Client interacts to different backend microservices.

Backend is divided into several microservices (see resources below). They communicate by implementing Event Driven Architecture, where I create my own simple implementation of event-bus (using express.js) that acts as a message broker.


As I learn gradually, I will introduce more advanced and off-the-shelf tools. (for example like Kafka, RabbitMQ for the Event Bus implementation).


## Resources
There are 6 different resources in this repo:
- `client`: for user interfaces, using React.
- `comments`: microservices handling comment.
- `posts`: microservices handling posts.
- `query`: microservices that pre-process complex relational queries (between posts and comments). only a presentational logic.
- `event-Bus`: to acts as a message broker.
- `moderation`: microservices handling comment moderation (approved/rejected)

#### Notes
- This is not a production grade code, as I don't implement the best practice of microservices architecture, just yet. I'm creating my own implementation from scratch. 
- There are no databases as well.
- This POC app is created alongside following an Udemy course, thanks to Stephen Grider. (https://www.udemy.com/course/microservices-with-node-js-and-react)