import Link from "next/link";

export default function ParticlesPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">✨ Particle System</h1>
      <p className="text-gray-400 mb-8">Coming soon — GPU-accelerated particles</p>
      <Link href="/" className="text-indigo-400 hover:underline">← Back</Link>
    </div>
  );
}
