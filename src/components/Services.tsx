import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Settings, RefreshCw } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Website Design",
    description: "High-end, modern website designs tailored to your brand. We craft pixel-perfect experiences that captivate and convert.",
  },
  {
    icon: Settings,
    title: "Website Maintenance",
    description: "Ongoing updates, optimization, and monitoring to keep your site running flawlessly. Peace of mind, guaranteed.",
  },
  {
    icon: RefreshCw,
    title: "Website Updates",
    description: "Flexible updates and content refreshes whenever you need them. Your site stays fresh and relevant.",
  },
];

const Services = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-12" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block font-body text-xs tracking-[0.3em] uppercase text-primary/80 mb-4">
            Our Expertise
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-6">
            Services
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            We offer a complete suite of services to bring your digital vision to life and keep it thriving.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <div className="glass-card p-8 lg:p-12 h-full transition-all duration-500 hover:border-primary/50 hover:shadow-glow">
                {/* Icon */}
                <div className="mb-8 relative">
                  <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center group-hover:border-primary/60 transition-colors duration-500">
                    <service.icon
                      className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-500"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="absolute -inset-4 rounded-full bg-primary/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <h3 className="font-display text-2xl font-light mb-4 group-hover:text-primary transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Decorative Line */}
                <div className="mt-8 w-12 h-px bg-primary/30 group-hover:w-full group-hover:bg-primary/60 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
