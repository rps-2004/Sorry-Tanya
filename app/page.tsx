"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { Heart } from "lucide-react"

export default function ApologyPage() {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    // Start the animation sequence after a short delay
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-pink-500/20 to-purple-900/40">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <FloatingHeart position={[-4, 0, 0]} />
          <FloatingHeart position={[4, 0, 0]} />
          <FloatingHeart position={[0, 3, 0]} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4">
        <AnimatePresence>
          {showMessage && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mb-8 flex items-center"
              >
                <Heart className="mr-2 h-8 w-8 text-red-500" fill="currentColor" />
                <h1 className="text-center text-4xl font-bold text-white md:text-6xl">I am sorry Tanya</h1>
                <Heart className="ml-2 h-8 w-8 text-red-500" fill="currentColor" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="mb-8 text-center text-3xl font-medium text-white md:text-5xl"
              >
                and I love youu
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.5 }}
                className="text-center text-2xl font-light text-white md:text-4xl"
              >
                maaf kr do
              </motion.div>

              <motion.div
                className="mt-12 flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3.5 }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -10, 0],
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      delay: i * 0.2,
                    }}
                  >
                    <Heart className="h-8 w-8 text-red-500 md:h-12 md:w-12" fill="currentColor" />
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Floating particles */}
      <FloatingParticles />
    </div>
  )
}

function FloatingHeart({ position }: { position: [number, number, number] }) {
  const mesh = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.2
    mesh.current.rotation.y += delta * 0.3

    // Add a gentle floating motion
    mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.3
  })

  return (
    <mesh ref={mesh} position={position} scale={0.5}>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

function FloatingParticles() {
  const particlesRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([])

  useEffect(() => {
    // Create particles
    const newParticles = []
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      })
    }
    setParticles(newParticles)
  }, [])

  return (
    <div ref={particlesRef} className="absolute inset-0 z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-pink-500/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 10 + particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}

