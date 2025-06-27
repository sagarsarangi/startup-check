import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "@/components/InputForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, Lightbulb, BarChart3 } from "lucide-react";
import { analyzeWithOpenRouter } from "@/lib/openrouter";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (loading) {
        e.preventDefault();
        e.returnValue = ""; // This triggers the browser's confirm dialog
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [loading]);


  const handleFormSubmit = async (data: typeof formData) => {
    try {
      setLoading(true); // ✅ lock UI
      localStorage.setItem("startupData", JSON.stringify(data));
      localStorage.setItem("analysisLoading", "true");

      const result = await analyzeWithOpenRouter(data);
      localStorage.setItem("analysisResult", JSON.stringify(result));
      localStorage.removeItem("analysisLoading");

      navigate("/home");
    } catch (err) {
      console.error("Analysis error:", err);
      alert("Something went wrong. Please try again.");
      setLoading(false); // ✅ unlock UI if failed
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 p-4 pb-9 pt-0">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 space-y-4 pt-8">
          <div className="bg-amber-900/30 border border-amber-700/50 rounded-lg p-4 mb-6 opacity-0 animate-fade-in [animation-delay:100ms] [animation-fill-mode:forwards]">
            <p className="text-amber-200 text-sm">
              <span className="font-semibold">Note:</span> Our AI analysis is in
              experimental stages. If you encounter any errors, please keep
              trying - it typically works within 4-5 attempts and provides
              accurate results.
            </p>
          </div>
          <h1 className="text-4xl font-bold text-white opacity-0 animate-fade-in [animation-delay:200ms] [animation-fill-mode:forwards]">
            Rate My Startup
          </h1>
          <p className="text-purple-200 text-lg opacity-0 animate-fade-in [animation-delay:400ms] [animation-fill-mode:forwards]">
            Get comprehensive insights on your startup idea
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Form Card */}
          <div className="lg:col-span-2 opacity-0 animate-fade-in [animation-delay:600ms] [animation-fill-mode:forwards]">
            <InputForm onSubmit={handleFormSubmit} loading={loading} />
          </div>

          {/* Features Card */}
          <div className="space-y-4 opacity-0 animate-fade-in [animation-delay:800ms] [animation-fill-mode:forwards]">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <TrendingUp className="text-purple-300" size={20} />
                  What You'll Get
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-purple-100">
                      Overall startup score and rating
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-purple-100">
                      Market potential analysis
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-purple-100">
                      Competitive landscape insights
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-purple-100">
                      Actionable recommendations
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <BarChart3 className="text-blue-300" size={20} />
                  Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-purple-100">
                      Performance radar charts
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-purple-100">
                      Market size estimations
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-purple-100">Growth projections</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Stats Cards - Enhanced with better colors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-0 animate-fade-in [animation-delay:1000ms] [animation-fill-mode:forwards]">
          <Card className="bg-gradient-to-br from-blue-600/80 to-indigo-700/80 border-blue-400/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Target className="mx-auto mb-2 text-blue-200" size={24} />
              <h3 className="text-white font-semibold">Market Analysis</h3>
              <p className="text-blue-100 text-sm">
                Deep dive into your target market
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600/80 to-emerald-700/80 border-green-400/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Lightbulb className="mx-auto mb-2 text-green-200" size={24} />
              <h3 className="text-white font-semibold">Innovation Score</h3>
              <p className="text-green-100 text-sm">
                Measure your unique value proposition
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600/80 to-violet-700/80 border-purple-400/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <TrendingUp className="mx-auto mb-2 text-purple-200" size={24} />
              <h3 className="text-white font-semibold">Growth Potential</h3>
              <p className="text-purple-100 text-sm">
                Assess scalability and opportunities
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
