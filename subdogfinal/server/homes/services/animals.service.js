const Home = require('../models/home.model');
const Animal = require('../models/animal.model').model;
const SharedService = require('../../shared.service');

const homesService = {
  getAnimals(req, res) {
    const homeId = req.params.homeId;

    if (!homeId) {
      SharedService.handleErrors(SharedService.errors.MISSING_PROPS.HOME_ID, res);
      return;
    }

    Home.findById(homeId, (error, home) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      return res.json(home.animals);
    });
  },

  getAnimal(req, res) {
    const homeId = req.params.homeId;
    const animalId = req.params.animalId;
    console.log(animalId);

    if (!homeId || !animalId) {
      SharedService.handleErrors(SharedService.errors.MISSING_PROPS.ANIMAL_ID, res);
      return;
    }

    SharedService.getAnimal(homeId, animalId, (error, animal) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      return res.json(animal);
    });
  },

  addAnimal(req, res) {
    const homeId = req.params.homeId;
    const animalObject = req.body.animal;

    if (!homeId) {
      SharedService.handleErrors(SharedService.errors.MISSING_PROPS.ANIMAL_ID, res);
      return;
    }
    if (!animalObject) {
      SharedService.handleErrors(SharedService.errors.MISSING_PROPS.ANIMAL_OBJECT, res);
      return;
    }

    const requiresKeys = ['name', 'type', 'age', 'description'];
    requiresKeys.forEach(prop => {
      if (!animalObject.hasOwnProperty(prop)) {
        SharedService.handleErrors(SharedService.errors.MISSING_PROPS.BAD_NEW_ANIMAL, res);
        return;
      }
    });

    const animal = new Animal(animalObject);
    SharedService.getHome(homeId, (error, home) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      home.animals.push(animal);
      home.save((error) => {
        if (error) {
          res.status(400).json(error);
        return;
        }

        SharedService.handleSuccess(SharedService.messages.CREATE.ANIMAL, res);
      });
    });
  },

  editAnimal(req, res) {
    const homeId = req.params.homeId;
    const animalId = req.params.animalId;
    const animalObject = req.body.animal;

    if (!homeId || !animalId || !animalObject) {
      SharedService.handleErrors(SharedService.errors.MISSING_PROPS.ANIMAL_OBJECT, res);
      return;
    }

    SharedService.getHome(homeId, (error, home) => {
      if (error) {
        res.status(400).json(error);
        return;
      }

      const oldAnimalObject = home.animals.id(animalId);
      Object.assign(oldAnimalObject, animalObject);
      home.save((error) => {
        if (error) {
          res.status(400).json(error);
        return;
        }

        SharedService.handleSuccess(SharedService.messages.UPDATE.ANIMAL, res);
      });
    });
  },

  deleteAnimal(req, res) {
    const homeId = req.params.homeId;
    const animalId = req.params.animalId;

    if (!homeId || !animalId) {
      SharedService.handleErrors(SharedService.errors.MISSING_PROPS.ANIMAL_ID, res);
      return;
    }

    SharedService.getHome(homeId, (error, home) => {
      home.animals.id(animalId).remove();

      home.save((error) => {
        if (error) {
          res.status(400).json(error);
        return;
        }

        SharedService.handleSuccess(SharedService.messages.DELETE.ANIMAL, res);
      });
    });
  }
};

module.exports = homesService;