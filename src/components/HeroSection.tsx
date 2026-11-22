import { Link } from "react-router-dom";

const HeroSection = () => (
  <section id="top" className="editorial-hero" aria-labelledby="hero-title">
      <div className="feature-strip">
        <a className="feature-tile feature-hotel" href="#projects">
          <span className="feature-image" role="img" aria-label="Illustrated hotel interior" />
          <span className="feature-copy"><strong>Selected work</strong><small>Software, systems & ideas</small></span>
        </a>
        <div className="feature-intro">
          <span className="eyebrow">Independent portfolio · No. 01</span>
          <h2>Building things<br /><em>that think.</em></h2>
          <p>Full-stack engineer working across AI, data, and product.</p>
          <a href="#projects">Explore the work <span aria-hidden="true">↗</span></a>
        </div>
        <a className="feature-tile feature-portrait" href="#about">
          <span className="feature-image" role="img" aria-label="Illustration of an engineer at work" />
          <span className="feature-copy"><strong>About Vibhu</strong><small>Engineer / maker / researcher</small></span>
        </a>
      </div>

      <div className="name-banner">
        <span className="banner-kicker">The portfolio of</span>
        <h1 id="hero-title">VIBHU<br className="mobile-break" /> DIXIT</h1>
        <div className="banner-footer"><span>Full-stack & AI engineer</span><span>San Francisco / Everywhere</span></div>
      </div>

      <div className="hero-bottom">
        <p><span className="drop-cap">I</span> design and build useful software, from production systems to intelligent applications.</p>
        <div>
          <span className="eyebrow">Currently</span>
          <strong>Founding Engineer at Casuro</strong>
          <Link to="/edition">Build your edition ↗</Link>
          <a href={`${import.meta.env.BASE_URL}Vibhu_Dixit_Resume.pdf`} download>Download résumé ↗</a>
        </div>
        <a className="seal" href="#postcards" aria-label="Leave a postcard"><span aria-hidden="true">✷</span><small>LEAVE A<br />POSTCARD</small></a>
      </div>
  </section>
);

export default HeroSection;
