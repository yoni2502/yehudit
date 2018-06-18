const User = require('./user.model');
const SharedService = require('../shared.service');

const UsersService = {
  getUser(req, res) {
    const id = req.params.userId;

    User.findById(id, (error, user) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      res.json(user);
    });
  },

  createUser(req, res) {
    const userObject = req.body.user;

    if (!userObject) {
      SharedService.handleErrors(SharedService.errors.MISSING_PROPS.USER_OBJECT, res);
      return;
    }

    const requiresKeys = ['name', 'phone', 'email', 'photo'];
    requiresKeys.forEach(prop => {
      if (!userObject.hasOwnProperty(prop)) {
        SharedService.handleErrors(SharedService.errors.MISSING_PROPS.BAD_NEW_USER, res);
        return;
      }
    });

    const user = new User(userObject);
    user.save((error) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      SharedService.handleSuccess(SharedService.messages.CREATE.USER, res);
    });
  },

  updateUser(req, res) {
    const userId = req.params.userId;
    const userObject = req.body.user;

    if (!userId || !userObject) {
      SharedService.handleErrors(SharedService.errors.MISSING_PROPS.USER_ID, res);
      return;
    }

    User.update({ _id: userId }, { $set: userObject}, (error) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      SharedService.handleSuccess(SharedService.messages.UPDATE.USER, res);
    });
  },

  deleteUser(req, res) {
    const userId = req.params.userId;

    if (!userId) {
      SharedService.handleErrors(SharedService.errors.MISSING_PROPS.USER_ID, res);
      return;
    }

    User.deleteOne({ _id: userId }, function (err) {
      if (err) {
        res.status(400).json(error);
        return;
      }

      SharedService.handleSuccess(SharedService.messages.DELETE.USER, res);
    });
  },
};

module.exports = UsersService;