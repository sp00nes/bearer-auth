'use strict';

const { userModel } = require('../models/index.js');

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { next('Invalid Login');}

    let authType = req.headers.authorization.split(' ')[0];
    if(authType === 'Bearer'){
      let token = req.headers.authorization.split(' ')[1];
      console.log('token form bearer middleware', token);

      let validUser = await userModel.authenticateBearer(token);
      // is this strong enough validation???
      if(validUser){
        req.user = validUser;
        next();
      }
    } else {
      next('send a token in a bearer auth string');
    }
    // const token = req.headers.authorization.split(' ').pop();
    // const validUser = await userModel.authenticateBearer(token);

    // req.user = validUser;
    // req.token = validUser.token;

  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
};
