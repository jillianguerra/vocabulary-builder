const express = require('express')
const router = express.Router()
const listCtrl = require('../../controllers/api/lists')
const userCtrl = require('../../controllers/api/users')

router.get('/', userCtrl.auth, listCtrl.showCurrentList)
router.get('/all', userCtrl.auth, listCtrl.showUserLists)
router.post('/new', userCtrl.auth, listCtrl.createList)
router.put('/:id', userCtrl.auth, listCtrl.updateList)
router.delete('/:id', userCtrl.auth, listCtrl.deleteList)
router.get('/:id', listCtrl.showOneList)
module.exports = router