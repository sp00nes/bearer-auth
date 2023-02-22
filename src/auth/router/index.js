'use strict';

const express = require('express');
const authRouter = express.Router();

const basicAuth = require('../middleware/basic.js');
const bearerAuth = require('../middleware/bearer.js');
const acl = require('../middleware/acl.js');
const {
  handleSignin,
  handleSignup,
  handleGetUsers,
  handleSecret,
  handleRead,
  handleCreate,
  handleUpdate,
  handleDelete,
} = require('./handlers.js');


authRouter.post('/signup', handleSignup);
authRouter.post('/signin', basicAuth, handleSignin);
authRouter.get('/users', bearerAuth, handleGetUsers);
authRouter.get('/secret', bearerAuth, handleSecret);
authRouter.get('/read', bearerAuth, acl('read'), handleRead);
authRouter.post('/create', bearerAuth, acl('read'), handleCreate);
authRouter.put('/update', bearerAuth, acl('update'), handleUpdate);
authRouter.delete('/delete', bearerAuth, acl('delete'), handleDelete);

module.exports = authRouter;
