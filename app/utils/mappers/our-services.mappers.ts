import { CardInfoProps } from "../../routes/_index";
import { OurServiceResponse } from "../../services/our-services.service";

const ourServiceResponseToCardInfoProps = ({
  id,
  isActive,
  title,
  description,
  image,
}: OurServiceResponse): CardInfoProps | undefined => {
  if (isActive)
    return {
      id,
      urlImg: image,
      title: title,
      description,
    };
};

export { ourServiceResponseToCardInfoProps };
