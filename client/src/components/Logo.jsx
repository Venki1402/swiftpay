const Logo = ({ size = "medium" }) => {
  const sizeClass =
    {
      small: "text-xl",
      medium: "text-3xl",
      large: "text-5xl",
    }[size] || "text-3xl";

  return (
    <div className={`font-bold ${sizeClass}`}>
      <span className="text-blue-600">Swift</span>
      <span className="text-black">Pay</span>
    </div>
  );
};

export default Logo;
