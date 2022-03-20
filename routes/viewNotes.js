const router = require('express').Router()
const { uid } = require('uid')
let notes = require('../db/db.json')


router.get('/notes', (req, res) => {
  res.json(notes)
})

router.post('/notes', (req, res) => {
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uid(),
  }
  notes.push(newNote)
  res.json(200)
})

router.delete('/notes/:id', (req, res) => {
  notes = notes.filter(notes => notes.id !== req.params.id)
  res.json(notes)
})

module.exports = router