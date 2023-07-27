const meals = require("../models/meals");


// get all meals 
const getAllMeals =   (req, res) => {
    res.status(200).json({numOfMeals: meals.length, meals})
}

// get a meal get
 const getAMeal =  (req, res) => {
    // console.log(req.params.mealId);
    const {mealId} = req.params;
    
    const meal = meals.find((meal) => meal.id === parseInt(mealId));

    if (!meal) {
        return res.status(404).json({
            message: `Meal with the id ${mealId} not found`,
            Success: false
        });
    }
    res.status(200).json({sucess: true, meal})
}

// update patch
const updateMeal =  (req, res) => {
    const {mealId} = req.params;
    const {name} = req.body

    const meal = meals.find((meal) => meal.id === Number(mealId));
    if(!meal){
        return res.status(404).json({messabge: `meal with the id ${mealId} not found`})
    }
    if(!name){
        return res.status(400).json({message: `Please provide a new meal name`})
    }

    const mealToBeUpdated = meals.map((meal) => {
        if (meal.id === Number(mealId)){
            meal.name = name;
        }
        return meal;
    });
    return res.status(200).json({success: true, meals: mealToBeUpdated});
}

// delete delet

const deleteMeal =  (req, res) =>{
    const {mealId} = req.params;

    const meal = meals.find((meal) => meal.id === Number(mealId));
    if(!meal) {
        return res.status(404).json({message: `meal with the id ${mealId} not found`});
    }

    const remainingMeals = meals.filter((meal) => meal.id !== parseInt(mealId));
    res.status(200).json({successs: true, meals: remainingMeals});
}


// create post
const creatMeal = (req, res) => {
    // req.body
    // console.log(req.body); 
    const {name} = req.body
    if (!name) {
        return res.status(400).json({massage: "please provide a meal name"})
    }
    const newMeal = {id: 6, name};
    res.status(201).json({sucess: true, meals:[...meals, newMeal] })

}


// get homepage
const getHomepage =  (req, res) => {
    const user = 'John Doe'
    const role = ' full stack engineer'
    res.status(200).render("index", {user, role});
}

// get about
const getAboutPage =  (req, res) => {
    res.status(200).render("about");
}

module.exports = {getAMeal, getAllMeals, creatMeal, deleteMeal, getAboutPage, getHomepage, updateMeal }