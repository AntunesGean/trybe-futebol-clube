import { Router } from 'express';
import Controller from '../controllers/login.controller';
import Service from '../services/login.service';
import Model from '../database/models/Users';
import Middleware from '../middlewares/login.middleware';

const login = Router();
const controller = new Controller(new Service(Model));

login.post(
  '/',
  Middleware.validateLogin,
  (req, res) => controller.findLogin(req, res),
);

login.get(
  '/validate',
  Middleware.validateToken,
  (req, res) => controller.getRole(req, res),
);

export default login;
