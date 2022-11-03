import { Router } from 'express';
import Service from '../services/teams.service';
import Model from '../database/models/Teams';
import Controller from '../controllers/teams.controller';

const teams = Router();
const controller = new Controller(new Service(Model));

teams.get('/', controller.findAllTeams);

teams.get('/:id', controller.findById);

export default teams;
