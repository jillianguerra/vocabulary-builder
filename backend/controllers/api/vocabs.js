const Vocab = require('../../models/vocab')

// router.get('/list', vocabController.showCurrent)
exports.showCurrent = async (req, res) => {
    try {
        const vocabs = await Vocab.find({list: req.user.current})
        res.status(200).json(vocabs)
    } catch (error) {
        res.status(400).send({ message: `Nothin here` })
    }
}
// router.get('/list/:id', vocabController.showByList)
exports.showByList = async (req, res) => {
    try {
        const vocabs = await Vocab.find({ list: req.params.id })
        res.status(200).json(vocabs)
    } catch (error) {
        res.status(400).send({ message: `Nothin here` })
    }
}
// router.post('/new', userController.auth, vocabController.createVocab)
exports.createVocab = async (req, res, next) => {
    try {
        req.body.list = req.user.current
        const vocab = new Vocab(req.body)
        await vocab.save()
        res.status(200).json(vocab)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// router.put('/:id', userController.auth, itemController.updateVocab)
exports.updateVocab = async (req, res, next) => {
    try {
        const vocab = await Vocab.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(vocab)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
// router.delete('/:id', userController.auth, itemController.deleteVocab)
exports.deleteVocab = async (req, res, next) => {
    try {
        const vocab = await Vocab.findByIdAndDelete(req.params.id)
        res.status(200).json(vocab)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// router.get('/:id', vocabController.showVocab)
exports.showVocab = async (req,res) => {
    try {
        const vocab = await Vocab.findOne({ _id: req.params.id })
        res.status(200).json(vocab)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}