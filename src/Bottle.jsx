import React from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three"; // Import for animation
import * as THREE from "three";

export function Bottle({ color, labelTexture }) {
  const { nodes, materials } = useGLTF("/model/bottle.glb");

  // Create a custom material for the label if a label texture is provided
  const labelMaterial = new THREE.MeshStandardMaterial({
    roughness: 0.5, // Adjust as needed
    metalness: 0.8, // Adjust as needed
  });

  if (labelTexture) {
    const texture = new THREE.TextureLoader().load(labelTexture);
    labelMaterial.map = texture;
  }

  const animatedProps = useSpring({
    color: color,
    delay: 500, // Start after 500ms
    config: { duration: 1000 },
  });
  

  return (
    <group position={[0, -1, 0]} dispose={null}>
      <group scale={0.079}>
        {/* Bottle Top */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Bottle_Top001.geometry}
          material={materials["Material.002"]}
          position={[0, 3.015, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Bottle_Top002.geometry}
          material={
            labelTexture
              ? labelMaterial
              : new THREE.MeshStandardMaterial({
                  ...materials["123248_schreiner_1_pae-kirschenlikoer_1000"],
                  roughness: 0.5,
                  metalness: 0,
                })
          }
          position={[0.001, 6.5, 3]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={10.5}
        />

          {/* Glass Bottle */}
          <group position={[0, 3.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <animated.mesh
              castShadow
              receiveShadow
              geometry={nodes.Glass001.geometry}
              material={materials["Glass.003"]}
              material-color={animatedProps.color} // Smooth color animation
              scale={[0.936, 0.915, 1]}
            />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Glass003.geometry}
            material={materials["glas clear.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Glass008.geometry}
            material={materials["Glass.002"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/model/bottle.glb");