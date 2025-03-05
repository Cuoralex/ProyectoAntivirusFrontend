/* eslint-disable jsx-a11y/anchor-is-valid */
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-r from-gray-100 via-[#bce1ff] to-gray-100 py-8 sm:py-12">
      <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <img src="/assets/images/logo.png" className="mr-5 h-12 sm:h-16" alt="Logo" />
            <p className="max-w-xs mt-4 text-sm text-gray-800">
              {t('footer.description')}
            </p>
            <div className="flex mt-8 space-x-6 text-gray-800">
              {[
                { href: "https://facebook.com", img: "/assets/images/facebook-icon.png", alt: "Facebook" },
                { href: "https://instagram.com", img: "/assets/images/instagram-icon.png", alt: "Instagram" },
                { href: "https://twitter.com", img: "/assets/images/twitter-icon.png", alt: "Twitter" },
              ].map(({ href, img, alt }) => (
                <a key={alt} href={href} target="_blank" rel="noreferrer">
                  <img src={img} className="w-6 h-6 hover:opacity-75" alt={alt} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'footer.company', links: ['footer.about', 'footer.team', 'footer.history', 'footer.careers'] },
              { title: 'footer.services', links: ['footer.coaching', 'footer.review', 'footer.consulting'] },
              { title: 'footer.links', links: ['footer.contact', 'footer.faq', 'footer.chat'] },
              { title: 'footer.legal', links: ['footer.privacy', 'footer.terms', 'footer.returns'] },
            ].map(({ title, links }) => (
              <div key={title}>
                <p className="font-medium text-gray-800">{t(title)}</p>
                <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-600">
                  {links.map((link) => (
                    <a key={link} className="hover:text-gray-900" href="#">
                      {t(link)}
                    </a>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-8 text-xs text-gray-800 text-center">© 2024 {t('footer.rightsReserved')}</p>
      </div>
    </footer>
  );
};

export default Footer;
