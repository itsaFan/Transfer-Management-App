# A Simple Transfer Request Management Api Server

### Technology Used:

<p align="left">    
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="30"
                height="30" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="30"
                height="30" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg"
           width="30"
                height="30" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="30"
                height="30"/>
                
</p>

## Brief Description

#### About tools:

Express.js, commonly referred to as Express, is a minimal and flexible web application framework for Node.js, a runtime environment that allows developers to execute JavaScript code server-side. Express.js provides a set of tools and features that make it easier to build web applications and APIs. MongoDB stores data in a flexible, JSON-like format called BSON (Binary JSON) and offers features like automatic sharding for horizontal scaling, powerful querying through a flexible query language, and support for geospatial data. It's widely used in web development, mobile apps, and other scenarios where fast, adaptable data storage is essential.

#### Assignment Purpose:

This project is made for RevoU assignment.<br>
The purpose of this assignment is to create a sophisticated Transfer Request Management Api. The Api endpoints will facilitate the interaction between two roles "maker" and "approver" in which each roles will have it own purposes. The api will also have security and integrity using JWT.

#### About this app:

This transfer request management app is made using javascript, express, mongoDB as a database.

- App Features:
  - User Registration:
    - Anyone can register with a field `username, email, password, role`.
    - `username` must not be blank and each `username` is unique.
  - Password Requirements:
    - Each user password must have a minimum length of 8 chars.
    - Is alphanumeric
    - Is hashed when storing in MongoDB database.
  - Authentication & Authorization:
    - Using JWT to authenticated specific endpoints & manage role based control.
  - Roles:
    - User with 'maker' role only able to create or add transfer request.
    - The status of transfer request created is 'pending'
    - User with 'approver' role able to create, approve, and reject transfer request.
    - Anyone without authentication and role authorization will be able to view all the transfer lists.

#### Guide to use this app

1. Git clone this repository.
2. Open the project and start with `npm install`, this will install all dependencies.
3. Create your own `.env` file (this will contain sensitive data or variables for your project.)
   - Below is the example:

```env
PORT=your_defined_port
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Run `npm start` to start the project, you will get a notification like this `Server listening on port PORT_NUMBER` & `Successfully connect to MongoDb`
5. Now you have successfully run the project.
6. Try and see the api-documentation by accessing `localhost:PORT_NUMBER/api-docs`

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/zrfmWHEN)
