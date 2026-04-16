import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-[url('/assets/images/Origin_BI_Background.webp')] bg-cover bg-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-5/12"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] text-gray-900 mb-6">
                Transform How You Work <span className="text-primary">and How You Feel</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-lg">
                Bringing together Agile practices and mind wellness to build high-performing, emotionally resilient teams.
              </p>
              <a
                href="https://calendly.com/originbi-mindworks/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-black-rounded"
              >
                Explore Our Approach
              </a>
            </motion.div>

            <motion.div 
              className="lg:w-7/12 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative z-10 p-4 lg:p-8 bg-[url('/assets/images/background-round.webp')] bg-contain bg-no-repeat bg-center">
                <img
                  src="/assets/images/banner1.webp"
                  alt="Healthcare Professionals"
                  className="rounded-[50px] w-full lg:w-[46%] mx-auto shadow-2xl"
                />
                <img
                  src="/assets/images/banner2.webp"
                  alt="Meeting"
                  className="hidden lg:block absolute top-[10%] right-0 w-[240px] rounded-[30px] shadow-xl"
                />
                <img
                  src="/assets/images/banner3.webp"
                  alt="Happy Family"
                  className="hidden lg:block absolute bottom-[10%] right-0 w-[240px] rounded-[30px] shadow-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-8">About OriginBI</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              At OriginBI MindWorks, we help you build a more accountable, agile, and mentally fit workplace using frameworks designed for Indian teams.
              We combine Agile in India, frugal lifestyle thinking, and deep self-awareness to help people truly know their strength.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section id="core" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-16"
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">Our Core Pillars</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our solutions are designed to meet the unique needs of diverse individuals and organizations.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { title: "Mind Wellness", desc: "Mental clarity and emotional strength in daily workflows.", icon: "/assets/images/core1.svg" },
              { title: "Agile Practices", desc: "Fast, focused, and flexible work systems tailored for Indian teams.", icon: "/assets/images/core2.webp" },
              { title: "Accountability", desc: "Role-based ownership and transparent execution.", icon: "/assets/images/core3.webp" }
            ].map((pillar, idx) => (
              <motion.div key={idx} variants={fadeIn} className="feature-card group hover:shadow-xl">
                <img src={pillar.icon} alt={pillar.title} className="w-20 h-20 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">{pillar.title}</h3>
                <p className="text-gray-600 mb-8">{pillar.desc}</p>
                <div className="flex justify-center">
                  <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { title: "Frugal Lifestyle", desc: "Simplify work. Reduce waste. Focus on what truly matters.", icon: "/assets/images/core4.svg" },
              { title: "Know Your Strength", desc: "Discover personal power and build a culture of trust and energy.", icon: "/assets/images/core5.webp" }
            ].map((pillar, idx) => (
              <motion.div key={idx} variants={fadeIn} className="feature-card group hover:shadow-xl">
                <img src={pillar.icon} alt={pillar.title} className="w-20 h-20 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">{pillar.title}</h3>
                <p className="text-gray-600 mb-8">{pillar.desc}</p>
                <div className="flex justify-center">
                  <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solution" className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-16"
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">Our Solutions</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              We offer transformative solutions blending Agile practices and mental wellness to enhance accountability, clarity, and workplace culture empowering organizations to grow purposefully, adapt quickly, and thrive sustainably.
            </p>
          </motion.div>

          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { title: "Agile for Indian Teams", desc: "Scrum, sprints, stand-ups, and task flows customized to Indian team dynamics.", icon: "/assets/images/solution1.webp", bg: "bg-[#faf7ed]", border: "hover:border-[#ffcd4d]" },
              { title: "Workplace Wellness", desc: "Mindful productivity, stress reduction, and psychological safety workshops.", icon: "/assets/images/solution2.webp", bg: "bg-[#edf4fb]", border: "hover:border-[#007aff]" },
              { title: "Frugal Work Strategy", desc: "Do more with less task design, energy management, minimalist execution.", icon: "/assets/images/solution3.webp", bg: "bg-[#dbe4d1]", border: "hover:border-[#198754]" },
              { title: "Personal Agility Coaching", desc: "Live the Agile lifestyle: balance goals, improve habits, track personal sprints.", icon: "/assets/images/solution4.webp", bg: "bg-[#faf7ed]", border: "hover:border-[#ffcd4d]" }
            ].map((sol, idx) => (
              <motion.div key={idx} variants={fadeIn} className={`zauto-feature-card ${sol.bg} border-transparent ${sol.border} hover:bg-[#F6F4FF] p-10`}>
                <div className="mb-8">
                  <h4 className="text-xl font-bold mb-3">{sol.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{sol.desc}</p>
                </div>
                <img src={sol.icon} alt={sol.title} className="h-32 object-contain self-center" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              className="lg:w-1/2 order-2 lg:order-1"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-5xl lg:text-6xl font-bold mb-8 leading-[1.1]">Why Choose OriginBI?</h2>
              <p className="text-xl text-gray-600 mb-10">
                Traditional systems are outdated. We build human-first workplaces.
              </p>
              <div className="space-y-6">
                {[
                  "Agile designed for Indian organizations",
                  "Mental wellness integrated into work",
                  "Frugal, efficient execution style",
                  "Sustainable performance not just speed"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <img
                      src="/assets/images/check-icon.webp"
                      alt="Check"
                      className="w-6 h-6 flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-lg font-semibold text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="lg:w-1/2 order-1 lg:order-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/assets/images/why-origin.webp"
                alt="Team Discussion"
                className="rounded-[2rem] shadow-2xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">Contact Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div 
              className="lg:w-7/12 bg-gray-50 p-8 lg:p-12 rounded-3xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                    By clicking submit, you agree to our{' '}
                    <a href="/terms-and-conditions" className="text-primary hover:underline font-semibold">Terms and Conditions</a>{' '}
                    and{' '}
                    <a href="/privacy-policy" className="text-primary hover:underline font-semibold">Privacy Policy</a>.
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-accent transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <p className="text-green-600 font-semibold text-center">Thank you! Your message has been sent.</p>
                )}
                {status === 'error' && (
                  <p className="text-red-600 font-semibold text-center">Oops! Something went wrong. Please try again.</p>
                )}
              </form>
            </motion.div>

            {/* Contact Details */}
            <motion.div 
              className="lg:w-5/12 flex flex-col justify-center space-y-10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Email</h4>
                  <a href="mailto:info@originbi.com" className="text-lg text-gray-600 hover:text-primary transition-colors">info@originbi.com</a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Mobile</h4>
                  <a href="tel:+919445997283" className="text-lg text-gray-600 hover:text-primary transition-colors">+91-9445997283</a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Address</h4>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Origin BI MindWorks Pvt Ltd,<br />
                    Guindy, Chennai,<br />
                    Tamil Nadu, India
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-primary rounded-[2rem] py-20 px-8 text-center text-white"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Work Better. Feel Better. Think Better.</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed">
              OriginBI MindWorks empowers organizations with a unique blend of Agile practices and mental wellness, driving clarity, accountability, and a purpose-led culture that fuels growth, resilience, and meaningful transformation.
            </p>
            <a
              href="https://calendly.com/originbi-mindworks/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-accent hover:text-white transition-all duration-300 inline-block shadow-lg"
            >
              Book a Demo
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

