'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Code, Users, Zap, Globe, ArrowRight, Github, Linkedin, MessageCircle } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-white to-brand-yellow/10">
      {/* Navigation */}
      <motion.nav 
        className="bg-brand-white/90 backdrop-blur-sm border-b-2 border-brand-yellow sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <Code className="h-8 w-8 text-brand-yellow" />
              <span className="ml-2 text-xl font-display font-bold text-brand-black">Tanish-Bilish</span>
            </motion.div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-brand-black hover:bg-brand-yellow/20 font-medium">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-brand-yellow text-brand-black hover:bg-brand-yellow-dark font-semibold">
                    Get Started
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-brand-black mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Connect with
            <span className="text-brand-yellow"> Software Engineers</span>
            <br />in Uzbekistan
          </motion.h1>
          <motion.p 
            className="text-xl text-brand-black/70 mb-8 max-w-3xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Build your professional network, discover local talent, and grow your career in Uzbekistan's thriving tech ecosystem.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/register">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-brand-yellow text-brand-black hover:bg-brand-yellow-dark px-8 py-3 text-lg font-semibold">
                  Join the Network
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/login">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white px-8 py-3 text-lg font-medium">
                  Sign In
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-yellow/5">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold text-brand-black mb-4">
              Why Choose Tanish-Bilish?
            </h2>
            <p className="text-lg text-brand-black/70 font-medium">
              The premier platform for software engineers in Uzbekistan
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 border-2 border-brand-yellow/20 hover:border-brand-yellow bg-brand-white">
                <CardHeader>
                  <div className="w-12 h-12 bg-brand-yellow rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-brand-black" />
                  </div>
                  <CardTitle className="text-xl font-display font-semibold text-brand-black">Local Network</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-brand-black/70 font-medium">
                    Connect with software engineers in your city and region. Build meaningful professional relationships locally.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 border-2 border-brand-yellow/20 hover:border-brand-yellow bg-brand-white">
                <CardHeader>
                  <div className="w-12 h-12 bg-brand-yellow rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-brand-black" />
                  </div>
                  <CardTitle className="text-xl font-display font-semibold text-brand-black">Tech Stack Matching</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-brand-black/70 font-medium">
                    Find engineers with complementary skills. Whether you're looking for React, Python, or DevOps expertise.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 border-2 border-brand-yellow/20 hover:border-brand-yellow bg-brand-white">
                <CardHeader>
                  <div className="w-12 h-12 bg-brand-yellow rounded-lg flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-brand-black" />
                  </div>
                  <CardTitle className="text-xl font-display font-semibold text-brand-black">Regional Focus</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-brand-black/70 font-medium">
                    Specifically designed for Uzbekistan's tech community. Understand local market dynamics and opportunities.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-brand-yellow to-brand-yellow-light">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl font-display font-bold text-brand-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Build Your Network?
          </motion.h2>
          <motion.p 
            className="text-lg text-brand-black/80 mb-8 font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Join hundreds of software engineers already connecting and collaborating in Uzbekistan.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/register">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-brand-black text-brand-yellow hover:bg-brand-black-light px-8 py-3 text-lg font-semibold">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-black text-brand-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <Code className="h-8 w-8 text-brand-yellow" />
                <span className="ml-2 text-xl font-display font-bold">Tanish-Bilish</span>
              </div>
              <p className="text-brand-white/70 mb-4 font-medium">
                Connecting software engineers across Uzbekistan. Build your network, share knowledge, and grow together.
              </p>
              <div className="flex space-x-4">
                <motion.div whileHover={{ scale: 1.2, color: "#FFC107" }}>
                  <Github className="h-5 w-5 text-brand-white/70 hover:text-brand-yellow cursor-pointer" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2, color: "#FFC107" }}>
                  <Linkedin className="h-5 w-5 text-brand-white/70 hover:text-brand-yellow cursor-pointer" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2, color: "#FFC107" }}>
                  <MessageCircle className="h-5 w-5 text-brand-white/70 hover:text-brand-yellow cursor-pointer" />
                </motion.div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-display font-semibold mb-4 text-brand-yellow">Platform</h3>
              <ul className="space-y-2">
                <li><Link href="/register" className="text-brand-white/70 hover:text-brand-yellow font-medium transition-colors">Sign Up</Link></li>
                <li><Link href="/login" className="text-brand-white/70 hover:text-brand-yellow font-medium transition-colors">Sign In</Link></li>
                <li><Link href="/about" className="text-brand-white/70 hover:text-brand-yellow font-medium transition-colors">About</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-display font-semibold mb-4 text-brand-yellow">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-brand-white/70 hover:text-brand-yellow font-medium transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="text-brand-white/70 hover:text-brand-yellow font-medium transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="text-brand-white/70 hover:text-brand-yellow font-medium transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-brand-white/20 mt-8 pt-8 text-center">
            <p className="text-brand-white/70 font-medium">
              © 2024 Tanish-Bilish. Built for Uzbekistan's tech community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
