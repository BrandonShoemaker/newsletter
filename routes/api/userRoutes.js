const router = require('express').Router();
const {User} = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        //attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({message: 'No users found in the database with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req ,res) => {
    User.create({
        userName: req.body.username,
        password: req.body.password,
        email: req.body.email
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(400).json({error: 'No user with that email address!'});
            return;
        }
        
        const verifyUser = dbUserData.checkPassword(req.body.password);
        if(!verifyUser){
            res.status(400).json({message: 'Incorrect password!'});
            return;
        }

        res.json({user: dbUserData, message: 'You are now logged in!'});
    })
});

router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]){
            res.status(404).json({message: 'Error no user with such an id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({message: 'No users found in the database with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;