const jwt = require("jsonwebtoken");

const APP_SECRET = "myappsecret";
const USERNAME = "admin";
const PASSWORD = "secret";

module.exports = function (req, res, next) {
    
    if((req.url == "/api/login" || req.url == "/login") && req.method == "POST"){

        if(req.body != null && req.body.name == USERNAME && req.body.password == PASSWORD){
            let token = jwt.sign({data: USERNAME}, APP_SECRET, {expiresIn: "1h"});

            res.json({success: true, token: token});
        } else {

            res.json({success: false});
        }
        res.end();
        return;
    } else if ((((req.url.startsWith("/api/employees") || req.url.startsWith("/employees")) || 
    (req.url.startsWith("/api/department") || req.url.startsWith("/department"))) && req.method != "GET") 
    || ((req.url.startsWith("/api/timetrack") || req.url.startsWith("/timetrack")) && req.method != "POST")){
        
        let token = req.headers.authorization;
        console.log(token);
        if(token != null && token.startsWith("Bearer<")){
            token = token.substring(7, token.length - 1); 

            try {
                jwt.verify(token, APP_SECRET);
                next();
                return;
            } catch (err) { }

            }
            res.statusCode = 401;
            res.end();
            return;
        }
         next();
    }
