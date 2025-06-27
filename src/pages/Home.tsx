import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ResultPanel from "@/components/ResultPanel";
import Charts from "@/components/Charts";

interface StartupData {
  name: string;
  category: string;
  description: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [startupData, setStartupData] = useState<StartupData | null>(null);

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedData = localStorage.getItem("startupData");
    const savedResult = localStorage.getItem("analysisResult");

    if (savedData && savedResult) {
      setStartupData(JSON.parse(savedData));
      const parsed = JSON.parse(savedResult);
      setTimeout(() => {
        setAnalysis(parsed);
        setLoading(false);
      }, 300); // optional delay
    } else {
      navigate("/");
    }
  }, [navigate]);
  

  if (!startupData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-purple-100 mb-4 text-lg">No startup data found</p>
          <Button
            onClick={() => navigate("/")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-purple-900">
        Generating analysis...
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-red-900">
        Error generating analysis. Try again.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-purple-100 hover:text-white hover:bg-purple-800/50"
          >
            <ArrowLeft size={20} />
            Back to Form
          </Button>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2 animate-fade-in">
              Analysis Results for "{startupData.name}"
            </h1>
            <p className="text-purple-100 text-lg animate-fade-in [animation-delay:200ms] [animation-fill-mode:forwards] opacity-0">
              Category: {startupData.category}
            </p>
          </div>

          <div className="animate-fade-in [animation-delay:400ms] [animation-fill-mode:forwards] opacity-0">
            <ResultPanel analysis={analysis} />
          </div>

          <div className="animate-fade-in [animation-delay:600ms] [animation-fill-mode:forwards] opacity-0">
            <Charts analysis={analysis} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
