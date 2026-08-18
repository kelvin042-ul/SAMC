import { Link } from 'react-router-dom';

const WhatWeOffer = () => {
    const services = [
        {
            id: 'antenatal',
            title: 'Antenatal Care',
            description: 'We provide comprehensive antenatal care for expectant mothers, ensuring a healthy pregnancy journey from conception to delivery. Our services include regular check-ups, ultrasound scans, nutritional guidance, prenatal classes, and personalized birth plans. Our experienced obstetricians and midwives are dedicated to monitoring both maternal and fetal health, identifying potential complications early, and providing the highest standard of care throughout your pregnancy. We also offer postnatal support to ensure both mother and baby thrive after delivery. Your safety and comfort are our top priorities.',
            image: 'https://images.pexels.com/photos/6945529/pexels-photo-6945529.jpeg?auto=compress&cs=tinysrgb&w=800',
            link: '/services'
        },
        {
            id: 'lab',
            title: 'Laboratory Services',
            description: 'Our state-of-the-art diagnostic laboratory is equipped with modern medical technology to provide accurate and timely test results. We offer a wide range of services including blood tests, urine analysis, microbiology, hormone testing, cancer screening, and specialized diagnostic procedures. Our team of experienced medical laboratory scientists ensures that every test is conducted with precision and care. We understand that fast and reliable results are crucial for proper diagnosis and treatment, which is why we prioritize efficiency without compromising quality. Your health starts with accurate diagnosis, and we are here to provide exactly that.',
            image: 'https://images.pexels.com/photos/7088988/pexels-photo-7088988.jpeg?auto=compress&cs=tinysrgb&w=800',
            link: '/services'
        },
        {
            id: 'optician',
            title: 'Optician & Eye Care',
            description: 'Our eye care services are designed to help you maintain optimal vision and eye health. We offer comprehensive eye examinations, prescription glasses, contact lens fitting, and treatment for common eye conditions such as refractive errors, cataracts, glaucoma, and dry eye syndrome. Our team of optometrists and opticians use modern diagnostic equipment to detect vision problems early and provide personalized solutions. Whether you need corrective lenses or treatment for an eye condition, we are committed to helping you see the world clearly. Regular eye check-ups are essential for maintaining good vision and overall health.',
            image: 'https://images.pexels.com/photos/6779061/pexels-photo-6779061.jpeg?auto=compress&cs=tinysrgb&w=800',
            link: '/services'
        }
    ];

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto w-full">
            {/* Section Header */}
            <div className="text-center mb-16">
                <span className="text-[10px] uppercase tracking-[0.5em] text-blue-600 font-bold">
                    Our Services
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mt-2">
                    What We Offer
                </h2>
                <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
                    Comprehensive healthcare services designed to meet your needs
                </p>
            </div>

            {/* 3 Services - Alternating Layout */}
            <div className="space-y-20">
                {services.map((service, index) => {
                    // Even index (0, 2): text left, image right
                    // Odd index (1): text right, image left
                    const isEven = index % 2 === 0;

                    return (
                        <div
                            key={service.id}
                            className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                } gap-8 lg:gap-16 items-center group`}
                        >
                            {/* Image */}
                            <div className="w-full lg:w-1/2 overflow-hidden rounded-sm shadow-lg">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-72 lg:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.src = 'https://images.pexels.com/photos/7944056/pexels-photo-7944056.jpeg?auto=compress&cs=tinysrgb&w=800';
                                    }}
                                />
                            </div>

                            {/* Text Content */}
                            <div className="w-full lg:w-1/2 space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                                        Service {index + 1}
                                    </span>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                    {service.description}
                                </p>
                                <Link
                                    to={service.link}
                                    className="inline-flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-widest hover:gap-3 transition-all"
                                >
                                    Learn More →
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default WhatWeOffer;