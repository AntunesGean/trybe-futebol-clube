import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/Users';
import user from './mock/user.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota /login', () => {
  let chaiHttpResponse: Response;

  beforeEach(() => {
    sinon.stub(User, 'findOne').resolves(user as User);
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('O login é feito com sucesso', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({
      email: 'user@user.com',
      password: 'secret_user'
    });

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('Quando o campo "password" não é colocado deve retornar um status 400', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({
      email: 'user@user.com',
      password: '' 
    });

    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
  });

  it('Quando o campo "email" não é colocado deve retornar um status 400', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({
      email: '',
      password: 'secret_user'
    });

    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
  });

  it('Retorna 401 caso os campos "email" ou "password" estejam incorretos', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({
      email: 'user@user.com',
      password: 'secret'
    });

    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });
  });
});
