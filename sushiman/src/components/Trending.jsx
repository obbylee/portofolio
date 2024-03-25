import {
  arrowHorizontal,
  arrowVertical,
  check,
  sushi4,
  sushi5,
} from "../assets";
import { trendingDrinks, trendingSushis } from "../constants";

const Trending = () => {
  return (
    <section className="relative flex flex-col overflow-hidden" id="food">
      <section className="w-full min-h-[640px] flex flex-row max-sm:flex-col">
        <div
          data-aos="fade-right"
          className="flex flex-1 justify-center flex-col py-8 px-16 max-sm:p-8"
        >
          <p className="sushi__subtitle">What’s Trending / トレンド</p>

          <h3 className="sushi__title">Japanese Sushi</h3>
          <p className="sushi__description">
            Feel the taste of the most delicious Sushi here.
          </p>

          <ul className="flex-between list-none flex-wrap gap-5">
            {trendingSushis.map((sushi, index) => (
              <li
                key={index}
                className="flex flex-1 items-center flex-row gap-3 min-w-[210px]"
              >
                <div className="w-[24px] h-[24px] rounded-full bg-primary-color flex-center">
                  <img
                    src={check}
                    alt="check"
                    className="w-1/2 h-1/2 object-contain"
                  />
                </div>
                <p className="flex flex-1 text-base font-medium font-plus-jakarta-sans text-secondary-color">
                  {sushi}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-center relative flex-1 py-8 px-16 bg-white bg-japanese-sushi bg-no-repeat bg-contain bg-center max-sm:w-full max-sm:bg-cover max-sm:p-16">
          <img
            src={sushi5}
            alt="sushi-5"
            data-aos="fade-left"
            className="w-[254px] h-[260px] object-contain max-sm:w-[70%] max-sm:h-[70%]"
          />

          <div className="absolute z-10 -left-[2.5px] top-[12%] max-sm:hidden">
            <img
              src={arrowVertical}
              alt="arrow"
              className="w-auto h-full object-contain"
            />
          </div>

          <div className="absolute z-10 -bottom-[6.5px] right-[12%] max-sm:hidden">
            <img
              src={arrowHorizontal}
              alt="arrow"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      <div
        data-aos="zoom-in"
        className="absolute top-[44%] left-[44%] z-10 w-[160px] h-[160px] rounded-full bg-secondary-color cursor-pointer flex-center max-sm:hidden"
      >
        <p className="text-lg font-medium font-plus-jakarta-sans text-white">
          Discover
        </p>
      </div>

      <section className="w-full min-h-[640px] flex flex-row max-sm:flex-col-reverse">
        <div className="flex-center relative flex-1 py-8 px-16 bg-white bg-japanese-drink bg-no-repeat bg-contain bg-center max-sm:w-full max-sm:bg-cover max-sm:p-16">
          <img
            src={sushi4}
            alt="sushi4"
            data-aos="fade-right"
            className="w-[254px] h-[260px] object-contain max-sm:w-[70%] max-sm:h-[70%]"
          />

          <div className="absolute z-10 -top-[8px] left-[12%] max-sm:hidden">
            <img
              src={arrowHorizontal}
              alt="arrow horizontal"
              className="w-auto h-full object-contain"
            />
          </div>

          <div className="absolute z-10 -right-[2.5px] bottom-[12%] max-sm:hidden">
            <img
              src={arrowVertical}
              alt="arrow vertical"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        <div
          data-aos="fade-left"
          className="flex flex-1 justify-center flex-col py-8 px-16 max-sm:p-8"
        >
          <p className="sushi__subtitle">What’s Trending / トレンド</p>

          <h3 className="sushi__title">Japanese Drinks</h3>
          <p className="sushi__description">
            Feel the taste of the most delicious Japense drinks here.
          </p>

          <ul className="flex-between list-none flex-wrap gap-5">
            {trendingDrinks.map((drink, index) => (
              <li
                key={index}
                className="flex flex-1 items-center flex-row gap-3 min-w-[210px]"
              >
                <div className="w-[24px] h-[24px] rounded-full bg-primary-color flex-center">
                  <img
                    src={check}
                    alt="check"
                    className="w-1/2 h-1/2 object-contain"
                  />
                </div>
                <p className="flex flex-1 text-base font-medium font-plus-jakarta-sans text-secondary-color">
                  {drink}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
};

export default Trending;
