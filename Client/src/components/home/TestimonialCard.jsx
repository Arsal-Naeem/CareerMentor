export default function TestimonialCard({ text, name, image }) {
  return (
    <div
      style={{
        padding: "2px",
        borderRadius: "12px",
        background: "linear-gradient(to right, #F3B34E, #FFD272, #59A4C0)",
        display: "inline-block",
        maxWidth: "400px",
        height: "100%",
      }}
    >
      <div
        className="max-w-md md:max-w-xs bg-white text-black rounded-[10px] p-6 flex flex-col justify-between h-[235px] md:h-[250px]"
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          color: "white",
        }}
      >
        <p className="text-base mb-6 font-light text-custom-black-dark">{`“${text}”`}</p>
        <div className="flex items-center border-t-[0.5px] border-custom-gray-dark text-black pt-4">
          <img
            src={image}
            alt={name}
            className="w-8 h-8 rounded-full mr-3 object-cover"
          />
          <p className="text-sm font-semibold">{name}</p>
        </div>
      </div>
    </div>
  );
}
