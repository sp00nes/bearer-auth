'use strict';

//the function is curryed into capabilities so there are no errors

module.exports = (userCapability) => (req, res, next) => {
  try {
    if(req.user.capabilities.includes(userCapability)){
      next();
    } else {
      next('Access Denied');
    }
  } catch(e) {
    next('Invalid Login ({for dev} ACL middleware)');
  }
};
