import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  FiHome, FiPackage, FiLogOut, FiPlus, FiEdit2, FiTrash2, 
  FiSearch, FiX, FiCheck, FiImage 
} from "react-icons/fi";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  category: "anthracite" | "bituminous" | "thermal";
  description: string;
  features: string[];
  status: "active" | "draft";
}

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Premium Anthracite Coal",
    category: "anthracite",
    description: "High-grade coal used in metallurgy with exceptional carbon content.",
    features: ["High Carbon Content", "Low Impurities", "Metallurgical Grade"],
    status: "active",
  },
  {
    id: "2",
    name: "Industrial Bituminous Coal",
    category: "bituminous",
    description: "Versatile coal for power generation and industrial heating.",
    features: ["Power Generation", "Industrial Heating", "Consistent Quality"],
    status: "active",
  },
  {
    id: "3",
    name: "Thermal Coal Standard",
    category: "thermal",
    description: "Dense energy source for the global energy market.",
    features: ["High Energy Density", "Reliable Supply", "Market Standard"],
    status: "active",
  },
];

const categories = [
  { value: "anthracite", label: "Anthracite" },
  { value: "bituminous", label: "Bituminous" },
  { value: "thermal", label: "Thermal" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : initialProducts;
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "anthracite" as Product["category"],
    description: "",
    features: "",
    status: "active" as Product["status"],
  });

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin");
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        description: product.description,
        features: product.features.join(", "),
        status: product.status,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        category: "anthracite",
        description: "",
        features: "",
        status: "active",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.name,
      category: formData.category,
      description: formData.description,
      features: formData.features.split(",").map((f) => f.trim()).filter(Boolean),
      status: formData.status,
    };

    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? productData : p)));
      toast.success("Product updated successfully");
    } else {
      setProducts([...products, productData]);
      toast.success("Product added successfully");
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
      toast.success("Product deleted successfully");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border/30 p-6 hidden lg:block">
        <div className="flex items-center gap-3 mb-10">
          <svg viewBox="0 0 100 100" className="w-10 h-10">
            <polygon
              points="50,5 95,50 50,95 5,50"
              fill="none"
              stroke="url(#dashGradient)"
              strokeWidth="3"
            />
            <defs>
              <linearGradient id="dashGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(43 74% 49%)" />
                <stop offset="100%" stopColor="hsl(38 92% 50%)" />
              </linearGradient>
            </defs>
          </svg>
          <div>
            <span className="font-display text-lg font-bold text-gradient-gold">Admin</span>
            <p className="text-xs text-muted-foreground">Inca Phyto</p>
          </div>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
          >
            <FiHome className="w-5 h-5" />
            <span>View Website</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary">
            <FiPackage className="w-5 h-5" />
            <span>Products</span>
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-6 left-6 right-6 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors"
        >
          <FiLogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">Products</h1>
              <p className="text-sm text-muted-foreground">Manage your product catalog</p>
            </div>
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <FiPlus className="w-5 h-5" />
              <span>Add Product</span>
            </button>
          </div>
        </header>

        {/* Filters */}
        <div className="p-6 border-b border-border/20">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted/30 border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 rounded-xl bg-muted/30 border border-border/30 text-foreground focus:outline-none focus:border-primary transition-colors"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products grid */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <FiImage className="w-6 h-6 text-primary" />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === "active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-primary mb-2 capitalize">{product.category}</p>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.slice(0, 2).map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 rounded-lg bg-muted/30 text-xs text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(product)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border border-border/50 text-foreground/80 hover:border-primary hover:text-primary transition-colors"
                  >
                    <FiEdit2 className="w-4 h-4" />
                    <span className="text-sm">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex items-center justify-center w-10 rounded-xl border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products found</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg glass rounded-3xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  {editingProduct ? "Edit Product" : "Add Product"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 rounded-xl bg-muted/30 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/30 text-foreground focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value as Product["category"] })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/30 text-foreground focus:outline-none focus:border-primary transition-colors"
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value as Product["status"] })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/30 text-foreground focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/30 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Features (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    placeholder="Feature 1, Feature 2, Feature 3"
                    className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 rounded-xl border border-border/50 text-foreground/80 hover:bg-muted/30 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <FiCheck className="w-5 h-5" />
                    <span>{editingProduct ? "Update" : "Create"}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
