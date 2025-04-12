const express = require('express');
const router = express.Router();
const { createAnalytics, getAllAnalytics, getAnalyticsById, updateAnalytics, deleteAnalytics } = require('../controller/analyticsController');


router.post('/', createAnalytics);

router.get('/', getAllAnalytics);
router.get('/:id', getAnalyticsById);

router.put('/:id', updateAnalytics);

router.delete('/:id', deleteAnalytics);

module.exports = router;
