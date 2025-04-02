import { Swiper, SwiperSlide } from "swiper/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa los estilos del carrusel
import HomeBanner from "../assets/images/home-fundacion-antivirus.png";
import { useEffect, useState } from "react";
import {
  getAllInstitutions,
  InstitutionResponse,
} from "~/services/institutions.service";
import { institutionToCardInfoProps } from "~/utils/mappers/institutions.mappers";
import {
  getAllOurServices,
  OurServiceResponse,
} from "~/services/our-services.service";
import { ourServiceResponseToCardInfoProps } from "~/utils/mappers/our-services.mappers";
import NuestroEquipo from "./ourTeam";
import QuienesSomos from "./que-queremos";

export interface CardInfoProps {
  id: number;
  urlImg: string;
  title: string;
  description: string;
}

interface SliderCardInfoProps {
  cards: CardInfoProps[];
}

function CardInfo({ id, urlImg, title, description }: Readonly<CardInfoProps>) {
  return (
    <div
      id={String(id)}
      className="shadow-[0_4px_12px_rgba(0,0,0,0.2)] bg-[white] rounded-[10px] max-w-[450px] py-[25px] px-[35px] flex flex-col items-center text-center my-[40px] mx-[20px]"
    >
      <img
        src={urlImg}
        alt={title}
        className="w-[250px] h-[250px] object-contain rounded-[10px]"
      />
      <h4 className="text-black mt-[18px] mb-[28px] font-bold text-[20px] min-h-[90px]">
        {title}
      </h4>
      <p className="text-black text-justify text-[18px] overflow-hidden text-ellipsis h-[130px]">
        {description}
      </p>
    </div>
  );
}

function SliderCardInfo({ cards }: Readonly<SliderCardInfoProps>) {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      loop
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
    >
      {cards.map((cardInfo: Readonly<CardInfoProps>) => (
        <SwiperSlide key={cardInfo.id}>
          <CardInfo {...cardInfo} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default function Index() {
  const [institutions, setInstitutions] = useState<CardInfoProps[]>([]);
  const [ourServices, setOurServices] = useState<CardInfoProps[]>([]);

  const getAllInitialInfo = async () => {
    const institutionsResponse: InstitutionResponse[] =
      await getAllInstitutions();
    const ourServicesResponse: OurServiceResponse[] = await getAllOurServices();

    setInstitutions(
      institutionsResponse.map((institutionResponse: InstitutionResponse) =>
        institutionToCardInfoProps(institutionResponse)
      )
    );

    setOurServices(
      ourServicesResponse
        .map(ourServiceResponseToCardInfoProps)
        .filter((item): item is CardInfoProps => item !== undefined)
    );
  };

  useEffect(() => {
    getAllInitialInfo();
  }, []);

  return (
    <div id="home">
      <section>
        <img src={HomeBanner} alt="Banner" className="w-full" />
      </section>
      <section
        id="institutions"
        className="bg-[--color-light-blue] p-[20px] lg:p-[110px]"
      >
        <h2 className="text-[black] text-[40px] font-bold text-center">
          Instituciones aliadas
        </h2>
        <div className="mt-[10px] lg:mt-[76px]">
          <SliderCardInfo cards={institutions} />
        </div>
      </section>

      <section id="our-services" className="bg-[white] p-[20px] lg:p-[110px]">
        <h2 className="text-[black] text-[40px] font-bold text-center">
          Nuestros servicios
        </h2>
        <div className="mt-[10px] lg:mt-[76px]">
          <SliderCardInfo cards={ourServices} />
        </div>
      </section>
      <section id="quienes_somos" className="bg-[--color-light-blue] p-[20px] lg:p-[110px]">
          <QuienesSomos />
      </section>
      <section id="our-team" className="bg-[white] p-[20px] lg:p-[110px]">
          <NuestroEquipo />
      </section>
    </div>
  );
}