const router = require( "express" ).Router();

router.use('/security', require('./security'));

module.exports = router;