import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import PlateCard from '../components/PlateCard';
import { plateDecors } from '../data/plateDecors';
import { PlateDecor } from '../types';

const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredPlates, setFilteredPlates] = useState<PlateDecor[]>(plateDecors);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<{
    category: string | null;
    style: string | null;
    occasion: string | null;
    availability: boolean | null;
  }>({
    category: searchParams.get('category'),
    style: null,
    occasion: null,
    availability: null
  });

  // Extract unique values for filter options
  const categories = [...new Set(plateDecors.map(plate => plate.category))];
  const styles = [...new Set(plateDecors.map(plate => plate.style))];
  const occasions = [...new Set(plateDecors.flatMap(plate => plate.occasion))];

  useEffect(() => {
    let results = plateDecors;

    // Apply search term
    if (searchTerm) {
      results = results.filter(plate => 
        plate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plate.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (activeFilters.category) {
      results = results.filter(plate => plate.category === activeFilters.category);
    }

    // Apply style filter
    if (activeFilters.style) {
      results = results.filter(plate => plate.style === activeFilters.style);
    }

    // Apply occasion filter
    if (activeFilters.occasion) {
      results = results.filter(plate => plate.occasion.includes(activeFilters.occasion));
    }

    // Apply availability filter
    if (activeFilters.availability !== null) {
      results = results.filter(plate => plate.available === activeFilters.availability);
    }

    setFilteredPlates(results);
    
    // Update URL params
    const params = new URLSearchParams();
    if (activeFilters.category) params.set('category', activeFilters.category);
    if (activeFilters.style) params.set('style', activeFilters.style);
    if (activeFilters.occasion) params.set('occasion', activeFilters.occasion);
    if (activeFilters.availability !== null) params.set('available', String(activeFilters.availability));
    setSearchParams(params);
  }, [searchTerm, activeFilters, setSearchParams]);

  const handleFilterChange = (filterType: keyof typeof activeFilters, value: string | boolean | null) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      category: null,
      style: null,
      occasion: null,
      availability: null
    });
    setSearchTerm('');
  };

  return (
    <Layout>
      {/* Header Banner */}
      <section className="relative py-16 bg-charcoal-800 text-white">
        <div className="container-custom">
          <h1 className="font-serif text-center mb-4">Browse Our Plate Decor Collection</h1>
          <p className="text-center text-white/80 max-w-2xl mx-auto">
            Discover our exquisite range of plate decorations for every occasion, from weddings to corporate events.
          </p>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-12 bg-cream-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-serif font-medium text-charcoal-700 flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    Filters
                  </h2>
                  {(activeFilters.category || activeFilters.style || activeFilters.occasion || activeFilters.availability !== null) && (
                    <button 
                      onClick={clearAllFilters}
                      className="text-sm text-burgundy-600 hover:text-burgundy-700 flex items-center"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Clear All
                    </button>
                  )}
                </div>

                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search plates..."
                      className="input pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-charcoal-400" />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-medium text-charcoal-700 mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center">
                        <button
                          onClick={() => handleFilterChange('category', category)}
                          className={`flex items-center w-full px-2 py-1.5 rounded text-left text-sm ${
                            activeFilters.category === category 
                              ? 'bg-gold-100 text-gold-700 font-medium' 
                              : 'text-charcoal-600 hover:bg-cream-100'
                          }`}
                        >
                          {category}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Styles */}
                <div className="mb-6">
                  <h3 className="font-medium text-charcoal-700 mb-3">Styles</h3>
                  <div className="space-y-2">
                    {styles.map(style => (
                      <div key={style} className="flex items-center">
                        <button
                          onClick={() => handleFilterChange('style', style)}
                          className={`flex items-center w-full px-2 py-1.5 rounded text-left text-sm ${
                            activeFilters.style === style 
                              ? 'bg-gold-100 text-gold-700 font-medium' 
                              : 'text-charcoal-600 hover:bg-cream-100'
                          }`}
                        >
                          {style}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Occasions */}
                <div className="mb-6">
                  <h3 className="font-medium text-charcoal-700 mb-3">Occasions</h3>
                  <div className="space-y-2">
                    {occasions.map(occasion => (
                      <div key={occasion} className="flex items-center">
                        <button
                          onClick={() => handleFilterChange('occasion', occasion)}
                          className={`flex items-center w-full px-2 py-1.5 rounded text-left text-sm ${
                            activeFilters.occasion === occasion 
                              ? 'bg-gold-100 text-gold-700 font-medium' 
                              : 'text-charcoal-600 hover:bg-cream-100'
                          }`}
                        >
                          {occasion}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h3 className="font-medium text-charcoal-700 mb-3">Availability</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleFilterChange('availability', true)}
                        className={`flex items-center w-full px-2 py-1.5 rounded text-left text-sm ${
                          activeFilters.availability === true 
                            ? 'bg-gold-100 text-gold-700 font-medium' 
                            : 'text-charcoal-600 hover:bg-cream-100'
                        }`}
                      >
                        Available Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="md:w-3/4">
              {/* Active Filters */}
              {(activeFilters.category || activeFilters.style || activeFilters.occasion || activeFilters.availability !== null) && (
                <div className="mb-6 flex flex-wrap gap-2 items-center">
                  <span className="text-charcoal-600 font-medium">Active Filters:</span>
                  
                  {activeFilters.category && (
                    <button
                      onClick={() => handleFilterChange('category', activeFilters.category)}
                      className="bg-gold-100 text-gold-700 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      Category: {activeFilters.category}
                      <X className="ml-1 h-4 w-4" />
                    </button>
                  )}
                  
                  {activeFilters.style && (
                    <button
                      onClick={() => handleFilterChange('style', activeFilters.style)}
                      className="bg-gold-100 text-gold-700 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      Style: {activeFilters.style}
                      <X className="ml-1 h-4 w-4" />
                    </button>
                  )}
                  
                  {activeFilters.occasion && (
                    <button
                      onClick={() => handleFilterChange('occasion', activeFilters.occasion)}
                      className="bg-gold-100 text-gold-700 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      Occasion: {activeFilters.occasion}
                      <X className="ml-1 h-4 w-4" />
                    </button>
                  )}
                  
                  {activeFilters.availability !== null && (
                    <button
                      onClick={() => handleFilterChange('availability', activeFilters.availability)}
                      className="bg-gold-100 text-gold-700 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      Available Now
                      <X className="ml-1 h-4 w-4" />
                    </button>
                  )}
                </div>
              )}

              {/* Results Info */}
              <div className="mb-6">
                <p className="text-charcoal-600">
                  Showing {filteredPlates.length} {filteredPlates.length === 1 ? 'plate' : 'plates'}
                </p>
              </div>

              {/* Plates Grid */}
              {filteredPlates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPlates.map(plate => (
                    <PlateCard key={plate.id} plate={plate} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <h3 className="text-xl font-serif text-charcoal-700 mb-2">No plates found</h3>
                  <p className="text-charcoal-600 mb-4">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <button 
                    onClick={clearAllFilters}
                    className="btn-outline"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CatalogPage;