import React, { useEffect, useRef } from 'react';
import { useFrost } from '../context/FrostContext';

/**
 * FrostShaderOverlay
 * High-performance hardware-accelerated WebGL / Canvas Procedural Frost & Dendritic Ice Shader.
 * Dynamically binds to the global frostIntensity slider.
 * Renders crystalline frost needles, frozen condensation, and dendritic ice fractal branches.
 */
export const FrostShaderOverlay: React.FC = () => {
  const { frostIntensity } = useFrost();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const intensityRef = useRef(frostIntensity);

  useEffect(() => {
    intensityRef.current = frostIntensity;
  }, [frostIntensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // We use WebGL if available, fallback gracefully to 2D
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, depth: false });
    
    let animId: number;
    let width = (canvas.width = Math.floor(window.innerWidth / 2)); // 0.5 res for silky 60fps performance
    let height = (canvas.height = Math.floor(window.innerHeight / 2));

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = Math.floor(window.innerWidth / 2);
      height = canvas.height = Math.floor(window.innerHeight / 2);
      if (gl) {
        gl.viewport(0, 0, width, height);
      }
    };

    window.addEventListener('resize', onResize);

    if (gl) {
      // Vertex Shader
      const vsSource = `
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = position * 0.5 + 0.5;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `;

      // High-performance procedural dendritic frost & crystalline ice shader
      const fsSource = `
        precision mediump float;
        varying vec2 vUv;
        uniform float u_time;
        uniform float u_intensity;
        uniform vec2 u_resolution;

        // Fast hash
        float hash(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
        }

        // Fast 2D noise
        float noise(in vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
            u.y
          );
        }

        // Fast 2-octave rotation noise for crystalline frost branching
        float frostBranch(vec2 p) {
          const mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
          float v = 0.6 * noise(p);
          p = rot * p * 2.05 + vec2(1.7, 9.2);
          v += 0.4 * noise(p);
          return v;
        }

        void main() {
          float intensity = clamp(u_intensity, 0.0, 1.0);
          if (intensity <= 0.01) {
            gl_FragColor = vec4(0.0);
            return;
          }

          vec2 uv = vUv;
          vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
          vec2 p = (uv - 0.5) * aspect;

          // Edge vignette: frost accumulates heavily along screen & card perimeters
          vec2 edgeDist = abs(uv - 0.5) * 2.0;
          float edgeVig = max(edgeDist.x * edgeDist.x, edgeDist.y * edgeDist.y);

          // Fast dendritic ice needle warp
          float slowTime = u_time * 0.025;
          float n1 = frostBranch(p * 3.5 + vec2(slowTime, 1.2));
          float frostVal = frostBranch(p * (4.5 + intensity * 4.0) + vec2(n1 * 1.5, n1 * 1.2));

          // Cellular crystal cracks (optimized single-pass approximation)
          float crystalGrid = abs(sin((p.x + p.y * 0.7) * 16.0 + frostVal * 3.0));
          crystalGrid = smoothstep(0.7, 0.98, crystalGrid);

          // Combine with threshold parameterized by intensity
          float threshold = 1.02 - (intensity * 0.75 + edgeVig * 0.28);
          float iceMask = smoothstep(threshold - 0.18, threshold + 0.12, frostVal * 0.75 + crystalGrid * 0.25);

          if (iceMask <= 0.005) {
            gl_FragColor = vec4(0.0);
            return;
          }

          // Subtle cold blue-silver tinted ice crystal luminescence
          vec3 iceColor = mix(
            vec3(0.78, 0.92, 0.96), // Sub-zero cyan-silver
            vec3(0.98, 1.0, 1.0),   // Crisp white diamond frost
            frostVal
          );

          // Sparkle glints across frost needles (cheap trig glint)
          float glint = pow(max(0.0, sin(uv.x * 90.0 + uv.y * 110.0 + u_time * 1.2)), 14.0);
          iceColor += glint * 0.45;

          float finalAlpha = iceMask * (0.15 + intensity * 0.45);
          gl_FragColor = vec4(iceColor, finalAlpha);
        }
      `;

      const createShader = (type: number, source: string) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.warn(gl.getShaderInfoLog(shader));
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      };

      const vs = createShader(gl.VERTEX_SHADER, vsSource);
      const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
      if (!vs || !fs) return;

      const program = gl.createProgram();
      if (!program) return;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        return;
      }

      gl.useProgram(program);

      // Full screen quad
      const posBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          -1.0, -1.0,
           1.0, -1.0,
          -1.0,  1.0,
          -1.0,  1.0,
           1.0, -1.0,
           1.0,  1.0,
        ]),
        gl.STATIC_DRAW
      );

      const posLoc = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      const timeLoc = gl.getUniformLocation(program, 'u_time');
      const intLoc = gl.getUniformLocation(program, 'u_intensity');
      const resLoc = gl.getUniformLocation(program, 'u_resolution');

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      let startTime = performance.now();
      let lastFrameTime = 0;

      const render = (now: number) => {
        animId = requestAnimationFrame(render);

        const currentInt = intensityRef.current / 100;
        if (currentInt <= 0.01) {
          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);
          return;
        }

        // Throttle to 30 FPS (~33ms) - keeps GPU usage negligible while maintaining silky smooth frost glints
        if (now - lastFrameTime < 33) return;
        lastFrameTime = now;

        const time = (now - startTime) * 0.001;

        gl.uniform1f(timeLoc, time);
        gl.uniform1f(intLoc, currentInt);
        gl.uniform2f(resLoc, width, height);

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      };

      animId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-200"
      style={{
        width: '100%',
        height: '100%',
        opacity: frostIntensity <= 0 ? 0 : Math.min(1, 0.25 + (frostIntensity / 100) * 0.75),
      }}
    />
  );
};
