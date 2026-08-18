import { useState, useEffect, useRef } from 'react';
import { Heart, Users, Award, Clock } from 'lucide-react';

const StatsSection = () => {
    const stats = [
        { icon: Heart, label: 'Happy Patients', value: 10000, suffix: '+' },
        { icon: Award, label: 'Years of Experience', value: 15, suffix: '+' },
        { icon: Users, label: 'Medical Staff', value: 30, suffix: '+' },
        { icon: Clock, label: 'Emergency Care', value: 24, suffix: '/7' }
    ];

    const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));
    const statsSectionRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    // Animate stats when section comes into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    stats.forEach((stat, index) => {
                        let start = 0;
                        const end = stat.value;
                        const duration = 2000;
                        const increment = end / (duration / 16);

                        const counter = setInterval(() => {
                            start += increment;
                            if (start >= end) {
                                start = end;
                                clearInterval(counter);
                            }
                            setAnimatedStats(prev => {
                                const newStats = [...prev];
                                newStats[index] = Math.floor(start);
                                return newStats;
                            });
                        }, 16);
                    });
                }
            },
            { threshold: 0.3 }
        );

        if (statsSectionRef.current) {
            observer.observe(statsSectionRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    return (
        <section ref={statsSectionRef} className="py-16 bg-white border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.label} className="text-center">
                                <div className="flex justify-center mb-3">
                                    <Icon size={28} className="text-blue-600" />
                                </div>
                                <p className="text-3xl md:text-4xl font-bold tracking-tight">
                                    {animatedStats[index].toLocaleString()}{stat.suffix}
                                </p>
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">
                                    {stat.label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;