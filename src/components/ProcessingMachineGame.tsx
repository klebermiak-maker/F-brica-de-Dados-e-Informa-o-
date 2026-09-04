import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MACHINE_CHALLENGES } from '../data/gameData';
import { soundManager, readAloud } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';
import {
  Cpu,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Volume2,
  Lightbulb,
  HelpCircle,
  Calendar,
  ThermometerSun,
  Sun,
  MapPin,
  Dog,
  HeartHandshake,
  Scale,
  ShieldCheck,
  Smile,
  Cake,
  Clock,
  Trophy,
  Flame,
  Users,
  Award,
  Rocket,
  Moon,
  Zap,
  BookOpen,
  Bookmark,
  Sprout,
  Bot,
  Droplets,
  Thermometer
} from 'lucide-react';

interface ProcessingMachineGameProps {
  soundEnabled: boolean;
  voiceReadEnabled: boolean;
  onAddStar: (amount: number) => void;
  onCompleteMission: () => void;
  onGoToNextMission: () => void;
}

const getPieceIcon = (name: string) => {
  switch (name) {
    case 'Calendar': return <Calendar className="w-4 h-4" />;
    case 'ThermometerSun': return <ThermometerSun className="w-4 h-4" />;
    case 'Thermometer': return <Thermometer className="w-4 h-4" />;
    case 'Sun': return <Sun className="w-4 h-4" />;
    case 'MapPin': return <MapPin className="w-4 h-4" />;
    case 'Dog': return <Dog className="w-4 h-4" />;
    case 'HeartHandshake': return <HeartHandshake className="w-4 h-4" />;
    case 'Scale': return <Scale className="w-4 h-4" />;
    case 'ShieldCheck': return <ShieldCheck className="w-4 h-4" />;
    case 'Smile': return <Smile className="w-4 h-4" />;
    case 'Cake': return <Cake className="w-4 h-4" />;
    case 'Clock': return <Clock className="w-4 h-4" />;
    case 'Trophy': return <Trophy className="w-4 h-4" />;
    case 'Flame': return <Flame className="w-4 h-4" />;
    case 'Users': return <Users className="w-4 h-4" />;
    case 'Award': return <Award className="w-4 h-4" />;
    case 'Rocket': return <Rocket className="w-4 h-4" />;
    case 'Moon': return <Moon className="w-4 h-4" />;
    case 'Zap': return <Zap className="w-4 h-4" />;
    case 'BookOpen': return <BookOpen className="w-4 h-4" />;
    case 'Bookmark': return <Bookmark className="w-4 h-4" />;
    case 'Sprout': return <Sprout className="w-4 h-4" />;
    case 'Bot': return <Bot className="w-4 h-4" />;
    case 'Droplets': return <Droplets className="w-4 h-4" />;
    default: return <HelpCircle className="w-4 h-4" />;
  }
};

export const ProcessingMachineGame: React.FC<ProcessingMachineGameProps> = ({
  soundEnabled,
  voiceReadEnabled,
  onAddStar,
  onCompleteMission,
  onGoToNextMission
}) => {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);
  const [placedSlots, setPlacedSlots] = useState<Record<string, string>>({}); // slotKey -> pieceId
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [finishedAll, setFinishedAll] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentChallenge = MACHINE_CHALLENGES[challengeIndex];

  // Helper to get which pieces are already placed
  const placedPieceIds = Object.values(placedSlots);
  const availablePieces = currentChallenge.rawItems.filter(p => !placedPieceIds.includes(p.id));

  const allSlotsFilled = currentChallenge.targetSlots.every(slot => placedSlots[slot.key]);

  const handleSelectPiece = (pieceId: string) => {
    soundManager.playPop(soundEnabled);
    if (selectedPieceId === pieceId) {
      setSelectedPieceId(null);
    } else {
      setSelectedPieceId(pieceId);
    }
  };

  const handlePlaceInSlot = (slotKey: string) => {
    soundManager.playPop(soundEnabled);

    // If slot is already filled and no new piece selected, return piece to tray
    if (placedSlots[slotKey] && !selectedPieceId) {
      const next = { ...placedSlots };
      delete next[slotKey];
      setPlacedSlots(next);
      return;
    }

    if (selectedPieceId) {
      setPlacedSlots(prev => ({
        ...prev,
        [slotKey]: selectedPieceId
      }));
      setSelectedPieceId(null);
    }
  };

  const handleRunMachine = () => {
    if (!allSlotsFilled) return;
    setErrorMessage(null);

    // Check correctness
    const hasError = currentChallenge.targetSlots.some(slot => {
      const placedId = placedSlots[slot.key];
      return placedId !== slot.expectedPieceId;
    });

    if (hasError) {
      soundManager.playTryAgain(soundEnabled);
      setErrorMessage('Atenção: alguns dados estão na gaveta errada! Observe a pergunta de cada gaveta e tente novamente.');
      return;
    }

    setIsProcessing(true);
    soundManager.playMachineProcessing(soundEnabled);

    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      soundManager.playSuccess(soundEnabled);
      onAddStar(2);

      if (!completedChallenges.includes(challengeIndex)) {
        setCompletedChallenges(prev => [...prev, challengeIndex]);
        onCompleteMission();
      }

      if (voiceReadEnabled) {
        readAloud(currentChallenge.resultingInformation, true);
      }
    }, 1500);
  };

  const handleSelectChallenge = (index: number) => {
    soundManager.playPop(soundEnabled);
    setChallengeIndex(index);
    setPlacedSlots({});
    setSelectedPieceId(null);
    setIsCompleted(false);
    setFinishedAll(false);
    setErrorMessage(null);
  };

  const handleNextChallenge = () => {
    soundManager.playPop(soundEnabled);
    setErrorMessage(null);
    if (challengeIndex + 1 < MACHINE_CHALLENGES.length) {
      setChallengeIndex(prev => prev + 1);
      setPlacedSlots({});
      setSelectedPieceId(null);
      setIsCompleted(false);
    } else {
      setFinishedAll(true);
      soundManager.playFanfare(soundEnabled);
      triggerConfetti();
      onCompleteMission();
    }
  };

  const handleResetCurrent = () => {
    setPlacedSlots({});
    setSelectedPieceId(null);
    setIsCompleted(false);
    setErrorMessage(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-4">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-4 border border-indigo-200 mb-3 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-indigo-100 text-indigo-800 rounded-xl">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Missão 2: A Máquina de Processamento de Dados
            </h2>
            <p className="text-xs text-slate-500">
              Encaixe dados brutos nas gavetas certas e processe a informação! ({MACHINE_CHALLENGES.length} cenários disponíveis)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-full">
            Cenário {challengeIndex + 1} de {MACHINE_CHALLENGES.length}
          </span>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
            {completedChallenges.length}/{MACHINE_CHALLENGES.length} Resolvidos
          </span>
        </div>
      </div>

      {/* Challenge Navigation Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {MACHINE_CHALLENGES.map((ch, idx) => {
          const isActive = idx === challengeIndex;
          const isDone = completedChallenges.includes(idx);

          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => handleSelectChallenge(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-indigo-50/60'
              }`}
            >
              <span>{idx + 1}.</span>
              <span className="max-w-[120px] truncate">{ch.title.split(':')[0]}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          );
        })}
      </div>

      {!finishedAll ? (
        <div className="space-y-5">
          {/* Scenario Info */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold uppercase">
                {currentChallenge.theme}
              </span>
              <button
                type="button"
                onClick={() => readAloud(`${currentChallenge.title}. ${currentChallenge.story}`, true)}
                className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-bold"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Ouvir História</span>
              </button>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 font-display mb-1">
              {currentChallenge.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {currentChallenge.story}
            </p>
          </div>

          {/* The Machine & Slots */}
          <div className="bg-gradient-to-b from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border-4 border-indigo-700">
            {/* Visual Processing Beam Effect */}
            {isProcessing && (
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                <div className="w-full h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse shadow-lg shadow-cyan-400" />
                <div className="absolute inset-0 bg-cyan-500/10 animate-pulse" />
              </div>
            )}

            {/* Machine Header */}
            <div className="flex items-center justify-between border-b border-indigo-700/60 pb-3 mb-5 relative z-10">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isProcessing ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-indigo-300 flex items-center gap-1.5">
                  <span className={isProcessing ? 'animate-spin-slow inline-block' : 'inline-block'}>⚙️</span>
                  Processador Computacional • Módulo EF03CO04
                </span>
              </div>
              <div className="text-xs text-indigo-300 font-medium">
                {allSlotsFilled ? '✅ Gavetas Prontas!' : 'Encaixe os 4 dados brutos abaixo'}
              </div>
            </div>

            {/* Target Slots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
              {currentChallenge.targetSlots.map((slot) => {
                const placedId = placedSlots[slot.key];
                const placedItem = currentChallenge.rawItems.find(p => p.id === placedId);

                return (
                  <div
                    key={slot.key}
                    onClick={() => !isCompleted && handlePlaceInSlot(slot.key)}
                    className={`rounded-2xl p-3 border-2 transition-all cursor-pointer min-h-[120px] flex flex-col justify-between ${
                      placedItem
                        ? 'bg-indigo-800/80 border-indigo-400 shadow-md ring-2 ring-indigo-400/40'
                        : selectedPieceId
                        ? 'bg-indigo-950/60 border-dashed border-amber-400 animate-pulse hover:bg-indigo-900/60'
                        : 'bg-indigo-950/40 border-dashed border-indigo-700 hover:border-indigo-500'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase text-indigo-300 font-bold block mb-1">
                        Gaveta / Rótulo:
                      </span>
                      <p className="text-xs font-bold text-indigo-100 leading-snug">
                        {slot.label}
                      </p>
                    </div>

                    <div className="mt-2">
                      {placedItem ? (
                        <motion.div
                          initial={{ scale: 0.85, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="bg-white text-slate-900 rounded-xl p-2 flex items-center justify-between shadow-xs"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <span className="text-indigo-600">{getPieceIcon(placedItem.icon)}</span>
                            <span className="text-xs font-black truncate">{placedItem.value}</span>
                          </div>
                          {!isCompleted && (
                            <span className="text-[10px] text-rose-500 font-bold ml-1 hover:underline">
                              Trocar
                            </span>
                          )}
                        </motion.div>
                      ) : (
                        <div className="text-[11px] text-indigo-400 text-center py-2 border border-indigo-800/60 rounded-xl bg-indigo-900/20">
                          {selectedPieceId ? 'Clique para encaixar aqui' : 'Vazio'}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Machine Activation Button / Output */}
            <div className="mt-6 pt-5 border-t border-indigo-800/60 flex flex-col items-center justify-center relative z-10">
              {!isCompleted ? (
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleResetCurrent}
                    disabled={placedPieceIds.length === 0}
                    className="px-3 py-2 rounded-xl text-xs font-bold text-indigo-300 hover:text-white disabled:opacity-30 transition-colors cursor-pointer"
                  >
                    Limpar Gavetas
                  </motion.button>

                  <motion.button
                    whileHover={allSlotsFilled && !isProcessing ? { scale: 1.04 } : {}}
                    whileTap={allSlotsFilled && !isProcessing ? { scale: 0.96 } : {}}
                    type="button"
                    onClick={handleRunMachine}
                    disabled={!allSlotsFilled || isProcessing}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-extrabold text-sm sm:text-base shadow-lg transition-all ${
                      allSlotsFilled && !isProcessing
                        ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-amber-500/20 cursor-pointer animate-pulse-glow-amber'
                        : 'bg-indigo-950 text-indigo-500 border border-indigo-800 cursor-not-allowed'
                    }`}
                  >
                    <Sparkles className={`w-5 h-5 ${isProcessing ? 'animate-spin' : ''}`} />
                    <span>{isProcessing ? 'Processando dados...' : 'Acionar Máquina de Processamento!'}</span>
                  </motion.button>
                </div>
              ) : null}

              {/* Error Message Toast */}
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-3 bg-rose-500/20 border border-rose-400 text-rose-200 rounded-xl text-xs font-bold text-center max-w-lg shadow-md"
                >
                  {errorMessage}
                </motion.div>
              )}

              {isCompleted && (
                /* Information Card Produced by the Machine */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 280 }}
                  className="w-full bg-emerald-950/80 border-2 border-emerald-400 rounded-2xl p-5 text-left shadow-lg"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 animate-bounce" />
                      <span>Processamento Concluído! Informação Gerada:</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => readAloud(currentChallenge.resultingInformation, true)}
                      className="text-xs text-emerald-300 hover:text-white inline-flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Ouvir</span>
                    </button>
                  </div>

                  <p className="text-lg sm:text-xl font-extrabold text-white font-display leading-snug mb-3">
                    "{currentChallenge.resultingInformation}"
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-emerald-800/80 text-xs">
                    <div className="bg-emerald-900/50 p-2.5 rounded-xl border border-emerald-700/60">
                      <span className="font-bold text-emerald-300 block mb-0.5">💡 Por que é Informação?</span>
                      <p className="text-emerald-100">{currentChallenge.whyItIsInformation}</p>
                    </div>
                    <div className="bg-emerald-900/50 p-2.5 rounded-xl border border-emerald-700/60">
                      <span className="font-bold text-amber-300 block mb-0.5">🎯 Decisão Inteligente:</span>
                      <p className="text-emerald-100">{currentChallenge.decisionImpact}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={handleNextChallenge}
                      className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-5 py-2.5 rounded-xl text-sm transition-all cursor-pointer shadow-md"
                    >
                      <span>{challengeIndex + 1 < MACHINE_CHALLENGES.length ? 'Próximo Cenário' : 'Finalizar Missão 2!'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Raw Pieces Tray (Dados Brutos para Organizar) */}
          {!isCompleted && (
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-amber-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-display">
                    Bandeja de Dados Brutos (Clique em um dado e depois na gaveta correspondente):
                  </h4>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {availablePieces.length} dados livres
                </span>
              </div>

              {availablePieces.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {availablePieces.map((piece) => {
                    const isSelected = selectedPieceId === piece.id;

                    return (
                      <motion.button
                        key={piece.id}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        type="button"
                        onClick={() => handleSelectPiece(piece.id)}
                        className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400 border-amber-500 text-slate-950 shadow-md ring-4 ring-amber-200'
                            : 'bg-amber-50/50 hover:bg-amber-100/60 border-amber-200 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-amber-800 uppercase px-1.5 py-0.5 bg-amber-100/80 rounded">
                            {piece.category}
                          </span>
                          <span className="text-amber-700">{getPieceIcon(piece.icon)}</span>
                        </div>
                        <div className="text-sm sm:text-base font-extrabold font-display">
                          {piece.value}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 text-slate-500 text-center text-xs font-semibold">
                  Todos os dados brutos foram colocados nas gavetas! Agora clique no botão amarelo para processar!
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Finished All Challenges Card */
        <div className="bg-white rounded-3xl border-2 border-indigo-300 p-8 text-center shadow-lg animate-in fade-in">
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Cpu className="w-8 h-8 animate-bounce" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 font-display">
            Mestre do Processamento de Dados!
          </h3>

          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto mb-6">
            Você organizou e processou todos os 8 cenários com maestria! Agora você já sabe na prática como os computadores e nós humanos transformamos <strong>dados</strong> em <strong>informações ricas</strong>!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setChallengeIndex(0);
                setPlacedSlots({});
                setSelectedPieceId(null);
                setIsCompleted(false);
                setFinishedAll(false);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Recomeçar Máquina</span>
            </button>

            <button
              type="button"
              onClick={onGoToNextMission}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-extrabold shadow-md shadow-indigo-200 transition-all hover:scale-105"
            >
              <span>Ir para a Missão 3: Detetive Decisor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
