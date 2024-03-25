import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PopularFoods from "./components/PopularFoods";
import Subscribe from "./components/Subscribe";
import Trending from "./components/Trending";

const App = () => {
  return (
    <main className="max-w-screen-wide my-0 mx-auto">
      <Header />
      <Hero />
      <AboutUs />
      <PopularFoods />
      <Trending />
      <Subscribe />
      <Footer />
    </main>
  );
};

export default App;
