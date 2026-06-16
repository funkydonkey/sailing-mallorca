// Maritime Minimalism - Sailing Croatia Interactive Features
// app.js

(function() {
    'use strict';

    function initApp() {
        // ============================================
        // 1. Tab Switching
        // ============================================

        const tabButtons = document.querySelectorAll('.tab-button');
        const mobileTabButtons = document.querySelectorAll('.mobile-tab-button');
        const tabContents = document.querySelectorAll('.tab-content');
        const whatsappCTA = document.getElementById('whatsappCTA');

        function switchTab(tabId) {
            // Скрыть все табы
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            // Показать выбранный таб
            const activeTab = document.getElementById(tabId);
            if (activeTab) {
                activeTab.classList.add('active');
            }

            // Обновить активное состояние кнопок (desktop)
            tabButtons.forEach(btn => {
                if (btn.dataset.tab === tabId) {
                    btn.style.color = '#001e40'; // primary color
                    btn.style.fontWeight = '600';
                } else {
                    btn.style.color = '#43474f'; // on-surface-variant
                    btn.style.fontWeight = '500';
                }
            });

            // Обновить активное состояние кнопок (mobile)
            mobileTabButtons.forEach(btn => {
                if (btn.dataset.tab === tabId) {
                    btn.classList.add('bg-blue-50', 'text-blue-800', 'scale-110');
                } else {
                    btn.classList.remove('bg-blue-50', 'text-blue-800', 'scale-110');
                }
            });

            // Показать/скрыть WhatsApp CTA (только на Info табе)
            if (whatsappCTA) {
                if (tabId === 'info') {
                    whatsappCTA.classList.remove('hidden');
                } else {
                    whatsappCTA.classList.add('hidden');
                }
            }

            // Прокрутить страницу вверх
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Desktop tab buttons
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.dataset.tab;
                switchTab(tabId);
            });
        });

        // Mobile tab buttons
        mobileTabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.dataset.tab;
                switchTab(tabId);
            });
        });

        // Инициализация первого таба
        switchTab('gallery');

        // ============================================
        // 2. Lightbox Gallery
        // ============================================

        const galleryCards = document.querySelectorAll('.gallery-card');
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxTitle = document.getElementById('lightboxTitle');
        const lightboxDescription = document.getElementById('lightboxDescription');
        const closeLightboxBtn = document.getElementById('closeLightbox');
        const prevImageBtn = document.getElementById('prevImage');
        const nextImageBtn = document.getElementById('nextImage');

        let currentImageIndex = 0;
        const galleryData = [];

        // Собрать данные галереи
        galleryCards.forEach((card, index) => {
            const title = card.dataset.title;
            const description = card.dataset.description;
            const image = card.dataset.image;

            galleryData.push({ title, description, image });

            card.addEventListener('click', function() {
                currentImageIndex = index;
                openLightbox();
            });
        });

        function openLightbox() {
            const data = galleryData[currentImageIndex];
            lightboxImage.src = data.image;
            lightboxImage.alt = data.title;
            lightboxTitle.textContent = data.title;
            lightboxDescription.textContent = data.description;

            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Заблокировать прокрутку фона
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Восстановить прокрутку
        }

        function showNextImage() {
            currentImageIndex = (currentImageIndex + 1) % galleryData.length;
            openLightbox();
        }

        function showPrevImage() {
            currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
            openLightbox();
        }

        // Закрыть lightbox
        closeLightboxBtn.addEventListener('click', closeLightbox);

        // Навигация
        nextImageBtn.addEventListener('click', showNextImage);
        prevImageBtn.addEventListener('click', showPrevImage);

        // Закрыть по клику вне изображения
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // ============================================
        // 3. Keyboard Navigation
        // ============================================

        document.addEventListener('keydown', function(e) {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'Escape') {
                    closeLightbox();
                } else if (e.key === 'ArrowRight') {
                    showNextImage();
                } else if (e.key === 'ArrowLeft') {
                    showPrevImage();
                }
            }
        });

        // ============================================
        // 4. FAQ Accordion
        // ============================================

        const faqButtons = document.querySelectorAll('.faq-button');

        faqButtons.forEach(button => {
            button.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const icon = this.querySelector('.material-symbols-outlined');
                const isExpanded = this.getAttribute('aria-expanded') === 'true';

                // Закрыть все другие FAQ
                faqButtons.forEach(btn => {
                    if (btn !== this) {
                        btn.nextElementSibling.classList.remove('active');
                        btn.querySelector('.material-symbols-outlined').classList.remove('rotate-180');
                        btn.setAttribute('aria-expanded', 'false');
                    }
                });

                // Переключить текущий FAQ
                if (isExpanded) {
                    answer.classList.remove('active');
                    icon.classList.remove('rotate-180');
                    this.setAttribute('aria-expanded', 'false');
                } else {
                    answer.classList.add('active');
                    icon.classList.add('rotate-180');
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        });

        // ============================================
        // 5. Share Button (Web Share API)
        // ============================================

        const shareButton = document.getElementById('shareButton');

        if (shareButton) {
            shareButton.addEventListener('click', async function() {
                const shareData = {
                    title: 'Sailing Croatia — Adriatic Azure',
                    text: 'Откройте для себя скрытые жемчужины Адриатики на парусной яхте Bavaria C42. 7 дней незабываемого приключения!',
                    url: window.location.href
                };

                try {
                    // Проверить поддержку Web Share API
                    if (navigator.share) {
                        await navigator.share(shareData);
                        console.log('Контент успешно поделен');
                    } else {
                        // Fallback: скопировать ссылку в буфер обмена
                        await navigator.clipboard.writeText(window.location.href);

                        // Показать уведомление
                        const originalText = shareButton.innerHTML;
                        shareButton.innerHTML = `
                            <span class="material-symbols-outlined text-xl">check</span>
                            <span class="hidden md:inline text-sm font-label font-medium">Скопировано!</span>
                        `;

                        setTimeout(() => {
                            shareButton.innerHTML = originalText;
                        }, 2000);
                    }
                } catch (error) {
                    console.error('Ошибка при попытке поделиться:', error);
                }
            });
        }

        // ============================================
        // 6. Smooth Scroll для якорных ссылок
        // ============================================

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // ============================================
        // 7. Lazy Loading для изображений (оптимизация)
        // ============================================

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            observer.unobserve(img);
                        }
                    }
                });
            });

            // Можно добавить data-src атрибут к изображениям для lazy loading
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // ============================================
        // 8. Анимация появления элементов при скролле
        // ============================================

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Применить анимацию к карточкам галереи
        document.querySelectorAll('.gallery-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            fadeInObserver.observe(card);
        });

        // ============================================
        // 9. Отслеживание активной секции при скролле
        // ============================================

        // Опционально: можно добавить автоматическое переключение табов при скролле
        // (но в данном случае табы переключаются вручную, поэтому закомментировано)

        /*
        const tabSections = document.querySelectorAll('.tab-content');
        const tabObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    const tabId = entry.target.id;
                    switchTab(tabId);
                }
            });
        }, { threshold: 0.5 });

        tabSections.forEach(section => {
            tabObserver.observe(section);
        });
        */

        // ============================================
        // 10. Управление состоянием для accessibility
        // ============================================

        // Обработка фокуса для клавиатурной навигации
        const focusableElements = document.querySelectorAll(
            'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        // Управление trap фокуса в lightbox
        if (lightbox) {
            lightbox.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    const focusableContent = lightbox.querySelectorAll(
                        'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
                    );
                    const firstElement = focusableContent[0];
                    const lastElement = focusableContent[focusableContent.length - 1];

                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            });
        }

        // ============================================
        // Инициализация завершена
        // ============================================

        console.log('Maritime Minimalism - Sailing Croatia v5 initialized');
        console.log('Design System: Maritime Minimalism');
        console.log('Framework: Tailwind CSS 3.x + Vanilla JS');
    }

    // ============================================
    // 0. Content Loading & Rendering
    // ============================================

    async function loadContentAndRender() {
        try {
            const response = await fetch('content.json');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const content = await response.json();
            renderPrice(content.price);
            renderRoute(content.route);
            renderFaq(content.faq);
            renderGallery(content.gallery);
        } catch (error) {
            console.warn('content.json not loaded, using static fallback content:', error);
        }
    }

    function renderPrice(price) {
        const el = document.getElementById('price-per-person');
        if (el) {
            el.textContent = `${price.currency}${price.perPerson}`;
        }
    }

    function renderRoute(route) {
        const totalEl = document.getElementById('route-total-distance');
        if (totalEl) {
            totalEl.textContent = `${route.totalDistance} миль`;
        }

        const timeline = document.getElementById('route-timeline');
        if (!timeline) {
            return;
        }

        timeline.innerHTML = route.days.map((day, index) => {
            const isLast = index === route.days.length - 1;
            const connector = isLast ? '' : '<div class="w-0.5 h-full bg-outline-variant/30 mt-4"></div>';
            const wrapperClass = isLast ? '' : 'pb-8';

            return `
                <div class="flex gap-6">
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 rounded-full bg-${day.color} text-on-${day.color} flex items-center justify-center font-bold text-lg font-label flex-shrink-0">
                            ${day.number}
                        </div>
                        ${connector}
                    </div>
                    <div class="${wrapperClass}">
                        <div class="inline-block bg-${day.color} text-on-${day.color} px-3 py-1 rounded-full text-xs font-medium mb-3 font-label uppercase tracking-wider">
                            ${day.distance}
                        </div>
                        <h3 class="text-2xl font-bold text-primary mb-2 font-headline">${day.title}</h3>
                        <p class="text-on-surface-variant leading-relaxed mb-4">
                            ${day.description}
                        </p>
                        <div class="flex items-center gap-2 text-sm text-on-surface-variant">
                            <span class="material-symbols-outlined text-lg">schedule</span>
                            <span>${day.duration}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function renderFaq(faq) {
        const list = document.getElementById('faq-list');
        if (!list) {
            return;
        }

        list.innerHTML = faq.map(item => `
            <div class="bg-surface-container-low rounded-xl overflow-hidden editorial-shadow border border-outline-variant/20">
                <button class="faq-button w-full flex items-center justify-between p-6 text-left hover:bg-surface-container-high transition-colors" aria-expanded="false">
                    <span class="font-bold text-lg text-primary font-headline">${item.question}</span>
                    <span class="material-symbols-outlined text-2xl text-on-surface-variant transition-transform">expand_more</span>
                </button>
                <div class="faq-answer px-6 pb-0">
                    <div class="pb-6 text-on-surface-variant leading-relaxed border-t border-outline-variant/20 pt-4">
                        ${item.answer}
                    </div>
                </div>
            </div>
        `).join('');
    }

    function renderGallery(gallery) {
        gallery.forEach(item => {
            const card = document.querySelector(`.gallery-card[data-gallery-id="${item.id}"]`);
            if (!card) {
                return;
            }

            card.dataset.title = item.title;
            card.dataset.description = item.description;
            card.dataset.image = item.image;

            const img = card.querySelector('img');
            if (img) {
                img.src = item.image;
                img.alt = item.title;
            }

            const titleEl = card.querySelector('h3');
            if (titleEl) {
                titleEl.textContent = item.title;
            }

            const descEl = card.querySelector('p');
            if (descEl) {
                descEl.textContent = item.description;
            }
        });
    }

    loadContentAndRender().then(initApp);

})();
