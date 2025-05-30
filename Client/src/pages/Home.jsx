import MainLayout from "../layouts/MainLayout";
import About from "../sections/About";
import Features from "../sections/Features";
import Hero from "../sections/Hero";
import Steps from "../sections/Steps";
import TestimonialsSection from "../sections/Testimonials";
import Footer from "../components/Footer";
import usePageTitle from "../hooks/usePageTitle";

const Home = () => {
  usePageTitle("CareerMentor - Home");
  return (
    <MainLayout>
      <Hero />
      <About />
      <Steps />
      <Features />
      <TestimonialsSection />
      <Footer />
    </MainLayout>
  );
};

export default Home;
