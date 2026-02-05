const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('hello world')
})
app.get('/about', (req, res) => {
    res.send('This is about page')
})

// app.listen(3000, () => {
//     console.log('server is runnig on port 3000');// running this callback when user do request on 3000 and log this
    
// })