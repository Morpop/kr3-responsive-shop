(function () {
  'use strict';

  var h = React.createElement;
  var useState = React.useState;
  var useEffect = React.useEffect;
  var useMemo = React.useMemo;
  var Icon = window.VoltShell.Icon;
  var useVoltStore = window.VoltShell.useVoltStore;

  function ProductCard(props) {
    var item = props.item;
    var store = props.store;
    var isFav = store.getFavorites().indexOf(item.id) >= 0;

    return h('article', {
      className: 'device-card' + (!item.inStock ? ' device-card--out' : '')
    },
      h('a', {
        className: 'device-card__media',
        href: 'product.html?id=' + item.id
      },
        h('img', {
          className: 'device-card__img',
          src: 'images/' + item.imageBase + '-800.jpg',
          srcSet: 'images/' + item.imageBase + '-480.jpg 480w, images/' + item.imageBase + '-800.jpg 800w, images/' + item.imageBase + '-1200.jpg 1200w',
          sizes: '(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 360px',
          alt: item.imageAlt,
          width: 800,
          height: 533,
          loading: 'lazy'
        })
      ),

      h('div', { className: 'device-card__body' },
        h('div', { className: 'device-card__top' },
          h('span', { className: 'badge-pill badge-pill--' + item.badgeTone }, item.badge),
          h('button', {
            type: 'button',
            className: 'fav-heart-btn' + (isFav ? ' is-active' : ''),
            'aria-pressed': String(isFav),
            'aria-label': (isFav ? 'Убрать из избранного: ' : 'Добавить в избранное: ') + item.name,
            onClick: function () { store.toggleFavorite(item.id); }
          }, h(Icon, { name: 'heart', filled: isFav }))
        ),

        h('p', { className: 'device-card__cat' }, item.categoryLabel + ' · ★ ' + item.rating),
        h('h3', { className: 'device-card__title' },
          h('a', { href: 'product.html?id=' + item.id }, item.name)
        ),
        h('p', { className: 'device-card__desc' }, item.summary),

        h('div', { className: 'device-card__price-row' },
          h('span', { className: 'device-card__price' }, store.formatPrice(item.price)),
          item.oldPrice ? h('s', { className: 'device-card__old' }, store.formatPrice(item.oldPrice)) : null
        ),

        h('div', { className: 'device-card__actions' },
          h('a', {
            className: 'btn-volt btn-volt--outline btn-volt--sm',
            href: 'product.html?id=' + item.id
          }, 'Характеристики'),
          item.inStock ? h('button', {
            type: 'button',
            className: 'btn-volt btn-volt--primary btn-volt--sm',
            onClick: function () { store.openQuickOrder(item.id); }
          }, 'Заказать') : h('button', {
            type: 'button',
            className: 'btn-volt btn-volt--disabled btn-volt--sm',
            disabled: true
          }, 'Ожидается')
        )
      )
    );
  }

  function HomeFeaturedApp() {
    var store = useVoltStore();
    var featured = store.PRODUCTS.slice(0, 3);
    return h('div', { className: 'cards-grid-three' },
      featured.map(function (item) {
        return h(ProductCard, { key: item.id, item: item, store: store });
      })
    );
  }

  function CatalogApp() {
    var store = useVoltStore();
    var _cat = useState('all');
    var category = _cat[0];
    var setCategory = _cat[1];

    var _q = useState('');
    var search = _q[0];
    var setSearch = _q[1];

    var _s = useState('popular');
    var sortBy = _s[0];
    var setSortBy = _s[1];

    var _min = useState('');
    var minPrice = _min[0];
    var setMinPrice = _min[1];

    var _max = useState('');
    var maxPrice = _max[0];
    var setMaxPrice = _max[1];

    var _stock = useState(false);
    var onlyInStock = _stock[0];
    var setOnlyInStock = _stock[1];

    useEffect(function () {
      var params = new URLSearchParams(window.location.search);
      var catParam = params.get('cat');
      if (catParam) setCategory(catParam);
    }, []);

    var favorites = store.getFavorites();

    var filtered = useMemo(function () {
      var q = search.trim().toLowerCase();
      var minVal = minPrice !== '' ? Number(minPrice) : 0;
      var maxVal = maxPrice !== '' ? Number(maxPrice) : Infinity;

      var res = store.PRODUCTS.filter(function (p) {
        if (category === 'favorites' && favorites.indexOf(p.id) < 0) return false;
        if (category !== 'all' && category !== 'favorites' && p.category !== category) return false;
        if (onlyInStock && !p.inStock) return false;
        if (p.price < minVal || p.price > maxVal) return false;
        if (q) {
          var hay = (p.name + ' ' + p.categoryLabel + ' ' + p.summary + ' ' + p.badge).toLowerCase();
          if (hay.indexOf(q) < 0) return false;
        }
        return true;
      });

      var copy = res.slice();
      if (sortBy === 'price-asc') {
        copy.sort(function (a, b) { return a.price - b.price; });
      } else if (sortBy === 'price-desc') {
        copy.sort(function (a, b) { return b.price - a.price; });
      }
      return copy;
    }, [category, search, sortBy, minPrice, maxPrice, onlyInStock, favorites.join(',')]);

    function resetAll() {
      setCategory('all');
      setSearch('');
      setSortBy('popular');
      setMinPrice('');
      setMaxPrice('');
      setOnlyInStock(false);
    }

    var tabs = [
      { id: 'all', label: 'Все товары (' + store.PRODUCTS.length + ')' },
      { id: 'peripherals', label: 'Клавиатуры и мыши' },
      { id: 'audio', label: 'Аудио и стриминг' },
      { id: 'workstation', label: 'Мониторы и ноутбуки' },
      { id: 'favorites', label: 'Избранное (' + favorites.length + ')' }
    ];

    return h('div', { className: 'catalog-shell' },
      h('div', { className: 'catalog-top-controls' },
        h('div', { className: 'filter-pills', role: 'group', 'aria-label': 'Категории каталога' },
          tabs.map(function (t) {
            var active = category === t.id;
            return h('button', {
              key: t.id,
              type: 'button',
              className: 'filter-pill' + (active ? ' is-active' : ''),
              'aria-pressed': String(active),
              onClick: function () { setCategory(t.id); }
            }, t.label);
          })
        ),

        h('div', { className: 'search-sort-bar' },
          h('div', { className: 'field-box search-sort-bar__search' },
            h('label', { className: 'field-label', htmlFor: 'catalogSearchInput' }, 'Живой поиск по каталогу'),
            h('input', {
              id: 'catalogSearchInput',
              className: 'field-input',
              type: 'search',
              value: search,
              onChange: function (e) { setSearch(e.target.value); },
              placeholder: 'Например: клавиатура, 4K, беспроводная, ANC, микрофон...'
            })
          ),
          h('div', { className: 'field-box search-sort-bar__sort' },
            h('label', { className: 'field-label', htmlFor: 'catalogSortSelect' }, 'Сортировка'),
            h('select', {
              id: 'catalogSortSelect',
              className: 'field-input',
              value: sortBy,
              onChange: function (e) { setSortBy(e.target.value); }
            },
              h('option', { value: 'popular' }, 'По популярности'),
              h('option', { value: 'price-asc' }, 'Сначала дешевле'),
              h('option', { value: 'price-desc' }, 'Сначала дороже')
            )
          )
        )
      ),

      h('div', { className: 'catalog-layout' },
        h('aside', { className: 'catalog-filters', 'aria-label': 'Параметры подбора' },
          h('h2', { className: 'catalog-filters__title' }, 'Фильтр параметров'),
          h('div', { className: 'filters-stack' },
            h('div', { className: 'field-box' },
              h('label', { className: 'field-label', htmlFor: 'filterPriceMin' }, 'Цена от, ₽'),
              h('input', {
                id: 'filterPriceMin',
                className: 'field-input',
                type: 'number',
                min: '0',
                placeholder: '0',
                value: minPrice,
                onChange: function (e) { setMinPrice(e.target.value); }
              })
            ),
            h('div', { className: 'field-box' },
              h('label', { className: 'field-label', htmlFor: 'filterPriceMax' }, 'Цена до, ₽'),
              h('input', {
                id: 'filterPriceMax',
                className: 'field-input',
                type: 'number',
                min: '0',
                placeholder: '80000',
                value: maxPrice,
                onChange: function (e) { setMaxPrice(e.target.value); }
              })
            ),
            h('label', { className: 'check-row', htmlFor: 'filterStockOnly' },
              h('input', {
                id: 'filterStockOnly',
                type: 'checkbox',
                checked: onlyInStock,
                onChange: function (e) { setOnlyInStock(e.target.checked); }
              }),
              h('span', null, 'Только в наличии в магазине')
            ),
            h('p', { className: 'catalog-filters__count', 'aria-live': 'polite' },
              'Найдено устройств: ' + filtered.length
            ),
            h('button', {
              type: 'button',
              className: 'btn-volt btn-volt--outline btn-volt--full',
              onClick: resetAll
            }, 'Сбросить фильтры')
          )
        ),

        h('div', { className: 'catalog-results' },
          filtered.length === 0 ? h('div', { className: 'empty-state-box' },
            h('h3', null, 'По вашему запросу ничего не найдено'),
            h('p', null, 'Попробуйте изменить поисковый запрос или сбросить ограничения по цене.'),
            h('button', {
              type: 'button',
              className: 'btn-volt btn-volt--primary',
              onClick: resetAll
            }, 'Показать все товары')
          ) : h('div', { className: 'products-grid' },
            filtered.map(function (item) {
              return h(ProductCard, { key: item.id, item: item, store: store });
            })
          )
        )
      )
    );
  }

  function ProductPageApp(props) {
    var store = useVoltStore();
    var initialId = useMemo(function () {
      var params = new URLSearchParams(window.location.search);
      return params.get('id') || props.defaultId || 'keyboard';
    }, [props.defaultId]);

    var _pid = useState(initialId);
    var productId = _pid[0];
    var setProductId = _pid[1];

    var product = store.getProductById(productId) || store.PRODUCTS[0];
    var isFav = store.getFavorites().indexOf(product.id) >= 0;
    var checklist = store.getChecklist();

    var completedCount = store.CHECKLIST_ITEMS.filter(function (c) {
      return Boolean(checklist[c.id]);
    }).length;
    var pct = Math.round((completedCount / store.CHECKLIST_ITEMS.length) * 100);

    return h('div', { className: 'product-page-flow' },
      h('nav', { className: 'breadcrumbs-bar', 'aria-label': 'Хлебные крошки' },
        h('a', { href: 'index.html' }, 'Главная'),
        h('span', { 'aria-hidden': 'true' }, ' / '),
        h('a', { href: 'catalog.html' }, 'Каталог'),
        h('span', { 'aria-hidden': 'true' }, ' / '),
        h('span', { 'aria-current': 'page' }, product.shortName)
      ),

      h('div', { className: 'product-switcher', role: 'group', 'aria-label': 'Быстрое переключение товара' },
        store.PRODUCTS.map(function (p) {
          var active = p.id === product.id;
          return h('button', {
            key: p.id,
            type: 'button',
            className: 'filter-pill' + (active ? ' is-active' : ''),
            onClick: function () { setProductId(p.id); }
          }, p.shortName);
        })
      ),

      h('section', { className: 'product-hero-grid' },
        h('div', { className: 'product-media-card' },
          h('picture', null,
            h('source', {
              media: '(min-width: 1024px)',
              srcSet: 'images/' + product.imageBase + '-1200.jpg 1200w',
              sizes: '580px'
            }),
            h('img', {
              className: 'product-media-card__img',
              src: 'images/' + product.imageBase + '-800.jpg',
              srcSet: 'images/' + product.imageBase + '-480.jpg 480w, images/' + product.imageBase + '-800.jpg 800w, images/' + product.imageBase + '-1200.jpg 1200w',
              sizes: '(max-width: 1023px) 92vw, 580px',
              alt: product.imageAlt,
              width: 1200,
              height: 800
            })
          )
        ),

        h('div', { className: 'product-summary-panel' },
          h('div', { className: 'device-card__top' },
            h('span', { className: 'badge-pill badge-pill--' + product.badgeTone }, product.badge),
            h('button', {
              type: 'button',
              className: 'fav-heart-btn' + (isFav ? ' is-active' : ''),
              'aria-pressed': String(isFav),
              'aria-label': isFav ? 'Убрать товар из избранного' : 'Добавить товар в избранное',
              onClick: function () { store.toggleFavorite(product.id); }
            }, h(Icon, { name: 'heart', filled: isFav }))
          ),
          h('h1', { className: 'page-h1' }, product.name),
          h('p', { className: 'lead-paragraph' }, product.description),

          h('div', { className: 'specs-mini-grid' },
            h('div', { className: 'specs-mini-card' },
              h('span', null, 'Категория'),
              h('strong', null, product.categoryLabel)
            ),
            h('div', { className: 'specs-mini-card' },
              h('span', null, 'Оценка покупателей'),
              h('strong', null, '★ ' + product.rating + ' из 5,0')
            ),
            h('div', { className: 'specs-mini-card' },
              h('span', null, 'Официальная гарантия'),
              h('strong', null, product.warranty)
            ),
            h('div', { className: 'specs-mini-card' },
              h('span', null, 'Наличие'),
              h('strong', null, product.inStock ? 'В наличии в магазине' : 'Ожидается поставка')
            )
          ),

          h('div', { className: 'product-buy-bar' },
            h('div', null,
              h('span', { className: 'product-buy-bar__price' }, store.formatPrice(product.price)),
              product.oldPrice ? h('s', { className: 'device-card__old' }, store.formatPrice(product.oldPrice)) : null
            ),
            h('div', { className: 'product-buy-bar__btns' },
              product.inStock ? h('button', {
                type: 'button',
                className: 'btn-volt btn-volt--outline',
                onClick: function () { store.openQuickOrder(product.id); }
              }, 'Заказ в 1 клик') : null,
              h('a', {
                className: 'btn-volt btn-volt--primary',
                href: 'order.html?product=' + product.id
              }, 'Оформить с опциями')
            )
          )
        )
      ),

      h('section', { className: 'surface-card' },
        h('h2', { className: 'section-h2' }, 'Технические характеристики'),
        h('div', { className: 'table-wrapper' },
          h('table', { className: 'product-table' },
            h('caption', { className: 'visually-hidden' }, 'Подробные характеристики устройства ' + product.name),
            h('thead', null,
              h('tr', null,
                h('th', { scope: 'col' }, 'Параметр устройства'),
                h('th', { scope: 'col' }, 'Значение и спецификация')
              )
            ),
            h('tbody', null,
              product.specs.map(function (row) {
                return h('tr', { key: row[0] },
                  h('th', { scope: 'row' }, row[0]),
                  h('td', null, row[1])
                );
              })
            )
          )
        )
      ),

      h('section', { className: 'surface-card' },
        h('div', { className: 'checklist-header' },
          h('div', null,
            h('h2', { className: 'section-h2' }, 'Чек-лист настройки рабочего места'),
            h('p', { className: 'muted-note' }, 'Отмечайте этапы подключения и эргономики — прогресс сохраняется в браузере.')
          ),
          h('span', { className: 'badge-pill badge-pill--violet', 'aria-live': 'polite' },
            'Готово: ' + completedCount + ' из ' + store.CHECKLIST_ITEMS.length + ' (' + pct + '%)'
          )
        ),
        h('div', { className: 'progress-track', 'aria-hidden': 'true' },
          h('div', { className: 'progress-track__fill', style: { width: pct + '%' } })
        ),
        h('div', { className: 'checklist-grid' },
          store.CHECKLIST_ITEMS.map(function (item) {
            var checked = Boolean(checklist[item.id]);
            return h('label', {
              key: item.id,
              className: 'checklist-tile' + (checked ? ' is-done' : '')
            },
              h('input', {
                type: 'checkbox',
                checked: checked,
                onChange: function () { store.toggleChecklistItem(item.id); }
              }),
              h('span', null, item.label)
            );
          })
        )
      )
    );
  }

  function OrderPageApp() {
    var store = useVoltStore();
    var profile = store.getProfile();

    var initialProductId = useMemo(function () {
      var params = new URLSearchParams(window.location.search);
      var p = params.get('product');
      return store.getProductById(p) ? p : 'keyboard';
    }, []);

    var _pid = useState(initialProductId);
    var productId = _pid[0];
    var setProductId = _pid[1];

    var _qty = useState(1);
    var quantity = _qty[0];
    var setQuantity = _qty[1];

    var _del = useState('pickup');
    var deliveryMethod = _del[0];
    var setDeliveryMethod = _del[1];

    var _w = useState(true);
    var warrantyPlus = _w[0];
    var setWarrantyPlus = _w[1];

    var _cs = useState(false);
    var customSetup = _cs[0];
    var setCustomSetup = _cs[1];

    var _name = useState(profile.name || '');
    var name = _name[0];
    var setName = _name[1];

    var _email = useState(profile.email || '');
    var email = _email[0];
    var setEmail = _email[1];

    var _phone = useState(profile.phone || '');
    var phone = _phone[0];
    var setPhone = _phone[1];

    var _comment = useState('');
    var comment = _comment[0];
    var setComment = _comment[1];

    var _agree = useState(true);
    var agree = _agree[0];
    var setAgree = _agree[1];

    var _err = useState('');
    var errorMsg = _err[0];
    var setErrorMsg = _err[1];

    var _submitted = useState(null);
    var submittedOrder = _submitted[0];
    var setSubmittedOrder = _submitted[1];

    var calc = store.calculateOrder({
      productId: productId,
      quantity: quantity,
      deliveryMethod: deliveryMethod,
      warrantyPlus: warrantyPlus,
      customSetup: customSetup
    });

    return h('div', { className: 'order-two-col' },
      h('div', { className: 'order-info-col' },
        h('span', { className: 'eyebrow-tag' }, 'Онлайн-оформление покупки'),
        h('h1', { className: 'page-h1' }, 'Оформление и калькулятор заказа'),
        h('p', { className: 'lead-paragraph' },
          'Выберите устройство, способ получения и сервисные опции. Стоимость рассчитывается автоматически, а готовый заказ сразу сохранится в вашем Личном кабинете.'
        ),
        h('div', { className: 'surface-card order-contact-card' },
          h('h2', { className: 'section-h3' }, 'Флагманский магазин и выдача заказов'),
          h('p', null, 'г. Москва, проспект Вернадского, 78'),
          h('p', null, 'Телефон: +7 (495) 215-07-78 · Ежедневно 09:00–21:00'),
          h('a', {
            className: 'btn-volt btn-volt--outline btn-volt--sm',
            href: 'contacts.html'
          }, 'Посмотреть схему проезда')
        )
      ),

      h('form', {
        className: 'surface-card order-form',
        noValidate: true,
        onSubmit: function (e) {
          e.preventDefault();
          if (name.trim().length < 2) {
            setErrorMsg('Пожалуйста, укажите ваше имя (не менее 2 символов).');
            return;
          }
          if (email.indexOf('@') < 1) {
            setErrorMsg('Пожалуйста, введите корректный адрес электронной почты.');
            return;
          }
          if (phone.trim().length < 7) {
            setErrorMsg('Пожалуйста, укажите контактный номер телефона.');
            return;
          }
          if (!agree) {
            setErrorMsg('Подтвердите согласие на обработку персональных данных.');
            return;
          }
          setErrorMsg('');
          var created = store.addOrder({
            productName: calc.product.name,
            quantity: calc.quantity,
            total: calc.total
          });
          setSubmittedOrder(created);
        }
      },
        h('div', { className: 'order-form__field' },
          h('label', { className: 'field-label', htmlFor: 'ordName' }, 'Имя и фамилия *'),
          h('input', {
            id: 'ordName',
            className: 'field-input order-form__input',
            type: 'text',
            required: true,
            value: name,
            onChange: function (e) { setName(e.target.value); }
          })
        ),

        h('div', { className: 'order-form__field' },
          h('label', { className: 'field-label', htmlFor: 'ordEmail' }, 'Электронная почта *'),
          h('input', {
            id: 'ordEmail',
            className: 'field-input order-form__input',
            type: 'email',
            required: true,
            value: email,
            onChange: function (e) { setEmail(e.target.value); }
          })
        ),

        h('div', { className: 'order-form__field' },
          h('label', { className: 'field-label', htmlFor: 'ordPhone' }, 'Телефон *'),
          h('input', {
            id: 'ordPhone',
            className: 'field-input order-form__input',
            type: 'tel',
            required: true,
            value: phone,
            onChange: function (e) { setPhone(e.target.value); }
          })
        ),

        h('div', { className: 'order-form__field' },
          h('label', { className: 'field-label', htmlFor: 'ordQty' }, 'Количество устройств'),
          h('input', {
            id: 'ordQty',
            className: 'field-input order-form__input',
            type: 'number',
            min: '1',
            max: '20',
            value: quantity,
            onChange: function (e) { setQuantity(e.target.value); }
          })
        ),

        h('div', { className: 'order-form__field order-form__field--wide' },
          h('label', { className: 'field-label', htmlFor: 'ordProduct' }, 'Устройство из каталога'),
          h('select', {
            id: 'ordProduct',
            className: 'field-input order-form__select',
            value: productId,
            onChange: function (e) { setProductId(e.target.value); }
          },
            store.PRODUCTS.map(function (p) {
              return h('option', { key: p.id, value: p.id },
                p.name + ' — ' + store.formatPrice(p.price)
              );
            })
          )
        ),

        h('div', { className: 'order-form__field order-form__field--wide' },
          h('label', { className: 'field-label', htmlFor: 'ordDelivery' }, 'Способ получения'),
          h('select', {
            id: 'ordDelivery',
            className: 'field-input order-form__select',
            value: deliveryMethod,
            onChange: function (e) { setDeliveryMethod(e.target.value); }
          },
            h('option', { value: 'pickup' }, 'Самовывоз из магазина на пр-те Вернадского, 78 (0 ₽)'),
            h('option', { value: 'courier' }, 'Курьерская доставка по Москве (+490 ₽)'),
            h('option', { value: 'express' }, 'Экспресс-доставка за 2 часа (+890 ₽)')
          )
        ),

        h('div', { className: 'order-form__field order-form__field--wide' },
          h('span', { className: 'field-label' }, 'Сервисные опции к заказу'),
          h('div', { className: 'addons-grid' },
            h('label', { className: 'check-tile' },
              h('input', {
                type: 'checkbox',
                checked: warrantyPlus,
                onChange: function (e) { setWarrantyPlus(e.target.checked); }
              }),
              h('span', null, 'Сервис «Мгновенная замена 2 года» (+1 490 ₽)')
            ),
            h('label', { className: 'check-tile' },
              h('input', {
                type: 'checkbox',
                checked: customSetup,
                onChange: function (e) { setCustomSetup(e.target.checked); }
              }),
              h('span', null, 'Предпродажная настройка и тест матрицы (+990 ₽)')
            )
          )
        ),

        h('div', { className: 'order-form__field order-form__field--wide' },
          h('div', { className: 'calc-box', 'aria-live': 'polite' },
            h('div', { className: 'calc-box__row' },
              h('span', null, 'Стоимость устройств:'),
              h('strong', null, store.formatPrice(calc.base))
            ),
            h('div', { className: 'calc-box__row' },
              h('span', null, 'Доставка и сервисные опции:'),
              h('strong', null, '+' + store.formatPrice(calc.addons))
            ),
            calc.discount > 0 ? h('div', { className: 'calc-box__row calc-box__row--discount' },
              h('span', null, 'Скидка за комплект (от 3 шт.):'),
              h('strong', null, '−' + store.formatPrice(calc.discount))
            ) : null,
            h('div', { className: 'calc-box__total' },
              h('span', null, 'Итого к оплате:'),
              h('output', { className: 'calc-box__sum' }, store.formatPrice(calc.total))
            )
          )
        ),

        h('div', { className: 'order-form__field order-form__field--wide' },
          h('label', { className: 'field-label', htmlFor: 'ordComment' }, 'Комментарий к заказу'),
          h('textarea', {
            id: 'ordComment',
            className: 'field-input order-form__textarea',
            rows: 3,
            value: comment,
            onChange: function (e) { setComment(e.target.value); },
            placeholder: 'Например: гравировка клавиш или удобное время получения'
          })
        ),

        h('div', { className: 'order-form__field order-form__field--wide' },
          h('label', { className: 'check-row' },
            h('input', {
              type: 'checkbox',
              checked: agree,
              onChange: function (e) { setAgree(e.target.checked); }
            }),
            h('span', null, 'Согласен на обработку данных для подтверждения заказа *')
          )
        ),

        errorMsg ? h('div', { className: 'order-form__field order-form__field--wide' },
          h('p', { className: 'status-banner status-banner--error', role: 'alert' }, errorMsg)
        ) : null,

        submittedOrder ? h('div', { className: 'order-form__field order-form__field--wide' },
          h('div', { className: 'status-banner status-banner--success', role: 'status' },
            'Заказ ' + submittedOrder.id + ' на сумму ' + store.formatPrice(submittedOrder.total) + ' успешно оформлен и сохранён в Личном кабинете! ',
            h('button', {
              type: 'button',
              className: 'inline-link-btn',
              onClick: function () { store.openCabinet('orders'); }
            }, 'Посмотреть мои заказы')
          )
        ) : null,

        h('div', { className: 'order-form__field order-form__field--wide order-form__actions' },
          h('button', { type: 'submit', className: 'btn-volt btn-volt--primary' }, 'Подтвердить заказ')
        )
      )
    );
  }

  function AboutInteractiveApp() {
    var store = useVoltStore();
    var _idx = useState(0);
    var slide = _idx[0];
    var setSlide = _idx[1];

    var _openFaq = useState(0);
    var openFaq = _openFaq[0];
    var setOpenFaq = _openFaq[1];

    var reviews = store.REVIEWS;
    var current = reviews[slide] || reviews[0];

    return h('div', { className: 'about-interactive-stack' },
      h('section', {
        className: 'surface-card reviews-carousel',
        'aria-roledescription': 'карусель',
        'aria-label': 'Отзывы покупателей GOLDAnaBAlKE',
        onKeyDown: function (e) {
          if (e.key === 'ArrowLeft') setSlide((slide - 1 + reviews.length) % reviews.length);
          if (e.key === 'ArrowRight') setSlide((slide + 1) % reviews.length);
        }
      },
        h('div', { className: 'section-header-split' },
          h('div', null,
            h('span', { className: 'eyebrow-tag' }, 'Проверенные покупки'),
            h('h2', { className: 'section-h2' }, 'Отзывы наших покупателей')
          ),
          h('span', { className: 'rating-chip' }, 'Средняя оценка 4,9 из 5')
        ),

        h('article', { className: 'review-card-body', 'aria-live': 'polite' },
          h('span', { className: 'badge-pill badge-pill--amber' }, '★ ' + current.score + ' / 5,0'),
          h('blockquote', { className: 'review-quote' }, '«' + current.quote + '»'),
          h('p', { className: 'review-author' },
            h('strong', null, current.author),
            h('span', null, ' · ' + current.meta)
          )
        ),

        h('div', { className: 'carousel-controls-row' },
          h('div', { className: 'carousel-dots' },
            reviews.map(function (r, idx) {
              return h('button', {
                key: r.id,
                type: 'button',
                className: 'carousel-dot' + (idx === slide ? ' is-active' : ''),
                'aria-label': 'Отзыв ' + (idx + 1),
                onClick: function () { setSlide(idx); }
              });
            })
          ),
          h('div', { className: 'carousel-nav-btns' },
            h('button', {
              type: 'button',
              className: 'btn-volt btn-volt--outline btn-volt--sm',
              onClick: function () { setSlide((slide - 1 + reviews.length) % reviews.length); }
            }, 'Предыдущий'),
            h('button', {
              type: 'button',
              className: 'btn-volt btn-volt--primary btn-volt--sm',
              onClick: function () { setSlide((slide + 1) % reviews.length); }
            }, 'Следующий')
          )
        )
      ),

      h('section', { className: 'surface-card' },
        h('span', { className: 'eyebrow-tag' }, 'Ответы на вопросы'),
        h('h2', { className: 'section-h2' }, 'Частые вопросы о магазине и гарантии'),
        h('div', { className: 'faq-accordion' },
          store.FAQ_ITEMS.map(function (faq, i) {
            var expanded = openFaq === i;
            return h('div', {
              key: faq.q,
              className: 'faq-card' + (expanded ? ' is-open' : '')
            },
              h('button', {
                type: 'button',
                className: 'faq-card__trigger',
                'aria-expanded': String(expanded),
                onClick: function () { setOpenFaq(expanded ? -1 : i); }
              },
                h('span', null, faq.q),
                h('span', { className: 'faq-card__sign', 'aria-hidden': 'true' }, expanded ? '−' : '+')
              ),
              expanded ? h('p', { className: 'faq-card__answer' }, faq.a) : null
            );
          })
        )
      )
    );
  }

  function ContactsFeedbackApp() {
    var store = useVoltStore();
    var _sent = useState(false);
    var sent = _sent[0];
    var setSent = _sent[1];

    var _topic = useState('');
    var text = _topic[0];
    var setText = _topic[1];

    return h('div', { className: 'surface-card contacts-feedback-box' },
      h('div', null,
        h('span', { className: 'eyebrow-tag' }, 'Обратная связь'),
        h('h2', { className: 'section-h2' }, 'Остались вопросы по наличию или характеристикам?'),
        h('p', { className: 'muted-note' },
          'Оставьте свой вопрос или контакт — специалист магазина оперативно проверит товар на складе и свяжется с вами.'
        )
      ),
      h('form', {
        className: 'promo-inline-row',
        onSubmit: function (e) {
          e.preventDefault();
          var msg = text.trim() || 'Здравствуйте! Подскажите наличие товара в магазине на пр-те Вернадского, 78.';
          if (store.FEATURES.consultantChat) {
            store.pushChatMessage('user', msg);
            window.setTimeout(function () {
              store.pushChatMessage('bot', store.buildConsultantReply(msg));
            }, 400);
            store.setChatOpen(true);
          }
          setText('');
          setSent(true);
        }
      },
        h('label', { className: 'visually-hidden', htmlFor: 'contactQuickQuestion' }, 'Ваш вопрос'),
        h('input', {
          id: 'contactQuickQuestion',
          className: 'field-input',
          type: 'text',
          required: true,
          value: text,
          onChange: function (e) { setText(e.target.value); },
          placeholder: 'Напишите модель устройства или ваш вопрос...'
        }),
        h('button', { type: 'submit', className: 'btn-volt btn-volt--primary' }, 'Отправить запрос')
      ),
      sent ? h('p', { className: 'status-banner status-banner--success', role: 'status' },
        'Спасибо! Ваше обращение принято — менеджер магазина ответит вам в ближайшее время.'
      ) : null
    );
  }

  function mountAll() {
    var currentPage = document.body.dataset.page || 'home';

    var headerEl = document.getElementById('react-header');
    if (headerEl) {
      ReactDOM.createRoot(headerEl).render(h(window.VoltShell.SiteHeader, { currentPage: currentPage }));
    }

    var footerEl = document.getElementById('react-footer');
    if (footerEl) {
      ReactDOM.createRoot(footerEl).render(h(window.VoltShell.SiteFooter, null));
    }

    var widgetsEl = document.getElementById('react-floating-widgets');
    if (widgetsEl) {
      ReactDOM.createRoot(widgetsEl).render(h(window.VoltShell.FloatingWidgetsShell, null));
    }

    var homeFeaturedEl = document.getElementById('react-home-featured');
    if (homeFeaturedEl) {
      ReactDOM.createRoot(homeFeaturedEl).render(h(HomeFeaturedApp, null));
    }

    var catalogEl = document.getElementById('react-catalog-app');
    if (catalogEl) {
      ReactDOM.createRoot(catalogEl).render(h(CatalogApp, null));
    }

    var productEl = document.getElementById('react-product-app');
    if (productEl) {
      ReactDOM.createRoot(productEl).render(h(ProductPageApp, {
        defaultId: productEl.dataset.defaultProduct || 'keyboard'
      }));
    }

    var orderEl = document.getElementById('react-order-app');
    if (orderEl) {
      ReactDOM.createRoot(orderEl).render(h(OrderPageApp, null));
    }

    var aboutEl = document.getElementById('react-about-app');
    if (aboutEl) {
      ReactDOM.createRoot(aboutEl).render(h(AboutInteractiveApp, null));
    }

    var contactsEl = document.getElementById('react-contacts-feedback');
    if (contactsEl) {
      ReactDOM.createRoot(contactsEl).render(h(ContactsFeedbackApp, null));
    }

    document.querySelectorAll('[data-open-quick-order]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        window.VoltStore.openQuickOrder(btn.getAttribute('data-open-quick-order') || 'keyboard');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountAll);
  } else {
    mountAll();
  }
})();
