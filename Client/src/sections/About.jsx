import LeftSectionHeadings from "../components/home/LeftSectionHeadings";

export default function About() {
  return (
    <section
      className="pb-0 md:pb-16 px-10 lg:px-5 max-w-7xl mx-auto"
      id="about"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <LeftSectionHeadings
            subtitle="About"
            titleLine1="What is"
            highlightedLine2="Tech Path AI?"
          />

          <p className="text-custom-black-dark text-base md:text-xl leading-relaxed font-light">
            Tech Path AI is your personal career guide — built just for tech
            students in Pakistan. Discover your strengths, explore exciting
            fields like AI, Web Dev, and Game Dev, and build a career roadmap
            that actually makes sense.
          </p>
        </div>

        {/* Right Content - Placeholder for image/illustration */}
        <div className="bg-gray-200 rounded-lg h-80 lg:h-96 flex items-center justify-center">
          <p className="text-gray-500 text-lg"></p>
        </div>
      </div>
    </section>
  );
}
