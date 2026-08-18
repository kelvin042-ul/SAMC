const section = ({ children, className = '' }) => {
    return (
        <section className={`max-w-7xl mx-auto px-6 w-full ${className}`} >
            {children}
        </section>
    );
}

export default section;