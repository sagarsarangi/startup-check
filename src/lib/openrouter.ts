export async function analyzeWithOpenRouter({
  name,
  category,
  description,
}: {
  name: string;
  category: string;
  description: string;
}) {
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    throw new Error("Missing Gemini API key in environment variables.");
  }

  const prompt = `
  You are an expert startup analyst with access to real-time market data and research capabilities.
  
  IMPORTANT INSTRUCTIONS:
  1. First, conduct thorough web research on the startup idea, its market, competitors, and industry trends
  2. Gather current market size data, growth projections, and funding information from reliable sources
  3. Research existing competitors and their market performance
  4. Verify all data points with multiple sources before including them
  5. If specific data is unavailable, clearly indicate estimates vs. verified data
  6. Never fabricate statistics, funding amounts, or company information
  7. Use recent data (preferably within the last 2 years) for market insights
  8. Cross-reference competitor information from multiple business databases
  
  After conducting comprehensive research, analyze the following startup idea and return ONLY valid JSON output. Do not include any markdown or commentary. Follow this schema exactly:
  
  {
    "overallScore": number (0 to 10, based on comprehensive analysis),
    "marketPotential": number (0 to 10, based on researched market data),
    "innovation": number (0 to 10, compared to existing solutions),
    "feasibility": number (0 to 10, considering technical and business factors),
    "strengths": string[] (3-5 key advantages based on market research),
    "concerns": string[] (3-5 main risks and challenges identified),
    "recommendations": string[] (3-5 actionable suggestions based on industry analysis),
    "radarChart": [
      { "subject": "Market Size", "score": number, "fullMark": 10 },
      { "subject": "Competition", "score": number, "fullMark": 10 },
      { "subject": "Innovation", "score": number, "fullMark": 10 },
      { "subject": "Scalability", "score": number, "fullMark": 10 },
      { "subject": "Technical Feasibility", "score": number, "fullMark": 10 },
      { "subject": "Market Timing", "score": number, "fullMark": 10 }
    ],
    "competitorScores": [
      { "name": string (max 25 characters, real company names), "score": number (based on market position) }
    ] (include minimum 3 and maximum 5 competitors with highest scores),
    "marketInsights": {
      "marketSize": { 
        "value": string (current market size with currency/units), 
        "source": string (specific research source or "Industry Analysis" if aggregated), 
        "detail": string (TAM/SAM context and growth projections)
      },
      "growthRate": { 
        "value": string (CAGR percentage with timeframe), 
        "trend": string (market direction and key drivers), 
        "source": string (research source or report name)
      },
      "fundingActivity": { 
        "value": string (recent funding amounts in the sector), 
        "last5Years": string (funding trend and total invested), 
        "topInvestors": string (actual VC firms active in this space - max 3 names)
      }
    }
  }
  
  RESEARCH REQUIREMENTS:
  - Use current market research reports and industry data
  - Verify competitor information from company websites, Crunchbase, or similar databases
  - Check recent funding rounds and investor activity in the sector
  - Look for government or industry association statistics
  - Consider regulatory environment and market trends
  - Evaluate technological maturity and adoption rates
  
  DATA ACCURACY GUIDELINES:
  - Market size: Use reputable research firms (e.g., Gartner, IDC, McKinsey, Statista)
  - Growth rates: Reference specific time periods and methodologies
  - Funding data: Use verified sources like Crunchbase, PitchBook, or CB Insights
  - Competitor scores: Base on actual market performance, revenue, or market share data
  - If exact data unavailable, clearly indicate estimates and provide conservative ranges
  
  Startup to Analyze:
  Name: ${name}
  Category: ${category}
  Description: ${description}
  
  Remember: Accuracy over speculation. If specific data cannot be verified, use industry averages and clearly indicate the methodology used.
  `;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini error: ${response.status} ${error}`);
  }

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  try {
    return JSON.parse(content);
  } catch (e) {
    console.error("❌ Failed to parse Gemini response:", content);
    throw new Error("Failed to parse Gemini response as JSON.");
  }
}
