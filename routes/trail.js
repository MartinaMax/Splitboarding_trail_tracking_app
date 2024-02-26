const router = require("express").Router();
const trail = require("../models/trail");
const user = require("../models/trail");
const {tokenVerification} = require("../validation");

// GET - Fetch all the treks from the database
router.get("/", ( req, res) => {
    
    trail.find()
    .then(data => {res.send(data); })
    .catch(err => {res.status(500).send(JSON.stringify(err)); })
});


// GET - Fetch all trails based on who it was created by
router.get("/:createdBy", tokenVerification, (req, res) => {

    
    trail.find({createdBy: req.params.createdBy})
    .then(data => {res.send(data); })
    .catch(err => {res.status(500).send(JSON.stringify(err)); })

});


// POST - Create a new trail in the database
router.post("/", tokenVerification, (req, res) => {
   
    data = req.body;

    trail.insertMany(data)
    .then(data => {res.send(data); })
    .catch(err => {res.status(500).send(JSON.stringify(err)); })

    
});


// UPDATE - Update an existing trail based on the ID
router.put("/:id",  tokenVerification, (req, res) => {
   
    const id = req.params.id;


    trail.findByIdAndUpdate(id, req.body)
    .then(data => {
        if(!data){
            res.status(404).send({message: "Wrong trail id" + id + ". Or this trail disappeared."})
        }
        else{
            res.send({message: "The trail was modified. Now it is a better version."})
        }

    })
    .catch(err => {res.status(500).send(JSON.stringify(err)); })
});


// DELETE - Delete an existing trail based on the ID
router.delete("/:id",  tokenVerification, (req, res) => {
   
    const id = req.params.id;


    trail.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({message: "Cannot delete trail with id" + id + ". Or this trail disappeared."})
        }
        else{
            res.send({message: "The trail was deleted."})
        }

    })
    .catch(err => {res.status(500).send(JSON.stringify(err)); })
});

module.exports = router;