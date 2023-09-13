const Vocab = require('../../models/vocab')
const List = require('../../models/list')

// router.get('/', vocabController.showIndex)
exports.showIndex = async (req, res, next) => {
    try {
        const foundVocab = await Vocab.find({})
        res.locals.data.vocab = foundVocab
        next()
    } catch (error) {
        res.status(400).send({ message: `Nothin here` })
    }
}
// router.get('/current', vocabController.showCurrentVocab)
exports.showCurrentVocab = async (req, res, next) => {
    try {
        const foundVocab = await Vocab.find({ user: req.user._id })
        res.locals.data.vocab = foundVocab
        next()
    } catch (error) {
        res.status(400).send({ message: `Nothin here` })
    }
}
// router.post('/new', userController.auth, vocabController.createVocab)
exports.createVocab = async (req, res, next) => {
    try {
        req.body.list = req.user.current
        const list = await List.findOne({_id: req.user.current})
        const vocab = new Vocab(req.body)
        await vocab.save()
        list.vocab ? list.vocab.addToSet(vocab) : list.vocab = [vocab]
        await list.save().populate('vocab')
        res.locals.data.list = list
        res.locals.data.vocab = vocab
        next()
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// router.put('/:id', userController.auth, itemController.updateVocab)
exports.updateVocab = async (req, res, next) => {
    try {
        const vocab = await Vocab.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.locals.data.vocab = vocab
        next()
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
// router.delete('/:id', userController.auth, itemController.deleteVocab)
exports.deleteVocab = async (req, res, next) => {
    try {
        const vocab = await Vocab.findByIdAndDelete(req.params.id)
        res.locals.data.vocab = vocab
        next()
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// router.get('/:id', vocabController.showVocab)
exports.showVocab = async (req,res) => {
    try {
        const foundVocab = await Vocab.findOne({ _id: req.params.id })
        res.json(foundVocab)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}