import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Canvas3D from "../components/3d-canvas";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import BackButton from "../components/back-button";
import Layout from "../components/layout";
import Cursor from "../components/cursor";
import { useCursor } from "use-cursor";
import { useMouse } from "@uidotdev/usehooks";
import { proxy, useSnapshot } from "valtio";

gsap.registerPlugin(useGSAP);

export const mouseState = proxy({
  x: 0,
  y: 0,
});

function Home() {
  // state
  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
  });
  let mouseX = 0;
  let mouseY = 0;
  // history
  // refs
  const appRef: any = useRef();
  const childRef: any = useRef();

  // other hooks
  const { contextSafe } = useGSAP({ scope: appRef });
  const snap = useSnapshot(mouseState);
  // const [mouse, mouseRef] = useMouse<any>();

  const changePos = contextSafe((back: boolean) => {
    if (!back) {
      gsap.to(".canvas3d", { left: 0, ease: "power1.inOut" });
    } else {
      gsap.to(".canvas3d", { left: -700, ease: "power1.inOut" });
    }
  });

  const RenderChildren = () => {
    return (
      <div
        ref={appRef}
        style={{
          width: "100%",
          maxHeight: "100%",
          background: "radial-gradient(circle at center, #261e34, #282c34)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            position: "absolute",
            zIndex: 0,
            fontSize: 120,
            fontWeight: "bold",
            top: 0,
            // maxWidth: "50vw",
            textAlign: "center",
          }}
        >
          Ansel's Website
        </p>
        <BackButton
          callbackFunc={() => {
            childRef.current?.func();
          }}
        />
        <div
          className="canvas3d"
          style={{
            zIndex: 0,
            position: "absolute",
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <Canvas3D
            callback={(e) => {
              changePos(e);
            }}
            ref={childRef}
          />
        </div>
      </div>
    );
  };

  return (
    // <main
    //   ref={appRef}
    //   style={{
    //     // backgroundColor: "#282c34",
    //     background: "radial-gradient(circle at center, #261e34, #282c34)",
    //     // minHeight: "100vh",
    //     // width: "100%",
    //     width: "100vw",
    //     height: "100vh",
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     fontSize: "calc(10px + 2vmin)",
    //     color: "white",
    //     pointerEvents: "none",
    //     // cursor: "none"
    //   }}
    // >

    // </main>
    <Layout>
      <RenderChildren />
    </Layout>
  );
}

export default Home;

export const Head: HeadFC = () => <title>Ansel's Portofolio Website</title>;
