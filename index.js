const express = require("express")
const app = express();
const port = 3000
const meals = require("./data/meals");
// GET, POST, PATCH, PUT, DELETE



// app.get, app.delete, app.patch, app.put, app.set, app.listen
// setting the view engine
app.set("view engine", "ejs")

// 26-07-23
app.use(express.json());       
// get all meals
app.get("/api/meals", (req, res) => {
    res.status(200).json({numOfMeals: meals.length, meals})
});

// get single meal
app.get("/api/meals/:mealId", (req, res) => {
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
});


// create a meal to create new meal you need the name of the meal
app.post("/api/meals", (req, res) => {
    // req.body
    // console.log(req.body); 
    const {name} = req.body
    if (!name) {
        return res.status(400).json({massage: "please provide a meal name"})
    }
    const newMeal = {id: 6, name};
    res.status(201).json({sucess: true, meals:[...meals, newMeal] })

});


// updatte a memal

app.patch("/api/meals/:mealId", (req, res) => {
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
})


 
// delete meal
app.delete("/api/meals/:mealId", (req, res) =>{
    const {mealId} = req.params;

    const meal = meals.find((meal) => meal.id === Number(mealId));
    if(!meal) {
        return res.status(404).json({message: `meal with the id ${mealId} not found`});
    }

    const remainingMeals = meals.filter((meal) => meal.id !== parseInt(mealId));
    res.status(200).json({successs: true, meals: remainingMeals});
});

// 26-07-23

// middleware
// app.use((req, res, next) => {
//     console.log("request made");
//     next();
// });


// // example of middleware
// // 1
// app.use((req, res, next) => {
//     const requestInfo = {
//         url: req.url,
//         method: req.method,
//         time: new Date().getDate(),
//     };
//     console.log(requestInfo);
//     next();
// });

// // 2
// const auth = (req, res, next) => {
//     const authorized = false;
//     if (authorized){
//         next();
//     } else {
//         res.send("you are not authorized")
//     };
// };

// app.get("/account", auth, (req, res) => {
//     res.status(200).render("about")
// })


app.get("/", (req, res) => {
    const user = 'John Doe'
    const role = ' full stack engineer'
    res.status(200).render("index", {user, role});
})

app.get("/about", (req, res) => {
    res.status(200).render("about");
});

// normal ways of gettig app b4 render
// app.get("/contact", (req, res) => {
//     res.status(200).send("<h1>contact page<h1/>");
// });


        // redirecting
app.get("/about-us", (req, res) => {
    res.redirect("/about");
});

    //    // error route   always put it  last
    //    app.all('*', (req, res) => {
    //     res.status(404).render("error");
    // });

    // midlleware error handleing
    app.use((req, res) => {
        res.status(404).render("error");
    });

app.listen(port, () =>{
    console.log(`server runing on port ${port}...`);
})