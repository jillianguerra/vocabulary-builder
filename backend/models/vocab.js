const { model, Schema } = require('mongoose')

const vocabSchema = new Schema({
    word: {type: String, required: true},
    partOfSpeech: {type: String, required: true},
    definition: {type: String, required: true},
    example: String,
    synonyms: [String],
    list: { type: Schema.Types.ObjectId, required: true, ref: 'List' }
})

const Vocab = model('Vocab', vocabSchema)
module.exports = Vocab