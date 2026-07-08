import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const sheet = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, y: 16, scale: 0.98, transition: { duration: 0.18 } },
};

export const LoginModal = ({ isOpen, onClose }: Props) => {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [code, setCode] = useState("");
  const [verifyStrategy, setVerifyStrategy] = useState<"email_code" | "email_link">("email_code");
  const { signIn, signUp, verifyCode } = useAuth();

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  const reset = () => {
    setEmail("");
    setPassword("");
    setName("");
    setCode("");
    setError("");
    setSubmitting(false);
    setConfirmed(false);
    setVerifyStrategy("email_code");
  };

  const handleClose = () => { reset(); onClose(); };

  const switchMode = (next: "in" | "up") => { setMode(next); setError(""); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    if (mode === "in") {
      const { error: err } = await signIn(email, password);
      setSubmitting(false);
      if (err) { setError(err.message); return; }
      handleClose();
    } else {
      const { error: err, needsConfirmation, strategy } = await signUp(email, password, name);
      setSubmitting(false);
      if (err) { setError(err.message); return; }
      if (needsConfirmation) {
        if (strategy) setVerifyStrategy(strategy);
        setConfirmed(true);
        return;
      }
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="ws-backdrop"
            style={{ zIndex: 50 }}
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleClose}
          />
          <div className="ws-center" style={{ zIndex: 51 }}>
            <motion.div
              className="auth-sheet"
              variants={sheet}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-label={mode === "in" ? "Iniciar sesión" : "Crear cuenta"}
            >
              <div className="auth-header">
                <div>
                  <p className="ws-eyebrow">GymLab</p>
                  <h2 className="auth-title">
                    {confirmed
                      ? "Revisa tu email"
                      : mode === "in"
                      ? "Bienvenido de vuelta"
                      : "Empieza hoy"}
                  </h2>
                </div>
                <button className="ws-close" onClick={handleClose} aria-label="Cerrar">
                  ✕
                </button>
              </div>

              {confirmed ? (
                verifyStrategy === "email_code" ? (
                  <form className="auth-form" onSubmit={async (e) => {
                    e.preventDefault();
                    setError("");
                    setSubmitting(true);
                    const { error: err } = await verifyCode(code);
                    setSubmitting(false);
                    if (err) { setError(err.message); return; }
                    handleClose();
                  }}>
                    <p className="auth-confirm__sub">
                      Enviamos un código a <strong>{email}</strong>.<br />
                      Ingrésalo para verificar tu cuenta.
                    </p>
                    <div className="auth-field">
                      <label className="auth-label">Código de verificación</label>
                      <input
                        className="auth-input"
                        type="text"
                        inputMode="numeric"
                        placeholder="123456"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                        autoComplete="one-time-code"
                        autoFocus
                      />
                    </div>
                    {error && <p className="auth-error">{error}</p>}
                    <button className="auth-submit" type="submit" disabled={submitting}>
                      {submitting ? "Verificando..." : "Verificar"}
                    </button>
                  </form>
                ) : (
                  <div className="auth-confirm">
                    <p className="auth-confirm__sub">
                      Enviamos un enlace a <strong>{email}</strong>.<br />
                      Confirma tu cuenta y luego inicia sesión.
                    </p>
                    <button className="auth-submit" onClick={handleClose}>
                      Entendido
                    </button>
                  </div>
                )
              ) : (
                <>
                  <div className="auth-tabs">
                    <button
                      className={`auth-tab ${mode === "in" ? "active" : ""}`}
                      onClick={() => switchMode("in")}
                    >
                      Entrar
                    </button>
                    <button
                      className={`auth-tab ${mode === "up" ? "active" : ""}`}
                      onClick={() => switchMode("up")}
                    >
                      Crear cuenta
                    </button>
                  </div>

                  <form className="auth-form" onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                      {mode === "up" && (
                        <motion.div
                          key="name-field"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="auth-field">
                            <label className="auth-label">Nombre</label>
                            <input
                              className="auth-input"
                              type="text"
                              placeholder="Tu nombre"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required={mode === "up"}
                              autoComplete="name"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="auth-field">
                      <label className="auth-label">Email</label>
                      <input
                        className="auth-input"
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                      />
                    </div>

                    <div className="auth-field">
                      <label className="auth-label">Contraseña</label>
                      <input
                        className="auth-input"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        autoComplete={mode === "in" ? "current-password" : "new-password"}
                      />
                    </div>

                    {error && <p className="auth-error">{error}</p>}

                    <button className="auth-submit" type="submit" disabled={submitting}>
                      {submitting
                        ? "Cargando..."
                        : mode === "in"
                        ? "Entrar"
                        : "Crear cuenta"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
