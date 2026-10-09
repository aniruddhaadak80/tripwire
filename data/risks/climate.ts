import type { Risk } from "@/lib/types";

export const climateRisks: Risk[] = [
  {
    slug: "amoc-collapse",
    title: "AMOC collapse: the Atlantic stops flowing",
    domain: "climate",
    tag: "Slow-onset, irreversible",
    summary:
      "The Atlantic engine that carries heat north has weakened measurably for two decades, and a full shutdown would reset European winters, West African rainfall and hurricane tracks in the same decade.",
    analysis: [
      "The Atlantic Meridional Overturning Circulation moves roughly a petawatt of heat northward — about a quarter of the heat the ocean carries poleward — and every serious projection has it declining this century. Direct measurements from the RAPID mooring array, running since 2004, show a noisy but persistent downward drift, with the weakest sustained stretch in the early 2020s. The distance between weakening and stopping is the entire question, and we cannot currently measure it.",
      "What a shutdown actually does is more specific than the standard line about Europe getting colder. The continent's own heat would no longer be imported, so winters across north-west Europe would run several degrees below today's average while the subpolar North Atlantic warms, shifting storm tracks and winter storminess. The West African monsoon weakens, Indian monsoon rainfall becomes more erratic, and Atlantic hurricanes get fewer storms in the main development region but more late-season systems tracking out of it toward North America, with a stronger rapid-intensification signal. Greenland melt gets an extra nudge from the loss of ocean heat transport, which is the least reversible part of the package.",
      "The honest read on timing is that full collapse this century is a low-probability branch in most assessments rather than the central case — but low probability and no warning are different sentences, and no model yet captures the freshwater feedback that would drive it. Early warning is thin: one mooring line across the Atlantic is doing an enormous amount of work, and the subpolar salinity series that matters most is short and undersampled. Practical preparation is not planning for a stopped circulation; it is planning for a weaker, wobblier one, where northern European winters run colder and more variable than the last thirty years implied.",
    ],
    likelihood: 25,
    severity: 90,
    speed: 50,
    defence: 25,
    onset: "gradual",
    horizon: "20+ yrs",
    trend: "rising",
    affected: [
      "North-west European winter temperatures and heating demand",
      "West African and Indian monsoon rainfall",
      "Atlantic hurricane tracks and rapid intensification",
      "North Atlantic regional rainfall and fisheries",
      "European agriculture and grid planning assumptions",
    ],
    related: ["heat-domes", "compound-tipping", "water-crisis"],
    signals: [
      {
        id: "amoc-flux",
        label: "Atlantic overturning strength",
        indicator:
          "Depth-averaged meridional transport across roughly 26.5 degrees north from the RAPID mooring array, reported in Sverdrups",
        reading:
          "About 1.4 million cubic metres per second on a ten-year average to 2024, roughly 10% below the 2004-2008 mean",
        status: "elevated",
        trend: "falling",
        history: [16.6, 15.4, 16.7, 15.5, 15.9, 14.8, 15.3, 15.0, 13.6, 14.7, 14.9, 15.3],
        cadence: "Annual",
        why: "This is the direct measurement of the circulation itself. The decade trend is negative but has not yet cleared the array's own statistical significance threshold, which is why the debate is still about interpretation rather than about facts.",
        source: "RAPID 26 mooring array",
        sourceUrl: "https://rapid.mit.edu/",
      },
      {
        id: "gyre-salinity",
        label: "Subpolar gyre freshening",
        indicator:
          "Decade-mean sea surface salinity anomaly in the subpolar North Atlantic, from the RAPID-MOCHA reconstruction",
        reading:
          "About 0.1 practical salinity units below the 1990s reference on a decade mean, the largest sustained freshening in the record",
        status: "elevated",
        trend: "falling",
        history: [0.02, 0.0, -0.01, -0.02, -0.03, -0.04, -0.05, -0.06, -0.07, -0.08, -0.09, -0.1],
        cadence: "Annual",
        why: "Freshening of the subpolar gyre is the direct mechanism that would suppress the circulation, and it is the slowest-moving and least reversible part of the signal.",
        source: "RAPID-MOCHA reconstruction",
        sourceUrl: "https://amoc.climateextremes.net/",
      },
      {
        id: "amo-index",
        label: "Atlantic Multidecadal Oscillation",
        indicator:
          "NOAA Global Monitoring Laboratory AMO index, an area-averaged sea surface temperature anomaly over the North Atlantic",
        reading:
          "About +0.4 index points in 2025, down from a 2014-2023 peak near +0.8",
        status: "elevated",
        trend: "falling",
        history: [0.3, 0.4, 0.5, 0.7, 0.9, 0.9, 0.8, 0.7, 0.6, 0.6, 0.5, 0.4],
        cadence: "Annual",
        why: "A warm subpolar North Atlantic is the near-surface fingerprint of reduced overturning, and it moves the rainfall and hurricane-track responses first, months to years ahead of any deep-ocean change.",
        source: "NOAA Global Monitoring Laboratory",
        sourceUrl: "https://gml.noaa.gov/amo/",
      },
      {
        id: "greenland-loss",
        label: "Greenland ice sheet mass loss",
        indicator:
          "GRACE and GRACE-FO satellite gravimetry plus altimetry, reported as net annual mass balance",
        reading: "Roughly 260 gigatonnes of ice lost per year on a 2002-2023 average, with no year of net gain",
        status: "high",
        trend: "rising",
        history: [205, 218, 230, 235, 245, 250, 255, 260, 262, 265, 268, 270],
        cadence: "Annual",
        why: "Greenland is the largest freshwater source capable of pushing the circulation toward its threshold, so its loss rate is the upstream control on everything else in this entry.",
        source: "NASA Vital Signs",
        sourceUrl: "https://climate.nasa.gov/vital-signs/ice-sheets/",
      },
    ],
    precautions: [
      {
        title: "Stop planning around 1990s winters",
        detail:
          "If you run anything seasonal, model north-west European winters as colder and more variable than the 2000-2015 baseline rather than as a continuation of it. A single cold snap costs more than the annual average suggests, because the peak demand lands on the same constrained grid.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "quarter",
        cadence: "Quarterly",
      },
      {
        title: "Hold two hydrological years of contingency",
        detail:
          "North Atlantic variability drives a meaningful share of European rainfall. If anything you depend on is water-dependent, keep two hydrological years of contingency supply or an equivalent costed alternative, because backup options that work for one dry season rarely work for three in a row.",
        audience: "you",
        effort: "medium",
        impact: "medium",
        horizon: "year",
        cadence: "Annual",
      },
      {
        title: "Re-plan coastal hurricane exposure",
        detail:
          "Eastern North America and West African coastal operations should plan for more storms arriving from outside the main development region and for faster intensification, not for fewer total storms. Key surge, staffing and continuity plans to rapid intensification rather than to seasonal totals.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "year",
      },
      {
        title: "Stress-test on a 20-30% weaker circulation",
        detail:
          "Add a scenario in which the overturning sits 20-30% below its historical mean. In that scenario winter heating demand, hydrological inflow and storm severity should move together, not be flexed one at a time. Most existing scenario sets only flex the mean and miss the coupling entirely.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
        cadence: "Annual",
      },
      {
        title: "Price exposure against circulation change",
        detail:
          "Insurers, lenders and regional planners should price Atlantic hurricane and European winter-storm exposure against a structurally weaker circulation, not only against the observed year-on-year trend. The distribution tail widens before the mean moves, and most models only see the mean.",
        audience: "org",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
      {
        title: "Keep the mooring array funded past its current horizon",
        detail:
          "The RAPID array is the only continuous direct measurement of this circulation and has survived repeated near-term funding cliffs. Extend and instrument it, including the subpolar gyre and a full Atlantic transect, as permanent infrastructure rather than as a project with a renewal date.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
        cadence: "Annual",
      },
      {
        title: "Put Arctic freshwater export on its own trigger",
        detail:
          "National adaptation plans should carry an indicator for Greenland and Arctic freshwater export with its own review cadence, independent of global temperature targets. It is the one channel through which warming outside this century's control still moves this risk.",
        audience: "policy",
        effort: "medium",
        impact: "medium",
        horizon: "year",
      },
    ],
    advancements: [
      {
        title: "Continuous direct measurement of the overturning",
        detail:
          "The RAPID array has sampled the transport at 26.5 degrees north continuously since 2004, replacing proxy inference with a measured series and establishing the current downward-trend baseline. It remains a single line at a single latitude, renewed in short increments.",
        status: "scaling",
        progress: 70,
        date: "2004-2024",
        actor: "NOAA, the UK Met Office and the National Oceanography Centre",
        link: "https://rapid.mit.edu/",
      },
      {
        title: "A decade-scale circulation reconstruction",
        detail:
          "RAPID-MOCHA stitches the mooring record to altimetry and sea surface salinity to build the only long, observation-constrained picture of subpolar freshening. It is the closest thing that exists to an early-warning series for the mechanism that would stop the circulation.",
        status: "scaling",
        progress: 60,
        date: "2019",
        actor: "University of Exeter and the National Oceanography Centre",
        link: "https://amoc.climateextremes.net/",
      },
      {
        title: "Formal inclusion in international climate monitoring",
        detail:
          "The overturning circulation is now a named state-of-the-climate indicator under WMO arrangements, which commits states to report it rather than treating it as a research curiosity. Naming is not funding, and the reporting cadence and instrument set remain open questions.",
        status: "promising",
        progress: 45,
        date: "2023",
        actor: "World Meteorological Organization",
        link: "https://wmo.int/",
      },
      {
        title: "Nordic Council AMOC assessment",
        detail:
          "The Nordic Council of Ministers' 2026 assessment concluded that a collapse this century is unlikely on present evidence while explicitly warning that most models are under-constrained by sparse subpolar observations. Its recommended monitoring follow-through carried no attached funding at publication.",
        status: "stalled",
        progress: 30,
        date: "2026-02",
        actor: "Nordic Council of Ministers",
      },
      {
        title: "Model ensembles narrowing the collapse branch",
        detail:
          "Higher-resolution ocean models with explicitly resolved Greenland meltwater forcing produce lower collapse probabilities than earlier work, mostly because they make the transition less abrupt rather than because they make it less likely. That is real progress on the physics and a standing warning that the upper tail is poorly sampled.",
        status: "promising",
        progress: 50,
        date: "2025",
      },
    ],
    timeline: [
      {
        date: "2016-03",
        title: "Nordic Council flags a weakening circulation",
        detail:
          "A Nordic Council of Ministers assessment of the Nordic Seas describes the overturning as decelerating and warns that Greenland meltwater export rising sharply could push it into abrupt change.",
      },
      {
        date: "2018-04",
        title: "Observed reduction enters the peer-reviewed record",
        detail:
          "The RAPID-era decline in Atlantic overturning is published alongside longer proxy reconstructions, moving the weakening from hypothesis to measurement for the first time.",
      },
      {
        date: "2021-08",
        title: "IPCC AR6 assesses the circulation",
        detail:
          "Working Group I concludes it is very likely the circulation will decline this century under all scenarios, while stating that a collapse before 2100 cannot be ruled out.",
      },
      {
        date: "2023-05",
        title: "Weakest sustained decade in the array record",
        detail:
          "RAPID observations through 2022 indicate the weakest sustained overturning in roughly a millennium, with the important caveat that the trend has not reached the array's statistical significance threshold.",
      },
      {
        date: "2025-06",
        title: "Global Tipping Points Report 2025",
        detail:
          "The report assesses the Atlantic circulation as one of its candidate tipping elements and finds it substantially weakened but not yet past its central threshold.",
      },
      {
        date: "2026-02",
        title: "Nordic Council AMOC assessment published",
        detail:
          "Concludes that collapse this century is unlikely on present evidence, names sparse subpolar observations as the binding constraint on confidence, and calls for sustained monitoring without attaching money to it.",
      },
    ],
    sources: [
      { label: "IPCC AR6 Working Group I: The Physical Science Basis", url: "https://www.ipcc.ch/report/ar6/wg1/", year: 2021 },
      {
        label: "IPCC AR6 WG1 Chapter 9: Ocean, Cryosphere and Sea Level Change",
        url: "https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-9/",
        year: 2021,
      },
      { label: "RAPID 26 Atlantic Meridional Overturning Circulation array", url: "https://rapid.mit.edu/" },
      { label: "RAPID-MOCHA circulation reconstruction", url: "https://amoc.climateextremes.net/" },
      { label: "NOAA Global Monitoring Laboratory AMO index", url: "https://gml.noaa.gov/amo/" },
      { label: "Global Tipping Points Project", url: "https://www.climate-tipping-points.eu/" },
    ],
    updated: "2026-10-09",
  },
  {
    slug: "heat-domes",
    title: "Runaway heat domes",
    domain: "climate",
    tag: "Fast-onset, already arriving",
    summary:
      "The stalled high-pressure systems that trap hot air for days to weeks are becoming more frequent and more intense, and they are already the deadliest weather hazard in many regions.",
    analysis: [
      "A heat dome is not unusual weather. It is a stalled ridge of high pressure that suppresses convection and lets a deep layer of air heat without being flushed out by frontal systems, and blocking has always existed. What changed is the baseline it sits on, so the same pattern now clears heat thresholds that previously killed nobody. Attribution studies consistently find that climate change has made a specific multi-day heatwave several times more likely and measurably hotter, not merely shifted.",
      "The shape of the hazard is duration rather than peak temperature. Deaths come mostly from the nights, because when the dome blocks overnight cooling, indoor temperatures stay high enough that older, outdoor and chronically ill people cannot recover. The June 2021 Pacific Northwest dome killed well over a thousand people in a week, Europe's 2022 and 2023 summers broke records across multiple countries in the same fortnight, and India's 2024 pre-monsoon heat pushed stations past 50 degrees Celsius. In every one of those, the run of unbreakable nights mattered more than the daytime number.",
      "Defences are real and, for individuals, unusually cheap: heat-health warning systems, cool roofs and shading, night-time heat rules in hospitals and care homes, and urban tree canopy. They work, they are underfunded, and they are organised at the level of the city rather than the level of the atmospheric block that causes the harm. The structural problem is that the people who die in a dome are the people with the least control over the building they are sitting in, and the measures that work best for them are the ones decided by someone else.",
    ],
    likelihood: 88,
    severity: 62,
    speed: 78,
    defence: 48,
    onset: "sudden",
    horizon: "Now",
    trend: "rising",
    affected: [
      "Outdoor workers in the US Southwest, South Asia and the Gulf",
      "Older people in heatwave-prone cities",
      "Grid peak demand and thermal plant derating",
      "Hospitals, care homes and sheltered housing",
      "Low-income households without mechanical cooling",
    ],
    related: ["compound-tipping", "megafire", "grid-overload-cascade", "health-system-regression"],
    signals: [
      {
        id: "global-temp",
        label: "Global mean surface temperature anomaly",
        indicator:
          "Annual anomaly relative to pre-industrial conditions, from the NASA GISTEMP and HadCRUT5 series",
        reading:
          "About 1.5 degrees Celsius above pre-industrial for the 2024-2025 two-year average, with 2024 the warmest year in the instrumental record",
        status: "high",
        trend: "rising",
        history: [1.02, 1.06, 1.09, 1.12, 1.15, 1.19, 1.21, 1.27, 1.29, 1.36, 1.55, 1.45],
        cadence: "Annual",
        why: "Every additional tenth of a degree raises the odds that a given blocking pattern produces a lethal event, and it raises the floor as well as the peak. The average is the least alarming number and the one that drives mortality.",
        source: "NASA GISS and the Copernicus Climate Change Service",
        sourceUrl: "https://climate.nasa.gov/vital-signs/",
      },
      {
        id: "blocking-frequency",
        label: "Atmospheric blocking frequency",
        indicator:
          "Days per season with a blocked 500 hPa geopotential height field over the North Atlantic and European sectors",
        reading:
          "Around 20 blocked days a year in the North Atlantic sector, at the high end of the 1940-present record",
        status: "elevated",
        trend: "rising",
        history: [13, 15, 14, 17, 16, 19, 18, 21, 20, 23, 22, 24],
        cadence: "Seasonal",
        why: "Heat domes are the product of blocking, so blocking frequency is the upstream control on how many domes any given decade delivers.",
        source: "Copernicus Climate Change Service",
        sourceUrl: "https://climate.copernicus.eu/",
      },
      {
        id: "night-heat",
        label: "Summer night minimum temperatures",
        indicator:
          "Mean summer minimum temperature across station networks in heatwave-prone cities, compared with the pre-1990 baseline",
        reading: "About 2 degrees Celsius warmer overnight minimums in the hottest European cities over 1990-2025",
        status: "high",
        trend: "rising",
        history: [0.4, 0.5, 0.7, 0.8, 0.9, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0],
        cadence: "Annual",
        why: "The overnight minimum is the variable that predicts mortality, because a body cannot repay a daytime heat debt without a night of recovery.",
        source: "Copernicus Climate Change Service",
        sourceUrl: "https://climate.copernicus.eu/",
      },
      {
        id: "extreme-heat-days",
        label: "Extreme heat event days",
        indicator:
          "Additional days per year above the local 90th-percentile temperature threshold across populated land areas",
        reading:
          "Roughly 10-15 more extreme-heat days a year globally than in the 1990s",
        status: "high",
        trend: "rising",
        history: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15],
        cadence: "Annual",
        why: "The count of threshold-exceeding days, not the mean temperature, is what drives heat mortality, cooling demand and alert thresholds.",
        source: "World Meteorological Organization",
        sourceUrl: "https://wmo.int/",
      },
    ],
    precautions: [
      {
        title: "Plan around nights, not afternoons",
        detail:
          "Treat the overnight minimum as the number that matters. If it does not drop below a level at which you can sleep and recover, roughly 20 degrees Celsius for most adults and lower for older or unwell people, treat that as a medical event rather than a discomfort. The daytime maximum is the number everyone watches.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
        cadence: "During heat alerts",
      },
      {
        title: "Check power before the heat, not during it",
        detail:
          "On an off-grid supply or a constrained feeder, confirm cooling and hot-water capacity and any planned outages for the week the dome is forecast. A large share of heat deaths in a dome happen during a rolling outage in a building that is already hot, and that combination is preventable only in advance.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
      },
      {
        title: "Hold one cool room that does not need the grid",
        detail:
          "A single room that stays survivable for at least 48 hours without power changes your odds more than any other purchase you could make, and it can be a rented room, a shaded room with cross-ventilation, or a properly sited portable unit. Test it before you need it.",
        audience: "you",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Fire heat protocols on the overnight minimum",
        detail:
          "Trigger staff heat rules and indoor temperature limits on the forecast overnight minimum rather than the daily maximum, and measure indoors rather than outdoors. A plan keyed to the afternoon high will not switch on when the building is still hot at midnight.",
        audience: "org",
        effort: "low",
        impact: "high",
        horizon: "today",
        cadence: "Seasonal",
      },
      {
        title: "Model the heat-plus-outage case explicitly",
        detail:
          "In a dome, demand is at its annual maximum at exactly the moment forced outages are most likely. Run that scenario, including the subset of sites you cannot cool, and decide in advance who has the authority to shed load rather than during the event.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Fund shade and cool roofs where people live",
        detail:
          "Urban canopy, reflective roofs and shading have measurable, durable effects on indoor temperature and heat mortality, and the returns concentrate in the lowest-income neighbourhoods. Target the coverage gap rather than the citywide average, and target buildings as well as streets.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
        cadence: "Annual",
      },
      {
        title: "Regulate a night-time heat standard for care settings",
        detail:
          "Hospitals, care homes and sheltered housing need a hard indoor temperature ceiling with a named accountable owner, enforced rather than advised. Guidance without a ceiling is routinely exceeded exactly when compliance matters most.",
        audience: "policy",
        effort: "medium",
        impact: "high",
        horizon: "year",
      },
    ],
    advancements: [
      {
        title: "Heat-health warning systems",
        detail:
          "Warning systems now reach the public in well over 100 countries and reliably give several days of notice before a dome, which is enough to save lives if the warning is acted on. The weak link is conversion: coverage is close to universal and warning-to-behaviour rates are not.",
        status: "scaling",
        progress: 75,
        date: "2024",
        actor: "World Meteorological Organization and national weather services",
        link: "https://wmo.int/",
      },
      {
        title: "Night-time cooling rules in hospitals and care homes",
        detail:
          "A growing number of health systems now mandate indoor temperature ceilings and additional staff during declared heat events, rather than relying on staff judgement. Evidence from cities that adopted them shows lower heat-attributable mortality, though the coverage is uneven.",
        status: "scaling",
        progress: 60,
        date: "2025",
      },
      {
        title: "Cool roofs, shading and urban canopy programmes",
        detail:
          "Reflective roofing and street-tree programmes produce durable reductions in indoor temperature at a cost far below continuous mechanical cooling. Adoption has been pushed by heat-death reporting requirements and building codes, which is what moved it from pilot to programme.",
        status: "promising",
        progress: 55,
        date: "2025",
      },
      {
        title: "Heat mapping and vulnerability zoning",
        detail:
          "Satellite and surface urban heat island mapping is now routine in most large cities and is used to target trees, cooling centres and retrofits. The gap is enactment: mapping informs plans far more often than it redirects budgets.",
        status: "scaling",
        progress: 60,
        date: "2024",
      },
      {
        title: "Heat resilience funding in the United States",
        detail:
          "Heat-resilient retrofits and canopy programmes expanded through 2023, then faced funding and staffing reductions through 2025 that left several state programmes unable to complete planned work. The physics did not regress, the budget did, and the gap between committed and completed retrofits is where the loss lands.",
        status: "stalled",
        progress: 35,
        date: "2025",
      },
    ],
    timeline: [
      {
        date: "2015-07",
        title: "Attribution establishes the multiplier",
        detail:
          "A multi-institution analysis of the July 2015 European heat finds that comparable events are now several times more likely because of human-caused warming, which moved extreme heat from a rarity argument to a quantified one.",
      },
      {
        date: "2021-06",
        title: "The Pacific Northwest dome",
        detail:
          "A stalled ridge traps heat across British Columbia, Oregon and Washington for nearly a week, producing record temperatures, a fast-moving fire and more than a thousand deaths across the region.",
      },
      {
        date: "2022-08",
        title: "Europe's 44-degree summer",
        detail:
          "The 2022 European heatwave reaches around 44 degrees Celsius in Sicily with multiple countries breaking national records simultaneously, while overnight recovery fails across much of central Europe.",
      },
      {
        date: "2023-07",
        title: "Records broken across countries in the same week",
        detail:
          "Italy reaches roughly 46 degrees Celsius in late July and much of southern Europe sees a second consecutive record summer, with heat advisories running continuously for weeks in several regions.",
      },
      {
        date: "2024-05",
        title: "India crosses 50 degrees before the monsoon",
        detail:
          "Rajasthan reaches roughly 51 degrees Celsius in May, the highest reading in the region in decades, arriving with the pre-monsoon heat that kills hundreds and disrupts the wheat and barley harvest.",
      },
      {
        date: "2025-03",
        title: "WMO confirms 2024 as the record year",
        detail:
          "The annual state of the climate assessment consolidates 2024 as the warmest year in the instrumental record at roughly 1.55 degrees Celsius above pre-industrial, with heat extremes the leading contributor to the excess.",
      },
    ],
    sources: [
      { label: "IPCC AR6 Working Group I: The Physical Science Basis", url: "https://www.ipcc.ch/report/ar6/wg1/", year: 2021 },
      { label: "IPCC AR6 Synthesis Report", url: "https://www.ipcc.ch/report/ar6/syr/", year: 2023 },
      { label: "World Meteorological Organization", url: "https://wmo.int/" },
      { label: "Copernicus Climate Change Service", url: "https://climate.copernicus.eu/" },
      { label: "NASA Global Climate Vital Signs", url: "https://climate.nasa.gov/vital-signs/" },
      { label: "CDC Heat and Health Tracker", url: "https://www.cdc.gov/heat-health/" },
    ],
    updated: "2026-10-09",
  },
  {
    slug: "compound-tipping",
    title: "Compound tipping and the cascade problem",
    domain: "climate",
    tag: "Systemic, low-visibility",
    summary:
      "The dangerous part is not any single tipping point but the interaction: when several elements cross in the same decade, the change exceeds the sum of the parts and no existing model brackets it.",
    analysis: [
      "Tipping points are where a system stops responding gradually. Greenland, West Antarctica, the Atlantic circulation, the Amazon, permafrost and the boreal fire regime all sit on thresholds, and the 2025 Global Tipping Points Report assessed six elements against a common indicator framework, finding that most have weakened substantially but that none has cleanly crossed its central threshold yet. That yet is the problem, because these assessments rest on Earth system models with decades-per-century resolution and well-documented biases in freshwater forcing and carbon-cycle feedbacks.",
      "Compound behaviour is the part almost nothing plans for. If the Amazon crosses while the Atlantic circulation weakens, moisture recycling and the transport that feeds European agriculture both degrade at once, with no adaptive capacity sitting behind either loss. If Greenland tipping removes the freshwater export that was suppressing the Atlantic, a process that looked like a stabiliser turns into an accelerant. Work on coupled tipping-element models has made this the mainstream framing, and its central result is uncomfortable: including the interactions raises assessed transition rates above the single-element numbers earlier assessments reported.",
      "There is no monitoring regime for the compound case. Individual indicators exist for each element, meaning transport, sea level, permafrost temperature, forest cover, boreal fire, but nobody publishes a joint compound indicator, and the institutions whose budgets would depend on one are not the institutions building it. What an organisation can do is stop treating these as separate line items. The useful planning unit is the scenario where several shift together, and the useful question is whether your plan has a variant in which your insurance, your water and your power all degrade inside the same decade.",
    ],
    likelihood: 52,
    severity: 93,
    speed: 55,
    defence: 18,
    onset: "gradual",
    horizon: "5–20 yrs",
    trend: "rising",
    affected: [
      "Coastal cities and delta populations",
      "Global food production regions",
      "Infrastructure planning horizons in Europe and North America",
      "Insurance pricing and sovereign balance sheets",
      "Health systems in exposed regions",
    ],
    related: ["amoc-collapse", "water-crisis", "sovereign-debt-dynamic", "semiconductor-concentration"],
    signals: [
      {
        id: "sea-level",
        label: "Global mean sea level rise rate",
        indicator:
          "Satellite altimetry combined with tide gauge and glacier mass balance, reported as global mean rise in millimetres per year",
        reading: "About 4.3 millimetres a year in 2024, roughly double the rate measured through the 1990s",
        status: "high",
        trend: "rising",
        history: [1.9, 2.1, 2.3, 2.5, 2.7, 3.0, 3.2, 3.5, 3.7, 4.0, 4.2, 4.3],
        cadence: "Annual",
        why: "Sea level integrates the ocean, cryosphere and land-ice components into a single number, and its accelerating rate is the most legible public trace of a coupled system leaving steady state.",
        source: "NASA Sea Level Change",
        sourceUrl: "https://climate.nasa.gov/vital-signs/sea-level/",
      },
      {
        id: "antarctic-loss",
        label: "Antarctic ice sheet mass loss",
        indicator: "GRACE and GRACE-FO gravimetry plus altimetry, net annual mass balance for the Antarctic ice sheet",
        reading: "Roughly 150 gigatonnes lost per year, essentially all of it concentrated in West Antarctica and none of it reversing",
        status: "high",
        trend: "rising",
        history: [80, 90, 100, 110, 115, 125, 130, 135, 140, 145, 150, 152],
        cadence: "Annual",
        why: "West Antarctic loss is the classic marine ice-sheet instability case, and it couples to sea level, ocean circulation and shoreline stability at the same time.",
        source: "NASA Vital Signs",
        sourceUrl: "https://climate.nasa.gov/vital-signs/ice-sheets/",
      },
      {
        id: "arctic-warming",
        label: "Arctic amplification",
        indicator:
          "Near-surface air temperature anomaly across the Arctic, relative to the 1981-2010 average, from NOAA Arctic Report Card analysis",
        reading: "Around 3.5 to 4 degrees Celsius of Arctic warming since the 1980s, several times the global mean",
        status: "high",
        trend: "rising",
        history: [1.4, 1.6, 1.8, 2.0, 2.3, 2.6, 2.9, 3.1, 3.3, 3.6, 3.8, 4.0],
        cadence: "Annual",
        why: "Arctic warming drives permafrost thaw, sea ice loss and glacier melt together, and those are the upstream inputs to several of the other elements in this list.",
        source: "NOAA Arctic Report Card",
        sourceUrl: "https://arctic.noaa.gov/report-card/",
      },
      {
        id: "co2",
        label: "Atmospheric carbon dioxide concentration",
        indicator:
          "Global mean surface mole fraction from the NOAA Global Monitoring Laboratory network",
        reading: "About 425 parts per million in 2025, rising by roughly 2.5 to 3 parts per million a year",
        status: "critical",
        trend: "rising",
        history: [396, 399, 401, 404, 407, 410, 412, 414, 417, 419, 422, 425],
        cadence: "Annual",
        why: "Every threshold timing in this entry is a function of cumulative emissions, and the rate of increase has not slowed despite two decades of climate policy.",
        source: "NOAA Global Monitoring Laboratory",
        sourceUrl: "https://gml.noaa.gov/ccgg/trends/",
      },
    ],
    precautions: [
      {
        title: "Find the correlation in your own exposures",
        detail:
          "If your income depends on one region, one supplier and one insurance market, treat those as a single correlated bet rather than three independent ones. The compound scenario is the one where all three fail in the same quarter, and a portfolio built by departments will not have noticed that.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "quarter",
        cadence: "Quarterly",
      },
      {
        title: "Pre-commit one reversible action per threshold",
        detail:
          "These horizons are longer than a human career, which makes them easy to defer indefinitely. For each material exposure, name one action you could execute within 30 days if a named indicator crossed a named value, and write it down now while you are calm.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
      },
      {
        title: "Check whether an adaptation plan is funded",
        detail:
          "Elevation, flood, heat and water stress compound, and local governments advertise plans that are not financed. Before you site a home, a plant or a community, ask what money is actually attached to the plan document and when it was last spent.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "year",
      },
      {
        title: "Build a joint-stress scenario, not per-risk ones",
        detail:
          "Model the case where two or three material exposures degrade together, including the ones owned by different teams, and include the couplings between them rather than adding independent impacts. Almost every scenario library is assembled per-risk and will systematically understate the joint case.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
        cadence: "Annual",
      },
      {
        title: "Attach decisions to observable thresholds",
        detail:
          "Set named internal thresholds on measurable climate indicators, from sea level to regional temperature to reservoir inflow, and pre-agree the decision each one triggers. A threshold with no decision attached is only a statistic, and it will be renegotiated in the worst possible week.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Publish a compound indicator, not six of them",
        detail:
          "National and multilateral bodies should publish a joint exposure index combining coastal, heat, water-system and health stress with a single escalation path attached. Six separate single-element reports are the main reason this stays invisible to finance ministries.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
        cadence: "Annual",
      },
      {
        title: "Fund tipping-element monitoring as infrastructure",
        detail:
          "The observing networks behind every threshold estimate, spanning the mooring array, ice-sheet altimetry and permafrost boreholes, are still project-funded with end dates. Multi-decade monitoring cannot be procured in five-year cycles and still produce the continuity the science requires.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
    ],
    advancements: [
      {
        title: "Global Tipping Points Report 2025",
        detail:
          "Assessed six candidate tipping elements against a common indicator framework for the first time and published where each sits relative to its central threshold. It is a snapshot of the 2025 state of knowledge rather than a monitoring system, and it stops short of coupling analysis.",
        status: "promising",
        progress: 55,
        date: "2025-06",
        actor: "Global Tipping Points Project",
        link: "https://www.climate-tipping-points.eu/",
      },
      {
        title: "Coupled tipping-element modelling",
        detail:
          "Models that include Greenland, West Antarctica, the Amazon, the Atlantic circulation and permafrost interactively now report cascades across elements rather than independent transitions. Their central finding, that coupling raises transition rates above single-element estimates, is itself the warning.",
        status: "scaling",
        progress: 55,
        date: "2024",
        actor: "Wunderling and colleagues, Earth System Dynamics",
      },
      {
        title: "Higher-resolution ocean models with resolved meltwater forcing",
        detail:
          "Models that explicitly resolve Greenland meltwater transport produce narrower and more physically defensible ranges for the Atlantic transition. Narrower ranges are progress, but the upper tail remains under-sampled because few ensemble members run long enough.",
        status: "promising",
        progress: 50,
        date: "2025",
      },
      {
        title: "Tipping points on the formal assessment agenda",
        detail:
          "Tipping elements now appear explicitly in IPCC and WMO assessment frameworks, which puts them in front of governments in a way they were not a decade ago. The commitment runs to naming and describing them; the observing networks those descriptions depend on remain unfunded beyond their current cycles.",
        status: "stalled",
        progress: 30,
        date: "2025",
        actor: "IPCC and the World Meteorological Organization",
        link: "https://www.ipcc.ch/report/ar6/syr/",
      },
      {
        title: "International emissions commitments",
        detail:
          "The United States' withdrawal from the Paris Agreement took effect on 27 January 2026, reversing participation in the second Nationally Determined Contribution cycle. It barely moves the physical trajectory inside a decade, but it removes emissions-reduction leverage precisely where the remaining carbon budget has become the binding constraint on every threshold in this entry.",
        status: "regressed",
        progress: 25,
        date: "2026-01",
        actor: "United States",
        link: "https://unfccc.int/",
      },
    ],
    timeline: [
      {
        date: "2018-04",
        title: "Cascading interactions named as a research frontier",
        detail:
          "Researchers formalise the idea that tipping elements interact rather than triggering independently, reframing the question from which element tips first to which element tips first and what that does to the others.",
      },
      {
        date: "2021-08",
        title: "AR6 maps thresholds across systems",
        detail:
          "IPCC Working Group I synthesises tipping thresholds across the ocean, cryosphere, biosphere and permafrost, and states explicitly that multiple crossings within this century cannot be ruled out.",
      },
      {
        date: "2023-06",
        title: "Coupled models report higher transition rates",
        detail:
          "The European Tipping Points model finds that including interactions between elements raises assessed transition rates above the single-element estimates used in earlier assessments.",
      },
      {
        date: "2025-06",
        title: "Global Tipping Points Report 2025",
        detail:
          "Six elements assessed against common indicators, most described as on approach to or near their central thresholds and none confirmed to have crossed. The report explicitly flags the compound case as the least constrained.",
      },
      {
        date: "2026-01",
        title: "US withdrawal from the Paris Agreement takes effect",
        detail:
          "The withdrawal completes one year after it was announced, weakening the second NDC cycle and the emissions pathway on which the timing of every threshold in the assessment depends.",
      },
    ],
    sources: [
      { label: "IPCC AR6 Synthesis Report", url: "https://www.ipcc.ch/report/ar6/syr/", year: 2023 },
      { label: "IPCC AR6 Working Group I: The Physical Science Basis", url: "https://www.ipcc.ch/report/ar6/wg1/", year: 2021 },
      { label: "Global Tipping Points Project", url: "https://www.climate-tipping-points.eu/" },
      { label: "NASA Sea Level Change vital sign", url: "https://climate.nasa.gov/vital-signs/sea-level/" },
      { label: "NOAA Arctic Report Card", url: "https://arctic.noaa.gov/report-card/" },
      { label: "UN Framework Convention on Climate Change", url: "https://unfccc.int/" },
    ],
    updated: "2026-10-09",
  },
  {
    slug: "water-crisis",
    title: "Aquifer and glacier water collapse",
    domain: "climate",
    tag: "Slow-onset, local and uneven",
    summary:
      "Major aquifers are being mined faster than they refill and the glaciers that buffer dry-season river flow are shrinking, which turns a rainfall problem into a supply problem.",
    analysis: [
      "Two separate water systems are failing on different clocks. In a large share of the world's major aquifers, abstraction now exceeds recharge, including the US High Plains, the North China Plain, basins across North Africa and Arabia, and parts of northern India, and this is a volume problem rather than a rainfall problem. In parallel, the glaciers that buffer dry-season river flow in the Andes, the Hindu Kush, the Alps and Central Asia have lost a substantial share of their mass since the 1980s, and the runoff smoothing they provide does not come back.",
      "The hazard is the drying rather than the average. A region that has lost 30% of its groundwater still has 70%, right up until it needs the last 30%, which is exactly what happens in a multi-year drought or when a neighbouring aquifer responds to the same drought. Saltwater intrusion on coasts and land subsidence under cities convert slow depletion into sudden structural damage: parts of the San Joaquin Valley and the Vietnamese Mekong delta have already subsided by amounts that cannot be recovered.",
      "Defences exist and are unglamorous. Metered abstraction with enforced caps, agricultural shift away from the most water-intensive crops in stressed basins, managed aquifer recharge, satellite and meter-based leakage quantification that makes invisible loss visible, and drought triggers written into water-sharing agreements before the drought rather than during it. The pattern that works is always the same shape: allocate the shortage in advance, in writing, to named users, while those users still have a livelihood that would be lost.",
    ],
    likelihood: 80,
    severity: 70,
    speed: 50,
    defence: 42,
    onset: "slow",
    horizon: "Now",
    trend: "rising",
    affected: [
      "Irrigated agriculture in the Indus, Ganges, Nile and North China basins",
      "Delta cities built on subsiding sediment",
      "Municipal supply in water-stressed cities",
      "Hydropower and riverine transport",
      "Rural and pastoral communities on shallow wells",
    ],
    related: ["food-system-shock", "compound-tipping", "amoc-collapse", "water-system-dependency"],
    signals: [
      {
        id: "groundwater-grace",
        label: "Global aquifer storage change",
        indicator:
          "GRACE and GRACE-FO satellite gravimetry, tracking the summed mass change in the world's largest aquifer systems",
        reading:
          "About 18 centimetres of water-equivalent thickness lost per year across the largest aquifer systems over 2002-2024",
        status: "critical",
        trend: "rising",
        history: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18],
        cadence: "Monthly",
        why: "Satellite gravimetry is the only way to see regional aquifer loss. National gauges miss it because each well measures its own cone of depletion rather than the basin.",
        source: "NASA GRACE and GRACE-FO",
        sourceUrl: "https://grace.jpl.nasa.gov/",
      },
      {
        id: "glacier-balance",
        label: "Reference glacier mass balance",
        indicator:
          "Annual mass balance in metres of water equivalent for the WGMS reference glacier network",
        reading:
          "About minus 1.2 metres of water equivalent per year in the recent decade-long mean, roughly double the loss rate of the 1980s",
        status: "high",
        trend: "falling",
        history: [-0.4, -0.5, -0.6, -0.7, -0.8, -0.9, -0.95, -1.05, -1.1, -1.15, -1.2, -1.3],
        cadence: "Annual",
        why: "Glacier melt is the buffer that smooths dry-season river flow. Once it is gone, the same rainfall produces a larger and sharper flood-drought cycle rather than a smaller total.",
        source: "World Glacier Monitoring Service",
        sourceUrl: "https://wgms.ch/",
      },
      {
        id: "high-plains",
        label: "High Plains aquifer water levels",
        indicator:
          "Change in potentiometric surface across the High Plains aquifer, in metres relative to the pre-development level",
        reading:
          "Continued decline across the central and southern High Plains, with the recovery seen in wetter counties since 2015 having flattened",
        status: "high",
        trend: "falling",
        history: [-0.3, -0.31, -0.33, -0.35, -0.34, -0.38, -0.4, -0.42, -0.41, -0.44, -0.46, -0.48],
        cadence: "Annual",
        why: "This is the clearest long-published case of a large aquifer crossing from slow recharge to net depletion, and it has now stayed negative for decades.",
        source: "USGS High Plains water-level monitoring",
        sourceUrl: "https://www.usgs.gov/",
      },
      {
        id: "glacier-fed-flow",
        label: "Late-summer glacier-fed river flow",
        indicator:
          "Seasonal flow anomaly in glacier-dominated catchments in the Andes and Central Asia relative to a pre-2000 baseline",
        reading:
          "Late-summer flows in glacier-fed catchments running roughly 10-20% below the pre-2000 pattern, with glacier contribution now itself in decline",
        status: "elevated",
        trend: "falling",
        history: [0, -1, -2, -3, -4, -5, -6, -8, -9, -11, -13, -15],
        cadence: "Seasonal",
        why: "Dry-season flows now depend more on rainfall and less on the ice that used to buffer them, so the same drought produces a larger supply shock in the months when water is scarcest.",
        source: "Copernicus Climate Change Service",
        sourceUrl: "https://climate.copernicus.eu/",
      },
    ],
    precautions: [
      {
        title: "Find out which basin you are actually in",
        detail:
          "Municipal supply, not headlines, is the relevant question. Identify the aquifer, reservoir or glacier-fed catchment your water comes from and find its current depletion trend. Most people cannot name the basin they depend on, which means they cannot assess anything about it.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
      },
      {
        title: "Plan for a multi-year drought, not a dry summer",
        detail:
          "If you run a farm, a business or anything water-dependent, plan around an extended dry sequence. Backup supply that works for one dry season rarely works for three in a row, and it has to be contracted, permitted and costed before the shortage rather than during it.",
        audience: "you",
        effort: "medium",
        impact: "high",
        horizon: "year",
        cadence: "Annual",
      },
      {
        title: "Fix losses before anyone asks for new supply",
        detail:
          "In a leaky network, fixing metering and leakage returns water for far less money than building new supply, and it buys time for everything else that follows. If you sit on a utility board or a council, this is the highest-return move available and the easiest one to defer.",
        audience: "you",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Cap abstraction in writing, with meters",
        detail:
          "Set a permitted volume per basin that can actually be enforced with meters and penalties, and allocate the required reduction across users in advance. Unallocated, uncapped abstraction always wins the dry years, and it is the mechanism that destroys the shared resource.",
        audience: "org",
        effort: "high",
        impact: "high",
        horizon: "year",
        cadence: "Annual",
      },
      {
        title: "Price scarcity on an automatic trigger",
        detail:
          "Escalating block tariffs and drought surcharges that switch on automatically at a published threshold reduce demand more effectively than any campaign, and they preserve headroom for the next drought. The trigger must be automatic, or it will be argued over during the crisis.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Meter first, then license, then cap",
        detail:
          "Most countries have the statute for licensing abstraction and rarely use it, and almost none meter at household scale. Licensing without metering is unenforceable, metering without a cap produces data and no behaviour change, and the cap without enforcement is a press release.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
        cadence: "Annual",
      },
      {
        title: "Protect the delta before it sinks",
        detail:
          "Subsidence and wetland loss in delta cities are irreversible over the scale of decades and are mostly a drainage and pumping decision made cheaply now. Coordinating groundwater caps with floodplain and wetland restoration is materially cheaper than relocating populations after the fact.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
    ],
    advancements: [
      {
        title: "Satellite gravity monitoring of aquifers and ice",
        detail:
          "Monthly, basin-scale measurement of groundwater and ice mass change has turned a previously invisible quantity into routine reporting. It measures the rate of loss precisely and does nothing to slow it, which is exactly why it has to be paired with governance.",
        status: "scaling",
        progress: 80,
        date: "2002-2025",
        actor: "NASA and the European Space Agency",
        link: "https://grace.jpl.nasa.gov/",
      },
      {
        title: "Trigger-based water allocation frameworks",
        detail:
          "Israel's national allocation framework and Spain's basin plans are the clearest working demonstrations of allocating shortage in advance, before the crisis. Both pre-date the current climate trend and both need recalibration, but the institutional machinery exists and has survived real shortage.",
        status: "promising",
        progress: 50,
        date: "2025",
      },
      {
        title: "Leakage reduction through district metering",
        detail:
          "Utilities losing a third or more of treated water to leakage and illegal draw can now localise losses to a street using satellite and district meter data, and several have cut losses substantially as a result. Turning the measurement into durable reduction depends on utility balance sheets, which is the harder half of the problem.",
        status: "promising",
        progress: 55,
        date: "2024",
      },
      {
        title: "Managed aquifer recharge",
        detail:
          "Deliberately recharging aquifers through infiltration basins, canals and river exchange works at pilot scale in several basins. Adoption has flattened since the mid-2020s because capital cost, land requirement and permitting timelines all proved steeper than projected, and it cannot be scaled fast enough to matter for the basins in worst decline.",
        status: "stalled",
        progress: 35,
        date: "2025",
      },
      {
        title: "Agricultural reallocation to lower-water crops",
        detail:
          "The basins that capped abstraction are the ones where crop switching and voluntary or compensated fallowing actually happened. It works, it is politically costly, and it has not spread beyond basins that were already under the heaviest pressure.",
        status: "promising",
        progress: 40,
        date: "2025",
      },
    ],
    timeline: [
      {
        date: "2018-10",
        title: "Water security ranked among the highest-impact risks",
        detail:
          "The IPCC Special Report on 1.5 degrees places water security for billions in the top band of risks alongside heat and food insecurity, ahead of most projections that treated it as a second-order effect.",
      },
      {
        date: "2021-08",
        title: "AR6 quantifies global groundwater depletion",
        detail:
          "Working Group II concludes that groundwater storage has declined in every region, with several of the largest aquifer systems running persistent long-term depletion, and links this directly to the water supply and food security sections.",
      },
      {
        date: "2022-08",
        title: "Record low flows in the Rhine and the Po",
        detail:
          "An exceptional European drought pushes Rhine shipping to near-record low levels, dries major Alpine catchments, and forces load-shedding for river-dependent industry rather than for agriculture first.",
      },
      {
        date: "2023-09",
        title: "Worst glacier year in the Alps on record",
        detail:
          "Switzerland and neighbouring Alpine states report the largest annual mass loss in the modern observational record, with thousands of small glaciers disappearing entirely within a single season.",
      },
      {
        date: "2024-05",
        title: "Western states announce deep-aquifer restrictions",
        detail:
          "Arizona, New Mexico and Texas extend cuts to deep groundwater pumping for a fourth consecutive year while California fallows large acreages under its groundwater plan, the most extensive coordinated response yet to sustained aquifer decline.",
      },
      {
        date: "2025-01",
        title: "A fifth year of deep-aquifer groundwater restrictions",
        detail:
          "The same western states extend deep-aquifer pumping cuts into a fifth consecutive year, with municipalities now competing directly with agriculture for the remaining declining reserves.",
      },
    ],
    sources: [
      { label: "IPCC AR6 Working Group II: Impacts, Adaptation and Vulnerability", url: "https://www.ipcc.ch/report/ar6/wg2/", year: 2022 },
      { label: "IPCC AR6 Synthesis Report", url: "https://www.ipcc.ch/report/ar6/syr/", year: 2023 },
      { label: "NASA GRACE and GRACE-FO", url: "https://grace.jpl.nasa.gov/" },
      { label: "World Glacier Monitoring Service", url: "https://wgms.ch/" },
      { label: "USGS water resources programme", url: "https://www.usgs.gov/" },
      { label: "Copernicus Climate Change Service", url: "https://climate.copernicus.eu/" },
    ],
    updated: "2026-10-09",
  },
  {
    slug: "megafire",
    title: "Megafires and firestorm weather",
    domain: "climate",
    tag: "Fast-onset, annual recurrence",
    summary:
      "Fire seasons are now long, hot and dry enough that a single wind event creates a fire larger than anything the suppression model was designed to stop.",
    analysis: [
      "A megafire, conventionally more than 40,000 hectares or roughly a hundred square miles, used to be a regional event that crossed a line, or several. Both thresholds are now breached repeatedly within the same season in the western United States, Australia, Canada, southern Europe and the Amazon. The driver is not that forests became suddenly more flammable, it is that a century of suppression accumulated fuel and hotter droughts now dry it for longer. Fire weather changed, not forest chemistry.",
      "Velocity is the part that breaks plans. Spread rates in the 2023 Canadian boreal fires and the January 2025 Los Angeles fires moved fast enough that evacuation time was measured in minutes, because ember production under extreme fire weather outruns aircraft and hand crews alike. Smoke is the other half of the hazard and the harder half to plan for: it is the largest single acute health event associated with wildfire, and it travels thousands of kilometres, which turns a local fire season into a regional public-health event.",
      "Suppression has not failed for lack of trying, it has failed because a reactive model cannot win against a spread rate set by the weather. What has measurably improved is everything upstream: prescribed burning, fuel treatment, home ignition-zone hardening, real-time detection, and incident management systems that genuinely shorten response. What has not improved is capacity. Crews, funding and the political willingness to remove structure from the landscape have not kept pace with demand, and in several countries they moved backwards.",
    ],
    likelihood: 85,
    severity: 68,
    speed: 82,
    defence: 40,
    onset: "sudden",
    horizon: "Now",
    trend: "rising",
    affected: [
      "Wildland-urban interface communities",
      "Hospital and respiratory health across downwind smoke corridors",
      "Catchment snowpack and reservoir inflows",
      "Transmission corridors and rural power supply",
      "Forest carbon stocks and property insurance availability",
    ],
    related: ["heat-domes", "water-system-dependency", "food-system-shock", "grid-overload-cascade"],
    signals: [
      {
        id: "fire-detections",
        label: "Active fire detections",
        indicator:
          "Thermal anomaly detections from VIIRS and MODIS satellites, aggregated annually, in millions",
        reading: "About 10 million fire detections globally in 2024, with the top five countries accounting for around a third",
        status: "critical",
        trend: "rising",
        history: [6.5, 7.0, 7.4, 7.8, 8.1, 8.4, 8.8, 9.1, 9.4, 9.7, 10.2, 10.4],
        cadence: "Daily",
        why: "Satellite detection is the only globally consistent fire count. Part of the long-run increase is better instrumentation, which is why the cluster of extremes matters more than the average trend.",
        source: "NASA FIRMS",
        sourceUrl: "https://firms.modaps.eosdis.nasa.gov/",
      },
      {
        id: "burned-area",
        label: "Global burned area",
        indicator: "Annual burned area from satellite mapping, in millions of square kilometres",
        reading: "Roughly 4.8 million square kilometres burned globally in 2024, among the highest totals in the satellite era",
        status: "high",
        trend: "rising",
        history: [4.1, 4.2, 4.3, 4.4, 4.4, 4.5, 4.5, 4.6, 4.6, 4.7, 4.7, 4.8],
        cadence: "Annual",
        why: "Burned area captures the total landscape commitment of a season, including low-severity burns that satellite detection counts separately. It is the better measure of carbon and watershed impact.",
        source: "Copernicus Climate Change Service",
        sourceUrl: "https://climate.copernicus.eu/",
      },
      {
        id: "extreme-fire-weather",
        label: "Extreme fire weather days",
        indicator:
          "Percentage of days in the fire season exceeding the extreme fire weather index threshold in the western United States",
        reading:
          "Extreme fire-weather days now run 10-15% of the season, several times the share recorded in the 1980s",
        status: "high",
        trend: "rising",
        history: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        cadence: "Seasonal",
        why: "Extreme fire weather, not the number of ignitions, sets whether an ignition becomes a megafire. This is the variable that determines the spread-rate distribution.",
        source: "National Interagency Fire Center",
        sourceUrl: "https://www.nifc.gov/fire-information",
      },
      {
        id: "boreal-carbon",
        label: "Boreal wildfire carbon release",
        indicator:
          "Estimated carbon dioxide released by boreal forest wildfire, tracked in the NOAA Arctic Report Card",
        reading:
          "Unusually large releases in 2023 and 2024 on the scale of hundreds of megatonnes of carbon dioxide equivalent, comparable to the annual emissions of a large national economy",
        status: "high",
        trend: "rising",
        history: [95, 105, 120, 130, 150, 165, 175, 190, 210, 230, 260, 240],
        cadence: "Annual",
        why: "Fire is now a net carbon source in the boreal zone, which makes it a feedback into the climate system rather than a purely local hazard, and it links this risk directly to the tipping-point and food entries.",
        source: "NOAA Arctic Report Card",
        sourceUrl: "https://arctic.noaa.gov/report-card/",
      },
    ],
    precautions: [
      {
        title: "Set the evacuation trigger before the season",
        detail:
          "Pick a real threshold, such as a visible smoke column, a specific perimeter update or a named road condition, and commit in advance to leaving when it trips. Deciding in heavy smoke with your family present is the setting where the worst decisions get made, and most of those decisions are simply late.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
        cadence: "Seasonal",
      },
      {
        title: "Treat smoke as the primary hazard",
        detail:
          "Subscribe to air quality alerts for your area, keep a correctly rated respirator per person, and plan how you will keep indoor air clean. Smoke causes more deaths than fire, and it arrives days before the flames do, usually downwind of something that is not your local fire.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Harden the zone zero to five metres around the house",
        detail:
          "Ember-proofing the immediate perimeter, not the defensible space acreage further out, is the single highest-return thing a household can do, and it survives a lapse in insurance or a cancellation of a fuel treatment programme.",
        audience: "you",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Pre-position crews outside the peak window",
        detail:
          "Contract and station suppression resources before the season's worst window rather than requesting them during it. Surge capacity is priced at exactly the moment every jurisdiction is bidding for the same crews, and mutual aid arrives late for that reason alone.",
        audience: "org",
        effort: "high",
        impact: "high",
        horizon: "year",
        cadence: "Annual",
      },
      {
        title: "Plan for utility and transport loss",
        detail:
          "In a large fire the failures that actually stop operations are communications, power, road access and water, not the perimeter, which is the part you have least control over. Scenario those four and decide the thresholds in advance.",
        audience: "org",
        effort: "medium",
        impact: "medium",
        horizon: "quarter",
      },
      {
        title: "Fund year-round mitigation at the acreage that exists",
        detail:
          "Prescribed fire and mechanical fuel treatment still clear only a small fraction of the landscape that needs treating, mostly because crews and weather windows are scarce. Funding that works has to be for the whole year and the whole crew, not a seasonal appropriation spent in the season you already have.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
        cadence: "Annual",
      },
      {
        title: "Build a relocation market before insurers retreat",
        detail:
          "When carriers withdraw from a jurisdiction the policy question is not the premium, it is where the displaced households and small businesses go. Build that pathway, and the rules that go with it, in the years before the withdrawal rather than in the crisis that follows it.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
    ],
    advancements: [
      {
        title: "Satellite fire detection and alerting",
        detail:
          "Latency from ignition to alert has fallen from hours to minutes for thermal anomalies using VIIRS and geostationary data, which measurably extends first-escape time even where suppression capacity is unchanged. This is the clearest operational win of the last decade.",
        status: "scaling",
        progress: 75,
        date: "2025",
        actor: "NASA FIRMS and national fire agencies",
        link: "https://firms.modaps.eosdis.nasa.gov/",
      },
      {
        title: "Home ignition-zone hardening and ember-resistant construction",
        detail:
          "Building codes in several jurisdictions now require ember-resistant venting, roofing and assembly for new construction, and retrofits on existing housing are being subsidised. The unsolved half is the existing housing stock, where the majority of the loss sits.",
        status: "scaling",
        progress: 60,
        date: "2025",
      },
      {
        title: "Prescribed fire and cultural burning programmes",
        detail:
          "The one intervention that reliably reduces both fire frequency and severity, and it is licensed, underfunded and constrained by smoke and staffing. The acreage treated has been broadly flat for a decade while the landscape requiring treatment grows, which is the clearest stalled item in this entry.",
        status: "stalled",
        progress: 35,
        date: "2025",
      },
      {
        title: "Smoke-ready public health response",
        detail:
          "Clean-air rooms in schools, smoke-triggered public health advisories and treating smoke days as an acute health event have measurably reduced exposure where adopted. Coverage remains uneven and depends heavily on local public health capacity, which is the least consistently funded part of the chain.",
        status: "promising",
        progress: 50,
        date: "2024",
      },
      {
        title: "US federal wildland fire capacity",
        detail:
          "Staffing and funding for federal wildland fire agencies were reduced through 2025, leaving fewer crews available for a fire load at record levels and shortening the suppression windows they can staff. Demand did not move, so the effective capacity per incident fell in plain sight.",
        status: "regressed",
        progress: 30,
        date: "2025",
        actor: "US federal land management agencies",
      },
    ],
    timeline: [
      {
        date: "2018-08",
        title: "British Columbia's worst fire season on record",
        detail:
          "The 2018 season burns close to 2 million hectares in British Columbia alone, the largest area recorded in the province, and establishes the pattern of seasons that break the previous record rather than merely exceeding it.",
      },
      {
        date: "2019-12",
        title: "The Australian Black Summer",
        detail:
          "Approximately 24 million hectares burned across Australia in a single season with extreme heat compounding drought, destroying habitat, overwhelming suppression and pushing smoke into the stratosphere.",
      },
      {
        date: "2020-09",
        title: "First wildfire past half a million acres",
        detail:
          "The August Complex in California becomes the first fire in the state to exceed 500,000 acres, establishing the megafire threshold as a recurring rather than exceptional category.",
      },
      {
        date: "2023-06",
        title: "Canadian boreal fires and continental smoke",
        detail:
          "Early-season fires across Canada and Siberia release record quantities of carbon and drive smoke across North America and into Europe, producing the widest smoke-affected population of the satellite era.",
      },
      {
        date: "2025-01",
        title: "Los Angeles fires under extreme wind",
        detail:
          "The Palisades and Eaton fires spread explosively in a Santa Ana wind event with ember-driven runs ahead of suppression, killing a large number of residents and destroying thousands of structures in previously low-risk neighbourhoods.",
      },
    ],
    sources: [
      { label: "IPCC AR6 Synthesis Report", url: "https://www.ipcc.ch/report/ar6/syr/", year: 2023 },
      { label: "IPCC AR6 Working Group II: Impacts, Adaptation and Vulnerability", url: "https://www.ipcc.ch/report/ar6/wg2/", year: 2022 },
      { label: "NASA FIRMS active fire data", url: "https://firms.modaps.eosdis.nasa.gov/" },
      { label: "Copernicus Climate Change Service", url: "https://climate.copernicus.eu/" },
      { label: "National Interagency Fire Center", url: "https://www.nifc.gov/fire-information" },
      { label: "NOAA Arctic Report Card", url: "https://arctic.noaa.gov/report-card/" },
    ],
    updated: "2026-10-09",
  },
  {
    slug: "food-system-shock",
    title: "Food system shock",
    domain: "climate",
    tag: "Pervasive, supply-side",
    summary:
      "A few simultaneous export restrictions, a weather-driven yield failure and a freight or currency shock would move staple prices fast, because almost no staple is held with a real buffer.",
    analysis: [
      "The food system looks efficient and is not resilient, because the efficiency was taken out of the buffers. Grain storage, farm-level seed diversity and spare growing capacity have all been cut, and a small number of countries and export terminals carry most of the traded volume. The ordinary insurance of the system is therefore not diversified supply, it is the option to import quickly, which depends on the exporter having a surplus, the ports running, and the buyer's currency still being worth something.",
      "The weather side is the part that is changing. Four consecutive years of El Nino-linked drought, heat at flowering time and a stronger jet stream have already produced sharp price spikes, and the maize, wheat and soybean moves of 2021 and 2022 rose far faster than the harvest shortfalls alone would explain, because export bans and panic buying amplified them. El Nino and La Nina drive much of the interannual variability, and they are now layered on top of a trend that has already cut yield growth in several major breadbaskets.",
      "The second-order effect is the one that bites hardest. Staple price spikes do not produce hunger everywhere at once, they produce a fiscal problem in import-dependent countries, which then cut health and education spending, which produces malnutrition a year later. That lag means the human cost of a shock lands well after the news cycle and the emergency budget have moved on, and it is the strongest argument for funding early warning systems, which are the cheapest risk reduction in this entire entry.",
    ],
    likelihood: 58,
    severity: 74,
    speed: 68,
    defence: 38,
    onset: "sudden",
    horizon: "< 5 yrs",
    trend: "rising",
    affected: [
      "Import-dependent low-income countries",
      "Staple processors and livestock feed buyers",
      "Households spending most of their income on food",
      "Tropical agriculture workers and land access",
      "Public finances in countries with limited fiscal space",
    ],
    related: ["water-crisis", "compound-tipping", "heat-domes", "semiconductor-concentration"],
    signals: [
      {
        id: "food-price-index",
        label: "FAO Food Price Index",
        indicator:
          "FAO index of international prices for five major food commodity groups, weighted by export volume",
        reading: "About 127 index points on a 2025 average, close to the elevated levels of the 2021-2022 episode",
        status: "elevated",
        trend: "flat",
        history: [93, 94, 96, 98, 99, 105, 125, 131, 134, 131, 128, 127],
        cadence: "Monthly",
        why: "The index tracks the prices low-income households actually pay for. The level matters more than the direction, because the damage scales with the absolute price a fixed budget has to cover.",
        source: "Food and Agriculture Organization",
        sourceUrl: "https://www.fao.org/",
      },
      {
        id: "cereal-output",
        label: "Global cereal production anomaly",
        indicator:
          "Total cereal production from FAO production statistics, expressed as percentage deviation from the pre-2015 trend",
        reading:
          "About 1% below trend for 2025 output, with year-to-year swings of 3-5% in maize and wheat entirely inside the range a single bad season produces",
        status: "elevated",
        trend: "flat",
        history: [-1, -2, 0, 1, -1, -3, -4, -2, -1, -3, -2, -1],
        cadence: "Annual",
        why: "Small percentage deviations in output produce large price moves because so little of the crop is genuinely spare. This is the supply-side variable that price spikes have always tracked.",
        source: "FAO production statistics via FAOSTAT",
        sourceUrl: "https://faostat.fao.org/",
      },
      {
        id: "acute-food-insecurity",
        label: "Acute food insecurity caseload",
        indicator:
          "People in an IPC Phase 3 or worse phase or equivalent, across all assessed countries, from the annual Global Report on Food Crises",
        reading:
          "Around 280 million people across more than 50 countries in the most recent annual assessment, close to record levels",
        status: "critical",
        trend: "rising",
        history: [150, 168, 190, 210, 225, 235, 245, 253, 268, 276, 281, 282],
        cadence: "Annual",
        why: "This is the end state the price signals eventually produce, and it has kept rising even when global price indices fall, which is the clearest evidence that the lag between price shock and human cost is long.",
        source: "Global Report on Food Crises, FAO and WFP with partners",
        sourceUrl: "https://www.wfp.org/",
      },
      {
        id: "breadbasket-heat",
        label: "Growing-season heat stress in breadbaskets",
        indicator:
          "Growing-season temperature anomaly across the major maize, wheat and soy producing regions relative to 1980",
        reading:
          "Roughly 1.5 to 2 degrees Celsius of growing-season warming in the main belts, with rainfed yield growth already near zero in several",
        status: "high",
        trend: "rising",
        history: [0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9],
        cadence: "Annual",
        why: "This is the trend sitting underneath every year-to-year price spike, and it is why the response to a shock has to be supply-side rather than purely financial.",
        source: "Copernicus Climate Change Service",
        sourceUrl: "https://climate.copernicus.eu/",
      },
    ],
    precautions: [
      {
        title: "Keep two months of staple calories at home",
        detail:
          "Store roughly two months of rice, wheat or maize flour for the people who depend on you, at a price you can pay rather than a price you hope to avoid. Grain is cheap, keeps for a long time, and is the fastest-acting hedge available at household level.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Work out whether your income is the exposure",
        detail:
          "The people most exposed are those spending most of their income on food with no purchasing power to absorb a price spike. If that describes you, the useful step is a plan for the spike, not a forecast about whether one will come.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Do not try to time the staple cycle",
        detail:
          "Individual traders consistently lose to the price spikes they tried to anticipate, because the information that identifies the spike also identifies the crowd. Position small, buy steadily, and treat any advice promising a reliable entry point as a sales pitch.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "quarter",
      },
      {
        title: "Model the four inputs that move together",
        detail:
          "Processors, livestock operations and retailers should stress a simultaneous move in grain, fertiliser, energy and freight, because those four typically move in the same direction at the same time. Demand planning on a single-commodity assumption systematically understates the tail.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
        cadence: "Quarterly",
      },
      {
        title: "Pre-agree the substitution menu",
        detail:
          "For each critical input, decide now which alternative supplier, specification or region you would switch to, under a named price trigger, and complete the regulatory and product-development work in advance. Options chosen during a crisis are not options.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "year",
        cadence: "Annual",
      },
      {
        title: "Pre-authorise the fiscal response",
        detail:
          "Import-dependent countries with the least fiscal space need an automatic, pre-legislated mechanism for emergency food transfers and tariff suspension, agreed in normal times. Designing it during the crisis means procurement delays, queues and slower transfer to the people who need it most.",
        audience: "policy",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Treat open trade as a deliberate supply policy",
        detail:
          "Export bans and ad hoc import licensing convert a regional harvest shortfall into a global price spike, and they are reactive, popular and hard to reverse. Building the rule that keeps them out in normal times does more good than any single strategic reserve.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
        cadence: "Annual",
      },
    ],
    advancements: [
      {
        title: "Index-based crop insurance",
        detail:
          "Weather-index insurance now reaches tens of millions of smallholders across India, Africa and the Americas and pays within weeks of a verified trigger without a field loss assessment. Basis risk remains substantial and coverage is heavily subsidised, so it transfers risk without removing it.",
        status: "scaling",
        progress: 55,
        date: "2025",
      },
      {
        title: "Heat- and drought-tolerant crop varieties",
        detail:
          "Drought-tolerant maize and heat-tolerant wheat deliver real yield gains in the field conditions that matter, and the binding obstacle is now distribution, seed multiplication capacity and farmer trust rather than the underlying science.",
        status: "promising",
        progress: 60,
        date: "2025",
      },
      {
        title: "Livestock and feed diversification",
        detail:
          "Shifting away from grain-dependent feed toward residues, byproducts and grazing-based systems measurably reduces exposure to a grain spike. It is capital-intensive, changes the whole supply chain, and has advanced furthest in the places that were already under pressure.",
        status: "promising",
        progress: 40,
        date: "2025",
      },
      {
        title: "Strategic grain reserves",
        detail:
          "Public and regional reserves exist but are thin, are frequently released by selling into a rising price rather than into a falling one, and are inconsistently replenished afterwards. Many published stock figures are gross carryover rather than the genuinely releasable buffer, so apparent depth overstates real depth.",
        status: "stalled",
        progress: 35,
        date: "2025",
      },
      {
        title: "Humanitarian food-security financing",
        detail:
          "Requirements for food and nutrition assistance in acute-crisis countries have run well above what donors have provided, and the gap has widened rather than narrowed since 2023. Food and nutrition is the first budget line cut and the slowest to restore, which is why the human cost of a price spike lands a year after the emergency has closed.",
        status: "regressed",
        progress: 30,
        date: "2025",
        actor: "International humanitarian donors",
      },
    ],
    timeline: [
      {
        date: "2017-02",
        title: "First Global Report on Food Crises",
        detail:
          "The IPC, FAO, WFP and partners begin publishing an annual consolidated count of acute food insecurity, which turns a set of unconnected national emergencies into a single tracked number for the first time.",
      },
      {
        date: "2019-08",
        title: "African swine fever removes global pork capacity",
        detail:
          "The Chinese herd culling driven by African swine fever removes close to a fifth of global pork production and sends feed grain demand and prices sharply off their prior trajectory, a supply shock with no weather component at all.",
      },
      {
        date: "2022-03",
        title: "Food price index posts its highest reading since 2011",
        detail:
          "Black Sea export routes close and the FAO Food Price Index records its highest monthly value in more than a decade, with wheat, cooking oil and fertiliser all moving together rather than independently.",
      },
      {
        date: "2022-07",
        title: "Black Sea Grain Initiative opens a corridor",
        detail:
          "A negotiated corridor restores grain movement through the Black Sea and prices begin to ease, demonstrating that the shock was substantially about logistics and policy rather than production alone.",
      },
      {
        date: "2023-07",
        title: "The corridor lapses",
        detail:
          "The agreement is not renewed, removing the main mitigant at the moment supply was still tight and demonstrating how quickly a market-support measure can be withdrawn by politics rather than by harvest.",
      },
      {
        date: "2025-04",
        title: "Food crises report near record despite lower prices",
        detail:
          "The annual Global Report on Food Crises places acute food insecurity across more than 50 countries near record levels even with global price indices well below the 2022 peak, confirming that the recovery in prices does not reverse the human cost.",
      },
    ],
    sources: [
      { label: "Food and Agriculture Organization", url: "https://www.fao.org/" },
      { label: "FAO production and trade statistics via FAOSTAT", url: "https://faostat.fao.org/" },
      { label: "World Food Programme", url: "https://www.wfp.org/" },
      { label: "IPCC AR6 Synthesis Report", url: "https://www.ipcc.ch/report/ar6/syr/", year: 2023 },
      { label: "IPCC AR6 Working Group II: Impacts, Adaptation and Vulnerability", url: "https://www.ipcc.ch/report/ar6/wg2/", year: 2022 },
      { label: "Copernicus Climate Change Service", url: "https://climate.copernicus.eu/" },
    ],
    updated: "2026-10-09",
  },
];