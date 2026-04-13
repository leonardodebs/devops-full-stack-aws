import { useState, useEffect } from "react";

interface ApiInfo {
  aws_region: string;
  environment: string;
  app_version: string;
}

interface HealthStatus {
  status: string;
  timestamp: string;
}

export default function App() {
  const [info, setInfo] = useState<ApiInfo | null>(null);
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/info").then((res) => res.json()),
      fetch("/api/health").then((res) => res.json()),
    ])
      .then(([infoData, healthData]) => {
        setInfo(infoData as ApiInfo);
        setHealth(healthData as HealthStatus);
        setLoading(false);
      })
      .catch(() => {
        setError("API não disponível");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white scroll-smooth">
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 bg-[#0a0a0f]/80 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-xl">☁️</span>
            </div>
            <span className="text-xl font-bold">DevOps Full Stack</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com" className="text-white/60 hover:text-white transition-colors">GitHub</a>
            <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
              {info?.app_version || "v1.0.0"}
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-purple-500/5" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-white/60">Production Ready</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              PROD-ready
            </span>
            <br />
            <span className="text-white">AWS Infrastructure</span>
          </h1>
          
          <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto">
            Complete DevOps project with Terraform, Docker, GitHub Actions and monitoring.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#architecture" className="px-7 py-3.5 bg-blue-600 rounded-lg hover:bg-blue-500 transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
              Architecture
            </a>
            <a href="#docs" className="px-7 py-3.5 bg-white/10 border border-white/10 rounded-lg hover:bg-white/20 transition-all hover:scale-105">
              Documentation
            </a>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-8 text-white/40 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">☁️</span>
              <span>AWS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏗️</span>
              <span>Terraform</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📦</span>
              <span>Docker</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔄</span>
              <span>GitHub Actions</span>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Architecture</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4" />
          </div>

          <div className="flex justify-center">
            <img 
              src="/desenho-arq-aws.png" 
              alt="AWS Architecture Diagram" 
              className="max-w-full h-auto rounded-2xl shadow-2xl shadow-purple-500/10"
            />
          </div>
</div>
      </section>

      {/* Documentation Section */}
      <section id="docs" className="py-16 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Documentation</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-colors">
              <h3 className="text-xl font-semibold mb-4 text-white">Getting Started</h3>
              <ul className="space-y-3 text-white/60">
                <li>• Clone o repositório</li>
                <li>• Configure AWS credentials</li>
                <li>• Execute terraform init</li>
                <li>• Execute terraform apply</li>
              </ul>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-colors">
              <h3 className="text-xl font-semibold mb-4 text-white">Tech Stack</h3>
              <ul className="space-y-3 text-white/60">
                <li>• AWS ECS Fargate</li>
                <li>• Terraform</li>
                <li>• Docker</li>
                <li>• GitHub Actions</li>
                <li>• CloudWatch</li>
              </ul>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-colors">
              <h3 className="text-xl font-semibold mb-4 text-white">Endpoints</h3>
              <ul className="space-y-3 text-white/60">
                <li>• GET /api/health</li>
                <li>• GET /api/info</li>
              </ul>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-colors">
              <h3 className="text-xl font-semibold mb-4 text-white">Links</h3>
              <ul className="space-y-3 text-white/60">
                <li>• GitHub Repository</li>
                <li>• AWS Console</li>
                <li>• Grafana Dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 flex justify-between text-sm text-white/40">
          <div>AWS ☁️ • Terraform 🏗️ • Docker 📦 • GitHub Actions 🔄</div>
          <div>Env: {info?.environment || '—'} | Region: {info?.aws_region || '—'}</div>
        </div>
      </footer>

      {loading && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}