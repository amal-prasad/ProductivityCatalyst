"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Build a fibonacci sphere for even particle distribution
function createSphereParticles(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;

    // Add slight random noise (10%) for organic feel
    const noise = 0.1 * radius;
    positions[i * 3] = (r * Math.cos(theta) * radius) + (Math.random() - 0.5) * noise;
    positions[i * 3 + 1] = (y * radius) + (Math.random() - 0.5) * noise;
    positions[i * 3 + 2] = (r * Math.sin(theta) * radius) + (Math.random() - 0.5) * noise;
  }
  return positions;
}

export default function ParticleVortex() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Renderer ─────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0); // transparent bg

    // ── Scene & Camera ────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 280;

    // ── Particle Sphere ───────────────────────────────────
    const COUNT = 3000;
    const RADIUS = 110;
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(createSphereParticles(COUNT, RADIUS), 3));

    const material = new THREE.PointsMaterial({
      color: 0x888888,
      size: 1.8,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.85,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // ── Mouse Parallax ────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      // Normalise to -0.5 → 0.5
      mouse.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Resize ────────────────────────────────────────────
    const onResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);

    // ── Animation Loop ────────────────────────────────────
    let rafId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Slow auto-rotation on Y axis (like WQF)
      particles.rotation.y += delta * 0.06;
      particles.rotation.x += delta * 0.015;

      // Lerp toward mouse for parallax effect
      targetRotation.x += (mouse.y * 0.4 - targetRotation.x) * 0.05;
      targetRotation.y += (mouse.x * 0.6 - targetRotation.y) * 0.05;

      particles.rotation.x += targetRotation.x * 0.01;
      particles.rotation.y += targetRotation.y * 0.01;

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
