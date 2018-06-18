const Home = require('./homes/models/home.model');

const SharedService = {
  get errors() {
    return {
      MISSING_PROPS: {
        HOME_ID: 'The home id is missing',
        ANIMAL_ID: 'The home id or animal id are missing',
        USER_ID: 'The user id is missing',
        HOME_OBJECT: 'Either the home id, or the home object are missing',
        ANIMAL_OBJECT: 'Either the home id, animal id, or the animal object are missing',
        USER_OBJECT: 'Either the user id, or the user object are missing',
        BAD_NEW_HOME: 'Home object should contain: address, images, check in date, check out date and description',
        BAD_NEW_ANIMAL: 'Animal object should contain: name, type, age and description',
        BAD_NEW_USER: 'User object should contain: name, phone, email and photo',
      }
    }
  },

  get messages() {
    return {
      CREATE: {
        HOME: 'A new home has been created successfully',
        ANIMAL: 'Animal created and saved to home',
        USER: 'A new user has been created successfully'
      },
      UPDATE: {
        HOME: 'The home has been updated successfully',
        ANIMAL: 'The animal has been updated successfully',
        USER: 'The user has been updated successfully'
      },
      DELETE: {
        HOME: 'The home has been deleted successfully',
        ANIMAL: 'The animal has been deleted successfully',
        USER: 'The user has been deleted successfully'
      },
    }
  },

  getHome(homeId, cb) {
    Home.findById(homeId, (error, home) => {
      if (error) {
        return cb(error, null);
      }

      return cb(null, home);
    });
  },

  getAnimal(homeId, animalId, cb) {
    Home.findById(homeId, (error, home) => {
      if (error) {
        return cb(error, null);
      }

      return cb(null, home.animals.id(animalId));
    });
  },

  handleErrors(message, res) {
    res.status(400).json({ message });
  },

  handleSuccess(message, res) {
    res.status(200).json({ message });
  }
};

module.exports = SharedService;