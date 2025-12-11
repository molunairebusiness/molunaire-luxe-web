import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

// Floating particle component
const Particle = ({ delay, duration, x, y, size }: { delay: number; duration: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-champagne/40"
    style={{ width: size, height: size, left: x, top: y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0],
      y: [0, -100, -200, -300],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

// Animated ring component
const AnimatedRing = ({ size, delay, duration }: { size: number; delay: number; duration: number }) => (
  <motion.div
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-champagne/20"
    style={{ width: size, height: size }}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{
      opacity: [0, 0.5, 0],
      scale: [0.5, 1.5, 2],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

const Hero = () => {
  const scrollToServices = () => {
    const element = document.querySelector("#services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Generate particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 3,
    x: `${Math.random() * 100}%`,
    y: `${70 + Math.random() * 30}%`,
    size: 2 + Math.random() * 4,
  }));

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Bright gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-secondary" />
        
        {/* Large animated gradient orbs */}
        <motion.div
          className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--champagne) / 0.25) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--silver) / 0.2) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--champagne) / 0.15) 0%, transparent 50%)",
            filter: "blur(40px)",
          }}
          animate={{
            x: [0, -50, 50, 0],
            y: [0, 80, -40, 0],
            scale: [1, 1.3, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Animated rings expanding from center */}
        <div className="absolute inset-0">
          <AnimatedRing size={200} delay={0} duration={4} />
          <AnimatedRing size={300} delay={1} duration={4} />
          <AnimatedRing size={400} delay={2} duration={4} />
          <AnimatedRing size={500} delay={3} duration={4} />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <Particle key={particle.id} {...particle} />
          ))}
        </div>

        {/* Animated diagonal lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <motion.line
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
            stroke="hsl(var(--champagne))"
            strokeWidth="0.5"
            strokeOpacity="0.1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.5 }}
          />
          <motion.line
            x1="20%"
            y1="100%"
            x2="100%"
            y2="20%"
            stroke="hsl(var(--silver))"
            strokeWidth="0.5"
            strokeOpacity="0.08"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.8 }}
          />
        </svg>

        {/* Animated geometric shapes */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 border border-champagne/20 rotate-45"
          animate={{
            rotate: [45, 90, 45],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-32 left-20 w-24 h-24 border border-silver/15 rotate-12"
          animate={{
            rotate: [12, -12, 12],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Shimmer overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(105deg, transparent 40%, hsl(var(--champagne) / 0.03) 45%, hsl(var(--champagne) / 0.05) 50%, hsl(var(--champagne) / 0.03) 55%, transparent 60%)",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["200% 0%", "-200% 0%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="mb-8"
        >
          <motion.div
            className="w-32 h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent mx-auto mb-12"
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
          <motion.span 
            className="block text-foreground"
            animate={{
              textShadow: [
                "0 0 20px hsl(var(--champagne) / 0)",
                "0 0 40px hsl(var(--champagne) / 0.3)",
                "0 0 20px hsl(var(--champagne) / 0)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Molunaire
          </motion.span>
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
            whileHover={{ scale: 1.05 }}
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
            className="relative px-10 py-5 border-2 border-champagne/50 text-foreground font-body text-sm font-medium tracking-widest uppercase overflow-hidden group"
            whileHover={{ scale: 1.05, borderColor: "hsl(var(--champagne))" }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 group-hover:text-champagne transition-colors duration-300">View Our Work</span>
            <motion.div
              className="absolute inset-0 bg-champagne/10"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToServices}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3 text-champagne/70 hover:text-champagne transition-colors duration-500"
        >
          <span className="text-xs font-body tracking-[0.3em] uppercase">Discover</span>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown size={20} strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
