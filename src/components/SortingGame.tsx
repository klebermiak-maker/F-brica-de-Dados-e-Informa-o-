import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SORTING_ITEMS } from '../data/gameData';
import { SortingItem } from '../types';
import { soundManager, readAloud } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Layers,
  HelpCircle,
  Hash,
  Thermometer,
  Palette,
  TrafficCone,
  Clock,
  Activity,
  FileQuestion,
  BookOpen,
  CloudDrizzle,
  Umbrella,
  Bus,
  Trophy,
  BatteryCharging,
  Moon,
  Apple,
  ShoppingBag,
  Filter,
  Shuffle,
  Sprout
} from 'lucide-react';

interface SortingGameProps {
  soundEnabled: boolean;
  voiceReadEnabled: boolean;
  onAddStar: (amount: number) => void;
  onCompleteMission: () => void;
  onGoToNextMission: () => void;
}

// Icon helper to avoid dynamic component issues
const getIcon = (name: string) => {
  switch (name) {
    case 'Hash': return <Hash className="w-8 h-8" />;
    case 'Thermometer': return <Thermometer className="w-8 h-8" />;
    case 'Palette': return <Palette className="w-8 h-8" />;
    case 'TrafficCone': return <TrafficCone className="w-8 h-8" />;
    case 'Clock': return <Clock className="w-8 h-8" />;
    case 'Activity': return <Activity className="w-8 h-8" />;
    case 'FileQuestion': return <FileQuestion className="w-8 h-8" />;
    case 'BookOpen': return <BookOpen className="w-8 h-8" />;
    case 'CloudDrizzle': return <CloudDrizzle className="w-8 h-8" />;
    case 'Umbrella': return <Umbrella className="w-8 h-8" />;
    case 'Bus': return <Bus className="w-8 h-8" />;
    case 'Trophy': return <Trophy className="w-8 h-8" />;
    case 'BatteryCharging': return <BatteryCharging className="w-8 h-8" />;
    case 'Moon': return <Moon className="w-8 h-8" />;
    case 'Apple': return <Apple className="w-8 h-8" />;
    case 'ShoppingBag': return <ShoppingBag className="w-8 h-8" />;
    case 'Sprout': return <Sprout className="w-8 h-8" />;
    case 'Sparkles': return <Sparkles className="w-8 h-8" />;
    default: return <HelpCircle className="w-8 h-8" />;
  }
};

type ThemeFilter = 'todos' | 'escola' | 'ciencia' | 'cotidiano' | 'esporte';

export const SortingGame: React.FC<SortingGameProps> = ({
  soundEnabled,
  voiceReadEnabled,
  onAddStar,
  onCompleteMission,
  onGoToNextMission
}) => {
  const [selectedFilter, setSelectedFilter] = useState<ThemeFilter>('todos');
  const [cardOrder, setCardOrder] = useState<SortingItem[]>(SORTING_ITEMS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  // Filter items based on active tab
  const items = selectedFilter === 'todos'
    ? cardOrder
    : cardOrder.filter(item => item.themeGroup === selectedFilter);

  const currentItem = items[currentIndex] || items[0];

  const handleShuffle = () => {
    soundManager.playPop(soundEnabled);
    const shuffled = [...cardOrder].sort(() => Math.random() - 0.5);
    setCardOrder(shuffled);
    setCurrentIndex(0);
    setAnswered(false);
    setIsCorrect(false);
    setGameFinished(false);
  };

  const handleFilterChange = (filter: ThemeFilter) => {
    soundManager.playPop(soundEnabled);
    setSelectedFilter(filter);
    setCurrentIndex(0);
    setAnswered(false);
    setIsCorrect(false);
    setGameFinished(false);
  };

  const handleClassify = (choice: 'dado' | 'informacao') => {
    if (answered) return;

    const correct = currentItem.type === choice;
    setIsCorrect(correct);
    setAnswered(true);

    if (correct) {
      soundManager.playSuccess(soundEnabled);
      setCorrectCount(prev => prev + 1);
      onAddStar(1);
    } else {
      soundManager.playTryAgain(soundEnabled);
    }

    if (voiceReadEnabled) {
      readAloud(currentItem.explanation, true);
    }
  };

  const handleNext = () => {
    soundManager.playPop(soundEnabled);
    setAnswered(false);
    if (currentIndex + 1 < items.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setGameFinished(true);
      soundManager.playFanfare(soundEnabled);
      triggerConfetti();
      onCompleteMission();
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswered(false);
    setIsCorrect(false);
    setCorrectCount(0);
    setGameFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-4 border border-amber-200 mb-3 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Missão 1: Separador de Dados e Informação
            </h2>
            <p className="text-xs text-slate-500">
              Analise o cartão e decida: é um <strong>Dado Bruto</strong> ou uma <strong>Informação</strong>? (32 cartões no total)
            </p>
          </div>
        </div>

        {/* Counter and Shuffle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShuffle}
            className="text-xs font-bold text-slate-600 hover:text-amber-700 bg-slate-100 hover:bg-amber-100 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors border border-slate-200"
            title="Embaralhar os cartões para praticar em ordem diferente"
          >
            <Shuffle className="w-3.5 h-3.5 text-amber-600" />
            <span>Embaralhar</span>
          </button>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
            Cartão {currentIndex + 1} de {items.length}
          </span>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            {correctCount} acertos
          </span>
        </div>
      </div>

      {/* Theme Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 text-xs font-bold scrollbar-none">
        <div className="flex items-center gap-1 text-slate-500 pr-1 shrink-0">
          <Filter className="w-3.5 h-3.5" />
          <span>Filtro Temático:</span>
        </div>
        {[
          { id: 'todos', label: 'Todos os 32 Cartões' },
          { id: 'cotidiano', label: 'Cotidiano & Casa' },
          { id: 'escola', label: 'Escola & Recreio' },
          { id: 'ciencia', label: 'Ciência & Tecnologia' },
          { id: 'esporte', label: 'Esportes & Jogos' }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleFilterChange(tab.id as ThemeFilter)}
            className={`px-3 py-1.5 rounded-xl transition-all shrink-0 ${
              selectedFilter === tab.id
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-amber-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Progress Line */}
      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden mb-5">
        <div
          className="bg-amber-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + (answered ? 1 : 0)) / items.length) * 100}%` }}
        />
      </div>

      {!gameFinished && currentItem ? (
        <div className="bg-white rounded-3xl border-2 border-amber-200 p-6 sm:p-8 shadow-sm text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {/* Top Category Badge */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                  <span>Tipo:</span>
                  <span className="capitalize">{currentItem.category.replace('_', ' ')}</span>
                </span>
                {currentItem.themeGroup && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-100/80 text-amber-800 text-xs font-semibold uppercase tracking-wider">
                    {currentItem.themeGroup}
                  </span>
                )}
              </div>

              {/* Central Item Display */}
              <div className="my-4 min-h-[160px] flex flex-col items-center justify-center p-6 rounded-2xl bg-amber-50/40 border border-amber-200/70 relative">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [0.8, 1.1, 1] }}
                  transition={{ duration: 0.3 }}
                  className="p-3 rounded-2xl bg-white shadow-xs text-amber-600 mb-3"
                >
                  {getIcon(currentItem.iconName)}
                </motion.div>

                <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 leading-relaxed font-display max-w-xl">
                  "{currentItem.content}"
                </p>

                {/* Read Aloud Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => readAloud(currentItem.content, true)}
                  className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-100 text-slate-600 text-xs font-semibold rounded-full border border-slate-200 shadow-xs transition-colors cursor-pointer"
                  title="Ouvir o texto em voz alta"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Ouvir Cartão</span>
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Decision Buttons */}
          {!answered ? (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => handleClassify('dado')}
                className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base shadow-md shadow-amber-200 transition-all cursor-pointer"
              >
                <span className="text-2xl">📦</span>
                <div className="text-left">
                  <div className="leading-tight">É UM DADO BRUTO</div>
                  <div className="text-xs font-medium text-amber-100">Elemento solto, sem contexto</div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => handleClassify('informacao')}
                className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-md shadow-emerald-200 transition-all cursor-pointer"
              >
                <span className="text-2xl">💡</span>
                <div className="text-left">
                  <div className="leading-tight">É UMA INFORMAÇÃO</div>
                  <div className="text-xs font-medium text-emerald-100">Tem sentido, história e contexto</div>
                </div>
              </motion.button>
            </div>
          ) : (
            /* Pedagogical Feedback Card */
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className={`mt-6 p-5 rounded-2xl border-2 text-left ${
                isCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-rose-50 border-rose-300'
              }`}
            >
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5 animate-bounce" />
                ) : (
                  <XCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <h4 className={`text-base font-extrabold ${isCorrect ? 'text-emerald-900' : 'text-rose-900'}`}>
                    {isCorrect ? '🎉 Parabéns! Você acertou em cheio!' : '💡 Ops! Quase lá! Veja a explicação:'}
                  </h4>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Classificação Correta:{' '}
                    <span className="text-slate-900 font-extrabold">
                      {currentItem.type === 'dado' ? '📦 DADO BRUTO' : '💡 INFORMAÇÃO'}
                    </span>
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed pt-1 font-medium">
                    {currentItem.explanation}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 font-bold px-5 py-2.5 rounded-xl text-sm transition-all cursor-pointer"
                >
                  <span>{currentIndex + 1 < items.length ? 'Próximo Cartão' : 'Ver Resultado da Missão'}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        /* Mission Completed Card */
        <div className="bg-white rounded-3xl border-2 border-emerald-300 p-8 text-center shadow-lg animate-in fade-in">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 animate-bounce" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 font-display">
            Missão 1 Concluída com Sucesso!
          </h3>

          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto mb-6">
            Você analisou todos os cartões desta etapa e já sabe muito bem distinguir um <strong>dado bruto</strong> de uma <strong>informação contextualizada</strong>!
          </p>

          <div className="inline-flex items-center gap-4 bg-emerald-50 border border-emerald-200 rounded-2xl px-6 py-3 mb-6">
            <div>
              <div className="text-xs text-emerald-700 font-bold uppercase">Seu Desempenho no Filtro</div>
              <div className="text-2xl font-black text-emerald-900 font-display">
                {correctCount} de {items.length} Corretos
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Jogar Novamente</span>
            </button>

            <button
              type="button"
              onClick={onGoToNextMission}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-extrabold shadow-md shadow-amber-200 transition-all hover:scale-105"
            >
              <span>Ir para a Missão 2: A Máquina</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
