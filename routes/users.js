const express = require('express');
const User = require('../db/models/User');
const router = express.Router();


router.get('/', (req, res) => {
  return User.fetchAll()
    .then(users => {
      res.json(users);
    })
    .catch(err => console.log(err))
})

router.get('/:first_name', (req, res) => {
  let data = req.params.first_name
  return new User().where({ first_name: data })
    .fetch({
      columns: ['id', 'name', 'email']
    })

    .then(users => {
      if (users !== null) {
        res.json(users);
      } else if (users === null || users === []) {
        res.status(404).send('User not found')
      }
    })
    .catch(err => console.log(err))
})

router.post('/', (req, res) => {
  let data = req.body;
  data.email = data.email.toLowerCase();

  return new User({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    password: data.password
  })
    .save()
    .then(user => {
      return res.json(user);
    })
    .catch(err => console.log(err))
});
// Object.keys(data);

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  //const {name, email} = req.body  is the shorthand for const name = req.body.name and const email = req.body.email
  if (parseInt(id) !== data.id) {
    res.status(404).json({ message: `Cannot update user ${id} due to data mismatch` })
  }
  return new User()
    .where({ id: id })
    .fetch()
    .then(user => {
      if (!user) {
        res.status(404).json({ message: `User $(id) not found.` })
      }
      if (user) {
        user.set()
          .save(
            { first_name: data.first_name, email: data.email, last_name: data.last_name },
            { patch: true }
          )
      }
    })
    .then(updatedUser => {
      console.log((updatedUser))
      res.json(updatedUser)
    })
    .catch(err => console.log(err))
})

module.exports = router;
