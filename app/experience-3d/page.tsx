"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Sliders, RefreshCw, Eye } from "lucide-react";
import type { SceneProps } from "../../components/ui/Scene3D";

const Scene3D = dynamic(
  () => import("../../components/ui/Scene3D"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] w-full flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
        <p className="mt-4 text-xs font-medium tracking-wide text-slate-400">Loading 3D Canvas...</p>
      </div>
    ),
  }
);

const PRESETS = [
  { name: "Cyberpunk Cobalt", color: "#3b82f6", metal: 0.8, rough: 0.2, distort: 0.4 },
  { name: "Liquid Obsidian", color: "#0f172a", metal: 0.95, rough: 0.1, distort: 0.6 },
  { name: "Sunset Gold", color: "#f59e0b", metal: 0.7, rough: 0.3, distort: 0.2 },
  { name: "Neon Emerald", color: "#10b981", metal: 0.5, rough: 0.4, distort: 0.5 },
];

export default function Experience3DPage() {
  const [color, setColor] = useState("#10b981");
  const [metalness, setMetalness] = useState(0.5);
  const [roughness, setRoughness] = useState(0.4);
  const [distort, setDistort] = useState(0.35);
  const [speed, setSpeed] = useState(2);
  const [wireframe, setWireframe] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 font-sans text-slate-100 antialiased sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        
        {/* Clean Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Interactive 3D Material Studio
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Realtime procedural shader with dynamic lighting, interactive cursor tracking, and touch controls.
          </p>
        </div>

        {/* 3D Staging Container & Controls */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* 3D Viewport */}
          <div className="relative h-[440px] overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl lg:col-span-2">
            <Scene3D
              color={color}
              metalness={metalness}
              roughness={roughness}
              distort={distort}
              speed={speed}
              wireframe={wireframe}
            />
            <div className="pointer-events-none absolute bottom-3 left-4 text-xs font-normal text-slate-500">
              Drag to orbit • Pointer reacts to viewport
            </div>
          </div>

          {/* Configurator Controls Panel */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur">
            <div className="space-y-5">
              <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
                <Sliders className="h-4 w-4 text-indigo-400" /> Material Parameters
              </h2>

              {/* Presets */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400">Presets</label>
                <div className="grid grid-cols-2 gap-2">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        setColor(preset.color);
                        setMetalness(preset.metal);
                        setRoughness(preset.rough);
                        setDistort(preset.distort);
                      }}
                      className="rounded-lg border border-slate-700/80 bg-slate-800/80 px-2.5 py-2 text-left text-xs font-medium text-slate-200 transition hover:border-indigo-500 hover:bg-slate-700/50"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-3.5 text-xs">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1.5 font-medium">
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
                  <div className="flex justify-between text-slate-400 mb-1.5 font-medium">
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
                  <div className="flex justify-between text-slate-400 mb-1.5 font-medium">
                    <span>Distortion Wave</span>
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

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  wireframe
                    ? "bg-indigo-600 text-white"
                    : "border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <Eye className="h-3.5 w-3.5" /> {wireframe ? "Solid View" : "Wireframe"}
              </button>

              <button
                onClick={() => {
                  setColor("#10b981");
                  setMetalness(0.5);
                  setRoughness(0.4);
                  setDistort(0.35);
                  setWireframe(false);
                }}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Reset
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}