import Link from "next/link";
import "./scroll.css";

const sections = [
  {
    title: "Design",
    subtitle: "That Moves",
    desc: "CSS scroll-timeline animations bring your content to life as users scroll — no JavaScript needed.",
    color: "from-violet-500 to-purple-600",
    icon: "🎨",
  },
  {
    title: "Parallax",
    subtitle: "Depth Layers",
    desc: "Multiple layers moving at different speeds create a natural sense of depth and immersion.",
    color: "from-cyan-500 to-blue-600",
    icon: "🌊",
  },
  {
    title: "Entrance",
    subtitle: "Animations",
    desc: "Elements gracefully fade, slide, and scale into view as they enter the viewport.",
    color: "from-amber-500 to-orange-600",
    icon: "✨",
  },
  {
    title: "Zero JS",
    subtitle: "Overhead",
    desc: "Pure CSS implementation means no JavaScript runtime cost, no layout thrashing, butter-smooth 60fps.",
    color: "from-emerald-500 to-green-600",
    icon: "⚡",
  },
];

const cards = [
  { title: "Fade Up", icon: "↑", delay: 0 },
  { title: "Scale In", icon: "⬡", delay: 1 },
  { title: "Slide Right", icon: "→", delay: 2 },
  { title: "Rotate In", icon: "↻", delay: 3 },
  { title: "Blur Reveal", icon: "◎", delay: 4 },
  { title: "Bounce", icon: "◉", delay: 5 },
];

export default function ScrollPage() {
  return (
    <div className="scroll-container">
      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/60">
        <Link href="/" className="text-gray-400 hover:text-white transition-colors">← Back</Link>
        <h1 className="text-lg font-bold">📜 Scroll Animations</h1>
        <div className="w-16" />
      </header>

      {/* Progress bar — scroll-driven */}
      <div className="scroll-progress" />

      {/* Hero with parallax */}
      <section className="parallax-hero">
        <div className="parallax-bg" />
        <div className="parallax-mid" />
        <div className="parallax-fg">
          <h1 className="text-6xl sm:text-8xl font-extrabold tracking-tight mb-4">
            Scroll<br />
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Magic</span>
          </h1>
          <p className="text-xl text-gray-400">↓ Scroll down to see the effects</p>
        </div>
      </section>

      {/* Sections with scroll-driven animations */}
      {sections.map((s, i) => (
        <section key={i} className="scroll-section">
          <div className={`scroll-reveal scroll-reveal-${i % 2 === 0 ? "left" : "right"}`}>
            <span className="text-6xl block mb-6">{s.icon}</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-2">{s.title}</h2>
            <p className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent mb-4`}>
              {s.subtitle}
            </p>
            <p className="text-lg text-gray-400 max-w-md">{s.desc}</p>
          </div>
        </section>
      ))}

      {/* Card grid with staggered entrance */}
      <section className="scroll-section">
        <h2 className="text-4xl font-extrabold text-center mb-12 scroll-reveal scroll-reveal-left">
          Animation <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">Gallery</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto px-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className={`card-entrance card-entrance-${card.delay}`}
            >
              <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6 text-center hover:border-gray-700 transition-all">
                <span className="text-3xl block mb-2">{card.icon}</span>
                <span className="text-sm font-medium text-gray-300">{card.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final section */}
      <section className="scroll-section flex flex-col items-center justify-center text-center">
        <div className="scroll-reveal scroll-reveal-left">
          <h2 className="text-5xl font-extrabold mb-4">
            Pure <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">CSS</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8">No JavaScript was harmed in the making of these animations.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 text-white font-semibold hover:bg-indigo-400 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
