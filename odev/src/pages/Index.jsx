import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from 'socket.io-client';
import robot from "robotjs";
import "./index.css"

function Index() {
  var socket = io.connect("http://localhost:3000");
  
  const location = useLocation();
  robot.getMousePos();
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [prevX, setPrevX] = useState(null);
  const [prevY, setPrevY] = useState(null);
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      
      if (prevX === null || Math.abs(mouseX - prevX) >= 50 || Math.abs(mouseY - prevY) >= 50) {
        socket.emit('mousemove', {"mousePos":{x:mouseX, y:mouseY}, "user":location.state});
        setPrevX(mouseX);
        setPrevY(mouseY);
      }
    };
    
    socket.on("user_moves_mouse",(data)=>{
      if (data.user.id!=location.state.id){
        setX(data.mousePos.x);
        setY(data.mousePos.y);
      }
    })

    // Mouse hareket ettiğinde event listener'ı ekleme
    window.addEventListener('mousemove', handleMouseMove);

    // Component kaldırıldığında event listener'ı temizleme
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };

  }, [prevX, prevY,location]); // prevX ve prevY bağımlılıkları eklenir

  return (
    <>
        <div>{location.state?.username}</div>
        {/* <div>{mousePos?.x}, {mousePos?.y}</div> */}
        <div className="oyuncu" style={{
        position: 'absolute',
        left: x + 'px',
        top: y + 'px',
        width: '10px',
        height: '10px',
        backgroundColor: 'blue',
      }}></div>
    </>
  )
}

export default Index;