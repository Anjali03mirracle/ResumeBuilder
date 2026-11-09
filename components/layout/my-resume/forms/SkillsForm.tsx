"use client";

import { useState } from "react";
import { useFormContext } from "@/lib/context/FormProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Loader2, Minus, Plus, Sparkles } from "lucide-react";
import { addSkillToResume } from "@/lib/actions/resume.actions";
import { generateSkills } from "@/lib/actions/gemini.actions";
import { useToast } from "@/components/ui/use-toast";

const SkillsForm = ({ params }: { params: { id: string } }) => {
  const { formData, handleInputChange } = useFormContext();

  const [skillsList, setSkillsList] = useState(
    formData?.skills?.length > 0
      ? formData.skills
      : [
          {
            name: "",
          },
        ]
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const { toast } = useToast();

  const handleChange = (
    index: number,
    name: string,
    value: string
  ) => {
    const newSkillsList = [...skillsList];
    newSkillsList[index][name] = value;

    setSkillsList(newSkillsList);

    handleInputChange({
      target: {
        name: "skills",
        value: newSkillsList,
      },
    });
  };

  const AddNewSkills = () => {
    const newSkillsList = [
      ...skillsList,
      {
        name: "",
      },
    ];

    setSkillsList(newSkillsList);

    handleInputChange({
      target: {
        name: "skills",
        value: newSkillsList,
      },
    });
  };

  const RemoveSkills = () => {
    if (skillsList.length <= 1) return;
    const newSkillsList = skillsList.slice(0, -1);

    setSkillsList(newSkillsList);

    handleInputChange({
      target: {
        name: "skills",
        value: newSkillsList,
      },
    });
  };

  const handleSuggestSkills = async () => {
    setIsAiLoading(true);
    const jobTitle = formData?.jobTitle || "";

    const res = await generateSkills(jobTitle);

    if (res.success && res.data && res.data.length > 0) {
      setAiSuggestions(res.data);
      toast({
        title: "Skills Suggested!",
        description: `Generated recommendations for ${jobTitle ? `"${jobTitle}"` : "your profile"}. Click any skill to add it.`,
        className: "bg-white",
      });
    } else {
      toast({
        title: "AI Generation Error",
        description: res.error || "Could not generate skills suggestions.",
        variant: "destructive",
        className: "bg-white",
      });
    }

    setIsAiLoading(false);
  };

  const addAiSkill = (skillName: string) => {
    // Check if already in list
    const exists = skillsList.some(
      (s: any) => s.name?.toLowerCase().trim() === skillName.toLowerCase().trim()
    );

    if (exists) {
      toast({
        title: "Skill already added",
        description: `"${skillName}" is already in your skills list.`,
        className: "bg-white",
      });
      return;
    }

    // Fill empty first item if available
    let updatedList;
    if (skillsList.length === 1 && (!skillsList[0].name || skillsList[0].name.trim() === "")) {
      updatedList = [{ name: skillName }];
    } else {
      updatedList = [...skillsList, { name: skillName }];
    }

    setSkillsList(updatedList);
    handleInputChange({
      target: {
        name: "skills",
        value: updatedList,
      },
    });

    toast({
      title: "Skill Added",
      description: `Added "${skillName}" to your resume skills.`,
      className: "bg-white",
    });
  };

  const onSave = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const result = await addSkillToResume(params.id, formData.skills);

    if (result.success) {
      toast({
        title: "Information saved.",
        description: "Skills updated successfully.",
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
              Skills
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Add your technical, domain, and soft skills
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSuggestSkills}
            disabled={isAiLoading}
            className="border-violet-300 text-violet-700 hover:bg-violet-50 text-xs flex items-center gap-1.5 shadow-sm"
          >
            {isAiLoading ? (
              <>
                <Loader2 size={14} className="animate-spin text-violet-600" />
                <span>Suggesting AI...</span>
              </>
            ) : (
              <>
                <Sparkles size={14} className="text-violet-600" />
                <span>Suggest Skills with AI</span>
              </>
            )}
          </Button>
        </div>

        {/* AI Skill Suggestions Pills */}
        {aiSuggestions.length > 0 && (
          <div className="mt-4 p-4 rounded-xl bg-violet-50/70 border border-violet-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-800 flex items-center gap-1">
                <Sparkles size={13} /> Click to add to your skills:
              </span>
              <button
                type="button"
                onClick={() => setAiSuggestions([])}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                Dismiss
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {aiSuggestions.map((skill, idx) => {
                const isAdded = skillsList.some(
                  (s: any) => s.name?.toLowerCase().trim() === skill.toLowerCase().trim()
                );
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => addAiSkill(skill)}
                    disabled={isAdded}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition ${
                      isAdded
                        ? "bg-emerald-100 text-emerald-800 cursor-default"
                        : "bg-white text-slate-700 border border-violet-200 hover:bg-violet-600 hover:text-white hover:border-violet-600 shadow-sm"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check size={12} className="text-emerald-700" />
                        <span>{skill}</span>
                      </>
                    ) : (
                      <>
                        <Plus size={12} />
                        <span>{skill}</span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-5 space-y-3">
          {skillsList.map((item: any, index: number) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 border rounded-xl bg-slate-50/50"
            >
              <span className="text-xs font-semibold text-slate-400 w-6 text-center">
                #{index + 1}
              </span>
              <div className="flex-1 space-y-1">
                <Input
                  name="name"
                  placeholder="e.g. React.js, Python, Project Management"
                  onChange={(event) =>
                    handleChange(index, "name", event.target.value)
                  }
                  value={item?.name || ""}
                  className="no-focus bg-white"
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
              onClick={AddNewSkills}
              className="text-primary"
            >
              <Plus className="size-4 mr-1.5" /> Add More
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={RemoveSkills}
              disabled={skillsList.length <= 1}
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

export default SkillsForm;
