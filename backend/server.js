import express from 'express';
import cors from 'cors';
import connectToDatabase from "./db.js";

const app = express();
const PORT = process.env.PORT || 8081;

const db = connectToDatabase();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post("/api/survey", (req, res, next) =>{
    const {user_name, user_email, area, satisfaction, satisfaction_feedback, value, value_feedback, convenient, convenient_feedback, web_rank, web_feedback} = req.body;
    const sql = `
    INSERT INTO survey (user_name, user_email, area, satisfaction, satisfaction_feedback, value, value_feedback, convenient, convenient_feedback, web_rank, web_feedback)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    console.log(req.body)
    db.query(sql, [user_name, user_email, area, satisfaction, satisfaction_feedback, value, value_feedback, convenient, convenient_feedback, web_rank, web_feedback], (err, result) => {
        if (err) {
            return next(err);
        }
        res.redirect("http://127.0.0.1:5500/thankyou.html");
    });
});

//404 hander
app.use((req, res) =>{
    res.status(404).json({
        message: "route does not exist"
    })
})

//Error handler
app.use((err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).send("Server Error: " + err.message);
})

app.listen(PORT, ()=>{
    console.log("Server started on port " + PORT)
})