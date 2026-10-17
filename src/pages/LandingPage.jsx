"use client";

import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  GraduationCap,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
  Play,
  Terminal,
  Activity,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../config/mockUsers";

/**
 * ReplayEd landing.
 *
 * 1. Put crowd-loop.mp4 in /public
 * 2. Add the tagline font once (layout.tsx or globals.css):
 *      @import url("https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap");
 * 3. <ReplayedLanding />
 *
 * The crowd video loops forever and never pauses. In the slow-motion part of every
 * loop a spotlight follows ONE of the two people who already hold a phone in the video
 * (picked at random each loop). Logo, tagline and logins appear after the first light.
 */

const VW = 1280; // crowd-loop.mp4 size
const VH = 414;

// [seconds, x, y] of each phone-holder's face in the 1280x414 clip (tracked from the video).
const TRACKS = {
  "A": [
    [0.0, 266, 271], [0.1, 264, 271], [0.2, 260, 271], [0.3, 255, 271], [0.4, 251, 272],
    [0.5, 246, 273], [0.6, 242, 274], [0.7, 238, 276], [0.8, 233, 278], [0.9, 229, 281],
    [1.0, 222, 278], [1.1, 222, 278], [1.2, 218, 276], [1.3, 213, 274], [1.4, 209, 273],
    [1.5, 205, 272], [1.6, 200, 271], [1.7, 193, 270], [1.8, 189, 270], [1.9, 184, 270],
    [2.0, 180, 270], [2.1, 175, 271], [2.2, 168, 273], [2.3, 168, 273], [2.4, 164, 274],
    [2.5, 159, 276], [2.6, 155, 278], [2.7, 150, 279], [2.8, 146, 277], [2.9, 141, 275],
    [3.0, 137, 273], [3.1, 132, 272], [3.2, 128, 271], [3.3, 121, 270], [3.4, 116, 270],
    [3.5, 112, 270], [3.6, 107, 270], [3.7, 103, 270], [3.8, 98, 271], [3.9, 94, 272],
    [4.0, 90, 273], [4.1, 90, 273]
  ],
  "B": [
    [0.0, 1115, 286], [0.1, 1116, 286], [0.2, 1119, 287], [0.3, 1122, 288], [0.4, 1125, 290],
    [0.5, 1128, 291], [0.6, 1131, 290], [0.7, 1134, 288], [0.8, 1137, 287], [0.9, 1140, 286],
    [1.0, 1145, 284], [1.1, 1145, 284], [1.2, 1148, 283], [1.3, 1151, 282], [1.4, 1154, 282],
    [1.5, 1157, 282], [1.6, 1160, 282], [1.7, 1165, 282], [1.8, 1168, 282], [1.9, 1171, 282],
    [2.0, 1174, 282], [2.1, 1177, 282], [2.2, 1182, 283], [2.3, 1182, 283], [2.4, 1185, 284],
    [2.5, 1188, 285], [2.6, 1191, 286], [2.7, 1194, 287], [2.8, 1197, 288], [2.9, 1200, 290],
    [3.0, 1203, 291], [3.1, 1206, 289], [3.2, 1209, 288], [3.3, 1214, 286], [3.4, 1217, 285],
    [3.5, 1220, 284], [3.6, 1223, 283], [3.7, 1226, 282], [3.8, 1229, 282], [3.9, 1232, 282],
    [4.0, 1233, 282], [4.1, 1233, 282]
  ]
};
const END = TRACKS.A[TRACKS.A.length - 1][0];

const at = (track, t) => {
  if (t <= track[0][0]) return track[0];
  for (let i = 1; i < track.length; i++) {
    if (t <= track[i][0]) {
      const a = track[i - 1];
      const b = track[i];
      const k = (t - a[0]) / (b[0] - a[0]);
      return [t, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
    }
  }
  return track[track.length - 1];
};

const ease = (x) => {
  const c = Math.max(0, Math.min(1, x));
  return c * c * (3 - 2 * c);
};

export default function ReplayedLanding({
  videoSrc = "./crowd-loop.mp4",
  studentHref = "/login/student",
  teacherHref = "/login/teacher",
} = {}) {
  const navigate = useNavigate();
  const { demoLogin } = useAuth();

  const videoRef = useRef(null);
  const crowdRef = useRef(null);
  const litRef = useRef(null);
  const coneRef = useRef(null);
  const poolRef = useRef(null);
  const lampRef = useRef(null);
  const brandRef = useRef(null);
  const tagRef = useRef(null);
  const loginsRef = useRef(null);

  // Navigation Handlers linking all modules
  const handleGoStudent = () => {
    demoLogin(ROLES.STUDENT);
    navigate("/student");
  };

  const handleGoTeacher = () => {
    demoLogin(ROLES.TEACHER);
    navigate("/teacher");
  };

  const handleGoAdmin = () => {
    demoLogin(ROLES.ADMIN);
    navigate("/admin");
  };

  const handleGoLogin = (role = "student") => {
    navigate(`/login/${role}`);
  };

  useEffect(() => {
    const v = videoRef.current;
    const crowd = crowdRef.current;
    if (!v || !crowd) return;

    let hero = null;
    let pan = 0.5;
    let prevT = 0;
    let brandDone = false;
    let raf = 0;
    const timers = [];

    const metrics = () => {
      const r = crowd.getBoundingClientRect();
      const s = Math.max(r.width / VW, r.height / VH);
      return { r, s, slack: r.width - VW * s };
    };

    const chooseHero = () => {
      hero = Math.random() < 0.5 ? "A" : "B";
      const m = metrics();
      const tr = TRACKS[hero];
      const mid = tr[Math.floor(tr.length / 2)][1];
      pan = m.slack === 0 ? 0.5 : Math.max(0, Math.min(1, (m.r.width / 2 - mid * m.s) / m.slack));
      v.style.objectPosition = `${pan * 100}% 100%`;
    };

    const revealBrandAndLogins = () => {
      if (!brandDone) {
        brandDone = true;
        timers.push(
          setTimeout(() => {
            brandRef.current?.classList.add("rp-on");
            tagRef.current?.classList.add("rp-on");
          }, 200)
        );
        timers.push(
          setTimeout(() => {
            loginsRef.current?.classList.add("rp-on");
          }, 600)
        );
      }
    };

    const frame = () => {
      const t = v.currentTime;
      if (t < prevT - 0.5 || hero === null) chooseHero();
      prevT = t;
      const a = ease((t - 0.15) / 0.7) * (1 - ease((t - (END - 0.7)) / 0.65));

      if (!v.paused && a > 0.01 && hero) {
        const m = metrics();
        const p = at(TRACKS[hero], t);
        const s = m.s;
        const x = m.r.left + m.slack * pan + p[1] * s;
        const y = m.r.top + (m.r.height - VH * s) + p[2] * s;
        const cw = Math.max(120, 230 * s);
        const pw = 150 * s;
        const ph = 235 * s;
        const cone = coneRef.current;
        const pool = poolRef.current;
        const lamp = lampRef.current;
        if (cone && pool && lamp) {
          cone.style.left = `${x - cw / 2}px`;
          cone.style.width = `${cw}px`;
          cone.style.height = `${Math.max(40, y - 125 * s)}px`;
          pool.style.left = `${x - pw / 2}px`;
          pool.style.width = `${pw}px`;
          pool.style.height = `${ph}px`;
          pool.style.top = `${y - ph / 2 - 5 * s}px`;
          lamp.style.left = `${x - 35}px`;
        }
        if (a > 0.6 && !brandDone) {
          brandDone = true;
          timers.push(
            setTimeout(() => {
              brandRef.current?.classList.add("rp-on");
              tagRef.current?.classList.add("rp-on");
            }, 800)
          );
          timers.push(setTimeout(() => loginsRef.current?.classList.add("rp-on"), 2000));
        }
      }
      if (litRef.current) litRef.current.style.opacity = String(a);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      v.play().catch(() => {});
    };
    const onPause = () => {
      if (!document.hidden) start();
    };
    const onVis = () => {
      if (!document.hidden) start();
    };
    const onResize = () => {
      if (hero) chooseHero();
    };
    const onError = () => {
      revealBrandAndLogins();
    };

    // Auto-reveal fallback: Gracefully reveal if video is not loaded within 1.2s
    const fallbackTimer = setTimeout(() => {
      revealBrandAndLogins();
    }, 1200);
    timers.push(fallbackTimer);

    v.addEventListener("pause", onPause);
    v.addEventListener("error", onError);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", onResize);
    start();
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("error", onError);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#f6f6f6] text-[#0d0d0d] flex flex-col justify-between overflow-x-hidden selection:bg-zinc-800 selection:text-white">
      <style>{`
        .rp-brand{opacity:0;transform:translateY(-14px) scale(.92);transition:opacity 0.8s,transform 0.8s}
        .rp-tag{opacity:0;transform:scale(.96);transition:opacity 0.8s .2s,transform 0.8s .2s}
        .rp-logins{opacity:0;transform:translateY(14px);visibility:hidden;transition:opacity 0.8s,transform 0.8s}
        .rp-brand.rp-on,.rp-tag.rp-on,.rp-logins.rp-on{opacity:1;transform:none}
        .rp-logins.rp-on{visibility:visible;pointer-events:auto}
      `}</style>

      {/* ========================================================
          TOP NAVIGATION BAR: Connects ALL pages together
          ======================================================== */}
      <header className="relative z-30 w-full border-b border-zinc-200/80 bg-white/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0d0d0d] shadow-sm group-hover:scale-105 transition-transform">
              <RotateCcw className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-black tracking-tight text-zinc-950 block leading-tight">
                ReplayEd
              </span>
              <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block -mt-0.5">
                Adaptive Assessment System
              </span>
            </div>
          </div>

          {/* Quick-Nav Links to All Portals */}
          <nav className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleGoStudent}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition"
              title="Open Student Learning & Assessment Portal"
            >
              <GraduationCap className="w-3.5 h-3.5 text-zinc-600" />
              <span className="hidden sm:inline">Student Portal</span>
            </button>

            <button
              onClick={handleGoTeacher}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition"
              title="Open Trainer Console & Keystroke Replay"
            >
              <BookOpen className="w-3.5 h-3.5 text-zinc-600" />
              <span className="hidden sm:inline">Trainer Console</span>
            </button>

            <button
              onClick={handleGoAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition"
              title="Open Institutional Admin Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-600" />
              <span className="hidden md:inline">Admin</span>
            </button>

            {/* Direct Sign-In Button */}
            <button
              onClick={() => handleGoLogin("student")}
              className="flex items-center gap-1 px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-[#0d0d0d] hover:bg-zinc-800 transition shadow-sm ml-1"
            >
              <span>Sign In</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </nav>
        </div>
      </header>

      {/* ========================================================
          HERO SECTION: Crowd Video Loop + Animated Spotlight + Tagline
          ======================================================== */}
      <main className="relative flex-1 flex flex-col items-center justify-start pt-8 sm:pt-14 pb-32 px-4 z-10">
        {/* crowd video: loops by itself, never pauses */}
        <div
          ref={crowdRef}
          className="absolute inset-x-0 bottom-0 min-h-[200px] pointer-events-none z-0"
          style={{
            height: "min(46vh, calc(100vw * 414 / 1280 * 1.1))",
            maskImage: "linear-gradient(to bottom, transparent 0, #000 14%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 14%)",
          }}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            loop
            autoPlay
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
            style={{ objectPosition: "50% 100%" }}
          />
        </div>

        {/* spotlight that follows one phone-holder */}
        <div ref={litRef} className="pointer-events-none absolute inset-0 z-[2]" style={{ opacity: 0 }}>
          <div ref={lampRef} className="absolute top-0 z-[3] h-3.5 w-[70px] rounded-b-2xl bg-[#0d0d0d]" />
          <div
            ref={coneRef}
            className="absolute top-0 z-[1]"
            style={{
              clipPath: "polygon(44% 0, 56% 0, 100% 100%, 0 100%)",
              background:
                "linear-gradient(to bottom, rgba(255,205,70,.9), rgba(255,205,70,.6) 60%, rgba(255,205,70,.35))",
              mixBlendMode: "multiply",
              filter: "blur(2px)",
            }}
          />
          <div
            ref={poolRef}
            className="absolute z-[1]"
            style={{
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(255,205,70,.95) 0, rgba(255,205,70,.8) 42%, rgba(255,205,70,0) 70%)",
              mixBlendMode: "multiply",
            }}
          />
        </div>

        {/* Central Logo + Tagline + Hero Action Buttons */}
        <div className="relative z-20 flex flex-col items-center gap-4 text-center max-w-4xl mx-auto">
          {/* Animated ReplayEd Logo Icon */}
          <div ref={brandRef} className="rp-brand flex items-center gap-3">
            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-[#0d0d0d] shadow-lg">
              <RotateCcw className="h-7 w-7 text-white" />
            </div>
            <span className="text-[clamp(1.9rem,5vw,2.6rem)] font-extrabold leading-none tracking-tight">
              ReplayEd
            </span>
          </div>

          {/* Huge Tagline (Archivo Black Font) */}
          <h1
            ref={tagRef}
            className="rp-tag max-w-[20ch] text-balance uppercase leading-[.98] tracking-[-0.02em]"
            style={{
              fontFamily: '"Archivo Black", Impact, "Arial Black", system-ui, sans-serif',
              fontWeight: 400,
              fontSynthesis: "none",
              fontSize: "clamp(2.1rem, min(5vw, 7.5vh), 3.8rem)",
            }}
          >
            Don&apos;t be ordinary with other apps. Use{" "}
            <span className="underline decoration-[.09em] underline-offset-[.08em]">ReplayEd</span> and be{" "}
            <span
              className="px-[.06em]"
              style={{
                background:
                  "linear-gradient(transparent 52%, rgb(255,205,70) 52%, rgb(255,205,70) 94%, transparent 94%)",
              }}
            >
              extraordinary.
            </span>
          </h1>

          {/* Dynamic Buttons connecting directly to portals & login */}
          <div
            ref={loginsRef}
            className="rp-logins flex flex-wrap justify-center items-center gap-3 pt-2"
          >
            <a
              href={studentHref}
              onClick={(e) => {
                e.preventDefault();
                handleGoLogin("student");
              }}
              className="flex items-center gap-2 rounded-full border-[1.5px] border-[#0d0d0d] bg-[#0d0d0d] px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg cursor-pointer shadow-md"
            >
              <GraduationCap className="h-4 w-4" />
              <span>Student Login</span>
            </a>

            <a
              href={teacherHref}
              onClick={(e) => {
                e.preventDefault();
                handleGoLogin("teacher");
              }}
              className="flex items-center gap-2 rounded-full border-[1.5px] border-[#0d0d0d] bg-white px-7 py-3 text-sm font-semibold text-[#0d0d0d] transition hover:-translate-y-0.5 hover:shadow-lg cursor-pointer shadow-sm hover:border-black"
            >
              <BookOpen className="h-4 w-4" />
              <span>Teacher Login</span>
            </a>

            {/* Instant Demo Sandbox Shortcut */}
            <button
              onClick={handleGoStudent}
              className="flex items-center gap-1.5 rounded-full border border-zinc-300 bg-zinc-100 hover:bg-zinc-200 px-5 py-3 text-xs font-bold text-zinc-800 transition hover:-translate-y-0.5 shadow-xs"
              title="Instant Sandbox Access without credentials"
            >
              <Play className="h-3 w-3 fill-current text-zinc-900" />
              <span>Instant Sandbox Demo</span>
            </button>
          </div>
        </div>
      </main>

      {/* ========================================================
          BOTTOM PORTALS HUB: Seamlessly connects all 4 portals
          ======================================================== */}
      <footer className="relative z-20 w-full border-t border-zinc-200/90 bg-white/95 backdrop-blur-md py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] uppercase tracking-wider font-bold text-zinc-500">
              Interactive Application Portals
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              All Systems &amp; APIs Live
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* 1. Student Portal Card */}
            <div
              onClick={handleGoStudent}
              className="p-3.5 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/80 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-900">
                    <GraduationCap className="w-4 h-4 text-zinc-800" />
                    <span>Student Assessment</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-zinc-500 leading-snug">
                  Adaptive curriculum, Monaco code editor, gaze calibration, and live camera verification.
                </p>
              </div>
              <span className="text-[10px] font-bold text-zinc-900 mt-2.5 inline-flex items-center gap-1">
                Enter Student Portal →
              </span>
            </div>

            {/* 2. Trainer Console Card */}
            <div
              onClick={handleGoTeacher}
              className="p-3.5 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/80 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-900">
                    <BookOpen className="w-4 h-4 text-zinc-800" />
                    <span>Trainer Console</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-zinc-500 leading-snug">
                  Keystroke telemetry replay, integrity look-away signal inspection, and viva explanation evaluation.
                </p>
              </div>
              <span className="text-[10px] font-bold text-zinc-900 mt-2.5 inline-flex items-center gap-1">
                Open Trainer Console →
              </span>
            </div>

            {/* 3. Admin Console Card */}
            <div
              onClick={handleGoAdmin}
              className="p-3.5 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/80 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-900">
                    <ShieldCheck className="w-4 h-4 text-zinc-800" />
                    <span>Institutional Admin</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-zinc-500 leading-snug">
                  Cluster health, student cohort management, course prerequisites, and audit security telemetry.
                </p>
              </div>
              <span className="text-[10px] font-bold text-zinc-900 mt-2.5 inline-flex items-center gap-1">
                Open Admin Dashboard →
              </span>
            </div>

            {/* 4. Login & Authentication Card */}
            <div
              onClick={() => handleGoLogin("student")}
              className="p-3.5 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/80 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-900">
                    <Terminal className="w-4 h-4 text-zinc-800" />
                    <span>Unified Auth &amp; Login</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-zinc-500 leading-snug">
                  WiFi connectivity verification, strong @gmail.com validation, and password strength evaluation.
                </p>
              </div>
              <span className="text-[10px] font-bold text-zinc-900 mt-2.5 inline-flex items-center gap-1">
                Go to Authentication →
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-200/60 flex flex-wrap items-center justify-between text-[11px] text-zinc-400">
            <span>&copy; {new Date().getFullYear()} ReplayEd Inc. Adaptive Coding &amp; Continuous Telemetry.</span>
            <span>Hosted via GitHub Actions on GitHub Pages</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
