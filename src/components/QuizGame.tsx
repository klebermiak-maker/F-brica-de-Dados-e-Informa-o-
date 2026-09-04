import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_QUESTIONS } from '../data/gameData';
import { soundManager, readAloud } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Volume2,
  Award,
  Sparkles,
  Star
} from 'lucide-react';

interface QuizGameProps {
  soundEnabled: boolean;
  voiceReadEnabled: boolean;
  onAddStar: (amount: number) => void;
  onCompleteMission: (score: number) => void;
  onOpenCertificate: () => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({
  soundEnabled,
  voiceReadEnabled,
  onAddStar,
  onCompleteMission,
  onOpenCertificate
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, boolean>>({});

  const question = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (answered) return;

    setSelectedIdx(idx);
    setAnswered(true);

    const isCorrect = idx === question.correctIndex;
    if (isCorrect) {
      soundManager.playSuccess(soundEnabled);
      setScore(prev => prev + 1);
      onAddStar(2);
    } else {
      soundManager.playTryAgain(soundEnabled);
    }

    setAnsweredQuestions(prev => ({
      ...prev,
      [currentIdx]: isCorrect
    }));

    if (voiceReadEnabled) {
      readAloud(question.explanation, true);
    }
  };

  const handleNext = () => {
    soundManager.playPop(soundEnabled);
    setAnswered(false);
    setSelectedIdx(null);

    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsFinished(true);
      soundManager.playFanfare(soundEnabled);
      triggerConfetti();
      onCompleteMission(score);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedIdx(null);
    setAnswered(false);
    setScore(0);
    setAnsweredQuestions({});
    setIsFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      {/* Quiz Header */}
      <div className="bg-white rounded-2xl p-4 border border-violet-200 mb-3 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-violet-100 text-violet-800 rounded-xl">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Missão 5: Quiz Desafio do Mestre da Computação
            </h2>
            <p className="text-xs text-slate-500">
              Teste o que você aprendeu sobre a habilidade <strong>EF03CO04</strong>! ({QUIZ_QUESTIONS.length} questões formativas)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-violet-800 bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-full">
            Pergunta {currentIdx + 1} de {QUIZ_QUESTIONS.length}
          </span>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            {score} acertos
          </span>
        </div>
      </div>

      {/* Question Indicators */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none">
        {QUIZ_QUESTIONS.map((_, qIndex) => {
          const isCurrent = qIndex === currentIdx;
          const status = answeredQuestions[qIndex];

          return (
            <div
              key={qIndex}
              className={`h-7 px-2.5 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                isCurrent
                  ? 'bg-violet-600 text-white shadow-xs ring-2 ring-violet-300'
                  : status === true
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : status === false
                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                  : 'bg-white text-slate-500 border border-slate-200'
              }`}
            >
              <span>Q{qIndex + 1}</span>
            </div>
          );
        })}
      </div>

      {/* Progress Line */}
      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-5">
        <div
          className="bg-violet-600 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentIdx + (answered ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100}%` }}
        />
      </div>

      {!isFinished ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-3xl border-2 border-violet-200 p-6 sm:p-8 shadow-sm"
          >
            {/* Question skill badge */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-violet-700 bg-violet-50 px-2.5 py-1 rounded-md border border-violet-200">
                {question.focusSkill}
              </span>
              <button
                type="button"
                onClick={() => readAloud(question.question, true)}
                className="text-xs text-violet-700 hover:text-violet-900 font-bold inline-flex items-center gap-1 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Ouvir Pergunta</span>
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display mb-6 leading-snug">
              {question.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((optionText, idx) => {
                const isSelected = selectedIdx === idx;
                const isCorrect = idx === question.correctIndex;
                let btnStyle = 'bg-slate-50/50 hover:bg-violet-50/50 border-slate-200 text-slate-800';

                if (answered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold ring-2 ring-emerald-300';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
                  } else {
                    btnStyle = 'opacity-40 border-slate-200 bg-slate-50';
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    whileHover={!answered ? { scale: 1.01, x: 2 } : {}}
                    whileTap={!answered ? { scale: 0.99 } : {}}
                    type="button"
                    disabled={answered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3 shadow-xs cursor-pointer ${btnStyle}`}
                  >
                    <div className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 font-extrabold text-xs text-slate-700 mt-0.5">
                      {answered && isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 animate-bounce" />
                      ) : answered && isSelected && !isCorrect ? (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      ) : (
                        String.fromCharCode(65 + idx)
                      )}
                    </div>
                    <span className="text-sm sm:text-base font-semibold leading-relaxed pt-0.5">
                      {optionText}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback */}
            {answered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 280 }}
                className={`mt-6 p-4 rounded-2xl border ${
                  selectedIdx === question.correctIndex ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  {selectedIdx === question.correctIndex ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 animate-bounce" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className={`text-sm font-extrabold ${
                      selectedIdx === question.correctIndex ? 'text-emerald-900' : 'text-rose-900'
                    }`}>
                      {selectedIdx === question.correctIndex ? 'Resposta Correta!' : 'Não foi dessa vez!'}
                    </h4>
                    <p className="text-sm text-slate-700 mt-1 leading-relaxed font-medium">
                      {question.explanation}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 bg-violet-700 hover:bg-violet-800 text-white font-extrabold px-5 py-2.5 rounded-xl text-sm transition-all cursor-pointer shadow-md"
                  >
                    <span>{currentIdx + 1 < QUIZ_QUESTIONS.length ? 'Próxima Pergunta' : 'Ver Meu Resultado Final'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        /* Quiz Finished Summary */
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 260 }}
          className="bg-white rounded-3xl border-2 border-violet-300 p-8 text-center shadow-lg"
        >
          <div className="w-20 h-20 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Award className="w-10 h-10 animate-bounce" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 font-display">
            Parabéns! Você concluiu o Quiz com Sucesso!
          </h3>

          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto mb-6">
            Você respondeu às {QUIZ_QUESTIONS.length} questões da habilidade BNCC <strong>EF03CO04</strong> e demonstrou domínio sobre dados, processamento e informação!
          </p>

          <div className="inline-flex items-center gap-6 bg-violet-50 border border-violet-200 rounded-3xl px-8 py-4 mb-6 shadow-xs">
            <div>
              <div className="text-xs text-violet-700 font-bold uppercase tracking-wider">Pontuação do Quiz</div>
              <div className="text-3xl font-black text-violet-900 font-display">
                {score} de {QUIZ_QUESTIONS.length} Acertos
              </div>
            </div>
            <div className="w-px h-10 bg-violet-200" />
            <div>
              <div className="text-xs text-amber-700 font-bold uppercase tracking-wider">Nível Atingido</div>
              <div className="text-xl font-black text-amber-600 font-display">
                {score >= 10 ? '🌟 Cientista Ouro' : score >= 7 ? '⭐ Cientista Prata' : '🌱 Cientista Bronze'}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Tentar Novamente</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onOpenCertificate}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-extrabold shadow-md shadow-emerald-200 transition-all cursor-pointer animate-pulse-glow-emerald"
            >
              <Sparkles className="w-4 h-4" />
              <span>Emitir Meu Certificado Oficial!</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
