import { useState, useMemo } from "react";
import { Search, X, Filter } from "lucide-react";
import { menuItems, categories } from "@/data/menuData";
import MenuCard from "@/components/MenuCard";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

const MenuPage = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "low" | "high">("default");

  const filtered = useMemo(() => {
    let items = [...menuItems];
    if (activeCategory !== "All") items = items.filter((i) => i.category === activeCategory);
    if (search.trim()) items = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
    if (sortBy === "low") items.sort((a, b) => a.price - b.price);
    if (sortBy === "high") items.sort((a, b) => b.price - a.price);
    return items;
  }, [activeCategory, search, sortBy]);

  const categoryCount = useMemo(() => {
    const counts: Record<string, number> = { All: menuItems.length };
    menuItems.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="pt-6 md:pt-12 pb-32 md:pb-20 bg-background min-h-screen">
      {/* Hero strip */}
      <section className="container mx-auto px-4 mb-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="chip bg-primary/10 text-primary mb-4">Our Kitchen</span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4 text-balance">
            The Full <em className="text-primary not-italic">Menu</em>
          </h1>
          <p className="text-muted-foreground text-pretty">
            Browse {menuItems.length}+ handcrafted dishes across {categories.length - 1} categories — from local Bangladeshi favourites to international classics.
          </p>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-16 md:top-20 z-30 bg-background/85 backdrop-blur-xl border-y border-border/50 mb-10">
        <div className="container mx-auto px-4 py-4 space-y-4">
          {/* Search + sort */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search any dish..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-full bg-secondary border border-transparent text-sm focus:outline-none focus:bg-card focus:border-primary/40 transition-all"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="hidden sm:block px-4 py-3 rounded-full bg-secondary border border-transparent text-sm font-medium focus:outline-none focus:bg-card focus:border-primary/40 cursor-pointer"
            >
              <option value="default">Sort: Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-warm)]"
                    : "bg-card text-foreground border border-border hover:border-primary/40"
                }`}
              >
                {cat}
                <span className={`ml-1.5 text-[10px] ${activeCategory === cat ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {categoryCount[cat] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results meta */}
      <div className="container mx-auto px-4 mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filtered.length}</span> dishes
          {activeCategory !== "All" && <> in <span className="font-semibold text-foreground">{activeCategory}</span></>}
        </p>
        {(search || activeCategory !== "All" || sortBy !== "default") && (
          <button
            onClick={() => { setSearch(""); setActiveCategory("All"); setSortBy("default"); }}
            className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
          >
            <Filter className="w-3.5 h-3.5" /> Reset
          </button>
        )}
      </div>

      {/* Items grid */}
      <div className="container mx-auto px-4">
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
          {filtered.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍽️</div>
            <p className="font-heading text-2xl font-bold mb-2">No dishes found</p>
            <p className="text-muted-foreground text-sm mb-6">Try a different search or category</p>
            <button onClick={() => { setSearch(""); setActiveCategory("All"); }} className="btn-primary px-6 py-2.5">
              Show all dishes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
