'use client';

import React, { useEffect, useRef } from 'react';

interface SkillData {
  name: string;
  score: number;
}

interface SpiderWebChartProps {
  skills: SkillData[];
  title?: string;
  description?: string;
}

const SpiderWebChart: React.FC<SpiderWebChartProps> = ({ skills, title, description }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Set back to CSS dimensions
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Calculate center and radius
    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw the background grid and axis
    drawGrid(ctx, centerX, centerY, radius, skills.length);

    // Draw the skills polygon
    const angleStep = (2 * Math.PI) / skills.length;
    
    // Draw skills radar
    drawSkillsPolygon(
      ctx,
      centerX,
      centerY,
      radius,
      skills,
      angleStep,
      '#2196F3', // DebugShala Blue
      0.3,
      '#26C6DA' // DebugShala Teal as border
    );

    // Draw skill labels
    drawSkillLabels(ctx, centerX, centerY, radius * 1.1, skills, angleStep);
  }, [skills]);

  // Draw the grid and axis
  const drawGrid = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    numPoints: number
  ) => {
    const angleStep = (2 * Math.PI) / numPoints;
    
    // Draw concentric circles
    const levels = 5; // 5 levels
    for (let i = 1; i <= levels; i++) {
      const levelRadius = (radius * i) / levels;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, levelRadius, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Add percentage labels at the first axis
      if (i % 2 === 0 || i === levels) {
        const percent = Math.round((i / levels) * 100);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${percent}%`, centerX, centerY - levelRadius - 5);
      }
    }
    
    // Draw axis lines
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  };

  // Draw the skills polygon
  const drawSkillsPolygon = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    skills: SkillData[],
    angleStep: number,
    fillColor: string,
    alpha: number,
    borderColor: string
  ) => {
    ctx.beginPath();
    
    skills.forEach((skill, i) => {
      const angle = i * angleStep - Math.PI / 2; // Start from top (subtract 90 degrees)
      const skillRadius = (radius * skill.score) / 100; // Assuming max score is 100
      
      const x = centerX + skillRadius * Math.cos(angle);
      const y = centerY + skillRadius * Math.sin(angle);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.closePath();
    ctx.fillStyle = `${fillColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
    ctx.fill();
    
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw points at each vertex
    skills.forEach((skill, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const skillRadius = (radius * skill.score) / 100; // Assuming max score is 100
      
      const x = centerX + skillRadius * Math.cos(angle);
      const y = centerY + skillRadius * Math.sin(angle);
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  };

  // Draw skill labels
  const drawSkillLabels = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    skills: SkillData[],
    angleStep: number
  ) => {
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = '#313131'; // Dark text color
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    skills.forEach((skill, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      // Add a background for better readability
      const textWidth = ctx.measureText(skill.name).width;
      const padding = 4;
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillRect(
        x - textWidth / 2 - padding,
        y - 8,
        textWidth + padding * 2,
        16
      );
      
      ctx.fillStyle = '#313131';
      ctx.fillText(skill.name, x, y);
      
      // Add score next to the label
      const scoreText = `${skill.score}%`;
      const smallerFont = '10px Arial';
      const originalFont = ctx.font;
      
      ctx.font = smallerFont;
      
      ctx.fillStyle = 'rgba(33, 150, 243, 0.9)'; // Blue with transparency
      ctx.fillText(scoreText, x, y + 14);
      
      ctx.font = originalFont;
    });
  };

  return (
    <div className="relative w-full" style={{ minHeight: '400px' }}>
      {title && <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>}
      {description && <p className="text-sm mb-4 text-center">{description}</p>}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{ minHeight: '350px' }}
      />
    </div>
  );
};

export default SpiderWebChart;
