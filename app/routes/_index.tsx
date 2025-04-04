import { Swiper, SwiperSlide } from "swiper/react";
import ContactForm from "~/components/molecules/ContactForm";
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

export interface CardInfoProps {
  id: number;
  urlImg: string;
  title: string;
  description?: string;
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
        className="w-[250px] h-[250px] object-cover rounded-[10px]"
      />
      <h4 className="text-black mt-[18px] mb-[28px] font-bold text-[20px] min-h-[90px]">
        {title}
      </h4>
      <p className="text-black text-center text-[18px] overflow-hidden text-ellipsis h-[130px]">
        {description}
      </p>
    </div>
  );
}

function SliderCardInfo({ cards }: Readonly<SliderCardInfoProps>) {
  return (
    <div className="w-full max-w-full mx-auto text-left">
      {" "}
      <Swiper
        spaceBetween={20}
        loop
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1440: {
            slidesPerView: 4,
          },
        }}
      >
        {cards.map((cardInfo: Readonly<CardInfoProps>) => (
          <SwiperSlide key={cardInfo.id} className="flex justify-center">
            <CardInfo {...cardInfo} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default function Index() {
  useEffect(() => {
    console.log("Cargando _index.tsx");
  }, []);
  const [institutions, setInstitutions] = useState<CardInfoProps[]>([]);
  const [ourServices, setOurServices] = useState<CardInfoProps[]>([]);

  const getAllInitialInfo = async () => {
    try {
      const institutionsResponse: InstitutionResponse[] =
        await getAllInstitutions();
      const ourServicesResponse: OurServiceResponse[] =
        await getAllOurServices();

      setInstitutions(institutionsResponse.map(institutionToCardInfoProps));

      setOurServices(
        ourServicesResponse
          .map(ourServiceResponseToCardInfoProps)
          .filter((item): item is CardInfoProps => item !== undefined)
      );
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
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
        className="bg-[--color-light-blue] p-6 lg:p-24"
      >
        <h2 className="text-black text-3xl lg:text-4xl font-bold text-center">
          Instituciones aliadas
        </h2>
        {institutions.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {institutions.map((institution) => (
              <div
                key={institution.id}
                className={`p-4 flex justify-center items-center border border-gray-300 shadow-lg rounded-lg aspect-[3/2] 
            ${[2, 8, 9].includes(institution.id) ? "bg-gray-400" : "bg-white"}`}
              >
                <img
                  src={institution.urlImg}
                  alt={institution.title}
                  className="max-w-[80%] max-h-[70%] object-contain"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-4">
            Cargando instituciones...
          </p>
        )}
      </section>

      <section id="our-services" className="bg-[white] p-[20px] lg:p-[110px]">
        <h2 className="text-[black] text-[40px] font-bold text-center">
          Nuestros servicios
        </h2>
        <div className="mt-[10px] text-center lg:mt-[76px]">
          <SliderCardInfo cards={ourServices} />
        </div>
      </section>

      {/* Formulario de Contacto */}
      <section id="contact-form" className="bg-[#F5F5F5] p-[20px] lg:p-[110px]">
        <h2 className="text-[black] text-[40px] font-bold text-center">
          Contáctanos
        </h2>
        <div className="mt-[10px] lg:mt-[76px] max-w-[800px] mx-auto">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
