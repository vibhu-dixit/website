import { useEffect, useState } from "react";
import { Moon, Sun, X } from "lucide-react";
import { useTheme, type Theme } from "@/context/ThemeContext";

const HINT_STORAGE_KEY = "theme-toggle-hint-dismissed";

const ARROW_TIP = { x: 16, y: 3 };
// Matches the final segment direction of the curve (15,6) → (16,3)
const ARROW_HEAD_ANGLE = -100;

const CurlyArrow = () => (
  <svg
    aria-hidden
    viewBox="0 0 32 52"
    className="absolute right-[1rem] top-0 h-full w-8 -translate-x-1/2 text-primary/80"
    fill="none"
  >
    <path
      d="M 16 48 C 8 44, 6 34, 12 26 C 16 20, 20 16, 18 12 C 16.5 8, 15 6, 15.4 4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <g transform={`translate(${ARROW_TIP.x} ${ARROW_TIP.y}) rotate(${ARROW_HEAD_ANGLE})`}>
      <polygon points="0,0 -6.5,2.8 -6.5,-2.8" fill="currentColor" stroke="none" />
    </g>
  </svg>
);

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(HINT_STORAGE_KEY)) return;
    const timer = window.setTimeout(() => setShowHint(true), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  const dismissHint = () => {
    setShowHint(false);
    localStorage.setItem(HINT_STORAGE_KEY, "1");
  };

  const selectTheme = (next: Theme) => {
    setTheme(next);
    dismissHint();
  };

  return (
    <div className="relative shrink-0">
      {showHint && (
        <div
          role="status"
          className="absolute right-0 top-[calc(100%+0.25rem)] z-[60] w-[11.5rem] animate-in fade-in slide-in-from-top-2 duration-500"
        >
          <div className="relative h-12 w-full">
            <CurlyArrow />
          </div>
          <div className="jarvis-panel hud-corner relative px-3 py-2.5 pr-8 shadow-[var(--glow-sm)]">
            <p className="font-mono text-[10px] leading-relaxed tracking-wide text-muted-foreground">
              Switch between <span className="text-primary">light</span> and{" "}
              <span className="text-primary">dark</span> mode here.
            </p>
            <button
              type="button"
              onClick={dismissHint}
              aria-label="Dismiss theme hint"
              className="absolute right-2 top-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <div
        role="group"
        aria-label="Theme"
        className="relative jarvis-panel inline-grid grid-cols-2 rounded-full p-1 w-[4.75rem] h-9"
      >
        <span
          aria-hidden
          className={`pointer-events-none absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-full border border-primary/30 bg-primary/15 shadow-[0_0_12px_hsl(var(--primary)/0.15)] transition-all duration-300 ease-out ${
            isDark ? "left-[calc(50%+0.05rem)]" : "left-1"
          }`}
        />

        <button
          type="button"
          onClick={() => selectTheme("light")}
          aria-label="Light mode"
          aria-pressed={!isDark}
          title="Light mode"
          className={`relative z-10 flex items-center justify-center rounded-full transition-colors duration-300 ${
            !isDark ? "text-primary" : "text-muted-foreground hover:text-primary/70"
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => selectTheme("dark")}
          aria-label="Dark mode"
          aria-pressed={isDark}
          title="Dark mode"
          className={`relative z-10 flex items-center justify-center rounded-full transition-colors duration-300 ${
            isDark ? "text-primary" : "text-muted-foreground hover:text-primary/70"
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle;
