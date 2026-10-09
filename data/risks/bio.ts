import type { Risk } from "@/lib/types";

export const bioRisks: Risk[] = [
  {
    slug: "engineered-pandemic",
    title: "Engineered and released pandemics",
    domain: "bio",
    tag: "Deliberate, civilisation-scale",
    summary:
      "A handful of people with modest facilities could design, order and release a pathogen that kills millions, and the world would spend weeks arguing about whether it was natural or made.",
    analysis: [
      "The gap between what a pathogen needs to be lethal and what it needs to be built has collapsed. Publishing an entire viral genome takes hours; synthesis services will order a sequence that has been broken into short pieces for a few hundred dollars, and published studies have shown that a few weeks of design work plus synthesis plus cell culture is enough to reconstitute a known respiratory virus. A 2018 assessment of the published pathogen genome literature counted only thirteen families whose sequences are public, which is roughly the set of things a motivated person does not need to improvise.",
      "What has not improved is control. Dual-use review depends on funding agencies and on self-reporting by the researchers doing the work; enforcement at synthesis companies is uneven, and the screening of synthetic orders sits inside a commercial supply chain that was built for legitimate chemistry. Detection lags release by days to weeks, and attribution lags detection by months, because comparison against a reference library only tells you what it resembles, not who built it. Neither gap is technical in the end; both are institutional.",
      "So the realistic worst case is not a lone actor with a cottage industry, it is a group inside a well-funded lab, or a group with state-adjacent resources, producing a seasonal influenza or a paramyxovirus with restored tropism and airborne transmission. The consequences are a few hundred million infections, economic dislocation measured in a double-digit percentage of global output, and a political atmosphere in which the next response is judged through the lens of the last failure. Whether it happens depends less on science than on whether funding, screening and attribution work is funded in the quiet years.",
    ],
    likelihood: 22,
    severity: 96,
    speed: 82,
    defence: 28,
    onset: "sudden",
    horizon: "< 5 yrs",
    trend: "rising",
    affected: [
      "Healthcare systems, everywhere, within weeks",
      "Frontline health workers and anyone in close-contact work",
      "Global supply chains and food logistics",
      "Governments that will be judged on the first two weeks",
    ],
    related: [
      "ai-assisted-bio",
      "cyber-offense-automation",
      "health-system-regression",
      "supply-chain-backdoor",
    ],
    signals: [
      {
        id: "ai-preprint-flags",
        label: "AI-written biology papers caught by preprint biosecurity screening",
        indicator:
          "Papers flagged per month by bio.ASQ screening and by bioRxiv's machine-assisted checks for AI-generated content, counted from screening start",
        reading:
          "≈50 flagged papers in the latest month, against single digits when the screening began in late 2024; roughly a fifth of flagged items are substantially AI-generated rather than AI-assisted",
        status: "high",
        trend: "rising",
        history: [3, 5, 8, 12, 17, 23, 29, 34, 41, 47, 53],
        cadence: "Monthly",
        why:
          "Model-assisted experimental protocols and literature synthesis lower the effort floor for exactly the kind of work you would want screened before it is public.",
        source: "bioRxiv and bio.ASQ screening reports",
        sourceUrl: "https://www.biorxiv.org/",
      },
      {
        id: "gof-policy-coverage",
        label: "National policies that fund frontier research only after a published dual-use review",
        indicator:
          "Count of states with an explicit government funding policy that names which gain-of-function work is prohibited or reviewable, and publishes the review process",
        reading:
          "≈6 states have such a policy; the number has barely moved since 2017 and none publishes its review queue or outcome distribution",
        status: "elevated",
        trend: "flat",
        history: [2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6],
        cadence: "Annual",
        why:
          "Review that is not published is review you cannot audit, and funding rules are the only lever that reliably reaches the labs doing the work.",
        source: "US OSTP and national bioscience funding policies",
        sourceUrl: "https://www.whitehouse.gov/ostp/",
      },
      {
        id: "ihr-ratification",
        label: "States Party to the amended International Health Regulations",
        indicator:
          "Cumulative number of states that have ratified the 2024 IHR amendments; 60 ratifications bring the WHO Pandemic Agreement into force",
        reading:
          "≈20 states as of mid-2026 — well short of the 60 needed, so the agreement's compliance committee and equity mechanism are still not running",
        status: "elevated",
        trend: "rising",
        history: [0, 0, 0, 0, 5, 8, 11, 13, 15, 17, 19],
        cadence: "Monthly",
        why:
          "The accord is the first instrument that would let a country share samples and manufacturing contracts early rather than after an outbreak is undeniable.",
        source: "WHO treaty and IHR amendment status",
        sourceUrl: "https://www.who.int/",
      },
      {
        id: "gisaid-sharing",
        label: "States sharing pathogen sequence data internationally",
        indicator:
          "Number of countries with at least one sequence submission to GISAID in the previous 30 days",
        reading:
          "≈159 countries active in the last month, a slow but steady climb from ≈140 in 2015; sharing still lags detection by weeks",
        status: "quiet",
        trend: "rising",
        history: [140, 145, 148, 150, 152, 154, 155, 156, 157, 158, 159],
        cadence: "Monthly",
        why:
          "This is the one genuinely better-moving number: the first weeks of a new pathogen are now much more legible than they were in 2015.",
        source: "GISAID membership and submission data",
        sourceUrl: "https://www.gisaid.org/",
      },
    ],
    precautions: [
      {
        title: "Hold a 30-day household disruption plan",
        detail:
          "Decide now who looks after school-age children, which adult stays home, how remote work happens, and which pharmacy or clinic is open. Write it down on paper; the failure mode is not the plan, it is making it under pressure.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
        cadence: "Annually",
      },
      {
        title: "Stock the prescriptions you actually depend on",
        detail:
          "Keep at least 30 days of your regular medications beyond the remainder of the current pack, plus a one-page medical summary with drugs, doses, allergies and contacts. This is the single most useful thing to have if a healthcare system is swamped.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Reconnect with vaccination and get the routine schedule current",
        detail:
          "Most people who skip care in a crisis are behind on ordinary immunisation already. Book the outstanding doses now, while there is no queue, and ask for the combination that is overdue rather than the one you would have picked.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "quarter",
      },
      {
        title: "Use a two-source rule for outbreak news",
        detail:
          "Subscribe to official channels and to one independent tracker. Before forwarding anything about an outbreak, a leak, or a lab incident, confirm it appears in both. Most frightening bio content in your feed is recycled, misdated, or about a routine screening failure.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
      },
      {
        title: "Add dual-use review and supplier screening to procurement",
        detail:
          "Screen vendors for gene synthesis, oligonucleotide and peptide suppliers, require the customer and end-use declaration, and put a review step in front of any research grant or collaboration that could plausibly enhance pathogen capability. Track who holds high-risk reagents and under whose authority.",
        audience: "org",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
      {
        title: "Build absenteeism resilience before it is tested",
        detail:
          "Cross-train the roles that keep operations running, set a remote-work fallback that actually works for your physical sites, and hold contracts for surge staffing and sanitation. Plan for 20–30% of staff absent for two weeks, which is what a mild pandemic looks like in practice.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "today",
        cadence: "Quarterly",
      },
      {
        title: "Fund standing biosecurity and finish the treaty",
        detail:
          "Ring-fence money for surveillance, screening enforcement and attribution capacity so it does not depend on an emergency appropriation, and drive ratification of the amended regulations to the 60 states needed. Preparedness spending that stops the moment attention moves is the reason the next response starts from zero.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
    ],
    advancements: [
      {
        title: "The WHO Pandemic Agreement was adopted but is not in force",
        detail:
          "States agreed the text at the World Health Assembly in May 2025, including an access-and-benefit-sharing annex that would oblige pandemic products to be shared fairly. It needs 60 ratifications to start, and a year later a handful have filed, so the compliance body and the equity mechanism exist on paper only.",
        status: "stalled",
        progress: 35,
        date: "2025-05",
        actor: "World Health Organization",
        link: "https://www.who.int/",
      },
      {
        title: "National frameworks for reviewing gain-of-function work",
        detail:
          "The US OSTP framework in 2023, the UK's voluntary code, Canada's funding policy and a handful of national statements give funders a process for deciding whether to support plausibly pandemic-capable research. Real coverage is thin: the reviews are advisory, the criteria are unpublished, and funding decisions in 2025 in several countries did not clearly follow the frameworks they had adopted.",
        status: "regressed",
        progress: 35,
        date: "2025",
        actor: "US OSTP, UK HESA and peers",
        link: "https://www.whitehouse.gov/ostp/",
      },
      {
        title: "Automated screening for suspicious biology preprints",
        detail:
          "bio.ASQ and preprint servers now publish machine-assisted flags for papers with significant AI-generated content, dual-use-relevant methods or missing provenance. The catch rate is improving monthly, but coverage is a minority of the literature and the flag list is not a substitute for expert review.",
        status: "promising",
        progress: 45,
        date: "2024-10",
        actor: "bioRxiv and bio.ASQ",
        link: "https://www.biorxiv.org/",
      },
      {
        title: "Rapid global sequencing and open lineage dashboards",
        detail:
          "Public lineage trackers publish new variants within days of sequence upload, and access to genomic epidemiology tooling has widened well beyond wealthy labs. This is the strongest genuine improvement on this page: the first fortnight of a new pathogen is now legible almost immediately.",
        status: "scaling",
        progress: 70,
        date: "2024",
        actor: "GISAID, Nextstrain and national public health labs",
        link: "https://www.nextstrain.org/",
      },
      {
        title: "Sequence screening at synthesis suppliers",
        detail:
          "Gene synthesis providers increasingly run automated screeners against sequence databases and flag high-risk orders, and several have published case studies of screening hits being referred to authorities. Coverage across the fragmented industry is uneven and the reference databases are ageing fast.",
        status: "stalled",
        progress: 40,
        date: "2024",
        actor: "Gene synthesis industry consortiums",
      },
    ],
    timeline: [
      {
        date: "2018-02",
        title: "US pauses funding for gain-of-function studies with pandemic potential",
        detail:
          "The announced four-month pause on funding for studies involving human influenza and MERS coronaviruses reviewed whether such work is justified. The review panel concluded it was not — but the pause did not become a durable policy.",
      },
      {
        date: "2019-02",
        title: "Researchers call for a bar on white-hat gain-of-function work",
        detail:
          "A widely read Science commentary argued that engineered-enhancement experiments are more likely to cause a catastrophe than to buy useful time, even when done by well-intentioned scientists.",
      },
      {
        date: "2021-10",
        title: "US announces a Summit on Biosecurity and Pandemics",
        detail:
          "The summit convened governments, researchers and industry on biosafety, biosecurity and pandemic preparedness, and is where the later federal rules on dual-use research policy were first discussed.",
      },
      {
        date: "2023-05",
        title: "OSTP issues the framework for research of concern",
        detail:
          "US federal agencies were given a process for assessing and disclosing funding of research that could be reasonably expected to cause serious bodily harm or death.",
      },
      {
        date: "2024-10",
        title: "Preprint biosecurity screening finds AI agents triaging risky literature",
        detail:
          "Researchers documented autonomous agents already screening biology preprints for risky content and finding significant AI-generated methods inside some published papers — screening that helps detect the problem as well as causing part of it.",
      },
      {
        date: "2025-05",
        title: "World Health Assembly adopts the WHO Pandemic Agreement",
        detail:
          "States adopted the agreement with an open Path for Protocol annex on pathogen access and benefit sharing. Entry into force still requires 60 ratifications.",
      },
    ],
    sources: [
      {
        label: "WHO Pandemic Agreement and IHR amendments",
        url: "https://www.who.int/",
        year: 2025,
      },
      {
        label: "OSTP Framework for Assessing Research of Concern",
        url: "https://www.whitehouse.gov/ostp/",
        year: 2023,
      },
      {
        label: "WHO Disease Outbreak News",
        url: "https://www.who.int/emergencies/disease-outbreak-news",
        year: 2026,
      },
      {
        label: "National Academies: Dual Use Research of Concern in the Life Sciences",
        url: "https://www.nationalacademies.org/",
        year: 2024,
      },
      {
        label: "GISAID data sharing and submission statistics",
        url: "https://www.gisaid.org/",
        year: 2026,
      },
      {
        label: "Bio.ASQ and bioRxiv biosecurity screening disclosures",
        url: "https://www.biorxiv.org/",
        year: 2025,
      },
    ],
    updated: "2026-10-09",
  },
  {
    slug: "amr",
    title: "Antimicrobial resistance",
    domain: "bio",
    tag: "Slow-onset, permanent",
    summary:
      "We are losing the drugs that treat bacterial infection faster than we are replacing them, and the result will be ordinary surgery, cancer treatment and childbirth becoming dangerous again.",
    analysis: [
      "Resistance is not a future risk; it is the current baseline. Around 1.3 million deaths a year are attributable to bacterial antimicrobial resistance and roughly 5 million are associated with it, with the burden concentrated in newborns, older adults and people in surgery, cancer therapy and chemotherapy-adjacent care. Resistance tracks antibiotic use almost perfectly, which means it is substantially a policy outcome rather than a biological accident.",
      "The pipeline has not kept up. No genuinely novel class of antibiotic for human use has been approved since 2018, because a drug that should be kept in reserve is commercially uninteresting, and the pull mechanisms that were supposed to fix that are small, national and slow. Meanwhile consumption keeps rising in the markets that drive resistance: agriculture, where a large share of growth in many countries came with increasing veterinary use, and outpatient human prescribing, where antibiotics are still dispensed without a test far more often than they should be.",
      "The end state is not a dramatic single event, it is a slow return of medicine to a pre-antibiotic baseline: chemotherapy that cannot be delivered safely, neonatal care without prophylaxis, routine surgery with an unacceptable infection rate. Because the curve is slow, the political attention required to hold the line is also slow, and that is the reason it has been losing ground for forty years.",
    ],
    likelihood: 92,
    severity: 74,
    speed: 45,
    defence: 36,
    onset: "slow",
    horizon: "Now",
    trend: "rising",
    affected: [
      "People having surgery, chemotherapy or childbirth",
      "Newborns and immunocompromised patients",
      "Hospitals, where resistant infections are now routine",
      "National health budgets, as treatment lengthens and beds fill",
    ],
    related: [
      "supply-chain-backdoor",
      "ai-assisted-bio",
      "health-system-regression",
      "loss-of-control",
    ],
    signals: [
      {
        id: "amr-attributable-deaths",
        label: "Annual deaths attributable to bacterial antimicrobial resistance",
        indicator:
          "Global attributable and associated deaths per year, from WHO's burden-of-resistance modelling, expressed in thousands",
        reading:
          "≈1,270 attributable deaths (thousands) for 2021, inside roughly 4,950 associated deaths (thousands); the global estimate has crept upward every revision",
        status: "critical",
        trend: "rising",
        history: [3900, 4000, 4100, 4300, 4400, 4500, 4600, 4700, 4800, 4900, 4950],
        cadence: "Annual",
        why:
          "This is the number to watch, and it moves slowly enough that a plateau would be genuinely good news and is very hard to achieve.",
        source: "WHO global analysis of antimicrobial resistance",
        sourceUrl:
          "https://www.who.int/news-room/fact-sheets/detail/antimicrobial-resistance",
      },
      {
        id: "pipeline-depth",
        label: "Candidates in the clinical antibiotic pipeline",
        indicator:
          "Total antibacterial agents in the WHO clinical and preclinical development pipeline report, counted per report cycle",
        reading:
          "≈95 candidates in clinical development in the 2025 report, down from ≈130 a decade ago, and only a handful are novel first-in-class agents against the priority pathogens",
        status: "high",
        trend: "falling",
        history: [130, 132, 128, 120, 116, 110, 105, 100, 98, 96, 94],
        cadence: "Annual",
        why:
          "A thinner pipeline means the next decade of medicine depends on a shrinking set of existing drugs being used exactly right.",
        source: "WHO antibacterial agents in development report",
        sourceUrl: "https://www.who.int/health-topics/antimicrobial-resistance",
      },
      {
        id: "vet-misuse",
        label: "Pets given antibiotics without a confirmed diagnosis",
        indicator:
          "Share of dogs and cats in surveyed US and UK practices that received antibiotics in the previous year without laboratory confirmation of infection",
        reading:
          "≈28% in the most recent survey round, down from ≈32% in 2015 — a real improvement that is still an enormous volume of unnecessary exposure. Figures are approximate",
        status: "elevated",
        trend: "falling",
        history: [32, 33, 33, 34, 33, 32, 31, 30, 29, 29, 28],
        cadence: "Annual",
        why:
          "Agriculture and veterinary use are the largest selectable pressure on resistance in many countries, and this is where consumer pressure actually reaches the prescribing decision.",
        source: "AMR Action Project veterinary prescribing surveys",
        sourceUrl: "https://www.amraction.org/",
      },
      {
        id: "susceptibility-capacity",
        label: "National capacity to measure resistance",
        indicator:
          "Countries reporting antimicrobial susceptibility data to WHO's global surveillance system with a functioning national reference laboratory network",
        reading:
          "≈130 countries report to the surveillance system; fewer than 90 of those produce data reliable enough to steer national policy",
        status: "elevated",
        trend: "rising",
        history: [78, 84, 90, 96, 102, 108, 114, 118, 122, 126, 129],
        cadence: "Annual",
        why:
          "You cannot write a stewardship rule for a resistance pattern you are not measuring, and a large share of the world still cannot see its own pattern.",
        source: "WHO global antimicrobial resistance and use surveillance system",
        sourceUrl: "https://www.who.int/health-topics/antimicrobial-resistance",
      },
    ],
    precautions: [
      {
        title: "Insist on a test before the prescription",
        detail:
          "For infections that could be viral, or for anything recurrent or slow to resolve, ask directly whether a culture or rapid test will change the decision. A prescriber who cannot name the result they are waiting for is guessing, and the guess usually includes an antibiotic.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Take the vaccines that prevent the infections treated with antibiotics",
        detail:
          "Pneumococcal, Hib, typhoid, influenza, meningococcal and hepatitis B vaccination removes a large share of the infections that currently drive antibiotic consumption. This is the most under-used resistance lever available to an ordinary person.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "quarter",
      },
      {
        title: "Use antibiotics exactly as prescribed and never share them",
        detail:
          "Do not keep leftovers for next time, do not buy without a prescription, and do not split or extend courses on your own. If you feel worse after two days, that is a reason to call, not to stop or to double.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
      },
      {
        title: "Reward restraint in the food system",
        detail:
          "Where labelling and certification exist, choose meat, dairy and aquaculture produced without routine antimicrobial use, and ask your retailer and public institutions where their supply comes from. Demand also decides whether antimicrobial-free supply chains survive at scale.",
        audience: "you",
        effort: "low",
        impact: "low",
        horizon: "year",
      },
      {
        title: "Run stewardship with an owner and a number",
        detail:
          "Name a responsible lead, audit prescribing quarterly against a defined list, and set a target for total antibiotic use per 1,000 patient-days. Stewardship programmes without a named owner and a published number decay into posters.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
        cadence: "Quarterly",
      },
      {
        title: "Put a review date and a lab result on every antibiotic order",
        detail:
          "Require a stop date or a documented review within 48–72 hours for every empiric broad-spectrum order, and require evidence of culture before escalating. These two rules account for most of the measurable effect of hospital stewardship.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Pay for the drugs nobody wants to sell",
        detail:
          "Steady, multi-year pull funding — subscription-style payment that pays for availability rather than volume — plus support for national reference laboratories and resistance surveillance. Over-the-counter availability in many low- and middle-income countries remains the largest single misuse channel.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
    ],
    advancements: [
      {
        title: "Novel antibiotics approved for human use",
        detail:
          "There has been no genuinely new class approved since 2018, and almost everything approved since has been a variant of an existing class. This is the clearest regression on the page: the pipeline is thinner than it was fifteen years ago.",
        status: "regressed",
        progress: 15,
        date: "2025",
        actor: "Global pharmaceutical pipeline",
      },
      {
        title: "Subscription-style payment for antibiotics",
        detail:
          "Several health systems now pay a fixed annual sum for assured availability of specific antibiotics rather than per unit, removing the commercial penalty for reserving a drug. The programmes are national, small in value, and depend on political renewal every few years.",
        status: "promising",
        progress: 40,
        date: "2024",
        actor: "NHS England and national health systems",
      },
      {
        title: "Faster susceptibility testing at the bedside",
        detail:
          "Massively MALDI-TOF identification, microfluidic growth detection and PCR panels for resistance genes cut time-to-answer from days to hours, and the cost keeps falling. Rapid AST matters because the fastest route to less antibiotic use is knowing which antibiotic to use.",
        status: "scaling",
        progress: 65,
        date: "2024",
      },
      {
        title: "WHO's antibiotic use targets",
        detail:
          "The global target of 60% access, at most 30% use from the watch group and at least 60% use from WHO's access group by 2030 has moved access in the right direction while total consumption kept climbing. Reported access figures are increasingly drawn from models rather than audited data.",
        status: "stalled",
        progress: 30,
        date: "2024",
        actor: "World Health Organization",
        link: "https://www.who.int/health-topics/antimicrobial-resistance",
      },
      {
        title: "One Health surveillance and the priority pathogen list",
        detail:
          "WHO refreshed its bacterial priority pathogens list in 2025 to steer research and development toward the drug-resistant infections that actually kill people, and surveillance now links human, animal and environmental data in most regions. Integration is uneven, and much of the data flows one way.",
        status: "scaling",
        progress: 55,
        date: "2025",
        actor: "WHO and Quad health partners",
        link: "https://www.who.int/",
      },
    ],
    timeline: [
      {
        date: "2015-05",
        title: "World Health Assembly adopts the Global Action Plan on AMR",
        detail:
          "Five objectives: strengthen surveillance, optimise antibiotic use, improve access, fund new drugs and vaccines, and cut resistance in food animals. It remains the backbone of national plans two decades on.",
      },
      {
        date: "2019-06",
        title: "UN General Assembly high-level meeting sets targets",
        detail:
          "Heads of government committed to reduce the global burden of AMR, with national action plans funded and antimicrobial use in food animals phased out by 2030.",
      },
      {
        date: "2022-09",
        title: "G20 and Quad health leaders announce new financing targets",
        detail:
          "Commitments included hundreds of millions of dollars for AMR, including pull incentives for antibiotic development and better access in lower-income countries.",
      },
      {
        date: "2024-05",
        title: "WHO publishes the largest global burden study to date",
        detail:
          "The analysis attributed roughly 1.27 million deaths in 2021 directly to bacterial AMR and associated around 4.95 million — the highest estimate yet produced.",
      },
      {
        date: "2024-09",
        title: "UN General Assembly adopts a new AMR political declaration",
        detail:
          "Members set a 2030 target to cut deaths associated with AMR by roughly 10 million a year and reaffirmed access and financing goals.",
      },
      {
        date: "2025",
        title: "WHO updates the bacterial priority pathogens list",
        detail:
          "The list was refreshed to reflect current mortality and burden, redirecting scarce research and development funding toward specific gram-negative and mycobacterial threats.",
      },
    ],
    sources: [
      {
        label: "WHO antimicrobial resistance fact sheet",
        url: "https://www.who.int/news-room/fact-sheets/detail/antimicrobial-resistance",
        year: 2025,
      },
      {
        label: "WHO antibacterial agents in clinical and preclinical development",
        url: "https://www.who.int/health-topics/antimicrobial-resistance",
        year: 2025,
      },
      {
        label: "CDC antimicrobial resistance data and hospital estimates",
        url: "https://www.cdc.gov/",
        year: 2024,
      },
      {
        label: "AMR Action Project prescribing and food-system research",
        url: "https://www.amraction.org/",
        year: 2025,
      },
      {
        label: "GLARRP report on antimicrobial resistance",
        url: "https://www.who.int/",
        year: 2025,
      },
    ],
    updated: "2026-10-09",
  },
  {
    slug: "health-system-regression",
    title: "Health system regression and pandemic readiness decay",
    domain: "bio",
    tag: "Under-monitored, compounding",
    summary:
      "Public health capacity erodes silently during good years, and the first thing you notice is a routine that quietly stopped happening years before the emergency it would have covered.",
    analysis: [
      "Every layer of the public health stack has been cut, thinned or hollowed out at some point in the last decade: local health departments that absorbed pandemic work and lost staff afterwards, surveillance systems that were consolidated for efficiency, laboratories that stopped carrying the reagents that let them respond fast. None of this shows up as a headline because the coverage metrics that measure it — infant immunisation, childhood vaccination, stockouts of routine drugs — are reported annually and against last year, so a decade of decline reads as steady.",
      "The 2018–2020 Ebola outbreak in the Democratic Republic of the Congo is the clearest demonstration of what the decay buys you. Around 3,400 cases and 2,200 deaths in a health system that was already at its limit, with response capacity repeatedly cut off by armed groups; the failure was not a lack of medicine but a lack of trucks, generators, trained staff and trust at the point where the outbreak happened. COVID then removed years of capacity in a few months, and the recovery has not been made.",
      "What makes this the quietest risk in this file is that the damage is cumulative and the recovery is slow. Staff who leave do not come back, and the clinical skills that make surge capacity real — paediatrics, anaesthesia, infection control, logistics — take a decade to rebuild. When a hazard finally arrives, the response is running on the readiness capacity that was quietly spent during the last quiet decade.",
    ],
    likelihood: 88,
    severity: 70,
    speed: 40,
    defence: 32,
    onset: "slow",
    horizon: "Now",
    trend: "rising",
    affected: [
      "Anyone who needs care in the first week of a bad event",
      "Children, through routine vaccination and screening gaps",
      "Rural and lower-income districts, which lost staff first",
      "Staff, who absorb the strain of a system running thin",
    ],
    related: ["engineered-pandemic", "amr", "cyber-resilience-gap"],
    signals: [
      {
        id: "dtp3-coverage",
        label: "Global infant vaccination coverage",
        indicator:
          "Share of one-year-olds receiving three doses of diphtheria, tetanus and pertussis vaccine, as estimated by WHO and UNICEF, 2013 to 2023",
        reading:
          "≈84% in 2023, still below the ≈86% baseline of 2019; an estimated 14.5 million infants missed at least one basic dose",
        status: "high",
        trend: "flat",
        history: [84, 85, 85, 85, 86, 85, 83, 81, 82, 84, 84],
        cadence: "Annual",
        why:
          "This is the closest thing to a heartbeat monitor for a health system: it moves before anything dramatic happens and it never fully recovers.",
        source: "WHO and UNICEF estimates of national immunisation coverage",
        sourceUrl:
          "https://www.who.int/news-room/fact-sheets/detail/immunization-coverage",
      },
      {
        id: "measles-cases",
        label: "Reported measles cases worldwide",
        indicator:
          "Cases reported to WHO per year, in millions, 2013 to 2023; under-reported, so treat as a floor",
        reading:
          "≈10 million cases in 2023, roughly double the pre-pandemic decade; 2024 and 2025 counts were still climbing on partial reporting",
        status: "critical",
        trend: "rising",
        history: [0.9, 1.2, 1.6, 1.7, 2.9, 5.7, 7.0, 9.1, 10.4, 10.9, 11.2],
        cadence: "Annual",
        why:
          "Measles is the canary: it needs two vaccine doses and near-full coverage, so a rise means the routine system has holes in it.",
        source: "WHO measles and rubella surveillance",
        sourceUrl: "https://www.who.int/",
      },
      {
        id: "workforce-gap",
        label: "Projected global health worker shortfall",
        indicator:
          "Estimated unfilled health worker posts worldwide, in millions, against need, as projected by WHO modelling",
        reading:
          "≈10 million posts unfilled by 2030, concentrated in low- and middle-income countries and in nursing and midwifery",
        status: "high",
        trend: "rising",
        history: [7.5, 7.6, 7.8, 8.0, 8.2, 8.4, 8.6, 8.8, 9.0, 9.5, 10.0],
        cadence: "Annual",
        why:
          "Surge capacity is people, not ventilators. A system cannot respond to a mass casualty event if it cannot staff a normal Monday.",
        source: "Global health workforce estimates",
        sourceUrl: "https://www.who.int/",
      },
      {
        id: "us-mmr-coverage",
        label: "US kindergarteners fully covered by MMR",
        indicator:
          "Share of US kindergarten students with at least one MMR dose, school year 2014-15 through 2024-25",
        reading:
          "≈92.5% in the 2024-25 school year, the lowest in roughly a decade, with exemption clustering in a handful of states rather than spread evenly",
        status: "elevated",
        trend: "falling",
        history: [95, 95, 94, 94, 94, 93, 93, 93, 93, 92.7, 92.5],
        cadence: "Annual",
        why:
          "Herd immunity needs coverage well above 95% for a disease as contagious as measles, so a couple of points is the difference between safe and outbreak-prone.",
        source: "US childhood immunisation coverage, CDC",
        sourceUrl: "https://www.cdc.gov/vaccines/",
      },
    ],
    precautions: [
      {
        title: "Keep a household vaccination record you can actually find",
        detail:
          "One page per person: what they have had, what is outstanding, and where it was given. Most families cannot answer this in under a minute, and clinics asking for it during a catch-up campaign is precisely when the gap becomes expensive.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Build the 30-day go-bag for ordinary medicine",
        detail:
          "Thirty days of prescriptions beyond current supply, a written list of conditions and drugs, spare glasses, and a charger. It matters for the unglamorous event too: a flood, a hospital closure, or a supply chain interruption.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "quarter",
      },
      {
        title: "Work out how you get care when the system is full",
        detail:
          "Know your nearest emergency department, the urgent care options, the pharmacies that are open late, and what your insurance or public coverage actually pays. Find out before you need it; during an event this information is scattered and slow.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "quarter",
      },
      {
        title: "Get the seasonal and travel vaccines on time",
        detail:
          "Influenza, COVID and travel vaccines are cheap interventions against the two things most likely to take you out of action: a bad infection and an avoidable hospital admission. Put them in the calendar as recurring events, not intentions.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
        cadence: "Seasonal",
      },
      {
        title: "Run a muster drill once a year",
        detail:
          "Test the things that actually break: can you reach 60% of staff on a given morning, where do oxygen and beds come from at surge, which suppliers have failed and what is the substitute. Run it as a timed exercise with a written after-action review.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "year",
        cadence: "Annual",
      },
      {
        title: "Guarantee sick leave and staff backfill",
        detail:
          "Infection control and outbreak work collapse when people are financially obliged to work while ill, and again when a whole shift is out at once. Paid sick leave with agency backfill is the cheapest surge capacity that exists.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Ring-fence preparedness funding and rebuild the workforce",
        detail:
          "Move preparedness money off annual emergency appropriations and onto a multi-year floor, keep regional laboratories and surveillance units staffed between crises, and pay for retention in clinical roles that only matter when things go wrong. Several governments cut these lines in 2025, which is the point: the decay is now visible in budgets, not just in coverage data.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
    ],
    advancements: [
      {
        title: "The World Bank-hosted Pandemic Fund",
        detail:
          "A permanent fund for preparedness was capitalised in 2022 and began disbursing grants and loans in 2025, aimed squarely at the underfunded middle-income countries that lacked readiness before 2020. Pledges are in the low hundreds of millions against a need measured in billions, and disbursement is slow.",
        status: "promising",
        progress: 40,
        date: "2025",
        actor: "The Pandemic Fund",
      },
      {
        title: "Standing coordination: the Global Health Security Agenda and JEE",
        detail:
          "Countries have voluntarily completed Joint External Evaluation exercises for years, which is a genuine map of where capacity is missing. The agenda has no funded secretariat, no enforcement, and participation in the follow-up action has been uneven.",
        status: "stalled",
        progress: 30,
        date: "2023",
        actor: "WHO and member states",
        link: "https://www.who.int/",
      },
      {
        title: "The WHO Hub for Pandemic and Epidemic Intelligence in Berlin",
        detail:
          "A standing centre that combines event-based and epidemic intelligence with open-source analysis, and publishes open tools other agencies use. Its quality depends on maintaining staff through quiet periods, which is precisely the failure mode of everything else on this page.",
        status: "scaling",
        progress: 60,
        date: "2023",
        actor: "World Health Organization",
        link: "https://www.who.int/",
      },
      {
        title: "Measles and HPV catch-up campaigns",
        detail:
          "Large-scale campaigns since 2022 have pushed vaccination back above pre-pandemic levels for single-antigen cohorts and closed some HPV gaps. They reach large numbers of children and they are one-off: the underlying routine system still delivers fewer doses each year than it did in 2019.",
        status: "scaling",
        progress: 55,
        date: "2024",
        actor: "WHO, UNICEF and Gavi",
      },
      {
        title: "Domestic preparedness appropriations",
        detail:
          "Several national governments cut or redirected public health budgets in 2025, and preparedness lines were among those trimmed, with laboratory, workforce and stockpile accounts taking the sharpest reductions. This is the most measurable version of the decay on this page.",
        status: "regressed",
        progress: 20,
        date: "2026",
        actor: "National health ministries",
      },
    ],
    timeline: [
      {
        date: "2019-01",
        title: "Ebola outbreak in eastern Democratic Republic of the Congo escalates",
        detail:
          "The outbreak ran until June 2020: roughly 3,400 cases and more than 2,200 deaths, with response repeatedly cut off by armed groups in the affected provinces. The failure was capacity — vehicles, generators, trained teams, trust — not the absence of a vaccine.",
      },
      {
        date: "2020-03",
        title: "Routine immunisation and care collapse during COVID-19",
        detail:
          "Massive, uneven drops in childhood vaccination, non-communicable disease follow-up and maternal services across both rich and poor countries; much of the loss has never been recovered.",
      },
      {
        date: "2021-08",
        title: "Global infant vaccination falls below 2019 levels",
        detail:
          "Three-dose infant coverage fell from roughly 86% to around 81%, the steepest single-year drop in the history of the programme, concentrated in low- and middle-income countries.",
      },
      {
        date: "2023-04",
        title: "Post-pandemic disease burden estimate lands",
        detail:
          "Global excess deaths from the pandemic years were assessed at roughly 18 million for 2020 and 2021 alone — a number that, in the countries hit hardest, exceeded the entire death toll of the preceding two decades of infectious disease.",
      },
      {
        date: "2024-11",
        title: "Measles cases surge to around 10 million a year",
        detail:
          "Global measles cases rose by roughly four-fifths in a single year to an estimated ten million, driven by post-COVID vaccination gaps in both high- and low-income countries.",
      },
      {
        date: "2025",
        title: "Preparedness budgets cut in several countries",
        detail:
          "Public health and preparedness lines were among the areas trimmed as health spending was reprioritised and restructured, reversing some of the post-2020 top-ups.",
      },
    ],
    sources: [
      {
        label: "WHO and UNICEF estimates of national immunisation coverage",
        url: "https://www.who.int/news-room/fact-sheets/detail/immunization-coverage",
        year: 2024,
      },
      {
        label: "WHO measles and rubella surveillance data",
        url: "https://www.who.int/",
        year: 2025,
      },
      {
        label: "WHO disease outbreak news",
        url: "https://www.who.int/emergencies/disease-outbreak-news",
        year: 2026,
      },
      {
        label: "Global health workforce shortage estimates",
        url: "https://www.who.int/",
        year: 2023,
      },
      {
        label: "CDC childhood and adolescent immunisation coverage",
        url: "https://www.cdc.gov/vaccines/",
        year: 2025,
      },
    ],
    updated: "2026-10-09",
  },
];