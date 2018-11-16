const express = require('express')
const path = require('path')

const PORT = 4000
const ROOT_PATH = path.join(__dirname, '..')

const app = express()

app.use(express.static(path.join(ROOT_PATH, 'example')))
app.use(express.static(ROOT_PATH))

const timidityPath = path.dirname(require.resolve('timidity'))
app.use(express.static(timidityPath))

const freepatsPath = path.dirname(require.resolve('freepats'))
app.use(express.static(freepatsPath))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
