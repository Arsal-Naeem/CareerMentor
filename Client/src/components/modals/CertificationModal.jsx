import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CertificationFormSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../InputField/InputField";
import { DatePicker } from "../inputs/DatePicker";
import { UploadImage } from "../inputs/UploadImage";

export default function CertificationModal({
  mode = "add",
  initialData,
  onSubmit,
  open,
  setOpen,
}) {
  const { control, reset, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      organization: "",
      description: "",
      issueDate: null,
      certificateImage: null,
      certificationImagePreview: null,
    },
    mode: "all",
    resolver: yupResolver(CertificationFormSchema),
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || "",
        organization: initialData.organization || "",
        description: initialData.description || "",
        issueDate: initialData.issueDate || null,
        certificateImage: initialData.certificateImage || null,
        certificationImagePreview: null,
      });
    }
  }, [initialData]);

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] flex flex-col">
        <DialogHeader className="px-2">
          <DialogTitle>
            {mode === "edit" ? "Edit certification" : "Add certification"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="flex flex-col gap-4 h-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 overflow-y-auto h-96 px-2">
            <InputField
              name="name"
              label="Certification Name"
              control={control}
              placeholder="AWS Certified Solutions Architect"
              labelClassName="!font-medium"
              showAsterisk
              inputWrapperClassName="lg:col-span-1"
            />

            <InputField
              name="issueDate"
              label="Certification Issue Date"
              component={DatePicker}
              control={control}
              placeholder="Enter the date of issue"
              labelClassName="!font-medium"
              inputWrapperClassName="lg:col-span-1"
              showAsterisk
            />

            <InputField
              name="description"
              label="Certification Description"
              control={control}
              placeholder="Description of the certification"
              labelClassName="!font-medium"
              inputWrapperClassName="lg:col-span-2"
              isTextArea
            />

            <InputField
              name="certificateImage"
              label="Cover Image"
              component={UploadImage}
              control={control}
              preview={watch("certificateImagePreview")}
              setValue={setValue}
              labelClassName="!font-medium"
              uploaderClassName="!border-custom-black !text-custom-black"
              showAsterisk
              inputWrapperClassName="lg:col-span-2"
            />
          </div>

          <Button type="submit" className="w-full col-span-2 mb-6">
            {mode === "edit" ? "Update Certification" : "Save Certification"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
