import { Router } from "express";
import {listCars, showCar, createCar, editCar, storeCar, updateCar, deleteCar} from "./controllers.js";
import { checkAuth } from "../auth/controllers.js";
export const routes = new Router();




//car routes

routes.get('/', listCars);

routes.get('/create', checkAuth, createCar);

routes.post('/', checkAuth, storeCar);

routes.get('/:id/edit', checkAuth, editCar);

routes.get('/:id/delete', checkAuth, deleteCar);

routes.get('/:id', showCar);

routes.post('/:id', checkAuth, updateCar);
