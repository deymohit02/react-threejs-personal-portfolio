import React from "react";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string; // optional
}

export default function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`w-screen h-screen flex items-center justify-center snap-start relative overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
}

