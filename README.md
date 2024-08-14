# Very Basic Microservices with React, Node.js & Express.js 

---

## Microservice, Event Driven Architecture


This is a very basic proof-of-concept app for my learning in the implementation of event driven architecture for asynchronous communication between backend microservices. So this app is not a production-grade code. I learn creating this microservices architecture alongside following an online course.


### Frontend (React.js)
Client is for the UI interface.
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

### Deployments (Docker, Kubernetes, Skaffold)

This app has an `infra` folder that host all the YML configuration file for creating docker image & kubernetes deployment. Please refer to the `README.md` file inside the `infra folder` for notes.


#### Config Files (High Level View)

There are multiple config files inside the `infra/k8s` folder. We will group them by Kubernetes object to see what config files are there.

##### 1. Pod Object

We don't directly create pod, however you can see `infra/k8s/old` folder on how to create a pod manually.

##### 2. Deployment Object

- Deployment: for managing pods.
  - Resources that implement: `posts` `event-bus` `comments` `moderation` `query` `client`

##### 3. Service Object

- ClusterIP: for inter-pods communication
  - Resources that implement:`posts` `event-bus` `comments` `moderation` `query` `client`

- NodePort: for outside to pods communication
  - Resource that implement: `posts`

##### 5. Others
- We use `ingress-nginx` for load balancer & ingress services. To install [click here](https://kubernetes.github.io/ingress-nginx/deploy/#quick-start)
- For the client app (React.js), we also deploy into a separate pods. And we will run the react dev server.
- For easier in development, `skaffold.yaml` is also provided. Make sure you install skaffold first before running `skaffold dev` through the root project directory.

---
### Takeaways

#### Lesson Learned
- One big challenge in microservices is data (communicating, synchronizing between services)
- There are 2 ways to share data between services:
  - Synchronous communication
  - Asynchronous communication: using events sent to event bus
- Asynchronous communication encourage each service to be self sufficient (can run in isolation, no coupling between other services, easy to handle temporary downtime or new service creation). 
- Docker makes it easier to package up services
- Kubernetes makes it easier to deploy + scale each services (each docker container run inside pods - the smallest unit in kubernetes)

#### Pain Points
- Lots of duplicated code (each express.js service)
- Hard to picture and test the flow of events between services, and what are the payloads, etc.
- The current event bus is still premature (too many concurrency issues). Too many edge cases are still not considered. Example: what if an event that is supposed to occur after other event, showed up first. This can break our application.

#### What's next? (for me, at least)
From these pain points, I will continue the online course and try to build microservices architecture with production grade code and/or workflows.

---

### Notes
- This is not a production grade code, as I don't implement best practice of microservices architecture just yet. Goal of this project aims to create a proof of concept of event-bus / event driven architecture.
- There are no databases (only persists data in memory of each microservices).
- If you want to have any discussion, feel free to reach me out via `LinkedIn` or email `dody.virgiawan97@gmail.com`