const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 4000;
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/FrontEnd/public'));


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



const newuserhelper=express.Router();
app.use('/user/:facultyId/signup',newuserhelper);

newuserhelper
.route('/')
.get(getsignuphomepage)


newuserhelper
.route('/personal')
.get(getpersonal)

//////////signup login////////////////
    app.get('/login',(req,res)=>{
      res.clearCookie('facultyId');
        res.sendFile("FrontEnd/public/login.html",{root:__dirname});
      })
app.get("/signup",(req,res)=>{
    res.sendFile("FrontEnd/public/signUp.html",{root:__dirname});
})

//home page from signup
function getsignuphomepage(req,res){
  res.sendFile("FrontEnd/public/signuphome.html",{root:__dirname})
}

//datafilling from signup homepage
function getpersonal(req,res){

}




//homepage from login
app.get('/user/:facultyId/login',(req,res)=>{
  const facultyId=req.params.facultyId;
  res.cookie('facultyId', facultyId);
    res.sendFile("FrontEnd/public/loginhomepage.html",{root:__dirname})
})

app.get("/personal",(req,res)=>{

  res.sendFile("FrontEnd/public/personal.html",{root:__dirname})
})
app.post('/personal',(req,res)=>{
  
  
 const { facultyID,title,first_name,middle_name,last_name,date_of_birth,gender,Father_name,Mother_name,MartialStatus,
  Spouse_name,House_No,Street,City,State,Country,PinCode,Landline_no,MobileNo,Alternate_mobile_no,Personal_Email_ID,
  Official_email_ID,Aadhar_number,PAN,Date_of_joining,Designation,Department,is_left,dateOfRelieving}=req.body;
  
 console.log(req.body);

    const sql='Insert into facultypersonal (facultyID,title,first_name,middle_name,last_name,date_of_birth,gender,Father_name,Mother_name,MartialStatus,Spouse_name,House_No,Street,City,State,Country,PinCode,Landline_no,MobileNo,Alternate_mobile_no,Personal_Email_ID,Official_email_ID,Aadhar_number,PAN,Date_of_joining,Designation,Department,is_left,dateOfRelieving) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
   connection.query(sql,[facultyID,title,first_name,middle_name,last_name,date_of_birth,gender,Father_name,Mother_name,MartialStatus,
    Spouse_name,House_No,Street,City,State,Country,PinCode,Landline_no,MobileNo,Alternate_mobile_no,Personal_Email_ID,
    Official_email_ID,Aadhar_number,PAN,Date_of_joining,Designation,Department,is_left,dateOfRelieving],(err,result)=>{
if(err){
console.log(err);
}
else{
console.log("done")
res.redirect('/experience')
}
   })
    
    
})
app.get('/experience',(req,res)=>{
  res.sendFile("FrontEnd/public/experience.html",{root:__dirname})

})
app.post('/experience',(req,res)=>{
  const query = 'INSERT INTO facultyexperiencemaster (facultyId,organization_name, designation,Date_of_joining, Date_of_relieving, pay_scale,job_profile,reason_for_leaving,last_salary_drawn) VALUES ?';
  const values = req.body.map((row) => Object.values(row));
const fID=req.body[0].facultyId;

  connection.query(query, [values], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      
    }
    else{

      console.log('Data inserted successfully!');
      res.set("Location", "/phd"); // Replace "/new-url" with the desired URL
res.status(304).send(); // Use the appropriate status code (e.g., 302 for temporary redirect)

      console.log("hi")
    }
   
    console.log(fID)
    
  });
})

app.get('/phd',(req,res)=>{
  res.sendFile("FrontEnd/public/phd.html",{root:__dirname})

})
app.post('/phd',(req,res)=>{
  const {facultyID,college_depart,University,	status_,date_of_award,thesis_title,registration_date,thesis_submission_date,detailofsupervisor	
	}=req.body;
  console.log(detailofsupervisor);
  const sql='insert into facultyphdqualificationmaster (facultyID,college_depart,University,	status_ ,date_of_award,thesis_title,registration_date,thesis_submission_date,detailofsupervisor) values(?,?,?,?,?,?,?,?,?)';

  connection.query(sql,[facultyID,college_depart,University,status_,date_of_award,thesis_title,registration_date,thesis_submission_date,detailofsupervisor],(err,result)=>{
    if(err){
      console.log(err);
      }
      else{
      console.log("done")
      res.redirect('/qualification')
      }
  })
})
app.get('/qualification',(req,res)=>{
  res.sendFile("FrontEnd/public/qualifications.html",{root:__dirname})

})

app.post('/qualification',(req,res)=>{
  console.log(req.body);
  const query = 'INSERT INTO facultyqualification (facultyId,level, Exam_Degree, School_College, Board_Uni, year_of_passing, Max_marks_grades, 	marks_grade_obtained, 	percent_marks, division, achievement) VALUES ?';
  const values = req.body.map((row) => Object.values(row));
const fID=req.body[0].facultyId;

  connection.query(query, [values], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return;
    }
    console.log('Data inserted successfully!');
    res.set("Location", `/user/${req.facultyId}/login`); // Replace "/new-url" with the desired URL
res.status(304).send(); 
    console.log(fID)
    
    // res.redirect(`/user/${encodeURIComponent(fID)}/login`);
  });

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
app.get('/name/:facultyId', (req, res) => {
  const facultyId = req.params.facultyId;
  connection.query('SELECT name,email FROM signup WHERE facultyId = ?', [facultyId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(result);
    }
  });
});
//user creation
function postsignup(req,res){
const body=req.body;
console.log(body.email);
// if(typeof body.email==='string'){
//     console.log('string');
// }
const sql='Insert into signup (email,password,name) values(?,?,?)'
connection.query('select email from signup where email=?',[body.email],(error,result)=>{
    if(error){
      console.log(error);
    }
    else{
        if(result.length==0){
            connection.query(sql,[body.email,body.password,body.name],(err,result)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json({ message: 'An error occurred while signing up the user' });
                }
                // res.status(201).json({ message: 'Employee created successfully' });
                const facultyId = result.insertId;
                res.cookie('facultyId', facultyId);
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


                                               // data fetching apis//

app.get('/api/personal/:facultyId',(req,res)=>{
  const facultyId=req.params.facultyId;
connection.query('select * from facultypersonal where facultyId =?',[facultyId],(error,result)=>{
  if(error){
    return errror;
  }
  else{
    res.send({data:result});
  }
})
})
app.get('/api/experience/:facultyId',(req,res)=>{
  const facultyId=req.params.facultyId;
connection.query('select * from facultyexperiencemaster where facultyId =?',[facultyId],(error,result)=>{
  if(error){
    return errror;
  }
  else{
    res.send({data:result});
  }
})
})
app.get('/api/qualification/:facultyId',(req,res)=>{
  const facultyId=req.params.facultyId;
connection.query('select * from facultyqualification where facultyId =?',[facultyId],(error,result)=>{
  if(error){
    return errror;
  }
  else{
    res.send({data:result});
  }
})
})
app.get('/api/phd/:facultyId',(req,res)=>{
  const facultyId=req.params.facultyId;
connection.query('select * from facultyphdqualificationmaster where facultyId =?',[facultyId],(error,result)=>{
  if(error){
    return errror;
  }
  else{
    res.send({data:result});
  }
})
})



////////////////////////////////////////


//server listening
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
  
  