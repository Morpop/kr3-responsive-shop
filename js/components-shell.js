(function () {
  'use strict';

  var h = React.createElement;
  var useState = React.useState;
  var useEffect = React.useEffect;
  var useRef = React.useRef;

  function useVoltStore() {
    var _s = useState(0);
    var setTick = _s[1];
    useEffect(function () {
      return window.VoltStore.subscribe(function () {
        setTick(function (n) { return n + 1; });
      });
    }, []);
    return window.VoltStore;
  }

  function Icon(props) {
    var paths = {
      home: h('path', { d: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1v-9.5Z' }),
      grid: h(React.Fragment, null,
        h('rect', { x: '3', y: '3', width: '7.5', height: '7.5', rx: '2' }),
        h('rect', { x: '13.5', y: '3', width: '7.5', height: '7.5', rx: '2' }),
        h('rect', { x: '3', y: '13.5', width: '7.5', height: '7.5', rx: '2' }),
        h('rect', { x: '13.5', y: '13.5', width: '7.5', height: '7.5', rx: '2' })
      ),
      store: h(React.Fragment, null,
        h('path', { d: 'M4 7h16l1.5 4.5a2.5 2.5 0 0 1-2.4 3.3 2.6 2.6 0 0 1-2.1-1 2.6 2.6 0 0 1-4.2 0 2.6 2.6 0 0 1-4.2 0 2.6 2.6 0 0 1-2.1 1A2.5 2.5 0 0 1 2.5 11.5L4 7Z' }),
        h('path', { d: 'M5 14.8V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5.2' })
      ),
      bag: h(React.Fragment, null,
        h('path', { d: 'M6 8h12l1 12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1L6 8Z' }),
        h('path', { d: 'M9 8V6a3 3 0 0 1 6 0v2' })
      ),
      heart: h('path', { d: 'M12 20.6s-6.7-4.3-9.2-8.1C1 9.8 1.6 6.1 4.6 4.4a5.2 5.2 0 0 1 7.4 1.3 5.2 5.2 0 0 1 7.4-1.3c3 1.7 3.6 5.4 1.8 8.1-2.5 3.8-9.2 8.1-9.2 8.1Z' }),
      user: h(React.Fragment, null,
        h('circle', { cx: '12', cy: '8', r: '4' }),
        h('path', { d: 'M4.5 20a7.5 7.5 0 0 1 15 0' })
      ),
      sun: h(React.Fragment, null,
        h('circle', { cx: '12', cy: '12', r: '4.5' }),
        h('path', { d: 'M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8' })
      ),
      moon: h('path', { d: 'M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z' }),
      phone: h('path', { d: 'M21 16.4v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 1.1 3.6 2 2 0 0 1 3.1 1.4h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L7.1 9.3a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1Z' }),
      mail: h(React.Fragment, null,
        h('rect', { x: '2.5', y: '4.5', width: '19', height: '15', rx: '2.5' }),
        h('path', { d: 'm3.5 6 8.5 6.5L20.5 6' })
      ),
      pin: h(React.Fragment, null,
        h('path', { d: 'M12 21s7-5.8 7-11.5a7 7 0 1 0-14 0C5 15.2 12 21 12 21Z' }),
        h('circle', { cx: '12', cy: '9.5', r: '2.5' })
      ),
      clock: h(React.Fragment, null,
        h('circle', { cx: '12', cy: '12', r: '9' }),
        h('path', { d: 'M12 7v5l3.5 2' })
      ),
      chat: h('path', { d: 'M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H9l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-8Z' }),
      spark: h('path', { d: 'M12 2.5 14.7 9.3 21.5 12 14.7 14.7 12 21.5 9.3 14.7 2.5 12 9.3 9.3 12 2.5Z' }),
      close: h('path', { d: 'M6 6l12 12M18 6 6 18' }),
      send: h('path', { d: 'm21 3-9.5 18-2.8-7.7L1 10.5 21 3Z' })
    };

    return h('svg', {
      className: props.className || 'ui-icon',
      viewBox: '0 0 24 24',
      fill: props.filled ? 'currentColor' : 'none',
      stroke: props.filled ? 'none' : 'currentColor',
      strokeWidth: props.filled ? '0' : '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      'aria-hidden': 'true'
    }, paths[props.name] || null);
  }

  function SiteHeader(props) {
    var store = useVoltStore();
    var _m = useState(false);
    var menuOpen = _m[0];
    var setMenuOpen = _m[1];

    var theme = store.getTheme();
    var favs = store.getFavorites();
    var profile = store.getProfile();
    var currentPage = props.currentPage || 'home';

    useEffect(function () {
      function onKey(e) {
        if (e.key === 'Escape') setMenuOpen(false);
      }
      window.addEventListener('keydown', onKey);
      return function () { window.removeEventListener('keydown', onKey); };
    }, []);

    var navItems = [
      { id: 'home', label: 'Главная', href: 'index.html' },
      { id: 'catalog', label: 'Каталог', href: 'catalog.html' },
      { id: 'about', label: 'О магазине', href: 'about.html' },
      { id: 'contacts', label: 'Контакты', href: 'contacts.html' }
    ];

    var firstName = (profile.name || 'Кабинет').trim().split(' ')[0] || 'Кабинет';

    return h(React.Fragment, null,
      h('div', { className: 'topbar' },
        h('div', { className: 'container topbar__inner' },
          h('a', { className: 'brand-link', href: 'index.html' },
            h('img', {
              className: 'brand-link__logo',
              src: 'images/dexter-logo.png',
              alt: 'Логотип GOLDAnaBAlKE',
              width: 44,
              height: 44
            }),
            h('span', { className: 'brand-link__text' },
              h('strong', { className: 'brand-link__name' }, 'GOLDAnaBAlKE'),
              h('span', { className: 'brand-link__sub' }, 'Магазин компьютерной техники и периферии')
            )
          ),
          h('p', { className: 'topbar__info' }, 'пр-т Вернадского, 78 · Ежедневно 09:00–21:00')
        )
      ),
      h('nav', { className: 'main-navbar', 'aria-label': 'Основная навигация' },
        h('div', { className: 'container main-navbar__inner' },
          h('button', {
            type: 'button',
            className: 'burger-btn',
            'aria-expanded': String(menuOpen),
            'aria-controls': 'primary-nav-menu',
            'aria-label': menuOpen ? 'Закрыть меню навигации' : 'Открыть меню навигации',
            onClick: function () { setMenuOpen(!menuOpen); }
          },
            h('span', { className: 'burger-btn__lines' + (menuOpen ? ' is-open' : '') })
          ),

          h('ul', {
            id: 'primary-nav-menu',
            className: 'nav-links' + (menuOpen ? ' is-open' : '')
          },
            navItems.map(function (item) {
              var active = currentPage === item.id;
              return h('li', { key: item.id, className: 'nav-links__item' },
                h('a', {
                  href: item.href,
                  className: 'nav-links__link' + (active ? ' is-active' : ''),
                  'aria-current': active ? 'page' : undefined
                }, item.label)
              );
            })
          ),

          h('div', { className: 'nav-actions' },
            h('button', {
              type: 'button',
              className: 'nav-action-btn',
              onClick: function () { store.toggleTheme(); },
              'aria-label': theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему',
              title: theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'
            },
              h(Icon, { name: theme === 'dark' ? 'sun' : 'moon' })
            ),

            h('button', {
              type: 'button',
              className: 'nav-action-btn nav-action-btn--fav',
              onClick: function () { store.openCabinet('favorites'); },
              'aria-label': 'Открыть избранные товары, всего: ' + favs.length
            },
              h(Icon, { name: 'heart', filled: favs.length > 0 }),
              h('span', { className: 'nav-action-btn__badge' }, String(favs.length))
            ),

            h('button', {
              type: 'button',
              className: 'cabinet-trigger-btn',
              onClick: function () { store.openCabinet('profile'); }
            },
              h(Icon, { name: 'user' }),
              h('span', { className: 'cabinet-trigger-btn__label' }, firstName)
            )
          )
        )
      )
    );
  }

  function SiteFooter() {
    return h('div', { className: 'container' },
      h('div', { className: 'footer-three-col' },
        h('div', { className: 'footer-col footer-col--brand' },
          h('a', { className: 'footer-logo-row', href: 'index.html' },
            h('img', {
              className: 'footer-logo-row__graphic',
              src: 'images/dexter-logo.png',
              alt: 'Логотип GOLDAnaBAlKE',
              width: 48,
              height: 48
            }),
            h('span', { className: 'footer-logo-row__wordmark' }, 'GOLDAnaBAlKE')
          ),
          h('p', { className: 'footer-slogan' },
            'Надёжная компьютерная техника и периферия для продуктивной работы, творчества и ярких побед.'
          ),
          h('p', { className: 'footer-copyright' },
            '© 2026 Все права защищены'
          )
        ),

        h('nav', { className: 'footer-col footer-col--nav', 'aria-label': 'Навигация в подвале' },
          h('h2', { className: 'footer-heading' }, 'Разделы сайта'),
          h('ul', { className: 'footer-nav-list' },
            h('li', null,
              h('a', { className: 'footer-nav-link', href: 'index.html' },
                h(Icon, { name: 'home', className: 'footer-icon' }),
                h('span', null, 'Главная')
              )
            ),
            h('li', null,
              h('a', { className: 'footer-nav-link', href: 'catalog.html' },
                h(Icon, { name: 'grid', className: 'footer-icon' }),
                h('span', null, 'Каталог техники')
              )
            ),
            h('li', null,
              h('a', { className: 'footer-nav-link', href: 'about.html' },
                h(Icon, { name: 'store', className: 'footer-icon' }),
                h('span', null, 'О магазине')
              )
            ),
            h('li', null,
              h('a', { className: 'footer-nav-link', href: 'order.html' },
                h(Icon, { name: 'bag', className: 'footer-icon' }),
                h('span', null, 'Оформление заказа')
              )
            )
          )
        ),

        h('div', { className: 'footer-col footer-col--contacts' },
          h('h2', { className: 'footer-heading' }, 'Контактные данные'),
          h('address', { className: 'footer-address' },
            h('ul', { className: 'footer-contacts-list' },
              h('li', null,
                h(Icon, { name: 'phone', className: 'footer-icon' }),
                h('a', { href: 'tel:+74952150778' }, '+7 (495) 215-07-78')
              ),
              h('li', null,
                h(Icon, { name: 'clock', className: 'footer-icon' }),
                h('span', null, 'Ежедневно с 09:00 до 21:00')
              ),
              h('li', null,
                h(Icon, { name: 'mail', className: 'footer-icon' }),
                h('a', { href: 'mailto:hello@goldanabalke.ru' }, 'hello@goldanabalke.ru')
              ),
              h('li', null,
                h(Icon, { name: 'pin', className: 'footer-icon' }),
                h('span', null, 'г. Москва, пр-т Вернадского, 78')
              )
            )
          ),
          h('div', { className: 'footer-social-row', 'aria-label': 'Быстрые каналы связи' },
            h('a', {
              className: 'social-pill',
              href: 'tel:+74952150778',
              'aria-label': 'Позвонить в магазин'
            }, h(Icon, { name: 'phone' })),
            h('a', {
              className: 'social-pill',
              href: 'mailto:hello@goldanabalke.ru',
              'aria-label': 'Написать на электронную почту'
            }, h(Icon, { name: 'mail' })),
            h('a', {
              className: 'social-pill',
              href: 'contacts.html',
              'aria-label': 'Перейти на страницу контактов и карты'
            }, h(Icon, { name: 'pin' }))
          )
        )
      )
    );
  }

  /*
    Виджет чата с консультантом сохранён полностью готовым:
    отображается автоматически при включении FEATURES.consultantChat = true в js/logic.js
  */
  function ChatWidget() {
    var store = useVoltStore();
    if (!store.FEATURES.consultantChat) return null;

    var ui = store.getUIState();
    var isOpen = ui.chatOpen;
    var messages = store.getChatMessages();

    var _i = useState('');
    var input = _i[0];
    var setInput = _i[1];

    var _t = useState(false);
    var isTyping = _t[0];
    var setIsTyping = _t[1];

    var bodyRef = useRef(null);

    useEffect(function () {
      if (bodyRef.current) {
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
      }
    }, [messages.length, isOpen, isTyping]);

    function sendUserQuestion(text) {
      var trimmed = String(text || '').trim();
      if (!trimmed) return;
      store.pushChatMessage('user', trimmed);
      setInput('');
      setIsTyping(true);
      window.setTimeout(function () {
        var reply = store.buildConsultantReply(trimmed);
        store.pushChatMessage('bot', reply);
        setIsTyping(false);
      }, 520);
    }

    var quickChips = [
      'Подобрать клавиатуру',
      'Самовывоз и доставка',
      'Гарантия 2 года'
    ];

    return h('div', { className: 'chat-widget', 'aria-label': 'Онлайн-консультант' },
      isOpen ? h('section', {
        className: 'chat-panel',
        role: 'dialog',
        'aria-label': 'Чат с консультантом GOLDAnaBAlKE'
      },
        h('header', { className: 'chat-panel__head' },
          h('div', { className: 'chat-panel__agent' },
            h('span', { className: 'chat-panel__avatar', 'aria-hidden': 'true' }, 'АК'),
            h('div', null,
              h('strong', { className: 'chat-panel__name' }, 'Алексей · эксперт GOLDAnaBAlKE'),
              h('span', { className: 'chat-panel__status' }, 'Онлайн · отвечает за минуту')
            )
          ),
          h('button', {
            type: 'button',
            className: 'icon-close-btn',
            onClick: function () { store.setChatOpen(false); },
            'aria-label': 'Свернуть чат с консультантом'
          }, h(Icon, { name: 'close' }))
        ),

        h('div', { className: 'chat-panel__messages', ref: bodyRef, 'aria-live': 'polite' },
          messages.map(function (msg) {
            return h('div', {
              key: msg.id,
              className: 'chat-bubble chat-bubble--' + msg.sender
            },
              h('p', { className: 'chat-bubble__text' }, msg.text),
              h('span', { className: 'chat-bubble__time' }, msg.time)
            );
          }),
          isTyping ? h('div', { className: 'chat-bubble chat-bubble--bot chat-bubble--typing' },
            'Консультант печатает ответ...'
          ) : null
        ),

        h('div', { className: 'chat-panel__chips' },
          quickChips.map(function (chip) {
            return h('button', {
              key: chip,
              type: 'button',
              className: 'chat-chip',
              onClick: function () { sendUserQuestion(chip); }
            }, chip);
          })
        ),

        h('form', {
          className: 'chat-panel__form',
          onSubmit: function (e) {
            e.preventDefault();
            sendUserQuestion(input);
          }
        },
          h('label', { className: 'visually-hidden', htmlFor: 'chatWidgetInput' }, 'Сообщение консультанту'),
          h('input', {
            id: 'chatWidgetInput',
            className: 'chat-panel__input',
            type: 'text',
            value: input,
            onChange: function (e) { setInput(e.target.value); },
            placeholder: 'Напишите вопрос о технике...'
          }),
          h('button', {
            type: 'submit',
            className: 'chat-panel__send',
            'aria-label': 'Отправить сообщение'
          }, h(Icon, { name: 'send' }))
        )
      ) : null,

      h('button', {
        type: 'button',
        className: 'chat-launcher' + (isOpen ? ' is-active' : ''),
        onClick: function () { store.setChatOpen(!isOpen); },
        'aria-expanded': String(isOpen)
      },
        h('span', { className: 'chat-launcher__dot', 'aria-hidden': 'true' }),
        h(Icon, { name: 'chat', className: 'chat-launcher__icon' }),
        h('span', { className: 'chat-launcher__label' }, isOpen ? 'Скрыть чат' : 'Чат с консультантом')
      )
    );
  }

  function StylizedTopButton() {
    var _p = useState({ visible: false, progress: 0 });
    var state = _p[0];
    var setState = _p[1];

    useEffect(function () {
      function onScroll() {
        var scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
        var docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        var pct = Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100)));
        setState({ visible: scrollTop > 220, progress: pct });
      }
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return function () { window.removeEventListener('scroll', onScroll); };
    }, []);

    var radius = 15;
    var circumference = 2 * Math.PI * radius;
    var dashOffset = circumference - (state.progress / 100) * circumference;

    return h('button', {
      type: 'button',
      className: 'volt-top-capsule' + (state.visible ? ' is-visible' : ''),
      onClick: function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      'aria-label': 'Вернуться к началу страницы'
    },
      h('span', { className: 'volt-top-capsule__ring-wrap', 'aria-hidden': 'true' },
        h('svg', { className: 'volt-top-capsule__ring', viewBox: '0 0 36 36' },
          h('circle', {
            className: 'volt-top-capsule__track',
            cx: '18',
            cy: '18',
            r: String(radius)
          }),
          h('circle', {
            className: 'volt-top-capsule__fill',
            cx: '18',
            cy: '18',
            r: String(radius),
            strokeDasharray: String(circumference),
            strokeDashoffset: String(dashOffset)
          })
        ),
        h(Icon, { name: 'spark', filled: true, className: 'volt-top-capsule__bolt' })
      ),
      h('span', { className: 'volt-top-capsule__meta' },
        h('strong', { className: 'volt-top-capsule__title' }, 'Наверх'),
        h('small', { className: 'volt-top-capsule__pct' }, state.progress + '%')
      )
    );
  }

  function CabinetModal() {
    var store = useVoltStore();
    var ui = store.getUIState();
    var profile = store.getProfile();
    var favorites = store.getFavorites();
    var orders = store.getOrders();

    var _f = useState(profile);
    var form = _f[0];
    var setForm = _f[1];

    var _saved = useState(false);
    var savedMsg = _saved[0];
    var setSavedMsg = _saved[1];

    useEffect(function () {
      setForm(store.getProfile());
      setSavedMsg(false);
    }, [ui.cabinetOpen]);

    useEffect(function () {
      function onKey(e) {
        if (e.key === 'Escape' && ui.cabinetOpen) store.closeCabinet();
      }
      window.addEventListener('keydown', onKey);
      return function () { window.removeEventListener('keydown', onKey); };
    }, [ui.cabinetOpen]);

    if (!ui.cabinetOpen) return null;

    var favProducts = favorites
      .map(function (id) { return store.getProductById(id); })
      .filter(Boolean);

    return h('div', {
      className: 'modal-backdrop-layer',
      onClick: function (e) {
        if (e.target === e.currentTarget) store.closeCabinet();
      }
    },
      h('div', {
        className: 'modal-card modal-card--wide',
        role: 'dialog',
        'aria-modal': 'true',
        'aria-labelledby': 'cabinetModalTitle'
      },
        h('div', { className: 'modal-card__header' },
          h('h2', { id: 'cabinetModalTitle', className: 'modal-card__title' }, 'Личный кабинет покупателя'),
          h('button', {
            type: 'button',
            className: 'icon-close-btn',
            onClick: function () { store.closeCabinet(); },
            'aria-label': 'Закрыть личный кабинет'
          }, h(Icon, { name: 'close' }))
        ),

        h('div', { className: 'cabinet-tabs', role: 'tablist' },
          [
            { id: 'profile', label: 'Профиль' },
            { id: 'favorites', label: 'Избранное (' + favProducts.length + ')' },
            { id: 'orders', label: 'Мои заказы (' + orders.length + ')' }
          ].map(function (tab) {
            var active = ui.cabinetTab === tab.id;
            return h('button', {
              key: tab.id,
              type: 'button',
              role: 'tab',
              'aria-selected': String(active),
              className: 'cabinet-tab' + (active ? ' is-active' : ''),
              onClick: function () { store.openCabinet(tab.id); }
            }, tab.label);
          })
        ),

        ui.cabinetTab === 'profile' ? h('div', { className: 'cabinet-section' },
          h('form', {
            className: 'cabinet-form',
            onSubmit: function (e) {
              e.preventDefault();
              store.saveProfile({
                name: form.name,
                city: form.city,
                email: form.email,
                phone: form.phone
              });
              setSavedMsg(true);
            }
          },
            h('div', { className: 'form-grid-two' },
              h('div', { className: 'field-box' },
                h('label', { className: 'field-label', htmlFor: 'cabName' }, 'Имя и фамилия'),
                h('input', {
                  id: 'cabName',
                  className: 'field-input',
                  type: 'text',
                  required: true,
                  value: form.name || '',
                  onChange: function (e) { setForm(Object.assign({}, form, { name: e.target.value })); }
                })
              ),
              h('div', { className: 'field-box' },
                h('label', { className: 'field-label', htmlFor: 'cabCity' }, 'Город и адрес доставки'),
                h('input', {
                  id: 'cabCity',
                  className: 'field-input',
                  type: 'text',
                  value: form.city || '',
                  onChange: function (e) { setForm(Object.assign({}, form, { city: e.target.value })); }
                })
              ),
              h('div', { className: 'field-box' },
                h('label', { className: 'field-label', htmlFor: 'cabEmail' }, 'Электронная почта'),
                h('input', {
                  id: 'cabEmail',
                  className: 'field-input',
                  type: 'email',
                  required: true,
                  value: form.email || '',
                  onChange: function (e) { setForm(Object.assign({}, form, { email: e.target.value })); }
                })
              ),
              h('div', { className: 'field-box' },
                h('label', { className: 'field-label', htmlFor: 'cabPhone' }, 'Контактный телефон'),
                h('input', {
                  id: 'cabPhone',
                  className: 'field-input',
                  type: 'tel',
                  required: true,
                  value: form.phone || '',
                  onChange: function (e) { setForm(Object.assign({}, form, { phone: e.target.value })); }
                })
              )
            ),
            savedMsg ? h('p', { className: 'status-banner status-banner--success', role: 'status' },
              'Контактные данные профиля успешно сохранены!'
            ) : null,
            h('div', { className: 'modal-actions-row' },
              h('button', { type: 'submit', className: 'btn-volt btn-volt--primary' }, 'Сохранить изменения')
            )
          )
        ) : null,

        ui.cabinetTab === 'favorites' ? h('div', { className: 'cabinet-section' },
          favProducts.length === 0 ? h('div', { className: 'empty-state-box' },
            h('p', null, 'В избранном пока пусто. Нажимайте на сердечко у понравившихся товаров в каталоге!'),
            h('a', { className: 'btn-volt btn-volt--primary', href: 'catalog.html' }, 'Перейти в каталог')
          ) : h('div', { className: 'cabinet-list' },
            favProducts.map(function (item) {
              return h('div', { key: item.id, className: 'cabinet-item' },
                h('img', {
                  className: 'cabinet-item__img',
                  src: 'images/' + item.imageBase + '-480.jpg',
                  alt: item.name,
                  width: 96,
                  height: 64
                }),
                h('div', { className: 'cabinet-item__info' },
                  h('a', {
                    className: 'cabinet-item__title',
                    href: 'product.html?id=' + item.id
                  }, item.name),
                  h('p', { className: 'cabinet-item__meta' }, store.formatPrice(item.price))
                ),
                h('div', { className: 'cabinet-item__actions' },
                  h('a', {
                    className: 'btn-volt btn-volt--primary btn-volt--sm',
                    href: 'order.html?product=' + item.id
                  }, 'Заказать'),
                  h('button', {
                    type: 'button',
                    className: 'btn-volt btn-volt--ghost btn-volt--sm',
                    onClick: function () { store.toggleFavorite(item.id); }
                  }, 'Убрать')
                )
              );
            })
          )
        ) : null,

        ui.cabinetTab === 'orders' ? h('div', { className: 'cabinet-section' },
          h('div', { className: 'cabinet-list' },
            orders.map(function (ord) {
              return h('div', { key: ord.id, className: 'cabinet-order-row' },
                h('div', null,
                  h('strong', { className: 'cabinet-order-row__id' }, 'Заказ ' + ord.id + ' · ' + ord.date),
                  h('p', { className: 'cabinet-order-row__name' }, ord.productName + ' × ' + ord.quantity + ' шт.'),
                  h('span', { className: 'badge-pill badge-pill--mint' }, ord.status)
                ),
                h('strong', { className: 'cabinet-order-row__sum' }, store.formatPrice(ord.total))
              );
            })
          )
        ) : null
      )
    );
  }

  function QuickOrderModal() {
    var store = useVoltStore();
    var product = store.getUIState().quickOrderProduct;

    var _n = useState('');
    var name = _n[0];
    var setName = _n[1];

    var _p = useState('');
    var phone = _p[0];
    var setPhone = _p[1];

    var _done = useState(null);
    var createdOrder = _done[0];
    var setCreatedOrder = _done[1];

    useEffect(function () {
      if (product) {
        var prof = store.getProfile();
        setName(prof.name || '');
        setPhone(prof.phone || '');
        setCreatedOrder(null);
      }
    }, [product && product.id]);

    useEffect(function () {
      function onKey(e) {
        if (e.key === 'Escape' && product) store.closeQuickOrder();
      }
      window.addEventListener('keydown', onKey);
      return function () { window.removeEventListener('keydown', onKey); };
    }, [product]);

    if (!product) return null;

    return h('div', {
      className: 'modal-backdrop-layer',
      onClick: function (e) {
        if (e.target === e.currentTarget) store.closeQuickOrder();
      }
    },
      h('div', {
        className: 'modal-card',
        role: 'dialog',
        'aria-modal': 'true',
        'aria-labelledby': 'quickOrderModalTitle'
      },
        h('div', { className: 'modal-card__header' },
          h('h2', { id: 'quickOrderModalTitle', className: 'modal-card__title' }, 'Быстрый заказ в 1 клик'),
          h('button', {
            type: 'button',
            className: 'icon-close-btn',
            onClick: function () { store.closeQuickOrder(); },
            'aria-label': 'Закрыть окно быстрого заказа'
          }, h(Icon, { name: 'close' }))
        ),

        createdOrder ? h('div', { className: 'cabinet-section' },
          h('div', { className: 'status-banner status-banner--success', role: 'status' },
            'Заказ ' + createdOrder.id + ' оформлен! Устройство зарезервировано и добавлено в ваш Личный кабинет.'
          ),
          h('div', { className: 'modal-actions-row' },
            h('button', {
              type: 'button',
              className: 'btn-volt btn-volt--outline',
              onClick: function () {
                store.closeQuickOrder();
                store.openCabinet('orders');
              }
            }, 'Открыть мои заказы'),
            h('button', {
              type: 'button',
              className: 'btn-volt btn-volt--primary',
              onClick: function () { store.closeQuickOrder(); }
            }, 'Готово')
          )
        ) : h('form', {
          className: 'cabinet-form',
          onSubmit: function (e) {
            e.preventDefault();
            if (!name.trim() || !phone.trim()) return;
            var ord = store.addOrder({
              productName: product.name,
              quantity: 1,
              total: product.price
            });
            setCreatedOrder(ord);
          }
        },
          h('div', { className: 'quick-product-preview' },
            h('img', {
              src: 'images/' + product.imageBase + '-480.jpg',
              alt: product.name,
              width: 88,
              height: 60
            }),
            h('div', null,
              h('strong', null, product.name),
              h('p', null, store.formatPrice(product.price) + ' · самовывоз из магазина сегодня')
            )
          ),
          h('div', { className: 'field-box' },
            h('label', { className: 'field-label', htmlFor: 'qoName' }, 'Ваше имя'),
            h('input', {
              id: 'qoName',
              className: 'field-input',
              type: 'text',
              required: true,
              minLength: 2,
              value: name,
              onChange: function (e) { setName(e.target.value); }
            })
          ),
          h('div', { className: 'field-box' },
            h('label', { className: 'field-label', htmlFor: 'qoPhone' }, 'Телефон для подтверждения'),
            h('input', {
              id: 'qoPhone',
              className: 'field-input',
              type: 'tel',
              required: true,
              value: phone,
              onChange: function (e) { setPhone(e.target.value); }
            })
          ),
          h('div', { className: 'modal-actions-row' },
            h('a', {
              className: 'btn-volt btn-volt--outline',
              href: 'order.html?product=' + product.id
            }, 'Перейти к полному заказу'),
            h('button', { type: 'submit', className: 'btn-volt btn-volt--primary' }, 'Подтвердить резерв')
          )
        )
      )
    );
  }

  function FloatingWidgetsShell() {
    return h(React.Fragment, null,
      h(ChatWidget, null),
      h(StylizedTopButton, null),
      h(CabinetModal, null),
      h(QuickOrderModal, null)
    );
  }

  window.VoltShell = {
    Icon: Icon,
    useVoltStore: useVoltStore,
    SiteHeader: SiteHeader,
    SiteFooter: SiteFooter,
    FloatingWidgetsShell: FloatingWidgetsShell
  };
})();
