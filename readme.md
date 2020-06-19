# Microservices Blog

[Section 2: A Mini-Microservices App](https://www.udemy.com/course/microservices-with-node-js-and-react/)


- which services will we recreate? One separate service for every _resource_ in our app: Posts and Comments
- Consider the goals and responsibilities of each service
- Dependencies: comments will have to know to tie to certain (existing) post

## App steps
1. Create a new app via create react app `npx create-react-app client`
1. Create an express-based project for the posts service 
`mkdir posts`, `cd posts`, `npm init -y`,
`npm install express cors axios nodemon`
1. Create an express-based project for the comments service, repeat posts process

## Service responsibilities:

__Posts__
- Create a post
- List all posts

__Comments__
- Create a comment
- List all comments

## Determine React component hierarchy

- App
  - PostList
    - CommentList
    - CommentCreate
  - PostCreate

## Create the event bus / query services
- Listen for events
- Change React app to look at query for posts/comments for READing data only
- Posts and Comments services are still used for creating
- Instead of passing the post ID to the CommentsList component, pass the post object returned from query service

## Deployments
- Create Dockerfile in each (query, posts, etc) service folder
- Push Docker images to Docker hub
- Create depl.yaml files for each K8s config; has K8s Service and Deployment information for each
- Add Ingress (`ingress-nginx`) for communication between clusters/pods and Load Balancer
- Add localhost host routes to /etc/host

## Skaffod
- Install Skaffold
- Run with `skaffold dev`