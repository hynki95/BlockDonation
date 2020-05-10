var express = require('express');
var router = express.Router();

router.get('/joinIndiv',function(req,res){
    res.render('joinIndiv');
});

module.exports = router;