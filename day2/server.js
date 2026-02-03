// how to programme server;

const express = require('express');
const app = express() // server instance create karna
app.get('/', (req, res) => { /// when user req is localhost:3000; then we send response is hello world
    res.send('Hello world')
})
app.get('/contact', (req, res) => { /// when user req is localhost:3000/about; then we send response is this is about page
    res.send('This is contact page')
})
app.get('/about', (req, res) => { /// when user req is localhost:3000/about; then we send response is this is about page
    res.send('This is about page')
})
app.listen(3000) // server start karna in 3000 port