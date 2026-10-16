import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/login/Logo';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../config/mockUsers';
import {
  Play,
  ArrowRight,
  ShieldCheck,
  Brain,
  Terminal,
  Activity,
  Layers,
  CheckCircle2,
  AlertTriangle,
  GraduationCap,
  Presentation,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { demoLogin } = useAuth();

  const handleLaunchStudent = () => {
    demoLogin(ROLES.STUDENT);
    navigate('/student');
  };

  const handleLaunchTrainer = () => {
    demoLogin(ROLES.TEACHER);
    navigate('/teacher');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white">
      {/* ========================================================
          PUBLIC HEADER
          ======================================================== */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo variant="light" size="sm" subtitle="Adaptive Learning Platform" />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-400">
            <a href="#features" className="hover:text-white transition">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white transition">
              How It Works
            </a>
            <button
              onClick={handleLaunchStudent}
              className="hover:text-white transition flex items-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Student Portal
            </button>
            <button
              onClick={handleLaunchTrainer}
              className="hover:text-white transition flex items-center gap-1.5"
            >
              <Presentation className="w-3.5 h-3.5" />
              Trainer Console
            </button>
            <button
              onClick={() => {
                demoLogin(ROLES.ADMIN);
                navigate('/admin');
              }}
              className="hover:text-white transition flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin
            </button>
          </nav>

          {/* Direct Auth Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition"
            >
              Sign In
            </button>
            <button
              onClick={handleLaunchStudent}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-zinc-950 text-xs font-bold hover:bg-zinc-200 transition shadow-sm"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================
          HERO SECTION
          ======================================================== */}
      <section className="relative pt-20 pb-16 px-6 max-w-5xl mx-auto text-center">
        {/* Subtle radial glow background */}
        <div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            background:
              'radial-gradient(ellipse at 50% 20%, rgba(255, 255, 255, 0.07) 0%, rgba(10, 10, 10, 0) 70%)',
          }}
        />

        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-medium text-zinc-300 mb-6 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Session Replay & Adaptive Assessment Engine</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
          Learn at your pace.
          <br />
          <span className="bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-600 bg-clip-text text-transparent">
            Prove it with every keystroke.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-400 leading-relaxed mb-10">
          ReplayEd empowers coding institutes with adaptive question paths, an isolated code sandbox,
          and forensic typing replay that gives trainers evidence, not guesses.
        </p>

        {/* Dual Portal Launcher CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleLaunchStudent}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white text-zinc-950 text-sm font-bold hover:bg-zinc-200 transition shadow-lg shadow-white/5 active:scale-95"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Launch Student Portal</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={handleLaunchTrainer}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-sm font-semibold border border-zinc-800 hover:border-zinc-700 transition shadow-sm active:scale-95"
          >
            <Presentation className="w-4 h-4 text-zinc-400" />
            <span>Launch Trainer Console</span>
          </button>
        </div>

        {/* Quick Demo Credentials Reminder */}
        <p className="mt-4 text-xs text-zinc-500">
          Instant demo access available for both portals. No credit card required.
        </p>
      </section>

      {/* ========================================================
          SIGNATURE FEATURE TEASER: SESSION REPLAY PLAYER
          ======================================================== */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/60 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 mb-6 border-b border-zinc-800/80 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Feature Spotlight
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Live Keystroke Replay & Forensic Integrity
              </h2>
            </div>

            <button
              onClick={handleLaunchTrainer}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-semibold text-zinc-200 hover:text-white hover:bg-zinc-800 transition"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Test Interactive Replay in Trainer Console</span>
            </button>
          </div>

          {/* Interactive Replay Simulation Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Code Window */}
            <div className="lg:col-span-2 rounded-2xl border border-zinc-800 bg-[#0d0d10] p-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800 text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-zinc-400">solution_lru_cache.py</span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                    Playback 1x
                  </span>
                  <span className="text-emerald-400 font-semibold">04:18 / 12:45</span>
                </div>
              </div>

              {/* Code lines */}
              <div className="space-y-1 text-zinc-300">
                <div><span className="text-zinc-600 mr-3">01</span><span className="text-zinc-400">class</span> <span className="text-white font-bold">LRUCache</span>:</div>
                <div><span className="text-zinc-600 mr-3">02</span>    <span className="text-zinc-400">def</span> <span className="text-white">__init__</span>(self, capacity: int):</div>
                <div><span className="text-zinc-600 mr-3">03</span>        self.cap = capacity</div>
                <div><span className="text-zinc-600 mr-3">04</span>        self.cache = {'{}'} <span className="text-zinc-500"># key to node mapping</span></div>
                <div><span className="text-zinc-600 mr-3">05</span>        self.head = Node(0, 0)</div>
                <div><span className="text-zinc-600 mr-3">06</span>        self.tail = Node(0, 0)</div>
                <div><span className="text-zinc-600 mr-3">07</span>        self.head.next = self.tail</div>
                <div><span className="text-zinc-600 mr-3">08</span>        self.tail.prev = self.head</div>
                <div className="bg-zinc-800/60 -mx-4 px-4 py-0.5 border-l-2 border-emerald-400">
                  <span className="text-zinc-600 mr-3">09</span>    <span className="text-zinc-400">def</span> <span className="text-white">get</span>(self, key: int) -&gt; int:
                  <span className="inline-block w-1.5 h-3.5 bg-white ml-1 animate-pulse align-middle" />
                </div>
              </div>
            </div>

            {/* Anomaly & Integrity Log */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center justify-between">
                  <span>Integrity Timeline</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                    High Confidence
                  </span>
                </h3>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-start gap-2.5 p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-zinc-200">Normal typing cadence</div>
                      <div className="text-[11px] text-zinc-500">00:00 - 02:40 • 74 WPM steady</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-zinc-200">Algorithmic think time</div>
                      <div className="text-[11px] text-zinc-500">02:41 - 03:55 • 1m 14s pause</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-zinc-200">Zero clipboard paste flags</div>
                      <div className="text-[11px] text-zinc-500">All logic typed manually</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                <span>Verified Candidate</span>
                <span className="font-bold text-white">Alex Chen (94%)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CORE FEATURES GRID
          ======================================================== */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            System Architecture
          </span>
          <h2 className="text-3xl font-bold text-white mt-1">
            Built for rigorous coding assessments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 transition">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white mb-4">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Adaptive Learning Paths
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Questions dynamically adjust difficulty based on real-time concept mastery, isolating
              weak topics like Recursion, Dynamic Programming, and Concurrency.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 transition">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white mb-4">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Keystroke-by-Keystroke Replay
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Trainers scrub through full typing sessions with playback controls, inspecting thought
              processes, deletions, hesitation pauses, and refactors.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 transition">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Forensic Integrity Signals
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Detect large external code pastes, rapid block insertions, tab unfocus events, and
              unnatural typing cadence with automated anomaly flags.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 transition">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white mb-4">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Isolated Code Sandbox
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              In-browser code editor with syntax highlighting, language selector (Python, JS, C++),
              custom test runner, and immediate execution output.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 transition">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Code Viva & Oral Verification
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Automated explanation questions testing why the student picked a specific data structure,
              space/time trade-offs, and edge cases.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 transition">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Batch Mastery Heatmaps
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Institutes aggregate cohort data across batches to diagnose institute-wide weak concepts
              and customize curriculum pacing.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          HOW IT WORKS (STEP-BY-STEP)
          ======================================================== */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-16 border-t border-zinc-800/80">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Methodology
          </span>
          <h2 className="text-3xl font-bold text-white mt-1">
            How Adaptive Learning Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start p-6 rounded-2xl bg-zinc-950 border border-zinc-800">
            <span className="text-xs font-mono font-bold text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-700/60 mb-4">
              STEP 01
            </span>
            <h4 className="text-base font-bold text-white mb-2">
              Diagnostic Assessment
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Student solves adaptive challenges. As tests pass or fail, the Bayesian knowledge tracer
              calculates concept certainty.
            </p>
          </div>

          <div className="flex flex-col items-start p-6 rounded-2xl bg-zinc-950 border border-zinc-800">
            <span className="text-xs font-mono font-bold text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-700/60 mb-4">
              STEP 02
            </span>
            <h4 className="text-base font-bold text-white mb-2">
              Targeted Concept Remediation
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              The curriculum roadmap unlocks specific bridge modules addressing identified weak spots
              before advancing to harder algorithms.
            </p>
          </div>

          <div className="flex flex-col items-start p-6 rounded-2xl bg-zinc-950 border border-zinc-800">
            <span className="text-xs font-mono font-bold text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-700/60 mb-4">
              STEP 03
            </span>
            <h4 className="text-base font-bold text-white mb-2">
              Trainer Verification & Viva
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Trainer reviews keystroke replays and grades the code explanation answers to verify genuine
              hands-on programming competency.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          PUBLIC FOOTER
          ======================================================== */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950/80 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-3">
            <Logo variant="light" size="sm" showText={true} />
            <span>&copy; {new Date().getFullYear()} ReplayEd Inc. Adaptive Coding & Assessment Engine.</span>
          </div>

          <div className="flex items-center gap-4 font-semibold text-zinc-400">
            <button onClick={handleLaunchStudent} className="hover:text-white transition">
              Student Portal
            </button>
            <button onClick={handleLaunchTrainer} className="hover:text-white transition">
              Trainer Console
            </button>
            <button onClick={() => navigate('/login')} className="hover:text-white transition">
              Sign In
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
