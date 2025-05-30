import LeftSectionHeadings from "../components/home/LeftSectionHeadings";
import TestimonialCard from "../components/home/TestimonialCard";
import { testimonials } from "../constants";

export default function TestimonialsSection() {
  return (
    <section
      className="pb-0 md:pb-16 px-5 w-11/12 lg:max-w-7xl mx-auto flex flex-col gap-4 pt-20"
      id="testimonials"
    >
      <LeftSectionHeadings
        subtitle="Testimonials"
        titleLine1="Real Stories"
        highlightedLine2="Real Growth."
      />

      <div className="flex flex-col sm:flex-row sm:overflow-x-auto scrollbar-hide gap-3 w-full">
        {testimonials.map((t, i) => (
          <div key={i} className="min-w-[300px] sm:w-[350px] flex-shrink-0">
            <TestimonialCard
              text={t.text}
              name={t.name}
              image={t.image}
              borderColor={t.borderColor}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
