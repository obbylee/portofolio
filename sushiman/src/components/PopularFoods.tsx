import { useState } from "react";
import { arrowRight, star } from "../assets";
import { popularFoodCard } from "../constants";

const PopularFoods = () => {
  const [active, setActive] = useState("");

  return (
    <section
      className="popular-foods min-h-[920px] max-sm:py-16 max-sm:px-8"
      id="menu"
    >
      <h2 className="popular-foods__title" data-aos="flip-up">
        Popular Food / 人気
      </h2>

      <div className="popular-foods__filters" data-aos="fade-up">
        <button
          onClick={() => setActive("")}
          className="popular-foods__filter-btn"
        >
          All
        </button>

        {popularFoodCard.map((food, index) => (
          <button
            key={index}
            onClick={() => setActive(`${food.title}`)}
            className={
              active == food.title
                ? "popular-foods__filter-btn active"
                : "popular-foods__filter-btn"
            }
          >
            <img src={food.imgSrc} alt={food.alt} />
            {food.title}
          </button>
        ))}

        <button
          onClick={() => setActive("")}
          className="popular-foods__filter-btn"
        >
          All
        </button>
      </div>

      <div className="popular-foods__catalogue" data-aos="fade-up">
        {popularFoodCard.map((food, index) => (
          <article
            key={index}
            className={
              active == food.title
                ? "popular-foods__card active-card"
                : "popular-foods__card"
            }
            data-aos="ease-in-out"
          >
            <img
              src={food.imgSrc}
              alt={food.alt}
              className="popular-foods__card-image"
            />
            <h4 className="popular-foods__card-title">{food.title}</h4>

            <div className="popular-foods__card-details flex-between">
              <div className="popular-foods__card-rating">
                <img src={star} alt="star" />
                <p>{food.rating}</p>
              </div>

              <p className="popular-foods__card-price">{food.price}</p>
            </div>
          </article>
        ))}
      </div>

      <button className="popular-foods__button">
        <span>Explore Food</span>
        <img src={arrowRight} alt="arrow-right" />
      </button>
    </section>
  );
};

export default PopularFoods;
