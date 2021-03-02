
export default function RoomPanel(props){

    // methods
    
    const addActionToRoom = () => {

        if(props.socket && props.roomUser){

            props.socket.emit("add_actions", props.room)

        }

    }


    return (
        <div className="RoomPanel">
            <div style={{marginBottom: "4px"}}>
  
                <button onClick={addActionToRoom} className="btn__action">Action</button>

            </div>

            <h2 style={{color: "#fff"}}>Room</h2>

            <ul className="list-users">

                <li>
                    <em>name:</em> <span style={{color: "lightgray", fontStyle: "italic"}}>{props.room.name}</span>
                </li>

                <li>
                    <em>actions:</em> <span style={{color: "lightgray", fontStyle: "italic"}}>{props.room.actions}</span>
                </li>

                <li>
                    <em>users:</em> 
                    <ul>
                    {
                        props.room.users.map(u => (
                        <li key={u}>
                            <span style={{color: "lightgray", fontStyle: "italic"}}>{

                            u === props.roomUser.id ? (
                                <span style={{textDecoration: "underline"}}>{u}</span>
                            ) : u

                            }</span>
                        </li>
                        ))
                    }
                    </ul>
                </li>

            </ul>
        </div>
    )

}