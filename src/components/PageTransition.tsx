'use client';

export default function PageTransition({ children }) {
  // This is now just a pass-through component
  // We'll handle all transitions in PageLayout
  return <>{children}</>;
}
