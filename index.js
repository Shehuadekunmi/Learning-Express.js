const express = require("express")
const app = express();
const port = 3000
const mealRouter = require("./routes/mealRouter")

// setting the view engine
app.set("view engine", "ejs")
 
// middleware

app.use(express.json());

// routes
app.use(mealRouter);


  

    // midlleware error handleing
    app.use((req, res) => {
        res.status(404).render("error");
    });

app.listen(port, () =>{
    console.log(`server runing on port ${port}...`);
})