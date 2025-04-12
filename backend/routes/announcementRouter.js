const express = require('express');
const router = express.Router();
const announcementController = require('../controller/announacementController');

router.post('/', announcementController.createAnnouncement);

router.get('/', announcementController.getAllAnnouncements);
router.get('/:id', announcementController.getAnnouncementById);

router.put('/announcements/:id', announcementController.updateAnnouncement);

router.delete('/announcements/:id', announcementController.deleteAnnouncement);

module.exports = router;
