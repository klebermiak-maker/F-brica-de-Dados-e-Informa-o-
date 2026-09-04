import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CREATIVE_THEMES } from '../data/gameData';
import { soundManager, readAloud, stopSpeaking } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';
import {
  Wand2,
  Sparkles,
  Volume2,
  RotateCcw,
  CheckCircle2,
  Cake,
  Trophy,
  Sprout,
  Bot,
  Lightbulb,
  Copy,
  Layers,
  BookOpen,
  Recycle
} from 'lucide-react';

interface CreatorGameProps {
  soundEnabled: boolean;
  voiceReadEnabled: boolean;
  onAddStar: (amount: number) => void;
  onCompleteMission: () => void;
}

const getThemeIcon = (iconName: string) => {
  switch (iconName) {
    case 'Cake': return <Cake className="w-5 h-5" />;
    case 'Trophy': return <Trophy className="w-5 h-5" />;
    case 'Sprout': return <Sprout className="w-5 h-5" />;
    case 'Bot': return <Bot className="w-5 h-5" />;
    case 'BookOpen': return <BookOpen className="w-5 h-5" />;
    case 'Sparkles': return <Recycle className="w-5 h-5" />;
    default: return <Sparkles className="w-5 h-5" />;
  }
};

const SAMPLE_PRESETS: Record<string, Record<string, string>> = {
  festa: {
    evento: 'Festa da Primavera e Talentos',
    data_hora: 'Sexta-feira às 14h30',
    local: 'Pátio Central da Escola',
    atracao: 'Oficina de Robótica e Bolo de Cenoura'
  },
  esporte: {
    esporte: 'Campeonato de Queimada',
    campeao: 'Turma do 3º Ano B',
    placar: '15 a 10 pontos',
    destaque: 'Defesa espetacular da capitã Luísa'
  },
  ciencia: {
    objeto: 'Mudas de Alface Hidropônica',
    medida: 'Cresceu 6 centímetros',
    tempo: 'Em 7 dias com água e luz',
    conclusao: 'Os nutrientes na água aceleraram as folhas'
  },
  robo: {
    nome_robo: 'Robô Curioso Alpha',
    tarefa: 'Organizar 35 livros de histórias',
    bateria: '88% de energia',
    aviso: 'Todos os livros catalogados com sucesso'
  },
  jornal: {
    reporter: 'Sofia e Gabriel do 3º Ano',
    acontecimento: 'Inauguração da Horta Escolar com Plantio de Girassóis',
    local: 'Canteiro ao lado do refeitório',
    mensagem: 'Cuidar das plantas ensina paciência e respeito à vida'
  },
  reciclagem: {
    material: 'Tampinhas plásticas coloridas e caixas de papelão',
    peso: '52 quilos arrecadados',
    destino: 'Cooperativa Recicla Cidade',
    impacto: 'Preservação de recursos naturais e apoio a 15 famílias'
  }
};

export const CreatorGame: React.FC<CreatorGameProps> = ({
  soundEnabled,
  voiceReadEnabled,
  onAddStar,
  onCompleteMission
}) => {
  const [activeThemeId, setActiveThemeId] = useState<string>('festa');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<{
    information: string;
    decision: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const currentTheme = CREATIVE_THEMES.find(t => t.id === activeThemeId) || CREATIVE_THEMES[0];

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handleSelectTheme = (themeId: string) => {
    soundManager.playPop(soundEnabled);
    stopSpeaking();
    setActiveThemeId(themeId);
    setFormData({});
    setGeneratedResult(null);
    setCopied(false);
  };

  const handleInputChange = (key: string, val: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: val
    }));
  };

  const handleApplyPreset = () => {
    soundManager.playPop(soundEnabled);
    const preset = SAMPLE_PRESETS[currentTheme.id];
    if (preset) {
      setFormData(preset);
    }
  };

  const isFormComplete = currentTheme.fields.every(f => (formData[f.key] || '').trim().length > 0);

  const handleGenerate = () => {
    if (!isFormComplete) return;

    setIsProcessing(true);
    soundManager.playMachineProcessing(soundEnabled);

    setTimeout(() => {
      setIsProcessing(false);
      const info = currentTheme.generateSentence(formData);
      const dec = currentTheme.impact;
      setGeneratedResult({
        information: info,
        decision: dec
      });

      soundManager.playSuccess(soundEnabled);
      triggerConfetti();
      onAddStar(3);
      onCompleteMission();

      // Nota: Não fala automaticamente; o aluno pode clicar no botão 'Ouvir' quando desejar
    }, 1400);
  };

  const handleReset = () => {
    stopSpeaking();
    setFormData({});
    setGeneratedResult(null);
    setCopied(false);
  };

  const handleCopy = () => {
    if (!generatedResult) return;
    navigator.clipboard?.writeText(generatedResult.information);
    setCopied(true);
    soundManager.playPop(soundEnabled);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 border border-fuchsia-200 mb-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-fuchsia-100 text-fuchsia-800 rounded-xl">
            <Wand2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Missão 4: Oficina Criativa de Dados e Informação
            </h2>
            <p className="text-xs text-slate-500">
              Digite seus próprios dados brutos e veja como eles se conectam para formar informações com significado!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-fuchsia-800 bg-fuchsia-50 border border-fuchsia-200 px-3 py-1.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-600" />
            Criação Autoral BNCC
          </span>
        </div>
      </div>

      {/* Theme Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-5">
        {CREATIVE_THEMES.map(theme => {
          const isActive = theme.id === activeThemeId;
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => handleSelectTheme(theme.id)}
              className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-fuchsia-50 border-fuchsia-500 shadow-sm ring-2 ring-fuchsia-200'
                  : 'bg-white border-slate-200 hover:border-fuchsia-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`p-1.5 rounded-lg ${isActive ? 'bg-fuchsia-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {getThemeIcon(theme.icon)}
                </span>
                {isActive && <span className="text-[10px] uppercase font-black text-fuchsia-700">Ativo</span>}
              </div>
              <span className="text-xs font-extrabold text-slate-900 font-display line-clamp-2">
                {theme.title}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Raw Data Inputs */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 block">
                Passo 1: Seus Dados Brutos
              </span>
              <h3 className="text-base font-extrabold text-slate-900 font-display">
                {currentTheme.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={handleApplyPreset}
              className="text-xs font-bold text-fuchsia-600 hover:text-fuchsia-800 bg-fuchsia-50 hover:bg-fuchsia-100 px-2.5 py-1.5 rounded-xl transition-colors inline-flex items-center gap-1"
              title="Preenche com um exemplo bacana"
            >
              <Sparkles className="w-3 h-3" />
              <span>Exemplo Rápido</span>
            </button>
          </div>

          <p className="text-xs text-slate-500 mb-4 font-medium leading-relaxed">
            {currentTheme.description}
          </p>

          {/* Form Fields */}
          <div className="space-y-3">
            {currentTheme.fields.map(field => (
              <div key={field.key}>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">
                  📦 {field.label}:
                </label>
                <input
                  type="text"
                  value={formData[field.key] || ''}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200 transition-all font-medium text-slate-900"
                />
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-slate-600 font-bold px-2 py-1"
            >
              Limpar Campos
            </button>

            <motion.button
              whileHover={isFormComplete && !isProcessing ? { scale: 1.04 } : {}}
              whileTap={isFormComplete && !isProcessing ? { scale: 0.96 } : {}}
              type="button"
              onClick={handleGenerate}
              disabled={!isFormComplete || isProcessing}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer ${
                isFormComplete && !isProcessing
                  ? 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white shadow-fuchsia-200 animate-pulse-glow-fuchsia'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Wand2 className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
              <span>{isProcessing ? 'Conectando dados...' : 'Processar e Gerar Informação!'}</span>
            </motion.button>
          </div>
        </div>

        {/* Right Column: Information Synthesis Card */}
        <div className="lg:col-span-6 flex flex-col">
          <AnimatePresence mode="wait">
            {generatedResult ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ type: 'spring', damping: 20, stiffness: 280 }}
                className="bg-gradient-to-br from-fuchsia-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-xl border-4 border-fuchsia-500/60 flex-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-fuchsia-500/40 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-bounce" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-fuchsia-300">
                        Informação Gerada com Sucesso
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => readAloud(generatedResult.information, true)}
                        className="text-xs text-fuchsia-200 hover:text-white inline-flex items-center gap-1 font-bold cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Ouvir</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="text-xs text-fuchsia-200 hover:text-white inline-flex items-center gap-1 font-bold bg-white/10 px-2 py-1 rounded-lg cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                      </button>
                    </div>
                  </div>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
                    📜 Documento / Comunicado Final:
                  </h4>
                  <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/15 mb-4">
                    <p className="text-sm sm:text-base font-medium leading-relaxed font-display text-white whitespace-pre-line">
                      "{generatedResult.information}"
                    </p>
                  </div>

                  {/* Pedagogical Connection */}
                  <div className="space-y-2 text-xs">
                    <div className="bg-fuchsia-950/60 border border-fuchsia-700/60 rounded-xl p-3">
                      <div className="flex items-center gap-1.5 text-amber-300 font-extrabold mb-1">
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>O que os dados viraram?</span>
                      </div>
                      <p className="text-fuchsia-100 font-medium">
                        Os dados soltos que você digitou foram ordenados e contextualizados, transformando-se em uma mensagem completa que qualquer pessoa entende de imediato!
                      </p>
                    </div>

                    <div className="bg-emerald-950/60 border border-emerald-700/60 rounded-xl p-3">
                      <div className="flex items-center gap-1.5 text-emerald-300 font-extrabold mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Ação e Decisão Prática:</span>
                      </div>
                      <p className="text-emerald-100 font-medium">
                        {generatedResult.decision}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-fuchsia-800/60 flex items-center justify-between">
                  <span className="text-xs text-fuchsia-300 font-bold">
                    +3 Estrelas Adicionadas! ⭐
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs text-white font-extrabold bg-fuchsia-600 hover:bg-fuchsia-500 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Criar Outro</span>
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-3xl p-8 text-center flex-1 flex flex-col items-center justify-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-fuchsia-50 text-fuchsia-500 flex items-center justify-center mb-3">
                  <Layers className="w-7 h-7" />
                </div>
                <h4 className="text-base font-extrabold text-slate-800 font-display mb-1">
                  Aguardando Seus Dados
                </h4>
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                  Preencha os campos de dados brutos à esquerda ou clique em <strong>"Exemplo Rápido"</strong> para ver a transformação em informação completa!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
