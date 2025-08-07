'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Sun, Moon } from 'lucide-react';
import TransitionLink from './TransitionLink';

// Page order for navigation
const PAGES = ['/', '/biography', '/media', '/contact'];
const PAGE_NAMES = {
  '/': 'ГЛАВНАЯ',
  '/biography': 'БИОГРАФИЯ', 
  '/media': 'МЕДИА',
  '/contact': 'ОБРАТНАЯ СВЯЗЬ'
};

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const [isDark, setIsDark] = useState(false);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [oldContent, setOldContent] = useState<React.ReactNode>(children);
  const [newContent, setNewContent] = useState<React.ReactNode>(null);
  const prevChildrenRef = useRef<React.ReactNode>(children);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const pathname = usePathname();
  const previousPathnameRef = useRef<string>(pathname);
  const [isMounted, setIsMounted] = useState(false);
  const [nextHref, setNextHref] = useState<string | null>(null);

  // Initialize theme and mounting
  useEffect(() => {
    // Check if dark class exists on document
    const darkModeEnabled = document.documentElement.classList.contains('dark');
    setIsDark(darkModeEnabled);
    
    // Set mounted state and initialize content only once
    setIsMounted(true);
    setOldContent(children);
    setNewContent(null); // Start with no new content until transition
    previousPathnameRef.current = pathname;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Event listener for page transitions
  useEffect(() => {
    if (!isMounted) return;

    // Handler for transition start event
    const handleTransitionStart = (event: CustomEvent<{href: string}>) => {
      const targetHref = event.detail.href;
      console.log('Transition start detected to:', targetHref);
      
      // Store the next href
      setNextHref(targetHref);
      
      // Determine direction based on page order
      const fromIndex = PAGES.indexOf(pathname);
      const toIndex = PAGES.indexOf(targetHref);
      const navDirection = toIndex > fromIndex ? 'right' : 'left';
      
      // Set up exit animation for current page
      setDirection(navDirection);
      setOldContent(children); // Current page content
      setNewContent(null); // Clear new content during exit animation
      setIsTransitioning(true);
    };

    // Add event listener for custom transition event
    window.addEventListener('startPageTransition', handleTransitionStart as EventListener);
    
    return () => {
      window.removeEventListener('startPageTransition', handleTransitionStart as EventListener);
    };
  }, [isMounted, pathname, children]);

  // Handle actual route changes for entry animation
  useEffect(() => {
    if (!isMounted) return;
    
    const previousPath = previousPathnameRef.current;
    
    if (pathname !== previousPath) {
      console.log('Route changed from', previousPath, 'to', pathname);
      
      // Only set new content if we were in a transition
      // This prevents unwanted animations on direct navigation
      if (isTransitioning) {
        // Add a small delay to ensure the component is ready
        setTimeout(() => {
          console.log('Setting new content for entry animation');
          setNewContent(children);
        }, 50);
      } else {
        // If we're not transitioning (direct navigation), just set content without animation
        setOldContent(children);
      }
      
      // Cleanup after animation completes
      const animationTimer = setTimeout(() => {
        console.log('Animation sequence complete');
        setOldContent(children);
        setIsTransitioning(false);
        previousPathnameRef.current = pathname;
        setNextHref(null);
      }, 800); // Full animation duration (0.4s exit + 0.4s entry)
      
      return () => clearTimeout(animationTimer);
    }
  }, [pathname, children, isMounted, isTransitioning]);
  
  // Update content ref when not transitioning
  useEffect(() => {
    if (!isTransitioning && isMounted) {
      prevChildrenRef.current = children;
    }
  }, [children, isTransitioning, isMounted]);


  // Content zone settings
  const contentZoneSettings = {
    leftOffset: 6.5,
    rightOffset: 39,
    topOffset: 18.5,
    bottomOffset: 8,
    padding: 2.5,
  };

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Trigger photo fade-in when component mounts
  useEffect(() => {
    setPhotoLoaded(true);
  }, []);



  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
      {/* Fixed Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-300"
        style={{
          backgroundImage: `url('/bg.png')`,
          backgroundAttachment: 'fixed',
          filter: isDark ? 'invert(1)' : 'none',
          zIndex: -1
        }}
      />

      {/* Portrait photo - using 1.jpg for all pages for now */}
      <div 
        className="fixed bg-cover bg-center transition-all duration-1000 ease-out"
        style={{
          backgroundImage: `url('/photos/1.jpg')`,
          filter: 'none',
          width: '50%',
          height: '100%',
          right: '-14%',
          top: '38%',
          transform: 'translateY(-50%) scale(1.47)',
          transformOrigin: 'center',
          mask: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 38%)',
          WebkitMask: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 38%)',
          opacity: photoLoaded ? 1 : 0,
          zIndex: 20,
          overflow: 'hidden' // Prevent photo from causing scroll
        }}
      />

      {/* Navigation */}
      <nav 
      className="relative z-10 w-full"
      style={{
      paddingTop: '128px',
      paddingBottom: '0px'
      }}
      >
      <div 
      className="w-full px-6 relative flex"
      style={{
      transform: 'translateX(6%)',
      justifyContent: 'flex-start'
      }}
      >
      
      {/* Menu Block - Lines + Menu grouped together */}
      <div className="flex flex-col items-center">
        {/* Top gradient line */}
        <div 
        className="transition-all duration-300 relative"
        style={{
        height: '4.5px',
        marginBottom: '0px',
        width: '100%',
      background: `linear-gradient(to right, transparent 0%, ${
      isDark ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)'
      } 8%, ${
      isDark ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)'
      } 92%, transparent 100%)`,
      zIndex: 10
      }}
      />
      
      {/* Menu items */}
      <ul 
      className="flex relative font-light transition-all duration-300"
      style={{ 
          fontFamily: 'var(--font-merriweather), serif',
                  fontSize: '44px',
          gap: '71px',
          letterSpacing: '0px',
        paddingLeft: '48px',
        paddingRight: '48px',
        paddingTop: '22px',
      paddingBottom: '22px',
      width: '100%',
      justifyContent: 'center',
      zIndex: 10,
      background: `linear-gradient(to right, transparent 0%, ${
      isDark ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'
      } 8%, ${
      isDark ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'
      } 92%, transparent 100%)`,
      backdropFilter: 'blur(0px)'
      }}
      >
      {PAGES.map((href) => (
      <li key={href}>
      <TransitionLink
      href={href}
      className={`nav-button hover:underline underline-offset-4 decoration-2 transition-all ${
      pathname === href ? 'underline' : ''
      }`}
      >
      {PAGE_NAMES[href as keyof typeof PAGE_NAMES]}
      </TransitionLink>
      </li>
      ))}
      </ul>
      
      {/* Bottom gradient line */}
      <div 
      className="transition-all duration-300 relative"
      style={{
      height: '4.5px',
      marginTop: '0px',
      width: '100%',
      background: `linear-gradient(to right, transparent 0%, ${
      isDark ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)'
      } 8%, ${
      isDark ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)'
      } 92%, transparent 100%)`,
      zIndex: 10
      }}
      />
      </div>
      </div>
      </nav>

        {/* Page Content Areas */}
        {!isTransitioning && (
          <main 
            className="fixed z-10" 
            style={{
              left: `${contentZoneSettings.leftOffset}%`,
              right: `${contentZoneSettings.rightOffset}%`,
              top: `${contentZoneSettings.topOffset}%`,
              bottom: `${contentZoneSettings.bottomOffset}%`,
              padding: `${contentZoneSettings.padding}rem`,
            }}
          >
            <div className="w-full h-full overflow-auto">
              {children}
            </div>
          </main>
        )}
        
        {/* Exit Animation */}
        {isTransitioning && (
          <main 
            key="old-content"
            className={`fixed z-10 ${
              direction === 'right' ? 'content-area-slide-out-left' : 'content-area-slide-out-right'
            }`}
            style={{
              left: `${contentZoneSettings.leftOffset}%`,
              right: `${contentZoneSettings.rightOffset}%`,
              top: `${contentZoneSettings.topOffset}%`,
              bottom: `${contentZoneSettings.bottomOffset}%`,
              padding: `${contentZoneSettings.padding}rem`,
            }}
          >
            <div className="w-full h-full overflow-auto">
              {oldContent}
            </div>
          </main>
        )}
        
        {/* New content area - slides in */}
        {isTransitioning && newContent && (
          <main 
            key="new-content"
            className={`fixed z-10 ${
              direction === 'right' ? 'content-area-slide-in-right' : 'content-area-slide-in-left'
            }`}
            style={{
              left: `${contentZoneSettings.leftOffset}%`,
              right: `${contentZoneSettings.rightOffset}%`,
              top: `${contentZoneSettings.topOffset}%`,
              bottom: `${contentZoneSettings.bottomOffset}%`,
              padding: `${contentZoneSettings.padding}rem`,
            }}
          >
            <div className="w-full h-full overflow-auto">
              {newContent}
            </div>
          </main>
        )}

      {/* Theme Switcher */}
      <div className="absolute top-6 right-6 z-10 flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="theme-switcher flex items-center gap-2 px-4 py-2 rounded-full border border-current/20 bg-current/5 backdrop-blur-sm hover:bg-current/10 transition-all text-sm"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
          <span>
            {isDark ? 'Светлая тема' : 'Темная тема'}
          </span>
        </button>
      </div>

      {/* Footer spacer */}
      <div className="h-20" />
    </div>
  );
}
