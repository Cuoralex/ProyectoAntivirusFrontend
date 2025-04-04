// app/routes/contactanos.tsx
import { MetaFunction } from "@remix-run/node";
import ContactForm from "../components/molecules/ContactForm";
import ButtonWhatsapp from "../components/organisms/button-whatsapp";
import ButtonDonateWompi from "~/components/organisms/button-donate-wompi/button-donate-wompi";
import ButtonGoUp from "~/components/organisms/button-go-up/button-go-up";

export const meta: MetaFunction = () => {
  return [
    { title: "Contact Us - Fundación Antivirus para la Deserción" },
    {
      name: "description",
      content: "Get in touch with Fundación Antivirus para la Deserción",
    },
  ];
};

export default function ContactUs() {
  return (
    <div className="min-h-screen flex flex-col bg-[#DCEBF9] text-[#222D56]">
      <main className="flex-grow py-8 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Contáctanos
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Contact Information */}
            <div className="h-full flex">
              <div className="rounded-lg p-4 shadow-md bg-white dark:bg-[#32526E] flex-grow flex flex-col">
                <h2 className="text-2xl font-bold mb-3">
                  Información de Contacto
                </h2>
                <p className="mb-4 text-base">
                  Estamos aquí para ayudarte con cualquier duda que tengas sobre
                  nuestros programas para reducir la deserción escolar en
                  Colombia.
                </p>
                <div className="flex justify-center items-center bg-white flex-grow mt-auto">
                  <img
                    src="/images/antivirus_avatar.png"
                    alt="Antivirus Avatar"
                    className="w-3/5 h-auto object-contain mx-auto"
                  />
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="h-full flex">
              <ContactForm className="flex-grow" />
            </div>
          </div>
        </div>
      </main>
      <ButtonWhatsapp />
      <ButtonDonateWompi />
      <ButtonGoUp />
    </div>
  );
}
