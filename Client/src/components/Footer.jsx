import { navLinks } from "../constants";

export default function Footer() {
  return (
    <footer className="py-16 w-4/5 mx-auto flex flex-col lg:flex-row justify-between gap-10">
      {/* Left Section */}
      <div className="space-y-4">
        <h2 className="font-normal anonymous-font text-2xl md:text-3xl">
          info@<span className="text-orange-400">careermentor</span>.com
        </h2>
        <p className="font-light text-xs md:text-sm text-custom-gray-dark">
          Subscribe to our newsletter
        </p>
        <div className="flex flex-col md:flex-row md:items-center gap-2 rounded-full">
          <input
            type="email"
            placeholder="yourname@example.com"
            className="text-custom-gray-dark w-full font-light text-xs md:text-sm px-4 py-3 flex-grow outline-none border border-[#C9C9C9] rounded-full"
          />
          <button className="bg-custom-text-orange text-white text-xs md:text-sm px-5 py-2 md:py-3 w-fit rounded-full transition">
            Submit
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 text-sm">
          <h4 className="font-medium text-custom-black-dark">Menu</h4>
          <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-6 text-custom-gray-dark font-normal">
            {navLinks.map((link, index) => (
              <a href={link.href} key={index}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <h4 className="font-medium text-custom-black-dark text-sm">
            Socials
          </h4>
          <div className="flex flex-wrap md:flex-no-wrap gap-2 md:gap-6 text-custom-gray-dark font-normal">
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Linkedin</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
