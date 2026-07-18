import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const [searchParams] = useSearchParams();
  const productUrl = searchParams.get('url');
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExactProduct = async () => {
      try {
        setLoading(true);
        // Hit your backend scraper endpoint designed to parse a specific URL
        const response = await axios.get(`YOUR_BACKEND_URL/api/scrape-url?url=${encodeURIComponent(productUrl)}`);
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product details", error);
      } finally {
        setLoading(false);
      }
    };

    if (productUrl) {
      fetchExactProduct();
    }
  }, [productUrl]);

  if (loading) return <div className="text-center mt-10">Scraping live product details...</div>;
  if (!productData) return <div className="text-center mt-10">Failed to load product data.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Hero Section: Main Product Details */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 flex flex-col md:flex-row gap-8">
        <img src={productData.image} alt={productData.title} className="w-full md:w-80 object-contain rounded-lg" />
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-bold text-white">{productData.title}</h1>
          <p className="text-emerald-400 text-3xl font-extrabold">{productData.currentPrice}</p>
          <a href={productUrl} target="_blank" rel="noreferrer" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">
            View Original Store
          </a>
        </div>
      </div>

      {/* Buyhatke-style Feature: Price Comparisons at Other Stores */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h2 className="text-xl font-bold text-white mb-4">Available Offers at Alternative Stores</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-white">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="py-2">Store</th>
                <th className="py-2">Price</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {productData.comparisons?.map((shop, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 font-semibold">{shop.storeName}</td>
                  <td className="py-3 text-emerald-400 font-bold">{shop.price}</td>
                  <td className="py-3">
                    <a href={shop.link} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Go to Store →</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;