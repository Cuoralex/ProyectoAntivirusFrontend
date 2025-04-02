import IconWompi from "../../../assets/icons/icon-wompi.png";
import IconHeartWhite from "../../../assets/icons/icon-heart-white.png";

export default function ButtonDonateWompi() {
  const handleClick = () =>
    window.open("https://checkout.wompi.co/l/FRfRVa", "_blank");

  return (
    <button
      id="button-donate-wompi"
      className="bg-[#FFBA08] text-white fixed bottom-5 right-5 md:bottom-10 md:right-10 
                 flex items-center gap-2 sm:gap-4 rounded-full p-2 sm:p-3 md:p-4 shadow-lg"
      onClick={handleClick}
    >
      <img
        src={IconWompi}
        alt="Ícono Wompi"
        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
      />
      <div className="flex items-center">
        <span className="text-sm sm:text-lg font-bold">Donar</span>
        <img
          src={IconHeartWhite}
          alt="Ícono Corazón Donar"
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ml-1"
        />
      </div>
    </button>
  );
}
