import { Router } from "express";
import { showLogin, logout, authenticate } from "./controllers.js";

export const routes = new Router();

routes.get('/login', showLogin);
routes.post('/login', authenticate);
routes.get('/logout', logout)
