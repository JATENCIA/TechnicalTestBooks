const mongoose = require('mongoose')

const AuthorsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    country: {
      type: String,
      required: true
    },

    bookId: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Books'
      }
    ],
    image: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
module.exports = mongoose.model('Authors', AuthorsSchema)
