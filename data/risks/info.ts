import type { Risk } from "@/lib/types";

export const infoRisks: Risk[] = [
  {
    slug: "synthetic-evidence",
    title: "Synthetic evidence and the death of the visual record",
    domain: "info",
    tag: "Systemic",
    summary:
      "Fabricated images, audio and video are now cheap enough that a clip with no provenance is treated as an allegation rather than a record, and courts, insurers and newsrooms are quietly rewriting what counts as proof.",
    analysis: [
      "The cost of producing a plausible fake collapsed from weeks of skilled work to seconds of prompting, and the bottleneck moved from production to distribution. What breaks first is not reality itself, it is evidentiary weight: courts have begun limiting or excluding images whose chain of custody cannot be shown, insurers are declining claims over synthetic video, and platforms routinely unlist an authentic clip alongside the fake one it is mistaken for. The people who lose evidentiary ground first are journalists, courts, insurers and anyone keeping photographs as proof of what happened.",
      "Detectors do not close the gap because the adversarial surface is the re-encode chain. A fake passed through a screenshot, a crop, platform transcoding and compression often lands closer to a detector's training distribution than a genuine camera image does, so false positives stay highest exactly where the stakes are highest. It is an arms race with a bad cost ratio for the defender, because every detection product must be right on a distribution its attacker is actively steering.",
      "What helps is boring. Cryptographic provenance — signing the file at the moment of capture — shifts the burden from proving authenticity to proving nothing, and that only works when most capture devices sign by default and the social layer reads and shows those signatures. Until then the exposure is personal rather than systemic in any cinematic sense: the failure lands when you forward, cite or act on an unverified clip, which is why a short pause plus one primary source is most of the defence.",
    ],
    likelihood: 92,
    severity: 64,
    speed: 74,
    defence: 32,
    onset: "gradual",
    horizon: "< 5 yrs",
    trend: "rising",
    affected: [
      "Journalists and newsrooms losing usable footage",
      "Courts and evidence systems",
      "Insurers and claims adjusters",
      "Anyone keeping photos or video as proof",
    ],
    related: [
      "algorithm-driven-polarisation",
      "institutional-trust-decay",
      "identity-takeover",
      "deceptive-agents",
    ],
    signals: [
      {
        id: "ofcom-encountered-synthetic",
        label: "Adults who say convincing synthetic media fooled them",
        indicator:
          "Ofcom online nation survey, share of UK adults reporting they have seen or been fooled by synthetic imagery they initially believed to be real",
        reading:
          "≈10-15 per 100 UK adults report a convincing fake they initially trusted, up from ≈2 per 100 in 2016",
        status: "elevated",
        trend: "rising",
        history: [2, 2, 3, 4, 6, 8, 9, 11, 12, 14],
        cadence: "Annual",
        why:
          "Self-reported deception is the earliest honest count of this problem; official tallies do not exist because the whole point of the material is that nobody flags it.",
        source: "Ofcom, Online Nation",
        sourceUrl: "https://www.ofcom.org.uk/online-nation/2025/",
      },
      {
        id: "social-video-news-share",
        label: "News consumers leaning on social video and personalities",
        indicator:
          "Reuters Institute Digital News Report, share of respondents who regularly get news from social video, influencers and personalities",
        reading:
          "≈1 in 4 people regularly get news from social video, roughly stable since 2022",
        status: "elevated",
        trend: "flat",
        history: [17, 18, 19, 21, 23, 24, 24, 25, 25, 26],
        cadence: "Annual",
        why:
          "Unverified creator video is the main delivery route for synthetic material, because there is no newsroom gate and no correction process attached to it.",
        source: "Reuters Institute for the Study of Journalism",
        sourceUrl: "https://www.reutersinstitute.politics.ox.ac.uk/digital-news-report/2026",
      },
      {
        id: "c2pa-adoption",
        label: "Share of major publisher domains shipping signed assets",
        indicator:
          "C2PA ecosystem reporting, approximate share of top publisher domains publishing content with C2PA manifests on at least some uploads",
        reading:
          "Roughly a quarter to a third of large publisher domains, rising but not universal, and concentrated on a few newsrooms",
        status: "elevated",
        trend: "rising",
        history: [0, 0, 1, 2, 4, 7, 11, 16, 22, 28],
        cadence: "Quarterly",
        why:
          "Provenance only works if the majority of publishers sign, and coverage is still far too patchy for a missing signature to mean anything.",
        source: "C2PA (Coalition for Content Provenance and Authenticity)",
        sourceUrl: "https://c2pa.org/",
      },
      {
        id: "ap-synthetic-factchecks",
        label: "Fact-checks focused on manipulated and synthetic media",
        indicator:
          "Associated Press fact-checking output, rounded count of dedicated synthetic-media and manipulated-media cases handled per year",
        reading:
          "Several hundred dedicated cases a year and climbing, with impersonation and voice cloning dominating",
        status: "high",
        trend: "rising",
        history: [40, 90, 180, 300, 450, 600, 700, 800],
        cadence: "Annual",
        why:
          "Fact-check desks see the tip of the volume. Every case here is an incident that reached the top of a sharing platform first.",
        source: "Associated Press",
        sourceUrl: "https://ap.org/",
      },
    ],
    precautions: [
      {
        title: "Two-source rule before you act on a clip",
        detail:
          "Before forwarding, quoting or acting on any image, video or audio: find one primary source — the original uploader, the official statement, the full unedited clip — and one independent report. If you cannot name both, do not send it.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
        cadence: "Every time you hit forward on media",
      },
      {
        title: "Check the feed, not just the story",
        detail:
          "Judge who has reach before judging content: a clip from an account with a million followers and no reporting history is a distribution decision, not evidence. Look for the original post, not the repost you were sent.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
      },
      {
        title: "Notification hygiene",
        detail:
          "Mute forwarding chains and auto-added group threads. Keep alerts on for people and institutions you have explicitly approved, and turn off everything that arrives because an algorithm chose you.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
        cadence: "Quarterly",
      },
      {
        title: "Archive what you witness",
        detail:
          "For anything that actually matters — damage, an accident, a workplace dispute — keep the original file, not a screenshot, and note the time and place. Keep the source device until the matter is closed; metadata and file continuity are the whole defence later.",
        audience: "you",
        effort: "medium",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Provenance requirement for consequential material",
        detail:
          "Any image, video or audio used in a decision, an incident report, or a customer communication must come from a source device, an original upload or a documented third party — and the provenance record must be attached, not assumed.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
        cadence: "Quarterly audit",
      },
      {
        title: "Red-team your own comms",
        detail:
          "Once a quarter, publish a plausible-but-fake internal or external communication with a trusted colleague's name on it and see how long it takes your organisation to notice. Measure time-to-detection, not policy compliance.",
        audience: "org",
        effort: "medium",
        impact: "medium",
        horizon: "year",
        cadence: "Quarterly",
      },
      {
        title: "Fund capture-side provenance",
        detail:
          "Make signed capture the default for official publications and public communication, fund prebunking ahead of high-risk moments, and require platforms operating in your market to expose provenance metadata on downloads rather than stripping it.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
    ],
    advancements: [
      {
        title: "C2PA content credentials on capture and in the newsroom",
        detail:
          "Camera makers, editors and platforms are signing image and video at capture and at edit, with manifests that survive cropping and recompression. Adoption is real and growing but still a minority of publishers, and the signature is only visible to people who know to look for it.",
        status: "scaling",
        progress: 45,
        date: "2026",
        actor: "C2PA members including camera makers, Adobe, Microsoft and major publishers",
        link: "https://contentcredentials.org/",
      },
      {
        title: "EU AI Act transparency duties for synthetic media",
        detail:
          "Article 50 of the EU AI Act makes providers and deployers of synthetic audio, image, video and text outputs technically identifiable, and applies from 2 August 2026. It creates a legal duty to mark and disclose machine-generated content, which is a stronger forcing function than voluntary labelling.",
        status: "promising",
        progress: 50,
        date: "2026-08",
        actor: "European Union",
        link: "https://artificialintelligenceact.eu/article/50/",
      },
      {
        title: "Prebunking and inoculation",
        detail:
          "Short, specific warnings about a manipulation technique before exposure measurably improve sharing decisions, and the effect is strongest when the warning names the tactic rather than the conclusion. It survives contact with short-form video better than generic media-literacy curricula.",
        status: "promising",
        progress: 55,
        date: "2019",
        actor: "Behavioural science groups and platform trust and safety teams",
        link: "https://www.science.org/doi/10.1126/sciadv.aay2496",
      },
      {
        title: "In-browser synthetic media detectors",
        detail:
          "Detectors embedded in browsers and camera apps were meant to flag fakes at capture. They regressed under real-world distribution, because heavy recompression pushes genuine images outside their training distribution and produces false positives on exactly the compressed, re-shared material people care about.",
        status: "regressed",
        progress: 20,
        date: "2025",
        actor: "Browser vendors and detector vendors",
      },
      {
        title: "Platform friction on reshare and forwarding",
        detail:
          "Experiments that insert a prompt before forwarding, or slow the reshare of material a user has not watched, reduce the volume of unverified recirculation. Effects are small, inconsistent across surfaces, and easy to lose to engagement pressure.",
        status: "stalled",
        progress: 35,
        date: "2025",
        actor: "Large social platforms",
      },
    ],
    timeline: [
      {
        date: "2017-11",
        title: "Non-consensual deepfake video spreads on mainstream platforms",
        detail:
          "Face-swapped video of real people, almost entirely women, reaches large hosting platforms and forces the first wave of platform policy bans.",
      },
      {
        date: "2019-09",
        title: "Voice cloning used for corporate fraud",
        detail:
          "Audio impersonation of senior executives is used to instruct staff to move money, an early demonstration that audio needs no visual credibility at all.",
      },
      {
        date: "2022-11",
        title: "C2PA publishes specification 1.0",
        detail:
          "A cross-industry technical standard for cryptographically signed provenance manifests lands, aimed at making authenticity verifiable rather than merely inspectable.",
      },
      {
        date: "2024-02",
        title: "Large platforms begin labelling AI-generated images",
        detail:
          "Meta rolls out labels for content its systems detect as AI-generated, an early deployment of disclosure that will later be folded into regulatory duties.",
      },
      {
        date: "2025-06",
        title: "Provenance tooling becomes a default feature, not a pilot",
        detail:
          "Capture and editing tools begin attaching credentials by default rather than on request, which is the precondition for provenance to mean anything at scale.",
      },
      {
        date: "2026-08-02",
        title: "EU AI Act transparency obligations apply",
        detail:
          "Providers and deployers in the EU market become obliged to make synthetic content technically identifiable and to disclose it.",
      },
    ],
    sources: [
      {
        label: "C2PA specification and conformance programme",
        url: "https://c2pa.org/",
        year: 2026,
      },
      {
        label: "Regulation (EU) 2024/1689, the AI Act",
        url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
        year: 2024,
      },
      {
        label: "Ofcom, Online Nation",
        url: "https://www.ofcom.org.uk/online-nation/2025/",
        year: 2025,
      },
      {
        label: "Reuters Institute, Digital News Report",
        url: "https://www.reutersinstitute.politics.ox.ac.uk/digital-news-report/2026",
        year: 2026,
      },
      {
        label: "Content Credentials",
        url: "https://contentcredentials.org/",
        year: 2026,
      },
    ],
    updated: "2026-10-09",
  },
  {
    slug: "algorithm-driven-polarisation",
    title: "Algorithm-driven polarisation",
    domain: "info",
    tag: "Under-monitored",
    summary:
      "Recommendation systems optimised for engagement keep steering people toward content that makes them angry, and the people who lose the ability to find common ground are ordinary users who never opted in.",
    analysis: [
      "Ranking systems were not built to be political, but they were built to predict what holds attention, and outrage is the most reliable attention signal available. The result is that the content a person sees is systematically tilted toward their existing resentments without anyone at the platform choosing that outcome deliberately. Small communities and minority-language speakers are hit hardest, because they are easiest to concentrate into a single high-arousal bubble.",
      "The uncomfortable part is that the measured damage has not moved much. Trust, perceived polarisation and feelings about news have been broadly flat for a decade, even as recommendation systems were rewritten underneath. That flatness is not evidence the problem is small; it is evidence that individual-level harms are being offset by cross-cutting exposure people get from group chats, workplaces and offline contact, and that those offsets are load-bearing.",
      "The interventions that exist are mostly friction: chronological options, prompts before resharing, slower distribution of unverified material. They reduce the worst recirculation but do not change the ranking objective, and each one competes directly against engagement revenue. Regulatory pressure through the Digital Services Act on recommender transparency and systemic risk assessment is the first approach that does not depend on a platform volunteering, and it is still early enough that its results are not in.",
    ],
    likelihood: 90,
    severity: 60,
    speed: 58,
    defence: 38,
    onset: "slow",
    horizon: "< 5 yrs",
    trend: "rising",
    affected: [
      "Small and local communities",
      "Minority-language and diaspora audiences",
      "Journalists covering contested topics",
      "Election administrators in polarised constituencies",
    ],
    related: [
      "synthetic-evidence",
      "institutional-trust-decay",
      "election-integrity",
      "deceptive-agents",
    ],
    signals: [
      {
        id: "reported-polarisation",
        label: "People who say social media makes conversation more polarised",
        indicator:
          "Reuters Institute Digital News Report, share of respondents who agree that social media makes public debate more polarised",
        reading:
          "Roughly 4 in 10 across surveyed markets, essentially unchanged for a decade",
        status: "high",
        trend: "flat",
        history: [46, 47, 48, 48, 47, 46, 46, 45, 45, 44],
        cadence: "Annual",
        why:
          "This flatness is the key data point. A decade of redesigned ranking systems has not moved public perception of polarisation at all, which suggests the fixes on offer are too small.",
        source: "Reuters Institute for the Study of Journalism",
        sourceUrl: "https://www.reutersinstitute.politics.ox.ac.uk/digital-news-report/2026",
      },
      {
        id: "social-news-feeling-worse",
        label: "News users who say social media news makes them feel worse about politics",
        indicator:
          "Reuters Institute Digital News Report, share of social media news users reporting negative feelings about politics after consuming news there",
        reading:
          "Around half of social media news users, holding steady over five years",
        status: "high",
        trend: "flat",
        history: [44, 45, 46, 46, 47, 47, 47, 48, 48, 48],
        cadence: "Annual",
        why:
          "If the mood impact were neutral the engagement objective would be defensible. It has been stable and persistently negative, which makes it a design choice rather than a side effect.",
        source: "Reuters Institute for the Study of Journalism",
        sourceUrl: "https://www.reutersinstitute.politics.ox.ac.uk/digital-news-report/2026",
      },
      {
        id: "platform-retrenchment",
        label: "Major platforms switching from moderation to user-generated notes",
        indicator:
          "Count and share of large platforms that have replaced commissioned fact-checking with crowdsourced community notes, approximately counted",
        reading:
          "Several of the largest platforms have moved to a community-notes model since early 2025",
        status: "critical",
        trend: "rising",
        history: [1, 1, 2, 2, 3, 4, 5, 7, 9, 11],
        cadence: "Quarterly",
        why:
          "Community notes work at the scale of a serious claim with broad disagreement, and degrade badly for the ambiguous, local and locally-targeted content that polarisation actually feeds on.",
        source: "Reuters Institute for the Study of Journalism",
        sourceUrl: "https://www.reutersinstitute.politics.ox.ac.uk/digital-news-report/2026",
      },
      {
        id: "influencer-news-trust",
        label: "Trust gap for personality-led news versus professional outlets",
        indicator:
          "Ofcom news consumption research, share of UK adults rating news from personalities and influencers as less reliable than news from professional outlets",
        reading:
          "About 3 in 5 UK adults, drifting down only slowly over several years",
        status: "elevated",
        trend: "falling",
        history: [68, 68, 67, 66, 65, 64, 63, 62, 61, 60],
        cadence: "Annual",
        why:
          "People already discount creator-led news at the point of use. The problem is that the underlying content still arrives through the same recommendation systems, discount or not.",
        source: "Ofcom, Online Nation",
        sourceUrl: "https://www.ofcom.org.uk/online-nation/2025/",
      },
    ],
    precautions: [
      {
        title: "Replace discovery with a written source list",
        detail:
          "Build an explicit list of feeds, newsletters and people you read and subscribe only to those. Discovery-by-algorithm is where the tilt lives; a fixed list removes it without reducing how much you read.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
        cadence: "Once, then quarterly review",
      },
      {
        title: "Notification hygiene",
        detail:
          "Disable algorithmic push and auto-added group threads. Keep alerts on for named people and institutions, and give notification access to only the apps that genuinely need it.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
        cadence: "Quarterly",
      },
      {
        title: "One deliberate cross-cut each week",
        detail:
          "Read one source that reliably disagrees with you, and one written by someone who actually lives in the situation being argued about. Set it as a recurring calendar item so it survives a bad week.",
        audience: "you",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Audit your own feed for 15 minutes",
        detail:
          "Scroll back through the last 200 posts you were served. Count how many are things you already agreed with, how many make you angry, and how many are from outside your country. If the answers are extreme, the feed is doing this on purpose.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
      },
      {
        title: "Measure out-group reach in your own systems",
        detail:
          "For any product or platform you run, sample a few hundred feeds and measure the share of out-group and non-polarising content recommended, plus how far outrage-coded items spread. Track it as a number with a trend line, not as a policy statement.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
        cadence: "Quarterly",
      },
      {
        title: "Do not make decisions in the feed",
        detail:
          "Any decision about people, pay, discipline or public position gets made in a channel with a record and a second person, not in a comment thread or a group chat. Feed-shaped spaces are optimised for reaction, not for accuracy.",
        audience: "org",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Mandatory recommender audit and researcher access",
        detail:
          "Require platforms in your market to document systemic risks from their recommendation systems, publish them, and give vetted researchers real access to data and to sampled feeds. Model it on DSA systemic risk obligations, including for political advertising.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
    ],
    advancements: [
      {
        title: "Community notes and crowdsourced verification",
        detail:
          "Open-source, invite-based notes that add context to widely shared posts, now shipped by several large platforms. It reliably handles high-reach claims with broad cross-section agreement and much less reliably handles subtle, local or single-source material, and coverage arrives after the peak.",
        status: "stalled",
        progress: 42,
        date: "2025",
        actor: "Large social platforms",
      },
      {
        title: "User choice over algorithmic feeds",
        detail:
          "Chronological and interest-selected feeds made easy or default under digital competition rules. They give real users a genuine off-switch and, so far, very low take-up, because the algorithmic feed is more convenient and the difference is invisible until you see it.",
        status: "scaling",
        progress: 40,
        date: "2026",
        actor: "Platforms and regulators under digital competition rules",
      },
      {
        title: "DSA systemic risk assessment and researcher access",
        detail:
          "Very large platforms must assess and mitigate systemic risks to elections, civic discourse and fundamental rights, publish the assessment, and grant vetted researchers data access. It is the only mechanism that does not depend on a platform choosing to reduce engagement.",
        status: "scaling",
        progress: 55,
        date: "2026",
        actor: "European Commission and very large online platforms",
        link: "https://eur-lex.europa.eu/eli/reg/2022/2065/oj",
      },
      {
        title: "Friction experiments on reshare and reply prompts",
        detail:
          "Prompts before resharing, prompts in the composer, and throttled distribution of posts a user has not opened all reduce the volume of reflexive circulation. Measured effects are modest and surfaces regress whenever engagement pressure rises.",
        status: "stalled",
        progress: 38,
        date: "2025",
        actor: "Large social platforms",
      },
      {
        title: "Commissioned fact-checking retrenchment",
        detail:
          "Since early 2025 at least one of the largest platforms ended its commissioned third-party fact-checking programme in major markets and moved to community notes, and others reduced moderation staffing. Independent research reports both fewer corrections and slower response on false claims.",
        status: "regressed",
        progress: 20,
        date: "2025-01",
        actor: "Major social platforms",
      },
    ],
    timeline: [
      {
        date: "2016-01",
        title: "Engagement ranking becomes the default across large platforms",
        detail:
          "News feed ranking moves from chronological to predicted engagement at scale, and the objective function stops being about what you asked to see.",
      },
      {
        date: "2018-03",
        title: "Data scandal exposes political micro-targeting at scale",
        detail:
          "A third-party political data firm is found harvesting profiles of tens of millions of users without meaningful consent, exposing how much targeting infrastructure sits outside public view.",
      },
      {
        date: "2021-10",
        title: "Internal research documents published",
        detail:
          "Leaked internal studies show companies were aware their own experiments indicated harm to some users, sharpening the question of who is accountable for known ranking harms.",
      },
      {
        date: "2023-04",
        title: "First very large platforms designated under the Digital Services Act",
        detail:
          "The EU designates the first very large online platforms and search engines, triggering systemic risk assessment and transparency obligations.",
      },
      {
        date: "2025-01",
        title: "Commissioned fact-checking ended in a major market",
        detail:
          "A leading platform announces it will replace third-party fact-checking with community notes in the United States, and several peers reduce moderation investment.",
      },
      {
        date: "2026-08-02",
        title: "EU AI Act fully applicable",
        detail:
          "The wider transparency regime, including disclosure of synthetic political content, comes into force alongside continued enforcement of platform systemic risk duties.",
      },
    ],
    sources: [
      {
        label: "Regulation (EU) 2022/2065, the Digital Services Act",
        url: "https://eur-lex.europa.eu/eli/reg/2022/2065/oj",
        year: 2022,
      },
      {
        label: "Reuters Institute, Digital News Report",
        url: "https://www.reutersinstitute.politics.ox.ac.uk/digital-news-report/2026",
        year: 2026,
      },
      {
        label: "Ofcom, Online Nation",
        url: "https://www.ofcom.org.uk/online-nation/2025/",
        year: 2025,
      },
      {
        label: "World Economic Forum, global risk reporting",
        url: "https://www.weforum.org/reports/",
        year: 2026,
      },
    ],
    updated: "2026-10-09",
  },
  {
    slug: "institutional-trust-decay",
    title: "Institutional trust decay",
    domain: "info",
    tag: "Slow-onset",
    summary:
      "Public trust in government, news and professional institutions has fallen far enough that routine public-health, safety and emergency messaging no longer moves behaviour on its own.",
    analysis: [
      "Trust is the discount rate on public messaging. When a large share of people distrust the messenger, warnings about smoke, vaccines, flooding or heatwaves arrive already discounted, and the practical result is that safety instructions have to be repeated through channels people actually trust rather than the official one. That substitution is expensive, slower, and much less equitable, because the substitute channels are not evenly distributed across the population.",
      "The curve is unusually shaped. Institutional trust took a small, real bump during the early pandemic and then gave it back, while trust in news has fallen almost monotonically and hardest among the youngest adults, who are also the group least likely to be reachable by institutional channels at all. Trust in AI products is the counter-signal worth watching: reported trust in AI companies running many people's lives is higher than trust in most comparable technologies, which suggests the ceiling on institutional credibility has not flattened everywhere.",
      "This is not a technology risk in the usual sense, but it is a dependency. Synthetic media and algorithmic polarisation both take their real damage through institutions that no longer command unquestioned attention, so the two domains feed each other. The interventions with evidence behind them are unglamorous: visible service quality, corrections published with the same reach as the error, independent measurement of institutional trust as a tracked indicator, and deliberate investment in the next generation's news habits.",
    ],
    likelihood: 88,
    severity: 56,
    speed: 38,
    defence: 46,
    onset: "slow",
    horizon: "5–20 yrs",
    trend: "rising",
    affected: [
      "Public health and emergency response",
      "Local government and courts",
      "Journalism and public-service media",
      "Anyone relying on official alerts",
    ],
    related: [
      "synthetic-evidence",
      "algorithm-driven-polarisation",
      "election-integrity",
      "data-integrity-attack",
    ],
    signals: [
      {
        id: "news-distrust",
        label: "People who say they distrust news in general",
        indicator:
          "Reuters Institute Digital News Report, share of respondents across surveyed markets saying they distrust news in general",
        reading:
          "Around 4 in 10, up from roughly 1 in 4 a decade ago",
        status: "high",
        trend: "rising",
        history: [24, 27, 28, 30, 33, 34, 36, 37, 39, 40],
        cadence: "Annual",
        why:
          "When four in ten people distrust news as a category, verification burdens shift onto the reader, and readers are the least equipped to carry that load consistently.",
        source: "Reuters Institute for the Study of Journalism",
        sourceUrl: "https://www.reutersinstitute.politics.ox.ac.uk/digital-news-report/2026",
      },
      {
        id: "young-adult-news-trust",
        label: "Trust in news among under-25s",
        indicator:
          "Reuters Institute Digital News Report, share of 18-24s saying they trust news in general, compared with older age bands",
        reading:
          "Roughly 2 in 10, the lowest of any age band, and still falling",
        status: "critical",
        trend: "falling",
        history: [28, 26, 25, 24, 23, 22, 22, 21, 20, 20],
        cadence: "Annual",
        why:
          "The cohort ageing into civic responsibility is the least reachable by institutional messaging, which is the structural part of this risk rather than the sentiment part.",
        source: "Reuters Institute for the Study of Journalism",
        sourceUrl: "https://www.reutersinstitute.politics.ox.ac.uk/digital-news-report/2026",
      },
      {
        id: "eu-institution-trust",
        label: "Trust in national government and public institutions",
        indicator:
          "Eurobarometer and related EU survey series, share of respondents expressing trust in national government and public authorities",
        reading:
          "Roughly 3 in 4 report some trust in national government, with large variation between member states",
        status: "elevated",
        trend: "flat",
        history: [72, 71, 70, 70, 69, 70, 70, 71, 71, 72],
        cadence: "Seasonal",
        why:
          "Executive-level trust has held roughly flat, which means the erosion is concentrated in media, parties and expert institutions rather than in civil service credibility.",
        source: "European Commission, Eurobarometer",
        sourceUrl: "https://europa.eu/european-union/about-eu/publications/eurobarometer_en",
      },
      {
        id: "ai-institution-trust",
        label: "Reported trust in AI companies",
        indicator:
          "Trusting Robots survey work, share of adults who say they trust AI businesses to act in the public interest, compared with trust in other technologies",
        reading:
          "Around 7 in 10, notably higher than trust in most comparable technologies",
        status: "quiet",
        trend: "flat",
        history: [70, 71, 72, 73, 72, 72, 73, 73, 73, 73],
        cadence: "Annual",
        why:
          "It shows the institutional trust ceiling is not uniformly low, and it is the pool that synthetic-evidence and polarisation attacks are drawing down.",
        source: "Trusting Robots",
        sourceUrl: "https://trustingrobots.org/",
      },
    ],
    precautions: [
      {
        title: "One primary source per institution you depend on",
        detail:
          "For every institution your life actually runs on — government services, school, bank, insurer, GP, utility — bookmark the official page and check it directly instead of via a search result or a shared link. This is the shortest path back to a source that has not been summarised by someone with an agenda.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Notification hygiene, aimed at alerts",
        detail:
          "Keep emergency and account alerts switched on, but only from official senders you have verified yourself. Turn off forwarding from unknown groups and any channel that arrives because a recommendation system chose you.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
        cadence: "Quarterly",
      },
      {
        title: "A family verification rule agreed in advance",
        detail:
          "Agree one rule with the people you live with: nothing gets forwarded as fact until one primary source has been checked, and the first question is always who benefits. Deciding this calmly in advance is what stops it working during an actual emergency.",
        audience: "you",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
        cadence: "Review each year and after any incident",
      },
      {
        title: "Decide your trust budget on purpose",
        detail:
          "Write down which institutions get your default trust and which need verification every time. Most people hold an implicit list; making it explicit stops the whole budget drifting downward by default every time something disappoints.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "quarter",
        cadence: "Annual",
      },
      {
        title: "Correct at the same reach as the error",
        detail:
          "When you publish something wrong, issue the correction in the same channel with comparable reach, name what was wrong, and keep it up. Quietly editing an error teaches the audience that your channels cannot be relied on at all.",
        audience: "org",
        effort: "low",
        impact: "high",
        horizon: "today",
        cadence: "Every incident",
      },
      {
        title: "Measure comprehension, not reach",
        detail:
          "Track whether people who received your message understood and could act on it, through short follow-up surveys and inbound call patterns, not impressions. Reach on a distrusted channel is a cost with no benefit.",
        audience: "org",
        effort: "medium",
        impact: "medium",
        horizon: "quarter",
        cadence: "Quarterly",
      },
      {
        title: "Fund independent trust measurement and independent media",
        detail:
          "Track institutional trust as a published national indicator on a fixed cadence, commission it independently, and support news organisations that are locally accountable rather than purely audience-maximising. Trust is an output of service quality and durable media, and it cannot be announced back into existence.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
    ],
    advancements: [
      {
        title: "Prebunking and inoculation",
        detail:
          "Short, specific warnings about a manipulation technique delivered before exposure improve sharing decisions measurably, and the effect is largest when the warning names the tactic. Cheap to run, and it survives being packaged badly.",
        status: "promising",
        progress: 55,
        date: "2025",
        actor: "Behavioural science groups, public health and trust and safety teams",
        link: "https://www.science.org/doi/10.1126/sciadv.aay2496",
      },
      {
        title: "Independent public service journalism funding",
        detail:
          "Multi-year, arm's-length funding for locally accountable news is the intervention most consistently associated with higher news trust, because it buys continuity and accountability rather than reach. Slow to build, easy for governments to capture, and the capture risk is the main reason it stalls.",
        status: "promising",
        progress: 50,
        date: "2026",
        actor: "EU member states and other public broadcasters",
      },
      {
        title: "Institutional transparency portals and plain-language redesign",
        detail:
          "Open decision records, publishable meeting calendars, and plain-language notices measurably improve trust in individual institutions, though the effect is local and does not offset a national trend on its own.",
        status: "promising",
        progress: 45,
        date: "2026",
        actor: "Public sector bodies",
      },
      {
        title: "Independent measurement of trust as a tracked indicator",
        detail:
          "Several statistical agencies and research programmes now publish institutional trust on a fixed schedule, which turns a vague cultural complaint into something with a trend line and therefore something a government can be held to.",
        status: "scaling",
        progress: 48,
        date: "2026",
        actor: "National statistical offices and academic survey programmes",
      },
      {
        title: "Platform accountability for civic harms",
        detail:
          "Regulatory duties on systemic risk and misinformation handling are the main structural counterweight to synthetic-media and polarisation harms, and they were weakened in at least one major market when a leading platform ended commissioned fact-checking in early 2025.",
        status: "regressed",
        progress: 25,
        date: "2025-01",
        actor: "Major social platforms and regulators",
      },
    ],
    timeline: [
      {
        date: "2015-12",
        title: "Trust in mainstream media falls through 50 percent",
        detail:
          "Cross-national survey work puts trust in the media below the halfway mark in a majority of surveyed countries, with political distrust running well ahead of distrust of individual journalists.",
      },
      {
        date: "2017-06",
        title: "Post-truth framing becomes the dominant political genre",
        detail:
          "Public debate is characterised by selective fact use and shared false claims, and editorial guidance on verification and false balance starts to change as a routine.",
      },
      {
        date: "2020-04",
        title: "Temporary rise in institutional trust during early pandemic response",
        detail:
          "Trust in national and local institutions rises during the first phase of the emergency, one of the few periods in two decades where it moves in the right direction.",
      },
      {
        date: "2021-11",
        title: "That gain reverses, and news trust among young people hits new lows",
        detail:
          "By late 2021 the pandemic bump has unwound and reported trust in news among under-25s falls below a fifth, the weakest level recorded for any age band.",
      },
      {
        date: "2023-10",
        title: "Social video becomes a primary news source for a large share of young adults",
        detail:
          "National media consumption research finds roughly a third of young adults now get most of their news from personalities and social video rather than from broadcasters or publishers.",
      },
      {
        date: "2026-08",
        title: "Synthetic-content disclosure duties and platform enforcement bite in the EU market",
        detail:
          "AI Act transparency obligations and continued Digital Services Act enforcement create the first binding regional framework for disclosure and systemic-risk duties on civic platforms.",
      },
    ],
    sources: [
      {
        label: "Reuters Institute, Digital News Report",
        url: "https://www.reutersinstitute.politics.ox.ac.uk/digital-news-report/2026",
        year: 2026,
      },
      {
        label: "European Commission, Eurobarometer",
        url: "https://europa.eu/european-union/about-eu/publications/eurobarometer_en",
        year: 2025,
      },
      {
        label: "Trusting Robots",
        url: "https://trustingrobots.org/",
        year: 2025,
      },
      {
        label: "Ofcom, Online Nation",
        url: "https://www.ofcom.org.uk/online-nation/2025/",
        year: 2025,
      },
      {
        label: "World Economic Forum, global risk reporting",
        url: "https://www.weforum.org/reports/",
        year: 2026,
      },
    ],
    updated: "2026-10-09",
  },
  {
    slug: "election-integrity",
    title: "Election integrity failure",
    domain: "info",
    tag: "High-impact",
    summary:
      "The machinery of voting has held up better than expected, but the surrounding process — registration records, mail-ballot handling, result certification, and voter confidence — degrades first and is much harder to fix.",
    analysis: [
      "It is worth separating two things that get conflated in public argument. Technical integrity of voting systems has been comparatively strong: independent assessments after recent national cycles found no sign that vote recording or tabulation systems were compromised, and audits of results have improved. What is fragile is everything around the system: registration databases that quietly lose and misplace individual records, ballot handling that produces multi-week backlogs, and certification disputes that are resolved by argument rather than by process.",
      "The persuasion layer is where the real exposure sits. Synthetic media has made fabricated candidate statements and fabricated endorsements cheap, and the message arriving during a voting period has nowhere to be checked in time. Election integrity failure therefore does not need to flip a result to be serious — a party that genuinely won, in a close count, losing legitimacy because nobody could show the process was sound, is a comparable-scale outcome.",
      "The effective defences are unglamorous and mostly procedural: verifiable pre-registration checks, chain-of-custody on returned ballots, risk-limiting audits by default, statutory deadlines that survive a surge in mail voting, and standing pre-agreed protocols for responding to a fabricated claim during the window. The critical personal one is simple: treat any message claiming your vote needs fixing, correcting or re-casting as an attack, and check your status on the official election authority site rather than through the link in the message.",
    ],
    likelihood: 84,
    severity: 78,
    speed: 52,
    defence: 52,
    onset: "gradual",
    horizon: "< 5 yrs",
    trend: "rising",
    affected: [
      "Election administrators and local officials",
      "Voters using postal or early voting",
      "Minority and language-access communities",
      "News organisations covering counts",
    ],
    related: [
      "synthetic-evidence",
      "algorithm-driven-polarisation",
      "institutional-trust-decay",
      "data-integrity-attack",
    ],
    signals: [
      {
        id: "voter-roll-errors",
        label: "Individually altered or wrongly removed voter records",
        indicator:
          "Public records, court filings and election administration reports on individual voter registration errors, aggregated across jurisdictions per cycle",
        reading:
          "Tens of thousands of records affected across jurisdictions in a typical cycle, overwhelmingly administrative rather than malicious",
        status: "elevated",
        trend: "flat",
        history: [20, 30, 45, 60, 80, 95, 110, 125, 140, 155],
        cadence: "Seasonal",
        why:
          "Batch removals for housekeeping and individually wrong removals are the mechanism that actually suppresses votes, and they get reported as administrative trivia rather than as integrity failures.",
        source: "CISA, election security",
        sourceUrl: "https://www.cisa.gov/topics/election-security",
      },
      {
        id: "certification-delays",
        label: "Longest delay past statutory certification deadline",
        indicator:
          "Worst-case number of days by which a local authority overran its statutory result-certification deadline in a national cycle, driven by mail-ballot processing backlogs",
        reading:
          "Worst-case overrun in recent cycles is on the order of one to three weeks, concentrated in a handful of jurisdictions",
        status: "elevated",
        trend: "rising",
        history: [1, 1, 2, 3, 4, 6, 9, 12, 14, 16],
        cadence: "Annual",
        why:
          "A fortnight of uncertified results is the exact window in which a fabricated claim becomes credible, because there is no official number to point at.",
        source: "Associated Press, election results tracking",
        sourceUrl: "https://ap.org/",
      },
      {
        id: "misinformation-election-concern",
        label: "People who see misinformation campaigns as a major election threat",
        indicator:
          "Reuters Institute Digital News Report, share of respondents naming misinformation campaigns as a major concern for elections in their country",
        reading:
          "Roughly 6 in 10 across surveyed markets, up from around 4 in 10 a decade ago",
        status: "high",
        trend: "rising",
        history: [40, 45, 50, 52, 55, 57, 58, 59, 60, 61],
        cadence: "Annual",
        why:
          "Expectation is itself a risk factor. When most voters expect manipulation, a fabricated claim gets believed by default and officials face a burden of proof they did not sign up for.",
        source: "Reuters Institute for the Study of Journalism",
        sourceUrl: "https://www.reutersinstitute.politics.ox.ac.uk/digital-news-report/2026",
      },
      {
        id: "synthetic-campaign-content",
        label: "Verified synthetic campaign content incidents per cycle",
        indicator:
          "Rounded count of confirmed, publicly documented cases of AI-generated candidate content — cloned voices, fabricated statements, synthetic endorsements — per electoral cycle",
        reading:
          "Dozens of documented cases per recent national cycle, up from low single digits, with detection lagging the publication",
        status: "high",
        trend: "rising",
        history: [1, 2, 3, 5, 8, 12, 18, 24, 30, 38],
        cadence: "Annual",
        why:
          "Every one of these is designed for the final voting days, when the verification window closes. Volume, not sophistication, is what is scaling.",
        source: "Associated Press",
        sourceUrl: "https://ap.org/",
      },
    ],
    precautions: [
      {
        title: "Check your registration from the official site",
        detail:
          "Open your election authority's site by typing the address yourself. Confirm registration status, polling place and any identification requirement before the deadline. Never use a link from a message telling you your registration needs fixing.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
        cadence: "Once per cycle, before the deadline",
      },
      {
        title: "Treat 'your vote is invalid' messages as hostile",
        detail:
          "No legitimate election authority needs to be told by you that your ballot is defective, and they will never ask you to fix it through a link or a phone number in a message. Verify status on the official site and then stop reading the thread.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Notification hygiene for the voting period",
        detail:
          "Subscribe only to official result and deadline alerts from your election authority, using the sender they publish. Mute group threads and forwarding chains entirely for the duration of the voting period.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "quarter",
        cadence: "Each electoral cycle",
      },
      {
        title: "Agree the voting plan with your household in advance",
        detail:
          "Decide in advance who votes when and how, and share it once. A pre-committed plan is the strongest defence against last-minute social engineering, which targets exactly the moment when people are busy and the deadline is close.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
      },
      {
        title: "Run a tabletop on a fabricated claim during peak service hours",
        detail:
          "Once a year, simulate a credible fake claim about your own operation — an outage, a payment freeze, a data breach — during your busiest hours. Measure time to a correct public statement, not the accuracy of a statement written on a quiet day.",
        audience: "org",
        effort: "medium",
        impact: "medium",
        horizon: "year",
        cadence: "Annual",
      },
      {
        title: "Freeze non-essential outbound comms around voting days",
        detail:
          "For organisations that communicate with customers — payroll, utilities, retail, logistics — plan to ship critical communications before the window opens, keep a small fact-check desk staffed, and publish the status from a pre-verified channel that already has followers.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
        cadence: "Each electoral cycle",
      },
      {
        title: "Fund verifiable ballot handling by default",
        detail:
          "Make risk-limiting audits the default rather than the fallback, require documented chain of custody for returned ballots, publish reconciliation data in near real time, and set certification deadlines that survive a surge in mail voting. Also fund independent observer access, which is currently the strongest assurance mechanism that exists.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
    ],
    advancements: [
      {
        title: "Risk-limiting audits and post-election verification",
        detail:
          "Hand-counted audits triggered by a statistically determined sample can confirm or overturn a close result with high confidence, and they are now routine in several jurisdictions. Their limits are real: they run after the fact, and they confirm arithmetic rather than the integrity of every ballot.",
        status: "scaling",
        progress: 60,
        date: "2026",
        actor: "Election administrators, state auditors and audit vendors",
        link: "https://www.cisa.gov/topics/election-security",
      },
      {
        title: "Chain-of-custody requirements for returned ballots",
        detail:
          "Statutory ballot-trailer requirements, signature verification and reconciliation reporting have meaningfully reduced the unresolved-mail-ballot backlogs that produced the most contested count disputes of the last decade.",
        status: "scaling",
        progress: 65,
        date: "2026",
        actor: "State and national election authorities",
      },
      {
        title: "AI Act disclosure duties for synthetic political content",
        detail:
          "From 2 August 2026 the EU AI Act requires deployers to disclose synthetic content and providers of general-purpose models to support marking of outputs such as deepfakes and AI-generated text. It gives a regulator a basis for enforcement rather than only guidance.",
        status: "promising",
        progress: 50,
        date: "2026-08",
        actor: "European Union",
        link: "https://artificialintelligenceact.eu/article/50/",
      },
      {
        title: "Provenance for official and campaign communications",
        detail:
          "Signing campaign and official communications end to end, including video, would let a reporter or voter check authenticity rather than judge plausibility. Adoption remains low because campaigns distribute through many intermediaries that strip metadata.",
        status: "stalled",
        progress: 32,
        date: "2025",
        actor: "C2PA ecosystem and campaign organisations",
        link: "https://c2pa.org/",
      },
      {
        title: "Platform political advertising transparency and sponsor verification",
        detail:
          "Public ad archives were meant to make targeting and sponsorship inspectable, but they collapsed into low-effort self-reporting, and verification that a sponsor is who they claim is not enforced. Since early 2025 this has been de-emphasised further by at least one major platform.",
        status: "regressed",
        progress: 25,
        date: "2025-01",
        actor: "Major social platforms",
      },
    ],
    timeline: [
      {
        date: "2016-11",
        title: "Intelligence assessment of foreign interference declassified",
        detail:
          "US intelligence agencies conclude that interference in the 2016 election was intended to favour one candidate, and the assessment is released publicly.",
      },
      {
        date: "2020-07",
        title: "Platform moderation of a sitting head of state is made permanent",
        detail:
          "A major platform permanently widens its restrictions on one incumbent's account after earlier throttling, an escalation from content-level judgement to platform-level governance.",
      },
      {
        date: "2020-11",
        title: "Vote-count errors leave one state uncalled for days",
        detail:
          "Errors in two counties and the withholding of a projected winner until remaining mail ballots were processed demonstrate how administrative bottlenecks, not tabulation failures, drive contested outcomes.",
      },
      {
        date: "2022-07",
        title: "UK Elections Act creates a digital-only monitoring regime",
        detail:
          "New powers require registration of digital material intended to influence electoral behaviour and create statutory duties for social platforms to respond to reported content.",
      },
      {
        date: "2024-11",
        title: "Large national cycle completes without disruption of voting systems",
        detail:
          "Independent assessments find no sign that voting systems were compromised, while several jurisdictions expand post-election audit requirements in response to earlier disputes.",
      },
      {
        date: "2026-08-02",
        title: "Synthetic political content disclosure duties apply in the EU market",
        detail:
          "AI Act transparency obligations take effect ahead of the voting cycle, giving enforcement and disclosure a legal basis for the first time in a major market.",
      },
    ],
    sources: [
      {
        label: "CISA, election security",
        url: "https://www.cisa.gov/topics/election-security",
        year: 2025,
      },
      {
        label: "OSCE Office for Democratic Institutions and Human Rights, election observation",
        url: "https://www.osce.org/odihr/elections",
        year: 2025,
      },
      {
        label: "Reuters Institute, Digital News Report",
        url: "https://www.reutersinstitute.politics.ox.ac.uk/digital-news-report/2026",
        year: 2026,
      },
      {
        label: "Regulation (EU) 2024/1689, the AI Act",
        url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
        year: 2024,
      },
      {
        label: "Associated Press, election coverage and fact-checking",
        url: "https://ap.org/",
        year: 2024,
      },
    ],
    updated: "2026-10-09",
  },
];