const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    title: String,
    body: String,
    comments: [{body: String, date: Date }],
    date: {type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: "Author"}
})

module.exports =  mongoose.model("Book", bookSchema);