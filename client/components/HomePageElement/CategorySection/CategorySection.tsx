"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const categories = [
  {
    name: "T-Shirts",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMdmeh1intiz-Mz5NHlOXmXdf3L2ufUMeCxQ&s",
    link: "/category/tshirts",
  },
  {
    name: "Hoodies",
    image:
      "https://sfycdn.speedsize.com/d31641c5-60cb-4a0b-8662-59094f81bb6e/row.representclo.com/cdn/shop/files/eQA_y2jImnFE5vo4Tz0BTHTurvuKJd1vyZcq63zvJSc.jpg?v=1756922186&width=412",
    link: "/category/hoodies",
  },
  {
    name: "Hats",
    image:
      "https://cdn.shopify.com/s/files/1/1616/9825/files/33510_Beige-VintageLoden_LegacyOldGlory-VintageLoden-Desert_45angle_Web.png?v=1753816513&width=500&crop=center",
    link: "/category/hats",
  },
  {
    name: "Polo Shirts",
    image: "https://m.media-amazon.com/images/I/71I+uNdsN+L._AC_SL1500_.jpg",
    link: "/category/polo",
  },
];

export function CategorySection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Shop by Category
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.a
              key={category.name}
              href={category.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group text-center flex flex-col items-center justify-center"
            >
              <div className="relative mb-4">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={200}
                  height={200}
                  className="aspect-square object-cover rounded-full shadow group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </h3>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
