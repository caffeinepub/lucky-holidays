import { useEffect, useMemo, useState } from "react";

const LETTERS = [
  { id: "L1", char: "L" },
  { id: "A1", char: "A" },
  { id: "K1", char: "K" },
  { id: "K2", char: "K" },
  { id: "I1", char: "I" },
];

// Pool of Arial-family / bold font variations to randomly pick from each load
const FONT_VARIANTS = [
  {
    fontFamily: "'Arial Black', Arial, sans-serif",
    fontWeight: "900",
    fontStyle: "normal",
  },
  { fontFamily: "Arial, sans-serif", fontWeight: "900", fontStyle: "italic" },
  {
    fontFamily: "'Arial Narrow', Arial, sans-serif",
    fontWeight: "900",
    fontStyle: "normal",
  },
  { fontFamily: "Arial, sans-serif", fontWeight: "700", fontStyle: "normal" },
  {
    fontFamily: "'Arial Black', Arial, sans-serif",
    fontWeight: "900",
    fontStyle: "italic",
  },
  { fontFamily: "Arial, sans-serif", fontWeight: "800", fontStyle: "normal" },
];

// Direction alternates each page load using sessionStorage counter
function getDirection(): "left" | "right" {
  const key = "lakki_splash_count";
  const count = Number.parseInt(sessionStorage.getItem(key) || "0", 10);
  sessionStorage.setItem(key, String(count + 1));
  return count % 2 === 0 ? "right" : "left";
}

function pickFontVariant() {
  return FONT_VARIANTS[Math.floor(Math.random() * FONT_VARIANTS.length)];
}

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit" | "done">(
    "enter",
  );
  const direction = useMemo(() => getDirection(), []);
  const fontVariant = useMemo(() => pickFontVariant(), []);

  // enter: slide in from opposite side (0.4s)
  // hold:  visible (0.7s)
  // exit:  slide out toward direction (0.4s)
  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase("hold"), 400);
    const exitTimer = setTimeout(() => setPhase("exit"), 1100);
    const doneTimer = setTimeout(() => {
      setPhase("done");
      onDone();
    }, 1500);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  if (phase === "done") return null;

  const enterFrom = direction === "right" ? "-120vw" : "120vw";
  const exitTo = direction === "right" ? "120vw" : "-120vw";

  const containerTranslate =
    phase === "enter" ? enterFrom : phase === "exit" ? exitTo : "0px";

  const containerTransition =
    phase === "enter"
      ? "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
      : phase === "exit"
        ? "transform 0.4s cubic-bezier(0.64, 0, 0.78, 0)"
        : "none";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: "transparent" }}
      data-ocid="splash.panel"
    >
      <div
        style={{
          display: "flex",
          gap: "clamp(6px, 2vw, 20px)",
          transform: `translateX(${containerTranslate})`,
          transition: containerTransition,
          willChange: "transform",
        }}
      >
        {LETTERS.map(({ id, char }) => (
          <span
            key={id}
            className="select-none"
            style={{
              fontSize: "clamp(3.5rem, 15vw, 9rem)",
              fontFamily: fontVariant.fontFamily,
              fontWeight: fontVariant.fontWeight,
              fontStyle: fontVariant.fontStyle,
              color: "transparent",
              WebkitTextStroke: "2px #1a1a1a",
              textShadow: [
                "1px 1px 0px #555",
                "2px 2px 0px #444",
                "3px 3px 0px #333",
                "4px 4px 0px #222",
                "5px 5px 0px #111",
                "6px 6px 8px rgba(0,0,0,0.35)",
              ].join(", "),
              display: "inline-block",
              letterSpacing: "0.04em",
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
