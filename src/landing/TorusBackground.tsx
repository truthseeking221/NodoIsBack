import * as React from "react";
import { cn } from "../lib/cn";

/**
 * Animated WebGL wireframe torus. Pure background — no text, no interaction.
 * Colors tuned to NODO brand (cream / amber glow) instead of blue/purple.
 *
 * Shader is a single fullscreen quad with a fragment program that paints
 * the torus procedurally. Mounts once, disposes cleanly on unmount.
 */
export const TorusBackground: React.FC<{ className?: string; intensity?: number }> = ({
  className,
  intensity = 1,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const rafRef = React.useRef<number>(0);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: false });
    if (!gl) return;

    const vsSource = `
      attribute vec4 aVertexPosition;
      void main() { gl_Position = aVertexPosition; }
    `;
    const fsSource = `
      precision highp float;
      uniform vec2  u_resolution;
      uniform float u_time;
      uniform float u_intensity;
      uniform vec2  u_mouse;

      void main() {
        // Normalize to the SHORT axis so the ring stays visually consistent
        // across any aspect ratio. On portrait, vertical range extends past [-1,1];
        // on landscape, horizontal range extends. Unit circle always fits.
        vec2 res = u_resolution;
        float minDim = min(res.x, res.y);
        vec2 p = (gl_FragCoord.xy * 2.0 - res) / minDim;

        // Subtle parallax from mouse
        p.x -= u_mouse.x * 0.15;
        p.y -= u_mouse.y * 0.08;

        // Aspect-aware tuning: 0 = tall portrait, 1 = wide landscape
        float aspect = res.x / res.y;
        float land = smoothstep(0.8, 1.3, aspect);

        // Shift: portrait centers the ring on the text cluster (shift = 0),
        // landscape keeps the "arc peek from top" effect.
        p.y += mix(0.0, 0.95, land);

        // Radius / thickness — smaller + thinner on portrait so the glow
        // reads as a soft backdrop, not a dominant element.
        float radius    = mix(0.9, 1.6, land);
        float thickness = mix(0.38, 0.55, land);

        float r = length(p);
        float a = atan(p.y, p.x);
        float dist = abs(r - radius);

        // Warp to fake 3D curvature
        float warp = sin(r * 4.0 - u_time * 0.35) * 0.3;
        float lineFreq = 80.0;
        float lines = sin((a + warp) * lineFreq + u_time * 1.6);
        lines = smoothstep(0.85, 1.0, lines);

        float mask = smoothstep(thickness, 0.0, dist);
        float coreGlow = 0.05 / (dist * dist + 0.05);
        float pattern = lines * mask;

        // NODO brand colors: warm amber → cream gold
        vec3 amber = vec3(0.831, 0.443, 0.314); // #D47150
        vec3 gold  = vec3(1.000, 0.722, 0.329); // #FFB854
        float gradMix = sin(a * 2.0 + u_time * 0.4) * 0.5 + 0.5;
        vec3 baseColor = mix(amber, gold, gradMix);
        vec3 lineColor = mix(baseColor, vec3(1.0), 0.35);

        vec3 finalColor = lineColor * pattern * 2.3 + baseColor * coreGlow * 1.1;

        // On portrait: subtle symmetric radial fade keeps glow centered on text.
        // On landscape: vertical bias pushes glow toward upper half.
        float verticalBias = mix(1.0, smoothstep(1.7, -0.4, p.y), land);
        finalColor *= verticalBias;
        finalColor *= smoothstep(mix(2.4, 3.0, land), 0.6, r);

        // Portrait overall dim so it reads as ambience, not foreground.
        // (Desktop gets its dimming from the vertical bias above.)
        finalColor *= mix(0.55, 1.0, land);

        finalColor *= u_intensity;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, vsSource);
    const fs = compile(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    const positions = new Float32Array([-1, 1, 1, 1, -1, -1, 1, -1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const vpLoc = gl.getAttribLocation(program, "aVertexPosition");
    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const timeLoc = gl.getUniformLocation(program, "u_time");
    const intensityLoc = gl.getUniformLocation(program, "u_intensity");
    const mouseLoc = gl.getUniformLocation(program, "u_mouse");

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) / rect.width - 0.5;
      mouse.ty = (e.clientY - rect.top) / rect.height - 0.5;
    };
    window.addEventListener("mousemove", onMove);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const w = Math.max(1, canvas.clientWidth);
      const h = Math.max(1, canvas.clientHeight);
      const pxW = Math.floor(w * dpr);
      const pxH = Math.floor(h * dpr);
      if (canvas.width !== pxW || canvas.height !== pxH) {
        canvas.width = pxW;
        canvas.height = pxH;
        gl.viewport(0, 0, pxW, pxH);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const render = (t: number) => {
      resize();
      // ease mouse to target for buttery parallax
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.vertexAttribPointer(vpLoc, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vpLoc);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, t * 0.001);
      gl.uniform1f(intensityLoc, intensity);
      gl.uniform2f(mouseLoc, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("block w-full h-full pointer-events-none", className)}
    />
  );
};
