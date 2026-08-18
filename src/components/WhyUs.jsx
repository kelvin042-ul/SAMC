import { Link } from 'react-router-dom';

const WhyUs = () => {
    const reasons = [
        {
            id: 'emergency',
            title: '24/7 Emergency Services',
            image: 'https://images.pexels.com/photos/7944056/pexels-photo-7944056.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
            id: 'team',
            title: 'Experienced Medical Team',
            image: 'https://images.pexels.com/photos/6589639/pexels-photo-6589639.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
            id: 'lab',
            title: 'Modern Laboratory',
            image: 'https://images.pexels.com/photos/7088988/pexels-photo-7088988.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
            id: 'care',
            title: 'Patient-Centered Care',
            image: 'https://images.pexels.com/photos/6945529/pexels-photo-6945529.jpeg?auto=compress&cs=tinysrgb&w=800'
        }
    ];

    return (
        <section id="why-us" className="py-20 px-6 max-w-7xl mx-auto w-full scroll-mt-24">
            <div className="text-center mb-12">
                <span className="text-[10px] uppercase tracking-[0.5em] text-blue-600 font-bold">
                    Why Choose Us
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mt-2">
                    Your Health is Our Priority
                </h2>
                <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
                    We are committed to providing exceptional healthcare services to our community
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {reasons.map((reason) => (
                    <div
                        key={reason.id}
                        className="relative group overflow-hidden rounded-sm h-64 shadow-lg"
                    >
                        {/* Background Image */}
                        <img
                            src={reason.image}
                            alt={reason.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                            onError={(e) => {
                                e.target.src = 'https://images.pexels.com/photos/7944056/pexels-photo-7944056.jpeg?auto=compress&cs=tinysrgb&w=800';
                            }}
                        />

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all" />

                        {/* Text Overlay - Centered */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                            <h3 className="text-white text-base md:text-lg font-bold uppercase tracking-wide">
                                {reason.title}
                            </h3>
                            {/* Blue accent line */}
                            <div className="w-10 h-0.5 bg-blue-400 mt-3 group-hover:w-16 transition-all duration-300" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyUs;