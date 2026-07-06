import { useEffect, useRef } from "react"

export function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let animationFrameId: number
    let isTabVisible = true

    // WebGL context setup
    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null)

    if (!gl) {
      console.warn("WebGL not supported in this browser.")
      return
    }

    // Shaders compilation
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 v_texCoord;

      void main() {
        vec2 uv = v_texCoord;
        float t = u_time * 0.15; // Slowed down slightly for refined aesthetics
        
        // Base dark layers
        vec3 color1 = vec3(0.01, 0.02, 0.02); // Deep dark slate
        vec3 color2 = vec3(0.0, 0.15, 0.08);  // Geospatial Green accent
        vec3 color3 = vec3(0.08, 0.01, 0.15); // AI Purple accent
        
        // Wave patterns
        float noise1 = sin(uv.x * 8.0 + t) * sin(uv.y * 6.0 - t);
        float noise2 = sin(uv.x * 12.0 - t * 0.6) * cos(uv.y * 10.0 + t * 0.4);
        
        float strength = (noise1 + noise2) * 0.5 + 0.5;
        strength = pow(strength, 2.5); // Refined glow falloff
        
        vec3 finalColor = mix(color1, color2, strength * 0.35);
        finalColor = mix(finalColor, color3, strength * 0.2);
        
        // Dynamic grid mapping
        vec2 grid = fract(uv * 32.0);
        float gridLine = smoothstep(0.0, 0.02, grid.x) * smoothstep(0.0, 0.02, grid.y);
        finalColor += (1.0 - gridLine) * 0.015;
        
        // Mouse coordinate interactions
        float dist = distance(uv, u_mouse / u_resolution);
        finalColor += vec3(0.0, 0.9, 0.5) * smoothstep(0.25, 0.0, dist) * 0.06;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `

    function loadShader(type: number, source: string): WebGLShader | null {
      const shader = gl!.createShader(type)
      if (!shader) return null
      gl!.shaderSource(shader, source)
      gl!.compileShader(shader)
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error("Shader compilation error: " + gl!.getShaderInfoLog(shader))
        gl!.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = loadShader(gl.VERTEX_SHADER, vsSource)
    const fragmentShader = loadShader(gl.FRAGMENT_SHADER, fsSource)
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error: " + gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)

    // Set positions buffer
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ])
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const uTimeLocation = gl.getUniformLocation(program, "u_time")
    const uResolutionLocation = gl.getUniformLocation(program, "u_resolution")
    const uMouseLocation = gl.getUniformLocation(program, "u_mouse")

    // Mouse coordinates tracker
    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2

    const trackMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      if (rect.width && rect.height) {
        const nx = (e.clientX - rect.left) / rect.width
        const ny = 1.0 - (e.clientY - rect.top) / rect.height
        mouseX = nx * canvas.width
        mouseY = ny * canvas.height
      }
    }

    window.addEventListener("mousemove", trackMouse)

    // ResizeObserver sync
    const resizeCanvas = () => {
      const w = canvas.clientWidth || window.innerWidth
      const h = canvas.clientHeight || window.innerHeight
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    const resizeObserver = new ResizeObserver(resizeCanvas)
    resizeObserver.observe(canvas)
    resizeCanvas()

    // Performance Optimization: Pause loop on tab change
    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === "visible"
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Render loop
    const render = (time: number) => {
      if (isTabVisible) {
        gl.uniform1f(uTimeLocation, time * 0.001)
        gl.uniform2f(uResolutionLocation, canvas.width, canvas.height)
        gl.uniform2f(uMouseLocation, mouseX, mouseY)

        gl.clearColor(0, 0, 0, 1)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
      }
      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    // Cleanup resources
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("mousemove", trackMouse)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      resizeObserver.disconnect()

      if (gl) {
        gl.deleteBuffer(positionBuffer)
        gl.deleteProgram(program)
        gl.deleteShader(vertexShader)
        gl.deleteShader(fragmentShader)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 h-full w-full pointer-events-none overflow-hidden bg-black select-none">
      <canvas
        ref={canvasRef}
        className="block h-full w-full opacity-70"
      />
    </div>
  )
}
