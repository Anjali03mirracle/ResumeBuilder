"use client";

import RichTextEditor from "@/components/common/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addExperienceToResume } from "@/lib/actions/resume.actions";
import { useFormContext } from "@/lib/context/FormProvider";
import { Loader2, Minus, Plus } from "lucide-react";
import React, { useState } from "react";

const ExperienceForm = ({ params }: { params: { id: string } }) => {
  const { formData, handleInputChange } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);

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
          Add your previous roles, responsibilities, and achievements
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

              <div className="space-y-2 pt-2 border-t border-slate-200">
                <label className="text-slate-700 font-semibold text-sm">
                  Work Summary & Achievements:
                </label>

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
