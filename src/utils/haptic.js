// 1:1 аналог твоего нативного HapticManager.swift
export const hapticManager = {
  lightImpact() {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
  },
  
  mediumImpact() {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium');
  },
  
  successNotification() {
    window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success');
  },
  
  errorImpact() {
    window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred('error');
  },

  // Твой кастомный эффект "Искры"
  playSparkleHaptic() {
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
      }, i * 100);
    }
  }
};