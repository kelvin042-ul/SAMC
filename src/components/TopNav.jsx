import { Phone, Ambulance, HelpCircle } from 'lucide-react';

const TopNav = () => {
    const handlePhoneCall = (number) => {
        window.location.href = `tel:${number}`;
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white py-2.5 px-4">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                {/* Left: Need Help? */}
                <div className="flex items-center gap-2">
                    <HelpCircle size={14} className="text-white/80" />
                    <span className="font-medium uppercase tracking-wider text-[10px]">
                        Need Help?
                    </span>
                    <button
                        onClick={() => handlePhoneCall('08012345678')}
                        className="flex items-center gap-1.5 hover:text-white/80 transition-colors"
                    >
                        <Phone size={12} />
                        <span className="font-bold text-sm">080-1234-5678</span>
                    </button>
                </div>

                {/* Right: Emergency */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Ambulance size={14} className="animate-pulse text-white/90" />
                        <span className="font-bold uppercase tracking-widest text-[9px]">
                            Emergency:
                        </span>
                    </div>
                    <button
                        onClick={() => handlePhoneCall('08012345678')}
                        className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-all"
                    >
                        <Phone size={12} />
                        <span className="font-bold text-sm">080-1234-5678</span>
                    </button>
                    <span className="text-[8px] uppercase tracking-widest text-white/60 hidden sm:inline">
                        24/7 Available
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TopNav;