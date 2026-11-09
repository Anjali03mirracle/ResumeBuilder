"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { updateResume } from "@/lib/actions/resume.actions";
import { useFormContext } from "@/lib/context/FormProvider";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

const SummaryForm = ({ params }: { params: { id: string } }) => {
  const { formData, handleInputChange } = useFormContext();
  const [summary, setSummary] = useState(formData?.summary || "");
  const [isLoading, setIsLoading] = useState(false);
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
        <div>
          <h2 className="text-lg font-semibold leading-none tracking-tight text-slate-900">
            Professional Summary
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Add a compelling summary about your background and expertise
          </p>
        </div>

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
            placeholder="Write a concise overview of your background, key strengths, and career highlights..."
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
