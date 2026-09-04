import React from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, BookOpen, RotateCcw, Award, Star, Mic, Sparkles, BookMarked } from 'lucide-react';
import { UserProgress } from '../types';

interface NavbarProps {
  progress: UserProgress;
  currentMode?: string;
  onToggleSound: () => void;
  onToggleVoice: () => void;
  onOpenTeacherGuide: () => void;
  onOpenCertificate: () => void;
  onOpenGlossary: () => void;
  onResetProgress: () => void;
  onChangeName: (name: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  progress,
  currentMode = 'intro',
  onToggleSound,
  onToggleVoice,
  onOpenTeacherGuide,
  onOpenCertificate,
  onOpenGlossary,
  onResetProgress,
  onChangeName
}) => {
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [tempName, setTempName] = React.useState(progress.studentName);

  React.useEffect(() => {
    setTempName(progress.studentName);
  }, [progress.studentName]);

  const isIntro = currentMode === 'intro';

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      onChangeName(tempName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-300 ${
      isIntro
        ? 'bg-slate-950/90 backdrop-blur-md border-b-2 border-cyan-500/60 shadow-[0_0_25px_rgba(6,182,212,0.3)] text-white'
        : 'bg-white border-b border-amber-200 shadow-sm'
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Skill */}
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
            isIntro
              ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.8)]'
              : 'bg-amber-500 text-white shadow-md shadow-amber-200'
          }`}>
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`text-xl font-bold tracking-tight font-display transition-colors ${
                isIntro ? 'text-white neon-text-glow' : 'text-slate-900'
              }`}>
                Fábrica de Dados e Informação
              </h1>
              <span className={`hidden sm:inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                isIntro
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-400/50 shadow-[0_0_8px_rgba(6,182,212,0.4)]'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}>
                BNCC EF03CO04
              </span>
            </div>
            <p className={`text-xs ${isIntro ? 'text-cyan-200/70 font-medium' : 'text-slate-500'}`}>
              3º Ano do Ensino Fundamental • Computação na Escola
            </p>
          </div>
        </div>

        {/* Student Name & Points */}
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          {/* Name Tag */}
          <div className={`rounded-xl px-3 py-1.5 flex items-center gap-2 border transition-colors ${
            isIntro
              ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-200'
              : 'bg-amber-50 border-amber-200 text-slate-800'
          }`}>
            <span className={`text-xs font-bold uppercase tracking-wider ${
              isIntro ? 'text-cyan-400' : 'text-amber-800'
            }`}>
              Estudante:
            </span>
            {isEditingName ? (
              <form onSubmit={handleSaveName} className="flex items-center gap-1">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  maxLength={20}
                  className={`border rounded px-1.5 py-0.5 text-xs font-bold w-28 focus:outline-none focus:ring-2 ${
                    isIntro
                      ? 'bg-slate-900 border-cyan-400 text-white focus:ring-cyan-400'
                      : 'bg-white border-amber-300 text-slate-800 focus:ring-amber-400'
                  }`}
                  autoFocus
                />
                <button
                  type="submit"
                  className={`text-xs px-1.5 py-0.5 rounded font-semibold ${
                    isIntro ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400' : 'bg-amber-500 text-white hover:bg-amber-600'
                  }`}
                >
                  OK
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingName(true)}
                className={`text-xs font-extrabold underline decoration-dotted transition-colors ${
                  isIntro ? 'text-cyan-200 hover:text-white' : 'text-slate-800 hover:text-amber-700'
                }`}
                title="Clique para editar seu nome"
              >
                {progress.studentName || 'Clique p/ nome'}
              </button>
            )}
          </div>

          {/* Stars & Points */}
          <motion.div
            key={progress.stars}
            initial={{ scale: 0.92 }}
            animate={{ scale: [0.92, 1.18, 1] }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 border transition-all ${
              isIntro
                ? 'bg-cyan-950/90 border-cyan-400/60 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'bg-yellow-50 border-yellow-300 text-amber-900 shadow-sm'
            }`}
          >
            <Star className={`w-4 h-4 ${isIntro ? 'fill-cyan-400 text-cyan-300 drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]' : 'fill-amber-400 text-amber-500'} animate-spin-once`} />
            <span className="text-sm font-extrabold">{progress.stars}</span>
            <span className={`text-xs font-medium ${isIntro ? 'text-cyan-200/80' : 'text-amber-700'}`}>estrelas</span>
          </motion.div>

          {/* Action buttons */}
          <div className="flex items-center gap-1">
            {/* Narration toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onToggleVoice}
              className={`p-2 rounded-xl border transition-all text-xs font-medium flex items-center gap-1 ${
                progress.voiceReadEnabled
                  ? isIntro
                    ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.5)] font-bold'
                    : 'bg-sky-100 text-sky-800 border-sky-300 hover:bg-sky-200'
                  : isIntro
                    ? 'bg-slate-900 text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-cyan-300'
                    : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
              }`}
              title={progress.voiceReadEnabled ? 'Voz de leitura ativada' : 'Voz de leitura desativada'}
              aria-label="Voz de leitura em voz alta"
            >
              <Mic className="w-4 h-4" />
              <span className="hidden md:inline text-xs">Voz</span>
            </motion.button>

            {/* Sound toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onToggleSound}
              className={`p-2 rounded-xl border transition-all ${
                progress.soundEnabled
                  ? isIntro
                    ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                    : 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200'
                  : isIntro
                    ? 'bg-slate-900 text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-cyan-300'
                    : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
              }`}
              title={progress.soundEnabled ? 'Sons ativados' : 'Sons desativados'}
              aria-label="Controle de áudio"
            >
              {progress.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </motion.button>

            {/* Certificate */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onOpenCertificate}
              className={`p-2 border rounded-xl transition-all flex items-center gap-1 text-xs font-bold shadow-xs ${
                isIntro
                  ? 'bg-cyan-950 hover:bg-cyan-900 text-cyan-200 border-cyan-500/50'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}
              title="Ver meu Certificado Oficial"
            >
              <Award className={`w-4 h-4 ${isIntro ? 'text-cyan-400' : 'text-emerald-600'}`} />
              <span className="hidden md:inline">Certificado</span>
            </motion.button>

            {/* Glossary */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onOpenGlossary}
              className={`p-2 border rounded-xl transition-all flex items-center gap-1 text-xs font-bold shadow-xs ${
                isIntro
                  ? 'bg-cyan-950 hover:bg-cyan-900 text-cyan-200 border-cyan-500/50'
                  : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border-sky-300'
              }`}
              title="Glossário Ilustrado de Conceitos (Dados, Informação, Sensores...)"
            >
              <BookMarked className={`w-4 h-4 ${isIntro ? 'text-cyan-400' : 'text-sky-600'}`} />
              <span className="hidden md:inline">Glossário</span>
            </motion.button>

            {/* Teacher guide */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onOpenTeacherGuide}
              className={`p-2 border rounded-xl transition-all flex items-center gap-1 text-xs font-bold shadow-xs ${
                isIntro
                  ? 'bg-cyan-950 hover:bg-cyan-900 text-cyan-200 border-cyan-500/50'
                  : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border-indigo-200'
              }`}
              title="Guia Pedagógico do Professor (BNCC)"
            >
              <BookOpen className={`w-4 h-4 ${isIntro ? 'text-cyan-400' : 'text-indigo-600'}`} />
              <span className="hidden md:inline">Professor (BNCC)</span>
            </motion.button>

            {/* Reset */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onResetProgress}
              className={`p-2 rounded-xl transition-all ${
                isIntro
                  ? 'text-slate-500 hover:text-rose-400 hover:bg-slate-900'
                  : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'
              }`}
              title="Reiniciar jogo"
              aria-label="Reiniciar progresso"
            >
              <RotateCcw className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
};
