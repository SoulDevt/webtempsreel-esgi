const router = require( "express" ).Router();

router.use('/security', require('./security'));
router.use('/sse', require('./sse'));

module.exports = router;