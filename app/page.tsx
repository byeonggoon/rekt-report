import TraceDiagram from "@/components/TraceDiagram";

const GITHUB = "https://github.com/byeonggoon/rekt-report";

export default function Home() {
  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="wrap nav-inner">
          <div className="brand">
            <span className="dot" />
            <span>
              <span className="rekt">rekt</span>-report
            </span>
          </div>
          <div className="nav-links">
            <a href="#pipeline">How it works</a>
            <a href="#method">Methodology</a>
            <a href="#status">Status</a>
            <a className="ghub" href={GITHUB} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="wrap">
          <div className="hero-eyebrow eyebrow">
            <span className="live" />
            Automated on-chain incident response
          </div>
          <h1 className="hero-title">
            Trace stolen funds
            <br />
            before they <span className="strike">cash out</span>.
          </h1>
          <p className="hero-sub">
            When a protocol gets drained, the clock starts. rekt-report follows the money
            across <b>34 chains</b> — unattended — and produces <b>compliance-grade evidence</b>{" "}
            before it reaches an exchange or a mixer.
          </p>
          <div className="hero-cta">
            <a className="btn primary" href="#trace">
              See a live trace →
            </a>
            <a className="btn ghost" href={GITHUB} target="_blank" rel="noreferrer">
              View source
            </a>
          </div>

          {/* TRACE DIAGRAM (collapsed summary → click to expand) */}
          <TraceDiagram />
        </div>
      </header>

      {/* 01 — PIPELINE */}
      <section className="blk" id="pipeline">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-num">01</span>
            <h2 className="sec-title">From incident to evidence</h2>
          </div>
          <div className="pipe">
            {[
              { k: "INPUT", h: "Register", p: "Hacker addresses + incident time. One entry, owner-only." },
              { k: "STEP 01", h: "Trace", p: "N-hop haircut taint propagation across the funds, unattended." },
              { k: "STEP 02", h: "Classify", p: "Endpoints resolved: CEX deposit, mixer, bridge-out, or still open." },
              { k: "STEP 03", h: "Evidence", p: "Methodology, tainted amounts, path TX hashes, timeline — one report." },
              { k: "OUTPUT", h: "Dashboard", p: "Live trace status, public. Report sending stays human-approved." },
            ].map((s, i) => (
              <div className="step" key={s.h}>
                <div className="k">{s.k}</div>
                <div className="arrow">{i === 0 ? "▶" : "→"}</div>
                <h4>{s.h}</h4>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — METHODOLOGY */}
      <section className="blk" id="method">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-num">02</span>
            <h2 className="sec-title">How the trace holds up</h2>
          </div>
          <div className="cards">
            <div className="card">
              <div className="ic">{"// TAINT MODEL"}</div>
              <h4>Haircut, not poison</h4>
              <p>
                Each hop splits a parent&apos;s taint across recipients in proportion to value —
                so the tainted total is conserved, never inflated. Exploration prunes branches
                below <code>1%</code>; reporting-grade FIFO attribution is a later layer.
              </p>
            </div>
            <div className="card">
              <div className="ic">{"// TERMINATION"}</div>
              <h4>Knows when to stop</h4>
              <p>
                A branch halts at a <code>CEX</code> deposit (funds leave on-chain view) or a{" "}
                <code>mixer</code>. Depth, fan-out, and node budgets keep a fan-out explosion
                from ever running away.
              </p>
            </div>
            <div className="card">
              <div className="ic">{"// COVERAGE"}</div>
              <h4>34 EVM chains</h4>
              <p>
                One Etherscan-V2 endpoint keyed by chain id, a ported 1,000+ entity database for
                CEX / mixer / bridge labels. Bridge continuation and non-EVM chains roll out next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — STATUS */}
      <section className="blk" id="status">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-num">03</span>
            <h2 className="sec-title">Built in the open</h2>
          </div>
          <div className="status-grid">
            <div className="buildlog">
              {[
                { done: true, t: "Trace engine — haircut BFS + termination", p: "phase 1a · 18 tests" },
                { done: true, t: "Etherscan V2 fetch + entity database", p: "phase 1b · 16 tests" },
                { done: true, t: "rekt-trace CLI — verified on live data", p: "phase 1c" },
                { done: false, t: "Unattended worker + resumable checkpoints", p: "phase 2" },
                { done: false, t: "Public incident dashboard", p: "phase 3" },
                { done: false, t: "Standard evidence PDF", p: "phase 4" },
              ].map((r) => (
                <div className={`row${r.done ? "" : " todo"}`} key={r.t}>
                  <span className={`mk${r.done ? "" : " todo"}`}>{r.done ? "✓" : "○"}</span>
                  <span className="txt">{r.t}</span>
                  <span className="ph">{r.p}</span>
                </div>
              ))}
            </div>
            <div className="evidence">
              <div className="ehead">$ rekt-trace · ronin · forward · depth 3</div>
              <div className="erow">
                <span>origin</span>
                <b>0x098B…2f96</b>
              </div>
              <div className="erow">
                <span>nodes / edges</span>
                <b>21 / 37</b>
              </div>
              <div className="erow">
                <span className="mix">→ Tornado Cash [mixer]</span>
                <b className="mix">10.5%</b>
              </div>
              <div className="erow">
                <span>taint reaching CEX</span>
                <b className="cex">0.0%</b>
              </div>
              <div className="erow">
                <span>still open</span>
                <b>89.5%</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — PORTFOLIO */}
      <section className="blk" id="folio">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-num">04</span>
            <h2 className="sec-title">A three-part investigation suite</h2>
          </div>
          <div className="folio">
            <a href="https://github.com/byeonggoon/chase-chain" target="_blank" rel="noreferrer">
              <div className="idx">01</div>
              <h4>chase-chain</h4>
              <p>Interactive multi-chain fund-tracing workbench. 37 chains, visual graph, entity risk.</p>
              <div className="role">The investigator&apos;s tool</div>
            </a>
            <a href="https://stableblacklist.vercel.app" target="_blank" rel="noreferrer">
              <div className="idx">02</div>
              <h4>stableblacklist</h4>
              <p>Stablecoin freeze &amp; OFAC sanctions tracker. $3.1B watched, unattended indexing.</p>
              <div className="role">The data infrastructure</div>
            </a>
            <a className="self" href={GITHUB} target="_blank" rel="noreferrer">
              <div className="idx">03</div>
              <h4>rekt-report</h4>
              <p>Automated exploit response — trace, classify, and evidence the stolen funds.</p>
              <div className="role">You are here</div>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="foot-inner">
            <span>rekt-report · automated crypto exploit response</span>
            <span>
              <a href={GITHUB} target="_blank" rel="noreferrer">
                github.com/byeonggoon/rekt-report
              </a>
            </span>
          </div>
          <p className="disclaimer">
            Evidence packages are investigative aids, not legal instruments. Endpoint attribution
            (e.g. exchange deposit addresses) is heuristic and stated with its method. Report
            delivery to issuers or exchanges is always human-reviewed — never auto-sent.
          </p>
        </div>
      </footer>
    </>
  );
}
