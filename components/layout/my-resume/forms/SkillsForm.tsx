"use client";

import { useState } from "react";
import { useFormContext } from "@/lib/context/FormProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Minus, Plus } from "lucide-react";
import { addSkillToResume } from "@/lib/actions/resume.actions";
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
        <div>
          <h2 className="text-lg font-semibold leading-none tracking-tight text-slate-900">
            Skills
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Add your technical, domain, and professional skills
          </p>
        </div>

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
