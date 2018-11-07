const express = require('express');
const Posts = require('../db/models/Posts');
const router = express.Router();

router.get('/', (req, res) => {
  return Posts.fetchAll()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => console.log(err))
})

router.post('/', (req, res) => {
  let data = req.body;

  return new Posts({
    title: data.title,
    body: data.body,
    author_id: data.author_id,
  })
    .save()
    .then(post => {
      return res.json(post);
    })
    .catch(err => console.log(err))
});

router.get('/:title', (req, res) => {
  let data = req.params.title
  return new Posts().where({ title: data })
    .fetch()
    .then(posts => {
      if (posts !== null) {
        res.json(posts);
      } else if (posts === null || posts === []) {
        res.status(400).send('Title not found')
      }
    })
    .catch(err => console.log(err))
});

router.put('/:id', (req, res) => {
  const postId = req.params.id;
  const data = req.body;
  console.log('id', postId)
  if(parseInt(postId) !== parseInt(data.id)) {
    res.status(404).json({ message: `Cannot update post ${postId} due to data error.` })
  }
  return new Posts()
    .where(({ id: postId }))
    .fetch()
    .then(posts => {
      if (!posts) {
        res.status(404).json({ message: `Posts ${postId} not found.` })
      }
      if (posts) {
        posts.set()
          .save(
            {
              title: data.title,
              author_id: data.author_id,
              body: data.body
            },
            { patch: true }
          )
      }
    })
    .then(updatedPosts => {
      console.log((updatedPosts))
      res.json(updatedPosts)
    })
    .catch(err => console.log(err))
})






module.exports = router;