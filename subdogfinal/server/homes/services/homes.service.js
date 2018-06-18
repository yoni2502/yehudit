const Home = require('../models/home.model');
const SharedService = require('../../shared.service');

const HomesService = {
  getHomes(req, res) {
    Home.find({}, (error, homesList) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      res.json(homesList);
    });
  },

  getHome(req, res) {
    const homeId = req.params.homeId;

    if (!homeId) {
      SharedService.handleErrors(SharedService.errors.MISSING_PROPS.HOME_ID, res);
      return;
    }

    SharedService.getHome(homeId, (error, home) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      res.json(home);
    });
  },

  addHome(req, res) {
    const homeObject = req.body.home;

    if (!homeObject) {
      SharedService.handleErrors(SharedService.errors.MISSING_PROPS.HOME_OBJECT, res);
      return;
    }

    homeObject.animals = [];
    const requiresKeys = ['address', 'imageUrls', 'checkInDate', 'checkOutDate', 'image', 'description'];
    requiresKeys.forEach(prop => {
      if (!homeObject.hasOwnProperty(prop)) {
        SharedService.handleErrors(SharedService.errors.MISSING_PROPS.BAD_NEW_HOME, res);
        return;
      }
    });

    const home = new Home(homeObject);
    home.save((error) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      SharedService.handleSuccess(SharedService.messages.CREATE.HOME, res);
    });
  },

  editHome(req, res) {
    const homeId = req.params.homeId;
    const homeObject = req.body.home;

    if (!homeId || !homeObject) {
      SharedService.handleErrors(SharedService.errors.MISSING_PROPS.HOME_ID, res);
      return;
    }

    Home.update({ _id: homeId }, { $set: homeObject}, (error) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      SharedService.handleSuccess(SharedService.messages.UPDATE.HOME, res);
    });
  },

  deleteHome(req, res) {
    const homeId = req.params.homeId;

    if (!homeId) {
      SharedService.handleErrors(SharedService.errors.MISSING_PROPS.HOME_ID, res);
      return;
    }

    Home.deleteOne({ _id: homeId }, function (err) {
      if (err) {
        res.status(400).json(error);
        return;
      }

      SharedService.handleSuccess(SharedService.messages.DELETE.HOME, res);
    });
  }
};

module.exports = HomesService;