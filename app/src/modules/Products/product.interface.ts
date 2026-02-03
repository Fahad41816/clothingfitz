export interface TPackage {
  title: string;
  qty: number;
  ispopular: boolean;
}

export interface TColor {
  name: string;
  images: string[];
  hex: string;
  isActive: boolean;
}

export interface TSizeCharge {
  size: string;
  charge: number;
}

export interface TProduct {
  title: string;
  price: number;
  discount_price: number;
  package: TPackage[];
  colors: TColor[];
  primaryImages: string[];
  sizeCharge: TSizeCharge[];
  description: string;
  category: "T-Shirt" | "Hats" | "Hoodie" | "Sweatshirt" | "Polo";
  isActive: boolean;
}
