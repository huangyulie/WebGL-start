import { Model, Skybox, ThirdPersonCamera, useKeyboard, useLoop, World } from "lingo3d-react"
import { createRef, useRef } from "react"

function App() {

  const key = useKeyboard()
  const characterRef = createRef()
  //声明motion，用于表示当前角色应该对应的动画，默认为站立idle
  let motion = "idle";
  // 前
  if (key === "w") {
    motion = "walking"
  }
  // 后
  if (key === "s") {
    motion = "walking_backwards"
  }

  if (key === 'Space'){
    motion = "jump"
  }

  // useLoop 帧循环勾子
  useLoop(() => {
    characterRef.current.moveForward(-2)
  }, key === "w");

  useLoop(() => {
    characterRef.current.moveForward(2)
  }, key === "s");
  useLoop(() => {
    characterRef.current.y+=10;
    characterRef.current.moveForward(-2)
  }, key === 'Space');


  return (
    <World>
      <Skybox texture="wtf.webp" />
       <ThirdPersonCamera active mouseControl>
      <Model
        ref={characterRef}
        src="untitled.fbx"
        physics="character"
        animations={{ idle: "Hip Hop Dancing.fbx",walking: "Walking.fbx", walking_backwards: "Flair.fbx",jump:'Jumping.fbx' }}
        animation={motion}
        scale={1}
        x={100}
      >
      </Model>
      </ThirdPersonCamera>
      <Model
        src="map/scene.gltf"
        scale={50}
        physics="map"
      />
    </World >
  )
}

export default App
