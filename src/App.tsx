import { Contact } from './components/Contact'
import { Navigation } from './components/Navigation'
import { CourseEntries, EducationEntries, ExperienceEntries, SkillEntries } from './components/ResumeEntries'
import { Pending, Section } from './components/Section'
import { profile as defaultProfile } from './data/profile'
import type { Profile } from './data/profile'

export default function App({ profile = defaultProfile }: { profile?: Profile }) {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Navigation name={profile.name} />

      <main id="conteudo" tabIndex={-1}>
        <div className="page-top">
          <span className="eyebrow">Currículo & portfólio</span>
          <span className="page-context">Indústria <span aria-hidden="true">/</span> Perfil profissional</span>
        </div>

        <section id="apresentacao" tabIndex={-1} aria-labelledby="name" className="hero">
          <p className="hero-kicker eyebrow"><span aria-hidden="true" />Apresentação profissional</p>
          <h1 id="name">{profile.name || '[A preencher]'}</h1>
          <p className="hero-role">{profile.title || '[A preencher]'}</p>
          <p className="hero-introduction">{profile.introduction || 'Resumo profissional: [A preencher]'}</p>

          <div className="hero-actions flex flex-wrap items-center gap-4">
            <a className="button-primary" href="#contato">
              Informações de contato
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M4 12h15m-6-6 6 6-6 6" />
              </svg>
            </a>
            <a className="text-link" href="#experiencia">Explorar trajetória<span aria-hidden="true">↓</span></a>
          </div>

          <dl className="hero-details grid gap-6 sm:grid-cols-3">
            <div><dt>Localização</dt><dd>{profile.location || '[A preencher]'}</dd></div>
            <div><dt>Área de atuação</dt><dd>{profile.focus || '[A preencher]'}</dd></div>
            <div><dt>Disponibilidade</dt><dd>{profile.availability || '[A preencher]'}</dd></div>
          </dl>
        </section>

        <Section id="sobre" number="02" title="Sobre" subtitle="O contexto por trás da trajetória.">
          {profile.about?.length ? (
            <div className="prose">
              {profile.about.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          ) : <Pending label="Apresentação pessoal e objetivos profissionais" />}
        </Section>

        <Section id="experiencia" number="03" title="Experiência" subtitle="Vivência profissional e contribuições.">
          <ExperienceEntries items={profile.experience} />
        </Section>

        <Section id="formacao" number="04" title="Formação" subtitle="A base do conhecimento profissional.">
          <EducationEntries items={profile.education} />
        </Section>

        <Section id="competencias" number="05" title="Competências" subtitle="Conhecimentos e habilidades na prática.">
          <SkillEntries groups={profile.skills} />
        </Section>

        <Section id="cursos" number="06" title="Cursos e certificações" subtitle="Aprendizado e desenvolvimento contínuo.">
          <CourseEntries items={profile.courses} />
        </Section>

        <Section id="contato" number="07" title="Contato" subtitle="O próximo passo começa com uma conversa.">
          <Contact contact={profile.contact} />
        </Section>

        <footer className="page-footer">
          <span>Currículo profissional<span className="footer-divider" aria-hidden="true"> / </span>Indústria</span>
          <a href="#apresentacao">Voltar ao início<span aria-hidden="true">↑</span></a>
        </footer>
      </main>
    </>
  )
}

