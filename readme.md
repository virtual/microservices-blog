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