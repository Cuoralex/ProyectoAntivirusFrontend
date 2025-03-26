import { InstitutionResponse } from "../../services/institutions.service";
import { CardInfoProps } from "../../routes/_index";

const institutionToCardInfoProps = ({
  id,
  name,
  image,
  information,
}: InstitutionResponse): CardInfoProps => ({
  id,
  urlImg: image,
  title: name,
  description: information,
});

export { institutionToCardInfoProps };
