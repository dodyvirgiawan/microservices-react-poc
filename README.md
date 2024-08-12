# Microservices with React, Node.js & Express.js (Event Driven Architecture)

This is a very basic proof-of-concept app for my learning in the implementation of event driven architecture for asynchronous communication between backend microservices.
- Client is using React.js
- Backend is using Express.js (Node.js)

This is not a production grade code, as I don't implement the best practice of microservices architecture, just yet. I'm creating my own implementation from scratch. 

As I learn gradually, I will introduce more advanced and off-the-shelf tools. (for example like Kafka, RabbitMQ for the Event Bus implementation).

Notes:
- There are no databases as well

## Resources
There are 6 different resources in this repo:
- `Client`: for user interfaces, using React.
- `Comments`: microservices handling comment.
- `Posts`: microservices handling posts.
- `Query`: microservices that pre-process complex relational queries (between posts and comments)
- `Event-Bus`: to acts as a message broker.