import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react"

import {io} from "socket.io-client"
import RoomPanel from './components/RoomPanel';
import RoomForm from './components/RoomForm';


function App() {


  // states
  const [room, setRoom] = useState(null)
  const [roomUser, setRoomUser] = useState(null)

  const [socket, setSocket] = useState(null)

  // effects
  useEffect(() => {

    const _socket = io("/", {
      reconnection: false
    })

    _socket.on("hello", dataUser => {

      setRoomUser(dataUser)
      
      _socket.on("room_has_update", dataRoom => {

        console.log("has update")

        setRoom(dataRoom)
  
      })

    })

    

    _socket.on("disconnect", () => {

      setRoom(null)
      setRoomUser(null)

    })

    setSocket(_socket)

  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img style={{height: "200px"}} src={logo} className="App-logo" alt="logo" />
  
        {!roomUser ? (
          <div style={{color: "red"}}>You are not connected.</div>
        ) : (
            <div style={{color: "green"}}>You are connected under : {roomUser.id}</div>
        )}
      </header>


      {(!room && socket) && <RoomForm socket={socket} />}

      {
        (room && roomUser) && (
          <RoomPanel 
            socket={socket}
            roomUser={roomUser}
            room={room}
          />
        )
      }

    </div>
  );
}

export default App;
