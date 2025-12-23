export default function ShowError({ message = "" }) {
  return <p className="text-red-500 text-sm">{message}</p>;
}
