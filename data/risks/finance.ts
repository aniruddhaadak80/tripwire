import type { Risk } from "@/lib/types";

export const financeRisks: Risk[] = [
  {
    slug: "ai-capex-bubble",
    title: "The AI infrastructure debt bubble",
    domain: "finance",
    tag: "Debt-financed",
    summary:
      "A build-out priced on the assumption that AI revenue will arrive on schedule is increasingly being funded with corporate debt, and the margin for error is shrinking fast.",
    analysis: [
      "The build-out itself is real and enormous, but the financing mix has shifted. What was largely funded from operating cash flow in 2023 is increasingly funded with bond issuance and private loans, and the AI-specific portion of that debt has no standalone revenue to service it. Meta, Oracle, xAI, OpenAI and their data-centre partners have leaned on tens of billions of dollars of debt and vendor financing to keep building, and some arrangements are circular, with the same cash flowing back in as customer revenue. The useful lives on servers are still booked at roughly four to seven years, so a faster obsolescence cycle would show up as write-downs long after the spending has happened.",
      "Transmission runs through fixed income rather than equities. Hyperscalers have absorbed a meaningful share of investment-grade issuance, which slows corporate credit supply for everyone else, and regional banks hold part of the asset-backed and project-finance paper. A capex pause would not be a crash on its own; it would be a credit event, where data-centre developers, utilities with long-dated power contracts, and the lenders who financed the GPUs all repriced at once. The realistic bad case is not the industry disappearing but a two-to-three-year investment drought that strands power contracts, cooling equipment, and fibre the operators already committed to.",
      "What makes this harder to price is that the demand side is opaque. Almost every real AI deployment has a vendor name attached, and very few disclose utilisation, cost per query, or whether inference revenue actually covers inference cost. Until a visible cohort of companies publishes unit economics that survive a price war, you are underwriting a market whose central uncertainty is whether one firm or two firms end up capturing the profits. That is a narrow distribution of outcomes underwritten with a very wide distribution of capital.",
    ],
    likelihood: 72,
    severity: 68,
    speed: 55,
    defence: 42,
    onset: "gradual",
    horizon: "5–20 yrs",
    trend: "rising",
    affected: [
      "Data-centre developers and neocloud operators",
      "Utilities holding signed power contracts",
      "Investment-grade corporate credit",
      "Regional banks lending against data-centre collateral",
      "Pension and insurance portfolios holding AI-linked credit",
    ],
    related: ["private-credit", "sovereign-debt-dynamic", "liquidity-fragility", "semiconductor-concentration"],
    signals: [
      {
        id: "hyperscaler-capex",
        label: "Hyperscaler capital expenditure, annualised",
        indicator:
          "Combined capital expenditure reported by the four or five largest cloud operators, converted to a common reporting basis and expressed in US dollars",
        reading:
          "On the order of $400bn a year across the largest cloud operators in 2025, up several-fold from 2022 and larger than the entire capital budget of most G7 central banks",
        status: "high",
        trend: "rising",
        history: [40, 55, 70, 90, 115, 150, 180, 230, 300, 400],
        cadence: "Annual",
        why: "When a quarter of global capital spending chases one buyer set, everyone else's project pipeline gets repriced, and the depreciation has to be earned back by someone.",
        source: "Company capital expenditure disclosures in annual reports",
        sourceUrl: "https://www.sec.gov/",
      },
      {
        id: "ai-credit-issuance",
        label: "Debt raised for AI data-centre build-out",
        indicator:
          "Investment-grade bonds, private placements and project loans issued by compute operators and data-centre developers, summed per year",
        reading:
          "Roughly $60bn of AI-specific credit issuance in 2025, up from a negligible amount in 2022, with private credit funds and asset managers among the lenders",
        status: "elevated",
        trend: "rising",
        history: [0, 0, 1, 2, 4, 9, 18, 30, 45, 60],
        cadence: "Quarterly",
        why: "Equity-funded construction fails slowly. Debt-funded construction fails on a refinancing date, which is exactly how the 2023 regional bank runs worked.",
        source: "Corporate bond and syndicated loan issuance records",
        sourceUrl: "https://www.bis.org/publ/arpdf/index.htm",
      },
      {
        id: "server-depreciation-life",
        label: "Useful life assumed for servers and accelerators",
        indicator:
          "Depreciation schedule in years disclosed in the property and equipment accounting policy of the largest cloud operators",
        reading:
          "Roughly six to seven years in recent filings, having been extended from four or five in the early 2020s, against an industry view that hardware generations turn over faster than the accounting life",
        status: "elevated",
        trend: "flat",
        history: [4, 4, 5, 5, 5, 6, 6, 6, 7, 7],
        cadence: "Annual",
        why: "Extending the life defers the expense. If the hardware actually turns over in three years, the write-down lands in a quarter nobody has provisioned for.",
        source: "Accounting policy notes in company filings",
        sourceUrl: "https://www.sec.gov/",
      },
      {
        id: "ig-issuance-share",
        label: "Share of investment-grade supply absorbed by a few issuers",
        indicator:
          "Volume of investment-grade corporate bond issuance by the largest technology issuers as a share of total investment-grade supply in major markets",
        reading:
          "The largest cloud operators have been issuing enough to absorb a material slice of the market, crowding out financial and industrial borrowers who historically issued first in a tightening cycle",
        status: "elevated",
        trend: "rising",
        history: [8, 10, 12, 15, 18, 24, 30, 34, 38, 41],
        cadence: "Monthly",
        why: "Credit crowding has a measurable cost: other borrowers pay more for the same market, so a slowdown in one sector turns into a slowdown in all of them.",
        source: "Corporate bond market statistics, Financial Stability Reports",
        sourceUrl: "https://www.federalreserve.gov/publications/financial-stability-report.htm",
      },
    ],
    precautions: [
      {
        title: "Do not let one employer's stock be your net worth",
        detail:
          "If your income, your equity compensation and your housing market all depend on the same few companies, you are running an unhedged concentrated position without noticing. Direct a fixed share of every paycheque to a broad index fund outside your employer, and treat unvested equity as a stress-test number rather than a savings number. The point is not to sell at a peak; it is to never discover that your whole balance sheet was one company's earnings call.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Check what is actually inside your fund",
        detail:
          "Most active and thematic funds now hold private credit, infrastructure, and data-centre debt alongside ordinary equities, and a quarterly report tells you the top ten holdings. Read the holdings, not the fund name, and check what share of assets are illiquid or redemption-gated. A fund you cannot get out of on a bad day is not a diversified fund; it is an illiquid fund wearing a diversified fund's label.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Keep a cash buffer that survives a two-year job search",
        detail:
          "Six months of essential expenses in an instant-access account is the floor for anyone whose income touches tech, media, or finance. If your rent is high or your household has one income, the honest number is nine to twelve months. Count it in survival months, not in months of current spending, and do not count money held in equities or long-dated funds.",
        audience: "you",
        effort: "medium",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Separate the rent and the leverage",
        detail:
          "Total debt service across all your borrowing should sit comfortably below a third of take-home pay, with a fixed-rate share high enough that a rate move cannot break the budget. Stress the plan at a rate three points above today's and at a one-third income drop. If either scenario fails, the fix is cheaper now than it will be after a drawdown.",
        audience: "you",
        effort: "medium",
        impact: "medium",
        horizon: "quarter",
      },
      {
        title: "Cut the capex commitment, not just the headline spend",
        detail:
          "If you are a mid-sized operator, map every committed power, colocation and lease obligation against realistic revenue and stage the payments. Long-dated capacity contracts behave like debt even though they sit outside the balance sheet, and they are exactly what broke in previous capex busts. Contract for the capacity you can use in eighteen months and take options on the rest.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Force disclosure of AI unit economics and asset ageing",
        detail:
          "Regulators should require compute operators to publish utilisation, capitalised lease obligations, and the sensitivity of earnings to a shorter server life. The single most useful disclosure would be the same cohort publishing cost per delivered unit against realised revenue, because that is what separates a durable build-out from a construction boom. Cheap now; expensive after the first round of write-downs sets the tone.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
    ],
    advancements: [
      {
        title: "Direct lending platforms reporting at asset level",
        detail:
          "LPs on a handful of large private credit platforms can now see deal-level loans, valuations and fees quarterly rather than receiving a single blended return. That does not remove valuation risk, but it makes it much harder for a manager to hide a bad position behind a mark. Coverage is narrow and formats are not standardised.",
        status: "promising",
        progress: 45,
        date: "2025",
        actor: "Large private credit managers and the LPAC community",
        link: "https://www.fsb.org/publications/",
      },
      {
        title: "Interval funds and quarterly repurchase on BDC equity",
        detail:
          "Business development companies can now offer interval funds that accept quarterly redemptions, which shortens the mismatch between illiquid loans and daily investor expectations without forcing a fire sale. It genuinely reduced the pressure that drove 2024 redemptions out of several flagship funds. It also concentrates redemption days into a predictable quarterly window, which is its own kind of risk.",
        status: "scaling",
        progress: 65,
        date: "2024",
        actor: "US business development companies",
      },
      {
        title: "Auditor scrutiny of capitalised leases and useful lives",
        detail:
          "The accounting standard setter and the large audit firms have both signalled that long-term data-centre leases and shortened asset lives are priorities for the next review cycle. Specific proposals are outstanding and industry lobbying is organised. Progress is procedural rather than substantive so far.",
        status: "stalled",
        progress: 25,
        date: "2025",
        actor: "Accounting standard setters and audit regulators",
      },
      {
        title: "Vendor-financed and circular compute deals as a shadow channel",
        detail:
          "Much of the reported AI revenue is the same capital that funded the machines, routed back through purchase agreements, equity stakes and supplier financing. That financing has grown rather than shrunk over the past two years, and it is far less visible to credit analysts than bond issuance. Regulators have only begun to ask for a breakdown of related-party and vendor-financed amounts.",
        status: "regressed",
        progress: 30,
        date: "2025",
        actor: "Cloud operators, model labs and their suppliers",
      },
      {
        title: "Contracted-revenue matching for long-dated capacity",
        detail:
          "Standardising how project finance underwrites build-versus-earn and power-availability contracts would let lenders see the same pipeline risk the operators see, rather than relying on internal forecasts. Several template documents exist in industry working groups, but none are binding and lenders still treat these assets as unrated corporate credit.",
        status: "promising",
        progress: 35,
        date: "2026",
        actor: "Banking and project finance working groups",
      },
    ],
    timeline: [
      {
        date: "2023-11",
        title: "Hyperscalers announce multi-year capex step-ups",
        detail:
          "The four largest cloud operators guide to a combined spending programme that grows by more than half in 2024, framed as a multi-year commitment rather than a single-year decision.",
      },
      {
        date: "2024-08",
        title: "GPU leasing moves from spot to long-term contracts",
        detail:
          "Neocloud operators sign multi-year, tens-of-billions-of-dollars-scale capacity commitments, converting a rental market into something resembling project finance.",
      },
      {
        date: "2025-03",
        title: "Private credit becomes a major lender to compute",
        detail:
          "Large private credit managers announce sizeable facilities to data-centre developers and compute operators, taking on credit risk that banks historically avoided.",
      },
      {
        date: "2025-09",
        title: "Circular arrangements come under public scrutiny",
        detail:
          "Financing structures in which suppliers and model investors fund customers who then lease the same hardware attract regulator and investor criticism over the quality of reported revenue.",
      },
      {
        date: "2025-10",
        title: "Debt-financed capacity commitments repriced",
        detail:
          "Investors push back on supplier-financed and vendor-guaranteed data-centre debt, demanding higher yields and better collateral disclosure as growth expectations reset.",
      },
      {
        date: "2026",
        title: "Slower but continued build-out with sharper disclosure demands",
        detail:
          "Spending keeps rising on power and land rather than on accelerators, as operators prioritise sites with secured electricity over sites with unconstrained capital.",
      },
    ],
    sources: [
      {
        label: "IMF Global Financial Stability Report",
        url: "https://www.imf.org/en/Publications/GFSR",
        year: 2025,
      },
      {
        label: "Federal Reserve Financial Stability Report",
        url: "https://www.federalreserve.gov/publications/financial-stability-report.htm",
        year: 2025,
      },
      {
        label: "Bank of England Financial Stability Report",
        url: "https://www.bankofengland.co.uk/financial-stability-report",
        year: 2025,
      },
      {
        label: "FSB publications on non-bank financial intermediation",
        url: "https://www.fsb.org/publications/",
        year: 2025,
      },
      {
        label: "SEC filings database, operator capital expenditure disclosures",
        url: "https://www.sec.gov/",
        year: 2025,
      },
    ],
    updated: "2026-10-09",
  },
  {
    slug: "sovereign-debt-dynamic",
    title: "The sovereign debt dynamic",
    domain: "finance",
    tag: "Slow squeeze",
    summary:
      "Spending committed decades ago, debt priced at today's rates, and growth that no longer assumed that rates would stay low — this is the least sudden and most predictable large financial risk there is.",
    analysis: [
      "The arithmetic is not controversial, only its timing. Global public debt sits close to the size of world output, a large advanced economy's gross debt exceeds $37tn, and a cluster of countries pay more in interest than they spend on defence or health. The problem is the composition of the stock: a great deal of it was issued at 1% to 2% and now rolls into 4% to 5% paper, and interest costs compound against a revenue base that grows more slowly than nominal GDP. That is the dynamic, and it does not require a crisis to work — it requires only that growth stays mediocre while rates stay above the era of cheap money.",
      "Different countries fail differently. For advanced economies with their own currency and central bank, the realistic endpoint is fiscal dominance, where every shock is absorbed through the tax-and-spend lever because there is no room left, producing low growth and chronic inflation. For dollarised and lower-income economies, the constraint is external: there is no lender of last resort at the central bank, so a 600 basis point dollar move forces a domestic default, a debt restructuring, or both. Several countries have already used all three routes within a decade.",
      "The transmission into household finance is slower but real. Persistent deficits mean the tax line in your payslip never stops rising, and in an inflationary regime the sovereign's cost of borrowing crowds out every other borrower in the same year. Pension and insurance portfolios that held decades of government paper now fund liabilities in a world where that paper reprices upward, which is a quiet transfer from savers to borrowers with inflation-linked returns. Watch the primary deficit and the average maturity, not the debt-to-GDP headline, because the ratio is the least informative number in the debate.",
    ],
    likelihood: 78,
    severity: 72,
    speed: 25,
    defence: 45,
    onset: "slow",
    horizon: "5–20 yrs",
    trend: "rising",
    affected: [
      "Taxpayers in high-debt advanced economies",
      "Dollarised and commodity-dependent emerging economies",
      "Pension and insurance portfolios holding long-dated government debt",
      "Homebuyers competing against the state for savings",
      "Sovereign borrowers refinancing short-dated debt",
    ],
    related: ["ai-capex-bubble", "private-credit", "liquidity-fragility"],
    signals: [
      {
        id: "global-public-debt",
        label: "Global public debt, share of world output",
        indicator:
          "General government gross debt as a percentage of global GDP, as reported in the IMF Fiscal Monitor database",
        reading:
          "Roughly 95–100% of world output, up from around 85% a decade earlier, with gross public plus private sector debt above four times world output",
        status: "high",
        trend: "rising",
        history: [88, 90, 91, 92, 93, 94, 95, 96, 97, 98],
        cadence: "Annual",
        why: "This is the ceiling the whole system operates under. It does not have to be repaid; it has to be serviceable, and serviceability depends on the rate, not the ratio.",
        source: "IMF Fiscal Monitor database",
        sourceUrl: "https://www.imf.org/en/Publications/fandd/issues/2024/10",
      },
      {
        id: "emerging-debt-service",
        label: "Emerging-market debt service as share of revenue",
        indicator:
          "Interest payments as a percentage of government revenue for low and lower-middle income economies with high or elevated debt distress",
        reading:
          "Around 10–15% of revenue for a broad group of distressed and highly indebted economies, at the highest sustained levels in decades",
        status: "critical",
        trend: "rising",
        history: [7, 8, 8, 9, 9, 10, 11, 12, 13, 14],
        cadence: "Annual",
        why: "Above roughly 15% of revenue, debt service crowds out health and education spending, and the IMF has documented cases where it does so outright.",
        source: "IMF Global Financial Stability Report",
        sourceUrl: "https://www.imf.org/en/Publications/GFSR",
      },
      {
        id: "advanced-primary-deficit",
        label: "Primary deficit in large advanced economies",
        indicator:
          "Government spending excluding net interest, minus revenue, as a percentage of GDP, aggregated across large advanced economies",
        reading:
          "Around 3% of GDP on average across large advanced economies in 2024 and 2025, well above the pre-2020 norm of roughly half that",
        status: "high",
        trend: "rising",
        history: [2.5, 2.4, 3.0, 4.5, 3.0, 1.5, 2.5, 3.0, 3.1, 3.0],
        cadence: "Annual",
        why: "The primary deficit is the part of the problem that current policy choices can actually change, and it is the part that determines whether the trajectory stabilises.",
        source: "IMF Fiscal Monitor and OECD Economic Outlook",
        sourceUrl: "https://www.oecd.org/en/data/insights/statistical-reports.html",
      },
      {
        id: "ten-year-yields",
        label: "Average ten-year sovereign yield, major advanced economies",
        indicator:
          "Ten-year government bond yields averaged across large advanced economies, in percent, tracked monthly",
        reading:
          "Around 4.2% in 2025, roughly double the level that prevailed before 2022, and holding there rather than falling back as inflation cooled",
        status: "elevated",
        trend: "flat",
        history: [1.8, 1.7, 1.6, 2.3, 1.4, 1.0, 2.6, 3.2, 4.3, 4.2],
        cadence: "Monthly",
        why: "This is the price that reprices every mortgage, every corporate loan and every future deficit, and it is the variable treasuries cannot control without paying for it.",
        source: "Treasury and central bank yield curve data",
        sourceUrl: "https://home.treasury.gov/resource-center/data-chart-center/interest-rates",
      },
    ],
    precautions: [
      {
        title: "Count your money in real terms, not nominal ones",
        detail:
          "If your income has not kept pace with prices over three years, your emergency fund is smaller than it was, and so is your retirement balance. Work out what six months of expenses costs at today's prices and current income, not at your last salary review. Then check what your savings actually bought you after tax and inflation over the same window.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Fix the housing and debt-service line",
        detail:
          "In a 4% world, a long fixed-rate mortgage is genuinely valuable and a short one is a gamble. Before taking a new fixed-rate loan, model payments at your current rate plus three points and your income minus a third. Do not buy, or move to buy, if the stressed case needs a second income to clear.",
        audience: "you",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Hold a spread of government credit, not one issuer",
        detail:
          "Ladders across maturities and issuers buy you something the yield curve cannot promise: the ability to sell something when you need it. Keep a portion in bills and a portion in longer paper, and split exposure across at least two issuers rather than holding everything in your home country's debt. If you hold a bond ladder, decide now which rung you sell first.",
        audience: "you",
        effort: "medium",
        impact: "medium",
        horizon: "quarter",
      },
      {
        title: "Treat sovereign concentration as a balance-sheet problem",
        detail:
          "Pension, insurance and corporate defined-benefit plans can end up with more exposure to one government's credit than to equity or property combined. Run an aggregate exposure number across the whole organisation, not per fund, and set a limit for single-sovereign concentration at the group level. Set the limit before the next bond auction rather than after a market move.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Fix debt reprocessing rules before the next distressed case",
        detail:
          "The multilateral framework for coordinated debt treatments has barely moved since it was written, and the number of countries needing it keeps growing. Stand up a clear framework for standstill, creditor committees, and comparability of treatment, with financing to back it, and stop treating each default as a bespoke negotiation. Without a mechanism, workouts happen on terms set by whoever moves first.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
      {
        title: "Lengthen public-sector debt maturity before rates fall again",
        detail:
          "Issuing long and pre-funding converts a fiscal problem into an arithmetic one, and it is the one genuinely cheap mitigation available. It also concentrates risk in the tail, so pair it with published average maturity and interest-to-revenue targets, plus an independent fiscal council with the authority to publish an alternative assessment. Without an honest counterparty, markets have no one to believe.",
        audience: "policy",
        effort: "medium",
        impact: "medium",
        horizon: "year",
      },
    ],
    advancements: [
      {
        title: "Coordinated framework for sovereign debt reprocessing",
        detail:
          "A common set of principles for restructurings would shorten the period of uncertainty for affected creditors and cut the litigation tail. In practice the framework has been invoked rarely and lacks the financing that would make voluntary participation attractive. The debt stock requiring it is growing faster than the institution's willingness to act.",
        status: "stalled",
        progress: 30,
        date: "2024",
        actor: "G20 Common Framework",
        link: "https://www.imf.org/en/Publications/GFSR",
      },
      {
        title: "Treasury pre-funding and longer average maturity",
        detail:
          "Several large issuers responded to the 2023 rate shock by pre-funding a larger share of the following year and by tilting issuance toward long maturities. That materially reduced refinancing pressure in 2024 and 2025. It also raised debt-servicing cost in the short run, and it buys time rather than solvency.",
        status: "scaling",
        progress: 65,
        date: "2024",
        actor: "G7 sovereign issuers",
      },
      {
        title: "Independent fiscal councils and fiscal rule escape clauses",
        detail:
          "Independent bodies now publish their own deficit projections in several large economies, which gives the public a second number to check the official one against. Rules have generally been weakened through escape clauses rather than strengthened, which is the honest summary. Useful for accountability, not yet binding for behaviour.",
        status: "scaling",
        progress: 55,
        date: "2025",
        actor: "National fiscal councils and the EU fiscal framework",
        link: "https://www.oecd.org/en/data/insights/statistical-reports.html",
      },
      {
        title: "Debt-for-climate and debt-for-nature swaps",
        detail:
          "A meaningful volume of sovereign debt has been restructured into climate- or biodiversity-linked instruments, at scales from tens of millions to several billions of dollars. Execution has been good and creditor participation broad. Volumes remain small enough that they are a rounding error against the stock of distressed debt.",
        status: "promising",
        progress: 40,
        date: "2025",
        actor: "Bilateral and commercial creditors with development bank facilitation",
      },
      {
        title: "Nominal debt stabilisation and productivity-led fiscal repair",
        detail:
          "The credible fix is faster trend growth plus a narrower deficit, and neither has shown up consistently in the post-2020 data. Attempts to enforce hard caps on current spending have been reversed or diluted in most large economies. This is the mitigation that matters and it is the one with the least evidence of working.",
        status: "regressed",
        progress: 20,
        date: "2025",
        actor: "G7 finance ministries",
      },
    ],
    timeline: [
      {
        date: "2015-08",
        title: "The first global debt warnings become concrete",
        detail:
          "A widely cited external assessment put global public debt near $150tn once private debt is included and warned that the post-crisis recovery had not reduced leverage. The framing dominated the subsequent decade.",
      },
      {
        date: "2020-03",
        title: "Emergency issuance changes the maturity profile",
        detail:
          "Advanced economies borrowed at scale during the pandemic, extending average maturity while running near-zero rates. That low-cost financing window is now largely closed.",
      },
      {
        date: "2022-10",
        title: "Rate shock reprices the entire stock",
        detail:
          "A rapid move from near-zero to 4% and above in policy rates turned latent fiscal stress into visible interest costs, with the effect concentrated in fixed-rate borrowers refinancing short-dated debt.",
      },
      {
        date: "2023-10",
        title: "Treasuries lean into long issuance and pre-funding",
        detail:
          "Large issuers shifted issuance toward long maturities and pre-funded a bigger share of the following year's needs, trading near-term interest cost for refinancing certainty.",
      },
      {
        date: "2024-04",
        title: "Debt service becomes a budget-line problem",
        detail:
          "With policy rates still elevated, interest costs in several large economies rise to the point where they visibly displace discretionary spending and revive public argument about the budget.",
      },
      {
        date: "2025-08",
        title: "Trade shock widens the deficit outlook again",
        detail:
          "Tariff changes and slower growth push projected deficits back up in several large economies, extending the horizon over which stabilising primary balances looks plausible.",
      },
    ],
    sources: [
      {
        label: "IMF Fiscal Monitor database",
        url: "https://www.imf.org/en/Publications/fandd/issues/2024/10",
        year: 2024,
      },
      {
        label: "IMF Global Financial Stability Report",
        url: "https://www.imf.org/en/Publications/GFSR",
        year: 2025,
      },
      {
        label: "IMF Annual Report on Exchange Arrangements",
        url: "https://www.imf.org/en/Publications/Annual-Report-on-Exchange-Arrangements",
        year: 2024,
      },
      {
        label: "OECD Economic Outlook and fiscal statistics",
        url: "https://www.oecd.org/en/data/insights/statistical-reports.html",
        year: 2025,
      },
      {
        label: "US Treasury interest rate data",
        url: "https://home.treasury.gov/resource-center/data-chart-center/interest-rates",
        year: 2025,
      },
    ],
    updated: "2026-10-09",
  },
  {
    slug: "stablecoin-run",
    title: "Stablecoin and digital-asset run dynamics",
    domain: "finance",
    tag: "Fast-onset",
    summary:
      "A new deposit-like liability grew to hundreds of billions of dollars, pays no interest, is redeemable on demand, and sits on top of a small number of issuers and one dominant settlement chain.",
    analysis: [
      "This is a bank run with a technological interface, and the risk is structural rather than speculative. Aggregate stablecoin supply reached roughly $250–290bn before falling back in late 2025, and the largest few issuers account for the great majority of it. Reserves are mostly short-dated government bills, which is a defensible choice for a par-value promise but also means the entire system is financed by a portfolio with no term, no market risk to absorb redemptions, and no lender of last resort. When confidence wobbles, the assets backing the liabilities are simultaneously being sold by every other holder of that same asset class.",
      "Concentration makes it fast. Redemption runs on stablecoins are not hypothetical; in the March 2023 regional banking stress the largest dollar stablecoin traded below eighty-five cents for roughly two days, and in October 2025 the market as a whole saw a rapid, multi-day contraction as holders moved out. Concentration in a handful of issuers and a heavy reliance on one public blockchain means the plumbing has to work at the same moment as the sentiment does. Tether's redemption model in particular has not always operated with the same terms for retail and institutional holders, which is precisely the kind of asymmetry that turns a queue into a crisis.",
      "The systemic exposure is smaller than the retail volume suggests, but it is oddly distributed. Stablecoins now settle a meaningful share of cross-border payments and provide the liquidity layer for a large crypto trading venue ecosystem, and a shrinking fraction is simply cash parked under a mattress. The dangerous configuration is a future where stablecoin balances are used as margin, or where a regulated issuer gets permission to invest in longer-dated or yield-bearing assets to widen the yield on offer. Both would convert a par instrument into a credit product with a run-prone liability attached.",
    ],
    likelihood: 65,
    severity: 62,
    speed: 80,
    defence: 35,
    onset: "sudden",
    horizon: "Now",
    trend: "rising",
    affected: [
      "Stablecoin holders outside redemption territories",
      "Crypto trading venues using stablecoins as settlement",
      "Cross-border payment users in high-inflation economies",
      "Bank deposit bases in dollarised economies",
      "Treasury bill buyers dependent on stablecoin demand",
    ],
    related: ["liquidity-fragility", "private-credit", "identity-takeover"],
    signals: [
      {
        id: "aggregate-supply",
        label: "Total stablecoin supply outstanding",
        indicator:
          "Aggregate market capitalisation of dollar and non-dollar stablecoins, tracked continuously and summarised monthly",
        reading:
          "Around $250–290bn at the 2025 peak, falling to roughly $170bn during the sharp redemptions of late 2025 — the fastest contraction in the asset's history",
        status: "elevated",
        trend: "falling",
        history: [8, 10, 21, 75, 120, 128, 132, 200, 255, 170],
        cadence: "Monthly",
        why: "Supply is a direct read on how much cash-like liability is standing on issuer balance sheets, and its slope tells you how fast a run could go.",
        source: "Global Financial Stability Report data and issuer reserves reporting",
        sourceUrl: "https://www.imf.org/en/Publications/GFSR",
      },
      {
        id: "redemption-pace",
        label: "Redemption pace at the largest issuers",
        indicator:
          "Net redemptions in the days following any deviation from the one-dollar peg, measured as a seven-day rate",
        reading:
          "Tens of billions of dollars of net redemptions within about a week during the October 2025 market-wide episode, against single-digit billions in earlier stress events",
        status: "high",
        trend: "rising",
        history: [0.1, 0.2, 0.5, 1, 3, 1, 4, 7, 12, 20],
        cadence: "Weekly",
        why: "Runs move in hours, not quarters. The seven-day number is the closest thing to a genuine early warning you get, and it exists long before a failure.",
        source: "FSB monitoring of global stablecoin arrangements",
        sourceUrl: "https://www.fsb.org/publications/",
      },
      {
        id: "reserve-duration",
        label: "Duration of issuer reserve assets",
        indicator:
          "Share of issuer reserves held in short-dated government bills versus longer-dated or yield-bearing instruments",
        reading:
          "The largest issuer holds the overwhelming majority of reserves in overnight and short bills, though the share in slightly longer assets has crept up since 2024",
        status: "quiet",
        trend: "flat",
        history: [60, 62, 64, 66, 68, 70, 72, 76, 82, 85],
        cadence: "Annual",
        why: "Short-dated reserves are what make one-dollar redemptions work smoothly, and they are exactly what cannot absorb a run without asset sales.",
        source: "Central bank and BIS work on the future monetary system",
        sourceUrl: "https://www.bis.org/publ/arpdf/ar2023e3.htm",
      },
      {
        id: "depeg-events",
        label: "Depeg incidents exceeding five percent",
        indicator:
          "Count of stablecoins trading more than five percent away from their target price, excluding redenomination events",
        reading:
          "Several events a year, concentrated in non-dollar stablecoins and in thinly traded synthetic tokens rather than the major dollar issuers",
        status: "elevated",
        trend: "flat",
        history: [0, 1, 2, 1, 3, 4, 5, 6, 5, 5],
        cadence: "Monthly",
        why: "Frequency tells you whether the peg is actually holding or whether most incidents are being absorbed quietly in low-liquidity tokens nobody holds much of.",
        source: "FSB stablecoin implementation review",
        sourceUrl: "https://www.fsb.org/publications/",
      },
    ],
    precautions: [
      {
        title: "Do not treat a stablecoin as cash",
        detail:
          "You are an uninsured creditor of a foreign issuer, ranked behind bondholders, with no deposit guarantee and no branch you can walk into. That is a different instrument from a bank deposit even when both are labelled dollars. If your emergency fund sits in one, move the first three months of expenses out to bank deposits and keep the token balance to what you can genuinely lose.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Know the redemption terms before you need them",
        detail:
          "Minimum redemption sizes, settlement windows, eligibility rules and fee structures differ by issuer and by account tier. Read the terms at the moment you buy, not during an event, and screenshot them. An issuer that processes small retail redemptions more slowly than large institutional ones is telling you something important about a stress scenario.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "today",
      },
      {
        title: "Keep counterparty spread across banks and platforms",
        detail:
          "The failure in 2023 came from holding deposits at one bank and stablecoin exposure at a venue whose counterparty was that same bank. Map your financial exposures as a single list: every institution, every wallet custodian, every settlement agent, and the amount you could lose if any one of them stopped. Cap any single name at a share you would accept losing outright, and move one of them this month.",
        audience: "you",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Segment treasury and client balances from anything run-prone",
        detail:
          "Any business holding crypto-adjacent assets needs a written policy on which balances are operational and which are investment, plus daily segregation and a documented unwind sequence. Agree in advance who signs the transfer, what triggers it, and which assets are never sold under pressure. Write it down before a red quarter, because nobody drafts a liquidation policy at the bottom.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Mandate audited reserves, segregated holdings and run planning",
        detail:
          "Reserve rules should require high-quality liquid assets at the issuing entity, published attestations on a frequent cadence, and a recovery plan that assumes simultaneous large redemptions. Regulators should also require disclosure of redemption terms by customer tier, since differential treatment is the mechanism by which a run becomes a loss for retail holders. Coordinated cross-border data on stablecoin flows would give supervisors a real-time picture they currently lack.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
    ],
    advancements: [
      {
        title: "Federal reserve and disclosure requirements for payment stablecoins",
        detail:
          "US legislation signed in July 2025 established a reserve-backed regime with full backing, permitted investment in government bills, monthly public disclosure and a redemption-only prohibition on paying yield. It is the most detailed framework anywhere and it turned a gap into a rulebook. It also creates a compliance cliff that smaller issuers may not survive, which concentrates the system further.",
        status: "scaling",
        progress: 55,
        date: "2025-07",
        actor: "US Congress and the federal banking agencies",
      },
      {
        title: "European authorisation and a 30 percent bank-deposit reserve rule",
        detail:
          "The EU regime became fully applicable from the end of 2024, with reserve composition capped, significant holdings required at an EU bank, and large issuers subject to capital requirements. It produced two licensed euro-denominated issuers, which is exactly the concentration problem the rule was meant to solve. Reporting has improved materially, even where the structure has not.",
        status: "scaling",
        progress: 60,
        date: "2024-12",
        actor: "European authorities under the Markets in Crypto-Assets regime",
        link: "https://www.ecb.europa.eu/pub/financial-stability/html/index.en.html",
      },
      {
        title: "Tokenised deposits and wholesale settlement for central bank money",
        detail:
          "The most promising direction is not stablecoins at all but tokenised deposits issued by commercial banks against central bank reserves, which removes the private run risk from the settlement layer. Several large central bank projects have reached pilot and some have moved toward production access. Adoption is concentrated among wholesale participants, and retail availability is years away.",
        status: "promising",
        progress: 35,
        date: "2025",
        actor: "Banking and central bank settlement projects",
        link: "https://www.bis.org/publ/arpdf/ar2023e3.htm",
      },
      {
        title: "Frequent proof-of-reserves and real-time attestation",
        detail:
          "Continuous or near-continuous reserve attestations would shorten the information gap that made every previous depeg a surprise. Several protocols and a few regulated issuers now publish periodic on-chain reserve data. Attestation quality varies, and a proof of reserves is not a proof of solvency, since it says nothing about other liabilities or asset quality.",
        status: "promising",
        progress: 45,
        date: "2025",
        actor: "Issuers and attestation providers",
      },
      {
        title: "Coordinated cross-border response to a stablecoin run",
        detail:
          "Supervisors have repeatedly said a dollar stablecoin run could cross borders within hours, and have not built a standing mechanism to respond: no pre-agreed information sharing on large redemptions, no common liquidity arrangement, no agreed communication sequence. Consensus on the problem is high and action has been slow. Nothing prevents the next run from happening overnight somewhere else.",
        status: "stalled",
        progress: 20,
        date: "2025",
        actor: "Financial Stability Board and national supervisors",
        link: "https://www.fsb.org/publications/",
      },
    ],
    timeline: [
      {
        date: "2018-09",
        title: "Stablecoin supply moves past a billion dollars",
        detail:
          "The earliest dollar-pegged tokens grow from experiments into a small but functioning settlement and payments layer for crypto trading venues.",
      },
      {
        date: "2021-11",
        title: "Supply passes one hundred billion dollars",
        detail:
          "Growth accelerates with the trading cycle, and stablecoins become the dominant settlement and margin unit in digital asset markets.",
      },
      {
        date: "2023-03",
        title: "The first serious dollar peg break",
        detail:
          "During the regional banking stress, the largest dollar stablecoin trades near eighty-five cents for roughly two days as a $10bn support facility is arranged. The episode proves the asset behaves like a deposit during a bank run, not like a diversifier.",
      },
      {
        date: "2023-07",
        title: "Global stablecoin oversight recommendations published",
        detail:
          "The international standard-setting body issues a framework recommending consistent regulation, full reserve backing and effective redress for holders. Implementation is left to individual jurisdictions.",
      },
      {
        date: "2025-06",
        title: "A regulated dollar issuer goes public",
        detail:
          "The second-largest dollar stablecoin issuer lists on a US exchange, publishing audited reserve reports and bringing visible, standardised disclosure to a previously opaque part of the market.",
      },
      {
        date: "2025-10",
        title: "Market-wide redemptions compress supply sharply",
        detail:
          "Aggregate stablecoin supply falls by tens of billions of dollars within days. It is the first large, rapid, cross-issuer run of the stable era and the clearest evidence that the asset's risk profile is a deposit's.",
      },
    ],
    sources: [
      {
        label: "FSB publications on global stablecoin arrangements",
        url: "https://www.fsb.org/publications/",
        year: 2025,
      },
      {
        label: "IMF Global Financial Stability Report",
        url: "https://www.imf.org/en/Publications/GFSR",
        year: 2025,
      },
      {
        label: "BIS Annual Economic Report, chapter on the future monetary system",
        url: "https://www.bis.org/publ/arpdf/ar2023e3.htm",
        year: 2023,
      },
      {
        label: "ECB Financial Stability Review",
        url: "https://www.ecb.europa.eu/pub/financial-stability/html/index.en.html",
        year: 2025,
      },
      {
        label: "Federal Reserve Financial Stability Report",
        url: "https://www.federalreserve.gov/publications/financial-stability-report.htm",
        year: 2025,
      },
    ],
    updated: "2026-10-09",
  },
  {
    slug: "private-credit",
    title: "The private credit opacity problem",
    domain: "finance",
    tag: "Under-monitored",
    summary:
      "About two trillion dollars of lending now happens outside the disclosure regime that made bank credit legible, into a market where valuations are set by the lender.",
    analysis: [
      "Private credit filled a genuine gap: floating-rate loans to midsize companies that banks no longer wanted to hold, with covenants and pricing no bank would offer. That growth was fast, from under a trillion dollars a decade ago to roughly $2tn, and it brought genuine improvements in financing terms for mid-market borrowers. The problem is disclosure. Positions are marked by the same manager that originated them, funds meet quarterly redemption gates, and the asset-level detail that regulators require of banks appears, at best, in the fine print of fund reports.",
      "The concentration problem is at the top and in the plumbing. The largest managers now run portfolios many times bigger than the capital they hold, and in some cases have taken on preferred equity, co-investment and warehousing from the banks that bought their loans. Bank lending to the sector is itself an exposure that supervisors struggle to see through securitised tranches. In a genuine credit cycle, the same defaults would arrive simultaneously at a retail fund, a bank portfolio and a bank capital position.",
      "So far, real defaults have been surprisingly modest, which is why this is an opacity problem rather than a crisis. But the stress case is not exotic: refinancing walls at 2027–2029 on loans that reprice above 8%, a recession in the segments that borrowed hardest, and marks that move at once across correlated positions. The signals people usually watch — fund flows, distribution yields, headline defaults — lag the actual repricing of loan books by quarters. Disclosure reform is the one mitigation that would materially reduce the loss if this turns.",
    ],
    likelihood: 70,
    severity: 60,
    speed: 45,
    defence: 30,
    onset: "gradual",
    horizon: "Now",
    trend: "rising",
    affected: [
      "Listed business development companies and evergreen funds",
      "Banks holding CLO tranches and lending to the sector",
      "Insurance company portfolios in private credit",
      "Mid-market borrowers facing repricing",
      "Pension and endowment investors in illiquid private vehicles",
    ],
    related: ["liquidity-fragility", "sovereign-debt-dynamic", "ai-capex-bubble"],
    signals: [
      {
        id: "market-size",
        label: "Private credit assets under management",
        indicator:
          "Total capital committed or deployed across private credit strategies, including dedicated funds and the direct lending books of banks, in US dollars",
        reading:
          "Around $2tn by mid-2025, roughly doubling in under five years, of which only a minority sits in vehicles subject to public reporting requirements",
        status: "high",
        trend: "rising",
        history: [0.8, 0.9, 1.0, 1.1, 1.2, 1.4, 1.6, 1.8, 2.0, 2.1],
        cadence: "Annual",
        why: "Every dollar of it behaves like a bank loan with a bank's leverage and none of a bank's disclosure. Size is the exposure.",
        source: "FSB monitoring of non-bank financial intermediation",
        sourceUrl: "https://www.fsb.org/publications/",
      },
      {
        id: "clo-bank-holdings",
        label: "Bank and insurer holdings of securitised private credit",
        indicator:
          "Stock of CLO debt and CLO equity tranches, including sub-investment-grade and unrated pieces, held by banks, insurers and pension funds",
        reading:
          "On the order of $300bn held outside direct lending books, much of it in the riskiest tranches, after rapid growth from under $100bn in 2020",
        status: "elevated",
        trend: "rising",
        history: [60, 80, 110, 140, 180, 220, 260, 280, 300, 310],
        cadence: "Quarterly",
        why: "Banks that sold loans into funds and bought the securitised version back have not actually reduced the exposure. Under stress they hold the worst-performing piece.",
        source: "Financial Stability Reports on non-bank financial intermediation",
        sourceUrl: "https://www.federalreserve.gov/publications/financial-stability-report.htm",
      },
      {
        id: "floating-rate-reset",
        label: "Share of floating-rate loans repricing above eight percent",
        indicator:
          "Proportion of outstanding leveraged and direct loans whose coupon has reset to a rate above 8%, following the policy rate path",
        reading:
          "Roughly a third to a half of the floating-rate book, versus single digits before 2022, concentrated in leveraged borrowers with high entry multiples",
        status: "critical",
        trend: "rising",
        history: [2, 3, 5, 10, 22, 28, 31, 34, 38, 40],
        cadence: "Quarterly",
        why: "A borrower paying 8% on debt against flat revenue has roughly seven years to cut costs or refinance. That clock, not the default rate, is the leading indicator.",
        source: "Bank of England Financial Stability Report, leveraged lending section",
        sourceUrl: "https://www.bankofengland.co.uk/financial-stability-report",
      },
      {
        id: "bdc-discount",
        label: "Listed fund valuations versus reported net asset value",
        indicator:
          "Aggregate market capitalisation of listed business development companies as a share of reported net asset value, smoothed over quarters",
        reading:
          "Roughly 0.6 to 0.7 of reported net asset value on average after a two-year period of persistent discounts, though the gap is wide and unstable across managers",
        status: "elevated",
        trend: "flat",
        history: [1.05, 1.02, 0.98, 0.95, 0.92, 0.88, 0.8, 0.68, 0.64, 0.66],
        cadence: "Quarterly",
        why: "A persistent discount means the market disbelieves the marks. Either the loans are worth less than the manager says, or the fee structure is worse than disclosed, and you cannot tell which from outside.",
        source: "Listed fund filings and market data",
        sourceUrl: "https://www.sec.gov/",
      },
    ],
    precautions: [
      {
        title: "Ask what illiquid you actually own",
        detail:
          "Open-ended private funds, evergreen vehicles and drawdown structures are the part of private credit retail investors meet, and their gates are not a guarantee — they are a queue. Decide the share of your portfolio that you will not need for a decade, and set the rest in daily-liquid assets. If you cannot name the exact date you can exit, treat it as illiquid regardless of the fund's marketing.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Diversify income sources, not just providers",
        detail:
          "If your dividends, your cash yield and your long-term savings all come from the same credit cycle, a repricing hurts three lines at once. Build at least one income source unrelated to lending spreads: a small cash buffer earning money-market yield, a modest allocation to high-quality fixed income, or a property cashflow. The goal is to stop every part of your income repricing on the same day.",
        audience: "you",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Check whether your bank is lending to the lenders",
        detail:
          "Your savings may be funding a bank portfolio that includes loans originated by a private credit manager, or securitised tranches of them. Ask your bank for a plain-language explanation of its exposure to non-bank financial intermediation, and if the answer is vague, assume some exists. That is not a reason to move the money; it is a reason to know which way the risk cuts.",
        audience: "you",
        effort: "low",
        impact: "medium",
        horizon: "quarter",
      },
      {
        title: "Set concentration limits before the cycle turns",
        detail:
          "An organisation needs a written cap on single-manager and single-sector exposure, plus an agreed valuation policy that does not simply accept the manager's mark. Run a stress case in which mid-market EBITDA falls thirty percent and floating rates stay high, and check what your facility lines and covenants survive. Hold enough committed liquidity that the answer does not depend on selling a position.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Publish asset-level data and independent valuations",
        detail:
          "Extending public reporting to large private credit vehicles would cost the industry real money and deliver the thing that matters: a second opinion on the marks. Loan-level disclosure with an independent valuation requirement, plus aggregate exposure reporting for banks and insurers, would make the sector legible before it fails rather than after. It is the cheapest available reduction in severity for this risk.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
      {
        title: "Align liquidity terms with redemption expectations",
        detail:
          "Regulators should pressure managers to align gate frequency with actual liquidity, which means more private credit held by funds with genuinely long-term liabilities rather than daily-liquidity wrappers. Supervisors also need a clear supervisory view of bank lending to non-bank lenders, because that is where the hidden leverage sits. Half of these funds already price better for genuine long money, so the change is cheaper than it sounds.",
        audience: "policy",
        effort: "medium",
        impact: "medium",
        horizon: "year",
      },
    ],
    advancements: [
      {
        title: "Liquidity mismatch closed with interval funds and daily NAV",
        detail:
          "Interval funds let listed vehicles accept quarterly redemptions, and a handful of large managers now offer daily liquidity on a separate share class with an 8% to 10% fee. That materially reduced the forced-selling dynamic that drove the worst 2024 outflows. The fee is expensive and the daily option did not prevent the outflow, it just made the exit orderly.",
        status: "scaling",
        progress: 60,
        date: "2024",
        actor: "US-listed business development companies",
      },
      {
        title: "Asset-level reporting to limited partners",
        detail:
          "LP reporting has improved markedly: deal lists, valuation methodology and increasingly realised returns, rather than a single quarterly NAV number. Several large platforms now let LPs see individual positions with lags of a quarter or more. Coverage is uneven and the data still arrives after the market has moved.",
        status: "promising",
        progress: 45,
        date: "2025",
        actor: "Large private credit managers and institutional LPs",
        link: "https://www.fsb.org/publications/",
      },
      {
        title: "Synthetic risk transfer to move risk off bank balance sheets",
        detail:
          "Central bank and regulators built programmes intended to move credit risk on private loan portfolios onto the banks that originated them. The synthetic volumes reached a meaningful size before policymakers became uneasy about what was being distributed. They were wound down, which leaves the underlying concentration where it started.",
        status: "stalled",
        progress: 25,
        date: "2024",
        actor: "ECB and US federal agencies",
        link: "https://www.ecb.europa.eu/pub/financial-stability/html/index.en.html",
      },
      {
        title: "A consolidated, tightened prudential framework for bank exposure",
        detail:
          "The 2023 international agreement tightened the capital treatment of bank lending and holdings related to unrated private credit. Most large jurisdictions then diluted it further during 2025, relaxing thresholds, delays and calibrations to keep markets calm. The direction of travel is now away from the transparency that would matter.",
        status: "regressed",
        progress: 30,
        date: "2025",
        actor: "Basel Committee and national regulators",
        link: "https://www.bis.org/bcbs/publ/",
      },
      {
        title: "Private credit in retirement portfolios with daily liquidity wrappers",
        detail:
          "Platforms now sell private credit allocations inside daily-dealing retirement products. Availability is growing quickly and the products hold assets that cannot be sold at the notice period implied. It makes the market more democratic and makes the timing mismatch worse.",
        status: "regressed",
        progress: 35,
        date: "2026",
        actor: "Asset managers and retirement platforms",
      },
    ],
    timeline: [
      {
        date: "2015-12",
        title: "Basel III finalised after the crisis",
        detail:
          "The capital and liquidity framework agreed after the global financial crisis takes effect, setting the standard against which later non-bank growth is measured.",
      },
      {
        date: "2020-06",
        title: "Private credit absorbs the shock in business lending",
        detail:
          "With bank credit standards tightening during the pandemic, direct lenders step in and private markets extend credit to midsize companies at scale for the first time.",
      },
      {
        date: "2022-10",
        title: "Securitisation becomes the main bank exit",
        detail:
          "Banks and insurers buy collateralised loan obligations backed by loans originated by private credit managers, concentrating exposure while appearing to reduce it.",
      },
      {
        date: "2024-02",
        title: "A flagship fund's financing is wound down",
        detail:
          "A major non-traded business development company sees large redemptions, falling net asset value and an abrupt pullback in related borrowing, exposing the sector's liquidity fragility.",
      },
      {
        date: "2024-12",
        title: "Interval fund structures scale",
        detail:
          "Listed vehicles adopting interval fund share classes grow substantially, giving investors a quarterly redemption window instead of a multi-year lock-up.",
      },
      {
        date: "2026-06",
        title: "Refinancing walls meet higher coupons",
        detail:
          "A wave of mid-market loans issued at low coupons approaches maturity into materially higher rates, and extensions of maturities begin to outpace repayments. Default data follows the maturity schedule with a lag.",
      },
    ],
    sources: [
      {
        label: "FSB publications on non-bank financial intermediation",
        url: "https://www.fsb.org/publications/",
        year: 2025,
      },
      {
        label: "IMF Global Financial Stability Report",
        url: "https://www.imf.org/en/Publications/GFSR",
        year: 2025,
      },
      {
        label: "Bank of England Financial Stability Report",
        url: "https://www.bankofengland.co.uk/financial-stability-report",
        year: 2025,
      },
      {
        label: "ECB Financial Stability Review",
        url: "https://www.ecb.europa.eu/pub/financial-stability/html/index.en.html",
        year: 2025,
      },
      {
        label: "Basel Committee publications and monitoring reports",
        url: "https://www.bis.org/bcbs/publ/",
        year: 2025,
      },
    ],
    updated: "2026-10-09",
  },
  {
    slug: "liquidity-fragility",
    title: "Liquidity fragility and the speed of contagion",
    domain: "finance",
    tag: "Systemic",
    summary:
      "A $7tn money market complex, a few hundred billion dollars of leveraged Treasury trades, and corporate paper that must roll weekly all assume someone is always willing to buy.",
    analysis: [
      "The system works on an assumption nobody tests in calm times: that a trillion dollars of short-dated assets can be sold on the same day at close to the price on the previous screen. That assumption has now been tested twice and failed twice. In March 2020, institutional money funds saw their fastest outflows on record and the corporate paper market effectively shut for weeks, with issuance withdrawn rather than repriced. In the March 2023 regional bank stress, deposit outflows reached a scale that had not been seen since 1980 within a matter of days.",
      "What has changed is the plumbing beneath it. Enormous positions have built up in leveraged strategies that finance long-dated government securities with overnight repo, and those strategies all trade in the same instruments and hold the same risk. A small price move in the least liquid corner of the Treasury market forces deleveraging that propagates through common dealers, common lenders and common balance sheets. The mechanics are closer to a crowded poker table than to a diversified portfolio, and the players largely do not know they are at the same table.",
      "The honest defence is partial. Banks have gone a long way on liquidity and resolution planning, central banks have standing swap lines with each other, and regulators now watch non-bank leverage for the first time. But the mitigations sit mostly on the regulated side of the line, while the fastest-moving fragility is in vehicles that are explicitly not banks and are therefore not required to hold buffers. The realistic scenario is not a systemic collapse; it is a recurring series of sharp, dislocated episodes that each cost households and mid-sized firms real money through deposit mispricing, wide credit spreads, and emergency sales at the worst price.",
    ],
    likelihood: 75,
    severity: 74,
    speed: 85,
    defence: 50,
    onset: "sudden",
    horizon: "Now",
    trend: "flat",
    affected: [
      "Money market fund holders and corporate treasurers",
      "Commercial paper issuers, especially mid-sized firms",
      "Banks holding low-quality collateral",
      "Leveraged Treasury basis trade funds",
      "Savers in deposit accounts above insurance limits",
    ],
    related: ["stablecoin-run", "private-credit", "sovereign-debt-dynamic", "ai-capex-bubble"],
    signals: [
      {
        id: "mmf-assets",
        label: "Assets in money market funds",
        indicator:
          "Total net assets of US-domiciled money market funds, with a focus on institutional prime funds that hold corporate paper and are open to same-day redemption",
        reading:
          "Around $7tn in total, of which on the order of $1.5–2tn sits in institutional prime funds that can run fast when corporate credit misprices",
        status: "high",
        trend: "rising",
        history: [3.6, 3.7, 4.0, 4.3, 4.6, 4.9, 5.4, 5.9, 6.8, 7.0],
        cadence: "Monthly",
        why: "These funds are the plumbing between savers and short-term corporate credit. When they sell to raise cash, corporate paper issuance has to clear at a wider spread or not at all.",
        source: "Federal Reserve H.41 weekly report",
        sourceUrl: "https://www.federalreserve.gov/releases/h41/current/",
      },
      {
        id: "basis-trade-size",
        label: "Leveraged Treasury arbitrage book, gross exposure",
        indicator:
          "Estimated gross notional exposure of funds and hedge funds running leveraged long-duration government bond positions financed with overnight repurchase",
        reading:
          "On the order of $1tn gross across the leading funds, after rapid growth from a few hundred billion dollars earlier in the decade",
        status: "high",
        trend: "flat",
        history: [150, 300, 450, 600, 700, 850, 1000, 1050, 1000, 1000],
        cadence: "Quarterly",
        why: "This is the concentrated position most likely to be unwound by a small price move. When it is, it removes a persistent buyer from the market at the moment others need one.",
        source: "Financial Stability Report analysis of hedge fund leverage",
        sourceUrl: "https://www.federalreserve.gov/publications/financial-stability-report.htm",
      },
      {
        id: "cp-issuance",
        label: "US non-financial corporate paper issuance, weekly",
        indicator:
          "Weekly issuance of short-term commercial paper by non-financial corporations, in US dollars, smoothed over four weeks",
        reading:
          "Typically $300–350bn a week in normal markets; below $200bn during the March 2020 freeze and briefly during the 2025 tariff-driven volatility episode",
        status: "elevated",
        trend: "flat",
        history: [250, 280, 260, 90, 300, 310, 300, 315, 330, 320],
        cadence: "Weekly",
        why: "A lot of working capital in manufacturing runs on commercial paper. When the window closes, the firms that suffer most are the ones nobody holds in a portfolio.",
        source: "BIS commercial paper market statistics",
        sourceUrl: "https://www.bis.org/statistics/cpmon.htm",
      },
      {
        id: "cash-holding-share",
        label: "Household share of deposits sitting in accounts above the insurance limit",
        indicator:
          "Share of household deposits at institutions exceeding the deposit insurance limit, and the proportion of household cash held directly rather than in money market funds",
        reading:
          "Direct household cash holdings are a modest and shrinking share of the total, while balances per account keep rising, which means the uninsured tail gets larger even as the average account looks healthy",
        status: "elevated",
        trend: "rising",
        history: [8, 8, 7, 7, 6, 6, 6, 6, 6, 6],
        cadence: "Annual",
        why: "Insurance pays out per depositor per bank, not per account and not per household. The size of the uninsured tail is the honest measure of the exposure you actually have.",
        source: "ECB and IMF analyses of household deposit concentration",
        sourceUrl: "https://www.ecb.europa.eu/press/economic-bulletin/html/index.en.html",
      },
    ],
    precautions: [
      {
        title: "Know exactly where your cash is, above and below the line",
        detail:
          "Write down every account, every balance, and the insurance limit that applies to each institution, then confirm whether your accounts sit at the same bank under different brands. If your total cash exceeds the per-depositor limit, move the surplus to a second institution this month. It takes an hour and it is the single most direct protection available to an ordinary household.",
        audience: "you",
        effort: "low",
        impact: "high",
        horizon: "today",
      },
      {
        title: "Split the emergency fund across banks and maturities",
        detail:
          "Keep three to six months of essentials in instant access at one institution, the remainder in another, and a portion in a short-dated treasury ladder that will not fall in value during a panic. Do not hold the whole fund in a single long-dated instrument, and do not use a one-year lock-up for money you might need in three months. The ladder is what lets you sell something without selling the thing you need.",
        audience: "you",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Fund the business from committed facilities, not the market",
        detail:
          "Any small business relying on rolling commercial paper or on a money fund for payroll needs committed revolving lines at two banks, with the covenant tested against a revenue fall of a third. Review the covenant headroom twice a year, not in the week you need it. Then set a cash buffer measured in payroll cycles rather than in months, because payroll is what fails first.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Fund the non-bank perimeter that no rule currently covers",
        detail:
          "Bank treasuries holding deposits at money funds, custody clients using the same dealers, and collateral held in funds that also trade with the bank need one shared view of non-bank exposure. Build a counterparty and collateral map, set limits that assume common dealers are stressed, and agree a sequence for raising cash that does not depend on everyone else doing the same thing simultaneously. Publish it, so other firms can see the assumptions and coordinate when everyone needs cash at once.",
        audience: "org",
        effort: "medium",
        impact: "high",
        horizon: "quarter",
      },
      {
        title: "Extend liquidity and resolution rules to the non-bank perimeter",
        detail:
          "Non-bank liquidity providers should hold buffers scaled to the speed and size of their redemptions, with a credible resolution regime behind them, and hedge fund leverage in government securities should be reported to the central bank at a frequency that supports intraday intervention. Central banks already have standing swap lines with each other; the missing piece is knowing who to lend to on the other side of the trade. All of this is achievable with existing technology and existing data.",
        audience: "policy",
        effort: "high",
        impact: "high",
        horizon: "year",
      },
      {
        title: "Improve the tradability of the government bond market itself",
        detail:
          "Central clearing and reporting in the repurchase and government securities markets improve the transparency of the largest concentrations of financial risk anywhere. The effect on fragility is second-order compared with buffer requirements, but it is cheap and it is close to done. Finish the compliance dates before adding anything new to the framework.",
        audience: "policy",
        effort: "medium",
        impact: "medium",
        horizon: "year",
      },
    ],
    advancements: [
      {
        title: "Liquidity Coverage Ratio and the net stable funding rule",
        detail:
          "Requiring banks to hold high-quality liquid assets against a 30-day stressed outflow is the most effective structural mitigation we have actually deployed, and it is why the last decade's stress events produced dislocations rather than failures. It applies to banks only, does not scale for non-bank vehicles, and was calibrated before the current composition of the market. Genuinely working, genuinely incomplete.",
        status: "scaling",
        progress: 70,
        date: "2015",
        actor: "Basel Committee, implemented in national law",
        link: "https://www.bis.org/bcbs/publ/",
      },
      {
        title: "Standing bilateral central bank liquidity lines",
        detail:
          "Major central banks established standing repo arrangements with each other in 2022, effectively on-call and with no usage limits, precisely so that a funding squeeze would not become a policy problem. They have not needed to be used, partly because their existence changed behaviour. This is the most credible thing supervisors did in the last five years.",
        status: "scaling",
        progress: 75,
        date: "2022",
        actor: "G7 central banks",
      },
      {
        title: "Cross-border monitoring of non-bank financial intermediation",
        detail:
          "The international standard-setting body now monitors the non-bank sector annually and publishes a league table of the leverage concentrated in each jurisdiction. The data is annual, so it describes yesterday's structure rather than today's position. Enough to establish that the problem is real; not enough to intervene in it.",
        status: "promising",
        progress: 50,
        date: "2023",
        actor: "Financial Stability Board",
        link: "https://www.fsb.org/publications/",
      },
      {
        title: "Central clearing and reporting in repo and government securities",
        detail:
          "The US moved most of the repurchase and government securities market toward central clearing and transaction reporting between 2023 and 2026, and other jurisdictions followed with their own regimes. Compliance dates slipped more than once, which is normal and worth stating plainly. The direction is right and the coverage will be genuinely comprehensive once it lands.",
        status: "promising",
        progress: 45,
        date: "2026",
        actor: "Major market regulators",
        link: "https://www.federalreserve.gov/publications/financial-stability-report.htm",
      },
      {
        title: "Mandatory liquidity fees on money market fund redemptions",
        detail:
          "A 2022 rule would have imposed graduated fees on rapid redemptions from institutional prime funds, designed to slow a run and leave the fund solvent. Industry opposition was intense and the requirements were scaled back before taking effect. Ordinary redemptions remain free and same-day, which means the run mechanism is unchanged.",
        status: "regressed",
        progress: 20,
        date: "2024",
        actor: "US Securities and Exchange Commission",
      },
    ],
    timeline: [
      {
        date: "2015-01",
        title: "Basel III liquidity framework takes effect",
        detail:
          "The liquidity coverage ratio becomes a binding requirement, and banks begin holding large buffers of genuinely liquid assets for the first time in decades.",
      },
      {
        date: "2020-03",
        title: "The dash for cash",
        detail:
          "Institutional money funds see their fastest outflows on record, the corporate paper market effectively shuts, and primary dealers step back from making markets. The episode is the clearest evidence that a $7tn short-term asset complex can stop functioning within days.",
      },
      {
        date: "2022-03",
        title: "Standing central bank liquidity lines agreed",
        detail:
          "Major central banks create on-call bilateral repo arrangements with each other, removing usage limits, so a systemic funding squeeze can be met without policy improvisation.",
      },
      {
        date: "2023-03",
        title: "Regional bank runs and the first stablecoin peg break",
        detail:
          "Deposit outflows from US regional banks reach a scale not seen since 1980 within days, uninsured deposits at risk run into the hundreds of billions, and a major dollar stablecoin trades well below one dollar before support is arranged.",
      },
      {
        date: "2025-04",
        title: "Bond volatility on tariff shocks",
        detail:
          "Tariff announcements produce a sharp and disorderly move in government bond futures, with dealer balance sheet capacity visibly constraining market making in the most liquid market in the world.",
      },
      {
        date: "2025-10",
        title: "A leveraged Treasury fund is forced to unwind",
        detail:
          "A large Treasury arbitrage strategy suffers losses and rapid deleveraging, exposing how concentrated and opaque positions had become in the government securities market.",
      },
    ],
    sources: [
      {
        label: "Federal Reserve Financial Stability Report",
        url: "https://www.federalreserve.gov/publications/financial-stability-report.htm",
        year: 2025,
      },
      {
        label: "Federal Reserve H.41 money market fund report",
        url: "https://www.federalreserve.gov/releases/h41/current/",
        year: 2025,
      },
      {
        label: "Bank of England Financial Stability Report",
        url: "https://www.bankofengland.co.uk/financial-stability-report",
        year: 2025,
      },
      {
        label: "ECB Financial Stability Review",
        url: "https://www.ecb.europa.eu/pub/financial-stability/html/index.en.html",
        year: 2025,
      },
      {
        label: "BIS commercial paper market statistics",
        url: "https://www.bis.org/statistics/cpmon.htm",
        year: 2025,
      },
      {
        label: "FSB publications on global financial stability",
        url: "https://www.fsb.org/publications/",
        year: 2025,
      },
    ],
    updated: "2026-10-09",
  },
];