const router = require( "express" ).Router();

router.use('/security', require('./security'));
router.use('/sse', require('./sse'));
router.get("/", (req, res) => {
  res.send("Hello world");
});

module.exports = router;