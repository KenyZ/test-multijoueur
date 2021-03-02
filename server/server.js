console.clear()

const express = require("express")
const http = require('http')
const SocketIO = require("socket.io")

const app = express()
const server = http.Server(app)
const io = SocketIO(server)

const port = 1234


const rooms = {

}


/** ####### */

const createRoom = () => ({
  name: `room-${Date.now()}`,
  users: [],
  actions: 0
})


const joinRoom = (socket, user, room) => {

    if(user.inRoom && rooms[user.inRoom]){

      leaveRoom(socket, user, rooms[user.inRoom])

    }

    // join room 
    socket.join(room.name)

    // add me in users list 
    room.users.push(user.id)

    // store current room in user
    user.inRoom = room.name

    // emit update in room & for me
    socket.to(room.name).emit("room_has_update", room)  
    socket.emit("room_has_update", room)  

    console.log(room)

}

const leaveRoom = (socket, user, room) => {

  // remove me from the room
  room.users = room.users.filter(f => f !== user.id)

  // leave room
  socket.to(room.name).leave()

  // notify my departure
  socket.to(room.name).broadcast.emit("room_has_update", room)

}

io.on('connection', socket => {

  const id = socket.id
  const me = {
    id: id,
    inRoom: null
  }


  /** EVENTS */
  socket.on("disconnect", () => {

    console.log(`+ user ${id} has disconnected`)

    let currentRoomName = me.inRoom
    

    if(currentRoomName && rooms[currentRoomName]){

      leaveRoom(socket, me, rooms[currentRoomName])

    }

  })

  socket.on("add_actions", _room => {

    if(me.inRoom){

      let theRoom = rooms[me.inRoom]

      // increment actions
      theRoom.actions++

      // notify update
      io.to(theRoom.name).emit("room_has_update", theRoom)

    }

  })

  socket.on("create_room", () => {

    // create object
    let newRoom = createRoom()

    // store in rooms list
    rooms[newRoom.name] = newRoom

    // make me join newRoom
    joinRoom(socket, me, newRoom)

    console.log("+ has created room " + newRoom.name)

  })

  socket.on("join_room", _roomId => {

    if(rooms[_roomId]){

      joinRoom(socket, me, rooms[_roomId])

    }

  })


  /** CONNECTION */
  console.log(`user ${id} has connected`)


  // pass user info
  socket.emit("hello", me)

})

server.listen(port, () => {
  console.log('listening on *:' + port)
})