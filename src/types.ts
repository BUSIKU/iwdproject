export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Cases' | 'Chargers' | 'Audio' | 'Protection';
  image: string;
  rating: number;
  description: string;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
