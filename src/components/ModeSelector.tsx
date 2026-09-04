import React from 'react';
import { motion } from 'motion/react';
import { GameMode } from '../types';
import { Sparkles, Layers, Cpu, Search, HelpCircle, Award, Wand2 } from 'lucide-react';

interface ModeSelectorProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  completedStatus: {
    sorting: boolean;
    machine: boolean;
    detective: boolean;
    quiz: boolean;
    creator?: boolean;
  };
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  currentMode,
  onSelectMode,
  completedStatus
}) => {
  const steps: { mode: GameMode; label: string; icon: React.ReactNode; completed: boolean; badgeText: string }[] = [
    {
      mode: 'intro',
      label: 'Conceito Inicial',
      icon: <Sparkles className="w-4 h-4" />,
      completed: true,
      badgeText: 'Teoria BNCC'
    },
    {
      mode: 'sorting',
      label: '1. Separador',
      icon: <Layers className="w-4 h-4" />,
      completed: completedStatus.sorting,
      badgeText: '32 Cartões'
    },
    {
      mode: 'machine',
      label: '2. A Máquina',
      icon: <Cpu className="w-4 h-4" />,
      completed: completedStatus.machine,
      badgeText: '10 Cenários'
    },
    {
      mode: 'detective',
      label: '3. Detetive',
      icon: <Search className="w-4 h-4" />,
      completed: completedStatus.detective,
      badgeText: '8 Casos'
    },
    {
      mode: 'creator',
      label: '4. Oficina Criativa',
      icon: <Wand2 className="w-4 h-4" />,
      completed: !!completedStatus.creator,
      badgeText: '6 Temas'
    },
    {
      mode: 'quiz',
      label: '5. Quiz do Mestre',
      icon: <HelpCircle className="w-4 h-4" />,
      completed: completedStatus.quiz,
      badgeText: '12 Questões'
    },
    {
      mode: 'certificate',
      label: '6. Certificado',
      icon: <Award className="w-4 h-4" />,
      completed: completedStatus.sorting && completedStatus.machine,
      badgeText: 'Conquistas'
    }
  ];

  return (
    <nav className="max-w-7xl mx-auto px-4 pt-3 pb-2" aria-label="Fases do Jogo">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {steps.map((step) => {
          const isActive = currentMode === step.mode;
          const isIntro = step.mode === 'intro';
          const activeClasses = isIntro
            ? 'bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 text-white border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.8)] ring-2 ring-cyan-300 font-bold animate-neon-border'
            : 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-200 ring-2 ring-amber-300 font-bold';

          const inactiveClasses = isIntro
            ? 'bg-white text-slate-700 border-cyan-200 hover:border-cyan-400 hover:bg-cyan-50/50 shadow-xs'
            : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 shadow-xs';

          return (
            <motion.button
              key={step.mode}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => onSelectMode(step.mode)}
              className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border transition-all text-left relative overflow-hidden group ${
                isActive ? activeClasses : inactiveClasses
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-white/25 to-cyan-400/0 animate-shimmer pointer-events-none" />
              )}
              <div className="flex items-center justify-between w-full mb-1 relative z-10">
                <span
                  className={`text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded-md ${
                    isActive
                      ? isIntro
                        ? 'bg-cyan-700/60 text-cyan-100 shadow-2xs'
                        : 'bg-amber-600/60 text-amber-100'
                      : isIntro
                        ? 'bg-cyan-50 text-cyan-700 group-hover:bg-cyan-100'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-amber-100'
                  }`}
                >
                  {step.badgeText}
                </span>
                {step.completed && (
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isActive ? 'bg-emerald-200 ring-2 ring-emerald-300 animate-pulse' : 'bg-emerald-500 ring-2 ring-emerald-100'
                    }`}
                    title="Etapa concluída!"
                  />
                )}
              </div>

              <div className="flex items-center gap-1.5 w-full relative z-10">
                <span className={`p-1 rounded-lg transition-transform group-hover:scale-110 ${
                  isActive
                    ? isIntro ? 'bg-cyan-700 text-cyan-100' : 'bg-amber-600 text-white'
                    : isIntro ? 'bg-cyan-100 text-cyan-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {step.icon}
                </span>
                <span className="text-xs font-bold leading-snug truncate">
                  {step.label}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};
