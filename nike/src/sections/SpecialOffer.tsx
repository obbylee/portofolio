import { arrowRight } from "../assets/icons";
import { offer } from "../assets/images";
import { Button } from "../components";

const SpecialOffer = () => {
  return (
    <section
      id="special-offer"
      className="max-container flex justify-between items-center gap-10 max-xl:flex-col-reverse"
    >
      <div className="flex-1">
        <img
          src={offer}
          alt="shoe promotion"
          width={773}
          height={687}
          className="object-contain w-full"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <h2 className="text-4xl font-palanquin font-bold">
          <span className="text-coral-red">Special </span>Offer
        </h2>
        <p className="mt-4 info-text">
          Embark on a shopping that redefines your experiences with unbeatable
          deals. From premier selections to incredible savings, we offer
          unparalled value that sets up apart.
        </p>
        <p className="mt-6 info-text">
          Navigate a realm of possibilities designed to fulfill your unique
          desires, surpassing the lofties expectations. Your journey with us is
          nothing short of exceptional
        </p>

        <div className="mt-11 flex flex-wrap gap-4">
          <Button label="Shop now" iconURL={arrowRight} />
          <Button
            label="Learn more"
            backgroundColor="bg-white"
            borderColor="border-slate-gray"
            textColor="text-slate-gray"
          />
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;
