import { Canvas } from "@react-three/fiber";
import {
  IControlProps,
  IControlRef,
  IModelProps,
  IPageProps,
  IProxyCurrentState,
} from "./interfaces";
import React, {
  Suspense,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  CameraControls,
  ContactShadows,
  OrbitControls,
  useCursor,
  useGLTF,
} from "@react-three/drei";
import { approxEquals, objects } from "./constants";
import * as THREE from "three";
import { proxy, useSnapshot } from "valtio";
import BackButton from "../back-button";
import { navigate } from "gatsby";

const Canvas3D = forwardRef<IControlRef, IPageProps>((props, ref) => {
  // state
  const modes = ["translate", "rotate", "scale"];

  // snapshot
  const state = proxy<IProxyCurrentState>({
    current: null,
    mode: 0,
    position: new THREE.Vector3(),
  });

  // other hooks
  const { nodes }: any = useGLTF("./collection/compressed.glb");
  const controlsRef: any = useRef();

  const Model = (modelProps: IModelProps) => {
    const snap = useSnapshot(state);
    const [hovered, setHovered] = useState(false);
    useCursor(hovered);
    return (
      <>
        <mesh
          name={modelProps.name}
          position={modelProps.position}
          rotation={modelProps.rotation}
          scale={modelProps.scale}
          onClick={(e) => {
            e.stopPropagation();
            state.current = modelProps.name;
            state.position = modelProps.position;
            if (modelProps.func) {
              modelProps.func(true);
            }
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={(e) => setHovered(false)}
          geometry={nodes[modelProps.name].geometry}
          material={nodes[modelProps.name].material}
          material-color={
            state.current === modelProps.name || hovered
              ? modelProps.color
              : "white"
          }
          castShadow={true}
          receiveShadow={true}
        />

        {state.current === modelProps.name && (
          <>
          <OrbitControls
          autoRotate={true}
          />
            <pointLight
              position={[
                modelProps.position[0] + 5,
                modelProps.position[1],
                modelProps.position[2],
              ]}
              intensity={50}
            />
            <pointLight
              position={[
                modelProps.position[0],
                modelProps.position[1] + 5,
                modelProps.position[2],
              ]}
              intensity={50}
            />
            <pointLight
              position={[
                modelProps.position[0],
                modelProps.position[1],
                modelProps.position[2] + 5,
              ]}
              intensity={50}
            />
            <pointLight
              position={[
                modelProps.position[0] + 5,
                modelProps.position[1] + 5,
                modelProps.position[2] + 5,
              ]}
              intensity={50}
            />
          </>
        )}
      </>
    );
  };

  const Controls = forwardRef<IControlRef, IControlProps>(
    (controlProps, ref) => {
      const snap = useSnapshot(state);
      const cameraControlsRef: any = useRef();
      const meshRef: any = useRef();
      const [isZoom, setIsZoom] = useState<boolean | undefined>(undefined);

      const handleReset = () => {
        state.current = null;
        state.position = [0, 0, 0];
        cameraControlsRef.current?.reset(true);
        if (controlProps.func) {
          controlProps.func(false);
          setIsZoom(false);
        }
        console.log("BABI");
      };

      useImperativeHandle(ref, () => ({
        func: () => {
            handleReset();
        },
      }));

      useEffect(() => {
        if (
          !approxEquals(snap.position[0], 0) ||
          !approxEquals(snap.position[1], 0) ||
          !approxEquals(snap.position[2], 0)
        ) {
          cameraControlsRef.current?.setLookAt(
            snap.position[0] * 3,
            snap.position[1] < 0 ? -10 : snap.position[1] * 3,
            snap.position[2] * 3,
            snap.position[0],
            snap.position[1] + 5,
            snap.position[2],
            true
          );
          cameraControlsRef.current?.zoomTo(1.2, true);
        }
      }, [snap.position]);

      useEffect(() => {
        cameraControlsRef.current?.reset(true);
      }, []);

      return (
        <>
          <OrbitControls
            makeDefault
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 1.75}
          />
          <CameraControls ref={cameraControlsRef} />

          <Suspense fallback={null}>
            <group position={[0, 0, 0]} ref={meshRef}>
              {objects.map((obj: IModelProps) => (
                <>
                  <Model
                    name={obj.name}
                    color={obj.color}
                    position={obj.position}
                    rotation={obj.rotation}
                    scale={obj.scale}
                    func={(e) => {
                      if (e != null) {
                        if (controlProps.func) {
                          controlProps.func(e);
                        }
                      }
                    }}
                  />
                </>
              ))}
              <ContactShadows
                rotation-x={Math.PI / 2}
                position={[0, -35, 0]}
                opacity={0.25}
                width={200}
                height={200}
                blur={1}
                far={50}
              />
            </group>
          </Suspense>
        </>
      );
    }
  );

  useImperativeHandle(ref, () => ({
    func: () => {
        controlsRef.current?.func();
    }
  }));

  return (
    <Canvas
      camera={{ position: [0, -10, 80], fov: 50 }}
      dpr={[1, 2]}
      style={{
        width: props.width ?? "100vw",
        display: "flex",
        height: props.height ?? "100vh",
      }}
    >
      <pointLight position={[100, 100, 100]} intensity={2} />
      <hemisphereLight
        color="#ffffff"
        groundColor="#b9b9b9"
        position={[-7, 25, 13]}
        intensity={0.85}
      />
      <Controls
        func={(e) => {
          if (e != null) {
            if (props.callback) {
              props.callback(e);
            }
          }
        }}
        ref={controlsRef}
      />
    </Canvas>
  );
});

export default Canvas3D;
