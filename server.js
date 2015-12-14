// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/remixjobsdb'); // connect to our database

var Job     = require('./app/models/job');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.route('/jobs')

    // create a bear (accessed at POST http://localhost:8080/api/jobs)
    .post(function(req, res) {
        
        var job = new Job();      // create a new instance of the Job model
        job.title = req.body.title;  // set the jobs name (comes from the request)
		job.company = req.body.company;
		job.localization = req.body.localization;
		job.category = req.body.category;
		job.description = req.body.description;
		job.contract = req.body.contract;
		job.date = req.body.date;
		job.tags = req.body.tags;
        // save the job and check for errors
        job.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Job created!' });
        });
        
    })
	
	.get(function(req, res) {
        Job.find(function(err, jobs) {
            if (err)
                res.send(err);

            res.json(jobs);
        });
    });
	
router.route('/jobs/:job_id')

    // get the job with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Job.findById(req.params.job_id, function(err, job) {
            if (err)
                res.send(err);
            res.json(job);
        });
    })

    // update the job with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the job we want
        Job.findById(req.params.job_id, function(err, job) {

            if (err)
                res.send(err);

            job.title = req.body.title;  // update the job info
			job.company = req.body.company;
			job.localization = req.body.localization;
			job.category = req.body.category;
			job.description = req.body.description;
			job.contract = req.body.contract;
			job.date = req.body.date;
			job.tags = req.body.tags;
            // save the job
            job.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Job updated!' });
            });

        });
    });
	
router.route('/companies')	

	.get(function(req, res) {
        Job.find(function(err, jobs) {
            if (err)
                res.send(err);
			
            res.json(jobs);
        });
    });

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);