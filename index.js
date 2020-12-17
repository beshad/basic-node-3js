const express = require('express')
const app = express()

app.use(express.static(__dirname))
// app.use(express.static('images'))
app.use('/static',express.static('static'))
app.listen(5000, () => {
  console.log('express is listening on port 5000')
})