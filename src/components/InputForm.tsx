
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface InputFormProps {
  onSubmit: (data: {
    name: string;
    category: string;
    description: string;
  }) => void;
  loading: boolean;
}

const InputForm = ({ onSubmit, loading }: InputFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.category && formData.description) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white text-sm font-medium">
            Startup Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your startup name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="bg-white/10 border-white/30 text-white placeholder:text-purple-200 focus:border-purple-400 focus:ring-purple-400/50 transition-all duration-300"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-white text-sm font-medium">
            Category
          </Label>
          <Input
            id="category"
            type="text"
            placeholder="e.g., FinTech, HealthTech, EdTech"
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            className="bg-white/10 border-white/30 text-white placeholder:text-purple-200 focus:border-purple-400 focus:ring-purple-400/50 transition-all duration-300"
            required
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="text-white text-sm font-medium"
          >
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Describe your startup idea, target market, and unique value proposition..."
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="bg-white/10 border-white/30 text-white placeholder:text-purple-200 focus:border-purple-400 focus:ring-purple-400/50 transition-all duration-300 min-h-[120px] resize-none"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={
            loading ||
            !formData.name ||
            !formData.category ||
            !formData.description
          }
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing..." : "Rate My Startup"}
        </Button>
      </form>
    </div>
  );
};

export default InputForm;
