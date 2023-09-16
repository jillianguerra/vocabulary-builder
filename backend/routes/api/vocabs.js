const express = require('express')
const router = express.Router()
const vocabCtrl = require('../../controllers/api/vocabs')
const userCtrl = require('../../controllers/api/users')

router.get('/', vocabCtrl.showIndex)
router.get('/current', userCtrl.auth, vocabCtrl.showCurrentVocab)
router.post('/new', userCtrl.auth, vocabCtrl.createVocab)
router.put('/:id', userCtrl.auth, vocabCtrl.updateVocab)
router.delete('/:id', userCtrl.auth, vocabCtrl.deleteVocab)
router.get('/:id', vocabCtrl.showVocab)

module.exports = router