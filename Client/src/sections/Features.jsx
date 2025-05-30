import FeatureCard from "../components/home/FeatureCard";
import LeftSectionHeadings from "../components/home/LeftSectionHeadings";
import { features } from "../constants";

export default function Features() {
  return (
    <section
      className="pb-0 md:pb-16 px-5 lg:max-w-7xl mx-auto w-11/12"
      id="feature"
    >
      <div className="mt-20 space-y-6">
        {/* Features Header */}
        <LeftSectionHeadings
          subtitle="Features"
          titleLine1="What we"
          highlightedLine2="Offer?"
        />

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 border border-transparent text-left md:text-center">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
