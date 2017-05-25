var express = require('express');
var router = express.Router();
var Kiosco = require('../models/Kiosco');

/*router.get('/:id?', function(req, res, next) {
    //console.log(req);
    console.log(req.params.id);
    if (req.params.id === 'findCourse') {
        Kiosco.getCareers(req.params.id, function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });

    } else if (req.params.id) {
        Kiosco.getTaskById(req.params.id, function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        Kiosco.getAllFaculties(function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});*/

router.get('/findCourse/:id?', function(req, res, next) {
    if (req.params.id) {
        // Todos los auditorios de un edificio
        Kiosco.getAudience(req.params.id, function(err, rows) {
            console.log('cosa');
            console.log(rows);

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });

    } else {
        Kiosco.getBuildings(function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});

router.get('/pensum/:id?', function(req, res, next) {
    if (req.params.id) {
        // Todos los auditorios de un edificio
        Kiosco.getAudience(req.params.id, function(err, rows) {
            console.log('cosa');
            console.log(rows);

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });

    } else {
        Kiosco.getAllFaculties(function(err, rows) {
            console.log('faculties:');
            console.log(rows);
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});

router.get('/directory/:id?', function(req, res, next) {
    if (req.params.id) {
        // Todos los auditorios de un edificio
        Kiosco.getUnitsDependences(req.params.id, function(err, rows) {
            console.log('Dependencias:');
            console.log(rows);

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });

    } else {
        Kiosco.getUnits(function(err, rows) {
            console.log('Unidades:');
            console.log(rows);
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});

router.get('/searchCourse/:id?', function(req, res, next) {
    console.log(req.params.id);
    req.params.id = '"'+req.params.id+'"';
    console.log(req.params.id);

    if (req.params.id) {
        Kiosco.getParticularAudience(req.params.id, function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });   
    }
});

module.exports = router;