import { useState } from 'react'
import QuickView from './Quick-View' // Import your QuickView component

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    imageSrc: 'https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/25899798/2023/11/16/2324653f-fae2-455f-99b9-85415660e2d81700119381390AeroArmourUnisexOliveGreenT-shirt1.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
    colors: ['Black', 'White'], // Add colors here
    sizes: ['S', 'M', 'L', 'XL'], // Optionally add sizes too
  },
  {
    id: 2,
    name: 'Basic Tee',
    imageSrc: 'https://assets.ajio.com/medias/sys_master/root/20231116/mlcA/6555c7caafa4cf41f58c174f/-473Wx593H-466794990-blue-MODEL.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
    colors: ['Black', 'White'], // Add colors here
    sizes: ['S', 'M', 'L', 'XL'], // Optionally add sizes too
  },
  {
    id: 3,
    name: 'Basic Tee',
    imageSrc: 'https://triprindia.com/cdn/shop/files/133close1_1024x.jpg?v=1708080238',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
    colors: ['Black', 'White'], // Add colors here
    sizes: ['S', 'M', 'L', 'XL'], // Optionally add sizes too
  },
  // More products...
]

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setIsQuickViewOpen(true)
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-9 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative"
              onClick={() => handleProductClick(product)} // Handle product click
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Render QuickView with dynamic product data */}
      {selectedProduct && (
        <QuickView
          open={isQuickViewOpen}
          setOpen={setIsQuickViewOpen}
          product={selectedProduct} // Pass the selected product
        />
      )}
    </div>
  )
}
