import LeftSectionHeadings from "../components/home/LeftSectionHeadings";
import { stepsData } from "../constants";

export default function Steps() {
  return (
    <section
      className="pb-0 md:pb-16 px-10 lg:px-5 max-w-7xl mx-auto"
      id="steps"
    >
      <div className="mt-20 space-y-6">
        <LeftSectionHeadings
          subtitle="Steps"
          titleLine1="How it"
          highlightedLine2="Works?"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
          {stepsData.map((step, index) => (
            <div
              className="rounded-lg p-6 py-6 md:py-9 space-y-4 text-custom-black-dark"
              style={{
                background:
                  "linear-gradient(107deg, rgba(243, 179, 78, 0.20) 0%, rgba(255, 210, 114, 0.20) 50%, rgba(89, 164, 192, 0.20) 100%)",
              }}
              key={index}
            >
              <h3 className="font-bold anonymous-font md:text-3xl text-xl">
                {step.heading}
              </h3>
              <p className="font-light md:text-base leading-relaxed text-sm">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
