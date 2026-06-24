import { Page } from "components/shared/Page";
import logo from "assets/logos/logo_white.png";
import { TbTrash, TbMail, TbCircleCheck } from "react-icons/tb";

const GOLD = "#b8922e";

export default function AccountDeletion() {
  const subject = encodeURIComponent("Solicitação de Exclusão de Conta — Older Barber Shop");
  const body = encodeURIComponent(
    "Olá,\n\nGostaria de solicitar a exclusão da minha conta e de todos os dados associados no aplicativo Older Barber Shop.\n\nNome: \nE-mail da conta: \n\nAtenciosamente."
  );

  return (
    <Page title="Exclusão de Conta — Older Barber Shop">
      <main
        className="relative flex min-h-screen flex-col items-center overflow-hidden px-5 py-16"
        style={{ background: "#080808" }}
      >
        {/* Radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(184,146,46,0.07) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 flex w-full max-w-2xl flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col items-center gap-6">
            <img
              src={logo}
              alt="Older Barber Shop"
              className="w-32 select-none drop-shadow-lg"
              draggable={false}
            />
            <div className="flex flex-col items-center gap-2 text-center">
              <span
                className="flex size-12 items-center justify-center rounded-full"
                style={{ background: `${GOLD}15`, color: GOLD }}
              >
                <TbTrash size={22} />
              </span>
              <h1 className="text-xl font-bold tracking-wide text-white/90">
                Exclusão de Conta
              </h1>
              <p className="max-w-sm text-sm text-white/40">
                Aplicativo <strong className="text-white/60">Older Barber Shop</strong>
              </p>
            </div>
            {/* Divider */}
            <div className="flex w-full items-center gap-3">
              <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${GOLD}50)` }} />
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden>
                <rect x="7" y="0" width="7" height="7" transform="rotate(45 7 0)" fill={GOLD} opacity="0.6" />
              </svg>
              <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${GOLD}50)` }} />
            </div>
          </div>

          {/* Intro */}
          <p className="text-sm leading-relaxed text-white/50">
            Você pode solicitar a exclusão da sua conta e de todos os dados pessoais
            associados ao aplicativo <strong className="text-white/70">Older Barber Shop</strong> a
            qualquer momento. Basta enviar um e-mail para o endereço abaixo seguindo as
            instruções desta página.
          </p>

          {/* O que será excluído */}
          <section className="flex flex-col gap-4">
            <h2 className="text-base font-semibold tracking-wide" style={{ color: GOLD }}>
              O que será excluído
            </h2>
            <div className="flex flex-col gap-3">
              {[
                { label: "Perfil", desc: "Nome, foto, e-mail e telefone cadastrados." },
                { label: "Agendamentos", desc: "Histórico completo de agendamentos realizados." },
                { label: "Dados de login", desc: "Vínculo com conta Google ou Apple utilizada para autenticação." },
                { label: "Dados de pagamento", desc: "Associação com métodos de pagamento (os dados de cartão são gerenciados pela Stripe e excluídos conforme a política deles)." },
              ].map(({ label, desc }) => (
                <div
                  key={label}
                  className="flex gap-4 rounded-xl px-5 py-4"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <TbCircleCheck size={18} style={{ color: GOLD, marginTop: 1, flexShrink: 0 }} />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-white/80">{label}</span>
                    <span className="text-xs leading-relaxed text-white/40">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Como solicitar */}
          <section className="flex flex-col gap-4">
            <h2 className="text-base font-semibold tracking-wide" style={{ color: GOLD }}>
              Como solicitar a exclusão
            </h2>
            <ol className="flex flex-col gap-3 text-sm text-white/55">
              <li className="flex gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold" style={{ background: `${GOLD}20`, color: GOLD }}>1</span>
                <span>Envie um e-mail para <strong className="text-white/75">barbershopolder@gmail.com</strong> com o assunto <em>&ldquo;Solicitação de Exclusão de Conta&rdquo;</em>.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold" style={{ background: `${GOLD}20`, color: GOLD }}>2</span>
                <span>Informe o <strong className="text-white/75">nome completo</strong> e o <strong className="text-white/75">e-mail</strong> cadastrado na conta.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold" style={{ background: `${GOLD}20`, color: GOLD }}>3</span>
                <span>Confirmaremos o recebimento e processaremos a exclusão em <strong className="text-white/75">até 30 dias</strong>.</span>
              </li>
            </ol>
          </section>

          {/* CTA */}
          <a
            href={`mailto:barbershopolder@gmail.com?subject=${subject}&body=${body}`}
            className="flex w-full items-center justify-center gap-3 rounded-xl px-5 py-4 text-sm font-semibold transition-all duration-200"
            style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}50`, color: GOLD }}
            onMouseEnter={(e) => { e.currentTarget.style.background = `${GOLD}28`; e.currentTarget.style.borderColor = `${GOLD}80`; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = `${GOLD}18`; e.currentTarget.style.borderColor = `${GOLD}50`; }}
          >
            <TbMail size={18} />
            Enviar solicitação por e-mail
          </a>

          {/* Nota */}
          <p className="text-xs leading-relaxed text-white/30">
            Após a exclusão, os dados não poderão ser recuperados. Agendamentos futuros
            confirmados serão cancelados. Se tiver dúvidas, consulte nossa{" "}
            <a
              href="/politica-de-privacidade"
              style={{ color: GOLD }}
              className="underline underline-offset-2"
            >
              Política de Privacidade
            </a>
            .
          </p>

          {/* Footer */}
          <p className="mt-2 text-center text-[11px] tracking-wide text-white/20">
            © {new Date().getFullYear()} Older Barber Shop
          </p>
        </div>
      </main>
    </Page>
  );
}
