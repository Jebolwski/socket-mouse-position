import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from 'socket.io-client';
// import robot from "robotjs";

function Index() {
  // robot.getMousePos();
  var socket = io.connect("http://localhost:3000");
  const [user,setUser] = useState();
  const [mousePos,setMousePos] = useState();
  const location = useLocation();

  const logMousePosition = (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    console.log(`Mouse Pozisyonu - X: ${mouseX}, Y: ${mouseY}`);
    socket.emit('mousemove', {"mousePos":{x:mouseX, y:mouseY}, "user":user});
    setMousePos({x:mouseX, y:mouseY});
  };
  useEffect(() => {
    setUser(location.state);

    window.addEventListener('mousemove', logMousePosition);
    return () => {
      window.removeEventListener('mousemove', logMousePosition);
    };
  }, []);

  useEffect(()=>{
    socket.on("user_moves_mouse",(data)=>{
      if (data.user.id!=user.id){
        console.log("farklı kullanıcı");
      }else{
        console.log("aynı kullanıcı");
      }
    })
  },[socket])

  
  return (
    <>
        <div>{user?.username}</div>
        <div>{mousePos?.x}, {mousePos?.y}</div>
    </>
  )
}

export default Index