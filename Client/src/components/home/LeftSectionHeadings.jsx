const LeftSectionHeadings = ({ subtitle, titleLine1, highlightedLine2 }) => {
  return (
    <div className="space-y-2">
      <p className="text-custom-black-dark text-sm md:text-xl font-light">
        {subtitle}
      </p>
      <h2 className="text-4xl md:text-5xl font-bold text-custom-black-dark anonymous-font">
        {titleLine1}
        <br />
        <span className="text-custom-text-orange">{highlightedLine2}</span>
      </h2>
    </div>
  );
};

export default LeftSectionHeadings;
