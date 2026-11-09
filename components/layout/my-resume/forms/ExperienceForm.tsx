"use client";

import RichTextEditor from "@/components/common/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { generateExperienceDescription } from "@/lib/actions/gemini.actions";
import { addExperienceToResume } from "@/lib/actions/resume.actions";
import { useFormContext } from "@/lib/context/FormProvider";
import { Check, Loader2, Minus, Plus, Sparkles } from "lucide-react";
import React, { useState } from "react";

interface AiExpItem {
  activity_level: string;
  description: string;
}

const ExperienceForm = ({ params }: { params: { id: string } }) => {
  const { formData, handleInputChange } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const [aiLoadingIndex, setAiLoadingIndex] = useState<number | null>(null);
  const [aiSuggestionsMap, setAiSuggestionsMap] = useState<{ [key: number]: AiExpItem[] }>({});

  const [experienceList, setExperienceList] = useState(
    formData?.experience?.length > 0
      ? formData?.experience
      : [
          {
            title: "",
            companyName: "",
            city: "",
            state: "",
            startDate: "",
            endDate: "",
            workSummary: "",
          },
        ]
  );

  const { toast } = useToast();

  const handleChange = (index: number, event: any) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);

    handleInputChange({
      target: {
        name: "experience",
        value: newEntries,
      },
    });
  };

  const handleWorkSummaryChange = (index: number, htmlValue: string) => {
    const newEntries = experienceList.slice();
    newEntries[index].workSummary = htmlValue;
    setExperienceList(newEntries);

    handleInputChange({
      target: {
        name: "experience",
        value: newEntries,
      },
    });
  };

  const AddNewExperience = () => {
    const newEntries = [
      ...experienceList,
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummary: "",
      },
    ];
    setExperienceList(newEntries);

    handleInputChange({
      target: {
        name: "experience",
        value: newEntries,
      },
    });
  };

  const RemoveExperience = () => {
    if (experienceList.length <= 1) return;
    const newEntries = experienceList.slice(0, -1);
    setExperienceList(newEntries);

    handleInputChange({
      target: {
        name: "experience",
        value: newEntries,
      },
    });
  };

  const generateExperienceDescriptionFromAI = async (index: number) => {
    const currentExp = experienceList[index];
    const roleInfo = currentExp?.title
      ? `${currentExp.title}${currentExp?.companyName ? ` at ${currentExp.companyName}` : ""}`
      : "";

    if (!roleInfo || roleInfo.trim() === "") {
      toast({
        title: "Position Title Required",
        description: "Please enter the Position Title (e.g. Frontend Developer) first to generate points with AI.",
        variant: "destructive",
        className: "bg-white border-2",
      });
      return;
    }

    setAiLoadingIndex(index);

    const res = await generateExperienceDescription(roleInfo);

    if (res.success && res.data && res.data.length > 0) {
      setAiSuggestionsMap((prev) => ({ ...prev, [index]: res.data }));
      toast({
        title: "AI Experience Points Ready!",
        description: "Choose an option below to apply it to your work summary.",
        className: "bg-white",
      });
    } else {
      toast({
        title: "AI Generation Error",
        description: res.error || "Could not generate bullet points.",
        variant: "destructive",
        className: "bg-white",
      });
    }

    setAiLoadingIndex(null);
  };

  const applyAiExp = (index: number, html: string) => {
    handleWorkSummaryChange(index, html);
    setAiSuggestionsMap((prev) => {
      const copy = { ...prev };
      delete copy[index];
      return copy;
    });
    toast({
      title: "Bullet Points Applied",
      description: "Updated your work summary with AI-crafted bullet points.",
      className: "bg-white",
    });
  };

  const onSave = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const result = await addExperienceToResume(params.id, formData.experience);

    if (result.success) {
      toast({
        title: "Information saved.",
        description: "Professional experience updated successfully.",
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
          Professional Experience
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Add your previous roles, achievements, and impact
        </p>

        <div className="mt-5">
          {experienceList.map((item: any, index: number) => (
            <div key={index} className="border p-4 my-5 rounded-xl bg-slate-50/50 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-slate-700 font-semibold text-sm">
                    Position Title:
                  </label>
                  <Input
                    name="title"
                    placeholder="e.g. Software Engineer"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.title}
                    className="no-focus bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-700 font-semibold text-sm">
                    Company Name:
                  </label>
                  <Input
                    name="companyName"
                    placeholder="e.g. Google, Infosys"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.companyName}
                    className="no-focus bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-700 font-semibold text-sm">
                    City:
                  </label>
                  <Input
                    name="city"
                    placeholder="e.g. San Francisco"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.city}
                    className="no-focus bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-700 font-semibold text-sm">
                    State:
                  </label>
                  <Input
                    name="state"
                    placeholder="e.g. California"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.state}
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
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.startDate}
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
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.endDate}
                    className="no-focus bg-white"
                  />
                </div>
              </div>

              {/* Work Summary Header with AI Button */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <label className="text-slate-700 font-semibold text-sm">
                    Work Summary & Achievements:
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => generateExperienceDescriptionFromAI(index)}
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

                {/* AI Suggestions Dropdown for this card */}
                {aiSuggestionsMap[index] && (
                  <div className="p-3 bg-violet-50 border border-violet-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-violet-800 uppercase tracking-wider flex items-center gap-1">
                        <Sparkles size={13} /> Select AI Bullet Points Style:
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
                          onClick={() => applyAiExp(index, opt.description)}
                          className="p-3 bg-white rounded-lg border border-slate-200 hover:border-violet-500 cursor-pointer transition text-left"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">
                              {opt.activity_level}
                            </span>
                            <span className="text-xs text-violet-600 font-medium">Click to use</span>
                          </div>
                          <div
                            className="text-xs text-slate-700 prose prose-sm max-w-none pl-3"
                            dangerouslySetInnerHTML={{ __html: opt.description }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <RichTextEditor
                  defaultValue={item?.workSummary || ""}
                  onRichTextEditorChange={(event: any) =>
                    handleChange(index, event)
                  }
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
              onClick={AddNewExperience}
              className="text-primary"
            >
              <Plus className="size-4 mr-1.5" /> Add Role
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={RemoveExperience}
              disabled={experienceList.length <= 1}
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

export default ExperienceForm;
