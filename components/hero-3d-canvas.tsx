"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) return;
    } catch {
      return;
    }

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3, 16);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Color Palette for Editorial Light Paper:
    // Forest Pine Green (#0D3829), Terracotta (#D95C3F), Celadon Sage (#5BA891)
    const colorForest = new THREE.Color("#0D3829");
    const colorTerracotta = new THREE.Color("#D95C3F");
    const colorCeladon = new THREE.Color("#5BA891");

    // 1. Organic Fluid Wave Mesh (Point cloud)
    const cols = 32;
    const rows = 32;
    const count = cols * rows;
    const waveGeo = new THREE.BufferGeometry();
    const wavePositions = new Float32Array(count * 3);
    const waveColors = new Float32Array(count * 3);

    const spacing = 0.55;
    const offsetX = (cols * spacing) / 2;
    const offsetZ = (rows * spacing) / 2;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const index = (i * rows + j) * 3;
        wavePositions[index] = i * spacing - offsetX;
        wavePositions[index + 1] = 0;
        wavePositions[index + 2] = j * spacing - offsetZ;

        const dist = Math.hypot(wavePositions[index], wavePositions[index + 2]);
        const mix = Math.min(1, dist / 9);
        const col = new THREE.Color().lerpColors(colorForest, colorTerracotta, mix);

        waveColors[index] = col.r;
        waveColors[index + 1] = col.g;
        waveColors[index + 2] = col.b;
      }
    }

    waveGeo.setAttribute("position", new THREE.BufferAttribute(wavePositions, 3));
    waveGeo.setAttribute("color", new THREE.BufferAttribute(waveColors, 3));

    const waveMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });

    const wavePoints = new THREE.Points(waveGeo, waveMat);
    wavePoints.rotation.x = -Math.PI / 4;
    wavePoints.position.y = -2;
    mainGroup.add(wavePoints);

    // 2. Tactile Clay Icosahedron Core
    const coreGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: colorForest,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = 1.2;
    mainGroup.add(coreMesh);

    // 3. Orbital Gyroscope Rings in Warm Terracotta & Celadon
    const ring1Geo = new THREE.TorusGeometry(3.3, 0.04, 16, 80);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: colorTerracotta,
      transparent: true,
      opacity: 0.65,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.position.y = 1.2;
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(3.6, 0.03, 16, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: colorCeladon,
      transparent: true,
      opacity: 0.6,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.position.y = 1.2;
    ring2.rotation.y = Math.PI / 4;
    mainGroup.add(ring2);

    // Mouse Tracking Physics
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 2;
      mouseY = y * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      targetX += (mouseX * 0.4 - targetX) * 0.05;
      targetY += (mouseY * 0.4 - targetY) * 0.05;

      mainGroup.rotation.y = time * 0.12 + targetX;
      mainGroup.rotation.x = Math.sin(time * 0.1) * 0.08 + targetY * 0.4;

      coreMesh.rotation.y = -time * 0.3;
      ring1.rotation.z = time * 0.25;
      ring2.rotation.x = -time * 0.2;

      // Ripple particle wave positions
      const positions = waveGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const index = (i * rows + j) * 3;
          const x = positions[index];
          const z = positions[index + 2];
          positions[index + 1] =
            Math.sin(x * 0.4 + time * 1.6) * 0.45 +
            Math.cos(z * 0.4 + time * 1.3) * 0.35 +
            Math.sin(Math.hypot(x, z) * 0.7 - time * 1.8) * 0.25;
        }
      }
      waveGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      waveGeo.dispose();
      waveMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[380px] lg:min-h-[460px] relative pointer-events-none flex items-center justify-center select-none"
    />
  );
}
