import { playCircle, sushi1, user } from "../assets";

const Hero = () => {
  return (
    <section className="hero max-lg:flex-col">
      {/* hero image */}
      <div className="hero-image">
        <img src={sushi1} alt="sushi" data-aos="fade-up" />
        <h2 data-aos="fade-up">
          日 <br />
          本 <br />食
        </h2>

        {/* hero image overlay */}
        <div className="hero-image__overlay"></div>
      </div>

      {/* hero content */}
      <div className="hero-content">
        <div className="hero-content-info max-sm:p-8" data-aos="fade-left">
          <h1>Feel the taste of Japanese food</h1>
          <p>
            Feel the taste of the most popular Japanese food from anywhere and
            anytime.
          </p>

          <div className="hero-content__buttons">
            <button className="hero-content__order-button">Order Now</button>
            <button className="hero-content__play-button">
              <img
                src={playCircle}
                alt="sushi"
                width={46}
                height={46}
                className="object-contain mr-3"
              />
              How to Order
            </button>
          </div>
        </div>

        {/* testimonial */}
        <div className="hero-content__testimonial" data-aos="fade-up">
          <div className="hero-content__customer">
            <h4>
              24<span>k+</span>
            </h4>
            <p>Happy Customers</p>
          </div>

          <div className="hero-content__review">
            <img
              src={user}
              alt="user"
              width={42}
              height={42}
              className="object-contain"
            />
            <p>
              "This is the best Japanese food delivery service that ever
              existed."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
