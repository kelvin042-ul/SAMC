import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
    const testimonials = [
        {
            id: 1,
            name: 'Mrs. Adeola Ogunleye',
            location: 'Lagos, Nigeria',
            text: 'The antenatal care I received was exceptional. The doctors and nurses made me feel safe throughout my pregnancy. I delivered my baby girl safely at their facility.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&h=600&q=80'
        },
        {
            id: 2,
            name: 'Mr. Chidi Okonkwo',
            location: 'Abuja, Nigeria',
            text: 'My father received the best treatment at this hospital. The staff was professional, caring, and the facilities were top-notch. Thank you for saving his life.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=600&q=80'
        },
        {
            id: 3,
            name: 'Dr. (Mrs.) Funmi Adebayo',
            location: 'Ibadan, Nigeria',
            text: 'As a healthcare professional myself, I can confidently say this hospital maintains high standards. The laboratory services are reliable and the doctors are highly skilled.',
            rating: 4,
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&h=600&q=80'
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    const current = testimonials[currentIndex];

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto w-full">
            {/* Section Header */}
            <div className="text-center mb-12">
                <span className="text-[10px] uppercase tracking-[0.5em] text-blue-600 font-bold">
                    Patient Stories
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mt-2">
                    What Our Patients Say
                </h2>
                <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
                    Real experiences from real people we've had the privilege to care for
                </p>
            </div>

            {/* Testimonial Card - Image Half + Text Half */}
            <div className="max-w-4xl mx-auto">
                <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Left: Image - Fixed height for consistency */}
                        <div className="h-80 md:h-[340px] overflow-hidden bg-gray-100">
                            <img
                                src={current.image}
                                alt={current.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1587351021759-377ae7ae9942?auto=format&fit=crop&w=600&h=600&q=80';
                                }}
                            />
                        </div>

                        {/* Right: Text Content */}
                        <div className="p-6 md:p-8 flex flex-col justify-center">
                            {/* Quote Icon */}
                            <Quote size={28} className="text-blue-200 mb-3" />

                            {/* Rating Stars */}
                            <div className="flex gap-0.5 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={i < current.rating
                                            ? 'text-yellow-400 fill-yellow-400'
                                            : 'text-gray-200'
                                        }
                                    />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-700 text-sm md:text-base leading-relaxed italic mb-4 line-clamp-5">
                                "{current.text}"
                            </p>

                            {/* Patient Name & Location */}
                            <div className="border-t border-gray-100 pt-4">
                                <p className="font-bold text-sm uppercase tracking-tight">
                                    {current.name}
                                </p>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                                    {current.location}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-6">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex
                                    ? 'bg-blue-600 w-8'
                                    : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            aria-label={`View testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;