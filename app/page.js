'use client';

import { Button } from '@/components/ui/button';
import { ChevronDown, Home as HomeIcon, Palette, Shield, Zap, Users, Star, Github } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Dynamic Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-black z-0"></div>
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay z-0"></div>

    {/* Animated Blobs */}
    <motion.div
      animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full blur-[120px] opacity-20 z-0"
    />
    <motion.div
      animate={{ scale: [1, 1.3, 1], rotate: [0, -60, 0] }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600 rounded-full blur-[120px] opacity-20 z-0"
    />

    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto"
    >
      <motion.div variants={fadeIn} className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-purple-200">
        ✨ AI-Powered Interior Design
      </motion.div>
      <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight">
        Redesign Your Room in <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Seconds</span>
      </motion.h1>
      <motion.p variants={fadeIn} className="text-lg md:text-2xl mb-10 text-gray-300 max-w-2xl mx-auto leading-relaxed">
        Upload your room image, choose your style, and let our advanced AI transform your space instantly.
      </motion.p>
      <motion.div variants={fadeIn}>
        <Link href="/dashboard">
          <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 hover:scale-105 transition-all duration-300 px-10 py-7 text-xl rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Try It For Free →
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  </section>
);

const UseCases = () => {
  const cases = [
    { icon: HomeIcon, title: "Homeowners", desc: "Visualize your dream space before making expensive changes. Get instant design inspiration for any room." },
    { icon: Palette, title: "Interior Designers", desc: "Speed up your design process and present multiple concepts to clients in minutes, not hours." },
    { icon: Users, title: "Real Estate Agents", desc: "Help buyers envision the potential of any property with stunning redesign previews." }
  ];

  return (
    <section className="py-24 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Perfect for Everyone</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">Whether you're exploring ideas or working professionally, we have you covered.</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-10"
        >
          {cases.map((item, index) => (
            <motion.div variants={fadeIn} key={index} className="text-center p-8 rounded-2xl bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="w-20 h-20 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                <item.icon className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { icon: Zap, title: "Instant Transformation", desc: "Get redesigned rooms in seconds with our lightning-fast AI engine." },
    { icon: Palette, title: "Multiple Styles", desc: "Choose from Modern, Minimalist, Industrial, Scandinavian, and more." },
    { icon: HomeIcon, title: "Easy Dashboard", desc: "Intuitive interface designed for a seamless and fun user experience." },
    { icon: Shield, title: "Secure & Private", desc: "Your images are processed securely and never shared without permission." }
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          <p className="text-xl text-gray-500">Unlocking the potential of your space has never been easier.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-purple-500 hover:-translate-y-2 transition-transform duration-300"
            >
              <feature.icon className="w-12 h-12 mb-6 text-purple-600" />
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Comparison = () => (
  <section className="py-24 bg-white">
    <div className="max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4">How We Compare</h2>
        <p className="text-lg text-gray-500">See why users choose AI Room Redesign over the competition.</p>
      </motion.div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="overflow-x-auto rounded-xl shadow-2xl border border-gray-200"
      >
        <table className="w-full bg-white">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-6 text-left text-lg">Feature</th>
              <th className="p-6 text-center text-lg bg-purple-600">AI Room Redesign</th>
              <th className="p-6 text-center text-lg opacity-80">Planner 5D</th>
              <th className="p-6 text-center text-lg opacity-80">RoomGPT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="p-5 font-semibold text-gray-700">Processing Speed</td>
              <td className="p-5 text-center text-green-600 font-bold bg-purple-50/50">⚡ Seconds</td>
              <td className="p-5 text-center text-gray-500">⏱️ Minutes</td>
              <td className="p-5 text-center text-gray-500">⏱️ Minutes</td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="p-5 font-semibold text-gray-700">Design Styles</td>
              <td className="p-5 text-center text-green-600 font-bold bg-purple-50/50">✅ 10+</td>
              <td className="p-5 text-center text-gray-500">⚠️ Limited</td>
              <td className="p-5 text-center text-gray-500">✅ 8+</td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="p-5 font-semibold text-gray-700">Accuracy</td>
              <td className="p-5 text-center text-green-600 font-bold bg-purple-50/50">✅ High</td>
              <td className="p-5 text-center text-gray-500">⚠️ Medium</td>
              <td className="p-5 text-center text-gray-500">⚠️ Medium</td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="p-5 font-semibold text-gray-700">Free Trial</td>
              <td className="p-5 text-center text-green-600 font-bold bg-purple-50/50">✅ Yes</td>
              <td className="p-5 text-center text-red-400">❌ No</td>
              <td className="p-5 text-center text-gray-500">⚠️ Limited</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
    {/* Background Blobs */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
      <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-purple-700 rounded-full blur-[100px]"></div>
      <div className="absolute top-[30%] -right-[10%] w-[500px] h-[500px] bg-blue-700 rounded-full blur-[100px]"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Loved by Thousands</h2>
        <p className="text-gray-400 text-lg">Don't just take our word for it.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: "Sarah", role: "Homeowner", text: "This tool completely changed the way I plan my interior redesign. The AI suggestions are spot-on and inspiring!" },
          { name: "Mark", role: "Interior Designer", text: "It saved me hours of design mockups. The dashboard is clean, and the variety of styles allows me to iterate fast." },
          { name: "Lisa", role: "Real Estate Agent", text: "My clients are amazed by the instant visualizations. This has become an essential tool for my property listings." }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-200 mb-6 italic">"{item.text}"</p>
            <div>
              <div className="font-bold text-lg">{item.name}</div>
              <div className="text-sm text-purple-300">{item.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does AI Room Redesign work?",
      answer: "Simply upload a photo of your room, select your preferred design style, and our AI will generate a redesigned version in seconds. Our advanced algorithms analyze your space and apply the chosen aesthetic while maintaining the room's structure."
    },
    {
      question: "Is my image data safe?",
      answer: "Absolutely! We prioritize your privacy and security. All uploaded images are processed securely and are not stored permanently on our servers. Your data is encrypted and handled according to industry best practices."
    },
    {
      question: "Can I customize the design output?",
      answer: "Yes! While our AI provides instant results, you can choose from multiple design styles including Modern, Minimalist, Scandinavian, Industrial, and more. Each style can be applied to create different variations of your space."
    },
    {
      question: "Is it free to use?",
      answer: "We offer a free trial so you can experience the power of AI room redesign. After the trial, we have affordable plans to suit different needs, from individual homeowners to professional designers."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <AnimatePresence>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold text-lg text-gray-800">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                </button>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-gray-50 px-6 pb-6 text-gray-600"
                  >
                    <div className="pt-2">{faq.answer}</div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => (
  <section className="py-32 bg-gradient-to-r from-purple-800 to-indigo-900 text-center relative overflow-hidden">
    {/* Decorative circles */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -ml-32 -mb-32"></div>

    <div className="max-w-4xl mx-auto px-4 relative z-10">
      <motion.h2
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-6xl font-bold text-white mb-8"
      >
        Ready to redesign your space?
      </motion.h2>
      <p className="text-xl text-purple-200 mb-10 max-w-2xl mx-auto">
        Join thousands of happy users and transform your room today. No credit card required to start.
      </p>
      <Link href="/dashboard">
        <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 hover:scale-105 transition-all duration-300 px-12 py-6 text-xl rounded-full font-bold shadow-xl">
          Get Started Now →
        </Button>
      </Link>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-950 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center font-bold text-xl">AI</div>
            <h3 className="text-2xl font-bold">Room Redesign</h3>
          </div>
          <p className="text-gray-400 max-w-sm leading-relaxed">
            The most advanced AI-powered interior design tool. Transform your home, office, or investment property in seconds with photo-realistic renders.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-6 text-purple-400">Platform</h4>
          <ul className="space-y-4">
            <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-6 text-purple-400">Connect</h4>
          <ul className="space-y-4">
            <li><a href="mailto:contact@ai-room-redesign.com" className="text-gray-400 hover:text-white transition-colors">Contact Support</a></li>
            <li>
              <a href="https://github.com/pratama404/ai-room-redesign" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
                <Github className="w-5 h-5" /> GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} AI Room Redesign. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="#" className="hover:text-white">Privacy Policy</Link>
          <Link href="#" className="hover:text-white">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <div className="min-h-screen font-sans selection:bg-purple-200 selection:text-purple-900">
      <Hero />
      <UseCases />
      <Features />
      <Comparison />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
