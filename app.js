const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function (req,res) {
     res.sendFile(__dirname +"/signup.html" );
})

app.post('/failure', function (req,res) {
    res.redirect("/");
})

app.post("/",function (req,res) {

    const firstName = req.body.firstName;
    const secondName = req.body.secondName;
    const email = req.body.emailAddress;


    const dataList = {
       members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:secondName,
                },
              }
            ]
           }

        const jsonObj = JSON.stringify(dataList);

        const url ="https://us14.api.mailchimp.com/3.0/lists/18e3bcf42f";
        const option = {
            method:"POST",
            auth: "brio:e271b0e39a3bdd610ece2ad2b0936561-us14",
        }

    const request =  https.request(url,option,function (response) {

            if(response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");

            }else {
                res.sendFile(__dirname + "/failure.html");
            }
                     response.on("data",function (data) {
                     console.log(JSON.parse(data));


                     })
            })

    request.write(jsonObj);
    request.end();
})








app.listen( process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000");
})


   // listid  18e3bcf42f
  // apikey e271b0e39a3bdd610ece2ad2b0936561-us14