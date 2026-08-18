import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        // Scroll to top with smooth behavior
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [location.pathname]); // Runs every time the URL path changes

    return null; // This component doesn't render anything
};

export default ScrollToTop;