// Modal management without jQuery
class ModalManager {
  constructor() {
    this.initModals();
    this.setupEventListeners();
  }

  initModals() {
    // Get all modal elements
    this.rulesModal = document.getElementById('rules');
    this.fightModal = document.getElementById('fight');
    this.lostGameModal = document.getElementById('lostGame');
  }

  setupEventListeners() {
    // Rules button
    const rulesBtn = document.getElementById('rulesBtn');
    if (rulesBtn) {
      rulesBtn.addEventListener('click', () => this.openModal('rules'));
    }

    // Close rules button
    const closeRulesBtn = document.getElementById('closeRulesBtn');
    if (closeRulesBtn) {
      closeRulesBtn.addEventListener('click', () => this.closeModal('rules'));
    }

    // Restart button
    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
    }

    // Fight modal buttons
    const defenseBtn = document.getElementById('defense');
    const attackBtn = document.getElementById('attack');

    if (defenseBtn) {
      defenseBtn.addEventListener('click', () => {
        turn.defend = true;
        this.closeModal('fight');
        fight();
      });
    }

    if (attackBtn) {
      attackBtn.addEventListener('click', () => {
        turn.defend = false;
        this.closeModal('fight');
        fight();
      });
    }

    // End game modal buttons
    const rematchBtn = document.getElementById('rematchBtn');
    const quitBtn = document.getElementById('quitBtn');

    if (rematchBtn) {
      rematchBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
    }

    if (quitBtn) {
      quitBtn.addEventListener('click', () => {
        this.closeModal('lostGame');
      });
    }

    // Close modal when clicking overlay
    this.setupOverlayListeners();
  }

  setupOverlayListeners() {
    const modals = [this.rulesModal, this.fightModal, this.lostGameModal];

    modals.forEach(modal => {
      if (modal) {
        const overlay = modal.querySelector('.modal-overlay');
        if (overlay) {
          overlay.addEventListener('click', () => {
            // Only close if modal is dismissible (not fight modal during battle)
            if (modal.id !== 'fight' || !turn.fight) {
              this.closeModal(modal.id);
            }
          });
        }
      }
    });
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

// Initialize modals when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.modalManager = new ModalManager();
});
