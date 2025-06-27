import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Lightbulb, AlertCircle } from "lucide-react";

interface Analysis {
  overallScore: number;
  marketPotential: number;
  innovation: number;
  feasibility: number;
  strengths: string[];
  concerns: string[];
  recommendations: string[];
}

interface ResultPanelProps {
  analysis: Analysis;
}

const ResultPanel = ({ analysis }: ResultPanelProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Overall Score */}
      <Card className="bg-gradient-to-br from-blue-700/90 to-indigo-700/90 border-blue-500/70 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">
            Overall Score
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-blue-200" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white">
            {analysis.overallScore}/10
          </div>
          <p className="text-xs text-blue-200 mt-1">Overall potential</p>
        </CardContent>
      </Card>

      {/* Market Potential */}
      <Card className="bg-gradient-to-br from-green-700/90 to-emerald-700/90 border-green-500/70 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">
            Market Potential
          </CardTitle>
          <Target className="h-4 w-4 text-green-200" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white">
            {analysis.marketPotential}/10
          </div>
          <p className="text-xs text-green-200 mt-1">Market opportunity</p>
        </CardContent>
      </Card>

      {/* Innovation */}
      <Card className="bg-gradient-to-br from-purple-700/90 to-violet-700/90 border-purple-500/70 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">
            Innovation
          </CardTitle>
          <Lightbulb className="h-4 w-4 text-purple-200" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white">
            {analysis.innovation}/10
          </div>
          <p className="text-xs text-purple-200 mt-1">
            Unique value proposition
          </p>
        </CardContent>
      </Card>

      {/* Strengths */}
      <Card className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-green-700/80 to-emerald-700/80 border-green-500/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp size={18} />
            Strengths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {analysis.strengths.map((s, i) => (
              <Badge
                key={i}
                className="bg-green-600/80 text-green-100 border-green-400/70"
              >
                {s}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Concerns */}
      <Card className="bg-gradient-to-br from-orange-700/80 to-red-700/80 border-orange-500/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertCircle size={18} />
            Areas of Concern
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {analysis.concerns.map((c, i) => (
              <Badge
                key={i}
                className="bg-orange-600/80 text-orange-100 border-orange-400/70"
              >
                {c}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-gradient-to-br from-blue-700/80 to-indigo-700/80 border-blue-500/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Lightbulb size={18} />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {analysis.recommendations.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-white">
                <div className="w-1.5 h-1.5 bg-blue-300 rounded-full mt-2 flex-shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultPanel;
