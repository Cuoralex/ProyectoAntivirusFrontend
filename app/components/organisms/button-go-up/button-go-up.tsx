import IconGoUp from "../../../assets/icons/icon-go-up.png";

export default function ButtonGoUp() {
  const handleOnClick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      id="button-go-up"
      className="fixed left-5 bottom-5"
      onClick={handleOnClick}
    >
      <img src={IconGoUp} alt="Go Up" className="w-[55px] h-[55px]" />
    </button>
  );
}
