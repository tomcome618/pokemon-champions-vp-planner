import { Calculator, Clipboard, Clock, Coins, MessageSquare, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { feedbackLinks, sampleTeams } from './data/sampleTeams';
import { calculateTeamCost } from './lib/calculateVpCost';
import { estimateTimeline } from './lib/estimateTimeline';
import { generateShareReport } from './lib/generateShareReport';
import { parseShowdownPaste } from './lib/parseShowdown';
import { prioritizeUpgrades } from './lib/prioritizeUpgrades';

const formatVp = (value: number) => `${value.toLocaleString()} VP`;

export function App() {
  const [selectedSampleId, setSelectedSampleId] = useState(sampleTeams[0].id);
  const [paste, setPaste] = useState(sampleTeams[0].paste);
  const [currentVp, setCurrentVp] = useState(12000);
  const [rankedBattlesPerDay, setRankedBattlesPerDay] = useState(10);
  const [winRate, setWinRate] = useState(50);
  const [daily, setDaily] = useState(true);
  const [weekly, setWeekly] = useState(false);
  const [copied, setCopied] = useState(false);

  const team = useMemo(() => parseShowdownPaste(paste), [paste]);
  const cost = useMemo(() => calculateTeamCost(team, currentVp), [team, currentVp]);
  const priorities = useMemo(() => prioritizeUpgrades(cost.pokemonCosts, currentVp), [cost.pokemonCosts, currentVp]);
  const timeline = useMemo(
    () => estimateTimeline({
      missingVp: cost.missingVp,
      rankedBattlesPerDay,
      winRate: winRate / 100,
      completesDailyMission: daily,
      completesWeeklyMission: weekly
    }),
    [cost.missingVp, daily, rankedBattlesPerDay, weekly, winRate]
  );
  const report = useMemo(() => generateShareReport(cost, priorities, timeline), [cost, priorities, timeline]);
  const selectedSample = useMemo(
    () => sampleTeams.find((team) => team.id === selectedSampleId),
    [selectedSampleId]
  );

  function chooseSampleTeam(teamId: string) {
    const sample = sampleTeams.find((team) => team.id === teamId);
    if (!sample) return;
    setSelectedSampleId(sample.id);
    setPaste(sample.paste);
  }

  async function copyReport() {
    await navigator.clipboard.writeText(report);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="shell">
      <section className="hero">
        <div className="eyebrow"><Sparkles size={16} /> Pokemon Champions Team VP Planner</div>
        <h1>Paste a team. Know the VP cost. Build it in the right order.</h1>
        <p>
          A focused MVP for the Champions-specific pain point: turning a Showdown-style team into a practical VP budget, upgrade priority, and daily completion plan.
        </p>
      </section>

      <section className="grid">
        <div className="card input-card">
          <div className="card-title"><Clipboard size={20} /> Team paste</div>
          <div className="sample-picker" aria-label="Sample team picker">
            {sampleTeams.map((sample) => (
              <button
                className={sample.id === selectedSampleId ? 'sample-chip active' : 'sample-chip'}
                key={sample.id}
                onClick={() => chooseSampleTeam(sample.id)}
                type="button"
              >
                {sample.archetype}
              </button>
            ))}
          </div>
          <div className="sample-detail">
            {selectedSample ? (
              <>
                <strong>{selectedSample.title}</strong>
                <span>{selectedSample.difficulty} · {selectedSample.bestFor}</span>
                <small>{selectedSample.notes}</small>
              </>
            ) : (
              <>
                <strong>Custom team</strong>
                <span>Paste or edit any Showdown-style team.</span>
                <small>The planner will recalculate VP cost and priority as you type.</small>
              </>
            )}
          </div>
          <textarea value={paste} onChange={(event) => {
            setPaste(event.target.value);
            setSelectedSampleId('custom');
          }} spellCheck={false} />
          <div className="controls">
            <label>
              Current VP
              <input type="number" value={currentVp} min={0} onChange={(event) => setCurrentVp(Number(event.target.value))} />
            </label>
            <label>
              Ranked battles/day
              <input type="number" value={rankedBattlesPerDay} min={0} onChange={(event) => setRankedBattlesPerDay(Number(event.target.value))} />
            </label>
            <label>
              Win rate %
              <input type="number" value={winRate} min={0} max={100} onChange={(event) => setWinRate(Number(event.target.value))} />
            </label>
          </div>
          <div className="checks">
            <label><input type="checkbox" checked={daily} onChange={(event) => setDaily(event.target.checked)} /> Daily mission (+500 VP/day)</label>
            <label><input type="checkbox" checked={weekly} onChange={(event) => setWeekly(event.target.checked)} /> Weekly missions (+9,000 VP/week)</label>
          </div>
        </div>

        <div className="card summary-card">
          <div className="card-title"><Calculator size={20} /> VP summary</div>
          <div className="summary-number">{formatVp(cost.totalCost)}</div>
          <p>Total estimated team cost</p>
          <div className="pill-row">
            <span className={cost.canAffordFullTeam ? 'pill good' : 'pill warn'}>{cost.canAffordFullTeam ? 'Ready to build' : `${formatVp(cost.missingVp)} missing`}</span>
            <span className="pill">{team.length} Pokémon parsed</span>
          </div>
          <div className="timeline">
            <Clock size={18} /> {timeline.explanation}
          </div>
          <button onClick={copyReport}>{copied ? 'Copied report' : 'Copy share report'}</button>
        </div>
      </section>

      <section className="card">
        <div className="card-title"><Coins size={20} /> Cost breakdown</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Pokémon</th><th>Recruit</th><th>Moves</th><th>Nature</th><th>Ability</th><th>Stats</th><th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cost.pokemonCosts.map((pokemon) => (
                <tr key={pokemon.name}>
                  <td>{pokemon.name}</td>
                  <td>{formatVp(pokemon.recruit)}</td>
                  <td>{formatVp(pokemon.moves)}</td>
                  <td>{formatVp(pokemon.nature)}</td>
                  <td>{formatVp(pokemon.ability)}</td>
                  <td>{formatVp(pokemon.stats)}</td>
                  <td><strong>{formatVp(pokemon.total)}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card">
        <div className="card-title"><Sparkles size={20} /> Upgrade priority</div>
        <div className="priority-list">
          {priorities.map((priority) => (
            <article className="priority" key={priority.name}>
              <div className="rank">#{priority.rank}</div>
              <div>
                <h3>{priority.name} <span>{formatVp(priority.totalCost)}</span></h3>
                <p>{priority.reason}</p>
                <small>{priority.budgetAdvice}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="card feedback-card">
        <div className="card-title"><MessageSquare size={20} /> Help validate the VP data</div>
        <p>{feedbackLinks.redditPrompt}</p>
        <div className="feedback-actions">
          <a href={feedbackLinks.githubIssues} target="_blank" rel="noreferrer">Report wrong VP cost</a>
          <button onClick={copyReport} type="button">Copy plan for Reddit/Discord</button>
        </div>
      </section>

      <section className="card notes">
        <h2>What this MVP intentionally does not do yet</h2>
        <p>No full damage calculator, no login, no database, no complete item pricing. The first validation target is simple: do players care about VP-aware team planning enough to paste real teams?</p>
      </section>
    </main>
  );
}
