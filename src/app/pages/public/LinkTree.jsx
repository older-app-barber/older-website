import {
  TbBrandInstagram,
  TbBrandWhatsapp,
  TbBrandGoogle,
  TbBrandGooglePlay,
  TbBrandApple,
} from "react-icons/tb";

import { Page } from "components/shared/Page";
import logo from "assets/logos/logo_white.png";

// ----------------------------------------------------------------------

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/older.barbershop?igsh=MXQ4bGliZDV4c2I=",
    Icon: TbBrandInstagram,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/556181729313",
    Icon: TbBrandWhatsapp,
  },
  {
    label: "Google",
    href: "https://share.google/l6xXg7rVLcFfCE6Cp",
    Icon: TbBrandGoogle,
  },
];

const appLinks = [
  {
    label: "Android",
    href: "https://play.google.com/store/apps/details?id=com.bitcode.older",
    Icon: TbBrandGooglePlay,
  },
  {
    label: "iOS",
    href: "https://apps.apple.com/br/app/id6739007879",
    Icon: TbBrandApple,
  },
];

// Gold accent matching the logo's border color
const GOLD = "#b8922e";

export default function LinkTree() {
  return (
    <Page title="Links — Older Barber Shop">
      {/* Background with subtle warm glow from center */}
      <main
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-16"
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

        <div className="relative z-10 flex w-full max-w-sm flex-col items-center gap-8">
          {/* Logo */}
          <img
            src={logo}
            alt="Older Barber Shop"
            className="w-44 select-none drop-shadow-lg"
            draggable={false}
          />

          {/* Ornamental divider */}
          <div className="flex w-full items-center gap-3">
            <div
              className="h-px flex-1"
              style={{
                background: `linear-gradient(to right, transparent, ${GOLD}60)`,
              }}
            />
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
            >
              <rect
                x="7"
                y="0"
                width="7"
                height="7"
                transform="rotate(45 7 0)"
                fill={GOLD}
                opacity="0.7"
              />
            </svg>
            <div
              className="h-px flex-1"
              style={{
                background: `linear-gradient(to left, transparent, ${GOLD}60)`,
              }}
            />
          </div>

          {/* Social links */}
          <div className="flex w-full flex-col gap-3">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center gap-4 rounded-xl px-5 py-4 text-sm font-medium text-white/90 transition-all duration-200"
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
                  e.currentTarget.style.border =
                    "1px solid rgba(255,255,255,0.09)";
                }}
              >
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200"
                  style={{ background: `${GOLD}20`, color: GOLD }}
                >
                  <Icon className="size-5" />
                </span>
                <span className="flex-1">{label}</span>
                <svg
                  className="size-4 text-white/20 transition-colors group-hover:text-white/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            ))}
          </div>

          {/* Section label */}
          <div className="flex w-full items-center gap-3">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
              Baixar o app
            </span>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>

          {/* App download */}
          <div className="flex w-full flex-col gap-3">
            {appLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center gap-4 rounded-xl px-5 py-4 text-sm font-medium transition-all duration-200"
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
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: `${GOLD}15` }}
                >
                  <Icon className="size-5" />
                </span>
                <span className="flex-1">{label}</span>
                <svg
                  className="size-4 opacity-40 transition-opacity group-hover:opacity-70"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            ))}
          </div>

          {/* Footer */}
          <p className="mt-2 text-[11px] tracking-wide text-white/20">
            © {new Date().getFullYear()} Older Barber Shop
          </p>
        </div>
      </main>
    </Page>
  );
}
