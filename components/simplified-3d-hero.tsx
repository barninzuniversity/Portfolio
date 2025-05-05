"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, PerspectiveCamera } from "@react-three/drei"
import { Suspense } from "react"

// Simplified floating text
function FloatingText({ text, position, size = 1, color = "#ffffff" }) {
  const textRef = useRef()

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime()) * 0.2
    }
  })

  return (
    <Text 
      ref={textRef} 
      position={position} 
      fontSize={size} 
      color={color} 
      anchorX="center" 
      anchorY="middle"
    >
      {text}
    </Text>
  )
}

// Simplified sphere
function SimpleSphere({ position, color }) {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export default function SimplifiedThreeDHero() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          
          <SimpleSphere position={[-3, 1, 0]} color="#ff6600" />
          <SimpleSphere position={[3, -1, -2]} color="#00aaff" />
          
          <FloatingText text="Welcome" position={[0, 2, 0]} size={1.5} color="#ffffff" />
          <FloatingText text="to my portfolio" position={[0, 0.5, 0]} size={1} color="#88ccff" />
          <FloatingText text="Explore my work" position={[0, -1, 0]} size={0.7} color="#aaffaa" />
        </Suspense>
      </Canvas>
    </div>
  )
}