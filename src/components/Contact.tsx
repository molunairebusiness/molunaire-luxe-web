import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, CheckCircle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. We'll be in touch soon.",
      });

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", company: "", message: "" });
      }, 3000);
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Elegant Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-navy/30 to-navy/50" />
        
        {/* Decorative light beams */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1/2 bg-gradient-to-b from-champagne/30 via-champagne/10 to-transparent" />
      </div>
      
      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--champagne) / 0.08) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--silver) / 0.06) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10" ref={ref}>
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-champagne" />
              <span className="font-body text-xs tracking-[0.3em] uppercase text-champagne">
                Get In Touch
              </span>
              <Sparkles className="w-4 h-4 text-champagne" />
            </motion.div>
            
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-6">
              Let's Build Something
              <span className="block text-gradient mt-2">Exceptional</span>
            </h2>
            
            <motion.div
              className="w-24 h-[1px] bg-gradient-to-r from-transparent via-champagne/60 to-transparent mx-auto mb-8"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            
            <p className="font-body text-muted-foreground max-w-xl mx-auto text-lg">
              Ready to elevate your digital presence? We'd love to hear from you.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Glow effect behind card */}
              <div className="absolute inset-0 bg-gradient-to-b from-champagne/10 via-transparent to-silver/10 blur-3xl -z-10" />
              
              <div className="backdrop-blur-xl bg-background/40 border border-champagne/10 rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
                {/* Subtle corner accents */}
                <div className="absolute top-0 left-0 w-24 h-24">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-champagne/40 to-transparent" />
                  <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-champagne/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 right-0 w-24 h-24">
                  <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-champagne/40 to-transparent" />
                  <div className="absolute bottom-0 right-0 w-[1px] h-full bg-gradient-to-t from-champagne/40 to-transparent" />
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <CheckCircle className="w-20 h-20 text-champagne mx-auto mb-6" />
                    </motion.div>
                    <h3 className="font-display text-3xl font-light mb-4">Message Sent</h3>
                    <p className="text-muted-foreground text-lg">We'll be in touch shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid md:grid-cols-2 gap-10">
                      {/* Name Field */}
                      <div className="relative group">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder=" "
                          className="peer w-full bg-transparent border-b border-border/50 py-4 font-body text-foreground placeholder-transparent focus:outline-none focus:border-champagne transition-colors duration-300"
                        />
                        <label className="absolute left-0 top-4 font-body text-sm text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-champagne peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                          Name
                        </label>
                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-champagne transition-all duration-300 group-focus-within:w-full" />
                      </div>

                      {/* Email Field */}
                      <div className="relative group">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder=" "
                          className="peer w-full bg-transparent border-b border-border/50 py-4 font-body text-foreground placeholder-transparent focus:outline-none focus:border-champagne transition-colors duration-300"
                        />
                        <label className="absolute left-0 top-4 font-body text-sm text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-champagne peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                          Email
                        </label>
                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-champagne transition-all duration-300 group-focus-within:w-full" />
                      </div>
                    </div>

                    {/* Company Field */}
                    <div className="relative group">
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full bg-transparent border-b border-border/50 py-4 font-body text-foreground placeholder-transparent focus:outline-none focus:border-champagne transition-colors duration-300"
                      />
                      <label className="absolute left-0 top-4 font-body text-sm text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-champagne peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                        Company (Optional)
                      </label>
                      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-champagne transition-all duration-300 group-focus-within:w-full" />
                    </div>

                    {/* Message Field */}
                    <div className="relative group">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder=" "
                        className="peer w-full bg-transparent border-b border-border/50 py-4 font-body text-foreground placeholder-transparent focus:outline-none focus:border-champagne transition-colors duration-300 resize-none"
                      />
                      <label className="absolute left-0 top-4 font-body text-sm text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-champagne peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                        Your Message
                      </label>
                      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-champagne transition-all duration-300 group-focus-within:w-full" />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-6">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative group px-12 py-4 bg-gradient-to-r from-champagne/90 to-champagne text-navy font-body text-sm tracking-[0.2em] uppercase overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send size={16} />
                            </>
                          )}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-champagne to-silver opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
