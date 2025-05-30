export default function FeatureCard({ title, description }) {
  return (
    <div
      className="text-left pr-4 text-custom-black-dark 
        border-b border-[#252525] 
        md:border-b-0 
        md:border-r md:border-r-[#252525] 
        last:border-b-0 
        md:[&:nth-child(3n)]:border-r-0"
    >
      <div className="pb-4 md:pb-0">
        <h3 className="text-xl md:text-3xl font-bold mb-2 anonymous-font">
          {title}
        </h3>
        <p className="text-sm md:text-base font-light">{description}</p>
      </div>
    </div>
  );
}
