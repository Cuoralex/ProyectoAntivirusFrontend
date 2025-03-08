import { Outlet } from "@remix-run/react";
import ButtonDonateWompi from "~/components/organisms/button-donate-wompi/button-donate-wompi";
import ButtonGoUp from "~/components/organisms/button-go-up/button-go-up";
import FooterGeneral from "~/components/organisms/footer-general/footer-general";
import HeaderGeneral from "~/components/organisms/header-general/header-general";

export default function GeneralLayout() {
  return (
    <div id="general-layout">
      <HeaderGeneral />
      <ButtonGoUp />
      <ButtonDonateWompi />
      <Outlet />
      <FooterGeneral />
    </div>
  );
}
