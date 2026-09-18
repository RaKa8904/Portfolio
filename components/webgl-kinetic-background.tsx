"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { scrollUniformStore } from "@/components/smooth-scroll-provider";

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform float uScrollVelocity;
  uniform vec2 uMouse;

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Displacement influenced by time, mouse proximity, and scroll velocity
    float distToMouse = length(uv - uMouse);
    float mouseRepulse = smoothstep(0.4, 0.0, distToMouse) * 0.15;

    float noiseVal = snoise(uv * 2.2 + vec2(uTime * 0.12, uTime * 0.08));
    float velEffect = clamp(abs(uScrollVelocity) * 0.003, 0.0, 0.4);

    pos.z += (noiseVal * 0.18 + mouseRepulse + velEffect * noiseVal);
    vPosition = pos;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform float uScrollVelocity;
  uniform float uScrollProgress;
  uniform vec2 uMouse;
  uniform vec2 uResolution;

  // Simplex 2D noise helper
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = vUv;

    // Dynamic wave coordinate distortion
    float vel = clamp(abs(uScrollVelocity) * 0.0015, 0.0, 0.35);
    float t = uTime * 0.08 + uScrollProgress * 1.5;

    // Dual-layer noise for organic liquid gradients
    float n1 = snoise(st * 1.8 + vec2(t * 0.6, t * 0.4));
    float n2 = snoise(st * 3.5 - vec2(t * 0.4, -t * 0.5) + n1 * 0.3);

    // Color Palette Definition (Eye-soothing editorial paper & nature tones)
    vec3 colorPaper     = vec3(0.968, 0.965, 0.945); // #F7F6F1 Warm Alabaster
    vec3 colorForest    = vec3(0.051, 0.220, 0.161); // #0D3829 Deep Pine
    vec3 colorTerracotta= vec3(0.851, 0.361, 0.247); // #D95C3F Warm Clay
    vec3 colorCeladon   = vec3(0.357, 0.659, 0.569); // #5BA891 Soft Celadon
    vec3 colorPaperWarm = vec3(0.980, 0.973, 0.961); // #FAF8F5 Alabaster Light

    // Gradient synthesis
    vec3 mixedColor = colorPaper;

    // Soft liquid green swirls (subtle alpha so text remains 100% legible)
    float forestMask = smoothstep(-0.2, 0.7, n1) * 0.12;
    forestMask += vel * 0.15;
    mixedColor = mix(mixedColor, colorForest, forestMask);

    // Terracotta solar warmth highlights
    float terraMask = smoothstep(0.1, 0.85, n2) * 0.08;
    mixedColor = mix(mixedColor, colorTerracotta, terraMask);

    // Celadon ambient edges
    float celadonMask = smoothstep(-0.6, 0.2, n2 * n1) * 0.06;
    mixedColor = mix(mixedColor, colorCeladon, celadonMask);

    // Mouse interactive focal glow
    float mouseGlow = smoothstep(0.5, 0.0, length(vUv - uMouse)) * 0.06;
    mixedColor = mix(mixedColor, colorPaperWarm, mouseGlow);

    // Vignette towards edges for deep editorial feel
    float vignette = length(vUv - vec2(0.5));
    mixedColor = mix(mixedColor, colorPaper * 0.96, smoothstep(0.3, 0.8, vignette));

    gl_FragColor = vec4(mixedColor, 1.0);
  }
`;

export function WebGLKineticBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    // 2. High-Performance Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Uniforms Setup
    const uniforms = {
      uTime: { value: 0 },
      uScrollVelocity: { value: 0 },
      uScrollProgress: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    };

    // 4. Mesh with Custom GLSL Shader
    const geometry = new THREE.PlaneGeometry(2, 2, 48, 48);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 5. Floating 3D Ambient Dust Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 2;
      particlePos[i + 1] = (Math.random() - 0.5) * 2;
      particlePos[i + 2] = 0.5;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 3.5,
      color: 0x0d3829,
      transparent: true,
      opacity: 0.15,
      blending: THREE.NormalBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Smooth Mouse LERP interpolation
    const mouseTarget = { x: 0.5, y: 0.5 };
    const mouseCurrent = { x: 0.5, y: 0.5 };

    const handleMouseMove = (e: MouseEvent) => {
      mouseTarget.x = e.clientX / window.innerWidth;
      mouseTarget.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 7. Resize Handler
    const handleResize = () => {
      if (!renderer) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      uniforms.uResolution.value.set(width, height);
    };
    window.addEventListener("resize", handleResize);

    // 8. 60 FPS Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let smoothedVelocity = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      uniforms.uTime.value = elapsedTime;

      // Smooth mouse LERP
      mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.06;
      mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.06;
      uniforms.uMouse.value.set(mouseCurrent.x, mouseCurrent.y);

      // Smooth scroll velocity and progress from store
      smoothedVelocity += (scrollUniformStore.velocity - smoothedVelocity) * 0.1;
      uniforms.uScrollVelocity.value = smoothedVelocity;
      uniforms.uScrollProgress.value = scrollUniformStore.progress;

      // Ambient particle drift
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += 0.0004 + Math.abs(smoothedVelocity) * 0.00005;
        if (positions[i] > 1) positions[i] = -1;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      geometry.dispose();
      material.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      rendererRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none w-full h-full"
      style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh" }}
      aria-hidden="true"
    />
  );
}
