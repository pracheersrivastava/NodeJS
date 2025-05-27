import { Router } from "express";
import {listCars, showCar} from "./controllers.js";

export const routes = new Router();


routes.get('/', listCars);

routes.get('/:id', showCar);