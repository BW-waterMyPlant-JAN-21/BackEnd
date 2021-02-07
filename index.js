require("dotenv").config();
const server = require('./server')

const port =  process.env.PORT || 5080

server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})