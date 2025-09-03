# Project-Backend

## Overview ## 

Client calls an endpoint (e.g., POST /api/users/login).

server.js receives the request and forwards it to the route handlers under /api.

Route handlers use models (Mongoose) to read/write MongoDB.

For protected routes, authMiddleware verifies the JWT and puts the authenticated user on req.user.

Authorization logic compares req.user._id with resource owner fields (project.user) to allow or deny actions.