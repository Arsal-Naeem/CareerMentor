import { Link } from "react-router-dom";

export default function BackButton({ className }) {
  return (
    <Link
      to=""
      className={
        className +
        "text-base font-light w-24 flex items-center justify-center border border-custom-black-dark rounded-full"
      }
    >
      Back
    </Link>
  );
}
