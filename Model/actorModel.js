const mongoose = require("mongoose");

const actorSchema = mongoose.Schema(
    {
        actorName: {
            type: String,
            required: [true, "Actor name is required!"],
        },
        dateOfBirth: {
            type: Date,
            required: [true, "Date of Birth is required!"],
        },
        nationality: {
            type: String,
            required: [true, `Actor's nationality is required!`],
        },
        bio: {
            type: String,
            required: [true, `Actor's biography is required!`],
        },
        imageCover: {
            type: String,
        },
        images: [String],
        movie: {
            type: mongoose.Schema.ObjectId,
            ref: 'Movie',
            //required: [true, 'Actor must have at least one movie!']
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

actorSchema.pre(/^find/, function (next) {
    this.populate({ path: 'movie', select: 'movieName' });
    next();
})

const Actor = mongoose.model("Actor", actorSchema);
module.exports = Actor;
