const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb://localhost:27017/IMDB");


//movie: title,rating,releaseDate,cast,earing,director,posterurl,language

const MovieSchema = new mongoose.Schema({
    title: {type: String,required: true},
    rating: Number,
    releaseDate: Date,
    earning: {type: Number, default:"1000",min:0,max:10000},
    cast: {type: [String]},
    language: {type: String, enum: ["English","Hindi"]},
});

const Movie = mongoose.model("movie", MovieSchema);

const main = async () => {
    const conn = await connection;

    console.log("Conntected Sucessfully");

    // const movies = await Movie.find();
    // console.log("All Movies",movies);

    // const hindiMovies = await Movie.find({language:"Hindi"}).sort({title: 1});

    const query = Movie.find();

    query.select("rating");


    const movie = new Movie({
        title: "Dr Strange",
        rating: 3.5,
        releaseDate: new Date(),
        earning: 4000,
        cast: ["B Cumberbatch","Tony Start","Wong"],
        language: "English",
    });
    await movie.save();
    console.log("Saved Movie");
    conn.disconnect();
};
main();