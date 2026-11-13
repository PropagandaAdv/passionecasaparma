import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Bath,
  BedDouble,
  Calculator,
  Check,
  CircleAlert,
  ClipboardCheck,
  Clock,
  Ear,
  Facebook,
  Gem,
  Handshake,
  House,
  Instagram,
  KeyRound,
  Landmark,
  Loader2,
  Mail,
  MapPin,
  Maximize,
  Menu,
  Phone,
  Ruler,
  Search,
  X,
} from 'lucide-react'

/* -------------------------------------------------------------------------- */
/*  DATI                                                                       */
/* -------------------------------------------------------------------------- */

const A = '/assets/'

const NAV = [
  { label: 'Vendite', href: '/vendite' },
  { label: 'Luxury Living', href: '/luxury-living' },
  { label: 'Residenze Parma Bella', href: '/residenze-parma-bella' },
  { label: 'Chi siamo', href: '#chi-siamo' },
  { label: 'Servizi', href: '#servizi' },
  { label: 'Contatti', href: '#contatti' },
]

const CONTACT = {
  address: 'Viale Faustino Tanara 5/A, 43121 Parma (PR)',
  tel: '0521.1472001',
  telHref: 'tel:+3905211472001',
  email: 'info@passionecasaparma.it',
  hours: [
    ['Lunedì – Venerdì', '8:30 – 12:30 · 15:00 – 19:30'],
    ['Sabato', 'Mattina, su appuntamento'],
  ],
}

const COMUNI = [
  'Parma',
  'Collecchio',
  'Felino',
  'Fidenza',
  'Langhirano',
  'Montechiarugolo',
  'Noceto',
  'Sala Baganza',
  'Salsomaggiore Terme',
  'Traversetolo',
]

const TIPOLOGIE = ['Appartamento', 'Attico', 'Villa', 'Casa indipendente', 'Loft', 'Locale commerciale']

const PREZZI = {
  vendita: [
    ['', 'Nessun limite'],
    ['150000', 'fino a 150.000 €'],
    ['250000', 'fino a 250.000 €'],
    ['400000', 'fino a 400.000 €'],
    ['600000', 'fino a 600.000 €'],
    ['1000000', 'fino a 1.000.000 €'],
  ],
  affitto: [
    ['', 'Nessun limite'],
    ['600', 'fino a 600 €/mese'],
    ['900', 'fino a 900 €/mese'],
    ['1300', 'fino a 1.300 €/mese'],
    ['2000', 'fino a 2.000 €/mese'],
  ],
}

/*
 * TODO CLIENTE – IMMOBILI IN EVIDENZA
 * Le foto sono quelle reali fornite dal cliente, ma NON sono arrivati i dati
 * degli immobili. Titoli e categorie descrivono solo ciò che si vede in foto.
 * Sostituire per ogni immobile reale: titolo, zona, mq, locali, bagni, prezzo, href.
 * I campi lasciati a null non vengono mostrati; senza prezzo compare
 * "Trattativa riservata". Nessun dato è stato inventato.
 */
const featured = [
  {
    id: 'loft',
    img: 'immobile-loft.webp',
    alt: 'Soggiorno double-height con libreria sospesa, camino e parquet a spina di pesce',
    tipo: 'Loft',
    titolo: 'Loft a doppia altezza con parquet a spina',
    zona: null, // es. 'Parma – Oltretorrente'
    mq: null,
    locali: null,
    bagni: null,
    prezzo: null, // es. 480000
    href: '/vendite',
  },
  {
    id: 'residenza',
    img: 'immobile-residenza.webp',
    alt: 'Residenza contemporanea con terrazzi verdi e corte in porfido sotto un cielo azzurro',
    tipo: 'Residenza',
    titolo: 'Residenza con terrazzi verdi e corte privata',
    zona: null,
    mq: null,
    locali: null,
    bagni: null,
    prezzo: null,
    href: '/vendite',
  },
  {
    id: 'villa-moderna',
    img: 'immobile-villa-moderna.webp',
    alt: 'Villa contemporanea a due livelli con terrazzo e giardino curato',
    tipo: 'Villa',
    titolo: 'Villa contemporanea con terrazzo e giardino',
    zona: null,
    mq: null,
    locali: null,
    bagni: null,
    prezzo: null,
    href: '/vendite',
  },
  {
    id: 'villa-terrazza',
    img: 'immobile-villa-terrazza.webp',
    alt: 'Villa moderna con ampia terrazza panoramica e garage in pietra grigia',
    tipo: 'Villa',
    titolo: 'Villa con terrazza panoramica e garage',
    zona: null,
    mq: null,
    locali: null,
    bagni: null,
    prezzo: null,
    href: '/vendite',
  },
  {
    id: 'living-legno',
    img: 'immobile-living-legno.webp',
    alt: 'Living open space con parquet in rovere, soffitto con luce a led e parete verde',
    tipo: 'Appartamento',
    titolo: 'Open space con rovere e parete verde',
    zona: null,
    mq: null,
    locali: null,
    bagni: null,
    prezzo: null,
    href: '/vendite',
  },
  {
    id: 'living-pelle',
    img: 'immobile-living-pelle.webp',
    alt: 'Salotto luminoso con divano in pelle, grandi vetrate e pavimento in gres scuro',
    tipo: 'Attico',
    titolo: 'Attico luminoso con grandi vetrate',
    zona: null,
    mq: null,
    locali: null,
    bagni: null,
    prezzo: null,
    href: '/vendite',
  },
]

const STEPS = [
  {
    icon: Ear,
    title: 'Ascolto',
    text: 'Partiamo da te: esigenze, tempi, budget. Capire come vuoi vivere viene prima di qualsiasi proposta.',
  },
  {
    icon: Search,
    title: 'Selezione e valutazione',
    text: 'Ti proponiamo solo immobili in linea con la tua richiesta. Se vendi, valutiamo la tua casa con dati di mercato reali.',
  },
  {
    icon: ClipboardCheck,
    title: 'Verifiche tecniche e documentali',
    text: 'APE, conformità, sanatorie, titoli: controlliamo tutto prima, con tecnici di fiducia, perché nulla emerga dopo.',
  },
  {
    icon: KeyRound,
    title: 'Rogito senza imprevisti',
    text: 'Coordiniamo mutuo e notaio fino alla firma. Il nostro impegno è chiudere la vendita senza sorprese.',
  },
]

const NETWORK = [
  ['Agente', 'Il tuo riferimento unico, dalla prima visita al rogito.'],
  ['Tecnico', 'Geometri e architetti per verifiche, APE e sanatorie.'],
  ['Mutuo', 'Consulenti finanziari e broker per trovare la soluzione giusta.'],
  ['Notaio', 'Studi notarili della rete per un rogito sereno e puntuale.'],
]

/* -------------------------------------------------------------------------- */
/*  HOOK                                                                       */
/* -------------------------------------------------------------------------- */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduced
}

function useInView(options = { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return undefined
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        io.disconnect()
      }
    }, options)
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return [ref, inView]
}

function useCountUp(target, active, reduced, duration = 1600) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return undefined
    if (reduced) {
      setValue(target)
      return undefined
    }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, reduced, duration])
  return value
}

/* -------------------------------------------------------------------------- */
/*  ELEMENTI RIUSABILI                                                         */
/* -------------------------------------------------------------------------- */

const DELAYS = { 0: '', 1: 'delay-100', 2: 'delay-200', 3: 'delay-300', 4: 'delay-500' }

function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      className={`transition-all duration-900 ease-out motion-reduce:transition-none ${DELAYS[delay]} ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'
      } ${className}`}
    >
      {children}
    </Tag>
  )
}

function Eyebrow({ children, dark = false, className = '' }) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] ${
        dark ? 'text-white/80' : 'text-brand-muted'
      } ${className}`}
    >
      <span aria-hidden="true" className="h-px w-6 bg-brand-red" />
      {children}
    </p>
  )
}

/** Segni da progetto agli angoli: il dettaglio che richiama le linee di costruzione del logo. */
function Corners({ className = '', color = 'border-brand-red' }) {
  const base = `pointer-events-none absolute h-4 w-4 ${color}`
  return (
    <span aria-hidden="true" className={className}>
      <span className={`${base} -left-2 -top-2 border-l border-t`} />
      <span className={`${base} -right-2 -top-2 border-r border-t`} />
      <span className={`${base} -bottom-2 -left-2 border-b border-l`} />
      <span className={`${base} -bottom-2 -right-2 border-b border-r`} />
    </span>
  )
}

/** Griglia hairline decorativa, ispirata al foglio di progetto. */
function BlueprintGrid({ dark = false }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${
        dark
          ? 'bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px)]'
          : 'bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px)]'
      } bg-[size:25%_100%] md:bg-[size:12.5%_100%]`}
    />
  )
}

function Photo({ src, alt, className = '', imgClass = '', eager = false }) {
  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <img
        src={`${A}${src}`}
        alt={alt}
        loading={eager ? undefined : 'lazy'}
        decoding="async"
        className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${imgClass}`}
      />
    </div>
  )
}

const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-sm px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
const btnPrimary = `${btnBase} bg-brand-red text-white hover:bg-brand-red-dark focus-visible:ring-brand-red`
const btnGhostDark = `${btnBase} border border-white/60 text-white hover:bg-white hover:text-brand-black focus-visible:ring-white`

/* -------------------------------------------------------------------------- */
/*  HEADER                                                                     */
/* -------------------------------------------------------------------------- */

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const light = !scrolled || open // testo bianco sopra la hero o nel menu scuro

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled && !open
            ? 'border-b border-black/10 bg-white/70 shadow-sm backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <a href="#top" className="relative z-50 shrink-0" aria-label="Passione Casa – torna in alto">
            <img
              src={`${A}${light ? 'logo-passione-casa-bianco.png' : 'logo-passione-casa.png'}`}
              alt="Passione Casa – Soluzioni immobiliari & Interior Design"
              width="1596"
              height="292"
              className="h-9 w-auto sm:h-10"
            />
          </a>

          <nav aria-label="Principale" className="hidden items-center gap-7 xl:flex">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`relative py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-brand-red after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  light ? 'text-white' : 'text-brand-black'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contatti" className={`${btnPrimary} hidden px-5 py-3 sm:inline-flex`}>
              Valuta la tua casa
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Chiudi il menu' : 'Apri il menu'}
              className={`relative z-50 flex h-11 w-11 items-center justify-center xl:hidden ${
                light ? 'text-white' : 'text-brand-black'
              }`}
            >
              {open ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile a tutto schermo */}
      <div
        id="menu-mobile"
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-brand-black px-5 pb-10 pt-28 transition-all duration-500 sm:px-8 xl:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        aria-hidden={!open}
      >
        <BlueprintGrid dark />
        <nav aria-label="Menu mobile" className="relative flex flex-col">
          {NAV.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="flex items-baseline justify-between border-b border-white/10 py-4 text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              <span>{item.label}</span>
              <span className="text-xs font-semibold tracking-[0.25em] text-brand-gray">0{i + 1}</span>
            </a>
          ))}
        </nav>
        <div className="relative space-y-6">
          <a href="#contatti" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} className={`${btnPrimary} w-full`}>
            Valuta la tua casa
          </a>
          <p className="text-sm text-white/70">
            {CONTACT.tel} · {CONTACT.email}
          </p>
        </div>
      </div>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*  HERO + RICERCA                                                             */
/* -------------------------------------------------------------------------- */

const fieldBase =
  'w-full rounded-sm border border-black/15 bg-white px-4 py-3.5 text-sm font-normal text-brand-black focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red'

function SearchPanel() {
  const [form, setForm] = useState({ contratto: 'vendita', comune: '', tipologia: '', prezzo: '' })

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const setContratto = (contratto) => setForm((f) => ({ ...f, contratto, prezzo: '' }))

  const onSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    Object.entries(form).forEach(([k, v]) => v && params.set(k, v))
    window.location.href = `/vendite?${params.toString()}`
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Cerca un immobile"
      className="relative w-full max-w-5xl border border-white/20 bg-white/95 p-5 shadow-sm backdrop-blur-md sm:p-6"
    >
      <Corners />
      <div className="mb-5 flex items-center gap-1" role="group" aria-label="Tipo di contratto">
        {['vendita', 'affitto'].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setContratto(c)}
            aria-pressed={form.contratto === c}
            className={`rounded-sm px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
              form.contratto === c
                ? 'bg-brand-black text-white'
                : 'text-brand-muted hover:text-brand-black'
            }`}
          >
            {c === 'vendita' ? 'Vendita' : 'Affitto'}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_auto]">
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-muted">Comune</span>
          <select value={form.comune} onChange={set('comune')} className={fieldBase}>
            <option value="">Tutta la provincia</option>
            {COMUNI.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-muted">Tipologia</span>
          <select value={form.tipologia} onChange={set('tipologia')} className={fieldBase}>
            <option value="">Tutte</option>
            {TIPOLOGIE.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-muted">Prezzo massimo</span>
          <select value={form.prezzo} onChange={set('prezzo')} className={fieldBase}>
            {PREZZI[form.contratto].map(([v, l]) => (
              <option key={v || 'all'} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-end sm:col-span-2 lg:col-span-1">
          <button type="submit" className={`${btnPrimary} w-full lg:w-auto`}>
            <Search size={20} strokeWidth={1.5} aria-hidden="true" />
            Cerca
          </button>
        </div>
      </div>
    </form>
  )
}

function Hero() {
  const reduced = usePrefersReducedMotion()
  const bgRef = useRef(null)
  const [canPlay, setCanPlay] = useState(false)

  // Video solo da tablet in su e senza reduced-motion: su mobile resta il poster statico.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setCanPlay(mq.matches && !reduced)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [reduced])

  // Parallasse leggera dello sfondo
  useEffect(() => {
    if (reduced) return undefined
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (bgRef.current) bgRef.current.style.transform = `translate3d(0, ${Math.min(window.scrollY, 900) * 0.18}px, 0)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [reduced])

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-brand-black">
      <div ref={bgRef} className="absolute inset-x-0 -top-10 bottom-0 -z-20 will-change-transform">
        {canPlay ? (
          <video
            className="h-full w-full object-cover"
            src={`${A}hero.mp4`}
            poster={`${A}hero-poster.webp`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : (
          <img
            src={`${A}hero-poster.webp`}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        )}
      </div>
      {/* Overlay scuro: garantisce contrasto >= 4.5:1 per testo bianco e rosso */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/65 to-black/55" />
      
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-10 pt-32 sm:px-8 sm:pb-12 lg:px-12 lg:pb-12">
        <Reveal>
          <Eyebrow dark>Soluzioni immobiliari &amp; Interior Design · Parma</Eyebrow>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="mt-6 max-w-6xl text-5xl font-bold leading-[0.95] tracking-tight text-white md:text-7xl xl:text-8xl">
            La casa giusta a Parma, con un <span className="text-brand-red">metodo</span> che non lascia nulla al caso.
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Oltre 10 anni accanto a chi compra e a chi vende. Un’unica regia — agente, tecnico, mutuo e notaio — per arrivare
            al rogito senza imprevisti.
          </p>
        </Reveal>
        <Reveal delay={3} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="/vendite" className={btnPrimary}>
            Trova la tua casa <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
          </a>
          <a href="#contatti" className={btnGhostDark}>
            Valutazione gratuita
          </a>
        </Reveal>
        <Reveal delay={4} className="mt-10 sm:mt-12">
          <SearchPanel />
        </Reveal>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  IMMOBILI IN EVIDENZA                                                       */
/* -------------------------------------------------------------------------- */

const euro = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

function PropertyCard({ p, index }) {
  const stats = [
    p.mq != null && { Icon: Maximize, label: `${p.mq} mq` },
    p.locali != null && { Icon: House, label: `${p.locali} locali` },
    p.bagni != null && { Icon: Bath, label: `${p.bagni} ${p.bagni === 1 ? 'bagno' : 'bagni'}` },
  ].filter(Boolean)

  return (
    <Reveal delay={index % 3 === 0 ? 0 : index % 3 === 1 ? 1 : 2}>
      <a
        href={p.href}
        className="group block h-full border border-black/10 bg-white transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={`${A}${p.img}`}
            alt={p.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          <span className="absolute left-0 top-5 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-black">
            {p.tipo}
          </span>
        </div>
        <div className="p-6">
          {p.zona && (
            <p className="mb-2 flex items-center gap-2 text-sm text-brand-muted">
              <MapPin size={20} strokeWidth={1.5} className="text-brand-red" aria-hidden="true" />
              {p.zona}
            </p>
          )}
          <h3 className="text-xl font-semibold leading-snug tracking-tight">{p.titolo}</h3>
          {stats.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-black/10 pt-4 text-sm text-brand-muted">
              {stats.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-2">
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
            <span className="text-base font-semibold">{p.prezzo ? euro.format(p.prezzo) : 'Trattativa riservata'}</span>
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
              Scopri
              <ArrowUpRight
                size={20}
                strokeWidth={1.5}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </a>
    </Reveal>
  )
}

function Featured() {
  return (
    <section id="vendite" className="relative bg-white py-24 lg:py-32">
      <BlueprintGrid />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal className="max-w-3xl">
            <Eyebrow>In vetrina</Eyebrow>
            <h2 className="mt-5 text-4xl font-bold leading-[1.02] tracking-tight md:text-5xl lg:text-6xl">
              Case scelte, <span className="text-brand-red">una per una</span>.
            </h2>
            <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-brand-muted sm:text-lg">
              Una selezione di immobili seguiti direttamente dai nostri agenti, con foto reali e verifiche già fatte. Per
              molti il prezzo si definisce insieme, con riservatezza.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <a
              href="/vendite"
              className="group inline-flex items-center gap-3 border-b border-brand-black pb-1.5 text-xs font-semibold uppercase tracking-[0.2em] hover:border-brand-red hover:text-brand-red"
            >
              Tutti gli immobili
              <ArrowRight size={20} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featured.map((p, i) => (
            <PropertyCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  SERVIZI (BENTO)                                                            */
/* -------------------------------------------------------------------------- */

function Tile({ icon: Icon, title, text, href = '#contatti', className = '', dark = false, children, cta = 'Scopri' }) {
  return (
    <a
      href={href}
      className={`group relative flex flex-col justify-between overflow-hidden border p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.3)] sm:p-9 ${
        dark ? 'border-white/10 bg-brand-black text-white' : 'border-black/10 bg-white text-brand-black'
      } ${className}`}
    >
      {children}
      <div className="relative">
        <Icon size={28} strokeWidth={1.5} className="text-brand-red" aria-hidden="true" />
        <h3 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h3>
        <p className={`mt-3 max-w-md text-base leading-relaxed ${dark ? 'text-white/80' : 'text-brand-muted'}`}>{text}</p>
      </div>
      <span className="relative mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]">
        {cta}
        <ArrowRight size={20} strokeWidth={1.5} className="text-brand-red transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
      </span>
    </a>
  )
}

function LuxuryBackdrop() {
  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 opacity-80 transition-all duration-700 group-hover:scale-105 motion-reduce:group-hover:scale-100 motion-reduce:transition-none">
        <img src={`${A}luxury-scala.webp`} alt="" loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/55" />
      <span aria-hidden="true" className="absolute right-7 top-7 h-12 w-12 border-r border-t border-brand-red sm:right-9 sm:top-9" />
    </>
  )
}

function Services() {
  return (
    <section id="servizi" className="relative bg-brand-warm py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal className="max-w-4xl">
          <Eyebrow>Servizi</Eyebrow>
          <h2 className="mt-5 text-4xl font-bold leading-[1.02] tracking-tight md:text-5xl lg:text-6xl">
            Tutto ciò che serve a una casa, <span className="text-brand-red">sotto la stessa regia</span>.
          </h2>
          <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-brand-muted sm:text-lg">
            Dalla prima visita al rogito, un solo interlocutore coordina i professionisti giusti al momento giusto.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:auto-rows-[minmax(240px,auto)] lg:grid-cols-4 lg:gap-5">
          <Reveal className="md:col-span-2 lg:row-span-2">
            <Tile
              dark
              icon={Gem}
              href="/luxury-living"
              title="Luxury Living"
              text="Immobili di pregio, ville e dimore di carattere, raccontati e venduti con la cura che meritano. Riservatezza, selezione e un posizionamento su misura."
              cta="Entra in Luxury Living"
              className="h-full min-h-[460px] lg:min-h-[520px]"
            >
              <LuxuryBackdrop />
            </Tile>
          </Reveal>

          <Reveal delay={1} className="md:col-span-2">
            <Tile
              icon={House}
              href="/vendite"
              title="Compravendita"
              text="Vendita e affitto a Parma e provincia, con un agente che ti segue passo dopo passo."
              className="h-full"
            />
          </Reveal>
          <Reveal delay={2}>
            <Tile
              icon={Calculator}
              title="Valutazione gratuita"
              text="Quanto vale davvero la tua casa? Lo scopri con dati reali, senza impegno."
              cta="Richiedila"
              className="h-full"
            />
          </Reveal>
          <Reveal delay={3}>
            <Tile
              icon={Landmark}
              title="Consulenza mutui"
              text="Con il nostro broker confronti le soluzioni e scegli la più adatta a te."
              className="h-full"
            />
          </Reveal>

          <Reveal className="md:col-span-2 lg:col-span-4">
            <Tile
              icon={Ruler}
              title="Consulenza tecnica"
              text="APE, referti tecnici, sanatorie: geometri e architetti della nostra rete verificano la parte tecnica, così il rogito non riserva sorprese."
              className="h-full lg:flex-row lg:items-end lg:gap-12"
            />
          </Reveal>
        </div>

        <Reveal className="mt-8">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-brand-muted">
            <Handshake size={20} strokeWidth={1.5} className="text-brand-red" aria-hidden="true" />
            Cerchi anche una collaborazione?
            <a href="#contatti" className="font-semibold text-brand-black underline decoration-brand-red underline-offset-4 hover:text-brand-red">
              Scopri le partnership
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  TRUST / CHI SIAMO / METODO                                                 */
/* -------------------------------------------------------------------------- */

function Counter({ target, suffix = '+', label }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const reduced = usePrefersReducedMotion()
  const value = useCountUp(target, inView, reduced)
  return (
    <div ref={ref} className="border-t border-black/10 pt-6">
      <p className="text-6xl font-bold leading-none tracking-tight text-brand-red md:text-7xl" aria-label={`${target}${suffix}`}>
        <span aria-hidden="true">
          {value}
          {suffix}
        </span>
      </p>
      <p className="mt-4 max-w-[22ch] text-base leading-snug text-brand-muted">{label}</p>
    </div>
  )
}

function Trust() {
  return (
    <section id="chi-siamo" className="relative bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Chi siamo</Eyebrow>
            <h2 className="mt-5 text-4xl font-bold leading-[1.02] tracking-tight md:text-5xl lg:text-6xl">
              Un team, <span className="text-brand-red">un metodo</span>, una casa alla volta.
            </h2>
            <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-brand-muted sm:text-lg">
              Passione Casa nasce a Parma da un’idea semplice: comprare o vendere casa è una decisione importante, e merita
              organizzazione e trasparenza. Per questo lavoriamo con un metodo, non con l’improvvisazione.
            </p>
            <div className="mt-12 grid grid-cols-2 gap-8">
              <Counter target={10} label="anni di attività a Parma" />
              <Counter target={600} label="compravendite concluse dai nostri agenti negli ultimi 10 anni" />
            </div>
          </Reveal>

          <Reveal delay={1} className="lg:col-span-7">
            <div className="relative">
              <Photo
                src="team-vetrina.webp"
                alt="Il team di Passione Casa Parma al completo davanti alla vetrina dell’agenzia"
                className="aspect-[3/2]"
              />
              <Corners />
            </div>
            <p className="mt-4 text-sm text-brand-muted">Il team di Passione Casa, nella sede di Viale Tanara a Parma.</p>
          </Reveal>
        </div>

        {/* Un'unica regia */}
        <div className="mt-24 lg:mt-32">
          <Reveal className="max-w-3xl">
            <Eyebrow>La rete di professionisti</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
              Un’unica regia: agente, tecnico, mutuo, notaio.
            </h2>
            <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-brand-muted sm:text-lg">
              Geometri, architetti, consulenti finanziari e studi notarili lavorano con noi ogni giorno. Tu parli con una
              persona sola; al resto pensiamo noi.
            </p>
          </Reveal>
          <div className="mt-12 grid border-l border-t border-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {NETWORK.map(([t, d], i) => (
              <Reveal key={t} delay={Math.min(i, 3)} className="border-b border-r border-black/10 p-7 sm:p-8">
                <p className="text-xs font-semibold tracking-[0.25em] text-brand-red">0{i + 1}</p>
                <h3 className="mt-5 text-2xl font-bold tracking-tight">{t}</h3>
                <p className="mt-3 text-base leading-relaxed text-brand-muted">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Method() {
  return (
    <section id="metodo" className="relative overflow-hidden bg-brand-black py-24 text-white lg:py-32">
      <BlueprintGrid dark />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal className="max-w-3xl">
          <Eyebrow dark>Il metodo</Eyebrow>
          <h2 className="mt-5 text-4xl font-bold leading-[1.02] tracking-tight md:text-5xl lg:text-6xl">
            Quattro passaggi per arrivare al rogito <span className="text-brand-red">senza imprevisti</span>.
          </h2>
        </Reveal>

        <ol className="relative mt-16 grid gap-0 lg:grid-cols-4">
          {/* linea di progetto orizzontale */}
          <span aria-hidden="true" className="absolute left-0 right-0 top-[27px] hidden h-px bg-white/20 lg:block" />
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="relative border-l border-white/20 pb-12 pl-8 last:pb-0 lg:border-l-0 lg:pb-0 lg:pl-0 lg:pr-10">
              <Reveal delay={Math.min(i, 3)}>
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-5 h-2.5 w-2.5 bg-brand-red lg:left-0 lg:top-[22px]"
                />
                <p className="text-sm font-semibold tracking-[0.25em] text-brand-gray lg:pt-12">STEP 0{i + 1}</p>
                <Icon size={28} strokeWidth={1.5} className="mt-5 text-brand-red" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-bold tracking-tight sm:text-2xl">{title}</h3>
                <p className="mt-3 max-w-xs text-base leading-relaxed text-white/80">{text}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-20 grid items-end gap-6 sm:grid-cols-2">
          <div className="relative">
            <Photo
              src="agenzia-ingresso.webp"
              alt="Ingresso dell’agenzia Passione Casa con reception, divano grigio e insegna luminosa"
              className="aspect-[4/3]"
            />
            <Corners color="border-white/70" />
          </div>
          <div className="relative hidden sm:block">
            <Photo
              src="sede-notte.webp"
              alt="Facciata della sede di Passione Casa illuminata di notte, con la vetrina sulla strada"
              className="aspect-[4/3]"
            />
            <Corners color="border-white/70" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  CONTATTI / LEAD FORM                                                       */
/* -------------------------------------------------------------------------- */

const EMPTY = { nome: '', cognome: '', email: '', telefono: '', messaggio: '', budget: '', zona: '', indirizzo: '', tipologia: '', privacy: false }

function validate(values, mode) {
  const e = {}
  if (!values.nome.trim()) e.nome = 'Inserisci il tuo nome'
  if (!values.cognome.trim()) e.cognome = 'Inserisci il tuo cognome'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) e.email = 'Inserisci un’email valida'
  if (values.telefono.replace(/\D/g, '').length < 6) e.telefono = 'Inserisci un numero di telefono valido'
  if (mode === 'vendo' && !values.indirizzo.trim()) e.indirizzo = 'Indica l’indirizzo dell’immobile'
  if (!values.privacy) e.privacy = 'Il consenso è necessario per poterti ricontattare'
  return e
}

function ContactForm() {
  const [mode, setMode] = useState('cerco') // 'cerco' | 'vendo'
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const onChange = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setValues((s) => ({ ...s, [k]: v }))
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }))
  }

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      const found = validate(values, mode)
      setErrors(found)
      if (Object.keys(found).length) return
      setStatus('loading')
      try {
        const payload = { tipo: mode === 'cerco' ? 'cerca_casa' : 'vende_casa', ...values }
        // TODO: collegare l'endpoint reale (es. POST /api/lead, webhook CRM o servizio email).
        // Sostituire la riga sotto con:
        //   const res = await fetch('ENDPOINT_DA_DEFINIRE', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(payload),
        //   })
        //   if (!res.ok) throw new Error('Invio non riuscito')
        console.info('Lead (da inviare all’endpoint):', payload)
        await new Promise((r) => setTimeout(r, 900))
        setStatus('success')
        setValues(EMPTY)
      } catch {
        setStatus('error')
      }
    },
    [values, mode],
  )

  const input = (k) =>
    `${fieldBase} ${errors[k] ? 'border-brand-red' : ''}`
  const label = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-muted'
  const Err = ({ k }) =>
    errors[k] ? (
      <p id={`err-${k}`} role="alert" className="mt-1.5 text-sm font-normal text-brand-red">
        {errors[k]}
      </p>
    ) : null

  if (status === 'success') {
    return (
      <div className="relative flex min-h-[420px] flex-col items-start justify-center border border-black/10 bg-white p-8 sm:p-10" role="status">
        <Corners />
        <span className="flex h-12 w-12 items-center justify-center bg-brand-red text-white">
          <Check size={28} strokeWidth={1.5} aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-3xl font-bold tracking-tight">Richiesta ricevuta. Grazie!</h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-brand-muted">
          Un nostro agente ti ricontatterà il prima possibile, negli orari di apertura dell’agenzia.
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] underline decoration-brand-red underline-offset-4">
          Invia un’altra richiesta
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative border border-black/10 bg-white p-6 sm:p-10" aria-label="Richiesta di contatto">
      <Corners />
      <div className="grid grid-cols-2 border border-black/10 p-1" role="group" aria-label="Di cosa hai bisogno?">
        {[
          ['cerco', 'Cerco casa'],
          ['vendo', 'Voglio vendere'],
        ].map(([k, l]) => (
          <button
            key={k}
            type="button"
            onClick={() => {
              setMode(k)
              setErrors({})
            }}
            aria-pressed={mode === k}
            className={`min-w-0 rounded-sm px-2 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors sm:text-xs sm:tracking-[0.18em] ${
              mode === k ? 'bg-brand-black text-white' : 'text-brand-muted hover:text-brand-black'
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className={label}>Nome *</label>
          <input id="nome" autoComplete="given-name" value={values.nome} onChange={onChange('nome')} aria-invalid={!!errors.nome} aria-describedby={errors.nome ? 'err-nome' : undefined} className={input('nome')} />
          <Err k="nome" />
        </div>
        <div>
          <label htmlFor="cognome" className={label}>Cognome *</label>
          <input id="cognome" autoComplete="family-name" value={values.cognome} onChange={onChange('cognome')} aria-invalid={!!errors.cognome} aria-describedby={errors.cognome ? 'err-cognome' : undefined} className={input('cognome')} />
          <Err k="cognome" />
        </div>
        <div>
          <label htmlFor="email" className={label}>Email *</label>
          <input id="email" type="email" autoComplete="email" value={values.email} onChange={onChange('email')} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'err-email' : undefined} className={input('email')} />
          <Err k="email" />
        </div>
        <div>
          <label htmlFor="telefono" className={label}>Telefono *</label>
          <input id="telefono" type="tel" autoComplete="tel" value={values.telefono} onChange={onChange('telefono')} aria-invalid={!!errors.telefono} aria-describedby={errors.telefono ? 'err-telefono' : undefined} className={input('telefono')} />
          <Err k="telefono" />
        </div>

        {mode === 'cerco' ? (
          <>
            <div>
              <label htmlFor="budget" className={label}>Budget indicativo</label>
              <input id="budget" placeholder="es. 300.000 €" value={values.budget} onChange={onChange('budget')} className={input('budget')} />
            </div>
            <div>
              <label htmlFor="zona" className={label}>Zona di interesse</label>
              <input id="zona" placeholder="es. Parma centro" value={values.zona} onChange={onChange('zona')} className={input('zona')} />
            </div>
          </>
        ) : (
          <>
            <div>
              <label htmlFor="indirizzo" className={label}>Indirizzo dell’immobile *</label>
              <input id="indirizzo" autoComplete="street-address" value={values.indirizzo} onChange={onChange('indirizzo')} aria-invalid={!!errors.indirizzo} aria-describedby={errors.indirizzo ? 'err-indirizzo' : undefined} className={input('indirizzo')} />
              <Err k="indirizzo" />
            </div>
            <div>
              <label htmlFor="tipologia" className={label}>Tipologia</label>
              <select id="tipologia" value={values.tipologia} onChange={onChange('tipologia')} className={input('tipologia')}>
                <option value="">Seleziona</option>
                {TIPOLOGIE.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </>
        )}

        <div className="sm:col-span-2">
          <label htmlFor="messaggio" className={label}>Messaggio</label>
          <textarea id="messaggio" rows={4} value={values.messaggio} onChange={onChange('messaggio')} className={input('messaggio')} placeholder={mode === 'cerco' ? 'Raccontaci che casa stai cercando' : 'Raccontaci qualcosa dell’immobile'} />
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-sm font-normal leading-relaxed text-brand-muted">
            <input
              type="checkbox"
              checked={values.privacy}
              onChange={onChange('privacy')}
              aria-invalid={!!errors.privacy}
              aria-describedby={errors.privacy ? 'err-privacy' : undefined}
              className="mt-1 h-4 w-4 shrink-0 rounded-none border-black/30 accent-brand-red"
            />
            <span>
              Ho letto l’<a href="/privacy" className="font-semibold text-brand-black underline decoration-brand-red underline-offset-4">informativa privacy</a> e acconsento al trattamento dei miei dati per essere ricontattato. *
            </span>
          </label>
          <Err k="privacy" />
        </div>
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-6 flex items-start gap-3 border border-brand-red p-4 text-sm font-normal text-brand-black">
          <CircleAlert size={20} strokeWidth={1.5} className="shrink-0 text-brand-red" aria-hidden="true" />
          Non siamo riusciti a inviare la richiesta. Riprova tra poco oppure chiamaci allo {CONTACT.tel}.
        </p>
      )}

      <button type="submit" disabled={status === 'loading'} className={`${btnPrimary} mt-8 w-full disabled:cursor-wait disabled:opacity-70`}>
        {status === 'loading' ? (
          <>
            <Loader2 size={20} strokeWidth={1.5} className="animate-spin" aria-hidden="true" /> Invio in corso…
          </>
        ) : mode === 'cerco' ? (
          'Richiedi un contatto'
        ) : (
          'Richiedi la valutazione gratuita'
        )}
      </button>
    </form>
  )
}

function Contact() {
  return (
    <section id="contatti" className="relative bg-brand-warm py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <Reveal className="lg:col-span-5">
          <Eyebrow>Contatti</Eyebrow>
          <h2 className="mt-5 text-4xl font-bold leading-[1.02] tracking-tight md:text-5xl lg:text-6xl">
            Parliamone, <span className="text-brand-red">senza impegno</span>.
          </h2>
          <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-brand-muted sm:text-lg">
            Cerchi casa o vuoi sapere quanto vale la tua? Lasciaci due righe: ti rispondiamo con una proposta concreta, non con
            un preventivo generico.
          </p>

          <ul className="mt-10 space-y-6">
            <li className="flex gap-4">
              <MapPin size={28} strokeWidth={1.5} className="shrink-0 text-brand-red" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">Sede</p>
                <p className="mt-1 text-lg">{CONTACT.address}</p>
              </div>
            </li>
            <li className="flex gap-4">
              <Phone size={28} strokeWidth={1.5} className="shrink-0 text-brand-red" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">Telefono</p>
                <a href={CONTACT.telHref} className="mt-1 block text-lg hover:text-brand-red">{CONTACT.tel}</a>
              </div>
            </li>
            <li className="flex gap-4">
              <Mail size={28} strokeWidth={1.5} className="shrink-0 text-brand-red" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">Email</p>
                <a href={`mailto:${CONTACT.email}`} className="mt-1 block text-lg hover:text-brand-red">{CONTACT.email}</a>
              </div>
            </li>
            <li className="flex gap-4">
              <Clock size={28} strokeWidth={1.5} className="shrink-0 text-brand-red" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">Orari</p>
                {CONTACT.hours.map(([d, h]) => (
                  <p key={d} className="mt-1 text-lg">
                    <span className="font-semibold">{d}</span> · {h}
                  </p>
                ))}
              </div>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={1} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  FOOTER                                                                     */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-black text-white">
      <BlueprintGrid dark />
      <div className="relative mx-auto max-w-[1440px] px-5 pb-8 pt-20 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <img
              src={`${A}logo-passione-casa-bianco.png`}
              alt="Passione Casa – Soluzioni immobiliari & Interior Design"
              width="1596"
              height="292"
              loading="lazy"
              className="h-12 w-auto"
            />
            <p className="mt-6 max-w-sm text-base leading-relaxed text-white/80">
              Compravendita, valutazione, mutui, consulenza tecnica e Luxury Living. Una regia sola, dalla prima visita al rogito.
            </p>
            <div className="mt-8 flex gap-3">
              <a href="https://www.facebook.com/" aria-label="Passione Casa su Facebook" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center border border-white/30 transition-colors hover:border-brand-red hover:text-brand-red">
                <Facebook size={20} strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a href="https://www.instagram.com/" aria-label="Passione Casa su Instagram" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center border border-white/30 transition-colors hover:border-brand-red hover:text-brand-red">
                <Instagram size={20} strokeWidth={1.5} aria-hidden="true" />
              </a>
              {/* TODO: sostituire con gli URL ufficiali delle pagine Facebook e Instagram del cliente */}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gray">Contatti</h3>
            <ul className="mt-5 space-y-3 text-base text-white/90">
              <li className="flex gap-3"><MapPin size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-brand-red" aria-hidden="true" />{CONTACT.address}</li>
              <li className="flex gap-3"><Phone size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-brand-red" aria-hidden="true" /><a href={CONTACT.telHref} className="hover:text-brand-red">{CONTACT.tel}</a></li>
              <li className="flex gap-3"><Mail size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-brand-red" aria-hidden="true" /><a href={`mailto:${CONTACT.email}`} className="hover:text-brand-red">{CONTACT.email}</a></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gray">Orari</h3>
            <ul className="mt-5 space-y-3 text-base text-white/90">
              {CONTACT.hours.map(([d, h]) => (
                <li key={d} className="flex gap-3">
                  <Clock size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-brand-red" aria-hidden="true" />
                  <span><span className="font-semibold">{d}</span><br />{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Passione Casa Parma. Tutti i diritti riservati.
            {/* TODO CLIENTE: inserire ragione sociale e P.IVA (non forniti, non inventati).
                Esempio: «Ragione sociale S.r.l. · P.IVA 00000000000 · REA PR-000000» */}
          </p>
          <ul className="flex gap-6">
            <li><a href="/privacy" className="hover:text-white">Privacy</a></li>
            <li><a href="/cookie" className="hover:text-white">Cookie</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

/* -------------------------------------------------------------------------- */
/*  PAGINA                                                                     */
/* -------------------------------------------------------------------------- */

export default function PassioneCasaHome() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-white font-sans text-brand-black">
      <Header />
      <main>
        <Hero />
        <Featured />
        <Services />
        <Trust />
        <Method />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
