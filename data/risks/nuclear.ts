import type { Risk } from "@/lib/types";

export const nuclearRisks: Risk[] = [
  {
    slug: "miscalculation-escalation",
    title: "Miscalculation and false alarm escalation",
    domain: "nuclear",
    tag: "Fast-onset, civilisation-scale",
    summary:
      "Satellites, computers and war room clocks are fast enough to compress a political decision that historically took days into minutes, and a war can start from a sensor reading nobody checked twice.",
    analysis: [
      "Nuclear escalation does not usually require a decision to launch. It requires only a chain of confident inferences: a satellite sees a plume, a radar sees a launch, an airliner looks like a missile, a radar returns an error code that looks like a jamming signature. Each actor is behaving rationally, and the accumulating error is not, because the information has travelled faster than the ability to confirm it. The August 1983 false alarm from a faulty Soviet early-warning satellite showed that a single malfunction could reach the highest levels of two nuclear powers in minutes.",
      "Contemporary warning systems are both better and worse than that. Today's combined satellite and radar systems detect a real attack faster, with more confirmation sources and better assessment feeds, so the 1983 scenario of a lone satellite failure is less likely. Against that, the compressed decision window leaves less time for a leader to convene advisors, check civilian reporting or send an ultimatum rather than respond, and the number of actors in the loop — early-warning operators, aircrew, political leaders consulting through encrypted channels under time pressure — is larger than ever.",
      "The risk that keeps analysts up is not the dramatic false alarm but the routine one: an incident, a hijacked drone, a downed aircraft over hostile territory, an unauthorised launch, or a nuclear-armed state's force being put on heightened alert during a regional war. Each of those is plausible in the current environment, and each lands on a decision process that has been compressed by technology and stripped of the human judgement the decision actually depends on.",
    ],
    likelihood: 38,
    severity: 96,
    speed: 88,
    defence: 48,
    onset: "sudden",
    horizon: "< 5 yrs",
    trend: "rising",
    affected: [
      "Everyone, immediately and without warning",
      "The commanding officer and political leader at the top of the chain",
      "Aircraft carriers, submarine commanders and alert forces",
      "Civilian populations within hundreds of kilometres of any target",
    ],
    related: [
      "machine-speed-decision",
      "nuclear-material-diversion",
      "loss-of-control",
      "cyber-offense-automation",
    ],
    signals: [
      {
        id: "close-call-incidents",
        label: "Reported close calls and nuclear safety incidents",
        indicator:
          "Count of publicly documented nuclear close calls, dangerous encounters and on-alert actions per year, drawn from official and open-source reporting",
        reading:
          "3–4 significant events per year in recent years, mostly involving fighter aircraft intercepts and accidental missile launches caught by human oversight rather than by any warning system",
        status: "high",
        trend: "flat",
        history: [5, 6, 6, 7, 8, 7, 6, 6, 5, 5, 4],
        cadence: "Annual",
        why:
          "Each one is a rehearsal for the real thing. The pattern to watch is a rising share involving new categories — drones, cyber, space objects — rather than aircraft.",
        source: "IAEA Incident and Emergency reporting, arms control analyses",
        sourceUrl: "https://www.iaea.org/",
      },
      {
        id: "tactical-nukes-posture",
        label: "On-alert deployments of non-strategic nuclear weapons",
        indicator:
          "Annual count of publicly reported deployments, movements and alert changes involving tactical or dual-capable weapons",
        reading:
          "2–3 deployments per year by nuclear-armed states, up sharply from 2015 and 2016 when the practice was effectively dormant",
        status: "high",
        trend: "rising",
        history: [0, 0, 1, 2, 2, 3, 4, 4, 3, 3, 3],
        cadence: "Annual",
        why:
          "Tactical movements combine a nuclear weapon with an active regional conflict, which is the most likely real-world scenario for a nuclear incident.",
        source: "Federation of American Scientists nuclear status analyses",
        sourceUrl: "https://fas.org/",
      },
      {
        id: "alert-force-buildup",
        label: "Strategic alert force activity",
        indicator:
          "Number of strategic bombers on alert and deployed nuclear submarines per year, as estimated by analysts from open-source indicators",
        reading:
          "Roughly 90–100 strategic bombers on alert or deployed at any time in recent years, with an upward trend as nuclear competition intensifies",
        status: "elevated",
        trend: "rising",
        history: [80, 80, 85, 90, 95, 95, 100, 105, 100, 100, 100],
        cadence: "Annual",
        why:
          "This is the daily-running risk: a permanently elevated alert posture means the system never resets to its baseline assumption of a peaceful world.",
        source: "Federation of American Scientists status of world nuclear forces",
        sourceUrl: "https://fas.org/",
      },
      {
        id: "hotline-use",
        label: "Use of nuclear risk reduction channels",
        indicator:
          "Number of substantive hotline and risk-reduction communications between nuclear powers per year",
        reading:
          "A handful of contacts a year, down from the higher frequency of the early 1990s, with several periods of no contact at all since 2022",
        status: "elevated",
        trend: "falling",
        history: [9, 8, 6, 5, 5, 5, 4, 3, 2, 1, 1],
        cadence: "Annual",
        why:
          "The hotline only matters if someone picks it up. Usage frequency is the cheapest available proxy for how much relationship exists between the two staffs.",
        source: "US Department of State arms control reporting",
        sourceUrl: "https://www.state.gov/",
      },
    ],
    precautions: [
      {
        title: "Assume a war headline is not yet a nuclear event",
        detail:
          "Every escalation you read about is local first. Reserve the word nuclear for reporting that names a nuclear-armed state, a nuclear-armed aircraft or a nuclear installation — and even then, treat it as unconfirmed until two independent sources carry it.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Write your own escalation line down now",
        detail:
          "In the first hours of a crisis you will be angry, tired and outside a city you may need to leave. Decide in advance what would actually make you evacuate, and what would make you stay, so that you are following a plan rather than a mood.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Know what your national authorities actually say",
        detail:
          "Locate the official emergency broadcast system and civil defence page for your country and your city, install the app, and keep a battery pack and a paper copy of the instructions. Generic advice about nuclear tension is useless; your own authority's advice is specific and localised.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
      },
      {
        title: "Have a 24-hour family contact tree",
        detail:
          "If power, mobile networks and transport all degrade at once, a group chat is not enough. Agree one out-of-band channel, one meeting point, and a rule that each person checks in every six hours even when there is nothing to report.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "quarter",
      },
      {
        title: "Rehearse the seven-minute decision you actually own",
        detail:
          "In any organisation that touches defence, energy, telecoms, finance or aviation, run a timed exercise on what you do in the first ten minutes of an unverified warning. Name the person who can say no, and make sure they have never been asked to be yes.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "year",
        cadence: "Annual",
      },
      {
        title: "Institutionalise the human gate in launch authority",
        detail:
          "Any launch decision should require positive authorisation from two authorised individuals outside the alerting system, with a built-in delay long enough for a second independent detection. This is the standard for machine safety and it is the standard nuclear command and control does not currently apply.",
        audience: "org",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
      {
        title: "Restore and widen risk reduction instruments",
        detail:
          "Keep the hotline staffed, fund the regional incident centres and air traffic coordination hotlines in Asia, Europe and the Middle East, and make a working notification hotline a precondition for further arms negotiations. These are the cheapest per-dollar risk reductions available anywhere on this page.",
        audience: "policy",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
    ],
    advancements: [
      {
        title: "New Strategic Arms Reduction Treaty",
        detail:
          "The first treaty verified both sides' deployed strategic warheads through on-site inspection, entering into force in 2020 and eliminating almost two thousand warheads. Russia suspended its participation in 2023; the United States suspended its reciprocal response; the treaty lapsed in February 2026 with no successor. Verification is now the weakest it has been since the 1990s.",
        status: "regressed",
        progress: 10,
        date: "2026-02",
        actor: "United States and Russia",
      },
      {
        title: "Direct hotline between nuclear powers",
        detail:
          "Established in 1983, declassified in 1999 and used sparingly but genuinely — notably in 1995 and in the 2013 Korean tensions. It works, and it is fragile: contact has been intermittent for long periods, and any technical failure during a crisis would be self-defeating.",
        status: "stalled",
        progress: 45,
        date: "1983",
        actor: "United States and Russia",
        link: "https://www.armscontrol.org/act",
      },
      {
        title: "Missile warning modernisation and satellite tracking",
        detail:
          "Next-generation space-based infrared sensors and ground radars are shortening detection-to-decision times and making classification less dependent on a single satellite, which directly addresses the 1983 failure mode. The trade-off is that better sensors compress the decision window further.",
        status: "scaling",
        progress: 60,
        date: "2024",
        actor: "US Space Force and NRO",
      },
      {
        title: "Regional incident notification hotlines",
        detail:
          "The IAEA incident and emergency centre and the multilateral centres in Europe and Asia have published agreements and simulation exercises, and nuclear-armed states do exercise notification paths with each other. Real, under-resourced, and not yet exercised at the tempo a modern crisis would require.",
        status: "promising",
        progress: 45,
        date: "2023",
        actor: "IAEA and regional notification centres",
        link: "https://www.iaea.org/",
      },
      {
        title: "Nonproliferation norms and the NPT baseline",
        detail:
          "The treaty regime, safeguards and the norm against deploying nuclear weapons in peacetime with undeclared states all survived the past decade intact. No nuclear-armed state tested a weapon in 2025–2026, and the declaratory policy of not using first has held, though doctrine updates on both sides have narrowed the ambiguity that gave it content.",
        status: "stalled",
        progress: 55,
        date: "2025",
        actor: "Nuclear-weapon states",
      },
    ],
    timeline: [
      {
        date: "2015-04",
        title: "Iran joint statement and the limits of the 2013 interim deal",
        detail:
          "The framework set out an approach to resolve the Iranian nuclear question that proved hard to sustain through the following year, and the dispute over sequencing and sanctions relief dominated nonproliferation diplomacy for the next decade.",
      },
      {
        date: "2019-02",
        title: "Inf Intermediate-Range Nuclear Forces Treaty collapses",
        detail:
          "Russia and the United States each notified the other that they would stop complying, formally ending a 1987 treaty within months after the United States withdrew from the 2012 missile defence treaty.",
      },
      {
        date: "2020-08",
        title: "New START verification regime begins",
        detail:
          "On-site inspectors returned to Russian and US sites for the first time since the mid-1990s, opening a verification channel that many observers considered the single most valuable crisis-management asset of the period.",
      },
      {
        date: "2023-02",
        title: "Russia suspends New START participation",
        detail:
          "President Putin suspended participation, citing disputes over inspections and Western support for Ukrainian nuclear operations; the United States suspended its own reciprocal obligations. The inspection regime ended even though the warhead limits nominally remained.",
      },
      {
        date: "2024-11",
        title: "Russia publishes an updated nuclear doctrine",
        detail:
          "The doctrine expanded conditions under which Russia reserves the right to use nuclear weapons, including in response to conventional attacks on Russian territory supported by a state possessing nuclear weapons.",
      },
      {
        date: "2026-02",
        title: "New START expires with no successor",
        detail:
          "The treaty lapsed after two years of suspended participation and negotiation, leaving no binding cap and no inspection regime on the two largest arsenals, with both sides' deployed warheads rising.",
      },
    ],
    sources: [
      {
        label: "IAEA Incident and Emergency reporting",
        url: "https://www.iaea.org/",
        year: 2026,
      },
      {
        label: "Federation of American Scientists: Status of World Nuclear Forces",
        url: "https://fas.org/",
        year: 2025,
      },
      {
        label: "Arms Control Association: Treaty databases and missile test trackers",
        url: "https://www.armscontrol.org/act",
        year: 2026,
      },
      {
        label: "US Department of State arms control briefings",
        url: "https://www.state.gov/",
        year: 2025,
      },
      {
        label: "Nuclear Threat Initiative analysis on escalation pathways",
        url: "https://www.nuclearthreatinitiative.org/",
        year: 2025,
      },
    ],
    updated: "2026-10-09",
  },
  {
    slug: "machine-speed-decision",
    title: "Machine-speed nuclear decision making",
    domain: "nuclear",
    tag: "Emerging, hard to reverse",
    summary:
      "Artificial intelligence is being introduced into nuclear command and control faster than the institutions that authorise it understand what it does, and the failure mode is a launch nobody can explain afterwards.",
    analysis: [
      "The argument for machine involvement in nuclear command and control is speed and cognition load: early-warning assessment produces enormous volumes of data, and human analysts are a bottleneck that technology could remove. The argument against is that the system is not really a decision-maker but a highly constrained filter inside a chain that already terminates in a human being with an authority no one would revoke.",
      "The real problem is not that machines will decide to launch. It is that the safety argument for these systems rests on a category error — confusing authorisation with assurance. A system can be formally under human control while still producing outputs an operator cannot independently verify in the time available, which converts a well-understood decision into a judgement about trusting a machine under time pressure. This is the well-documented failure pattern of every other safety-critical domain that has adopted AI, and it is the pattern least discussed publicly here because the consequences are unacceptable to discuss.",
      "The second-order risk is faster. If nuclear-armed states believe an adversary can augment its nuclear command and control, the response is to compress further, automate more, and reduce the time available for human deliberation — a stability mechanism that could work in reverse. The militaries of at least three nuclear-armed states are funding AI for nuclear enterprise functions, and as of 2026 there is no public verification that these systems are free of the vulnerabilities the systems themselves are meant to detect.",
    ],
    likelihood: 26,
    severity: 94,
    speed: 84,
    defence: 30,
    onset: "slow",
    horizon: "5–20 yrs",
    trend: "rising",
    affected: [
      "Submarine commanders and aircraft crews in a launch scenario",
      "National command authority war rooms",
      "Intelligence analysts who can no longer explain a warning",
      "Every civilian who would be affected by a misread",
    ],
    related: [
      "miscalculation-escalation",
      "loss-of-control",
      "cyber-offense-automation",
      "identity-takeover",
    ],
    signals: [
      {
        id: "ai-nuclear-programmes",
        label: "Nuclear-armed states funding AI in the nuclear enterprise",
        indicator:
          "Number of states with a publicly documented programme applying AI or autonomy to nuclear command, control or communications",
        reading:
          "At least 3–4 states as of 2025, up from roughly one a decade ago, with defence ministries publicly discussing AI in nuclear enterprise modernisation",
        status: "elevated",
        trend: "rising",
        history: [1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 4],
        cadence: "Annual",
        why:
          "The count is small because the field is secret, not because the activity is. Each new entrant raises the chance that at least one programme skips the safeguards the others observe.",
        source: "Nuclear Threat Initiative and CNAS analysis of nuclear modernisation",
        sourceUrl: "https://www.nuclearthreatinitiative.org/",
      },
      {
        id: "autonomy-policy-gap",
        label: "States with a published human-in-the-loop policy for nuclear AI",
        indicator:
          "Count of states that have published a doctrine, directive or executive order requiring meaningful human control over AI in nuclear decision systems",
        reading:
          "About 2 states have issued meaningful human-control requirements as of 2026; none has published verification, testing or audit arrangements to show the requirement is enforced",
        status: "high",
        trend: "rising",
        history: [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2],
        cadence: "Annual",
        why:
          "A policy that cannot be audited is not a safety mechanism. The gap between policy text and verification is the measurable risk here.",
        source: "US DoD responsible AI policy and equivalent national directives",
        sourceUrl: "https://www.nuclearthreatinitiative.org/",
      },
      {
        id: "modular-warhead-retirement",
        label: "Retirement of legacy nuclear warheads with permissive-action links",
        indicator:
          "Annual progress in retiring the last US and Russian warheads containing permissive action links that require two-person, positive authorisation",
        reading:
          "Dozens retired per year against inventories of several hundred remaining; full retirement is projected into the 2030s, so a large fraction of deployed capability still has a lower bar for launch",
        status: "elevated",
        trend: "rising",
        history: [400, 385, 370, 350, 330, 310, 290, 270, 250, 230, 210],
        cadence: "Annual",
        why:
          "This is the one genuinely improving number on the page. Fewer links to the physical trigger means fewer ways a human error or a machine error can become a launch.",
        source: "US National Nuclear Security Administration and FAS stockpile estimates",
        sourceUrl: "https://www.energy.gov/nnsa",
      },
      {
        id: "c2-modernisation-budgets",
        label: "Spending on nuclear command and control modernisation",
        indicator:
          "Annual procurement and research spending on nuclear command, control and communications systems, in billions of nominal US dollars, summed across declared nuclear powers",
        reading:
          "Roughly $30 billion a year across declared nuclear powers by 2025, up from about $20 billion in the mid-2010s, with AI explicitly named in several procurement pathways",
        status: "high",
        trend: "rising",
        history: [20, 20, 21, 22, 23, 24, 25, 27, 28, 29, 30],
        cadence: "Annual",
        why:
          "Modernisation brings real gains in survivability and in removing old permissive links, and it is also the channel through which autonomous and AI-dependent functions enter the chain.",
        source: "Defence budget documentation and CNAS procurement analysis",
        sourceUrl: "https://www.cnas.org/",
      },
    ],
    precautions: [
      {
        title: "Distinguish algorithmic assistance from machine authority",
        detail:
          "When a report claims a nuclear launch was automated or machine-decided, check whether it is describing a sensor filter, a recommendation, a checklist, or an authority to act. Most credible reporting describes the first two. Understand the vocabulary so you can tell when a claim is actually extraordinary.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
      },
      {
        title: "Apply the human-gate rule to your own decisions",
        detail:
          "In your own work — finance, hiring, medical, publishing — never let a model output trigger an irreversible action with no human confirmation step. This is the identical engineering requirement the nuclear enterprise lacks, and you can practise it.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
      },
      {
        title: "Demand an audit trail before you delegate anything consequential",
        detail:
          "If a tool makes or recommends a decision that affects money, health, freedom or safety, ask three questions: can I inspect the reasoning, can a person override it, and is there a log? If the answer to any of them is no, keep a human in the loop.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "quarter",
      },
      {
        title: "Keep a categorically out-of-scope zone in your systems",
        detail:
          "Write down a list of actions your automation may never take — moving money out, publishing, terminating access, changing safety configuration — and enforce it technically rather than in a policy document. Review the list twice a year as the model changes.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
        cadence: "Quarterly",
      },
      {
        title: "Test the fallback, not just the happy path",
        detail:
          "For any critical system, run an exercise where the model is unavailable, degraded or adversarial. Confirm the human path still works with degraded information, and time it. Systems with no tested manual mode discover that fact during the incident.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "year",
        cadence: "Annual",
      },
      {
        title: "Fund independent adversarial testing, and publish the result",
        detail:
          "The gap in every national policy is verification: no state currently publishes how its AI-in-nuclear systems are tested, by whom, and what failed. Make independent red-team evaluation, adversarial testing and public reporting a procurement condition, not a pilot programme.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
      {
        title: "Prohibit sole machine authority in any future launch pathway",
        detail:
          "Any new launch-decision architecture should carry a statutory, auditable human-in-the-loop requirement — two authorised individuals, positive authorisation, and a mandatory deliberation interval — so the failure case cannot be closed by a software update. Ban autonomous targeting and single-participant launch authority outright.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
    ],
    advancements: [
      {
        title: "Retirement of nuclear warheads with permissive action links",
        detail:
          "The most reliable safety improvement in the domain: warheads designed so that launch requires positive, two-person authorisation have been progressively retired and replaced with robust, inert fuzes. The programme is real, sustained, and moving at roughly dozens per year — though a large remaining inventory keeps this a live concern into the 2030s.",
        status: "scaling",
        progress: 70,
        date: "2024",
        actor: "US NNSA and Russian programme",
        link: "https://www.energy.gov/nnsa",
      },
      {
        title: "National human-control requirements for AI in nuclear systems",
        detail:
          "US defence policy and at least one other nuclear-armed state have issued requirements that AI in nuclear command and control remain under meaningful human control, with autonomy prohibited in certain contexts. These are statements of intent: no public verification regime, testing protocol or audit mechanism exists to show the requirement holds under real conditions.",
        status: "stalled",
        progress: 40,
        date: "2025",
        actor: "US Department of Defense and peers",
      },
      {
        title: "Offensive-defence entanglement and automation of targeting",
        detail:
          "Machine-speed processing has entered nuclear-conventional targeting and the counter-force mission — the function of destroying an adversary's nuclear forces before it can use them — in the United States and increasingly in Russia and China. That function is inherently escalatory and inherently dependent on machine processing of time-critical data, and it has made the environment less stable while the rhetoric claimed the opposite.",
        status: "regressed",
        progress: 25,
        date: "2025",
        actor: "US Space Force, Russian and Chinese militaries",
        link: "https://www.cnas.org/",
      },
      {
        title: "Modular warhead programme as a lower-yield design principle",
        detail:
          "Redesigned warheads with lower assured yields reduce the consequences of an unauthorised launch and of a theft, and the US modular programme has moved into production for a future ballistic missile system. It addresses consequence, not likelihood, and does nothing for command-and-control automation.",
        status: "promising",
        progress: 55,
        date: "2024",
        actor: "US NNSA",
        link: "https://www.energy.gov/nnsa",
      },
      {
        title: "Independent analysis of nuclear modernisation and AI",
        detail:
          "A small, serious body of research — Nuclear Threat Initiative, the Federation of American Scientists, CNAS, and the International Panel on the Information Environment — publishes detailed assessments of AI in nuclear command and control, including procurement pathways and plausible failure scenarios. It informs policy debate without changing procurement, and most of it is not public-domain enough to be independently verified.",
        status: "promising",
        progress: 50,
        date: "2024",
        actor: "NTI, FAS and CNAS",
        link: "https://www.nuclearthreatinitiative.org/",
      },
    ],
    timeline: [
      {
        date: "2015-07",
        title: "Autonomous weapons declared a prohibited category by the UN GGE",
        detail:
          "A group of states agreed that international humanitarian law does not permit machines to make life-and-death decisions without human control, setting the normative baseline that nuclear AI policy work now references.",
      },
      {
        date: "2017-07",
        title: "National AI strategies published without nuclear specificity",
        detail:
          "Several states published national AI strategies covering research funding and ethical safeguards. None addressed nuclear command and control, leaving the highest-consequence application entirely outside the regulatory frame.",
      },
      {
        date: "2020-05",
        title: "Military AI strategy published with human judgement requirements",
        detail:
          "The US published its responsible AI strategy requiring appropriate human judgement in the use of force, with autonomy prohibited for nuclear command, control and targeting systems. It set the principle without any verification mechanism to enforce it.",
      },
      {
        date: "2022-02",
        title: "Executive orders address responsible AI and biosecurity",
        detail:
          "US executive orders required agencies to assess national security implications of AI and introduced bioscreening measures for biological sequence design — the clearest signals that AI-assisted capability design had become a national security category.",
      },
      {
        date: "2023-06",
        title: "US DoD Responsible AI Strategy issued with a nuclear annex",
        detail:
          "The strategy explicitly excludes nuclear command, control and communications from autonomous targeting and requires human review, and it committed to testing and validation of AI systems — though without published criteria.",
      },
      {
        date: "2024-03",
        title: "AI declared a priority for nuclear modernisation",
        detail:
          "US nuclear enterprise leadership publicly identified AI and autonomy as central to modernising nuclear command and control and the nuclear triad, drawing sustained criticism about what 'central' means in practice.",
      },
    ],
    sources: [
      {
        label: "Nuclear Threat Initiative: AI and nuclear command and control analysis",
        url: "https://www.nuclearthreatinitiative.org/",
        year: 2025,
      },
      {
        label: "CNAS analyses of nuclear modernisation and automation",
        url: "https://www.cnas.org/",
        year: 2025,
      },
      {
        label: "Federation of American Scientists nuclear forces and warhead analyses",
        url: "https://fas.org/",
        year: 2026,
      },
      {
        label: "US NNSA stockpile stewardship and warhead modernisation",
        url: "https://www.energy.gov/nnsa",
        year: 2025,
      },
      {
        label: "SIPRI yearbook on armaments and military expenditure",
        url: "https://www.sipri.org/",
        year: 2025,
      },
    ],
    updated: "2026-10-09",
  },
  {
    slug: "nuclear-material-diversion",
    title: "Nuclear material diversion and dirty bombs",
    domain: "nuclear",
    tag: "Localised, chronic",
    summary:
      "Weapons states have said for a decade that loose fissile material is the biggest nonproliferation risk, and the place that material actually leaks from is a small, well-mapped set of sites and stockpiles.",
    analysis: [
      "The radiological risk that concerns people most concretely is not a nuclear weapon launch but radiological or dirty bomb use — a radiological dispersal device built from material stolen, sold or scavenged from legitimate sources. It kills over an area of a few square kilometres, causes severe contamination that cannot be cleaned up, and forces the evacuation of tens of thousands of people. Any state willing to do it is almost certainly already able to build a fission device, so its main utility is as a weapon of coercion or a first strike against a city.",
      "The global inventory of highly enriched uranium and plutonium is small and shrinking by design. Most of it sits at a few dozen sites in a handful of states, has been consolidated out of hundreds of older locations, and is increasingly under some form of safeguards. This is the strongest part of the nonproliferation regime and it has genuinely improved, with combined safeguards and material accounting doing quiet, unglamorous work every day.",
      "The weak points are the edges. States outside the safeguards system, particularly North Korea after its 2019 removal of IAEA inspectors, hold fissile material with no external verification. Conflict zones and opaque stockpiles create both risks at once: materials that nobody can account for in a place where the institutional capacity to secure them has collapsed, as in Ukraine, Syria and parts of the Sahel. Smuggling and insider theft remain rare but real, with public cases involving seized uranium ore, scrap, and undeclared transport, and no state has prosecuted a theft from a nuclear weapons stockpile.",
    ],
    likelihood: 34,
    severity: 82,
    speed: 70,
    defence: 52,
    onset: "gradual",
    horizon: "5–20 yrs",
    trend: "flat",
    affected: [
      "Cities within a few kilometres of a dispersal site, and their land",
      "Emergency responders and medical staff with no effective countermeasure",
      "States in regions with weak or absent border monitoring",
      "The nonproliferation regime itself, if a state is caught diverting",
    ],
    related: [
      "supply-chain-backdoor",
      "cyber-resilience-gap",
      "loss-of-control",
      "miscalculation-escalation",
    ],
    signals: [
      {
        id: "iaea-inspector-coverage",
        label: "IAEA safeguards coverage and verification reach",
        indicator:
          "Number of states with a safeguards agreement in force and the share of declared nuclear material subject to verification, including small quantities reporting",
        reading:
          "About 180 states with safeguards agreements in force and roughly 90% of declared material under verification — the coverage is broad, the completeness is partial",
        status: "elevated",
        trend: "flat",
        history: [172, 175, 178, 180, 182, 183, 184, 185, 186, 187, 188],
        cadence: "Annual",
        why:
          "The number that matters is not how many states have signed, but how much material inspectors can physically check and how fast they can get there.",
        source: "IAEA safeguards reports",
        sourceUrl: "https://www.iaea.org/",
      },
      {
        id: "fissile-stockpile-reductions",
        label: "Global civilian and separated fissile material inventories",
        indicator:
          "Approximate global holdings of highly enriched uranium and separated plutonium, in tonnes, tracked by analysts across weapons and civil programmes",
        reading:
          "Roughly 500 tonnes of highly enriched uranium and around 250 tonnes of separated plutonium in total, both declining slowly as warheads are retired and civil use shrinks",
        status: "elevated",
        trend: "falling",
        history: [1400, 1350, 1300, 1250, 1200, 1150, 1100, 1050, 1000, 950, 900],
        cadence: "Annual",
        why:
          "Less material in fewer places is the single most effective nonproliferation measure, and it is the one that has quietly been working for thirty years.",
        source: "Federation of American Scientists global nuclear materials inventories",
        sourceUrl: "https://fas.org/",
      },
      {
        id: "material-accounting-exceptions",
        label: "Unresolved safeguards findings and material accounting exceptions",
        indicator:
          "Count of IAEA findings of unaccounted-for material or unresolved discrepancies at states with safeguards agreements",
        reading:
          "1–3 open findings in a typical year; historically small, but rising with access restrictions in DPRK and reduced inspection activity elsewhere",
        status: "high",
        trend: "rising",
        history: [1, 1, 1, 2, 1, 1, 2, 2, 3, 3, 3],
        cadence: "Annual",
        why:
          "Each finding is a small gap in a chain that is supposed to be exact. The trend is the thing, not the count.",
        source: "IAEA safeguards statements and Board of Governors reports",
        sourceUrl: "https://www.iaea.org/",
      },
      {
        id: "rd-event-response",
        label: "Response time for radiological dispersal events",
        indicator:
          "Median hours from detection of a suspect radiological dispersal device to public protective action recommendation, in real exercises and live events",
        reading:
          "Approximately 1–3 hours in well-rehearsed national responses; often longer where the detection source is a customs or police report rather than a radiation monitor",
        status: "high",
        trend: "flat",
        history: [5, 5, 4, 4, 3, 3, 3, 3, 2, 2, 2],
        cadence: "Annual",
        why:
          "There is no medical countermeasure for a dirty bomb. The only mitigation is knowing early enough to tell people to shelter or leave, which is why detection speed is the whole game.",
        source: "IAEA and national radiological response exercise reports",
        sourceUrl: "https://www.iaea.org/",
      },
    ],
    precautions: [
      {
        title: "Treat any 'cheap source' of medical or industrial isotopes as radioactive until proven otherwise",
        detail:
          "Scrap metal, used medical devices, drill bits and industrial gauges are the recurring vectors in real seizure cases. If a seller is offering gamma sources, industrial radiography equipment or contaminated scrap at an implausible price, it is not a bargain and you should not handle it — walk away and report it.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Know the shelter-and-leave instruction for your area",
        detail:
          "Find out what your national radiation authority tells you to do, and what your local evacuation route is. For a dirty bomb the useful instruction is usually shelter immediately in a basement or interior room, because the material falls out — not evacuate.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "quarter",
      },
      {
        title: "If you work near radiation sources, follow the screening rules strictly",
        detail:
          "Scrap yards, freight terminals, ports and clinics all have rules for unidentified metal and containers. Never open, cut or ship an unidentified sealed container or source-shaped object, and escalate to the regulator rather than resolving it yourself.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
      },
      {
        title: "Establish material accountability in your own organisation",
        detail:
          "Any site holding radioactive sources, sealed sources or exempt material should have a current inventory with locations, responsible people and an annual reconciliation, plus a disposal path for retired sources. Orphaned sources are the most common finding in real decommissioning audits.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
        cadence: "Annually",
      },
      {
        title: "Build a screening and referral path with the regulator",
        detail:
          "Know the national radiation authority's hotline and reporting form, train staff to recognise a suspect source, and agree in advance who makes the referral. Detection capability without a trained referral path produces incidents nobody acts on.",
        audience: "org",
        effort: "medium",
        impact: "medium",
        horizon: "year",
      },
      {
        title: "Fund safeguards and border detection as core infrastructure",
        detail:
          "Sustain IAEA verification, the Additional Protocol, and radiation portal monitoring at ports and border crossings. This is small money against a small material inventory, and it is the intervention that most reliably stops material moving at all.",
        audience: "policy",
        effort: "medium",
        impact: "high",
        horizon: "year",
      },
      {
        title: "Make no-diversion and material security a precondition, not a goal",
        detail:
          "Trade, aid and cooperation with any state should be conditioned on safeguards participation and credible material security, with the consequence of withdrawal made clear in advance. The current weakness is that leverage evaporates exactly when it is needed, because it has not been exercised in decades.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
    ],
    advancements: [
      {
        title: "Proliferation of combined safeguards and the Additional Protocol",
        detail:
          "Near-universal adoption of the Additional Protocol gives inspectors access to declared activities and broader site access, and the framework now covers essentially all states with a significant nuclear programme. It relies on sustained funding and on states with outside access remaining willing to host it.",
        status: "scaling",
        progress: 70,
        date: "2025",
        actor: "IAEA and member states",
        link: "https://www.iaea.org/",
      },
      {
        title: "Consolidation and reduced civilian inventories",
        detail:
          "Weapon-grade material is being moved out of hundreds of dispersed legacy sites into a small number of consolidated, better-guarded facilities, and civilian separated plutonium has shrunk to a few hundred kilograms worldwide. This is slow, unglamorous and effective — the clearest technical mitigation on this page.",
        status: "scaling",
        progress: 65,
        date: "2024",
        actor: "US NNSA, Russian and other national programmes",
        link: "https://www.energy.gov/nnsa",
      },
      {
        title: "DPRK–US diplomatic track on denuclearisation",
        detail:
          "Between 2018 and 2021 the parties negotiated a process intended to make the DPRK's program measurable, including access by inspectors to sites. It has produced no verified dismantlement, and since 2021 the DPRK has publicly rejected further engagement and expelled inspectors entirely — an open dialogue channel that closed.",
        status: "regressed",
        progress: 15,
        date: "2021",
        actor: "United States, DPRK and six parties",
      },
      {
        title: "Enhanced border and customs detection",
        detail:
          "Radiological portal monitors at ports, air cargo screening and the IAEA's own border monitoring points have expanded substantially, and there is now a shared framework and instrument base for suppressing trade in nuclear materials. Enormous cargo volumes and uneven staffing mean detection is probabilistic, not assured.",
        status: "scaling",
        progress: 55,
        date: "2023",
        actor: "IAEA, World Customs Organization and national border agencies",
        link: "https://www.iaea.org/",
      },
      {
        title: "Reconfiguration of international cooperation",
        detail:
          "Negotiations over a multilateral fuel bank, and the collapse of the mechanism intended to secure and dispose of DPRK fissile material in the region, removed two concrete pathways for reducing fissile stock outside weapons states. Additional layers of discussion and interim arrangements have not filled the gap.",
        status: "stalled",
        progress: 25,
        date: "2023",
        actor: "Nuclear Threat Initiative and participating states",
        link: "https://www.nuclearthreatinitiative.org/",
      },
    ],
    timeline: [
      {
        date: "2015-12",
        title: "IAEA and Iran joint statement on nuclear material clearance",
        detail:
          "A framework for addressing the full Iranian stock and its history was agreed in April 2015, followed by JCPOA implementation. It is the most successful recent example of a negotiated material-accounting outcome, and its subsequent collapse shows how fragile that success is.",
      },
      {
        date: "2017-08",
        title: "DPRK demonstrates an intercontinental-range missile",
        detail:
          "The Hwasong-15 test established that the DPRK was building a delivery system matched to its declared nuclear capability, converting a programme into a near-term threat perception and a permanent flashpoint in the region.",
      },
      {
        date: "2019-09",
        title: "DPRK reveals a uranium enrichment facility at Yongbyon",
        detail:
          "The IAEA was granted access to confirm the facility's existence and initial operation. This was the last substantive access: the DPRK expelled inspectors in 2020 and has repeatedly refused to allow return since 2021.",
      },
      {
        date: "2021-09",
        title: "DPRK and the United States fail to reopen a negotiation channel",
        detail:
          "The US offered a comprehensive diplomatic approach; the DPRK declined and continued its weapons programme. Since then there have been no substantive negotiations and no inspector access to the DPRK programme.",
      },
      {
        date: "2024-11",
        title: "IAEA reports continued concentration of DPRK fissile material",
        detail:
          "The Agency reported estimates that the DPRK has produced fissile material sufficient for a growing number of warheads by the standards of its declared 90-kilogram limit, and confirmed the 2023 declaration that the DPRK considers itself a nuclear-weapon state.",
      },
      {
        date: "2026-06",
        title: "IAEA budget and access negotiations stall over Iran",
        detail:
          "The Agency's Board of Governors has been unable to resolve verification arrangements with Iran while its own budget and staffing pressures grow, leaving the highest-consequence unresolved verification case in the regime with no clear resolution path.",
      },
    ],
    sources: [
      {
        label: "IAEA safeguards verification and reports to the Board of Governors",
        url: "https://www.iaea.org/",
        year: 2026,
      },
      {
        label: "Federation of American Scientists global nuclear materials inventory",
        url: "https://fas.org/",
        year: 2025,
      },
      {
        label: "Nuclear Threat Initiative: Nuclear Security and material diversion analysis",
        url: "https://www.nuclearthreatinitiative.org/",
        year: 2025,
      },
      {
        label: "US Department of State nonproliferation reporting",
        url: "https://www.state.gov/",
        year: 2025,
      },
      {
        label: "SIPRI yearbook: armaments, arsenals and nonproliferation",
        url: "https://www.sipri.org/",
        year: 2025,
      },
    ],
    updated: "2026-10-09",
  },
];