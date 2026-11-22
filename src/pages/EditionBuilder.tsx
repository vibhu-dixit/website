import { aboutParagraphs, experiences, projects, publications, skillCategories } from "@/data/portfolio";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@/edition.css";

const templates = [
  { id: "broadsheet", name: "Broadsheet", description: "A bold newspaper edition." },
  { id: "classic", name: "Classic", description: "A compact, text-first résumé." },
  { id: "dossier", name: "Project dossier", description: "Selected work takes the lead." },
] as const;

const sections = [
  { id: "about", name: "About" },
  { id: "experience", name: "Experience" },
  { id: "projects", name: "Projects" },
  { id: "research", name: "Research" },
  { id: "skills", name: "Skills" },
] as const;

type Template = typeof templates[number]["id"];
type Section = typeof sections[number]["id"];

const EditionBuilder = () => {
  const [template, setTemplate] = useState<Template>("broadsheet");
  const [included, setIncluded] = useState<Set<Section>>(
    () => new Set(sections.map((section) => section.id)),
  );

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Vibhu Dixit — Portfolio Edition";
    return () => { document.title = previousTitle; };
  }, []);

  const toggleSection = (section: Section) => {
    setIncluded((current) => {
      const next = new Set(current);
      if (next.has(section)) {
        if (next.size === 1) return current;
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  };

  return (
    <div className="edition-builder">
      <header className="edition-toolbar">
        <Link to="/" className="edition-back">← Portfolio</Link>
        <span>VIBHU DIXIT / THE TAKE-HOME EDITION</span>
        <button type="button" onClick={() => window.print()}>PRINT / SAVE PDF ↗</button>
      </header>

      <div className="edition-layout">
        <aside className="edition-controls" aria-label="Customize your edition">
          <span className="edition-kicker">MAKE IT YOURS / 01</span>
          <h1>Build your edition.</h1>
          <p>Choose a format and the parts you want to keep. Then use your browser’s print dialog to save a PDF.</p>

          <fieldset>
            <legend>01 / FORMAT</legend>
            <div className="edition-template-options">
              {templates.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  className={template === option.id ? "is-selected" : ""}
                  aria-pressed={template === option.id}
                  onClick={() => setTemplate(option.id)}
                >
                  <strong>{option.name}</strong>
                  <span>{option.description}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>02 / INCLUDE</legend>
            <div className="edition-section-options">
              {sections.map((section) => (
                <label key={section.id}>
                  <input
                    type="checkbox"
                    checked={included.has(section.id)}
                    disabled={included.size === 1 && included.has(section.id)}
                    onChange={() => toggleSection(section.id)}
                  />
                  <span>{section.name}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <button className="edition-print" type="button" onClick={() => window.print()}>PRINT / SAVE PDF ↗</button>
          <a className="edition-resume" href={`${import.meta.env.BASE_URL}Vibhu_Dixit_Resume.pdf`} download>Or download the standard résumé ↗</a>
        </aside>

        <main className="edition-preview" aria-label="Edition preview">
          <div className="edition-preview-label"><span>LIVE PREVIEW</span><span>{templates.find((item) => item.id === template)?.name.toUpperCase()}</span></div>
          <article className={`edition-sheet edition-${template}`} aria-label={`${template} portfolio edition`}>
            <div className="edition-masthead">
              <span className="edition-issue">PORTFOLIO / 2026</span>
              <h2>VIBHU DIXIT</h2>
              <div className="edition-masthead-footer"><span>FOUNDING ENGINEER · FULL-STACK & AI</span><span>SAN FRANCISCO / EVERYWHERE</span></div>
            </div>

            <div className="edition-intro">
              <p>I design and build useful software, from production systems to intelligent applications.</p>
              <span>Founding Engineer at Casuro</span>
            </div>

            <div className="edition-content">
              {included.has("about") && (
                <section className="edition-section" data-section="about">
                  <h3>About</h3>
                  {aboutParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </section>
              )}

              {included.has("experience") && (
                <section className="edition-section" data-section="experience">
                  <h3>Experience</h3>
                  {experiences.map((item) => (
                    <div className="edition-item" key={item.company}>
                      <div className="edition-item-heading"><strong>{item.role} · {item.company}</strong><span>{item.period}</span></div>
                      <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
                    </div>
                  ))}
                </section>
              )}

              {included.has("projects") && (
                <section className="edition-section" data-section="projects">
                  <h3>Projects</h3>
                  <div className="edition-projects">
                    {projects.map((item) => (
                      <div className="edition-item" key={item.title}>
                        <div className="edition-item-heading"><strong>{item.title}</strong><span>{item.period}</span></div>
                        <p>{item.subtitle}</p>
                        <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
                        {item.github && <a href={item.github}>{item.github.replace("https://", "")}</a>}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {included.has("research") && (
                <section className="edition-section" data-section="research">
                  <h3>Research</h3>
                  {publications.map((item) => (
                    <div className="edition-item" key={item.title}>
                      <div className="edition-item-heading"><strong>{item.title}</strong><span>{item.venue}</span></div>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </section>
              )}

              {included.has("skills") && (
                <section className="edition-section" data-section="skills">
                  <h3>Skills</h3>
                  <div className="edition-skills">
                    {skillCategories.map((item) => (
                      <p key={item.label}><strong>{item.label}</strong><span>{item.skills.join(" · ")}</span></p>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <footer className="edition-footer">
              <a href="mailto:vibhu.dixit02@gmail.com">vibhu.dixit02@gmail.com</a>
              <a href="https://github.com/vibhu-dixit">github.com/vibhu-dixit</a>
              <a href="https://linkedin.com/in/vibhu-dixit-swe">linkedin.com/in/vibhu-dixit-swe</a>
            </footer>
          </article>
        </main>
      </div>
    </div>
  );
};

export default EditionBuilder;
