// app/routes/contactanos.tsx
import React from 'react';
import { MetaFunction } from '@remix-run/node';
import ContactForm from '../components/molecules/ContactForm';
import Header from '../components/organisms/header-general/header-general';
import Footer from '../components/organisms/footer-general/footer-general';

export const meta: MetaFunction = () => {
  return [
    { title: "Contact Us - Fundación Antivirus para la Deserción" },
    { name: "description", content: "Get in touch with Fundación Antivirus para la Deserción" },
  ];
};

export default function ContactUs() {
  return (
    <div className="min-h-screen flex flex-col bg-[#DCEBF9] text-[#222D56]">
      <Header />
      <main className="flex-grow py-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Contáctanos</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Contact Information */}
            <div>
              <div className="rounded-lg p-6 shadow-md bg-white dark:bg-[#32526E]">
                <h2 className="text-3xl font-bold mb-4">Información de Contacto</h2>
                <p className="mb-6 text-lg">
                  Estamos aquí para ayudarte con cualquier duda que tengas sobre nuestros programas para reducir la deserción escolar en Colombia.
                </p>

                <div className="flex justify-center items-center bg-white">
                  <img src="/images/antivirus_avatar.png" alt="Antivirus Avatar" className="w-full h-auto object-cover" />
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
      <Footer />
    </div>
  );
}