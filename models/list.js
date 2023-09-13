const { model, Schema } = require('mongoose')

const listSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    title: String,
    current: Boolean,
    words: [{ type: Schema.Types.ObjectId, ref: 'Vocab' }]
}, {
    timestamps: true
})

listSchema.statics.getList = function (userId) {
    // 'this' is the Order model
    return this.findOneAndUpdate(
        // query
        { user: userId, current: true },
        // update
        { user: userId },
        // upsert option will create the doc if
        // it doesn't exist
        { upsert: true, new: true }
    )
}
orderSchema.methods.removeWord = function (wordId) {
    const list = this.populate('words')
    const word = list.words.find(word => word._id.equals(wordId))
    word.deleteOne()
    return list.save()
}

const List = model('List', listSchema)
module.exports = List