import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface ChartsProps {
  analysis: {
    radarChart: { subject: string; score: number; fullMark: number }[];
    competitorScores: { name: string; score: number }[];
    marketInsights: {
      marketSize: { value: string; source: string; detail: string };
      growthRate: { value: string; trend: string; source: string };
      fundingActivity: {
        value: string;
        last5Years: string;
        topInvestors: string;
      };
    };
  };
}

const Charts = ({ analysis }: ChartsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Performance Analysis - Radar Chart */}
      <Card className="bg-gradient-to-br from-purple-700/90 to-indigo-700/90 border-purple-500/70 backdrop-blur-sm shadow-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-white text-xl font-semibold tracking-wide">
            Performance Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="w-full h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={analysis.radarChart}
                cx="50%"
                cy="50%"
                outerRadius={110}
                margin={{ top: 25, right: 25, bottom: 25, left: 25 }}
              >
                <PolarGrid
                  stroke="#e879f9"
                  strokeOpacity={0.8}
                  strokeWidth={1}
                  gridType="polygon"
                />

                <PolarAngleAxis
                  dataKey="subject"
                  tick={({ payload, x, y, cx, cy, ...rest }) => {
                    const angle = Math.atan2(y - cy, x - cx);
                    const radius = Math.sqrt(
                      Math.pow(x - cx, 2) + Math.pow(y - cy, 2)
                    );

                    // Default outward position (unchanged)
                    let newX = cx + ((x - cx) * (radius + 15)) / radius;
                    let newY = cy + ((y - cy) * (radius + 15)) / radius;

                    // Check if label is at top/bottom (vertical position)
                    const isTopOrBottom = Math.abs(y - cy) > Math.abs(x - cx);

                    if (isTopOrBottom) {
                      // Only adjust top/bottom labels
                      newX = cx + 3; // Center horizontally
                      newY = cy + ((y - cy) * (radius + 15)) / radius; // Keep vertical offset
                    }

                    const textAnchor = isTopOrBottom
                      ? "middle"
                      : Math.abs(angle) > Math.PI / 2
                      ? "end"
                      : "start";

                    return (
                      <text
                        x={newX}
                        y={newY}
                        textAnchor={textAnchor}
                        dominantBaseline="middle"
                        fontSize={12}
                        fill="#f3e8ff"
                        fontWeight="500"
                        letterSpacing="0.5px"
                      >
                        {payload.value}
                      </text>
                    );
                  }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 10]}
                  tick={false}
                  axisLine={false}
                />

                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#facc15"
                  strokeWidth={2}
                  fill="#facc15"
                  fillOpacity={0.4}
                  dot={{
                    r: 4,
                    fill: "#facc15",
                    stroke: "#ffffff",
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 6,
                    fill: "#ffffff",
                    stroke: "#facc15",
                    strokeWidth: 2,
                  }}
                />

                <Tooltip
                  wrapperStyle={{
                    zIndex: 100,
                    filter:
                      "drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))",
                  }}
                  contentStyle={{
                    backgroundColor: "#4c1d95",
                    border: "1px solid #facc15",
                    borderRadius: "12px",
                    color: "#fefce8",
                    padding: "12px 16px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    boxShadow:
                      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                  }}
                  labelStyle={{
                    color: "#fefce8",
                    fontWeight: "600",
                    marginBottom: "4px",
                  }}
                  itemStyle={{
                    fontSize: "0.875rem",
                    color: "#facc15",
                    fontWeight: "500",
                  }}
                  separator=": "
                  formatter={(value) => [`${value}/10`, "Score"]}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      {/* Competitive Landscape - Bar Chart */}
      <Card className="bg-gradient-to-br from-blue-700/90 to-indigo-700/90 border-blue-500/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white ">Competitive Landscape</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={analysis.competitorScores?.map((c) => ({
                ...c,
                name:
                  c.name.length > 25
                    ? c.name.slice(0, 22).trimEnd() + "..."
                    : c.name,
              }))}
              margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#60a5fa"
                strokeOpacity={0.5}
              />
              <XAxis
                dataKey="name"
                interval={0}
                tick={({ x, y, payload }) => {
                  const words = payload.value.split(" ");
                  const wordsPerLine = 2; // Show 2 words per line
                  const lineHeight = 12; // Adjust vertical spacing

                  // Group words into lines of 2 words each
                  const lines = [];
                  for (let i = 0; i < words.length; i += wordsPerLine) {
                    const line = words.slice(i, i + wordsPerLine).join(" ");
                    lines.push(line);
                  }

                  return (
                    <g transform={`translate(${x},${y + 10})`}>
                      {lines.map((line, index) => (
                        <text
                          key={index}
                          x={0}
                          y={index * lineHeight}
                          textAnchor="middle"
                          fill="#f0f9ff"
                          fontSize={10}
                        >
                          {line}
                        </text>
                      ))}
                    </g>
                  );
                }}
              />
              <YAxis
                tick={{ fill: "#f0f9ff", fontSize: 12 }}
                stroke="#60a5fa"
                domain={[0, 10]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e3a8a",
                  border: "1px solid #60a5fa",
                  borderRadius: "8px",
                  color: "#f0f9ff",
                }}
              />
              <Bar dataKey="score" fill="#60a5fa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Market Insights Cards */}
      <Card className="lg:col-span-2 bg-gradient-to-br from-gray-700/90 to-slate-700/90 border-gray-500/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Market Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-700/70 p-4 rounded-lg border border-blue-500/70">
              <h4 className="font-semibold text-blue-100 mb-2">Market Size</h4>
              <p className="text-2xl font-bold text-white">
                {analysis.marketInsights.marketSize.value}
              </p>
              <p className="text-sm text-blue-200">
                {analysis.marketInsights.marketSize.detail}
              </p>
              <p className="text-xs text-blue-300 mt-1 italic">
                Source: {analysis.marketInsights.marketSize.source}
              </p>
            </div>
            <div className="bg-green-700/70 p-4 rounded-lg border border-green-500/70">
              <h4 className="font-semibold text-green-100 mb-2">Growth Rate</h4>
              <p className="text-2xl font-bold text-white">
                {analysis.marketInsights.growthRate.value}
              </p>
              <p className="text-sm text-green-200">
                {analysis.marketInsights.growthRate.trend}
              </p>
              <p className="text-xs text-green-300 mt-1 italic">
                Source: {analysis.marketInsights.growthRate.source}
              </p>
            </div>
            <div className="bg-purple-700/70 p-4 rounded-lg border border-purple-500/70">
              <h4 className="font-semibold text-purple-100 mb-2">
                Funding Activity
              </h4>
              <p className="text-2xl font-bold text-white">
                {analysis.marketInsights.fundingActivity.value}
              </p>
              <p className="text-sm text-purple-200">
                {analysis.marketInsights.fundingActivity.last5Years}
              </p>
              <p className="text-xs text-purple-300 mt-1 italic">
                Top Investors:{" "}
                {analysis.marketInsights.fundingActivity.topInvestors}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Charts;
