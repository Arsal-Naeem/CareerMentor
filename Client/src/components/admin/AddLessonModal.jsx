import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { useAddNewLessonAdmin } from "@/apis/skillTracking/lessonTracking/lessonTracking.services";

const AddLessonTabs = ({ open, onClose, moduleId }) => {
  const { mutateAsync: addLesson, isLoading } = useAddNewLessonAdmin(moduleId);

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      isMandatory: true,
      learningPoints: [
        { point: "", subPoints: [{ label: "", description: "" }] },
      ],
      examples: [
        {
          codeSnippet: "",
          description: "",
          descriptionPoints: [{ label: "", description: "" }],
        },
      ],
      resources: [{ type: "Other", url: "" }],
    },
  });

  const {
    fields: learningFields,
    append: addLearningPoint,
    remove: removeLearningPoint,
  } = useFieldArray({ control, name: "learningPoints" });
  const {
    fields: exampleFields,
    append: addExample,
    remove: removeExample,
  } = useFieldArray({ control, name: "examples" });
  const {
    fields: resourceFields,
    append: addResource,
    remove: removeResource,
  } = useFieldArray({ control, name: "resources" });

  const watchLearningPoints = watch("learningPoints");

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data) => {
    try {
      // Clean subPoints
      const cleanedData = {
        ...data,
        learningPoints: data.learningPoints.map((lp) => {
          if (!lp.subPoints || lp.subPoints.length === 0)
            return { ...lp, subPoints: null };

          const validSubPoints = lp.subPoints.filter(
            (sp) => sp.label?.trim() || sp.description?.trim()
          );

          return {
            ...lp,
            subPoints: validSubPoints.length ? validSubPoints : null,
          };
        }),
      };

      //console.log("Submitting New Lesson (Cleaned):", cleanedData);
      await addLesson(cleanedData);
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 bg-white shadow-xl">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Add New Lesson
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <Tabs defaultValue="lessonInfo">
            <TabsList className="mb-4 border-b">
              <TabsTrigger value="lessonInfo">Lesson Info</TabsTrigger>
              <TabsTrigger value="learningPoints">Learning Points</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            {/* ===== Tab 1: Lesson Info ===== */}
            <TabsContent value="lessonInfo" className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Lesson Title
                </label>
                <Input
                  {...register("title")}
                  placeholder="Enter lesson title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Textarea
                  {...register("description")}
                  rows={3}
                  placeholder="Enter lesson description"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </TabsContent>

            {/* ===== Tab 2: Learning Points ===== */}
            <TabsContent value="learningPoints" className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-800">Learning Points</h3>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() =>
                    addLearningPoint({
                      point: "",
                      subPoints: [{ label: "", description: "" }],
                    })
                  }
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Point
                </Button>
              </div>

              {learningFields.map((lp, i) => (
                <div
                  key={lp.id}
                  className="border p-3 rounded-lg bg-white space-y-2"
                >
                  <div className="flex gap-2 items-start">
                    <Input
                      {...register(`learningPoints.${i}.point`)}
                      placeholder={`Learning Point #${i + 1}`}
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => removeLearningPoint(i)}
                      className="text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Subpoints */}
                  <div className="space-y-1">
                    {watchLearningPoints[i]?.subPoints?.map((sp, j) => (
                      <div key={j} className="flex gap-2 items-start">
                        <Input
                          {...register(
                            `learningPoints.${i}.subPoints.${j}.label`
                          )}
                          placeholder="Label"
                          className="w-36"
                        />
                        <Input
                          {...register(
                            `learningPoints.${i}.subPoints.${j}.description`
                          )}
                          placeholder="Description"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            const arr = [...watchLearningPoints[i].subPoints];
                            arr.splice(j, 1);
                            setValue(`learningPoints.${i}.subPoints`, arr);
                          }}
                          className="text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setValue(`learningPoints.${i}.subPoints`, [
                          ...watchLearningPoints[i].subPoints,
                          { label: "", description: "" },
                        ])
                      }
                    >
                      <Plus className="w-4 h-4 mr-1" /> Add Subpoint
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>

            {/* ===== Tab 3: Examples ===== */}
            <TabsContent value="examples" className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-800">Examples</h3>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() =>
                    addExample({ codeSnippet: "", description: "" })
                  }
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Example
                </Button>
              </div>

              {exampleFields.map((ex, i) => {
                const descriptionPoints =
                  watch(`examples.${i}.descriptionPoints`) || [];
                return (
                  <div
                    key={ex.id}
                    className="border p-3 rounded-lg bg-white space-y-2"
                  >
                    <Textarea
                      {...register(`examples.${i}.codeSnippet`)}
                      placeholder="Code Snippet"
                      rows={3}
                    />
                    <Input
                      {...register(`examples.${i}.description`)}
                      placeholder="Description"
                    />

                    {/* Description Points */}
                    <div className="space-y-1 mt-2">
                      {descriptionPoints.map((dp, j) => (
                        <div key={j} className="flex gap-2 items-start">
                          <Input
                            {...register(
                              `examples.${i}.descriptionPoints.${j}.label`
                            )}
                            placeholder="Label"
                            className="w-36"
                          />
                          <Input
                            {...register(
                              `examples.${i}.descriptionPoints.${j}.description`
                            )}
                            placeholder="Description"
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                              const arr = [...descriptionPoints];
                              arr.splice(j, 1);
                              setValue(`examples.${i}.descriptionPoints`, arr);
                            }}
                            className="text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setValue(`examples.${i}.descriptionPoints`, [
                            ...descriptionPoints,
                            { label: "", description: "" },
                          ])
                        }
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Point
                      </Button>
                    </div>

                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => removeExample(i)}
                      className="text-red-500 hover:bg-red-50 mt-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
            </TabsContent>

            {/* ===== Tab 4: Resources ===== */}
            <TabsContent value="resources" className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-800">Resources</h3>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => addResource({ type: "Other", url: "" })}
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Resource
                </Button>
              </div>

              {resourceFields.map((res, i) => (
                <div key={res.id} className="flex gap-2 items-start">
                  <select
                    {...register(`resources.${i}.type`)}
                    className="border rounded-md px-2 py-1 w-36"
                  >
                    <option value="YouTube">YouTube</option>
                    <option value="Udemy">Udemy</option>
                    <option value="W3School">W3School</option>
                    <option value="MDN">MDN</option>
                    <option value="Other">Other</option>
                  </select>
                  <Input
                    {...register(`resources.${i}.url`)}
                    placeholder="Resource URL"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => removeResource(i)}
                    className="text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex justify-end pt-4 border-t">
            <Button
              type="submit"
              className="bg-[#59A4C0] text-white w-full sm:w-auto"
            >
              {isLoading ? "Adding..." : "Add Lesson"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLessonTabs;
