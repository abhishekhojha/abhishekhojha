import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";
import Footer from "../component/Footer";
import LayoutTop from "../component/LayoutTop";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <>
      <LayoutTop />
      <div className="layout-container">
        <section className="min-h-screen py-20">
          <div className="">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Let's Connect
              </h2>
              <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed text-center">
                Ready to bring your vision to life? Let's discuss your next
                project and create something extraordinary together.
              </p>
            </div>

            <div className="grid gap-8 items-start">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="bg-black rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300">
                  <h3 className="text-2xl font-bold text-white mb-8">
                    Get In Touch
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-center group">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Mail className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <p className="text-white font-medium">
                          <a href="mailto:abhishekhojha45@gmail.com">
                            abhishekhojha45@gmail.com
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center group">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Phone className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Phone</p>
                        <p className="text-white font-medium">+91 8719830141</p>
                      </div>
                    </div>

                    <div className="flex items-center group">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Location</p>
                        <p className="text-white font-medium">Indore, MP</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="mt-8 pt-8 border-t border-gray-700">
                    <p className="text-gray-400 text-sm mb-4">Follow me on</p>
                    <div className="flex space-x-4">
                      {[
                        {
                          Icon: Github,
                          href: "https://github.com/abhishekhojha/",
                        },
                        {
                          Icon: Linkedin,
                          href: "https://www.linkedin.com/in/abhishekh-ojha-10802b215/",
                        },
                        {
                          Icon: Instagram,
                          href: "https://www.instagram.com/q_abhishekh?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
                        },
                      ].map(({ Icon, href }, index) => (
                        <a
                          key={index}
                          href={href}
                          target="_blank"
                          className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:text-black transition-all duration-300 hover:scale-110"
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quote Section */}
                <div className="border-l-4 border-black pl-6">
                  <blockquote className="text-xl text-black font-medium italic">
                    "Design is not just what it looks like and feels like.
                    Design is how it works."
                  </blockquote>
                  <cite className="text-gray-600 text-sm mt-2 block">
                    — Steve Jobs
                  </cite>
                </div>
              </div>

              {/* Contact Form */}
              {/* <div className="bg-gray-50 rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500">
                <h3 className="text-2xl font-bold text-black mb-8">
                  Send Message
                </h3>

                {showSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-green-800 text-center font-medium">
                      Message sent successfully! I'll get back to you soon.
                    </p>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-black text-sm font-semibold mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-black transition-all duration-300 group-hover:border-gray-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-black text-sm font-semibold mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-black transition-all duration-300 group-hover:border-gray-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-black text-sm font-semibold mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-black transition-all duration-300 group-hover:border-gray-300"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-black text-sm font-semibold mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-black transition-all duration-300 group-hover:border-gray-300 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-black text-white font-semibold py-4 px-8 rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group hover:scale-105 hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </div> */}
            </div>

            {/* Stats Section */}
            {/* <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "10+", label: "Projects Completed" },
                // { number: "25+", label: "Happy Clients" },
                { number: "3+", label: "Years Experience" },
                { number: "24/7", label: "Support Available" },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold text-black group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div> */}

            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-black rounded-full opacity-20" />
              <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-black rounded-full opacity-10" />
              <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-black rounded-full opacity-30" />
              <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-black rounded-full opacity-15" />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
