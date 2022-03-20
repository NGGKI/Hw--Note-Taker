const router = require('express').Router()
const { uid } = require('uid')
let notes = require('../db/db.json')
const { join } = require('path')
const { writeFile, readFile } = require('fs')

router.get('/notes', (req, res) => {
  /* readFile(join(__dirname, '..', 'db', 'db.json'), 'utf-8', (err, data) => {
    if (err) { console.log(err) }
  }) */
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

  writeFile('./db/db.json',
    JSON.stringify(notes, null, 4),
    (writeErr) =>
      writeErr
        ? console.error(writeErr)
        : console.info('Successfully updated notes!')
  );
})

router.delete('/notes/:id', (req, res) => {
  notes = notes.filter(notes => notes.id !== req.params.id)
  res.json(notes)
})

module.exports = router