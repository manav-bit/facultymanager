const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 4000;
const bodyParser = require('body-parser')
const cors=require('cors');
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/FrontEnd/public'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
  });

  //connecting setting up
  const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });
  //connection building
  connection.getConnection((error, connection) => {
    if (error) {
        console.error('Error connecting to MySQL database:', error);
    } else {
        console.log('Connected to MySQL database successfully!');
        connection.release();
    }
  });
// routers
const userRouter=express.Router();
app.use('/user',userRouter);
userRouter
.route('/')
.post(postsignup)

const userhelper=express.Router();
app.use('/user/:facultyId',userhelper);
userhelper
.route('/login')



//////////signup login////////////////
    app.get('/login',(req,res)=>{
        res.sendFile("FrontEnd/public/login.html",{root:__dirname});
      })
app.get("/signup",(req,res)=>{
    res.sendFile("FrontEnd/public/signUp.html",{root:__dirname});
})

//home page from signup
app.get('/user/:facultyId/signup', (req, res) =>{
res.sendFile("FrontEnd/public/personal.html",{root:__dirname})

})
//homepage from login
app.get('/user/:facultyId/login',(req,res)=>{
    res.sendFile("FrontEnd/public/personal.html",{root:__dirname})
})
//
// personal
app.post('/personal',(req,res)=>{
    console.log(req.body);
})

// from form to validation to main login success api with faculty id
app.post('/user/login',validatelogin,(req,res)=>{
   
// console.log(req.facultyId+"hi")
    res.redirect(`/user/${req.facultyId}/login`)
})

//middleware function for validating login functionality
function validatelogin(req, res,next) {

    const {email,password}=req.body;
    connection.query('select email , password ,facultyId from signup where email=? and password=?',[email,password],(error,result)=>{
        if(error){
            console.log(error);
        }
        else {
            if (result.length > 0) {
              const Email = result[0].email;
              const Password = result[0].password;
              const facultyId=result[0].facultyId;
            //   console.log(Email, Password,facultyId);
              // Further processing based on the email and password values
              if(password==Password){
                req.facultyId=facultyId;
next();//successful redirect further
              }
            }
            else{
                //failed login to user notfound signup 
                res.redirect("/signup");
            }
          }
    })
    
}

//user creation
function postsignup(req,res){
const body=req.body;
console.log(body.email);
// if(typeof body.email==='string'){
//     console.log('string');
// }
const sql='Insert into signup (email,password) values(?,?)'
connection.query('select email from signup where email=?',[body.email],(error,result)=>{
    if(error){
      console.log(error);
    }
    else{
        if(result.length==0){
            connection.query(sql,[body.email,body.password],(err,result)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json({ message: 'An error occurred while signing up the user' });
                }
                // res.status(201).json({ message: 'Employee created successfully' });
                const facultyId = result.insertId;
                res.redirect(`/user/${facultyId}/signup`);
            })
        }
        else{
            //failed signup 
            res.redirect("/login");
        }
    }
})

}


////////////////////////////////////////


//server listening
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
  
  