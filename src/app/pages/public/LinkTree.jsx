import {
  TbBrandInstagram,
  TbBrandWhatsapp,
  TbBrandTiktok,
  TbBrandGooglePlay,
  TbBrandApple,
} from "react-icons/tb";

import { Page } from "components/shared/Page";
import logo from "assets/logos/logo_white.png";

// ----------------------------------------------------------------------

const socialLinks = [
  { label: "Instagram", href: "#", Icon: TbBrandInstagram },
  { label: "WhatsApp",  href: "#", Icon: TbBrandWhatsapp  },
  { label: "TikTok",   href: "#", Icon: TbBrandTiktok    },
];

const appLinks = [
  { label: "Android", href: "#", Icon: TbBrandGooglePlay },
  { label: "iOS",     href: "#", Icon: TbBrandApple      },
];

// Gold accent matching the logo's border color
const GOLD = "#b8922e";

export default function LinkTree() {
  return (
    <Page title="Links — Older Barber Shop">
      {/* Background with subtle warm glow from center */}
      <main
        className="relative min-h-screen flex flex-col items-center justify-center px-5 py-16 overflow-hidden"
        style={{ background: "#080808" }}
      >
        {/* Radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(184,146,46,0.10) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-sm">
          {/* Logo */}
          <img
            src={logo}
            alt="Older Barber Shop"
            className="w-44 select-none drop-shadow-lg"
            draggable={false}
          />

          {/* Ornamental divider */}
          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}60)` }} />
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <rect x="7" y="0" width="7" height="7" transform="rotate(45 7 0)" fill={GOLD} opacity="0.7" />
            </svg>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${GOLD}60)` }} />
          </div>

          {/* Social links */}
          <div className="flex flex-col gap-3 w-full">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 w-full rounded-xl px-5 py-4 text-sm font-medium text-white/90 transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(184,146,46,0.10)";
                  e.currentTarget.style.border = `1px solid ${GOLD}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.09)";
                }}
              >
                <span
                  className="flex items-center justify-center size-9 rounded-lg shrink-0 transition-colors duration-200"
                  style={{ background: `${GOLD}20`, color: GOLD }}
                >
                  <Icon className="size-5" />
                </span>
                <span className="flex-1">{label}</span>
                <svg className="size-4 text-white/20 group-hover:text-white/40 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>

          {/* Section label */}
          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-medium">
              Baixar o app
            </span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* App download */}
          <div className="flex flex-col gap-3 w-full">
            {appLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 w-full rounded-xl px-5 py-4 text-sm font-medium transition-all duration-200"
                style={{
                  background: "transparent",
                  border: `1px solid ${GOLD}40`,
                  color: GOLD,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${GOLD}12`;
                  e.currentTarget.style.border = `1px solid ${GOLD}80`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.border = `1px solid ${GOLD}40`;
                }}
              >
                <span
                  className="flex items-center justify-center size-9 rounded-lg shrink-0"
                  style={{ background: `${GOLD}15` }}
                >
                  <Icon className="size-5" />
                </span>
                <span className="flex-1">{label}</span>
                <svg className="size-4 opacity-40 group-hover:opacity-70 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>

          {/* Footer */}
          <p className="text-[11px] text-white/20 tracking-wide mt-2">
            © {new Date().getFullYear()} Older Barber Shop
          </p>
        </div>
      </main>
    </Page>
  );
}
