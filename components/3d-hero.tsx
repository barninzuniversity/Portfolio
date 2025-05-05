"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Text, Environment, Float, PerspectiveCamera, Sphere } from "@react-three/drei"
import { Suspense } from "react"
import { Vector3, MathUtils } from "three"
import { useSpring, animated, config } from "@react-spring/three"
import { Bloom, EffectComposer } from "@react-three/postprocessing"

// Animated floating particles
function Particles({ count = 100, color = "#88ccff" }) {
  const mesh = useRef()
  const [positions, setPositions] = useState([])

  useEffect(() => {
    // Generate random positions for particles
    const tempPositions = []
    for (let i = 0; i < count; i++) {
      tempPositions.push([Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10])
    }
    setPositions(tempPositions)
  }, [count])

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.001
      mesh.current.rotation.y += 0.002
    }
  })

  return (
    <group ref={mesh}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

// Animated floating text
function FloatingText({ text, position, rotation, size = 1, color = "#ffffff" }) {
  const textRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  const { scale } = useSpring({
    scale: hovered ? 1.2 : 1,
    config: config.wobbly,
  })

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y += Math.sin(clock.getElapsedTime()) * 0.002
    }
  })

  return (
    <animated.group
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Text ref={textRef} fontSize={size} color={color} anchorX="center" anchorY="middle" font="/fonts/Inter_Bold.json">
        {text}
      </Text>
    </animated.group>
  )
}

// Interactive sphere with distortion
function InteractiveSphere({ position = [0, 0, 0], color = "#ff8800" }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const { scale, distort } = useSpring({
    scale: hovered ? 1.2 : 1,
    distort: clicked ? 1.0 : 0.4,
    config: config.wobbly,
  })

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.2
    }
  })

  return (
    <animated.group position={position} scale={scale}>
      <Sphere
        ref={meshRef}
        args={[1, 64, 64]}
        onClick={() => setClicked(!clicked)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <animated.meshPhysicalMaterial
          color={color}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
          metalness={0.1}
          roughness={0.2}
          distort={distort}
        />
      </Sphere>
    </animated.group>
  )
}

// Camera controller with smooth movements
function CameraController() {
  const { camera } = useThree()
  const [target] = useState(() => new Vector3(0, 0, 0))

  useFrame(({ mouse, viewport }) => {
    const x = (mouse.x * viewport.width) / 50
    const y = (mouse.y * viewport.height) / 50
    camera.position.x = MathUtils.lerp(camera.position.x, x, 0.05)
    camera.position.y = MathUtils.lerp(camera.position.y, y, 0.05)
    camera.lookAt(target)
  })

  return null
}

export default function ThreeDHero() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
          <CameraController />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <pointLight position={[-10, -10, -10]} color="#ff0000" intensity={0.2} />
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <InteractiveSphere position={[-3, 1, 0]} color="#ff6600" />
            <InteractiveSphere position={[3, -1, -2]} color="#00aaff" />
            <InteractiveSphere position={[0, 0, -5]} color="#ff00ff" />
          </Float>
          <Particles count={200} />
          <FloatingText text="Welcome" position={[0, 2, 0]} rotation={[0, 0, 0]} size={1.5} color="#ffffff" />
          <FloatingText text="to my portfolio" position={[0, 0.5, 0]} rotation={[0, 0, 0]} size={1} color="#88ccff" />
          <FloatingText text="Explore my work" position={[0, -1, 0]} rotation={[0, 0, 0]} size={0.7} color="#aaffaa" />
          <Environment preset="city" />
          <EffectComposer>
            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}