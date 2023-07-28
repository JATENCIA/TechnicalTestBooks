const mongoose = require('mongoose')

const booksSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: String,
      enum: ['Fantasy', 'Horror', 'Romance', 'Science', 'Programming'],
      default: 'Programming'
    },
    authorId: { type: mongoose.Types.ObjectId, ref: 'Authors' },
    pages: {
      type: Number,
      require: true
    },

    language: {
      type: String,
      require: true
    },
    publisher: {
      type: String,
      require: true
    },
    publicationDate: {
      type: String,
      require: true
    },

    image: {
      type: String,
      require: true
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Review'
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
)
module.exports = mongoose.model('Books', booksSchema)
