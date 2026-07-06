import { useState, useEffect } from "react"

export function MapWidget() {
  const [metrics, setMetrics] = useState({
    lat: 26.1445,
    lng: 91.7362,
    rasterVal: 0.942,
    accuracy: 99.4,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate minor GPS jitter & telemetry updates
      setMetrics((prev) => ({
        lat: Number((prev.lat + (Math.random() - 0.5) * 0.00002).toFixed(6)),
        lng: Number((prev.lng + (Math.random() - 0.5) * 0.00002).toFixed(6)),
        rasterVal: Number(Math.max(0.1, Math.min(1.0, prev.rasterVal + (Math.random() - 0.5) * 0.004)).toFixed(3)),
        accuracy: Number(Math.max(95.0, Math.min(100.0, prev.accuracy + (Math.random() - 0.5) * 0.05)).toFixed(1)),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="relative w-full h-full rounded-2xl border border-outline-variant/30 overflow-hidden shadow-2xl group cursor-crosshair"
      aria-label="Geospatial Telemetry Visualizer"
      role="img"
    >
      {/* Background Satellite Telemetry Raster */}
      <div
        className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUDnBWkJuNzmk3xpNri58FX_xVOVyY44lqF9pyUBjtpxZICUf3JUTn5sCd8d-MzJwXhPsaH7OwJyKT0QdLP5Hxz9LXhDfc8QuT-pvUpmlJyIhyh0CWxRDm6OEnvZMIDJKtH9uw7Dhn7F_qFcGqoXQBV5VeTioZRaCz_FYks_y8g99Fd2vOfwrn6Xk8eO-HB5ntlLvJyDuhi5vqFScgJ5TuNmtoiU-yWcJT-7Hc9VURUq95p_HopwlJ')",
        }}
      />

      {/* Geospatial overlay tint */}
      <div className="absolute inset-0 bg-primary-container/10 mix-blend-overlay pointer-events-none" />

      {/* Grid Scanline Sweep Visualizer */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      <div className="absolute top-0 left-0 w-full h-0.5 bg-primary-container/20 shadow-[0_0_10px_rgba(0,255,136,0.5)] animate-bounce pointer-events-none" style={{ animationDuration: "6s" }} />

      {/* Dynamic HUD markings */}
      <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md rounded-lg px-3 py-1.5 border border-outline-variant/20 font-mono text-[9px] text-primary-container uppercase tracking-wider space-y-0.5 pointer-events-none select-none">
        <div>SYS: ACTIVE</div>
        <div>SCAN_REF: 4A2D8</div>
      </div>

      <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md rounded-lg px-3 py-1.5 border border-outline-variant/20 font-mono text-[9px] text-on-background space-y-0.5 pointer-events-none select-none">
        <div>LAT: {metrics.lat}° N</div>
        <div>LNG: {metrics.lng}° E</div>
      </div>

      <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md rounded-lg px-3 py-2 border border-primary-container/30 font-mono text-[9px] text-white flex flex-col gap-1 pointer-events-none select-none">
        <span className="text-[8px] text-primary-container font-sans tracking-widest uppercase font-bold">Raster Prediction</span>
        <div className="flex justify-between items-center gap-4">
          <span>NDVI_INDEX:</span>
          <span className="font-bold text-primary-container">{metrics.rasterVal}</span>
        </div>
        <div className="flex justify-between items-center gap-4">
          <span>ACC:</span>
          <span>{metrics.accuracy}%</span>
        </div>
      </div>
    </div>
  )
}
