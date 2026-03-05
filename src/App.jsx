import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, ChevronRight, Crown, Plus, ShieldCheck, Star, Terminal, Trophy, X, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

gsap.registerPlugin(ScrollTrigger);

const Navbar = ({ onOpenModal }) => {
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        navRef.current.classList.add('bg-background/80', 'backdrop-blur-xl', 'border', 'border-slate/10', 'shadow-lg');
        navRef.current.classList.remove('bg-transparent', 'text-background');
        navRef.current.classList.add('text-primary');
      } else {
        navRef.current.classList.remove('bg-background/80', 'backdrop-blur-xl', 'border', 'border-slate/10', 'shadow-lg', 'text-primary');
        navRef.current.classList.add('bg-transparent', 'text-background');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 w-full transition-all duration-500">
      <nav ref={navRef} className="flex items-center justify-between px-8 py-4 rounded-[2rem] w-full max-w-5xl transition-all duration-500 bg-transparent text-background">
        <div className="font-heading font-bold text-xl tracking-tight">Project Asya</div>
        <div className="hidden md:flex gap-8 font-medium text-sm">
          <a href="#features" className="hover:text-accent transition-colors lift-on-hover inline-block">Victories</a>
          <a href="#hall-of-fame" className="hover:text-accent transition-colors lift-on-hover inline-block">Hall of Fame</a>
          <a href="#protocol" className="hover:text-accent transition-colors lift-on-hover inline-block">Protocol</a>
        </div>
        <button onClick={onOpenModal} className="magnetic-btn relative overflow-hidden bg-accent text-primary px-6 py-2.5 rounded-full font-semibold text-sm group">
          <span className="relative z-10 flex items-center gap-2">Log Victory <Plus size={16} /></span>
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></span>
        </button>
      </nav>
    </div>
  );
};

const Hero = ({ onOpenModal }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-anim',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden flex items-end pb-24 px-8 md:px-16 lg:px-24">
      {/* Background Image & Gradient overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1616400619175-5beda3a17896?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-primary via-primary/80 to-primary/20" />

      <div className="relative z-10 max-w-4xl">
        <div className="flex flex-col gap-2">
          <div className="hero-anim inline-block px-4 py-1.5 rounded-full border border-accent/30 text-accent font-data text-xs uppercase tracking-widest mb-6 w-max bg-accent/5 backdrop-blur-md">
            System Operational • All Systems Go
          </div>
          <h1 className="text-background hero-anim leading-[1.1]">
            <span className="block font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-white/90">
              Brilliance meets
            </span>
            <span className="block font-drama italic text-7xl md:text-8xl lg:text-9xl text-accent mt-2 pr-4">
              Mastery.
            </span>
          </h1>
          <p className="hero-anim text-background/70 font-sans text-lg md:text-xl max-w-xl mt-8 leading-relaxed">
            A private, elegant space dedicated to celebrating her academic brilliance, visualizing hard-earned progress, and serving as a permanent reminder of capabilities.
          </p>
          <div className="hero-anim mt-10">
            <button onClick={onOpenModal} className="magnetic-btn bg-accent text-primary px-8 py-4 rounded-[2rem] font-bold text-lg inline-flex items-center gap-3 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]">
              Log a New Victory <Zap fill="currentColor" size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const DiagnosticShuffler = () => {
  const [cards, setCards] = useState([
    { id: 1, title: 'Consistency Proven', desc: 'Flawless 5s in heavy subjects like Climate Change.' },
    { id: 2, title: 'Undeniable Growth', desc: 'Transforming stressful exams into beautiful proof.' },
    { id: 3, title: 'Visualized Brilliance', desc: 'An elegant display of hard-earned progress.' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newCards = [...prev];
        const last = newCards.pop();
        newCards.unshift(last);
        return newCards;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[250px] w-full flex justify-center items-center mt-6">
      {cards.map((c, i) => {
        const isTop = i === 0;
        return (
          <div
            key={c.id}
            className={`absolute w-full max-w-sm p-6 rounded-[2rem] border border-slate/10 bg-background shadow-xl ${isTop ? 'ring-1 ring-accent/30' : ''}`}
            style={{
              zIndex: 3 - i,
              transform: `translateY(${i * 12}px) scale(${1 - i * 0.05})`,
              opacity: 1 - (i * 0.3),
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-accent">
                <Trophy size={20} />
              </div>
              <span className="font-data text-xs text-slate/50">ID-{c.id}</span>
            </div>
            <h4 className="font-heading font-bold text-xl text-primary mb-2">{c.title}</h4>
            <p className="text-slate/70 text-sm leading-relaxed">{c.desc}</p>
          </div>
        )
      })}
    </div>
  );
};

const TelemetryTypewriter = () => {
  const [text, setText] = useState('');
  const fullText = "SYSTEM UPDATE: The Straight 5 Trend active.\n\nAnalyzing Winter 2025/26...\n-> Climate Change: 5.0\n-> Demography: 5.0\n-> Int. Cultural Relations: 5.0\n\nMultilingual Powerhouse: Arabic, Polish & German engaged concurrently.\n\nSTATUS: Exceptional.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          index = 0; // In a real app we might loop, but holding it is fine
        }, 5000);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full mt-6 bg-primary text-background p-6 rounded-[2rem] border border-slate/20 shadow-inner overflow-hidden relative">
      <div className="flex items-center gap-2 mb-4 border-b border-slate/20 pb-4">
        <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"></div>
        <span className="font-data text-xs tracking-widest text-accent uppercase flex-1">Live Telemetry Feed</span>
        <Terminal size={14} className="text-slate/50" />
      </div>
      <div className="font-data text-sm text-background/80 whitespace-pre-line leading-relaxed h-[160px]">
        {text}
        <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse align-middle"></span>
      </div>
    </div>
  );
};

const CursorProtocol = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      tl.set('.cursor-svg', { x: 0, y: 0, opacity: 0, scale: 1 })
        .to('.cursor-svg', { opacity: 1, duration: 0.3 })
        .to('.cursor-svg', { x: 140, y: 60, duration: 1, ease: 'power2.inOut' })
        .to('.cursor-svg', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to('.day-cell-thurs', { backgroundColor: '#C9A84C', color: '#0D0D12', duration: 0.2 }, "-=0.2")
        .to('.cursor-svg', { x: 250, y: 150, duration: 0.8, ease: 'power2.inOut', delay: 0.4 })
        .to('.cursor-svg', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to('.save-btn', { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 }, "-=0.1")
        .to('.cursor-svg', { opacity: 0, duration: 0.3, delay: 0.5 })
        .to('.day-cell-thurs', { backgroundColor: 'transparent', color: 'inherit', duration: 0.5 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div ref={containerRef} className="w-full mt-6 relative bg-background p-6 rounded-[2rem] border border-slate/10 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <span className="font-heading font-semibold text-primary">Schedule Victory</span>
        <Calendar size={18} className="text-slate/40" />
      </div>

      <div className="grid grid-cols-7 gap-2 mb-8">
        {days.map((d, i) => (
          <div key={i} className={`aspect-square rounded-xl flex items-center justify-center font-data text-sm font-medium border border-slate/10 text-slate/60 ${i === 4 ? 'day-cell-thurs' : ''}`}>
            {d}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <div className="save-btn px-4 py-2 bg-primary text-background rounded-full text-xs font-bold font-heading">
          Save Action
        </div>
      </div>

      {/* Fake cursor */}
      <div className="cursor-svg absolute top-0 left-0 w-6 h-6 z-10 pointer-events-none drop-shadow-md" style={{ color: '#C9A84C' }}>
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="white" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4L11.5 21l3.5-7.5L22 10L4 4z" />
        </svg>
      </div>
    </div>
  );
};

const Features = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.feature-anim',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={containerRef} className="py-32 px-8 md:px-16 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 feature-anim">
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight mb-4">Interactive Functional Artifacts</h2>
          <p className="font-sans text-slate/70 max-w-2xl mx-auto text-lg">Metrics designed not for stress, but as beautiful proof of your consistency and capabilities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature-anim flex flex-col">
            <h3 className="font-heading font-bold text-2xl text-primary mb-2">Visualized Brilliance</h3>
            <p className="text-slate/60 mb-6 flex-1">Transforming academic results into undeniable proof of your consistency.</p>
            <DiagnosticShuffler />
          </div>
          <div className="feature-anim flex flex-col">
            <h3 className="font-heading font-bold text-2xl text-primary mb-2">Milestone Celebrations</h3>
            <p className="text-slate/60 mb-6 flex-1">Highlighting specific superpowers and complex theories mastered.</p>
            <TelemetryTypewriter />
          </div>
          <div className="feature-anim flex flex-col">
            <h3 className="font-heading font-bold text-2xl text-primary mb-2">Instant Motivation</h3>
            <p className="text-slate/60 mb-6 flex-1">A permanent reminder of your capabilities precisely when you need it.</p>
            <CursorProtocol />
          </div>
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.phil-text-1', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: '.phil-text-1', start: 'top 80%' } });
      gsap.fromTo('.phil-text-2', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', scrollTrigger: { trigger: '.phil-text-2', start: 'top 70%' } });

      gsap.to('.parallax-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-40 overflow-hidden bg-primary w-full flex items-center justify-center border-y border-accent/20">
      <div
        className="parallax-bg absolute inset-0 z-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1585661417298-8236a5f449aa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', height: '130%', top: '-15%' }}
      />
      <div className="relative z-10 max-w-5xl mx-auto px-8 text-center flex flex-col items-center gap-8">
        <p className="phil-text-1 font-sans text-background/60 text-xl md:text-2xl font-light tracking-wide uppercase">
          Most stress focuses on: temporary setbacks.
        </p>
        <h2 className="phil-text-2 font-heading font-bold text-5xl md:text-7xl lg:text-8xl text-background tracking-tighter leading-[1.1]">
          We focus on: <br />
          <span className="font-drama italic text-accent font-normal">undeniable brilliance.</span>
        </h2>
      </div>
    </section>
  );
};

const ProtocolCard = ({ index, title, desc, visual }) => {
  return (
    <div className={`protocol-card w-full h-[100vh] flex items-center justify-center sticky top-0`} style={{ zIndex: index }}>
      <div className="w-full max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center bg-background rounded-[3rem] p-12 md:p-20 shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-slate/10 overflow-hidden relative">
        <div className="relative z-10">
          <div className="font-data text-accent text-lg mb-6 border border-accent/30 px-4 py-1.5 rounded-full inline-block bg-accent/5">
            Phase 0{index}
          </div>
          <h2 className="font-heading font-bold text-5xl md:text-6xl text-primary mb-6">{title}</h2>
          <p className="font-sans text-xl text-slate/60 leading-relaxed max-w-lg">{desc}</p>
        </div>
        <div className="relative z-10 h-full min-h-[300px] flex items-center justify-center">
          {visual}
        </div>
      </div>
    </div>
  );
};

const Protocol = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');

      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          gsap.to(card.querySelector('.bg-background'), {
            scale: 0.9,
            opacity: 0.4,
            filter: 'blur(10px)',
            scrollTrigger: {
              trigger: cards[i + 1],
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            }
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={containerRef} className="relative bg-[#EAE7DF] pb-24">
      {/* Background stays a slightly darker ivory to make cards pop */}

      <ProtocolCard
        index={1}
        title="Log a New Victory"
        desc="Immortalize your hard work. Every submitted exam is a milestone encoded into your Hall of Fame."
        visual={
          <div className="w-64 h-64 border-4 border-accent rounded-full flex items-center justify-center relative animate-[spin_20s_linear_infinite]">
            <div className="absolute inset-4 border-2 border-dashed border-primary/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
            <div className="absolute inset-12 border border-primary/40 rounded-full"></div>
            <Star className="text-accent absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" size={48} />
          </div>
        }
      />
      <ProtocolCard
        index={2}
        title="View Hall of Fame"
        desc="Witness your trajectory. A pristine visualization of languages mastered and theories conquered."
        visual={
          <div className="w-full h-64 bg-primary/5 rounded-[2rem] relative overflow-hidden flex flex-col justify-center gap-4 px-8 border border-primary/10">
            <div className="w-full h-8 bg-primary/10 rounded-full relative overflow-hidden">
              <div className="absolute top-0 bottom-0 left-0 w-1/3 bg-accent/80 rounded-full"></div>
            </div>
            <div className="w-3/4 h-8 bg-primary/10 rounded-full relative overflow-hidden">
              <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-accent/80 rounded-full"></div>
            </div>
            <div className="w-full h-[2px] bg-accent/50 absolute top-1/2 left-0 shadow-[0_0_10px_#C9A84C] animate-[bounce_3s_infinite_alternate]"></div>
          </div>
        }
      />
      <ProtocolCard
        index={3}
        title="Claim Your Reward"
        desc="Acknowledge your brilliance. Because grinding through finals deserves a high-end celebration."
        visual={
          <div className="w-full h-64 flex items-center justify-center">
            <svg viewBox="0 0 200 100" className="w-full h-full text-accent drop-shadow-[0_0_8px_rgba(201,168,76,0.6)]">
              <path
                d="M 0 50 L 40 50 L 50 20 L 70 90 L 90 10 L 110 80 L 120 50 L 200 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-[dash_3s_linear_infinite]"
                style={{ strokeDasharray: 400, strokeDashoffset: 400 }}
              />
              <style>{`
                @keyframes dash {
                  to { stroke-dashoffset: 0; }
                }
              `}</style>
            </svg>
          </div>
        }
      />
    </section>
  );
};

const HallOfFame = ({ grades, historyData, openModal, average }) => {
  const rewardUnlocked = average >= 4.5;

  return (
    <section id="hall-of-fame" className="py-32 px-8 md:px-16 lg:px-24 bg-primary text-background relative overflow-hidden">
      {/* Decorative backdrop elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-data text-sm uppercase tracking-widest mb-6">
            <Crown size={16} /> Elite Archive
          </div>
          <h2 className="font-heading font-bold text-4xl md:text-6xl tracking-tight mb-6">The Straight 5 Trend</h2>
          <p className="font-sans text-xl text-background/60 max-w-2xl mx-auto">A visual record of uncompromising mastery across international relations, demography, and global languages.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {grades.map((item, i) => (
            <div key={i} className="group p-8 rounded-[2rem] bg-background/5 border border-background/10 hover:border-accent/40 hover:bg-background/10 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-[240px]">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>

              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="font-data text-xs text-background/50 border border-background/20 px-3 py-1 rounded-full uppercase tracking-wider">{item.category}</span>
                  <div className="font-data text-xl text-accent font-bold group-hover:drop-shadow-[0_0_12px_rgba(201,168,76,0.8)] transition-all flex items-center gap-1">
                    <Star size={16} fill="currentColor" /> {parseFloat(item.grade).toFixed(1)}
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-xl leading-snug group-hover:text-white transition-colors text-background/90">{item.name}</h3>
              </div>

              <div className="flex justify-between items-center border-t border-background/10 pt-4 mt-4">
                <span className="font-data text-sm text-background/40">{item.ects} ECTS</span>
                <button className="text-accent opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ))}

          <div onClick={openModal} className="p-8 rounded-[2rem] bg-accent/10 border-2 border-dashed border-accent/30 text-accent flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-accent hover:text-primary transition-all duration-300 h-[240px]">
            <Plus size={40} className="mb-4" />
            <h3 className="font-heading font-bold text-2xl mb-2">Log Victory</h3>
            <p className="font-sans opacity-70 text-sm">Add a new grade to the archive.</p>
          </div>
        </div>

        {/* Grade History Graph and Reward Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 bg-background/5 p-8 rounded-[3rem] border border-background/10">
          <div className="col-span-1 lg:col-span-2 relative h-[300px]">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"></div>
              <h3 className="font-heading font-bold text-xl text-white">Weighted GPA Trajectory</h3>
            </div>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={historyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="semester" stroke="currentColor" className="text-background/40 font-data text-xs" tickLine={false} axisLine={false} />
                <YAxis domain={[3.5, 5.0]} stroke="currentColor" className="text-background/40 font-data text-xs" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0D0D12', borderColor: '#2A2A35', borderRadius: '1rem', color: '#FAF8F5' }}
                  itemStyle={{ color: '#C9A84C', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="gpa" stroke="#C9A84C" strokeWidth={3} fillOpacity={1} fill="url(#colorGpa)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="col-span-1 flex flex-col justify-center gap-6 border-t lg:border-t-0 lg:border-l border-background/10 pt-8 lg:pt-0 lg:pl-8">
            <div className="text-center">
              <span className="font-data text-sm uppercase tracking-widest text-background/50 mb-2 block">Current Average</span>
              <div className="font-heading font-bold text-6xl text-white mb-2">{average.toFixed(2)}</div>
              <p className="text-accent text-sm flex items-center justify-center gap-1"><Star size={14} fill="currentColor" /> Elite Standing</p>
            </div>

            <button
              className={`magnetic-btn w-full py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all ${rewardUnlocked ? 'bg-accent text-primary shadow-[0_0_20px_rgba(201,168,76,0.4)]' : 'bg-background/10 text-background/40 cursor-not-allowed border border-background/20'}`}
              disabled={!rewardUnlocked}
              onClick={() => rewardUnlocked && alert("Reward Unlocked: Fancy Dinner Achieved! 🎉")}
            >
              {rewardUnlocked ? <><Crown size={20} /> Claim Reward: Dinner!</> : 'Requires 4.5+ Average'}
            </button>
            {!rewardUnlocked && <p className="text-center text-xs text-background/40">Log more victories to unlock the celebration.</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#08080A] rounded-t-[4rem] text-background pt-24 pb-12 px-8 md:px-16 lg:px-24 mt-[-4rem] relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-background/10 pb-16">
        <div className="col-span-1 md:col-span-2">
          <h2 className="font-heading font-bold text-3xl tracking-tight mb-4 flex items-center gap-3">
            Project Asya <ShieldCheck className="text-accent" />
          </h2>
          <p className="text-background/50 max-w-sm font-sans leading-relaxed">
            A private dashboard architected to celebrate academic brilliance and visualize hard-earned progress.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-lg mb-6 text-white/90">Navigation</h4>
          <ul className="space-y-4 font-sans text-background/60">
            <li><a href="#features" className="hover:text-accent transition-colors">Visualized Brilliance</a></li>
            <li><a href="#protocol" className="hover:text-accent transition-colors">Protocol Phase</a></li>
            <li><a href="#hall-of-fame" className="hover:text-accent transition-colors">Hall of Fame</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-lg mb-6 text-white/90">Authentication</h4>
          <ul className="space-y-4 font-sans text-background/60">
            <li><a href="#" className="hover:text-accent transition-colors">Secure Login</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Data Privacy</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mt-12 gap-8">
        <div className="flex items-center gap-3 px-4 py-2 bg-background/5 rounded-full border border-background/10">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
          <span className="font-data text-xs tracking-widest uppercase text-background/50">System Operational</span>
        </div>
        <p className="font-sans text-sm text-background/40">
          © 2026 Project Asya. Midnight Luxe Edition.
        </p>
      </div>
    </footer>
  );
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Restored actual 5.0 grades for motivation; remaining data uses scrubbed placeholders
  const initialGrades = [
    // Winter 25/26
    { name: "Climate Change, Pandemics and Int. Security", grade: "5.0", ects: 5, category: "High Impact", semester: 'Winter 25/26' },
    { name: "Demography in International Relations", grade: "5.0", ects: 3, category: "Core", semester: 'Winter 25/26' },
    { name: "International Cultural Relations", grade: "5.0", ects: 5, category: "High Impact", semester: 'Winter 25/26' },
    { name: "Polish language course - elementary A1", grade: "5.0", ects: 4, category: "Language", semester: 'Winter 25/26' },
    { name: "Systems Thinking Lab", grade: "4.0", ects: 4, category: "Core", semester: 'Winter 25/26' },
    { name: "Quantitative Methods", grade: "4.0", ects: 5, category: "Core", semester: 'Winter 25/26' },
    { name: "Foundational Practicum", grade: "3.0", ects: 6, category: "Foundation", semester: 'Winter 25/26' },

    // Summer 24/25
    { name: "Migration Movement and Integration", grade: "5.0", ects: 5, category: "Core", semester: 'Summer 24/25' },
    { name: "European Union military capabilities", grade: "5.0", ects: 4, category: "Core", semester: 'Summer 24/25' },
    { name: "Crisis Simulation", grade: "4.0", ects: 4, category: "Core", semester: 'Summer 24/25' },
    { name: "Applied Research Design", grade: "4.0", ects: 3, category: "Core", semester: 'Summer 24/25' },
    { name: "Data Architecture", grade: "4.0", ects: 4, category: "Core", semester: 'Summer 24/25' },
    { name: "Introductory Language", grade: "4.0", ects: 2, category: "Language", semester: 'Summer 24/25' },
    { name: "Organizational Psychology", grade: "4.0", ects: 3, category: "Core", semester: 'Summer 24/25' },
    { name: "Macroeconomics", grade: "3.5", ects: 5, category: "Core", semester: 'Summer 24/25' },

    // Winter 24/25
    { name: "The Study of International Relations", grade: "5.0", ects: 5, category: "Foundation", semester: 'Winter 24/25' },
    { name: "Political and Economic Geography", grade: "4.5", ects: 4, category: "Core", semester: 'Winter 24/25' },
    { name: "Philanthropy and International Organisations", grade: "4.5", ects: 4, category: "Core", semester: 'Winter 24/25' },
    { name: "Arabic language - lower beginner level", grade: "4.5", ects: 2, category: "Language", semester: 'Winter 24/25' },
    { name: "Information and Communication Technologies", grade: "4.5", ects: 2, category: "Tech", semester: 'Winter 24/25' },
    { name: "Historical Paradigms", grade: "4.0", ects: 5, category: "Core", semester: 'Winter 24/25' },
    { name: "Legal Frameworks", grade: "4.0", ects: 4, category: "Foundation", semester: 'Winter 24/25' },
    { name: "Diversity and Inclusion", grade: "4.0", ects: 2, category: "Core", semester: 'Winter 24/25' },
  ];

  const [grades, setGrades] = useState(initialGrades);
  const [newGrade, setNewGrade] = useState({ name: '', grade: '5.0', ects: '5', category: 'Core', semester: 'Winter 25/26' });

  // Helper to calculate weighted average
  const calculateGPA = (gradeList) => {
    const totalWeighted = gradeList.reduce((acc, curr) => acc + (parseFloat(curr.grade) * parseInt(curr.ects)), 0);
    const totalECTS = gradeList.reduce((acc, curr) => acc + parseInt(curr.ects), 0);
    return totalECTS > 0 ? (totalWeighted / totalECTS) : 0;
  };

  const currentAverage = calculateGPA(grades);

  // Calculate history data accurately
  const getHistoryData = () => {
    const semesters = ['Winter 24/25', 'Summer 24/25', 'Winter 25/26'];
    let cumulativeGrades = [];
    const history = [];

    semesters.forEach(sem => {
      const semGrades = grades.filter(g => g.semester === sem);
      cumulativeGrades = [...cumulativeGrades, ...semGrades];
      history.push({
        semester: sem,
        gpa: Number(calculateGPA(cumulativeGrades).toFixed(2))
      });
    });
    return history;
  };

  const historyData = getHistoryData();

  const handleAddGrade = (e) => {
    e.preventDefault();
    if (newGrade.name) {
      setGrades([{ ...newGrade }, ...grades]);
      setNewGrade({ name: '', grade: '5.0', ects: '5', category: 'Core', semester: 'Winter 25/26' });
      setIsModalOpen(false);
    }
  };

    // Only display the 5.0 grades in the cards to maintain motivation
  const displayGrades = grades.filter(g => parseFloat(g.grade) >= 4.5);

  return (
    <div className="bg-background min-h-screen text-slate selection:bg-accent selection:text-primary relative">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <Features />
      <Philosophy />
      <Protocol />
      <HallOfFame grades={displayGrades} historyData={historyData} average={currentAverage} openModal={() => setIsModalOpen(true)} />
      <Footer />

      {/* Log Victory Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-[#0D0D12] border border-slate/20 rounded-[2rem] p-8 w-full max-w-md shadow-2xl text-background">
            <button className="absolute top-6 right-6 text-slate/40 hover:text-white transition-colors" onClick={() => setIsModalOpen(false)}>
              <X size={24} />
            </button>
            <h3 className="font-heading font-bold text-3xl mb-2 mt-4 text-white">Log Victory</h3>
            <p className="font-sans text-background/50 mb-8 text-sm">Add a new academic achievement to the archive.</p>

            <form onSubmit={handleAddGrade} className="space-y-4">
              <div>
                <label className="font-data text-xs uppercase tracking-wider text-accent mb-2 block">Course Title</label>
                <input
                  type="text"
                  value={newGrade.name}
                  onChange={e => setNewGrade({ ...newGrade, name: e.target.value })}
                  className="w-full bg-background/5 border border-background/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="e.g. Public International Law"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-data text-xs uppercase tracking-wider text-accent mb-2 block">Grade</label>
                  <select
                    value={newGrade.grade}
                    onChange={e => setNewGrade({ ...newGrade, grade: e.target.value })}
                    className="w-full bg-background/5 border border-background/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 appearance-none"
                  >
                    <option value="5.0">5.0</option>
                    <option value="4.5">4.5</option>
                    <option value="4.0">4.0</option>
                    <option value="3.5">3.5</option>
                    <option value="3.0">3.0</option>
                  </select>
                </div>
                <div>
                  <label className="font-data text-xs uppercase tracking-wider text-accent mb-2 block">ECTS Points</label>
                  <input
                    type="number"
                    min="1" max="10"
                    value={newGrade.ects}
                    onChange={e => setNewGrade({ ...newGrade, ects: e.target.value })}
                    className="w-full bg-background/5 border border-background/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50"
                  />
                </div>
              </div>
              <button type="submit" className="w-full magnetic-btn bg-accent text-primary font-bold rounded-xl py-4 mt-4 text-lg hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]">
                Encode to Archive
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
