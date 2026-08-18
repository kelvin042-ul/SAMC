import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../data/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Search, X, Package } from 'lucide-react';
import SkeletonLoader from './SkeletonLoader';

const SearchPopup = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    // Fetch all products once when popup opens
    useEffect(() => {
        if (isOpen) {
            const fetchProducts = async () => {
                setLoading(true);
                const snapshot = await getDocs(collection(db, "products"));
                const products = snapshot.docs.map(doc => ({ ...doc.data(), firestoreId: doc.id }));
                setAllProducts(products);
                setLoading(false);
            };
            fetchProducts();
            inputRef.current?.focus();
        } else {
            setSearchTerm('');
            setResults([]);
        }
    }, [isOpen]);

    // Live search as user types
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setResults([]);
            return;
        }

        const term = searchTerm.toLowerCase();
        const filtered = allProducts.filter(product =>
            product.name?.toLowerCase().includes(term) ||
            product.description?.toLowerCase().includes(term)
        );
        setResults(filtered.slice(0, 10)); // Max 10 results
    }, [searchTerm, allProducts]);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 md:absolute md:top-20 md:inset-auto md:left-1/2 md:-translate-x-1/2 md:w-[500px]">
            {/* Backdrop - only on mobile */}
            <div
                className="fixed inset-0 bg-black/50 md:hidden"
                onClick={onClose}
            />

            {/* Search Panel */}
            <div className="relative bg-white w-full md:rounded-2xl shadow-2xl border border-gray-100 animate-slide-down">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Search Products</h3>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={18} />
                    </button>
                </div>

                {/* Search Input */}
                <div className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Type to search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-brandPurple transition-colors text-sm"
                        />
                    </div>
                </div>

                {/* Results */}
                <div className="max-h-[400px] overflow-y-auto pb-4">
                    {loading && (
                        <div className="py-4">
                            <SkeletonLoader type="search-result" count={3} />
                        </div>
                    )}
                    {!loading && searchTerm && results.length === 0 && (
                        <div className="text-center py-8">
                            <Package size={32} className="mx-auto text-gray-300 mb-2" />
                            <p className="text-sm text-gray-400">No products found for "{searchTerm}"</p>
                        </div>
                    )}

                    {results.map(product => (
                        <button
                            key={product.firestoreId}
                            onClick={() => handleProductClick(product.firestoreId)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-50 last:border-0"
                        >
                            <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                            <div className="flex-1">
                                <p className="text-sm font-bold uppercase tracking-tighter">{product.name}</p>
                                <p className="text-[10px] text-gray-400 line-clamp-1">{product.description}</p>
                                <p className="text-xs font-bold text-brandPurple mt-1">${product.price}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPopup;