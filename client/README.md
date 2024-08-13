# Client (React.js)

For the client, we will also deploy it to `Kubernetes Pod`.

## This client will act as a server that serves HTML, CSS, and Javascript file

Flow:
- User navigates to the client via web browser
- Will redirect to a Kubernetes pod (not directly, but from load balancer, ingress, and to the cluster, and pod) that lives a React App Dev Server.
- React App Dev Server will return HTML, CSS, and JavaScript.

Important Notes:
- Actual requests from the website will be done via browser
- So, no direct request between React Pod to any backend microservices pod.
