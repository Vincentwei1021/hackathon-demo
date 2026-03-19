import Link from "next/link";

export default function ScrollPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">📜 Scroll Animations</h1>
      <p className="text-gray-400 mb-8">Coming soon — CSS scroll-driven animations</p>
      <Link href="/" className="text-amber-400 hover:underline">← Back</Link>
    </div>
  );
}
