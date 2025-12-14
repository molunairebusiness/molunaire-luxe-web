import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Smooth parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.7]);

  const scrollToServices = () => {
    const element = document.querySelector("#services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </motion.div>

      {/* Elegant Dark Overlay with parallax */}
      <motion.div
        className="absolute inset-0 z-[1] bg-navy/60"
        style={{ opacity: overlayOpacity }}
      />

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-navy/30 via-transparent to-navy/50" />

      {/* Elegant accent glow */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, hsl(var(--champagne) / 0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Content with parallax */}
      <motion.div
        className="relative z-10 container mx-auto px-6 lg:px-12 text-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="mb-8"
        >
          <motion.div
            className="w-32 h-[1px] bg-gradient-to-r from-transparent via-champagne/60 to-transparent mx-auto mb-12"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-wide mb-8 leading-tight"
        >
          <span className="block text-foreground">Molunaire</span>
          <motion.span
            className="block text-gradient mt-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Where Luxury Meets Web Design
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="font-body text-lg md:text-xl font-light text-muted-foreground max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          We create modern, fast, and visually striking websites that elevate brands to the next level.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="relative overflow-hidden px-10 py-5 bg-gradient-to-r from-champagne to-champagne-light text-navy font-body text-sm font-medium tracking-widest uppercase group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Get Started</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-silver to-champagne"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
          <motion.a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="relative px-10 py-5 border border-champagne/40 text-foreground font-body text-sm font-medium tracking-widest uppercase overflow-hidden group hover:border-champagne/70 transition-colors duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 group-hover:text-champagne transition-colors duration-300">View Our Work</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToServices}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3 text-champagne/60 hover:text-champagne transition-colors duration-500"
        >
          <span className="text-xs font-body tracking-[0.3em] uppercase">Discover</span>
          <ArrowDown size={18} strokeWidth={1} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;