import HeroSlider from '../components/HeroSlider';
import WhyUs from '../components/WhyUs';
import WhatWeOffer from '../components/WhatWeOffer';
import Doctor from '../components/Doctor';
import LocationSection from '../components/LocationSection';
import About from '../components/About';
import Contact from '../components/Contact';
import StatsSection from '../components/StatsSection';
import Footer from '../components/Footer';
import Testimonial from '../components/Testimonial';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen pt-8">
            <HeroSlider />
            <WhyUs />
            <WhatWeOffer />
            <Doctor />
            <LocationSection />
            <About />
            <Contact />
            <StatsSection />
            <Testimonial />
            <Footer />
        </div>
    );
};

export default Home;