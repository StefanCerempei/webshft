import { useEffect, useRef } from 'react'

// Fundal lichid în WebGL2 pur (fără biblioteci): gradient domain-warped,
// linii topografice și o lumină care urmărește cursorul.
const vertex = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() { vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }
`

const fragment = `#version 300 es
precision highp float;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uRes;
  in vec2 vUv;
  out vec4 outColor;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 5; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 aspect = vec2(uRes.x / uRes.y, 1.0);
    vec2 p = (vUv - 0.5) * aspect * 2.2;
    vec2 m = (uMouse - 0.5) * aspect * 2.2;
    float d = length(p - m);
    float t = uTime * 0.07;

    vec2 pull = (m - p) * 0.45 * exp(-d * 1.4);
    vec2 q = vec2(fbm(p + t + pull), fbm(p + vec2(5.2, 1.3) - t));
    vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + t * 1.4), fbm(p + 3.0 * q + vec2(8.3, 2.8) - t));
    float f = fbm(p + 3.0 * r + pull * 2.0);

    vec3 bg = vec3(0.039);
    vec3 violet = vec3(0.48, 0.36, 1.0);
    vec3 orange = vec3(1.0, 0.36, 0.22);
    vec3 lime = vec3(0.78, 1.0, 0.24);

    vec3 col = bg;
    col = mix(col, violet * 0.75, smoothstep(0.35, 0.95, f));
    col = mix(col, orange * 0.85, smoothstep(0.75, 1.15, length(q)) * 0.7);
    col = mix(col, lime, smoothstep(0.85, 1.25, r.x + f * 0.5) * 0.75);

    // linii topografice
    float lines = abs(fract(f * 9.0) - 0.5);
    float lw = fwidth(f * 9.0) * 1.2;
    col += lime * 0.18 * (1.0 - smoothstep(0.0, lw, lines)) * smoothstep(0.25, 0.7, f);

    // lumină în jurul cursorului
    col += lime * 0.12 * exp(-d * 3.0);

    // vignetă + păstrăm zona textului mai întunecată
    float vig = smoothstep(1.25, 0.25, length((vUv - vec2(0.62, 0.55)) * vec2(1.0, 1.2)));
    col *= mix(0.35, 1.0, vig);
    col = mix(col, bg, 0.12);

    outColor = vec4(col, 1.0);
  }
`

function compile(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s))
  return s
}

export default function LiquidBg({ active = true }) {
  const canvasRef = useRef(null)
  const activeRef = useRef(active)
  useEffect(() => { activeRef.current = active }, [active])

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'high-performance' })
    if (!gl) return

    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, vertex))
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, fragment))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    // un triunghi care acoperă tot ecranul
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uMouse = gl.getUniformLocation(prog, 'uMouse')
    const uRes = gl.getUniformLocation(prog, 'uRes')

    const target = { x: 0.5, y: 0.5 }
    const mouse = { x: 0.5, y: 0.5 }
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      target.x = (e.clientX - r.left) / r.width
      target.y = 1 - (e.clientY - r.top) / r.height
    }
    window.addEventListener('pointermove', onMove)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = Math.round(canvas.clientWidth * dpr)
      const h = Math.round(canvas.clientHeight * dpr)
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h }
      gl.viewport(0, 0, w, h)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    let raf, t = 0, last = performance.now()
    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (!activeRef.current) return
      t += dt
      mouse.x += (target.x - mouse.x) * 0.04
      mouse.y += (target.y - mouse.y) * 0.04
      gl.uniform1f(uTime, t)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return <canvas ref={canvasRef} className="liquid" />
}
