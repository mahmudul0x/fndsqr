import menuAppetizers from "@/assets/menu-appetizers.jpg";
import menuBiriyani from "@/assets/menu-biriyani.jpg";
import menuPizza from "@/assets/menu-pizza.jpg";
import menuBurger from "@/assets/menu-burger.jpg";
import menuGrilled from "@/assets/menu-grilled.jpg";
import menuDrinks from "@/assets/menu-drinks.jpg";
import menuPasta from "@/assets/menu-pasta.jpg";
import foodShowcase from "@/assets/food-showcase.jpg";

// Per-item images (eager glob - Vite injects URLs at build time)
const itemImageModules = import.meta.glob("@/assets/items/*.png", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const itemImages: Record<string, string> = {};
for (const path in itemImageModules) {
  const id = path.split("/").pop()!.replace(".png", "");
  itemImages[id] = itemImageModules[path];
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
  badge?: string;
}

export const categoryImages: Record<string, string> = {
  "Appetizers": menuAppetizers,
  "Fried Chicken": menuAppetizers,
  "Meat Box": menuGrilled,
  "Soup": foodShowcase,
  "Rice": menuBiriyani,
  "Curry": menuBiriyani,
  "Vegetables": foodShowcase,
  "Salad": foodShowcase,
  "Sizzling": menuGrilled,
  "Pasta": menuPasta,
  "Sandwich": menuBurger,
  "Burger": menuBurger,
  "Pizza": menuPizza,
  "Chowmein": menuPasta,
  "Grilled Chicken": menuGrilled,
  "Kabab": menuGrilled,
  "Biriyani / Kacchi": menuBiriyani,
  "Set Menu": foodShowcase,
  "Combo Platter": foodShowcase,
  "Drinks": menuDrinks,
};

/** Returns per-item image if available, otherwise category image. */
export const getItemImage = (item: MenuItem): string =>
  itemImages[item.id] || categoryImages[item.category] || foodShowcase;

export const categories = [
  "All",
  "Appetizers",
  "Meat Box",
  "Fried Chicken",
  "Soup",
  "Rice",
  "Curry",
  "Vegetables",
  "Salad",
  "Sizzling",
  "Pasta",
  "Sandwich",
  "Burger",
  "Pizza",
  "Chowmein",
  "Grilled Chicken",
  "Kabab",
  "Biriyani / Kacchi",
  "Set Menu",
  "Combo Platter",
  "Drinks",
];

export const menuItems: MenuItem[] = [
  // APPETIZERS
  { id: "a1", name: "French Fries (100g)", price: 140, category: "Appetizers", description: "Golden crispy fries, perfectly seasoned", badge: "Popular" },
  { id: "a2", name: "Thai Wonton (6 pcs)", price: 180, category: "Appetizers", description: "Crispy Thai-style wontons with sweet chili" },
  { id: "a3", name: "Special Wonton (6pcs)", price: 220, category: "Appetizers", description: "Our signature wontons with special filling" },
  { id: "a4", name: "Chicken Wings (8 pcs)", price: 260, category: "Appetizers", description: "Juicy chicken wings, crispy on the outside", badge: "Best Seller" },
  { id: "a5", name: "BBQ Wings (6pcs)", price: 250, category: "Appetizers", description: "Smoky BBQ glazed chicken wings" },
  { id: "a6", name: "Hot Naga Wings (6pcs)", price: 250, category: "Appetizers", description: "Fiery naga chili wings for the brave", badge: "🔥 Spicy" },
  { id: "a7", name: "Chicken Lollipop (6pcs)", price: 260, category: "Appetizers", description: "Crispy chicken lollipops with tangy sauce" },
  { id: "a8", name: "Special Chicken Nachos", price: 250, category: "Appetizers", description: "Loaded nachos with chicken and cheese" },
  { id: "a9", name: "Fish Finger (6pcs)", price: 260, category: "Appetizers", description: "Golden crispy fish fingers with tartar sauce" },

  { id: "mb1", name: "Regular Meat Box", price: 250, category: "Meat Box", description: "Assorted meat selection in a box" },
  { id: "mb2", name: "Special Chicken Meat Box", price: 350, category: "Meat Box", description: "Premium chicken selection box", badge: "Special" },

  { id: "fc1", name: "Crispy Fried Chicken (1pcs)", price: 120, category: "Fried Chicken", description: "Single piece crispy fried chicken" },
  { id: "fc2", name: "Thai Style Fried Chicken (4 pcs)", price: 220, category: "Fried Chicken", description: "Thai-seasoned crispy chicken pieces" },
  { id: "fc3", name: "Thai Style Fried Chicken (8 pcs)", price: 410, category: "Fried Chicken", description: "Family size Thai crispy chicken", badge: "Value" },
  { id: "fc4", name: "Thai Style Fried Chicken (1 pcs Sonali)", price: 150, category: "Fried Chicken", description: "Premium Sonali chicken, Thai style" },

  { id: "s1", name: "Chicken Corn Soup", price: 180, category: "Soup", description: "Classic chicken corn soup" },
  { id: "s2", name: "Thai Soup", price: 200, category: "Soup", description: "Authentic Thai flavored soup" },
  { id: "s3", name: "Tom Yum Soup", price: 220, category: "Soup", description: "Spicy and sour Thai classic", badge: "Popular" },
  { id: "s4", name: "Hot & Sour Soup", price: 200, category: "Soup", description: "Rich and tangy hot & sour soup" },

  { id: "r1", name: "Plain Rice", price: 60, category: "Rice", description: "Steamed white basmati rice" },
  { id: "r2", name: "Fried Rice (Chicken)", price: 200, category: "Rice", description: "Wok-tossed chicken fried rice" },
  { id: "r3", name: "Egg Fried Rice", price: 160, category: "Rice", description: "Classic egg fried rice" },
  { id: "r4", name: "Thai Basil Fried Rice", price: 250, category: "Rice", description: "Aromatic basil fried rice", badge: "Chef's Pick" },
  { id: "r5", name: "Special Mixed Fried Rice", price: 280, category: "Rice", description: "Mixed fried rice with premium toppings" },

  { id: "c1", name: "Chicken Curry", price: 220, category: "Curry", description: "Traditional chicken curry" },
  { id: "c2", name: "Thai Green Curry", price: 280, category: "Curry", description: "Creamy Thai green curry with herbs" },
  { id: "c3", name: "Thai Red Curry", price: 280, category: "Curry", description: "Rich and spicy Thai red curry" },
  { id: "c4", name: "Butter Chicken", price: 300, category: "Curry", description: "Creamy tomato butter chicken", badge: "Best Seller" },
  { id: "c5", name: "Chicken Tikka Masala", price: 300, category: "Curry", description: "Smoky tikka in masala gravy" },

  { id: "v1", name: "Mixed Vegetables", price: 150, category: "Vegetables", description: "Seasonal mixed vegetables" },
  { id: "v2", name: "Stir Fried Vegetables", price: 180, category: "Vegetables", description: "Wok-tossed fresh vegetables" },
  { id: "v3", name: "Paneer Butter Masala", price: 250, category: "Vegetables", description: "Rich paneer in butter sauce" },

  { id: "sa1", name: "Green Salad", price: 100, category: "Salad", description: "Fresh garden salad" },
  { id: "sa2", name: "Chicken Caesar Salad", price: 250, category: "Salad", description: "Classic Caesar with grilled chicken" },
  { id: "sa3", name: "Thai Papaya Salad", price: 200, category: "Salad", description: "Refreshing Thai papaya salad" },

  { id: "sz1", name: "Chicken Sizzling", price: 350, category: "Sizzling", description: "Sizzling hot chicken platter" },
  { id: "sz2", name: "Mixed Sizzling", price: 450, category: "Sizzling", description: "Mixed meat sizzling platter", badge: "Premium" },
  { id: "sz3", name: "Fish Sizzling", price: 400, category: "Sizzling", description: "Fresh fish sizzling platter" },

  { id: "p1", name: "Chicken Alfredo Pasta", price: 280, category: "Pasta", description: "Creamy alfredo with grilled chicken", badge: "Popular" },
  { id: "p2", name: "Bolognese Pasta", price: 280, category: "Pasta", description: "Rich meat sauce pasta" },
  { id: "p3", name: "Creamy White Sauce Pasta", price: 250, category: "Pasta", description: "Classic white sauce pasta" },
  { id: "p4", name: "Penne Arrabiata", price: 250, category: "Pasta", description: "Spicy tomato penne" },

  { id: "sw1", name: "Club Sandwich", price: 220, category: "Sandwich", description: "Triple-decker club sandwich" },
  { id: "sw2", name: "Chicken Sandwich", price: 180, category: "Sandwich", description: "Grilled chicken sandwich" },
  { id: "sw3", name: "Grilled Cheese Sandwich", price: 160, category: "Sandwich", description: "Melted cheese grilled sandwich" },

  { id: "b1", name: "Classic Chicken Burger", price: 200, category: "Burger", description: "Juicy chicken patty burger" },
  { id: "b2", name: "Double Chicken Burger", price: 300, category: "Burger", description: "Double patty loaded burger", badge: "Best Seller" },
  { id: "b3", name: "Spicy Zinger Burger", price: 250, category: "Burger", description: "Crispy spicy zinger burger" },
  { id: "b4", name: "Cheese Burger", price: 280, category: "Burger", description: "Classic cheeseburger" },

  { id: "pz1", name: "Margherita Pizza (8\")", price: 300, category: "Pizza", description: "Classic margherita with mozzarella" },
  { id: "pz2", name: "Chicken BBQ Pizza (8\")", price: 400, category: "Pizza", description: "BBQ chicken pizza", badge: "Popular" },
  { id: "pz3", name: "Pepperoni Pizza (8\")", price: 400, category: "Pizza", description: "Classic pepperoni pizza" },
  { id: "pz4", name: "Supreme Pizza (8\")", price: 450, category: "Pizza", description: "Loaded supreme pizza" },
  { id: "pz5", name: "Margherita Pizza (12\")", price: 500, category: "Pizza", description: "Large margherita pizza" },
  { id: "pz6", name: "Chicken BBQ Pizza (12\")", price: 650, category: "Pizza", description: "Large BBQ chicken pizza", badge: "Value" },

  { id: "ch1", name: "Chicken Chowmein", price: 200, category: "Chowmein", description: "Stir-fried chicken noodles" },
  { id: "ch2", name: "Egg Chowmein", price: 160, category: "Chowmein", description: "Classic egg noodles" },
  { id: "ch3", name: "Mixed Chowmein", price: 250, category: "Chowmein", description: "Mixed chowmein with everything" },
  { id: "ch4", name: "Special Chowmein", price: 280, category: "Chowmein", description: "Chef's special chowmein", badge: "Chef's Pick" },

  { id: "gc1", name: "Grilled Chicken (Quarter)", price: 200, category: "Grilled Chicken", description: "Quarter grilled chicken" },
  { id: "gc2", name: "Grilled Chicken (Half)", price: 380, category: "Grilled Chicken", description: "Half grilled chicken" },
  { id: "gc3", name: "Grilled Chicken (Full)", price: 700, category: "Grilled Chicken", description: "Full grilled chicken", badge: "Value" },
  { id: "gc4", name: "Honey Grilled Chicken", price: 250, category: "Grilled Chicken", description: "Sweet honey glazed grilled chicken" },

  { id: "k1", name: "Chicken Seekh Kabab (4pcs)", price: 220, category: "Kabab", description: "Spiced minced chicken kabab" },
  { id: "k2", name: "Reshmi Kabab (4pcs)", price: 250, category: "Kabab", description: "Soft and silky reshmi kabab", badge: "Popular" },
  { id: "k3", name: "Tangri Kabab (2pcs)", price: 280, category: "Kabab", description: "Marinated drumstick kabab" },
  { id: "k4", name: "Mixed Kabab Platter", price: 500, category: "Kabab", description: "Assorted kabab platter for sharing", badge: "Best for Sharing" },

  { id: "bk1", name: "Chicken Biriyani", price: 250, category: "Biriyani / Kacchi", description: "Aromatic chicken biriyani" },
  { id: "bk2", name: "Mutton Biriyani", price: 350, category: "Biriyani / Kacchi", description: "Rich mutton biriyani", badge: "Premium" },
  { id: "bk3", name: "Kacchi Biriyani", price: 300, category: "Biriyani / Kacchi", description: "Traditional kacchi biriyani", badge: "Best Seller" },
  { id: "bk4", name: "Special Kacchi (Full)", price: 550, category: "Biriyani / Kacchi", description: "Full pot special kacchi biriyani" },

  { id: "sm1", name: "Set Menu (2 Person)", price: 550, category: "Set Menu", description: "Complete meal for 2" },
  { id: "sm2", name: "Set Menu (4 Person)", price: 1000, category: "Set Menu", description: "Complete meal for 4", badge: "Value" },
  { id: "sm3", name: "Set Menu (6 Person)", price: 1500, category: "Set Menu", description: "Complete meal for 6" },
  { id: "sm4", name: "Premium Set Menu (2 Person)", price: 700, category: "Set Menu", description: "Premium curated meal for 2", badge: "Premium" },

  { id: "cp1", name: "Chicken Combo Platter", price: 450, category: "Combo Platter", description: "Assorted chicken combos" },
  { id: "cp2", name: "Family Combo Platter", price: 800, category: "Combo Platter", description: "Large family sharing platter", badge: "Best for Family" },
  { id: "cp3", name: "Friends Special Combo", price: 650, category: "Combo Platter", description: "Perfect for a group hangout", badge: "Special" },

  { id: "d1", name: "Hot Coffee", price: 120, category: "Drinks", description: "Freshly brewed hot coffee" },
  { id: "d2", name: "Cold Coffee", price: 150, category: "Drinks", description: "Iced coffee blended smooth" },
  { id: "d3", name: "Fresh Orange Juice", price: 150, category: "Drinks", description: "Freshly squeezed orange juice" },
  { id: "d4", name: "Mango Lassi", price: 130, category: "Drinks", description: "Creamy mango yogurt drink", badge: "Popular" },
  { id: "d5", name: "Sweet Lassi", price: 100, category: "Drinks", description: "Traditional sweet yogurt drink" },
  { id: "d6", name: "Fresh Lemonade", price: 80, category: "Drinks", description: "Refreshing fresh lemonade" },
  { id: "d7", name: "Mint Lemonade", price: 100, category: "Drinks", description: "Cool mint lemonade" },
  { id: "d8", name: "Chocolate Shake", price: 180, category: "Drinks", description: "Rich chocolate milkshake" },
  { id: "d9", name: "Mango Shake", price: 160, category: "Drinks", description: "Fresh mango milkshake" },
  { id: "d10", name: "Vanilla Ice Cream", price: 100, category: "Drinks", description: "Classic vanilla ice cream" },
  { id: "d11", name: "Chocolate Ice Cream", price: 120, category: "Drinks", description: "Rich chocolate ice cream" },
  { id: "d12", name: "Strawberry Shake", price: 170, category: "Drinks", description: "Fresh strawberry milkshake" },
];
