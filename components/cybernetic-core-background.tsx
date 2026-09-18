"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { scrollUniformStore } from "@/components/smooth-scroll-provider";

export function CyberneticCoreBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Detect reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const speedMultiplier = prefersReducedMotion ? 0.05 : 1.0;

    // 2. Scene, Camera & Renderer Setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    const updateCameraPosition = () => {
      const aspect = window.innerWidth / window.innerHeight;
      camera.aspect = aspect;
      if (window.innerWidth < 640) {
        camera.position.z = 10.5; // Mobile: push back to keep rings in view
      } else if (window.innerWidth < 1024) {
        camera.position.z = 8.5;
      } else {
        camera.position.z = 7.2;
      }
      camera.updateProjectionMatrix();
    };
    updateCameraPosition();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Pure transparent

    // 3. Lighting (Palette Matched: Emerald & Warm Neutral Rim)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Neon Emerald Key Light
    const emeraldLight = new THREE.DirectionalLight(0x10b981, 2.4);
    emeraldLight.position.set(6, 8, 6);
    scene.add(emeraldLight);

    // Subtle Warm Terracotta Counter-fill (ties to site accent)
    const terracottaLight = new THREE.DirectionalLight(0xc85a32, 1.2);
    terracottaLight.position.set(-6, -5, 4);
    scene.add(terracottaLight);

    // Internal Glow Point Light
    const corePointLight = new THREE.PointLight(0x10b981, 1.8, 12);
    corePointLight.position.set(0, 0, 0);
    scene.add(corePointLight);

    // 4. Hierarchy Structure
    const masterGroup = new THREE.Group();
    const coreGroup = new THREE.Group();
    const ringsGroup = new THREE.Group();
    const particlesGroup = new THREE.Group();

    masterGroup.add(coreGroup);
    masterGroup.add(ringsGroup);
    masterGroup.add(particlesGroup);
    scene.add(masterGroup);

    // 5. Central Cybernetic Core (Morphing Icosahedron + Wireframes)
    // A. Inner Faceted Core with Dynamic Vertex Noise
    const coreSegments = prefersReducedMotion ? 1 : 3;
    const coreGeometry = new THREE.IcosahedronGeometry(1.32, coreSegments);
    const originalPositions = coreGeometry.attributes.position.clone();
    const posAttr = coreGeometry.attributes.position;
    const vertexCount = posAttr.count;

    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f2937, // Dark slate/graphite wireframe base
      roughness: 0.28,
      metalness: 0.88,
      flatShading: true,
      transparent: true,
      opacity: 0.32,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    coreGroup.add(coreMesh);

    // B. Outer Geometric Wireframe Lattice
    const outerGeo = new THREE.IcosahedronGeometry(1.44, 1);
    const outerWireframeGeo = new THREE.WireframeGeometry(outerGeo);
    const outerWireframeMat = new THREE.LineBasicMaterial({
      color: 0x10b981, // Neon emerald accent
      transparent: true,
      opacity: 0.45,
    });
    const outerWireframe = new THREE.LineSegments(outerWireframeGeo, outerWireframeMat);
    coreGroup.add(outerWireframe);

    // C. Internal Pulsing Octahedron (Heart Reactor)
    const reactorGeo = new THREE.OctahedronGeometry(0.55, 0);
    const reactorMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const reactorMesh = new THREE.Mesh(reactorGeo, reactorMat);
    coreGroup.add(reactorMesh);

    // Procedural Soft Circular Particle Texture (zero network dependencies)
    const createCircleTexture = () => {
      const size = 64;
      const cvs = document.createElement("canvas");
      cvs.width = size;
      cvs.height = size;
      const ctx = cvs.getContext("2d");
      if (!ctx) return null;
      const center = size / 2;
      const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.35, "rgba(255, 255, 255, 0.7)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
      const texture = new THREE.CanvasTexture(cvs);
      texture.needsUpdate = true;
      return texture;
    };
    const circleTexture = createCircleTexture();

    // D. Core Vertex Point Cloud (Emerald Nodes)
    const corePointsMat = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 0.05,
      transparent: true,
      opacity: 0.75,
      map: circleTexture || undefined,
      alphaTest: 0.01,
    });
    const corePoints = new THREE.Points(coreGeometry, corePointsMat);
    coreGroup.add(corePoints);

    // 6. Nested Concentric Mechanical Rings
    // Ring 1: Inner Fast Gimbal Ring (tilted 35° on X)
    const ring1Geo = new THREE.TorusGeometry(2.05, 0.016, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x374151, // Slate wireframe
      roughness: 0.2,
      metalness: 0.85,
      transparent: true,
      opacity: 0.55,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 5;
    ringsGroup.add(ring1);

    // Satellite tracker node orbiting Ring 1
    const sat1Geo = new THREE.OctahedronGeometry(0.08, 0);
    const sat1Mat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const sat1 = new THREE.Mesh(sat1Geo, sat1Mat);
    ringsGroup.add(sat1);

    // Ring 2: Mid-tier Equatorial Orbit (Tilted 55° on Y, 30° on Z, Wireframe style)
    const ring2Geo = new THREE.TorusGeometry(2.68, 0.022, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0x10b981, // Emerald neon
      transparent: true,
      opacity: 0.42,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3.2;
    ring2.rotation.z = Math.PI / 6;
    ringsGroup.add(ring2);

    // Two counter-orbiting satellite nodes on Ring 2
    const sat2Geo = new THREE.OctahedronGeometry(0.07, 0);
    const sat2Mat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const sat2 = new THREE.Mesh(sat2Geo, sat2Mat);
    const sat3 = new THREE.Mesh(sat2Geo, sat2Mat);
    ringsGroup.add(sat2);
    ringsGroup.add(sat3);

    // Ring 3: Outer Horizon Ring (with segmented tick-calibration markers)
    const ring3Geo = new THREE.TorusGeometry(3.35, 0.014, 16, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0x1f2937,
      transparent: true,
      opacity: 0.35,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ringsGroup.add(ring3);

    // Outer concentric segmented calibration track
    const ticksGeo = new THREE.RingGeometry(3.38, 3.48, 48, 1);
    const ticksMat = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
    });
    const ticksRing = new THREE.Mesh(ticksGeo, ticksMat);
    ring3.add(ticksRing);

    // Ring 4: Wide Gyroscopic Perimeter Ring (Tilted 80° on Y)
    const ring4Geo = new THREE.TorusGeometry(4.05, 0.012, 12, 140);
    const ring4Mat = new THREE.MeshBasicMaterial({
      color: 0x374151,
      transparent: true,
      opacity: 0.26,
    });
    const ring4 = new THREE.Mesh(ring4Geo, ring4Mat);
    ring4.rotation.y = Math.PI / 2.25;
    ringsGroup.add(ring4);

    // 7. Perimeter Floating Dust / Node Point Cloud
    const particleCount = 420;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cSlate = new THREE.Color(0x374151);
    const cEmerald = new THREE.Color(0x10b981);
    const cTerracotta = new THREE.Color(0xc85a32);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      // Spherical shell distribution (radius between 3.6 and 8.0)
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 3.6 + Math.random() * 4.4;

      particlePositions[idx] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[idx + 2] = r * Math.cos(phi);

      // Color distribution: 60% slate, 30% emerald, 10% terracotta
      const rand = Math.random();
      const color = rand < 0.6 ? cSlate : rand < 0.9 ? cEmerald : cTerracotta;
      particleColors[idx] = color.r;
      particleColors[idx + 1] = color.g;
      particleColors[idx + 2] = color.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      map: circleTexture || undefined,
      alphaTest: 0.01,
    });
    const particlesMesh = new THREE.Points(particleGeometry, particleMaterial);
    particlesGroup.add(particlesMesh);

    // 8. Interactivity State: Mouse Tracking & Damping LERP
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // 9. Resize Handling
    const onResize = () => {
      updateCameraPosition();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // 10. Page Visibility Management (Pause when tab is hidden)
    let isTabVisible = !document.hidden;
    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // 11. Animation Loop with High-Precision Delta
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime() * speedMultiplier;

      // Mouse Damping LERP
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Scroll reactive variables
      const scrollVelocity = scrollUniformStore.velocity || 0;
      const scrollProgress = scrollUniformStore.progress || 0;
      const velocityBoost = Math.min(Math.abs(scrollVelocity) * 0.0025, 2.5);

      // Apply Mouse Parallax & Scroll to Master Group
      masterGroup.rotation.x = -mouse.y * 0.35;
      masterGroup.rotation.y = mouse.x * 0.45;
      masterGroup.position.x = mouse.x * 0.22;
      masterGroup.position.y = mouse.y * 0.18;

      // Scroll-linked rotation on Z axis & breathing scale shift
      masterGroup.rotation.z = scrollProgress * Math.PI * 1.5;
      const breathingScale = 1.0 + Math.sin(scrollProgress * Math.PI * 3.0) * 0.07;
      masterGroup.scale.set(breathingScale, breathingScale, breathingScale);

      // A. Morphing Central Cybernetic Core Vertices
      if (!prefersReducedMotion) {
        const morphIntensity = 1.0 + velocityBoost * 0.6;
        for (let i = 0; i < vertexCount; i++) {
          const ox = originalPositions.getX(i);
          const oy = originalPositions.getY(i);
          const oz = originalPositions.getZ(i);

          const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
          const nx = ox / len;
          const ny = oy / len;
          const nz = oz / len;

          const wave1 = Math.sin(elapsedTime * 2.2 + nx * 3.0 + ny * 2.0) * 0.11;
          const wave2 = Math.cos(elapsedTime * 1.7 + nz * 3.5 + nx * 2.0) * 0.07;
          const wave3 = Math.sin(elapsedTime * 3.2 + len * 4.0) * 0.03;
          const disp = (wave1 + wave2 + wave3) * morphIntensity;

          posAttr.setXYZ(i, ox + nx * disp, oy + ny * disp, oz + nz * disp);
        }
        posAttr.needsUpdate = true;
        coreGeometry.computeVertexNormals();
      }

      // Core rotations
      const coreSpeed = (0.25 + velocityBoost * 0.8) * delta;
      coreGroup.rotation.y += coreSpeed;
      coreGroup.rotation.x += coreSpeed * 0.6;

      outerWireframe.rotation.y -= coreSpeed * 1.4;
      outerWireframe.rotation.z += coreSpeed * 0.8;

      reactorMesh.rotation.y += coreSpeed * 3.0;
      reactorMesh.rotation.x -= coreSpeed * 2.0;

      // Pulse reactor size gently
      const reactorScale = 0.55 + Math.sin(elapsedTime * 3.5) * 0.05;
      reactorMesh.scale.set(reactorScale, reactorScale, reactorScale);

      // B. Concentric Mechanical Orbit Rings (Varying Speeds & Axes)
      const ringSpeed = (0.35 + velocityBoost * 0.6) * delta;

      // Ring 1 (Inner Gimbal)
      ring1.rotation.z += ringSpeed * 1.8;
      ring1.rotation.y += ringSpeed * 0.9;
      // Satellite 1 along Ring 1
      const sat1Angle = elapsedTime * 1.9;
      sat1.position.set(
        Math.cos(sat1Angle) * 2.05,
        Math.sin(sat1Angle) * Math.cos(ring1.rotation.x) * 2.05,
        Math.sin(sat1Angle) * Math.sin(ring1.rotation.x) * 2.05
      );
      sat1.rotation.y += 0.05;

      // Ring 2 (Mid Tilted Track)
      ring2.rotation.x -= ringSpeed * 1.2;
      ring2.rotation.z -= ringSpeed * 1.5;
      // Satellites 2 & 3 along Ring 2
      const sat2Angle = -elapsedTime * 1.3;
      sat2.position.set(
        Math.cos(sat2Angle) * 2.68,
        Math.sin(sat2Angle) * 2.68,
        Math.sin(sat2Angle) * 0.8
      );
      sat3.position.set(
        Math.cos(sat2Angle + Math.PI) * 2.68,
        Math.sin(sat2Angle + Math.PI) * 2.68,
        Math.sin(sat2Angle + Math.PI) * 0.8
      );

      // Ring 3 & 4 (Outer Gyroscope Horizons)
      ring3.rotation.z += ringSpeed * 0.7;
      ring3.rotation.x += ringSpeed * 0.35;

      ring4.rotation.x -= ringSpeed * 0.45;
      ring4.rotation.y += ringSpeed * 0.3;

      // C. Perimeter Floating Particle Cloud Drift
      particlesGroup.rotation.y = elapsedTime * 0.04;
      particlesGroup.rotation.x = Math.sin(elapsedTime * 0.05) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // 12. Complete Cleanup & Memory Management on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      // Recursive scene disposal
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments || obj instanceof THREE.Points) {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((mat) => mat.dispose());
            } else {
              obj.material.dispose();
            }
          }
        }
      });

      if (circleTexture) circleTexture.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-screen h-screen pointer-events-none z-0"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: -1,
      }}
    />
  );
}
