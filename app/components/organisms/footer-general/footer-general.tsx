import Logo from "../../../assets/images/logo-fundacion-antivirus.png";
import IconWhatsApp from "../../../assets/icons/icon-whatsapp.png";
import IconInstagram from "../../../assets/icons/icon-instagram.png";
import IconYouTube from "../../../assets/icons/icon-youtube.png";
import IconTikTok from "../../../assets/icons/icon-tiktok.png";
import IconLinkedIn from "../../../assets/icons/icon-linkedin.png";
import "./footer-general.css";

export default function FooterGeneral() {
  return (
    <footer
      id="footer-general"
      className="min-h-[380px] bg-[#232E55] px-[40px] lg:px-[150px] py-[20px] lg:py-[50px]"
    >
      <div className="flex flex-col lg:flex-row flex-wrap items-center justify-between gap-y-[20px]">
        <div className="flex flex-col lg:flex-row items-center lg:gap-[86px]">
          <img
            src={Logo}
            alt="Logo Fundación Antivirus"
            className="w-[150px] h-[150px] object-contain"
          />
          <div className="flex flex-col mt-[15px]">
            <span className="text-[20px] font-bold mb-[20px]">Visítanos</span>
            <p>
              Calle 79 Sur # 50-165 <br />- Oficinas 301 y 401 La Estrella -
              Antioquia - Colombia
            </p>
          </div>
        </div>
        <div className="flex flex-col text-center mt-[15px]">
          <h5 className="text-[20px] font-bold mb-[22px]">
            Nuestras redes sociales
          </h5>
          <div className="flex gap-[18px]">
            <img
              src={IconWhatsApp}
              alt="Ícono WhatsApp"
              className="social-icon"
            />
            <img
              src={IconInstagram}
              alt="Ícono Instagram"
              className="social-icon"
            />
            <img
              src={IconYouTube}
              alt="Ícono YouTube"
              className="social-icon"
            />
            <img src={IconTikTok} alt="Ícono TikTok" className="social-icon" />
            <img
              src={IconLinkedIn}
              alt="Ícono LinkedIn"
              className="social-icon"
            />
          </div>
        </div>
      </div>
      <hr className="mt-[55px] mb-[35px]" />
      <div className="text-center text-[20px] font-normal">
        <p>Antivirus para la Deserción © 2025 all rights reserved</p>
      </div>
    </footer>
  );
}
