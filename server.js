const express = require('express'),
fs = require('fs');

const app = express()

app.use(express.static('public'))

app.listen(8000, () => {
    console.log('Server running on port 8000')
})