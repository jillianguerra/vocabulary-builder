const { model, Schema } = require('mongoose')

const listSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    title: {type: String, required: true},
    current: Boolean
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

const List = model('List', listSchema)
module.exports = List