# repairwala
# repairwala
src/

config/ – database connection, environment config

models/ – Mongoose schemas

controllers/ – request handlers (req, res logic)

services/ – business logic (talks to models)

routes/ – route definitions using Express Router

middlewares/ – auth, validation, error handlers, logging

utils/ – helpers (JWT, email, formatting, etc.)

app.js – create Express app, apply middleware, mount routes

server.js – start HTTP server and connect DB