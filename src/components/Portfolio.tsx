import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, X } from "lucide-react";
import portfolioFitness from "@/assets/portfolio-fitness.jpg";
import portfolioCafe from "@/assets/portfolio-cafe.jpg";
import portfolioCorporate from "@/assets/portfolio-corporate.jpg";
import portfolioFashion from "@/assets/portfolio-fashion.jpg";
import portfolioCreative from "@/assets/portfolio-creative.jpg";

const projects = [
  {
    title: "Elite Fitness",
    category: "Fitness & Gym",
    description: "A premium fitness platform with dark luxury aesthetics and gold accents.",
    image: portfolioFitness,
  },
  {
    title: "Artisan Bistro",
    category: "Café & Restaurant",
    description: "An elegant dining experience website with warm, inviting visuals.",
    image: portfolioCafe,
  },
  {
    title: "Nexus Corp",
    category: "Corporate Business",
    description: "A clean, professional corporate site with modern simplicity.",
    image: portfolioCorporate,
  },
  {
    title: "Maison Noir",
    category: "Fashion E-commerce",
    description: "A high-end fashion boutique with sophisticated product displays.",
    image: portfolioFashion,
  },
  {
    title: "Studio Flux",
    category: "Creative Portfolio",
    description: "A bold creative portfolio showcasing dramatic visuals and artistry.",
    image: portfolioCreative,
  },
];

const Portfolio = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-silver/5 blur-3xl" />
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
            Our Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-6">
            Portfolio
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Explore our collection of premium websites crafted for exceptional brands.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`${index === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}
            >
              <div
                onClick={() => setSelectedProject(project)}
                className="portfolio-card group aspect-[4/3] cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 lg:p-8">
                  <span className="font-body text-xs tracking-widest uppercase text-primary mb-2">
                    {project.category}
                  </span>
                  <h3 className="font-display text-2xl lg:text-3xl font-light mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ExternalLink size={16} />
                    <span className="font-body text-sm">View Project</span>
                  </div>
                </div>
                {/* Always visible overlay on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-background via-background/60 to-transparent">
                  <span className="font-body text-xs tracking-widest uppercase text-primary mb-2">
                    {project.category}
                  </span>
                  <h3 className="font-display text-2xl lg:text-3xl font-light mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ExternalLink size={16} />
                    <span className="font-body text-sm">View Project</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/95 backdrop-blur-xl"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-5xl w-full glass-card overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-primary transition-colors"
            >
              <X size={20} />
            </button>
            <div className="grid md:grid-cols-2">
              <div className="aspect-[4/3] md:aspect-auto">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="font-body text-xs tracking-widest uppercase text-primary mb-4">
                  {selectedProject.category}
                </span>
                <h3 className="font-display text-3xl lg:text-4xl font-light mb-4">
                  {selectedProject.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed mb-8">
                  {selectedProject.description}
                </p>
                <div className="flex gap-4">
                  <button className="btn-luxury">
                    Visit Site
                  </button>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="btn-outline-luxury"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Portfolio;
