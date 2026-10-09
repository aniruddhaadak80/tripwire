import type { Risk } from "@/lib/types";

export const cyberRisks: Risk[] = [
  {
    slug: "ransomware-ice",
    title: "Ransomware as an infrastructure outage",
    domain: "cyber",
    tag: "Sudden-onset",
    summary:
      "Ransomware no longer steals your data, it switches systems off — pipelines, hospitals and food plants stop running long enough that the damage stops being purely electronic.",
    analysis: [
      "Ransomware stopped being a data-theft problem somewhere around 2020 and became an availability problem. When the target is a pipeline operator, a hospital group or a food distributor, encryption does not need to succeed cleanly — reaching the billing system and the operations network at the same time is enough. Colonial Pipeline went dark for roughly six days in May 2021 after a single credential phished through a legacy VPN account with no multi-factor authentication.",
      "The pattern that matters is double extortion, where the data is stolen first and then encrypted, so recovery stops being a restore-from-backup exercise and becomes a decision about paying. Law enforcement disruption is real but temporary: LockBit was taken offline in early 2024 and was advertising fresh victims within months, and several successor crews operate from jurisdictions where takedowns have almost no reach. Any model that assumes named groups disappear overstates the defence by a wide margin.",
      "What actually moves the risk is recovery, not detection. Most organisations find they can detect and contain the intrusion and still cannot restore service, because the business processes were digitised faster than anyone documented the offline path. Downtime for a mid-sized ransomware event still runs into weeks, and for small hospitals routinely runs to months, which is longer than many of them can financially survive. Treat this as a reliability risk with a hostile cause: the question is not whether you get hit, it is how long you are down and whether anyone downstream of you could keep operating.",
    ],
    likelihood: 88,
    severity: 82,
    speed: 78,
    defence: 62,
    onset: "sudden",
    horizon: "Now",
    trend: "rising",
    affected: [
      "hospitals and outpatient clinics",
      "fuel, freight and food distribution",
      "water and wastewater utilities",
      "municipal payroll and courts",
      "small manufacturers on a single IT vendor",
      "school districts",
    ],
    related: ["cyber-resilience-gap", "identity-takeover", "data-integrity-attack", "supply-chain-backdoor"],
    signals: [
      {
        id: "breach-cost",
        label: "Global average cost of a data breach",
        indicator: "IBM Cost of a Data Breach Report: global average total cost per incident, USD, rounded",
        reading:
          "$4.44M in 2025, down from $4.88M in 2024 — the first year-on-year fall in a decade",
        status: "high",
        trend: "flat",
        history: [3.28, 3.86, 3.86, 4.24, 4.35, 4.45, 4.88, 4.44],
        cadence: "Annual",
        why: "The average hides the shape of the problem. The average is dominated by large regulated victims with long legal tails; for a small supplier an outage can be existential at a fraction of that number.",
        source: "IBM Security, Cost of a Data Breach Report",
        sourceUrl: "https://www.ibm.com/reports/data-breach",
      },
      {
        id: "dwell-time",
        label: "Median time to identify and contain a breach",
        indicator: "Global median dwell time from compromise to containment, days, rounded",
        reading: "Roughly 250 days in 2025, barely moved from around 260 the year before",
        status: "high",
        trend: "flat",
        history: [175, 210, 235, 260, 275, 260, 255, 255],
        cadence: "Annual",
        why: "Attackers usually get in long before anyone notices. A quarter of a year inside a network is time to spread laterally, plant persistence and reach the operational systems that actually hurt.",
        source: "M-Trends / Verizon DBIR",
        sourceUrl: "https://www.verisign.com/resources/reports-datasets/2024-dbir/",
      },
      {
        id: "kev-catalog",
        label: "Known exploited vulnerabilities on the mandatory patch list",
        indicator: "CISA Known Exploited Vulnerabilities catalog: cumulative entries since November 2021, rounded",
        reading: "Well past 1,000 entries, on the order of 1,400 by early 2026",
        status: "critical",
        trend: "rising",
        history: [200, 300, 500, 600, 800, 1000, 1200, 1400],
        cadence: "Weekly",
        why: "This is the closest thing to a real-time list of what is being exploited in the wild right now. Every entry on it is a vulnerability someone has already used against someone else.",
        source: "CISA",
        sourceUrl: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
      },
      {
        id: "ransomware-share",
        label: "Share of breaches involving ransomware",
        indicator: "Share of analysed breaches containing ransomware or related extortion activity, percent, rounded",
        reading: "Around two in five breaches, roughly unchanged for three years",
        status: "critical",
        trend: "flat",
        history: [40, 44, 20, 32, 34, 41, 39, 44],
        cadence: "Annual",
        why: "It stopped being a niche monetisation trick years ago and became a standard business model. Flat at a high number means you cannot plan around it being rare.",
        source: "Verizon Data Breach Investigations Report",
        sourceUrl: "https://www.verisign.com/resources/reports-datasets/2024-dbir/",
      },
    ],
    precautions: [
      {
        title: "Put passkeys or app-based MFA on your email account first",
        detail:
          "Email is the account that resets every other account, so harden it before anything else. Turn off SMS fallback and remember-this-device prompts on the accounts that hold your identity and your money.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
        cadence: "Quarterly",
      },
      {
        title: "Keep one offline backup nobody can reach remotely",
        detail:
          "An encrypted drive in a different physical building, disconnected. Cloud sync is not a backup if the account holding it gets encrypted along with everything else.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
        cadence: "Monthly",
      },
      {
        title: "Update the router and the ISP-supplied box",
        detail:
          "Consumer routers are the most exposed device you own and the least updated. If the box is more than about three years old, replace it with a current one you administer yourself.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
        cadence: "Yearly",
      },
      {
        title: "Run a password audit and rotate what has leaked",
        detail:
          "Check your addresses against known breach corpora, replace anything reused with a generated one, and delete the accounts you no longer use. Most takeover chains start with a password from a breach four years old.",
        audience: "you",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
        cadence: "Quarterly",
      },
      {
        title: "Rehearse the offline path for what you depend on",
        detail:
          "Work out how you would pay a bill, reach a medical record or contact family if your phone, laptop and email were locked for two weeks. Keep paper copies of the two or three documents you cannot reconstruct.",
        audience: "you",
        effort: "medium",
        impact: "medium",
        horizon: "quarter",
        cadence: "Quarterly",
      },
      {
        title: "Segment the operations network and actually time a restore",
        detail:
          "Put operational technology on its own segment with no flat route from corporate email. Rehearse a full restore from an immutable backup at least twice a year, with a timer running — a backup you have never restored is a hypothesis, not a control.",
        audience: "org",
        effort: "high",
        impact: "high",
        horizon: "year",
        cadence: "Quarterly",
      },
      {
        title: "Make phishing-resistant MFA mandatory for remote access",
        detail:
          "Legacy VPN accounts without multi-factor authentication are the most cited initial access point in critical infrastructure intrusions. Give every one of them a named owner and a decommission date, and block the service until it is fixed.",
        audience: "policy",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
        cadence: "Quarterly",
      },
    ],
    advancements: [
      {
        title: "CISA Known Exploited Vulnerabilities catalog with binding deadlines",
        detail:
          "Since 2021 US federal agencies have been required to patch catalogued vulnerabilities on a clock. It works because it converts a judgement call into a compliance event, but it is still only directly binding on federal civilian agencies — coverage of the far more numerous non-federal critical infrastructure is voluntary.",
        status: "scaling",
        progress: 78,
        date: "2025-03",
        actor: "CISA",
        link: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
      },
      {
        title: "Immutable and offline-capable backups become commodity",
        detail:
          "Object lock, air-gapped vaults and immutable snapshots have dropped from an enterprise-tier feature to something any cloud console offers. The remaining gap is verification rather than availability — organisations own the product and skip the drill.",
        status: "scaling",
        progress: 68,
        date: "2025",
      },
      {
        title: "Ransomware payment tracing and recovery clawbacks",
        detail:
          "Blockchain tracing plus cross-border law enforcement now identifies operators and has taken back hundreds of millions of dollars. It improves attribution and deterrence rather than prevention, and it produces nothing when the victim has no clean backup to restore to.",
        status: "promising",
        progress: 55,
        date: "2025",
      },
      {
        title: "Isolated clean-room recovery environments",
        detail:
          "Rebuilding from known-good artefacts in a sealed environment before reconnecting has been available for a decade. Outside the largest banks and a handful of national CERTs, adoption is still low, and restoration still happens under pressure, inside the compromised environment, by exhausted staff.",
        status: "stalled",
        progress: 38,
        date: "2024",
      },
      {
        title: "AI-assisted detection and triage",
        detail:
          "Models that read endpoint telemetry and surface the anomalous behaviour faster than a human analyst are genuinely useful, and attacker tooling is improving on the same clock. Net effect on outcomes is contested; detection time is the part that clearly moved, containment and recovery time is the part that has not.",
        status: "promising",
        progress: 50,
        date: "2026",
      },
    ],
    timeline: [
      {
        date: "2017-06",
        title: "WannaCry",
        detail:
          "A worm using an EternalBlue exploit leaked from NSA tooling hit more than 200,000 Windows machines across over 150 countries in days. It disabled NHS England trusts and cost the UK health service an estimated $100M in disruption.",
      },
      {
        date: "2021-05",
        title: "Colonial Pipeline shut for six days",
        detail:
          "DarkSide ransomware, entered through a legacy VPN account with no multi-factor authentication, halted the largest fuel pipeline in the US. The operator paid roughly $4.4M in bitcoin; investigators recovered about two-thirds of it.",
      },
      {
        date: "2021-07",
        title: "Kaseya VSA supply-chain ransomware",
        detail:
          "REvil pushed a malicious update through a remote monitoring and management tool used by thousands of downstream organisations, many of them small managed service providers. It turned one vendor compromise into thousands of simultaneous victims.",
      },
      {
        date: "2024-02",
        title: "Change Healthcare",
        detail:
          "BlackCat/ALPHV encrypted the largest US healthcare payment clearinghouse and took it offline for weeks. The parent company confirmed a payment reported in the tens of millions, and provider claims processing ground to a halt nationwide.",
      },
      {
        date: "2024-06",
        title: "National Public Data breach and collapse",
        detail:
          "A background-check data broker filed for bankruptcy after a breach affecting hundreds of millions of records surfaced. It became the clearest example of a company whose entire product was aggregating other people's leaked data.",
      },
      {
        date: "2025-07",
        title: "Asahi Kakegawa breweries taken offline",
        detail:
          "Ransomware stopped production at several Japanese plants for around a week, leaving supermarkets short of beer during the summer. No data was reported stolen — the outage alone was the attack.",
      },
    ],
    sources: [
      {
        label: "Verizon Data Breach Investigations Report",
        url: "https://www.verisign.com/resources/reports-datasets/2024-dbir/",
        year: 2024,
      },
      {
        label: "IBM Cost of a Data Breach Report",
        url: "https://www.ibm.com/reports/data-breach",
        year: 2025,
      },
      {
        label: "CISA Known Exploited Vulnerabilities Catalog",
        url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
        year: 2021,
      },
      {
        label: "NCSC — Essential Eight",
        url: "https://www.ncsc.gov.uk/section-keep-security/NCSC-Essential-Eight",
        year: 2023,
      },
      {
        label: "ENISA Threat Landscape",
        url: "https://www.enisa.europa.eu/publications",
        year: 2025,
      },
    ],
    updated: "2026-10-09",
  },
  {
    slug: "supply-chain-backdoor",
    title: "The supply chain backdoor",
    domain: "cyber",
    tag: "Slow-onset",
    summary:
      "Your software is assembled by companies you have never heard of, and a single one of them can quietly reach every machine that installs it.",
    analysis: [
      "SolarWinds Orion in 2020 was the run-up: a trojanised update, signed legitimately, pushed through the vendor's own build pipeline, gave an attacker a foothold in networks including government agencies and a gas operator. The xz-utils backdoor in 2024 was the mature version of the same idea — a patient campaign that spent years engineering pressure on a burned-out maintainer to get an obfuscated hook merged into a library sitting inside almost every Linux server.",
      "The pattern generalises because upstream is under-resourced and downstream is risk-averse in exactly the wrong place. One unpaid maintainer can be the entire provenance chain for a library shipped inside thousands of products, and a buyer of a commodity package cannot simply write it themselves. What changed by the mid-2020s is that regulators began treating the missing bill of materials as a gap rather than an inconvenience.",
      "The honest weakness is that an SBOM describes what is inside and not whether it is trustworthy, and inventory answers are we exposed rather than is this build the one we signed. Signature verification still usually stops at the build step instead of extending to what actually loads at runtime, and the tooling for that is optional configuration in a product nobody sells. The practical ceiling today is knowing your dependency surface and shrinking it deliberately.",
    ],
    likelihood: 80,
    severity: 84,
    speed: 62,
    defence: 55,
    onset: "slow",
    horizon: "Now",
    trend: "rising",
    affected: [
      "open-source maintainers with no funding or security cover",
      "software vendors without an SBOM or provenance programme",
      "federal and state government networks",
      "managed service providers and their downstream clients",
      "CI/CD build and signing infrastructure",
      "embedded and firmware vendors",
    ],
    related: ["cyber-offense-automation", "cyber-resilience-gap", "ransomware-ice", "ai-assisted-bio"],
    signals: [
      {
        id: "cve-volume",
        label: "Named software defects published per year",
        indicator: "CVE records published per year in the NVD, count, rounded",
        reading: "Around 260,000 in 2024, roughly 250,000 in 2023, and roughly 60,000 in 2017",
        status: "high",
        trend: "rising",
        history: [60000, 95000, 140000, 175000, 190000, 225000, 250000, 260000],
        cadence: "Monthly",
        why: "The fast growth is not in the dramatic remotely-exploitable bugs, it is in the long tail of packages you depend on indirectly. Nobody can patch that volume by hand, which is why component-level automation became the only workable answer.",
        source: "NIST National Vulnerability Database",
        sourceUrl: "https://nvd.nist.gov",
      },
      {
        id: "exposed-devices",
        label: "Internet-reachable devices",
        indicator: "Shodan: count of uniquely identified internet-connected devices, millions, rounded",
        reading: "Roughly a billion reachable hosts, a large share of them appliances and embedded devices nobody patches",
        status: "elevated",
        trend: "rising",
        history: [500, 620, 700, 780, 850, 900, 950, 1000],
        cadence: "Weekly",
        why: "Every one of those hosts is reachable from anywhere and most of them were shipped with a default password. That is the flat ground an attacker walks on before ever touching a vendor.",
        source: "Shodan InternetDB",
        sourceUrl: "https://shodan.io",
      },
      {
        id: "vulnerable-dependency",
        label: "Applications shipping a known-vulnerable dependency",
        indicator: "Share of scanned codebases with at least one known vulnerability in an open-source dependency, percent, approximate",
        reading: "Roughly nine in ten scanned applications have at least one known vulnerable open-source dependency",
        status: "critical",
        trend: "rising",
        history: [85, 87, 88, 90, 92, 94, 95, 96],
        cadence: "Annual",
        why: "Vulnerability is nearly universal and mostly uninteresting on its own — what matters is whether the path to it is reachable. Most teams cannot tell the difference between a component they ship and one they shipped by accident.",
        source: "Software composition analysis surveys",
        sourceUrl: "https://owasp.org/www-project-dependency-check/",
      },
      {
        id: "sbom-mandates",
        label: "Regimes requiring a bill of materials from suppliers",
        indicator: "Count of major procurement or market regimes with mandatory SBOM reporting for software suppliers",
        reading: "Two in force by the mid-2020s — US federal procurement and the EU Cyber Resilience Act — with reporting duties phasing in from 2026",
        status: "elevated",
        trend: "rising",
        history: [0, 0, 0, 0, 1, 1, 2, 2],
        cadence: "Annual",
        why: "This is the first time procurement has done the work that security teams could not. It turns the bill of materials from a nice artefact into a contractual deliverable — and enforcement, not publication, is what will decide whether it matters.",
        source: "CISA / NIST SSDF",
        sourceUrl: "https://csrc.nist.gov/pubs/sp/800/218/final",
      },
    ],
    precautions: [
      {
        title: "Patch the devices you forgot you own",
        detail:
          "Routers, modems, printers, cameras, smart TVs, old phones, anything still plugged in from the last house move. Set the update schedule and automate it where the vendor allows, because these devices are not designed to nag.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
        cadence: "Quarterly",
      },
      {
        title: "Install updates from the vendor or the OS, never from an ad",
        detail:
          "Fake update pop-ups and bundled installers remain one of the most reliable ways to get malicious code running with your permission. Type the vendor address yourself, or let the operating system do it.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
      },
      {
        title: "Prune what you run",
        detail:
          "Every installed application is an update channel and an attack surface you no longer use. Uninstall the ones you cannot name a current purpose for, and remove the browser extensions that came with a one-off task.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "quarter",
        cadence: "Quarterly",
      },
      {
        title: "Audit third-party access to your accounts monthly",
        detail:
          "Review connected apps, OAuth grants and shared files in your Google, Microsoft, Apple and Dropbox accounts. Attackers who cannot get in through a password frequently get in by revoking an existing authorisation instead.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
        cadence: "Monthly",
      },
      {
        title: "Know your top twenty dependencies and pin them",
        detail:
          "For anything you depend on, know what it pulls in, pin the versions you actually validated, and remove the rest. An SBOM you generate once and never diff against is compliance paperwork, not a defence.",
        audience: "org",
        effort: "high",
        impact: "high",
        horizon: "year",
        cadence: "Quarterly",
      },
      {
        title: "Require SBOMs and build attestations as a condition of purchase",
        detail:
          "Ask suppliers for an SBOM, a signed build attestation and a written vulnerability-handling policy, then verify the attestations rather than trusting a PDF. Bake the requirement into procurement language so it is not a favour you are asking for.",
        audience: "policy",
        effort: "medium",
        impact: "high",
        horizon: "year",
        cadence: "Annual",
      },
    ],
    advancements: [
      {
        title: "SBOM generation becomes a commodity build step",
        detail:
          "SPDX and CycloneDX generation has moved from an enterprise add-on to a default flag in most build pipelines, and the European Cyber Resilience Act makes an SBOM a legal deliverable rather than a request. The metadata quality problem — wrong versions, missing transitive components — is now the bottleneck.",
        status: "scaling",
        progress: 72,
        date: "2025",
        actor: "CISA, SPDX, CycloneDX",
      },
      {
        title: "NIST Secure Software Development Framework (SP 800-218)",
        detail:
          "Published in 2022 and referenced directly in US federal procurement language, it codifies practices that were already known: protect the build environment, produce an SBOM, verify provenance, respond to vulnerabilities. It tells you what to do and does not tell you which of your suppliers actually does it.",
        status: "scaling",
        progress: 70,
        date: "2022",
        actor: "NIST",
        link: "https://csrc.nist.gov/pubs/sp/800/218/final",
      },
      {
        title: "Build provenance and signed artefacts",
        detail:
          "Attestation and SLSA-style build provenance let a buyer check that an artefact came from a particular source tree and an uncompromised pipeline, rather than trusting a green tick on a download page. Coverage remains thin and signing usually stops at the build step instead of extending to the runtime load.",
        status: "promising",
        progress: 45,
        date: "2025",
      },
      {
        title: "Reproducible and hermetic builds",
        detail:
          "The strongest real answer to the SolarWinds class of attack: rebuild the artefact from source and get the same bits. A decade in it is still niche, because the last mile of determinism — timestamps, link order, embedded absolute paths — costs more than it appears to and the payoff is invisible until an attack.",
        status: "stalled",
        progress: 30,
        date: "2024",
      },
      {
        title: "Memory-safe languages erode the exploit surface",
        detail:
          "NSA and CISA published memory-safety roadmaps in the mid-2020s recommending gradual migration away from C and C++ for new code. Real progress on greenfield projects; close to none in the installed base that actually carries the internet, which runs on thirty-year-old C with manual memory management.",
        status: "promising",
        progress: 45,
        date: "2026",
      },
    ],
    timeline: [
      {
        date: "2016-11",
        title: "ShadowPad ships with a backdoor",
        detail:
          "A signed intrusion tool sold to government customers carried a hardcoded password baked into its own build pipeline. It was a supply chain compromise in miniature: the vendor was the distribution channel.",
      },
      {
        date: "2017-06",
        title: "NotPetya",
        detail:
          "Delivered as a fake tax-filing update through a compromised Ukrainian accounting package, it cost an estimated $10B and destroyed Maetersk's global IT operations. Every major company that ran the affected update found its backups unusable too.",
      },
      {
        date: "2020-12",
        title: "SolarWinds Orion",
        detail:
          "SUNBURST, a trojanised signed update pushed through the vendor's build system, gave an attacker access to thousands of organisations including US federal agencies. It is the clearest case of the update channel itself being the weapon.",
      },
      {
        date: "2021-12",
        title: "Log4Shell",
        detail:
          "A string-formatting function in one logging library used almost everywhere on the JVM was remotely exploitable with a single request. Remediation took most of a year in practice, and it made the case for SBOMs to everyone who had been ignoring it.",
      },
      {
        date: "2023-05",
        title: "MOVEit mass exploitation",
        detail:
          "Cl0p exploited a zero-day in MOVEit Transfer from as early as February 2023 and mass-extorted thousands of downstream organisations, including the US Treasury and the BBC. The attackers skipped the difficult work and simply exploited the supplier.",
      },
      {
        date: "2024-03",
        title: "xz-utils backdoor",
        detail:
          "CVE-2024-3094 was a multi-year social engineering campaign against a burned-out maintainer, inserting an obfuscated backdoor into liblzma and therefore into sshd, Debian and Fedora builds. It was caught by a Postgres developer who noticed a 500ms latency spike during a test.",
      },
    ],
    sources: [
      {
        label: "NIST SP 800-218, Secure Software Development Framework",
        url: "https://csrc.nist.gov/pubs/sp/800/218/final",
        year: 2022,
      },
      {
        label: "CISA — Secure Software Development Framework resources",
        url: "https://www.cisa.gov/resources-tools/resources/secure-software-development-framework-ssdf",
        year: 2023,
      },
      {
        label: "NCSC — Supply chain security guidance",
        url: "https://www.ncsc.gov.uk/guidance/supply-chain-security",
        year: 2022,
      },
      {
        label: "ENISA Threat Landscape",
        url: "https://www.enisa.europa.eu/publications",
        year: 2025,
      },
      {
        label: "NIST National Vulnerability Database",
        url: "https://nvd.nist.gov",
        year: 2024,
      },
    ],
    updated: "2026-10-09",
  },
  {
    slug: "identity-takeover",
    title: "Identity takeover at scale",
    domain: "cyber",
    tag: "Fast-onset",
    summary:
      "One verified login is now enough to move money, redirect post and take your number, and attackers have the automation to do it to thousands of accounts every week.",
    analysis: [
      "Account takeover stopped being a phishing problem and became a credential problem. Around half of credential stuffing comes from bots replaying username and password pairs stolen years earlier, and the industry's answer — a second factor — was largely defeated by the same automated infrastructure, which could also intercept or redirect that second factor. MFA fatigue push-bombing, helpdesk calls that social-engineer a code, and SIM swaps all attack the recovery path rather than the login, which is where the controls have always been thinnest.",
      "Scale is the new part. Credential stuffing requires no exploit and no skill: attackers rent proxy lists, rotate addresses to dodge rate limits, and impersonation fraud attempts are counted in the billions per year, with bots now outnumbering humans on most public login forms. SIM swap and number-port fraud moved from a few thousand reported US incidents to tens of thousands a year before regulators forced carriers to add verification, and the new port-locking rules only cover part of the chain.",
      "The economics are brutal for defenders. Every push-bombing attempt costs an attacker nothing and every prompt costs the user attention that is the real defence, which is why users approve. Passkeys genuinely fix the credential half of this and adoption has run well ahead of sceptics expected, but they do nothing for the recovery half: whoever can change the enrolled device, the recovery email or the phone number can still re-establish the whole account.",
    ],
    likelihood: 92,
    severity: 66,
    speed: 88,
    defence: 64,
    onset: "sudden",
    horizon: "Now",
    trend: "rising",
    affected: [
      "consumer email, banking and brokerage accounts",
      "telecom carriers and number-porting",
      "IT helpdesks and account recovery",
      "small business payment approvals",
      "SaaS, university and payroll accounts",
      "self-service customer portals",
    ],
    related: ["identity-theft", "digital-estate", "synthetic-evidence", "data-integrity-attack"],
    signals: [
      {
        id: "stolen-credentials",
        label: "Breaches that start with a stolen credential",
        indicator: "Share of breaches where stolen credentials were the initial access vector, percent, rounded",
        reading: "Around a third of breaches begin with credentials rather than an exploited vulnerability",
        status: "critical",
        trend: "flat",
        history: [30, 28, 31, 33, 34, 32, 34, 34],
        cadence: "Annual",
        why: "Vulnerability management is where the security budget goes. Credential reuse, old breaches and weak recovery cost organisations roughly as much and get a fraction of the attention.",
        source: "Verizon Data Breach Investigations Report",
        sourceUrl: "https://www.verisign.com/resources/reports-datasets/2024-dbir/",
      },
      {
        id: "stuffing-share",
        label: "Automated login attempts that are credential stuffing or spraying",
        indicator: "Share of malicious authentication attempts that are volume-based credential stuffing or password spraying rather than targeted, percent, approximate",
        reading: "Around nine in ten, and rising as proxy rotation gets cheaper",
        status: "critical",
        trend: "rising",
        history: [78, 82, 85, 88, 90, 92, 94, 95],
        cadence: "Weekly",
        why: "This tells you which control actually pays. Rate limiting, breached-password checks and device intelligence remove most of it; a longer password does essentially nothing.",
        source: "Bot-management and identity telemetry, aggregated",
        sourceUrl: "https://www.ncsc.gov.uk/guidance/multi-factor-authentication-online-services",
      },
      {
        id: "mfa-optin",
        label: "Consumers who have actually turned on multi-factor authentication",
        indicator: "Share of adults with MFA enabled on at least one of their main accounts, percent, survey estimates, rounded",
        reading: "Roughly four in ten, up from around a quarter a decade ago and still flat since 2022",
        status: "elevated",
        trend: "rising",
        history: [25, 30, 33, 36, 36, 38, 38, 40],
        cadence: "Annual",
        why: "Stalling in the high thirties is the whole problem. The control works and most people still have not turned it on, so the gap is usability and defaults rather than knowledge.",
        source: "NCSC / platform-vendor consumer security surveys",
        sourceUrl: "https://www.ncsc.gov.uk/section-keep-security/NCSC-Essential-Eight",
      },
      {
        id: "passkey-share",
        label: "Consumer sign-ins using passkeys",
        indicator: "Passkey sign-in share at large consumer services, percent, rounded and approximate across vendors",
        reading: "In the double digits at Google and PayPal by 2024, and far higher among users who have enrolled — the split between enrolled and unenrolled is the entire story",
        status: "elevated",
        trend: "rising",
        history: [0, 0, 1, 3, 5, 10, 20, 34],
        cadence: "Quarterly",
        why: "Passkeys remove the phishable object entirely rather than adding another thing to approve. The risk is concentration: the key syncs through a platform account, so the recovery path now matters more than the login.",
        source: "FIDO Alliance / platform-vendor disclosures",
        sourceUrl: "https://fidoalliance.org/passkeys/",
      },
    ],
    precautions: [
      {
        title: "Move to passkeys, starting with your email account",
        detail:
          "Email is the root of trust for almost every other account, so enrol it first and work outward to banking, cloud storage and social. Keep the old password as a fallback rather than deleting it outright.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
        cadence: "Quarterly",
      },
      {
        title: "Set a recovery method you do not depend on",
        detail:
          "Remove your phone number as the primary recovery channel on the accounts that matter and use a hardware key or printed recovery codes stored physically. If the only way back in is a text message, an attacker with your number owns the account.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Lock the carrier port on your number",
        detail:
          "Ask your carrier for a port-out lock or transfer PIN, set an account PIN, and make sure only you can authorise a port. This is the single control that stops the SIM-swap takeover chain.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
        cadence: "Yearly",
      },
      {
        title: "Only approve prompts you started yourself",
        detail:
          "Never tap an MFA notification you were not expecting, and report it. Push-bombing works entirely on the assumption that the prompt is accepted as a formality — one tap hands over a session that lasts hours.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
      },
      {
        title: "Use a password manager and stop reusing anything",
        detail:
          "Generate a unique password for every account and let the manager remember them. Reuse is what turns one old breach into a simultaneous loss of banking, email and cloud storage.",
        audience: "you",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
        cadence: "Quarterly",
      },
      {
        title: "Make the helpdesk unhelpable in the useful way",
        detail:
          "Require a supervisor plus an in-person or live-video check for any account recovery, disable knowledge-based authentication entirely, and never let the person requesting the reset approve it. In 2026 the answers to security questions are purchasable.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
        cadence: "Quarterly",
      },
      {
        title: "Mandate phishing-resistant MFA for anything valuable",
        detail:
          "Short session lifetimes, no SMS fallback on high-value applications, and hardware-backed or passkey authentication as the default rather than an upgrade. The residual risk concentrates in recovery, so fund it as a control with its own budget.",
        audience: "policy",
        effort: "medium",
        impact: "high",
        horizon: "year",
        cadence: "Quarterly",
      },
    ],
    advancements: [
      {
        title: "Passkeys and FIDO2 hardware-backed authentication",
        detail:
          "There is no phishable secret to relay and no shared factor to intercept, and the sign-in rate measured by the major platforms has beaten every sceptic's forecast. The open question is key portability and what happens when the passkey sync account is itself compromised.",
        status: "scaling",
        progress: 78,
        date: "2025",
        actor: "FIDO Alliance and platform vendors",
        link: "https://fidoalliance.org/passkeys/",
      },
      {
        title: "App-bound, device-tied authenticators replace SMS one-time codes",
        detail:
          "Codes generated and verified inside the device binding to the platform, with no message to intercept and no number to port. Adoption is driven by default-on behaviour rather than user choice, which is exactly why it finally moves the numbers.",
        status: "scaling",
        progress: 72,
        date: "2026",
      },
      {
        title: "Carrier-side number-porting protections",
        detail:
          "Regulators forced carriers to add verification for port-outs and account changes, and several jurisdictions introduced a mandatory porting PIN. It closes a specific hole cheaply. It does nothing about a carrier employee persuaded to reset a PIN, which is where the remaining cases sit.",
        status: "promising",
        progress: 45,
        date: "2025",
      },
      {
        title: "Knowledge-based authentication and SMS recovery",
        detail:
          "These were already weak. Generative voice cloning turned a cost barrier into a full-time operation, and security-question answers have been purchasable for years. As controls they have gone backwards over the decade rather than forwards.",
        status: "regressed",
        progress: 18,
        date: "2026",
      },
      {
        title: "Behavioural and device-intent scoring on authentication",
        detail:
          "Risk-based step-up, rate limiting and bot management genuinely raise the cost of credential stuffing at scale, and the false-positive rate is now low enough to live with. The tradeoff is blunt: session loss and lockouts land on legitimate users, and the attacks simply migrate to the recovery channel.",
        status: "promising",
        progress: 55,
        date: "2025",
      },
    ],
    timeline: [
      {
        date: "2016-05",
        title: "LinkedIn credential dump circulates",
        detail:
          "Around 117 million username and password hashes from a 2012 breach surfaced, then circulated for years. It became the canonical example of a breach that keeps operating long after the company announces it.",
      },
      {
        date: "2019-07",
        title: "Capital One",
        detail:
          "More than 100 million applications records were exfiltrated through a misconfigured web application firewall. Nothing was exploited and nothing was guessed — the data walked out through a control that was supposed to be a wall.",
      },
      {
        date: "2020-02",
        title: "SIM swap takes over Jack Dorsey's Twitter account",
        detail:
          "Attackers convinced a carrier employee to port the number to hardware they controlled, then posted from the account. It is the incident that turned SIM swapping into a headline everywhere.",
      },
      {
        date: "2021-11",
        title: "Carriers introduce port-out security measures",
        detail:
          "UK and several other carriers began requiring additional verification and offering porting PINs following a wave of high-profile fraud. Two years later UK regulators made the protection mandatory.",
      },
      {
        date: "2023-02",
        title: "Passkey sync goes mainstream",
        detail:
          "The major platforms shipped passkeys that sync across a user's own devices, removing the objection that losing a hardware key means losing the account. Adoption went from a rounding error to the default option within a couple of years.",
      },
      {
        date: "2025-01",
        title: "Credential stuffing shuts down Ireland's Revenue service",
        detail:
          "A sustained automated attack against staff and citizen accounts took the Irish tax service offline for around six days and delayed refunds and PAYE filings nationwide. No malware, no exploit — volume and patience.",
      },
    ],
    sources: [
      {
        label: "Verizon Data Breach Investigations Report",
        url: "https://www.verisign.com/resources/reports-datasets/2024-dbir/",
        year: 2024,
      },
      {
        label: "NCSC — Multi-factor authentication online services",
        url: "https://www.ncsc.gov.uk/guidance/multi-factor-authentication-online-services",
        year: 2023,
      },
      {
        label: "NIST SP 800-63-4, Digital Identity Guidelines",
        url: "https://pages.nist.gov/800-63-4/",
        year: 2025,
      },
      {
        label: "FIDO Alliance — Passkeys",
        url: "https://fidoalliance.org/passkeys/",
        year: 2025,
      },
      {
        label: "CISA — Secure Our World",
        url: "https://www.cisa.gov/secure-our-world",
        year: 2024,
      },
    ],
    updated: "2026-10-09",
  },
  {
    slug: "cyber-resilience-gap",
    title: "The cyber resilience gap in critical services",
    domain: "cyber",
    tag: "Under-monitored",
    summary:
      "Small water plants, rural clinics, school districts and local utilities run on people who also do the IT, and nobody has measured what happens when they go down.",
    analysis: [
      "The entities that are easiest to break are the ones with the least redundancy. US water systems serving around 10,000 people or fewer are sometimes operated by one person, and small rural hospitals hold a similar concentration of responsibility. CISA advisories have repeatedly named small and medium water utilities running operational systems with internet-exposed remote access, and the January 2024 Iranian-affiliated attacks against utilities in Texas and Oklahoma reached programmable logic controllers through a shared default password.",
      "The compounding part is money, not technology. Small jurisdictions depend on grants for resilience, those grants run in cycles, and there is no business case that fixes itself — a town of eight thousand will never self-fund a segmented network and a 24-hour watch floor. Meanwhile the cost of being down has risen sharply, because a boil-water notice or a failed pump costs a community money and political capital far beyond its IT spend. National cyber investment has concentrated on the large operators, which is where the money is and not where the tail risk is.",
      "This is the least visible cyber risk in the atlas and that is the point. There is no market signal that a town's water system is undefended and no product sold to the person responsible for it, because nobody markets patch management to a plant operator with a budget smaller than a truck payment. Until the money moves toward the long tail, the honest reading is that a low-to-mid seven-figure budget in the wrong small jurisdiction is a plausible disruption of water, power or care for tens of thousands of people.",
    ],
    likelihood: 84,
    severity: 72,
    speed: 70,
    defence: 42,
    onset: "gradual",
    horizon: "< 5 yrs",
    trend: "flat",
    affected: [
      "small water and wastewater utilities",
      "rural hospitals and community clinics",
      "school districts",
      "municipal and co-operative utilities",
      "county emergency services",
      "irrigation and drainage districts",
    ],
    related: ["water-system-dependency", "grid-overload-cascade", "data-integrity-attack", "ransomware-ice"],
    signals: [
      {
        id: "essential-eight",
        label: "Baseline security control coverage",
        indicator: "NCSC Cyber Security Reviews: mean Essential Eight coverage score across roughly 1,000 reviewed UK organisations, percent, rounded",
        reading: "Around 70% in 2024, up from about 61% the year before — the weakest control is still patch management",
        status: "elevated",
        trend: "rising",
        history: [36, 43, 46, 52, 55, 61, 70, 70],
        cadence: "Annual",
        why: "This is the cleanest national measurement of how well ordinary organisations, not banks, actually implement a baseline. It moved four points in a year and then stopped, and the tail of small operators barely moves at all.",
        source: "NCSC Cyber Security Reviews",
        sourceUrl: "https://www.ncsc.gov.uk/section-keep-security/NCSC-Essential-Eight",
      },
      {
        id: "sltt-ransomware",
        label: "Ransomware attacks on state, local and tribal government",
        indicator: "CISA-reported ransomware incidents against US state, local, tribal and territorial government entities, cumulative since 2018, rounded",
        reading: "Around 2,800 cumulative attacks reported to CISA, with annual volume up sharply year on year",
        status: "critical",
        trend: "rising",
        history: [80, 200, 400, 700, 1100, 1500, 2000, 2800],
        cadence: "Quarterly",
        why: "These are the organisations with no security team, no budget line and an obligation to keep operating. They are the single most reliable entry point into critical services and nobody holds them to a reporting standard.",
        source: "CISA",
        sourceUrl: "https://www.cisa.gov/news-events/cybersecurity-advisories",
      },
      {
        id: "healthcare-downtime",
        label: "Downtime after a ransomware event in healthcare",
        indicator: "Median days of operational disruption for healthcare organisations hit by ransomware, days, approximate",
        reading: "In the low twenties of days for hospitals, against hours for the median business",
        status: "critical",
        trend: "flat",
        history: [16, 15, 17, 18, 19, 21, 25, 22],
        cadence: "Annual",
        why: "Healthcare cannot queue work. A three-week outage means cancelled surgery, diverted ambulances and staff working through nights on paper charts — and unlike a factory, it cannot simply stop without someone dying.",
        source: "Healthcare resilience and outage surveys",
        sourceUrl: "https://www.bleepingcomputer.com/news/security/",
      },
      {
        id: "ot-exposure",
        label: "Operational technology exposed to the public internet",
        indicator: "Shodan: count of hosts answering on industrial protocols intended for local networks only, count, rounded",
        reading: "Tens of thousands of hosts still reachable on protocols with no authentication model at all",
        status: "high",
        trend: "flat",
        history: [44000, 45000, 46000, 47000, 48000, 49000, 48000, 47000],
        cadence: "Weekly",
        why: "Nothing about these systems is secret — the documentation is public because the default credentials are standard. What changed is not the exposure but the tooling that finds it and the attackers who now go looking.",
        source: "Shodan InternetDB",
        sourceUrl: "https://shodan.io",
      },
    ],
    precautions: [
      {
        title: "Keep offline copies of your health and identity documents",
        detail:
          "A printed summary of your medications, conditions, allergies, insurer and policy numbers, plus scans of your ID and passport somewhere physically safe. During a hospital outage this is the difference between treatment and a slow morning of phone calls.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
        cadence: "Yearly",
      },
      {
        title: "Know how your utility actually reaches you in an outage",
        detail:
          "Register for the emergency broadcast list and keep a battery-powered radio. Water advisories and boil notices often go out by text and by social media, which are the two channels most likely to be degraded during exactly the event you need them for.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
      },
      {
        title: "Keep three days of go-bag supplies for a no-power, no-water week",
        detail:
          "Water, food that needs no cooking, medication, torch, battery pack and copies of anything you would be asked for. The realistic failure here is not a catastrophe, it is a Tuesday with no grid and no supermarket.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "quarter",
        cadence: "Yearly",
      },
      {
        title: "Give the household two independent ways in",
        detail:
          "Keep a written copy of your password manager master password somewhere physically secure, a spare key with someone you trust, and one passkey on a second device. A single point of contact failure locks out everyone including whoever was helping.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "quarter",
      },
      {
        title: "Separate the operational network from everything else and staff both",
        detail:
          "Operational technology should sit on its own segment with no inbound route from the internet and no flat route from corporate email. Then staff the monitoring, because an unstaffed segment nobody watches is a control on paper only.",
        audience: "org",
        effort: "high",
        impact: "high",
        horizon: "year",
        cadence: "Quarterly",
      },
      {
        title: "Fund the long tail with shared services, not more competitive grants",
        detail:
          "Regional security operations centres, shared patch management and a mandatory minimum control set for systems serving under 10,000 people. A county with four IT staff cannot buy its way out of this alone, and neither can the next grant cycle.",
        audience: "policy",
        effort: "medium",
        impact: "high",
        horizon: "year",
        cadence: "Annual",
      },
    ],
    advancements: [
      {
        title: "Shared and regional security operations for small jurisdictions",
        detail:
          "Counties, water districts and small cities increasingly pool into regional SOCs or buy managed monitoring from a shared provider, which turns an impossible staffing problem into a subscription. Coverage is patchy and depends entirely on grant cycles that are not designed to sustain a service.",
        status: "promising",
        progress: 45,
        date: "2025",
      },
      {
        title: "NIS2 pulls mid-sized operators into a compliance regime",
        detail:
          "The EU directive entered into force in January 2023 with an October 2024 transposition deadline, bringing tens of thousands of mid-sized water, energy, waste and health operators into mandatory incident reporting and baseline security duties that did not previously apply to them. Enforcement and national implementation remain the weak part.",
        status: "scaling",
        progress: 60,
        date: "2025",
        actor: "European Commission",
        link: "https://www.enisa.europa.eu/publications",
      },
      {
        title: "Vendor consolidation brings monitoring with it",
        detail:
          "When a small utility buys its SCADA support from one vendor and its firewall from another, the monitoring arrives with the contract. This is how much of the long tail actually gets defended, and it is an accident of procurement rather than a security programme.",
        status: "scaling",
        progress: 55,
        date: "2025",
      },
      {
        title: "Taking SCADA off the public internet",
        detail:
          "Guidance recommending removal of dial-up and unnecessary internet exposure has existed since long before the Texas and Oklahoma attacks. It stays technically easy but needs money, an engineer and a replacement cycle, and water systems routinely run fifteen years between upgrades.",
        status: "stalled",
        progress: 40,
        date: "2026",
      },
      {
        title: "Cyber insurance as a forcing function on the small tail",
        detail:
          "Insurers have moved cyber cover onto mandatory MFA, offline backups and endpoint detection, which creates a market reason to do the work. Coverage for small utilities is thin and premiums are high, so the mechanism works unevenly and mostly punishes those who can least afford it.",
        status: "promising",
        progress: 50,
        date: "2025",
      },
    ],
    timeline: [
      {
        date: "2015-12",
        title: "Ukraine power grid attacks",
        detail:
          "Manual-dip attacks on three regional distribution companies in western Ukraine left around 226,000 customers without power for several hours. It remains the clearest demonstration that a cyber event can become a physical one in under an hour.",
      },
      {
        date: "2018-02",
        title: "Oldsmar water treatment plant",
        detail:
          "An attacker increased sodium hydroxide levels in the water to dangerous levels. Nobody noticed for hours because the control system behaved exactly as designed and the operator on shift had no independent way to know.",
      },
      {
        date: "2021-05",
        title: "Colonial Pipeline",
        detail:
          "A ransomware incident shut the largest US fuel pipeline for around six days. Fuel shortages appeared across several states, which is the clearest evidence that cyber downtime propagates into physical queues at petrol stations.",
      },
      {
        date: "2023-01",
        title: "EU NIS2 enters into force",
        detail:
          "The directive extends mandatory reporting and baseline security duties to tens of thousands of mid-sized energy, water, transport and health operators that had previously been out of scope.",
      },
      {
        date: "2024-01",
        title: "Texas and Oklahoma water utilities attacked",
        detail:
          "Iranian-affiliated actors logged into programmable logic controllers at small water systems using a shared default password, and in one case changed the hex values that set chlorine levels. The password was on the default list, so any operator who had not changed it was exposed.",
      },
      {
        date: "2025-03",
        title: "NHS Scotland board cyberattack",
        detail:
          "An attack on a health board took systems offline for weeks, cancelling tens of thousands of appointments and forcing clinics to work from paper. It is the current template for what under-resourced healthcare downtime looks like.",
      },
    ],
    sources: [
      {
        label: "CISA — Cybersecurity advisories and alerts",
        url: "https://www.cisa.gov/news-events/cybersecurity-advisories",
        year: 2025,
      },
      {
        label: "NCSC — Essential Eight",
        url: "https://www.ncsc.gov.uk/section-keep-security/NCSC-Essential-Eight",
        year: 2024,
      },
      {
        label: "ENISA Threat Landscape",
        url: "https://www.enisa.europa.eu/publications",
        year: 2025,
      },
      {
        label: "CISA — Known Exploited Vulnerabilities Catalog",
        url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
        year: 2021,
      },
      {
        label: "Shodan InternetDB",
        url: "https://shodan.io",
        year: 2026,
      },
    ],
    updated: "2026-10-09",
  },
  {
    slug: "data-integrity-attack",
    title: "Data integrity attacks and the trust collapse",
    domain: "cyber",
    tag: "Trust-layer",
    summary:
      "The failure mode is not stealing your data, it is quietly editing it — a map, a medical record, a training set, a video of your CEO — so every decision made from it is wrong and nobody can tell.",
    analysis: [
      "Integrity is the least protected property of a system. Confidentiality gets encryption, availability gets backups and failover, and integrity usually gets a checksum on a database column — a control that means nothing against an attacker who already arrives with write access. The financially successful version of this is business email compromise: invoice redirection, changed bank details and payroll diversion, which remain among the largest categories of reported cybercrime losses and depend almost entirely on a human checking one detail in an email.",
      "The same trick works on physical systems that assume their inputs are real. GPS jamming and spoofing around the Baltic and the Black Sea became a routine aviation hazard through 2024 and 2025, with GNSS interference reports climbing steeply and aircraft falling back on inertial navigation and radio beacons. It also works on identity: the deepfake voice call to a helpdesk that resets a password, the cloned executive appearing on a live video call to approve a transfer, and the executive-impersonation pretexts that banks now handle as their own crime category.",
      "It also works on the inputs we are building systems on now. Model poisoning and backdoored training data are hard to detect precisely because a poisoned corpus looks statistically ordinary, and the verification step that would catch it — provenance on every training example — is not something any framework currently gives you. Downstream, synthetic media has made the cheap part easy: you no longer need a good forgery, you need one plausible enough for the specific person who reviews it.",
    ],
    likelihood: 86,
    severity: 78,
    speed: 74,
    defence: 38,
    onset: "gradual",
    horizon: "Now",
    trend: "rising",
    affected: [
      "finance and engineering teams approving payments",
      "aviation, maritime and road navigation",
      "model training and evaluation pipelines",
      "identity verification and onboarding checks",
      "clinics and health records",
      "newsrooms, courts and evidence handling",
    ],
    related: ["synthetic-evidence", "identity-takeover", "ai-assisted-bio", "algorithm-driven-polarisation"],
    signals: [
      {
        id: "bec-losses",
        label: "Reported losses to business email compromise",
        indicator: "FBI IC3 annual report: losses to business email compromise, USD, rounded",
        reading: "Around $2.8B in 2024, essentially flat on 2023 and by far the largest single reported cybercrime category",
        status: "critical",
        trend: "flat",
        history: [900, 1200, 1700, 1800, 2400, 2500, 2900, 2800],
        cadence: "Annual",
        why: "Almost none of this needs a technical exploit. It needs one employee to trust a plausible email and one bank detail to change, which is why the cheapest controls pay for themselves so quickly.",
        source: "FBI Internet Crime Complaint Center",
        sourceUrl: "https://www.ic3.gov",
      },
      {
        id: "gnss-interference",
        label: "GNSS jamming and spoofing reports over Europe",
        indicator: "Reported GNSS interference and jamming events affecting civil aviation and navigation per year, count, rounded",
        reading: "From tens of reports a year before 2022 to low thousands during the Baltic jamming campaign",
        status: "high",
        trend: "rising",
        history: [30, 50, 60, 90, 800, 1500, 2200, 2600],
        cadence: "Monthly",
        why: "Position is an input that nobody thinks to verify because it has always been trustworthy. Once it is contested, everything built on it — approach paths, logistics, timing, election logistics — inherits the doubt.",
        source: "ENISA / civil aviation authorities",
        sourceUrl: "https://www.enisa.europa.eu/publications",
      },
      {
        id: "content-credentials",
        label: "Signed provenance at the point of capture",
        indicator: "C2PA coalition members shipping signed capture or verification in production hardware and platforms, count, rounded",
        reading: "Still a small minority of camera makers and platforms, with signing metadata stripped by most upload pipelines",
        status: "quiet",
        trend: "rising",
        history: [2, 6, 12, 18, 24, 30, 36, 42],
        cadence: "Quarterly",
        why: "This is the only fix that scales: cryptographically sign the image at the sensor, so editing breaks the chain. It only works if the signature survives the upload, and right now most pipelines throw it away.",
        source: "C2PA",
        sourceUrl: "https://c2pa.org",
      },
      {
        id: "training-data-provenance",
        label: "Models shipped with documented data provenance",
        indicator: "Share of publicly available machine learning models with a machine-readable data provenance statement, percent, approximate",
        reading: "A low single-digit percentage, and only where a vendor chose to disclose it",
        status: "critical",
        trend: "rising",
        history: [1, 1, 1, 2, 2, 2, 3, 3],
        cadence: "Annual",
        why: "You cannot audit a training set you cannot enumerate. Until provenance is a build artefact rather than a press release, nobody outside the lab can answer whether a model was trained on data that was deliberately altered.",
        source: "Model documentation and transparency reporting",
        sourceUrl: "https://www.nist.gov/itl/ai-risk-management-framework",
      },
    ],
    precautions: [
      {
        title: "Verify every bank-detail change out of band",
        detail:
          "When a supplier or a caller asks for new payment details, call them back on a number you already had from a previous invoice or contract, not one in the message. This single step defeats the large majority of invoice fraud, and it costs nothing.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
        cadence: "Every change",
      },
      {
        title: "Treat urgency plus authority plus secrecy as one alarm",
        detail:
          "No legitimate request combines a deadline, a person you cannot easily check and a reason not to involve anyone else. Slow down by one hour; the whole genre of fraud depends on you not having that hour.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Challenge live video and voice requests with an off-context question",
        detail:
          "Ask something the real person would know and a clone would not: the name of their first pet, the street they grew up on, what they were wearing last week. It feels strange to do with a family member and it is exactly the point.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Assume a text message sender ID can be anything",
        detail:
          "Smishing messages that imitate a bank or a delivery company with a genuine-looking thread and number are cheap to send and impossible to distinguish by sender alone. Open the app or type the address yourself rather than following the link.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
      },
      {
        title: "Agree a family verification word before you need it",
        detail:
          "Pick a word your household uses to confirm identity on an unexpected call, and agree that anyone genuinely in trouble will still not ask for money. It takes five minutes and it is the cheapest defence against voice cloning.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "quarter",
      },
      {
        title: "Make verification a control rather than a habit",
        detail:
          "Dual approval on vendor bank-detail changes, mandatory out-of-band callback on a known number, and a rule that the requester cannot approve their own change. Then test it, because the control only works if someone actually follows the procedure during a busy week.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
        cadence: "Quarterly",
      },
      {
        title: "Require provenance for data and models that drive decisions",
        detail:
          "Signed artefacts, recorded dataset lineage, reproducible build steps and tamper-evident logs for anything that feeds a decision about a person, a payment or a safety-critical system. Report integrity control coverage alongside security coverage — right now almost nobody does.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
        cadence: "Annual",
      },
    ],
    advancements: [
      {
        title: "Capture-time content provenance with C2PA Content Credentials",
        detail:
          "Signing at the sensor and verifying at presentation is the only durable answer, and it is now shipping in real cameras and platforms. Adoption remains narrow, most upload pipelines strip the metadata, and a signature proves origin rather than truth — an authentic camera can still photograph something false.",
        status: "promising",
        progress: 35,
        date: "2025",
        actor: "C2PA",
        link: "https://c2pa.org",
      },
      {
        title: "AI-text and AI-image detectors",
        detail:
          "They were never reliable and paraphrasing, translation and simple rewriting defeat them outright. They also flag non-native English prose at high rates, which makes them actively dangerous as evidence. Treat any detector score as one weak input, never as a verdict.",
        status: "regressed",
        progress: 15,
        date: "2026",
      },
      {
        title: "Anti-spoofing navigation and alternative position systems",
        detail:
          "Multi-constellation receivers with signal-intensity and consistency checks, plus eLoran-style alternative navigation for harbours, cut the practical spoofing surface considerably. It is a retrofit problem rather than a design one, because the receivers are the long-life asset and the threat arrived last year.",
        status: "promising",
        progress: 45,
        date: "2025",
      },
      {
        title: "Making impersonation fraud reportable and refundable",
        detail:
          "UK and EU regulators have moved certain authorised push-payment and impersonation fraud into a mandatory reimbursement regime, and banks have added dedicated impersonation categories. Reimbursement changes the cost of being fooled faster than any detection improvement, and the volume reported changes shape accordingly.",
        status: "promising",
        progress: 45,
        date: "2025",
      },
      {
        title: "Runtime and build-time integrity for models and training pipelines",
        detail:
          "Dataset hashing, signed weights and reproducible training runs are common practice at the frontier labs and close to absent everywhere else. The base rate of a poisoned or backdoored dataset is unknown because almost nobody measures it, which is precisely the problem.",
        status: "stalled",
        progress: 30,
        date: "2026",
      },
    ],
    timeline: [
      {
        date: "2016-10",
        title: "Mirai takes down DNS providers",
        detail:
          "A botnet built from default credentials on IoT devices knocked major DNS providers offline. It is a reminder that the input layer of the internet was never authenticated, and that reachability alone is enough.",
      },
      {
        date: "2019-01",
        title: "City of Peterborough loses $2.3M to invoice fraud",
        detail:
          "Staff were convinced by email to change the bank account on a construction contract. The money was recovered by police in Ohio after moving through several accounts, which is the standard outcome and the standard delay.",
      },
      {
        date: "2020-02",
        title: "AI voice used to move €220,000",
        detail:
          "Attackers cloned the voice of the chief executive of a German parent company and called staff at its UK subsidiary to request a transfer. It was one of the first widely reported cases of a synthetic voice being used against a business.",
      },
      {
        date: "2021-08",
        title: "C2PA 1.0 published",
        detail:
          "The Coalition for Content Provenance and Authenticity released version 1.0 of the standard for cryptographically binding content to its origin, giving camera makers and platforms a common way to sign at capture.",
      },
      {
        date: "2024-01",
        title: "Arup loses HK$200M to a deepfake video call",
        detail:
          "An employee of the engineering firm's Hong Kong office joined a video call with people who looked and sounded like senior colleagues, including a known individual, and moved roughly US$25M. A second confirmation call using a known number would have prevented it.",
      },
      {
        date: "2025-02",
        title: "Baltic GNSS jamming campaign",
        detail:
          "Sustained interference over the Baltic disrupted navigation across aviation, shipping and border infrastructure across several countries, forcing aircraft onto inertial navigation and non-GNSS approaches. It is the clearest case of a physical input simply being switched off.",
      },
    ],
    sources: [
      {
        label: "FBI Internet Crime Complaint Center annual report",
        url: "https://www.ic3.gov",
        year: 2024,
      },
      {
        label: "Verizon Data Breach Investigations Report",
        url: "https://www.verisign.com/resources/reports-datasets/2024-dbir/",
        year: 2024,
      },
      {
        label: "ENISA Threat Landscape",
        url: "https://www.enisa.europa.eu/publications",
        year: 2025,
      },
      {
        label: "NCSC — Phishing guidance",
        url: "https://www.ncsc.gov.uk/guidance/phishing",
        year: 2023,
      },
      {
        label: "NIST AI Risk Management Framework",
        url: "https://www.nist.gov/itl/ai-risk-management-framework",
        year: 2023,
      },
    ],
    updated: "2026-10-09",
  },
];