import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, CheckCircle } from "lucide-react";
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
    <section id="contact" className="section-padding bg-secondary">
      <div className="container mx-auto px-6 lg:px-12" ref={ref}>
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="font-body text-xs tracking-[0.3em] uppercase text-champagne mb-4 block">
              Get In Touch
            </span>
            
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-6">
              Let's Build Something
              <span className="block text-gradient mt-2">Exceptional</span>
            </h2>
            
            <motion.div
              className="w-16 h-[1px] bg-champagne/40 mx-auto mb-8"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            
            <p className="font-body text-muted-foreground max-w-md mx-auto">
              Ready to elevate your digital presence? We'd love to hear from you.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-background/50 backdrop-blur-sm border border-border/30 rounded-lg p-8 md:p-12">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-champagne mx-auto mb-6" />
                  <h3 className="font-display text-2xl font-light mb-3">Message Sent</h3>
                  <p className="text-muted-foreground">We'll be in touch shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Name Field */}
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder=" "
                        className="peer w-full bg-transparent border-b border-border/50 py-4 font-body text-foreground placeholder-transparent focus:outline-none focus:border-champagne/60 transition-colors duration-300"
                      />
                      <label className="absolute left-0 top-4 font-body text-sm text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-champagne peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                        Name
                      </label>
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder=" "
                        className="peer w-full bg-transparent border-b border-border/50 py-4 font-body text-foreground placeholder-transparent focus:outline-none focus:border-champagne/60 transition-colors duration-300"
                      />
                      <label className="absolute left-0 top-4 font-body text-sm text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-champagne peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                        Email
                      </label>
                    </div>
                  </div>

                  {/* Company Field */}
                  <div className="relative">
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder=" "
                      className="peer w-full bg-transparent border-b border-border/50 py-4 font-body text-foreground placeholder-transparent focus:outline-none focus:border-champagne/60 transition-colors duration-300"
                    />
                    <label className="absolute left-0 top-4 font-body text-sm text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-champagne peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                      Company (Optional)
                    </label>
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder=" "
                      className="peer w-full bg-transparent border-b border-border/50 py-4 font-body text-foreground placeholder-transparent focus:outline-none focus:border-champagne/60 transition-colors duration-300 resize-none"
                    />
                    <label className="absolute left-0 top-4 font-body text-sm text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-champagne peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                      Your Message
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-4">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-10 py-4 bg-champagne text-navy font-body text-sm tracking-[0.15em] uppercase hover:bg-champagne-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      <span className="flex items-center gap-3">
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={14} />
                          </>
                        )}
                      </span>
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;