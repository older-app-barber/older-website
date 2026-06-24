import { Page } from "components/shared/Page";
import logo from "assets/logos/logo_white.png";

const GOLD = "#b8922e";

const Section = ({ title, children }) => (
  <section className="flex flex-col gap-3">
    <h2
      className="text-base font-semibold tracking-wide"
      style={{ color: GOLD }}
    >
      {title}
    </h2>
    <div className="flex flex-col gap-2 text-sm leading-relaxed text-white/60">
      {children}
    </div>
  </section>
);

export default function PrivacyPolicy() {
  return (
    <Page title="Política de Privacidade — Older Barber Shop">
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
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-xl font-bold tracking-wide text-white/90">
                Política de Privacidade
              </h1>
              <p className="text-xs text-white/30">
                Última atualização: junho de 2026
              </p>
            </div>
            {/* Divider */}
            <div className="flex w-full items-center gap-3">
              <div
                className="h-px flex-1"
                style={{ background: `linear-gradient(to right, transparent, ${GOLD}50)` }}
              />
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden>
                <rect x="7" y="0" width="7" height="7" transform="rotate(45 7 0)" fill={GOLD} opacity="0.6" />
              </svg>
              <div
                className="h-px flex-1"
                style={{ background: `linear-gradient(to left, transparent, ${GOLD}50)` }}
              />
            </div>
          </div>

          {/* Intro */}
          <p className="text-sm leading-relaxed text-white/50">
            A <strong className="text-white/70">Older Barber Shop</strong> (&ldquo;nós&rdquo;, &ldquo;nosso&rdquo;) respeita
            a privacidade dos seus usuários. Esta Política descreve quais dados coletamos, como
            utilizamos e quais são seus direitos, em conformidade com a Lei Geral de Proteção de
            Dados (LGPD — Lei nº 13.709/2018).
          </p>

          {/* Sections */}
          <Section title="1. Dados que coletamos">
            <p>Ao criar sua conta ou realizar login, coletamos:</p>
            <ul className="ml-4 flex list-disc flex-col gap-1">
              <li><strong className="text-white/75">Nome completo</strong> — para identificação nos agendamentos.</li>
              <li><strong className="text-white/75">Endereço de e-mail</strong> — para autenticação e comunicações.</li>
              <li><strong className="text-white/75">Foto de perfil</strong> — quando fornecida via Google ou Apple.</li>
              <li><strong className="text-white/75">Número de telefone</strong> — opcionalmente, para contato e notificações de agendamento via WhatsApp.</li>
            </ul>
            <p>
              O login via <strong className="text-white/75">Google</strong> ou{" "}
              <strong className="text-white/75">Apple</strong> é processado pelos serviços
              de autenticação dessas plataformas. Recebemos apenas os dados que você
              autoriza ao conceder permissão.
            </p>
          </Section>

          <Section title="2. Como usamos seus dados">
            <ul className="ml-4 flex list-disc flex-col gap-1">
              <li>Criar e gerenciar seus agendamentos de serviços.</li>
              <li>Enviar lembretes e notificações relacionados ao agendamento.</li>
              <li>Processar pagamentos de forma segura.</li>
              <li>Melhorar a experiência do aplicativo e do site.</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
            <p>
              Não utilizamos seus dados para fins de marketing de terceiros nem
              vendemos informações pessoais a nenhuma empresa.
            </p>
          </Section>

          <Section title="3. Compartilhamento de dados">
            <p>
              Seus dados podem ser compartilhados apenas nas seguintes situações:
            </p>
            <ul className="ml-4 flex list-disc flex-col gap-1">
              <li>
                <strong className="text-white/75">Stripe</strong> — nosso processador de
                pagamentos. Os dados de cartão são tratados diretamente pela Stripe e nunca
                armazenados em nossos servidores. A Stripe é certificada PCI-DSS. Consulte a
                política de privacidade da Stripe em{" "}
                <a
                  href="https://stripe.com/br/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: GOLD }}
                  className="underline underline-offset-2"
                >
                  stripe.com/br/privacy
                </a>
                .
              </li>
              <li>
                <strong className="text-white/75">Barbeiros parceiros</strong> — seu nome e
                horário agendado são visíveis ao profissional responsável pelo atendimento.
              </li>
              <li>
                <strong className="text-white/75">Exigência legal</strong> — quando
                obrigados por lei, ordem judicial ou autoridade competente.
              </li>
            </ul>
          </Section>

          <Section title="4. Armazenamento e segurança">
            <p>
              Seus dados são armazenados em servidores seguros. Adotamos medidas técnicas e
              organizacionais para protegê-los contra acesso não autorizado, perda ou divulgação
              indevida. O acesso é restrito a colaboradores com necessidade operacional.
            </p>
          </Section>

          <Section title="5. Seus direitos (LGPD)">
            <p>Você tem direito a:</p>
            <ul className="ml-4 flex list-disc flex-col gap-1">
              <li>Confirmar a existência de tratamento dos seus dados.</li>
              <li>Acessar os dados que mantemos sobre você.</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
              <li>Solicitar a exclusão dos seus dados pessoais.</li>
              <li>Revogar o consentimento a qualquer momento.</li>
            </ul>
            <p>
              Para <strong className="text-white/75">excluir sua conta e todos os dados associados</strong>,
              entre em contato pelo e-mail{" "}
              <a
                href="mailto:barbershopolder@gmail.com"
                style={{ color: GOLD }}
                className="underline underline-offset-2"
              >
                barbershopolder@gmail.com
              </a>
              . A exclusão será processada em até 30 dias úteis.
            </p>
          </Section>

          <Section title="6. Cookies e rastreamento">
            <p>
              O site utiliza cookies essenciais para manter a sessão autenticada. Não
              utilizamos cookies de rastreamento de terceiros para publicidade.
            </p>
          </Section>

          <Section title="7. Alterações nesta Política">
            <p>
              Podemos atualizar esta Política periodicamente. Quando houver alterações
              relevantes, notificaremos pelo aplicativo. O uso continuado dos serviços após a
              notificação implica aceitação das alterações.
            </p>
          </Section>

          <Section title="8. Contato">
            <p>
              Dúvidas sobre privacidade? Entre em contato:{" "}
              <a
                href="mailto:barbershopolder@gmail.com"
                style={{ color: GOLD }}
                className="underline underline-offset-2"
              >
                barbershopolder@gmail.com
              </a>
            </p>
          </Section>

          {/* Footer */}
          <p className="mt-4 text-center text-[11px] tracking-wide text-white/20">
            © {new Date().getFullYear()} Older Barber Shop
          </p>
        </div>
      </main>
    </Page>
  );
}
