# webshft

Site-ul de prezentare al studioului **webshft**, construit cu React + Vite.

## Tehnologii

- [React 19](https://react.dev) + [Vite](https://vite.dev)
- [Motion](https://motion.dev): apariții discrete la scroll
- CSS simplu (fără framework), în `src/index.css`, cu temă luminoasă și dark mode automat

## Pornire rapidă

```bash
npm install
npm run dev
```

Site-ul pornește la http://localhost:5173.

| Comandă           | Ce face                                     |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | server de dezvoltare cu hot reload          |
| `npm run build`   | build de producție în `dist/`               |
| `npm run preview` | servește local build-ul din `dist/`         |
| `npm run lint`    | verifică codul cu oxlint                    |

### În WebStorm

1. **File → Open** (sau **Get from VCS**) și alege acest repo.
2. WebStorm detectează `package.json`: apasă **npm install** în notificare.
3. Deschide `package.json` și apasă ▶ lângă scriptul `dev` (sau creează o configurație *npm → dev*).

## Structura

```
src/
├── data.js            ← TOT conținutul: contact, servicii, proiecte, prețuri, FAQ
├── index.css          ← stiluri și culori (variabile în :root)
├── App.jsx            ← ordinea secțiunilor
├── utils.js
└── components/
    ├── Reveal.jsx     ← FadeUp + antet de secțiune
    ├── Nav.jsx        ← meniu + meniu mobil
    ├── Hero.jsx
    ├── Work.jsx       ← lista de proiecte (cu link spre fiecare site)
    ├── Services.jsx
    ├── Process.jsx
    ├── Pricing.jsx
    ├── Faq.jsx
    ├── Contact.jsx    ← formular
    └── Footer.jsx
```

## De făcut

- [ ] Date reale de contact în `src/data.js` (email, telefon, social)
- [ ] Opțional, capturi pentru proiecte: pune imaginile în `public/proiecte/` și adaugă `image: '/proiecte/x.jpg'` în `PROJECTS`
- [ ] Prețuri finale
- [ ] Formularul trimite acum prin `mailto:`. Trebuie conectat la Formspree, Resend sau un API propriu (`src/components/Contact.jsx`)
- [ ] Domeniu + deploy (Vercel, Netlify sau Hostinger)
