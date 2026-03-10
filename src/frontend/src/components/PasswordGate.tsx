import { useState } from "react";

interface PasswordGateProps {
  onUnlock: () => void;
}

export default function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === "20002026") {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setInput("");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,165,0,0.4)",
          borderRadius: 20,
          padding: "48px 40px",
          width: 340,
          maxWidth: "90vw",
          boxShadow: "0 8px 40px rgba(255,140,0,0.2)",
          textAlign: "center",
        }}
      >
        {/* Logo / Icon */}
        <div style={{ fontSize: 48, marginBottom: 12 }}>🔒</div>
        <h2
          style={{
            color: "#ffa500",
            fontWeight: 900,
            fontSize: 22,
            letterSpacing: 2,
            marginBottom: 4,
          }}
        >
          LAKKI HOLIDAYS
        </h2>
        <p style={{ color: "#aaa", fontSize: 13, marginBottom: 28 }}>
          Enter the password to access the site
        </p>
        <form onSubmit={handleSubmit}>
          <input
            data-ocid="password_gate.input"
            type="password"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            placeholder="Password"
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 10,
              border: error
                ? "1.5px solid #ff4444"
                : "1.5px solid rgba(255,165,0,0.5)",
              background: "rgba(255,255,255,0.08)",
              color: "#fff",
              fontSize: 18,
              letterSpacing: 4,
              outline: "none",
              boxSizing: "border-box",
              animation: shake ? "shake 0.5s" : "none",
              marginBottom: 8,
            }}
          />
          {error && (
            <p
              data-ocid="password_gate.error_state"
              style={{ color: "#ff4444", fontSize: 13, marginBottom: 8 }}
            >
              Incorrect password. Please try again.
            </p>
          )}
          <button
            data-ocid="password_gate.submit_button"
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 10,
              border: "none",
              background: "linear-gradient(90deg, #ff8c00, #ffa500)",
              color: "#fff",
              fontWeight: 800,
              fontSize: 15,
              letterSpacing: 1,
              cursor: "pointer",
              marginTop: 4,
              boxShadow: "0 4px 15px rgba(255,140,0,0.4)",
            }}
          >
            ENTER SITE
          </button>
        </form>
      </div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-8px); }
          80% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
}
