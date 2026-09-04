import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Lightbulb, Play, Volume2, CheckCircle2, Trophy } from 'lucide-react';
import { readAloud } from '../utils/audio';
import { GameMode, UserProgress } from '../types';
import { BadgesGallery } from './BadgesGallery';

interface IntroBannerProps {
  onStartGame: () => void;
  voiceReadEnabled: boolean;
  userProgress: UserProgress;
  onNavigateToMission: (mode: GameMode) => void;
}

export const IntroBanner: React.FC<IntroBannerProps> = ({
  onStartGame,
  voiceReadEnabled,
  userProgress,
  onNavigateToMission
}) => {
  const [activeTab, setActiveTab] = useState<'dados' | 'processamento' | 'informacao'>('dados');

  const introSpeech = `Olá, cientista de dados mirim! Na computação e na nossa vida, um dado é um número, palavra ou símbolo solto, sem contexto. Quando organizamos esses dados, eles viram informação! E com a informação, podemos tomar decisões inteligentes!`;

  return (
    <section className="max-w-6xl mx-auto px-4 py-4">
      {/* Hero Welcome Card in Glowing Neon Blue */}
      <div className="bg-gradient-to-br from-slate-950 via-cyan-950 to-blue-950 rounded-3xl p-6 sm:p-8 text-white border-2 border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.45),inset_0_0_25px_rgba(56,189,248,0.25)] animate-neon-pulse relative overflow-hidden">
        {/* Glowing neon decorative background shapes */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 bg-cyan-400/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-blue-500/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.18),transparent_70%)] pointer-events-none" />
        <div className="absolute top-6 right-16 text-3xl opacity-80 pointer-events-none animate-float-gentle select-none drop-shadow-[0_0_12px_rgba(56,189,248,0.9)]">
          ⚡
        </div>
        <div className="absolute bottom-8 right-32 text-2xl opacity-70 pointer-events-none animate-float-reverse select-none drop-shadow-[0_0_12px_rgba(6,182,212,0.9)]">
          🌐
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 backdrop-blur-md text-cyan-300 text-xs font-black mb-3.5 border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin-once" />
            <span>Habilidade BNCC EF03CO04 • Ensino Fundamental 3º Ano</span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider text-cyan-200">Azul Neon Ativo</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-3 font-display leading-tight text-white">
            Você sabe a diferença entre <br className="hidden sm:inline" />
            <span className="text-cyan-300 neon-text-glow underline decoration-wavy decoration-cyan-400">DADO</span> e{' '}
            <span className="text-emerald-300 neon-text-glow underline decoration-wavy decoration-emerald-400">INFORMAÇÃO</span>?
          </h2>

          <p className="text-cyan-100 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl font-medium drop-shadow-xs">
            Descubra como números, palavras e símbolos soltos se transformam em notícias, avisos e decisões incríveis quando organizados e colocados no contexto certo!
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onStartGame}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 hover:from-cyan-300 hover:to-sky-200 text-slate-950 font-black text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-[0_0_25px_rgba(6,182,212,0.8)] hover:shadow-[0_0_40px_rgba(6,182,212,1)] transition-all cursor-pointer"
            >
              <Play className="w-5 h-5 fill-slate-950 text-slate-950" />
              <span>Jogar Agora as Missões!</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => {
                const el = document.getElementById('galeria-emblemas');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-cyan-200 text-xs sm:text-sm font-extrabold px-4 py-3.5 rounded-2xl border border-cyan-400/80 backdrop-blur-xs shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-cyan-300" />
              <span>Ver Meus Emblemas ({userProgress.unlockedBadges.length || (userProgress.stars > 0 ? 1 : 0)})</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => readAloud(introSpeech, true)}
              className="inline-flex items-center gap-2 bg-cyan-950/70 hover:bg-cyan-900/80 text-cyan-200 text-xs sm:text-sm font-bold px-4 py-3.5 rounded-2xl border border-cyan-500/50 transition-all cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.25)]"
              title="Ouvir explicação em áudio"
            >
              <Volume2 className="w-4 h-4 text-cyan-300" />
              <span>Ouvir com Voz</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* The 3 Pillars Visual Comparison in Glowing Neon Blue */}
      <div className="mt-6 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-cyan-500/70 shadow-[0_0_30px_rgba(6,182,212,0.35)] relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -top-16 -right-16 w-60 h-60 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between flex-wrap gap-2 mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <h3 className="text-lg font-black text-white font-display neon-text-glow">
              A Mágica da Transformação: Entenda em 3 Passos
            </h3>
          </div>
          <span className="text-xs text-cyan-300 font-bold bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            Clique nos passos para ver exemplos
          </span>
        </div>

        {/* Step Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 relative z-10">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => setActiveTab('dados')}
            className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
              activeTab === 'dados'
                ? 'bg-gradient-to-br from-cyan-600 to-blue-700 text-white border-2 border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.6)] ring-2 ring-cyan-400'
                : 'bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700 text-slate-300 hover:border-cyan-500/50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'dados' ? 'text-cyan-100 font-black' : 'text-cyan-400'}`}>
                Passo 1
              </span>
              <span className="text-lg">📦</span>
            </div>
            <h4 className="font-extrabold text-base mb-1 font-display">O que é um DADO?</h4>
            <p className={`text-xs ${activeTab === 'dados' ? 'text-cyan-100' : 'text-slate-400'}`}>
              Elementos brutos e isolados (números, palavras, símbolos sem contexto).
            </p>
          </motion.button>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => setActiveTab('processamento')}
            className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
              activeTab === 'processamento'
                ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-2 border-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.6)] ring-2 ring-blue-400'
                : 'bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700 text-slate-300 hover:border-blue-500/50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'processamento' ? 'text-blue-100 font-black' : 'text-blue-400'}`}>
                Passo 2
              </span>
              <span className="text-lg">⚙️</span>
            </div>
            <h4 className="font-extrabold text-base mb-1 font-display">O Processamento</h4>
            <p className={`text-xs ${activeTab === 'processamento' ? 'text-blue-100' : 'text-slate-400'}`}>
              Organizar, calcular, ordenar e dar significado e rótulo aos dados.
            </p>
          </motion.button>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => setActiveTab('informacao')}
            className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
              activeTab === 'informacao'
                ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-2 border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.6)] ring-2 ring-emerald-400'
                : 'bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700 text-slate-300 hover:border-emerald-500/50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'informacao' ? 'text-emerald-100 font-black' : 'text-emerald-400'}`}>
                Passo 3
              </span>
              <span className="text-lg">💡</span>
            </div>
            <h4 className="font-extrabold text-base mb-1 font-display">A INFORMAÇÃO!</h4>
            <p className={`text-xs ${activeTab === 'informacao' ? 'text-emerald-100' : 'text-slate-400'}`}>
              Resultado com significado que nos ajuda a aprender e tomar decisões.
            </p>
          </motion.button>
        </div>

        {/* Dynamic Interactive Card according to tab */}
        <div className="bg-slate-950/90 border-2 border-cyan-500/40 rounded-2xl p-5 overflow-hidden min-h-[220px] shadow-[inset_0_0_20px_rgba(6,182,212,0.15)] relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'dados' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    Exemplo no dia a dia:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="bg-slate-900/90 p-3 rounded-xl border border-cyan-500/40 text-center shadow-[0_0_10px_rgba(6,182,212,0.15)] hover:border-cyan-300 transition-colors">
                      <span className="text-2xl font-black text-cyan-300 font-display neon-text-glow">"38"</span>
                      <p className="text-[11px] text-cyan-100/70 mt-1">É só um número. É idade? Preço? Graus?</p>
                    </div>
                    <div className="bg-slate-900/90 p-3 rounded-xl border border-cyan-500/40 text-center shadow-[0_0_10px_rgba(6,182,212,0.15)] hover:border-cyan-300 transition-colors">
                      <span className="text-2xl font-black text-cyan-300 font-display neon-text-glow">"Verde"</span>
                      <p className="text-[11px] text-cyan-100/70 mt-1">É apenas uma cor. Maçã? Roupa? Grama?</p>
                    </div>
                    <div className="bg-slate-900/90 p-3 rounded-xl border border-cyan-500/40 text-center shadow-[0_0_10px_rgba(6,182,212,0.15)] hover:border-cyan-300 transition-colors">
                      <span className="text-2xl font-black text-cyan-300 font-display neon-text-glow">"14:00"</span>
                      <p className="text-[11px] text-cyan-100/70 mt-1">Apenas um horário. O que vai acontecer?</p>
                    </div>
                    <div className="bg-slate-900/90 p-3 rounded-xl border border-cyan-500/40 text-center shadow-[0_0_10px_rgba(6,182,212,0.15)] hover:border-cyan-300 transition-colors">
                      <span className="text-2xl font-black text-cyan-300 font-display neon-text-glow">"Pipoca"</span>
                      <p className="text-[11px] text-cyan-100/70 mt-1">Apenas um alimento isolado no ar.</p>
                    </div>
                  </div>
                  <p className="text-xs text-cyan-200 bg-cyan-950/60 p-2.5 rounded-xl border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                    📌 <strong>Regra de ouro:</strong> Um dado sozinho não tem história nem contexto. Você não sabe o que fazer com ele!
                  </p>
                </div>
              )}

              {activeTab === 'processamento' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-blue-300 font-bold text-sm">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                    Como o computador e as pessoas processam dados:
                  </div>
                  <div className="bg-slate-900/90 p-4 rounded-xl border border-blue-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    <div className="text-center sm:text-left">
                      <div className="text-xs font-bold text-slate-400 uppercase">Entrada de Dados</div>
                      <div className="text-sm font-extrabold text-cyan-200">
                        [38] + [Graus Celsius] + [Lucas]
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-950 text-cyan-300 font-extrabold px-3 py-1.5 rounded-full text-xs border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                      <span className="animate-spin-slow">⚙️</span>
                      <span>Processamento & Contexto</span>
                      <ArrowRight className="w-4 h-4 animate-pulse text-cyan-300" />
                    </div>
                    <div className="text-center sm:text-right">
                      <div className="text-xs font-bold text-slate-400 uppercase">Saída</div>
                      <div className="text-sm font-extrabold text-emerald-300 neon-text-glow">
                        Informação com Sentido!
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-cyan-200 bg-blue-950/60 p-2.5 rounded-xl border border-blue-500/50">
                    📌 <strong>Analogia da Cozinha:</strong> Dados são como os ovos, a farinha e o açúcar soltos. O processamento é a receita no forno!
                  </p>
                </div>
              )}

              {activeTab === 'informacao' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    A Informação Pronta para Ajudar na Decisão:
                  </div>
                  <div className="bg-slate-900/90 border-2 border-emerald-400/60 rounded-xl p-4 shadow-[0_0_15px_rgba(16,185,129,0.25)]">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.6)] font-bold">
                        <CheckCircle2 className="w-5 h-5 text-slate-950" />
                      </div>
                      <div>
                        <h5 className="font-extrabold text-emerald-200 text-sm sm:text-base neon-text-glow">
                          "O termômetro mediu 38°C de febre no Lucas, e ele precisa de repouso e água."
                        </h5>
                        <p className="text-xs text-cyan-100/90 mt-1">
                          Agora sim! O dado "38" virou <strong className="text-emerald-300">informação útil</strong>, e os responsáveis podem cuidar da saúde dele!
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-cyan-200 bg-cyan-950/60 p-2.5 rounded-xl border border-cyan-500/50">
                    📌 <strong>Decisão:</strong> A informação nos dá superpoderes para tomar decisões corretas no dia a dia!
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Badges & Achievements Journey Gallery */}
      <div id="galeria-emblemas">
        <BadgesGallery
          userProgress={userProgress}
          onNavigateToMission={onNavigateToMission}
          voiceReadEnabled={voiceReadEnabled}
        />
      </div>
    </section>
  );
};
