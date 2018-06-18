const express = require('express');
const homesService = require('./services/homes.service');
const animalsService = require('./services/animals.service');

const router = express.Router();

// GET /homes - Get all homes
router.get('/', homesService.getHomes);
// Get /homes/{homeId} - Get home by ID
router.get('/:homeId', homesService.getHome);
// Get /homes/{homeId}/animals/ - Get All animals for home by ID
router.get('/:homeId/animals/', animalsService.getAnimals);
// Get /homes/{homeId}/animals/{animalId} - Get animal by ID in a specific home (by ID)
router.get('/:homeId/animals/:animalId', animalsService.getAnimal);

router.post('/', homesService.addHome);
router.post('/:homeId/animals/', animalsService.addAnimal);

router.put('/:homeId', homesService.editHome);
router.put('/:homeId/animals/:animalId', animalsService.editAnimal);

router.delete('/:homeId', homesService.deleteHome);
router.delete('/:homeId/animals/:animalId', animalsService.deleteAnimal);

module.exports = router;