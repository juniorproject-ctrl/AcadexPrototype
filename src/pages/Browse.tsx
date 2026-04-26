import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { getAllListings, getBadgeClasses, listingCategories, listingConditions, type ListingCondition } from '../lib/demoListings';

export default function Browse() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All Items';
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');
  const [condition, setCondition] = useState('All Conditions');
  const [priceRange, setPriceRange] = useState('Any Price');
  const [sortBy, setSortBy] = useState('Newest First');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const allListings = useMemo(() => getAllListings(), []);

  const filteredProducts = useMemo(() => {
    let items = [...allListings];

    if (category !== 'All Items') {
      items = items.filter((item) => item.category === category);
    }

    if (search.trim()) {
      const query = search.trim().toLowerCase();
      items = items.filter((item) =>
        [item.title, item.subtitle, item.seller, item.location, item.category].some((value) =>
          value.toLowerCase().includes(query),
        ),
      );
    }

    if (condition !== 'All Conditions') {
      items = items.filter((item) => item.condition === condition);
    }

    if (priceRange === '0 - 100 AED') {
      items = items.filter((item) => item.price <= 100);
    } else if (priceRange === '100 - 500 AED') {
      items = items.filter((item) => item.price > 100 && item.price <= 500);
    } else if (priceRange === '500+ AED') {
      items = items.filter((item) => item.price > 500);
    }

    if (sortBy === 'Price: Low to High') {
      items.sort((left, right) => left.price - right.price);
    } else if (sortBy === 'Price: High to Low') {
      items.sort((left, right) => right.price - left.price);
    }

    return items;
  }, [allListings, category, condition, priceRange, search, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const displayedProducts = filteredProducts.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto flex space-x-4 mb-12">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search for textbooks, laptops, calculators, past quizzes..."
            className="w-full h-12 bg-gray-100 rounded-lg pl-10 pr-4 outline-none border-none"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        </div>
        <select className="bg-gray-100 rounded-lg px-4 border-none text-sm font-medium" value={category} onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}>
          <option>All Items</option>
          {listingCategories.map((listingCategory) => (
            <option key={listingCategory} value={listingCategory}>{listingCategory}</option>
          ))}
        </select>
        <button className="bg-brand-navy text-white px-8 rounded-lg font-bold">Search</button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-gray-500">Sort by:</span>
            <select className="bg-white border border-gray-200 rounded px-2 py-1 text-xs" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-gray-500">Condition:</span>
            <select className="bg-white border border-gray-200 rounded px-2 py-1 text-xs" value={condition} onChange={(e) => { setCondition(e.target.value); setCurrentPage(1); }}>
              <option>All Conditions</option>
              {listingConditions.map((listingCondition) => (
                <option key={listingCondition}>{listingCondition}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-gray-500">Price Range:</span>
            <select className="bg-white border border-gray-200 rounded px-2 py-1 text-xs" value={priceRange} onChange={(e) => { setPriceRange(e.target.value); setCurrentPage(1); }}>
              <option>Any Price</option>
              <option>0 - 100 AED</option>
              <option>100 - 500 AED</option>
              <option>500+ AED</option>
            </select>
          </div>
        </div>
        <div className="text-xs font-bold text-gray-400">Showing {filteredProducts.length} results</div>
      </div>

      <div className="flex flex-wrap gap-3 mb-12">
        {['All Items', ...listingCategories].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-6 py-2 rounded-full text-xs font-bold border transition-all ${
              category === cat
              ? 'bg-brand-navy text-white border-brand-navy'
              : 'bg-white text-brand-navy border-gray-200 hover:border-brand-navy'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {displayedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg overflow-hidden flex flex-col h-full group cursor-pointer border border-gray-100 hover:border-brand-light-navy transition-colors">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
              <div className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold ${getBadgeClasses(product.condition as ListingCondition)}`}>
                {product.condition}
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-sm font-bold text-brand-navy line-clamp-1 mb-0.5">{product.title}</h3>
              <p className="text-[10px] text-gray-400 mb-2 truncate">{product.subtitle}</p>
              <p className="text-lg font-bold text-brand-navy mb-3">AED {product.price}</p>
              <div className="mt-auto pt-3 border-t border-gray-50 flex items-center">
                <div className="w-5 h-5 bg-gray-200 rounded-full mr-2"></div>
                <span className="text-[10px] text-gray-500">{product.seller} • {product.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!displayedProducts.length && (
        <div className="bg-white rounded-xl border border-gray-100 p-10 text-center text-brand-light-navy mb-16">
          No listings match the current filters yet.
        </div>
      )}

      <div className="flex justify-center items-center space-x-2">
        <button
          onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
          className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).slice(0, 5).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 text-sm rounded transition-colors ${
              safePage === page
              ? 'font-bold bg-brand-navy text-white'
              : 'font-medium border border-gray-200 hover:bg-gray-50 text-brand-navy'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(Math.min(totalPages, safePage + 1))}
          className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
