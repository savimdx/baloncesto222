import React, { useState, useEffect, Suspense, lazy, useRef } from 'react';
import {
  Star,
  Trophy,
  ShieldCheck,
  Clock,
  BookOpen,
  Sparkles,
  Download,
  Check,
  Plus,
  Minus,
  HelpCircle,
  Lock,
  Flame,
  Award,
  TrendingUp,
  Smile,
  ShieldAlert,
  ArrowRight,
  Eye,
  ChevronLeft,
  ChevronRight,
  Play,
  Users,
  Sword,
  Shield,
  Zap,
  Target,
  Activity,
  CreditCard,
  Search,
  X
} from 'lucide-react';

// Custom components
import HeaderBanner from './components/HeaderBanner';
const PurchaseModal = lazy(() => import('./components/PurchaseModal'));
const NotificationToast = lazy(() => import('./components/NotificationToast'));
import { useCurrency } from './context/CurrencyContext';

// Static Data
import {
  HERO_BULLETS,
  RECEIVE_CARDS,
  BENEFITS,
  BONUSES,
  TESTIMONIALS,
  FAQS,
  DRILLS
} from './data';

const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      // Ignored
    }
  }
};

// SVG Basketball Court component for high-fidelity drill rendering
function BasketballCourt({ players, lines }: { players: any[], lines: any[] }) {
  return (
    <div className="flex flex-col gap-3.5 w-full">
      {/* Court Frame */}
      <div className="relative w-full aspect-[4/3] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden p-3 md:p-4 shadow-2xl">
        {/* Background Court Markings */}
        <svg viewBox="0 0 400 300" className="w-full h-full select-none">
          {/* Court Floor Color */}
          <rect width="400" height="300" rx="12" fill="#030712" />
          
          {/* Outer Court Border */}
          <rect x="20" y="20" width="360" height="260" fill="none" stroke="#2563eb" strokeWidth="2.5" opacity="0.5" />
          
          {/* Mid-Court Line */}
          <line x1="20" y1="280" x2="380" y2="280" stroke="#2563eb" strokeWidth="2" opacity="0.5" />
          
          {/* Center Circle Arc */}
          <path d="M 160,280 A 40,40 0 0,1 240,280" fill="none" stroke="#2563eb" strokeWidth="2" opacity="0.5" />
          
          {/* Three Point Line (Basketball half-court arc) */}
          <path d="M 50,20 L 50,60 A 150,150 0 0,0 350,60 L 350,20" fill="none" stroke="#2563eb" strokeWidth="2.5" opacity="0.7" />
          
          {/* Free Throw Lane (The Key) */}
          <rect x="140" y="20" width="120" height="110" fill="none" stroke="#2563eb" strokeWidth="2" opacity="0.6" />
          
          {/* Free Throw Circle */}
          <path d="M 140,130 A 60,60 0 0,0 260,130" fill="none" stroke="#2563eb" strokeWidth="2" opacity="0.6" />
          <path d="M 140,130 A 60,60 0 0,1 260,130" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="4,4" opacity="0.4" />
          
          {/* Restricted Area Semi-Arc */}
          <path d="M 170,50 A 30,30 0 0,0 230,50" fill="none" stroke="#2563eb" strokeWidth="1.5" opacity="0.3" />
          
          {/* Backboard & Basketball Hoop */}
          <line x1="180" y1="35" x2="220" y2="35" stroke="#ffffff" strokeWidth="3" opacity="0.8" />
          <circle cx="200" cy="45" r="8" fill="none" stroke="#ea580c" strokeWidth="2.5" />
          
          {/* Tactical Play Lines (Passes / Runs) */}
          {lines.map((line, idx) => {
            const isPass = line.type === 'pass';
            const isDribble = line.type === 'dribble';
            return (
              <g key={`line-${idx}`}>
                <defs>
                  <marker id={`arrow-${idx}`} viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={isPass ? "#ea580c" : "#2563eb"} />
                  </marker>
                </defs>
                <line
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke={isPass ? "#f97316" : "#3b82f6"}
                  strokeWidth={isDribble ? "2" : "1.8"}
                  strokeDasharray={isPass ? "4,4" : undefined}
                  markerEnd={`url(#arrow-${idx})`}
                  opacity="0.9"
                />
              </g>
            );
          })}

          {/* Player and Element Coordinates */}
          {players.map((player, idx) => {
            const isBall = player.team === 'ball';
            const isCone = player.team === 'cone';
            const isBlue = player.team === 'blue';
            
            if (isBall) {
              return (
                <g key={`player-${idx}`}>
                  <circle cx={player.x} cy={player.y} r="6" fill="#ea580c" stroke="#ffffff" strokeWidth="1.2" className="animate-pulse" />
                  <path d={`M ${player.x - 4} ${player.y} L ${player.x + 4} ${player.y} M ${player.x} ${player.y - 4} L ${player.x} ${player.y + 4}`} stroke="#000" strokeWidth="0.5" />
                </g>
              );
            }
            if (isCone) {
              return (
                <polygon key={`player-${idx}`} points={`${player.x},${player.y - 6} ${player.x - 5},${player.y + 5} ${player.x + 5},${player.y + 5}`} fill="#eab308" stroke="#ffffff" strokeWidth="0.5" />
              );
            }
            
            return (
              <g key={`player-${idx}`} className="transition-transform duration-200 hover:scale-110">
                <circle
                  cx={player.x}
                  cy={player.y}
                  r="10"
                  fill={isBlue ? "#1d4ed8" : "#991b1b"}
                  stroke={isBlue ? "#60a5fa" : "#f87171"}
                  strokeWidth="2"
                />
                <text
                  x={player.x}
                  y={player.y + 3}
                  fill="#ffffff"
                  fontSize="8.5"
                  fontWeight="black"
                  textAnchor="middle"
                >
                  {player.label ? player.label[0] : (isBlue ? "O" : "X")}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      
      {/* Legend below the court, no longer superimposed */}
      <div className="bg-slate-900 border border-slate-800 px-4 py-3 rounded-2xl flex flex-wrap justify-between items-center text-xs text-slate-300 gap-3">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block border border-blue-400"></span> Ofensiva (O)</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-800 inline-block border border-red-500"></span> Defensora (X)</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block border border-white"></span> Balón</span>
        </div>
        <div className="flex gap-3 font-mono text-[10px] bg-slate-950/60 px-2 py-1 rounded-md border border-slate-800/60">
          <span className="text-orange-400 font-bold">--- Pase</span>
          <span className="text-blue-400 font-bold">── Movimiento / Bote</span>
        </div>
      </div>
    </div>
  );
}

interface UtmifyLinkProps {
  baseUrl: string;
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

function UtmifyLink({ baseUrl, children, ...props }: UtmifyLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (linkRef.current) {
      linkRef.current.href = baseUrl;
    }
  }, [baseUrl]);

  const otherProps = { ...props };
  delete otherProps.href;

  return (
    <a ref={linkRef} {...otherProps}>
      {children}
    </a>
  );
}

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  id?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
  loading?: 'lazy' | 'eager';
}

function OptimizedImage({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  id,
  fetchPriority,
  loading,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  return (
    <div className={`relative overflow-hidden bg-slate-100/50 dark:bg-slate-900/30 rounded-xl ${wrapperClassName}`}>
      {/* Shimmer / Pulse skeleton loader */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-200/50 dark:bg-slate-800/40 animate-pulse flex items-center justify-center rounded-xl">
          <div className="w-6 h-6 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        </div>
      )}
      <img
        id={id}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`transition-all duration-700 ease-out ${
          isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-98 blur-sm'
        } ${className}`}
        referrerPolicy="no-referrer"
        loading={loading}
        // @ts-ignore
        fetchPriority={fetchPriority}
      />
    </div>
  );
}

const SCROLL_IMAGES = [
  "https://i.postimg.cc/MHjRm0My/Screenshot-20260721-050749-Adobe-Acrobat.jpg",
  "https://i.postimg.cc/kGt8vN6F/Screenshot-20260721-050833-Adobe-Acrobat.jpg",
  "https://i.postimg.cc/NFrTk89k/Screenshot-20260721-050910-Adobe-Acrobat.jpg",
  "https://i.postimg.cc/fy0Xf7t7/Screenshot-20260721-050935-Adobe-Acrobat.jpg",
  "https://i.postimg.cc/c6y39KwK/Screenshot-20260721-050956-Adobe-Acrobat.jpg",
  "https://i.postimg.cc/kD3S1VK8/Screenshot-20260721-051022-Adobe-Acrobat.jpg",
  "https://i.postimg.cc/14hFCgwN/Screenshot-20260721-051046-Adobe-Acrobat.jpg",
  "https://i.postimg.cc/qgVKbty3/Screenshot-20260721-051121-Adobe-Acrobat.jpg"
];

export default function App() {
  const { formattedPrice, currencyCode, isConverting, convertAndFormat } = useCurrency();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(1800); // 30 minutes in seconds
  const [selectedDrillIndex, setSelectedDrillIndex] = useState<number>(0);
  const [isTestimonialsPaused, setIsTestimonialsPaused] = useState<boolean>(false);
  const [isMuestraPaused, setIsMuestraPaused] = useState<boolean>(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string>("https://pay.hotmart.com/J106791177D?checkoutMode=10");
  const [selectedZoomImage, setSelectedZoomImage] = useState<string | null>(null);

  useEffect(() => {
    // Capture tracking and UTM parameters from URL and persist them
    const searchParams = new URLSearchParams(window.location.search);
    const trackingParams: Record<string, string> = {};
    
    const keysToForward = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'src',
      'sck',
      'xcod',
      'fbclid',
      'gclid'
    ];
    
    keysToForward.forEach(key => {
      const savedVal = safeLocalStorage.getItem(`track_${key}`);
      if (savedVal) {
        trackingParams[key] = savedVal;
      }
    });
    
    keysToForward.forEach(key => {
      const val = searchParams.get(key);
      if (val) {
        trackingParams[key] = val;
        safeLocalStorage.setItem(`track_${key}`, val);
      }
    });
    
    const baseUrl = "https://pay.hotmart.com/J106791177D";
    const baseParams = new URLSearchParams("checkoutMode=10");
    
    Object.entries(trackingParams).forEach(([key, val]) => {
      baseParams.set(key, val);
    });
    
    setCheckoutUrl(`${baseUrl}?${baseParams.toString()}`);
  }, []);

  useEffect(() => {
    const savedExpiration = safeLocalStorage.getItem('urgency_timer_30m');
    const now = Math.floor(Date.now() / 1000);
    
    if (savedExpiration) {
      const remaining = parseInt(savedExpiration, 10) - now;
      if (remaining > 0) {
        setTimeLeft(remaining);
        return;
      }
    }
    
    const newExpiration = now + 1800;
    safeLocalStorage.setItem('urgency_timer_30m', newExpiration.toString());
    setTimeLeft(1800);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const now = Math.floor(Date.now() / 1000);
          safeLocalStorage.setItem('urgency_timer_30m', (now + 1800).toString());
          return 1800;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCtaClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = checkoutUrl;
  };

  const handleScrollToOffer = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('precio-oferta');
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  // Helper function to return beautiful custom icons for categories
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sword': return <Sword className="w-5 h-5 text-blue-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-orange-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Target': return <Target className="w-5 h-5 text-blue-400" />;
      case 'Dribbble': return <Target className="w-5 h-5 text-orange-400" />; // Fallback to safe Target
      case 'Users': return <Users className="w-5 h-5 text-purple-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-rose-400" />;
      case 'Activity': return <Activity className="w-5 h-5 text-emerald-400" />;
      case 'Award': return <Award className="w-5 h-5 text-amber-400" />;
      case 'Smile': return <Smile className="w-5 h-5 text-teal-400" />;
      default: return <BookOpen className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-blue-950 font-sans selection:bg-orange-500 selection:text-white overflow-x-clip">
      {/* SECCIÓN 0: Sticky Countdown Banner */}
      <HeaderBanner timeLeft={timeLeft} />

      {/* Modern ambient overlay background glow */}
      <div className="absolute top-0 inset-x-0 h-[1000px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-white to-transparent pointer-events-none -z-10" />

      {/* --- SECCIÓN 1: HERO --- */}
      <header id="hero" className="relative py-8 md:py-12 lg:py-16 px-4 overflow-hidden border-b border-slate-100">
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-100/50 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          
          {/* Hero Centered Content */}
          <div className="space-y-4 text-center flex flex-col items-center max-w-4xl">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 text-xs font-bold text-blue-700 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" /> 
              BIBLIOTECA DIGITAL PREMIUM
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-blue-950 leading-none">
              +1000 Sesiones de <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-orange-500">
                Entrenamiento de Baloncesto
              </span> <br />
              Listas para Aplicar
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-blue-900/80 max-w-2xl mx-auto leading-relaxed font-normal">
              Ahorra horas de planificación y mejora el rendimiento de tus jugadores con una biblioteca profesional de entrenamientos, ejercicios y metodologías listas para utilizar desde hoy.
              Diseñado minuciosamente por entrenadores certificados.
            </p>

            {/* Product Mockup/Showcase Image */}
            <div className="w-full max-w-3xl mx-auto my-2 rounded-2xl overflow-hidden shadow-lg border border-slate-200/60 bg-white p-1.5">
              <OptimizedImage
                id="hero-subheadline-image"
                src="https://i.postimg.cc/3RFXHx91/Chat-GPT-Image-18-de-jul-de-2026-09-55-25.png"
                alt="Vista previa de la Biblioteca de Entrenamientos"
                className="w-full h-auto rounded-xl object-cover"
                fetchPriority="high"
                loading="eager"
                wrapperClassName="w-full"
              />
            </div>



            {/* Trust checklist bullets */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-2xl mx-auto text-left pt-3 w-full">
              {HERO_BULLETS.map((bullet, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-blue-950 bg-slate-50 border border-slate-200/60 rounded-2xl p-3.5 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black flex-shrink-0">
                    ✓
                  </div>
                  <span className="font-semibold tracking-tight text-blue-900">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </header>


      {/* --- SECCIÓN 2: BENEFICIOS (POR QUÉ NUESTRO MÉTODO?) --- */}
      <section id="beneficios" className="py-8 md:py-12 px-4 bg-slate-50 border-b border-slate-100 relative">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-orange-100/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
            <span className="inline-flex text-[10px] bg-blue-50 text-blue-700 border border-blue-200/60 px-3.5 py-1 rounded-full font-bold uppercase tracking-widest font-mono">
              LA DIFERENCIA REAL
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-blue-950 leading-tight">
              Diseñado para entrenadores que exigen resultados profesionales
            </h2>
            <p className="text-sm sm:text-base text-blue-900/80 max-w-2xl mx-auto leading-relaxed">
              El <span className="font-bold text-orange-600">92% de los entrenadores de baloncesto</span> desperdician hasta 6 horas semanales dibujando jugadas en cuadernos o buscando videos en internet. Con este método estructurado, organizas tu semana en 5 minutos.
            </p>
          </div>

          {/* Grid list - 3-column elegant light cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((benefit, idx) => (
              <div 
                key={benefit.id} 
                className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 group relative overflow-hidden"
              >
                {/* Sleek blue left accent line */}
                <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div>
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center text-xs font-extrabold font-mono mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    0{idx + 1}
                  </div>
                  <h4 className="text-base font-bold text-blue-950 tracking-tight group-hover:text-blue-700 transition-colors">
                    {benefit.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-900/70 mt-2.5 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* --- SECCIÓN 3: ¿QUÉ VAS A RECIBIR? (10 CARDS) --- */}
      <section id="contenido" className="py-8 md:py-12 px-4 bg-white relative border-b border-slate-100">
        <div className="absolute top-1/2 right-0 w-[500px] h-[300px] bg-blue-100/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
            <span className="text-[10px] bg-orange-50 text-orange-700 border border-orange-200/60 px-3.5 py-1.5 rounded-full font-bold uppercase tracking-widest font-mono">
              BIBLIOTECA COMPLETA
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-blue-950 tracking-tight">
              ¿Qué recibirás al registrarte hoy?
            </h2>
            <p className="text-sm text-blue-900/80 leading-relaxed">
              Un arsenal completo de ejercicios tácticos y planificación detallada, cubriendo todas las fases esenciales del juego moderno de baloncesto.
            </p>
          </div>

          {/* Grid of 10 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {RECEIVE_CARDS.map((card) => (
              <div
                key={card.id}
                className="bg-slate-50 border border-slate-100 hover:border-blue-500/30 rounded-3xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between items-center text-center group relative overflow-hidden"
              >
                {/* Accent glow on hover */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex flex-col items-center w-full">
                  {/* Category Tag on top */}
                  <div className="mb-4">
                    <span className={`text-[9px] px-2.5 py-1 rounded-md font-black uppercase tracking-wider border ${card.accent}`}>
                      {card.tag}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-150 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    {getCategoryIcon(card.icon)}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-black text-blue-950 group-hover:text-blue-700 transition-colors leading-snug">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-blue-900/75 mt-2 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>





           <section id="bonificaciones" className="py-8 md:py-12 px-4 bg-white border-b border-slate-100 relative">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-100/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 px-3 py-1 rounded-full font-black text-xs uppercase tracking-widest shadow-lg">
              <Flame className="w-3.5 h-3.5 fill-current text-slate-950" /> 
              REGALOS EXCLUSIVOS HOY
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-blue-950 tracking-tight">
              Recibe hoy estos 4 Bonos Exclusivos (100% Gratis)
            </h2>
            <p className="text-sm text-blue-900/80 leading-relaxed max-w-2xl mx-auto">
              Solo tienes que adquirir la biblioteca de entrenamientos hoy mismo para recibir como regalo cuatro recursos de incalculable valor.
            </p>
          </div>

          {/* Bonuses layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {BONUSES.map((bonus) => (
              <div
                key={bonus.id}
                className="bg-slate-50 border border-slate-200/60 rounded-3xl shadow-sm hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between p-5 relative group"
              >
                <div>
                  {/* Glowing header design representation */}
                  <div className={`bg-white border border-slate-200/60 rounded-2xl flex flex-col items-center justify-center mb-4 h-[380px] text-center relative overflow-hidden ${bonus.image ? 'p-1' : 'p-4'}`}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-orange-500/10 pointer-events-none" />
                    
                    {bonus.image ? (
                      <OptimizedImage 
                        src={bonus.image} 
                        alt={bonus.title} 
                        className="w-full h-full object-contain z-10 transition-transform duration-300 group-hover:scale-[1.05]"
                        loading={bonus.id === 'bon-4' ? 'eager' : 'lazy'}
                        fetchPriority={bonus.id === 'bon-4' ? 'high' : 'auto'}
                        wrapperClassName="w-full h-full bg-transparent"
                      />
                    ) : (
                      <>
                        {/* Badge */}
                        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-3">
                          <BookOpen className="w-6 h-6" />
                        </div>

                        <span className="text-[8px] font-mono tracking-widest text-blue-700 font-bold uppercase mb-1">
                          {bonus.tag}
                        </span>
                        <span className="text-xs text-blue-900/70 leading-snug font-medium max-w-[150px]">
                          Manual Digital Pro
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <div className="flex gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-orange-100 border border-orange-300/40 text-orange-700 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                      {bonus.number}
                    </span>
                    <h3 className="text-sm font-bold text-blue-950 group-hover:text-blue-700 transition-colors leading-snug">
                      {bonus.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-blue-900/70 leading-relaxed mt-3 pl-0">
                    {bonus.description}
                  </p>
                </div>

                {/* Price indicators */}
                <div className="border-t border-slate-200 pt-4 mt-6 flex justify-between items-end">
                  <div>
                    <span className="text-[9px] text-slate-500 block font-bold tracking-wider uppercase">VALOR REAL</span>
                    <span className="text-xs font-bold text-red-500 line-through">{convertAndFormat(bonus.originalPrice)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-blue-700 block font-bold tracking-wider uppercase">HOY PARA TI</span>
                    <span className="text-sm font-extrabold text-blue-700 uppercase tracking-tight">¡GRATIS!</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* --- SECCIÓN 4: MUESTRA DEL PRODUCTO (INTERACTIVE DRILL VIEW) --- */}
      <section id="muestra" className="pt-12 pb-6 md:pt-16 md:pb-8 px-4 bg-white border-y border-slate-100 relative overflow-hidden">
        {/* Futuristic background glow grids */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl pointer-events-none opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-100 rounded-full blur-3xl pointer-events-none opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-6">
            <span className="inline-flex items-center gap-1.5 text-[9px] bg-blue-50 text-blue-600 border border-blue-200/60 px-3.5 py-1.5 rounded-full font-black uppercase tracking-widest font-mono shadow-[0_0_15px_rgba(59,130,246,0.05)]">
              <Zap className="w-3 h-3 text-blue-600 animate-pulse" /> DIAGRAMAS TÁCTICOS INTERACTIVOS
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-950 tracking-tight">
              Muestra Real de los Ejercicios
            </h2>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed">
              Todos los ejercicios vienen con gráficos vectoriales limpios, explicaciones paso a paso de su desarrollo, objetivos clave y variantes de dificultad adaptables.
            </p>
          </div>

          {/* Infinite Scroll Preview Cards of PDF Pages */}
          <div 
            className="mb-4 overflow-hidden relative rounded-3xl border border-slate-200/60 bg-slate-50 p-4 py-6 shadow-xl backdrop-blur-md"
            onMouseEnter={() => setIsMuestraPaused(true)}
            onMouseLeave={() => setIsMuestraPaused(false)}
            onTouchStart={() => setIsMuestraPaused(true)}
            onTouchEnd={() => setIsMuestraPaused(false)}
          >
            {/* Fade effect on borders */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white via-white/85 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white via-white/85 to-transparent z-10 pointer-events-none" />
            


            <div 
              className={`flex w-max gap-5 animate-marquee`}
              style={{ animationPlayState: isMuestraPaused ? 'paused' : 'running' }}
            >
              {/* First copy of images */}
              <div className="flex gap-5">
                {SCROLL_IMAGES.map((imgUrl, i) => (
                  <div 
                    key={`scroll-img-1-${i}`}
                    className="relative h-[340px] sm:h-[460px] md:h-[520px] aspect-[1/1.41] flex-shrink-0 bg-white border border-slate-200/80 hover:border-orange-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(249,115,22,0.15)] transition-all duration-300 group"
                  >
                    <OptimizedImage 
                      src={imgUrl} 
                      alt={`Página manual ${i + 1}`}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                      wrapperClassName="w-full h-full bg-white"
                    />
                  </div>
                ))}
              </div>
              {/* Second copy of images for infinite scroll loop */}
              <div className="flex gap-5">
                {SCROLL_IMAGES.map((imgUrl, i) => (
                  <div 
                    key={`scroll-img-2-${i}`}
                    className="relative h-[340px] sm:h-[460px] md:h-[520px] aspect-[1/1.41] flex-shrink-0 bg-white border border-slate-200/80 hover:border-orange-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(249,115,22,0.15)] transition-all duration-300 group"
                  >
                    <OptimizedImage 
                      src={imgUrl} 
                      alt={`Página manual ${i + 1}`}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                      wrapperClassName="w-full h-full bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>



        </div>
      </section>


      {/* --- SECCIÓN 6: TESTIMONIOS (OPINIONES) --- */}
      <section id="testimonios" className="py-8 md:py-12 px-4 bg-slate-50 border-b border-slate-100 relative">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
            <span className="inline-flex text-[10px] bg-blue-50 text-blue-700 border border-blue-200/60 px-3.5 py-1 rounded-full font-bold uppercase tracking-widest font-mono">
              VALORADO POR COLEGAS
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-blue-950 tracking-tight">
              Lo que opinan otros entrenadores
            </h2>
            <p className="text-sm text-blue-900/80 leading-relaxed">
              Únete a cientos de profesionales que ya han erradicado la improvisación de su día a día.
            </p>
          </div>

          <div 
            className="relative w-full overflow-hidden py-4 before:absolute before:inset-y-0 before:left-0 before:w-12 sm:before:w-24 before:bg-gradient-to-r before:from-slate-50 before:to-transparent before:z-10 after:absolute after:inset-y-0 after:right-0 after:w-12 sm:after:w-24 after:bg-gradient-to-l after:from-slate-50 after:to-transparent after:z-10"
            onMouseEnter={() => setIsTestimonialsPaused(true)}
            onMouseLeave={() => setIsTestimonialsPaused(false)}
            onTouchStart={() => setIsTestimonialsPaused(true)}
            onTouchEnd={() => setIsTestimonialsPaused(false)}
          >
            <div 
              className={`flex gap-6 w-max animate-marquee ${isTestimonialsPaused ? '[animation-play-state:paused]' : '[animation-play-state:running]'}`}
              style={{ animationPlayState: isTestimonialsPaused ? 'paused' : 'running' }}
            >
              {/* Copy 1 */}
              <div className="flex gap-6 flex-shrink-0">
                {TESTIMONIALS.map((testimonial) => (
                  <div 
                    key={testimonial.id}
                    className="bg-white border border-slate-100 p-6 rounded-3xl flex flex-col justify-between shadow-sm relative group w-[280px] sm:w-[350px] flex-shrink-0"
                  >
                    <div className="space-y-4">
                      {/* Rating stars */}
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-xs sm:text-sm text-blue-900/90 italic leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    <div className="border-t border-slate-100 mt-6 pt-4 flex items-center gap-3">
                      {/* Avatar with fallback */}
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
                        <OptimizedImage 
                          src={testimonial.avatarUrl} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          wrapperClassName="w-full h-full bg-transparent"
                        />
                      </div>
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-blue-950 leading-snug">
                          {testimonial.name}
                        </h5>
                        <p className="text-[11px] text-slate-500 leading-none">
                          {testimonial.role}
                        </p>
                        <span className="inline-block mt-1 text-[10px] font-bold text-blue-600 uppercase">
                          {testimonial.achievement}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Copy 2 */}
              <div className="flex gap-6 flex-shrink-0" aria-hidden="true">
                {TESTIMONIALS.map((testimonial) => (
                  <div 
                    key={`${testimonial.id}-copy`}
                    className="bg-white border border-slate-100 p-6 rounded-3xl flex flex-col justify-between shadow-sm relative group w-[280px] sm:w-[350px] flex-shrink-0"
                  >
                    <div className="space-y-4">
                      {/* Rating stars */}
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-xs sm:text-sm text-blue-900/90 italic leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    <div className="border-t border-slate-100 mt-6 pt-4 flex items-center gap-3">
                      {/* Avatar with fallback */}
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
                        <OptimizedImage 
                          src={testimonial.avatarUrl} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          wrapperClassName="w-full h-full bg-transparent"
                        />
                      </div>
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-blue-950 leading-snug">
                          {testimonial.name}
                        </h5>
                        <p className="text-[11px] text-slate-500 leading-none">
                          {testimonial.role}
                        </p>
                        <span className="inline-block mt-1 text-[10px] font-bold text-blue-600 uppercase">
                          {testimonial.achievement}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* --- SECCIÓN 9: OFERTA IMPERDIBLE (PRICING BLOCK) --- */}
      <section id="precio-oferta" className="py-10 md:py-16 px-4 bg-white relative border-t border-slate-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-100/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-blue-950 tracking-tight leading-tight max-w-3xl mx-auto">
            ¡Elige la Metodología de Ejercicios de Baloncesto más Completa del Mercado Actual!
          </h2>

          <div className="bg-white border-[3px] border-orange-500 rounded-[32px] shadow-2xl p-4 md:p-8 space-y-5 relative overflow-visible">
            
            {/* Overlapping Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-600 text-white font-black text-xs px-6 py-1.5 rounded-full uppercase tracking-widest shadow-md">
              OFERTA ESPECIAL
            </div>
            
            <div className="space-y-1.5 pt-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-orange-600 tracking-tight">
                Planes de Entrenamientos Completos
              </h3>
              <p className="text-xs sm:text-sm text-orange-500 font-semibold italic">
                Producto principal + 4 bonificaciones tácticas exclusivas
              </p>
            </div>

            {/* Product Mockup/Showcase Image */}
            <div className="w-full max-w-2xl mx-auto my-2 rounded-2xl overflow-hidden shadow-sm border border-slate-200/50 bg-white p-1">
              <OptimizedImage
                id="pricing-showcase-image"
                src="https://i.postimg.cc/3RFXHx91/Chat-GPT-Image-18-de-jul-de-2026-09-55-25.png"
                alt="Vista previa de la Biblioteca de Entrenamientos"
                className="w-full h-auto rounded-xl object-cover"
                loading="lazy"
                wrapperClassName="w-full"
              />
            </div>

            {/* Checklist of what you're buying */}
            <div className="max-w-xl mx-auto space-y-3 text-left text-xs sm:text-sm font-semibold text-slate-800 py-4">
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-orange-500 mt-0.5 flex-shrink-0 stroke-[3]" />
                <span>+1000 Sesiones de Entrenamientos de Baloncesto <span className="text-orange-500/90 font-medium">(Valorizado en $129)</span></span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-orange-500 mt-0.5 flex-shrink-0 stroke-[3]" />
                <span>Bono 1: Ejercicios de Manejo de Balón en el Baloncesto <span className="text-orange-500/90 font-medium">(Valorizado en $39)</span></span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-orange-500 mt-0.5 flex-shrink-0 stroke-[3]" />
                <span>Bono 2: Ejercicios de Técnica Individual e Táctica de Baloncesto <span className="text-orange-500/90 font-medium">(Valorizado en $49)</span></span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-orange-500 mt-0.5 flex-shrink-0 stroke-[3]" />
                <span>Bono 3: Ejercicios para el Entrenamiento del Bote, el Rebote y el Pase en el Baloncesto <span className="text-orange-500/90 font-medium">(Valorizado en $29)</span></span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-orange-500 mt-0.5 flex-shrink-0 stroke-[3]" />
                <span>Bono 4: Lecciones en Video de Baloncesto <span className="text-orange-500/90 font-medium">(Valorizado en $59)</span></span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-orange-500 mt-0.5 flex-shrink-0 stroke-[3]" />
                <span>Soporte técnico de por vida por correo electrónico</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-orange-500 mt-0.5 flex-shrink-0 stroke-[3]" />
                <span>Acceso de por vida</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-orange-500 mt-0.5 flex-shrink-0 stroke-[3]" />
                <span>Actualizaciones gratuitas</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-4.5 h-4.5 text-orange-500 mt-0.5 flex-shrink-0 stroke-[3]" />
                <span>Garantía de 7 días</span>
              </div>
            </div>

            {/* Price section - Styled like the image */}
            <div className="space-y-1.5 py-4 border-t border-slate-100/80">
              <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold text-slate-500">
                <span>Antes</span>
                <span className="line-through text-red-500 font-bold">{convertAndFormat(305)}</span>
                <span className="bg-emerald-100 text-emerald-800 font-black text-[10px] px-2 py-0.5 rounded tracking-wide uppercase">90% DTO.</span>
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-6xl sm:text-7xl md:text-8xl font-black text-orange-500 font-sans tracking-tight">
                  {formattedPrice}
                </span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-black text-orange-500 font-sans">
                  USD
                </span>
              </div>
              <span className="text-xs text-slate-500 font-bold block">
                (Puede pagar en su moneda local)
              </span>
            </div>

            {/* Big Green Button */}
            <div className="space-y-4 flex flex-col items-center">
              <button
                id="cta-main-purchase"
                onClick={handleCtaClick}
                className="w-full max-w-lg bg-[#00965e] hover:bg-[#008352] text-white font-black py-5 px-10 rounded-[20px] shadow-[0_12px_24px_rgba(0,150,94,0.3)] hover:shadow-[0_16px_32px_rgba(0,150,94,0.45)] text-base md:text-lg lg:text-xl uppercase tracking-wider transform transition-all duration-300 hover:-translate-y-1 text-center cursor-pointer"
              >
                QUIERO ACCEDER AHORA
              </button>

              <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-slate-500 font-semibold pt-1">
                <span>🔥</span>
                <span>Oferta por tiempo limitado</span>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-slate-500 pt-3">
                <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-emerald-600" /> Transacción Segura</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Garantía de 7 días</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-emerald-600" /> Entrega Inmediata</span>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* --- SECCIÓN 7: GARANTÍA DE SATISFACCIÓN --- */}
      <section id="garantia" className="py-8 md:py-12 px-4 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/20 via-white to-white pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200/60 rounded-[32px] p-4 md:p-6 shadow-sm relative overflow-hidden">
          {/* Subtle neon glow on edge */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            {/* Guarantee Shield Emblem */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white border border-slate-200 flex items-center justify-center text-orange-600 flex-shrink-0 shadow-sm">
              <ShieldCheck className="w-12 h-12 md:w-16 md:h-16 text-orange-600" />
            </div>

            {/* Guarantee textual contents */}
            <div className="space-y-4 text-center md:text-left">
              <span className="text-[10px] bg-orange-100 text-orange-700 border border-orange-300/40 px-3 py-1 rounded-full font-bold uppercase tracking-widest font-mono">
                COMPRA 100% LIBRE DE RIESGOS
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-blue-950 tracking-tight">
                Garantía Incondicional de 7 Días
              </h2>
              <p className="text-xs sm:text-sm text-blue-900/80 leading-relaxed">
                Prueba todo el material digital hoy mismo. Si en los próximos 7 días decides que esta monumental biblioteca no eleva drásticamente el nivel de tus entrenamientos de baloncesto o no te ahorra horas de planificación, escríbenos y te reembolsaremos de inmediato el 100% de tu dinero. Sin preguntas ni objeciones.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* --- SECCIÓN 8: PREGUNTAS FRECUENTES (FAQ) --- */}
      <section id="faq" className="py-8 md:py-12 px-4 bg-slate-50 border-b border-slate-100 relative">
        <div className="max-w-3xl mx-auto">
          
          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <span className="inline-flex text-[10px] bg-blue-50 text-blue-700 border border-blue-200/60 px-3.5 py-1 rounded-full font-bold uppercase tracking-widest font-mono">
              RESOLVEMOS TUS DUDAS
            </span>
            <h2 className="text-3xl font-black text-blue-950 tracking-tight">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => {
              const isOpen = expandedFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-5 flex justify-between items-center gap-4 text-blue-950 hover:text-blue-700 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-bold leading-snug">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="p-5 pt-0 border-t border-slate-100 text-xs sm:text-sm text-blue-900/80 leading-relaxed bg-blue-50/20">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Big Green Button under FAQs */}
          <div className="mt-10 flex flex-col items-center">
            <button
              id="cta-faq-purchase"
              onClick={handleCtaClick}
              className="w-full max-w-lg bg-[#00965e] hover:bg-[#008352] text-white font-black py-5 px-10 rounded-[20px] shadow-[0_12px_24px_rgba(0,150,94,0.3)] hover:shadow-[0_16px_32px_rgba(0,150,94,0.45)] text-base md:text-lg lg:text-xl uppercase tracking-wider transform transition-all duration-300 hover:-translate-y-1 text-center cursor-pointer"
            >
              QUIERO ACCEDER AHORA
            </button>

            <div className="mt-8 text-center px-4 max-w-xl">
              <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                ¿Tienes más dudas? Ponte en contacto con nuestro soporte en:
              </p>
              <p className="mt-2 text-[11px] min-[360px]:text-xs min-[400px]:text-[13px] xs:text-sm sm:text-base md:text-lg font-bold text-slate-800 whitespace-nowrap select-all text-center">
                contacto@entrenamientosdebaloncesto.online
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* --- SECCIÓN 10: PIE DE PÁGINA (FOOTER) --- */}
      <footer className="py-8 px-4 bg-slate-50 border-t border-slate-200 text-slate-600 text-xs text-center">
        <div className="max-w-7xl mx-auto">
          <p>
            &copy; 2026 Biblioteca Digital Premium de Baloncesto. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* Dynamic Purchase checkout overlay modal container */}
      <Suspense fallback={null}>
        {isModalOpen && (
          <PurchaseModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            checkoutUrl={checkoutUrl}
          />
        )}
        <NotificationToast />
      </Suspense>

      {/* Lightbox / Zoom Overlay */}
      {selectedZoomImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md transition-all duration-300"
          onClick={() => setSelectedZoomImage(null)}
        >
          {/* Close button with high-contrast indicator */}
          <button 
            onClick={() => setSelectedZoomImage(null)}
            className="absolute top-4 right-4 p-3 bg-slate-900/80 border border-slate-800 text-white rounded-full hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 cursor-pointer shadow-lg"
            aria-label="Cerrar vista"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div 
            className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-full max-h-[82vh] overflow-hidden rounded-2xl border border-slate-800 shadow-2xl bg-slate-950">
              <img 
                src={selectedZoomImage} 
                alt="Página del manual ampliada" 
                className="w-full h-full object-contain max-h-[82vh]"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="mt-4 text-center text-slate-400 text-xs sm:text-sm font-mono bg-slate-950/80 border border-slate-900 px-4 py-2 rounded-full shadow-md">
              Haz clic fuera o presiona la "X" para cerrar
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
