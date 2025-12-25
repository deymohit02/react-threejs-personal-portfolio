"use client";

import { useEffect, useRef, useCallback } from "react";
import Lenis from "@studio-freight/lenis";

interface ScrollLockState {
  isLocked: boolean;
  currentSection: string | null;
  lockUntil: number; // timestamp
}

/**
 * Global scroll lock manager for cinematic full-page scrolling
 * Coordinates all section locks across the page
 */
export class ScrollLockManager {
  private static instance: ScrollLockManager;
  private state: ScrollLockState = {
    isLocked: false,
    currentSection: null,
    lockUntil: 0,
  };
  private listeners: Set<() => void> = new Set();

  static getInstance(): ScrollLockManager {
    if (!ScrollLockManager.instance) {
      ScrollLockManager.instance = new ScrollLockManager();
    }
    return ScrollLockManager.instance;
  }

  lock(sectionId: string, duration: number) {
    this.state.isLocked = true;
    this.state.currentSection = sectionId;
    this.state.lockUntil = Date.now() + duration;
    this.notifyListeners();

    // Auto-unlock after duration
    setTimeout(() => {
      if (this.state.lockUntil <= Date.now()) {
        this.unlock();
      }
    }, duration);
  }

  unlock() {
    this.state.isLocked = false;
    this.state.currentSection = null;
    this.state.lockUntil = 0;
    this.notifyListeners();
  }

  isLocked(): boolean {
    if (Date.now() > this.state.lockUntil) {
      this.state.isLocked = false;
    }
    return this.state.isLocked;
  }

  getCurrentSection(): string | null {
    return this.state.currentSection;
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }
}

interface UseFullPageScrollProps {
  enableLocking?: boolean;
  onLockChange?: (isLocked: boolean) => void;
}

export function useFullPageScroll(
  lenis: Lenis | null,
  { enableLocking = true, onLockChange }: UseFullPageScrollProps = {}
) {
  const manager = ScrollLockManager.getInstance();
  const preventScrollRef = useRef(false);

  useEffect(() => {
    if (!lenis || !enableLocking) return;

    // Subscribe to lock state changes
    const unsubscribe = manager.subscribe(() => {
      const isLocked = manager.isLocked();
      onLockChange?.(isLocked);
    });

    // Intercept wheel events to respect locks
    const handleWheel = (e: WheelEvent) => {
      if (manager.isLocked()) {
        e.preventDefault();
        preventScrollRef.current = true;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      unsubscribe();
    };
  }, [lenis, enableLocking, onLockChange]);

  return {
    lock: (sectionId: string, duration: number) => manager.lock(sectionId, duration),
    unlock: () => manager.unlock(),
    isLocked: () => manager.isLocked(),
    getCurrentSection: () => manager.getCurrentSection(),
  };
}
