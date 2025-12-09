"use client";
import { useRef } from "react";
import Spline, { Application } from "@splinetool/react-spline";

export default function HighQualityScene() {
  const splineRef = useRef<Application>();

  const handleLoad = (app: Application) => {
    splineRef.current = app;

    const canvas = app._canvas;
    if (canvas) {
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (gl) {
        gl.getExtension("EXT_color_buffer_float");
        gl.getExtension("OES_texture_float_linear");
      }
    }
  };

  const handleMouseDown = (e: any) => {
    console.log("Object clicked:", e.target.name);
  };

  return (
    <Spline
      scene="https://prod.spline.design/BU2yBzEGoZqtLwlN/scene.splinecode" 
      onLoad={handleLoad}
      onSplineMouseDown={handleMouseDown}
      onSplineMouseHover={(e) => console.log("Hover:", e.target.name)}
      renderOnDemand={false}
      wasmPath="/wasm/"
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
