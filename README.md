# wonde-calendar

Renders a view of the current week for the selected teacher. Showing the teacher's classes and students within those classes.

Consists of a front end and back end service.
The front end renders all components and makes calls to the backend which are routed using expressjs for requests to the Wonde API.

## Structure

The project is structured as follows:

- `frontend/`: Contains the front-end service, built with React
- `backend/`: Contains the back-end service, implemented using Node.js and Express.js.

The `frontend/` directory includes the client-side code responsible for rendering the user interface and making requests to the back-end API.
Rhe `backend/` directory contains the server-side code responsible for handling API requests and communicating with the Wonde API. Built using Node.js, Express.js,

## Running

1. Clone the repo
2. .env files with placeholders have been provided, update both the /backend/.env and /frontend/.env files with your values.
3. install dependencies with `npm install` for both services.
4. start the services by running `npm start` in the root `wonde-calendar` directory -- alternatively you can start them each seperately with the same command run in /backend and /frontend
5. open the application by navigating to http://localhost:3000
