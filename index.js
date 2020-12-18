const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(__dirname))
app.use('/assets',express.static('assets'))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.listen(5000, () => {
  console.log('express is listening on port 5000')
})