const PORT = 3000
const app = require('../app')
const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.on('connection', (socket) => {
  console.log('User connected')
  socket.on('previousSlide', (payload) => {
    io.emit('setPreviousSlide', payload)
  })

  socket.on('nextSlide', (payload) => {
    io.emit('setNextSlide', payload)
  })
})


server.listen(PORT, () => {
  console.log('Server is listening on port '+ PORT)
})