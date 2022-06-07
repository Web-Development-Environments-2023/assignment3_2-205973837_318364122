const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";



/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */


async function getRecipeInformation(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });
}

function extractPreviewRecipeDetailes(recipes_info)
{
    return recipes_info.map((recipe_info) => {
        let data = recipe_info;
        if (recipe_info.data)
        {
            data = recipe_info.data
        }
        const {
            id,
            title,
            readyInMinutes,
            image,
            aggregateLikes,
            vegan,
            vegetarian, 
            glutenFree, 
        } = data;

        return {
            id: id,
            title: title,
            image: image,
            readyInMinutes: readyInMinutes,
            image: image,
            popularity: aggregateLikes,
            vegan: vegan,
            vegetarian: vegetarian,
            glutenFree: glutenFree,
        }
    })
}

async function getRandomRecipes(){
    const response =  await axios.get(`${api_domain}/random`,{
        params: {
            number: 10,
            apiKey: process.env.spooncular_apiKey
        }
    });
    return response;
}

async function getRecipesPreview(recipes_ids_list) {
    let promises = [];
    recipes_ids_list.map((id) => {
        promises.push(getRecipeInformation(id));
    });
    let info_res = await Promise.all(promises);
    return extractPreviewRecipeDetailes(info_res) 
  }

  async function getRecipeDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;

    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        
    }
}

async function getRandomThreeRecipes(){
    let random_pool = await getRandomRecipes();
    let filter_random_pool = random_pool.data.recipes.filter((random)=>(random.instructions!="") && (random.image && random.title))
    if(filter_random_pool.length < 3){
        return getRandomThreeRecipes();
    }
    
    return extractPreviewRecipeDetailes([filter_random_pool[0], filter_random_pool[1], filter_random_pool[2]]);
}

// async function getRandomThreeRecipes(){
//     let random_pool = await getRandomRecipes();
//     let filter_random_pool = random_pool.data.recipes.filter((random)=>(random.instructions!="") && (random.image && random.title))
//     if(filter_random_pool.length < 3){
//         return getRandomThreeRecipes();
//     }
//     filter_random_pool.map((info) => {
//         info.id
//     });
//     return getRecipesPreview(filter_random_pool);
// }


// async function getsearchRecipes(){
//     return await axios.get(`${api_domain}/complexSearch?query=burger&cuisine=italian&diet=vegetarian&intolerances=gluten&number=10`, {
//         params: {
//             // apiKey: "90319972dc6242da800bd51717996a05"
//             apiKey: process.env.spooncular_apiKey
//             //{{baseUrl}}/recipes/complexSearch?query=burger&cuisine=italian&diet=vegetarian&intolerances=gluten&number=10
//         }
//     });
// }

// async function getRandomThreeRecipes(){
//     let random_pool = await getRandomRecipes();
//     let filter_random_pool = random_pool.data.recipes.filter((random)=>(random.instructions!="") && (random.image && random.title))
//     if(filter_random_pool.length < 3){
//         return getRandomThreeRecipes();
//     }
//     filter_random_pool.map((info) => {
//         info.id
//     });
//     return getRecipesPreview(filter_random_pool);
// }

// async function getRecipesPreview(recipes_ids_list) {
//     let promises = [];
//     recipes_ids_list.map((id) => {
//         promises.push(getRecipeDetails(id));
//     });
//     let info_res = await Promise.all(promises).then((values) => {
//         return values;
//     });
    
//   }



exports.getRecipeDetails = getRecipeDetails;
exports.getRecipesPreview = getRecipesPreview;
// exports.getRandomRecipes = getRandomRecipes;
exports.getRandomThreeRecipes = getRandomThreeRecipes;
// exports.getsearchRecipes = getsearchRecipes;



