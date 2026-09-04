import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GameMode, UserProgress } from './types';
import { Navbar } from './components/Navbar';
import { ModeSelector } from './components/ModeSelector';
import { IntroBanner } from './components/IntroBanner';
import { SortingGame } from './components/SortingGame';
import { ProcessingMachineGame } from './components/ProcessingMachineGame';
import { DetectiveDecisionGame } from './components/DetectiveDecisionGame';
import { CreatorGame } from './components/CreatorGame';
import { QuizGame } from './components/QuizGame';
import { CertificateModal } from './components/CertificateModal';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { GlossaryModal } from './components/GlossaryModal';

const DEFAULT_PROGRESS: UserProgress = {
  score: 0,
  stars: 0,
  studentName: 'Cientista Mirim',
  soundEnabled: true,
  voiceReadEnabled: true,
  sortingCompletedCount: 0,
  machineCompletedCount: 0,
  detectiveCompletedCount: 0,
  creatorCompletedCount: 0,
  quizScore: 0,
  unlockedBadges: []
};

function computeUnlockedBadges(p: UserProgress, extraBadge?: string): string[] {
  const set = new Set(p.unlockedBadges || []);
  if (extraBadge) set.add(extraBadge);
  if (p.stars > 0 || p.sortingCompletedCount > 0) set.add('badge-first-step');
  if (p.stars >= 15) set.add('badge-star-collector');
  if (p.sortingCompletedCount > 0) set.add('badge-sorter');
  if (p.machineCompletedCount > 0) set.add('badge-machine');
  if (p.detectiveCompletedCount > 0) set.add('badge-detective');
  if ((p.creatorCompletedCount || 0) > 0) set.add('badge-creator');
  if (p.quizScore > 0) set.add('badge-master');
  if (
    p.sortingCompletedCount > 0 &&
    p.machineCompletedCount > 0 &&
    p.detectiveCompletedCount > 0 &&
    (p.creatorCompletedCount || 0) > 0 &&
    p.quizScore > 0
  ) {
    set.add('badge-champion');
  }
  return Array.from(set);
}

export default function App() {
  const [currentMode, setCurrentMode] = useState<GameMode>('intro');
  const [progress, setProgress] = useState<UserProgress>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ef03co04_game_progress');
        if (saved) {
          const parsed = JSON.parse(saved);
          const merged: UserProgress = {
            ...DEFAULT_PROGRESS,
            ...parsed,
            unlockedBadges: Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges : []
          };
          merged.unlockedBadges = computeUnlockedBadges(merged);
          return merged;
        }
      } catch {
        // Ignore local storage error
      }
    }
    return DEFAULT_PROGRESS;
  });

  const [isTeacherGuideOpen, setIsTeacherGuideOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('ef03co04_game_progress', JSON.stringify(progress));
    } catch {
      // Ignore
    }
  }, [progress]);

  const handleToggleSound = () => {
    setProgress(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const handleToggleVoice = () => {
    setProgress(prev => ({ ...prev, voiceReadEnabled: !prev.voiceReadEnabled }));
  };

  const handleAddStar = (amount: number) => {
    setProgress(prev => {
      const newStars = prev.stars + amount;
      const newScore = prev.score + amount * 10;
      const updated: UserProgress = {
        ...prev,
        stars: newStars,
        score: newScore
      };
      updated.unlockedBadges = computeUnlockedBadges(updated);
      return updated;
    });
  };

  const handleChangeName = (newName: string) => {
    setProgress(prev => ({ ...prev, studentName: newName }));
  };

  const handleConfirmReset = () => {
    setProgress(DEFAULT_PROGRESS);
    setCurrentMode('intro');
    setIsResetConfirmOpen(false);
  };

  // Completed status for mode badges
  const completedStatus = {
    sorting: progress.sortingCompletedCount > 0,
    machine: progress.machineCompletedCount > 0,
    detective: progress.detectiveCompletedCount > 0,
    creator: (progress.creatorCompletedCount || 0) > 0,
    quiz: progress.quizScore > 0
  };

  const isIntro = currentMode === 'intro';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
      isIntro
        ? 'bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950'
        : 'bg-amber-50/40 text-slate-800'
    }`}>
      {/* Header */}
      <Navbar
        progress={progress}
        currentMode={currentMode}
        onToggleSound={handleToggleSound}
        onToggleVoice={handleToggleVoice}
        onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onResetProgress={() => setIsResetConfirmOpen(true)}
        onChangeName={handleChangeName}
      />

      {/* Background Floating Ambient Particles & Cyber Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {isIntro ? (
          <>
            <div className="absolute -top-12 left-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-neon-pulse" />
            <div className="absolute top-1/3 right-4 w-[32rem] h-[32rem] bg-blue-600/20 rounded-full blur-3xl animate-float-reverse" />
            <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl animate-float-gentle" />
            <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
          </>
        ) : (
          <>
            <div className="absolute top-12 left-6 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl animate-float-gentle" />
            <div className="absolute top-1/3 right-8 w-44 h-44 bg-sky-200/25 rounded-full blur-3xl animate-float-reverse" />
            <div className="absolute bottom-16 left-1/4 w-52 h-52 bg-emerald-200/20 rounded-full blur-3xl animate-float-gentle" />
          </>
        )}
      </div>

      {/* Stage Navigator */}
      <div className={isIntro ? 'py-1' : ''}>
        <ModeSelector
          currentMode={currentMode}
          onSelectMode={setCurrentMode}
          completedStatus={completedStatus}
        />
      </div>

      {/* Main Stage View */}
      <main className="flex-1 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMode}
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.99 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {currentMode === 'intro' && (
              <IntroBanner
                onStartGame={() => setCurrentMode('sorting')}
                userProgress={progress}
                onNavigateToMission={(mode) => setCurrentMode(mode)}
                voiceReadEnabled={progress.voiceReadEnabled}
              />
            )}

            {currentMode === 'sorting' && (
              <SortingGame
                soundEnabled={progress.soundEnabled}
                voiceReadEnabled={progress.voiceReadEnabled}
                onAddStar={handleAddStar}
                onCompleteMission={() => {
                  setProgress(prev => {
                    const updated = {
                      ...prev,
                      sortingCompletedCount: prev.sortingCompletedCount + 1
                    };
                    updated.unlockedBadges = computeUnlockedBadges(updated, 'badge-sorter');
                    return updated;
                  });
                }}
                onGoToNextMission={() => setCurrentMode('machine')}
              />
            )}

            {currentMode === 'machine' && (
              <ProcessingMachineGame
                soundEnabled={progress.soundEnabled}
                voiceReadEnabled={progress.voiceReadEnabled}
                onAddStar={handleAddStar}
                onCompleteMission={() => {
                  setProgress(prev => {
                    const updated = {
                      ...prev,
                      machineCompletedCount: prev.machineCompletedCount + 1
                    };
                    updated.unlockedBadges = computeUnlockedBadges(updated, 'badge-machine');
                    return updated;
                  });
                }}
                onGoToNextMission={() => setCurrentMode('detective')}
              />
            )}

            {currentMode === 'detective' && (
              <DetectiveDecisionGame
                soundEnabled={progress.soundEnabled}
                voiceReadEnabled={progress.voiceReadEnabled}
                onAddStar={handleAddStar}
                onCompleteMission={() => {
                  setProgress(prev => {
                    const updated = {
                      ...prev,
                      detectiveCompletedCount: prev.detectiveCompletedCount + 1
                    };
                    updated.unlockedBadges = computeUnlockedBadges(updated, 'badge-detective');
                    return updated;
                  });
                }}
                onGoToNextMission={() => setCurrentMode('creator')}
              />
            )}

            {currentMode === 'creator' && (
              <CreatorGame
                soundEnabled={progress.soundEnabled}
                voiceReadEnabled={progress.voiceReadEnabled}
                onAddStar={handleAddStar}
                onCompleteMission={() => {
                  setProgress(prev => {
                    const updated = {
                      ...prev,
                      creatorCompletedCount: (prev.creatorCompletedCount || 0) + 1
                    };
                    updated.unlockedBadges = computeUnlockedBadges(updated, 'badge-creator');
                    return updated;
                  });
                }}
              />
            )}

            {currentMode === 'quiz' && (
              <QuizGame
                soundEnabled={progress.soundEnabled}
                voiceReadEnabled={progress.voiceReadEnabled}
                onAddStar={handleAddStar}
                onCompleteMission={(finalScore) => {
                  setProgress(prev => {
                    const updated = {
                      ...prev,
                      quizScore: finalScore
                    };
                    updated.unlockedBadges = computeUnlockedBadges(updated, 'badge-master');
                    return updated;
                  });
                }}
                onOpenCertificate={() => setIsCertificateOpen(true)}
              />
            )}

            {currentMode === 'certificate' && (
              <div className="max-w-4xl mx-auto px-4 text-center py-8">
                <div className="bg-white p-8 rounded-3xl border border-amber-200 shadow-sm max-w-xl mx-auto">
                  <span className="text-4xl block mb-3 animate-bounce">🎓</span>
                  <h2 className="text-2xl font-bold font-display text-slate-900 mb-2">
                    Área do Certificado de Mérito
                  </h2>
                  <p className="text-sm text-slate-600 mb-6 font-medium">
                    Você pode visualizar, personalizar seu nome e imprimir seu Certificado Oficial da Habilidade BNCC EF03CO04 a qualquer momento!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setProgress(prev => {
                        const updated = { ...prev };
                        updated.unlockedBadges = computeUnlockedBadges(updated, 'badge-champion');
                        return updated;
                      });
                      setIsCertificateOpen(true);
                    }}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-md shadow-emerald-200 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Abrir e Imprimir Certificado
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer with Educational References */}
      <footer className={`mt-auto py-4 text-center text-xs transition-colors duration-300 ${
        isIntro
          ? 'border-t-2 border-cyan-500/40 bg-slate-950/90 text-cyan-200/80 shadow-[0_-5px_20px_rgba(6,182,212,0.15)]'
          : 'border-t border-amber-200/80 bg-white/70 text-slate-600'
      }`}>
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className={`font-semibold ${isIntro ? 'text-cyan-100' : 'text-slate-700'}`}>
            Fábrica de Dados e Informação • Alinhado às Diretrizes Curriculares Nacionais de Computação (BNCC)
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsGlossaryOpen(true)}
              className={`font-bold hover:underline ${isIntro ? 'text-cyan-400 hover:text-cyan-300' : 'text-sky-700'}`}
            >
              Glossário Ilustrado
            </button>
            <span className={isIntro ? 'text-cyan-800' : 'text-slate-300'}>•</span>
            <button
              type="button"
              onClick={() => setIsTeacherGuideOpen(true)}
              className={`font-bold hover:underline ${isIntro ? 'text-sky-300 hover:text-sky-200' : 'text-indigo-700'}`}
            >
              Guia BNCC EF03CO04
            </button>
          </div>
        </div>
      </footer>

      {/* Reset Confirmation In-App Dialog (No blocking window.confirm) */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border-2 border-rose-500/80 rounded-3xl p-6 max-w-md w-full shadow-[0_0_30px_rgba(244,63,94,0.35)] text-white text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-rose-950/80 border border-rose-500/60 flex items-center justify-center text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.4)]">
              <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="text-xl font-bold font-display text-white mb-2">
              Reiniciar o Progresso?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              Isso zerará as estrelas conquistadas, medalhas e o histórico de missões concluídas. Tem certeza de que quer recomeçar sua jornada?
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black shadow-[0_0_15px_rgba(244,63,94,0.5)] transition-all cursor-pointer"
              >
                Sim, Reiniciar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        progress={progress}
        onChangeName={handleChangeName}
      />

      <TeacherGuideModal
        isOpen={isTeacherGuideOpen}
        onClose={() => setIsTeacherGuideOpen(false)}
      />

      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        voiceReadEnabled={progress.voiceReadEnabled}
      />
    </div>
  );
}
