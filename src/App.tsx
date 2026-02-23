import { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Plus, 
  Minus, 
  Star, 
  ArrowRight,
  Smartphone,
  Zap,
  Headphones,
  ShieldCheck,
  ChevronRight,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return (
    <div className="min-h-screen font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 glass border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center text-white font-display font-bold">
                  S1
                </div>
                <span className="text-xl font-display font-bold tracking-tight">SMART ONE</span>
              </div>
              
              <div className="hidden md:flex items-center gap-6">
                {['All', 'Cases', 'Chargers', 'Audio', 'Protection'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-brand",
                      activeCategory === cat ? "text-brand" : "text-zinc-500"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search accessories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-zinc-100 border-none rounded-full text-sm focus:ring-2 focus:ring-brand/20 transition-all w-64"
                />
              </div>
              
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-brand text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <button className="md:hidden p-2 text-zinc-600">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-zinc-900 text-white py-20 lg:py-32">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-brand blur-[120px] rounded-full" />
            <div className="absolute bottom-0 -right-1/4 w-1/2 h-full bg-emerald-900 blur-[120px] rounded-full" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-3 py-1 bg-brand/20 text-brand text-xs font-bold tracking-widest uppercase rounded-full mb-6">
                  New Collection 2024
                </span>
                <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight mb-6">
                  Elevate Your <br />
                  <span className="text-brand">Mobile Experience</span>
                </h1>
                <p className="text-zinc-400 text-lg mb-10 max-w-lg">
                  Premium accessories designed for the modern lifestyle. Precision engineered, beautifully crafted, and built to last.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-brand hover:bg-brand-dark text-white font-bold rounded-xl transition-all flex items-center gap-2 group">
                    Shop Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all">
                    View Catalog
                  </button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                  <img 
                    src="https://picsum.photos/seed/hero-phone/800/1000" 
                    alt="Featured Accessory"
                    className="w-full h-auto"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl shadow-xl z-20 text-zinc-900">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center">
                      <Zap className="w-6 h-6 text-brand" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Fast Charging</p>
                      <p className="text-lg font-display font-bold">0 to 80% in 30min</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white border-b border-zinc-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Smartphone, title: 'Perfect Fit', desc: 'Precision cutouts' },
                { icon: Zap, title: 'Fast Charge', desc: 'PD 3.0 Support' },
                { icon: Headphones, title: 'Hi-Fi Audio', desc: 'Lossless sound' },
                { icon: ShieldCheck, title: 'Ultra Durable', desc: 'Military grade' },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-brand" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900">{feature.title}</h3>
                    <p className="text-sm text-zinc-500">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20 bg-zinc-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="text-3xl font-display font-bold mb-2">Featured Products</h2>
                <p className="text-zinc-500">Explore our most popular accessories</p>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                {['All', 'Cases', 'Chargers', 'Audio', 'Protection'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                      activeCategory === cat 
                        ? "bg-brand text-white shadow-lg shadow-brand/20" 
                        : "bg-white text-zinc-600 hover:bg-zinc-100"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group bg-white rounded-3xl overflow-hidden border border-zinc-200 hover:border-brand/30 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative aspect-square overflow-hidden bg-zinc-100">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      {product.isNew && (
                        <span className="absolute top-4 left-4 px-3 py-1 bg-brand text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                          New
                        </span>
                      )}
                      <button 
                        onClick={() => addToCart(product)}
                        className="absolute bottom-4 right-4 w-12 h-12 bg-white text-zinc-900 rounded-2xl shadow-lg flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-brand hover:text-white"
                      >
                        <Plus className="w-6 h-6" />
                      </button>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={cn(
                              "w-3 h-3",
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-zinc-200"
                            )} 
                          />
                        ))}
                        <span className="text-[10px] font-bold text-zinc-400 ml-1">{product.rating}</span>
                      </div>
                      <h3 className="text-lg font-bold text-zinc-900 mb-1 group-hover:text-brand transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-zinc-500 mb-4 line-clamp-1">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-display font-bold text-zinc-900">
                          ${product.price.toFixed(2)}
                        </span>
                        <button 
                          onClick={() => addToCart(product)}
                          className="text-sm font-bold text-brand flex items-center gap-1 hover:gap-2 transition-all"
                        >
                          Add to Cart
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-zinc-300" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">No products found</h3>
                <p className="text-zinc-500">Try adjusting your search or category filters.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center text-white font-display font-bold">
                  S1
                </div>
                <span className="text-xl font-display font-bold tracking-tight">SMART ONE</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                The ultimate destination for premium mobile accessories. Quality you can feel, style you can see.
              </p>
              <div className="flex gap-4">
                {['fb', 'tw', 'ig', 'yt'].map(s => (
                  <div key={s} className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-brand/20 hover:text-brand transition-colors cursor-pointer">
                    <span className="text-[10px] font-bold uppercase">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Shop</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-brand transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">iPhone Cases</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Chargers & Cables</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Audio Gear</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-brand transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Returns & Refunds</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Newsletter</h4>
              <p className="text-sm text-zinc-400 mb-4">Get 10% off your first order.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address"
                  className="bg-white/5 border-none rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-brand w-full"
                />
                <button className="bg-brand hover:bg-brand-dark px-4 py-2 rounded-lg transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-medium">
            <p>© 2024 SMART ONE. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-brand" />
                  <h2 className="text-xl font-display font-bold">Your Cart</h2>
                  <span className="text-xs font-bold bg-zinc-100 px-2 py-0.5 rounded-full text-zinc-500">
                    {cartCount}
                  </span>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
                      <ShoppingBag className="w-10 h-10 text-zinc-200" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 mb-2">Cart is empty</h3>
                    <p className="text-zinc-500 mb-8">Looks like you haven't added anything yet.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="px-8 py-3 bg-brand text-white font-bold rounded-xl"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-24 h-24 bg-zinc-100 rounded-2xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-bold text-zinc-900 leading-tight">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-zinc-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-zinc-500 mb-4">${item.price.toFixed(2)}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 bg-zinc-50 rounded-lg p-1">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="font-bold text-zinc-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              {cart.length > 0 && (
                <div className="p-6 border-t border-zinc-100 bg-zinc-50">
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm text-zinc-500">
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-zinc-500">
                      <span>Shipping</span>
                      <span className="text-brand font-bold uppercase text-[10px]">Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between text-lg font-display font-bold text-zinc-900 pt-2 border-t border-zinc-200">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <button className="w-full py-4 bg-brand hover:bg-brand-dark text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                    Checkout Now
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
