'use strict';

const base64 = require('base-64');
const bcrypt = require('bcrypt');
const { userModel } = require('../models/index.js');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) { return  next('Invalid Login/no auth'); }

  let basic = req.headers.authorization;
  let authString = basic.split(' ')[1];
  let decodedAuthStr = base64.decode(authString);
  let [username, pass] = decodedAuthStr.split(':');

  let user = await userModel.findOne({where: {username}});

  try {
    let validUser = await bcrypt.compare(pass, user.password);
    // console.log('VALID USER!!!____________!!!!',validUser);
    if(validUser){
      req.user = user;
      next();
    } else {
      next('Not Authorized (password incorrect');
    }
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

};
