import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Calendar, Clock, Send, ChevronDown } from "lucide-react";

const INVITATION = {
  couple: {
    bride: "උදාරා",
    groom: "විනෝද්",
    brideFull: "උදාරා",
    groomFull: "විනෝද්",
  },
  date: {
    displayNumeric: "18 . 07 . 2026",
    displayLong: "18 ජූලි 2026",
    countdownTarget: "2026-07-18T19:00:00+05:30",
  },
  time: {
    ceremonyStart: "රාත්‍රී 7.00",
    ceremonyEnd: "රාත්‍රී 11.30",
    registration: "රාත්‍රී 7.00",
    welcome: "රාත්‍රී 7.00",
  },
  venue: {
    name: "Elaine Hotel",
    city: "Monaragala",
    mapQuery: "Elaine Hotel, Old Market Road, Monaragala",
    googleMapsLink: "https://maps.app.goo.gl/PL4ghENVRBLuY4zXA",
  },
  rsvpContacts: ["විනෝද්: 071-XXXXXXX", "උදාරා: 071-XXXXXXX"],
} as const;

const backgroundMusic = "/sinhanada.net-Thawthisa-Lowen-Ashen-Sheenadi-Wedding-Song.mp3";
const googleScriptUrl =
  "https://script.google.com/macros/s/AKfycbzTifZgaIK4zdSwoQVPO61jUgf8Jd_DUQqQ7p5SJn6eLYT1FpqevUYfMWHckn_KyoWBJg/exec";

const HERO_BACKGROUND_IMAGE = "/ChatGPT Image May 14, 2026, 03_15_02 PM.png";
const DETAILS_BACKGROUND_IMAGE = "/ChatGPT Image May 22, 2026, 12_26_02 AM.png";
const TIMELINE_BACKGROUND_IMAGE = "/ChatGPT Image May 22, 2026, 12_28_21 AM.png";
const WISHES_BACKGROUND_IMAGE = "/ChatGPT Image May 14, 2026, 03_54_56 PM.png";

function FloatingPetals() {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [petals, setPetals] = useState<
    Array<{
      id: number;
      x: number;
      size: number;
      rotation: number;
      duration: number;
      delay: number;
      color: string;
      drift: number;
    }>
  >([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    setIsLowPowerMode(reduceMotion || isMobile);

    if (reduceMotion) {
      setPetals([]);
      return;
    }

    const colors = ["#fde047", "#fef08a", "#8c6b2b", "#d4af37", "#fef08a"];
    const petalCount = isMobile ? 10 : 18;

    const newPetals = Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 7 + 7,
      rotation: Math.random() * 360,
      duration: Math.random() * 11 + 16,
      delay: Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: Math.random() * 24 - 12,
    }));

    setPetals(newPetals);
  }, []);

  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden z-40 ${isLowPowerMode ? "opacity-70" : ""}`}>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute drop-shadow-[0_2px_10px_rgba(195,14,89,0.3)]"
          style={{ color: petal.color }}
          initial={{
            x: `${petal.x}vw`,
            y: "-10vh",
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: `${petal.x + petal.drift}vw`,
            rotate: petal.rotation + (isLowPowerMode ? 360 : 720),
            opacity: [0, 0.9, 0.8, 0],
          }}
          transition={{
            duration: isLowPowerMode ? petal.duration * 1.2 : petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <svg width={petal.size} height={petal.size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2C12,2 10,6 10,10C10,14 12,22 12,22C12,22 14,14 14,10C14,6 12,2 12,2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function CountdownTimer({ isDark = false }: { isDark?: boolean }) {
  const targetDate = new Date(INVITATION.date.countdownTarget).getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate - Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const stats = [
    { label: "දින", value: days, en: "DAYS" },
    { label: "පැය", value: hours, en: "HOURS" },
    { label: "මිනිත්තු", value: minutes, en: "MINS" },
    { label: "තත්පර", value: seconds, en: "SECS" },
  ];

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-8 justify-center w-full max-w-4xl mx-auto mt-8 md:mt-16 z-20 px-2">
      {stats.map((stat, i) => (
        <motion.div
          key=<span className="inline-flex flex-col items-center gap-0.5"><span className="text-[0.8em] md:text-[0.65em] uppercase opacity-80">{stat.en}</span><span>{stat.label}</span></span>
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, type: "spring", stiffness: 80 }}
          className="relative group"
        >
          <div
            className={`relative w-[4.5rem] h-[6.5rem] sm:w-20 sm:h-28 md:w-32 md:h-44 rounded-t-full shadow-[0_15px_35px_-10px_rgba(0,0,0,0.15)] border flex flex-col items-center justify-center overflow-hidden transition-all duration-700 group-hover:-translate-y-3 ${isDark ? "bg-[#8c6b2b] border-white/20" : "bg-white border-sky-100/60"
              }`}
          >
            <div
              className={`absolute inset-1.5 sm:inset-2 md:inset-3 border-[0.5px] rounded-t-full pointer-events-none ${isDark ? "border-white/30" : "border-theme-300/50"
                }`}
            />

            <span
              className={`font-numeric text-2xl sm:text-3xl md:text-5xl leading-none relative z-10 drop-shadow-sm mt-3 sm:mt-4 md:mt-6 transition-transform duration-500 group-hover:scale-110 ${isDark ? "text-white" : "text-[#8c6b2b]"
                }`}
            >
              {Math.max(0, stat.value).toString().padStart(2, "0")}
            </span>

            <div className="w-full flex justify-center mt-2 sm:mt-3 md:mt-6 mb-1 sm:mb-2 relative z-10">
              <span
                className={`text-[5px] sm:text-[6px] md:text-[8px] tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border shadow-sm whitespace-nowrap ${isDark
                  ? "bg-white/10 text-white border-white/20"
                  : "bg-stone-50 text-stone-500 border-sky-100/50"
                  }`}
              >
                <span className="inline-flex flex-col items-center gap-0.5"><span className="text-[0.8em] md:text-[0.65em] uppercase opacity-80">{stat.en}</span><span>{stat.label}</span></span>
              </span>
            </div>

            <div
              className={`absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 w-[3px] h-[3px] sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 rotate-45 ${isDark ? "bg-white/40" : "bg-[#fde047]"
                }`}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}


export default function WeddingInvitation() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAttemptedAutoplay, setHasAttemptedAutoplay] = useState(false);

  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    guests: "1",
  });

  const [wishForm, setWishForm] = useState({
    name: "",
    message: "",
  });

  const [rsvpStatus, setRsvpStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [wishStatus, setWishStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const audioRef = React.useRef<HTMLAudioElement>(null);
  const introVideoRef = React.useRef<HTMLVideoElement>(null);

  const submitToGoogleSheet = async (payload: Record<string, string>) => {
    if (!googleScriptUrl) {
      throw new Error("Google Script URL tl ilid ke;");
    }

    const response = await fetch(googleScriptUrl, {
      method: "POST",
      body: new URLSearchParams(payload),
    });

    if (!response.ok) {
      throw new Error("b,a,Su id¾:l fkdùh");
    }
  };

  const handleRsvpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!rsvpForm.name.trim()) {
      setRsvpStatus("error");
      return;
    }

    setRsvpStatus("sending");

    try {
      await submitToGoogleSheet({
        action: "rsvp",
        name: rsvpForm.name.trim(),
        guests: rsvpForm.guests,
        dietaryNotes: "",
      });

      setRsvpStatus("success");
      setRsvpForm({ name: "", guests: "1" });
    } catch {
      setRsvpStatus("error");
    }
  };

  const handleWishSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!wishForm.name.trim() || !wishForm.message.trim()) {
      setWishStatus("error");
      return;
    }

    setWishStatus("sending");

    try {
      await submitToGoogleSheet({
        action: "wish",
        name: wishForm.name.trim(),
        message: wishForm.message.trim(),
      });

      setWishStatus("success");
      setWishForm({ name: "", message: "" });
    } catch {
      setWishStatus("error");
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isOpened && !isPlaying && !hasAttemptedAutoplay && audioRef.current) {
      setHasAttemptedAutoplay(true);

      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          const playOnInteraction = () => {
            if (audioRef.current && !isPlaying) {
              audioRef.current
                .play()
                .then(() => {
                  setIsPlaying(true);
                  window.removeEventListener("click", playOnInteraction);
                })
                .catch(() => { });
            }
          };

          window.addEventListener("click", playOnInteraction);
        });
    }
  }, [isOpened, isPlaying, hasAttemptedAutoplay]);

  return (
    <main
      className={`dl-manel-bold h-[100dvh] w-full bg-white transition-all duration-1000 ${isOpened ? "overflow-y-auto overflow-x-hidden" : "overflow-hidden flex items-center justify-center"
        } relative scroll-smooth`}
    >
      <FloatingPetals />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="video-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2 } }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
          >
            <video
              ref={introVideoRef}
              src="/Bride_and_groom_walking_garden_202606021456.mp4"
              muted={!hasStarted}
              playsInline
              preload="auto"
              className={`w-full h-full object-cover transition-all duration-[2000ms] ease-out ${!hasStarted ? "blur-xl scale-110 opacity-60" : "blur-0 scale-100 opacity-100"
                }`}
              onEnded={() => setIsOpened(true)}
              onError={() => setIsOpened(true)}
            />

            {!hasStarted && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-[120] bg-black/40 backdrop-blur-[2px]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-12"
                  >
                    <h2 className="text-4xl md:text-6xl text-white mb-2 drop-shadow-2xl">
                      <span className="inline-flex flex-col items-center justify-center gap-1 text-center"><span className="text-[0.75em] md:text-[0.8em] md:text-[0.65em] uppercase tracking-[0.2em] font-sans opacity-100 leading-none mt-1 mb-1">Wedding Ceremony</span><span className="leading-none">විවාහ මංගල්‍යය</span></span>
                    </h2>
                  </motion.div>

                  <button
                    onClick={() => {
                      setHasStarted(true);

                      if (introVideoRef.current) {
                        introVideoRef.current.muted = true;
                        if (audioRef.current && !isPlaying) {
                          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
                        }
                        introVideoRef.current.currentTime = 0;
                        introVideoRef.current.play();
                      }
                    }}
                    className="group relative px-12 py-5 overflow-hidden rounded-full transition-all duration-500 hover:scale-105 active:scale-95"
                  >
                    <div className="absolute inset-0 bg-[#8c6b2b] opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <span className="relative z-10 font-bold text-white text-sm tracking-[0.35em]">
                      ආරාධනය විවෘත කරන්න
                    </span>
                  </button>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 1.5 }}
                    className="mt-8 text-white/50 text-[10px] tracking-[0.35em]"
                  >
                    ආරම්භ කිරීමට ක්ලික් කරන්න
                  </motion.div>
                </motion.div>
              </div>
            )}

            {hasStarted && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2, delay: 0.5 }}
                  className="absolute inset-0 flex flex-col items-center justify-start pt-16 md:pt-24 z-[105] pointer-events-none text-center px-6"
                >
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 0.8 }}
                    className="text-4xl md:text-7xl text-[#c5a059] mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] font-bold"
                  ><span className="inline-flex flex-col items-center justify-center gap-1 text-center"><span className="text-[0.75em] md:text-[0.8em] md:text-[0.65em] uppercase tracking-[0.2em] font-sans opacity-100 leading-none mt-1 mb-1">Wedding Invitation</span><span className="leading-none">විවාහ ආරාධනය</span></span></motion.h2>

                  <motion.h3
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2, delay: 1.4 }}
                    className="text-2xl md:text-5xl text-[#c5a059] tracking-[0.25em] font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
                  >
                    <span className="inline-flex flex-col items-center justify-center"><span className="text-[0.4em] md:text-[0.35em] font-sans uppercase tracking-[0.2em] opacity-100 mb-2 leading-none">Udara</span><span>{INVITATION.couple.bride}</span></span> & <span className="inline-flex flex-col items-center justify-center"><span className="text-[0.4em] md:text-[0.35em] font-sans uppercase tracking-[0.2em] opacity-100 mb-2 leading-none">Vinod</span><span>{INVITATION.couple.groom}</span></span>
                  </motion.h3>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setIsOpened(true)}
                  className="absolute bottom-10 right-10 z-[110] px-8 py-3 bg-white/10 backdrop-blur-md text-white text-[10px] tracking-[0.35em] rounded-full border border-white/20 hover:bg-white/20 transition-all font-bold"
                >
                  ආරාධනයට පිවිසෙන්න
                </motion.button>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="website-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="website-shell relative z-20 w-full"
          >
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIsOpened(false)}
              className="fixed top-6 right-6 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-sky-100 text-[#8c6b2b] hover:bg-sky-50 transition-colors"
            >
              <div className="flex flex-col items-center">
                <div className="text-[8px] tracking-widest font-bold"><span className="inline-flex flex-col items-center justify-center gap-1 text-center"><span className="text-[0.75em] md:text-[0.8em] md:text-[0.65em] uppercase tracking-[0.2em] font-sans opacity-100 leading-none mt-1 mb-1">Close</span><span className="leading-none">වසා දමන්න</span></span></div>
              </div>
            </motion.button>

            <section className="w-full relative flex items-start justify-center overflow-hidden bg-white min-h-[100svh] pt-12 md:pt-32 pb-12">
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url("${encodeURI(HERO_BACKGROUND_IMAGE)}")` }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-white/20" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white" aria-hidden="true" />

              <div className="relative z-10 w-full max-w-5xl px-6 text-center">
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] md:text-xs tracking-[0.6em] font-bold text-[#8c6b2b] drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                ><span className="inline-flex flex-col items-center justify-center gap-1 text-center"><span className="text-[0.75em] md:text-[0.8em] md:text-[0.65em] uppercase tracking-[0.2em] font-sans opacity-100 leading-none mt-1 mb-1">Wedding Invitation</span><span className="leading-none">විවාහ ආරාධනය</span></span></motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.8 }}
                  className="mt-10"
                >
                  <h1 className="text-[3.25rem] leading-none sm:text-7xl md:text-8xl text-[#8c6b2b] italic leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]">
                    <span className="inline-flex flex-col items-center justify-center"><span className="text-[0.4em] md:text-[0.35em] font-sans uppercase tracking-[0.2em] opacity-100 mb-2 leading-none">Udara</span><span>{INVITATION.couple.bride}</span></span>
                  </h1>

                  <div className="mt-4 md:mt-6 flex items-center justify-center gap-3 md:gap-5">
                    <div className="h-px w-14 bg-[#8c6b2b]/40" />
                    <span className="text-4xl md:text-5xl text-[#8c6b2b] drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-bold"><span className="inline-flex flex-col items-center justify-center gap-1 text-center"><span className="text-[0.75em] md:text-[0.8em] md:text-[0.65em] uppercase tracking-[0.2em] font-sans opacity-100 leading-none mt-1 mb-1">&</span><span className="leading-none">සහ</span></span></span>
                    <div className="h-px w-14 bg-[#8c6b2b]/40" />
                  </div>

                  <h1 className="mt-4 md:mt-6 text-[3.25rem] leading-none sm:text-7xl md:text-8xl text-[#8c6b2b] italic leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]">
                    <span className="inline-flex flex-col items-center justify-center"><span className="text-[0.4em] md:text-[0.35em] font-sans uppercase tracking-[0.2em] opacity-100 mb-2 leading-none">Vinod</span><span>{INVITATION.couple.groom}</span></span>
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.8 }}
                  className="mt-12 space-y-5"
                >
                  <p className="text-sm sm:text-base md:text-xl tracking-[0.15em] sm:tracking-[0.25em] text-[#8c6b2b] font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                    <span className="inline-flex flex-col items-center"><span className="text-[0.8em] md:text-[0.65em] font-sans uppercase opacity-100">18 July 2026</span><span>{INVITATION.date.displayLong}</span></span> · <span className="inline-flex flex-col items-center"><span className="text-[0.8em] md:text-[0.65em] font-sans uppercase opacity-100">07:00 PM</span><span>{INVITATION.time.ceremonyStart}</span></span>
                  </p>

                  <p className="text-[#8c6b2b] text-sm sm:text-base md:text-lg tracking-[0.1em] sm:tracking-[0.15em] font-semibold leading-relaxed max-w-2xl mx-auto"><span className="inline-flex flex-col items-center justify-center gap-1 text-center"><span className="text-[0.75em] md:text-[0.8em] md:text-[0.65em] uppercase tracking-[0.2em] font-sans opacity-100 leading-none mt-1 mb-1">Together with our families, we joyfully invite you to celebrate our special day.</span><span className="leading-none">අපගේ ආදරණීය පවුල් සමඟ එක්ව, අපගේ ජීවිතයේ සොඳුරුතම දිනය සැමරීමට ඔබගේ ගෞරවනීය පැමිණීම ආදරයෙන් බලාපොරොත්තු වෙමු.</span></span></p>

                  <a
                    href="#details"
                    className="inline-flex items-center justify-center gap-2 mt-4 md:mt-6 px-6 py-3 md:px-8 md:py-4 bg-[#8c6b2b] text-white text-[10px] md:text-xs font-bold tracking-[0.4em] shadow-xl hover:bg-black transition-colors"
                  >
                    <span className="inline-flex flex-col items-center justify-center gap-1 text-center"><span className="text-[0.75em] md:text-[0.8em] md:text-[0.65em] uppercase tracking-[0.2em] font-sans opacity-100 leading-none mt-1 mb-1">See Details</span><span className="leading-none">විස්තර බලන්න</span></span>
                    <ChevronDown className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 1.1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
              >
                <div className="w-px h-14 bg-gradient-to-b from-[#8c6b2b]/30 to-transparent rounded-full overflow-hidden">
                  <motion.div
                    animate={{ y: [-56, 56] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-1/2 bg-[#d4af37]/45"
                  />
                </div>
              </motion.div>
            </section>

            <section
              id="details"
              className="relative pt-12 md:pt-20 pb-24 md:pb-32 w-full flex flex-col items-center overflow-hidden bg-white"
            >
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url("${encodeURI(DETAILS_BACKGROUND_IMAGE)}")` }}
                aria-hidden="true"
              />
              <div className="absolute inset-4 md:inset-8 border-[1.5px] border-[#8c6b2b]/20 pointer-events-none z-10" />
              <div className="absolute inset-5 md:inset-10 border-[0.5px] border-[#fde047]/10 pointer-events-none z-10" />

              <div className="max-w-[1100px] w-full flex flex-col items-center text-center relative z-20 px-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center mb-16 space-y-6"
                >
                  <div className="flex items-center gap-4 opacity-40">
                    <div className="h-px w-8 bg-[#8c6b2b]" />
                    <Sparkles className="w-4 h-4 text-[#d4af37]" />
                    <div className="h-px w-8 bg-[#8c6b2b]" />
                  </div>

                  <div className="text-[#8c6b2b] space-y-4">
                    <div className="space-y-4 mb-8">
                      <p className="text-[11px] md:text-sm tracking-[0.4em] mb-2 font-bold">
                        පවුල් දෙකක් ආදරයෙන් එක්වන මොහොතක්
                      </p>

                      <div className="flex flex-col items-center justify-center gap-2">
                        <span className="text-sm md:text-base tracking-wider text-slate-700">
                          <span className="inline-flex flex-col items-center justify-center gap-1 text-center"><span className="text-[0.75em] md:text-[0.8em] md:text-[0.65em] uppercase tracking-[0.2em] font-sans opacity-100 leading-none mt-1 mb-1">Loving daughter of Mrs. Mangalika</span><span className="leading-none">මංගලිකා මැතිනියගේ ආදරණීය දියණිය</span></span>
                        </span>
                        <span className="text-xl md:text-2xl font-bold text-[#d4af37] my-1">
                          {INVITATION.couple.brideFull}
                        </span>
                        <span className="text-2xl text-[#d4af37] italic my-2"><span className="inline-flex flex-col items-center justify-center gap-1 text-center"><span className="text-[0.75em] md:text-[0.8em] md:text-[0.65em] uppercase tracking-[0.2em] font-sans opacity-100 leading-none mt-1 mb-1">With</span><span className="leading-none">සමඟ</span></span></span>
                        <span className="text-sm md:text-base tracking-wider text-slate-700">
                          <span className="inline-flex flex-col items-center justify-center gap-1 text-center"><span className="text-[0.75em] md:text-[0.8em] md:text-[0.65em] uppercase tracking-[0.2em] font-sans opacity-100 leading-none mt-1 mb-1">Loving son of Mr. Wijesiri</span><span className="leading-none">විජේසිරි මැතිතුමාගේ ආදරණීය පුතණුවන්</span></span>
                        </span>
                        <span className="text-xl md:text-2xl font-bold text-[#d4af37] my-1">
                          {INVITATION.couple.groomFull}
                        </span>
                      </div>
                    </div>

                    <p className="text-[10px] md:text-[13px] tracking-[0.2em] md:tracking-[0.4em] font-medium leading-loose max-w-3xl border-t border-b border-[#fef08a]/50 py-6">
                      අතිනත ගැනීමේ ප්‍රීතිය නිමිත්තෙන් පැවැත්වෙන ප්‍රිය සම්භාෂණයට සහභාගී වන මෙන්
                      <br />
                      <span className="text-[#d4af37] font-bold text-base md:text-lg my-2 block">
                        ඔබට / ඔබ දෙපළට / ඔබ සැමට කෙරෙන ගෞරවණීය ඇරයූමයි!
                      </span>
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <h2 className="text-xl md:text-2xl text-[#d4af37] tracking-[0.5em] font-bold">
                    විවාහ උත්සවය
                  </h2>
                </motion.div>

                <div className="relative w-full flex flex-col items-center justify-center my-12 mb-24">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-20 w-full max-w-[560px] bg-white p-8 md:p-14 shadow-[0_30px_70px_-15px_rgba(45,90,39,0.1)] border border-[#fef08a]/30 flex flex-col items-center justify-center text-center"
                  >
                    <div className="absolute inset-2 border-[0.5px] border-[#d4af37]/30 pointer-events-none" />

                    <div className="space-y-5 mb-10">
                      <div className="flex flex-col items-center gap-2">
                        <h3 className="text-5xl md:text-7xl text-[#d4af37] leading-none">
                          <span className="inline-flex flex-col items-center justify-center"><span className="text-[0.4em] md:text-[0.35em] font-sans uppercase tracking-[0.2em] opacity-100 mb-2 leading-none">Udara</span><span>{INVITATION.couple.bride}</span></span>
                        </h3>
                      </div>
                    </div>

                    <div className="py-2 flex items-center justify-center w-full relative">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-[#fef08a]/50" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white px-6 text-4xl text-[#d4af37]"><span className="inline-flex flex-col items-center justify-center gap-1 text-center"><span className="text-[0.75em] md:text-[0.8em] md:text-[0.65em] uppercase tracking-[0.2em] font-sans opacity-100 leading-none mt-1 mb-1">With</span><span className="leading-none">සමඟ</span></span></span>
                      </div>
                    </div>

                    <div className="space-y-5 mt-10">
                      <div className="flex flex-col items-center gap-2">
                        <h3 className="text-5xl md:text-7xl text-[#d4af37] leading-none">
                          <span className="inline-flex flex-col items-center justify-center"><span className="text-[0.4em] md:text-[0.35em] font-sans uppercase tracking-[0.2em] opacity-100 mb-2 leading-none">Vinod</span><span>{INVITATION.couple.groom}</span></span>
                        </h3>
                      </div>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-6 w-full text-left">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full border border-[#d4af37]/20 flex items-center justify-center shrink-0">
                          <Calendar className="w-4 h-4 text-[#d4af37]" />
                        </div>
                        <div>
                          <div className="text-[9px] tracking-[0.5em] font-bold text-[#8c6b2b]/40">
                            දිනය
                          </div>
                          <div className="text-sm md:text-base text-[#8c6b2b] tracking-wide font-bold">
                            <span className="inline-flex flex-col items-center"><span className="text-[0.8em] md:text-[0.65em] font-sans uppercase opacity-100">18 July 2026</span><span>{INVITATION.date.displayLong}</span></span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full border border-[#8c6b2b]/20 flex items-center justify-center shrink-0">
                          <Clock className="w-4 h-4 text-[#8c6b2b]" />
                        </div>
                        <div>
                          <div className="text-[9px] tracking-[0.5em] font-bold text-[#8c6b2b]/40">
                            වේලාව
                          </div>
                          <div className="text-sm md:text-base text-[#8c6b2b] tracking-wide font-bold">
                            විවාහ මංගල උත්සවය <span className="inline-flex flex-col items-center"><span className="text-[0.8em] md:text-[0.65em] font-sans uppercase opacity-100">07:00 PM</span><span>{INVITATION.time.ceremonyStart}</span></span>ට
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full border border-[#8c6b2b]/20 flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4 text-[#8c6b2b]" />
                        </div>
                        <div>
                          <div className="text-[9px] tracking-[0.5em] font-bold text-[#8c6b2b]/40">
                            ස්ථානය
                          </div>
                          <div className="text-sm md:text-base text-[#8c6b2b] tracking-wide font-bold">
                            {INVITATION.venue.name}, {INVITATION.venue.city}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            <section className="relative py-28 md:py-48 overflow-hidden bg-white">
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url("${encodeURI(TIMELINE_BACKGROUND_IMAGE)}")` }}
                aria-hidden="true"
              />
              <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6 mb-12"
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-[#8c6b2b] font-bold tracking-[0.6em] text-[10px] md:text-xs opacity-50">
                      දවසේ වැඩසටහන
                    </span>
                    <div className="h-px w-16 bg-[#8c6b2b]/30" />
                  </div>

                  <h2 className="text-5xl md:text-7xl bg-gradient-to-r from-[#d4af37] via-[#8c6b2b] to-[#d4af37] bg-clip-text text-transparent leading-none drop-shadow-sm italic">
                    කාලසටහන
                  </h2>

                  <p className="text-[#8c6b2b]/70 text-xs md:text-sm tracking-[0.3em] font-medium max-w-2xl mx-auto pt-2 leading-loose">
                    <span className="inline-flex flex-col items-center justify-center gap-1 text-center"><span className="text-[0.75em] md:text-[0.8em] md:text-[0.65em] uppercase tracking-[0.2em] font-sans opacity-100 leading-none mt-1 mb-1">A simple schedule of our special day that we look forward to sharing with you.</span><span className="leading-none">ඔබ සමඟ බෙදා ගැනීමට බලා සිටින අපගේ විශේෂ දිනයේ සරල වැඩසටහන.</span></span>
                  </p>
                </motion.div>

                <div className="mx-auto max-w-2xl w-full text-left bg-white border border-[#fef08a]/40 shadow-[0_30px_70px_-20px_rgba(45,90,39,0.1)] rounded-[2rem]">
                  <div className="p-8 md:p-12 space-y-8">
                    {[
                      [<span className="inline-flex flex-col items-start gap-1"><span className="text-[0.75em] md:text-[0.8em] md:text-[0.65em] uppercase tracking-[0.2em] font-sans opacity-100 leading-none mt-1 mb-1">Wedding Ceremony</span><span className="leading-none">විවාහ මංගල උත්සවය</span></span>, INVITATION.time.ceremonyStart],
                      [<span className="inline-flex flex-col items-start gap-1"><span className="text-[0.75em] md:text-[0.8em] md:text-[0.65em] uppercase tracking-[0.2em] font-sans opacity-100 leading-none mt-1 mb-1">Dinner</span><span className="leading-none">රාත්‍රී ආහාරය</span></span>, "08:00 PM"],
                      [<span className="inline-flex flex-col items-start gap-1"><span className="text-[0.75em] md:text-[0.8em] md:text-[0.65em] uppercase tracking-[0.2em] font-sans opacity-100 leading-none mt-1 mb-1">End of Ceremony</span><span className="leading-none">උත්සවය අවසානය</span></span>, INVITATION.time.ceremonyEnd],
                    ].map(([title, time]) => (
                      <div key={title} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full border border-[#d4af37]/20 flex items-center justify-center shrink-0">
                          <Clock className="w-4 h-4 text-[#d4af37]" />
                        </div>
                        <div>
                          <div className="text-xs md:text-sm tracking-widest font-bold text-[#8c6b2b]/60">
                            {title}
                          </div>
                          <div className="text-base md:text-xl text-[#8c6b2b] tracking-widest font-bold mt-1">
                            {time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="relative py-28 md:py-48 flex flex-col items-center overflow-hidden bg-[#8c6b2b]">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                className="absolute -top-24 -right-24 w-96 h-96 bg-white blur-[100px] rounded-full pointer-events-none"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                className="absolute -bottom-24 -left-24 w-96 h-96 bg-white blur-[100px] rounded-full pointer-events-none"
              />

              <div className="w-full max-w-[1200px] px-6 flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="relative mb-20"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] md:text-[220px] text-white/5 whitespace-nowrap pointer-events-none select-none tracking-wider">
                    සදාකාලික
                  </div>

                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "80px" }}
                      viewport={{ once: true }}
                      className="h-px bg-white/40 mb-8"
                    />

                    <h2 className="text-3xl md:text-6xl text-white tracking-[0.25em] md:tracking-[0.4em] font-bold leading-tight">
                      <span className="inline-flex flex-col items-center"><span className="text-[0.65em] md:text-[0.5em] uppercase font-sans tracking-widest opacity-100 mb-2">Save the Date</span><span>මෙම දිනය <span className="mx-2 md:mx-4 text-[#fef08a]">සුරකින්න</span></span></span>
                    </h2>

                    <div className="mt-10 flex items-center justify-center gap-6">
                      <div className="h-[0.5px] w-8 md:w-16 bg-[#fef08a]/50" />
                      <span className="font-numeric text-3xl md:text-5xl text-[#fef08a] drop-shadow-md">
                        {INVITATION.date.displayNumeric}
                      </span>
                      <div className="h-[0.5px] w-8 md:w-16 bg-[#fef08a]/50" />
                    </div>
                  </div>
                </motion.div>

                <CountdownTimer isDark />

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.8 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="mt-20 flex flex-col items-center gap-4"
                >
                  <p className="text-[10px] md:text-[12px] tracking-[0.6em] text-white font-bold text-center">
                    ආදරයෙන් පිරුණු මොහොතකට රැඳී සිටින්න
                  </p>

                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                        className="w-1 h-1 bg-[#fef08a] rotate-45"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>

            <section className="relative py-28 md:py-48 overflow-hidden bg-white">
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url("${encodeURI(DETAILS_BACKGROUND_IMAGE)}")` }}
                aria-hidden="true"
              />
              <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-10 mb-24"
                >
                  <div className="flex flex-col items-center gap-4">
                    <span className="text-[#8c6b2b] font-bold tracking-[0.8em] text-[10px] md:text-xs opacity-40">
                      උත්සව ස්ථානය
                    </span>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rotate-45 ${i === 2 ? "bg-[#d4af37]" : "bg-[#8c6b2b]/20"}`}
                        />
                      ))}
                    </div>
                  </div>

                  <h2 className="text-5xl md:text-9xl bg-gradient-to-br from-[#d4af37] to-[#8c6b2b] bg-clip-text text-transparent leading-tight font-light tracking-tight relative">
                    {INVITATION.venue.name}
                  </h2>

                  <div className="max-w-xl mx-auto pt-10 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-[#fef08a]" />
                    <p className="text-[#8c6b2b]/80 text-sm md:text-base tracking-[0.2em] font-medium leading-loose pt-8">
                      සම්ප්‍රදාය, අලංකාරය සහ නව ඇරඹුමක සුන්දරත්වය එක්වන තැන
                    </p>
                  </div>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                  <div className="lg:col-span-5 text-left order-2 lg:order-1">
                    <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                      className="bg-white p-10 md:p-16 shadow-[0_60px_100px_-40px_rgba(45,90,39,0.1)] border border-[#fef08a]/30 relative group"
                    >
                      <div className="absolute inset-2 border-[0.5px] border-[#d4af37]/20 pointer-events-none group-hover:border-[#d4af37]/40 transition-colors duration-700" />

                      <div className="space-y-12 relative z-10">
                        <div className="space-y-6">
                          <p className="text-[#8c6b2b] text-xl md:text-2xl font-light italic leading-relaxed text-center lg:text-left">
                            “අපගේ ආදර කතාවේ අලංකාරම පරිච්ඡේදය ඔබ සමඟ සැමරීමට අප සතුටින් බලා සිටිමු.”
                          </p>
                          <div className="h-0.5 w-12 bg-[#fef08a]/60 mx-auto lg:ml-0" />
                        </div>

                        <div className="space-y-10">
                          <div className="flex items-start gap-8">
                            <div className="w-12 h-12 rounded-full border border-[#d4af37]/20 flex items-center justify-center shrink-0">
                              <MapPin className="w-5 h-5 text-[#d4af37]" />
                            </div>
                            <div className="space-y-3">
                              <h4 className="text-[#8c6b2b]/40 font-bold text-[10px] tracking-[0.5em]">
                                ගමනාන්තය
                              </h4>
                              <p className="text-xl md:text-2xl text-[#8c6b2b] leading-relaxed tracking-wide font-bold">
                                {INVITATION.venue.name}, {INVITATION.venue.city}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-8">
                            <div className="w-12 h-12 rounded-full border border-[#d4af37]/20 flex items-center justify-center shrink-0">
                              <Clock className="w-5 h-5 text-[#d4af37]" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-[#8c6b2b]/40 font-bold text-[10px] tracking-[0.5em]">
                                විවාහ මංගල උත්සවය
                              </h4>
                              <p className="text-xl md:text-2xl text-[#8c6b2b] leading-relaxed tracking-wide font-bold">
                                <span className="inline-flex flex-col items-center"><span className="text-[0.8em] md:text-[0.65em] font-sans uppercase opacity-100">07:00 PM</span><span>{INVITATION.time.ceremonyStart}</span></span>
                              </p>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => window.open(INVITATION.venue.googleMapsLink, "_blank")}
                          className="w-full group relative inline-flex items-center justify-center gap-4 py-6 bg-[#8c6b2b] text-white text-[10px] md:text-xs font-bold tracking-[0.45em] overflow-hidden transition-all hover:bg-black shadow-xl mt-4"
                        >
                          <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
                          <span className="relative z-10 flex items-center gap-3">
                            <MapPin className="w-4 h-4" />
                            සිතියම විවෘත කරන්න
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  </div>

                  <div className="lg:col-span-7 order-1 lg:order-2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "circOut" }}
                      className="relative w-full aspect-[4/3] md:aspect-video lg:aspect-[4/3] rounded-[3rem] overflow-hidden shadow-[0_80px_150px_-30px_rgba(0,0,0,0.25)] group bg-white"
                    >
                      <iframe
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(INVITATION.venue.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full grayscale-[0.85] contrast-150 sepia-[0.2] brightness-[1.05] hover:grayscale-0 hover:sepia-0 hover:contrast-100 transition-all duration-1000 scale-[1.02] group-hover:scale-100"
                      />

                      <div className="absolute inset-0 pointer-events-none border-[15px] md:border-[25px] border-white/95 rounded-[3rem]" />
                      <div className="absolute inset-8 md:inset-12 pointer-events-none border border-white/20 rounded-[2.5rem]" />

                      <div className="absolute top-0 right-0 w-40 h-40 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center rounded-bl-full shadow-2xl p-8 transform translate-x-4 -translate-y-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-700">
                        <MapPin className="w-8 h-8 text-[#8c6b2b] mb-2 opacity-80" />
                        <span className="text-[8px] font-bold tracking-widest text-[#8c6b2b]/50">
                          බලන්න
                        </span>
                      </div>

                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#d4af37]/5 to-transparent mix-blend-overlay" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                      className="inline-flex items-center gap-4 mt-8 px-8 py-3 bg-white border border-[#fef08a]/40 shadow-lg rounded-full"
                    >
                      <Sparkles className="w-4 h-4 text-[#d4af37]" />
                      <span className="text-[10px] md:text-xs font-bold text-[#8c6b2b] tracking-widest">
                        {INVITATION.venue.city}
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            <section className="relative py-32 md:py-48 flex flex-col items-center overflow-hidden bg-white">
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url("${encodeURI(TIMELINE_BACKGROUND_IMAGE)}")` }}
                aria-hidden="true"
              />
              <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center relative z-10 w-full">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl md:text-4xl text-slate-800 tracking-[0.3em] mb-12 text-center"
                >
                  පැමිණීම තහවුරු කිරීම
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="relative w-full max-w-[650px] bg-white p-6 md:p-10 shadow-[0_40px_100px_-25px_rgba(0,0,0,0.12)] border border-slate-100 flex flex-col items-center"
                >
                  <div className="w-full border border-slate-300 rounded-[1.5rem] p-6 md:p-8 flex flex-col items-center">
                    <h3 className="text-2xl md:text-4xl text-slate-800 mb-8 text-center">
                      ඔබ පැමිණෙන්නේද?
                    </h3>

                    <form className="w-full space-y-6 text-left" onSubmit={handleRsvpSubmit}>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 ml-1"><span className="inline-flex flex-col items-start gap-1"><span className="text-[0.75em] md:text-[0.8em] md:text-[0.65em] uppercase tracking-[0.2em] font-sans opacity-100 leading-none mt-1 mb-1">Your Name</span><span className="leading-none">ඔබගේ නම</span></span></label>
                        <input
                          type="text"
                          placeholder="Your Name / ඔබගේ නම මෙහි ලියන්න..."
                          value={rsvpForm.name}
                          onChange={(e) => {
                            setRsvpStatus("idle");
                            setRsvpForm((prev) => ({ ...prev, name: e.target.value }));
                          }}
                          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all text-base font-numeric"
                          required
                        />
                      </div>

                      <div className="space-y-4 pt-2">
                        <label className="text-xs font-bold text-slate-500 ml-1">
                          අපගේ විශේෂ දිනයට ඔබ පැමිණෙන්නේද?
                        </label>

                        <button
                          type="button"
                          onClick={() => {
                            setRsvpStatus("idle");
                            setRsvpForm((prev) => ({ ...prev, guests: "1" }));
                          }}
                          aria-pressed={rsvpForm.guests !== "0"}
                          className="w-full bg-[#f3f3f3] hover:bg-slate-200 text-slate-700 py-5 md:py-6 rounded-xl text-[11px] md:text-sm tracking-wide transition-all shadow-sm flex items-center justify-center px-4 leading-relaxed active:scale-[0.98]"
                        >
                          ඔව්, මම ආදරයෙන් පැමිණෙන්නම්!
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setRsvpStatus("idle");
                            setRsvpForm((prev) => ({ ...prev, guests: "0" }));
                          }}
                          aria-pressed={rsvpForm.guests === "0"}
                          className="w-full bg-[#f3f3f3] hover:bg-slate-200 text-slate-700 py-5 md:py-6 rounded-xl text-[11px] md:text-sm tracking-wide transition-all shadow-sm flex items-center justify-center px-4 leading-relaxed active:scale-[0.98]"
                        >
                          කණගාටුයි, මට පැමිණිය නොහැක. නමුත් මගේ ආශීර්වාදය ඔබ සමඟයි.
                        </button>
                      </div>

                      {(rsvpStatus === "success" || rsvpStatus === "error") && (
                        <p
                          className={`text-[10px] text-center font-semibold ${rsvpStatus === "success" ? "text-emerald-600" : "text-red-500"
                            }`}
                        >
                          {rsvpStatus === "success"
                            ? "ඔබගේ පැමිණීම තහවුරු කිරීම සාර්ථකව යවා ඇත."
                            : "කරුණාකර ඔබගේ නම ඇතුළත් කර නැවත උත්සාහ කරන්න."}
                        </p>
                      )}

                      <div className="pt-6">
                        <button
                          type="submit"
                          disabled={rsvpStatus === "sending"}
                          className="w-full bg-[#8c6b2b] text-white py-4 md:py-5 rounded-xl text-xs md:text-sm tracking-[0.2em] font-bold hover:bg-[#1a5c4a] transition-all shadow-md disabled:opacity-70"
                        >
                          {rsvpStatus === "sending" ? "යවමින්..." : "තහවුරු කරන්න"}
                        </button>

                        <p className="text-[10px] text-slate-400 mt-4 text-center leading-relaxed">
                          ඔබගේ ප්‍රතිචාරය පුද්ගලිකව තබා ගනු ලැබේ.
                        </p>
                      </div>
                    </form>
                  </div>
                </motion.div>

              </div>
            </section>





            

            <section className="relative py-28 md:py-48 overflow-hidden bg-white">
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url("${encodeURI(WISHES_BACKGROUND_IMAGE)}")` }}
                aria-hidden="true"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] text-[#d4af37]/5 whitespace-nowrap pointer-events-none select-none italic">
                මිහිරි පණිවිඩ
              </div>

              <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6 mb-20"
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-[#8c6b2b] font-bold tracking-[0.6em] text-[10px] md:text-xs opacity-50">
                      අමුත්තන්ගේ සටහන් පොත
                    </span>
                    <div className="h-px w-16 bg-[#d4af37]/30" />
                  </div>

                  <h2 className="text-5xl md:text-8xl bg-gradient-to-r from-[#d4af37] via-[#8c6b2b] to-[#d4af37] bg-clip-text text-transparent leading-none drop-shadow-sm italic">
                    ආදරණීය පැතුම්
                  </h2>

                  <p className="text-[#8c6b2b]/70 text-xs md:text-sm tracking-[0.3em] font-medium max-w-xl mx-auto pt-4 leading-loose">
                    <span className="inline-flex flex-col items-center justify-center gap-1 text-center"><span className="text-[0.75em] md:text-[0.8em] md:text-[0.65em] uppercase tracking-[0.2em] font-sans opacity-100 leading-none mt-1 mb-1">Your love and blessings are the most valuable gifts we receive. Leave a memorable note for our new life.</span><span className="leading-none">ඔබගේ ආදරය සහ ආශීර්වාදය අපට ලැබෙන වටිනාම ත්‍යාගයකි. නව ජීවිතයට මතක සටහනක් තබා යන්න.</span></span>
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="max-w-3xl mx-auto"
                >
                  <div className="bg-white p-10 md:p-20 shadow-[0_40px_100px_-20px_rgba(45,90,39,0.1)] border border-[#fef08a]/40 relative overflow-hidden">
                    <div className="absolute inset-4 border border-[#fef08a]/20 pointer-events-none" />
                    <div className="absolute inset-6 border-[0.5px] border-[#d4af37]/10 pointer-events-none" />

                    <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-[#d4af37]/40 rounded-tl-xl" />
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-[#d4af37]/40 rounded-br-xl" />

                    <form className="space-y-16 text-left relative z-10" onSubmit={handleWishSubmit}>
                      <div className="space-y-6 group">
                        <label className="text-sm tracking-[0.4em] font-bold text-[#8c6b2b]/40 group-focus-within:text-[#d4af37] transition-colors">
                          ඔබගේ නම
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="ඔබගේ නම"
                            value={wishForm.name}
                            onChange={(e) => {
                              setWishStatus("idle");
                              setWishForm((prev) => ({ ...prev, name: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b border-[#fef08a]/60 px-0 py-4 text-[#8c6b2b] placeholder:text-[#fef08a]/30 focus:outline-none focus:border-[#8c6b2b] transition-all text-base tracking-widest font-numeric"
                            required
                          />
                          <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#8c6b2b] transition-all duration-500 group-focus-within:w-full" />
                        </div>
                      </div>

                      <div className="space-y-6 group">
                        <label className="text-sm tracking-[0.4em] font-bold text-[#8c6b2b]/40 group-focus-within:text-[#d4af37] transition-colors">
                          ඔබගේ පණිවිඩය
                        </label>
                        <div className="relative">
                          <textarea
                            rows={4}
                            placeholder="Your warm wishes / නව යුවළට ඔබගේ ආදරණීය පැතුම් ලියන්න..."
                            value={wishForm.message}
                            onChange={(e) => {
                              setWishStatus("idle");
                              setWishForm((prev) => ({ ...prev, message: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b border-[#fef08a]/60 px-0 py-4 text-[#8c6b2b] placeholder:text-[#fef08a]/30 focus:outline-none focus:border-[#8c6b2b] transition-all text-sm tracking-widest resize-none leading-relaxed font-numeric"
                            required
                          />
                          <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#8c6b2b] transition-all duration-500 group-focus-within:w-full" />
                        </div>
                      </div>

                      <AnimatePresence>
                        {(wishStatus === "success" || wishStatus === "error") && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`text-[10px] text-center font-bold tracking-widest ${wishStatus === "success" ? "text-emerald-600" : "text-red-500"
                              }`}
                          >
                            {wishStatus === "success"
                              ? "ඔබගේ ආදරණීය පණිවිඩය සාර්ථකව යවා ඇත"
                              : "කරුණාකර නම සහ පණිවිඩය සම්පූර්ණ කරන්න"}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      <div className="pt-8 flex justify-center">
                        <button
                          type="submit"
                          disabled={wishStatus === "sending"}
                          className="group relative px-16 py-6 bg-[#8c6b2b] text-white font-bold tracking-[0.5em] text-[10px] hover:bg-slate-900 transition-all duration-500 shadow-xl disabled:opacity-70 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
                          <span className="relative z-10 flex items-center gap-3">
                            <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            {wishStatus === "sending" ? "යවමින්..." : "පැතුම් යවන්න"}
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            </section>

            <section className="w-full relative overflow-hidden py-24 md:py-32 bg-white">
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url("${encodeURI(DETAILS_BACKGROUND_IMAGE)}")` }}
                aria-hidden="true"
              />
              <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.0 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-center gap-3 opacity-70">
                    <div className="h-px w-10 bg-[#8c6b2b]/20" />
                    <Sparkles className="w-4 h-4 text-[#d4af37]" />
                    <div className="h-px w-10 bg-[#8c6b2b]/20" />
                  </div>

                  <h2 className="text-5xl md:text-7xl bg-gradient-to-r from-[#d4af37] via-[#8c6b2b] to-[#d4af37] bg-clip-text text-transparent italic">
                    ස්තූතියි
                  </h2>

                  <p className="text-[#8c6b2b]/70 text-xs md:text-sm tracking-[0.25em] font-medium leading-loose max-w-3xl mx-auto">
                    <span className="inline-flex flex-col items-center justify-center gap-1 text-center"><span className="text-[0.75em] md:text-[0.8em] md:text-[0.65em] uppercase tracking-[0.2em] font-sans opacity-100 leading-none mt-1 mb-1">We look forward to celebrating our special day with you with love.</span><span className="leading-none">අපගේ විශේෂ දිනය ඔබ සමඟ ආදරයෙන් සැමරීමට අපි බලා සිටිමු.</span></span>
                  </p>

                  <p className="text-[10px] md:text-xs tracking-[0.5em] text-[#8c6b2b]/50 font-bold">
                    © 2026 <span className="inline-flex flex-col items-center justify-center"><span className="text-[0.4em] md:text-[0.35em] font-sans uppercase tracking-[0.2em] opacity-100 mb-2 leading-none">Udara</span><span>{INVITATION.couple.bride}</span></span> සහ <span className="inline-flex flex-col items-center justify-center"><span className="text-[0.4em] md:text-[0.35em] font-sans uppercase tracking-[0.2em] opacity-100 mb-2 leading-none">Vinod</span><span>{INVITATION.couple.groom}</span></span>
                  </p>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <audio ref={audioRef} src={backgroundMusic} loop />

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-[60] bg-white text-[#87937a] p-3 rounded-full shadow-lg border border-[#ccbaa2]/40 hover:bg-[#87937a]/10 transition-colors"
      >
        <div className="flex flex-col items-center">
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </div>
      </motion.button>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .dl-manel-bold,
            .dl-manel-bold * {
              font-family: 'Abhaya Libre', Arial, sans-serif !important;
            }

            input,
            textarea,
            button {
              font-family: 'Abhaya Libre', Arial, sans-serif !important;
            }

            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }

            .animate-spin-slow {
              animation: spin-slow linear infinite;
            }

            ::-webkit-scrollbar {
              width: 8px;
            }

            ::-webkit-scrollbar-track {
              background: #ccbaa233;
            }

            ::-webkit-scrollbar-thumb {
              background: #87937a66;
              border-radius: 10px;
            }

            @media (max-width: 768px) {
              html {
                font-size: 120% !important;
              }
              
              .text-\[5px\] {
                font-size: 8px !important;
              }
              
              .text-\[8px\] {
                font-size: 11px !important;
              }
              
              .text-\[10px\] {
                font-size: 13px !important;
              }
              
              .text-\[11px\] {
                font-size: 14px !important;
              }
            }
          `,
        }}
      />
    </main>
  );
}