import IconWompi from "../../../assets/icons/icon-wompi.png";
import IconHeartWhite from "../../../assets/icons/icon-heart-white.png";

export default function ButtonDonateWompi() {
  const handleClick = () =>
    window.open("https://checkout.wompi.co/l/FRfRVa", "_blank");

  return (
    <button
      id="button-donate-wompi"
      className="bg-[#FFBA08] text-[white] fixed right-5 bottom-5 flex items-center gap-[16px] rounded-full"
      onClick={handleClick}
    >
      <img src={IconWompi} alt="Ícono Wompi" />
      <div className="flex mr-[20px]">
        <span className="text-[20px] font-bold">Donar</span>
        <img
          src={IconHeartWhite}
          alt="Ícono Corazón Donar"
          className="w-[28px] h-[28px]"
        />
      </div>
    </button>
  );
}
