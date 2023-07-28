const moogose = require('mongoose')

const reviewSchema = new moogose.Schema(
  {
    review: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    user: {
      type: moogose.Schema.Types.ObjectId,
      ref: 'Users'
    },
    book: {
      type: moogose.Schema.Types.ObjectId,
      ref: 'Books'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = moogose.model('Review', reviewSchema)
