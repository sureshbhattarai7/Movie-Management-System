const mongoose = require("mongoose");
const slugify = require('slugify');

const movieSchema = mongoose.Schema(
    {
        movieName: {
            type: String,
            required: [true, "Movie name is required!"],
        },
        movieGenre: {
            type: String,
            required: [true, "Movie genre is required!"],
            enum: {
                values: [
                    "Action",
                    "Adventure",
                    "Comedy",
                    "Crime",
                    "Documentary",
                    "Drama",
                    "Fantasy",
                    "History",
                    "Horror",
                    "Mystery",
                    "Sci-fi",
                    "Thriller",
                    "War",
                ],
                message:
                    "Please specify either genres: 1. Action, 2. Adventure, 3. Comedy, 4. Crime, 5. Documentary, 6. Fantasy, 7. History, 8. Horror, 9. Mystery, 10. Sci-fi, 11. Thriller, 12.War",
            },
        },
        country: {
            type: String,
            required: [true, "Country is required!"],
        },
        language: {
            type: String,
            required: [true, "Language is required"],
        },
        duration: {
            type: String,
            required: [true, "Duration is required!"],
        },
        releaseDate: {
            type: Date,
            default: Date.now()
        },
        description: {
            type: String,
            required: [true, "Release date is required!"],
        },
        imageCover: {
            type: String,
            //required: [true, "Image cover is required!"],
        },
        images: [String],
        price: {
            type: Number,
            required: [true, "Price must be set!"],
        },
        ratingsAverage: {
            type: Number,
            min: [1, 'Rating must be above 1.0'],
            max: [5, 'Rating must be above 5.0']
        },
        ratingsQuantity: {
            type: Number,
            default: 0
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

//Virtual don't keep the elements in the Database
// movieSchema.virtual("discount").get(function () {
//     return this.price * 0.1;
// });

// movieSchema.virtual("total").get(function () {
//     return this.price - this.discount;
// });

//Virtual populate - Can get access to all the reviews of certain movie but without keeping the ID of movie in the Database 
movieSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'movie',
    localField: '_id'
});

movieSchema.virtual('actors', {
    ref: 'Actor',
    foreignField: 'movie',
    localField: '_id'
});

//Middleware helps to define functions before or after a certain events
//DOCUMENT MIDDLEWARE/HOOK: 'Pre' runs before .save() and .create()
//'Post' runs after .save() and .create()

movieSchema.pre("save", function (next) {
    this.slug = slugify(this.movieGenre, {
        lower: true,
        replacement: "-"
    });
    next();
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
