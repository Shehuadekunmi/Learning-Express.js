// const express = require("express");
// const router = express.Router();

const router = require("express").Router();

const {getAMeal, getAllMeals, creatMeal, deleteMeal, getAboutPage, getHomepage, updateMeal} = require("../controller/mealController")


  //    // error route   always put it  last
    //    app.all('*', (req, res) => {
    //     res.status(404).render("error");
    // });
// 26-07-23
//       
// get all meals   // create a meal to create new meal you need the name of the meal
// router.get("/api/meals", getAllMeals);
// router.post("/api/meals", creatMeal ); or
router.route("/api/meals").get(getAllMeals).post(getAMeal)



 

// get single meal   // updatte a meal   // delete meal
// router.get("/api/meals/:mealId", getAMeal);
// router.patch("/api/meals/:mealId", updateMeal)
// router.delete("/api/meals/:mealId", deleteMeal);

router.route("/api/meals/:mealId").get(getAMeal).patch(updateMeal).delete(deleteMeal)


// 26-07-23

// middleware
// router.use((req, res, next) => {
//     console.log("request made");
//     next();
// });


// // example of middleware
// // 1
// router.use((req, res, next) => {
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

// router.get("/account", auth, (req, res) => {
//     res.status(200).render("about")
// })


router.get("/", getHomepage )

router.get("/about", getAboutPage);

// normal ways of gettig app b4 render
// app.get("/contact", (req, res) => {
//     res.status(200).send("<h1>contact page<h1/>");
// });


        // redirecting
router.get("/about-us", (req, res) => {
    res.redirect("/about");
});





module.exports = router;