"use client";

import { useEffect, useMemo, useState } from "react";

type Filter = "All" | "Free" | "Food" | "After dark" | "Family" | "Outdoors";

type Find = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  tip: string;
  address: string;
  directions: string;
  source: string;
  sourceLabel: string;
  tags: Filter[];
  cost: string;
  timing: string;
};

const filters: Filter[] = ["All", "Free", "Food", "After dark", "Family", "Outdoors"];

const finds: Find[] = [
  {
    id: "the-rock",
    number: "01",
    eyebrow: "Geology · Free",
    title: "Look into “The Rock”",
    description:
      "A public overlook peers into the world’s largest open-face granite quarry—roughly 66 football fields of white Mount Airy granite.",
    tip: "Go on an operating day, stay in the public viewing area, and listen for the warning siren before a quarry blast.",
    address: "151 Granite Quarry Trail",
    directions:
      "https://www.google.com/maps/search/?api=1&query=151+Granite+Quarry+Trail+Mount+Airy+NC",
    source: "https://www.polycor.com/legacy-brands/ncgranite/",
    sourceLabel: "Quarry history",
    tags: ["All", "Free", "Family", "Outdoors"],
    cost: "Free",
    timing: "20–40 min",
  },
  {
    id: "art-walk",
    number: "02",
    eyebrow: "Art · Self-guided",
    title: "Hunt the walls downtown",
    description:
      "A free 12-stop art walk leads beyond the famous photo ops to Melva Houston, Donna Fargo, ghost signs, contemporary murals, and brick sculpture.",
    tip: "Do not miss the Whittling Wall on West Oak Street—eight local figures are sculpted directly from brick.",
    address: "Start near 200 N. Main Street",
    directions:
      "https://www.google.com/maps/search/?api=1&query=Whittling+Wall+Mount+Airy+NC",
    source: "https://www.mountairydowntown.org/publicart",
    sourceLabel: "Art walk details",
    tags: ["All", "Free", "Family", "Outdoors"],
    cost: "Free",
    timing: "45–75 min",
  },
  {
    id: "thursday-jam",
    number: "03",
    eyebrow: "Music · Thursday night",
    title: "Join the old-time jam",
    description:
      "The Earle Theatre is not just a museum. On Thursday nights, musicians and listeners gather for a free, come-as-you-are old-time and bluegrass session.",
    tip: "Bring an instrument if you play—or simply take a seat. The session starts at 7 p.m. and visitors are welcome.",
    address: "142 N. Main Street",
    directions:
      "https://www.google.com/maps/search/?api=1&query=Historic+Earle+Theatre+Mount+Airy+NC",
    source:
      "https://www.yadkinvalleync.com/attractions/thursday-jam-sessions-at-the-earle/",
    sourceLabel: "Jam session details",
    tags: ["All", "Free", "After dark", "Family"],
    cost: "Free",
    timing: "Thu · 7 p.m.",
  },
  {
    id: "radio-show",
    number: "04",
    eyebrow: "Music · Saturday morning",
    title: "Sit inside a live radio show",
    description:
      "WPAQ’s Merry-Go-Round broadcasts live from the Earle every Saturday. It has aired since 1948 and is second in longevity only to the Grand Ole Opry.",
    tip: "The show runs 11 a.m.–1:30 p.m. Admission is $8, or included with an Andy Griffith Museum ticket bought that day.",
    address: "142 N. Main Street",
    directions:
      "https://www.google.com/maps/search/?api=1&query=Historic+Earle+Theatre+Mount+Airy+NC",
    source: "https://www.surryarts.org/shows/surrymusic.html",
    sourceLabel: "Broadcast details",
    tags: ["All", "Family"],
    cost: "$8",
    timing: "Sat · 11–1:30",
  },
  {
    id: "ararat-river",
    number: "05",
    eyebrow: "Outdoors · Bring your gear",
    title: "Paddle through town",
    description:
      "The Ararat River Greenway hides several canoe, kayak, and tube launches along a restored, trout-stocked river corridor.",
    tip: "Riverside Park is an easy place to begin. Check water conditions, wear a PFD, and arrange your take-out before launching.",
    address: "350 Riverside Drive",
    directions:
      "https://www.google.com/maps/search/?api=1&query=Riverside+Park+Mount+Airy+NC",
    source:
      "https://www.visitmayberry.com/attractions/ararat-river-greenway-trail/",
    sourceLabel: "Trail and river details",
    tags: ["All", "Free", "Family", "Outdoors"],
    cost: "Free access",
    timing: "1–3 hours",
  },
  {
    id: "scoops-garden",
    number: "06",
    eyebrow: "Roadside art · Seasonal",
    title: "Follow the ice-cream path",
    description:
      "Behind a converted camper serving ice cream, a path winds into the woods through hand-built metal sculptures and even a small forest chapel.",
    tip: "The sculpture garden is the real surprise. Scoops is seasonal, so confirm opening days before making the drive west of town.",
    address: "5091 W. Pine Street",
    directions:
      "https://www.google.com/maps/search/?api=1&query=Scoops+Ice+Cream+and+Such+Mount+Airy+NC",
    source:
      "https://www.yadkinvalleync.com/attractions/scoops-ice-cream-such/",
    sourceLabel: "Season and location",
    tags: ["All", "Food", "Family", "Outdoors"],
    cost: "Treats $",
    timing: "30–60 min",
  },
  {
    id: "sonker",
    number: "07",
    eyebrow: "Food · Surry County original",
    title: "Taste a sonker, not a cobbler",
    description:
      "Deeper and juicier than cobbler, sonker is a heritage dessert strongly associated with Surry County. There is an official trail devoted to it.",
    tip: "Anchored Bakery is a convenient Mount Airy trail stop. Ask what fruit is in the oven; small batches can sell out.",
    address: "139 Moore Avenue",
    directions:
      "https://www.google.com/maps/search/?api=1&query=Anchored+Bakery+Mount+Airy+NC",
    source: "https://sonkertrail.org/",
    sourceLabel: "Official Sonker Trail",
    tags: ["All", "Food", "Family"],
    cost: "$",
    timing: "20–40 min",
  },
  {
    id: "ground-steak",
    number: "08",
    eyebrow: "Food · Depression-era local",
    title: "Order ground steak “all the way”",
    description:
      "This loose, seasoned beef sandwich was created locally to stretch meat during the Great Depression—and rarely travels beyond Surry County.",
    tip: "Try the Dairy Center’s version with tomato, slaw, and mayo. The family-run stop has served Mount Airy since 1954.",
    address: "407 W. Lebanon Street",
    directions:
      "https://www.google.com/maps/search/?api=1&query=Dairy+Center+Mount+Airy+NC",
    source:
      "https://www.yadkinvalleync.com/guides/surry-ground-steak-trail/",
    sourceLabel: "Ground Steak Trail",
    tags: ["All", "Food", "Family"],
    cost: "$",
    timing: "30–60 min",
  },
  {
    id: "ghost-tour",
    number: "09",
    eyebrow: "History · After dark",
    title: "Walk Mayberry by lantern",
    description:
      "After the storefronts quiet down, a 90-minute tour trades TV nostalgia for true local stories and 13 of Mount Airy’s “less mortal” residents.",
    tip: "The 2026 walking tours depart Fridays and Saturdays at 8 p.m., May through October. Advance tickets are recommended.",
    address: "301 N. Main Street",
    directions:
      "https://www.google.com/maps/search/?api=1&query=Mount+Airy+Museum+of+Regional+History",
    source: "https://www.northcarolinamuseum.org/ghost-tours",
    sourceLabel: "2026 tour schedule",
    tags: ["All", "After dark"],
    cost: "$20",
    timing: "90 min",
  },
  {
    id: "chang-eng",
    number: "10",
    eyebrow: "History · Two-stop story",
    title: "Follow Chang & Eng’s real story",
    description:
      "A family-informed museum tells the complicated lives of Chang and Eng Bunker. Their shared grave is a short drive away at White Plains Baptist Church.",
    tip: "Pair the museum with the grave for the full story. The cemetery is an active, sacred place—visit quietly and respectfully.",
    address: "215 Rockford Street · 614 Old US 601",
    directions:
      "https://www.google.com/maps/search/?api=1&query=White+Plains+Baptist+Church+Mount+Airy+NC",
    source: "https://www.surryarts.org/siamesetwins/",
    sourceLabel: "Museum and history",
    tags: ["All", "Free", "Family", "Outdoors"],
    cost: "Grave free · museum $",
    timing: "1–2 hours",
  },
  {
    id: "gertrude-smith",
    number: "11",
    eyebrow: "Historic home · Free",
    title: "Step into Gertrude’s 1903 home",
    description:
      "This remarkably intact Main Street house remains furnished as the Smith family lived in it, right down to Gertrude’s art and interior details.",
    tip: "Admission is free. It is normally open April–December on Monday, Tuesday, Wednesday, and Friday from 11 a.m.–4 p.m.",
    address: "708 N. Main Street",
    directions:
      "https://www.google.com/maps/search/?api=1&query=Gertrude+Smith+House+Mount+Airy+NC",
    source:
      "https://www.visitmayberry.com/attractions/gertrude-smith-house/",
    sourceLabel: "Current visitor details",
    tags: ["All", "Free", "Family"],
    cost: "Free",
    timing: "45–60 min",
  },
  {
    id: "market-street",
    number: "12",
    eyebrow: "Local scene · Weekends",
    title: "Slip behind Main to Market Street",
    description:
      "One block off the tourist strip, this arts district turns into a pedestrian hangout with makers, breweries, food, and rotating live music.",
    tip: "From May through October, weekends are the sweet spot. Check the downtown calendar for Melva’s Alley music and maker events.",
    address: "Market Street Arts District",
    directions:
      "https://www.google.com/maps/search/?api=1&query=Market+Street+Arts+District+Mount+Airy+NC",
    source: "https://www.mountairydowntown.org/",
    sourceLabel: "Downtown calendar",
    tags: ["All", "Free", "Food", "After dark", "Family", "Outdoors"],
    cost: "Free to browse",
    timing: "1–3 hours",
  },
];

const dayPlan = [
  { time: "8:30", title: "Breakfast like a local", detail: "Ground steak and egg—or the classic sandwich—at the Dairy Center." },
  { time: "9:45", title: "See The Rock", detail: "Drive up to the public quarry overlook before downtown fills in." },
  { time: "11:00", title: "Go live at the Earle", detail: "Take a seat for WPAQ’s Saturday Merry-Go-Round broadcast." },
  { time: "1:45", title: "Find the cobbler", detail: "Walk to Anchored Bakery and ask which flavor came out today." },
  { time: "2:30", title: "Collect the walls", detail: "Follow the public art walk to the Whittling Wall and Market Street." },
  { time: "4:15", title: "Cool off by the Ararat", detail: "Walk, fish, or paddle the river corridor from Riverside Park." },
  { time: "8:00", title: "Meet the less mortal", detail: "Finish with the seasonal lantern-lit downtown ghost tour." },
];

const saturdayRoute =
  "https://www.google.com/maps/dir/?api=1&origin=Dairy+Center+Mount+Airy+NC&destination=Mount+Airy+Museum+of+Regional+History&waypoints=North+Carolina+Granite+Corporation+Mount+Airy+NC%7CHistoric+Earle+Theatre+Mount+Airy+NC%7CAnchored+Bakery+Mount+Airy+NC%7CWhittling+Wall+Mount+Airy+NC%7CRiverside+Park+Mount+Airy+NC";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [pinned, setPinned] = useState<string[]>([]);
  const [trailOpen, setTrailOpen] = useState(false);
  const [loadedPins, setLoadedPins] = useState(false);

  useEffect(() => {
    const restorePins = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem("hidden-mount-airy-trail");
        const parsed = stored ? JSON.parse(stored) : [];
        if (Array.isArray(parsed)) setPinned(parsed);
      } catch {
        // The guide still works when browser storage is unavailable.
      }
      setLoadedPins(true);
    }, 0);
    return () => window.clearTimeout(restorePins);
  }, []);

  useEffect(() => {
    if (!loadedPins) return;
    try {
      window.localStorage.setItem("hidden-mount-airy-trail", JSON.stringify(pinned));
    } catch {
      // Keep the in-session trail usable even if storage is blocked.
    }
  }, [pinned, loadedPins]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setTrailOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const visibleFinds = useMemo(
    () => finds.filter((item) => activeFilter === "All" || item.tags.includes(activeFilter)),
    [activeFilter],
  );

  const pinnedFinds = finds.filter((item) => pinned.includes(item.id));

  const togglePin = (id: string) => {
    setPinned((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Hidden Mount Airy home">
          <span className="brand-mark" aria-hidden="true">MA</span>
          <span>
            <strong>Hidden Mount Airy</strong>
            <small>Field notes from 27030</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#finds">The finds</a>
          <a href="#plan">Plan a day</a>
          <a className="nav-button" href="#finds">
            Start exploring <span aria-hidden="true">↓</span>
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="kicker"><span /> A different side of Mayberry</p>
          <h1>
            Skip the obvious.
            <em>Find the good stuff.</em>
          </h1>
          <p className="hero-intro">
            The live radio show, the secret sculpture path, the local sandwich
            nobody explains—this is Mount Airy beyond the usual checklist.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#finds">
              Uncover the list <span aria-hidden="true">↘</span>
            </a>
            <a className="text-link" href="#plan">
              See the one-day route <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="hero-stats" aria-label="Guide highlights">
            <div><strong>12</strong><span>unexpected finds</span></div>
            <div><strong>7</strong><span>free or nearly free</span></div>
            <div><strong>1</strong><span>very local dessert</span></div>
          </div>
        </div>

        <div className="hero-art" aria-label="Illustrated Mount Airy field guide cover">
          <div className="sun" />
          <div className="mountain mountain-back" />
          <div className="mountain mountain-front" />
          <div className="road" />
          <div className="field-stamp">
            <small>FIELD GUIDE</small>
            <strong>36.50° N</strong>
            <span>BLUE RIDGE FOOTHILLS</span>
          </div>
          <div className="art-caption"><span>✦</span> Worth the detour</div>
        </div>
      </section>

      <section className="intro-strip" aria-label="About this guide">
        <p>Not another top-ten tourist list.</p>
        <span>Every find includes the small detail that makes it worth stopping.</span>
      </section>

      <section className="finds-section" id="finds">
        <div className="section-heading">
          <div>
            <p className="kicker"><span /> The local file</p>
            <h2>12 things worth knowing about</h2>
          </div>
          <p>
            Big enough to remember. Easy enough to miss. Filter by your kind of
            day, then pin anything you want to keep in a personal trail.
          </p>
        </div>

        <div className="filter-row" aria-label="Filter hidden finds">
          <div className="filter-scroll">
            {filters.map((filter) => (
              <button
                type="button"
                key={filter}
                className={activeFilter === filter ? "filter-button active" : "filter-button"}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <p aria-live="polite">Showing {visibleFinds.length} finds</p>
        </div>

        <div className="cards-grid">
          {visibleFinds.map((item) => {
            const isPinned = pinned.includes(item.id);
            return (
              <article className="find-card" key={item.id}>
                <div className="card-topline">
                  <span className="card-number">{item.number}</span>
                  <button
                    type="button"
                    className={isPinned ? "pin-button is-pinned" : "pin-button"}
                    aria-pressed={isPinned}
                    aria-label={`${isPinned ? "Remove" : "Add"} ${item.title} ${isPinned ? "from" : "to"} your trail`}
                    onClick={() => togglePin(item.id)}
                  >
                    <span aria-hidden="true">{isPinned ? "✓" : "+"}</span>
                    {isPinned ? "Pinned" : "Pin it"}
                  </button>
                </div>
                <span className="card-eyebrow">{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="card-meta" aria-label={`${item.cost}, ${item.timing}`}>
                  <span>{item.cost}</span>
                  <span>{item.timing}</span>
                </div>
                <div className="local-tip">
                  <span>KNOW BEFORE YOU GO</span>
                  <p>{item.tip}</p>
                </div>
                <div className="card-address">{item.address}</div>
                <div className="card-links">
                  <a href={item.directions} target="_blank" rel="noreferrer">
                    Directions <span aria-hidden="true">↗</span>
                  </a>
                  <a href={item.source} target="_blank" rel="noreferrer">
                    {item.sourceLabel}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="day-plan" id="plan">
        <div className="plan-heading">
          <p className="kicker light"><span /> Your Saturday, solved</p>
          <h2>One day. No filler.</h2>
          <p>
            This route strings together seven of the best finds without racing
            you around town. It works best on a Saturday during ghost-tour season.
          </p>
        </div>

        <div className="plan-layout">
          <ol className="timeline">
            {dayPlan.map((stop, index) => (
              <li key={stop.time}>
                <div className="timeline-time"><span>{stop.time}</span><small>{index < 3 ? "AM" : "PM"}</small></div>
                <div>
                  <h3>{stop.title}</h3>
                  <p>{stop.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          <aside className="plan-card">
            <span className="plan-card-label">THE SMART VERSION</span>
            <h3>Build around the music.</h3>
            <p>
              Saturday unlocks the live radio broadcast. Thursday unlocks the
              free jam. If music matters most, choose your day first and let the
              rest of the guide fill the gaps.
            </p>
            <a className="paper-button" href={saturdayRoute} target="_blank" rel="noreferrer">
              Open the Saturday route <span aria-hidden="true">↗</span>
            </a>
            <div className="bonus-find">
              <small>BONUS ODDITY</small>
              <strong>Peek into Aunt Bee’s Room</strong>
              <p>
                The Mayberry Motor Inn displays more than 30 authenticated
                Frances Bavier belongings through a viewing window.
              </p>
              <a href="https://www.visitmayberry.com/attractions/aunt-bees-room/" target="_blank" rel="noreferrer">
                See visitor details →
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="planning-notes">
        <div className="notes-heading">
          <p className="kicker"><span /> Before you roll in</p>
          <h2>Three things locals already know</h2>
        </div>
        <div className="notes-grid">
          <article>
            <span>01</span>
            <h3>Thursday and Saturday win.</h3>
            <p>Thursday has the free jam. Saturday has live radio, the Market Street scene, and seasonal ghost tours.</p>
          </article>
          <article>
            <span>02</span>
            <h3>“Open” can be seasonal.</h3>
            <p>Scoops, the historic house, and night tours change with the season. Use the detail links before driving.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Pack for the second half.</h3>
            <p>Comfortable shoes, water, bug spray, and a rain layer turn the art walk and river stop into an actual good time.</p>
          </article>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <span className="brand-mark" aria-hidden="true">MA</span>
          <div><strong>Hidden Mount Airy</strong><small>A field guide for curious people</small></div>
        </div>
        <p>
          Independently assembled from official city, tourism, arts, museum,
          and venue sources. Details reviewed August 15, 2026; hours, prices,
          river conditions, and event schedules can change.
        </p>
        <div className="footer-links">
          <a href="https://www.visitmayberry.com/" target="_blank" rel="noreferrer">Visitor center ↗</a>
          <a href="https://www.mountairy.org/160/Explore-Mount-Airy" target="_blank" rel="noreferrer">City guide ↗</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>

      {pinned.length > 0 && (
        <button className="trail-dock" type="button" onClick={() => setTrailOpen(true)}>
          <span className="dock-count">{pinned.length}</span>
          View my trail
          <span aria-hidden="true">↑</span>
        </button>
      )}

      {trailOpen && (
        <div className="trail-overlay" role="presentation" onMouseDown={() => setTrailOpen(false)}>
          <aside
            className="trail-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="trail-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="sheet-header">
              <div>
                <p className="kicker"><span /> Saved on this device</p>
                <h2 id="trail-title">My hidden trail</h2>
              </div>
              <button type="button" className="sheet-close" onClick={() => setTrailOpen(false)} aria-label="Close my trail">×</button>
            </div>
            <div className="saved-list">
              {pinnedFinds.map((item, index) => (
                <div className="saved-item" key={item.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><strong>{item.title}</strong><small>{item.address}</small></div>
                  <a href={item.directions} target="_blank" rel="noreferrer" aria-label={`Directions to ${item.title}`}>↗</a>
                  <button type="button" onClick={() => togglePin(item.id)} aria-label={`Remove ${item.title} from your trail`}>×</button>
                </div>
              ))}
            </div>
            <div className="sheet-footer">
              <p>Saved locally in this browser—no account needed.</p>
              <button type="button" onClick={() => setPinned([])}>Clear trail</button>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
