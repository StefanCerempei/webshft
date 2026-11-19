# webshft

Site-ul de prezentare al studioului **webshft**, construit cu React + Vite.

## Tehnologii

- [React 19](https://react.dev) + [Vite](https://vite.dev)
- [Motion](https://motion.dev) (Framer Motion): animații, scroll, efecte magnetice
- [Lenis](https://lenis.darkroom.engineering): smooth scroll
- WebGL2 pur pentru fundalul lichid din hero (`LiquidBg.jsx`, fără biblioteci 3D)
- CSS simplu (fără framework), în `src/index.css`

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
├── App.jsx            ← ordinea secțiunilor + smooth scroll
├── utils.js
├── hooks/useMagnetic.js
└── components/
    ├── Preloader.jsx  ← ecran de încărcare
    ├── Nav.jsx        ← meniu + meniu mobil
    ├── Hero.jsx       ← titlu cu litere care reacționează la cursor
    ├── LiquidBg.jsx   ← shader WebGL (gradient lichid + linii topografice)
    ├── Scramble.jsx   ← efect de text „decodat”
    ├── Marquee.jsx    ← benzi care reacționează la scroll
    ├── Manifesto.jsx  ← text care se „aprinde” la scroll + statistici
    ├── ShiftZoom.jsx  ← zoom prin litera „I” din SHIFT
    ├── Services.jsx
    ├── Work.jsx       ← portofoliu cu scroll orizontal
    ├── Process.jsx
    ├── Pricing.jsx    ← carduri 3D cu glow
    ├── Faq.jsx
    ├── Contact.jsx    ← formular
    └── Footer.jsx
```

## De făcut

- [ ] Date reale de contact în `src/data.js` (email, telefon, social)
- [ ] Proiecte reale: pune imaginile în `public/proiecte/` și adaugă `image: '/proiecte/x.jpg'` în `PROJECTS`
- [ ] Prețuri finale
- [ ] Formularul trimite acum prin `mailto:`. Trebuie conectat la Formspree, Resend sau un API propriu (`src/components/Contact.jsx`)
- [ ] Domeniu + deploy (Vercel, Netlify sau Hostinger)
