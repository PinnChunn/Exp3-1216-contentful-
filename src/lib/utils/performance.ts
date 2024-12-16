/**
 * Performance monitoring utilities
 */

interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
}

class Performance {
  private static instance: Performance;
  private metrics: PerformanceMetric[] = [];
  private marks: Map<string, number> = new Map();

  private constructor() {}

  static getInstance(): Performance {
    if (!Performance.instance) {
      Performance.instance = new Performance();
    }
    return Performance.instance;
  }

  mark(name: string): void {
    this.marks.set(name, performance.now());
  }

  measure(name: string, startMark: string): void {
    const start = this.marks.get(startMark);
    if (!start) {
      console.warn(`Start mark "${startMark}" not found`);
      return;
    }

    const duration = performance.now() - start;
    this.metrics.push({
      name,
      duration,
      timestamp: Date.now()
    });

    this.marks.delete(startMark);
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  clear(): void {
    this.metrics = [];
    this.marks.clear();
  }
}

export const performanceMonitor = Performance.getInstance();