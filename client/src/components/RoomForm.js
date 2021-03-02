import { useState } from "react"

export default function RoomForm(props){

    // states
    const [roomId, setRoomId] = useState(null)


    // methods
    const onCreateRoom = () => {

        if(props.socket){

            props.socket.emit("create_room")

        }

    }

    const onJoinRoom = () => {

        if(props.socket){

            console.log("send")
            props.socket.emit("join_room", roomId)

        }

    }


    return (
        <div>

            <div className="form">

                <button onClick={onCreateRoom} type="submit" className="input">Create room</button>

            </div>

            <div className="form">

                <input 
                    className="input" 
                    onChange={event => {
                        setRoomId(event.target.value)
                    }} 
                    value={roomId} 
                    type="text" 
                    placeholder="id de la room"
                />
                <button onClick={onJoinRoom} type="submit" className="input submit" type="submit">Join</button>
            </div>

        </div>
    )

}