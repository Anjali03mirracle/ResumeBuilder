"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { generateSummary } from "@/lib/actions/gemini.actions";
import { updateResume } from "@/lib/actions/resume.actions";
import { useFormContext } from "@/lib/context/FormProvider";
import { Check, Loader2, Sparkles } from "lucide-react";
import React, { useState } from "react";

interface AiSummaryItem {
  experience_level: string;
  summary: string;
}

const SummaryForm = ({ params }: { params: { id: string } }) => {
  const { formData, handleInputChange } = useFormContext();
  const [summary, setSummary] = useState(formData?.summary || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<AiSummaryItem[]>([]);
  const [selectedAiIndex, setSelectedAiIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSummaryChange = (e: any) => {
    const newSummary = e.target.value;
    setSummary(newSummary);

    handleInputChange({
      target: {
        name: "summary",
        value: newSummary,
      },
    });
  };

  const handleGenerateAiSummary = async () => {
    setIsAiLoading(true);
    setAiSuggestions([]);
    setSelectedAiIndex(null);

    const jobTitle = formData?.jobTitle || "";

    const res = await generateSummary(jobTitle);

    if (res.success && res.data && res.data.length > 0) {
      setAiSuggestions(res.data);
      toast({
        title: "AI Summaries Generated!",
        description: `Generated ${res.data.length} options for ${jobTitle ? `"${jobTitle}"` : "your profile"}. Click one to apply.`,
        className: "bg-white",
      });
    } else {
      toast({
        title: "AI Generation Error",
        description: res.error || "Could not generate summary. Check your API key.",
        variant: "destructive",
        className: "bg-white",
      });
    }

    setIsAiLoading(false);
  };

  const applyAiSummary = (item: AiSummaryItem, index: number) => {
    setSelectedAiIndex(index);
    setSummary(item.summary);
    handleInputChange({
      target: {
        name: "summary",
        value: item.summary,
      },
    });
    toast({
      title: "Summary Applied",
      description: `Applied ${item.experience_level} summary to your resume.`,
      className: "bg-white",
    });
  };

  const onSave = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const result = await updateResume({
      resumeId: params.id,
      updates: {
        summary: formData?.summary,
      },
    });

    if (result.success) {
      toast({
        title: "Information saved.",
        description: "Summary updated successfully.",
        className: "bg-white",
      });
    } else {
      toast({
        title: "Uh Oh! Something went wrong.",
        description: result?.error,
        variant: "destructive",
        className: "bg-white",
      });
    }

    setIsLoading(false);
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary-700 border-t-4 bg-white">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-lg font-semibold leading-none tracking-tight text-slate-900">
              Professional Summary
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Add a compelling summary about your background and expertise
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleGenerateAiSummary}
            disabled={isAiLoading}
            className="border-violet-300 text-violet-700 hover:bg-violet-50 hover:text-violet-800 flex items-center gap-1.5 shadow-sm"
          >
            {isAiLoading ? (
              <>
                <Loader2 size={16} className="animate-spin text-violet-600" />
                <span>Generating AI...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} className="text-violet-600" />
                <span>Generate with AI</span>
              </>
            )}
          </Button>
        </div>

        {/* AI Suggestions Panel */}
        {aiSuggestions.length > 0 && (
          <div className="mt-4 p-4 rounded-xl bg-violet-50/70 border border-violet-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-800 flex items-center gap-1">
                <Sparkles size={14} /> AI Suggestions (Click to apply)
              </span>
              <button
                type="button"
                onClick={() => setAiSuggestions([])}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                Dismiss
              </button>
            </div>

            <div className="space-y-2">
              {aiSuggestions.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => applyAiSummary(item, idx)}
                  className={`p-3 rounded-lg border bg-white cursor-pointer transition text-left hover:border-violet-400 hover:shadow-sm ${
                    selectedAiIndex === idx
                      ? "border-violet-600 ring-2 ring-violet-200"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">
                      {item.experience_level}
                    </span>
                    {selectedAiIndex === idx && (
                      <span className="text-xs text-violet-600 font-medium flex items-center gap-1">
                        <Check size={14} /> Applied
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <form className="mt-5 space-y-2" onSubmit={onSave}>
          <div>
            <label className="text-slate-700 font-semibold text-sm">
              Summary:
            </label>
          </div>

          <Textarea
            className="no-focus min-h-[10em]"
            required
            value={summary}
            onChange={handleSummaryChange}
            placeholder="Write your professional summary or use 'Generate with AI' above..."
          />

          <div className="flex justify-end">
            <Button
              className="mt-3 bg-primary-700 hover:bg-primary-800 text-white"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  &nbsp; Saving
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SummaryForm;
