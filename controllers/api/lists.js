const List = require('../../models/list')
const Vocab = require('../../models/vocab')

exports.showUserLists = async(req, res, next) => {
    try {
        const lists = await List.find({ user: req.user._id })
        res.status(200).json(lists)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// create
exports.createList = async(req, res, next) => {
    try {
        const list = await List.create({ user: req.user._id, title: req.body.title })
        await list.save()
        res.status(200).json(list)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// update
exports.updateList = async(req, res, next) => {
    try {
        const list = await List.findByIdAndUpdate(req.params.id, req.body, {new: true})
        await list.save()
        if(req.body.current) {
            req.user.current = list._id
            await req.user.save()
        }
        res.locals.data.list = list
        next()
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
// delete
exports.deleteList = async(req, res, next) => {
    try {
        const list = await List.findOneAndDelete({ _id: req.params.id })
        res.locals.data.list = list
        next()
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.deleteAllLists = async(req, res, next) => {
    try {
        const lists = await List.deleteMany({user: req.user._id})
        res.locals.data.lists = lists
        next()
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
// show
exports.showOneList = async(req, res, next) => {
    try {
        const list = await List.findOne({ _id: req.params.id }).populate('vocab')
        res.locals.data.list = list
        next()
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}
exports.showCurrentList = async(req, res, next) => {
    try {
        const list = await List.findOne({_id: req.user.current}).populate('vocab')
        res.locals.data.list = list
        next()
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
