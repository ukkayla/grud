# Государственный реестр уникальных документов АФ РФ

Статический сайт-прототип Государственного реестра уникальных документов
Архивного фонда Российской Федерации.

## Структура проекта

```
project/
├── index.html               — только разметка
├── css/
│   ├── base.css             — reset, переменные :root, типографика
│   ├── layout.css           — контейнер, header, nav, footer
│   ├── components.css       — кнопки, поля, карточки, слайдеры, hero
│   └── pages.css            — стили конкретных страниц (реестр, поиск, детальная)
├── js/
│   ├── data.js              — массивы documents, archivesData, names, geo
│   ├── utils.js             — escapeHtml, el, renderEmpty, buildCitation, showToast
│   ├── router.js            — route, goTo, showPage
│   ├── components/
│   │   ├── document-card.js — карточка документа
│   │   ├── steam-slider.js  — главный слайдер на главной
│   │   ├── digitized.js     — блок «Оцифрованные образы»
│   │   ├── hero-search.js   — живой поиск с подсказками
│   │   ├── to-top.js        — кнопка «Наверх»
│   │   ├── copy-cite.js     — кнопка «Скопировать цитату»
│   │   └── doc-nav.js       — переходы между документами
│   └── app.js               — инициализация, страницы (реестр, поиск, указатели, детальная)
├── assets/
│   └── images/              — логотипы и изображения
└── README.md
```

## Локальный запуск

Просто откройте `index.html` в браузере **или** запустите локальный сервер:

```bash
# Python 3
python -m http.server 8000

# Node.js (если установлен)
npx serve .
```

Затем откройте http://localhost:8000

## Публикация на GitHub Pages

1. Создайте репозиторий на GitHub.
2. Загрузите все файлы проекта:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO.git
   git push -u origin main
   ```
3. Перейдите в **Settings → Pages**.
4. В разделе **Source** выберите: `Deploy from a branch`, ветка `main`, папка `/ (root)`.
5. Через 1–2 минуты сайт будет доступен по адресу:
   `https://USERNAME.github.io/REPO/`

## Изображения

Положите свои файлы в `assets/images/`:

| Файл | Назначение |
|------|------------|
| `emblem_gold.svg` | Герб в шапке сайта |
| `archives-sm.png` | Логотип «Архивы России» в подвале |
| `rusarchives-sm.png` | Логотип Федерального архивного агентства |

Фоновые изображения слайдера задаются в `js/components/steam-slider.js`
(массив `featuredSlides`, поле `bgUrl`).

## Стек

- **HTML5** — разметка
- **CSS3** — Grid, Flexbox, CSS-переменные
- **Vanilla JavaScript (ES6)** — без сборщика и зависимостей
- **Splide 4** — слайдер «Похожие документы» (только на странице детальной)
- **Google Fonts** — PT Sans + PT Serif

## Разработка

Каждый компонент — отдельный файл. Порядок подключения в `index.html` важен:

```
data → utils → router → components/* → app.js
```

`app.js` вызывается последним и запускает инициализацию (`route()`, рендеры всех
страниц, подключение обработчиков событий).

## Лицензия

© Федеральное архивное агентство, 2013–2026
