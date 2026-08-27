"use client";

import { useEffect, useRef, useState } from "react";

type EventItem = {
  id: number;
  date: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  lineup: string[];
  tone: string;
};

const events: EventItem[] = [
  {
    id: 1,
    date: "09.19 FRI · 22:00",
    eyebrow: "CATAPULT SIGNATURE NIGHT",
    title: "GRAVITY OFF",
    subtitle: "越过地面，进入声音的失重区",
    description:
      "CATAPULT 标志性派对回归。以高速律动、工业音色与沉浸式光影，把舞池变成一段持续上升的夜间轨道。",
    lineup: ["MIZU", "KAI-L", "TURBO J", "RIN"],
    tone: "acid",
  },
  {
    id: 2,
    date: "10.03 FRI · 22:30",
    eyebrow: "NEON CURRENT",
    title: "AFTERIMAGE",
    subtitle: "灯光消失后，节拍仍留在视网膜",
    description:
      "一场围绕 House、Breaks 与 Electro 展开的长夜。三组声音在主舞池交替推进，直至清晨第一束光。",
    lineup: ["YUYU", "ALTER-9", "NING"],
    tone: "ember",
  },
  {
    id: 3,
    date: "10.17 FRI · 23:00",
    eyebrow: "BASS DEPARTMENT",
    title: "LOW PRESSURE",
    subtitle: "低频在空气里留下可见的形状",
    description:
      "低频专场集结 Bass、Jungle 与 UK Garage。声音从四面八方包围舞池，让每一次下潜都更深。",
    lineup: ["IIISEE", "FENNEC", "B2B 404"],
    tone: "cobalt",
  },
  {
    id: 4,
    date: "10.31 FRI · 22:00",
    eyebrow: "HALLOWEEN SPECIAL",
    title: "NOCTURNAL",
    subtitle: "只在夜里显形的另一个自己",
    description:
      "CATAPULT 万圣节特别企划。欢迎用最真实或最陌生的面貌进入现场，在戏剧化视觉与暗色 Techno 中释放自己。",
    lineup: ["KID SPECTER", "VOID", "ECHO X"],
    tone: "violet",
  },
];

const musicEpisodes = [
  { issue: "01", song: "Midnight City", artist: "M83", tone: "acid" },
  { issue: "02", song: "Glue", artist: "Bicep", tone: "ember" },
  { issue: "03", song: "Innerbloom", artist: "RÜFÜS DU SOL", tone: "cobalt" },
  { issue: "04", song: "Archangel", artist: "Burial", tone: "violet" },
  { issue: "05", song: "Opal", artist: "Four Tet", tone: "silver" },
  { issue: "06", song: "Kerala", artist: "Bonobo", tone: "acid" },
  { issue: "07", song: "Loud Places", artist: "Jamie xx", tone: "ember" },
  { issue: "08", song: "Pacific State", artist: "808 State", tone: "cobalt" },
  { issue: "09", song: "Go", artist: "The Chemical Brothers", tone: "violet" },
];

function EventArtwork({ event, compact = false }: { event: EventItem; compact?: boolean }) {
  return (
    <div className={`event-art ${event.tone} ${compact ? "compact" : ""}`}>
      <div className="art-grid" aria-hidden="true" />
      <div className="art-orbit orbit-one" aria-hidden="true" />
      <div className="art-orbit orbit-two" aria-hidden="true" />
      <span className="art-kicker">{event.eyebrow}</span>
      <span className="art-title">{event.title}</span>
      <span className="art-date">{event.date}</span>
      <span className="art-mark">C</span>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [musicOpen, setMusicOpen] = useState(false);
  const eventRail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedEvent(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const scrollEvents = (direction: number) => {
    eventRail.current?.scrollBy({
      left: direction * Math.min(window.innerWidth * 0.72, 760),
      behavior: "smooth",
    });
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#home" aria-label="CATAPULT 主页">
          <span className="brand-symbol">C</span>
          <span>CATAPULT</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
          <span className="sr-only">打开或关闭菜单</span>
        </button>

        <nav id="main-navigation" className={menuOpen ? "open" : ""} aria-label="主菜单">
          <a href="#home" onClick={closeMenu}>主页</a>
          <a href="#past-events" onClick={closeMenu}>过往的活动</a>
          <a href="#gallery" onClick={closeMenu}>相册</a>
        </nav>

        <a className="booking-chip" href="tel:4000574808">BOOKING ↗</a>
      </header>

      <section className="hero-section" id="home" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="section-index">CAT. 001 / NINGBO</span>
          <h1 id="hero-title">UNLEASH<br />YOURSELF</h1>
          <p>声音不是背景。<br />它是你进入夜晚的方式。</p>
          <div className="hero-meta">
            <span>29.903° N</span>
            <span>121.617° E</span>
          </div>
        </div>

        <button className="hero-poster" type="button" onClick={() => setSelectedEvent(events[0])}>
          <img src="/catapult-logo.jpg" alt="CATAPULT 标志" />
          <div className="hero-poster-field" aria-hidden="true" />
          <span className="hero-poster-label">NEXT EVENT</span>
          <span className="hero-poster-title">GRAVITY<br />OFF</span>
          <span className="hero-poster-date">SEP 19 · 22:00</span>
          <span className="hero-poster-cta">查看活动详情 ↗</span>
        </button>

        <div className="hero-side-note" aria-hidden="true">
          <span>SCROLL TO DISCOVER</span>
          <i />
        </div>
      </section>

      <div className="marquee" aria-label="CATAPULT 宣言">
        <div>
          <span>CATAPULT — UNLEASH YOURSELF</span>
          <b>✦</b>
          <span>CATAPULT — UNLEASH YOURSELF</span>
          <b>✦</b>
          <span>CATAPULT — UNLEASH YOURSELF</span>
          <b>✦</b>
        </div>
      </div>

      <section className="events-section" aria-labelledby="events-title">
        <div className="section-heading">
          <div>
            <span className="section-index">02 / UPCOMING</span>
            <h2 id="events-title">正在发生</h2>
          </div>
          <div className="rail-controls">
            <button type="button" onClick={() => scrollEvents(-1)} aria-label="查看上一个活动">←</button>
            <button type="button" onClick={() => scrollEvents(1)} aria-label="查看下一个活动">→</button>
          </div>
        </div>

        <div className="event-rail" ref={eventRail}>
          {events.map((event, index) => (
            <button
              className="event-card"
              type="button"
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              aria-label={`查看活动 ${event.title} 的详情`}
            >
              <div className="event-collage">
                <div className="collage-main"><EventArtwork event={event} /></div>
                <div className={`collage-mini mini-left ${event.tone}`}>
                  <span>0{index + 1}</span>
                  <i />
                </div>
                <div className={`collage-mini mini-right ${event.tone}`}>
                  <strong>CTP</strong>
                  <span>NIGHT UNIT</span>
                </div>
              </div>
              <div className="event-caption">
                <div>
                  <span>{event.date}</span>
                  <h3>{event.title}</h3>
                </div>
                <span className="round-arrow">↗</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="past-section" id="past-events" aria-labelledby="past-title">
        <div className="past-intro">
          <span className="section-index">03 / ARCHIVE</span>
          <h2 id="past-title">过往的<br />活动</h2>
          <p>每一个夜晚都曾真实发生。声音散去之后，我们留下它的温度、速度与面孔。</p>
        </div>
        <div className="past-list">
          {[
            ["2026.08.22", "SIGNAL LOST", "TECHNO / LIVE"],
            ["2026.07.18", "WILD CURRENT", "HOUSE / BREAKS"],
            ["2026.06.13", "PHASE SHIFT", "BASS / ELECTRO"],
            ["2026.05.01", "MAYDAY", "ALL NIGHT LONG"],
          ].map((item, index) => (
            <article key={item[1]}>
              <span>{item[0]}</span>
              <h3>{item[1]}</h3>
              <small>{item[2]}</small>
              <b>0{index + 1}</b>
            </article>
          ))}
        </div>
      </section>

      <section className="music-section" aria-labelledby="music-title">
        <button
          className="music-banner"
          type="button"
          onClick={() => setMusicOpen((open) => !open)}
          aria-expanded={musicOpen}
          aria-controls="music-grid"
        >
          <div className="vinyl" aria-hidden="true"><i /></div>
          <span className="section-index">CATAPULT RADIO / SELECTION</span>
          <span className="music-title" id="music-title">音乐<br />鉴赏</span>
          <span className="music-en">MUSIC APPRECIATION</span>
          <span className="music-action">{musicOpen ? "收起节目 ×" : "打开节目单 ↗"}</span>
        </button>

        <div id="music-grid" className={`music-grid ${musicOpen ? "open" : ""}`} aria-hidden={!musicOpen}>
          {musicEpisodes.map((episode) => (
            <article className="music-episode" key={episode.issue}>
              <div className={`album-cover ${episode.tone}`} role="img" aria-label={`${episode.song} 节目封面`}>
                <span>VOL.</span>
                <strong>{episode.issue}</strong>
                <i />
                <small>CATAPULT<br />RADIO</small>
              </div>
              <h3>{episode.song}</h3>
              <p>{episode.artist}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery-section" id="gallery" aria-labelledby="gallery-title">
        <div className="section-heading gallery-heading">
          <div>
            <span className="section-index">04 / MOMENTS</span>
            <h2 id="gallery-title">相册</h2>
          </div>
          <p>LIGHT / BODY / SOUND / MEMORY</p>
        </div>
        <div className="gallery-grid">
          {["LASER FIELD", "CROWD UNIT", "LOW LIGHT", "BACKSTAGE", "MOTION BLUR", "LAST TRACK"].map((label, index) => (
            <div className={`gallery-shot shot-${index + 1}`} key={label} role="img" aria-label={`CATAPULT 相册：${label}`}>
              <span>0{index + 1}</span>
              <strong>{label}</strong>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <span className="brand-symbol">C</span>
          <strong>CATAPULT</strong>
          <p>UNLEASH YOURSELF</p>
        </div>
        <div className="footer-contact">
          <span>BOOKING</span>
          <a href="tel:4000574808">400-0574-808</a>
          <a href="tel:057487179988">0574-8717-9988</a>
        </div>
        <div className="footer-address">
          <span>ADD</span>
          <p>宁波市鄞州区甬江大道177号<br />（iPN渔轮厂）</p>
        </div>
        <div className="qr-block">
          <img src="/wechat-qr.jpg" alt="CATAPULT 公众号二维码" />
          <span>扫码关注公众号</span>
        </div>
        <div className="footer-bottom">
          <span>© 2026 CATAPULT</span>
          <span>NINGBO · CHINA</span>
        </div>
      </footer>

      {selectedEvent && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelectedEvent(null)}>
          <section
            className="event-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="modal-close" type="button" onClick={() => setSelectedEvent(null)} aria-label="关闭活动详情">×</button>
            <div className="modal-art"><EventArtwork event={selectedEvent} compact /></div>
            <div className="modal-content">
              <span className="section-index">{selectedEvent.eyebrow}</span>
              <h2 id="modal-title">{selectedEvent.title}</h2>
              <h3>{selectedEvent.subtitle}</h3>
              <p>{selectedEvent.description}</p>
              <div className="modal-details">
                <div><span>DATE / TIME</span><strong>{selectedEvent.date}</strong></div>
                <div><span>LINE UP</span><strong>{selectedEvent.lineup.join(" · ")}</strong></div>
                <div><span>VENUE</span><strong>CATAPULT · iPN 渔轮厂</strong></div>
              </div>
              <a href="tel:4000574808">预订咨询 400-0574-808 ↗</a>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
