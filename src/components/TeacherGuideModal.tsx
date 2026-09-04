import React, { useState } from 'react';
import { TEACHER_GUIDE_CONTENT } from '../data/gameData';
import { BookOpen, X, CheckCircle2, Lightbulb, Users, FileSpreadsheet, Sparkles } from 'lucide-react';

interface TeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherGuideModal: React.FC<TeacherGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'bncc' | 'unplugged' | 'rubric'>('bncc');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-indigo-200 relative my-8 overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-indigo-700 to-indigo-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-xl">
              <BookOpen className="w-5 h-5 text-indigo-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-indigo-500 text-[10px] font-black tracking-wider uppercase text-indigo-100">
                  BNCC Computação
                </span>
                <span className="text-xs text-indigo-200">Ensino Fundamental Anos Iniciais</span>
              </div>
              <h2 className="text-lg font-bold font-display">
                Guia Pedagógico do Professor • Habilidade {TEACHER_GUIDE_CONTENT.skillCode}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-indigo-600 rounded-xl transition-colors text-indigo-200 hover:text-white"
            aria-label="Fechar Guia"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2 gap-2 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('bncc')}
            className={`px-4 py-2.5 rounded-t-xl transition-colors ${
              activeTab === 'bncc'
                ? 'bg-white text-indigo-700 border-t-2 border-indigo-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Habilidade & Objetivos
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('unplugged')}
            className={`px-4 py-2.5 rounded-t-xl transition-colors ${
              activeTab === 'unplugged'
                ? 'bg-white text-indigo-700 border-t-2 border-indigo-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Atividades Desplugadas (Sala de Aula)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rubric')}
            className={`px-4 py-2.5 rounded-t-xl transition-colors ${
              activeTab === 'rubric'
                ? 'bg-white text-indigo-700 border-t-2 border-indigo-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Rubrica de Avaliação Formativa
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-5 text-slate-700">
          {activeTab === 'bncc' && (
            <div className="space-y-4">
              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4">
                <div className="text-xs font-extrabold text-indigo-900 uppercase tracking-wider mb-1">
                  Enunciado Oficial da BNCC:
                </div>
                <p className="text-sm sm:text-base font-bold text-indigo-950 font-display">
                  ({TEACHER_GUIDE_CONTENT.skillCode}) {TEACHER_GUIDE_CONTENT.skillName}.
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-indigo-700 font-medium">
                  <span className="bg-white/80 px-2 py-0.5 rounded border border-indigo-200">
                    Etapa: {TEACHER_GUIDE_CONTENT.grade}
                  </span>
                  <span className="bg-white/80 px-2 py-0.5 rounded border border-indigo-200">
                    Eixo: {TEACHER_GUIDE_CONTENT.thematicAxis}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  Conceituação Pedagógica
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                  {TEACHER_GUIDE_CONTENT.pedagogicalSummary}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Objetivos de Aprendizagem Específicos
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                  {TEACHER_GUIDE_CONTENT.learningGoals.map((goal, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'unplugged' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Sugestões práticas sem computador ("desplugadas") para os professores realizarem em sala de aula ou no pátio da escola:
              </p>

              <div className="space-y-3">
                {TEACHER_GUIDE_CONTENT.unpluggedActivities.map((act, idx) => (
                  <div key={idx} className="bg-amber-50/50 border border-amber-200 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="p-1.5 bg-amber-200 text-amber-900 rounded-lg text-xs font-black">
                        #{idx + 1}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-sm sm:text-base font-display">
                        {act.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-8">
                      {act.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rubric' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Critérios para observação e registro do desenvolvimento do estudante no 3º ano:
              </p>

              <div className="space-y-3">
                {TEACHER_GUIDE_CONTENT.assessmentRubric.map((r, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border ${
                      idx === 2
                        ? 'bg-emerald-50/70 border-emerald-300'
                        : idx === 1
                        ? 'bg-amber-50/70 border-amber-300'
                        : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                        Nível: {r.level}
                      </span>
                      {idx === 2 && (
                        <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">
                          Meta BNCC
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {r.criteria}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Base Nacional Comum Curricular (MEC / CNE)</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Entendido, Voltar ao Jogo
          </button>
        </div>
      </div>
    </div>
  );
};
