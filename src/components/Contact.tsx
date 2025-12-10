import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out. We'll be in touch soon.",
    });

    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", company: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-transparent to-transparent pointer-events-none" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-silver/5 blur-3xl" />
      </div>

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
              Get In Touch
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-6">
              Let's Build Something Exceptional
            </h2>
            <p className="font-body text-muted-foreground max-w-xl mx-auto">
              Ready to elevate your digital presence? We'd love to hear from you.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-card p-8 md:p-12 lg:p-16 relative">
              {/* Decorative Corner Elements */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-primary/30" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-primary/30" />

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
                  <h3 className="font-display text-2xl font-light mb-4">Message Sent Successfully</h3>
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
                        className="peer w-full bg-transparent border-b border-border py-4 font-body text-foreground placeholder-transparent focus:outline-none focus:border-primary transition-colors"
                      />
                      <label className="absolute left-0 top-4 font-body text-sm text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
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
                        className="peer w-full bg-transparent border-b border-border py-4 font-body text-foreground placeholder-transparent focus:outline-none focus:border-primary transition-colors"
                      />
                      <label className="absolute left-0 top-4 font-body text-sm text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
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
                      className="peer w-full bg-transparent border-b border-border py-4 font-body text-foreground placeholder-transparent focus:outline-none focus:border-primary transition-colors"
                    />
                    <label className="absolute left-0 top-4 font-body text-sm text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
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
                      className="peer w-full bg-transparent border-b border-border py-4 font-body text-foreground placeholder-transparent focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                    <label className="absolute left-0 top-4 font-body text-sm text-muted-foreground transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                      Message
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-4">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-luxury flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={18} />
                        </>
                      )}
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
