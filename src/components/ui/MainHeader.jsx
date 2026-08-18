const Responsive = ({ children, className = '' }) => {
    return (
        <div className={`flex flex-col min-h-screen ${className}`} >
            {children}
        </div>
    );
}

export default Responsive;