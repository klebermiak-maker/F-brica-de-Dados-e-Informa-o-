import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Rocket,
  Layers,
  Cpu,
  Search,
  Wand2,
  Award,
  Star,
  GraduationCap,
  Lock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Volume2,
  RotateCcw,
  Info,
  X,
  Compass
} from 'lucide-react';
import { BADGES } from '../data/gameData';
import { AchievementBadge, GameMode, UserProgress } from '../types';
import { readAloud } from '../utils/audio';

interface BadgesGalleryProps {
  userProgress: UserProgress;
  onNavigateToMission: (mode: GameMode) => void;
  voiceReadEnabled?: boolean;
}

export const BadgesGallery: React.FC<BadgesGalleryProps> = ({
  userProgress,
  onNavigateToMission
}) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedBadge, setSelectedBadge] = useState<AchievementBadge | null>(null);

  // Determine unlock status dynamically based on current user progress metrics
  const isBadgeUnlocked = (badgeId: string): boolean => {
    if (userProgress.unlockedBadges.includes(badgeId)) return true;

    switch (badgeId) {
      case 'badge-first-step':
        return userProgress.stars > 0 || userProgress.sortingCompletedCount > 0;
      case 'badge-sorter':
        return userProgress.sortingCompletedCount > 0;
      case 'badge-machine':
        return userProgress.machineCompletedCount > 0;
      case 'badge-detective':
        return userProgress.detectiveCompletedCount > 0;
      case 'badge-creator':
        return (userProgress.creatorCompletedCount || 0) > 0;
      case 'badge-master':
        return userProgress.quizScore > 0;
      case 'badge-star-collector':
        return userProgress.stars >= 15;
      case 'badge-champion':
        return (
          userProgress.sortingCompletedCount > 0 &&
          userProgress.machineCompletedCount > 0 &&
          userProgress.detectiveCompletedCount > 0 &&
          (userProgress.creatorCompletedCount || 0) > 0 &&
          userProgress.quizScore > 0
        );
      default:
        return false;
    }
  };

  const badgesWithStatus: AchievementBadge[] = BADGES.map((b) => ({
    ...b,
    unlocked: isBadgeUnlocked(b.id)
  }));

  const unlockedCount = badgesWithStatus.filter((b) => b.unlocked).length;
  const totalCount = badgesWithStatus.length;
  const progressPercent = Math.round((unlockedCount / totalCount) * 100);

  const filteredBadges = badgesWithStatus.filter((b) => {
    if (filter === 'unlocked') return b.unlocked;
    if (filter === 'locked') return !b.unlocked;
    return true;
  });

  const getBadgeIcon = (iconName: string, isUnlocked: boolean) => {
    const className = `w-6 h-6 sm:w-7 sm:h-7 ${isUnlocked ? 'text-white' : 'text-slate-400'}`;
    switch (iconName) {
      case 'Rocket':
        return <Rocket className={className} />;
      case 'Layers':
        return <Layers className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'Search':
        return <Search className={className} />;
      case 'Wand2':
        return <Wand2 className={className} />;
      case 'Award':
        return <Award className={className} />;
      case 'Star':
        return <Star className={className} />;
      case 'GraduationCap':
        return <GraduationCap className={className} />;
      default:
        return <Trophy className={className} />;
    }
  };

  const getColorClasses = (colorScheme?: string, unlocked?: boolean) => {
    if (!unlocked) {
      return {
        cardBg: 'bg-slate-900/80 border-slate-700/80 hover:border-cyan-400/50 text-slate-300 shadow-sm',
        iconBg: 'bg-slate-800 text-slate-500 border border-slate-700',
        badgePill: 'bg-slate-800 text-slate-400 border border-slate-700',
        actionBtn: 'bg-slate-800 hover:bg-cyan-900/80 hover:text-cyan-200 text-slate-300 border border-slate-700',
        titleColor: 'text-slate-300 group-hover:text-cyan-200',
        descColor: 'text-slate-400'
      };
    }

    switch (colorScheme) {
      case 'amber':
        return {
          cardBg: 'bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/40 border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/40 text-white',
          iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-[0_0_15px_rgba(245,158,11,0.6)]',
          badgePill: 'bg-amber-950/90 text-amber-300 border border-amber-400/70 shadow-[0_0_8px_rgba(245,158,11,0.3)]',
          actionBtn: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(245,158,11,0.5)]',
          titleColor: 'text-amber-200 group-hover:text-amber-100',
          descColor: 'text-amber-100/80'
        };
      case 'indigo':
        return {
          cardBg: 'bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 border-cyan-400/90 shadow-[0_0_25px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400/50 text-white',
          iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.7)]',
          badgePill: 'bg-cyan-950/90 text-cyan-300 border border-cyan-400/70 shadow-[0_0_8px_rgba(6,182,212,0.4)]',
          actionBtn: 'bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-black shadow-[0_0_15px_rgba(6,182,212,0.7)]',
          titleColor: 'text-cyan-200 group-hover:text-cyan-100',
          descColor: 'text-cyan-100/80'
        };
      case 'teal':
        return {
          cardBg: 'bg-gradient-to-br from-slate-900 via-slate-950 to-teal-950/40 border-teal-400/80 shadow-[0_0_20px_rgba(20,184,166,0.25)] ring-1 ring-teal-400/40 text-white',
          iconBg: 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-[0_0_15px_rgba(20,184,166,0.6)]',
          badgePill: 'bg-teal-950/90 text-teal-300 border border-teal-400/70 shadow-[0_0_8px_rgba(20,184,166,0.3)]',
          actionBtn: 'bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(20,184,166,0.5)]',
          titleColor: 'text-teal-200 group-hover:text-teal-100',
          descColor: 'text-teal-100/80'
        };
      case 'fuchsia':
        return {
          cardBg: 'bg-gradient-to-br from-slate-900 via-slate-950 to-fuchsia-950/40 border-fuchsia-400/80 shadow-[0_0_20px_rgba(217,70,239,0.25)] ring-1 ring-fuchsia-400/40 text-white',
          iconBg: 'bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white shadow-[0_0_15px_rgba(217,70,239,0.6)]',
          badgePill: 'bg-fuchsia-950/90 text-fuchsia-300 border border-fuchsia-400/70 shadow-[0_0_8px_rgba(217,70,239,0.3)]',
          actionBtn: 'bg-fuchsia-500 hover:bg-fuchsia-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(217,70,239,0.5)]',
          titleColor: 'text-fuchsia-200 group-hover:text-fuchsia-100',
          descColor: 'text-fuchsia-100/80'
        };
      case 'violet':
        return {
          cardBg: 'bg-gradient-to-br from-slate-900 via-slate-950 to-violet-950/40 border-violet-400/80 shadow-[0_0_20px_rgba(167,139,250,0.25)] ring-1 ring-violet-400/40 text-white',
          iconBg: 'bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-[0_0_15px_rgba(167,139,250,0.6)]',
          badgePill: 'bg-violet-950/90 text-violet-300 border border-violet-400/70 shadow-[0_0_8px_rgba(167,139,250,0.3)]',
          actionBtn: 'bg-violet-500 hover:bg-violet-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(167,139,250,0.5)]',
          titleColor: 'text-violet-200 group-hover:text-violet-100',
          descColor: 'text-violet-100/80'
        };
      case 'rose':
        return {
          cardBg: 'bg-gradient-to-br from-slate-900 via-slate-950 to-rose-950/40 border-rose-400/80 shadow-[0_0_20px_rgba(251,113,133,0.25)] ring-1 ring-rose-400/40 text-white',
          iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-[0_0_15px_rgba(251,113,133,0.6)]',
          badgePill: 'bg-rose-950/90 text-rose-300 border border-rose-400/70 shadow-[0_0_8px_rgba(251,113,133,0.3)]',
          actionBtn: 'bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(251,113,133,0.5)]',
          titleColor: 'text-rose-200 group-hover:text-rose-100',
          descColor: 'text-rose-100/80'
        };
      case 'emerald':
      default:
        return {
          cardBg: 'bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/40 border-emerald-400/80 shadow-[0_0_20px_rgba(52,211,153,0.25)] ring-1 ring-emerald-400/40 text-white',
          iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-[0_0_15px_rgba(52,211,153,0.6)]',
          badgePill: 'bg-emerald-950/90 text-emerald-300 border border-emerald-400/70 shadow-[0_0_8px_rgba(52,211,153,0.3)]',
          actionBtn: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(52,211,153,0.5)]',
          titleColor: 'text-emerald-200 group-hover:text-emerald-100',
          descColor: 'text-emerald-100/80'
        };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20
      }
    }
  };

  const handleSpeakBadge = (badge: AchievementBadge) => {
    const text = badge.unlocked
      ? `Emblema ${badge.title}. Conquistado! ${badge.description}. Habilidade BNCC: ${badge.pedagogicalSkill || ''}`
      : `Emblema ${badge.title}. Ainda a conquistar. ${badge.description}. Como desbloquear: ${badge.howToUnlock || ''}`;
    readAloud(text, true);
  };

  return (
    <section id="galeria-emblemas" className="mt-8 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 rounded-3xl p-6 sm:p-8 border-2 border-cyan-500/70 text-white shadow-[0_0_35px_rgba(6,182,212,0.35)] relative overflow-hidden scroll-mt-24">
      {/* Decorative ambient corner blur */}
      <div className="absolute -top-16 -right-16 w-60 h-60 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Progress Overview */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-cyan-500/30">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/90 text-cyan-300 text-xs font-bold border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            <Trophy className="w-3.5 h-3.5 text-cyan-400" />
            <span>Percurso Formativo • Habilidade EF03CO04</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white font-display flex items-center gap-2">
            <span className="neon-text-glow text-cyan-300">Galeria de Emblemas & Conquistas</span>
            <Sparkles className="w-5 h-5 text-cyan-400 animate-spin-once drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          </h3>

          <p className="text-xs sm:text-sm text-cyan-100/80 max-w-xl leading-relaxed font-medium">
            Acompanhe todo o seu trajeto na Fábrica de Dados! Cada emblema representa um marco no aprendizado sobre dados brutos, processamento computacional e tomada de decisões.
          </p>
        </div>

        {/* Progress Tracker Card */}
        <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border-2 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.25)] md:min-w-[280px]">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Seu Percurso</span>
            </span>
            <span className="text-xs font-black text-cyan-200 bg-cyan-950 px-2 py-0.5 rounded-md border border-cyan-400/50">
              {unlockedCount} de {totalCount} Conquistados
            </span>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden p-0.5 border border-cyan-500/40 mb-2.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 h-full rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-cyan-200 font-semibold">
            <span>{progressPercent}% Completo</span>
            <span className="text-cyan-300 font-bold flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-cyan-400 text-cyan-300" />
              <span>{userProgress.stars} Estrelas Totais</span>
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 py-4">
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-cyan-500/40">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.5)] font-extrabold'
                : 'text-slate-400 hover:text-cyan-200'
            }`}
          >
            Todos os Emblemas ({totalCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('unlocked')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filter === 'unlocked'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)] font-extrabold'
                : 'text-slate-400 hover:text-emerald-300'
            }`}
          >
            Conquistados ({unlockedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('locked')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filter === 'locked'
                ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40 shadow-xs font-extrabold'
                : 'text-slate-400 hover:text-cyan-200'
            }`}
          >
            A Conquistar ({totalCount - unlockedCount})
          </button>
        </div>

        <span className="text-xs text-cyan-300/80 font-medium hidden sm:inline">
          💡 Clique em qualquer emblema para ver dicas e habilidades BNCC
        </span>
      </div>

      {/* Badges Grid with Spring Entrance Animations */}
      <motion.div
        key={filter}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2"
      >
        {filteredBadges.map((badge) => {
          const colors = getColorClasses(badge.colorScheme, badge.unlocked);

          return (
            <motion.div
              key={badge.id}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-2xl p-4 sm:p-5 border-2 transition-all flex flex-col justify-between cursor-pointer relative group ${colors.cardBg}`}
              onClick={() => setSelectedBadge(badge)}
            >
              {/* Badge Top Header */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  {/* Icon with glow halo */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${colors.iconBg}`}>
                    {getBadgeIcon(badge.icon, badge.unlocked)}
                  </div>

                  {/* Status Tag */}
                  <div className="flex flex-col items-end gap-1">
                    {badge.unlocked ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/90 border border-emerald-400/70 px-2 py-0.5 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.3)]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Conquistado!</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-full">
                        <Lock className="w-3 h-3 text-slate-400" />
                        <span>A Desbloquear</span>
                      </span>
                    )}

                    {badge.category && (
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                        {badge.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Badge Title */}
                <h4 className={`font-extrabold text-base font-display mb-1.5 leading-snug transition-colors ${colors.titleColor}`}>
                  {badge.title}
                </h4>

                {/* Badge Description */}
                <p className={`text-xs leading-relaxed font-medium mb-3 ${colors.descColor}`}>
                  {badge.description}
                </p>
              </div>

              {/* Bottom Mission Link or Unlock Requirement */}
              <div className="pt-3 border-t border-slate-700/60 mt-auto">
                {badge.unlocked ? (
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Selo Ativo</span>
                    </span>

                    {badge.missionTarget && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateToMission(badge.missionTarget!);
                        }}
                        className="text-[11px] font-extrabold text-cyan-300 hover:text-cyan-100 inline-flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <span>Revisar</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium line-clamp-2 mb-2">
                      🎯 <strong className="text-cyan-300">Missão:</strong> {badge.howToUnlock}
                    </p>

                    {badge.missionTarget && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateToMission(badge.missionTarget!);
                        }}
                        className={`w-full py-1.5 px-2.5 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-1 transition-all cursor-pointer ${colors.actionBtn}`}
                      >
                        <span>Ir para a Missão</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Detail Modal for Selected Badge */}
      <AnimatePresence>
        {selectedBadge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              className="bg-slate-950 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.5)] border-2 border-cyan-400 relative overflow-hidden text-white"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedBadge(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/50 transition-colors cursor-pointer"
                aria-label="Fechar detalhes"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Content */}
              <div className="text-center pt-2">
                {/* Icon */}
                <div
                  className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center mb-4 shadow-lg ${
                    selectedBadge.unlocked
                      ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_0_25px_rgba(6,182,212,0.8)] animate-bounce'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {getBadgeIcon(selectedBadge.icon, selectedBadge.unlocked)}
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2 uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-400/60 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                  <Trophy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{selectedBadge.category || 'Emblema Formativo'}</span>
                </div>

                <h3 className="text-2xl font-black text-white font-display mb-2 neon-text-glow">
                  {selectedBadge.title}
                </h3>

                <p className="text-sm text-cyan-100/90 font-medium leading-relaxed mb-6 max-w-md mx-auto">
                  {selectedBadge.description}
                </p>

                {/* Educational Learning Card */}
                <div className="bg-slate-900/90 rounded-2xl p-4 border border-cyan-500/40 text-left mb-6 space-y-2.5 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  <div className="flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-black uppercase tracking-wider text-cyan-300">
                        O que você aprende com este selo (BNCC EF03CO04):
                      </h5>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed font-medium">
                        {selectedBadge.pedagogicalSkill ||
                          'Diferenciar e aplicar conceitos de dados brutos e informação contextualizada.'}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-700/80 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-black uppercase tracking-wider text-cyan-300">
                        Como Conquistar / Onde Encontrar:
                      </h5>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed font-medium">
                        {selectedBadge.howToUnlock || 'Realize as atividades da missão correspondente na Fábrica.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleSpeakBadge(selectedBadge)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-cyan-500/50 bg-slate-900 hover:bg-cyan-950 text-cyan-200 text-xs sm:text-sm font-bold transition-all cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4 text-cyan-300" />
                    <span>Ouvir Detalhes</span>
                  </button>

                  {selectedBadge.missionTarget && (
                    <button
                      type="button"
                      onClick={() => {
                        const target = selectedBadge.missionTarget!;
                        setSelectedBadge(null);
                        onNavigateToMission(target);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 text-slate-950 text-xs sm:text-sm font-black shadow-[0_0_20px_rgba(6,182,212,0.8)] transition-all hover:scale-105 cursor-pointer"
                    >
                      <span>
                        {selectedBadge.unlocked ? 'Jogar Esta Missão Novamente' : 'Ir Conquistar Este Selo!'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
