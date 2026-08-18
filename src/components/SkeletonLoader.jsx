const SkeletonLoader = ({ type = 'product', count = 1 }) => {
    const renderSkeleton = () => {
        switch (type) {
            case 'product':
                return (
                    <div className="animate-pulse">
                        {/* Image placeholder */}
                        <div className="bg-gray-200 aspect-[4/5] w-full rounded-sm mb-3"></div>
                        {/* Title placeholder */}
                        <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                        {/* Price placeholder */}
                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                );

            case 'product-detail':
                return (
                    <div className="animate-pulse">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Image placeholder */}
                            <div className="bg-gray-200 aspect-[4/5] w-full rounded-sm"></div>
                            {/* Info placeholders */}
                            <div className="space-y-6">
                                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                                </div>
                                <div className="h-12 bg-gray-200 rounded w-full"></div>
                            </div>
                        </div>
                    </div>
                );

            case 'related-product':
                return (
                    <div className="animate-pulse">
                        <div className="bg-gray-200 aspect-[4/5] w-full rounded-sm mb-3"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                );

            case 'search-result':
                return (
                    <div className="animate-pulse flex items-center gap-3 p-4">
                        <div className="w-12 h-12 bg-gray-200 rounded"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <>
            {Array(count).fill().map((_, i) => (
                <div key={i}>{renderSkeleton()}</div>
            ))}
        </>
    );
};

export default SkeletonLoader;