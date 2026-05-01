import { Calculator, Clipboard, Clock, Coins, Link, MessageSquare, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { feedbackLinks, sampleTeams } from './data/sampleTeams';
import { DEFAULT_COST_ASSUMPTIONS, calculateTeamCost } from './lib/calculateVpCost';
import { compareSampleTeams } from './lib/compareSampleTeams';
import { getCostDataQualityRows, summarizeCostDataQuality } from './lib/costDataQuality';
import { createBudgetMilestones } from './lib/createBudgetMilestones';
import { createFeedbackIssueUrl } from './lib/createFeedbackIssueUrl';
import { estimateTimeline } from './lib/estimateTimeline';
import { generateShareReport } from './lib/generateShareReport';
import { parseOwnedPokemonList } from './lib/ownedPokemon';
import { decodePlannerStateFromQuery, encodePlannerStateToQuery, type PlannerUrlState } from './lib/plannerUrlState';
import { parseShowdownPaste } from './lib/parseShowdown';
import { prioritizeUpgrades } from './lib/prioritizeUpgrades';
import { getSeoContentSections } from './lib/seoContent';

const formatVp = (value: number) => `${value.toLocaleString()} VP`;

function getInitialPlannerState(): PlannerUrlState {
  if (typeof window !== 'undefined') {
    const sharedState = decodePlannerStateFromQuery(window.location.search);
    if (sharedState) return sharedState;
  }

  return {
    paste: sampleTeams[0].paste,
    ownedInput: '',
    currentVp: 12000,
    rankedBattlesPerDay: 10,
    winRate: 50,
    completesDailyMission: true,
    completesWeeklyMission: false,
    costAssumptions: DEFAULT_COST_ASSUMPTIONS
  };
}

export function App() {
  const initialPlannerState = useMemo(() => getInitialPlannerState(), []);
  const [selectedSampleId, setSelectedSampleId] = useState(
    initialPlannerState.paste === sampleTeams[0].paste ? sampleTeams[0].id : 'custom'
  );
  const [paste, setPaste] = useState(initialPlannerState.paste);
  const [ownedInput, setOwnedInput] = useState(initialPlannerState.ownedInput);
  const [currentVp, setCurrentVp] = useState(initialPlannerState.currentVp);
  const [rankedBattlesPerDay, setRankedBattlesPerDay] = useState(initialPlannerState.rankedBattlesPerDay);
  const [winRate, setWinRate] = useState(initialPlannerState.winRate);
  const [daily, setDaily] = useState(initialPlannerState.completesDailyMission);
  const [weekly, setWeekly] = useState(initialPlannerState.completesWeeklyMission);
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [costAssumptions, setCostAssumptions] = useState(initialPlannerState.costAssumptions);

  const team = useMemo(() => parseShowdownPaste(paste), [paste]);
  const ownedPokemonNames = useMemo(() => parseOwnedPokemonList(ownedInput), [ownedInput]);
  const cost = useMemo(
    () => calculateTeamCost(team, currentVp, { ownedPokemonNames }, costAssumptions),
    [costAssumptions, currentVp, ownedPokemonNames, team]
  );
  const ownedTargetCount = useMemo(
    () => cost.pokemonCosts.filter((pokemon) => pokemon.alreadyOwned).length,
    [cost.pokemonCosts]
  );
  const priorities = useMemo(() => prioritizeUpgrades(cost.pokemonCosts, currentVp), [cost.pokemonCosts, currentVp]);
  const budgetMilestones = useMemo(() => createBudgetMilestones(priorities, currentVp), [currentVp, priorities]);
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
  const shareLink = useMemo(() => {
    const query = encodePlannerStateToQuery({
      paste,
      ownedInput,
      currentVp,
      rankedBattlesPerDay,
      winRate,
      completesDailyMission: daily,
      completesWeeklyMission: weekly,
      costAssumptions
    });
    const origin = typeof window === 'undefined' ? '' : `${window.location.origin}${window.location.pathname}`;
    return `${origin}${query}`;
  }, [costAssumptions, currentVp, daily, ownedInput, paste, rankedBattlesPerDay, weekly, winRate]);
  const feedbackIssueUrl = useMemo(
    () => createFeedbackIssueUrl({
      baseUrl: feedbackLinks.githubIssues,
      report,
      shareLink,
      parsedPokemonCount: team.length,
      totalCost: cost.totalCost
    }),
    [cost.totalCost, report, shareLink, team.length]
  );
  const selectedSample = useMemo(
    () => sampleTeams.find((team) => team.id === selectedSampleId),
    [selectedSampleId]
  );
  const comparisonRows = useMemo(
    () => compareSampleTeams(sampleTeams, currentVp, {
      costAssumptions,
      ownedPokemonNames,
      rankedBattlesPerDay,
      winRate: winRate / 100,
      completesDailyMission: daily,
      completesWeeklyMission: weekly
    }),
    [costAssumptions, currentVp, daily, ownedPokemonNames, rankedBattlesPerDay, weekly, winRate]
  );
  const costDataRows = useMemo(() => getCostDataQualityRows(), []);
  const costDataSummary = useMemo(() => summarizeCostDataQuality(costDataRows), [costDataRows]);
  const seoSections = useMemo(() => getSeoContentSections(), []);

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

  async function copyShareLink() {
    await navigator.clipboard.writeText(shareLink);
    window.history.replaceState(null, '', shareLink);
    setCopiedLink(true);
    window.setTimeout(() => setCopiedLink(false), 1800);
  }

  function updateCostAssumption(key: keyof typeof costAssumptions, value: number) {
    setCostAssumptions((current) => ({
      ...current,
      [key]: Number.isFinite(value) ? Math.max(0, value) : 0
    }));
  }

  function resetCostAssumptions() {
    setCostAssumptions(DEFAULT_COST_ASSUMPTIONS);
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
          <div className="owned-box">
            <label>
              Already owned Pokémon
              <textarea
                className="owned-textarea"
                placeholder="Example: Sneasler, Incineroar\nOr paste headers like Pelipper @ Focus Sash"
                value={ownedInput}
                onChange={(event) => setOwnedInput(event.target.value)}
                spellCheck={false}
              />
            </label>
            <small>{ownedTargetCount} target Pokémon marked owned. Recruit cost is removed, but moves/nature/ability/stat tuning still count.</small>
          </div>
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
          <details className="assumptions-box">
            <summary>Advanced: edit VP cost assumptions</summary>
            <p>These are estimates while official and community data changes. Adjust them before sharing a plan if players report different values.</p>
            <div className="assumption-grid">
              <label>
                Recruit cost
                <input type="number" min={0} value={costAssumptions.recruit} onChange={(event) => updateCostAssumption('recruit', Number(event.target.value))} />
              </label>
              <label>
                Move change
                <input type="number" min={0} value={costAssumptions.moveChange} onChange={(event) => updateCostAssumption('moveChange', Number(event.target.value))} />
              </label>
              <label>
                Nature change
                <input type="number" min={0} value={costAssumptions.nature} onChange={(event) => updateCostAssumption('nature', Number(event.target.value))} />
              </label>
              <label>
                Ability change
                <input type="number" min={0} value={costAssumptions.ability} onChange={(event) => updateCostAssumption('ability', Number(event.target.value))} />
              </label>
              <label>
                Stat tuning estimate
                <input type="number" min={0} value={costAssumptions.statsEstimate} onChange={(event) => updateCostAssumption('statsEstimate', Number(event.target.value))} />
              </label>
            </div>
            <button className="secondary-button" onClick={resetCostAssumptions} type="button">Reset default assumptions</button>
          </details>
        </div>

        <div className="card summary-card">
          <div className="card-title"><Calculator size={20} /> VP summary</div>
          <div className="summary-number">{formatVp(cost.totalCost)}</div>
          <p>Total estimated team cost</p>
          <div className="pill-row">
            <span className={cost.canAffordFullTeam ? 'pill good' : 'pill warn'}>{cost.canAffordFullTeam ? 'Ready to build' : `${formatVp(cost.missingVp)} missing`}</span>
            <span className="pill">{team.length} Pokémon parsed</span>
            <span className="pill">{ownedTargetCount} owned in this team</span>
          </div>
          <div className="timeline">
            <Clock size={18} /> {timeline.explanation}
          </div>
          <div className="share-actions">
            <button onClick={copyReport}>{copied ? 'Copied report' : 'Copy share report'}</button>
            <button className="secondary-button share-link-button" onClick={copyShareLink} type="button">
              <Link size={16} /> {copiedLink ? 'Copied share link' : 'Copy shareable link'}
            </button>
          </div>
          <div className="milestone-panel" aria-label="Budget milestones">
            <h2>Budget milestones</h2>
            <p>See how far your current VP gets through the priority order before committing to a full team.</p>
            <div className="milestone-list">
              {budgetMilestones.map((milestone) => (
                <article className={milestone.affordable ? 'milestone affordable' : 'milestone'} key={milestone.name}>
                  <span>#{milestone.rank}</span>
                  <div>
                    <strong>{milestone.name}</strong>
                    <small>{formatVp(milestone.cumulativeCost)} cumulative · {milestone.label}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="card data-quality-card">
        <div className="card-title"><MessageSquare size={20} /> Cost data transparency</div>
        <p className="section-copy">
          {costDataSummary.warning} Current status: {costDataSummary.confirmed} confirmed, {costDataSummary.estimated} estimated, {costDataSummary.unknown} unknown.
        </p>
        <div className="quality-grid">
          {costDataRows.map((row) => (
            <article className="quality-row" key={row.category}>
              <div className="quality-heading">
                <h3>{row.category}</h3>
                <span className={`quality-badge ${row.status}`}>{row.status}</span>
              </div>
              <p>{row.sourceNote}</p>
              <small>
                Default: {row.defaultVp === null ? 'not priced yet' : formatVp(row.defaultVp)} · {row.feedbackPrompt}
              </small>
              <a
                className="quality-feedback-link"
                href={createFeedbackIssueUrl({
                  baseUrl: feedbackLinks.githubIssues,
                  report,
                  shareLink,
                  parsedPokemonCount: team.length,
                  totalCost: cost.totalCost,
                  category: row
                })}
                target="_blank"
                rel="noreferrer"
              >
                Report this category
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="card comparison-card">
        <div className="card-title"><Coins size={20} /> Compare sample teams by VP cost</div>
        <p className="section-copy">Sorted by estimated total cost using your current VP, owned Pokémon, and advanced cost assumptions. Use this when a player asks: “Which team can I afford first?”</p>
        <div className="comparison-grid">
          {comparisonRows.map((row) => (
            <article className={row.canAfford ? 'comparison-row affordable' : 'comparison-row'} key={row.id}>
              <div>
                <h3>{row.archetype}</h3>
                <p>{row.title}</p>
                <small>{row.difficulty} · {row.pokemonCount} Pokémon · {row.bestFor}</small>
                <div className="comparison-insight">
                  <span>{row.ownedCount}/{row.pokemonCount} owned</span>
                  <span>{formatVp(row.recruitVpSaved)} saved</span>
                </div>
                <small className="comparison-reason">{row.recommendationReason}</small>
              </div>
              <div className="comparison-metrics">
                <strong>{formatVp(row.totalCost)}</strong>
                <span>{row.canAfford ? 'Affordable now' : `${formatVp(row.missingVp)} missing`}</span>
                <small>{row.daysNeeded === 0 ? 'Ready today' : `${row.daysNeeded} day${row.daysNeeded === 1 ? '' : 's'} at this pace`}</small>
              </div>
              <button className="secondary-button" onClick={() => chooseSampleTeam(row.id)} type="button">Load team</button>
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <div className="card-title"><Coins size={20} /> Cost breakdown</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Pokémon</th><th>Owned?</th><th>Recruit</th><th>Moves</th><th>Nature</th><th>Ability</th><th>Stats</th><th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cost.pokemonCosts.map((pokemon) => (
                <tr key={pokemon.name}>
                  <td>{pokemon.name}</td>
                  <td>{pokemon.alreadyOwned ? <span className="owned-badge">Owned</span> : 'Need'}</td>
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
          <a href={feedbackIssueUrl} target="_blank" rel="noreferrer">Report wrong VP cost</a>
          <button onClick={copyReport} type="button">Copy plan for Reddit/Discord</button>
        </div>
      </section>

      <section className="card seo-card">
        <div className="card-title"><Sparkles size={20} /> Pokémon Champions VP planner guide</div>
        <p className="section-copy">
          Use this guide when sharing the calculator with players who have not used a VP budgeting tool before.
        </p>
        <div className="seo-grid">
          {seoSections.map((section) => (
            <article className="seo-section" key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card notes">
        <h2>What this MVP intentionally does not do yet</h2>
        <p>No full damage calculator, no login, no database, no complete item pricing. The first validation target is simple: do players care about VP-aware team planning enough to paste real teams?</p>
      </section>
    </main>
  );
}
