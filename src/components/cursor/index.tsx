import { motion } from "framer-motion";
import React from "react";
import { ICursorProps } from "./interfaces";

function Cursor(props: ICursorProps) {
  const cursorVariants = {
    default: {
      x: props.x,
      y: props.y,
    },
  };

  return (
    <motion.div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 50,
        border: "solid 2px white",
        padding: 10,
        position: "fixed",
        top: 0,
        left: 0,
      //   alignItems: "center",
      //   justifyContent: "center",
        zIndex: 5
      }}
      variants={cursorVariants}
      animate={cursorVariants.default}
    >
      <motion.div
        style={{
          height: "5px",
          width: "5px",
          borderRadius: 50,
          backgroundColor: "white",
        }}
      />
    </motion.div>
  );
}

export default Cursor;
