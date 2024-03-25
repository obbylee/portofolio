import { arrowUpRight, sushi2, sushi3 } from "../assets";

const AboutUs = () => {
  return (
    <section id="about-us" className="about-us max-lg:flex-col">
      <div className="about-us__image max-lg:flex-row max-md:flex-col">
        <div className="about-us__image-sushi3 max-lg:border-b-0 max-lg:border-r-8 max-lg:border-color-creamson max-md:border-b-8 max-md:border-r-0 max-sm:p-8">
          <img
            src={sushi3}
            alt="sushi"
            width={225}
            height={200}
            className="object-contain max-sm:w-1/2 max-sm:h-[160px]"
            data-aos="fade-right"
          />
        </div>

        <button className="about-us__button max-lg:hidden max-md:block max-md:top-[47%] max-sm:top-[44%]">
          <span className="text-white font-medium text-lg">Learn More</span>
          <img src={arrowUpRight} alt="learn more" className="object-contain" />
        </button>

        <div className="py-8 px-16 flex flex-1 items-center bg-center bg-contain bg-no-repeat bg-about2 max-sm:p-8">
          <img
            src={sushi2}
            alt="sushi"
            width={240}
            height={160}
            className="object-contain max-sm:w-1/2 max-sm:h-[160px]"
            data-aos="fade-right"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center" data-aos="fade-left">
        <div className="p-16 max-sm:p-8">
          <p className="sushi__subtitle">About Us / 私たちに関しては</p>
          <h3 className="sushi__title">
            Our mission is to bring true Japanese flavours to you.
          </h3>
          <p className="sushi__description">
            We will continue to provide the experience of Omotenashi, the
            Japanese mindset of hospitality, with our shopping and dining for
            our customers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
