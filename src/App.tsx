import { useState, useEffect } from 'react';
import { SandboxType } from './types';
import SandboxModal from './components/SandboxModal';
import BookDemoModal from './components/BookDemoModal';
import WalkthroughVideoModal from './components/WalkthroughVideoModal';
import { motion, AnimatePresence } from 'motion/react';
import doctorDashboardImg from './assets/images/h_plus_doctor_dashboard_1783395471452.jpg';
import drSarahChenImg from './assets/images/h_plus_dr_sarah_chen_1783395484187.jpg';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Play, 
  Activity, 
  Sparkles, 
  Clock, 
  Layers, 
  Check, 
  ChevronRight, 
  ShieldCheck, 
  TrendingUp, 
  Award,
  Video
} from 'lucide-react';

export default function App() {
  const [activeSandbox, setActiveSandbox] = useState<SandboxType>(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll for premium frosted glass effect on header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apple-style fade-up scroll animations
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const scaleUpVariant = {
    hidden: { opacity: 0, scale: 0.96, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-body-md text-[#0f172a] bg-[#fcfcfd] selection:bg-primary/10 selection:text-primary">
      {/* Premium Sticky Header (TopNavBar) */}
      <header 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
          {/* Logo Brand */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="flex items-center gap-3 select-none cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md border border-slate-100 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/d/1aOqwpAm8oEPSmZKwe5bdSuUY56BsDHCA"
                alt="H Plus Logo"
                className="h-8 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-widest text-primary leading-none uppercase">H Plus</span>
              <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">Clinical Automation</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setActiveSandbox('EHR')}
              className="text-slate-600 hover:text-primary transition-colors text-sm font-semibold cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary hover:after:w-full after:transition-all"
            >
              Interactive Sandbox
            </button>
            <button
              onClick={() => setIsVideoOpen(true)}
              className="text-slate-600 hover:text-primary transition-colors text-sm font-semibold cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary hover:after:w-full after:transition-all"
            >
              Video Tour
            </button>
            <button
              onClick={() => setIsDemoOpen(true)}
              className="text-slate-600 hover:text-primary transition-colors text-sm font-semibold cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary hover:after:w-full after:transition-all"
            >
              Solutions
            </button>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsDemoOpen(true)}
              className="bg-primary hover:bg-primary/95 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-primary/10 transition-all hover:shadow-lg hover:shadow-primary/15 active:scale-98 cursor-pointer"
            >
              Book Demo
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-primary transition-colors p-2 rounded-xl bg-slate-100 hover:bg-slate-200/60"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[64px] z-30 bg-white/95 backdrop-blur-lg border-b border-slate-200/60 p-6 shadow-xl flex flex-col gap-4 md:hidden"
          >
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest pb-2 border-b border-slate-100">Navigation Menu</div>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setActiveSandbox('EHR');
              }}
              className="flex items-center justify-between text-left py-3 px-4 rounded-xl hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-colors cursor-pointer"
            >
              <span>Clinical Sandbox Workspace</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsVideoOpen(true);
              }}
              className="flex items-center justify-between text-left py-3 px-4 rounded-xl hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-colors cursor-pointer"
            >
              <span>Platform Video Tour</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsDemoOpen(true);
              }}
              className="flex items-center justify-between text-left py-3 px-4 rounded-xl hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-colors cursor-pointer"
            >
              <span>Hospital Solutions</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsDemoOpen(true);
                }}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold text-center shadow-sm text-sm"
              >
                Book a Free Briefing
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <main className="flex-grow pt-[84px]">
        {/* Apple Style Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-28 md:pb-28 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-radial-gradient from-sky-50 via-transparent to-transparent opacity-60 -z-10" />
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-semibold tracking-wide w-fit mx-auto lg:mx-0 border border-primary/10"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Cloud Clinical Systems</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]"
              >
                Revolutionize Healthcare Operations with <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-sky-700 to-indigo-900">H Plus</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-slate-500 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
              >
                Streamline clinical workflow, automate insurance billing, and coordinate medical supplies inside one pristine, certified platform. Developed with doctors, tailored for high-volume hospitals.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4"
              >
                <button
                  onClick={() => setIsDemoOpen(true)}
                  className="bg-primary hover:bg-primary/95 text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-lg shadow-primary/15 hover:shadow-xl hover:shadow-primary/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book a Free Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="bg-white hover:bg-slate-50 text-slate-800 px-8 py-4 rounded-2xl font-bold text-sm border border-slate-200 shadow-sm hover:shadow active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 text-primary fill-primary" />
                  <span>Watch Video Tour</span>
                </button>
              </motion.div>
            </div>

            {/* Right Interactive Image Column */}
            <div className="lg:col-span-5 relative group mt-6 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.93, rotateY: 10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                {/* Visual Glow Layer */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-sky-500 opacity-15 blur-3xl rounded-full" />
                
                {/* Styled Frame Device Mockup */}
                <div className="relative border border-slate-200/80 bg-white/50 backdrop-blur-md rounded-2xl p-2.5 shadow-2xl overflow-hidden transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-slate-900 rounded-xl overflow-hidden aspect-[4/3] relative">
                    <img
                      className="w-full h-full object-cover select-none brightness-95"
                      alt="H Plus Doctor with dashboard tablet"
                      src={doctorDashboardImg}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4">
                      <div className="flex items-center gap-2.5 text-white">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold tracking-wide">Live Demo Operations Panel</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Little Floating Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -right-4 bottom-12 z-20 bg-white border border-slate-150 p-3.5 rounded-2xl shadow-lg flex items-center gap-3 select-none max-w-[210px]"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left leading-tight">
                  <span className="block text-[11px] font-black text-slate-400 uppercase tracking-wider">Security SLA</span>
                  <span className="text-xs font-bold text-slate-800">100% HIPAA Standard</span>
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* Apple Style Refined Trust Ribbon */}
        <section className="bg-[#f8fafc] py-8 border-y border-slate-200/40 select-none overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">INTEGRATES SECURELY ACROSS MAJOR HEALTHCARE NETWORKS</span>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-65 grayscale hover:grayscale-0 transition-all duration-300">
              <div className="flex items-center gap-2 font-black text-slate-600 text-sm tracking-tight">
                <span className="material-symbols-outlined text-primary text-base">health_and_safety</span> St. Jude Hospital
              </div>
              <div className="flex items-center gap-2 font-black text-slate-600 text-sm tracking-tight">
                <span className="material-symbols-outlined text-primary text-base">public</span> Global Health Network
              </div>
              <div className="flex items-center gap-2 font-black text-slate-600 text-sm tracking-tight">
                <span className="material-symbols-outlined text-primary text-base">location_city</span> City Medical Center
              </div>
            </div>
          </div>
        </section>

        {/* Clean Interactive Suite Preview (Bento-grid styled cards) */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white relative">
          <div className="max-w-7xl mx-auto">
            
            {/* Bento Header */}
            <motion.div 
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-4"
            >
              <span className="inline-block text-[11px] font-extrabold text-primary uppercase tracking-widest bg-primary/5 px-3.5 py-1.5 rounded-full border border-primary/10">
                Interactive Testing Suite
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                High-Fidelity Operations Workspace
              </h2>
              <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-light">
                H Plus is engineered for high-stakes environments. Click any of the system modules below to launch our functional, live sandbox environments and test administrative flows.
              </p>
            </motion.div>

            {/* Feature Bento Grid */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              
              {/* Card 1 - EHR */}
              <motion.div
                variants={scaleUpVariant}
                whileHover={{ y: -6, scale: 1.01 }}
                onClick={() => setActiveSandbox('EHR')}
                className="bg-[#fcfcfd] p-6 rounded-3xl border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer select-none relative overflow-hidden flex flex-col justify-between group h-64"
              >
                <div className="absolute right-0 top-0 bg-rose-500/5 w-24 h-24 rounded-bl-full -z-10 group-hover:bg-rose-500/10 transition-all duration-300" />
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: '"FILL" 1' }}>clinical_notes</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                      <span>EHR Registry</span>
                      <span className="text-[9px] bg-rose-500/10 text-rose-600 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">Live</span>
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-2">
                      Secure, real-time access to comprehensive clinical histories, medication sheets, and diagnosis details.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 pt-2 group-hover:translate-x-1 transition-transform">
                  <span>Open EHR Workbench</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>

              {/* Card 2 - Billing */}
              <motion.div
                variants={scaleUpVariant}
                whileHover={{ y: -6, scale: 1.01 }}
                onClick={() => setActiveSandbox('Billing')}
                className="bg-[#fcfcfd] p-6 rounded-3xl border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer select-none relative overflow-hidden flex flex-col justify-between group h-64"
              >
                <div className="absolute right-0 top-0 bg-emerald-500/5 w-24 h-24 rounded-bl-full -z-10 group-hover:bg-emerald-500/10 transition-all duration-300" />
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: '"FILL" 1' }}>payments</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                      <span>Smart Billing</span>
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">Live</span>
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-2">
                      Accelerate verification with automated claim rules. Process patient statements with instant validation.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 pt-2 group-hover:translate-x-1 transition-transform">
                  <span>Process Statements</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>

              {/* Card 3 - Scheduling */}
              <motion.div
                variants={scaleUpVariant}
                whileHover={{ y: -6, scale: 1.01 }}
                onClick={() => setActiveSandbox('Scheduling')}
                className="bg-[#fcfcfd] p-6 rounded-3xl border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer select-none relative overflow-hidden flex flex-col justify-between group h-64"
              >
                <div className="absolute right-0 top-0 bg-sky-500/5 w-24 h-24 rounded-bl-full -z-10 group-hover:bg-sky-500/10 transition-all duration-300" />
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: '"FILL" 1' }}>calendar_month</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                      <span>Intelligent Scheduler</span>
                      <span className="text-[9px] bg-sky-500/10 text-sky-600 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">Live</span>
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-2">
                      Optimize physician time. Book and dispatch automated patient notifications and SMS queue status.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-sky-600 pt-2 group-hover:translate-x-1 transition-transform">
                  <span>Manage Consultations</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>

              {/* Card 4 - Inventory */}
              <motion.div
                variants={scaleUpVariant}
                whileHover={{ y: -6, scale: 1.01 }}
                onClick={() => setActiveSandbox('Inventory')}
                className="bg-[#fcfcfd] p-6 rounded-3xl border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer select-none relative overflow-hidden flex flex-col justify-between group h-64"
              >
                <div className="absolute right-0 top-0 bg-amber-500/5 w-24 h-24 rounded-bl-full -z-10 group-hover:bg-amber-500/10 transition-all duration-300" />
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: '"FILL" 1' }}>inventory_2</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                      <span>Pharmacy Inventory</span>
                      <span className="text-[9px] bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">Live</span>
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-2">
                      Audit supply levels of critical stocks and configure automatic clinician restocking alerts.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 pt-2 group-hover:translate-x-1 transition-transform">
                  <span>Verify Supply Levels</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* Beautiful Apple-Style Statistics Ribbon */}
        <section className="bg-slate-900 text-white py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-40" />
          <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            
            <motion.div 
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-2 pt-8 md:pt-0"
            >
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight flex justify-center items-center gap-1.5">
                <TrendingUp className="w-6 h-6 text-emerald-400" /> 30%
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Workflow Efficiency Increase</p>
              <p className="text-[11px] text-slate-500 leading-relaxed max-w-xs mx-auto">Average reduction in standard administration log-time reported by nurse managers.</p>
            </motion.div>

            <motion.div 
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-2 pt-8 md:pt-0"
            >
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight flex justify-center items-center gap-1.5">
                <Award className="w-6 h-6 text-sky-400" /> 99.99%
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Database Uptime Reliability</p>
              <p className="text-[11px] text-slate-500 leading-relaxed max-w-xs mx-auto">High-availability clinical database engines operating on secured Google Cloud nodes.</p>
            </motion.div>

            <motion.div 
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-2 pt-8 md:pt-0"
            >
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight flex justify-center items-center gap-1.5">
                <ShieldCheck className="w-6 h-6 text-indigo-400" /> HIPAA
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Security & Compliance Certified</p>
              <p className="text-[11px] text-slate-500 leading-relaxed max-w-xs mx-auto">Advanced multi-tier security access scopes with end-to-end audit log registers.</p>
            </motion.div>

          </div>
        </section>

        {/* Sleek Testimonial Section */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#f8fafc]">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              variants={scaleUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white border border-slate-200/50 p-8 sm:p-12 md:p-16 rounded-3xl shadow-xl shadow-slate-100 relative overflow-hidden"
            >
              {/* Giant elegant graphic quote */}
              <span className="material-symbols-outlined text-primary/5 text-[120px] absolute -top-4 -right-2 select-none font-bold">format_quote</span>
              
              <blockquote className="relative z-10 space-y-6">
                <p className="text-xl sm:text-2xl text-slate-800 font-headline-md font-medium leading-relaxed italic">
                  &ldquo;H Plus completely transformed our clinic&apos;s daily workflow. We spend significantly less time on manual administration paperwork and more time where it matters—with our patients. The interface is intuitive, clean, and extremely responsive.&rdquo;
                </p>
                
                <footer className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary-fixed shrink-0 shadow-sm select-none bg-slate-100">
                    <img
                      className="w-full h-full object-cover"
                      alt="Dr. Sarah Chen, Chief of Medicine at H Plus"
                      src={drSarahChenImg}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <cite className="not-italic block font-extrabold text-slate-900 text-sm">Dr. Sarah Chen</cite>
                    <span className="text-xs text-slate-500 font-medium">Chief of Medicine, City Medical Center</span>
                  </div>
                </footer>
              </blockquote>
            </motion.div>
          </div>
        </section>

        {/* Pristine Apple-Style CTA Banner */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={scaleUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary to-slate-900 rounded-3xl p-8 sm:p-12 md:p-16 text-white text-center space-y-6 shadow-2xl relative overflow-hidden"
            >
              {/* Background ambient lighting */}
              <div className="absolute -left-1/4 -bottom-1/2 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl" />
              <div className="absolute -right-1/4 -top-1/2 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />

              <div className="max-w-2xl mx-auto space-y-4 relative z-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to Upgrade Your Clinical Network?</h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                  Join 500+ clinics and medical centers worldwide using H Plus to automate administration and deliver superior clinical workflows.
                </p>
                <div className="pt-6 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={() => setIsDemoOpen(true)}
                    className="bg-white hover:bg-slate-50 text-slate-900 px-8 py-3.5 rounded-xl font-bold text-sm shadow transition-all active:scale-98 cursor-pointer"
                  >
                    Get Started Free
                  </button>
                  <button
                    onClick={() => setIsVideoOpen(true)}
                    className="bg-slate-800/60 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-bold text-sm border border-slate-700/50 shadow transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Video className="w-4 h-4 text-sky-400" />
                    <span>Watch Simulated Tour</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-slate-50 border-t border-slate-200/50 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Brand Left */}
          <div className="space-y-3 text-center md:text-left select-none">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-slate-200 overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/d/1aOqwpAm8oEPSmZKwe5bdSuUY56BsDHCA"
                  alt="H Plus Logo"
                  className="h-6 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-sm font-black tracking-widest text-primary uppercase">H PLUS Clinical Systems</span>
            </div>
            <p className="text-slate-400 text-xs">© 2026 H PLUS Medical Systems. Built for next-generation clinical precision.</p>
          </div>

          {/* Nav Right */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-500">
            <a className="hover:text-primary transition-colors cursor-pointer" onClick={() => setIsDemoOpen(true)}>Privacy Policy</a>
            <a className="hover:text-primary transition-colors cursor-pointer" onClick={() => setIsDemoOpen(true)}>Terms of Service</a>
            <a className="hover:text-primary transition-colors cursor-pointer" onClick={() => setIsDemoOpen(true)}>Security Frameworks</a>
            <a className="hover:text-primary transition-colors cursor-pointer" onClick={() => setIsDemoOpen(true)}>Secure Support</a>
          </nav>
        </div>
      </footer>

      {/* Interactive Overlays */}
      <SandboxModal
        activeSandbox={activeSandbox}
        onClose={() => setActiveSandbox(null)}
        setActiveSandbox={setActiveSandbox}
      />

      <BookDemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />

      <WalkthroughVideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
    </div>
  );
}
