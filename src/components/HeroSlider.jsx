import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
    const slides = [
        {
            image: "https://images.pexels.com/photos/6945529/pexels-photo-6945529.jpeg?auto=compress&cs=tinysrgb&w=1600",
            title: "Compassionate Care for Mothers & Babies",
            subtitle: "Expert antenatal care from conception to delivery"
        },
        {
            image: "https://images.pexels.com/photos/7088988/pexels-photo-7088988.jpeg?auto=compress&cs=tinysrgb&w=1600",
            title: "Expert Lab Services & Medical Team",
            subtitle: "Our dedicated professionals are committed to your health"
        },
        {
            image: "https://images.pexels.com/photos/7944056/pexels-photo-7944056.jpeg?auto=compress&cs=tinysrgb&w=1600",
            title: "State-of-the-Art Medical Facility",
            subtitle: "Modern equipment, comfortable environment, quality care"
        }
    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleImageError = (e) => {
        e.target.src = 'https://images.pexels.com/photos/7944056/pexels-photo-7944056.jpeg?auto=compress&cs=tinysrgb&w=1600';
    };

    return (
        <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden bg-black">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
            ))}

            {/* Content - Same button for ALL slides */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-6 text-center">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 max-w-3xl">
                    {slides[current].title}
                </h1>
                <p className="text-white/80 text-base md:text-lg max-w-xl mb-6">
                    {slides[current].subtitle}
                </p>
                <Link
                    to="/book-appointment"
                    className="px-8 py-3.5 bg-blue-600 text-white font-bold uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                >
                    Book Appointment
                </Link>
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${index === current
                                ? 'bg-white w-8'
                                : 'bg-white/40 hover:bg-white/60'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;