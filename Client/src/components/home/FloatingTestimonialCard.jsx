export default function FloatingTestimonialCard({
  position,
  imageSrc,
  imageAlt,
  text,
  avatarBgColor = "bg-blue-100",
  textSize = "text-sm",
  textColor = "text-gray-600",
  borderColor = "border-gray-300",
  showBackground = true,
  maxWidth = "max-w-sm",
}) {
  return (
    <div className={`absolute ${position} hidden lg:block`}>
      <div
        className={`${
          showBackground ? "bg-white" : ""
        } rounded-full py-3 px-6 shadow-sm border-2 border-dashed ${borderColor} flex items-center gap-3 ${maxWidth}`}
      >
        <div
          className={`w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ${avatarBgColor}`}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-left">
          <p
            className={`${textSize} ${textColor} font-normal leading-relaxed whitespace-nowrap`}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
