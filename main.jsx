import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Heart, Sparkles, Gift, ChevronDown, Volume2, VolumeX } from "lucide-react";
import "./styles.css";
import photo1 from "./her-photo-1.jpg";
import photo2 from "./her-photo-2.jpg";

const wishes = [
  "May your smile always stay as beautiful as it is today.",
  "May every dream in your heart find its way to you.",
  "May life give you a thousand reasons to smile every single day.",
  "May you always remember how deeply loved and precious you are.",
  "And on every birthday after this one, I hope I get to wish you again. ❤️"
];

const reasons = [
  ["Your smile", "It can turn an ordinary moment into my favorite moment."],
  ["Your heart", "The kindness and warmth you carry make you incredibly special."],
  ["Your little things", "The tiny habits, expressions and silly moments are the things I secretly adore most."],
  ["Your presence", "Somehow, just having you around makes everything feel a little better."],
  ["You being you", "I don't need a perfect person. I just love the person you are."],
  ["That beautiful soul", "The more I know you, the more reasons I find to love you."]
];

function Hearts() {
  const hearts = useMemo(
    () => Array.from({ length: 34 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 7 + Math.random() * 7,
      size: 10 + Math.random() * 22
    })),
    []
  );

  return (
    <div className="heart-field" aria-hidden="true">
      {hearts.map(h => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            fontSize: `${h.size}px`
          }}
        >♥</span>
      ))}
    </div>
  );
}

function Countdown() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const target = new Date(now.getFullYear(), 8, 21, 0, 0, 0);
  if (target < now) target.setFullYear(target.getFullYear() + 1);

  const diff = target - now;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return (
    <div className="countdown">
      {[
        ["Days", days],
        ["Hours", hours],
        ["Minutes", minutes],
        ["Seconds", seconds]
      ].map(([label, value]) => (
        <div className="time-box" key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function Bears() {
  return (
    <div className="bear-scene" aria-label="Cute couple bears">
      <div className="cloud c1">♥</div>
      <div className="cloud c2">♥</div>
      <div className="bear bear-left">
        <div className="ear left-ear" />
        <div className="ear right-ear" />
        <div className="bear-face">
          <span className="eye e1">•</span><span className="eye e2">•</span>
          <span className="muzzle">♡</span>
        </div>
        <div className="body">
          <span className="paw p1" /><span className="paw p2" />
          <span className="belly-heart">♥</span>
        </div>
      </div>
      <div className="heart-between">♥</div>
      <div className="bear bear-right">
        <div className="ear left-ear" />
        <div className="ear right-ear" />
        <div className="bear-face">
          <span className="eye e1">•</span><span className="eye e2">•</span>
          <span className="muzzle">♡</span>
        </div>
        <div className="body">
          <span className="paw p1" /><span className="paw p2" />
          <span className="belly-heart">♥</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [musicOn, setMusicOn] = useState(false);
  const [opened, setOpened] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  return (
    <main>
      <Hearts />

      <button className="music-btn" onClick={() => setMusicOn(v => !v)}>
        {musicOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
        {musicOn ? "Music on" : "Music off"}
      </button>

      <section className="hero">
        <div className="hero-glow" />
        <div className="eyebrow"><Sparkles size={15} /> A tiny website made especially for Bubu ❤️</div>
        <div className="bubu-badge">♡ Bubu ♡</div>
        <h1>For my <span>Bubu</span>, the most beautiful girl in my world. ❤️</h1>
        <p className="hero-text">
          I could write a thousand pages about you and still feel like I haven't said enough.
          So I made you this little corner of the internet. Just for you, Bubu. ❤️
        </p>
        <button className="primary-btn" onClick={() => document.getElementById("story").scrollIntoView({behavior:"smooth"})}>
          Open your little surprise <Heart size={18} fill="currentColor" />
        </button>
        <div className="scroll-hint"><ChevronDown size={18} /> keep scrolling, beautiful</div>
      </section>

      <section id="story" className="section reveal">
        <div className="section-tag">01 · A little reminder</div>
        <h2>Bubu, you are <span>so loved.</span></h2>
        <p className="lead">
          Not just because you are beautiful, but because of the person you are.
          Your smile, your kindness, your little expressions, your way of making moments special —
          all of it makes you <em>you</em>, and that's my favorite thing.
        </p>

        <div className="photo-grid">
          <figure className="photo-card tilt-left">
            <div className="photo-wrap"><img src={photo1} alt="A beautiful memory" /></div>
            <figcaption>My favorite kind of beautiful ✨</figcaption>
          </figure>
          <figure className="photo-card tilt-right">
            <div className="photo-wrap"><img src={photo2} alt="A beautiful memory" /></div>
            <figcaption>That smile deserves its own universe ❤️</figcaption>
          </figure>
        </div>
      </section>

      <section className="wish-section">
        <div className="section-tag">02 · Birthday wishes</div>
        <h2>For my <span>Bubu · 21 September</span></h2>
        <p className="lead">The world got a little more beautiful on this date. 🎂</p>
        <Countdown />

        <div className="wish-list">
          {wishes.map((wish, i) => (
            <div className="wish-card" key={wish}>
              <div className="wish-number">0{i + 1}</div>
              <p>{wish}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="reasons-section">
        <div className="section-tag">03 · Why you</div>
        <h2>Things I <span>adore</span> about you</h2>
        <div className="reason-grid">
          {reasons.map(([title, text], i) => (
            <article className="reason-card" key={title}>
              <div className="mini-heart">♥</div>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bears-section">
        <div className="section-tag">04 · Our tiny bear universe</div>
        <h2>Two little bears, <span>one big love.</span></h2>
        <p className="lead">If our love were turned into two tiny bears, I imagine it would look something like this. 🧸</p>
        <Bears />
        <div className="bear-message">“Come here, my little bear. You get a lifetime supply of hugs.” 🧸💕</div>
      </section>

      <section className="letter-section">
        <div className="letter-card">
          <div className="wax">♥</div>
          <div className="section-tag">05 · From my heart</div>
          <h2>A letter for <span>my Bubu</span></h2>
          <div className="letter">
            <p>My beautiful Bubu,</p>
            <p>
              If I could give you one thing in this world, I would give you the ability to see yourself
              through my eyes for just one moment. Maybe then you'd understand why your smile means so much,
              why your happiness matters to me, and why I think you're one of the most beautiful souls I've ever known.
            </p>
            <p>
              I hope you never forget how special you are. On the days when you feel tired, remember that
              there is someone cheering for you. On the days when you doubt yourself, remember that I believe in you.
              And on the happiest days, I hope I'm somewhere beside you, making even more memories.
            </p>
            <p>
              Happy birthday in advance, my Bubu, my love. May your 21 September be as soft, bright and beautiful
              as your heart. And if I get lucky, I want to be there for all the September 21s that come after this one. ❤️
            </p>
            <p className="signature">Always yours,<br /><strong>with all my heart ♥</strong></p>
          </div>
        </div>
      </section>

      <section className="final-section">
        <div className="final-orbit">♥</div>
        <h2>One last thing...</h2>
        <p>No matter how many hearts I put on this website,</p>
        <h3>none of them could hold as much love as my heart has for my Bubu.</h3>
        <button className="secret-btn" onClick={() => setShowSecret(v => !v)}>
          <Gift size={19} /> {showSecret ? "Hide my secret" : "Open one last surprise"}
        </button>
        {showSecret && (
          <div className="secret-message">
            <div className="secret-heart">💗</div>
            <p>
              <strong>Plot twist:</strong> Bubu, you're stuck with me. 😌<br />
              And honestly... I wouldn't have it any other way. 🧸❤️
            </p>
          </div>
        )}
      </section>

      <footer>
        Made with ridiculous amounts of love for Bubu <span>♥</span> · 21 September
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
