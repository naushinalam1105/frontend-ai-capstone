"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Sliders, RefreshCw, Eye, ArrowLeft, Layers, Cpu, Zap, Activity } from "lucide-react";
import type { SceneProps } from "../../components/ui/Scene3D";

const Scene3D = dynamic(
  () => import("../../components/ui/Scene3D"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[460px] w-full flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
        <p className="mt-4 text-xs font-medium tracking-wide text-slate-400">Initializing WebGL Engine...</p>
      </div>
    ),
  }
);

const PRESETS = [
  { name: "Cobalt Core", color: "#3b82f6", metal: 0.85, rough: 0.15, distort: 0.35, shape: "torusKnot" as const, mat: "distort" as const },
  { name: "Obsidian Hex", color: "#0f172a", metal: 0.95, rough: 0.1, distort: 0.5, shape: "icosahedron" as const, mat: "wobble" as const },
  { name: "Liquid Amber", color: "#f59e0b", metal: 0.65, rough: 0.25, distort: 0.45, shape: "sphere" as const, mat: "distort" as const },
  { name: "Neon Emerald", color: "#10b981", metal: 0.5, rough: 0.4, distort: 0.3, shape: "torus" as const, mat: "distort" as const },
];

export default function Experience3DPage() {
  const [geometryType, setGeometryType] = useState<"torusKnot" | "icosahedron" | "sphere" | "torus">("torusKnot");
  const [materialType, setMaterialType] = useState<"distort" | "wobble">("distort");
  const [color, setColor] = useState("#3b82f6");
  const [metalness, setMetalness] = useState(0.85);
  const [roughness, setRoughness] = useState(0.15);
  const [distort, setDistort] = useState(0.35);
  const [speed, setSpeed] = useState(2);
  const [wireframe, setWireframe] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Capstone Main
          </Link>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono text-slate-400">WebGL 2.0 • 60 FPS</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 space-y-12 sm:px-6">
        {/* Hero Banner */}
        <section className="text-center space-y-3">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white">
            Realtime 3D Shader Studio
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-slate-400 leading-relaxed">
            A hardware-accelerated interactive 3D laboratory. Inspect dynamic physical shaders, geometry deformations, and vertex distortion in realtime.
          </p>
        </section>

        {/* 3D Viewport & Interactive Control Deck */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main 3D Canvas Viewport */}
          <div className="relative h-[480px] overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 shadow-2xl lg:col-span-8">
            <Scene3D
              geometryType={geometryType}
              materialType={materialType}
              color={color}
              metalness={metalness}
              roughness={roughness}
              distort={distort}
              speed={speed}
              wireframe={wireframe}
            />
            {/* Viewport Overlay Hints */}
            <div className="pointer-events-none absolute bottom-4 left-5 flex items-center gap-3 text-xs text-slate-500">
              <span className="rounded-md border border-slate-800 bg-slate-950/80 px-2 py-1">Drag to Orbit</span>
              <span className="rounded-md border border-slate-800 bg-slate-950/80 px-2 py-1">Pointer Reactive</span>
            </div>
          </div>

          {/* Controls Deck */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur lg:col-span-4">
            <div className="space-y-6">
              {/* Shape Selector */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2.5">
                  <Layers className="h-3.5 w-3.5 text-indigo-400" /> Geometry Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["torusKnot", "icosahedron", "sphere", "torus"] as const).map((shape) => (
                    <button
                      key={shape}
                      onClick={() => setGeometryType(shape)}
                      className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium capitalize transition ${
                        geometryType === shape
                          ? "border-indigo-500 bg-indigo-600/20 text-white"
                          : "border-slate-800 bg-slate-800/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                      }`}
                    >
                      {shape.replace("Knot", " Knot")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Presets */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2.5">
                  <Sliders className="h-3.5 w-3.5 text-indigo-400" /> Material Presets
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PRESETS.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => {
                        setColor(p.color);
                        setMetalness(p.metal);
                        setRoughness(p.rough);
                        setDistort(p.distort);
                        setGeometryType(p.shape);
                        setMaterialType(p.mat);
                      }}
                      className="rounded-lg border border-slate-800 bg-slate-800/70 px-2.5 py-2 text-left text-xs font-medium text-slate-300 hover:border-indigo-500/80 transition"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Range Sliders */}
              <div className="space-y-3.5 text-xs">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Metalness</span>
                    <span className="font-mono text-slate-300">{metalness.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={metalness}
                    onChange={(e) => setMetalness(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Roughness</span>
                    <span className="font-mono text-slate-300">{roughness.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={roughness}
                    onChange={(e) => setRoughness(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Vertex Distortion</span>
                    <span className="font-mono text-slate-300">{distort.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={distort}
                    onChange={(e) => setDistort(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  wireframe
                    ? "bg-indigo-600 text-white"
                    : "border border-slate-800 bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <Eye className="h-3.5 w-3.5" /> {wireframe ? "Solid Mesh" : "Wireframe"}
              </button>

              <button
                onClick={() => {
                  setColor("#3b82f6");
                  setMetalness(0.85);
                  setRoughness(0.15);
                  setDistort(0.35);
                  setGeometryType("torusKnot");
                  setMaterialType("distort");
                  setWireframe(false);
                }}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Reset
              </button>
            </div>
          </div>
        </section>

        {/* Performance & Architecture Metrics Section */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-400">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Dynamic Loading</p>
                <p className="text-base font-semibold text-white">0ms SSR Overhead</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500 leading-relaxed">
              Code-split Canvas with Next.js dynamic imports, preventing main thread hydration blocks.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">DPR Management</p>
                <p className="text-base font-semibold text-white">Capped at 2x DPR</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500 leading-relaxed">
              Prevents GPU throttling and battery drain on high-density mobile screens.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-500/10 p-2 text-amber-400">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Zero Asset Weight</p>
                <p className="text-base font-semibold text-white">Procedural Shaders</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500 leading-relaxed">
              Eliminated heavy 3D GLB downloads using lightweight parametric geometries.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}