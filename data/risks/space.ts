import type { Risk } from "@/lib/types";

export const spaceRisks: Risk[] = [
  {
    slug: "kessler-syndrome",
    title: "Kessler syndrome and the debris cascade",
    domain: "space",
    tag: "Slow-onset, irreversible",
    summary:
      "Low Earth orbit is filling with hardware that no longer works, and collisions between those objects keep generating more of it, so the damage to space infrastructure may keep compounding long after anyone stops launching.",
    analysis: [
      "The mechanism is straightforward and the numbers are no longer theoretical. ESA's own modelling puts the object population larger than 10 cm in orbit in the region of 68,000, with roughly 11,000 of those still active payloads, and total mass in orbit above 17,000 tonnes. Roughly a quarter of everything tracked cannot be tied back to a specific launch or break-up, which is the important detail: the catalogue is not just crowded, it is partly opaque. There have been only four confirmed collisions between catalogued objects in six decades of spaceflight, which sounds reassuring until you notice that a single one of them, the 2009 Iridium 33 and COSMOS 2251 conjunction, produced a debris cloud that took years to disperse.",
      "ESA's 2026 Space Environment Report is unusually blunt about where this is heading. Its Space Environment Health Index jumped from roughly 4 to roughly 50 in a single year against a sustainability benchmark of 1 defined in 2014, and the projection horizon for tracking runaway growth had to be cut from 200 years to 100 because the modelled outcomes got worse faster than the old chart could show. Even if every launch stopped tomorrow, the debris population would keep increasing, because fragmentation events generate objects faster than atmospheric drag can remove them. That is the part that separates this from every other infrastructure risk on this page: the exposure does not reset when the activity that caused it stops.",
      "What changed in the last decade is the traffic, not the physics. Launches roughly tripled between the mid-2010s and 2025, megaconstellations concentrate thousands of spacecraft into a handful of narrow altitude shells, and each of those shells now has a manoeuvring population that must dodge both its neighbours and everything below it. ESA's 2026 report adds a metric it had not tracked before, the on-ground casualty risk from uncontrolled reentries, and notes that it has been rising with traffic even while the absolute probability stays small compared with everyday risks. The genuinely good news is that mitigation is visibly working at the top of the stack: more than three intact objects now reenter per day, controlled reentries of rocket bodies have outnumbered uncontrolled ones for two consecutive years, and a growing share of new objects are intended to burn up completely. None of that touches the accumulated legacy debris, which is the part that matters.",
    ],
    likelihood: 46,
    severity: 84,
    speed: 72,
    defence: 30,
    onset: "gradual",
    horizon: "5–20 yrs",
    trend: "rising",
    affected: [
      "Satellite operators in low Earth orbit, and their customers on the ground",
      "Meteorological, earth observation and climate monitoring missions",
      "Narrowband satellite broadband and direct-to-device services",
      "Any future crewed activity in orbit, and the astronauts in it",
      "Ground communities under reentry corridors, as casualty risk ticks upward",
    ],
    related: [
      "geomagnetic-severe-weather",
      "gnss-interference",
      "subsea-cable-disruption",
      "cyber-resilience-gap",
    ],
    signals: [
      {
        id: "catalogued-objects",
        label: "Number of tracked objects in Earth orbit",
        indicator:
          "Size of the public space object catalogue maintained by space surveillance networks, expressed here as an index with the 2015 level set to 100",
        reading:
          "About 47,200 catalogued objects as of mid-2026, roughly 2.7 times the 2015 level, of which about 11,300 are active payloads and total mass in orbit exceeds 17,000 tonnes",
        status: "high",
        trend: "rising",
        history: [105, 115, 128, 142, 160, 182, 205, 228, 248, 265, 278],
        cadence: "Annual",
        why:
          "This is the raw stock of objects that can collide. Collisions between catalogued objects remain rare, but the probability rises with the square of the population, and roughly a quarter of the catalogue cannot yet be linked to any source event.",
        source: "ESA Space Debris User Portal, DISCOSweb environment statistics",
        sourceUrl: "https://sdup.esoc.esa.int/discosweb/statistics/",
      },
      {
        id: "health-index",
        label: "ESA Space Environment Health Index",
        indicator:
          "Single-number ESA score for cumulative strain placed on the orbital environment, normalised against a sustainable reference scenario defined in 2014 and set to 1",
        reading:
          "Roughly 50 in the 2026 report, up from about 4 in the previous edition. One year moved the score by an order of magnitude; anything above 1 means the environment is being strained beyond sustainable",
        status: "critical",
        trend: "rising",
        history: [1.1, 1.3, 1.5, 1.8, 2.1, 2.4, 2.8, 3.2, 3.6, 4.1, 50],
        cadence: "Annual",
        why:
          "It compresses the entire problem into one comparable number, and the jump from 4 to 50 is the clearest published statement yet that current behaviour in orbit is not sustainable. It also says the deterioration is accelerating, not compounding steadily.",
        source: "ESA Space Environment Report 2026",
        sourceUrl:
          "https://www.esa.int/Space_Safety/Space_Debris/ESA_Space_Environment_Report_2026",
      },
      {
        id: "launch-traffic",
        label: "Orbital launch attempts per year",
        indicator:
          "Count of launch vehicles reaching orbit each year, dominated since 2019 by rideshare deployments and large constellation build-outs",
        reading:
          "About 300 launches in 2025 placing more than 4,000 new payloads, roughly triple the 85 to 90 per year recorded in 2015 and 2016",
        status: "elevated",
        trend: "rising",
        history: [85, 87, 91, 114, 102, 114, 146, 186, 223, 259, 300],
        cadence: "Annual",
        why:
          "Launch rate is the only input to this risk that is still firmly under human control. Every mass of hardware and propellant that stays in orbit is future collision probability, and the trend is unambiguously up.",
        source: "ESA Space Environment Report and Space Debris User Portal",
        sourceUrl: "https://www.esa.int/Space_Safety/Space_Debris",
      },
      {
        id: "unknown-origin",
        label: "Share of catalogued objects of unknown origin",
        indicator:
          "Percentage of catalogued objects classified as unidentified, meaning detected but not yet linked to a specific launch, break-up or anomaly",
        reading:
          "About a quarter of all catalogued objects, on the order of 11,800 out of roughly 47,200. ESA flags the growing unidentified population as a direct signal of the gap between what surveillance can detect and what it can explain",
        status: "elevated",
        trend: "rising",
        history: [12, 13, 15, 17, 18, 20, 21, 23, 24, 25, 25],
        cadence: "Annual",
        why:
          "Objects nobody can attribute cannot be easily modelled, cannot be precisely avoided, and are usually evidence of a fragmentation event that the catalogue caught late. It is a measure of how blind the tracking system is.",
        source: "ESA Space Debris User Portal, DISCOSweb object classification",
        sourceUrl: "https://sdup.esoc.esa.int/discosweb/statistics/",
      },
    ],
    precautions: [
      {
        title: "Learn to navigate without a satellite",
        detail:
          "If your life depends on knowing where you are, you should be able to do it from a paper chart and a compass with no batteries. Practise a dead-reckoning fix on land and, if you work near water, practise a running fix from radar and visual bearings until it is boring rather than theoretical. Do this before you need it.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Cache offline maps and print the route that matters",
        detail:
          "Download the maps for the area you would actually be in if everything stopped working, and print the one journey you could be mid-way through when it happens. A phone that has lost both the network and the sky is an expensive paperweight, and most map apps degrade to a blank screen rather than a useful error.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Carry an out-of-band way to call for help",
        detail:
          "A satellite messenger or a personal locator beacon is the only comms path that does not depend on a low Earth orbit shell being intact. Register the beacon, test it, and tell someone what the test signal means. It is the cheapest insurance against becoming a person that nobody can locate.",
        audience: "you",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Treat reentry warnings as advisory, not evacuation orders",
        detail:
          "Nearly all controlled reentries are planned and announced well in advance, and uncontrolled ones are almost never survivable as a warning. Falling debris is overwhelmingly likely to land in ocean or on sparsely populated ground. Know which authority issues reentry notices in your country, and know that a notice does not mean you should leave your house.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
      },
      {
        title: "Inventory what breaks if your satellite data disappears",
        detail:
          "In any organisation that depends on space services, write down which systems stop working without GNSS timing, satellite imagery, satellite communications or satellite broadband, and for how long. Most organisations discover that their payroll, their access control, their route optimisation and their backup power all quietly share the same single point of failure, and that nobody owns it.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
        cadence: "Annual",
      },
      {
        title: "Buy end-of-life performance into the contract",
        detail:
          "If you procure satellite services, ask how the provider disposes of its spacecraft and what happens to your data when it does. Contracts that require positive proof of disposal, not a policy statement, shift the incentive. This is the only lever a customer has on the problem.",
        audience: "org",
        effort: "medium",
        impact: "medium",
        horizon: "year",
      },
      {
        title: "Fund removal, and bind it to launch rights",
        detail:
          "Governments hold the levers that actually work: licensing conditions, mandatory disposal standards, and money for removing the specific large derelicts that dominate collision risk. National space agencies should be spending on active debris removal rather than on one more demonstration mission that captures a small, cooperative, already-decommissioned target, and access to orbit should require demonstrated end-of-life compliance.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
        cadence: "Annual",
      },
    ],
    advancements: [
      {
        title: "Zero Debris Charter and the ESA Zero Debris approach",
        detail:
          "A non-legally-binding charter developed by around 40 organisations and finalised in October 2023 sets concrete 2030 targets, including keeping debris generation probability below 1 in 1,000 per object over a mission lifetime and achieving end-of-life clearance with at least 99 percent probability. It has attracted broad sign-up and produced a technical to-do list. It has no enforcement mechanism, and the targets are already out of date given the 2025 launch numbers.",
        status: "promising",
        progress: 45,
        date: "2030",
        actor: "ESA and the Zero Debris community",
        link: "https://www.esa.int/Space_Safety/Clean_Space/The_Zero_Debris_Charter",
      },
      {
        title: "Operator-to-operator traffic coordination",
        detail:
          "The Space Data Association, founded in 2009 by three operators, has grown to roughly 30 members pooling operational ephemeris and planned manoeuvres for about 750 to 800 spacecraft through its Space Data Centre. It is the only service of its kind that combines public catalogue data with measured operator positions and intended manoeuvres, and a next-generation replacement platform was contracted in 2025 with a view to operation from early 2026. It is voluntary, non-profit, and does not cover operators outside the membership.",
        status: "scaling",
        progress: 60,
        date: "2026",
        actor: "Space Data Association",
        link: "https://www.space-data.org/sda/",
      },
      {
        title: "Shorter end-of-life disposal windows",
        detail:
          "The shift from a 25-year post-mission orbital lifetime to a 5-year target for low Earth orbit is having a measurable effect: more than three intact objects reenter per day on average, and controlled reentries of rocket bodies have outnumbered uncontrolled ones for two consecutive years. Compliance is real and improving, and it does nothing whatsoever about the objects already up there.",
        status: "scaling",
        progress: 55,
        date: "2025",
        actor: "Space agencies and regulators including ESA and the FCC",
      },
      {
        title: "ClearSpace-1 active debris removal",
        detail:
          "The first mission to remove an unprepared object from orbit has slipped repeatedly and had its industrial structure rewritten. Its original target, a Vega payload adapter called VESPA, was itself struck by untraceable debris in August 2023, forcing a change of target to the PROBA-1 satellite and a restructured contract with OHB SE leading. It was originally flown for 2026 and now sits at 2028 or later. The demonstration is still valuable, but it is no longer on the trajectory that would have mattered.",
        status: "regressed",
        progress: 30,
        date: "2028",
        actor: "ESA, OHB SE and ClearSpace",
        link: "https://www.esa.int/Space_Safety/ClearSpace-1",
      },
      {
        title: "Removing the objects that actually dominate the risk",
        detail:
          "The large, heavy, intact derelicts in crowded altitude shells contribute far more to collision probability than the millions of small fragments do, and removing them is the only intervention that meaningfully bends the projection. ESA states plainly that active debris removal is now required, and that prevention alone is no longer enough. Beyond one small demonstration mission, no agency has committed to a funded programme of removing a genuinely dangerous object.",
        status: "stalled",
        progress: 20,
        date: "2026",
        actor: "No funded programme",
      },
    ],
    timeline: [
      {
        date: "2015-11",
        title: "SpaceX files with the ITU for a 4,425-satellite constellation",
        detail:
          "The filing that became Starlink landed in the same year that the original constellation proposals began circulating widely. It established the shape of the problem: licence a shell holding thousands of spacecraft, then spend a decade filling it.",
      },
      {
        date: "2018-03",
        title: "FCC authorises SpaceX's non-geostationary Ku and Ka system",
        detail:
          "The US Federal Communications Commission approved an authorisation for 4,425 satellites on 28 March 2018, conditioned in part on an approved orbital debris mitigation plan. The size of the authorisation, not the launch rate, is what changed the traffic model.",
      },
      {
        date: "2021-04",
        title: "Licences tightened as constellations fill the low shells",
        detail:
          "The FCC approved a licence modification moving 2,814 satellites down to 540 to 570 km, capped operations at 580 km, and required semiannual reporting on conjunction events and disposal failures. Nearly 200 pleadings argued about collision risk and debris before the order was issued.",
      },
      {
        date: "2023-11",
        title: "Zero Debris Charter finalised and released",
        detail:
          "After a draft zero published in July 2023 drew around 200 comments, the charter was approved in October and released publicly in November at the Seville Space Summit. It was the first document to put numeric 2030 debris targets in front of the whole industry at once.",
      },
      {
        date: "2024-04",
        title: "ClearSpace-1 loses its target to a debris strike",
        detail:
          "ESA approved a reorientation of the first active debris removal mission after untraceable debris hit the VESPA payload adapter in its vicinity, generating new trackable fragments. The target changed to PROBA-1 and the industrial team was restructured, with a launch that had been booked for 2026 pushed years out.",
      },
      {
        date: "2026-09",
        title: "ESA Space Environment Report says the environment got ten times worse in one year",
        detail:
          "The tenth edition of the annual report recorded a Space Environment Health Index rise from roughly 4 to roughly 50 against the 2014 sustainability benchmark, and cut the runaway-growth projection horizon from 200 years to 100 because the modelled numbers had worsened faster than the previous chart could display.",
      },
    ],
    sources: [
      {
        label: "ESA Space Environment Report 2026",
        url: "https://www.esa.int/Space_Safety/Space_Debris/ESA_Space_Environment_Report_2026",
        year: 2026,
      },
      {
        label: "ESA Space Debris User Portal: environment statistics and DISCOSweb",
        url: "https://sdup.esoc.esa.int/discosweb/statistics/",
        year: 2026,
      },
      {
        label: "Inter-Agency Space Debris Coordination Committee",
        url: "https://www.iadc-home.org/",
        year: 2026,
      },
      {
        label: "ESA: the Zero Debris Charter",
        url: "https://www.esa.int/Space_Safety/Clean_Space/The_Zero_Debris_Charter",
        year: 2023,
      },
      {
        label: "ITU Space Sustainability Forum",
        url: "https://www.itu.int/ssf/",
        year: 2026,
      },
    ],
    updated: "2026-10-09",
  },
  {
    slug: "geomagnetic-severe-weather",
    title: "Severe space weather and the blackout scenario",
    domain: "space",
    tag: "Fast-onset, warning-limited",
    summary:
      "A coronal mass ejection can inject currents into the ground in a matter of hours after leaving the Sun, and the systems that absorb those currents first are long power lines, long pipelines, GNSS timing and anything else that was quietly built on them.",
    analysis: [
      "The Sun does not announce anything. A flare is visible in eight-minute sunlight, but the plasma that follows takes one to three days to cross, and the part that matters is the southward magnetic field embedded in it, which is what couples to the magnetosphere and drives the storm. ESA notes that during the November 2025 sequence, in-situ monitoring from the L1 Lagrange point allowed prediction of that storm's impact only about 20 minutes beforehand. Twenty minutes is enough for a spacecraft operator to lower an orbit and not nearly enough for a grid operator to do anything. That asymmetry is the whole problem: the effects arrive essentially together, across power, radio, navigation and orbit control at once.",
      "The damage mechanism on the ground is ordinary physics on an unusual scale. Geomagnetic storms drive quasi-DC currents into long conductors, producing geomagnetically induced currents in transformers, transmission lines, pipelines and railways, and heating winding and core. The 13 March 1989 event that blacked out the Hydro-Quebec grid remains the reference case, and the 12 November 2025 storm, the third most intense of the current solar cycle, produced the largest measured geoelectric field in British Geological Survey records since 2012. GPS precise point positioning errors rose to roughly 2 to 3 metres at high latitudes during that event, against 0.7 metres in the much weaker March 2015 storm and about 1 metre in May 2024. For most people this is an inconvenience. For a synchronised grid, a financial settlement system, a pipeline operator or a satellite fleet it is not.",
      "The honest assessment is that severity is high and likelihood is moderate, and the gap between those two numbers is where all the mitigation effort sits. Satellite designs are hardened, ESA spacecraft took no damage in November 2025, and the radio blackout on the sunlit side lasted 30 to 60 minutes across Europe, Africa and Asia rather than days. Grid operators now model induced currents and protect accordingly, and the British National Grid was unaffected by the May 2024 storm. But this hardening is paid for continuously while the severe event arrives at solar maximum, when the Sun happens to be producing one, and the Carrington event of September 1859 still stands as the demonstration that a far larger event than anything in the modern record is physically available rather than hypothetical.",
    ],
    likelihood: 52,
    severity: 82,
    speed: 90,
    defence: 46,
    onset: "sudden",
    horizon: "< 5 yrs",
    trend: "rising",
    affected: [
      "High-voltage transmission networks and large transformers",
      "GNSS timing-dependent systems: telecoms, finance, transport scheduling",
      "Satellite operators facing elevated drag and radiation exposure",
      "Polar and high-latitude aviation and maritime navigation",
      "Long pipelines, railways and cable systems",
      "Anyone dependent on HF radio, including emergency services",
    ],
    related: [
      "grid-overload-cascade",
      "kessler-syndrome",
      "gnss-interference",
      "cyber-resilience-gap",
    ],
    signals: [
      {
        id: "planetary-k-index",
        label: "Planetary K-index and NOAA storm level",
        indicator:
          "Three-hour planetary Kp index, converted to the NOAA G-scale where Kp 6 is G2 moderate, Kp 7 is G3 strong, Kp 8 to 9- is G4 severe, and Kp 9o is G5 extreme",
        reading:
          "A G2 moderate geomagnetic storm watch was in force for 9 October 2026 following a coronal mass ejection from active region 4549. A severe G4 event can drop GNSS precision, degrade satellite operations and stress the grid",
        status: "elevated",
        trend: "rising",
        history: [6, 7, 5, 5, 5, 5, 6, 7, 9, 9, 7],
        cadence: "Real-time",
        why:
          "This is the single number that determines how much is about to happen, and it is published continuously. Peak Kp has run near 9 in both 2024 and 2025, the busiest years since solar cycle 23.",
        source: "NOAA Space Weather Prediction Center",
        sourceUrl: "https://www.swpc.noaa.gov/",
      },
      {
        id: "solar-wind",
        label: "Solar wind speed and magnetic field orientation at L1",
        indicator:
          "Bulk speed in km/s and the north-south component of the interplanetary magnetic field in nT, measured in situ at the L1 Lagrange point roughly 1.5 million km upstream of Earth",
        reading:
          "Typical speeds of 300 to 600 km/s. The November 2025 coronal mass ejection was initially estimated near 1,500 km/s; sustained southward field for several hours is what actually drives a severe storm",
        status: "elevated",
        trend: "rising",
        history: [420, 430, 450, 440, 470, 500, 520, 560, 590, 620, 660],
        cadence: "Real-time",
        why:
          "Speed is the headline number but direction is the dangerous one. A fast cloud with a northward field mostly passes by, and a slow one that turns southward can do serious damage.",
        source: "NOAA Space Weather Prediction Center, solar wind observations",
        sourceUrl: "https://spaceweather.gov/",
      },
      {
        id: "severe-storm-days",
        label: "Days per year at G4 or above",
        indicator:
          "Count of days in each year on which the observed geomagnetic activity reaches severe or extreme on the NOAA G-scale",
        reading:
          "One or more severe days in most recent years, with 2024 and 2025 both busier than anything since the last solar maximum. Quiet stretches of two to four years are the norm and a severe year does not predict the next one",
        status: "elevated",
        trend: "rising",
        history: [1, 1, 0, 1, 0, 0, 0, 1, 2, 2, 1],
        cadence: "Annual",
        why:
          "Frequency is what separates a hazard from a catastrophe. A single severe day is a bad news story; three in a month is a supply-chain problem for grid transformers and satellite operators.",
        source: "NOAA Space Weather Prediction Center event archive",
        sourceUrl: "https://www.swpc.noaa.gov/",
      },
      {
        id: "satellite-drag",
        label: "Thermospheric heating and satellite drag",
        indicator:
          "Index of upper-atmospheric density and heating driven by storm-time particle precipitation, expressed relative to the 2016 level, tracking the drag increase that pulls unshielded low Earth orbit satellites out of position",
        reading:
          "A severe storm substantially increases drag on unshielded spacecraft for the following day or two, and on high-inclination orbits for longer. Operators respond by pre-emptively lowering orbits, which costs propellant and sometimes mission life",
        status: "elevated",
        trend: "rising",
        history: [100, 105, 111, 118, 126, 134, 143, 153, 169, 184, 195],
        cadence: "Daily",
        why:
          "Drag is the space-specific impact and it has a second-order effect worth watching: the same heating that pulls satellites down also pulls debris down, which is one of the few genuinely helpful things about a storm.",
        source: "ESA Space Weather Office and Swarm mission reporting",
        sourceUrl: "https://www.esa.int/Space_Safety/Space_Weather",
      },
    ],
    precautions: [
      {
        title: "Subscribe to an actual storm warning before you need one",
        detail:
          "Install the official space weather alert feed for your country and turn on the notifications, not just the app. The useful information arrives as a sequence: a coronal mass ejection at the Sun, then a watch, then a warning roughly half a day to three days out, then the storm itself. Knowing which stage you are in is what tells you whether to do anything today or nothing until tomorrow.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Keep a clock that does not depend on anything",
        detail:
          "Power banks, a battery radio and a non-electronic clock in one place. Grid timing, telecom timing and much of the financial system downstream run off GNSS, and GNSS positioning errors of several metres during a severe storm are measured, not hypothetical. If you run anything that cares about time, know what it falls back to.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Plan for a few hours without grid power, not days",
        detail:
          "Severe storms degrade rather than black out. The realistic household case is heating, lighting, water and refrigeration for a few hours, with the cold chain being the thing that actually matters. Charge the power banks in advance, know which appliances share a circuit, and keep the freezer closed.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "quarter",
      },
      {
        title: "Expect HF to fail on the sunlit side and do not fight it",
        detail:
          "Solar flares cause radio blackouts lasting tens of minutes on the side of the planet facing the Sun, and ionospheric disturbances follow the storm for hours. If you rely on amateur radio, HF or short-wave for anything, treat a blackout during a storm as the weather rather than a fault in your equipment, and have a line-of-sight or satellite fallback.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
      },
      {
        title: "Model induced currents and rehearse the storm response",
        detail:
          "Grid operators, pipeline operators and large data centre operators should be able to state, in writing, what they do in the first hour of a G4 event, who declares it, and what gets shed first. The physics of induced currents is well understood and the historical record shows what the failure modes are. The gap is almost never modelling capability, it is the absence of a rehearsed decision.",
        audience: "org",
        effort: "high",
        impact: "high",
        horizon: "year",
        cadence: "Annual",
      },
      {
        title: "Keep GNSS holdover clocks and a non-GNSS fallback",
        detail:
          "Any organisation whose operations depend on precise timing should hold an independent clock disciplined by something other than a satellite: a rubidium or hydrogen maser standard, a longwave radio-disciplined clock, or disciplined holdover on every critical node. The 1989 Quebec blackout is the standard to put in front of a board when asking for the budget.",
        audience: "org",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
      {
        title: "Fund upstream warning and share it across borders",
        detail:
          "Space weather is a borderless hazard with national infrastructure consequences, which is why the useful spending is upstream and shared: dedicated L5 observatories, faster arrival-time modelling, and mandatory reporting of induced-current observations so operators can compare notes. Requiring power and pipeline operators to publish geomagnetically induced current data during storms would improve the modelling for everyone, at near-zero cost.",
        audience: "policy",
        effort: "medium",
        impact: "high",
        horizon: "year",
        cadence: "Annual",
      },
    ],
    advancements: [
      {
        title: "Continuous forecasting, scales and nowcasting from NOAA SWPC",
        detail:
          "Operational forecasts, the NOAA G-scale, three-day geomagnetic outlooks, an aurora nowcast on a 30-minute model, and specific dedicated models for electric power, GPS, HF radio, satellite communications and satellite drag. This is genuinely good infrastructure and it is what turns space weather from a surprise into a scheduled operational item.",
        status: "scaling",
        progress: 70,
        date: "2026",
        actor: "NOAA Space Weather Prediction Center",
        link: "https://www.swpc.noaa.gov/",
      },
      {
        title: "Upstream space weather observatories, ESA Vigil and SHIELD",
        detail:
          "Current in-situ solar wind monitoring from L1 gives roughly 20 minutes of warning before impact, which ESA describes explicitly as the bottleneck. Vigil, to sit at L5 and watch the far side of the Sun, is scheduled for 2031 and would catch events before they rotate into view. The proposed SHIELD mission, further upstream still, would aim for roughly two and a half hours of warning. Both are promising on paper and neither will fly this decade.",
        status: "promising",
        progress: 35,
        date: "2031",
        actor: "ESA",
        link: "https://www.esa.int/Space_Safety/Space_Weather",
      },
      {
        title: "Grid-side hardening and induced-current monitoring",
        detail:
          "Geomagnetically induced current modelling is now routine at major transmission operators, protection schemes have been revised for quasi-DC injection, and real-time monitoring of surface geoelectric fields is deployed in several countries. It worked in May 2024, when the UK's National Grid was unaffected by the strongest storm in two decades. The limits are the age of the transformer fleet and the cost of replacing it, not the modelling.",
        status: "scaling",
        progress: 60,
        date: "2026",
        actor: "Transmission system operators and geological surveys",
      },
      {
        title: "Storm-time spacecraft operations and radiation hardening",
        detail:
          "Spacecraft are designed to survive severe storms, and ESA reported no damage to any of its spacecraft during the November 2025 event. Operators use the alert to enter safe mode, lower orbits preemptively, and postpone spacewalks under the ALARA principle. Spacecraft hardening is the most mature defence on this page, because it was paid for decades ago and the storm has to show up.",
        status: "scaling",
        progress: 68,
        date: "2025",
        actor: "ESA, NASA and satellite operators",
        link: "https://www.esa.int/Space_Safety/Lessons_from_the_November_2025_solar_storm",
      },
      {
        title: "Actionable warning lead time for ground infrastructure",
        detail:
          "The forecast improves as a probability statement days in advance and then collapses. ESA's own account of the November 2025 storm is that the probability of an eruption was forecastable while the exact arrival time and the severity were not, leaving L1 monitoring to provide about 20 minutes. Until an upstream observatory flies, the operators of hard infrastructure are being asked to make decisions with less warning than a hurricane.",
        status: "stalled",
        progress: 25,
        date: "2026",
        actor: "ESA, NOAA and international partners",
      },
    ],
    timeline: [
      {
        date: "2015-03",
        title: "The St Patrick's Day storm",
        detail:
          "A fast coronal mass ejection on 17 March 2015 produced a severe geomagnetic storm with aurora visible at unusually low latitudes and satellite drag events attributed to it. GPS precise point positioning errors rose to roughly 0.7 metres, a useful reference point for how much worse later events got.",
      },
      {
        date: "2017-09",
        title: "The September 2017 X-class sequence",
        detail:
          "Two X-class flares and accompanying coronal mass ejections in early September 2017 produced severe activity and a period of degraded positioning accuracy across much of North America, particularly between 25 and 35 degrees north where the equatorial anomaly had shifted. It remains the clearest recent demonstration of ionospheric structure degrading GNSS well away from the poles.",
      },
      {
        date: "2022-01",
        title: "A volcano reaches the ionosphere",
        detail:
          "The 15 January Hunga Tonga eruption sent atmospheric waves around the world and into space. Measurements from more than 4,700 GNSS receivers tracked travelling ionospheric disturbances over 20,000 km, and the NASA ICON and ESA Swarm missions measured neutral winds up to roughly 450 mph below 190 km altitude, the strongest such winds recorded below that height since ICON launched. It was not a geomagnetic storm, but it was a vivid demonstration that the upper atmosphere can be perturbed from below as well as from the Sun.",
      },
      {
        date: "2024-05",
        title: "The May 2024 storm and the largest auroras in decades",
        detail:
          "The 10 May event was declared the strongest of its type in about twenty years and produced aurora visible far south of the usual range. GPS positioning errors reached around 1 metre and satellite drag rose measurably, yet the UK's National Grid was assessed as having been left unscathed, which is a fair summary of both the hazard and the defences.",
      },
      {
        date: "2025-11",
        title: "Three coronal mass ejections in 48 hours",
        detail:
          "Between 11 and 14 November 2025, three Earth-directed CMEs followed an X5.1 flare, producing a storm that peaked for about six hours. The disturbance index reached roughly -217 nT with Kp 9-, a radio blackout lasted 30 to 60 minutes across Europe, Africa and Asia, ground level enhancement number 77 was recorded, and the largest geoelectric field in British Geological Survey records since 2012 was measured. ESA spacecraft took no damage.",
      },
      {
        date: "2026-10",
        title: "A moderate storm watch as this entry was written",
        detail:
          "NOAA issued a G2 moderate geomagnetic storm watch for 9 October 2026 following a coronal mass ejection from active region 4549, with a high chance of additional moderate activity. It is a useful reminder of the baseline: this is what a routine elevated period looks like, and a severe event is a different order of magnitude rather than a slightly larger version of it.",
      },
    ],
    sources: [
      {
        label: "NOAA Space Weather Prediction Center: forecasts, scales and alerts",
        url: "https://www.swpc.noaa.gov/",
        year: 2026,
      },
      {
        label: "spaceweather.gov: official space weather alerts and dashboards",
        url: "https://spaceweather.gov/",
        year: 2026,
      },
      {
        label: "ESA Space Weather: what space weather is and how ESA monitors it",
        url: "https://www.esa.int/Space_Safety/Space_Weather",
        year: 2026,
      },
      {
        label: "ESA: lessons from the November 2025 solar storm",
        url: "https://www.esa.int/Space_Safety/Lessons_from_the_November_2025_solar_storm",
        year: 2025,
      },
      {
        label: "NASA ICON: Tonga volcanic eruption effects reached space",
        url: "https://www.nasa.gov/missions/icon/nasa-mission-finds-tonga-volcanic-eruption-effects-reached-space/",
        year: 2022,
      },
    ],
    updated: "2026-10-09",
  },
  {
    slug: "gnss-interference",
    title: "GNSS interference and navigation denial",
    domain: "space",
    tag: "Happening now, cheap to cause",
    summary:
      "Satellite navigation signals arrive at the receiver at roughly a billionth of the power of the noise floor, so off-the-shelf jammers and spoofers can knock out or falsify positioning and timing over a region for the price of a used car, and they are now being used that way deliberately.",
    analysis: [
      "The physics is why this is different from every other interference problem. A GNSS signal at the antenna is around -160 dBW, which means a receiver can be overwhelmed by interference of a few milliwatts, and civilian jammers and spoofers are sold openly with no meaningful restrictions. That asymmetry, not sophistication, is the core vulnerability. Interference near conflict zones is long established, but since February 2022 the pattern changed: it spread from where fighting happens to where it does not. Baltic Sea airspace, well outside any war zone, became a standing interference area, and by January 2025 national authorities were reporting thousands of cases per month.",
      "Jamming is the visible half and spoofing is the dangerous half. Jamming drowns out the signal, the receiver notices, and the response is straightforwardly annoying: loss of position, a request for radar vectors, sometimes a diversion. Spoofing transmits counterfeit signals that the receiver accepts as genuine, so the position looks normal and is wrong. In aviation the documented consequences of spoofing include maps that shift, false terrain awareness and warning system alerts, uncoordinated high-rate climbs, and aircraft turning without clearance into restricted airspace. On the ground, falsified timing propagates straight into telecom synchronisation, financial settlement, transport scheduling and anything else that has quietly assumed the signal is honest.",
      "This one is unusual on this page because it is not a future risk, it is a current one that is intensifying, and because the harm has so far been disruption rather than catastrophe. EASA has issued and repeatedly revised a dedicated safety bulletin on GNSS outages, first in March 2022 and most recently as Revision 4 in July 2026, with the affected-region list growing to around 29 flight information regions spanning Europe, the Middle East and Asia. That resilience is bought with backups: crews reverting to inertial systems and ground-based aids, air navigation providers keeping instrument landing systems alive, and regulators being forced to retain the very ground infrastructure that was being rationalised away. The defence spending is real, it is being made under pressure rather than ahead of the problem, and none of the cheap conventional aids being relied on are cheap.",
    ],
    likelihood: 68,
    severity: 64,
    speed: 85,
    defence: 38,
    onset: "sudden",
    horizon: "Now",
    trend: "rising",
    affected: [
      "Commercial aviation, particularly on polar and eastern European routes",
      "Shipping and port operations, where interference has been reported more often since early 2025",
      "Unmanned systems, survey and precision agriculture fleets",
      "Telecom networks, financial settlement and power systems dependent on GNSS timing",
      "Law enforcement, border and public safety users of navigation",
      "Any consumer whose phone is their only map",
    ],
    related: [
      "geomagnetic-severe-weather",
      "kessler-syndrome",
      "subsea-cable-disruption",
      "cyber-resilience-gap",
    ],
    signals: [
      {
        id: "affected-regions",
        label: "Flight information regions with reported interference",
        indicator:
          "Count of ICAO flight information regions appearing in the aviation regulator's published list of areas affected by GNSS jamming or spoofing, refreshed weekly",
        reading:
          "About 29 flight information regions listed as affected in the 30 days to 7 October 2026, spanning eastern and northern Europe, the Baltic, the Black Sea, the Middle East and parts of central and south Asia",
        status: "high",
        trend: "rising",
        history: [0, 0, 0, 2, 5, 12, 16, 20, 24, 27, 29],
        cadence: "Weekly",
        why:
          "This is the closest thing to a public map of the problem and it is the single most useful number to watch. The movement from nothing to a standing regional problem is the story, not the current count.",
        source: "EASA GNSS Outages and Alterations, weekly affected-region list",
        sourceUrl:
          "https://www.easa.europa.eu/en/domains/air-operations/global-navigation-satellite-system-outages-and-alterations",
      },
      {
        id: "baltic-reports",
        label: "Baltic region interference reports per month",
        indicator:
          "Monthly count of distinct aircraft identifiers reporting interference in Baltic states, expressed here as an index with January 2024 set to 100",
        reading:
          "National counts reported to the EU Council rose sharply through 2024 into early 2025: Lithuania went from 556 cases in March 2024 to 1,185 in January 2025, and Poland from 1,908 in October 2024 to 2,732 in January 2025, measured as unique identifiers per month",
        status: "critical",
        trend: "rising",
        history: [100, 135, 170, 205, 235, 260, 275, 300, 330, 365, 400],
        cadence: "Monthly",
        why:
          "These counts are attributed to military sources rather than to criminal opportunism, which changes the character of the threat from vandalism to deliberate denial, and they are rising rather than plateauing.",
        source: "EU Council documents on GNSS jamming and spoofing",
        sourceUrl: "https://www.eurocontrol.int/",
      },
      {
        id: "maritime-reports",
        label: "Shipborne GNSS interference reports",
        indicator:
          "Frequency of reported interference affecting navigation receivers on commercial vessels, expressed as an index with 2024 set to 100",
        reading:
          "Interference affecting maritime GNSS receivers has been observed more frequently since the beginning of 2025, following the aviation trend, with the eastern Baltic and Black Sea regions most affected. Reporting routes and definitions are still not harmonised across flag and coastal states",
        status: "elevated",
        trend: "rising",
        history: [20, 35, 55, 80, 100, 145, 190, 240, 300, 350, 400],
        cadence: "Monthly",
        why:
          "Maritime was late to be affected and is under-reported by comparison with aviation, which means the maritime number is probably a floor rather than a measurement. A ship with a falsified position is a collision risk, not an inconvenience.",
        source: "EASA and EUROCONTROL GNSS interference reporting",
        sourceUrl: "https://www.eurocontrol.int/",
      },
      {
        id: "ground-navaids",
        label: "Conventional ground navigation network coverage",
        indicator:
          "Extent of the retained instrument landing system, VOR, DME and long-range radar network available as a non-satellite fallback, expressed as an index with 2016 set to 100",
        reading:
          "Standing down or rationalising conventional aids has continued as operators cut cost, at the same time as dependence on GNSS has become the recognised safety risk. Regulators are now working to define minimum operating networks of conventional aids instead",
        status: "elevated",
        trend: "falling",
        history: [100, 100, 98, 95, 92, 88, 85, 82, 80, 78, 75],
        cadence: "Annual",
        why:
          "This is the defence that actually gets used when interference occurs, and it has been shrinking in the name of efficiency. Every 1 percent rationalised away in a quiet year is one percent of fallback missing in the year it is needed.",
        source: "EASA and EUROCONTROL joint action plan on GNSS interferences",
        sourceUrl: "https://www.eurocontrol.int/",
      },
    ],
    precautions: [
      {
        title: "Be able to fix your position without a receiver",
        detail:
          "Paper map, compass, and for anyone working near water, radar and visual bearings taken regularly rather than in an emergency. A manual fix takes practice, so the practice has to happen before the interference, not during it. If you navigate for a living, this is a competence requirement rather than a nice-to-have.",
        audience: "you",
        effort: "medium",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Print the map and download the offline one",
        detail:
          "Phone navigation dies in two ways here: no signal means no position, and a spoofed signal means a confidently wrong position with a map that looks normal. A printed map and a pre-downloaded offline region are immune to both, and printing costs almost nothing relative to the consequences of a wrong turn into restricted airspace or a boat that ends up somewhere it should not be.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Hold a clock and a radio that do not depend on satellites",
        detail:
          "Keep a battery-powered radio and a clock disciplined by something other than GNSS. Many phones quietly re-sync to a satellite when they think network time is wrong, so check that yours does not. If your job depends on accurate time, this is not optional: telecom synchronisation, payment settlement and access control all inherit whatever your receiver believes.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Boat owners: keep radar, AIS and the paper chart working",
        detail:
          "Verify that your radar and your electronic chart plotter keep working when the GPS feed does, because a lot of installations degrade together rather than failing independently. Run a manual dead-reckoning passage once so you know what the fallback actually feels like, and check the chart's correction date, since a chart you cannot trust is worse than no chart.",
        audience: "you",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Build PNT holdover into every critical system",
        detail:
          "Any organisation running telecoms, financial settlement, power control, transport scheduling or access control should hold disciplined time independent of GNSS at every node that matters, and should be able to detect that its satellite-derived position has gone implausible rather than assuming the receiver is right. Detection is the harder half: jamming is obvious to a receiver, spoofing is not.",
        audience: "org",
        effort: "high",
        impact: "high",
        horizon: "year",
        cadence: "Annual",
      },
      {
        title: "Retain the fallback navaids you are about to switch off",
        detail:
          "Before decommissioning instrument landing systems, VOR, DME or long-range radar, ask what will take over if the satellite signal is denied tomorrow. Several aviation authorities are now working to define minimum operating networks for exactly this reason. Rationalisation plans and GNSS denial are incompatible objectives and the decision should be made consciously rather than by default.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Regulate the jammers at source and use the spectrum bodies",
        detail:
          "Thirteen EU member states wrote to the Commission in June 2025 asking for immediate common action, including exploring whether ITU registration rights could be suspended while interference continues. The regulatory machinery exists; it is slow, and the devices are on sale to anyone. Tightening consumer restrictions, requiring licensing for jammers and spoofers, and making radio-frequency regulators accountable for coordinated shutdowns would address more of this than any individual operator can.",
        audience: "policy",
        effort: "medium",
        impact: "high",
        horizon: "year",
        cadence: "Annual",
      },
    ],
    advancements: [
      {
        title: "Galileo Open Service Navigation Message Authentication",
        detail:
          "OSNMA was declared an initial service by the European Commission on 24 July 2025, making Galileo the first global navigation system to broadcast free, open authentication of navigation data. Receivers using it can reject counterfeit or replayed messages, it has near-global coverage, and it became mandatory for European smart tachographs in December 2025. The catch is adoption: mass-market receiver support is still partial, and data authentication alone does not protect the ranging measurements.",
        status: "scaling",
        progress: 55,
        date: "2025-07",
        actor: "European Commission, EUSPA and ESA",
        link: "https://www.gsc-europa.eu/",
      },
      {
        title: "Galileo Signal Authentication Service",
        detail:
          "In September 2026, five Galileo satellites transmitted encrypted signal components over Europe during the Norwegian Jammertest campaign, and receivers produced the first civil position fix authenticated through both navigation data and ranging. During the spoofing tests, conventional receivers reported false positions while the SAS receiver held a trusted solution. An initial service declaration is targeted for 2027, so for now this is a demonstrated capability rather than an available one.",
        status: "promising",
        progress: 30,
        date: "2027",
        actor: "ESA and EUSPA",
        link: "https://www.esa.int/Applications/Satellite_navigation",
      },
      {
        title: "Real-world interference testing and receiver hardening",
        detail:
          "The annual Jammertest campaign at Andoya broadcasts a wide range of jamming and spoofing scenarios over the air so manufacturers and operators can test against them. It has driven real design changes: controlled-reception-pattern antennas, terrain-awareness alerting systems that can be verified against non-satellite sources, and dual-frequency multi-constellation receiver specifications that include recovery requirements after interference. This is unglamorous and it is where most of the practical resilience has come from.",
        status: "scaling",
        progress: 65,
        date: "2026",
        actor: "Jammertest consortium, EASA and EUROCONTROL",
        link: "https://www.eurocontrol.int/",
      },
      {
        title: "Regulatory guidance and aviation contingency procedures",
        detail:
          "A joint EASA and EUROCONTROL action plan, produced after a letter from thirteen member states in June 2025 and drawing on a March 2025 crisis exercise, sets a near-term objective of containing the threat through contingency procedures, standard phraseology and harmonised notice criteria, while pushing longer-term resilience work including minimum operating networks of conventional aids. Aviation-specific rules, phrases and training are advancing faster than the underlying physics, and none of it applies to ships, agriculture or your phone.",
        status: "promising",
        progress: 45,
        date: "2026",
        actor: "EASA and EUROCONTROL",
        link: "https://www.easa.europa.eu/",
      },
      {
        title: "Enforcement and spectrum action against jammers",
        detail:
          "Governments have asked the spectrum regulator to act and the international union to consider suspending registration rights during interference. The physical devices remain freely purchasable, seizing them requires national policing that has not scaled to the volume of reports, and no procedural route has yet changed a single registration. This is the mitigation that would remove the threat at source and it has made no measurable progress.",
        status: "stalled",
        progress: 15,
        date: "2026",
        actor: "ITU and national radio frequency regulators",
        link: "https://www.itu.int/",
      },
    ],
    timeline: [
      {
        date: "2016-12",
        title: "Galileo declares initial services, including a regulated service for governments",
        detail:
          "The Galileo Initial Services Declaration brought the open service and the encrypted Public Regulated Service into operation. PRS was designed specifically to remain usable when open services are degraded, including under malicious interference, and it is the template for everything that has followed.",
      },
      {
        date: "2022-03",
        title: "Aviation regulators issue a dedicated GNSS interference bulletin",
        detail:
          "A safety information bulletin was first published in March 2022 in response to a notable increase in jamming and spoofing around conflict zones and sensitive areas including the Mediterranean, Black Sea, Middle East, Baltic and Arctic. Its core message was that interference could not be predicted and required contingency procedures, alternative navigation and crew training.",
      },
      {
        date: "2024-08",
        title: "Interference steps up sharply in the Baltic",
        detail:
          "From August 2024 a dramatic increase in jamming and spoofing of GNSS signals for aircraft was recorded in the Baltic Sea region, attributed in official reporting to sources in Russia and Belarus. The pattern was described as systematic and deliberate rather than incidental, with damage achieved cheaply and without accountability.",
      },
      {
        date: "2025-01",
        title: "Maritime interference follows and Baltic counts peak",
        detail:
          "From the beginning of 2025, interference to GNSS receiving signals on sea vessels was observed more frequently alongside the aviation reports. Monthly counts reported by national authorities peaked around this period, with Poland at about 2,732 and Lithuania at about 1,185 in January 2025, measured as unique aircraft identifiers per month.",
      },
      {
        date: "2025-06",
        title: "Thirteen member states demand immediate common action",
        detail:
          "A letter to the European Commission on 6 June 2025 asked for coordinated action against radio frequency interference on GNSS, proposing suspension of ITU registration rights, a public near-real-time interference monitoring service, faster deployment of anti-spoofing features and reassessment of reliance on GNSS. EASA and EUROCONTROL subsequently produced a joint action plan aimed at containing the threat within three years.",
      },
      {
        date: "2026-07",
        title: "Fourth revision of the aviation safety bulletin",
        detail:
          "A fourth revision was published on 3 July 2026, following analysis of recent occurrences and the first deliverables from the joint regulator task force. It added pilot-controller phraseology, electronic flight bag integration, new operational and training requirements, and a weekly updated public list of affected flight information regions now covering around 29 regions.",
      },
    ],
    sources: [
      {
        label: "EASA: GNSS outages and alterations, weekly affected-region list",
        url: "https://www.easa.europa.eu/en/domains/air-operations/global-navigation-satellite-system-outages-and-alterations",
        year: 2026,
      },
      {
        label: "EASA: update of the Safety Information Bulletin on GNSS interference",
        url: "https://www.easa.europa.eu/en/newsroom-and-events/news/easa-updates-safety-information-bulletin-gnss-interference",
        year: 2026,
      },
      {
        label: "EUROCONTROL: joint action plan and GNSS interference work",
        url: "https://www.eurocontrol.int/",
        year: 2026,
      },
      {
        label: "European GNSS Service Centre: Galileo services and authentication",
        url: "https://www.gsc-europa.eu/",
        year: 2026,
      },
      {
        label: "ESA: Galileo versus spoofing, testing authentication in real-world environments",
        url: "https://www.esa.int/Applications/Satellite_navigation",
        year: 2026,
      },
      {
        label: "ITU: radiocommunication and spectrum management",
        url: "https://www.itu.int/",
        year: 2026,
      },
    ],
    updated: "2026-10-09",
  },
];