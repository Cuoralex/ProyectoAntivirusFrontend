interface ButtonProps {
  text?: string;
  textColor?: string;
  backgroundColor?: string;
  borderWidth?: number;
  customClass?: string;
  onClick?: () => void;
}

export default function Button({
  text = "",
  textColor = "black",
  backgroundColor = "white",
  borderWidth = 0,
  customClass = "",
  onClick = () => {},
}: Readonly<ButtonProps>) {
  return (
    <button
      onClick={onClick}
      className={`rounded-[20px] text-[18px] px-4 py-1 ${customClass}`}
      style={{
        backgroundColor,
        color: textColor,
        borderWidth: `${borderWidth}px`,
      }}
    >
      {text}
    </button>
  );
}
