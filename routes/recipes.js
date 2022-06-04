var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");

router.get("/", (req, res) => res.send("im here"));


/**
 * This path returns a full details of a recipe by its id
 */
router.get("/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipeDetails(req.params.recipeId);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns 3 random preview recipes
 */
 router.get("/random", async (req, res, next) => {
   try{
     let random_3_recipes = await recipes_utils.getRandomRecipes();
     res.send(random_3_recipes);
     //res.send("im here");
   }catch (error){
      next(error);
   }
  });

  /**
 * This path returns search recipes
 */
router.get("/mysearch", async (req, res, next) => {
  try {
    const result = await recipes_utils.getsearchRecipes();;
    res.send(result);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
