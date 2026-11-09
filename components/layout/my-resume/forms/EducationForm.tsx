"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { generateEducationDescription } from "@/lib/actions/gemini.actions";
import { addEducationToResume } from "@/lib/actions/resume.actions";
import { useFormContext } from "@/lib/context/FormProvider";
import { Check, Loader2, Minus, Plus, Sparkles } from "lucide-react";
import React, { useState } from "react";

interface AiEduItem {
  level: string;
  description: string;
}

const EducationForm = ({ params }: { params: { id: string } }) => {
  const { formData, handleInputChange } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const [aiLoadingIndex, setAiLoadingIndex] = useState<number | null>(null);
  const [aiSuggestionsMap, setAiSuggestionsMap] = useState<{ [key: number]: AiEduItem[] }>({});

  const [educationList, setEducationList] = useState(
    formData?.education?.length > 0
      ? formData.education
      : [
          {
            universityName: "",
            degree: "",
            major: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ]
  );

  const { toast } = useToast();

  const handleChange = (event: any, index: number) => {
    const newEntries = educationList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);

    handleInputChange({
      target: {
        name: "education",
        value: newEntries,
      },
    });
  };

  const AddNewEducation = () => {
    const newEntries = [
      ...educationList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ];

    setEducationList(newEntries);

    handleInputChange({
      target: {
        name: "education",
        value: newEntries,
      },
    });
  };

  const RemoveEducation = () => {
    if (educationList.length <= 1) return;
    const newEntries = educationList.slice(0, -1);

    setEducationList(newEntries);

    handleInputChange({
      target: {
        name: "education",
        value: newEntries,
      },
    });
  };

  const handleGenerateAiEducation = async (index: number) => {
    const currentEdu = educationList[index];
    const eduInfo = `${currentEdu.degree || ""} ${currentEdu.major || ""} at ${currentEdu.universityName || ""}`.trim();

    if (!eduInfo || eduInfo === "at") {
      toast({
        title: "Education Info Required",
        description: "Please enter your University Name, Degree, or Major first.",
        variant: "destructive",
        className: "bg-white",
      });
      return;
    }

    setAiLoadingIndex(index);

    const res = await generateEducationDescription(eduInfo);

    if (res.success && res.data && res.data.length > 0) {
      setAiSuggestionsMap((prev) => ({ ...prev, [index]: res.data }));
      toast({
        title: "AI Highlights Ready!",
        description: "Click an option below to apply it.",
        className: "bg-white",
      });
    } else {
      toast({
        title: "AI Generation Error",
        description: res.error || "Could not generate education highlights.",
        variant: "destructive",
        className: "bg-white",
      });
    }

    setAiLoadingIndex(null);
  };

  const applyAiEdu = (index: number, desc: string) => {
    const newEntries = educationList.slice();
    newEntries[index].description = desc;
    setEducationList(newEntries);

    handleInputChange({
      target: {
        name: "education",
        value: newEntries,
      },
    });

    setAiSuggestionsMap((prev) => {
      const copy = { ...prev };
      delete copy[index];
      return copy;
    });

    toast({
      title: "Description Applied",
      description: "Updated your education highlights.",
      className: "bg-white",
    });
  };

  const onSave = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const result = await addEducationToResume(
      params.id,
      formData.education
    );

    if (result.success) {
      toast({
        title: "Information saved.",
        description: "Education history updated successfully.",
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
        <h2 className="text-lg font-semibold leading-none tracking-tight text-slate-900">
          Education History
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Add your degrees, universities, and academic accomplishments
        </p>

        <div className="mt-5 space-y-4">
          {educationList.map((item: any, index: number) => (
            <div key={index} className="border p-4 rounded-xl bg-slate-50/50 space-y-3">
              <div className="space-y-1.5">
                <label className="text-slate-700 font-semibold text-sm">
                  University / College Name:
                </label>
                <Input
                  name="universityName"
                  placeholder="e.g. Stanford University"
                  onChange={(event) => handleChange(event, index)}
                  value={item?.universityName || ""}
                  className="no-focus bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-slate-700 font-semibold text-sm">
                    Degree:
                  </label>
                  <Input
                    name="degree"
                    placeholder="e.g. Bachelor of Technology"
                    onChange={(event) => handleChange(event, index)}
                    value={item?.degree || ""}
                    className="no-focus bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-700 font-semibold text-sm">
                    Major / Field of Study:
                  </label>
                  <Input
                    name="major"
                    placeholder="e.g. Computer Science"
                    onChange={(event) => handleChange(event, index)}
                    value={item?.major || ""}
                    className="no-focus bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-700 font-semibold text-sm">
                    Start Date:
                  </label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(event) => handleChange(event, index)}
                    value={item?.startDate || ""}
                    className="no-focus bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-700 font-semibold text-sm">
                    End Date:
                  </label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(event) => handleChange(event, index)}
                    value={item?.endDate || ""}
                    className="no-focus bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <label className="text-slate-700 font-semibold text-sm">
                    Key Highlights & Activities:
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleGenerateAiEducation(index)}
                    disabled={aiLoadingIndex === index}
                    className="border-violet-300 text-violet-700 hover:bg-violet-50 text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    {aiLoadingIndex === index ? (
                      <>
                        <Loader2 size={14} className="animate-spin text-violet-600" />
                        <span>Generating AI...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} className="text-violet-600" />
                        <span>Generate with AI</span>
                      </>
                    )}
                  </Button>
                </div>

                {/* AI Suggestions for Education */}
                {aiSuggestionsMap[index] && (
                  <div className="p-3 bg-violet-50 border border-violet-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-violet-800 uppercase tracking-wider flex items-center gap-1">
                        <Sparkles size={13} /> Select AI Highlight:
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const copy = { ...aiSuggestionsMap };
                          delete copy[index];
                          setAiSuggestionsMap(copy);
                        }}
                        className="text-xs text-slate-500 hover:text-slate-800"
                      >
                        Dismiss
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {aiSuggestionsMap[index].map((opt, optIdx) => (
                        <div
                          key={optIdx}
                          onClick={() => applyAiEdu(index, opt.description)}
                          className="p-3 bg-white rounded-lg border border-slate-200 hover:border-violet-500 cursor-pointer transition text-left"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">
                              {opt.level}
                            </span>
                            <span className="text-xs text-violet-600 font-medium">Click to use</span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed">
                            {opt.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Textarea
                  name="description"
                  placeholder="Relevant coursework, honors, or leadership activities..."
                  onChange={(event) => handleChange(event, index)}
                  value={item?.description || ""}
                  className="no-focus bg-white min-h-[5em]"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2 justify-between flex-wrap">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={AddNewEducation}
              className="text-primary"
            >
              <Plus className="size-4 mr-1.5" /> Add Degree
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={RemoveEducation}
              disabled={educationList.length <= 1}
              className="text-slate-600"
            >
              <Minus className="size-4 mr-1.5" /> Remove
            </Button>
          </div>
          <Button
            disabled={isLoading}
            onClick={onSave}
            className="bg-primary-700 hover:bg-primary-800 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Saving
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EducationForm;
