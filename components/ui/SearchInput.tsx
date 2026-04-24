'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types';

interface SearchInputProps {
  onQuickView?: (product: Product) => void;
}

export default function SearchInput({ onQuickView }: SearchInputProps) {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fetch products on focus (lazy loading)
  const fetchProducts = async () => {
    if (hasLoaded) return; // Already loaded

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(100);

      if (!error && data) {
        setProducts(data as Product[]);
        setHasLoaded(true);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter products based on query
  useEffect(() => {
    if (query.trim() === '') {
      setFiltered([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    const results = products.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      (p.description && p.description.toLowerCase().includes(searchTerm)) ||
      (p.category && p.category.toLowerCase().includes(searchTerm))
    ).slice(0, 5); // Limit to 5 results

    setFiltered(results);
  }, [query, products]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (product: Product) => {
    setQuery('');
    setIsFocused(false);
    onQuickView?.(product);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            fetchProducts();
          }}
          className="w-full bg-[var(--bg-tertiary)] border border-[var(--glass-border)] rounded-full py-2.5 pl-4 pr-10 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {isFocused && query.trim() !== '' && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--bg-secondary)] border border-[var(--glass-border)] rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto animate-fade-in">
          {isLoading ? (
            <div className="px-4 py-8 text-center">
              <div className="w-8 h-8 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-[var(--text-secondary)] text-sm">Loading products...</p>
            </div>
          ) : filtered.length > 0 ? (
            filtered.map((product) => (
              <button
                key={product.id}
                onClick={() => handleSelect(product)}
                className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-[var(--bg-tertiary)] transition-colors border-b border-[var(--glass-border)] last:border-0"
              >
                <div className="w-12 h-12 bg-[var(--bg-tertiary)] rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={product.image_url || product.image || '/images/placeholder.png'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[var(--text-primary)] font-medium truncate">{product.name}</p>
                  <p className="text-[var(--accent-secondary)] font-bold">${Number(product.price).toFixed(2)}</p>
                </div>
              </button>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-[var(--text-secondary)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mx-auto mb-2 opacity-50">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <p>No products found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
