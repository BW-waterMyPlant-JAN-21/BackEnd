const server = require('./server')

const port =  process.env.PORT || 5000

server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})