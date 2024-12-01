import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function Bottle({ color, labelTexture }) {
  const { nodes, materials } = useGLTF("./model/bottle.glb");

  // Load label texture if provided
  const labelMaterial = new THREE.MeshStandardMaterial();
  if (labelTexture) {
    const texture = new THREE.TextureLoader().load(labelTexture);
    labelMaterial.map = texture;
  }

  return (
    <group position={[0, -1, 0]} dispose={null}>
      <group scale={0.079}>
        {/* Bottle Top */}
        <group position={[0, 3.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh castShadow receiveShadow
            geometry={nodes.Bottle_Top001.geometry}
            material={materials["Material.002"]}
          />
          <mesh castShadow receiveShadow
            geometry={nodes.Bottle_Top002.geometry}
            material={labelTexture ? labelMaterial : materials["Bottle Top.002"]}
          />
        </group>

        {/* Glass Bottle */}
        <group position={[0, 3.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh castShadow receiveShadow
            geometry={nodes.Glass001.geometry}
            material={materials["Glass.003"]}
            material-color={color}
          />
          <mesh castShadow receiveShadow geometry={nodes.Glass003.geometry} material={materials["Glass.002"]} />
          <mesh castShadow receiveShadow geometry={nodes.Glass004.geometry} material={materials["Glass.002"]} />
          <mesh castShadow receiveShadow geometry={nodes.Glass008.geometry} material={materials["Glass.002"]} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./model/bottle.glb");
