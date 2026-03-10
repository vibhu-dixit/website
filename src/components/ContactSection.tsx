import { Mail, Github, Linkedin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="relative z-10 py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <span className="font-mono text-xs tracking-[0.4em] text-muted-foreground">// 06</span>
          <h2 className="font-display text-2xl sm:text-3xl tracking-wider text-primary text-glow-sm mt-2">CONTACT</h2>
          <div className="hud-line w-24 mt-4 mx-auto" />
        </div>

        <p className="font-body text-lg font-medium text-muted-foreground leading-relaxed max-w-md mx-auto mb-10">
          Available for software engineering opportunities. Let's build something remarkable.
        </p>

        <div className="flex items-center justify-center gap-8">
          <a
            href="mailto:vibhu.dixit02@gmail.com"
            className="flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Mail className="w-4 h-4" />
            EMAIL
          </a>
          <a
            href="https://github.com/vibhu-dixit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Github className="w-4 h-4" />
            GITHUB
          </a>
          <a
            href="https://linkedin.com/in/vibhu-dixit-swe"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Linkedin className="w-4 h-4" />
            LINKEDIN
          </a>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-border">
          <p className="font-mono text-[10px] tracking-widest text-muted-foreground">
            DESIGNED & BUILT BY VIBHU DIXIT · © 2026
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
