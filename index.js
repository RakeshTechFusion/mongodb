const express = require("express");
const { Movie,connection } = require("./db");

const app = express();

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.get("/movies", async(req,res)=>{
    const {pageNo, perPage} = req.query;
   const movies = await Movie.find().skip(pageNo*2).limit(perPage);
   return res.json(movies);
});

app.post("/movie",(req,res)=>{
   const movie = new Movie({...req.body});
  //
   movie.save((err,movie)=>{
   });
});

app.listen(8080,async()=>{
    try{
        await connection;
        console.log("Connected to db");
    } catch{
        console.log("Fail to connect to db");
    }
    console.log("server started");
});