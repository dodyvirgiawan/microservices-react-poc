# Kubernetes Infrastructure Files

## Config Files (High Level View)

There are multiple config files inside the `infra/k8s` folder. We will group them by Kubernetes object to see what config files are there.

### 1. Pod Object

We don't directly create pod, however you can see `infra/k8s/old` folder on how to create a pod manually.

We will create Pod via Deployment object below (and more on why in notes on the last section).

### 2. Deployment Object

- Deployment: for managing pods.
  - `posts-depl.yaml` `event-bus-depl.yaml`

### 3. Service Object

- ClusterIP: for inter-pods communication
  - `posts-depl.yaml` `event-bus-depl.yaml`

- NodePort: for outside to pods communication
  - `posts-srv.yaml`

---
## Notes

### I. Creating a Pods via Kubernetes Deployment

Why `Kubernetes Deployment`
- It can mantain the number of pods running (restart if any pod crashes, etc).
- Gradual version release. If we release a new version, deployment will create pods with our new app version (in parallel with older version). Deployment will sunset the older version once it has been fully routed to the newest version.

Example for posts service:
- Make sure to build the posts service docker image
  - `cd posts`
  - `docker build -t dodyvirgiawan/posts:0.0.1`
- Push to Docker Hub
  - `docker push dodyvirgiawan/posts`
- Tell Kubernetes to use this config file to create a deployment
  - `cd infra/k8s`
  - `kubectl apply -f posts-depl.yaml`
- Verify if the deployment is running:
  - `kubectl get deployments`

#### Verifying if it is working
- Try deleting a pod, and see if the deployment will recreate that new pod
  - `kubectl get pods`
  - `(Copy the name of the pods that is running)` 
  - `kubectl delete pod <running pod name>`
  - `kubectl get pods` now another pod will run, but with different pod name than the previously deleted. this confirm our deployment works

#### If a new version release
- If we want to update our pod to run latest image of posts service, run:
  - `kubectl rollout restart deployment <running deployment name>`

---

### II. Configuring Communication

#### a. Communication between pods and outside access

##### Node Port Service `(posts-srv.yaml)`
- Feed the config service file to k8s
  - `kubectl apply -f posts-srv.yaml`
- Find out the `NodePort` to actually access the app
  - `kubectl describe service <service name>`

Notes: 
  - `NodePort` is the actual port to access from outside.
  - `Port` is the port inside Node Port service to route the outside connection from.
  - `TargetPort` is the port in our pod running an Express.js app (which uses port 4000)

##### Load Balancer Service

...


#### b. Communication between each pods

