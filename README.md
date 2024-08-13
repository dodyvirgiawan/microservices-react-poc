# Very Basic Microservices with React, Node.js & Express.js 

---

## Microservice, Event Driven Architecture


This is a very basic proof-of-concept app for my learning in the implementation of event driven architecture for asynchronous communication between backend microservices.


### Frontend (React.js)
Client interacts to different backend microservices.
- `client`: for user interfaces, using React.

### Backend (Node.js / Express.js)
Backend is divided into several microservices (see below). They communicate by using Event Driven approach, where I create a simple implementation of event-bus (using express.js) that acts as a message broker.

- `comments`: microservices handling comment.
- `posts`: microservices handling posts.
- `query`: microservices that pre-process complex relational queries (between posts and comments). only a presentational logic.
- `event-Bus`: to acts as a message broker.
- `moderation`: microservices handling comment moderation (approved/rejected)


As I learn gradually, I will implement more advanced and off-the-shelf tools. (for example like `Kafka, RabbitMQ` for the Event Bus implementation).

#### Available Events

- `PostCreated`:
  - `Publisher`: `Posts Service`
  - `Consumer`: `Query Service`

- `CommentCreated`:
  - `Publisher`: `Comments Service`
  - `Consumer`: `Query Service` & `Moderation Service`

- `CommentModerated`:
  - `Publisher`: `Moderation Service`
  - `Consumer`: `Comments Service`

- `CommentUpdated`:
  - `Publisher`: `Comments Service`
  - `Consumer`: `Query Service`

#### Event Retry Mechanisms
Currently, the retry mechanism for synchronizing event is done as follows:

- `Event Bus` will store all the events that has occured into their persisted state (for now, no DB, only memory).
- If a `microservice` becomes offline, and becomes online again, it will `fetch all the events` that is stored inside `EventBus` store data, and evaluate each event one by one, ensuring consistency.

---

### Deployments (Docker, Kubernetes)

This app has an `infra` folder that host all the YML configuration file for creating docker image & kubernetes deployment. Please refer to the `README.md` file inside the `infra folder`.

#### Notes
- This is not a production grade code, as I don't implement best practice of microservices architecture just yet. Goal of this project aims to create a proof of concept of event-bus / event driven architecture.
- There are no databases (only persists data in memory of each microservices).
- This POC app is created alongside following [an Udemy course](https://www.udemy.com/course/microservices-with-node-js-and-react), thanks to Stephen Grider