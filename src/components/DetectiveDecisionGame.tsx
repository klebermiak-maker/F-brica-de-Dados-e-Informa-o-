import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DETECTIVE_CASES } from '../data/gameData';
import { soundManager, readAloud } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';
import {
  Search,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Volume2,
  Sparkles,
  ThermometerSun,
  SunMedium,
  Trees,
  Users,
  Apple,
  ShoppingBag,
  AlertTriangle,
  Navigation,
  Clock,
  HelpCircle,
  Sprout,
  Droplets,
  BatteryLow,
  Zap,
  Bookmark,
  LayoutGrid,
  Wind,
  Trophy
} from 'lucide-react';

interface DetectiveDecisionGameProps {
  soundEnabled: boolean;
  voiceReadEnabled: boolean;
  onAddStar: (amount: number) => void;
  onCompleteMission: () => void;
  onGoToNextMission: () => void;
}

const getClueIcon = (name: string) => {
  switch (name) {
    case 'ThermometerSun': return <ThermometerSun className="w-5 h-5" />;
    case 'SunMedium': return <SunMedium className="w-5 h-5" />;
    case 'Trees': return <Trees className="w-5 h-5" />;
    case 'Users': return <Users className="w-5 h-5" />;
    case 'Apple': return <Apple className="w-5 h-5" />;
    case 'ShoppingBag': return <ShoppingBag className="w-5 h-5" />;
    case 'AlertTriangle': return <AlertTriangle className="w-5 h-5" />;
    case 'Navigation': return <Navigation className="w-5 h-5" />;
    case 'Clock': return <Clock className="w-5 h-5" />;
    case 'Sprout': return <Sprout className="w-5 h-5" />;
    case 'Droplets': return <Droplets className="w-5 h-5" />;
    case 'BatteryLow': return <BatteryLow className="w-5 h-5" />;
    case 'Zap': return <Zap className="w-5 h-5" />;
    case 'Bookmark': return <Bookmark className="w-5 h-5" />;
    case 'LayoutGrid': return <LayoutGrid className="w-5 h-5" />;
    case 'Wind': return <Wind className="w-5 h-5" />;
    case 'Trophy': return <Trophy className="w-5 h-5" />;
    default: return <HelpCircle className="w-5 h-5" />;
  }
};

export const DetectiveDecisionGame: React.FC<DetectiveDecisionGameProps> = ({
  soundEnabled,
  voiceReadEnabled,
  onAddStar,
  onCompleteMission,
  onGoToNextMission
}) => {
  const [caseIndex, setCaseIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [finishedAll, setFinishedAll] = useState(false);
  const [solvedCases, setSolvedCases] = useState<number[]>([]);

  const currentCase = DETECTIVE_CASES[caseIndex];

  const handleSelectOption = (optId: string) => {
    if (answered) return;

    setSelectedOptionId(optId);
    setAnswered(true);

    const chosen = currentCase.options.find(o => o.id === optId);
    if (chosen?.isCorrect) {
      soundManager.playSuccess(soundEnabled);
      onAddStar(2);
      if (!solvedCases.includes(caseIndex)) {
        setSolvedCases(prev => [...prev, caseIndex]);
        onCompleteMission();
      }
    } else {
      soundManager.playTryAgain(soundEnabled);
    }

    if (voiceReadEnabled && chosen) {
      readAloud(chosen.feedback, true);
    }
  };

  const handleSelectCase = (idx: number) => {
    soundManager.playPop(soundEnabled);
    setCaseIndex(idx);
    setAnswered(false);
    setSelectedOptionId(null);
    setFinishedAll(false);
  };

  const handleNextCase = () => {
    soundManager.playPop(soundEnabled);
    setAnswered(false);
    setSelectedOptionId(null);

    if (caseIndex + 1 < DETECTIVE_CASES.length) {
      setCaseIndex(prev => prev + 1);
    } else {
      setFinishedAll(true);
      soundManager.playFanfare(soundEnabled);
      triggerConfetti();
      onCompleteMission();
    }
  };

  const chosenOption = currentCase.options.find(o => o.id === selectedOptionId);

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      {/* Top Bar */}
      <div className="bg-white rounded-2xl p-4 border border-teal-200 mb-3 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-teal-100 text-teal-800 rounded-xl">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Missão 3: Detetive Decisor dos Dados
            </h2>
            <p className="text-xs text-slate-500">
              A informação serve para nos guiar! Use os fatos para tomar decisões conscientes. ({DETECTIVE_CASES.length} casos investigativos)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-full">
            Caso {caseIndex + 1} de {DETECTIVE_CASES.length}
          </span>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
            {solvedCases.length}/{DETECTIVE_CASES.length} Desvendados
          </span>
        </div>
      </div>

      {/* Case Navigation Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {DETECTIVE_CASES.map((c, idx) => {
          const isActive = idx === caseIndex;
          const isDone = solvedCases.includes(idx);

          return (
            <button
              key={c.id}
              type="button"
              onClick={() => handleSelectCase(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-teal-600 text-white shadow-sm ring-2 ring-teal-300'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-teal-50/60'
              }`}
            >
              <span>Caso {idx + 1}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
            </button>
          );
        })}
      </div>

      {!finishedAll ? (
        <div className="space-y-6">
          {/* Case Narrative */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCase.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl p-6 border-2 border-teal-200 shadow-sm"
            >
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-black uppercase tracking-wider">
                  Investigação em Andamento
                </span>
                <button
                  type="button"
                  onClick={() => readAloud(`${currentCase.title}. ${currentCase.scenario}`, true)}
                  className="inline-flex items-center gap-1 text-xs text-teal-700 hover:text-teal-900 font-bold cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Ouvir Caso</span>
                </button>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display mb-2">
                {currentCase.title}
              </h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed mb-5">
                {currentCase.scenario}
              </p>

              {/* Collected Raw Clues */}
              <div className="mb-5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 font-mono">
                  1. Dados Brutos Coletados pelo Detetive:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {currentCase.rawFacts.map((fact, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-3"
                    >
                      <div className="p-2 bg-white text-teal-600 rounded-lg shadow-xs">
                        {getClueIcon(fact.icon)}
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          {fact.label}
                        </span>
                        <span className="text-xs font-extrabold text-slate-800">
                          {fact.value}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Synthesized Information */}
              <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-extrabold text-teal-800 uppercase tracking-wider">
                    2. A Informação Resultante:
                  </span>
                  <button
                    type="button"
                    onClick={() => readAloud(currentCase.synthesizedInformation, true)}
                    className="text-xs text-teal-700 hover:text-teal-900 font-bold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>Ouvir</span>
                  </button>
                </div>
                <p className="text-sm sm:text-base font-extrabold text-teal-950 font-display">
                  {currentCase.synthesizedInformation}
                </p>
              </div>

              {/* Decision Prompt & Options */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-extrabold flex items-center justify-center">
                    3
                  </span>
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 font-display">
                    {currentCase.decisionPrompt}
                  </h4>
                </div>

                <div className="space-y-3">
                  {currentCase.options.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;
                    let borderClass = 'border-slate-200 hover:border-teal-300 bg-white';

                    if (answered) {
                      if (opt.isCorrect) {
                        borderClass = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 ring-2 ring-emerald-300';
                      } else if (isSelected && !opt.isCorrect) {
                        borderClass = 'border-rose-400 bg-rose-50 text-rose-950';
                      } else {
                        borderClass = 'border-slate-200 opacity-60 bg-slate-50';
                      }
                    } else if (isSelected) {
                      borderClass = 'border-teal-500 bg-teal-50/60 ring-2 ring-teal-200';
                    }

                    return (
                      <motion.button
                        key={opt.id}
                        whileHover={!answered ? { scale: 1.01, x: 2 } : {}}
                        whileTap={!answered ? { scale: 0.99 } : {}}
                        type="button"
                        disabled={answered}
                        onClick={() => handleSelectOption(opt.id)}
                        className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3.5 cursor-pointer ${borderClass}`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {answered && opt.isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 animate-bounce" />
                          )}
                          {answered && isSelected && !opt.isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600" />
                          )}
                          {(!answered || (!opt.isCorrect && !isSelected)) && (
                            <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                          )}
                        </div>
                        <span className="text-sm font-bold text-slate-800 leading-snug">
                          {opt.text}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Answer Feedback & Takeaway */}
              {answered && chosenOption && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 280 }}
                  className={`mt-6 p-5 rounded-2xl border-2 ${
                    chosenOption.isCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-rose-50 border-rose-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {chosenOption.isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5 animate-bounce" />
                    ) : (
                      <XCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h5 className={`font-extrabold text-base ${chosenOption.isCorrect ? 'text-emerald-900' : 'text-rose-900'}`}>
                        {chosenOption.isCorrect ? 'Decisão Brilhante!' : 'Atenção aos Detalhes:'}
                      </h5>
                      <p className="text-sm text-slate-700 font-medium mt-1">
                        {chosenOption.feedback}
                      </p>
                      <div className="mt-3 p-3 bg-white/80 rounded-xl border border-teal-200/80 text-xs font-bold text-teal-900 shadow-xs">
                        💡 Lição do Detetive: {currentCase.learningTakeaway}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={handleNextCase}
                      className="inline-flex items-center gap-2 bg-teal-800 hover:bg-teal-900 text-white font-extrabold px-5 py-2.5 rounded-xl text-sm transition-all cursor-pointer shadow-md"
                    >
                      <span>{caseIndex + 1 < DETECTIVE_CASES.length ? 'Próximo Caso' : 'Finalizar Missão 3'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* Finished All Cases Card */
        <div className="bg-white rounded-3xl border-2 border-teal-300 p-8 text-center shadow-lg animate-in fade-in">
          <div className="w-16 h-16 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 animate-bounce" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 font-display">
            Detetive Graduado com Honras!
          </h3>

          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto mb-6">
            Você resolveu todos os 6 casos práticos e compreendeu a principal utilidade da informação: <strong>nos dar poder para fazer escolhas inteligentes, seguras e justas</strong>!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setCaseIndex(0);
                setAnswered(false);
                setSelectedOptionId(null);
                setFinishedAll(false);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Revisar Casos</span>
            </button>

            <button
              type="button"
              onClick={onGoToNextMission}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-extrabold shadow-md shadow-teal-200 transition-all hover:scale-105"
            >
              <span>Ir para o Quiz Desafio Final</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
