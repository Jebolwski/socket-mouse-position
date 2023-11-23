import io from 'socket.io-client';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    
    const navigate = useNavigate();
    var socket = io.connect("http://localhost:3000");
    const [name,setName] = useState();

    useEffect(()=>{
      socket.on("new_user",(data)=>{
        if (data.username == name){
          navigate("/lobby", { state: { username: name,id:data.id } });
        }
      })
    },[socket])
  return (
    <>
        <div>Login</div>
        <input type="text" placeholder="name?" onChange={(e)=>{setName(e.target.value)}} />
        <button onClick={()=>{socket.emit('join',{"username":name})}}>giriş yap</button>
    </>
  )
}

export default Login