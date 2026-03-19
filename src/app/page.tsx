import Link from "next/link";

const effects = [
  {
    title: "Particle System",
    desc: "GPU-accelerated particles with mouse interaction. Thousands of points animated via custom shaders.",
    href: "/effects/particles",
    icon: "✨",
    color: "from-violet-500 to-purple-600",
    tech: ["Three.js Points", "Custom Shaders", "GPU Animation"],
  },
  {
    title: "3D Morphing",
    desc: "Smooth geometry morphing between shapes with drag-to-rotate interaction.",
    href: "/effects/morphing",
    icon: "🔮",
    color: "from-cyan-500 to-blue-600",
    tech: ["React Three Fiber", "GSAP", "Geometry Interpolation"],
  },
  {
    title: "Scroll Animations",
    desc: "CSS scroll-timeline driven parallax and entrance animations. Zero JavaScript overhead.",
    href: "/effects/scroll",
    icon: "📜",
    color: "from-amber-500 to-orange-600",
    tech: ["CSS scroll-timeline", "Parallax", "Pure CSS"],
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-4">
          Visual <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Effects</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-xl mx-auto">
          Three cutting-edge web animation techniques. Click to explore.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3 max-w-5xl w-full">
        {effects.map((fx) => (
          <Link
            key={fx.href}
            href={fx.href}
            className="group relative rounded-2xl border border-gray-800 bg-gray-900/60 p-8 hover:border-gray-700 transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`text-5xl mb-4 inline-block bg-gradient-to-br ${fx.color} bg-clip-text`}>
              {fx.icon}
            </div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">{fx.title}</h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">{fx.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {fx.tech.map((t) => (
                <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400">{t}</span>
              ))}
            </div>
            <div className="absolute bottom-4 right-4 text-gray-600 group-hover:text-gray-400 transition-colors text-lg">→</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
