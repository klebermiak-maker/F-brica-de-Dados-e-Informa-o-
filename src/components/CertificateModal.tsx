import React, { useState, useEffect } from 'react';
import { UserProgress } from '../types';
import { BADGES } from '../data/gameData';
import { Award, Printer, X, CheckCircle, Sparkles, Star, ShieldCheck, Heart } from 'lucide-react';
import { triggerGrandCelebration } from '../utils/confetti';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onChangeName: (name: string) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  progress,
  onChangeName
}) => {
  const [editingName, setEditingName] = useState(false);
  const [inputName, setInputName] = useState(progress.studentName);

  useEffect(() => {
    if (isOpen) {
      triggerGrandCelebration();
    }
  }, [isOpen]);

  useEffect(() => {
    setInputName(progress.studentName);
  }, [progress.studentName, isOpen]);

  if (!isOpen) return null;

  const isBadgeUnlocked = (badgeId: string): boolean => {
    if (progress.unlockedBadges?.includes(badgeId)) return true;
    switch (badgeId) {
      case 'badge-first-step':
        return progress.stars > 0 || progress.sortingCompletedCount > 0;
      case 'badge-sorter':
        return progress.sortingCompletedCount > 0;
      case 'badge-machine':
        return progress.machineCompletedCount > 0;
      case 'badge-detective':
        return progress.detectiveCompletedCount > 0;
      case 'badge-creator':
        return (progress.creatorCompletedCount || 0) > 0;
      case 'badge-master':
        return progress.quizScore > 0;
      case 'badge-star-collector':
        return progress.stars >= 15;
      case 'badge-champion':
        return (
          progress.sortingCompletedCount > 0 &&
          progress.machineCompletedCount > 0 &&
          progress.detectiveCompletedCount > 0 &&
          (progress.creatorCompletedCount || 0) > 0 &&
          progress.quizScore > 0
        );
      default:
        return false;
    }
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      onChangeName(inputName.trim());
    }
    setEditingName(false);
  };

  const today = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border-4 border-amber-300 relative my-8 overflow-hidden">
        {/* Modal Toolbar (hidden in print) */}
        <div className="flex items-center justify-between p-4 bg-amber-500 text-white border-b border-amber-600 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-200" />
            <span className="font-extrabold text-sm sm:text-base font-display">
              Certificado de Conquista • BNCC EF03CO04
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 bg-white text-slate-900 hover:bg-amber-50 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs"
              title="Imprimir ou Salvar em PDF"
            >
              <Printer className="w-4 h-4 text-amber-600" />
              <span>Imprimir / PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 hover:bg-amber-600 rounded-xl transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Content */}
        <div id="printable-certificate" className="p-8 sm:p-12 text-center bg-radial from-amber-50/50 via-white to-amber-50/80 relative">
          {/* Certificate Border Frame */}
          <div className="border-4 border-double border-amber-400 p-6 sm:p-10 rounded-2xl relative bg-white/90 shadow-sm">
            {/* Top Ornamental Seal */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full mx-auto flex items-center justify-center text-white shadow-md mb-4 border-2 border-white">
              <Award className="w-8 h-8 sm:w-10 sm:h-10 text-amber-950" />
            </div>

            <div className="inline-block px-3 py-1 bg-amber-100 border border-amber-300 rounded-full text-amber-900 text-xs font-black tracking-widest uppercase mb-2">
              BNCC Computação na Educação Básica
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight font-display mb-1">
              Certificado de Mérito
            </h2>

            <p className="text-xs sm:text-sm font-bold text-amber-700 uppercase tracking-wider mb-6">
              Habilidade EF03CO04 • Cientista de Dados Mirim
            </p>

            <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto mb-3">
              Certificamos com orgulho e alegria que o(a) estudante
            </p>

            {/* Student Name */}
            <div className="my-4">
              {editingName ? (
                <form onSubmit={handleSaveName} className="inline-flex items-center gap-2 print:hidden">
                  <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="border-2 border-amber-400 rounded-xl px-3 py-1 font-display font-extrabold text-xl sm:text-2xl text-slate-900 text-center focus:outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="bg-amber-500 text-white font-bold px-3 py-1 rounded-xl text-sm hover:bg-amber-600"
                  >
                    Salvar
                  </button>
                </form>
              ) : (
                <div
                  onClick={() => setEditingName(true)}
                  className="cursor-pointer group inline-block"
                  title="Clique para alterar seu nome no certificado"
                >
                  <h3 className="text-2xl sm:text-3xl font-black text-amber-900 font-display border-b-2 border-amber-300 pb-1 px-4 inline-block group-hover:text-amber-600 transition-colors">
                    {progress.studentName || 'Estudante Exemplar'}
                  </h3>
                  <span className="text-[10px] text-slate-400 block mt-1 print:hidden group-hover:text-amber-700">
                    (clique para editar o nome)
                  </span>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed mt-4 mb-6">
              completou as jornadas de aprendizagem, compreendendo com excelência que <strong>dados são elementos brutos e soltos</strong> que, quando <strong>organizados e processados em um contexto</strong>, tornam-se <strong>informações valiosas</strong> fundamentais para a tomada de decisões no dia a dia.
            </p>

            {/* Stars & Details */}
            <div className="flex flex-wrap items-center justify-center gap-6 py-4 border-t border-b border-amber-200/80 my-4 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span>{progress.stars} Estrelas Conquistadas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>3º Ano do Ensino Fundamental</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Emitido em: {today}</span>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="mt-8 pt-4 flex items-end justify-between px-4 sm:px-12 text-xs">
              <div className="text-center w-36">
                <div className="border-b border-slate-400 pb-1 font-bold text-slate-800">
                  Professor(a) / Orientador(a)
                </div>
                <span className="text-[10px] text-slate-500">Escola & Educador</span>
              </div>

              <div className="w-14 h-14 rounded-full border-2 border-amber-500 bg-amber-50 flex flex-col items-center justify-center text-amber-800 shadow-inner">
                <Heart className="w-5 h-5 fill-amber-500 text-amber-600" />
                <span className="text-[8px] font-black uppercase">Nota 10</span>
              </div>

              <div className="text-center w-36">
                <div className="border-b border-slate-400 pb-1 font-bold text-slate-800">
                  Cientista Mirim
                </div>
                <span className="text-[10px] text-slate-500">Assinatura do Aluno</span>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Earned Section (hidden in print) */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 print:hidden">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 text-center">
            Medalhas Desbloqueadas na Aventura
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {BADGES.map((b) => {
              const unlocked = isBadgeUnlocked(b.id);
              return (
                <div
                  key={b.id}
                  className={`p-2.5 rounded-xl border text-center shadow-xs transition-all ${
                    unlocked
                      ? 'bg-amber-50/70 border-amber-300 text-slate-800'
                      : 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
                  }`}
                >
                  <span className="text-xl block mb-1">{unlocked ? '🏅' : '🔒'}</span>
                  <div className={`text-xs font-bold leading-tight ${unlocked ? 'text-slate-800' : 'text-slate-500'}`}>
                    {b.title}
                  </div>
                  <div className={`text-[10px] font-semibold mt-0.5 ${unlocked ? 'text-emerald-600 font-bold' : 'text-slate-400'}`}>
                    {unlocked ? 'Conquistada!' : 'Em progresso'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
