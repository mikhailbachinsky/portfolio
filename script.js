function initApp() {
  // 1. Управление бургер-меню
  const burgerBtn = document.getElementById('burgerBtn');
  const footerBurgerBtn = document.getElementById('footerBurgerBtn');
  const menuModal = document.getElementById('menuModal');
  const menuBackdrop = document.getElementById('menuBackdrop');
  const menuLinks = document.querySelectorAll('.menu-modal a');
  let syncActiveNavState = null;

  const updateBurgerState = (isActive) => {
    [burgerBtn, footerBurgerBtn].forEach(btn => {
      if (!btn) return;
      if (isActive) {
        btn.classList.add('is-active');
        btn.setAttribute('aria-expanded', 'true');
        btn.setAttribute('aria-label', 'Закрыть меню');
      } else {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Открыть меню');
      }
    });
  };

  const preventScrollOutsideModal = (e) => {
    if (menuModal && menuModal.contains(e.target)) {
      return;
    }
    if (e.cancelable) {
      e.preventDefault();
    }
  };

  const closeMenu = () => {
    if (!menuModal) return;
    menuModal.classList.remove('is-open');
    updateBurgerState(false);
    if (menuBackdrop) {
      menuBackdrop.classList.remove('is-active');
    }

    // Remove scroll-blocking listeners
    window.removeEventListener('touchmove', preventScrollOutsideModal, { passive: false });
    window.removeEventListener('wheel', preventScrollOutsideModal, { passive: false });
    document.removeEventListener('touchmove', preventScrollOutsideModal, { passive: false });

    document.documentElement.classList.remove('menu-open');
    document.body.classList.remove('menu-open');
  };

  const openMenu = () => {
    if (!menuModal) return;
    if (typeof syncActiveNavState === 'function') {
      syncActiveNavState();
    }

    // Block background scroll gestures outside modal
    window.addEventListener('touchmove', preventScrollOutsideModal, { passive: false });
    window.addEventListener('wheel', preventScrollOutsideModal, { passive: false });
    document.addEventListener('touchmove', preventScrollOutsideModal, { passive: false });

    document.documentElement.classList.add('menu-open');
    document.body.classList.add('menu-open');

    menuModal.classList.add('is-open');
    updateBurgerState(true);
    if (menuBackdrop) {
      menuBackdrop.classList.add('is-active');
    }
  };

  const toggleMenu = (event) => {
    event.stopPropagation();
    if (!menuModal) return;
    const isOpen = menuModal.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  if (burgerBtn && menuModal) {
    burgerBtn.addEventListener('click', toggleMenu);
  }

  if (footerBurgerBtn && menuModal) {
    footerBurgerBtn.addEventListener('click', toggleMenu);
  }

  if (menuModal) {
    menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        closeMenu();
        if (href && href.startsWith('#')) {
          const targetId = href.substring(1);
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    if (menuBackdrop) {
      menuBackdrop.addEventListener('click', () => {
        closeMenu();
      });
      menuBackdrop.addEventListener('touchmove', (e) => {
        e.preventDefault();
      }, { passive: false });
      menuBackdrop.addEventListener('wheel', (e) => {
        e.preventDefault();
      }, { passive: false });
    }

    document.addEventListener('click', (event) => {
      const isInsideBurger = (burgerBtn && burgerBtn.contains(event.target)) || 
                             (footerBurgerBtn && footerBurgerBtn.contains(event.target));
      if (!isInsideBurger && !menuModal.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuModal.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  // 2. Анимация росчерков на главном экране (М и Б) — гарантированный запуск при входе
  const heroM = document.getElementById('svg-anim-trigger-2');
  const heroB = document.getElementById('svg-anim-trigger');
  
  setTimeout(() => {
    if (heroM) heroM.classList.add('animate-start-2');
    if (heroB) heroB.classList.add('animate-start');
  }, 100);

  // 3. Анимация росчерков: высокопроизводительный IntersectionObserver без накладных расходов на скролл
  const scrollFlourishes = [
    {
      heading: document.querySelector('.about__title'),
      container: document.getElementById('svg-anim-trigger-3'),
      className: 'animate-start-3'
    },
    {
      heading: document.querySelector('.projects__title'),
      container: document.getElementById('svg-anim-trigger-4'),
      className: 'animate-start-4'
    },
    {
      heading: document.querySelector('.skills__title'),
      container: document.getElementById('svg-anim-trigger-5'),
      className: 'animate-start-5'
    },
    {
      heading: document.querySelector('.algorithm__title'),
      container: document.getElementById('svg-anim-trigger-wf'),
      className: 'animate-start-wf'
    },
    {
      heading: document.querySelector('.faq__title'),
      container: document.getElementById('svg-anim-trigger-faq'),
      className: 'animate-start-faq'
    },
    {
      heading: document.querySelector('.contacts__title'),
      container: document.getElementById('svg-anim-trigger-6'),
      className: 'animate-start-6'
    }
  ];

  if ('IntersectionObserver' in window) {
    const flourishObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const item = scrollFlourishes.find(f => f.heading === entry.target);
        if (!item || !item.container) return;

        if (entry.isIntersecting) {
          if (!item.container.classList.contains(item.className)) {
            item.container.classList.add(item.className);
          }
        }
      });
    }, {
      rootMargin: '0px 0px -15% 0px',
      threshold: 0.1
    });

    scrollFlourishes.forEach(item => {
      if (item.heading) flourishObserver.observe(item.heading);
    });
  } else {
    // Fallback
    scrollFlourishes.forEach(item => {
      if (item.container) item.container.classList.add(item.className);
    });
  }

  // 4. Логика хедера и параллакс-эффекта: экран «Обо мне» наползает на закрепленный Hero,
  // создавая объемный многослойный параллакс с затуханием и смещением фото и текста.
  const header = document.querySelector('.header');
  const heroSection = document.querySelector('.hero');
  const heroWrapper = document.getElementById('heroWrapper');
  const heroContent = document.querySelector('.hero__content');
  const heroPhoto = document.querySelector('.hero__photo');
  const heroLineM = document.querySelector('.hero__line--m');
  const heroLineB = document.querySelector('.hero__line--b');
  const heroOverlay = document.getElementById('heroOverlay');
  const footerSection = document.getElementById('footer') || document.querySelector('.footer');

  if (header && heroSection) {
    let isSticky = false;
    let isNearFooter = false;
    let hideTimeout = null;
    let headerRafId = null;

    // Кеширование геометрических размеров страницы
    let cachedHeroHeight = (heroWrapper ? heroWrapper.offsetHeight : heroSection.offsetHeight) || window.innerHeight;
    let cachedDocHeight = document.documentElement.scrollHeight;
    let cachedWinHeight = window.innerHeight;
    let cachedScrollable = Math.max(cachedDocHeight - cachedWinHeight, 1);

    const updateCachedMetrics = () => {
      cachedHeroHeight = (heroWrapper ? heroWrapper.offsetHeight : heroSection.offsetHeight) || window.innerHeight;
      cachedDocHeight = document.documentElement.scrollHeight;
      cachedWinHeight = window.innerHeight;
      cachedScrollable = Math.max(cachedDocHeight - cachedWinHeight, 1);
    };

    window.addEventListener('resize', updateCachedMetrics, { passive: true });

    // Параллакс-эффект элементов Главного экрана
    const updateHeroParallax = (scrollY) => {
      if (!heroSection) return;
      const heroHeight = cachedHeroHeight || window.innerHeight;

      // Вычисляем трансформации только пока Hero виден в окне просмотра
      if (scrollY <= heroHeight * 1.25) {
        const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);
        const isReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (isReducedMotion) {
          if (heroContent) {
            heroContent.style.transform = '';
            heroContent.style.opacity = '';
          }
          if (heroPhoto) heroPhoto.style.transform = '';
          if (heroLineM) heroLineM.style.transform = '';
          if (heroLineB) heroLineB.style.transform = '';
          if (heroOverlay) heroOverlay.style.opacity = '0';
          return;
        }

        // Текстовая группа: плавное смещение вверх с затуханием (прозрачность от 1 до 0)
        if (heroContent) {
          const contentY = scrollY * 0.28;
          const contentOpacity = Math.max(1 - progress * 1.2, 0);
          const contentScale = 1 - progress * 0.035;
          heroContent.style.transform = `translate3d(0, ${contentY.toFixed(1)}px, 0) scale(${contentScale.toFixed(3)})`;
          heroContent.style.opacity = contentOpacity.toFixed(3);
        }

        // Фотография: глубокий параллакс с плавным смещением
        if (heroPhoto) {
          const photoY = scrollY * 0.16;
          const photoScale = 1 - progress * 0.025;
          heroPhoto.style.transform = `translate3d(0, ${photoY.toFixed(1)}px, 0) scale(${photoScale.toFixed(3)})`;
        }

        // Каллиграфические росчерки М и Б
        if (heroLineM) {
          const lineMY = scrollY * 0.2;
          heroLineM.style.transform = `translate3d(0, ${lineMY.toFixed(1)}px, 0)`;
        }
        if (heroLineB) {
          const lineBY = scrollY * 0.14;
          heroLineB.style.transform = `translate3d(0, ${lineBY.toFixed(1)}px, 0)`;
        }

        // Затемнение/виньетка при перекрытии экраном «Обо мне»
        if (heroOverlay) {
          const overlayOpacity = Math.min(progress * 0.32, 0.32);
          heroOverlay.style.opacity = overlayOpacity.toFixed(3);
        }
      }
    };

    // Элемент прогресс-бара скролла вверху страницы
    const scrollProgressBar = document.getElementById('scrollProgressBar');

    const updateScrollProgress = (scrollY) => {
      if (!scrollProgressBar) return;
      const progress = Math.min(Math.max((scrollY / cachedScrollable) * 100, 0), 100);
      scrollProgressBar.style.width = `${progress.toFixed(1)}%`;
    };

    let lastHeaderScrollY = window.scrollY || 0;

    const handleHeaderScroll = (scrollY) => {
      const isMenuOpen = menuModal && menuModal.classList.contains('is-open');
      if (isMenuOpen) return;

      const isMobile = window.innerWidth < 980;
      const triggerDown = cachedHeroHeight - 60;
      const triggerUp = cachedHeroHeight - 140;

      const scrollDelta = scrollY - lastHeaderScrollY;
      lastHeaderScrollY = scrollY;

      // Проверка приближения к самому низу страницы (подвал) с гистерезисом
      const atBottom = (cachedWinHeight + scrollY) >= (cachedDocHeight - 40);
      if (atBottom) {
        isNearFooter = true;
      } else {
        isNearFooter = false;
      }

      if (isNearFooter) {
        // Достигли самого низа: плавающий хедер плавно уезжает вверх
        if (isSticky) {
          isSticky = false;
          header.classList.remove('header--sticky');
          header.classList.add('header--hiding');
          clearTimeout(hideTimeout);
          hideTimeout = setTimeout(() => {
            header.classList.remove('header--hiding');
          }, 240);
        }
      } else if (scrollY < triggerUp) {
        // Вернулись в Hero: плавно возвращаем хедер в обычный статический поток
        if (isSticky) {
          isSticky = false;
          header.classList.remove('header--sticky');
          header.classList.add('header--hiding');
          clearTimeout(hideTimeout);
          hideTimeout = setTimeout(() => {
            header.classList.remove('header--hiding');
          }, 240);
        }
      } else if (isMobile) {
        // --- Мобильная версия: скрывается при скролле вниз, быстро появляется при обратном скролле вверх ---
        if (scrollDelta > 7) {
          if (isSticky) {
            isSticky = false;
            clearTimeout(hideTimeout);
            header.classList.remove('header--sticky');
            header.classList.add('header--hiding');
            hideTimeout = setTimeout(() => {
              header.classList.remove('header--hiding');
            }, 240);
          }
        } else if (scrollDelta < -7) {
          if (!isSticky) {
            isSticky = true;
            clearTimeout(hideTimeout);
            header.classList.remove('header--hiding');
            header.classList.add('header--sticky');
          }
        }
      } else {
        // --- Десктопная версия: классический плавающий хедер при скролле контента ---
        if (scrollY >= triggerDown && !isSticky) {
          isSticky = true;
          clearTimeout(hideTimeout);
          header.classList.remove('header--hiding');
          header.classList.add('header--sticky');
        }
      }
    };

    // 4.1. Подсветка активной секции в меню шапки (Scrollspy)
    const navLinks = document.querySelectorAll('.header__nav .nav-link');
    const mobileNavLinks = document.querySelectorAll('.menu-modal__link');
    const trackedSectionIds = ['about', 'projects', 'skills', 'workflow', 'faq', 'contacts'];
    const trackedSections = trackedSectionIds
      .map(id => ({ id, el: document.getElementById(id) }))
      .filter(item => item.el !== null);

    let currentActiveNavId = null;
    let isManualClick = false;
    let manualClickTimeout = null;

    const setActiveNav = (activeId) => {
      if (activeId === currentActiveNavId) return;
      currentActiveNavId = activeId;

      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const isActive = activeId && href === `#${activeId}`;
        link.classList.toggle('is-active', !!isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });

      mobileNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        const isActive = activeId && href === `#${activeId}`;
        link.classList.toggle('is-active', !!isActive);
      });
    };

    let sectionOffsets = [];
    const updateSectionOffsets = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      sectionOffsets = trackedSections.map(({ id, el }) => {
        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY;
        const height = el.offsetHeight;
        return { id, top, bottom: top + height };
      });
    };
    updateSectionOffsets();
    window.addEventListener('resize', updateSectionOffsets, { passive: true });

    const updateActiveNavSection = (scrollY) => {
      if (isManualClick) return;

      // Если в самом низу страницы (подвал / контакты)
      if ((cachedWinHeight + scrollY) >= (cachedDocHeight - 100)) {
        setActiveNav('contacts');
        return;
      }

      // Если в самом верху (первый экран Hero)
      if (scrollY < 220) {
        setActiveNav(null);
        return;
      }

      // Точка фокуса чтения (верхняя треть экрана)
      const focusPoint = scrollY + Math.min(Math.max(cachedWinHeight * 0.28, 140), 240);

      let foundId = null;
      for (let i = sectionOffsets.length - 1; i >= 0; i--) {
        const s = sectionOffsets[i];
        if (focusPoint >= s.top && focusPoint <= s.bottom) {
          foundId = s.id;
          break;
        }
      }

      if (!foundId) {
        for (let i = sectionOffsets.length - 1; i >= 0; i--) {
          const s = sectionOffsets[i];
          if (focusPoint >= s.top) {
            foundId = s.id;
            break;
          }
        }
      }

      setActiveNav(foundId);
    };

    syncActiveNavState = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      updateActiveNavSection(scrollY);
    };

    const handleNavClick = (link) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.slice(1);
        setActiveNav(targetId);
        isManualClick = true;
        clearTimeout(manualClickTimeout);
        manualClickTimeout = setTimeout(() => {
          isManualClick = false;
          const scrollY = window.scrollY || window.pageYOffset || 0;
          updateActiveNavSection(scrollY);
        }, 800);
      }
    };

    navLinks.forEach(link => {
      link.addEventListener('click', () => handleNavClick(link));
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => handleNavClick(link));
    });

    const onScroll = () => {
      if (!headerRafId) {
        headerRafId = requestAnimationFrame(() => {
          const scrollY = Math.max(window.scrollY || window.pageYOffset || 0, 0);
          handleHeaderScroll(scrollY);
          updateActiveNavSection(scrollY);
          updateScrollProgress(scrollY);
          updateHeroParallax(scrollY);
          headerRafId = null;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      updateCachedMetrics();
      updateSectionOffsets();
      onScroll();
    }, { passive: true });

    const initialScrollY = Math.max(window.scrollY || window.pageYOffset || 0, 0);
    handleHeaderScroll(initialScrollY);
    updateActiveNavSection(initialScrollY);
    updateScrollProgress(initialScrollY);
    updateHeroParallax(initialScrollY);
  }

  // 5. Обработка формы в секции «Контакты»
  const contactForm = document.getElementById('contactForm');
  const contactStatus = document.getElementById('contact-form-status');
  const submitBtn = document.getElementById('contact-submit-btn');
  const submitText = submitBtn ? submitBtn.querySelector('.contacts-form__submit-text') : null;
  const contactConsentCheckbox = document.getElementById('contact-consent-checkbox');
  const messageInput = document.getElementById('contact-message');
  const messageCounter = document.getElementById('contact-message-counter');
  const messageCurrent = messageCounter ? messageCounter.querySelector('.contacts-form__counter-current') : null;
  const messageHint = document.getElementById('contact-message-hint');
  const contactInfoInput = document.getElementById('contact-info');
  const contactChannelBadge = document.getElementById('contact-channel-badge');
  const contactChannelIcon = document.getElementById('contact-channel-icon');
  const contactChannelText = document.getElementById('contact-channel-text');
  const topicChips = document.querySelectorAll('.contacts-form__topic-chip');

  // Валидация чекбокса согласия на обработку персональных данных
  if (contactConsentCheckbox && submitBtn) {
    submitBtn.disabled = !contactConsentCheckbox.checked;
    contactConsentCheckbox.addEventListener('change', () => {
      submitBtn.disabled = !contactConsentCheckbox.checked;
    });
  }

  // 5.1. Умная маска ввода телефона и автоматическое определение канала связи (Telegram, Email, Телефон)
  if (contactInfoInput) {
    const isPhoneNumber = (val) => {
      const trimmed = val.trim();
      if (!trimmed) return false;
      // Если введены буквы или символ @ — пользователь пишет e-mail или никнейм в соцсети
      if (/[@a-zA-Zа-яА-ЯёЁ]/.test(trimmed)) return false;
      // Иначе если содержит только цифры, плюсы, скобки, пробелы и дефисы
      return /^[\d+() -]+$/.test(trimmed);
    };

    const formatPhone = (val) => {
      let digits = val.replace(/\D/g, '');
      if (!digits) return '';

      // Автоматическая нормализация первой цифры к 7
      if (digits[0] === '9') {
        digits = '7' + digits;
      } else if (digits[0] === '8' || digits[0] === '7') {
        digits = '7' + digits.substring(1);
      } else {
        digits = '7' + digits.substring(1);
      }

      digits = digits.substring(0, 11);

      let formatted = '+7 (';
      if (digits.length > 1) {
        formatted += digits.substring(1, Math.min(4, digits.length));
      }
      if (digits.length >= 4) {
        formatted += ') ' + digits.substring(4, Math.min(7, digits.length));
      }
      if (digits.length >= 7) {
        formatted += '-' + digits.substring(7, Math.min(9, digits.length));
      }
      if (digits.length >= 9) {
        formatted += '-' + digits.substring(9, Math.min(11, digits.length));
      }

      return formatted;
    };

    const updateChannelDetection = () => {
      if (!contactChannelBadge) return;
      const rawVal = contactInfoInput.value;
      const trimmed = rawVal.trim();
      const wrap = contactInfoInput.closest('.contacts-form__input-wrap');

      if (!trimmed) {
        contactChannelBadge.classList.remove('is-visible', 'contacts-form__channel-badge--tg', 'contacts-form__channel-badge--mail', 'contacts-form__channel-badge--phone');
        if (wrap) wrap.classList.remove('has-channel');
        return;
      }

      let detected = null;

      // Определение Telegram: начинается с @ или t.me/
      if (trimmed.startsWith('@') || /^t\.me\//i.test(trimmed) || /^https?:\/\/t\.me\//i.test(trimmed)) {
        detected = 'tg';
      }
      // Определение Email: содержит @ и точку в доменной части
      else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) || (trimmed.includes('@') && !trimmed.startsWith('@'))) {
        detected = 'mail';
      }
      // Определение телефона: только телефонные символы и от 3+ цифр
      else if (isPhoneNumber(trimmed) && trimmed.replace(/\D/g, '').length >= 3) {
        detected = 'phone';
      }

      contactChannelBadge.classList.remove('contacts-form__channel-badge--tg', 'contacts-form__channel-badge--mail', 'contacts-form__channel-badge--phone');

      if (detected === 'tg') {
        contactChannelBadge.classList.add('is-visible', 'contacts-form__channel-badge--tg');
        if (contactChannelIcon) {
          contactChannelIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`;
        }
        if (contactChannelText) contactChannelText.textContent = 'Telegram';
        if (wrap) wrap.classList.add('has-channel');
      } else if (detected === 'mail') {
        contactChannelBadge.classList.add('is-visible', 'contacts-form__channel-badge--mail');
        if (contactChannelIcon) {
          contactChannelIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;
        }
        if (contactChannelText) contactChannelText.textContent = 'Email';
        if (wrap) wrap.classList.add('has-channel');
      } else if (detected === 'phone') {
        contactChannelBadge.classList.add('is-visible', 'contacts-form__channel-badge--phone');
        if (contactChannelIcon) {
          contactChannelIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
        }
        if (contactChannelText) contactChannelText.textContent = 'Телефон';
        if (wrap) wrap.classList.add('has-channel');
      } else {
        contactChannelBadge.classList.remove('is-visible');
        if (wrap) wrap.classList.remove('has-channel');
      }
    };

    contactInfoInput.addEventListener('keydown', (e) => {
      // При Backspace, если осталось только начало маски (+7 (), очищаем поле полностью
      if (e.key === 'Backspace' && contactInfoInput.value.length <= 5 && contactInfoInput.value.startsWith('+7')) {
        contactInfoInput.value = '';
        updateChannelDetection();
      }
    });

    contactInfoInput.addEventListener('input', () => {
      const val = contactInfoInput.value;
      if (isPhoneNumber(val)) {
        const formatted = formatPhone(val);
        if (formatted) {
          contactInfoInput.value = formatted;
        }
      }
      updateChannelDetection();
    });

    contactInfoInput.addEventListener('paste', (e) => {
      const pasteData = (e.clipboardData || window.clipboardData).getData('text') || '';
      if (isPhoneNumber(pasteData)) {
        e.preventDefault();
        contactInfoInput.value = formatPhone(pasteData);
      }
      setTimeout(updateChannelDetection, 0);
    });

    updateChannelDetection();
  }

  // 5.2. Динамический подсчёт символов и подсказка в поле сообщения
  let updateMessageCounter = null;
  if (messageInput && messageCounter && messageCurrent) {
    updateMessageCounter = () => {
      const len = messageInput.value.length;
      messageCurrent.textContent = len;

      if (messageHint) {
        if (len === 0) {
          messageHint.textContent = 'Минимум 10 символов';
          messageHint.classList.remove('is-valid');
          messageHint.style.color = '';
        } else if (len < 10) {
          const remaining = 10 - len;
          messageHint.textContent = `Ещё ${remaining} ${remaining === 1 ? 'символ' : (remaining < 5 ? 'символа' : 'символов')} до минимума`;
          messageHint.classList.remove('is-valid');
          messageHint.style.color = '';
        } else {
          messageHint.textContent = '✓ Достаточно информации';
          messageHint.classList.add('is-valid');
          messageHint.style.color = '';
        }
      }

      if (len >= 1000) {
        messageCounter.classList.add('is-limit');
        messageCounter.classList.remove('is-warning');
      } else if (len >= 900) {
        messageCounter.classList.add('is-warning');
        messageCounter.classList.remove('is-limit');
      } else {
        messageCounter.classList.remove('is-warning', 'is-limit');
      }
    };

    messageInput.addEventListener('input', updateMessageCounter);
    updateMessageCounter();
  }

  // 5.3. Быстрый выбор темы проекта через кликабельные чипы
  if (topicChips.length > 0 && messageInput) {
    let currentActiveTemplate = null;

    topicChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const template = chip.getAttribute('data-template') || '';
        const wasActive = chip.classList.contains('is-active');

        // Снимаем активность со всех чипов
        topicChips.forEach(c => c.classList.remove('is-active'));

        if (wasActive) {
          // Повторный клик снимает выбор
          if (currentActiveTemplate && messageInput.value.startsWith(currentActiveTemplate)) {
            messageInput.value = messageInput.value.slice(currentActiveTemplate.length);
          }
          currentActiveTemplate = null;
        } else {
          chip.classList.add('is-active');
          const currentText = messageInput.value;

          if (!currentText.trim() || currentText === currentActiveTemplate) {
            messageInput.value = template;
          } else if (currentActiveTemplate && currentText.startsWith(currentActiveTemplate)) {
            // Мягко заменяем тему, сохраняя продолжение текста пользователя
            const userTextTail = currentText.slice(currentActiveTemplate.length);
            messageInput.value = template + userTextTail;
          } else if (!currentText.includes(template)) {
            messageInput.value = template + currentText;
          }

          currentActiveTemplate = template;
          messageInput.focus();
          const len = messageInput.value.length;
          messageInput.setSelectionRange(len, len);
        }

        if (updateMessageCounter) {
          updateMessageCounter();
        }
      });
    });
  }

  // 5.4. Отправка формы с элегантным спиннером загрузки (Pending State)
  if (contactForm && contactStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (contactConsentCheckbox && !contactConsentCheckbox.checked) {
        contactConsentCheckbox.focus();
        if (submitBtn) submitBtn.disabled = true;
        return;
      }

      if (messageInput && messageInput.value.trim().length < 10) {
        messageInput.focus();
        if (messageHint) {
          messageHint.textContent = 'Пожалуйста, напишите не менее 10 символов';
          messageHint.style.color = '#DC2626';
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.remove('is-success');
        submitBtn.classList.add('is-loading');
        if (submitText) submitText.textContent = 'Отправка...';
      }

      setTimeout(() => {
        contactForm.reset();

        // Сброс чипов тем
        topicChips.forEach(c => c.classList.remove('is-active'));
        if (typeof updateChannelDetection === 'function') {
          updateChannelDetection();
        } else if (contactChannelBadge) {
          contactChannelBadge.classList.remove('is-visible', 'contacts-form__channel-badge--tg', 'contacts-form__channel-badge--mail', 'contacts-form__channel-badge--phone');
          const wrap = contactInfoInput ? contactInfoInput.closest('.contacts-form__input-wrap') : null;
          if (wrap) wrap.classList.remove('has-channel');
        }

        // Сброс счетчика символов
        if (messageCurrent) messageCurrent.textContent = '0';
        if (messageCounter) messageCounter.classList.remove('is-warning', 'is-limit');
        if (messageHint) {
          messageHint.textContent = 'Минимум 10 символов';
          messageHint.classList.remove('is-valid');
          messageHint.style.color = '';
        }

        // Сброс чекбокса согласия
        if (contactConsentCheckbox) {
          contactConsentCheckbox.checked = false;
        }

        if (submitBtn) {
          submitBtn.classList.remove('is-loading');
          submitBtn.classList.add('is-success');
          if (submitText) submitText.textContent = 'Отправлено!';

          setTimeout(() => {
            submitBtn.classList.remove('is-success');
            if (submitText) submitText.textContent = 'Отправить';
            submitBtn.disabled = !contactConsentCheckbox || !contactConsentCheckbox.checked;
          }, 3200);
        }

        contactStatus.textContent = 'Спасибо за обращение! Сообщение успешно отправлено.';
        contactStatus.style.display = 'block';
        contactStatus.className = 'contacts-form__status contacts-form__status--success';

        setTimeout(() => {
          contactStatus.style.display = 'none';
        }, 5000);
      }, 900);
    });
  }

  // 5.5. Кнопка «Задать вопрос» из секции FAQ — точный переход к форме обратной связи и мгновенный фокус
  const faqAskBtn = document.getElementById('faq-ask-btn') || document.querySelector('.faq__footer-btn');
  if (faqAskBtn) {
    faqAskBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const formTarget = document.getElementById('contacts-form-col') || document.getElementById('contactForm') || document.querySelector('.contacts-form');
      if (formTarget) {
        const header = document.querySelector('.header');
        const headerOffset = header ? header.offsetHeight + 20 : 80;
        const rect = formTarget.getBoundingClientRect();
        const targetScrollY = window.pageYOffset + rect.top - headerOffset;

        window.scrollTo({
          top: Math.max(0, targetScrollY),
          behavior: 'smooth'
        });

        if (history.pushState) {
          history.pushState(null, '', '#contactForm');
        }

        // После завершения плавного скролла сразу переводим фокус на поле ввода, чтобы посетитель мог сразу написать вопрос
        setTimeout(() => {
          const nameInput = document.getElementById('contact-name');
          const messageInput = document.getElementById('contact-message');
          if (nameInput && !nameInput.value.trim()) {
            nameInput.focus({ preventScroll: true });
          } else if (messageInput) {
            messageInput.focus({ preventScroll: true });
          }
        }, 600);
      }
    });
  }

  // 6. Кнопка «Наверх» в футере
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 7. Модальные окна «Политика обработки персональных данных» и «Согласие на обработку данных» с поддержкой URL-хэша (#privacy, #consent)
  const policyModal = document.getElementById('policyModal');
  const consentModal = document.getElementById('consentModal');

  const openLegalModal = (modal, targetHash) => {
    if (!modal) return;
    modal.removeAttribute('hidden');
    requestAnimationFrame(() => {
      modal.classList.add('modal--active');
      document.body.classList.add('body--modal-open');
    });

    if (targetHash && window.location.hash !== targetHash) {
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', targetHash);
      } else {
        window.location.hash = targetHash;
      }
    }
  };

  const closeLegalModal = (modal, clearHash = true) => {
    if (!modal) return;
    modal.classList.remove('modal--active');
    document.body.classList.remove('body--modal-open');
    setTimeout(() => {
      modal.setAttribute('hidden', '');
    }, 250);

    if (clearHash) {
      const currentHash = (window.location.hash || '').toLowerCase();
      if (currentHash === '#privacy' || currentHash === '#policy' || currentHash === '#consent') {
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', window.location.pathname + window.location.search);
        } else {
          window.location.hash = '';
        }
      }
    }
  };

  const bindLegalModalEvents = (openBtnId, modal, closeBtnIds, overlayId, targetHash) => {
    const openBtn = document.getElementById(openBtnId);
    const overlay = document.getElementById(overlayId);

    if (openBtn && modal) {
      openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openLegalModal(modal, targetHash);
      });
    }

    closeBtnIds.forEach(id => {
      const btn = document.getElementById(id);
      if (btn && modal) {
        btn.addEventListener('click', () => closeLegalModal(modal));
      }
    });

    if (overlay && modal) {
      overlay.addEventListener('click', () => closeLegalModal(modal));
    }
  };

  bindLegalModalEvents('openPolicyBtn', policyModal, ['closePolicyBtn', 'ackPolicyBtn'], 'policyModalOverlay', '#privacy');
  bindLegalModalEvents('openConsentBtn', consentModal, ['closeConsentBtn', 'ackConsentBtn'], 'consentModalOverlay', '#consent');

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (policyModal && policyModal.classList.contains('modal--active')) {
        closeLegalModal(policyModal);
      }
      if (consentModal && consentModal.classList.contains('modal--active')) {
        closeLegalModal(consentModal);
      }
    }
  });

  // Маршрутизация модальных окон через URL-хэш (#privacy / #policy / #consent)
  const syncModalsWithUrlHash = () => {
    const hash = (window.location.hash || '').toLowerCase();
    if (hash === '#privacy' || hash === '#policy') {
      if (consentModal && consentModal.classList.contains('modal--active')) {
        closeLegalModal(consentModal, false);
      }
      openLegalModal(policyModal);
    } else if (hash === '#consent') {
      if (policyModal && policyModal.classList.contains('modal--active')) {
        closeLegalModal(policyModal, false);
      }
      openLegalModal(consentModal);
    } else {
      if (policyModal && policyModal.classList.contains('modal--active')) {
        closeLegalModal(policyModal, false);
      }
      if (consentModal && consentModal.classList.contains('modal--active')) {
        closeLegalModal(consentModal, false);
      }
    }
  };

  // Проверяем хэш при первичной загрузке страницы
  syncModalsWithUrlHash();

  // Отслеживаем изменения хэша (кнопки браузера «Назад» / «Вперёд» или клики по якорным ссылкам)
  window.addEventListener('hashchange', syncModalsWithUrlHash);
  window.addEventListener('popstate', syncModalsWithUrlHash);

  // Копирование email в модальных окнах при клике
  document.querySelectorAll('.modal__inline-copy').forEach(copyBtn => {
    copyBtn.addEventListener('click', () => {
      const textToCopy = copyBtn.getAttribute('data-copy') || copyBtn.textContent.trim();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalTitle = copyBtn.getAttribute('title') || '';
          copyBtn.setAttribute('title', 'Скопировано в буфер обмена!');
          copyBtn.classList.add('is-copied');
          setTimeout(() => {
            copyBtn.setAttribute('title', originalTitle);
            copyBtn.classList.remove('is-copied');
          }, 2000);
        }).catch(() => {});
      }
    });
  });

  // 7. Полноэкранная 3D Window-карусель дизайн-проектов с выравниванием по левой силовой линии
  function initProjectsWindowCarousel() {
    const projectsSection = document.getElementById('projects');
    const carousel = document.getElementById('projectsCarousel');
    const track = document.getElementById('projectsTrack');
    const cards = Array.from(document.querySelectorAll('.project-card'));
    const bottomPrevBtn = document.getElementById('carouselBottomPrevBtn');
    const bottomNextBtn = document.getElementById('carouselBottomNextBtn');
    const dots = Array.from(document.querySelectorAll('.carousel-dot'));

    if (!carousel || !cards.length) return;

    const total = cards.length;
    let currentIndex = 0;
    const AUTOPLAY_DELAY = 5000; // 5 секунд на проект

    // Состояние таймера
    let startTime = null;
    let elapsedBeforePause = 0;
    let isTimerRunning = false;
    let timerRafId = null;

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // Расчет расстояний и углов 3D-пространства
    const getLayoutConfig = () => {
      const w = window.innerWidth;
      if (w >= 1440) {
        return { nextOffset: 800, rotateAngle: -28, prevOffset: -380 };
      }
      if (w >= 1200) {
        return { nextOffset: 760, rotateAngle: -28, prevOffset: -350 };
      }
      if (w >= 980) {
        return { nextOffset: 650, rotateAngle: -26, prevOffset: -300 };
      }
      if (w >= 768) {
        return { nextOffset: 540, rotateAngle: -24, prevOffset: -260 };
      }
      if (w >= 480) {
        return { nextOffset: Math.min(380, w * 0.85), rotateAngle: -20, prevOffset: -180 };
      }
      return { nextOffset: w - 24, rotateAngle: -15, prevOffset: -140 };
    };

    // Обновление прогресс-бара таймера в активной полосочке
    const updateTimerUI = (elapsed) => {
      const progress = Math.min(1, Math.max(0, elapsed / AUTOPLAY_DELAY));

      dots.forEach((dot, idx) => {
        const bar = dot.querySelector('.carousel-dot__progress');
        if (bar) {
          if (idx === currentIndex) {
            bar.style.transform = `scaleX(${progress})`;
          } else {
            bar.style.transform = 'scaleX(0)';
          }
        }
      });
    };

    const tick = (now) => {
      if (!isTimerRunning) return;
      const elapsed = (now - startTime) + elapsedBeforePause;
      updateTimerUI(elapsed);

      if (elapsed >= AUTOPLAY_DELAY) {
        nextSlide();
      } else {
        timerRafId = requestAnimationFrame(tick);
      }
    };

    const startTimer = () => {
      if (timerRafId) cancelAnimationFrame(timerRafId);
      startTime = performance.now();
      isTimerRunning = true;
      timerRafId = requestAnimationFrame(tick);
    };

    const pauseTimer = () => {
      if (!isTimerRunning) return;
      isTimerRunning = false;
      if (timerRafId) cancelAnimationFrame(timerRafId);
      elapsedBeforePause += performance.now() - startTime;
    };

    const resumeTimer = () => {
      if (isTimerRunning) return;
      startTime = performance.now();
      isTimerRunning = true;
      timerRafId = requestAnimationFrame(tick);
    };

    const resetTimer = () => {
      if (timerRafId) cancelAnimationFrame(timerRafId);
      elapsedBeforePause = 0;
      isTimerRunning = false;
      updateTimerUI(0);
      startTimer();
    };

    // Обновление положения карточек в реальном 3D пространстве
    const updateCardsPosition = () => {
      const config = getLayoutConfig();

      cards.forEach((card, i) => {
        let offset = (i - currentIndex) % total;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        card.classList.remove('is-active', 'is-side', 'is-hidden', 'is-resetting');

        if (offset === 0) {
          // Главная активная карточка: строго по левой силовой линии (x = 0)
          card.classList.add('is-active');
          card.style.transform = 'translate3d(0, 0, 0) rotateY(0deg) scale(1)';
          card.style.opacity = '1';
          card.style.zIndex = '10';
          card.style.pointerEvents = 'auto';
          card.setAttribute('aria-hidden', 'false');
        } else if (offset === 1) {
          // Следующая карточка справа: настоящий 3D поворот Y, Z-глубина
          card.classList.add('is-side');
          const translateX = config.nextOffset;
          card.style.transform = `translate3d(${translateX}px, 0, -80px) rotateY(${config.rotateAngle}deg) scale(0.88)`;
          card.style.opacity = '0.62';
          card.style.zIndex = '6';
          card.style.pointerEvents = 'auto';
          card.setAttribute('aria-hidden', 'true');
        } else if (offset === -1) {
          // Предыдущая карточка слева: 3D-поворот в противоположную сторону
          card.classList.add('is-side');
          const translateX = config.prevOffset;
          card.style.transform = `translate3d(${translateX}px, 0, -80px) rotateY(${-config.rotateAngle}deg) scale(0.88)`;
          card.style.opacity = '0.45';
          card.style.zIndex = '5';
          card.style.pointerEvents = 'auto';
          card.setAttribute('aria-hidden', 'true');
        } else {
          // Дальние карточки
          card.classList.add('is-hidden');
          const dir = offset > 0 ? 1 : -1;
          const translateX = dir > 0 ? config.nextOffset * 1.5 : config.prevOffset * 1.5;
          const rotY = dir > 0 ? -38 : 38;
          card.style.transform = `translate3d(${translateX}px, 0, -180px) rotateY(${rotY}deg) scale(0.74)`;
          card.style.opacity = '0';
          card.style.zIndex = '1';
          card.style.pointerEvents = 'none';
          card.setAttribute('aria-hidden', 'true');
        }
      });

      // Точки-индикаторы: активная точка увеличивается
      dots.forEach((dot, idx) => {
        const isActive = idx === currentIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    };

    // Плавный переход к карточке со сбросом таймера и блокировкой hover-смещения во время полёта
    let animationTimer = null;
    const goToSlide = (index, restart = true) => {
      currentIndex = (index % total + total) % total;
      carousel.classList.add('is-animating');
      if (animationTimer) clearTimeout(animationTimer);
      animationTimer = setTimeout(() => {
        carousel.classList.remove('is-animating');
      }, 700);

      updateCardsPosition();
      if (restart) {
        resetTimer();
      }
    };

    const nextSlide = () => goToSlide(currentIndex + 1);
    const prevSlide = () => goToSlide(currentIndex - 1);

    // Приостановка таймера при наведении курсора или фокусе в область карусели
    carousel.addEventListener('mouseenter', () => {
      pauseTimer();
    });

    carousel.addEventListener('mouseleave', () => {
      resumeTimer();
    });

    carousel.addEventListener('focusin', () => {
      pauseTimer();
    });

    carousel.addEventListener('focusout', () => {
      resumeTimer();
    });

    // Нажатие на кнопки управления внизу
    if (bottomPrevBtn) {
      bottomPrevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
      });
    }

    if (bottomNextBtn) {
      bottomNextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
      });
    }

    // Клик по точкам
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(idx);
      });
    });

    // Управление выпадающим списком дизайн-кейсов в шапке
    const navDropdown = document.getElementById('nav-projects-dropdown');
    const navDropdownLink = document.getElementById('nav-link-projects');
    if (navDropdown && navDropdownLink) {
      navDropdownLink.addEventListener('click', (e) => {
        // Если кликнули на ссылку, проверяем клик на десктопе или мобильном
        if (window.innerWidth >= 980) {
          // На десктопе клик переключает меню
          navDropdown.classList.toggle('is-open');
        }
      });
      document.addEventListener('click', (e) => {
        if (!navDropdown.contains(e.target)) {
          navDropdown.classList.remove('is-open');
        }
      });
    }

    // Клик по ссылкам кейсов в навигации и меню
    document.querySelectorAll('[data-goto-slide]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const slideIdx = parseInt(el.dataset.gotoSlide, 10);
        const projectsSec = document.getElementById('projects');
        if (projectsSec) {
          projectsSec.scrollIntoView({ behavior: 'smooth' });
        }
        if (!isNaN(slideIdx)) {
          setTimeout(() => goToSlide(slideIdx), 300);
        }
        const menuModal = document.getElementById('menuModal');
        if (menuModal && menuModal.classList.contains('is-open')) {
          menuModal.classList.remove('is-open');
          const burgerBtn = document.getElementById('burgerBtn');
          if (burgerBtn) burgerBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Проверка, находится ли курсор на высоте центральной карточки (независимо от X)
    const isAtCardHeight = (clientY) => {
      const rect = carousel.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return false;
      return clientY >= (rect.top - 12) && clientY <= (rect.bottom + 12);
    };

    // Состояние перетаскивания курсором (Drag / Swipe мышью)
    let isMouseDown = false;
    let mouseStartX = 0;
    let mouseStartY = 0;
    let mouseMoved = false;

    // Клик по карточкам: по боковым — центрирование; по активной — переход по ссылке (data-href)
    cards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        if (mouseMoved) return;
        if (idx !== currentIndex) {
          goToSlide(idx);
        } else {
          const href = card.dataset.href;
          if (href) {
            const isExternal = href.startsWith('http://') || href.startsWith('https://');
            if (isExternal) {
              const link = document.createElement('a');
              link.href = href;
              link.target = '_blank';
              link.rel = 'noopener noreferrer';
              document.body.appendChild(link);
              link.click();
              link.remove();
            } else {
              window.location.href = href;
            }
          }
        }
      });
    });

    // 1. Переключение колёсиком мыши на высоте карточки с блокировкой вертикального скролла страницы
    let wheelCooldown = false;
    const handleWheel = (e) => {
      if (!isAtCardHeight(e.clientY)) return;

      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      if (absY > 6 || absX > 6) {
        // Блокируем скролл страницы, чтобы страница не опускалась при прокрутке карточек
        e.preventDefault();

        if (wheelCooldown) return;

        if (e.deltaY > 0 || e.deltaX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }

        wheelCooldown = true;
        setTimeout(() => {
          wheelCooldown = false;
        }, 420);
      }
    };

    // Слушаем с passive: false, чтобы работал e.preventDefault() на всей ширине экрана на высоте карточки
    window.addEventListener('wheel', handleWheel, { passive: false });

    // 2. Листание движением курсора мыши (Drag-to-slide / свайп мышью)
    const containerForEvents = projectsSection || carousel;

    containerForEvents.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return; // только левая кнопка
      if (!isAtCardHeight(e.clientY)) return;
      if (e.target.closest('button, a, input, textarea')) return;

      isMouseDown = true;
      mouseStartX = e.clientX;
      mouseStartY = e.clientY;
      mouseMoved = false;
      pauseTimer();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;

      const diffX = e.clientX - mouseStartX;
      if (Math.abs(diffX) > 8) {
        mouseMoved = true;
        carousel.classList.add('is-dragging');
      }
    });

    // Расчёт количества перелистываемых карточек в зависимости от пройденного расстояния
    const calculateSlideSteps = (absDiffX) => {
      if (absDiffX < 35) return 0;
      // Базовая ширина шага: пропорциональна ширине экрана и карточки (на десктопе ~260px)
      const stepThreshold = Math.max(180, Math.min(270, window.innerWidth * 0.28));
      if (absDiffX < stepThreshold) {
        return 1;
      }
      if (absDiffX < stepThreshold * 2) {
        return 2;
      }
      return 3;
    };

    window.addEventListener('mouseup', (e) => {
      if (!isMouseDown) return;
      isMouseDown = false;
      carousel.classList.remove('is-dragging');

      const diffX = e.clientX - mouseStartX;
      const diffY = e.clientY - mouseStartY;

      // Если горизонтальное движение преобладает над вертикальным
      if (Math.abs(diffX) > Math.abs(diffY)) {
        const steps = calculateSlideSteps(Math.abs(diffX));
        if (steps > 0) {
          if (diffX < 0) {
            goToSlide(currentIndex + steps);
          } else {
            goToSlide(currentIndex - steps);
          }
        } else {
          resumeTimer();
        }
      } else {
        resumeTimer();
      }

      // Сбрасываем флаг с небольшой задержкой, чтобы клик не сработал сразу после свайпа
      setTimeout(() => {
        mouseMoved = false;
      }, 50);
    });

    // 3. Сенсорный свайп (на смартфонах, планшетах и сенсорных экранах)
    let touchStartX = 0;
    let touchStartY = 0;
    let touchDiffX = 0;
    let touchDiffY = 0;
    let isSwiping = false;

    containerForEvents.addEventListener('touchstart', (e) => {
      if (e.touches.length !== 1) return;
      if (!isAtCardHeight(e.touches[0].clientY)) return;

      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchDiffX = 0;
      touchDiffY = 0;
      isSwiping = true;
      pauseTimer();
    }, { passive: true });

    containerForEvents.addEventListener('touchmove', (e) => {
      if (!isSwiping || e.touches.length !== 1) return;
      touchDiffX = e.touches[0].clientX - touchStartX;
      touchDiffY = e.touches[0].clientY - touchStartY;
    }, { passive: true });

    containerForEvents.addEventListener('touchend', () => {
      if (!isSwiping) return;
      isSwiping = false;

      if (Math.abs(touchDiffX) > Math.abs(touchDiffY)) {
        const steps = calculateSlideSteps(Math.abs(touchDiffX));
        if (steps > 0) {
          if (touchDiffX < 0) {
            goToSlide(currentIndex + steps);
          } else {
            goToSlide(currentIndex - steps);
          }
        } else {
          resumeTimer();
        }
      } else {
        resumeTimer();
      }
    }, { passive: true });

    // Клавиатурные стрелки
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      }
    });

    // Реакция на ресайз окна
    window.addEventListener('resize', () => {
      updateCardsPosition();
    }, { passive: true });

    // Инициализация первой карточки (Тьюторы, index 0)
    currentIndex = 0;
    updateCardsPosition();

    // Автопрокрутка активируется ТОЛЬКО когда секция проектов появляется на экране,
    // чтобы пользователь всегда гарантированно видел карточку «Тьюторы» первой
    if ('IntersectionObserver' in window) {
      const carouselObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            resumeTimer();
          } else {
            pauseTimer();
          }
        });
      }, { threshold: 0.2 });
      carouselObserver.observe(carousel);
    } else {
      startTimer();
    }
  }

  // 8. Световой блик и 3D параллакс-наклон карточек секции «Обо мне» и элементов
  function initCardTiltAndGlare() {
    const cards = document.querySelectorAll('.about-card:not(.about-card--more)');
    if (!cards.length) return;

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!canHover) return;

    cards.forEach(card => {
      let glare = card.querySelector('.card-glare');
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'card-glare';
        card.prepend(glare);
      }

      const cardElems = card.querySelectorAll('.about-card__title');
      let rafId = null;

      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (rafId) cancelAnimationFrame(rafId);

        rafId = requestAnimationFrame(() => {
          card.classList.remove('is-resetting');
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const percentX = (x - centerX) / centerX;
          const percentY = (y - centerY) / centerY;

          const maxTilt = 6.5;
          const rotateX = -percentY * maxTilt;
          const rotateY = percentX * maxTilt;
          const liftY = -4;
          const scale = 1.015;

          card.style.transform = `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(${liftY}px) scale3d(${scale}, ${scale}, ${scale})`;

          cardElems.forEach(elem => {
            const depth = 14;
            const moveX = percentX * depth;
            const moveY = percentY * depth;
            elem.style.transform = `translate3d(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px, ${depth * 1.2}px)`;
          });
        });
      };

      const handleMouseLeave = () => {
        if (rafId) cancelAnimationFrame(rafId);

        card.classList.add('is-resetting');
        card.style.transform = '';
        card.style.setProperty('--mouse-x', '50%');
        card.style.setProperty('--mouse-y', '50%');

        cardElems.forEach(elem => {
          elem.style.transform = '';
        });

        setTimeout(() => {
          card.classList.remove('is-resetting');
        }, 650);
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });
  }

  // 9. Премиальный эффект светового блика на 1px контуре кнопок
  function initButtonBorderGlow() {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!canHover) return;

    const interactiveElements = document.querySelectorAll(
      '.btn, .btn-resume, .menu-modal__resume, .faq__footer-btn, .contacts-form__submit, .contacts__resume-btn, .modal__btn-primary, .project-modal__btn-primary, .project-modal__btn-secondary, .footer__back-to-top, .footer__tablet-resume, .icon-btn, .contacts-social__item'
    );

    interactiveElements.forEach(btn => {
      // Удаляем устаревшие liquid-ink элементы, если они остались
      const oldInk = btn.querySelector('.liquid-ink');
      if (oldInk) oldInk.remove();

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        btn.style.setProperty('--glow-x', `${x}px`);
        btn.style.setProperty('--glow-y', `${y}px`);
        btn.style.setProperty('--glow-opacity', '1');
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.setProperty('--glow-opacity', '0');
      });
    });
  }

  // Windows 11 Fluent Design: Эффект Reveal Highlight (Spotlight) для карточек и интерактивных контейнеров
  function initFluentSpotlight() {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!canHover) return;

    const fluentCards = document.querySelectorAll(
      '.skills-card-software, .algorithm-card, .contacts-form, .contacts-social__icon-box, .faq-item, .about-card:not(.about-card--more)'
    );

    fluentCards.forEach(card => {
      let rafId = null;

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          card.style.setProperty('--reveal-x', `${x}px`);
          card.style.setProperty('--reveal-y', `${y}px`);
          card.style.setProperty('--reveal-opacity', '1');
        });
      });

      card.addEventListener('mouseleave', () => {
        if (rafId) cancelAnimationFrame(rafId);
        card.style.setProperty('--reveal-opacity', '0');
      });
    });
  }

  // 10. Плавное появление секции «Компетенции и стек» через высокопроизводительный IntersectionObserver
  function initSkillsStagger() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const groupSkills = document.querySelector('.skills-group--skills');
    const groupContent = document.querySelector('.skills-group--content');
    const cardSoftware = document.querySelector('.skills-card-software');
    const allBlocks = [groupSkills, groupContent, cardSoftware].filter(Boolean);

    function triggerBlock(el) {
      if (!el || el.classList.contains('is-revealed')) return;
      el.classList.add('is-revealed');
      setTimeout(() => {
        el.classList.add('reveal-complete');
      }, 1800);
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === skillsSection) {
              skillsSection.classList.add('is-revealed');
              allBlocks.forEach(triggerBlock);
              setTimeout(() => {
                skillsSection.classList.add('reveal-complete');
              }, 2000);
            } else {
              triggerBlock(entry.target);
            }
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -5% 0px'
      });

      observer.observe(skillsSection);
      allBlocks.forEach(block => observer.observe(block));
    } else {
      skillsSection.classList.add('is-revealed', 'reveal-complete');
      allBlocks.forEach(triggerBlock);
    }
  }
  initSkillsStagger();
  
  // 9. Алгоритм взаимодействия: Безупречная стопка карточек с синхронизированной высотой и монолитным сходом
  function initAlgorithmStacking() {
    const stepsContainer = document.querySelector(".algorithm__steps");
    const cards = Array.from(document.querySelectorAll(".algorithm-card"));
    if (!stepsContainer || !cards.length) return;

    function getTopOffsets() {
      const w = window.innerWidth;
      if (w <= 480) return [16, 64, 112, 160];
      if (w <= 640) return [20, 78, 136, 194];
      if (w <= 979) return [70, 136, 202, 268];
      return [76, 148, 220, 292];
    }

    function equalizeCardHeights() {
      cards.forEach(c => c.style.minHeight = "");
      let maxHeight = 0;
      cards.forEach(c => {
        const h = c.offsetHeight;
        if (h > maxHeight) maxHeight = h;
      });
      if (maxHeight > 0) {
        cards.forEach(c => {
          c.style.minHeight = maxHeight + "px";
        });
      }
    }

    equalizeCardHeights();
    window.addEventListener("resize", equalizeCardHeights, { passive: true });
    window.addEventListener("load", equalizeCardHeights);

    let cardOffsets = [];
    let cardHeights = [];

    function measureLayout() {
      cardOffsets = cards.map(c => c.offsetTop);
      cardHeights = cards.map(c => c.offsetHeight);
    }

    measureLayout();

    function updateStacking() {
      const topOffsets = getTopOffsets();
      const numCards = cards.length;
      if (cardOffsets.length !== numCards || !cardHeights[0]) measureLayout();

      const containerRect = stepsContainer.getBoundingClientRect();
      const cTop = containerRect.top;
      const cBottom = containerRect.bottom;

      // 1. Положение каждой карточки в потоке документа
      const flowTops = cardOffsets.map(ot => cTop + ot);
      const stickyTops = flowTops.map((ft, i) => Math.max(ft, topOffsets[i]));

      // 2. Расчет масштабирования ширины в стопке
      const scales = new Array(numCards).fill(1);
      for (let i = 0; i < numCards; i++) {
        let reduction = 0;
        for (let j = i + 1; j < numCards; j++) {
          const overlapStart = topOffsets[j - 1] + (cardHeights[j - 1] || 350);
          const overlapEnd = topOffsets[j];
          const totalDist = Math.max(1, overlapStart - overlapEnd);
          const currentJTop = stickyTops[j];
          if (currentJTop < overlapStart) {
            const progress = Math.max(0, Math.min(1, (overlapStart - currentJTop) / totalDist));
            reduction += progress * 0.035;
          }
        }
        scales[i] = Math.max(0.89, 1 - reduction);
      }

      // 3. Монолитный синхронный сход: при выходе стопки интервал между карточками строго заблокирован
      const lastIdx = numCards - 1;
      const lastCardHeight = cardHeights[lastIdx] || 360;
      const stackBottom = topOffsets[lastIdx] + lastCardHeight;
      const exitOverflow = Math.max(0, stackBottom - cBottom);

      for (let i = 0; i < numCards; i++) {
        const card = cards[i];
        const s = scales[i];
        const h = cardHeights[i] || 350;

        const nativeClampedTop = Math.min(stickyTops[i], cBottom - h);
        const desiredVisualTop = exitOverflow > 0 ? topOffsets[i] - exitOverflow : stickyTops[i];
        const syncShift = desiredVisualTop - nativeClampedTop;

        if (Math.abs(syncShift) > 0.5) {
          card.style.transform = `translate3d(0, ${syncShift.toFixed(2)}px, 0) scale(${s.toFixed(4)})`;
        } else if (s < 0.999) {
          card.style.transform = `scale(${s.toFixed(4)})`;
        } else {
          card.style.transform = "";
        }
      }
    }

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateStacking();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      equalizeCardHeights();
      measureLayout();
      onScroll();
    }, { passive: true });

    updateStacking();
    setTimeout(() => { equalizeCardHeights(); measureLayout(); updateStacking(); }, 150);
    setTimeout(() => { equalizeCardHeights(); measureLayout(); updateStacking(); }, 500);
  }

  // 10. FAQ: Интерактивный аккордеон с плавной анимацией высоты и ARIA-доступностью
  function initFaqAccordion() {
    const triggers = document.querySelectorAll(".faq-item__trigger");
    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const item = trigger.closest(".faq-item");
        if (!item) return;
        const isOpen = item.classList.contains("is-open");

        // Закрываем другие открытые пункты
        document.querySelectorAll(".faq-item.is-open").forEach((openItem) => {
          if (openItem !== item) {
            openItem.classList.remove("is-open");
            const btn = openItem.querySelector(".faq-item__trigger");
            if (btn) btn.setAttribute("aria-expanded", "false");
          }
        });

        // Переключаем текущий
        if (isOpen) {
          item.classList.remove("is-open");
          trigger.setAttribute("aria-expanded", "false");
        } else {
          item.classList.add("is-open");
          trigger.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  // 11. Типографика: Привязка висячих предлогов, союзов и коротких слов (<= 3 символов)
  function fixHangingPrepositions(rootNode = document.body) {
    if (!rootNode) return;
    const shortWords = [
      "в", "с", "к", "у", "о", "и", "а", "я",
      "на", "по", "из", "от", "до", "за", "во", "со", "ко", "об", "но", "да", "ни", "то", "не", "ли", "же", "бы", "мы", "он", "их", "ее", "её", "им", "вы", "ты", "ну", "уж", "ту",
      "для", "под", "над", "при", "про", "без", "обо", "ото", "изо", "меж",
      "как", "что", "или", "чем", "так", "где", "кто", "ибо",
      "все", "всё", "вся", "это", "эта", "эти", "тот", "та", "то", "те", "его", "ему", "наш", "ваш", "мой", "моя", "моё", "мои", "сам", "нет",
      "уже", "еще", "ещё", "там", "тут", "вот", "увы"
    ];

    const wordsPattern = shortWords.map(w => {
      const cap = w.charAt(0).toUpperCase() + w.slice(1);
      return `${w}|${cap}|${w.toUpperCase()}`;
    }).join("|");

    const regex = new RegExp(`(^|[\\s(«"\\[>]|\u00A0)(${wordsPattern})[ \\t]+`, "g");

    const walker = document.createTreeWalker(
      rootNode,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_ACCEPT;
          const tag = parent.tagName.toLowerCase();
          if (tag === 'script' || tag === 'style' || tag === 'svg' || tag === 'code' || tag === 'pre') {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    nodes.forEach(node => {
      let val = node.nodeValue;
      // Пробел перед тире
      val = val.replace(/(\S)[ \t]+([—–])[ \t]+/g, "$1\u00A0$2 ");
      // Пробел после чисел перед словами
      val = val.replace(/(\b\d+)[ \t]+([а-яёА-ЯЁa-zA-Z%]+)/g, "$1\u00A0$2");
      // Неразрывный пробел после предлогов и союзов <= 3 символов
      let prev;
      do {
        prev = val;
        val = val.replace(regex, "$1$2\u00A0");
      } while (val !== prev);

      if (val !== node.nodeValue) {
        node.nodeValue = val;
      }
    });
  }

  initProjectsWindowCarousel();
  initCardTiltAndGlare();
  initButtonBorderGlow();
  initFluentSpotlight();
  initAlgorithmStacking();
  initFaqAccordion();
  fixHangingPrepositions();
  initCustomCursor();

  // 12. Фирменный дизайнерский курсор: Шелковистый каллиграфический шлейф и точечное перо
  function initCustomCursor() {
    const isPointerFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isPointerFine) return;

    const cursor = document.getElementById('customCursor');
    const pen = document.getElementById('customCursorPen');
    const canvas = document.getElementById('cursorTrailCanvas');

    if (!cursor || !pen || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    document.body.classList.add('custom-cursor-enabled');

    let mouseX = -100;
    let mouseY = -100;
    let isVisible = false;

    // Пружинная цепочка для непрерывного каллиграфического шлейфа
    const TRAIL_LENGTH = 18;
    const trail = [];
    let initializedTrail = false;

    // Адаптация размера canvas под экран и Retina/High DPI
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Отрисовка непрерывной каллиграфической ленты (сглаженная лента Без узловых точек)
    const drawTrail = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (!isVisible || !initializedTrail) return;

      // Обновляем координаты цепочки (пружинная кинематика)
      trail[0].x = mouseX;
      trail[0].y = mouseY;

      let totalDist = 0;
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        const prev = trail[i - 1];
        const curr = trail[i];
        const dx = prev.x - curr.x;
        const dy = prev.y - curr.y;
        totalDist += Math.abs(dx) + Math.abs(dy);

        // Мягкое пружинное следование
        curr.x += dx * 0.42;
        curr.y += dy * 0.42;
      }

      // Если курсор остановился и шлейф сошёлся в точку — не рисуем лишнего
      if (totalDist < 1.2) return;

      // Рассчитываем контуры левой и правой границы каллиграфического штриха
      const leftPts = [];
      const rightPts = [];

      for (let i = 0; i < TRAIL_LENGTH; i++) {
        let tx = 0;
        let ty = 0;

        if (i === 0) {
          tx = trail[0].x - trail[1].x;
          ty = trail[0].y - trail[1].y;
        } else if (i === TRAIL_LENGTH - 1) {
          tx = trail[i - 1].x - trail[i].x;
          ty = trail[i - 1].y - trail[i].y;
        } else {
          tx = trail[i - 1].x - trail[i + 1].x;
          ty = trail[i - 1].y - trail[i + 1].y;
        }

        let len = Math.hypot(tx, ty);
        if (len < 0.001) len = 1;

        // Нормаль к траектории движения
        const nx = -ty / len;
        const ny = tx / len;

        // Каллиграфическое сужение от пера к хвосту (от 3.5px у кончика до 0.4px на конце)
        const t = 1 - (i / (TRAIL_LENGTH - 1));
        const halfWidth = (t * 2.8 + 0.3) * 0.5;

        leftPts.push({
          x: trail[i].x + nx * halfWidth,
          y: trail[i].y + ny * halfWidth
        });
        rightPts.push({
          x: trail[i].x - nx * halfWidth,
          y: trail[i].y - ny * halfWidth
        });
      }

      // Строим единый гладкий контур кривыми Безье (никаких отдельных кружков и точек!)
      ctx.beginPath();
      ctx.moveTo(leftPts[0].x, leftPts[0].y);

      // Левая сторона штриха со сглаживанием
      for (let i = 0; i < leftPts.length - 1; i++) {
        const midX = (leftPts[i].x + leftPts[i + 1].x) * 0.5;
        const midY = (leftPts[i].y + leftPts[i + 1].y) * 0.5;
        ctx.quadraticCurveTo(leftPts[i].x, leftPts[i].y, midX, midY);
      }
      ctx.lineTo(leftPts[leftPts.length - 1].x, leftPts[leftPts.length - 1].y);

      // Кончик хвоста
      const tail = trail[TRAIL_LENGTH - 1];
      ctx.lineTo(tail.x, tail.y);

      // Правая сторона штриха в обратном направлении
      ctx.lineTo(rightPts[rightPts.length - 1].x, rightPts[rightPts.length - 1].y);
      for (let i = rightPts.length - 1; i > 0; i--) {
        const midX = (rightPts[i].x + rightPts[i - 1].x) * 0.5;
        const midY = (rightPts[i].y + rightPts[i - 1].y) * 0.5;
        ctx.quadraticCurveTo(rightPts[i].x, rightPts[i].y, midX, midY);
      }
      ctx.lineTo(rightPts[0].x, rightPts[0].y);
      ctx.closePath();

      // Мягкий тающий градиент чернил в фирменном лавандово-графитовом цвете
      const head = trail[0];
      const grad = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
      grad.addColorStop(0, 'rgba(115, 111, 141, 0)');
      grad.addColorStop(0.3, 'rgba(115, 111, 141, 0.12)');
      grad.addColorStop(0.7, 'rgba(99, 95, 125, 0.36)');
      grad.addColorStop(1, 'rgba(56, 53, 76, 0.6)');

      ctx.fillStyle = grad;
      ctx.fill();
    };

    // Главный цикл анимации (60/120 FPS)
    const render = () => {
      // Мгновенное позиционирование точечного пера
      pen.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      // Отрисовка каллиграфического шлейфа
      drawTrail();

      requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        cursor.classList.add('is-visible');
      }

      if (!initializedTrail) {
        initializedTrail = true;
        for (let i = 0; i < TRAIL_LENGTH; i++) {
          trail.push({ x: mouseX, y: mouseY });
        }
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      isVisible = false;
      cursor.classList.remove('is-visible');
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    });

    document.addEventListener('mouseenter', () => {
      isVisible = true;
      cursor.classList.add('is-visible');
    });

    document.addEventListener('mousedown', () => {
      cursor.classList.add('custom-cursor--active');
    });

    document.addEventListener('mouseup', () => {
      cursor.classList.remove('custom-cursor--active');
    });

    // Определение интерактивности без навязчивых подсказок
    const interactiveSelector = [
      'a',
      'button',
      '[role="button"]',
      '.btn',
      '.icon-btn',
      '.about-card',
      '.project-card',
      '.menu-social-item',
      '.contacts-social',
      '.footer__contact-item',
      '.tag-chip',
      '.modal__close',
      '.project-modal__close',
      '.project-modal__nav-btn',
      '.footer__legal-btn',
      '.contacts-form__submit',
      '.contacts__copy-btn',
      '.contacts__resume-btn',
      '.footer__resume-link',
      '.theme-toggle-btn'
    ].join(',');

    document.addEventListener('mouseover', (e) => {
      const target = e.target;
      if (!target) return;

      // Текстовые поля: скрываем кастомный курсор для свободного набора текста
      if (target.closest('input, textarea, [contenteditable="true"]')) {
        cursor.classList.add('custom-cursor--text-mode');
        return;
      }

      // Кликабельные элементы: деликатный акцент точки пера
      if (target.closest(interactiveSelector)) {
        cursor.classList.add('custom-cursor--hover');
      }
    }, { passive: true });

    document.addEventListener('mouseout', (e) => {
      const target = e.target;
      if (!target) return;

      if (target.closest('input, textarea, [contenteditable="true"]')) {
        cursor.classList.remove('custom-cursor--text-mode');
      }

      if (target.closest(interactiveSelector)) {
        cursor.classList.remove('custom-cursor--hover');
      }
    }, { passive: true });

    requestAnimationFrame(render);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}


  

  
  // --- Custom Calligraphic Scrollbar (Comet Ink Trail with Hero Auto-Hide) ---
  function initMobileScrollbar() {
    const scrollbar = document.createElement('div');
    scrollbar.className = 'custom-mobile-scrollbar';
    const canvas = document.createElement('canvas');
    canvas.className = 'custom-mobile-scrollbar-canvas';
    scrollbar.appendChild(canvas);
    document.body.appendChild(scrollbar);

    const ctx = canvas.getContext('2d');
    let scrollTimeout;
    let animRafId = null;
    
    const CONTAINER_WIDTH = 14;
    const THUMB_WIDTH = 5;
    const CENTER_X = CONTAINER_WIDTH / 2; // 7px

    const heroSection = document.querySelector('.hero');
    const projectsSection = document.getElementById('projects') || document.querySelector('.projects');
    let currentWhiteRatio = 0;
    let targetWhiteRatio = 0;
    let trackTop = 76;
    let trackBottom = 24;
    let usableTrack = 0;
    let targetY = 0;
    let currentY = 0;
    let thumbHeight = 44;
    let isVisible = false;
    let isAnimating = false;
    let tailLength = 0;
    let targetTailLength = 0;
    let scrollDir = 0; // 1 = down, -1 = up
    let lastScrollY = window.scrollY || 0;
    let lastScrollTime = performance.now();
    let isDragging = false;

    let projectsTop = 0;
    let projectsBottom = 0;

    function updateSectionMetrics() {
      if (projectsSection) {
        projectsTop = projectsSection.offsetTop;
        projectsBottom = projectsTop + projectsSection.offsetHeight;
      }
    }

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = CONTAINER_WIDTH * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      trackTop = window.innerWidth <= 768 ? 72 : 80;
      trackBottom = window.innerWidth <= 768 ? 20 : 28;
      usableTrack = Math.max(window.innerHeight - trackTop - trackBottom, 120);
      updateSectionMetrics();
    }

    function drawPill(x, y, width, height, r, g, b) {
      const rad = width / 2;
      ctx.beginPath();
      ctx.arc(x, y + rad, rad, Math.PI, 0, false);
      ctx.lineTo(x + rad, y + height - rad);
      ctx.arc(x, y + height - rad, rad, 0, Math.PI, false);
      ctx.closePath();
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`;
      ctx.fill();
    }

    function drawCometTail(centerX, baseY, length, dir, baseWidth, r, g, b) {
      if (length < 1.5) return;
      const halfBase = baseWidth / 2;
      const tipWidth = 0.8;
      const halfTip = tipWidth / 2;
      
      const tipY = dir > 0 ? baseY - length : baseY + length;
      
      const grad = ctx.createLinearGradient(0, baseY, 0, tipY);
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
      grad.addColorStop(0.25, `rgba(${r}, ${g}, ${b}, 1)`);
      grad.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, 0.7)`);
      grad.addColorStop(0.85, `rgba(${r}, ${g}, ${b}, 0.25)`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      
      ctx.beginPath();
      ctx.moveTo(centerX - halfBase, baseY);
      
      const ctrlY = baseY + (tipY - baseY) * 0.42;
      ctx.quadraticCurveTo(centerX - halfBase * 0.35, ctrlY, centerX - halfTip, tipY);
      
      if (dir > 0) {
        ctx.arc(centerX, tipY, halfTip, Math.PI, 0, false);
      } else {
        ctx.arc(centerX, tipY, halfTip, 0, Math.PI, false);
      }
      
      ctx.quadraticCurveTo(centerX + halfBase * 0.35, ctrlY, centerX + halfBase, baseY);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
    }

    function draw() {
      ctx.clearRect(0, 0, CONTAINER_WIDTH, window.innerHeight);
      
      if (!isVisible && !isDragging) {
        isAnimating = false;
        animRafId = null;
        return;
      }

      // Smooth interpolation for thumb position
      const diffY = targetY - currentY;
      currentY += diffY * 0.3;
      
      // Smooth decay of comet tail
      targetTailLength *= 0.90;
      if (targetTailLength < 0.5) targetTailLength = 0;
      tailLength += (targetTailLength - tailLength) * 0.25;
      if (tailLength < 0.2) tailLength = 0;

      // Check if thumb is currently positioned over the projects section
      if (projectsSection) {
        const pRect = projectsSection.getBoundingClientRect();
        const thumbCenterY = currentY + thumbHeight / 2;
        if (thumbCenterY >= pRect.top - 15 && thumbCenterY <= pRect.bottom + 15) {
          targetWhiteRatio = 1.0;
        } else {
          targetWhiteRatio = 0.0;
        }
      }

      currentWhiteRatio += (targetWhiteRatio - currentWhiteRatio) * 0.16;

      const curR = Math.round(115 + (255 - 115) * currentWhiteRatio);
      const curG = Math.round(111 + (255 - 111) * currentWhiteRatio);
      const curB = Math.round(141 + (255 - 141) * currentWhiteRatio);

      if (tailLength > 1 && scrollDir !== 0) {
        const baseY = scrollDir > 0 ? currentY + THUMB_WIDTH / 2 : currentY + thumbHeight - THUMB_WIDTH / 2;
        drawCometTail(CENTER_X, baseY, tailLength, scrollDir, THUMB_WIDTH, curR, curG, curB);
      }

      drawPill(CENTER_X, currentY, THUMB_WIDTH, thumbHeight, curR, curG, curB);

      // Continue animation if moving or visible
      if (Math.abs(diffY) > 0.1 || tailLength > 0.2 || Math.abs(targetWhiteRatio - currentWhiteRatio) > 0.01 || isVisible) {
        animRafId = requestAnimationFrame(draw);
      } else {
        isAnimating = false;
        animRafId = null;
      }
    }

    function startAnimation() {
      if (!isAnimating) {
        isAnimating = true;
        animRafId = requestAnimationFrame(draw);
      }
    }

    function onScroll() {
      const scrollHeight = document.body.scrollHeight;
      const innerHeight = window.innerHeight;
      const scrollTop = window.scrollY || window.pageYOffset || 0;

      if (scrollHeight <= innerHeight) {
        scrollbar.classList.remove('is-active');
        isVisible = false;
        return;
      }

      const heroHeight = heroSection ? heroSection.offsetHeight : innerHeight;
      const isHeroActive = scrollTop < (heroHeight - 80);

      if (isHeroActive && !isDragging) {
        scrollbar.classList.remove('is-active');
        clearTimeout(scrollTimeout);
        targetTailLength = 0;
        tailLength = 0;
        setTimeout(() => {
          if (!scrollbar.classList.contains('is-active')) {
            isVisible = false;
          }
        }, 350);
        return;
      }

      const now = performance.now();
      const dt = Math.max(now - lastScrollTime, 12);
      const delta = scrollTop - lastScrollY;
      const velocity = delta / (dt / 16);
      
      lastScrollY = scrollTop;
      lastScrollTime = now;

      if (Math.abs(velocity) > 0.3) {
        scrollDir = velocity > 0 ? 1 : -1;
        targetTailLength = Math.min(18 + Math.abs(velocity) * 4.5, 80);
      }

      const minThumbHeight = 36;
      thumbHeight = Math.max((innerHeight / scrollHeight) * usableTrack, minThumbHeight);
      
      const maxScroll = scrollHeight - innerHeight;
      const scrollProgress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
      
      targetY = trackTop + scrollProgress * (usableTrack - thumbHeight);
      
      if (!isVisible) {
        isVisible = true;
        currentY = targetY;
        targetTailLength = 0;
        tailLength = 0;
      }

      scrollbar.classList.add('is-active');
      startAnimation();

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (!isDragging) {
          scrollbar.classList.remove('is-active');
          setTimeout(() => {
            if (!scrollbar.classList.contains('is-active')) {
              isVisible = false;
            }
          }, 350);
        }
      }, 900);
    }

    // Drag support for desktop mouse users
    function handleDrag(e) {
      const scrollHeight = document.body.scrollHeight;
      const innerHeight = window.innerHeight;
      const maxScroll = scrollHeight - innerHeight;
      if (maxScroll <= 0) return;

      const clientY = e.clientY;
      const relativeY = Math.min(Math.max(clientY - trackTop - (thumbHeight / 2), 0), usableTrack - thumbHeight);
      const ratio = relativeY / (usableTrack - thumbHeight);
      window.scrollTo(0, ratio * maxScroll);
    }

    scrollbar.addEventListener('mousedown', (e) => {
      isDragging = true;
      scrollbar.classList.add('is-active');
      startAnimation();
      handleDrag(e);
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      handleDrag(e);
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          scrollbar.classList.remove('is-active');
          setTimeout(() => {
            if (!scrollbar.classList.contains('is-active')) {
              isVisible = false;
            }
          }, 350);
        }, 900);
      }
    });

    window.addEventListener('resize', () => {
      resizeCanvas();
      onScroll();
    }, { passive: true });
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Init
    resizeCanvas();
  }
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileScrollbar);
  } else {
    initMobileScrollbar();
  }

  // Глобальная защита контента от копирования, перетаскивания и контекстного меню
  (function initGlobalContentProtection() {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });

    document.addEventListener('copy', (e) => {
      const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (tag !== 'input' && tag !== 'textarea') {
        e.preventDefault();
      }
    });

    document.addEventListener('dragstart', (e) => {
      e.preventDefault();
      return false;
    });

    document.addEventListener('keydown', (e) => {
      const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (tag === 'input' || tag === 'textarea') return;

      if ((e.ctrlKey || e.metaKey) && ['c', 'u', 's', 'a', 'p'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        return false;
      }
    });
  })();
