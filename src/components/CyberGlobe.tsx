import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const CyberGlobe = () => {
  const mesh1 = useRef<THREE.Mesh>(null);
  const mesh2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const time = state.clock.getElapsedTime();
    
    if (mesh1.current) {
      mesh1.current.rotation.y = time * 0.1;
      mesh1.current.rotation.x = time * 0.05;
      
      // Pulse effect
      const scale = 1 + Math.sin(time * 2) * 0.02;
      mesh1.current.scale.set(scale, scale, scale);
    }
    
    if (mesh2.current) {
      mesh2.current.rotation.y = -time * 0.07;
      mesh2.current.rotation.z = time * 0.03;
      
      const scale = 1.3 + Math.cos(time * 1.5) * 0.01;
      mesh2.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Inner Sphere */}
      <Sphere ref={mesh1} args={[1, 32, 32]}>
        <meshBasicMaterial 
          color="#00ff88" 
          wireframe 
          transparent 
          opacity={0.8} 
        />
      </Sphere>
      
      {/* Outer Sphere */}
      <Sphere ref={mesh2} args={[1, 16, 16]}>
        <meshBasicMaterial 
          color="#00ff88" 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </Sphere>
      
      {/* Ambient glow */}
      <pointLight position={[0, 0, 0]} color="#00ff88" intensity={1} distance={5} />
    </group>
  );
};
