import { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, ShieldAlert, CheckCircle2, Cpu, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WalkthroughVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHAPTERS = [
  {
    title: 'EHR Workspace Integration',
    desc: 'Real-time patient charts, vital metrics logging, and HIPAA compliance tracking.',
    timeStart: 0,
    timeEnd: 8,
    color: 'border-rose-500 bg-rose-50/10'
  },
  {
    title: 'Smart Automated Claims',
    desc: 'Automated ICD-10 cross check and auto-billing optimization modules.',
    timeStart: 8,
    timeEnd: 16,
    color: 'border-emerald-500 bg-emerald-50/10'
  },
  {
    title: 'Precision Scheduling',
    desc: 'Automated patient intake, drag-and-drop calendars, and custom SMS reminders.',
    timeStart: 16,
    timeEnd: 24,
    color: 'border-sky-500 bg-sky-50/10'
  },
  {
    title: 'Intelligent Inventory alerts',
    desc: 'Low stock notification indicators and instant medical supply restock order flows.',
    timeStart: 24,
    timeEnd: 32,
    color: 'border-amber-500 bg-amber-50/10'
  }
];

export default function WalkthroughVideoModal({ isOpen, onClose }: WalkthroughVideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 32) {
            return 0; // loop back
          }
          return p + 0.5;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const currentChapterIndex = Math.min(
    Math.floor(progress / 8),
    CHAPTERS.length - 1
  );
  const currentChapter = CHAPTERS[currentChapterIndex];

  // Percentage for progress bar
  const progressPercent = (progress / 32) * 100;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden w-full max-w-4xl shadow-2xl flex flex-col md:flex-row h-[95vh] md:h-[520px] max-h-[850px]"
      >
        {/* Video Screen Area */}
        <div className="flex-1 bg-black flex flex-col justify-between p-4 relative overflow-hidden group min-h-0">
          {/* Top Info Bar */}
          <div className="flex justify-between items-center z-10 mb-2">
            <span className="flex items-center gap-1.5 text-[10px] text-white/80 bg-white/10 backdrop-blur px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
              <Cpu className="w-3 h-3 text-sky-400 animate-spin" /> Simulated Walkthrough Live
            </span>
            <span className="text-[11px] font-mono text-white/60 bg-black/40 px-2 py-0.5 rounded font-bold">
              {Math.floor(progress / 60)}:{(Math.floor(progress % 60) < 10 ? '0' : '')}{Math.floor(progress % 60)} / 0:32
            </span>
          </div>

          {/* Core Simulated Screen Visual */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-6 md:py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapterIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3 md:space-y-4"
              >
                {/* Visual Icon Box */}
                <div className="mx-auto w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
                  {currentChapterIndex === 0 && <span className="material-symbols-outlined text-rose-400 text-2xl md:text-3xl">clinical_notes</span>}
                  {currentChapterIndex === 1 && <span className="material-symbols-outlined text-emerald-400 text-2xl md:text-3xl">payments</span>}
                  {currentChapterIndex === 2 && <span className="material-symbols-outlined text-sky-400 text-2xl md:text-3xl">calendar_month</span>}
                  {currentChapterIndex === 3 && <span className="material-symbols-outlined text-amber-400 text-2xl md:text-3xl">inventory_2</span>}
                </div>

                <div className="space-y-1 md:space-y-2">
                  <span className="text-[10px] md:text-xs font-bold text-sky-400 uppercase tracking-widest block">
                    Chapter {currentChapterIndex + 1} of 4
                  </span>
                  <h3 className="text-lg md:text-xl font-headline-xl font-bold text-white">
                    {currentChapter.title}
                  </h3>
                  <p className="text-[11px] md:text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    {currentChapter.desc}
                  </p>
                </div>

                {/* Animated graphic mockup bar */}
                <div className="mt-2 md:mt-4 flex justify-center gap-2">
                  <div className={`h-1 w-8 rounded-full ${currentChapterIndex >= 0 ? 'bg-rose-500' : 'bg-white/20'} transition-all`} />
                  <div className={`h-1 w-8 rounded-full ${currentChapterIndex >= 1 ? 'bg-emerald-500' : 'bg-white/20'} transition-all`} />
                  <div className={`h-1 w-8 rounded-full ${currentChapterIndex >= 2 ? 'bg-sky-500' : 'bg-white/20'} transition-all`} />
                  <div className={`h-1 w-8 rounded-full ${currentChapterIndex >= 3 ? 'bg-amber-500' : 'bg-white/20'} transition-all`} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Video Custom Controls */}
          <div className="space-y-2 md:space-y-3 z-10">
            {/* Progress Bar */}
            <div className="h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer">
              <div
                className="h-full bg-sky-500 transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Play controls row */}
            <div className="flex justify-between items-center text-white text-xs">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-sky-400 transition-colors p-1"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-sky-400 transition-colors p-1"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="hover:text-sky-400 transition-colors p-1"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Walkthrough Sidebar Chapters */}
        <div className="w-full md:w-80 bg-slate-950 p-4 md:p-5 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-800 overflow-y-auto min-h-0">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-white font-bold text-sm font-headline-md">Video Chapters</h4>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors p-1 bg-slate-900 border border-slate-800 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chapter Items */}
            <div className="space-y-2.5">
              {CHAPTERS.map((chap, i) => {
                const isActive = currentChapterIndex === i;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setProgress(chap.timeStart);
                      setIsPlaying(true);
                    }}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      isActive
                        ? 'border-sky-500 bg-sky-500/10 text-white'
                        : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-[9px] font-bold uppercase tracking-wider ${isActive ? 'text-sky-400' : 'text-slate-500'}`}>
                        Chapter {i + 1}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {chap.timeStart}s - {chap.timeEnd}s
                      </span>
                    </div>
                    <p className="font-bold text-xs leading-normal">{chap.title}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-800 mt-4 text-[11px] text-slate-400">
            <span className="text-white font-bold block mb-1">Learn More?</span>
            Book a physical, personalized live system demo to map H Plus directly to your hospital&apos;s physical operations.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
