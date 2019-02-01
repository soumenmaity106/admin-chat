const Placement = require('../models/placement.model');

//Post a CourseList
exports.create = (req,res) =>{
    //Create a CourseList 
    const placement = new Placement({
        sno:req.body.sno,
        year:req.body.year,
        placement_type:req.body.placement_type,
        program:req.body.program,
        department:req.body.department,
        placed:req.body.placed,
        highest_salary:req.body.highest_salary,
        median_salary:req.body.median_salary,
        averag_salary:req.body.averag_salary,
        comments:req.body.comments,
    })
    //Save CourseList in Mogodb
    placement.save()
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message
        })
    })
}

// FETCH all Placement
exports.findAll = (req,res)=>{
    Placement.find()
    .then(placements => {
        if(placements.length  <= 0){
            return  res.status(404).send({
                message:"Placements list Dtabase Empty "
            })
        }
        res.send({
            count: placements.length,
            Placements:placements
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

// FIND a Courselist
exports.findOne = (req, res) => {
    Placement.findById(req.params.placementId)
    .then(placement => {
        if(!placement) {
            return res.status(404).send({
                message: "Placement not found with id " + req.params.placementId
            });            
        }
        res.send(placement);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Placement not found with id " + req.params.placementId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Placement with id " + req.params.placementId
        });
    });
};

//Placement Serach
exports.serach = (req, res) => {       
    var search = {};
    if(req.query.hasOwnProperty('year')){
        if (req.query.year.length > 0) {
            search.year = req.query.year;
        }
    } 
    if (req.query.hasOwnProperty('placement_type')) {
        if (req.query.placement_type.length > 0) {
            search.placement_type = req.query.placement_type
        }
    }
    if(req.query.hasOwnProperty('program')){
        if (req.query.program.length > 0) {
            search.program = req.query.program;
        }
    }    
    if (req.query.hasOwnProperty('department')) {
        if (req.query.department.length > 0) {
            search.department = req.query.department;
        }
    }
    if (req.query.hasOwnProperty('placed')) {
        if (req.query.placed.length > 0) {
            search.placed = req.query.placed;
        }
    }
    if (req.query.hasOwnProperty('highest_salary')) {
        if (req.query.highest_salary.length > 0) {
            search.highest_salary = req.query.highest_salary;
        }
    }
    if (req.query.hasOwnProperty('median_salary')) {
        if (req.query.median_salary.length > 0) {
            search.median_salary = req.query.median_salary;
        }
    }
    if (req.query.hasOwnProperty('averag_salary')) {
        if (req.query.averag_salary.length > 0) {
            search.averag_salary = req.query.averag_salary;
        }
    }
        
    Placement.find(search)
        .then(placement => {
            if (placement.length <= 0) {
                return res.status(404).send({
                    message: "Placement list Dtabase Empty "
                })
            }
            res.send({
                count: placement.length,
                Placement: placement
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}