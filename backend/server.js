import express from 'express';
import cors from 'cors';
import connectToDatabase from "./db.js";

const app = express();
const PORT = process.env.PORT || 8081;
const db = connectToDatabase();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://127.0.0.1:5500",
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/survey", async(req, res, next) =>{
    const {user_name, user_email, area, satisfaction, satisfaction_feedback, value, value_feedback, convenient, convenient_feedback, web_rank, web_feedback} = req.body;
    const sql = `
    INSERT INTO survey (user_name, user_email, area, satisfaction, satisfaction_feedback, value, value_feedback, convenient, convenient_feedback, web_rank, web_feedback)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    try{
        await db.query(sql, [user_name, user_email, area, satisfaction, satisfaction_feedback, value, value_feedback, convenient, convenient_feedback, web_rank, web_feedback]);
        res.redirect(process.env.THANK_YOU_URL || "http://127.0.0.1:5500/thankyou.html");
    }catch(err){
        return next(err);
    }
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

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

export default app;