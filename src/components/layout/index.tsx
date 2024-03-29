import React, { useEffect, useState } from "react";
import Canvas3D from "../3d-canvas";
import { ILayoutProps } from "./interfaces";
import Navigation from "../navigation";
import { proxy, useSnapshot } from "valtio";
import Cursor from "../cursor";
import { useMouse } from "@uidotdev/usehooks";

export const mouseState = proxy({
  x: 0,
  y: 0,
});

function Layout(props: ILayoutProps) {
  const snap = useSnapshot(mouseState);
  const cursor = useMouse();

  const [cur, setCur] = useState({
    x: 0,
    y:0
  })

  useEffect(()=>{
    const mouseMove = (e:any) =>{
      mouseState.x = e.clientX;
        mouseState.y = e.clientY;
    }

    window.addEventListener("mousemove", mouseMove);

    return () =>{
      window.removeEventListener("mousemove", mouseMove)
    }
  },[])

  return (
    <div
      style={{
        // backgroundColor: "#282c34",
        background: "radial-gradient(circle at center, #261e34, #282c34)",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "calc(10px + 2vmin)",
        color: "white",
      }}
      // onMouseMove={(e) => {
      //   mouseState.x = e.clientX;
      //   mouseState.y = e.clientY;
      //   // setCur({
      //   //   x: e.clientX,
      //   //   y: e.clientY
      //   // })
      // }}
    >
      <Cursor x={snap.x} y={snap.y} />
      <main 
       style={{
        // backgroundColor: "#282c34",
        background: "radial-gradient(circle at center, #261e34, #282c34)",
        maxWidth: "100%",
        maxHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "calc(10px + 2vmin)",
        color: "white",
        overflow: "hidden"
      }}
      >{props.children}</main>
      {/* <Navigation />
      <div>{props.children}</div> */}
    </div>
  );
}

export default Layout;
