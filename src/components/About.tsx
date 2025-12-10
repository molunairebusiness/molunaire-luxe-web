import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12" ref={ref}>
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block font-body text-xs tracking-[0.3em] uppercase text-primary/80 mb-4">
              Who We Are
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-wide">
              About Us
            </h2>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative Quote Mark */}
            <div className="absolute -top-8 -left-4 md:-left-12 text-primary/10 font-display text-[120px] md:text-[200px] leading-none pointer-events-none select-none">
              "
            </div>

            <div className="glass-card p-8 md:p-12 lg:p-16 relative">
              <p className="font-display text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-foreground/90 mb-8">
                Molunaire is a dedicated team of professional designers and developers committed to building and maintaining exceptional websites.
              </p>
              <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8">
                We combine creativity, technical expertise, and a high-end design approach to deliver digital experiences that make brands stand out. Our philosophy is simple: every pixel matters, every interaction counts, and every website should be a masterpiece.
              </p>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                From concept to launch and beyond, we partner with ambitious brands who refuse to settle for ordinary. Together, we create digital destinations that inspire, engage, and convert.
              </p>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-primary/20 -translate-y-4 translate-x-4" />
              <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-primary/20 translate-y-4 -translate-x-4" />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-8 mt-16"
          >
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "100%", label: "Client Satisfaction" },
              { value: "5★", label: "Average Rating" },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="font-body text-xs md:text-sm tracking-widest uppercase text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
