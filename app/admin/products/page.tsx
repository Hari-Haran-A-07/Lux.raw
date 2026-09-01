"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, Search, Check, X, Sparkles } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Form State
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [gender, setGender] = useState("WOMEN");
  const [material, setMaterial] = useState("100% Full-Grain French Calfskin");
  const [color, setColor] = useState("Noir Obsidian");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop");
  const [featured, setFeatured] = useState(false);
  const [newArrival, setNewArrival] = useState(true);
  const [bestseller, setBestseller] = useState(false);
  const [status, setStatus] = useState("ACTIVE");

  async function loadData() {
    try {
      const [pRes, cRes, colRes] = await Promise.all([
        fetch("/api/admin/products"),
        fetch("/api/categories"),
        fetch("/api/collections"),
      ]);
      const pData = await pRes.json();
      const cData = await cRes.json();
      const colData = await colRes.json();

      setProducts(pData.products || []);
      setCategories(cData.categories || []);
      setCollections(colData.collections || []);
      if (cData.categories?.length > 0 && !categoryId) {
        setCategoryId(cData.categories[0].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          subtitle,
          description,
          price,
          sku: sku || `LR-PRD-${Date.now()}`,
          categoryId,
          collectionId: collectionId || null,
          gender,
          material,
          color,
          featured,
          newArrival,
          bestseller,
          status,
          images: [{ url: imageUrl, alt: name }],
          variants: [
            { size: "Medium (Standard)", color, stock: 12 },
            { size: "Large", color, stock: 8 },
          ],
        }),
      });
      if (res.ok) {
        setIsCreateOpen(false);
        resetForm();
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingProduct.id,
          name,
          subtitle,
          description,
          price,
          material,
          color,
          featured,
          newArrival,
          bestseller,
          status,
        }),
      });
      if (res.ok) {
        setEditingProduct(null);
        resetForm();
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you wish to delete this maison creation?")) return;
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openEdit = (p: any) => {
    setEditingProduct(p);
    setName(p.name);
    setSubtitle(p.subtitle || "");
    setDescription(p.description);
    setPrice(p.price.toString());
    setMaterial(p.material);
    setColor(p.color);
    setFeatured(p.featured);
    setNewArrival(p.newArrival);
    setBestseller(p.bestseller);
    setStatus(p.status);
  };

  const resetForm = () => {
    setName("");
    setSubtitle("");
    setDescription("");
    setPrice("");
    setSku("");
    setMaterial("100% Full-Grain French Calfskin");
    setColor("Noir Obsidian");
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272a] pb-6">
        <div>
          <span className="text-[10px] font-editorial-caps text-[#b59a6d] tracking-widest block mb-1">
            CATALOG CURATION
          </span>
          <h1 className="font-serif text-3xl font-light text-[#f4f3ef]">
            Product Catalog & Atelier Dossiers
          </h1>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsCreateOpen(true);
          }}
          className="bg-[#f4f3ef] text-[#09090b] px-6 py-3 text-xs font-editorial-caps flex items-center gap-2 hover:bg-[#b59a6d] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>ADD NEW CREATION</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="flex items-center gap-3 bg-[#111114] border border-[#27272a] px-4 py-2 max-w-md">
        <Search className="w-4 h-4 text-[#71717a]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by name, SKU, or category..."
          className="bg-transparent text-xs text-[#f4f3ef] focus:outline-none flex-1 font-light"
        />
      </div>

      {/* Products Table */}
      <div className="bg-[#111114] border border-[#27272a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#27272a] text-[#71717a] font-editorial-caps bg-[#0d0d0f]">
                <th className="py-3 px-4">CREATION</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">METIER</th>
                <th className="py-3 px-4">PRICE</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">BADGES</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272a]/50 text-[#d4d4d8] font-light">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-[#18181b] transition-colors">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div className="relative aspect-[3/4] w-10 bg-[#18181b] overflow-hidden flex-shrink-0">
                      {p.images[0]?.url ? (
                        <Image src={p.images[0].url} alt={p.name} fill className="object-cover" />
                      ) : null}
                    </div>
                    <div>
                      <h4 className="font-serif text-sm text-white">{p.name}</h4>
                      <p className="text-[11px] text-[#71717a]">{p.origin}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-[#b59a6d]">{p.sku}</td>
                  <td className="py-3 px-4">{p.category?.name}</td>
                  <td className="py-3 px-4 font-serif text-white">{formatCurrency(p.price)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] font-editorial-caps px-2 py-0.5 ${
                        p.status === "ACTIVE"
                          ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 space-x-1">
                    {p.featured && (
                      <span className="bg-[#18181b] border border-[#b59a6d]/40 text-[#b59a6d] text-[9px] font-editorial-caps px-1.5 py-0.5">
                        FEATURED
                      </span>
                    )}
                    {p.bestseller && (
                      <span className="bg-[#18181b] border border-[#27272a] text-white text-[9px] font-editorial-caps px-1.5 py-0.5">
                        ICON
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="p-1.5 text-[#a1a1aa] hover:text-[#b59a6d] transition-colors"
                      title="Edit Product"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-1.5 text-[#a1a1aa] hover:text-rose-400 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {(isCreateOpen || editingProduct) && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0d0d0f] border border-[#27272a] max-w-2xl w-full p-8 text-[#f4f3ef] relative animate-fade-in space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
              <h3 className="font-serif text-2xl font-light">
                {editingProduct ? "Edit Maison Creation" : "Add New Creation"}
              </h3>
              <button
                onClick={() => {
                  setIsCreateOpen(false);
                  setEditingProduct(null);
                }}
                className="p-1 text-[#71717a] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingProduct ? handleUpdate : handleCreate} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">PRODUCT NAME *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="The Monolith Trapeze Bag"
                    className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">PRICE (USD $) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="3450"
                    className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none font-serif"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">SKU IDENTIFIER</label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="LR-BAG-001"
                    className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none font-mono"
                  />
                </div>

                {!editingProduct && (
                  <>
                    <div className="space-y-1">
                      <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">METIER / CATEGORY</label>
                      <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">COLLECTION</label>
                      <select
                        value={collectionId}
                        onChange={(e) => setCollectionId(e.target.value)}
                        className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
                      >
                        <option value="">None (Permanent)</option>
                        {collections.map((col) => (
                          <option key={col.id} value={col.id}>
                            {col.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">PRIMARY COLOR / HUE</label>
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="Noir Obsidian"
                    className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">STATUS</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="DRAFT">DRAFT</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">MATERIAL COMPOSITION</label>
                  <input
                    type="text"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    placeholder="100% Full-Grain French Calfskin"
                    className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
                  />
                </div>

                {!editingProduct && (
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">PRIMARY IMAGE URL</label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
                    />
                  </div>
                )}

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[#a1a1aa] font-editorial-caps text-[10px]">DESCRIPTION & CONCEPT</label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Architectural trapeze bag constructed from cold-molded bridle leather..."
                    className="w-full bg-[#18181b] border border-[#27272a] p-3 text-[#f4f3ef] focus:border-[#b59a6d] focus:outline-none"
                  />
                </div>

                {/* Flags */}
                <div className="sm:col-span-2 flex flex-wrap gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="accent-[#b59a6d]"
                    />
                    <span>Featured on Homepage</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newArrival}
                      onChange={(e) => setNewArrival(e.target.checked)}
                      className="accent-[#b59a6d]"
                    />
                    <span>New Arrival Badge</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bestseller}
                      onChange={(e) => setBestseller(e.target.checked)}
                      className="accent-[#b59a6d]"
                    />
                    <span>Maison Icon Badge</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-[#27272a]">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateOpen(false);
                    setEditingProduct(null);
                  }}
                  className="w-1/3 border border-[#27272a] text-xs font-editorial-caps py-3 hover:border-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-[#f4f3ef] text-[#09090b] text-xs font-editorial-caps py-3 hover:bg-[#b59a6d] transition-colors"
                >
                  {editingProduct ? "SAVE CHANGES" : "PUBLISH CREATION"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
