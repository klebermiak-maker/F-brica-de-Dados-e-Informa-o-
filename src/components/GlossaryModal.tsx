import React, { useState } from 'react';
import { GLOSSARY_ITEMS } from '../data/gameData';
import { GlossaryItem } from '../types';
import { readAloud } from '../utils/audio';
import {
  BookMarked,
  X,
  Volume2,
  Sparkles,
  Search,
  Hash,
  BookOpen,
  Cpu,
  Zap,
  FileQuestion,
  ShieldCheck,
  Layers,
  HelpCircle,
  Lightbulb
} from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  voiceReadEnabled: boolean;
}

const getTermIcon = (name: string) => {
  switch (name) {
    case 'Hash': return <Hash className="w-5 h-5" />;
    case 'BookOpen': return <BookOpen className="w-5 h-5" />;
    case 'Cpu': return <Cpu className="w-5 h-5" />;
    case 'Zap': return <Zap className="w-5 h-5" />;
    case 'Sparkles': return <Sparkles className="w-5 h-5" />;
    case 'FileQuestion': return <FileQuestion className="w-5 h-5" />;
    case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
    case 'Layers': return <Layers className="w-5 h-5" />;
    default: return <HelpCircle className="w-5 h-5" />;
  }
};

export const GlossaryModal: React.FC<GlossaryModalProps> = ({
  isOpen,
  onClose,
  voiceReadEnabled
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState<'todos' | 'fundamento' | 'processamento' | 'aplicacao'>('todos');

  if (!isOpen) return null;

  const filteredItems = GLOSSARY_ITEMS.filter(item => {
    const matchesTag = activeTag === 'todos' || item.tag === activeTag;
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.simpleDefinition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.analogy.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const handleRead = (item: GlossaryItem) => {
    const textToSpeak = `${item.term}. ${item.simpleDefinition} ${item.analogy}`;
    readAloud(textToSpeak, true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-sky-200 relative my-8 overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-sky-600 to-indigo-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl">
              <BookMarked className="w-6 h-6 text-sky-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-sky-500 text-[10px] font-black tracking-wider uppercase text-sky-100">
                  Dicionário Ilustrado
                </span>
                <span className="text-xs text-sky-200">BNCC EF03CO04</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black font-display tracking-tight">
                Glossário do Cientista de Dados Mirim
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-xl transition-colors text-sky-100 hover:text-white"
            aria-label="Fechar Glossário"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar termo ou palavra..."
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs font-bold scrollbar-none">
            {[
              { id: 'todos', label: 'Todos (8)' },
              { id: 'fundamento', label: 'Fundamentos' },
              { id: 'processamento', label: 'Processamento' },
              { id: 'aplicacao', label: 'No Cotidiano' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTag(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                  activeTag === tab.id
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-sky-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Terms List */}
        <div className="p-4 sm:p-6 max-h-[65vh] overflow-y-auto space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-sm">
              Nenhum termo encontrado com a palavra pesquisada.
            </div>
          ) : (
            filteredItems.map(item => (
              <div
                key={item.id}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-sky-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-sky-100 text-sky-700 rounded-xl">
                      {getTermIcon(item.iconName)}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 font-display">
                        {item.term}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {item.tag === 'fundamento' ? 'Conceito Central' : item.tag === 'processamento' ? 'Engrenagem Digital' : 'Aplicação na Vida'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRead(item)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold rounded-xl border border-sky-200 transition-colors"
                    title="Ouvir explicação"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Ouvir</span>
                  </button>
                </div>

                <p className="text-sm font-semibold text-slate-800 mb-3 leading-relaxed">
                  {item.simpleDefinition}
                </p>

                {/* Analogia infantil */}
                <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 mb-2.5 flex items-start gap-2.5 text-xs text-amber-950">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold uppercase text-[10px] text-amber-700 block mb-0.5">
                      Analogia para Imaginar:
                    </span>
                    <p className="font-medium leading-relaxed">{item.analogy}</p>
                  </div>
                </div>

                {/* Exemplo do mundo real */}
                <div className="text-xs text-slate-600 bg-slate-50 rounded-xl p-2.5 border border-slate-100 font-medium">
                  <span className="font-bold text-slate-700">Na prática: </span>
                  {item.example}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Habilidade BNCC EF03CO04 • Guia de Consulta Rápida</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
