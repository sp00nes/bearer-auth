'use strict';

const { userModel } = require('../models/index.js');

async function handleSignup(req, res, next) {
  try {
    let userRecord = await userModel.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleSignin(req, res, next) {
  try {
    const user = {
      user: req.user,
      token: req.user.token,
    };
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    const userRecords = await userModel.findAll({});
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function handleSecret(req, res, next) {
  res.status(200).send(`Welcome to the secret area!`);
}

function handleRead(req, res, next) {
  res.status(200).send('You have read permission');
}

function handleCreate(req, res, next) {
  res.status(200).send('You have create permission');
}

function handleUpdate(req, res, next) {
  res.status(200).send('You have update permission');
}

function handleDelete(req, res, next) {
  res.status(200).send('You have delete permission');
}

module.exports = {
  handleSignup,
  handleSignin,
  handleGetUsers,
  handleSecret,
  handleRead,
  handleCreate,
  handleUpdate,
  handleDelete,
};
