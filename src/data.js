export const CONTACT = {
  email: 'contact@webshft.ro',
  phone: '+40 700 000 000',
  phoneHref: '+40700000000',
  instagram: 'https://instagram.com/webshft',
  linkedin: '#',
}

export const NAV = [
  { href: '#servicii', label: 'Servicii' },
  { href: '#proiecte', label: 'Proiecte' },
  { href: '#proces', label: 'Proces' },
  { href: '#preturi', label: 'Prețuri' },
  { href: '#contact', label: 'Contact' },
]

export const SERVICES = [
  {
    title: 'Site-uri de prezentare',
    desc: 'Rapide, elegante și ușor de administrat. Explică clar ce faci și transformă vizitatorii în clienți.',
    tags: ['Design custom', 'CMS', 'Multilingv'],
  },
  {
    title: 'Magazine online',
    desc: 'E-commerce performant cu plăți online, curierat și facturare. Gata să vândă din prima zi.',
    tags: ['WooCommerce', 'Shopify', 'Headless'],
  },
  {
    title: 'Aplicații web',
    desc: 'Platforme și dashboard-uri custom care automatizează procese și îți economisesc ore în fiecare săptămână.',
    tags: ['React', 'Next.js', 'Node.js'],
  },
  {
    title: 'Landing pages',
    desc: 'Pagini de campanie optimizate pentru conversie, ca fiecare leu din reclame să conteze.',
    tags: ['CRO', 'A/B testing', 'Analytics'],
  },
  {
    title: 'SEO & performanță',
    desc: 'Audit tehnic, viteză și Core Web Vitals, ca să apari acolo unde te caută clienții.',
    tags: ['Core Web Vitals', 'Schema', 'Audit'],
  },
  {
    title: 'Mentenanță & hosting',
    desc: 'Actualizări, backup-uri, securitate și suport rapid. Tu te ocupi de business, noi de site.',
    tags: ['Backup zilnic', 'SSL', 'Suport'],
  },
]

// Proiecte reale. Opțional: pune o captură în `public/proiecte/` și adaugă `image: '/proiecte/nume.jpg'`
export const PROJECTS = [
  {
    title: 'RELOQ — rezervări online',
    url: 'https://app.reloqmove.com/',
    type: 'Aplicație web',
    place: 'Massachusetts, SUA',
    desc: 'Platformă de rezervare a mutărilor: rută pe hartă, alegerea obiectelor și preț de transport calculat instant.',
  },
  {
    title: 'Boston Movers',
    url: 'https://callbostonmovers.com/',
    type: 'Site de prezentare + SEO',
    place: 'Boston, SUA',
    desc: 'Site de mutări locale construit ca resursă utilă: ghiduri de permise, sfaturi pe cartiere și cereri de ofertă gratuite.',
  },
  {
    title: 'AME Renovation',
    url: 'https://ame-renovation.com/en',
    type: 'Site de prezentare multilingv',
    place: 'Coasta de Azur, Franța',
    desc: 'Site pentru renovări interioare la cheie, în 4 limbi (FR / EN / RO / RU), cu simulator de buget.',
  },
  {
    title: 'Dr. Ceban Dmitri — Acupunctură',
    url: 'https://acupuncturist.md/',
    type: 'Clinică + programări',
    place: 'Moldova',
    desc: 'Site pentru cabinet de acupunctură: servicii, apariții media, recenzii pacienți și programare online.',
  },
  {
    title: 'Top Climat MD',
    url: 'https://topclimat.md/',
    type: 'Magazin online',
    place: 'Moldova',
    desc: 'Catalog și magazin de aparate de aer condiționat, cu filtrare a produselor, instalare și service.',
  },
]

export const PROCESS = [
  { title: 'Descoperire', desc: 'Discutăm obiectivele, publicul și concurența. Primești o propunere clară, cu termen și buget.' },
  { title: 'Design', desc: 'Creăm structura și identitatea vizuală. Iterăm împreună până când arată exact cum trebuie.' },
  { title: 'Dezvoltare', desc: 'Cod curat, rapid și sigur. Vezi progresul live pe un link de test, la fiecare pas.' },
  { title: 'Lansare & creștere', desc: 'Punem site-ul online, configurăm analytics și rămânem alături pentru optimizare.' },
]

export const PLANS = [
  {
    name: 'Start',
    for: 'Freelanceri și afaceri mici',
    price: '490',
    features: ['One-page sau până la 4 pagini', 'Design responsive custom', 'Formular de contact', 'SEO de bază & Analytics', 'Livrare în ~2 săptămâni'],
  },
  {
    name: 'Business',
    for: 'Firme care vor să crească',
    price: '1.290',
    hot: true,
    features: ['Până la 10 pagini + blog', 'CMS ușor de administrat', 'Multilingv (RO / EN)', 'SEO tehnic & optimizare viteză', '3 luni mentenanță incluse'],
  },
  {
    name: 'Pro',
    for: 'E-commerce și aplicații custom',
    price: '2.900',
    features: ['Magazin online sau aplicație web', 'Plăți, curierat, facturare', 'Integrări API & automatizări', 'Dashboard de administrare', 'Suport prioritar'],
  },
]

export const FAQ = [
  { q: 'Cât durează realizarea unui site?', a: 'Un site de prezentare durează de obicei 2–4 săptămâni, iar un magazin online sau o aplicație între 4 și 10 săptămâni, în funcție de complexitate și de cât de repede primim conținutul.' },
  { q: 'Pot să modific singur conținutul?', a: 'Da. Îți livrăm un panou de administrare simplu și o scurtă instruire, ca să poți actualiza texte, imagini și produse fără cunoștințe tehnice.' },
  { q: 'Vă ocupați și de domeniu și hosting?', a: 'Da — domeniu, hosting, email profesional și SSL. Dacă ai deja aceste servicii, lucrăm cu ce ai.' },
  { q: 'Cum se face plata?', a: 'De regulă 50% avans la început și 50% la lansare. Pentru proiectele mari putem împărți plata pe etape.' },
  { q: 'Ce se întâmplă după lansare?', a: 'Rămânem alături de tine: monitorizare, actualizări, backup-uri și îmbunătățiri continue, prin planurile de mentenanță.' },
]
