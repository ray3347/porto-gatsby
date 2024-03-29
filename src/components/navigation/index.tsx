import React, { useRef } from "react";
import Canvas3D from "../3d-canvas";
import { useGSAP } from "@gsap/react";
import BackButton from "../back-button";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);
function Navigation() {
  // history
  // refs
  const appRef: any = useRef();
  const childRef: any = useRef();

  // other hooks
  const { contextSafe } = useGSAP({ scope: appRef });

  const changePos = contextSafe((back: boolean) => {
    if (!back) {
      gsap.to(".canvas3d", { left: 0, ease: "power1.inOut" });
    } else {
      gsap.to(".canvas3d", { left: -700, ease: "power1.inOut" });
    }
  });
  return (
    <div ref={appRef}>
      {/* <BackButton
        callbackFunc={() => {
          childRef.current?.func();
        }}
      /> */}
      <div
        className="canvas3d"
        style={{
          zIndex: 1,
          position: "absolute",
          pointerEvents: "auto",
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
}

export default Navigation;
