import { useState } from 'react';

const PhotoGallery = () => {
    const [filter, setFilter] = useState('All');

    const categories = ['All', 'Academics', 'Sports', 'Cultural', 'Campus'];

    const photos = [
        { id: 1, category: 'Academics', src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800', title: 'Science Fair 2024' },
        { id: 2, category: 'Sports', src: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=800', title: 'Annual Sports Meet' },
        { id: 3, category: 'Cultural', src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800', title: 'Diwali Celebration' },
        { id: 4, category: 'Campus', src: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800', title: 'Main Building' },
        { id: 5, category: 'Academics', src: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800', title: 'Robotics Workshop' },
        { id: 6, category: 'Sports', src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800', title: 'Football Finals' },
        { id: 7, category: 'Cultural', src: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?auto=format&fit=crop&q=80&w=800', title: 'Music Concert' },
        { id: 8, category: 'Campus', src: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&q=80&w=800', title: 'Library' },
    ];

    const filteredPhotos = filter === 'All' ? photos : photos.filter(p => p.category === filter);

    return (
        <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold font-outfit text-[var(--color-school-blue)] mb-6">Photo Gallery</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Capturing moments of learning, joy, and achievement across our campus.
                </p>
                <div className="w-24 h-1.5 bg-[var(--color-school-gold)] mx-auto rounded-full mt-8"></div>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${filter === cat
                            ? 'bg-[var(--color-school-blue)] text-white shadow-lg scale-105'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredPhotos.map((photo) => (
                    <div key={photo.id} className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer">
                        <img
                            src={photo.src}
                            alt={photo.title}
                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <div>
                                <span className="text-[var(--color-school-gold)] text-xs font-bold uppercase tracking-wider mb-1 block">{photo.category}</span>
                                <h3 className="text-white font-bold text-lg">{photo.title}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotoGallery;
