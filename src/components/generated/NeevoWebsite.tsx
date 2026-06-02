import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, ChevronRight, ExternalLink, Film, Wrench, Trophy, X, Star } from 'lucide-react';
const COLORS = {
  primary: '#f17a21',
  secondary: '#222222',
  bgOffWhite: '#f0ede4',
  textMain: '#222222',
  textMuted: '#4b5563'
};
const TEAM_MEMBERS = [{
  name: "Miguel Lima",
  role: 'Team Leader',
  number: '01',
  img: "https://storage.googleapis.com/storage.magicpath.ai/user/344836251066699776/assets/19bb2dbe-1cab-4b2d-8a5c-72f7f97735d8.jpg",
  bio: "The architect behind Neevo Racing's vision. Miguel drives team cohesion, strategic direction, and ensures every department performs at its peak. His ability to lead under pressure mirrors the demands of a real F1 operation.",
  stats: [{
    label: "Leadership",
    value: "99"
  }, {
    label: "Strategy",
    value: "96"
  }, {
    label: "Pressure IQ",
    value: "97"
  }, {
    label: "Vision",
    value: "98"
  }],
  tags: ["Strategy", "Leadership", "Operations"],
  achievement: "Neevo Racing Founder"
}, {
  name: "Nicolas Perez",
  role: "Manufacturing Engineer",
  number: '02',
  img: "https://storage.googleapis.com/storage.magicpath.ai/user/344836251066699776/assets/3eed44f6-2d1a-4104-a4d5-acf4fcfd3e1d.jpg",
  bio: "Nicolas translates raw CAD data into precision-machined reality. From 3D-printed prototypes to CNC-finished components, he leads the fabrication pipeline with meticulous attention to tolerances and material science.",
  stats: [{
    label: "Precision",
    value: "98"
  }, {
    label: "CAD/CAM",
    value: "95"
  }, {
    label: "Materials",
    value: "93"
  }, {
    label: "Build Speed",
    value: "91"
  }],
  tags: ["CNC Machining", "3D Printing", "CAD"],
  achievement: "V-Orbit Build Lead"
}, {
  name: "Gabriel Frazão",
  role: "Corporate Relations Manager",
  number: '03',
  img: "https://storage.googleapis.com/storage.magicpath.ai/user/344836251066699776/assets/fb654a14-746a-4d39-bdb8-7ca280052121.jpg",
  bio: "Gabriel is Neevo's bridge to the corporate world, negotiating sponsorships, building long-term partnerships, and securing the resources that keep the team competitive. His network continues to grow with every season.",
  stats: [{
    label: "Networking",
    value: "97"
  }, {
    label: "Negotiation",
    value: "94"
  }, {
    label: "Partnerships",
    value: "96"
  }, {
    label: "Finances",
    value: "90"
  }],
  tags: ["Sponsorship", "Finance", "Relations"],
  achievement: "Secured 5+ Sponsors"
}, {
  name: "Maria Sampaio",
  role: 'Marketing',
  number: '04',
  img: "https://storage.googleapis.com/storage.magicpath.ai/user/344836251066699776/assets/22a74de8-f7c0-4317-a18b-23970aeb0500.jpg",
  bio: "Maria crafts Neevo's brand story and market positioning. From campaign strategy to audience targeting, she ensures the team's narrative resonates at every touchpoint, both online and on-track.",
  stats: [{
    label: "Branding",
    value: "95"
  }, {
    label: "Campaigns",
    value: "93"
  }, {
    label: "Analytics",
    value: "88"
  }, {
    label: "Creativity",
    value: "97"
  }],
  tags: ["Brand Strategy", "Campaigns", "Growth"],
  achievement: "Brand Architect"
}, {
  name: "Matias Carepa",
  role: "Graphic Designer",
  number: '05',
  img: "https://storage.googleapis.com/storage.magicpath.ai/user/344836251066699776/assets/518829a5-635f-488d-9d73-50acc4b6be1b.jpg",
  bio: "The visual force behind Neevo's identity. Matias designs everything from livery concepts to competition presentations, ensuring every pixel reflects the precision and ambition at the core of the team.",
  stats: [{
    label: "Visual Design",
    value: "98"
  }, {
    label: "Typography",
    value: "95"
  }, {
    label: "Motion",
    value: "89"
  }, {
    label: "Livery Design",
    value: "97"
  }],
  tags: ["Identity", "Livery", "UI/UX"],
  achievement: "Neevo Visual Identity"
}, {
  name: "Sofia Borges",
  role: "Media Manager",
  number: '06',
  img: "https://storage.googleapis.com/storage.magicpath.ai/user/344836251066699776/assets/d8fe64ee-d51c-4233-a6c8-6c290da4394f.jpg",
  bio: "Sofia captures the energy of Neevo Racing across every platform. From pit lane footage to social-first edits, she transforms raw moments into compelling stories that grow the team's audience worldwide.",
  stats: [{
    label: "Content",
    value: "96"
  }, {
    label: "Video Edit",
    value: "94"
  }, {
    label: "Social Media",
    value: "97"
  }, {
    label: "Storytelling",
    value: "95"
  }],
  tags: ["Video", "Social", "Photography"],
  achievement: "Media Growth Lead"
}] as any[];
const PARTNERS = [{
  name: 'Polestar Porto',
  url: 'https://www.triauto.com.pt',
  color: '#f17a21'
}, {
  name: 'CLIP',
  url: 'https://clip.pt/',
  color: '#f17a21'
}, {
  name: 'Independent',
  url: '',
  color: '#f17a21'
}, {
  name: 'CATIM',
  url: 'https://catim.pt/',
  color: '#f17a21'
}, {
  name: 'Magic Path',
  url: 'https://www.magicpath.ai/',
  color: '#f17a21'
}, {
  name: 'Orgal',
  url: 'https://www.orgal.com.pt/',
  color: '#f17a21'
}, {
  name: 'The Wild Theory',
  url: 'https://thewildtheory.com/',
  color: '#f17a21'
}, {
  name: 'VIVA Lab',
  url: 'https://www.vivalabporto.com/',
  color: '#f17a21'
}, {
  name: '4G News',
  url: 'https://4gnews.pt/',
  color: '#f17a21'
}, {
  name: 'Gertal',
  url: 'https://www3.gertal.pt/',
  color: '#f17a21'
}] as any[];
type NavLink = {
  name: string;
  id: string;
  href?: string;
};
const NAV_LINKS: NavLink[] = [{
  name: 'Home',
  id: 'home'
}, {
  name: 'About us',
  id: 'about'
}, {
  name: 'The Team',
  id: 'team'
}, {
  name: 'STEM Racing',
  id: 'stem'
}, {
  name: 'Game',
  id: 'game',
  href: 'https://neevo-racing-game-version2.onrender.com/host.html'
}, {
  name: 'Simulator',
  id: 'simulator',
  href: 'https://designs.magicpath.ai/v1/purely-pond-7849'
}, {
  name: 'Sustainability',
  id: 'sustainability',
  href: 'https://designs.magicpath.ai/v1/dreamy-bridge-2645'
}, {
  name: 'Partners',
  id: 'partners'
}, {
  name: 'Contact us',
  id: 'contact'
}];
const STEM_PILLARS = [{
  icon: <Wrench className="w-6 h-6" />,
  title: "Engineering",
  desc: "Advanced CAD/CAM workflows and CFD simulation define every micron of our chassis and aerodynamic surfaces."
}, {
  icon: <Trophy className="w-6 h-6" />,
  title: "Enterprise",
  desc: "Teams secure sponsorships, manage real budgets, and build a competitive brand, mirroring a professional F1 outfit."
}, {
  icon: <Film className="w-6 h-6" />,
  title: "Media",
  desc: "From social media strategy to video production, teams build a full media presence to amplify their story."
}] as any[];
const VISION_MISSION_BLOCKS = [{
  type: 'vision',
  eyebrow: 'Our Vision',
  headline: 'to redefine what student racing can be.',
  body: 'We do not build cars. We build futures. Every millimetre of the V-Orbit is a declaration that ambition, precision, and youth can compete with anyone on any track.'
}, {
  type: 'mission',
  eyebrow: 'Our Mission',
  headline: 'push the limit. every. single. day.',
  body: 'From CAD to race day, we operate with the discipline of a professional outfit. Engineering rigour, commercial acumen, and creative storytelling unified under one banner.'
}, {
  type: 'values',
  eyebrow: 'Our Values',
  headline: 'precision. passion. progress.',
  body: 'We hold ourselves to a standard that most students never face. Not because we have to, because we choose to. That choice is what makes Neevo, Neevo.'
}] as const;

// Star field data — generated once outside the component
type StarDot = {
  x: number;
  y: number;
  r: number;
  o: number;
};
const STAR_DOTS: StarDot[] = Array.from({
  length: 180
}, (_, i) => ({
  x: (i * 137.508 + 23) % 100,
  y: (i * 97.618 + 11) % 100,
  r: i % 5 === 0 ? 1.8 : i % 3 === 0 ? 1.2 : 0.7,
  o: 0.25 + i % 7 * 0.08
}));

// Enhanced Orbit Ring — more visible, space-grade
const OrbitRing = () => <svg aria-hidden="true" viewBox="0 0 240 240" className="pointer-events-none select-none" style={{
  width: '420px',
  height: '420px',
  opacity: 0.18
}}>
    <ellipse cx="120" cy="120" rx="110" ry="44" fill="none" stroke="#f17a21" strokeWidth="0.7" />
    <ellipse cx="120" cy="120" rx="86" ry="34" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.4" strokeDasharray="5 8" />
    <ellipse cx="120" cy="120" rx="58" ry="23" fill="none" stroke="rgba(241,122,33,0.4)" strokeWidth="0.4" strokeDasharray="2 10" />
    <circle cx="120" cy="76" r="3.5" fill="#f17a21" opacity="0.9" />
    <circle cx="224" cy="130" r="2.2" fill="rgba(255,255,255,0.6)" />
    <circle cx="40" cy="112" r="1.8" fill="rgba(255,255,255,0.5)" />
    <circle cx="178" cy="96" r="1.2" fill="#f17a21" opacity="0.6" />
    <circle cx="62" cy="142" r="1.0" fill="rgba(255,255,255,0.4)" />
  </svg>;

// Radar circle overlay for STEM section
const RadarOverlay = () => <svg aria-hidden="true" viewBox="0 0 400 400" className="pointer-events-none select-none" style={{
  width: '600px',
  height: '600px',
  opacity: 0.04
}}>
    <circle cx="200" cy="200" r="180" fill="none" stroke="white" strokeWidth="0.8" />
    <circle cx="200" cy="200" r="140" fill="none" stroke="white" strokeWidth="0.6" />
    <circle cx="200" cy="200" r="100" fill="none" stroke="white" strokeWidth="0.5" />
    <circle cx="200" cy="200" r="60" fill="none" stroke="white" strokeWidth="0.5" />
    <circle cx="200" cy="200" r="22" fill="none" stroke="#f17a21" strokeWidth="0.8" />
    <line x1="200" y1="20" x2="200" y2="380" stroke="white" strokeWidth="0.4" />
    <line x1="20" y1="200" x2="380" y2="200" stroke="white" strokeWidth="0.4" />
    <line x1="73" y1="73" x2="327" y2="327" stroke="white" strokeWidth="0.3" strokeDasharray="4 8" />
    <line x1="327" y1="73" x2="73" y2="327" stroke="white" strokeWidth="0.3" strokeDasharray="4 8" />
  </svg>;

// TikTok Icon
const TikTokIcon = () => <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.76a4.84 4.84 0 01-1.01-.07z" />
  </svg>;

// Section Title
const SectionTitle = ({
  children,
  subtitle
}: {
  children: React.ReactNode;
  subtitle?: string;
}) => <motion.div initial={{
  opacity: 0,
  x: -20
}} whileInView={{
  opacity: 1,
  x: 0
}} viewport={{
  once: true
}} className="mb-16 text-left">
    {subtitle && <p className="font-bold tracking-[0.35em] uppercase text-xs mb-3" style={{
    color: COLORS.primary
  }}>
        {subtitle}
      </p>}
    <h2 className="text-5xl md:text-7xl font-black tracking-tighter lowercase" style={{
    fontFamily: 'MuseoModerno, sans-serif',
    color: COLORS.secondary
  }}>
      {children}
    </h2>
  </motion.div>;

// Section Title — light version for dark backgrounds
const SectionTitleLight = ({
  children,
  subtitle
}: {
  children: React.ReactNode;
  subtitle?: string;
}) => <motion.div initial={{
  opacity: 0,
  x: -20
}} whileInView={{
  opacity: 1,
  x: 0
}} viewport={{
  once: true
}} className="mb-16 text-left">
    {subtitle && <p className="font-bold tracking-[0.35em] uppercase text-xs mb-3" style={{
    color: COLORS.primary
  }}>
        {subtitle}
      </p>}
    <h2 className="text-5xl md:text-7xl font-black tracking-tighter lowercase" style={{
    fontFamily: 'MuseoModerno, sans-serif',
    color: '#ffffff',
    textShadow: '0 0 40px rgba(241,122,33,0.25), 0 0 80px rgba(255,255,255,0.05)'
  }}>
      {children}
    </h2>
  </motion.div>;

// Countdown Hook
type CountdownUnit = 'days' | 'hours' | 'minutes' | 'seconds';
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, targetDate.getTime() - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
      const minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
      const seconds = Math.floor(diff % (1000 * 60) / 1000);
      setTimeLeft({
        days,
        hours,
        minutes,
        seconds
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

// Countdown Section
const REGIONALS_DATE = new Date('2026-05-20T09:00:00');
const COUNTDOWN_UNITS: {
  key: CountdownUnit;
  label: string;
}[] = [{
  key: 'days',
  label: 'Days'
}, {
  key: 'hours',
  label: 'Hours'
}, {
  key: 'minutes',
  label: 'Minutes'
}, {
  key: 'seconds',
  label: 'Seconds'
}];
const CountdownSection = () => {
  const timeLeft = useCountdown(REGIONALS_DATE);
  return <div className="relative w-full overflow-hidden pt-0 pb-28" style={{
    background: '#f0ede4'
  }}>
      {/* Ghost watermark */}
      <div className="pointer-events-none select-none" style={{
      position: 'absolute',
      bottom: '-6%',
      left: '-2%',
      fontSize: '28vw',
      fontFamily: 'MuseoModerno, sans-serif',
      fontWeight: 900,
      color: COLORS.secondary,
      opacity: 0.025,
      lineHeight: 1,
      whiteSpace: 'nowrap',
      zIndex: 0
    }}>
        ponte de lima
      </div>

      <div className="container mx-auto px-8 relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.15
      }} className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-[10px] font-black tracking-[0.35em] uppercase mb-1" style={{
            color: COLORS.primary
          }}>
              Nationals Ponte de Lima 2026
            </p>
            <p className="text-base font-bold text-zinc-400 tracking-wide">Ponte de Lima · 20 May 2026</p>
          </div>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-zinc-200 bg-white/60 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <span className="text-xs font-bold tracking-wide text-zinc-700">Ponte de Lima, Portugal</span>
          </div>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.25
      }} className="flex items-end w-full">
          {COUNTDOWN_UNITS.map((unit, idx) => <div key={unit.key} className="flex items-end flex-1 min-w-0">
              <div className="flex flex-col items-start flex-1 min-w-0">
                <motion.span key={timeLeft[unit.key]} initial={{
              opacity: 0.4,
              y: -6
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.25,
              ease: 'easeOut'
            }} className="font-black leading-none block w-full" style={{
              fontFamily: 'MuseoModerno, sans-serif',
              fontSize: 'clamp(52px, 9vw, 130px)',
              color: COLORS.secondary,
              letterSpacing: '-0.04em'
            }}>
                  {String(timeLeft[unit.key]).padStart(2, '0')}
                </motion.span>
                <span className="font-black uppercase tracking-[0.3em] mt-2 block" style={{
              fontSize: 'clamp(8px, 1vw, 11px)',
              color: COLORS.primary
            }}>
                  {unit.label}
                </span>
              </div>
              {idx < COUNTDOWN_UNITS.length - 1 && <span className="flex-shrink-0 font-black leading-none pb-4 px-1 sm:px-2" style={{
            fontFamily: 'MuseoModerno, sans-serif',
            fontSize: 'clamp(36px, 6vw, 90px)',
            color: 'rgba(34,34,34,0.15)',
            letterSpacing: '-0.04em'
          }}>
                  :
                </span>}
            </div>)}
        </motion.div>

        <p className="text-xs font-medium text-zinc-400 tracking-widest uppercase mt-6">until Nationals · Ponte de Lima</p>

        {/* Achievement Banner */}
        <motion.div initial={{
        opacity: 0,
        y: 16
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.6
      }} className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-px bg-zinc-200 border border-zinc-200 overflow-hidden max-w-xl">
          <div className="flex items-center gap-4 px-6 py-4 bg-zinc-950 flex-1">
            <span className="text-2xl">🥈</span>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#f17a21]">Regionals Porto 2026</p>
              <p className="text-sm font-black text-white lowercase" style={{
              fontFamily: 'MuseoModerno, sans-serif'
            }}>2nd Place Overall</p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-6 py-4 bg-[#f17a21] flex-1">
            <span className="text-2xl">🏆</span>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/70">Award · Regionals</p>
              <p className="text-sm font-black text-white lowercase" style={{
              fontFamily: 'MuseoModerno, sans-serif'
            }}>Best Enterprise</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>;
};

// Main Component
export const NeevoWebsite = () => {
  const [activePage, setActivePage] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    scrollYProgress
  } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navigateTo = (id: string) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <HomeView onNavigate={navigateTo} />;
      case 'about':
        return <AboutView />;
      case 'team':
        return <TeamView />;
      case 'stem':
        return <StemView />;
      case 'partners':
        return <PartnersView />;
      case 'contact':
        return <ContactView />;
      default:
        return <HomeView onNavigate={navigateTo} />;
    }
  };
  return <div className="min-h-screen font-sans selection:bg-[#f17a21] selection:text-white" style={{
    backgroundColor: COLORS.bgOffWhite,
    color: COLORS.secondary
  }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=MuseoModerno:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Inter:wght@400;500;700&display=swap');
        body { font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
        h1, h2, h3, .neevo-title { font-family: 'MuseoModerno', sans-serif; font-weight: 900; }
        .neevo-description { font-family: 'Inter', sans-serif; font-weight: 400; line-height: 1.7; }
        .neevo-subtitle { font-family: 'MuseoModerno', sans-serif; font-weight: 400; }

        @keyframes twinkle-slow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.4); }
        }
        @keyframes twinkle-medium {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          40% { opacity: 1; transform: scale(1.6); }
          80% { opacity: 0.3; }
        }
        @keyframes twinkle-fast {
          0%, 100% { opacity: 0.1; }
          35% { opacity: 0.8; transform: scale(1.3); }
          70% { opacity: 0.4; }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          33% { transform: translateY(-12px) translateX(6px); opacity: 0.7; }
          66% { transform: translateY(-6px) translateX(-8px); opacity: 0.5; }
        }
        @keyframes nebula-pulse {
          0%, 100% { opacity: 0.06; }
          50% { opacity: 0.12; }
        }
        .star-twinkle-slow { animation: twinkle-slow var(--dur, 4s) ease-in-out infinite; }
        .star-twinkle-med  { animation: twinkle-medium var(--dur, 3s) ease-in-out infinite; }
        .star-twinkle-fast { animation: twinkle-fast var(--dur, 2s) ease-in-out infinite; }
        .nebula-pulse { animation: nebula-pulse 8s ease-in-out infinite; }
        .float-particle { animation: float-particle var(--dur, 7s) ease-in-out infinite; }
      `}</style>

      <motion.div className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100]" style={{
      scaleX,
      backgroundColor: COLORS.primary
    }} />

      {/* NAV */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'py-3 shadow-xl bg-white/95 backdrop-blur-md' : 'py-8 bg-transparent'}`}>
        <div className="container mx-auto px-6 lg:px-8 flex items-center justify-between">
          <button onClick={() => navigateTo('home')} className="hover:opacity-80 transition-opacity">
            <img src="https://storage.googleapis.com/storage.magicpath.ai/user/344836251066699776/assets/f5f9e93d-0f89-428f-a4ef-8e5da4e46f25.png" alt="Neevo Racing" className="h-9 w-auto object-contain" onError={e => {
            const target = e.currentTarget as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'block';
          }} style={{
            objectFit: 'contain',
            objectPosition: '50% 50%',
            opacity: '1'
          }} />
            <span className="text-3xl font-black tracking-tighter lowercase" style={{
            fontFamily: 'MuseoModerno, sans-serif',
            color: scrolled ? COLORS.primary : COLORS.secondary,
            fontWeight: '900',
            display: 'none'
          }}>
              neevo
            </span>
          </button>

          <div className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map(link => {
            if ('href' in link && link.href) {
              return <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer" className="font-black text-[10px] tracking-[0.25em] uppercase transition-all relative group text-zinc-500 hover:text-zinc-950">
                    {link.name}
                    <span className="absolute -bottom-2 left-0 h-[2px] bg-[#f17a21] transition-all duration-500 w-0 group-hover:w-full" />
                  </a>;
            }
            return <button key={link.id} onClick={() => navigateTo(link.id)} className={`font-black text-[10px] tracking-[0.25em] uppercase transition-all relative group ${activePage === link.id ? 'text-[#f17a21]' : 'text-zinc-500 hover:text-zinc-950'}`}>
                  {link.name}
                  <span className={`absolute -bottom-2 left-0 h-[2px] bg-[#f17a21] transition-all duration-500 ${activePage === link.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </button>;
          })}
          </div>

          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/neevoracing" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-950 text-white hover:bg-[#f17a21] transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.tiktok.com/@neevoracing" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-950 text-white hover:bg-[#f17a21] transition-colors">
              <TikTokIcon />
            </a>
            <a href="https://www.youtube.com/@NeevoRacing" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-950 text-white hover:bg-[#f17a21] transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div key={activePage} initial={{
          opacity: 0,
          y: 12
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -12
        }} transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1]
        }}>
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="bg-white py-20 border-t border-zinc-100">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div>
              <span className="text-4xl font-black tracking-tighter lowercase" style={{
              fontFamily: 'MuseoModerno, sans-serif',
              color: COLORS.primary,
              fontWeight: '900'
            }}>
                neevo
              </span>
              <p className="mt-4 text-zinc-400 font-medium tracking-widest uppercase text-[10px]">RACING EVOLUTION</p>
            </div>
            <div className="grid grid-cols-2 gap-16">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-zinc-300">Explore</h4>
                <ul className="space-y-3">
                  {NAV_LINKS.slice(0, 4).map(link => <li key={link.id}>
                      <a href={link.href || '#'} className="text-sm font-medium hover:text-[#f17a21] transition-colors">
                        {link.name}
                      </a>
                    </li>)}
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-zinc-300">Connect</h4>
                <ul className="space-y-3">
                  <li><a href="https://www.instagram.com/neevoracing" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-[#f17a21] transition-colors">Instagram</a></li>
                  <li><a href="https://www.tiktok.com/@neevoracing" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-[#f17a21] transition-colors">TikTok</a></li>
                  <li><a href="https://www.youtube.com/@NeevoRacing" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-[#f17a21] transition-colors">YouTube</a></li>
                  <li><a href="mailto:neevo@clip.pt" className="text-sm font-medium hover:text-[#f17a21] transition-colors">Email</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-zinc-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">© 2025 Neevo Racing Team. All Rights Reserved.</p>
            <div className="flex gap-8 text-[10px] font-bold text-zinc-300 uppercase tracking-widest">
              <a href="#" className="hover:text-zinc-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};

// HOME VIEW
const HomeView = ({
  onNavigate
}: {
  onNavigate: (id: string) => void;
}) => {
  return <section className="relative overflow-hidden" style={{
    backgroundColor: COLORS.bgOffWhite
  }}>
      {/* Orbit decoration */}
      <div aria-hidden="true" className="pointer-events-none select-none" style={{
      position: 'absolute',
      right: '2%',
      top: '12%',
      zIndex: 3,
      opacity: 0.35
    }}>
        <OrbitRing />
      </div>

      {/* Subtle horizontal scan line */}
      <div aria-hidden="true" className="pointer-events-none" style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: '38%',
      height: '1px',
      background: 'linear-gradient(90deg, transparent 0%, rgba(241,122,33,0.18) 30%, rgba(241,122,33,0.09) 70%, transparent 100%)',
      zIndex: 3
    }} />

      <div className="container mx-auto px-8 pt-40 pb-16 relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: -40
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14">
          <h1 className="text-[13vw] lg:text-[10vw] leading-[0.85] tracking-tighter font-black lowercase" style={{
          fontFamily: 'MuseoModerno',
          color: COLORS.secondary
        }}>
            <span>racing</span>
            <br />
            <span style={{
            color: COLORS.primary,
            textShadow: '0 0 40px rgba(241,122,33,0.25)'
          }}>evolution.</span>
          </h1>
          <div className="lg:max-w-sm lg:pb-4">
            <p className="neevo-description text-lg text-zinc-500 mb-10 leading-relaxed">
              Where precision engineering meets raw ambition. Defining the next era of miniature performance.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => onNavigate('team')} className="px-10 py-5 bg-[#f17a21] text-white font-black uppercase tracking-widest text-xs hover:bg-zinc-950 hover:text-white transition-all transform hover:-translate-y-1">
                The Team
              </button>
              <button onClick={() => onNavigate('partners')} className="px-10 py-5 border border-zinc-300 text-zinc-700 font-black uppercase tracking-widest text-xs hover:bg-zinc-950 hover:text-white hover:border-zinc-950 transition-all transform hover:-translate-y-1">
                Our Partners
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white text-zinc-800 text-[10px] font-black uppercase tracking-[0.2em] border border-zinc-200">
                <span>🥈</span><span>2nd · Regionals Porto</span>
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#f17a21] text-white text-[10px] font-black uppercase tracking-[0.2em]">
                <span>🏆</span><span>Best Enterprise Award</span>
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 40
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2
      }} className="w-full overflow-hidden" style={{
        boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 20px rgba(241,122,33,0.08)',
        borderRadius: 4
      }}>
          <img src="https://storage.googleapis.com/storage.magicpath.ai/user/344836251066699776/assets/dbfbbf74-d510-47ae-bfcf-1f3a907c34d3.jpg" className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" style={{
          aspectRatio: '21/9',
          objectFit: 'cover',
          objectPosition: '50% 50%',
          display: 'block'
        }} alt="Neevo V-Orbit Racing Car" />
        </motion.div>
      </div>

      <CountdownSection />
    </section>;
};

// ABOUT VIEW
const AboutView = () => <section className="bg-white">
    <div className="bg-[#f0ede4] py-40">
      <div className="container mx-auto px-8">
        <SectionTitle subtitle="Visionaries">who are we?</SectionTitle>
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.7
      }} className="mb-16 flex flex-col sm:flex-row gap-4">
          <div className="inline-flex items-center gap-3 px-5 py-3 border-l-4 border-[#f17a21] bg-white">
            <span className="text-xl">🥈</span>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#f17a21]">Regionals Porto 2026</p>
              <p className="text-sm font-black text-zinc-900 lowercase" style={{
              fontFamily: 'MuseoModerno, sans-serif'
            }}>2nd Place Overall</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-3 px-5 py-3 border-l-4 border-[#f17a21] bg-white">
            <span className="text-xl">🏆</span>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#f17a21]">Award · Regionals Porto 2026</p>
              <p className="text-sm font-black text-zinc-900 lowercase" style={{
              fontFamily: 'MuseoModerno, sans-serif'
            }}>Best Enterprise</p>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="mt-8">
        {VISION_MISSION_BLOCKS.map((block, i) => {
        return <motion.div key={block.type} initial={{
          opacity: 0,
          y: 50
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true,
          margin: '-80px'
        }} transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1]
        }} className="relative overflow-hidden" style={{
          backgroundColor: COLORS.bgOffWhite,
          paddingTop: '6rem',
          paddingBottom: '6rem'
        }}>
              <div className="container mx-auto px-8 relative z-10">
                <div className="max-w-5xl">
                  <motion.p initial={{
                opacity: 0,
                x: -20
              }} whileInView={{
                opacity: 1,
                x: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.15
              }} className="text-[10px] font-black uppercase tracking-[0.4em] mb-6" style={{
                color: COLORS.primary
              }}>
                    {block.eyebrow}
                  </motion.p>
                  <motion.h3 initial={{
                opacity: 0,
                y: 30
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.22,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }} className="font-black tracking-tighter leading-[0.88] lowercase mb-10" style={{
                fontFamily: 'MuseoModerno, sans-serif',
                fontSize: 'clamp(36px, 6vw, 80px)',
                color: COLORS.secondary
              }}>
                    {block.headline}
                  </motion.h3>
                  <motion.p initial={{
                opacity: 0,
                y: 16
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.3
              }} className="neevo-description text-xl leading-relaxed max-w-2xl" style={{
                color: COLORS.textMuted
              }}>
                    {block.body}
                  </motion.p>
                </div>
              </div>

              <div className="pointer-events-none select-none" style={{
            position: 'absolute',
            right: '-2%',
            bottom: '-10%',
            fontFamily: 'MuseoModerno, sans-serif',
            fontWeight: 900,
            fontSize: '22vw',
            lineHeight: 1,
            color: 'rgba(0,0,0,0.035)',
            whiteSpace: 'nowrap'
          }}>
                {String(i + 1).padStart(2, '0')}
              </div>
            </motion.div>;
      })}
      </div>
    </div>
  </section>;

// TEAM VIEW
const TeamView = () => {
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  return <section className="bg-white">
      <div className="py-40">
        <div className="container mx-auto px-8">
          <SectionTitle subtitle="The Crew">meet the team</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-zinc-100">
            {TEAM_MEMBERS.map((member: any) => <button key={member.name} onClick={() => setSelectedMember(member)} className="bg-white p-10 hover:bg-zinc-50 transition-colors group border-b border-r border-zinc-100 text-left w-full cursor-pointer">
                <div className="mb-8 overflow-hidden bg-zinc-100 group-hover:bg-white transition-all duration-700" style={{
              perspective: 600
            }}>
                  <motion.div whileHover={{
                rotateY: 8,
                rotateX: -5,
                scale: 1.04
              }} transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20
              }} style={{
                transformStyle: 'preserve-3d'
              }}>
                    <img src={member.img} className="w-full aspect-square object-cover object-top" alt={member.name} style={{
                  display: 'block'
                }} />
                    <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, transparent 60%)',
                  pointerEvents: 'none',
                  opacity: 0,
                  transition: 'opacity 0.4s'
                }} className="group-hover:opacity-100" />
                  </motion.div>
                </div>
                <p className="text-[10px] font-black tracking-[0.3em] text-[#f17a21] uppercase mb-2">{member.role}</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black lowercase" style={{
                fontFamily: 'MuseoModerno'
              }}>{member.name}</h3>
                  <span className="w-8 h-8 flex items-center justify-center bg-zinc-100 group-hover:bg-[#f17a21] group-hover:text-white transition-all duration-300 text-zinc-400 flex-shrink-0 ml-3">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </button>)}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedMember && <TeamCardModal member={selectedMember} onClose={() => setSelectedMember(null)} />}
      </AnimatePresence>
    </section>;
};

// STEM VIEW
const StemView = () => <section className="py-40 bg-white overflow-hidden">
    <div className="container mx-auto px-8">
      <SectionTitle subtitle="Technical Frontier">what is stem racing?</SectionTitle>

      <div className="grid lg:grid-cols-2 gap-32 mb-40 items-center">
        <motion.div initial={{
        opacity: 0,
        y: 40
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="space-y-8">
          <p className="neevo-description text-2xl text-zinc-500 leading-relaxed font-medium">
            STEM Racing is more than a competition; it's a global forge for the engineers of tomorrow.
          </p>
          <p className="neevo-description text-lg text-zinc-400">
            STEM Racing is not just an engineering project. It is a multidisciplinary competition that mirrors the structure and pressure of a professional Formula 1 team.
          </p>
          <p className="neevo-description text-lg text-zinc-400">
            While teams design and manufacture miniature F1-style cars, the project extends far beyond technical performance. Students operate across engineering, R&D, marketing, branding, finance, sponsorship acquisition, media production, and strategic planning.
          </p>
          <p className="neevo-description text-lg text-zinc-400">
            Success in STEM Racing requires precision, leadership, communication, and the ability to perform under pressure: competing, presenting, innovating, and executing at a professional standard.
          </p>
          <div className="pt-4">
            <a href="https://www.stemracing.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 bg-[#f17a21] text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-zinc-950 transition-all transform hover:-translate-y-1 group">
              <span>Official STEM Racing Page</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        scale: 0.9
      }} whileInView={{
        opacity: 1,
        scale: 1
      }} viewport={{
        once: true
      }} className="relative">
          {/* Radar overlay on STEM visual block */}
          <div aria-hidden="true" className="pointer-events-none select-none" style={{
          position: 'absolute',
          right: '-15%',
          top: '-20%',
          zIndex: 2
        }}>
            <RadarOverlay />
          </div>
          <div className="aspect-video overflow-hidden group" style={{
          background: '#060814'
        }}>
            <div className="w-full h-full flex items-center justify-center" style={{
            backgroundImage: 'url(https://storage.googleapis.com/storage.magicpath.ai/user/344836251066699776/assets/42500a58-6c0b-4b02-a76a-586e2887be38.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
              <div className="text-center p-12 bg-white/10 backdrop-blur-md border border-white/20">
                <p className="text-5xl font-black text-white mb-2 lowercase" style={{
                fontFamily: 'MuseoModerno',
                textShadow: '0 0 30px rgba(241,122,33,0.5)'
              }}>75km/h</p>
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#f17a21] font-black">Target Speed</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-16">
        {STEM_PILLARS.map((item: any, i: number) => <motion.div key={item.title} initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: i * 0.2
      }} viewport={{
        once: true
      }} className="group">
            <div className="w-16 h-16 flex items-center justify-center text-[#f17a21] bg-zinc-50 group-hover:bg-[#f17a21] group-hover:text-white transition-all duration-500 rounded-xl mb-8">
              {item.icon}
            </div>
            <h4 className="text-2xl font-black lowercase mb-4" style={{
          fontFamily: 'MuseoModerno'
        }}>{item.title}</h4>
            <p className="neevo-description text-zinc-500 leading-relaxed">{item.desc}</p>
          </motion.div>)}
      </div>
    </div>
  </section>;

// PARTNERS VIEW
const PartnersView = () => <section className="py-40 bg-white overflow-hidden">
    <div className="container mx-auto px-8">
      <SectionTitle subtitle="Strategic Alliance">global partners</SectionTitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-100 border border-zinc-100 mb-6">
        {PARTNERS.map((partner: any, i: number) => {
        const card = <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: i * 0.08
        }} className="group relative h-[260px] bg-white flex flex-col items-center justify-center overflow-hidden cursor-pointer">
              <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" style={{
            backgroundColor: partner.color
          }} />
              <div className="relative z-10 flex flex-col items-center gap-4 px-8 text-center">
                <span className="text-3xl font-black lowercase transition-colors duration-300 group-hover:text-white" style={{
              fontFamily: 'MuseoModerno',
              color: COLORS.secondary
            }}>
                  {partner.name}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>;
        if (partner.url) {
          return <a key={partner.name} href={partner.url} target="_blank" rel="noopener noreferrer" className="block">
                {card}
              </a>;
        }
        return <div key={partner.name}>{card}</div>;
      })}
      </div>

      <motion.div initial={{
      opacity: 0,
      y: 20
    }} whileInView={{
      opacity: 1,
      y: 0
    }} viewport={{
      once: true
    }} className="mt-32 p-20 text-white relative overflow-hidden rounded-3xl" style={{
      background: 'linear-gradient(145deg, #06060f 0%, #0a0a1e 55%, #0d0d2a 100%)'
    }}>
        <div aria-hidden="true" className="nebula-pulse pointer-events-none" style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 90% 10%, rgba(60,30,130,0.25) 0%, transparent 55%), radial-gradient(ellipse at 5% 80%, rgba(241,122,33,0.08) 0%, transparent 50%)',
        zIndex: 0,
        borderRadius: 'inherit'
      }} />
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-4xl font-black lowercase mb-6" style={{
          fontFamily: 'MuseoModerno',
          textShadow: '0 0 40px rgba(241,122,33,0.3), 0 0 80px rgba(255,255,255,0.04)'
        }}>partner with neevo</h3>
          <p className="neevo-description text-zinc-400 text-lg mb-10 leading-relaxed">
            Support the next generation of innovators. Join a network of industry leaders committed to excellence and the future of STEM.
          </p>
          <a href="mailto:neevo@clip.pt" className="inline-block px-10 py-5 bg-[#f17a21] text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-zinc-950 transition-all">
            Inquire Now
          </a>
        </div>
        <div className="absolute right-[-10%] top-[-50%] text-[20vw] font-black opacity-[0.03] rotate-12 pointer-events-none select-none lowercase">ALLIANCE</div>
      </motion.div>
    </div>
  </section>;

// CONTACT VIEW
const ContactView = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(formState.subject || 'Neevo Racing Inquiry');
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`);
    window.location.href = `mailto:neevo@clip.pt?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };
  const INFO_ITEMS = [{
    label: 'HQ',
    value: 'Colégio Luso-Internacional do Porto\nPorto, Portugal'
  }, {
    label: 'General',
    value: 'neevo@clip.pt',
    href: 'mailto:neevo@clip.pt'
  }] as any[];
  const SOCIAL_LINKS = [{
    icon: <Instagram className="w-5 h-5" />,
    label: 'Instagram',
    href: 'https://www.instagram.com/neevoracing',
    bg: 'bg-gradient-to-br from-purple-600 to-pink-500'
  }, {
    icon: <TikTokIcon />,
    label: 'TikTok',
    href: 'https://www.tiktok.com/@neevoracing',
    bg: 'bg-zinc-900'
  }, {
    icon: <Youtube className="w-5 h-5" />,
    label: 'YouTube',
    href: 'https://www.youtube.com/@NeevoRacing',
    bg: 'bg-red-600'
  }] as any[];
  return <section className="py-40 bg-white">
      <div className="container mx-auto px-8">
        <SectionTitle subtitle="Inquiries">contact us</SectionTitle>

        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-16">
            {INFO_ITEMS.map((item: any) => <motion.div key={item.label} initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }}>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">{item.label}</p>
                {item.href ? <a href={item.href} className="neevo-description text-xl text-zinc-950 font-bold hover:text-[#f17a21] transition-colors whitespace-pre-line">{item.value}</a> : <p className="neevo-description text-xl text-zinc-950 font-bold whitespace-pre-line">{item.value}</p>}
              </motion.div>)}

            <motion.div initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} className="pt-8 border-t border-zinc-100">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 mb-3">Follow the Journey</p>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map((s: any) => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={`${s.bg} text-white w-14 h-14 flex items-center justify-center hover:scale-110 transition-transform group`} aria-label={s.label}>
                    {s.icon}
                  </a>)}
              </div>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} className="p-10 bg-[#f0ede4]">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-3">Response time</p>
              <p className="text-2xl font-black lowercase" style={{
              fontFamily: 'MuseoModerno'
            }}>within 48 hours</p>
              <p className="neevo-description text-sm text-zinc-500 mt-2">We take every message seriously and aim to respond promptly.</p>
            </motion.div>
          </div>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }}>
            {submitted ? <div className="h-full flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 bg-[#f17a21] flex items-center justify-center mb-8">
                    <ChevronRight className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-black lowercase mb-4" style={{
              fontFamily: 'MuseoModerno, sans-serif'
            }}>transmission sent</h3>
                  <p className="neevo-description text-zinc-500">Your email client should open momentarily. We will be in touch soon.</p>
                </div> : <form className="space-y-10" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Name</label>
                      <input name="name" type="text" value={formState.name} onChange={handleChange} required className="w-full border-b-2 border-zinc-200 py-4 bg-transparent focus:border-[#f17a21] outline-none transition-colors neevo-description text-zinc-900" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Email</label>
                      <input name="email" type="email" value={formState.email} onChange={handleChange} required className="w-full border-b-2 border-zinc-200 py-4 bg-transparent focus:border-[#f17a21] outline-none transition-colors neevo-description text-zinc-900" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Subject</label>
                    <input name="subject" type="text" value={formState.subject} onChange={handleChange} className="w-full border-b-2 border-zinc-200 py-4 bg-transparent focus:border-[#f17a21] outline-none transition-colors neevo-description text-zinc-900" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">Message</label>
                    <textarea name="message" rows={5} value={formState.message} onChange={handleChange} required className="w-full border-b-2 border-zinc-200 py-4 bg-transparent focus:border-[#f17a21] outline-none transition-colors neevo-description text-zinc-900 resize-none" />
                  </div>
                  <button type="submit" className="w-full py-6 bg-zinc-950 text-white font-black uppercase tracking-widest text-xs hover:bg-[#f17a21] transition-all transform hover:-translate-y-1">
                    Send Transmission
                  </button>
                </form>}
          </motion.div>
        </div>
      </div>
    </section>;
};

// TEAM CARD MODAL
const TeamCardModal = ({
  member,
  onClose
}: {
  member: any;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);
  return <AnimatePresence>
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} transition={{
      duration: 0.3
    }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8" style={{
      backgroundColor: 'rgba(0,0,0,0.88)',
      backdropFilter: 'blur(10px)'
    }} onClick={onClose}>
        <motion.div initial={{
        opacity: 0,
        scale: 0.88,
        y: 40
      }} animate={{
        opacity: 1,
        scale: 1,
        y: 0
      }} exit={{
        opacity: 0,
        scale: 0.88,
        y: 40
      }} transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }} onClick={e => e.stopPropagation()} className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{
        background: 'linear-gradient(145deg, #07071a 0%, #0a0a1e 60%, #0d0d2b 100%)',
        border: '1.5px solid rgba(241,122,33,0.7)',
        boxShadow: '0 0 0 1px rgba(241,122,33,0.12), 0 40px 80px rgba(0,0,0,0.8), 0 0 60px rgba(241,122,33,0.08), inset 0 1px 0 rgba(255,255,255,0.06)'
      }}>
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#f17a21]" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#f17a21]" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#f17a21]" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#f17a21]" />

          {/* Space nebula gradient inside modal */}
          <div aria-hidden="true" className="pointer-events-none nebula-pulse" style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 75% 0%, rgba(60,20,140,0.28) 0%, transparent 55%), radial-gradient(ellipse at 10% 100%, rgba(241,122,33,0.06) 0%, transparent 45%)',
          zIndex: 0
        }} />

          <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 relative z-10" style={{
          background: 'rgba(241,122,33,0.1)'
        }}>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#f17a21]">Neevo Racing</span>
              <span className="w-1 h-1 rounded-full bg-[#f17a21]" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-500">SEASON 2026</span>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all" aria-label="Close">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row relative z-10">
            <div className="md:w-[45%] relative overflow-hidden flex-shrink-0">
              <div className="absolute top-4 left-4 z-20">
                <span className="text-5xl font-black leading-none" style={{
                fontFamily: 'MuseoModerno',
                color: 'rgba(241,122,33,0.25)'
              }}>
                  {member.number}
                </span>
              </div>
              <img src={member.img} alt={member.name} className="w-full aspect-[3/4] object-cover object-top" style={{
              filter: 'grayscale(20%) contrast(1.05)'
            }} />
              <div className="absolute inset-0" style={{
              background: 'linear-gradient(to top, #07071a 0%, transparent 60%)'
            }} />
              <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 z-10">
                <p className="text-[9px] font-black tracking-[0.35em] uppercase mb-1" style={{
                color: '#f17a21'
              }}>{member.role}</p>
                <h2 className="text-2xl font-black text-white leading-tight lowercase" style={{
                fontFamily: 'MuseoModerno',
                textShadow: '0 0 20px rgba(241,122,33,0.3)'
              }}>{member.name}</h2>
              </div>
            </div>

            <div className="md:w-[55%] flex flex-col p-6 gap-6 border-t md:border-t-0 md:border-l border-white/10">
              <div>
                <p className="text-[9px] font-black tracking-[0.3em] uppercase text-zinc-500 mb-2">Profile</p>
                <p className="text-sm text-zinc-300 leading-relaxed" style={{
                fontFamily: 'Inter, sans-serif'
              }}>{member.bio}</p>
              </div>

              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-3">Specialisms</p>
                <div className="flex flex-wrap gap-2">
                  {member.tags.map((tag: string) => <span key={tag} className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5" style={{
                  border: '1px solid rgba(241,122,33,0.4)',
                  color: '#f17a21',
                  background: 'rgba(241,122,33,0.08)'
                }}>
                      {tag}
                    </span>)}
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-3 h-3 fill-[#f17a21] text-[#f17a21]" />
                  <Star className="w-3 h-3 fill-[#f17a21] text-[#f17a21]" />
                  <Star className="w-3 h-3 fill-[#f17a21] text-[#f17a21]" />
                  <Star className="w-3 h-3 fill-[#f17a21] text-[#f17a21]" />
                  <Star className="w-3 h-3 fill-[#f17a21] text-[#f17a21]" />
                </div>
                <span className="text-[9px] font-black tracking-[0.3em] uppercase text-zinc-600">NEEVO Racing Regional</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>;
};