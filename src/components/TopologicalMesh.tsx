'use client';

import React, { useEffect, useRef, useState } from 'react';

const flashMessages = [
  "[SYS] REGIME SHIFT DETECTED",
  "[SYS] STRUCTURAL ANOMALY MAPPED",
  "SIGNAL ACQUIRED: EIGENSPACE 0.84",
  "EXECUTING ROUTING...",
  "[WARN] TURBULENCE ISOLATED",
];

const TopologicalMesh = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [flashText, setFlashText] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.parentElement?.clientHeight || window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const nodes: { x: number; y: number; baseX: number; baseY: number; vx: number; vy: number }[] = [];
    const numNodes = Math.floor((width * height) / 14000);

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      });
    }

    let time = 0;
    let animationFrameId: number;

    const interval = setInterval(() => {
      if (Math.random() > 0.55) {
        setFlashText(flashMessages[Math.floor(Math.random() * flashMessages.length)]);
        setTimeout(() => setFlashText(""), 1400);
      }
    }, 5000);

    const render = () => {
      ctx.fillStyle = 'rgba(2, 6, 10, 1)';
      ctx.fillRect(0, 0, width, height);

      time += 0.004;

      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        p.baseX += p.vx;
        p.baseY += p.vy;
        if (p.baseX < 0) p.baseX = width;
        if (p.baseX > width) p.baseX = 0;
        if (p.baseY < 0) p.baseY = height;
        if (p.baseY > height) p.baseY = 0;

        const warpX = Math.sin(time + p.baseY * 0.004) * 60;
        const warpY = Math.cos(time * 0.8 + p.baseX * 0.004) * 60;
        p.x = p.baseX + warpX;
        p.y = p.baseY + warpY;
      }

      // Draw connections
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = dx * dx + dy * dy;

          if (dist < 18000) {
            const alpha = 1 - dist / 18000;
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha * 0.35})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw node points
      for (let i = 0; i < nodes.length; i++) {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.7)';
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
      
      {/* Flashing system text */}
      <div className={`absolute top-[20%] left-[8%] font-mono text-[10px] md:text-xs text-blue-400/80 tracking-[0.15em] transition-opacity duration-150 ${flashText ? 'opacity-100' : 'opacity-0'}`}>
        {flashText}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020610] to-transparent z-10 pointer-events-none"></div>
    </div>
  );
};

export default TopologicalMesh;
