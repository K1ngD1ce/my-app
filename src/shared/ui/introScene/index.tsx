"use client";

import Spline from "@splinetool/react-spline";

export default function HighQualityScene() {

  return (
    <Spline
      scene="https://prod.spline.design/BU2yBzEGoZqtLwlN/scene.splinecode" 
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
