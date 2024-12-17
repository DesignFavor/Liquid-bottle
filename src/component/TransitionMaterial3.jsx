import * as THREE from "three";
import { extend } from "@react-three/fiber";

class TransitionMaterial3 extends THREE.MeshStandardMaterial {
  constructor(props) {
    super(props);
    this.onBeforeCompile = (shader) => {
      shader.uniforms.transitionColor = { value: new THREE.Color(props.color || "#ffffff") };
      shader.vertexShader = `
        varying vec3 vPosition;
        ${shader.vertexShader}
      `.replace(
        `#include <begin_vertex>`,
        `
        vPosition = position;
        #include <begin_vertex>
        `
      );
      shader.fragmentShader = `
        uniform vec3 transitionColor;
        varying vec3 vPosition;
        ${shader.fragmentShader}
      `.replace(
        `#include <dithering_fragment>`,
        `
        vec3 mixedColor = mix(gl_FragColor.rgb, transitionColor, vPosition.y * 0.5 + 0.5);
        gl_FragColor = vec4(mixedColor, gl_FragColor.a);
        #include <dithering_fragment>
        `
      );
    };
  }
}
extend({ TransitionMaterial3 });
