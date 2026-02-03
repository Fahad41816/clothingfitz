import { CategorySection } from "@/components/HomePageElement/CategorySection/CategorySection";
import { HeroSlider } from "@/components/HomePageElement/HeroBanner/HeroBanner";
import { HowItWorks } from "@/components/HomePageElement/How-it-works/How-it-works";
import { ProductShowcase } from "@/components/HomePageElement/ProductShowCase/ProductShowCase";
import { ReelsSection } from "@/components/HomePageElement/Reels-Section/ReelsSection";
import { StatsSection } from "@/components/HomePageElement/Start-Section/Start-Section";
import { Testimonials } from "@/components/HomePageElement/Testimonials/Testimonials";
import { VideoSection } from "@/components/HomePageElement/Video-Section/Video-Section"; 

export default function Home() {
  const hatProducts = [
    {
      id: 1,
      name: "Classic Baseball Cap",
      priceRange: "$24-$32",
      images: [
        "https://cdn.shopify.com/s/files/1/1616/9825/files/Flat_BBCanvasDecadeOne_45angle_Web.png?v=1751992437&width=500&crop=center",
        "https://cdn.shopify.com/s/files/1/1616/9825/files/Flat_BBCanvasDecadeOne_Back_Web.png?v=1751992437&width=700&height=700&crop=center",
        "https://cdn.shopify.com/s/files/1/1616/9825/files/Flat_BBCanvasDecadeOne_Front_Web.png?v=1751992437&width=700&height=700&crop=center",
      ],
      rating: 5,
      reviews: 124,
      colors: [
        "#000000",
        "#FFFFFF",
        "#FF0000",
        "#0000FF",
        "#008000",
        "#FFA500",
      ],
      tag: "Best Seller",
    },
    {
      id: 2,
      name: "Trucker Hat",
      priceRange: "$19-$28",
      images: [
        "https://cdn.shopify.com/s/files/1/1616/9825/files/545_RWB_AmericaScript_45angle_Web.png?v=1715271568&width=500&crop=center",
        "https://cdn.shopify.com/s/files/1/1616/9825/files/545_RWB_Back_FR1200x1200_d1d63ed1-450b-4809-b34a-750317472495.png?v=1748454663&width=700&height=700&crop=center",
        "https://cdn.shopify.com/s/files/1/1616/9825/files/545_RWB_AmericaScript_Front_WEB.png?v=1748454845&width=700&height=700&crop=center",
      ],
      rating: 4,
      reviews: 89,
      colors: ["#000000", "#FFFFFF", "#FF0000", "#0000FF", "#FFFF00"],
    },
    {
      id: 3,
      name: "Snapback Cap",
      priceRange: "$22-$35",
      images: [
        "https://cdn.shopify.com/s/files/1/1616/9825/files/400P_Orion_3quarter_Web_02622f8c-0e25-4864-a12e-9494a97e074b.png?v=1753807082&width=700&height=700&crop=center",
        "https://cdn.shopify.com/s/files/1/1616/9825/files/400P_Orion_Back_Web.png?v=1753279439&width=700&height=700&crop=center",
        "https://cdn.shopify.com/s/files/1/1616/9825/files/400P_Orion_Front_Web.png?v=1753279439&width=700&height=700&crop=center",
      ],
      rating: 5,
      reviews: 156,
      colors: [
        "#000000",
        "#FFFFFF",
        "#FF0000",
        "#0000FF",
        "#008000",
        "#800080",
        "#FFA500",
      ],
      tag: "Popular",
    },
    {
      id: 4,
      name: "Cozy Beanie",
      priceRange: "$16-$24",
      images: [
        "https://cdn.shopify.com/s/files/1/1616/9825/products/1656247_OldGloryPVC545-White-RedBlueRope_060623.png?v=1746567425&width=500&crop=center",
        "https://cdn.shopify.com/s/files/1/1616/9825/files/545_RWB_Back_FR1200x1200_5840fdbe-3165-4d91-abc6-0b1fbe2e7902.png?v=1748453506&width=700&height=700&crop=center",
        "https://cdn.shopify.com/s/files/1/1616/9825/files/545_RWB_OldGloryPVC_Front_WEB.png?v=1748453549&width=700&height=700&crop=center",
      ],
      rating: 4,
      reviews: 67,
      colors: ["#000000", "#FFFFFF", "#FF0000", "#0000FF", "#008000"],
    },
    {
      id: 5,
      name: "Cozy Beanie",
      priceRange: "$16-$24",
      images: [
        "https://cdn.shopify.com/s/files/1/1616/9825/products/1656247_OldGloryPVC545-White-RedBlueRope_060623.png?v=1746567425&width=500&crop=center",
        "https://cdn.shopify.com/s/files/1/1616/9825/files/545_RWB_Back_FR1200x1200_5840fdbe-3165-4d91-abc6-0b1fbe2e7902.png?v=1748453506&width=700&height=700&crop=center",
        "https://cdn.shopify.com/s/files/1/1616/9825/files/545_RWB_OldGloryPVC_Front_WEB.png?v=1748453549&width=700&height=700&crop=center",
      ],
      rating: 4,
      reviews: 67,
      colors: ["#000000", "#FFFFFF", "#FF0000", "#0000FF", "#008000"],
    },
  ];

  const tshirtProducts = [
    {
      id: 5,
      name: "Premium Cotton Tee",
      priceRange: "$18-$26",
      images: [
        "https://png.pngtree.com/png-vector/20241102/ourmid/pngtree-premium-black-t-shirt-mockup-png-image_14226805.png",
        "https://perfecttshirtco.com/cdn/shop/products/men-s-workout-6-pack-tri-blend-t-shirt-bundle-short-sleeve-crew-neck-perfect-tshirt-co-5.jpg?v=1716766496",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_9UAtZgaViB4g9Ad-Qsjb9TSpbxoPbBYYB-rL-zczAUEimnREWZJkkztGeV6xI9cfBjI&usqp=CAU",
      ],
      rating: 5,
      reviews: 203,
      colors: [
        "#000000",
        "#FFFFFF",
        "#FF0000",
        "#0000FF",
        "#008000",
        "#FFFF00",
        "#FFA500",
        "#800080",
      ],
      tag: "Best Seller",
    },
    {
      id: 6,
      name: "Basic T-Shirt",
      priceRange: "$15-$22",
      images: [
        "https://thumbs.dreamstime.com/b/orange-t-shirt-showcase-white-373791595.jpg",
        "https://www.nextprint.in/cdn/shop/files/Orangefrontplain_97bc7022-f789-4f08-9c42-e8d567724641_grande.png?v=1709375816",
        "https://m.media-amazon.com/images/I/210wpfNI12L._UY1000_.jpg",
      ],
      rating: 5,
      reviews: 145,
      colors: ["#000000", "#FFFFFF", "#FF0000", "#0000FF", "#008000"],
    },
    {
      id: 7,
      name: "Long Sleeve Tee",
      priceRange: "$23-$31",
      images: [
        "https://static.vecteezy.com/system/resources/previews/035/883/138/non_2x/ai-generated-man-long-sleeve-black-tshirt-isolated-on-transparent-background-free-png.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD4qotliduRjFjKtjWBJu1xOtLlzWXXI7sHGqoMuh4_10PQTBhR8hd1xDb82ekwmREje0&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2YulF7M2E_n3eqbGQa0v-NuSlyzSikqae3ZclxtPlLacBeNoC4NlTCgbpEhxe7CoDU5Q&usqp=CAU",
      ],
      rating: 4,
      reviews: 98,
      colors: [
        "#000000",
        "#FFFFFF",
        "#FF0000",
        "#0000FF",
        "#008000",
        "#FFFF00",
      ],
    },
    {
      id: 8,
      name: "Tank Top",
      priceRange: "$15-$21",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw2SXmMWrplOek2FL9uoxP8WkAMrYxZX6IjOVpPM-ZMgns_2RXS3WwSWVyUYctUJ41ssY&usqp=CAU",
      ],
      rating: 4,
      reviews: 76,
      colors: ["#000000", "#FFFFFF", "#FF0000", "#0000FF", "#008000"],
    },
  ];

  const hoodieProducts = [
    {
      id: 9,
      name: "Pullover Hoodie",
      priceRange: "$39-$52",
      images: [
        "https://img.freepik.com/premium-photo/png-hoodie-mockup-sweatshirt-gray-coathanger_53876-686685.jpg?semt=ais_incoming&w=740&q=80",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTrHLYCtANAlfltp05phPMeWW0T6F5oorIQe7p2MwSc5QBUYg03xcRgKQkHA0ZRLfxL_c&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfO2iwjNvfyoDQatSjJ5q8K2GEK-1kPv9RL4vXunrWtHzjYFMpewHKUFHbH77na5QsPfE&usqp=CAU",
      ],
      rating: 5,
      reviews: 187,
      colors: [
        "#000000",
        "#FFFFFF",
        "#FF0000",
        "#0000FF",
        "#008000",
        "#800080",
      ],
      tag: "Best Seller",
    },
    {
      id: 10,
      name: "Zip-Up Hoodie",
      priceRange: "$44-$58",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjzE6L53fHCHAJpOM6iGam308bi01GwUlBRw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVzg5pH3oATEcDoTvYjRB-gRtyKWcCpsc_ww&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjmsm6tBDgwHQtrykIJdx5eXVMyBj1gbW1Dx0659SH9boZzKtsMSZcgw_97_dG7jqcXus&usqp=CAU",
      ],
      rating: 5,
      reviews: 134,
      colors: ["#000000", "#FFFFFF", "#FF0000", "#0000FF", "#008000"],
      tag: "Popular",
    },
    {
      id: 11,
      name: "Cozy Sweatshirt",
      priceRange: "$34-$45",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThn4V5ThHnsgBEouskJikNpVAbKkEGSIhYcQ&s",
        "https://veirdo.in/cdn/shop/files/Grey_Plain_Regular_Hoodie.jpg?v=1754544968",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQExu-E3Usnu961kMaagtmHGIVtbi1yod00Xj5v5Sa9exQB_eObgCLQegd22cgqJPz0hTA&usqp=CAU",
      ],
      rating: 4,
      reviews: 92,
      colors: [
        "#000000",
        "#FFFFFF",
        "#FF0000",
        "#0000FF",
        "#008000",
        "#FFFF00",
      ],
    },
    {
      id: 12,
      name: "Custom Hoodie",
      priceRange: "$42-$55",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLFi_Llj19pf3VBASyO5hXGg6jRaf5tFzk_A&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV0bVw6eGxXhTRBdlx5xZNrV-zpToboEetAjsmTLoFskhaza8yGtQ06RfsGm5yM-SSNzI&usqp=CAU",
      ],
      rating: 4,
      reviews: 58,
      colors: ["#000000", "#FFFFFF", "#FF0000", "#0000FF", "#008000"],
    },
  ];

  const poloProducts = [
    {
      id: 13,
      name: "Classic Polo",
      priceRange: "$28-$38",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYm48k9OTARqLwLylRlp_GalMZNp0BxPxXWg&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrvrUrivgqj_KjQ2T8ZkoXkOMXxPgO9GnAKgvwg3oGrDpgXdLAVlUdZuw91vCOgpM220Y&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbOB8Wi6eJ12KTtH_nGSSxMf7fiEWlCFkqytoUsA4U2azAHXCFnftvMyPhDnIw7_nYDwE&usqp=CAU",
      ],
      rating: 5,
      reviews: 112,
      colors: [
        "#000000",
        "#FFFFFF",
        "#FF0000",
        "#0000FF",
        "#008000",
        "#FFFF00",
      ],
      tag: "Professional",
    },
    {
      id: 14,
      name: "Performance Polo",
      priceRange: "$32-$42",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQijR_uo2eU6tsX6YPFOSgpMb3P3R0NEcfYBKYXW33MK1Oh5Y3tE4RkaMvJtWJsNZ58CjQ&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfR0y7dP6SXXJaCHF9pW-QeY1odvGYR9QxoJDA93NSQmuZy-vN7gG7P_aTOPiMY9Sov5w&usqp=CAU",
      ],
      rating: 5,
      reviews: 89,
      colors: ["#000000", "#FFFFFF", "#FF0000", "#0000FF", "#008000"],
      tag: "Best Seller",
    },
    {
      id: 15,
      name: "Long Sleeve Polo",
      priceRange: "$31-$41",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEowz1NOZZIPhJBzsLvwgs2MCGvntFGUcqIg&s",
        "/custom-polo-shirt.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBiftnI3UBM38GJVkbcgyyXumdA8jIF6yBshgR-z4LROLukMuFc9P7w7GVGEPtnT9103U&usqp=CAU",
      ],
      rating: 4,
      reviews: 67,
      colors: [
        "#000000",
        "#FFFFFF",
        "#FF0000",
        "#0000FF",
        "#008000",
        "#800080",
      ],
    },
    {
      id: 16,
      name: "Pique Polo",
      priceRange: "$26-$36",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeFPV7Qy_WNQt9m157SWMvZzpmdJ4JlCP2nw&s",
        "https://www.unwritten.vip/cdn/shop/files/CS_3.png?v=1746443545",
      ],
      rating: 5,
      reviews: 94,
      colors: ["#000000", "#FFFFFF", "#FF0000", "#0000FF", "#008000"],
    },
  ];
  return (
    <main className="min-h-screen">
      <HeroSlider />
      <CategorySection />
      {/* <FeaturesSection /> */}
      <HowItWorks />
      <ProductShowcase
        title="Premium T-Shirts Collection"
        products={tshirtProducts}
      />
      <StatsSection />
      <ProductShowcase title="Our Best Selling Hats" products={hatProducts} />
      <ProductShowcase
        title="Cozy Hoodies & Sweatshirts"
        products={hoodieProducts}
      />
      <VideoSection />
      <ProductShowcase
        title="Professional Polo Shirts"
        products={poloProducts}
      />

      <Testimonials />

      <ReelsSection />
    </main>
  );
}
