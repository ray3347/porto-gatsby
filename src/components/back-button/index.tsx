import React, { useRef, useState } from "react";
import { IBackButtonProps } from "./interfaces";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import './index.css';
gsap.registerPlugin(useGSAP);

function BackButton(props: IBackButtonProps) {
  const buttonRef: any = useRef();
//   const [tl, setTl] = useState<any>();

//   useGSAP(() => {
//     const tl = gsap.timeline();
//     setTl(tl);
//   });

//   const { contextSafe } = useGSAP({ scope: buttonRef });

//   const changeButton = contextSafe((e:boolean) => {
//     gsap.to(".backButton", {ease: "elastic.inOut", background: "#03a9f4", border: "solid 2px"});
//     // if(e){
        
//     // }
//   });


const [hover, setHover] = useState(false);

const backgroundStyle:any = {
    background: '#fff',
    color: hover ? '#fff' : '#333',
    overflow: 'hidden',
    zIndex: 5,
    position: 'relative',
  };

  const beforeStyle:any = {
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    height: '101%',
    width: '101%',
    clipPath: hover ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : 'polygon(0 0, 100% 0, 10% 25%, 0 100%)',
    background: '#444',
    borderRadius: '5px',
    transition: '0.3s cubic-bezier(0.38, 1.15, 0.7, 1.12)',
    boxSizing: 'border-box',
    zIndex: -1,
  };

  return (
    <button
      ref={buttonRef}
      // style={{...backgroundStyle}}
      style={{
        position: "absolute",
        top: 20,
        pointerEvents: "auto",
        zIndex: 2,
        borderRadius: 50,
        padding: 25,
        left: 20,
        background: "#0d0d0d",
        border: "solid 2px white",
        clipPath: "polygon(0,0,100%,0,10%,25%,0,100%)",
        // background: "#444",
        cursor: "pointer",
        overflow: "hidden",
      }}
      onClick={props.callbackFunc}
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 18 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 4V10C18 11.103 17.104 12 16 12H2V9H15V5H4V7L0 3.5L4 0V2H16C16.5304 2 17.0391 2.21071 17.4142 2.58579C17.7893 2.96086 18 3.46957 18 4Z"
          fill="white"
        />
      </svg>
    </button>
  );
}

export default BackButton;
