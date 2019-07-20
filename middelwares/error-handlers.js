module.exports.notFound= function(req,res,next){
    res.status(404).send('Page Not found');
}


module.exports.handleError = function(err,req,res,next){
    console.log(err);
    res.status(500).send('Something went wrong')
}