/**
 * SAHAN SUBASINGHE - CYBER SECURITY PORTFOLIO INTERACTION ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
  initCyberCanvas();
  initTerminal();
  initSkillsFilter();
  initProjectModals();
  initCopyButtons();
  initContactForm();
  initNavbarScroll();
  initAudioFX();
  initThemeToggle();
  initMobileMenu();
});

/* ==========================================================================
   1. CYBER CANVAS CONSTELLATION NETWORK
   ========================================================================== */
function initCyberCanvas() {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const nodeCount = Math.min(Math.floor((width * height) / 16000), 75);
  const nodes = [];
  const mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? 'rgba(0, 242, 254, ' : 'rgba(0, 255, 157, '
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      // Mouse attraction / interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          n.x -= (dx / dist) * force * 1.5;
          n.y -= (dy / dist) * force * 1.5;
        }
      }

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = n.color + '0.75)';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00f2fe';
      ctx.fill();

      // Connect nearby nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dx = n.x - n2.x;
        const dy = n.y - n2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.25;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. INTERACTIVE CYBER TERMINAL (HUD)
   ========================================================================== */
function initTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const clearBtn = document.getElementById('term-clear-btn');
  const matrixBtn = document.getElementById('term-matrix-btn');
  const quickTags = document.querySelectorAll('.quick-tag');

  if (!terminalInput || !terminalOutput) return;

  const commandHistory = [];
  let historyIndex = -1;

  const commands = {
    help: () => `
<span class="text-gradient"><strong>AVAILABLE CYBER COMMANDS:</strong></span><br>
&bull; <span class="term-cmd">whoami</span> / <span class="term-cmd">bio</span> : Summary profile of Sahan Subasinghe<br>
&bull; <span class="term-cmd">skills</span> : List verified cloud & cyber competencies<br>
&bull; <span class="term-cmd">projects</span> : Overview of hands-on security labs & architecture<br>
&bull; <span class="term-cmd">experience</span> : Career timeline & leadership track record<br>
&bull; <span class="term-cmd">education</span> : Degrees, diplomas & academic background<br>
&bull; <span class="term-cmd">scan</span> : Perform a live simulated port & vulnerability scan<br>
&bull; <span class="term-cmd">download</span> : Trigger instant PDF resume download<br>
&bull; <span class="term-cmd">contact</span> : Display direct email, phone and location<br>
&bull; <span class="term-cmd">matrix</span> : Toggle Matrix Green Terminal Theme<br>
&bull; <span class="term-cmd">clear</span> : Clear current terminal buffer
    `,

    whoami: () => `
<strong>SAHAN SUBASINGHE</strong><br>
🎓 Bachelor of Cyber Security (Edith Cowan University)<br>
💼 5+ Years Management & Operational Experience in Australia<br>
🛡️ Focus: Microsoft Azure, Kali Linux, Python Scripting, Network Defense & Zero Trust IAM.<br>
📍 Kadawatha, Sri Lanka | Open to Internships & Junior Cyber Roles worldwide.
    `,

    bio: () => commands.whoami(),

    skills: () => `
<strong>CORE TECHNICAL COMPETENCIES:</strong><br>
[+] <strong>Cloud:</strong> Microsoft Azure, Entra ID (Azure AD), Sentinel SIEM, VM Security<br>
[+] <strong>Cyber & Defense:</strong> Kali Linux, Vulnerability Assessment, Risk Analysis, Threat Mitigation<br>
[+] <strong>Networking:</strong> TCP/IP, Network Monitoring, Packet Inspection, Wireshark, Linux Admin<br>
[+] <strong>Programming:</strong> Python (Sockets, Automation, Tooling), Bash Scripting<br>
[+] <strong>Leadership:</strong> Team Supervision, Crisis Mitigation, Data Confidentiality
    `,

    projects: () => `
<strong>KEY HANDS-ON PROJECTS & LABS:</strong><br>
1. <strong>Azure Cloud SOC & Sentinel:</strong> Real-time brute force threat honeypot with KQL analytics.<br>
2. <strong>Python Network & Vulnerability Scanner:</strong> Multi-threaded port scanner with CVE auditing.<br>
3. <strong>Deep Packet Forensics & MITM Detection:</strong> Wireshark traffic inspection & ARP defense.<br>
4. <strong>Zero Trust & Entra ID Blueprint:</strong> RBAC, Conditional Access, and MFA implementation.
    `,

    experience: () => `
<strong>WORK EXPERIENCE & LEADERSHIP:</strong><br>
[2024 - 2025] <strong>Motel Manager</strong> — Ringwood Australia<br>
&nbsp;&nbsp;&bull; Managed daily operations, customer data privacy, payments, and staff supervision.<br>
[2019 - 2023] <strong>Crew Trainer & Shift Manager</strong> — Maccas Cheltenham Australia<br>
&nbsp;&nbsp;&bull; Led teams of 15+, managed financial audits, inventory control, and emergency workflows.
    `,

    education: () => `
<strong>ACADEMIC CREDENTIALS:</strong><br>
&bull; <strong>Bachelor of Cyber Security</strong> — Edith Cowan University (2026 - 2027)<br>
&bull; <strong>Diploma of Information Technology</strong> — Deakin College, Australia (2019 - 2021)<br>
&bull; <strong>Ordinary & Advanced Levels</strong> — Lyceum International School (2006 - 2018)
    `,

    contact: () => `
<strong>DIRECT CONTACT DETAILS:</strong><br>
📧 Email: <a href="mailto:sahankurulu.s@gmail.com" class="term-cmd">sahankurulu.s@gmail.com</a><br>
📱 Phone: <a href="tel:+94710952075" class="term-cmd">+94 71 095 2075</a><br>
📍 Address: 410 Suhada Mawatha, Kirillawela, Kadawatha, Sri Lanka
    `,

    download: () => {
      const link = document.createElement('a');
      link.href = 'assets/sahan_subasinghe_resume.pdf';
      link.download = 'Sahan_Subasinghe_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Downloading Sahan Subasinghe Resume PDF...');
      return `<span style="color: var(--emerald-neon);">[SUCCESS] Sahan_Subasinghe_Resume.pdf download initialized.</span>`;
    },

    matrix: () => {
      document.body.classList.toggle('matrix-mode');
      const isMatrix = document.body.classList.contains('matrix-mode');
      return `Matrix mode ${isMatrix ? '<span style="color: #00ff66;">ENABLED</span>' : '<span style="color: #00f2fe;">DISABLED</span>'}.`;
    },

    scan: () => {
      setTimeout(() => {
        appendOutput(`
[SCAN] Initiating multi-port probe target: 127.0.0.1...<br>
[PORT 22/SSH] - OPEN (OpenSSH 8.9p1 - Hardened Key Auth Only)<br>
[PORT 80/HTTP] - REDIRECT -> HTTPS<br>
[PORT 443/HTTPS] - OPEN (TLS 1.3 / Strict-Transport-Security: ENABLED)<br>
[AUDIT] Zero high-severity vulnerabilities detected.<br>
<span style="color: var(--emerald-neon);">[✓] System Defense Posture: EXCELLENT (98/100)</span>
        `, 'success');
      }, 500);
      return `<span style="color: var(--cyan-primary);">[*] Running automated vulnerability check...</span>`;
    },

    clear: () => {
      terminalOutput.innerHTML = '';
      return '';
    }
  };

  function appendOutput(text, type = '') {
    if (!text) return;
    const outDiv = document.createElement('div');
    outDiv.className = `term-output ${type}`;
    outDiv.innerHTML = text;
    terminalOutput.appendChild(outDiv);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function handleCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    playKeyAudio();

    // Log the typed command
    const lineDiv = document.createElement('div');
    lineDiv.className = 'term-line';
    lineDiv.innerHTML = `<span class="term-prompt">sahan@sec-station:~$</span> <span class="term-cmd">${escapeHtml(cmdRaw)}</span>`;
    terminalOutput.appendChild(lineDiv);

    commandHistory.push(cmdRaw);
    historyIndex = commandHistory.length;

    if (commands[cmd]) {
      const result = commands[cmd]();
      if (result) appendOutput(result);
    } else {
      appendOutput(`Command not found: "${escapeHtml(cmdRaw)}". Type <span class="term-cmd">help</span> for a list of available commands.`, 'error');
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      handleCommand(val);
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex] || '';
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    }
  });

  quickTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const cmd = tag.getAttribute('data-cmd');
      if (cmd) {
        handleCommand(cmd);
      }
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      commands.clear();
      playClickAudio();
    });
  }

  if (matrixBtn) {
    matrixBtn.addEventListener('click', () => {
      handleCommand('matrix');
      playClickAudio();
    });
  }
}

/* ==========================================================================
   3. SKILLS MATRIX FILTER & SEARCH
   ========================================================================== */
function initSkillsFilter() {
  const tabBtns = document.querySelectorAll('.skill-tab-btn');
  const searchInput = document.getElementById('skills-search');
  const skillCards = document.querySelectorAll('.skill-card');

  function filterSkills() {
    const activeCategory = document.querySelector('.skill-tab-btn.active')?.dataset.category || 'all';
    const query = (searchInput?.value || '').trim().toLowerCase();

    skillCards.forEach(card => {
      const cardCategory = card.dataset.category || '';
      const cardName = (card.dataset.name || '').toLowerCase();
      const cardText = card.innerText.toLowerCase();

      const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
      const matchesSearch = query === '' || cardName.includes(query) || cardText.includes(query);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      playClickAudio();
      filterSkills();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterSkills);
  }
}

/* ==========================================================================
   4. PROJECT MODALS & DEEP DIVES
   ========================================================================== */
function initProjectModals() {
  const modalBackdrop = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.getElementById('modal-close-btn');
  const triggers = document.querySelectorAll('.project-modal-trigger');

  if (!modalBackdrop || !modalTitle || !modalBody) return;

  const projectDetails = {
    azure: {
      title: 'Azure Cloud SOC & Sentinel Threat Monitoring Lab',
      content: `
        <img src="assets/azure_lab.jpg" alt="Azure SOC Architecture" style="width: 100%; border-radius: 10px; margin-bottom: 1.2rem; border: 1px solid var(--border-subtle);">
        <h4 style="color: var(--cyan-primary); margin-bottom: 0.5rem;">Project Objective</h4>
        <p style="margin-bottom: 1rem; color: var(--text-secondary); font-size: 0.92rem;">
          Construct an enterprise cloud security operations center in Microsoft Azure to monitor, ingest, and analyze live global brute-force attacks in real time.
        </p>

        <h4 style="color: var(--cyan-primary); margin-bottom: 0.5rem;">Architecture & Implementation</h4>
        <ul style="list-style: square; padding-left: 1.2rem; margin-bottom: 1.2rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
          <li>Configured an <strong>Azure Log Analytics Workspace</strong> connected to an intentionally exposed Windows Virtual Machine honeypot with Network Security Group (NSG) rules permitting open RDP traffic.</li>
          <li>Ingested Security Event logs (Event ID 4625: An account failed to log on).</li>
          <li>Utilized a custom PowerShell script and IP geolocation API to extract attacker IP addresses, countries, and coordinates.</li>
          <li>Built dynamic <strong>Microsoft Sentinel Map Workbooks</strong> using Kusto Query Language (KQL) queries to visualize global attack vectors in real-time.</li>
        </ul>

        <h4 style="color: var(--cyan-primary); margin-bottom: 0.5rem;">Key Takeaways & Cloud Security Skills</h4>
        <p style="color: var(--text-secondary); font-size: 0.9rem;">
          Demonstrated deep understanding of SIEM engineering, log forwarding, KQL telemetry analysis, NSG firewall rules, and cloud incident response lifecycle.
        </p>
      `
    },
    scanner: {
      title: 'Automated Python Network & Vulnerability Scanner',
      content: `
        <img src="assets/kali_lab.jpg" alt="Python Scanner" style="width: 100%; border-radius: 10px; margin-bottom: 1.2rem; border: 1px solid var(--border-subtle);">
        <h4 style="color: var(--cyan-primary); margin-bottom: 0.5rem;">Project Objective</h4>
        <p style="margin-bottom: 1rem; color: var(--text-secondary); font-size: 0.92rem;">
          Engineer an asynchronous multi-threaded network scanner in Python 3 to rapidly identify active hosts, discover open ports, grab banner headers, and cross-reference known CVE vulnerabilities.
        </p>

        <h4 style="color: var(--cyan-primary); margin-bottom: 0.5rem;">Technical Capabilities</h4>
        <ul style="list-style: square; padding-left: 1.2rem; margin-bottom: 1.2rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
          <li>Implemented asynchronous TCP connection handshakes using Python's <code>concurrent.futures</code> for fast port auditing.</li>
          <li>Extracted raw service identification banners across SSH, HTTP, FTP, and SMTP ports.</li>
          <li>Automated query matching with the National Vulnerability Database (NVD) API to flag unpatched services.</li>
          <li>Exported structured JSON and HTML executive audit summaries for vulnerability assessment teams.</li>
        </ul>

        <h4 style="color: var(--cyan-primary); margin-bottom: 0.5rem;">Core Technologies</h4>
        <p style="color: var(--text-secondary); font-size: 0.9rem;">
          Python 3, Socket Library, Kali Linux, ThreadPoolExecutor, CVE Mapping, Regex Banner Parsing.
        </p>
      `
    },
    packet: {
      title: 'Deep Packet Forensics & MITM Threat Analysis',
      content: `
        <img src="assets/kali_lab.jpg" alt="Packet Analysis" style="width: 100%; border-radius: 10px; margin-bottom: 1.2rem; border: 1px solid var(--border-subtle); filter: hue-rotate(90deg);">
        <h4 style="color: var(--cyan-primary); margin-bottom: 0.5rem;">Project Objective</h4>
        <p style="margin-bottom: 1rem; color: var(--text-secondary); font-size: 0.92rem;">
          Analyze Layer 2 and Layer 3 Ethernet/IP network packets to uncover unauthorized ARP spoofing, rogue DHCP servers, and unencrypted credential transmission in a simulated enterprise network.
        </p>

        <h4 style="color: var(--cyan-primary); margin-bottom: 0.5rem;">Investigation Protocol</h4>
        <ul style="list-style: square; padding-left: 1.2rem; margin-bottom: 1.2rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
          <li>Captured baseline PCAP traffic in an isolated virtual lab environment using Wireshark and TCPDump.</li>
          <li>Simulated ARP cache poisoning in Kali Linux (Ettercap/Arpspoof) to intercept switch communications.</li>
          <li>Identified duplicate IP-to-MAC associations and unsolicited ARP replies.</li>
          <li>Formulated switch-level Dynamic ARP Inspection (DAI) and DHCP Snooping mitigation configurations.</li>
        </ul>
      `
    },
    iam: {
      title: 'Enterprise Zero Trust & Active Directory IAM Blueprint',
      content: `
        <img src="assets/azure_lab.jpg" alt="Zero Trust IAM" style="width: 100%; border-radius: 10px; margin-bottom: 1.2rem; border: 1px solid var(--border-subtle); filter: hue-rotate(240deg);">
        <h4 style="color: var(--cyan-primary); margin-bottom: 0.5rem;">Project Objective</h4>
        <p style="margin-bottom: 1rem; color: var(--text-secondary); font-size: 0.92rem;">
          Design and deploy a Zero Trust Identity Access Management architecture using Microsoft Entra ID (Azure AD), ensuring Least Privilege access and continuous verification.
        </p>

        <h4 style="color: var(--cyan-primary); margin-bottom: 0.5rem;">Implementation Architecture</h4>
        <ul style="list-style: square; padding-left: 1.2rem; margin-bottom: 1.2rem; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
          <li>Configured Role-Based Access Control (RBAC) groups with granular administrative boundaries.</li>
          <li>Created Conditional Access policies requiring MFA for risky logins and unmanaged device compliance.</li>
          <li>Enforced Privileged Identity Management (PIM) with just-in-time access approvals and audit logging.</li>
        </ul>
      `
    }
  };

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const projKey = trigger.dataset.project;
      const data = projectDetails[projKey];
      if (data) {
        modalTitle.innerText = data.title;
        modalBody.innerHTML = data.content;
        modalBackdrop.classList.add('active');
        playClickAudio();
      }
    });
  });

  function closeModal() {
    modalBackdrop.classList.remove('active');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. COPY-TO-CLIPBOARD WITH TOAST NOTIFICATIONS
   ========================================================================== */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-btn');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.dataset.copy;
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`✓ Copied to clipboard: ${textToCopy}`);
        playClickAudio();
      }).catch(() => {
        showToast(`Copied: ${textToCopy}`);
      });
    });
  });
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--emerald-neon);"></i> <span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   6. CONTACT FORM SIMULATION & VALIDATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name')?.value;
    const email = document.getElementById('contact-email')?.value;
    const subject = document.getElementById('contact-subject')?.value;
    const msg = document.getElementById('contact-message')?.value;

    if (!name || !email || !subject || !msg) {
      showToast('Please complete all required fields.');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Encrypting & Sending...`;
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-solid fa-shield-check"></i> Send Encrypted Inquiry`;
      }
      form.reset();
      showToast(`✓ Thank you ${name}! Your message has been sent to Sahan.`);
      playClickAudio();

      // Launch mailto for direct client transmission
      window.location.href = `mailto:sahankurulu.s@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${msg}`)}`;
    }, 1000);
  });
}

/* ==========================================================================
   7. NAVBAR SCROLL & ACTIVE LINK SPY
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   8. WEB AUDIO SOUND SYNTHESIZER (NO EXTERNAL AUDIO FILES REQUIRED)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = true;

function initAudioFX() {
  const audioToggle = document.getElementById('audio-toggle');
  const audioIcon = document.getElementById('audio-icon');

  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (audioIcon) {
        audioIcon.className = soundEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
      }
      showToast(`Sound FX ${soundEnabled ? 'Enabled' : 'Muted'}`);
    });
  }
}

function getAudioContext() {
  if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playClickAudio() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {}
}

function playKeyAudio() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, ctx.currentTime);

    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch (e) {}
}

/* ==========================================================================
   9. THEME TOGGLE & MOBILE MENU
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;

  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('matrix-mode');
    const isMatrix = document.body.classList.contains('matrix-mode');
    showToast(`Theme switched to: ${isMatrix ? 'Matrix Neon Mode' : 'Cyber Cyan Mode'}`);
    playClickAudio();
  });
}

function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    playClickAudio();
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

/* Helper */
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
