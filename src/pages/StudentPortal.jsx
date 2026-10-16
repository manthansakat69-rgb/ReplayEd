import React, { useState } from 'react';
import PortalNavbar from '../components/layout/PortalNavbar';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../config/mockUsers';
import {
  LayoutDashboard,
  BookOpen,
  GitFork,
  Code2,
  FileCheck2,
  MessageSquareCode,
  Play,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Flame,
  ArrowRight,
  Terminal,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Send,
  HelpCircle,
} from 'lucide-react';

export default function StudentPortal() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Interactive Code Editor State
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [codeContent, setCodeContent] = useState(`class LRUCache:
    """
    Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
    All operations must run in O(1) average time complexity.
    """
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}  # key -> node
        # Initializing dummy head and tail for doubly-linked list
        self.head = {"prev": None, "next": None, "key": 0, "val": 0}
        self.tail = {"prev": None, "next": None, "key": 0, "val": 0}
        self.head["next"] = self.tail
        self.tail["prev"] = self.head

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add(node)
            return node["val"]
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = {"prev": None, "next": None, "key": key, "val": value}
        self._add(node)
        self.cache[key] = node
        if len(self.cache) > self.capacity:
            lru = self.head["next"]
            self._remove(lru)
            del self.cache[lru["key"]]

    def _remove(self, node):
        p, n = node["prev"], node["next"]
        p["next"] = n
        n["prev"] = p

    def _add(self, node):
        p = self.tail["prev"]
        p["next"] = node
        node["prev"] = p
        node["next"] = self.tail
        self.tail["prev"] = node
`);
  const [testOutput, setTestOutput] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(false);

  // Viva Interactive State
  const [vivaAnswer1, setVivaAnswer1] = useState(
    'I combined a doubly-linked list with a hash map. The hash map provides O(1) key-to-node lookup, while the doubly-linked list allows constant-time O(1) insertion at the tail and eviction from the head without array shifting.'
  );
  const [vivaAnswer2, setVivaAnswer2] = useState('');
  const [vivaSubmitted, setVivaSubmitted] = useState(false);

  // Run Code Simulation
  const handleRunCode = () => {
    setIsExecuting(true);
    setTestOutput(null);
    setTimeout(() => {
      setIsExecuting(false);
      setTestOutput({
        passed: 4,
        total: 4,
        runtime: '18 ms',
        memory: '14.2 MB',
        details: [
          { name: 'Test Case 1: Standard Put & Get', status: 'Passed', time: '4ms' },
          { name: 'Test Case 2: Capacity Eviction of LRU Item', status: 'Passed', time: '3ms' },
          { name: 'Test Case 3: Overwrite Existing Key & Refresh Recency', status: 'Passed', time: '5ms' },
          { name: 'Test Case 4: O(1) High-Frequency Operations', status: 'Passed', time: '6ms' },
        ],
      });
    }, 600);
  };

  const handleSubmitAssessment = () => {
    setAssessmentSubmitted(true);
    setTimeout(() => {
      setActiveTab('results');
    }, 800);
  };

  const studentTabs = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses & Syllabus', icon: BookOpen },
    { id: 'path', label: 'Adaptive Learning Path', icon: GitFork, badge: 'Adaptive' },
    { id: 'assessment', label: 'Coding Assessment', icon: Code2, badge: '🔴 REC' },
    { id: 'results', label: 'Results & Feedback', icon: FileCheck2 },
    { id: 'viva', label: 'Code Viva Questions', icon: MessageSquareCode, badge: 'New' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 flex flex-col font-sans">
      <PortalNavbar
        currentRole={ROLES.STUDENT}
        tabs={studentTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        {/* ========================================================
            TAB 1: STUDENT DASHBOARD / OVERVIEW
            ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Welcome Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/80 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/60 text-xs font-semibold text-zinc-300 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Verified Student • {user?.studentId || 'STU-2026-042'}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                  Welcome back, {user?.name || 'Alex Chen'}
                </h1>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  Your personalized adaptive track has detected strengths in Data Structures and
                  flagged <span className="text-amber-400 font-semibold">Dynamic Programming</span> for
                  targeted remediation.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab('assessment')}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-zinc-950 text-xs font-bold hover:bg-zinc-200 transition shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Start Active Assessment (LRU Cache)</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('path')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold border border-zinc-700/60 transition"
                  >
                    <GitFork className="w-3.5 h-3.5" />
                    <span>View Adaptive Skill Tree</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <div className="text-xs text-zinc-400 mb-1 flex items-center justify-between">
                  <span>Learning Path Progress</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-white">68%</div>
                <div className="mt-2 h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: '68%' }} />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <div className="text-xs text-zinc-400 mb-1 flex items-center justify-between">
                  <span>Concept Mastery Index</span>
                  <Sparkles className="w-4 h-4 text-zinc-300" />
                </div>
                <div className="text-2xl font-bold text-white">88.4%</div>
                <span className="text-[11px] text-emerald-400 font-medium">Advanced Competency</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <div className="text-xs text-zinc-400 mb-1 flex items-center justify-between">
                  <span>Weak Concepts Flagged</span>
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-amber-400">2 Topics</div>
                <span className="text-[11px] text-zinc-400">DP & Concurrency</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <div className="text-xs text-zinc-400 mb-1 flex items-center justify-between">
                  <span>Daily Coding Streak</span>
                  <Flame className="w-4 h-4 text-orange-400" />
                </div>
                <div className="text-2xl font-bold text-white">14 Days</div>
                <span className="text-[11px] text-zinc-400">All sessions replay recorded</span>
              </div>
            </div>

            {/* Concept Mastery & Weak Topics Alert */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Concept Mastery Radar List */}
              <div className="lg:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
                    Concept Mastery Breakdown
                  </h3>
                  <span className="text-xs text-zinc-500">Updated from last assessment</span>
                </div>

                <div className="space-y-3.5">
                  {[
                    { topic: 'Arrays, Hash Tables & Two Pointers', score: 96, status: 'Mastered' },
                    { topic: 'Binary Search Trees & Heaps', score: 91, status: 'Mastered' },
                    { topic: 'Graph Traversal (BFS / DFS)', score: 79, status: 'Proficient' },
                    { topic: 'Concurrency & Locking Primitives', score: 54, status: 'Needs Review' },
                    { topic: 'Dynamic Programming (Memoization)', score: 48, status: 'Weak Topic' },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-zinc-200">{item.topic}</span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[11px] px-2 py-0.5 rounded ${
                              item.score >= 85
                                ? 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                                : 'bg-amber-950/70 text-amber-400 border border-amber-800/80'
                            }`}
                          >
                            {item.status} ({item.score}%)
                          </span>
                        </div>
                      </div>
                      <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            item.score >= 85
                              ? 'bg-white'
                              : item.score >= 70
                              ? 'bg-zinc-400'
                              : 'bg-amber-400'
                          }`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Box: Weak Topic Remediation */}
              <div className="rounded-2xl border border-amber-900/40 bg-amber-950/20 p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Adaptive Recommendation</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">
                    Dynamic Programming Bridge Module
                  </h4>
                  <p className="text-xs text-zinc-300/80 leading-relaxed">
                    The platform tracer detected repeated edge-case errors in overlapping subproblems.
                    Complete this 20-minute guided lab to unlock higher tier assessments.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-amber-900/30">
                  <button
                    onClick={() => setActiveTab('path')}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-400 text-zinc-950 text-xs font-bold hover:bg-amber-300 transition"
                  >
                    <span>Open Remediation Path</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Coding Assessments & Recent Feedback */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming / Active Assessments */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300 mb-4">
                  Assigned Coding Assessments
                </h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">LRU Cache Implementation</span>
                        <span className="text-[10px] bg-emerald-950/80 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                          Active Now
                        </span>
                      </div>
                      <div className="text-xs text-zinc-400 mt-1">
                        Hard • 45 mins • Keystroke replay enabled
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('assessment')}
                      className="px-3.5 py-1.5 rounded-lg bg-white text-zinc-950 text-xs font-bold hover:bg-zinc-200 transition"
                    >
                      Start Test
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between opacity-80">
                    <div>
                      <div className="font-bold text-sm text-zinc-300">
                        Concurrent Thread-Safe Bounded Queue
                      </div>
                      <div className="text-xs text-zinc-500 mt-1">
                        Advanced • Unlocks tomorrow at 10:00 AM
                      </div>
                    </div>
                    <span className="text-xs text-zinc-500 px-3 py-1 rounded bg-zinc-800">
                      Locked
                    </span>
                  </div>
                </div>
              </div>

              {/* Trainer Feedback & Viva Preview */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
                    Recent Trainer Feedback
                  </h3>
                  <button
                    onClick={() => setActiveTab('results')}
                    className="text-xs text-zinc-400 hover:text-white underline underline-offset-4"
                  >
                    View All
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-white">Dr. Elena Vance (Trainer)</span>
                    <span className="text-zinc-500">Yesterday on Trie Prefix Tree</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed italic">
                    "Great typing cadence and zero pasted blocks. The memory footprint in your Trie node
                    allocation was optimal. Please review the oral viva question regarding memory pooling."
                  </p>
                  <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-[11px] text-emerald-400 font-semibold">Score: 95/100</span>
                    <button
                      onClick={() => setActiveTab('viva')}
                      className="text-xs text-zinc-300 hover:text-white font-semibold flex items-center gap-1"
                    >
                      <span>Answer Viva Question</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: MY COURSES & SYLLABUS
            ======================================================== */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <h2 className="text-2xl font-bold text-white">Enrolled Syllabus & Curriculum</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Batch 2026-A • Core Computer Systems & Scalable Algorithms
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300">
                Semester 2 / 4
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Module 1: Advanced Linear Structures & Hashing',
                  lessons: [
                    { name: 'Doubly Linked Lists & Sentinel Nodes', completed: true },
                    { name: 'Hash Collision Strategies (Open Addressing)', completed: true },
                    { name: 'O(1) Eviction Mechanics (LRU / LFU)', completed: true },
                  ],
                  progress: 100,
                  status: 'Completed',
                },
                {
                  title: 'Module 2: Non-Linear Hierarchies & Heaps',
                  lessons: [
                    { name: 'Self-Balancing Trees (AVL vs Red-Black)', completed: true },
                    { name: 'Binary Heap Min-Max Priority Queues', completed: true },
                    { name: 'Trie Structures & Predictive Search', completed: false },
                  ],
                  progress: 66,
                  status: 'In Progress',
                },
                {
                  title: 'Module 3: Dynamic Programming & Graphs',
                  lessons: [
                    { name: 'Top-down Memoization vs Bottom-up Tabulation', completed: false },
                    { name: 'Shortest Path Algorithms (Dijkstra, Bellman-Ford)', completed: false },
                    { name: 'Topological Sort in Dependency Graphs', completed: false },
                  ],
                  progress: 25,
                  status: 'Active Remediation',
                },
              ].map((mod, i) => (
                <div key={i} className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                        Track {i + 1}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                        {mod.status}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-4">{mod.title}</h3>

                    <div className="space-y-2 mb-6">
                      {mod.lessons.map((lesson, lIdx) => (
                        <div
                          key={lIdx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs"
                        >
                          <span className={lesson.completed ? 'text-zinc-300' : 'text-zinc-500'}>
                            {lesson.name}
                          </span>
                          {lesson.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <Clock className="w-4 h-4 text-zinc-600 shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                      <span>Module Progress</span>
                      <span className="font-bold text-white">{mod.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full" style={{ width: `${mod.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: ADAPTIVE LEARNING PATH (SKILL TREE)
            ======================================================== */}
        {activeTab === 'path' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <h2 className="text-2xl font-bold text-white">Dynamic Adaptive Skill Path</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Roadmap continuously recalculated by ReplayEd's Bayesian knowledge tracer.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-white" /> Mastered
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Remediation Bridge
                </span>
                <span className="flex items-center gap-1.5 text-zinc-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" /> Locked
                </span>
              </div>
            </div>

            {/* Interactive Visual Skill Map */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6 sm:p-8 space-y-6">
              {[
                {
                  level: 'Foundational Phase (100% Mastered)',
                  nodes: [
                    { title: 'Time/Space Complexity O(1) vs O(N)', score: '98%', status: 'done' },
                    { title: 'Pointers & Memory Allocation', score: '95%', status: 'done' },
                    { title: 'Recursive Call Stack Frames', score: '92%', status: 'done' },
                  ],
                },
                {
                  level: 'Intermediate Phase (Current Active Zone)',
                  nodes: [
                    { title: 'Doubly Linked LRU Cache Structure', score: 'Active', status: 'current' },
                    { title: 'Memoization Overlapping Subproblems', score: '48% (Weak)', status: 'remediation' },
                    { title: 'Bottom-Up Tabulation Matrix', score: 'Next', status: 'locked' },
                  ],
                },
                {
                  level: 'Advanced Mastery Phase',
                  nodes: [
                    { title: 'Distributed Raft Consensus Log', score: 'Locked', status: 'locked' },
                    { title: 'Zero-Copy IO Buffer Pipelines', score: 'Locked', status: 'locked' },
                  ],
                },
              ].map((tier, tIdx) => (
                <div key={tIdx} className="space-y-3">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    {tier.level}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {tier.nodes.map((node, nIdx) => (
                      <div
                        key={nIdx}
                        className={`p-4 rounded-2xl border transition-all ${
                          node.status === 'done'
                            ? 'bg-zinc-900 border-zinc-700 text-white'
                            : node.status === 'remediation'
                            ? 'bg-amber-950/30 border-amber-600/80 text-amber-200 shadow-md shadow-amber-950/20'
                            : node.status === 'current'
                            ? 'bg-white text-zinc-950 border-white font-bold'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-600'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-mono text-[10px]">NODE 0{tIdx + 1}-{nIdx + 1}</span>
                          <span className="font-bold">{node.score}</span>
                        </div>
                        <div className="text-sm font-semibold">{node.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: CODING ASSESSMENT & ONLINE CODE EDITOR
            ======================================================== */}
        {activeTab === 'assessment' && (
          <div className="space-y-4">
            {/* Assessment Header & Telemetry Recording Status */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 gap-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                </span>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>LIVE SESSION REPLAY ACTIVE</span>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      (Keystrokes & Hesitations Time-Indexed)
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Candidate: {user?.name || 'Alex Chen'} • 0 paste events flagged • Normal cadence (72 WPM)
                  </div>
                </div>
              </div>

              {/* Language Switcher & Run Controls */}
              <div className="flex items-center gap-2.5">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-zinc-800 text-xs font-semibold text-zinc-200 px-3 py-1.5 rounded-xl border border-zinc-700 focus:outline-none"
                >
                  <option value="python">Python 3.11</option>
                  <option value="javascript">JavaScript (Node v20)</option>
                  <option value="cpp">C++ 20</option>
                </select>

                <button
                  onClick={handleRunCode}
                  disabled={isExecuting}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold border border-zinc-600 transition"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isExecuting ? 'Running Tests...' : 'Run Code'}</span>
                </button>

                <button
                  onClick={handleSubmitAssessment}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-white text-zinc-950 text-xs font-bold hover:bg-zinc-200 transition shadow-sm"
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>Submit Assessment</span>
                </button>
              </div>
            </div>

            {/* Split Pane: Problem Prompt (Left) + Code Editor (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Problem Prompt */}
              <div className="lg:col-span-5 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 font-sans space-y-4 max-h-[580px] overflow-y-auto">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Assessment Task #14
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">Time Remaining: 34:12</span>
                </div>

                <h3 className="text-xl font-bold text-white">
                  Design an LRU Cache with O(1) Operations
                </h3>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  Design a data structure that follows the constraints of a{' '}
                  <strong className="text-white">Least Recently Used (LRU) cache</strong>.
                </p>

                <div className="space-y-2 text-xs text-zinc-300">
                  <div className="font-semibold text-white">Implement the LRUCache class:</div>
                  <ul className="list-disc list-inside space-y-1 text-zinc-400">
                    <li><code className="text-zinc-200">LRUCache(int capacity)</code> Initialize with positive size capacity.</li>
                    <li><code className="text-zinc-200">int get(int key)</code> Return value of key if exists, otherwise return -1.</li>
                    <li><code className="text-zinc-200">void put(int key, int value)</code> Update value if key exists, otherwise add. When capacity exceeded, evict the least recently used key.</li>
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs space-y-1 font-mono">
                  <div className="text-zinc-400 font-bold font-sans">Example 1:</div>
                  <div className="text-zinc-300">lru = LRUCache(2)</div>
                  <div className="text-zinc-300">lru.put(1, 1); lru.put(2, 2);</div>
                  <div className="text-zinc-300">lru.get(1); // returns 1</div>
                  <div className="text-zinc-300">lru.put(3, 3); // evicts key 2</div>
                </div>

                <div className="text-xs text-zinc-500">
                  <strong>Constraint:</strong> Both <code className="text-zinc-400">get</code> and{' '}
                  <code className="text-zinc-400">put</code> must run in O(1) average time complexity.
                </div>
              </div>

              {/* In-Browser Interactive Code Editor */}
              <div className="lg:col-span-7 flex flex-col rounded-2xl border border-zinc-800 bg-[#0d0d10] overflow-hidden">
                {/* Editor Header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-zinc-950 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                    <span className="font-mono text-zinc-300">solution.py</span>
                  </div>
                  <span className="text-[11px] text-zinc-500">Keystroke Telemetry Logger Active</span>
                </div>

                {/* Live Code Textarea with Line Counter */}
                <div className="relative flex-1 p-3 font-mono text-xs text-zinc-200 min-h-[360px] bg-[#0d0d10]">
                  <textarea
                    value={codeContent}
                    onChange={(e) => setCodeContent(e.target.value)}
                    spellCheck="false"
                    className="w-full h-full bg-transparent resize-none focus:outline-none leading-relaxed font-mono text-xs text-zinc-200"
                    rows={18}
                  />
                </div>

                {/* Test Output Console */}
                {testOutput && (
                  <div className="border-t border-zinc-800 bg-zinc-950 p-4 font-mono text-xs">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800 text-zinc-400">
                      <span className="font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        All {testOutput.total} Test Cases Passed!
                      </span>
                      <span>Runtime: {testOutput.runtime} • Memory: {testOutput.memory}</span>
                    </div>

                    <div className="space-y-1 text-[11px]">
                      {testOutput.details.map((t, idx) => (
                        <div key={idx} className="flex items-center justify-between text-zinc-300">
                          <span>{t.name}</span>
                          <span className="text-emerald-400 font-semibold">{t.status} ({t.time})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5: TEST RESULTS, FEEDBACK & CONCEPT MASTERY
            ======================================================== */}
        {activeTab === 'results' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <h2 className="text-2xl font-bold text-white">Assessment Results & Diagnostics</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Submission ID: #SUB-8921 • Evaluated with Full Keystroke Replay
                </p>
              </div>
              <span className="text-sm font-bold px-3 py-1 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
                Score: 96 / 100
              </span>
            </div>

            {/* Scorecard Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div className="text-xs text-zinc-400 mb-1">Algorithmic Efficiency</div>
                <div className="text-2xl font-bold text-white">O(1) Time</div>
                <div className="text-[11px] text-emerald-400 mt-1">Optimal space complexity achieved</div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div className="text-xs text-zinc-400 mb-1">Replay Integrity Score</div>
                <div className="text-2xl font-bold text-emerald-400">100% Genuine</div>
                <div className="text-[11px] text-zinc-400 mt-1">0 external block paste flags</div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div className="text-xs text-zinc-400 mb-1">Trainer Feedback Status</div>
                <div className="text-2xl font-bold text-white">Verified</div>
                <div className="text-[11px] text-zinc-400 mt-1">Signed by Dr. Elena Vance</div>
              </div>
            </div>

            {/* Trainer Written Review & Time Annotations */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
                Trainer Written Notes & Time-Indexed Review
              </h3>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Dr. Elena Vance</span>
                  <span className="text-zinc-500">Annotation at replay timestamp 06:14</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  "Candidate Alex demonstrated clean implementation of dummy sentinel nodes for the
                  doubly-linked list, eliminating edge-case null pointer checks. No paste events were
                  detected; typing cadence reflected genuine step-by-step problem-solving."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 6: CODE EXPLANATION / VIVA QUESTIONS
            ======================================================== */}
        {activeTab === 'viva' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <h2 className="text-2xl font-bold text-white">Code Explanation & Viva Voce</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Answer conceptual oral/written questions to verify true comprehension of your code submission.
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300">
                2 Questions Required
              </span>
            </div>

            {/* Question 1 */}
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-zinc-300" />
                <span>Question 1: Data Structure Trade-offs</span>
              </div>
              <h3 className="text-base font-bold text-white">
                Why did you use a doubly-linked list combined with a hash map instead of a single array or single linked list?
              </h3>
              <textarea
                value={vivaAnswer1}
                onChange={(e) => setVivaAnswer1(e.target.value)}
                rows={4}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3.5 text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-500 leading-relaxed"
              />
              <div className="flex items-center justify-between text-[11px] text-zinc-500">
                <span>Evaluates: Conceptual understanding of O(1) eviction vs array shifting</span>
                <span className="text-emerald-400 font-semibold">Self-Evaluation: High Clarity</span>
              </div>
            </div>

            {/* Question 2 */}
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-zinc-300" />
                <span>Question 2: Concurrency & Edge Cases</span>
              </div>
              <h3 className="text-base font-bold text-white">
                If this LRU cache is accessed simultaneously by multiple worker threads, how would you prevent race conditions during node eviction?
              </h3>
              <textarea
                value={vivaAnswer2}
                onChange={(e) => setVivaAnswer2(e.target.value)}
                placeholder="Type your explanation here (e.g. read-write locks, mutex on head/tail, atomic pointers)..."
                rows={4}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3.5 text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-500 leading-relaxed"
              />
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-zinc-500">Evaluates: Thread safety & system concurrency</span>
                <button
                  onClick={() => setVivaSubmitted(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-zinc-950 text-xs font-bold hover:bg-zinc-200 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{vivaSubmitted ? 'Viva Answer Submitted!' : 'Submit Viva Answer'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
