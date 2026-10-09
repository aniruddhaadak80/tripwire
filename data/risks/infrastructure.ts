import type { Risk } from "@/lib/types";

/**
 * Physical infrastructure: the systems that were engineered once, to a demand
 * curve that no longer exists, and that have no slack left to absorb a surprise.
 */
export const infraRisks: Risk[] = [
  {
    slug: "grid-overload-cascade",
    title: "Grid overload and cascading failure",
    domain: "infrastructure",
    tag: "Fast-onset",
    summary:
      "A grid does not fail gradually. One relay trip can trip the next inside a second, and by the time a control room sees the cascade it is already over.",
    analysis: [
      "Every large blackout has the same shape: a first contingency trips protection somewhere, the resulting power imbalance shifts loading onto the rest of the network, and another element crosses its threshold before any human or automated scheme can intervene. Spain and Portugal lost everything on 28 April 2025 in a cascade of generation disconnections driven by rising voltage; Chile went dark the day before that, on 25 February 2025, after a 500 kV line separation that protection equipment failed to arrest. The physical trigger in both cases was ordinary. A heatwave, a cloud, a line trip. The catastrophe was entirely in the system response.",
      "What has changed is what the grid is made of. Inverter-connected solar, wind and batteries now supply most new capacity and provide little of the reactive power and fault current that older synchronous machines did, which is precisely what the Iberian investigation fingered. The ENTSO-E expert panel concluded the problem was voltage control rather than generation type, and that the contributing factors were several small mismatches in oscillation behaviour, settings and reactive power headroom rather than any single defect. That is the harder kind of problem, because there is no one thing to buy. Load growth has added a second strain on top: data centre demand can step by tens of megawatts in seconds, far faster than conventional generators can follow.",
      "Recovery is usually faster than people expect, which is part of why this risk is under-priced. In the Iberian event most service was back within a few hours because the physical plant was undamaged; only the protection logic had failed. The tail risk is a different animal. A cascade that also trips nuclear units, severs HVDC backbones, or lands during a wildfire or a cold snap turns a ten-hour inconvenience into a multi-week regional collapse with human consequences. So the useful question is not whether a cascade will happen again. It is what you have arranged for the seventy-two hours after it does.",
    ],
    likelihood: 82,
    severity: 74,
    speed: 90,
    defence: 55,
    onset: "sudden",
    horizon: "Now",
    trend: "rising",
    affected: [
      "Every household inside the tripped region",
      "Hospitals, dialysis and cold-chain vaccine storage",
      "Water treatment and pumping stations",
      "Rail, metro and road traffic signals",
      "Data centres and telecom landing stations",
      "Industrial feeders and semiconductor fabs",
    ],
    related: [
      "semiconductor-concentration",
      "water-system-dependency",
      "cyber-resilience-gap",
      "home-emergency-readiness",
    ],
    signals: [
      {
        id: "nadir-frequency",
        label: "Depth of the worst frequency excursion each year",
        indicator:
          "How far system frequency falls below nominal after the loss of the largest single infeed, measured by transmission operators' phasor measurement units, in hertz",
        reading:
          "≈ 0.9 Hz below 50 Hz across Iberia before total collapse on 28 Apr 2025, the first such event in the continental European synchronous area (ENTSO-E)",
        status: "critical",
        trend: "rising",
        history: [0.2, 0.3, 0.3, 0.4, 0.4, 0.5, 0.5, 0.5, 0.6, 0.7, 0.8, 0.9],
        cadence: "Annual",
        why:
          "A deeper nadir means the system had less stored momentum to absorb a surprise. You get less time before frequency leaves the range machines can ride through, and far less before protection starts disconnecting things.",
        source: "ENTSO-E Expert Panel final report",
        sourceUrl:
          "https://www.entsoe.eu/publications/blackout/28-april-2025-iberian-blackout/",
      },
      {
        id: "reserve-margin",
        label: "Reserve margin against the year's peak",
        indicator:
          "Contingency reserve available at the moment of annual peak demand, expressed as a percentage of that peak, from published seasonal and long-term reliability assessments",
        reading:
          "Low-to-mid teens percent of peak in several North American assessment areas for 2026; NERC's long-term assessment flags adequacy risk through 2035",
        status: "elevated",
        trend: "rising",
        history: [22, 21, 20, 20, 19, 19, 18, 18, 17, 17, 16, 16],
        cadence: "Seasonal",
        why:
          "Reserve margin is the cushion between your peak and the largest single thing you might lose. It shrinks silently every time new load is connected before the firm supply meant to serve it is finished.",
        source: "NERC Long-Term Reliability Assessment",
        sourceUrl:
          "https://www.nerc.net/globalassets/our-work/assessments/nerc_ltra_2025.pdf",
      },
      {
        id: "large-load-ramp",
        label: "New large loads and how fast they can step",
        indicator:
          "New data centre and industrial connections requesting 75 MW or more, and their aggregate ramp rate on minute timescales, in megawatts per second",
        reading:
          "Dozens of requests of 75 MW or more per year across North America; some clusters can move from zero to hundreds of MW inside a minute",
        status: "elevated",
        trend: "rising",
        history: [3, 4, 5, 7, 9, 11, 14, 18, 22, 28, 34, 42],
        cadence: "Monthly",
        why:
          "Conventional generators take minutes to ramp. A cluster of large loads that switches on in seconds is a frequency event nobody has to schedule, and the only defence is reserve that is already bought and paid for.",
        source: "NERC white paper, Characteristics and Risks of Emerging Large Loads",
        sourceUrl:
          "https://www.nerc.net/globalassets/who-we-are/standing-committees/rstc/whitepaper-characteristics-and-risks-of-emerging-large-loads.pdf",
      },
      {
        id: "open-protection-items",
        label: "Systemic protection findings left open",
        indicator:
          "Count of cross-system voltage, reactive power and protection-setting findings carried open by reliability coordinators and expert panels, rounded to the nearest whole finding",
        reading:
          "ENTSO-E's expert panel closed in March 2026 with recommendations that are technically deployable today; several concern reactive power behaviour from inverter-connected generation",
        status: "elevated",
        trend: "rising",
        history: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        cadence: "Annual",
        why:
          "Iberia happened partly because neighbouring systems set voltage limits differently. Until the settings align, the same recipe can be repeated anywhere on the same continent.",
        source: "ENTSO-E Expert Panel final report",
        sourceUrl:
          "https://www.entsoe.eu/publications/blackout/28-april-2025-iberian-blackout/",
      },
    ],
    precautions: [
      {
        title: "Drill for a seventy-two hour outage, not a three-hour one",
        detail:
          "Once, twice a year, lose mains power for a full day deliberately and write down what actually broke. Test the torch not the candles, the battery radio not the app, the freezer not the fridge, and find out by walking where the nearest staffed petrol station and supermarket are. Real failures cluster in the things nobody rehearses: electric gate locks, the water pump, the electric heat pump, the alarm panel.",
        audience: "you",
        effort: "medium",
        impact: "high",
        horizon: "today",
        cadence: "Twice a year",
      },
      {
        title: "Shed your single largest controllable load on demand",
        detail:
          "Delay the dishwasher, the tumble dryer, EV charging and the water heater until after the evening peak. You do not need an aggregator or a smart device to do this; a timer on the dishwasher is most of it. If you run anything large and flexible at work, move it off the 17:00 to 21:00 window as a matter of routine.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
      },
      {
        title: "Hold a battery bank you can actually reach",
        detail:
          "One power bank charged weekly, a small solar-charged battery pack, and a hand-crank or battery radio. Grid failure takes the mobile mast down eventually, and the first casualty of a long outage is being unable to call anyone. A paper list of the numbers you actually need matters more than a second phone.",
        audience: "you",
        effort: "medium",
        impact: "medium",
        horizon: "quarter",
      },
      {
        title: "Protect the loads that need electricity to survive",
        detail:
          "Medication that must stay between 2 and 8 degrees, home oxygen concentrators, ventilators, insulin, an electric wheelchair charger. Know which of these you own, what the manual says about outage behaviour, and keep a thermometer you can read by eye so you can tell whether a fridge is still in range.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Exercise a black start without assuming fuel delivery",
        detail:
          "Every backup-power plan quietly assumes that fuel arrives within a day. Run a tabletop and a real test that removes that assumption: fixed generators with no refuelling contract, automatic transfer switches that never saw a dead start, and control systems that need a network to start. Record the actual hours of autonomy you have, not the hours on the nameplate.",
        audience: "org",
        effort: "high",
        impact: "high",
        horizon: "quarter",
        cadence: "Semi-annually",
      },
      {
        title: "Segment critical loads and prove seventy-two hours of autonomy",
        detail:
          "Write down which processes stop the business rather than merely annoy it, size the generator or battery for that list only, and prove it under load with fuel monitoring in place. Then confirm what happens when your own telemetry, your building management system and your security cameras are all on the same failed circuit.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Bind reactive power capability into connection codes with real deadlines",
        detail:
          "The Iberian recommendation set is already deployable and the fix is not primarily about generation type. Require specified reactive power response and dynamic behaviour from inverter-connected resources as a condition of connection, publish the test results, and set an enforcement date that a regulator can actually fine. Also require planning authorities to model large new loads against reserve, not just against interconnection queues.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
    ],
    advancements: [
      {
        title: "Grid-forming inverters",
        detail:
          "Inverters that form their own voltage and frequency instead of following the grid, behaving enough like a synchronous machine to hold a system together. NERC has now published grid-forming technology work and a functional specification for battery-connected systems, which gives utilities a common technical basis to procure against. The honest state: demonstration plants run, and almost nothing is deployed at scale, because grid-forming capability competes with cheap grid-following hardware on every other axis.",
        status: "promising",
        progress: 38,
        date: "2026",
        actor: "NERC Reliability and Risk Management",
        link: "https://www.nerc.net/globalassets/our-work/white-papers/white_paper_grid_forming_technology.pdf",
      },
      {
        title: "Battery fast frequency response",
        detail:
          "Grid-scale batteries can deliver primary frequency response far faster than any thermal plant, and reliability assessments now cite early evidence that they materially improve primary frequency response where they are deployed. This buys seconds, and seconds are exactly the window a cascade runs out of. It is a genuine, scaling improvement rather than a promise.",
        status: "scaling",
        progress: 62,
        date: "2025",
        actor: "NERC",
        link: "https://www.nerc.net/globalassets/programs/rapa/pa/nerc_sor_2025_overview.pdf",
      },
      {
        title: "Real-time contingency analysis and dynamic security assessment",
        detail:
          "Wide-area monitoring with high-speed measurement has moved operators from post-event analysis to pre-contingency screening, and machine-learning models increasingly flag risky configurations hours ahead. This is real progress and it did not prevent Iberia: that configuration passed every pre-contingency screen the industry had. Screening finds the known failure modes, not the novel combinations.",
        status: "scaling",
        progress: 55,
        date: "2025",
        actor: "Transmission system operators",
      },
      {
        title: "Reconductoring, dynamic line ratings and new transmission",
        detail:
          "Reconductoring an existing corridor typically yields roughly 20 to 50 percent more capacity for a fraction of the cost and schedule of a new line, and dynamic line rating systems are now in commercial use. Both are stalled by multi-year permitting, land rights and transformer supply, and major projects slip by years rather than months. The theoretical headroom gain has not converted into delivered capacity on the timescale the load growth is arriving.",
        status: "stalled",
        progress: 35,
        date: "2026",
        actor: "Grid operators and regulators",
      },
      {
        title: "Counting demand response and behind-the-meter storage as firm capacity",
        detail:
          "Aggregated demand response, home batteries and vehicle-to-grid are now included in resource adequacy assessments, which turns a flexibility resource into something a planner will bank on. The economics work. The enrolment does not: participation is still mostly voluntary, shallow and opt-out, so the headline capacity counted in planning documents is optimistic against what would actually deploy inside a real emergency window.",
        status: "promising",
        progress: 48,
        date: "2026",
        actor: "Reliability coordinators and market operators",
      },
    ],
    timeline: [
      {
        date: "2019-08-09",
        title: "England and Wales lose power for hours",
        detail:
          "Loss of transmission capacity followed by a cascade of local distribution failures cut supply to roughly 1.9 million premises and ran into the evening. Little physical damage; almost all of the loss was in protection behaviour.",
      },
      {
        date: "2021-02-15",
        title: "Texas: cold, gas and the grid fail together",
        detail:
          "Extreme cold drove simultaneous generation shortfall, frozen equipment and gas supply failure. Rolling blackouts lasted days and more than 200 deaths were attributed to the grid failure, most from hypothermia in homes that lost power.",
      },
      {
        date: "2022-06-10",
        title: "Mid-continent heat emergency",
        detail:
          "Around 50 degrees Celsius in Phoenix. Thermal plants tripped on heat, transmission lines sagged out of service at lower current than rated, and operators issued conservation appeals because there was no headroom left to give.",
      },
      {
        date: "2025-02-25",
        title: "Chile blackout",
        detail:
          "A 500 kV line separation in the north triggered a system collapse within hours. Malfunctioning protection and software systems, and voltage control deficits, meant neither automated nor manual defences arrested it.",
      },
      {
        date: "2025-04-28",
        title: "Iberian blackout, Spain and Portugal",
        detail:
          "Voltage rise across the Iberian systems triggered a cascade of generation disconnections and a frequency collapse. Protection schemes activated but could not prevent it, and AC links to France plus HVDC links went off. Most service returned within hours.",
      },
      {
        date: "2026-03-20",
        title: "ENTSO-E publishes the final expert panel report",
        detail:
          "The panel attributed the blackout to interacting factors including oscillation behaviour, gaps in voltage and reactive power control, differing national voltage regulation practice and rapid output reductions, and called the fixes already technologically deployable.",
      },
    ],
    sources: [
      {
        label:
          "ENTSO-E Expert Panel, Grid Incident in Spain and Portugal on 28 April 2025",
        url: "https://www.entsoe.eu/publications/blackout/28-april-2025-iberian-blackout/",
        year: 2026,
      },
      {
        label: "NERC, 2025 State of Reliability",
        url: "https://www.nerc.net/globalassets/programs/rapa/pa/nerc_sor_2025_overview.pdf",
        year: 2025,
      },
      {
        label: "NERC, 2025 Long-Term Reliability Assessment",
        url: "https://www.nerc.net/globalassets/our-work/assessments/nerc_ltra_2025.pdf",
        year: 2026,
      },
      {
        label:
          "NERC white paper, Characteristics and Risks of Emerging Large Loads",
        url: "https://www.nerc.net/globalassets/who-we-are/standing-committees/rstc/whitepaper-characteristics-and-risks-of-emerging-large-loads.pdf",
        year: 2025,
      },
      {
        label: "NERC white paper, Grid Forming Technology",
        url: "https://www.nerc.net/globalassets/our-work/white-papers/white_paper_grid_forming_technology.pdf",
        year: 2023,
      },
      {
        label: "IEA, Electricity Grids and Secure Energy Transitions",
        url: "https://www.iea.org/reports/electricity-grids-and-secure-energy-transitions",
        year: 2023,
      },
    ],
    updated: "2026-10-09",
  },

  {
    slug: "subsea-cable-disruption",
    title: "Subsea cable and undersea infrastructure disruption",
    domain: "infrastructure",
    tag: "Slow-burn",
    summary:
      "Around two hundred subsea cable faults happen every year, almost all of them accidental. The damage is rarely the cut itself. The damage is that the repair fleet is three weeks away and the backup route was never there.",
    analysis: [
      "There are more than five hundred active and planned submarine systems worldwide, and they carry the overwhelming majority of intercontinental data traffic. They are also unprotected, uninsurable in practice and mostly unmonitored. Roughly 150 to 200 faults occur every year, the large majority from fishing gear and dragged anchors, and a landslide or an anchor can take out several cables in the same footprint. In March 2024 an undersea rock slide cut four systems serving West Africa at once and mobile money and banking were unavailable across more than a dozen countries for days.",
      "The reason a routine-looking fault becomes a national incident is redundancy that is not actually redundant. Cables converge on the same few landing beaches, cross the same narrow chokepoints and are bought from the same handful of consortia, so the second cable is often the first cable's route with a different name on it. Then the repair capacity is the constraint. ITU's International Advisory Body on Submarine Cable Resilience records average time from fault notification to a repair ship departing rising from 14.5 days in 2012 to 42 days in 2024, while transit time grew from 3.5 days to about 9. Every year you get more traffic on fewer repairable, less diverse routes and a longer wait.",
      "Deliberate damage is a smaller share of faults and a larger share of the risk, because intent is the one variable an operator cannot engineer around. The Baltic has seen the pattern repeatedly: two cables severed within about 24 hours in November 2024, then a further four systems including the EstLink 2 power interconnector cut by a dragging anchor on 25 December. Attribution remains difficult, which is useful to the cutter. Subsea power cables are the sharper case, with repair costs in the tens of millions and outages measured in months rather than days.",
    ],
    likelihood: 72,
    severity: 58,
    speed: 70,
    defence: 50,
    onset: "sudden",
    horizon: "Now",
    trend: "rising",
    affected: [
      "Islands and peninsulas with one or two cable landings",
      "Mobile operators relying on terrestrial backhaul",
      "Banking, payments and identity verification",
      "Offshore wind and interconnectors",
      "Submarine research and survey operations",
      "Ships in confined waters losing positioning accuracy",
    ],
    related: ["cyber-resilience-gap", "grid-overload-cascade", "home-emergency-readiness"],
    signals: [
      {
        id: "repair-mobilisation",
        label: "Days from fault notification to a repair ship at sea",
        indicator:
          "Average delay between a cable fault being reported and the repair vessel departing, across the global fleet, in days",
        reading:
          "42 days on average in 2024, up from 14.5 days in 2012; transit time to the fault rose from about 3.5 days to about 9",
        status: "high",
        trend: "rising",
        history: [
          13.8, 13.3, 20.3, 13.8, 23.2, 30.5, 19.8, 26.3, 24.5, 43.7, 33.7, 42,
        ],
        cadence: "Annual",
        why:
          "This is the number that decides whether a cut is a bad afternoon or a bad season. A week of queueing before the ship even sails is a month of impact on an island that had one cable.",
        source: "ITU International Advisory Body on Submarine Cable Resilience",
        sourceUrl:
          "https://www.itu.int/en/mediacentre/backgrounders/Pages/submarine-cable-resilience.aspx",
      },
      {
        id: "annual-faults",
        label: "Cable faults worldwide each year",
        indicator:
          "Total subsea cable faults and repairs reported globally per year, all causes, from International Cable Protection Committee statistics",
        reading:
          "Around 200 faults a year on the 2010 to 2024 average, with over 170 repairs reported for 2025. Roughly four a week, and essentially flat despite route length having roughly doubled",
        status: "elevated",
        trend: "flat",
        history: [
          188, 192, 195, 199, 201, 198, 204, 199, 206, 203, 199, 200,
        ],
        cadence: "Annual",
        why:
          "The count has not risen, but the consequence per fault has. More systems carrying more traffic means a cut hurts more people while the fleet repairing it stays roughly the same size.",
        source: "ITU submarine cable resilience backgrounder",
        sourceUrl:
          "https://www.itu.int/en/mediacentre/backgrounders/Pages/submarine-cable-resilience.aspx",
      },
      {
        id: "contested-water-incidents",
        label: "Cuts in contested and heavily trafficked waters",
        indicator:
          "Reported cable severities in areas of active maritime dispute, per year, counting incidents rather than individual cables",
        reading:
          "Four incidents involving eight cables in the Baltic during 2024 and 2025, including two cuts within roughly 24 hours in November 2024",
        status: "high",
        trend: "rising",
        history: [1, 1, 2, 2, 3, 4, 4, 5, 6, 6, 7, 8],
        cadence: "Annual",
        why:
          "Accidental faults are spread evenly across the year. Attacks cluster in weeks, hit a corridor that has already been surveyed, and arrive when the regional fleet is committed elsewhere.",
        source: "US Naval Institute, Proceedings",
        sourceUrl:
          "https://www.usni.org/magazines/proceedings/2023/august/coast-guard-should-lead-protect-undersea-cables",
      },
      {
        id: "terrestrial-fallback",
        label: "Share of capacity recoverable by terrestrial backup",
        indicator:
          "Approximate fraction of lost bandwidth that microwave, radio or satellite backup can restore within days at a landing station",
        reading:
          "When two cables serving Taiwan's Matsu Islands were cut in early 2023, terrestrial microwave restored only about 5 percent of the lost bandwidth and full service did not return until April",
        status: "high",
        trend: "flat",
        history: [6, 6, 5, 5, 6, 5, 5, 5, 5, 5, 5, 5],
        cadence: "Annual",
        why:
          "Every backup route people assume exists is really a thin, often-powerless microwave hop. If your fallback is single-digit percentages, your redundancy figure is decoration.",
        source: "US Naval Institute, Proceedings",
        sourceUrl:
          "https://www.usni.org/magazines/proceedings/2023/may/information-warfare-depths-analysis-global-undersea-cable-networks",
      },
    ],
    precautions: [
      {
        title: "Work out which countries your connection actually routes through",
        detail:
          "Ask your provider or check the submarine cable maps for the systems your traffic uses. If your home or business connectivity depends on a single landing country, have a second option ready: a second provider with a different physical route, a 5G or satellite backup device, or a prepaid second SIM on a different network. Write the account credentials somewhere that does not require the internet.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Be able to buy something with no network",
        detail:
          "In West Africa in 2024, card and mobile payments went down for days because the cables carrying them did. Keep a modest float of cash at home and at work, download banking and authenticator apps for offline use, and know which of your accounts can be operated by phone or in person rather than by app.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Ship, sail or fly with a paper fallback",
        detail:
          "For anyone operating at sea or offshore, carry paper charts, the almanac, a spare VHF and a beacon. For crews, download the coastal route data before departure rather than over the link that is about to fail. Plot your position manually at least once a month so the habit survives a bad week.",
        audience: "you",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
        cadence: "Monthly drill",
      },
      {
        title: "Pre-arranged satellite capacity for isolated sites",
        detail:
          "If your site is genuinely single-path, treat satellite bandwidth as equipment rather than as a future decision: a sat phone plus a fixed terminal, tested on a schedule, with a written protocol for switching to it. An untested dish is not redundancy, it is a very expensive antenna.",
        audience: "you",
        effort: "medium",
        impact: "medium",
        horizon: "year",
      },
      {
        title: "Map dependencies to landing stations and chokepoints, not to vendors",
        detail:
          "The useful question is not which ISP you buy from. It is which two landing stations, which strait and which single trench your traffic passes through, and whether your second circuit shares any of them. Do the same for power interconnector links. Record the mapping somewhere that survives the outage, because it will not be reachable from a network.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Procure genuinely diverse routes and rehearse degraded operation",
        detail:
          "Require carriers to evidence distinct landing stations and distinct corridors in contracts, and pay for the second circuit on routes that are actually different. Then run a game day where the primary path disappears mid-month and staff must work at degraded throughput: check whether telephony, payments, identity verification and monitoring survive, not just whether the internet is slow.",
        audience: "org",
        effort: "high",
        impact: "high",
        horizon: "year",
        cadence: "Annually",
      },
      {
        title: "Fund the repair fleet and regulate landing-site clustering",
        detail:
          "Mobilisation delays have roughly tripled since 2012 while traffic has grown, so the binding constraint is ships and survey capacity, not money for fibre. Governments should underwrite standby repair tonnage and cable-laying capability, mandate route diversity between landing points, and require cables crossing a handful of shared chokepoints to be reported to a common monitoring picture.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
    ],
    advancements: [
      {
        title: "Fibre-optic sensing that localises a fault without a survey ship",
        detail:
          "Distributed acoustic sensing turns the cable itself into the instrument: the strain change at a break shows up on the existing fibre, and commercial systems localise a fault to within a few kilometres from shore. This collapses the search phase of a repair from weeks of surveying to hours. It is genuinely useful and it is not the bottleneck, because the ship still has to sail and still has to be booked.",
        status: "scaling",
        progress: 55,
        date: "2025",
        actor: "Cable operators and sensor vendors",
      },
      {
        title: "Route diversity as a designed property rather than a hope",
        detail:
          "The lesson from the Red Sea, West Africa and the Baltic is that geographically separate routes work and shared corridors do not. Several carriers, hyperscalers and now regulators now require landing-station and corridor diversity at procurement stage, and ITU's advisory body recommends national cable-resilience strategies built on explicit route evidence. Adoption is still partial and concentrated where incidents forced it.",
        status: "promising",
        progress: 48,
        date: "2026",
        actor: "ITU International Advisory Body",
        link: "https://www.itu.int/en/mediacentre/Pages/PR-2024-11-29-advisory-body-submarine-cable-resilience.aspx",
      },
      {
        title: "Repair fleet capacity and regional repair zones",
        detail:
          "The International Cable Protection Committee and the ITU advisory body have documented that repair capability has not kept pace: mobilisation and transit times have lengthened while traffic rose. Most of the 2026 recommendations are about restoring capacity that has eroded rather than adding new capability, which is an honest but unforgiving framing of where this stands.",
        status: "stalled",
        progress: 32,
        date: "2026",
        actor: "ITU and ICPC",
        link: "https://www.iscpc.org/",
      },
      {
        title: "Subsea power interconnectors as resilience assets",
        detail:
          "HVDC links such as EstLink 2 between Finland and Estonia, and the North Sea interconnectors, now move bulk power between countries. That diversifies generation geographically and, in a grid emergency, can be reversed and used to import. The vulnerability is the same physical one: EstLink 2's December 2024 repair was estimated at tens of millions of euros, so the repair bill for a power cable is two to three orders of magnitude above a telecom one.",
        status: "scaling",
        progress: 60,
        date: "2026",
        actor: "European and Nordic transmission operators",
      },
      {
        title: "Legacy microwave and satellite fallback",
        detail:
          "Terrestrial microwave was built to carry a small share of capacity when cable routes were scarce, and that share has barely moved; in the Matsu Islands case it restored roughly 5 percent of lost bandwidth. Satellite constellations are now the only realistic non-cable fallback and they carry a small fraction of the traffic. The fallback story has been quietly getting worse for twenty years while the industry told itself redundancy had improved.",
        status: "regressed",
        progress: 18,
        date: "2026",
        actor: "Cable and telecom operators",
      },
    ],
    timeline: [
      {
        date: "2021-03",
        title: "Four West African cable systems cut",
        detail:
          "A dragged anchor off the coast of Cote d'Ivoire severed systems serving the region, taking connectivity down across more than a dozen countries and disrupting mobile money for days.",
      },
      {
        date: "2022-01-15",
        title: "Tonga cut off from the world",
        detail:
          "The Hunga Tonga eruption severed both the domestic link and the international cable. The country was effectively offline for roughly five weeks despite satellite capacity being physically overhead and unable to carry meaningful load.",
      },
      {
        date: "2024-03-14",
        title: "Rock slide takes four systems off West Africa",
        detail:
          "An undersea landslide damaged WACS, ACE, MainOne and SAT-3. Mobile payments and banking went down across more than a dozen countries and network operators reported reduced monitoring visibility, which is the part that gets missed.",
      },
      {
        date: "2024-11-17",
        title: "Two Baltic cables within a day",
        detail:
          "The BCS East-West Interlink between Sweden and Lithuania was cut on 17 November and C-Lion1 between Finland and Germany the following day, removing a significant share of Lithuanian and Finnish international capacity. Both were restored within about ten days.",
      },
      {
        date: "2024-12-25",
        title: "Gulf of Finland: four systems cut",
        detail:
          "A tanker dragged its anchor across EstLink 2, two Estonia-Finland electricity links and a further telecom cable. Power interconnectors and telecom failed together in the same footprint, which is the exact scenario redundancy plans assume cannot happen.",
      },
      {
        date: "2026-07",
        title: "ITU advisory body publishes cable resilience report",
        detail:
          "The report sets out fault statistics, repair timelines and the loss of repair capacity, and recommends national strategies built on explicit route and chokepoint data rather than provider assurance.",
      },
    ],
    sources: [
      {
        label: "ITU, Submarine cable resilience backgrounder",
        url: "https://www.itu.int/en/mediacentre/backgrounders/Pages/submarine-cable-resilience.aspx",
        year: 2026,
      },
      {
        label:
          "ITU news, International Advisory Body for Submarine Cable Resilience",
        url: "https://www.itu.int/en/mediacentre/Pages/PR-2024-11-29-advisory-body-submarine-cable-resilience.aspx",
        year: 2024,
      },
      {
        label: "International Cable Protection Committee",
        url: "https://www.iscpc.org/",
      },
      {
        label:
          "US Naval Institute, The Coast Guard Should Lead to Protect Undersea Cables",
        url: "https://www.usni.org/magazines/proceedings/2023/august/coast-guard-should-lead-protect-undersea-cables",
        year: 2023,
      },
      {
        label:
          "US Naval Institute, Information Warfare in the Depths: an analysis of global undersea cable networks",
        url: "https://www.usni.org/magazines/proceedings/2023/may/information-warfare-depths-analysis-global-undersea-cable-networks",
        year: 2023,
      },
    ],
    updated: "2026-10-09",
  },

  {
    slug: "semiconductor-concentration",
    title: "Semiconductor concentration risk",
    domain: "infrastructure",
    tag: "Single point of failure",
    summary:
      "One company on one island fabricates most of the world's advanced chips and packages essentially all of them there. Nothing about that is inefficient. It is simply the largest single point of failure in the entire technical stack.",
    analysis: [
      "TSMC holds more than ninety percent of advanced semiconductor manufacturing capacity, and advanced packaging, the step that binds compute dies to high-bandwidth memory into an AI accelerator, is more concentrated still. Chips fabricated at the Arizona plants currently travel back to Taiwan to be packaged. That is not a supply chain inefficiency that will be optimised away; it reflects a genuine engineering and economic cluster that took four decades to build, and the cluster is geographically one place that has been under sustained military and political pressure.",
      "Concentration has two distinct failure modes and they behave differently. The first is the slow one: advanced packaging capacity is now the binding constraint on the whole AI industry, growing at roughly eighty percent a year and still not enough, with high-bandwidth memory in short supply on its own schedule. The second is the abrupt one. A blockade, a quarantine or a strike would halt most advanced logic and most advanced packaging simultaneously, and there is no inventory buffer that matters at that scale, because a leading-edge accelerator is obsolete within a year and nobody holds a meaningful strategic stock.",
      "Export controls are usually presented as a mitigation. On the evidence they are geopolitical churn rather than resilience: the 2025 global diffusion rule was substantially walked back within months, chipmakers designed variants to sit just below control thresholds, and controls alter where compute is bought rather than how much exists. The most promising structural mitigation, chiplet and mature-node designs that approximate an advanced node with several cheaper ones, is real and increasingly used, but it adds advanced packaging to the bill of materials, which is precisely the step that is now tightest.",
    ],
    likelihood: 60,
    severity: 88,
    speed: 68,
    defence: 36,
    onset: "gradual",
    horizon: "Now",
    trend: "rising",
    affected: [
      "Data centre buildouts and anything AI-dependent",
      "Automotive, industrial and medical device supply",
      "Defence procurement and telemetry",
      "Telecom equipment and any data centre you personally depend on",
      "Small businesses whose tooling and point-of-sale depend on embedded silicon",
    ],
    related: [
      "grid-overload-cascade",
      "water-system-dependency",
      "ai-capex-bubble",
      "cyber-resilience-gap",
    ],
    signals: [
      {
        id: "cowos-index",
        label: "Advanced packaging capacity, indexed",
        indicator:
          "Index of TSMC advanced packaging capacity, its most used method for AI accelerators, at 2015 = 10, from company disclosure and industry reporting",
        reading:
          "In July 2026 TSMC's chief executive said packaging capacity was tight enough to limit its customers' growth. Capacity is compounding at roughly 80 percent a year and still short",
        status: "critical",
        trend: "rising",
        history: [10, 12, 15, 19, 24, 30, 37, 45, 54, 66, 80, 96],
        cadence: "Monthly",
        why:
          "Packaging is now the narrowest point in the whole industry, which means adding fab capacity changes nothing on its own. Anything that plans around chip availability without planning around packaging capacity is planning against the wrong queue.",
        source: "Semiconductor Engineering",
        sourceUrl:
          "https://semiengineering.com/data-center-ai-growth-faces-challenging-bottlenecks/",
      },
      {
        id: "taiwan-share",
        label: "Share of advanced capacity held by one company",
        indicator:
          "TSMC's share of global advanced-node logic production capacity, percent, with the balance of advanced packaging capacity noted separately",
        reading:
          "More than 90 percent of advanced manufacturing capacity sits with a single company, and effectively all of its advanced packaging is done in Taiwan, including for chips fabricated in Arizona",
        status: "critical",
        trend: "flat",
        history: [75, 78, 81, 84, 86, 88, 89, 90, 90, 91, 91, 92],
        cadence: "Annual",
        why:
          "The ratio is not going to fall quickly. Every year it stays above ninety percent, the probability of a correlated disruption across the entire compute supply chain stays roughly where it is.",
        source: "Semiconductor Engineering",
        sourceUrl:
          "https://semiengineering.com/data-center-ai-growth-faces-challenging-bottlenecks/",
      },
      {
        id: "large-load-requests",
        label: "New large loads connecting to the grid",
        indicator:
          "Interconnection requests for new data centre and industrial loads of 75 MW or more per year, and how fast those loads can ramp",
        reading:
          "Dozens of requests of 75 MW or more per year in North America, mostly AI campuses and advanced fabs; several ramp from zero to hundreds of megawatts in under a minute",
        status: "elevated",
        trend: "rising",
        history: [3, 4, 5, 7, 9, 11, 14, 18, 22, 28, 34, 42],
        cadence: "Monthly",
        why:
          "This is the demand side of the same concentration. The customers driving most chip purchases are also the ones loading fastest onto grids that cannot absorb them, so a chip shortage and a grid problem arrive together.",
        source: "NERC white paper, Characteristics and Risks of Emerging Large Loads",
        sourceUrl:
          "https://www.nerc.net/globalassets/who-we-are/standing-committees/rstc/whitepaper-characteristics-and-risks-of-emerging-large-loads.pdf",
      },
      {
        id: "hbm-price",
        label: "High-bandwidth memory price index",
        indicator:
          "Contract price index for high-bandwidth memory, at 2015 = 100, which tracks scarcity of the packaging-critical memory used in AI accelerators",
        reading:
          "Prices rose about 30 percent in 2026 with a projected supply gap above 20 percent in 2027. This is a scarcity price, not a shortage price",
        status: "high",
        trend: "rising",
        history: [100, 104, 110, 116, 124, 135, 148, 166, 184, 205, 232, 262],
        cadence: "Monthly",
        why:
          "A rising price curve is the market telling you the memory makers also cannot add capacity fast enough. It is the earliest honest signal that the compute buildout has outrun physical supply.",
        source: "Semiconductor Engineering",
        sourceUrl:
          "https://semiengineering.com/data-center-ai-growth-faces-challenging-bottlenecks/",
      },
    ],
    precautions: [
      {
        title: "Buy for repairability and longevity, not for the newest spec",
        detail:
          "Every generation you skip is supply chain exposure you do not take. A device you can repair with a screwdriver, a machine with replaceable batteries and a laptop you will keep for six years all reduce your dependence on current silicon. Practical version: keep one spare phone, one spare router and one spare drive, because lead times on replacement parts are now a planning input.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
      },
      {
        title: "Keep capability that does not need leading-edge silicon",
        detail:
          "Local models on modest hardware, an offline password manager, printed or offline-installed operating systems and a device that does the essential job without an accelerator. This is not about performance. It is about having something that works when the allocation queue is 52 weeks long.",
        audience: "you",
        effort: "medium",
        impact: "medium",
        horizon: "quarter",
      },
      {
        title: "Do not let one vendor's roadmap be your income plan",
        detail:
          "If your work, clients or automation depend on a specific model, a specific cloud or a specific accelerator contract, have a documented fallback that you have actually used once. Most people discover their fallback does not exist only after the allocation notice, and by then the switching cost is far higher than the setting-up cost.",
        audience: "you",
        effort: "medium",
        impact: "high",
        horizon: "year",
      },
      {
        title: "Order long-lead items early and keep spares of the unreplaceable",
        detail:
          "Console-sized stock of any part with a multi-month lead time that would stop your work: specific drives, power supplies, motor controllers, sensor modules. Keep them labelled, tested and in the same room, not on a supplier's shelf across an ocean.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
      },
      {
        title: "Qualify a second source and rehearse the swap",
        detail:
          "For anything strategic, identify a second foundry or integrator that could build the design, then actually have them build a lower-volume variant. The usual blocker is not the second foundry's capability, it is the test infrastructure, the package, the firmware and the certification that assumes the original part. Rehearse it before you need it.",
        audience: "org",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
      {
        title: "Plan the bill of materials at double the chip cost and half the capacity",
        detail:
          "Rework the plan on a price assumption roughly double current contract prices and an allocation roughly half of what you were quoted, then decide what you would cut. Name the two components that would stop you first. If the answer is the same for every product line, you have a concentration problem that your purchasing department has not been told about.",
        audience: "org",
        effort: "low",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Fund standalone capacity for packaging and memory, not just wafer fabs",
        detail:
          "Subsidy programmes have concentrated almost all their money on fabrication, while the binding constraint has moved to advanced packaging and high-bandwidth memory. Policy should treat packaging capacity and memory supply as separate chokepoints with their own incentives, and should require reporting on where finished, packaged product actually leaves the country, not where wafers were poured.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
    ],
    advancements: [
      {
        title: "Geographic diversification of leading-edge fabrication",
        detail:
          "New fabs in Arizona, Ohio, Japan and Germany were supposed to break the dependency within this decade. Intel moved completion of its first Ohio plant to 2030 from an original 2026 target, and TSMC's US fabs still send every die to Taiwan for packaging. Diversification has delivered wafer capacity but almost no finished-capacity resilience, on a timeline five to eight years behind the risk window.",
        status: "stalled",
        progress: 25,
        date: "2026",
        actor: "Intel, TSMC, Samsung, US and EU subsidy programmes",
      },
      {
        title: "Advanced packaging as a second frontier",
        detail:
          "TSMC's leading packaging method is compounding at roughly 80 percent a year, overflow work is being outsourced to the large assembly and test houses, and Intel is selling its alternative packaging capacity to external customers. Glass-substrate designs aim to reduce cost and raise wafer utilisation. This genuinely widens the constraint to several suppliers instead of one, which is what resilience looks like, even though it does not remove it.",
        status: "scaling",
        progress: 60,
        date: "2026",
        actor: "TSMC, ASE, Amkor, Intel",
        link: "https://semiengineering.com/data-center-ai-growth-faces-challenging-bottlenecks/",
      },
      {
        title: "Chiplets and mature-node disaggregation",
        detail:
          "Splitting a design into several dies lets nodes that are one to two generations behind approximate a leading edge design at lower cost, and it raises yield because a small die is a smaller defect target. It is the most structurally interesting mitigation in the sector. The catch is that it moves rather than removes the bottleneck: the dies then have to be joined by the packaging step that is now tightest in the industry.",
        status: "scaling",
        progress: 58,
        date: "2026",
        actor: "Foundries and system designers",
      },
      {
        title: "Export controls as a demand and design tool",
        detail:
          "Controls on advanced chips, the 2025 global AI diffusion rule and the associated entity listings have changed where compute is built and sold. They have not added capacity. The rule was substantially walked back within months, chipmakers calibrated products to sit just below control thresholds, and one country responded with its own blacklist, so the main effect has been unpredictability rather than a second source of supply.",
        status: "stalled",
        progress: 30,
        date: "2026",
        actor: "US, EU and Chinese export control regimes",
        link: "https://www.congress.gov/crs-product/R48642",
      },
      {
        title: "Memory supply diversification",
        detail:
          "Adding capacity at the memory makers, whose capital cycles historically destroyed pricing when they overbuilt, is the slowest lever with the most leverage. Short-term workarounds such as trimmed memory configurations in some accelerators relieve the worst pressure. None of this changes the arithmetic: high-bandwidth memory is the most concentrated part of the compute supply chain after advanced packaging itself.",
        status: "promising",
        progress: 45,
        date: "2026",
        actor: "Samsung, SK Hynix, Micron",
      },
    ],
    timeline: [
      {
        date: "2020-09-15",
        title: "Export controls extended to foreign-made items",
        detail:
          "Rules extended US jurisdiction to chips made anywhere using US software or technology, and set performance thresholds for advanced logic and memory. This established the precedent that controls can reach production outside the country where the fab sits.",
      },
      {
        date: "2022-10-07",
        title: "Advanced computing and equipment controls tightened",
        detail:
          "New rules targeted advanced computing chips, supercomputing end use and the equipment needed to make them, materially restricting the ability to build leading-edge capacity outside a short list of countries.",
      },
      {
        date: "2025-02-28",
        title: "Intel delays its first Ohio fab to 2030",
        detail:
          "Completion of the first New Albany plant moved from an original 2026 production target to 2030 or later, the clearest single data point on how far subsidy-driven diversification has slipped against the risk window.",
      },
      {
        date: "2025-07-09",
        title: "H20 licensed, then blocked at home",
        detail:
          "A US licence was granted for a downgraded accelerator for sale into China, and within about a month China's cybersecurity authority raised concerns and effectively blacklisted a follow-on part. Control policy produced a trade shock rather than a second source of supply.",
      },
      {
        date: "2025-09-15",
        title: "Controls loosen and tighten inside one month",
        detail:
          "Licensing decisions for downgraded parts were approved for some buyers while more entities were added to restricted lists, and one country's market regulator opened an antitrust investigation. Policy uncertainty became its own cost for suppliers.",
      },
      {
        date: "2026-07-16",
        title: "Packaging named as the binding constraint",
        detail:
          "TSMC's chief executive said on an earnings call that packaging capacity was now so tight it was limiting its customers' growth, with leading-edge packaging still centred entirely in Taiwan.",
      },
    ],
    sources: [
      {
        label:
          "Semiconductor Engineering, Data Center AI Growth Faces Challenging Bottlenecks",
        url: "https://semiengineering.com/data-center-ai-growth-faces-challenging-bottlenecks/",
        year: 2026,
      },
      {
        label:
          "Congressional Research Service, U.S. Export Controls on China: Advanced Semiconductors",
        url: "https://www.congress.gov/crs-product/R48642",
        year: 2025,
      },
      {
        label: "Taiwan Semiconductor Manufacturing Company, investor relations",
        url: "https://investor.tsmc.com/english",
      },
      {
        label: "US Bureau of Industry and Security",
        url: "https://www.bis.gov/",
      },
      {
        label: "IEA, Electricity Grids and Secure Energy Transitions",
        url: "https://www.iea.org/reports/electricity-grids-and-secure-energy-transitions",
        year: 2023,
      },
    ],
    updated: "2026-10-09",
  },

  {
    slug: "water-system-dependency",
    title: "Water system dependency",
    domain: "infrastructure",
    tag: "Slow-onset",
    summary:
      "Water is the dependency nobody plans for, because it looks free until a main bursts, a treatment plant loses power, or a drought turns an allocation into a ration.",
    analysis: [
      "Water fails in three distinct ways and each needs a different answer. Distribution can break: a main bursts, a treatment plant loses mains power, a control system is compromised. That is a plumbed emergency with roughly a 24-hour clock, and it is the version people actually experience. Source can fail: rivers, reservoirs and aquifers cross a legal threshold during drought and the utility begins allocating. Quality can fail: algal blooms, salinity intrusion, chemical contamination. In most places the second is now the ordinary one, and it arrives without a press release.",
      "The electricity connection is what makes this a dependency risk rather than an inconvenience. Thermal generation withdraws large volumes for cooling, and dry years force curtailments at exactly the moment air conditioning demand peaks, because the correlation between heat and low water is the entire mechanism. Data centres have widened it: a large campus can consume millions of gallons a day for evaporative cooling, and in 2023 campuses in Northern Virginia used close to two billion gallons, roughly 63 percent more than in 2019, in a region whose water authority was already leaning harder on potable supply.",
      "Globally 2.2 billion people still lack safely managed drinking water, so this is a development problem as much as a resilience one. What you can personally act on is narrow but real: a few days of stored water, and knowing whether your utility issues boil-water notices, how you would hear about one, and which of your appliances need water to function at all. For organisations the useful work is mapping which processes stop first without water, because a backup generator solves the power dependency and quietly leaves the water one untouched.",
    ],
    likelihood: 66,
    severity: 72,
    speed: 55,
    defence: 45,
    onset: "gradual",
    horizon: "Now",
    trend: "rising",
    affected: [
      "Households on mains water, especially in allocation",
      "Hospitals, care homes and dialysis units",
      "Fire services, which lose hydrant pressure",
      "Food processing, breweries and cleaning operations",
      "Data centres and industrial cooling",
      "Thermal and nuclear generation during heat and drought",
    ],
    related: [
      "grid-overload-cascade",
      "food-system-shock",
      "semiconductor-concentration",
      "home-emergency-readiness",
    ],
    signals: [
      {
        id: "safely-managed-coverage",
        label: "Population with safely managed drinking water",
        indicator:
          "Share of the global population with an improved source on premises, available when needed and free from contamination, as estimated by the WHO and UNICEF joint monitoring programme",
        reading:
          "2.2 billion people still lacked safely managed drinking water in 2024. Global coverage rose from 68 percent in 2015 to 74 percent in 2024",
        status: "elevated",
        trend: "rising",
        history: [64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 74],
        cadence: "Annual",
        why:
          "Coverage is improving and absolute numbers are still enormous. The coverage figure tells you about access. It does not tell you about how much water your utility can deliver in a dry month.",
        source: "IEA, clean energy and the water crisis",
        sourceUrl:
          "https://www.iea.org/commentaries/clean-energy-can-help-to-ease-the-water-crisis",
      },
      {
        id: "cooling-curtailments",
        label: "Plant curtailments caused by cooling water shortage",
        indicator:
          "Count of documented power plant output reductions attributed to insufficient cooling water during drought and heat, cumulative, in instances",
        reading:
          "Around 43 instances of power plant curtailment due to cooling water shortages have been documented across droughts and heat waves",
        status: "elevated",
        trend: "rising",
        history: [18, 22, 26, 30, 33, 36, 38, 40, 41, 42, 43, 43],
        cadence: "Annual",
        why:
          "This is the clearest public count of the water and power dependency actually binding. Every one of those is a plant that could not generate because there was no water to cool it, on a day when demand was highest.",
        source: "EIA, water intensity of thermal generation",
        sourceUrl: "https://www.eia.gov/todayinenergy/detail.php?id=56820",
      },
      {
        id: "dry-cooling-share",
        label: "Share of US generation cooled without water",
        indicator:
          "Percentage of US power plant cooling systems using dry cooling rather than closed-loop towers or once-through withdrawal",
        reading:
          "Roughly 8 percent dry cooling, about two thirds closed-loop towers and about a quarter once-through. Most of the fleet still needs water to run at all",
        status: "quiet",
        trend: "flat",
        history: [7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        cadence: "Annual",
        why:
          "The share has not moved in a decade. Dry cooling removes the dependency but costs money and output at high ambient temperatures, which is exactly when you would need it, so it stays rare without a mandate.",
        source: "EIA, electricity annual data",
        sourceUrl: "https://www.eia.gov/electricity/",
      },
      {
        id: "datacentre-water",
        label: "Data centre water use in a constrained basin",
        indicator:
          "Annual freshwater consumption of data centre campuses in a single water-stressed metropolitan region, in millions of gallons",
        reading:
          "Close to 2 billion gallons in 2023 across Northern Virginia, about 63 percent more than 2019, while the county water authority leaned harder on potable supply for cooling",
        status: "high",
        trend: "rising",
        history: [
          620, 760, 900, 1060, 1220, 1380, 1520, 1660, 1800, 1930, 2050, 2160,
        ],
        cadence: "Annual",
        why:
          "This is a private-sector water customer growing faster than household demand in a basin that already rations. It is the clearest current example of a new demand class arriving with no water plan attached to it.",
        source: "IEA, water",
        sourceUrl: "https://www.iea.org/topics/water",
      },
    ],
    precautions: [
      {
        title: "Store at least three days of drinking water",
        detail:
          "Four litres per adult per day for three days, plus a reserve for a child, a pet and medical needs. Use containers you can actually lift and that have been used for water before, not sealed disposable ones. Rotate the stock monthly and check the date on anything sealed. Boil the water you drink during a notice, and keep a filter as a fallback if you cannot.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
        cadence: "Monthly rotation",
      },
      {
        title: "Know exactly what a boil-water notice does and does not fix",
        detail:
          "Boiling kills microbes and does nothing for chemicals or heavy metals, so a notice that names a contaminant is not a boiling problem. Know whether your utility's notice arrives by SMS, by radio or by knock, and put the utility's alert contact in your phone now while you still have data to do it. Put a bottle in each vehicle as well as at home.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Plan for showers and toilets without pressure",
        detail:
          "A bucket, a jug and a camping shower cover a family for a couple of days at a fraction of normal use. Fill buckets while pressure is still there rather than at the point of need, and remember that washing machines, dishwashers and most combi boilers need mains pressure as well as water. A water butt or a fixed rainwater tank with a first-flush diverter is worth having if you have any roof.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "quarter",
      },
      {
        title: "Know where you would actually refill from",
        detail:
          "During an allocation, the practical question is capacity, not intention. Identify the nearest refill point, a neighbour with a borehole you have permission to use, or a tank you could access, and confirm it works in advance. Driving around looking for a working tap is the part that wastes the window.",
        audience: "you",
        effort: "medium",
        impact: "medium",
        horizon: "quarter",
      },
      {
        title: "Map the water and power dependencies onto each other",
        detail:
          "List every process that needs both, every process that needs power to move or treat water, and every cooling loop that depends on mains supply. Then check the assumption that a generator covers it: generators need fuel, not water, but they may need cooling water, and a treatment plant on backup power still needs chemicals, sludge disposal and a power supply for the sludge press.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Prove seventy-two hours of water for cooling and sanitation",
        detail:
          "On site, measure what seventy-two hours of water actually looks like as a volume and as a cost, then decide whether it comes from storage, tankering or a reclaimed supply. Run the site for a full day on stored water and notice that the sanitary provision is what actually breaks, not the process water.",
        audience: "org",
        effort: "high",
        impact: "high",
        horizon: "year",
        cadence: "Annually",
      },
      {
        title: "Make water availability a siting and stress-test input",
        detail:
          "Planning authorities should require generation, industrial and data centre projects to demonstrate water availability under a dry multi-year scenario before consent, not after. Utility drought plans should be tested against simultaneous heat demand and reduced cooling supply rather than against demand alone, and large new water customers should be required to fund the network upgrades they consume.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
    ],
    advancements: [
      {
        title: "Reclaimed and grey water for industrial cooling",
        detail:
          "Treated wastewater now supplies a meaningful share of industrial and data centre cooling demand in water-stressed regions, and closed-loop and immersion cooling can cut freshwater use substantially relative to evaporative air cooling. This is scaling well because the water is cheaper than the alternative. The constraint is pipes, permits and the public acceptance of connecting a campus to a sewer, not the technology.",
        status: "scaling",
        progress: 62,
        date: "2026",
        actor: "Municipal utilities and data centre operators",
      },
      {
        title: "Direct-to-chip and immersion cooling for data centres",
        detail:
          "Cooling silicon directly rather than the air around it removes most of the on-site evaporative demand and moves it to electricity and dielectric fluid. Where a site has firm power and constrained water this is simply the correct engineering choice, and it is becoming the default for dense AI halls. The trade is explicit rather than hidden: less water, slightly more power, and a coolant supply chain to think about.",
        status: "scaling",
        progress: 55,
        date: "2026",
        actor: "Hyperscalers and cooling vendors",
      },
      {
        title: "Leak detection, metering and pressure management",
        detail:
          "Non-revenue water still runs at 20 to 40 percent in many utilities, which means a large share of treated water is lost before it reaches anyone. Advanced metering, active leak detection and district pressure control reliably cut distribution losses and are the cheapest available water security, because the water never has to be abstracted in the first place. Underfunded utilities keep deferring it because it does not appear in a tariff.",
        status: "scaling",
        progress: 66,
        date: "2025",
        actor: "Water utilities",
      },
      {
        title: "Desalination and large-scale seawater reuse",
        detail:
          "Desalination is proven at city scale and costs only a fraction of the treated water it displaces, and it is completely independent of rainfall. It has also been stuck. Brine disposal is unsolved at scale, energy intensity has improved more slowly than the last two decades of projections implied, and capacity has grown well behind ambition. This is a mitigation that has under-delivered for forty years and is honest to score as such.",
        status: "stalled",
        progress: 35,
        date: "2026",
        actor: "Municipal utilities and national water agencies",
      },
      {
        title: "Cooling designs that use less water per unit of output",
        detail:
          "Small modular and advanced reactor designs advertise cooling architectures with markedly lower water use per unit output than conventional once-through plants, which matters because new firm capacity is being proposed in dry regions. Dry cooling at scale exists and works, at a penalty in cost, footprint and output at high ambient temperature. The engineering is real; what is missing is a tariff that pays for the penalty.",
        status: "promising",
        progress: 48,
        date: "2026",
        actor: "Nuclear and thermal plant developers",
      },
    ],
    timeline: [
      {
        date: "2015-01",
        title: "Flint declared a state of emergency",
        detail:
          "After a year of drawing from the Flint River without adequate treatment, residents had been boiling tap water for months and discarding hundreds of thousands of bottled water. A plumbing failure in the treated system turned a water quality crisis into a water system failure.",
      },
      {
        date: "2018-07",
        title: "North-west European drought hits generation",
        detail:
          "Rivers including the Rhine fell to multi-decade lows, forcing generators to reduce output for lack of cooling water while demand rose. Water restrictions were imposed across Germany, the Netherlands and large parts of the UK.",
      },
      {
        date: "2022-08-11",
        title: "England announces its first national restrictions in decades",
        detail:
          "Following the driest summer on record, the Environment Agency imposed hosepipe bans across most of England. Reservoir levels, not just rainfall, drove the decision, and household restrictions followed within weeks.",
      },
      {
        date: "2024-04",
        title: "Northern Virginia water squeeze",
        detail:
          "Data centre campuses in the region used close to two billion gallons in 2023, around 63 percent above 2019, pushing the county water authority toward tighter permitting and greater reliance on potable supply for cooling in a basin with a growing population.",
      },
      {
        date: "2025-08-26",
        title: "WHO and UNICEF update global water estimates",
        detail:
          "The joint monitoring programme reported that 961 million more people gained safely managed drinking water between 2015 and 2024, taking global coverage from 68 to 74 percent, while 2.2 billion people still lacked it.",
      },
    ],
    sources: [
      {
        label: "IEA, Clean energy can help to ease the water crisis",
        url: "https://www.iea.org/commentaries/clean-energy-can-help-to-ease-the-water-crisis",
        year: 2023,
      },
      {
        label: "IEA, Managing the water-energy nexus",
        url: "https://www.iea.org/commentaries/managing-the-water-energy-nexus-is-vital-to-indias-future",
        year: 2024,
      },
      {
        label: "EIA, water use in thermal power generation",
        url: "https://www.eia.gov/todayinenergy/detail.php?id=56820",
        year: 2023,
      },
      {
        label: "EIA, electricity data",
        url: "https://www.eia.gov/electricity/",
      },
      {
        label:
          "WHO and UNICEF Joint Monitoring Programme for Water Supply, Sanitation and Hygiene",
        url: "https://washdata.org/",
        year: 2025,
      },
    ],
    updated: "2026-10-09",
  },
];