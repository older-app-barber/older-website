import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Page } from "components/shared/Page";
import logo from "assets/logos/logo_white.png";
import { TbCopy, TbCheck, TbChevronDown, TbChevronUp } from "react-icons/tb";

const GOLD = "#b8922e";
const PIX_PAYLOAD =
  "00020126360014BR.GOV.BCB.PIX0114+55619817293135204000053039865802BR5918JADSON CUNHA SILVA6008BRASILIA62070503***63040ABA";

export default function Pix() {
  const [copied, setCopied] = useState(false);
  const [showPayload, setShowPayload] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(PIX_PAYLOAD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Page title="Pix — Older Barber Shop">
      <main
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-16"
        style={{ background: "#080808" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(184,146,46,0.10) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 flex w-full max-w-sm flex-col items-center gap-8">
          <img
            src={logo}
            alt="Older Barber Shop"
            className="w-36 select-none drop-shadow-lg"
            draggable={false}
          />

          <div className="flex w-full items-center gap-3">
            <div
              className="h-px flex-1"
              style={{ background: `linear-gradient(to right, transparent, ${GOLD}60)` }}
            />
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <rect x="7" y="0" width="7" height="7" transform="rotate(45 7 0)" fill={GOLD} opacity="0.7" />
            </svg>
            <div
              className="h-px flex-1"
              style={{ background: `linear-gradient(to left, transparent, ${GOLD}60)` }}
            />
          </div>

          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold tracking-widest text-white/90">Pix</h1>
            <p className="text-xs tracking-wide text-white/30">Older Barber Shop</p>
          </div>

          <div
            className="flex items-center justify-center rounded-2xl p-5 shadow-lg"
            style={{ background: "#ffffff" }}
          >
            <QRCodeSVG value={PIX_PAYLOAD} size={240} />
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="flex w-full items-center justify-center gap-3 rounded-xl px-5 py-4 text-sm font-semibold transition-all duration-200"
            style={{
              background: copied ? `${GOLD}28` : `${GOLD}18`,
              border: `1px solid ${copied ? GOLD : GOLD + "50"}`,
              color: GOLD,
              cursor: "pointer",
            }}
          >
            {copied ? <TbCheck size={18} /> : <TbCopy size={18} />}
            {copied ? "Copiado!" : "Copiar código Pix"}
          </button>

          <button
            type="button"
            onClick={() => setShowPayload((v) => !v)}
            className="flex items-center gap-1 text-[11px] text-white/20 transition-colors hover:text-white/40"
            style={{ cursor: "pointer", background: "none", border: "none", padding: 0 }}
          >
            {showPayload ? <TbChevronUp size={13} /> : <TbChevronDown size={13} />}
            {showPayload ? "ocultar código" : "mostrar código"}
          </button>

          {showPayload && (
            <p
              className="w-full break-all rounded-xl px-4 py-3 text-[10px] leading-relaxed text-white/25"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {PIX_PAYLOAD}
            </p>
          )}

          <p className="text-[11px] tracking-wide text-white/20">
            © {new Date().getFullYear()} Older Barber Shop
          </p>
        </div>
      </main>
    </Page>
  );
}
