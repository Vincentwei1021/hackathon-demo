import Link from "next/link";

export default function MorphingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">🔮 3D Morphing</h1>
      <p className="text-gray-400 mb-8">Coming soon — geometry morphing with GSAP</p>
      <Link href="/" className="text-cyan-400 hover:underline">← Back</Link>
    </div>
  );
}
