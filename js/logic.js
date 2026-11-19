(function () {
  'use strict';

  var STORAGE_KEYS = {
    theme: 'voltmirea-theme',
    favorites: 'voltmirea-favorites',
    profile: 'voltmirea-profile',
    orders: 'voltmirea-orders',
    chat: 'voltmirea-chat',
    checklist: 'voltmirea-checklist'
  };

  var PRODUCTS = [
    {
      id: 'keyboard',
      name: 'Механическая клавиатура Volt Key Pro 75%',
      shortName: 'Клавиатура Volt Key Pro',
      category: 'peripherals',
      categoryLabel: 'Клавиатуры и мыши',
      badge: 'Хит сезона',
      badgeTone: 'violet',
      price: 8900,
      oldPrice: null,
      inStock: true,
      rating: '4,9',
      warranty: '24 месяца',
      imageBase: 'prod-keyboard',
      imageAlt: 'Беспроводная компактная клавиатура в алюминиевом корпусе на рабочем столе',
      summary: 'Алюминиевый корпус, тихие линейные переключатели Hot-Swap, подключение по Bluetooth 5.2, радиоканалу 2.4 ГГц и USB-C.',
      description: 'Компактная беспроводная клавиатура формата 75% создана для программирования, учёбы и киберспорта. Многослойная шумоизоляция корпуса гасит резонанс при быстрой печати, а аккумулятор 4000 мА·ч держит заряд до трех недель.',
      specs: [
        ['Категория', 'Беспроводные механические клавиатуры'],
        ['Форм-фактор', '75% (84 клавиши + функциональный ряд)'],
        ['Тип переключателей', 'Линейные Hot-Swap (ресурс 80 млн нажатий)'],
        ['Интерфейсы', 'USB-C, радиоканал 2.4 ГГц, Bluetooth 5.2 (до 3 устройств)'],
        ['Материал корпуса', 'Анодированный алюминий и PBT-кейкапы'],
        ['Аккумулятор', '4000 мА·ч (до 200 часов без подсветки)'],
        ['Совместимость', 'Windows, macOS, Linux, iPadOS'],
        ['Гарантия магазина', '2 года официального сервиса VoltMirea']
      ]
    },
    {
      id: 'mouse',
      name: 'Беспроводная мышь Pulse Air Wireless',
      shortName: 'Мышь Pulse Air Wireless',
      category: 'peripherals',
      categoryLabel: 'Клавиатуры и мыши',
      badge: 'Ультралёгкая · 54 г',
      badgeTone: 'coral',
      price: 5400,
      oldPrice: 6500,
      inStock: true,
      rating: '4,9',
      warranty: '24 месяца',
      imageBase: 'prod-mouse',
      imageAlt: 'Белая эргономичная беспроводная компьютерная мышь на светлом столе',
      summary: 'Вес всего 54 грамма, оптический сенсор 26 000 DPI без срывов, тефлоновые глайды и до 95 часов автономной работы.',
      description: 'Симметричная беспроводная мышь с минимальной задержкой отклика 1 мс и оптическими микропереключателями. Подходит как для многочасовой работы в IDE и графических редакторах, так и для динамичных соревновательных игр.',
      specs: [
        ['Категория', 'Беспроводные игровые и рабочие мыши'],
        ['Сенсор', 'Оптический PixArt PAW3395 (до 26 000 DPI)'],
        ['Частота опроса', '1000 Гц (отклик 1 мс)'],
        ['Масса без кабеля', '54 г'],
        ['Переключатели', 'Оптические (до 90 млн кликов без даблклика)'],
        ['Автономность', 'До 95 часов от одного заряда USB-C'],
        ['Глайды', '100% чистый PTFE (запасной комплект в коробке)'],
        ['Гарантия магазина', '2 года официального сервиса VoltMirea']
      ]
    },
    {
      id: 'headset',
      name: 'Беспроводные наушники Studio ANC Max',
      shortName: 'Наушники Studio ANC Max',
      category: 'audio',
      categoryLabel: 'Аудио и стриминг',
      badge: 'Скидка -18%',
      badgeTone: 'coral',
      price: 11900,
      oldPrice: 14500,
      inStock: true,
      rating: '5,0',
      warranty: '24 месяца',
      imageBase: 'prod-headset',
      imageAlt: 'Студийные полноразмерные беспроводные наушники чёрного цвета с мягкими амбушюрами',
      summary: 'Гибридное активное шумоподавление до 42 дБ, 40-мм драйверы высокого разрешения, режим прозрачности и 50 часов музыки.',
      description: 'Полноразмерные наушники с глубокой сценой и интеллектуальным шумоподавлением позволяют сосредоточиться на коде и лекциях даже в шумном коворкинге или метро. Мягкие амбушюры с эффектом памяти не давят при длительном ношении.',
      specs: [
        ['Категория', 'Беспроводные наушники с активным шумоподавлением'],
        ['Излучатели', 'Динамические 40 мм с титановым напылением'],
        ['Шумоподавление', 'Гибридное ANC до -42 дБ + режим прозрачности'],
        ['Микрофоны', '4 направленных микрофона с ENC для звонков'],
        ['Кодеки', 'LDAC, AAC, SBC + проводной режим USB-C / 3.5 мм'],
        ['Время работы', 'До 50 часов (с ANC) / 68 часов (без ANC)'],
        ['Быстрая зарядка', '10 минут зарядки = 6 часов прослушивания'],
        ['Гарантия магазина', '2 года официального сервиса VoltMirea']
      ]
    },
    {
      id: 'mic',
      name: 'Студийный микрофон Broadcast Cast XLR/USB',
      shortName: 'Микрофон Broadcast Cast',
      category: 'audio',
      categoryLabel: 'Аудио и стриминг',
      badge: 'Выбор стримеров',
      badgeTone: 'amber',
      price: 13400,
      oldPrice: null,
      inStock: true,
      rating: '4,8',
      warranty: '24 месяца',
      imageBase: 'prod-mic',
      imageAlt: 'Чёрный динамический студийный микрофон на настольном пантографе',
      summary: 'Динамический капсюль радиовещательного класса, двойной интерфейс USB-C и XLR, встроенный поп-фильтр и выход на наушники.',
      description: 'Кардиоидный динамический микрофон отсекает эхо комнаты и шум клавиш, передавая плотный бархатный голос на созвонах, записи лекций, подкастов и стримах. Подключается напрямую к ноутбуку по USB-C без внешней звуковой карты.',
      specs: [
        ['Категория', 'Динамические микрофоны для стриминга и подкастов'],
        ['Диаграмма направленности', 'Кардиоидная (отсечение фонового шума)'],
        ['Разрядность ЦАП/АЦП', '24 бит / 96 кГц'],
        ['Подключение', 'USB-C (Plug & Play) и профессиональный XLR'],
        ['Мониторинг', 'Выход 3.5 мм с нулевой задержкой и регулятором'],
        ['Крепление', 'Металлический подвес на стойку или пантограф 5/8"'],
        ['Ветрозащита', 'Двухслойный акустический экран в комплекте'],
        ['Гарантия магазина', '2 года официального сервиса VoltMirea']
      ]
    },
    {
      id: 'monitor',
      name: 'Монитор 27" Clarity 4K IPS USB-C 90W',
      shortName: 'Монитор Clarity 27" 4K',
      category: 'workstation',
      categoryLabel: 'Мониторы и ноутбуки',
      badge: 'Для кода и дизайна',
      badgeTone: 'mint',
      price: 34900,
      oldPrice: 38900,
      inStock: true,
      rating: '5,0',
      warranty: '36 месяцев',
      imageBase: 'prod-monitor',
      imageAlt: 'Широкоформатный монитор с тонкими рамками на минималистичном светлом столе',
      summary: 'Кристальная чёткость шрифтов 4K UHD, заводская калибровка 99% sRGB, зарядка ноутбука по одному кабелю USB-C до 90 Вт.',
      description: '27-дюймовый IPS-монитор превращает рабочий стол в полноценную станцию: один кабель USB-C передаёт видеосигнал 4K, подключает периферию через встроенный USB-хаб и одновременно заряжает ноутбук мощностью до 90 Вт.',
      specs: [
        ['Категория', 'Профессиональные мониторы для работы и учёбы'],
        ['Диагональ и матрица', '27 дюймов, IPS с антибликовым покрытием'],
        ['Разрешение', '3840 × 2160 (4K UHD, 163 PPI)'],
        ['Цветовой охват', '99% sRGB, 95% DCI-P3, заводская калибровка ΔE < 2'],
        ['Порты', 'USB-C (DisplayPort + Power Delivery 90 Вт), HDMI 2.1, DP 1.4, 3× USB-A'],
        ['Защита зрения', 'Аппаратный фильтр синего света TÜV Low Blue Light, Flicker-Free'],
        ['Эргономика подставки', 'Регулировка высоты, наклона и портретный режим Pivot'],
        ['Гарантия магазина', '3 года расширенного сервиса VoltMirea']
      ]
    },
    {
      id: 'laptop',
      name: 'Ультрабук AeroBook 14 OLED (16 / 512 ГБ)',
      shortName: 'Ультрабук AeroBook 14',
      category: 'workstation',
      categoryLabel: 'Мониторы и ноутбуки',
      badge: 'Предзаказ партии',
      badgeTone: 'muted',
      price: 69900,
      oldPrice: null,
      inStock: false,
      rating: '4,9',
      warranty: '24 месяца',
      imageBase: 'prod-webcam',
      imageAlt: 'Тонкий компактный ультрабук на светлом рабочем столе рядом с блокнотом и очками',
      summary: 'Вес 1,18 кг, экран 14" 2.8K OLED 120 Гц, 16 ГБ быстрой памяти и до 14 часов автономной работы на парах и в поездках.',
      description: 'Лёгкий металлический ультрабук легко помещается в городской рюкзак, мгновенно выходит из сна и тянет компиляцию проектов, Docker-контейнеры и работу с макетами без шума вентиляторов.',
      specs: [
        ['Категория', 'Компактные ультрабуки для разработки и учёбы'],
        ['Экран', '14" OLED, 2880 × 1800, 120 Гц, яркость 500 нит'],
        ['Оперативная память', '16 ГБ LPDDR5X (двухканальный режим)'],
        ['Накопитель', '512 ГБ NVMe PCIe 4.0 SSD (свободный слот M.2)'],
        ['Беспроводная связь', 'Wi-Fi 6E и Bluetooth 5.3'],
        ['Разъёмы', '2× USB4 / Thunderbolt, HDMI 2.1, USB-A 3.2, аудио 3.5 мм'],
        ['Масса и корпус', '1,18 кг, цельнометаллический магниево-алюминиевый сплав'],
        ['Статус поставки', 'Ожидается поставка на следующей неделе']
      ]
    }
  ];

  var PROMO_CODES = {
    MIREA10: { code: 'MIREA10', type: 'percent', value: 10, label: 'Скидка студентам МИРЭА -10%' },
    VOLT15: { code: 'VOLT15', type: 'percent', value: 15, label: 'Клубный промокод -15%' },
    SETUP3000: { code: 'SETUP3000', type: 'fixed', value: 3000, label: 'Выгода -3 000 ₽ на сборку сетапа' }
  };

  var REVIEWS = [
    {
      id: 'r1',
      score: '5,0',
      author: 'Артём К., студент ИПТИП',
      meta: 'Клавиатура Volt Key Pro + мышь Pulse Air · ноябрь 2026',
      quote: 'Зашёл в шоурум на проспекте Вернадского прямо после пар, попробовал свитчи на стенде и сразу забрал комплект со студенческой скидкой 10%. Печатать код одно удовольствие!'
    },
    {
      id: 'r2',
      score: '5,0',
      author: 'Екатерина М., фронтенд-разработчик',
      meta: 'Монитор 27" Clarity 4K USB-C · октябрь 2026',
      quote: 'Подключила ноутбук одним кабелем USB-C — и картинка 4K без лесенок на шрифтах, и зарядка 90 Вт сразу идёт. Курьер привёз за два часа в день заказа.'
    },
    {
      id: 'r3',
      score: '4,9',
      author: 'Даниил В., ведущий подкастов',
      meta: 'Наушники Studio ANC Max + микрофон Broadcast Cast · сентябрь 2026',
      quote: 'Консультант в онлайн-чате за пару минут помог подобрать динамический микрофон под необработанную комнату. Звук чистый, как в студии, без эха и шума ноутбука.'
    }
  ];

  var FAQ_ITEMS = [
    {
      q: 'Как получить студенческую скидку 10% по студбилету?',
      a: 'Выберите тариф «Студенческий МИРЭА (-10%)» в калькуляторе заказа или введите промокод MIREA10. При получении в шоуруме или у курьера достаточно показать студенческий билет.'
    },
    {
      q: 'Можно ли протестировать клавиатуры, мыши и наушники перед покупкой?',
      a: 'Да! Во флагманском шоуруме VoltMirea на проспекте Вернадского, 78 открыта демо-зона со стендами всех переключателей, мышей, микрофонов и 4K-мониторов.'
    },
    {
      q: 'Как работает гарантия 2 года от магазина?',
      a: 'При любом заводском браке в течение гарантийного срока мы бесплатно меняем устройство на новое или проводим экспресс-диагностику за 24 часа в собственном сервисном центре.'
    },
    {
      q: 'Где посмотреть мои избранные товары и оформленные заявки?',
      a: 'Нажмите кнопку «Кабинет» или иконку сердечка в верхней панели сайта: в Личном кабинете сохраняются ваши данные, бонусные баллы, избранные девайсы и вся история заказов.'
    }
  ];

  var CHECKLIST_ITEMS = [
    { id: 'ergonomics', label: 'Выставить верхний край монитора на уровне глаз (расстояние 55–70 см)' },
    { id: 'lighting', label: 'Настроить мягкий тёплый свет без бликов на экране в вечернее время' },
    { id: 'cable', label: 'Подключить питание и периферию через один кабель USB-C с кабель-менеджментом' },
    { id: 'wrist', label: 'Расположить клавиатуру и мышь на одном уровне с опорой для предплечий' },
    { id: 'audio', label: 'Проверить уровень микрофона и шумоподавления перед онлайн-парами и созвонами' },
    { id: 'backup', label: 'Активировать расширенную гарантию VoltMirea в Личном кабинете' }
  ];

  var DEFAULT_PROFILE = {
    name: 'Дмитрий Явдощук',
    group: 'ЭФБО-11-25',
    email: 'student@mirea.ru',
    phone: '+7 (900) 123-45-67',
    bonusPoints: 1500,
    studentVerified: true
  };

  var DEFAULT_CHAT = [
    {
      id: 'welcome-1',
      sender: 'bot',
      time: 'Сейчас',
      text: 'Привет! Я Алексей, онлайн-консультант VoltMirea. Помогу подобрать девайс под учёбу, разработку или игры и подскажу промокод на скидку.'
    }
  ];

  function safeRead(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function safeWrite(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // ignore storage quota errors
    }
  }

  function formatPrice(num) {
    var n = Math.round(Number(num) || 0);
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
  }

  var listeners = [];
  var uiModalState = {
    cabinetOpen: false,
    cabinetTab: 'profile',
    quickOrderProduct: null,
    chatOpen: false
  };

  function emitChange() {
    listeners.forEach(function (fn) {
      try {
        fn();
      } catch (e) {
        // ignore listener error
      }
    });
  }

  function subscribe(fn) {
    listeners.push(fn);
    return function () {
      listeners = listeners.filter(function (item) {
        return item !== fn;
      });
    };
  }

  function getTheme() {
    try {
      return localStorage.getItem(STORAGE_KEYS.theme) || 'light';
    } catch (e) {
      return 'light';
    }
  }

  function setTheme(theme) {
    var next = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEYS.theme, next);
    } catch (e) {
      // ignore
    }
    emitChange();
  }

  function toggleTheme() {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  }

  function getFavorites() {
    var list = safeRead(STORAGE_KEYS.favorites, ['keyboard']);
    return Array.isArray(list) ? list : [];
  }

  function toggleFavorite(productId) {
    var current = getFavorites();
    var next = current.indexOf(productId) >= 0
      ? current.filter(function (id) { return id !== productId; })
      : current.concat([productId]);
    safeWrite(STORAGE_KEYS.favorites, next);
    emitChange();
    return next;
  }

  function getProfile() {
    return Object.assign({}, DEFAULT_PROFILE, safeRead(STORAGE_KEYS.profile, {}));
  }

  function saveProfile(patch) {
    var updated = Object.assign({}, getProfile(), patch);
    safeWrite(STORAGE_KEYS.profile, updated);
    emitChange();
    return updated;
  }

  function getOrders() {
    var list = safeRead(STORAGE_KEYS.orders, [
      {
        id: 'VM-2041',
        date: '15.11.2026',
        productName: 'Беспроводная мышь Pulse Air Wireless',
        quantity: 1,
        total: 4860,
        status: 'Готов к выдаче на Вернадского, 78'
      }
    ]);
    return Array.isArray(list) ? list : [];
  }

  function addOrder(orderData) {
    var orders = getOrders();
    var now = new Date();
    var dd = String(now.getDate()).padStart(2, '0');
    var mm = String(now.getMonth() + 1).padStart(2, '0');
    var yyyy = now.getFullYear();
    var newOrder = {
      id: 'VM-' + Math.floor(3000 + Math.random() * 6000),
      date: dd + '.' + mm + '.' + yyyy,
      productName: orderData.productName,
      quantity: orderData.quantity || 1,
      total: orderData.total || 0,
      status: 'Принят в обработку · ждёт подтверждения'
    };
    var nextOrders = [newOrder].concat(orders);
    safeWrite(STORAGE_KEYS.orders, nextOrders);

    var profile = getProfile();
    var earnedBonus = Math.max(150, Math.round((orderData.total || 5000) * 0.05));
    saveProfile({ bonusPoints: (profile.bonusPoints || 0) + earnedBonus });

    emitChange();
    return newOrder;
  }

  function calculateOrder(params) {
    var product = getProductById(params.productId) || PRODUCTS[0];
    var qty = Math.max(1, Math.min(20, Number(params.quantity) || 1));
    var base = product.price * qty;

    var addons = 0;
    if (params.warrantyPlus) addons += 1490 * qty;
    if (params.expressDelivery) addons += 690;
    if (params.customSetup) addons += 990;

    var tariffRate = 0;
    if (params.tariff === 'student') tariffRate = 0.10;
    if (params.tariff === 'team') tariffRate = 0.12;
    if (qty >= 3 && tariffRate < 0.10) tariffRate = 0.10;

    var subtotal = base + addons;
    var discount = Math.round(subtotal * tariffRate);

    var cleanCode = String(params.promoCode || '').trim().toUpperCase();
    var promoObj = PROMO_CODES[cleanCode] || null;
    if (promoObj) {
      if (promoObj.type === 'percent') {
        discount += Math.round((subtotal - discount) * (promoObj.value / 100));
      } else if (promoObj.type === 'fixed') {
        discount += promoObj.value;
      }
    }

    discount = Math.min(discount, Math.round(subtotal * 0.45));
    var total = Math.max(0, subtotal - discount);

    return {
      product: product,
      quantity: qty,
      base: base,
      addons: addons,
      discount: discount,
      total: total,
      promoApplied: promoObj
    };
  }

  function getProductById(id) {
    for (var i = 0; i < PRODUCTS.length; i += 1) {
      if (PRODUCTS[i].id === id) return PRODUCTS[i];
    }
    return null;
  }

  function getChatMessages() {
    var msgs = safeRead(STORAGE_KEYS.chat, DEFAULT_CHAT);
    return Array.isArray(msgs) && msgs.length ? msgs : DEFAULT_CHAT;
  }

  function buildConsultantReply(text) {
    var q = String(text || '').toLowerCase();
    if (q.indexOf('скид') >= 0 || q.indexOf('промо') >= 0 || q.indexOf('мирэа') >= 0 || q.indexOf('студ') >= 0) {
      return 'Для студентов МИРЭА действует скидка 10% по промокоду MIREA10, а на полную сборку рабочего места можно применить промокод SETUP3000 (-3 000 ₽) на странице оформления заказа!';
    }
    if (q.indexOf('клавиатур') >= 0 || q.indexOf('код') >= 0 || q.indexOf('печат') >= 0) {
      return 'Для программирования и учёбы рекомендую Volt Key Pro 75% (8 900 ₽): тихие линейные свитчи с шумоизоляцией, алюминиевый корпус и работа сразу с ноутбуком и планшетом по Bluetooth.';
    }
    if (q.indexOf('мыш') >= 0 || q.indexOf('игр') >= 0) {
      return 'Беспроводная Pulse Air Wireless весит всего 54 г и держит заряд до 95 часов — сейчас на неё действует спеццена 5 400 ₽ вместо 6 500 ₽.';
    }
    if (q.indexOf('достав') >= 0 || q.indexOf('адрес') >= 0 || q.indexOf('забрат') >= 0 || q.indexOf('шоурум') >= 0) {
      return 'Самовывоз из флагманского шоурума на пр-те Вернадского, 78 бесплатный уже через 30 минут после заявки! Также доступна экспресс-доставка по Москве за 2 часа.';
    }
    if (q.indexOf('гарант') >= 0 || q.indexOf('возврат') >= 0) {
      return 'На всю технику VoltMirea действует официальная гарантия от 2 до 3 лет с быстрой заменой устройства в нашем сервисном центре без долгого ожидания.';
    }
    if (q.indexOf('наушн') >= 0 || q.indexOf('микрофон') >= 0 || q.indexOf('звук') >= 0) {
      return 'Для шумного кампуса отлично подойдут Studio ANC Max с активным шумоподавлением до -42 дБ (11 900 ₽), а для созвонов и стримов — микрофон Broadcast Cast с USB-C.';
    }
    return 'Отличный вопрос! Все актуальные модели в наличии можно протестировать в шоуруме на пр-те Вернадского, 78, отложить в «Избранное» или рассчитать со скидкой в калькуляторе заказа. Подсказать конкретную модель под ваш бюджет?';
  }

  function pushChatMessage(sender, text) {
    var now = new Date();
    var timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    var list = getChatMessages().concat([{
      id: 'msg-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
      sender: sender,
      time: timeStr,
      text: text
    }]);
    safeWrite(STORAGE_KEYS.chat, list.slice(-30));
    emitChange();
    return list;
  }

  function resetChat() {
    safeWrite(STORAGE_KEYS.chat, DEFAULT_CHAT);
    emitChange();
  }

  function getChecklist() {
    var saved = safeRead(STORAGE_KEYS.checklist, { ergonomics: true, cable: true });
    return saved && typeof saved === 'object' ? saved : {};
  }

  function toggleChecklistItem(itemId) {
    var current = getChecklist();
    var next = Object.assign({}, current);
    next[itemId] = !next[itemId];
    safeWrite(STORAGE_KEYS.checklist, next);
    emitChange();
    return next;
  }

  function getUIState() {
    return Object.assign({}, uiModalState);
  }

  function openCabinet(tab) {
    uiModalState.cabinetOpen = true;
    uiModalState.cabinetTab = tab || 'profile';
    emitChange();
  }

  function closeCabinet() {
    uiModalState.cabinetOpen = false;
    emitChange();
  }

  function openQuickOrder(productId) {
    uiModalState.quickOrderProduct = getProductById(productId) || PRODUCTS[0];
    emitChange();
  }

  function closeQuickOrder() {
    uiModalState.quickOrderProduct = null;
    emitChange();
  }

  function setChatOpen(open) {
    uiModalState.chatOpen = Boolean(open);
    emitChange();
  }

  window.VoltStore = {
    PRODUCTS: PRODUCTS,
    PROMO_CODES: PROMO_CODES,
    REVIEWS: REVIEWS,
    FAQ_ITEMS: FAQ_ITEMS,
    CHECKLIST_ITEMS: CHECKLIST_ITEMS,
    formatPrice: formatPrice,
    subscribe: subscribe,
    getTheme: getTheme,
    setTheme: setTheme,
    toggleTheme: toggleTheme,
    getFavorites: getFavorites,
    toggleFavorite: toggleFavorite,
    getProfile: getProfile,
    saveProfile: saveProfile,
    getOrders: getOrders,
    addOrder: addOrder,
    calculateOrder: calculateOrder,
    getProductById: getProductById,
    getChatMessages: getChatMessages,
    buildConsultantReply: buildConsultantReply,
    pushChatMessage: pushChatMessage,
    resetChat: resetChat,
    getChecklist: getChecklist,
    toggleChecklistItem: toggleChecklistItem,
    getUIState: getUIState,
    openCabinet: openCabinet,
    closeCabinet: closeCabinet,
    openQuickOrder: openQuickOrder,
    closeQuickOrder: closeQuickOrder,
    setChatOpen: setChatOpen
  };
})();
