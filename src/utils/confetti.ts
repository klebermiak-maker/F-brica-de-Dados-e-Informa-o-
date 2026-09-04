import confetti from 'canvas-confetti';

/**
 * Paletas temáticas para o feedback positivo e conquista de estrelas na Fábrica de Dados
 */
const FESTIVE_COLORS = [
  '#06b6d4', // Cyan neon
  '#3b82f6', // Azul elétrico
  '#f59e0b', // Dourado âmbar
  '#10b981', // Verde esmeralda
  '#ec4899', // Rosa neon
  '#8b5cf6', // Roxo mágico
  '#fbbf24', // Estrela amarela
];

const GOLDEN_STAR_COLORS = ['#fbbf24', '#f59e0b', '#fde047', '#ffffff', '#eab308'];

/**
 * Explosão geral de confetes (compatível com chamadas existentes)
 */
export function triggerConfetti() {
  triggerMissionSuccessConfetti();
}

/**
 * Explosão de confetes ao completar uma missão com sucesso
 * Dispara dois canhões laterais e uma chuva central de confetes cintilantes
 */
export function triggerMissionSuccessConfetti() {
  if (typeof window === 'undefined') return;

  try {
    // Canhão da esquerda
    confetti({
      particleCount: 65,
      angle: 60,
      spread: 60,
      origin: { x: 0.05, y: 0.8 },
      colors: FESTIVE_COLORS,
      startVelocity: 45,
      zIndex: 99999,
      disableForReducedMotion: true,
    });

    // Canhão da direita
    confetti({
      particleCount: 65,
      angle: 120,
      spread: 60,
      origin: { x: 0.95, y: 0.8 },
      colors: FESTIVE_COLORS,
      startVelocity: 45,
      zIndex: 99999,
      disableForReducedMotion: true,
    });

    // Chuva central mais alta após 180ms
    setTimeout(() => {
      confetti({
        particleCount: 75,
        spread: 100,
        origin: { x: 0.5, y: 0.55 },
        colors: FESTIVE_COLORS,
        scalar: 1.1,
        gravity: 0.9,
        ticks: 240,
        zIndex: 99999,
        disableForReducedMotion: true,
      });
    }, 180);
  } catch (err) {
    console.warn('Confetti effect error:', err);
  }
}

/**
 * Partículas douradas rápidas ao conquistar novas estrelas
 */
export function triggerStarCelebration(originX = 0.5, originY = 0.4) {
  if (typeof window === 'undefined') return;

  try {
    confetti({
      particleCount: 28,
      spread: 55,
      origin: { x: originX, y: originY },
      colors: GOLDEN_STAR_COLORS,
      shapes: ['circle'],
      scalar: 0.85,
      gravity: 1.1,
      startVelocity: 25,
      ticks: 120,
      zIndex: 99999,
      disableForReducedMotion: true,
    });
  } catch (err) {
    console.warn('Star confetti error:', err);
  }
}

/**
 * Grande celebração final (para o Certificado e Mestre dos Dados)
 * Cascata contínua de confetes por 2 segundos
 */
export function triggerGrandCelebration() {
  if (typeof window === 'undefined') return;

  const duration = 2200;
  const animationEnd = Date.now() + duration;

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / duration);

    try {
      confetti({
        particleCount,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.75 },
        colors: FESTIVE_COLORS,
        zIndex: 99999,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.75 },
        colors: FESTIVE_COLORS,
        zIndex: 99999,
        disableForReducedMotion: true,
      });
    } catch {
      clearInterval(interval);
    }
  }, 220);
}
