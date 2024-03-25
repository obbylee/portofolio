const Subscribe = () => {
  return (
    <section
      id="services"
      className="flex-center p-16 bg-primary-color bg-subscribe bg-center bg-no-repeat bg-contain flex-col overflow-hidden max-sm:py-16 max-sm:px-8"
    >
      <h2
        data-aos="flip-down"
        className="text-8xl font-playfair-display font-semibold text-white text-center max-sm:text-6xl max-sm:leading-relaxed"
      >
        Get offers stright <br /> to your inbox
      </h2>

      <p
        data-aos="fade-up"
        className="text-lg font-plus-jakarta-sans font-light mt-8 text-white text-opacity-80"
      >
        Sign up for the sushiman newsletter
      </p>

      <div
        data-aos="fade-up"
        className="min-w-[480px] mt-10 py-4 pr-4 pl-6 flex gap-2.5 border border-solid rounded-[46px] max-sm:flex-col max-sm:gap-5 max-sm:min-w-full max-sm:p-0 max-sm:border-none max-sm:rounded-xl"
      >
        <input
          type="text"
          placeholder="Enter your email address"
          className="flex flex-1 placeholder:text-white placeholder:opacity-50 text-base font-normal font-plus-jakarta-sans text-white opacity-50 bg-transparent border-none outline-none max-sm:min-h-[50px] max-sm:border-white max-sm:border max-sm:border-1 max-sm:border-solid max-sm:py-2.5 max-sm:px-5 max-sm:rounded-3xl"
        />
        <button className="p-5 min-w-[180px] text-base font-medium text-white font-plus-jakarta-sans text-center bg-black-400 rounded-[46px] border-none outline-none cursor-pointer max-sm:min-w-full">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Subscribe;
