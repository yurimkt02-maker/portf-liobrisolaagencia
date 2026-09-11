// Projects Database for Interactive Preview
        const projectsData = [
            {
                title: "Clínica Vitalis",
                category: "Site Institucional",
                label: "Projeto conceitual",
                challenge: "Organizar especialidades, profissionais e contato sem tornar a navegação clínica ou impessoal.",
                direction: "Hierarquia acolhedora, leitura simples e caminhos de decisão curtos.",
                solution: "Uma presença institucional que apresenta a clínica e conduz ao agendamento pelo WhatsApp.",
                url: "https://clinicavitalis.com.br",
                brand: "Clínica Vitalis Medicina",
                heroTitle: "Sua Saúde em Primeiro Lugar",
                heroDesc: "Atendimento médico humanizado com especialistas renomados e agendamento prático online.",
                features: ["Agendamento via WhatsApp", "Corpo Médico Especializado", "Localização & Mapa Interativo"]
            },
            {
                title: "Luxe Joias Elegance",
                category: "E-commerce Premium",
                label: "Projeto conceitual",
                challenge: "Apresentar uma coleção premium com clareza sem perder a sensação de exclusividade.",
                direction: "Composição elegante, foco no produto e uma jornada de compra objetiva.",
                solution: "Uma loja conceitual que equilibra descoberta, catálogo e decisão de compra.",
                url: "https://luxejoias.com.br",
                brand: "Luxe Joias",
                heroTitle: "Elegância e Sofisticação Exclusivas",
                heroDesc: "Conceito de loja virtual para apresentar coleções com clareza, segurança e uma jornada de compra elegante.",
                features: ["Checkout objetivo", "Meios de pagamento integrados", "Catálogo interativo"]
            },
            {
                title: "Nexus CRM Software",
                category: "Landing Page B2B",
                label: "Projeto conceitual",
                challenge: "Explicar um produto digital com múltiplas funções de forma rápida e compreensível.",
                direction: "Mensagem orientada a benefício, demonstração visual e comparação clara da oferta.",
                solution: "Uma landing page B2B preparada para apresentar o produto e captar interesse comercial.",
                url: "https://nexus-saas.com.br",
                brand: "Nexus SaaS",
                heroTitle: "Organize oportunidades e acompanhe cada negociação",
                heroDesc: "Conceito de interface para uma plataforma de gestão comercial voltada a pequenas e médias empresas.",
                features: ["Pipeline de oportunidades", "Integração com WhatsApp", "Visão consolidada da operação"]
            },
            {
                title: "Oriente Advocacia",
                category: "Site Corporativo",
                label: "Projeto conceitual",
                challenge: "Transmitir autoridade jurídica sem recorrer a uma comunicação fria ou genérica.",
                direction: "Sobriedade visual, conteúdo organizado e contato acessível.",
                solution: "Um site corporativo que apresenta áreas de atuação e facilita o início de uma consulta.",
                url: "https://orienteadvocacia.com.br",
                brand: "Oriente Advocacia",
                heroTitle: "Soluções Jurídicas de Alta Qualidade",
                heroDesc: "Assessoria jurídica especializada para empresas e pessoas físicas com foco na ética e eficiência.",
                features: ["Consulta Online Direta", "Artigos e Blog Jurídico", "Atendimento LGPD"]
            },
            {
                title: "Bistrô Sabor Gourmet",
                category: "Gastronomia",
                label: "Projeto conceitual",
                challenge: "Traduzir a experiência do ambiente e tornar cardápio e reserva fáceis de encontrar.",
                direction: "Fotografia em destaque, informação essencial e rotas diretas para ação.",
                solution: "Uma experiência digital que apresenta o bistrô e aproxima o visitante da reserva.",
                url: "https://saborgourmet.com.br",
                brand: "Bistrô Sabor Gourmet",
                heroTitle: "Uma Experiência Gastronômica Única",
                heroDesc: "Conceito digital para apresentar a experiência do restaurante, facilitar reservas e organizar o cardápio.",
                features: ["Cardápio Digital QR Code", "Reserva de Mesas Instantânea", "Link iFood Integrado"]
            },
            {
                title: "FitPulse Dashboard",
                category: "Web App & Painel",
                label: "Projeto conceitual",
                challenge: "Reunir informações de alunos e rotina de gestão sem sobrecarregar a interface.",
                direction: "Painel modular, prioridades visuais claras e leitura rápida de cada área.",
                solution: "Um conceito de web app para centralizar acompanhamento, treinos e operação.",
                url: "https://fitpulse-dash.com.br",
                brand: "FitPulse Fitness",
                heroTitle: "Gestão Inteligente para Personal Trainers",
                heroDesc: "Acompanhe a evolução física dos seus alunos, fichas de treino e pagamentos em um só lugar.",
                features: ["Área de Membros Exclusiva", "Gráficos de Desempenho", "Notificações Automáticas"]
            }
        ];

        // Set Current Year
        document.getElementById('year').textContent = new Date().getFullYear();

        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');

        const setMobileMenu = (open, { restoreFocus = false } = {}) => {
            mobileMenu.classList.toggle('hidden', !open);
            mobileMenu.setAttribute('aria-hidden', String(!open));
            mobileMenuBtn.setAttribute('aria-expanded', String(open));
            mobileMenuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
            document.getElementById('site-header').classList.remove('header-hidden');
            if (!open) {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            } else {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
                requestAnimationFrame(() => mobileMenu.querySelector('a')?.focus());
            }
            if (!open && restoreFocus) mobileMenuBtn.focus();
        };

        mobileMenuBtn.addEventListener('click', () => {
            setMobileMenu(mobileMenu.classList.contains('hidden'));
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                setMobileMenu(false);
            });
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) setMobileMenu(false, { restoreFocus:true });
        });
        matchMedia('(min-width: 1024px)').addEventListener?.('change', event => {
            if (event.matches) setMobileMenu(false);
        });

        // Portfolio Filters
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioTrack = document.getElementById('projects-grid');
        const projectCardTemplates = [...portfolioTrack.querySelectorAll(':scope > .project-card')].map((card, index) => {
            card.dataset.projectIndex = String(index);
            return card.cloneNode(true);
        });

        // Interactive Modal Preview Functions
        const previewModal = document.getElementById('preview-modal');
        const previewViewport = document.getElementById('preview-viewport');
        const modalProjectTitle = document.getElementById('modal-project-title');
        const modalCategoryTag = document.getElementById('modal-category-tag');
        const modalExternalLink = document.getElementById('modal-external-link');
        const simBrandName = document.getElementById('sim-brand-name');
        const simContent = document.getElementById('sim-content');
        let modalReturnFocus = null;
        let modalPreviousOverflow = '';
        const modalBackgroundElements = [...document.body.children].filter(element => element !== previewModal && element.tagName !== 'SCRIPT');
        const modalFocusable = () => [...previewModal.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(element => element.offsetParent !== null);

window.openPreviewModal = function openPreviewModal(index) {
            const p = projectsData[index];
            modalReturnFocus = document.activeElement;
            trackEvent('portfolio_view', { project_name: p.title, project_category: p.category });
            modalProjectTitle.textContent = p.title;
            modalCategoryTag.textContent = `${p.label} · ${p.category}`;
            modalExternalLink.href = p.url;
            simBrandName.textContent = p.brand;

            // Render simulated dynamic interactive content inside modal iframe replacement
            simContent.innerHTML = `
                <section class="case-direction" aria-label="Direção estratégica do projeto">
                    <div class="flex flex-wrap items-center gap-3 mb-6">
                        <span class="inline-block px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] font-bold uppercase tracking-wider">${p.label}</span>
                        <span class="text-xs text-slate-500 uppercase tracking-wider">${p.category}</span>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div class="case-direction-item">
                            <span class="text-[10px] font-bold text-brand-coral uppercase tracking-[.16em]">Desafio</span>
                            <p class="text-xs text-slate-300 leading-relaxed mt-2">${p.challenge}</p>
                        </div>
                        <div class="case-direction-item">
                            <span class="text-[10px] font-bold text-brand-gold uppercase tracking-[.16em]">Direção</span>
                            <p class="text-xs text-slate-300 leading-relaxed mt-2">${p.direction}</p>
                        </div>
                        <div class="case-direction-item">
                            <span class="text-[10px] font-bold text-brand-coral uppercase tracking-[.16em]">Solução</span>
                            <p class="text-xs text-slate-300 leading-relaxed mt-2">${p.solution}</p>
                        </div>
                    </div>
                </section>

                <div class="py-12 text-center max-w-xl mx-auto space-y-4">
                    <span class="inline-block px-3 py-1 rounded-full bg-brand-coral/20 text-brand-coral text-xs font-bold uppercase tracking-wider">${p.category}</span>
                    <h2 class="text-2xl sm:text-4xl font-extrabold text-white leading-tight">${p.heroTitle}</h2>
                    <p class="text-slate-400 text-sm leading-relaxed">${p.heroDesc}</p>
                    <div class="pt-4 flex justify-center gap-3">
                        <button class="bg-brand-coral hover:bg-brand-coralHover text-white px-5 py-2.5 rounded-lg font-bold text-xs shadow-lg">Começar Agora</button>
                        <button class="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2.5 rounded-lg font-bold text-xs border border-slate-700">Saber Mais</button>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-slate-800">
                    ${p.features.map(f => `
                        <div class="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-center">
                            <i class="fa-solid fa-circle-check text-brand-coral text-lg mb-2"></i>
                            <h4 class="text-xs font-bold text-white">${f}</h4>
                        </div>
                    `).join('')}
                </div>

                <div class="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                    <div>
                        <h4 class="text-sm font-bold text-white">Gostou deste estilo para o seu site?</h4>
                        <p class="text-xs text-slate-400">Podemos criar uma versão personalizada para o seu modelo de negócio.</p>
                    </div>
                    <a href="https://wa.me/5527992768081?text=Olá!%20Vi%20o%20projeto%20${encodeURIComponent(p.title)}%20no%20portfólio%20da%20Brisola%20Agência%20e%20quero%20conversar%20sobre%20o%20meu%20site." target="_blank" rel="noopener noreferrer" class="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 shrink-0">
                        <i class="fa-brands fa-whatsapp text-sm"></i> Conversar sobre um projeto
                    </a>
                </div>
            `;

            previewModal.classList.add('is-open');
            previewModal.setAttribute('aria-hidden', 'false');
            modalBackgroundElements.forEach(element => { element.inert = true; });
            modalPreviousOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            setDeviceMode('desktop');
            document.getElementById('preview-close-primary').focus();
        }

        function closePreviewModal() {
            previewModal.classList.remove('is-open');
            previewModal.setAttribute('aria-hidden', 'true');
            modalBackgroundElements.forEach(element => { element.inert = false; });
            document.body.style.overflow = modalPreviousOverflow;
            modalReturnFocus?.focus();
        }

        function setDeviceMode(mode) {
            const btnDesktop = document.getElementById('device-desktop');
            const btnTablet = document.getElementById('device-tablet');
            const btnMobile = document.getElementById('device-mobile');

            [btnDesktop, btnTablet, btnMobile].forEach(btn => {
                btn.classList.remove('bg-brand-coral', 'text-white');
                btn.classList.add('text-slate-400');
                btn.setAttribute('aria-pressed', 'false');
            });

            previewViewport.className = '';

            if (mode === 'desktop') {
                previewViewport.className = 'preview-mode-desktop transition-all duration-300 bg-slate-900 rounded-lg shadow-2xl overflow-hidden flex flex-col';
                btnDesktop.classList.add('bg-brand-coral', 'text-white');
                btnDesktop.classList.remove('text-slate-400');
                btnDesktop.setAttribute('aria-pressed', 'true');
            } else if (mode === 'tablet') {
                previewViewport.className = 'preview-mode-tablet transition-all duration-300 bg-slate-900 shadow-2xl overflow-hidden flex flex-col my-auto';
                btnTablet.classList.add('bg-brand-coral', 'text-white');
                btnTablet.classList.remove('text-slate-400');
                btnTablet.setAttribute('aria-pressed', 'true');
            } else if (mode === 'mobile') {
                previewViewport.className = 'preview-mode-mobile transition-all duration-300 bg-slate-900 shadow-2xl overflow-hidden flex flex-col my-auto';
                btnMobile.classList.add('bg-brand-coral', 'text-white');
                btnMobile.classList.remove('text-slate-400');
                btnMobile.setAttribute('aria-pressed', 'true');
            }
        }


        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && previewModal.classList.contains('is-open')) {
                closePreviewModal();
            }
            if (event.key === 'Tab' && previewModal.classList.contains('is-open')) {
                const focusable = modalFocusable();
                if (!focusable.length) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
                else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
            }
        });

        previewModal.addEventListener('click', (event) => {
            if (event.target === previewModal) closePreviewModal();
        });

        // Budget Estimator / Configurator Script
        const calcForm = document.getElementById('calc-form');
        const configurationSummary = document.getElementById('configuration-summary');

        function getSelectedConfiguration() {
            const selectedType = calcForm.querySelector('input[name="site_type"]:checked');
            const checkedExtras = calcForm.querySelectorAll('input[name="extra"]:checked');

            return {
                selectedType: selectedType ? selectedType.value : '',
                checkedExtras
            };
        }

        function updateConfigurationSummary() {
            const { selectedType, checkedExtras } = getSelectedConfiguration();
            const extrasCount = checkedExtras.length;
            configurationSummary.textContent = `${selectedType || 'Tipo não selecionado'} · ${extrasCount} ${extrasCount === 1 ? 'recurso adicional' : 'recursos adicionais'}`;
        }

        function sendCustomWhatsAppQuote() {
            const { selectedType, checkedExtras } = getSelectedConfiguration();

            const extrasList = [];
            checkedExtras.forEach(e => extrasList.push(e.value));

            let message = `Olá Brisola Agência! Montei uma configuração pelo site da Brisola Agência:\n\n`;
            message += `📌 *Tipo de Site:* ${selectedType || 'Não selecionado'}\n`;
            message += `✨ *Recursos Adicionais:* ${extrasList.length > 0 ? extrasList.join(', ') : 'Nenhum extra'}\n\n`;
            message += `Gostaria de consultar os valores desta configuração e entender o melhor formato para o meu projeto.`;

            trackEvent('project_config_submitted', {
                project_type: selectedType || 'Não selecionado',
                extras: extrasList.join(', ')
            });
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/5527992768081?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
        }


        // Camada de eventos: pronta para Google Tag Manager / GA4.
        window.dataLayer = window.dataLayer || [];
        function trackEvent(eventName, params = {}) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: eventName, ...params });
        }

        document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
            link.addEventListener('click', () => trackEvent('whatsapp_click', {
                link_text: (link.innerText || link.getAttribute('aria-label') || 'WhatsApp').trim()
            }));
        });

        document.querySelectorAll('a[href*="instagram.com/brisolaagencia"]').forEach(link => {
            link.addEventListener('click', () => trackEvent('instagram_click'));
        });

        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', () => {
                const target = link.getAttribute('href');
                if (target && target !== '#') trackEvent('cta_click', { target });
            });
        });

        document.querySelectorAll('input[name="site_type"]').forEach(input => {
            input.addEventListener('change', () => trackEvent('project_type_selected', {
                project_type: input.value
            }));
        });

        let projectConfigStarted = false;
        calcForm.addEventListener('change', () => {
            updateConfigurationSummary();
            if (!projectConfigStarted) {
                projectConfigStarted = true;
                trackEvent('project_config_started');
            }
        });
        updateConfigurationSummary();

        // FAQ Accordion Toggle
        function toggleFaq(index) {
            const answer = document.getElementById(`faq-answer-${index}`);
            const icon = document.getElementById(`faq-icon-${index}`);
            const button = document.getElementById(`faq-button-${index}`);

            if (!answer.classList.contains('is-open')) {
                button.setAttribute('aria-expanded', 'true');
                answer.setAttribute('aria-hidden', 'false');
                answer.classList.add('is-open');
                answer.style.maxHeight = `${answer.scrollHeight + 40}px`;
                icon.classList.add('rotate-180');
            } else {
                button.setAttribute('aria-expanded', 'false');
                answer.setAttribute('aria-hidden', 'true');
                answer.classList.remove('is-open');
                answer.style.removeProperty('max-height');
                icon.classList.remove('rotate-180');
            }
        }

        // Portfolio carousel — continuous, infinite and user-controlled.
        const carouselMotionPreference = matchMedia('(prefers-reduced-motion: reduce)');
        const PORTFOLIO_AUTOPLAY_SPEED = 45;
        const PORTFOLIO_RESUME_DELAY = 1200;
        const portfolioAutoplayButton = document.getElementById('portfolio-autoplay-toggle');
        const portfolioStatus = document.getElementById('portfolio-status');
        let portfolioRAF = null;
        let portfolioLastTime = performance.now();
        let portfolioPaused = false;
        let portfolioUserPaused = carouselMotionPreference.matches || matchMedia('(max-width: 767px)').matches;
        let portfolioInView = true;
        let portfolioResumeAt = 0;
        let portfolioActivePointerId = null;
        const portfolioState = {
            activeFilter: 'all',
            loopEnabled: false,
            primaryStart: 0,
            groupWidth: 0,
            rebuilding: false,
            dragStartX: 0,
            dragStartY: 0,
            dragStartScroll: 0,
            dragged: false,
            suppressClickUntil: 0
        };

        function makePortfolioCard(template, setName) {
            const card = template.cloneNode(true);
            const inner = document.createElement('div');
            inner.className = 'project-card-inner glass-card rounded-2xl overflow-hidden flex flex-col';
            while (card.firstChild) inner.appendChild(card.firstChild);
            card.appendChild(inner);
            card.classList.remove('glass-card', 'rounded-2xl', 'overflow-hidden', 'flex', 'flex-col', 'transition-all', 'duration-300');
            card.dataset.loopSet = setName;
            if (setName !== 'primary') {
                card.dataset.loopCopy = 'true';
                card.setAttribute('aria-hidden', 'true');
                card.querySelectorAll('a, button, input, select, textarea, [tabindex]').forEach(element => element.setAttribute('tabindex', '-1'));
            } else {
                card.removeAttribute('aria-hidden');
                card.removeAttribute('data-loop-copy');
            }
            return card;
        }

        function selectedProjectTemplates(filter = portfolioState.activeFilter) {
            return projectCardTemplates.filter(card => filter === 'all' || card.dataset.category === filter);
        }

        function measurePortfolioLoop(reset = false) {
            const previousWidth = portfolioState.groupWidth;
            const previousStart = portfolioState.primaryStart;
            const previousPhase = previousWidth > 0
                ? ((portfolioTrack.scrollLeft - previousStart) % previousWidth + previousWidth) % previousWidth / previousWidth
                : 0;
            const primaryFirst = portfolioTrack.querySelector('[data-loop-set="primary"]');
            const nextFirst = portfolioTrack.querySelector('[data-loop-set="next"]');

            if (!portfolioState.loopEnabled || !primaryFirst || !nextFirst) {
                portfolioState.primaryStart = 0;
                portfolioState.groupWidth = 0;
                if (reset) portfolioTrack.scrollLeft = 0;
                return;
            }

            portfolioState.primaryStart = primaryFirst.offsetLeft;
            portfolioState.groupWidth = nextFirst.offsetLeft - primaryFirst.offsetLeft;
            if (portfolioState.groupWidth <= 0) return;
            portfolioTrack.scrollLeft = reset
                ? portfolioState.primaryStart
                : portfolioState.primaryStart + (previousPhase * portfolioState.groupWidth);
        }

        function normalizePortfolioLoop() {
            if (!portfolioState.loopEnabled || portfolioState.groupWidth <= 0 || portfolioState.rebuilding) return;
            const relative = portfolioTrack.scrollLeft - portfolioState.primaryStart;
            if (relative >= 0 && relative < portfolioState.groupWidth) return;
            const normalized = ((relative % portfolioState.groupWidth) + portfolioState.groupWidth) % portfolioState.groupWidth;
            portfolioTrack.scrollLeft = portfolioState.primaryStart + normalized;
        }

        function portfolioTick(now) {
            if (portfolioUserPaused || !portfolioInView || document.hidden || carouselMotionPreference.matches) {
                portfolioRAF = null;
                return;
            }
            const dt = Math.min((now - portfolioLastTime) / 1000, 0.064);
            portfolioLastTime = now;

            if (!portfolioPaused && now >= portfolioResumeAt && !document.hidden && portfolioState.loopEnabled && !portfolioState.rebuilding) {
                portfolioTrack.scrollLeft += PORTFOLIO_AUTOPLAY_SPEED * dt;
                normalizePortfolioLoop();
            }
            portfolioRAF = requestAnimationFrame(portfolioTick);
        }

        function startPortfolioAutoplay() {
            if (portfolioRAF !== null) return;
            portfolioLastTime = performance.now();
            portfolioRAF = requestAnimationFrame(portfolioTick);
        }

        function updatePortfolioAutoplayControl() {
            const paused = portfolioUserPaused || carouselMotionPreference.matches;
            portfolioAutoplayButton.setAttribute('aria-pressed', String(paused));
            portfolioAutoplayButton.setAttribute('aria-label', paused ? 'Reproduzir movimento do portfólio' : 'Pausar movimento do portfólio');
            portfolioAutoplayButton.querySelector('i').className = `fa-solid ${paused ? 'fa-play' : 'fa-pause'}`;
            portfolioAutoplayButton.querySelector('span').textContent = paused ? 'Reproduzir' : 'Pausar';
        }

        portfolioAutoplayButton.addEventListener('click', () => {
            portfolioUserPaused = !portfolioUserPaused;
            portfolioResumeAt = performance.now();
            updatePortfolioAutoplayControl();
            if (!portfolioUserPaused) startPortfolioAutoplay();
        });
        carouselMotionPreference.addEventListener?.('change', updatePortfolioAutoplayControl);
        if ('IntersectionObserver' in window) {
            const portfolioVisibilityObserver = new IntersectionObserver(([entry]) => {
                portfolioInView = entry.isIntersecting;
                if (portfolioInView) {
                    portfolioLastTime = performance.now();
                    startPortfolioAutoplay();
                }
            }, { rootMargin:'180px 0px' });
            portfolioVisibilityObserver.observe(portfolioTrack);
        }
        updatePortfolioAutoplayControl();

        function pausePortfolioInteraction(event) {
            portfolioPaused = true;
            portfolioActivePointerId = event.pointerId;
        }

        function resumePortfolioInteraction() {
            portfolioPaused = false;
            portfolioActivePointerId = null;
            portfolioResumeAt = performance.now() + PORTFOLIO_RESUME_DELAY;
        }

        function recoverPortfolioInteraction({ resumeImmediately = false } = {}) {
            if (portfolioPaused || portfolioActivePointerId !== null || portfolioState.dragged) {
                portfolioPaused = false;
                portfolioActivePointerId = null;
                portfolioState.dragged = false;
                portfolioTrack.classList.remove('is-dragging');
            }
            if (resumeImmediately) {
                portfolioResumeAt = performance.now();
                portfolioLastTime = performance.now();
            }
        }

        function renderPortfolio(filter = 'all') {
            const isInitialRender = portfolioRAF === null;
            portfolioState.rebuilding = true;
            portfolioState.activeFilter = filter;
            portfolioPaused = false;
            portfolioActivePointerId = null;
            portfolioState.dragged = false;
            portfolioTrack.classList.remove('is-dragging');
            const selected = selectedProjectTemplates(filter);
            const useInfiniteLoop = selected.length >= 3;
            const fragment = document.createDocumentFragment();
            const sets = useInfiniteLoop ? ['previous', 'primary', 'next'] : ['primary'];
            sets.forEach(setName => selected.forEach(template => fragment.appendChild(makePortfolioCard(template, setName))));
            portfolioTrack.replaceChildren(fragment);
            portfolioState.loopEnabled = useInfiniteLoop;
            portfolioTrack.setAttribute('aria-label', `Carrossel de projetos · ${selected.length} ${selected.length === 1 ? 'projeto' : 'projetos'}`);
            requestAnimationFrame(() => requestAnimationFrame(() => {
                measurePortfolioLoop(true);
                portfolioState.rebuilding = false;
                portfolioResumeAt = isInitialRender ? 0 : performance.now() + PORTFOLIO_RESUME_DELAY;
                startPortfolioAutoplay();
                portfolioStatus.textContent = `${selected.length} ${selected.length === 1 ? 'projeto exibido' : 'projetos exibidos'}.`;
                if (!isInitialRender && typeof window.gsap !== 'undefined' && !carouselMotionPreference.matches) {
                    const visibleCards = [...portfolioTrack.querySelectorAll('[data-loop-set="primary"] .project-card-inner')];
                    const compact = matchMedia('(max-width: 767px)').matches;
                    gsap.fromTo(visibleCards,
                        { autoAlpha:0, y:compact ? 12 : 22, clipPath:compact ? 'inset(0 0 0 0)' : 'inset(0 0 12% 0 round 20px)' },
                        { autoAlpha:1, y:0, clipPath:'inset(0 0 0 0 round 20px)', duration:compact ? .34 : .58, ease:'power3.out', stagger:{ each:.06, amount:.2 }, clearProps:'transform,opacity,visibility,clipPath' }
                    );
                }
                scheduleScrollTriggerRefresh();
            }));
        }

        filterBtns.forEach(btn => {
            btn.setAttribute('aria-pressed', String(btn.dataset.filter === 'all'));
            btn.addEventListener('click', () => {
                filterBtns.forEach(filterButton => {
                    filterButton.classList.remove('bg-brand-coral', 'text-white');
                    filterButton.classList.add('glass-card', 'text-slate-300');
                    filterButton.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('bg-brand-coral', 'text-white');
                btn.classList.remove('glass-card', 'text-slate-300');
                btn.setAttribute('aria-pressed', 'true');
                renderPortfolio(btn.dataset.filter);
            });
        });

        portfolioTrack.addEventListener('pointerdown', event => {
            if (event.pointerType === 'mouse' && event.button !== 0) return;
            pausePortfolioInteraction(event);
            portfolioState.dragged = false;
            portfolioState.dragStartX = event.clientX;
            portfolioState.dragStartY = event.clientY;
            portfolioState.dragStartScroll = portfolioTrack.scrollLeft;
            portfolioTrack.setPointerCapture?.(event.pointerId);
        });
        portfolioTrack.addEventListener('pointermove', event => {
            if (!portfolioPaused || event.pointerId !== portfolioActivePointerId) return;
            const deltaX = event.clientX - portfolioState.dragStartX;
            const deltaY = event.clientY - portfolioState.dragStartY;
            if (!portfolioState.dragged && Math.abs(deltaX) > 7 && Math.abs(deltaX) > Math.abs(deltaY)) {
                portfolioState.dragged = true;
                portfolioTrack.classList.add('is-dragging');
            }
            if (!portfolioState.dragged) return;
            event.preventDefault();
            portfolioTrack.scrollLeft = portfolioState.dragStartScroll - deltaX;
            normalizePortfolioLoop();
        });
        const finishPortfolioPointer = event => {
            if (!portfolioPaused) return;
            if (portfolioActivePointerId !== null && event.pointerId !== portfolioActivePointerId) return;
            if (portfolioState.dragged) portfolioState.suppressClickUntil = performance.now() + 360;
            const pointerId = portfolioActivePointerId;
            portfolioState.dragged = false;
            portfolioTrack.classList.remove('is-dragging');
            resumePortfolioInteraction();
            if (pointerId !== null && portfolioTrack.hasPointerCapture?.(pointerId)) portfolioTrack.releasePointerCapture(pointerId);
        };
        document.addEventListener('pointerup', finishPortfolioPointer, true);
        document.addEventListener('pointercancel', finishPortfolioPointer, true);
        portfolioTrack.addEventListener('lostpointercapture', finishPortfolioPointer);
        window.addEventListener('blur', () => recoverPortfolioInteraction());
        window.addEventListener('focus', () => recoverPortfolioInteraction({ resumeImmediately: true }));
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                recoverPortfolioInteraction({ resumeImmediately: true });
                startPortfolioAutoplay();
            }
        });
        portfolioTrack.addEventListener('click', event => {
            if (performance.now() < portfolioState.suppressClickUntil) {
                event.preventDefault();
                event.stopPropagation();
            }
        }, true);
        portfolioTrack.addEventListener('wheel', event => {
            if (Math.abs(event.deltaX) > Math.abs(event.deltaY) * .6 || event.shiftKey) {
                portfolioResumeAt = performance.now() + PORTFOLIO_RESUME_DELAY;
            }
        }, { passive: true });

        let portfolioScrollFrame;
        portfolioTrack.addEventListener('scroll', () => {
            cancelAnimationFrame(portfolioScrollFrame);
            portfolioScrollFrame = requestAnimationFrame(normalizePortfolioLoop);
        }, { passive: true });

        if ('ResizeObserver' in window) {
            const portfolioResizeObserver = new ResizeObserver(() => {
                if (portfolioState.rebuilding) return;
                portfolioResumeAt = performance.now() + 320;
                requestAnimationFrame(() => measurePortfolioLoop(false));
                scheduleScrollTriggerRefresh();
            });
            portfolioResizeObserver.observe(portfolioTrack);
        } else {
            window.addEventListener('resize', () => measurePortfolioLoop(false), { passive: true });
        }
        renderPortfolio('all');

        // Header, progress and restrained ambient spotlight
        const siteHeader = document.getElementById('site-header');
        const scrollProgress = document.getElementById('scroll-progress');
        let previousScrollY = window.scrollY;
        let scrollDirection = '';
        let directionTravel = 0;
        let scrollFrame;

        function updateScrollUI() {
            const currentY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = maxScroll > 0 ? Math.min(1, Math.max(0, currentY / maxScroll)) : 0;
            scrollProgress.style.transform = `scaleX(${progress})`;
            siteHeader.classList.toggle('header-scrolled', currentY > 24);
            const menuOpen = !mobileMenu.classList.contains('hidden');
            const desktop = matchMedia('(min-width: 768px)').matches;
            if (desktop) {
                const delta = currentY - previousScrollY;
                const nextDirection = delta > 0 ? 'down' : delta < 0 ? 'up' : scrollDirection;
                if (nextDirection !== scrollDirection) directionTravel = 0;
                directionTravel += Math.abs(delta);
                scrollDirection = nextDirection;
                if (scrollDirection === 'down' && currentY > 520 && directionTravel > 18 && !menuOpen) {
                    siteHeader.classList.add('header-hidden');
                    directionTravel = 0;
                }
                if ((scrollDirection === 'up' && directionTravel > 10) || currentY <= 80 || menuOpen) {
                    siteHeader.classList.remove('header-hidden');
                    directionTravel = 0;
                }
            } else {
                siteHeader.classList.toggle('header-hidden', currentY > 520 && currentY > previousScrollY + 4 && !menuOpen);
                if (currentY < previousScrollY - 4 || menuOpen) siteHeader.classList.remove('header-hidden');
            }
            previousScrollY = currentY;
        }
        window.addEventListener('scroll', () => {
            cancelAnimationFrame(scrollFrame);
            scrollFrame = requestAnimationFrame(updateScrollUI);
        }, { passive: true });
        updateScrollUI();

        const servicesSection = document.getElementById('servicos');
        servicesSection.addEventListener('pointermove', event => {
            if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
            const bounds = servicesSection.getBoundingClientRect();
            servicesSection.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
            servicesSection.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
        });

        function initializeProjectVideoPreviews() {
            // Future-ready opt-in: add data-preview-video="/media/demo.mp4" to a project card.
            // No video is created or downloaded unless a real project asset is supplied.
            document.querySelectorAll('.project-card[data-preview-video]').forEach(card => {
                const source = card.dataset.previewVideo;
                const frame = card.querySelector('.aspect-video');
                if (!source || !frame) return;
                let video;
                const ensureVideo = () => {
                    if (video) return video;
                    video = document.createElement('video');
                    video.dataset.projectVideo = '';
                    video.src = source;
                    video.muted = true;
                    video.loop = true;
                    video.playsInline = true;
                    video.preload = 'metadata';
                    frame.prepend(video);
                    return video;
                };
                if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
                    card.addEventListener('pointerenter', () => ensureVideo().play().catch(() => {}));
                    card.addEventListener('pointerleave', () => { if (video) video.pause(); });
                } else {
                    card.addEventListener('click', event => {
                        if (!event.target.closest('[data-video-toggle]')) return;
                        const player = ensureVideo();
                        if (player.paused) player.play().catch(() => {}); else player.pause();
                    });
                }
            });
        }

        let motionMedia;
        let mobileRevealObserver;
        let motionInitialized = false;

        function clearMotionStyles() {
            document.documentElement.classList.remove('motion-ready', 'gsap-desktop-ready');
            document.querySelectorAll('[data-reveal]').forEach(element => {
                element.removeAttribute('data-reveal');
                element.classList.remove('is-visible');
                element.style.removeProperty('--reveal-delay');
            });
            document.querySelectorAll('.manifesto-step,.manifesto-node,.manifesto-line,.manifesto-site-hub').forEach(element => element.classList.remove('is-active'));
            document.querySelectorAll('.manifesto-progress span').forEach((segment, index) => {
                segment.style.removeProperty('--fill');
                if (index === 0) segment.style.setProperty('--fill', '1');
            });
        }

        function initializeManifestoStory() {
            const manifesto = document.getElementById('manifesto');
            if (!manifesto || !('IntersectionObserver' in window)) return () => {};
            const steps = [...manifesto.querySelectorAll('.manifesto-step')];
            const segments = [...manifesto.querySelectorAll('.manifesto-progress span')];
            const nodes = [...manifesto.querySelectorAll('.manifesto-node')];
            const paths = [...manifesto.querySelectorAll('.manifesto-line')];
            const hub = manifesto.querySelector('.manifesto-site-hub');

            const activate = index => {
                steps.forEach((step, stepIndex) => step.classList.toggle('is-active', stepIndex === index));
                nodes.forEach(node => node.classList.remove('is-active'));
                paths.forEach(path => path.classList.remove('is-active'));
                hub?.classList.toggle('is-active', index === 2);
                segments.forEach((segment, segmentIndex) => segment.style.setProperty('--fill', segmentIndex <= index ? '1' : '0'));

                const activeNodes = index === 0 ? ['brand'] : index === 1 ? ['instagram', 'google'] : index === 2 ? ['instagram', 'google', 'brand'] : ['whatsapp'];
                activeNodes.forEach(name => manifesto.querySelector(`[data-node="${name}"]`)?.classList.add('is-active'));
                const activePaths = index === 2 ? ['instagram', 'google', 'brand'] : index === 3 ? ['whatsapp'] : activeNodes;
                activePaths.forEach(name => manifesto.querySelector(`[data-path="${name}"]`)?.classList.add('is-active'));
            };

            activate(0);
            const observer = new IntersectionObserver(entries => {
                entries.filter(entry => entry.isIntersecting).forEach(entry => activate(steps.indexOf(entry.target)));
            }, { threshold: .35, rootMargin: '-16% 0px -32% 0px' });
            steps.forEach(step => observer.observe(step));
            console.info('Brisola Motion: manifesto vertical interativo ativo');
            return () => observer.disconnect();
        }

        function initializeMobileReveals() {
            if (!('IntersectionObserver' in window)) return () => {};
            const queue = (element, delay = 0) => {
                if (!element) return;
                element.dataset.reveal = '';
                element.style.setProperty('--reveal-delay', `${delay}ms`);
            };
            const groups = ['#home', '#portfolio', '#manifesto', '#servicos', '#processo', '#calculadora', '#sobre', '#faq', '.final-cta'];
            groups.forEach(groupSelector => {
                const group = document.querySelector(groupSelector);
                if (!group) return;
                if (group.id === 'portfolio') {
                    const header = group.querySelector('.md\\:items-end');
                    [header?.querySelector('span'), header?.querySelector('h2'), header?.querySelector('p'), document.getElementById('portfolio-filters'), portfolioTrack]
                        .filter(Boolean)
                        .forEach((item, index) => queue(item, Math.min(index, 6) * 80));
                    return;
                }
                const items = group.querySelectorAll('h1, h2, h3, p, .filter-btn, .project-card, .calc-option, .glass-card, a[class*="bg-brand-coral"]');
                [...items].forEach((item, index) => queue(item, Math.min(index, 6) * 80));
            });
            document.documentElement.classList.add('motion-ready');
            mobileRevealObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-visible');
                    mobileRevealObserver.unobserve(entry.target);
                });
            }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
            document.querySelectorAll('[data-reveal]').forEach(item => mobileRevealObserver.observe(item));
            return () => {
                mobileRevealObserver?.disconnect();
                mobileRevealObserver = null;
                clearMotionStyles();
            };
        }

        function setupDesktopMotion() {
            if (typeof window.gsap === 'undefined') {
                console.warn('Brisola Motion ERROR: GSAP unavailable');
                clearMotionStyles();
                return () => {};
            }
            if (typeof window.ScrollTrigger === 'undefined') {
                console.warn('Brisola Motion ERROR: ScrollTrigger unavailable');
                clearMotionStyles();
                return () => {};
            }

            console.info('Brisola Motion: GSAP loaded');
            gsap.registerPlugin(ScrollTrigger);
            console.info('Brisola Motion: ScrollTrigger registered');
            document.documentElement.classList.add('gsap-desktop-ready');
            const ease = 'power3.out';
            const manifestoCleanup = initializeManifestoStory();

            const desktopContext = gsap.context(() => {
                const revealGroup = (trigger, items) => {
                    const targets = items.filter(Boolean);
                    if (!trigger || !targets.length) return;
                    const timeline = gsap.timeline({ scrollTrigger: { trigger, start: 'top 82%', once: true } });
                    targets.forEach((target, index) => {
                        const headline = target.matches('h1,h2');
                        const card = target.matches('.project-card,.glass-card') || target.parentElement?.id === 'calc-form';
                        const y = headline ? 42 : card ? 30 : 24;
                        const duration = headline ? .86 : card ? .78 : .72;
                        const position = index === 0 ? 0 : index === 1 ? .12 : index === 2 ? .22 : .32 + ((index - 3) * .12);
                        gsap.set(target, { autoAlpha: 0, y, scale: card ? .985 : 1 });
                        timeline.to(target, { autoAlpha: 1, y: 0, scale: 1, duration, ease, clearProps: 'transform,opacity,visibility' }, position);
                    });
                };

                const hero = document.querySelector('#home .text-center');
                if (hero) {
                    const badge = hero.querySelector('[data-motion="hero-badge"]');
                    const title = hero.querySelector('[data-motion="hero-title"]');
                    const copy = hero.querySelector('[data-motion="hero-copy"]');
                    const actions = hero.querySelector('[data-motion="hero-actions"]');
                    const cue = hero.querySelector('[data-motion="hero-cue"]');
                    const proof = hero.querySelector('[data-motion="hero-proof"]');
                    const heroItems = [badge,copy,actions,cue,proof].filter(Boolean);
                    gsap.set(heroItems, { autoAlpha:0, y:24 });
                    // Keep the text LCP paintable; motion uses transform/blur without hiding it.
                    gsap.set(title, { y:32, filter:'blur(4px)' });
                    const heroTimeline = gsap.timeline({ defaults:{ ease } });
                    heroTimeline
                        .to(badge, { autoAlpha:1, y:0, duration:.46 }, 0)
                        .to(title, { autoAlpha:1, y:0, filter:'blur(0px)', duration:.74, clearProps:'filter' }, .1)
                        .to(copy, { autoAlpha:1, y:0, duration:.58 }, .28)
                        .to(actions, { autoAlpha:1, y:0, duration:.54 }, .38)
                        .to(cue, { autoAlpha:1, y:0, duration:.4 }, .54)
                        .to(proof, { autoAlpha:1, y:0, duration:.52, clearProps:'transform,opacity,visibility' }, .6);
                }

                const portfolio = document.getElementById('portfolio');
                const portfolioHeader = portfolio?.querySelector('.md\\:items-end');
                revealGroup(portfolio, [portfolioHeader?.querySelector('span'), portfolioHeader?.querySelector('h2'), portfolioHeader?.querySelector('p'), document.querySelector('.portfolio-toolbar')]);
                const portfolioCards = [...portfolioTrack.querySelectorAll('[data-loop-set="primary"] .project-card-inner')];
                gsap.fromTo(portfolioCards, { autoAlpha:0, y:24, clipPath:'inset(0 0 14% 0 round 20px)' }, { autoAlpha:1, y:0, clipPath:'inset(0 0 0 0 round 20px)', duration:.7, ease, stagger:{ each:.06, amount:.24 }, clearProps:'transform,opacity,visibility,clipPath', scrollTrigger:{ trigger:portfolioTrack, start:'top 86%', once:true } });

                const services = document.getElementById('servicos');
                const servicesHeader = services?.querySelector('.text-center');
                revealGroup(services, [servicesHeader?.querySelector('span'), servicesHeader?.querySelector('h2'), servicesHeader?.querySelector('p'), ...(services ? [...services.querySelectorAll('.grid > .glass-card')] : [])]);

                const process = document.getElementById('processo');
                revealGroup(process, [process?.querySelector('.max-w-2xl > span'), process?.querySelector('.max-w-2xl > h2'), process?.querySelector('.max-w-2xl > p')]);
                const processSteps = process ? [...process.querySelectorAll('[data-motion="process-step"]')] : [];
                processSteps.forEach(step => ScrollTrigger.create({ trigger:step, start:'top 72%', onEnter:() => step.classList.add('is-active'), onEnterBack:() => step.classList.add('is-active') }));

                const configurator = document.getElementById('calculadora');
                const configuratorHeader = configurator?.querySelector('.text-center');
                revealGroup(configurator, [configuratorHeader?.querySelector('span'), configuratorHeader?.querySelector('h2'), configuratorHeader?.querySelector('p'), ...(configurator ? [...configurator.querySelectorAll('#calc-form > div')] : [])]);

                const about = document.getElementById('sobre');
                const aboutCopy = about?.querySelector('.founder-copy');
                revealGroup(about, [about?.querySelector('.founder-portrait'), aboutCopy?.querySelector(':scope > span'), aboutCopy?.querySelector(':scope > h2'), aboutCopy?.querySelector(':scope > p'), aboutCopy?.querySelector('.founder-points')]);

                const faq = document.getElementById('faq');
                revealGroup(faq, [faq?.querySelector('.text-center span'), faq?.querySelector('.text-center h2'), ...(faq ? [...faq.querySelectorAll('.space-y-4 > .glass-card')] : [])]);

                const finalCta = document.querySelector('.final-cta');
                revealGroup(finalCta, [finalCta?.querySelector('span'), finalCta?.querySelector('h2'), finalCta?.querySelector('p'), finalCta?.querySelector('a')]);

                gsap.to('.hero-glow-coral', { yPercent: 12, scale: 1.07, ease: 'none', scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1.1 } });
                gsap.to('.hero-glow-gold', { yPercent: -9, xPercent: -6, ease: 'none', scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1.1 } });
            }, document.body);

            const refresh = () => {
                if (document.documentElement.classList.contains('gsap-desktop-ready')) ScrollTrigger.refresh();
            };
            document.fonts?.ready.then(refresh);
            window.addEventListener('load', refresh, { once: true });
            requestAnimationFrame(refresh);
            console.info('Brisola Motion: desktop advanced motion active');

            return () => {
                manifestoCleanup();
                desktopContext.revert();
                document.documentElement.classList.remove('gsap-desktop-ready');
                document.querySelectorAll('.manifesto-progress span').forEach(segment => segment.style.removeProperty('--fill'));
            };
        }

        function scheduleScrollTriggerRefresh() {
            if (typeof window.ScrollTrigger === 'undefined' || !document.documentElement.classList.contains('gsap-desktop-ready')) return;
            window.clearTimeout(scheduleScrollTriggerRefresh.timer);
            scheduleScrollTriggerRefresh.timer = window.setTimeout(() => ScrollTrigger.refresh(), 160);
        }

        function initializeMotion() {
            if (motionInitialized) return;
            motionInitialized = true;
            if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
                clearMotionStyles();
                return;
            }
            if (typeof window.gsap === 'undefined') {
                console.warn('Brisola Motion ERROR: GSAP unavailable');
                if (matchMedia('(max-width: 1023px)').matches) initializeMobileReveals();
                return;
            }
            if (typeof window.ScrollTrigger === 'undefined') {
                console.warn('Brisola Motion ERROR: ScrollTrigger unavailable');
                if (matchMedia('(max-width: 1023px)').matches) initializeMobileReveals();
                return;
            }
            motionMedia = gsap.matchMedia();
            motionMedia.add('(min-width: 1024px)', () => setupDesktopMotion());
            motionMedia.add('(max-width: 1023px)', () => {
                const revealCleanup = initializeMobileReveals();
                const manifestoCleanup = initializeManifestoStory();
                return () => {
                    manifestoCleanup();
                    revealCleanup();
                };
            });
        }

        function startMotionSafely() {
            try {
                initializeMotion();
            } catch (error) {
                console.error('Brisola Motion ERROR: initialization failed', error);
                motionMedia?.revert();
                clearMotionStyles();
            }
        }

        function playBrandIntro() {
            const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
            const intro = document.getElementById('brand-intro');
            if (reduced || sessionStorage.getItem('brisola_intro_seen')) {
                startMotionSafely();
                return;
            }
            document.documentElement.classList.add('intro-enabled');
            document.body.classList.add('intro-lock');
            window.setTimeout(() => {
                intro.classList.add('is-complete');
                document.body.classList.remove('intro-lock');
                sessionStorage.setItem('brisola_intro_seen', '1');
                startMotionSafely();
                window.setTimeout(() => document.documentElement.classList.remove('intro-enabled'), 550);
            }, 1850);
        }

        if (!matchMedia('(prefers-reduced-motion: reduce)').matches && !sessionStorage.getItem('brisola_intro_seen')) {
            document.documentElement.classList.add('intro-enabled');
            document.body.classList.add('intro-lock');
        }

        window.addEventListener('DOMContentLoaded', () => {
            try {
                initializeProjectVideoPreviews();
                playBrandIntro();
            } catch (error) {
                console.error('Brisola Motion ERROR: startup failed', error);
                document.documentElement.classList.remove('motion-ready', 'intro-enabled', 'gsap-desktop-ready');
                document.body.classList.remove('intro-lock');
            }
        }, { once: true });
