const express = require('express')
const app = express()
const https = require('https')
const bodyPraser = require('body-parser')

app.use(bodyPraser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Index.html')
})

// fabaa40f6bbf78bb69434199fb50b958-us17

// 47b06a507e

app.post('/', (req, res) => {
    var namee = req.body.name
    var email = req.body.email

    var data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields :{
                    FNAME: namee
                }

            }
        ]
    }

    var JSONdata = JSON.stringify(data)

    const url = "https://us17.api.mailchimp.com/3.0/lists/47b06a507e"

    const option = {
        method: "POST",
        auth: "keshav12:fabaa40f6bbf78bb69434199fb50b958-us17"
    }

    const request = https.request(url, option , (response)=>{

        console.log(response.statusCode)
        if(response.statusCode == 200){
            res.sendFile(__dirname+'/Success.html')
        } else{
            res.sendFile(__dirname+'/Failure.html')
        }

        response.on("data", (data)=>{
            console.log(JSON.parse(data))
        })
    })



    request.write(JSONdata)
    request.end()

    // client.setConfig({
    //     apiKey: "fabaa40f6bbf78bb69434199fb50b958-us17",
    //     server: "47b06a507e",
    // }); 


})


app.listen(3000, () => {
    console.log(`conntected to port 3000`)
})