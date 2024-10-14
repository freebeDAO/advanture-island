"use client";
// src/app/test/page.tsx
import React from "react";
import DraggableComponent from "@/components/ui/DraggableComponent";

const TestPage: React.FC = () => {
  return (
    <div>
      <h1>Draggable Component Demo</h1>
      <DraggableComponent />
    </div>
  );
};

export default TestPage;
