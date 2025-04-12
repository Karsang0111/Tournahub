const express = require('express');
const router = express.Router();

const {
    createOrganizer,
    getAllOrganizers,
    getOrganizerById,
    updateOrganizer,
    deleteOrganizer
} = require('../controllers/organizerController');

router.post('/', createOrganizer);

router.get('/', getAllOrganizers);

router.get('/:id', getOrganizerById);

router.put('/:id', updateOrganizer);

router.delete('/:id', deleteOrganizer);

module.exports = router;
