const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");
const app=express();
app.use(bodyparser.urlencoded({extended: true}));
app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    const query=req.body.cityname;
    const apikey="5c8432e1f062598b98f02f07cf5e873b";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query+ "&appid=" + apikey + "&units=" + unit ;
    https.get(url,function(response)
    {
        console.log(response.statusCode);
        //get the data
        response.on("data",function(data){
            //convert hex to data json.parse
            //jason.stringify = js object to string
           const weatherdata=JSON.parse(data)
           //console.log(weatherdata);
           const temp=weatherdata.main.temp
           const weatherdescription=weatherdata.weather[0].description 
           const icon=weatherdata.weather[0].icon
           const imageurl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
           
           res.write("<p>The weather is currently " + weatherdescription +"</p>")
           res.write("<h1>The temperature in "+query+" is "+temp+" degree celcius</h1>");
           res.write("<img src=" +imageurl+">" );
           res.send()
           
        });

});
})











app.listen(3000,function()
{
    console.log("server is running on port 3000");
})