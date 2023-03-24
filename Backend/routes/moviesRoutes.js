const express=require('express');
const movieRouter=express.Router();
const {addMovies,getallMovies, getMoviesbyId}=require("../Controllers/movieController");


movieRouter.post("/add",addMovies);
movieRouter.get('/:id',getMoviesbyId)
movieRouter.get("/",getallMovies)

module.exports=movieRouter;
