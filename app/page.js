"use client";
import { Button } from "@/components/ui/button";
import { ChevronDown, Home as HomeIcon, Palette, Shield, Zap, Users, Star, Github } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
    <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
        Redesign Your Room in <span className="text-purple-400">Seconds</span> with AI
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-gray-300">
        Upload your room image, choose your style, and let our AI do the magic.
      </p>
      <Link href="/dashboard">
        <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-full">
          Try It Now →
        </Button>
      </Link>
    </div>
  </section>
);

const UseCases = () => (
  <section className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Perfect for Everyone</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center p-6">
          <HomeIcon className="w-16 h-16 mx-auto mb-4 text-purple-600" />
          <h3 className="text-2xl font-semibold mb-4">Homeowners</h3>
          <p className="text-gray-600">Visualize your dream space before making expensive changes. Get instant design inspiration for any room.</p>
        </div>
        <div className="text-center p-6">
          <Palette className="w-16 h-16 mx-auto mb-4 text-purple-600" />
          <h3 className="text-2xl font-semibold mb-4">Interior Designers</h3>
          <p className="text-gray-600">Speed up your design process and present multiple concepts to clients in minutes, not hours.</p>
        </div>
        <div className="text-center p-6">
          <Users className="w-16 h-16 mx-auto mb-4 text-purple-600" />
          <h3 className="text-2xl font-semibold mb-4">Real Estate Agents</h3>
          <p className="text-gray-600">Help buyers envision the potential of any property with stunning redesign previews.</p>
        </div>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Key Features</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Zap className="w-12 h-12 mb-4 text-purple-600" />
          <h3 className="text-xl font-semibold mb-2">Instant AI Transformation</h3>
          <p className="text-gray-600">Get redesigned rooms in seconds, not days.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Palette className="w-12 h-12 mb-4 text-purple-600" />
          <h3 className="text-xl font-semibold mb-2">Multiple Design Styles</h3>
          <p className="text-gray-600">Modern, Minimalist, Scandinavian, and more.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <HomeIcon className="w-12 h-12 mb-4 text-purple-600" />
          <h3 className="text-xl font-semibold mb-2">Easy-to-use Dashboard</h3>
          <p className="text-gray-600">Intuitive interface for seamless experience.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Shield className="w-12 h-12 mb-4 text-purple-600" />
          <h3 className="text-xl font-semibold mb-2">Secure Processing</h3>
          <p className="text-gray-600">Your images are safe and private.</p>
        </div>
      </div>
    </div>
  </section>
);

const Comparison = () => (
  <section className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Why Choose AI Room Redesign?</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="p-4 text-left">Feature</th>
              <th className="p-4 text-center">AI Room Redesign</th>
              <th className="p-4 text-center">Planner 5D</th>
              <th className="p-4 text-center">RoomGPT</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-4 font-semibold">Processing Speed</td>
              <td className="p-4 text-center text-green-600">⚡ Seconds</td>
              <td className="p-4 text-center text-yellow-600">⏱️ Minutes</td>
              <td className="p-4 text-center text-yellow-600">⏱️ Minutes</td>
            </tr>
            <tr className="border-b bg-gray-50">
              <td className="p-4 font-semibold">Design Styles</td>
              <td className="p-4 text-center text-green-600">✅ 10+</td>
              <td className="p-4 text-center text-yellow-600">⚠️ Limited</td>
              <td className="p-4 text-center text-green-600">✅ 8+</td>
            </tr>
            <tr className="border-b">
              <td className="p-4 font-semibold">Accuracy</td>
              <td className="p-4 text-center text-green-600">✅ High</td>
              <td className="p-4 text-center text-yellow-600">⚠️ Medium</td>
              <td className="p-4 text-center text-yellow-600">⚠️ Medium</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-4 font-semibold">Free Trial</td>
              <td className="p-4 text-center text-green-600">✅ Yes</td>
              <td className="p-4 text-center text-red-600">❌ No</td>
              <td className="p-4 text-center text-yellow-600">⚠️ Limited</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">What Our Users Say</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-gray-600 mb-4">"This tool completely changed the way I plan my interior redesign. The AI suggestions are spot-on!"</p>
          <div className="font-semibold">Sarah, Homeowner</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-gray-600 mb-4">"It saved me hours of design mockups. Love the dashboard and the variety of styles available!"</p>
          <div className="font-semibold">Mark, Designer</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-gray-600 mb-4">"My clients are amazed by the instant visualizations. This has become an essential tool for my business."</p>
          <div className="font-semibold">Lisa, Real Estate Agent</div>
        </div>
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
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => (
  <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
    <div className="max-w-4xl mx-auto text-center px-4">
      <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to redesign your space?</h2>
      <p className="text-xl mb-8">Let AI guide your vision and transform your room in seconds.</p>
      <Link href="/dashboard">
        <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full">
          Start Now →
        </Button>
      </Link>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">AI Room Redesign</h3>
          <p className="text-gray-400">Transform your space with the power of artificial intelligence.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-wrap gap-6">
            <Link href="/" className="text-gray-400 hover:text-white">Home</Link>
            <Link href="/dashboard" className="text-gray-400 hover:text-white">Dashboard</Link>
            <a href="mailto:contact@ai-room-redesign.com" className="text-gray-400 hover:text-white">Contact</a>
            <a href="https://github.com/pratama404/ai-room-redesign" className="text-gray-400 hover:text-white flex items-center gap-1">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2024 AI Room Redesign. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <div className="min-h-screen">
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
