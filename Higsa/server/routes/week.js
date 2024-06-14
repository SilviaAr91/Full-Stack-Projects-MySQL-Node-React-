const express = require('express');
const router = express.Router();
const weekSelector = require('../controllers/weekController'); 

router.get('/:user_id/getWeeks', weekSelector.getWeeks);
router.post('/:user_id/saveWeekSelections', weekSelector.saveWeekSelections);

module.exports = router;
