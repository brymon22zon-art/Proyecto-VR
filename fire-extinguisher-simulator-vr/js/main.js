// ==========================================================
// Fire Extinguisher Simulator VR - Main Script
// Materia: Tecnologías Inmersivas
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  highlightActiveNavLink();
  initPassProtocolSimulator();
  initExtinguisherClasses();
  initCitationCopier();
  initImageLightbox();
  initAcademicQuiz();
});

// Mobile Navigation
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !toggleBtn.contains(e.target)) {
      mobileNav.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// Highlight active link
function highlightActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Check match for root or specific page
    if (
      (currentPath === '/' || currentPath.endsWith('index.html')) &&
      (href === '/' || href === 'index.html' || href === '/index.html' || href === '../index.html')
    ) {
      link.classList.add('active');
    } else if (
      href !== '/' &&
      href !== 'index.html' &&
      href !== '../index.html' &&
      currentPath.includes(href.replace('../', '').replace('./', ''))
    ) {
      link.classList.add('active');
    }
  });
}

// Interactive P.A.S.S. Protocol Simulator
function initPassProtocolSimulator() {
  const steps = [
    {
      letter: 'P',
      name: 'PULL (Tirar)',
      title: 'Tirar del pasador de seguridad',
      instruction: 'Rompe el precinto plástico y extrae el pasador metálico de bloqueo ubicado en la manija superior.',
      feedback: '¡Pasador retirado con éxito! El mecanismo de descarga queda liberado para su accionamiento.',
      actionBtnText: 'Tirar del pasador',
      gauge: 'Presión: 1.4 MPa (Zona Verde)',
      fireIntensity: 100,
    },
    {
      letter: 'A',
      name: 'AIM (Apuntar)',
      title: 'Apuntar la boquilla a la base de las llamas',
      instruction: 'Sostén la manguera firmemente con la mano guía y dirige la tobera de descarga hacia la base del combustible, no a la parte superior de las llamas.',
      feedback: '¡Objetivo fijado! Apuntar a la base interrumpe la reacción en cadena del tetraedro del fuego.',
      actionBtnText: 'Apuntar a la base',
      gauge: 'Ángulo de ataque: 45° a 2.5 metros',
      fireIntensity: 85,
    },
    {
      letter: 'S',
      name: 'SQUEEZE (Apretar)',
      title: 'Apretar la palanca de descarga',
      instruction: 'Presiona la palanca superior con fuerza constante para iniciar la expulsión presurizada del agente extintor (PQS ABC o CO2).',
      feedback: '¡Descarga presurizada iniciada! Expulsión continua de polvo químico seco a alta velocidad.',
      actionBtnText: 'Presionar palanca',
      gauge: 'Flujo de descarga: Activo (12 seg restantes)',
      fireIntensity: 45,
    },
    {
      letter: 'S',
      name: 'SWEEP (Barrer)',
      title: 'Barrer en abanico horizontal',
      instruction: 'Mueve la boquilla de lado a lado con un barrido suave cubriendo todo el ancho de la superficie en combustión hasta que se extinga por completo.',
      feedback: '¡Fuego sofocado al 100%! Combustible enfriado y sofocado sin reignición.',
      actionBtnText: 'Reiniciar simulación',
      gauge: 'Estado: Incendio liquidado exitosamente',
      fireIntensity: 0,
    },
  ];

  let currentStepIndex = 0;
  const stepElements = document.querySelectorAll('.pass-step');
  const actionBtn = document.getElementById('passActionBtn');
  const feedbackEl = document.getElementById('passFeedback');
  const hudStatus = document.getElementById('hudStatus');
  const hudGauge = document.getElementById('hudGauge');
  const hudFire = document.getElementById('hudFire');
  const fireProgressBar = document.getElementById('fireProgressBar');

  if (!actionBtn || !stepElements.length) return;

  function updateSimulatorUI() {
    const current = steps[currentStepIndex];

    stepElements.forEach((el, index) => {
      el.classList.remove('active', 'done');
      if (index === currentStepIndex) {
        el.classList.add('active');
      } else if (index < currentStepIndex) {
        el.classList.add('done');
      }
    });

    if (feedbackEl) {
      feedbackEl.innerHTML = `
        <h4 style="color: #fff; font-size: 1.1rem; margin-bottom: 0.35rem;">
          Paso ${currentStepIndex + 1} de 4: <span style="color: #f87171;">${current.name}</span>
        </h4>
        <p style="color: #cbd5e1; margin-bottom: 0.5rem;">${current.instruction}</p>
        <div style="font-size: 0.85rem; color: #38bdf8; font-family: var(--font-mono);">${current.feedback}</div>
      `;
    }

    actionBtn.textContent = current.actionBtnText;

    if (hudStatus) hudStatus.textContent = `FASE VR: ${current.name}`;
    if (hudGauge) hudGauge.textContent = current.gauge;
    if (hudFire) hudFire.textContent = `INTENSIDAD FUEGO: ${current.fireIntensity}%`;
    if (fireProgressBar) fireProgressBar.style.width = `${current.fireIntensity}%`;
  }

  actionBtn.addEventListener('click', () => {
    if (currentStepIndex < steps.length - 1) {
      currentStepIndex++;
    } else {
      currentStepIndex = 0;
    }
    updateSimulatorUI();
  });

  stepElements.forEach((el, idx) => {
    el.addEventListener('click', () => {
      currentStepIndex = idx;
      updateSimulatorUI();
    });
  });

  updateSimulatorUI();
}

// Extinguisher Classes Explorer
function initExtinguisherClasses() {
  const classButtons = document.querySelectorAll('[data-extinguisher-class]');
  const displayCard = document.getElementById('extinguisherInfoCard');

  if (!classButtons.length || !displayCard) return;

  const classData = {
    A: {
      type: 'Clase A - Materiales Sólidos',
      symbol: 'Triángulo Verde [A]',
      fuels: 'Madera, papel, cartón, textiles, plásticos y basura común.',
      agent: 'Agua presurizada o Polvo Químico Seco (PQS ABC).',
      technique: 'Enfriamiento directo de la brasa con agua o sofocación con polvo químico seco.',
      vrDrill: 'Simulación de incendio en archivador de oficina y tarimas de madera de almacén.',
    },
    B: {
      type: 'Clase B - Líquidos y Gases Inflamables',
      symbol: 'Cuadrado Rojo [B]',
      fuels: 'Gasolina, diésel, disolventes, pinturas, aceites minerales, alcohol y gas propano.',
      agent: 'Dióxido de Carbono (CO2) o Polvo Químico Seco (PQS ABC/BC).',
      technique: 'Sofocación del oxígeno en superficie. Nunca usar agua a presión para no dispersar el líquido.',
      vrDrill: 'Derrame de disolvente en taller mecánico con fuego en charco controlado.',
    },
    C: {
      type: 'Clase C - Equipos Eléctricos Energizados',
      symbol: 'Círculo Azul [C]',
      fuels: 'Tableros eléctricos, servidores, transformadores, computadoras y cableado en tensión.',
      agent: 'Dióxido de Carbono (CO2) o Gas Limpio (Halotrón/FM-200). Agente no conductor.',
      technique: 'Desenergizar primero si es posible; descargar gas dieléctrico para no electrocutarse ni dañar circuitos.',
      vrDrill: 'Gabinete de servidores con cortocircuito y chisporroteo activo en centro de cómputo.',
    },
    D: {
      type: 'Clase D - Metales Combustibles',
      symbol: 'Estrella Amarilla [D]',
      fuels: 'Magnesio, titanio, sodio, potasio y circonio a altas temperaturas.',
      agent: 'Polvo especial seco Clase D (Cloruro de sodio, grafito o cobre pulverizado).',
      technique: 'Cubrir cuidadosamente sin agitar el polvo fundido; reacción violenta al contacto con agua.',
      vrDrill: 'Torno metalúrgico con virutas de magnesio en ignición en laboratorio químico.',
    },
    K: {
      type: 'Clase K - Grasas y Aceites de Cocina',
      symbol: 'Hexágono Negro [K]',
      fuels: 'Aceites vegetales y grasas animales en freidoras industriales y cocinas comerciales.',
      agent: 'Acetato de Potasio líquido en niebla fina (Wet Chemical).',
      technique: 'Saponificación (crea una capa jabonosa que sella el vapor y enfría drásticamente).',
      vrDrill: 'Freidora industrial de cocina universitaria en ignición espontánea.',
    },
  };

  classButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      classButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const classKey = btn.getAttribute('data-extinguisher-class');
      const data = classData[classKey];
      if (!data) return;

      displayCard.innerHTML = `
        <div style="border-left: 3px solid var(--accent-red); padding-left: 1rem; margin-bottom: 1rem;">
          <h4 style="color: #fff; font-size: 1.2rem; font-weight: 800;">${data.type}</h4>
          <span style="font-size: 0.8rem; color: var(--accent-amber); font-family: var(--font-mono);">${data.symbol}</span>
        </div>
        <div style="display: grid; gap: 0.75rem; font-size: 0.92rem; color: #cbd5e1;">
          <p><strong>Combustibles:</strong> ${data.fuels}</p>
          <p><strong>Agente Extintor Recomendado:</strong> <span style="color: #38bdf8;">${data.agent}</span></p>
          <p><strong>Técnica de Combate:</strong> ${data.technique}</p>
          <p><strong>Escenario en el Simulador VR:</strong> <span style="color: #f87171;">${data.vrDrill}</span></p>
        </div>
      `;
    });
  });
}

// Copy Citation Helper
function initCitationCopier() {
  const copyButtons = document.querySelectorAll('.btn-copy-citation');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const citationText = btn.getAttribute('data-citation');
      if (citationText) {
        navigator.clipboard.writeText(citationText).then(() => {
          const original = btn.textContent;
          btn.textContent = '¡Copiado al portapapeles!';
          btn.style.background = '#10b981';
          setTimeout(() => {
            btn.textContent = original;
            btn.style.background = '';
          }, 2000);
        });
      }
    });
  });
}

// Image Lightbox
function initImageLightbox() {
  const images = document.querySelectorAll('.lightbox-trigger');
  if (!images.length) return;

  const modal = document.createElement('div');
  modal.style.cssText = `
    display: none;
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.9);
    z-index: 1000;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    cursor: zoom-out;
  `;

  const modalImg = document.createElement('img');
  modalImg.style.cssText = `
    max-width: 90vw;
    max-height: 85vh;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.8);
    border: 1px solid rgba(255,255,255,0.2);
  `;
  modal.appendChild(modalImg);
  document.body.appendChild(modal);

  images.forEach((img) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modal.style.display = 'flex';
    });
  });

  modal.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}

// Academic Quiz Component
function initAcademicQuiz() {
  const quizForm = document.getElementById('academicQuizForm');
  const quizResult = document.getElementById('quizResult');
  if (!quizForm || !quizResult) return;

  quizForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(quizForm);
    let score = 0;
    const total = 4;

    // Q1: PASS meaning (B: Tirar, Apuntar, Apretar, Barrer)
    if (formData.get('q1') === 'b') score++;
    // Q2: Electrical fires class (C)
    if (formData.get('q2') === 'c') score++;
    // Q3: Meta Quest 2 DOF (6 DOF)
    if (formData.get('q3') === '6dof') score++;
    // Q4: Extinguisher aim point (base)
    if (formData.get('q4') === 'base') score++;

    const percent = Math.round((score / total) * 100);
    quizResult.style.display = 'block';
    quizResult.innerHTML = `
      <div style="padding: 1.25rem; background: rgba(30,41,59,0.8); border: 1px solid ${score >= 3 ? '#10b981' : '#f59e0b'}; border-radius: 10px;">
        <h4 style="color: #fff; font-size: 1.1rem; margin-bottom: 0.35rem;">
          Calificación Obtenida: ${score} de ${total} (${percent}%)
        </h4>
        <p style="color: ${score >= 3 ? '#a7f3d0' : '#fed7aa'}; font-size: 0.9rem;">
          ${score === 4 ? '¡Excelente! Dominas a la perfección los fundamentos teóricos del simulador y combate de incendios.' : score >= 3 ? 'Aprobado. Buen entendimiento de los protocolos.' : 'Requiere refuerzo. Repasa los módulos de Metodología y Simulador.'}
        </p>
      </div>
    `;
  });
}
