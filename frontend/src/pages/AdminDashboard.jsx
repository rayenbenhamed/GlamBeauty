import { useState, useEffect } from "react";
import apiClient from "@/api/client";
import SectionHeader from "@/components/SectionHeader.jsx";
import { Card, CardContent } from "@/components/ui/card.jsx";
import Button from "@/components/ui/button.jsx";
import Input from "@/components/ui/input.jsx";
import Textarea from "@/components/ui/textarea.jsx";

const isVideoUrl = (url) => {
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov|m4v|3gp|quicktime)($|\?)/i.test(url);
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // State collections
  const [stats, setStats] = useState(null);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [packs, setPacks] = useState([]);
  const [users, setUsers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);

  // Form states
  const [serviceForm, setServiceForm] = useState({ id: null, name: "", description: "", price: "", durationMinutes: "", categoryId: "" });
  const [packForm, setPackForm] = useState({ id: null, name: "", description: "", price: "", image: "" });
  const [galleryForm, setGalleryForm] = useState({ title: "", category: "HAIR", beforeUrl: "", afterUrl: "" });
  
  const [isEditingService, setIsEditingService] = useState(false);
  const [isEditingPack, setIsEditingPack] = useState(false);
  const [uploadingBefore, setUploadingBefore] = useState(false);
  const [uploadingAfter, setUploadingAfter] = useState(false);
  
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchOverviewStats();
    fetchServices();
    fetchCategories();
    fetchPacks();
    fetchUsers();
    fetchReservations();
    fetchGalleryItems();
  }, []);

  const fetchOverviewStats = async () => {
    try {
      const response = await apiClient.get("/admin/stats");
      setStats(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await apiClient.get("/services");
      setServices(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get("/categories");
      setCategories(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPacks = async () => {
    try {
      const response = await apiClient.get("/packs");
      setPacks(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get("/admin/users");
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await apiClient.get("/admin/reservations");
      setReservations(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchGalleryItems = async () => {
    try {
      const response = await apiClient.get("/gallery");
      setGalleryItems(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGalleryFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    if (field === "before") setUploadingBefore(true);
    else setUploadingAfter(true);
    try {
      const response = await apiClient.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setGalleryForm(prev => ({
        ...prev,
        [field === "before" ? "beforeUrl" : "afterUrl"]: response.data
      }));
      setSuccess("Gallery file uploaded successfully!");
    } catch (err) {
      setError("Failed to upload gallery file.");
    } finally {
      if (field === "before") setUploadingBefore(false);
      else setUploadingAfter(false);
    }
  };

  const handleSaveGalleryItem = async (e) => {
    e.preventDefault();
    if (!galleryForm.beforeUrl || !galleryForm.afterUrl) {
      setError("Both before and after media are required.");
      return;
    }
    try {
      await apiClient.post("/gallery", galleryForm);
      setSuccess("Gallery item created successfully!");
      setGalleryForm({ title: "", category: "HAIR", beforeUrl: "", afterUrl: "" });
      fetchGalleryItems();
    } catch (err) {
      setError("Failed to save gallery item.");
    }
  };

  const handleDeleteGalleryItem = async (id) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;
    try {
      await apiClient.delete(`/gallery/${id}`);
      setSuccess("Gallery item deleted successfully!");
      fetchGalleryItems();
    } catch (err) {
      setError("Failed to delete gallery item.");
    }
  };

  // Upload handler for Services/Packs images
  const handlePhotoUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    try {
      const response = await apiClient.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (type === "pack") {
        setPackForm({ ...packForm, image: response.data });
      }
      setSuccess("Image uploaded successfully from your computer!");
    } catch (err) {
      setError("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  // Manage Services
  const handleSaveService = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: serviceForm.name,
        description: serviceForm.description,
        price: parseFloat(serviceForm.price),
        durationMinutes: parseInt(serviceForm.durationMinutes),
        categoryId: serviceForm.categoryId ? parseInt(serviceForm.categoryId) : null
      };

      if (isEditingService) {
        await apiClient.put(`/admin/services/${serviceForm.id}`, payload);
        setSuccess("Service updated successfully!");
      } else {
        await apiClient.post("/admin/services", payload);
        setSuccess("Service added successfully!");
      }
      setServiceForm({ id: null, name: "", description: "", price: "", durationMinutes: "", categoryId: "" });
      setIsEditingService(false);
      fetchServices();
    } catch (err) {
      setError("Error saving service.");
    }
  };

  const handleDeleteService = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await apiClient.delete(`/admin/services/${id}`);
      setSuccess("Service deleted.");
      fetchServices();
    } catch (err) {
      setError("Failed to delete service.");
    }
  };

  // Manage Packs
  const handleSavePack = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: packForm.name,
        description: packForm.description,
        price: parseFloat(packForm.price),
        imageUrls: packForm.image ? [packForm.image] : [],
        serviceIds: []
      };

      if (isEditingPack) {
        await apiClient.put(`/admin/packs/${packForm.id}`, payload);
        setSuccess("Pack updated successfully!");
      } else {
        await apiClient.post("/admin/packs", payload);
        setSuccess("Pack created successfully!");
      }
      setPackForm({ id: null, name: "", description: "", price: "", image: "" });
      setIsEditingPack(false);
      fetchPacks();
    } catch (err) {
      setError("Error saving pack.");
    }
  };

  const handleDeletePack = async (id) => {
    if (!confirm("Are you sure you want to delete this pack?")) return;
    try {
      await apiClient.delete(`/admin/packs/${id}`);
      setSuccess("Pack deleted.");
      fetchPacks();
    } catch (err) {
      setError("Failed to delete pack.");
    }
  };

  // Manage Users role
  const handleRoleChange = async (userId, newRole) => {
    try {
      await apiClient.put(`/admin/users/${userId}/role`, null, {
        params: { role: newRole }
      });
      setSuccess("User role updated successfully!");
      fetchUsers();
    } catch (err) {
      setError("Failed to update user role.");
    }
  };

  // Manage Reservations
  const handleReservationStatus = async (resId, status) => {
    try {
      await apiClient.put(`/admin/reservations/${resId}/status`, null, {
        params: { status }
      });
      setSuccess(`Reservation status marked as ${status}!`);
      fetchReservations();
      fetchOverviewStats();
    } catch (err) {
      setError("Failed to update reservation status.");
    }
  };

  return (
    <main className="section-shell py-16">
      <SectionHeader
        eyebrow="Admin Console"
        title="GlamBeauty Center Management"
        subtitle="Manage services, packages, client reservations, and configure system user permissions."
      />

      {error && (
        <div className="mb-6 p-3 text-sm bg-red-50 text-red-600 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-6 p-3 text-sm bg-green-50 text-green-700 rounded">
          {success}
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap border-b border-gold/20 mb-8 gap-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`py-3 px-6 text-sm font-semibold border-b-2 transition ${
            activeTab === "overview" ? "border-gold text-gold" : "border-transparent text-ink/60 hover:text-ink"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("services")}
          className={`py-3 px-6 text-sm font-semibold border-b-2 transition ${
            activeTab === "services" ? "border-gold text-gold" : "border-transparent text-ink/60 hover:text-ink"
          }`}
        >
          Services
        </button>
        <button
          onClick={() => setActiveTab("packs")}
          className={`py-3 px-6 text-sm font-semibold border-b-2 transition ${
            activeTab === "packs" ? "border-gold text-gold" : "border-transparent text-ink/60 hover:text-ink"
          }`}
        >
          Packs
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`py-3 px-6 text-sm font-semibold border-b-2 transition ${
            activeTab === "users" ? "border-gold text-gold" : "border-transparent text-ink/60 hover:text-ink"
          }`}
        >
          Users & Roles
        </button>
        <button
          onClick={() => setActiveTab("reservations")}
          className={`py-3 px-6 text-sm font-semibold border-b-2 transition ${
            activeTab === "reservations" ? "border-gold text-gold" : "border-transparent text-ink/60 hover:text-ink"
          }`}
        >
          Reservations
        </button>
        <button
          onClick={() => setActiveTab("gallery")}
          className={`py-3 px-6 text-sm font-semibold border-b-2 transition ${
            activeTab === "gallery" ? "border-gold text-gold" : "border-transparent text-ink/60 hover:text-ink"
          }`}
        >
          Gallery
        </button>
      </div>

      {/* Overview Stats Tab */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent>
                <p className="text-xs uppercase tracking-wider text-ink/60">Total Clients</p>
                <p className="mt-3 font-display text-3xl text-gold">{stats?.totalClients || 0}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-xs uppercase tracking-wider text-ink/60">Reservations Today</p>
                <p className="mt-3 font-display text-3xl text-gold">{stats?.reservationsToday || 0}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-xs uppercase tracking-wider text-ink/60">Revenue This Month</p>
                <p className="mt-3 font-display text-3xl text-gold">{stats?.revenueThisMonth || 0} DT</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-xs uppercase tracking-wider text-ink/60">Pending Requests</p>
                <p className="mt-3 font-display text-3xl text-gold">
                  {reservations.filter(r => r.status === "PENDING").length}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="glass-panel p-6">
            <h3 className="font-display text-xl mb-4">Quick Links & Actions</h3>
            <p className="text-sm text-ink/70">
              Use the tab controls above to perform administrative tasks like approving reservations, configuring packs, or switching user roles to estheticians.
            </p>
          </div>
        </div>
      )}

      {/* Services Tab */}
      {activeTab === "services" && (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1 glass-panel p-6 h-fit">
            <h3 className="font-display text-xl mb-4">
              {isEditingService ? "Edit Service" : "Add Service"}
            </h3>
            <form onSubmit={handleSaveService} className="space-y-4">
              <Input
                placeholder="Service Name"
                value={serviceForm.name}
                onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                required
              />
              <Textarea
                placeholder="Description"
                value={serviceForm.description}
                onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                required
              />
              <Input
                type="number"
                placeholder="Price (DT)"
                value={serviceForm.price}
                onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                required
              />
              <Input
                type="number"
                placeholder="Duration (Minutes)"
                value={serviceForm.durationMinutes}
                onChange={(e) => setServiceForm({ ...serviceForm, durationMinutes: e.target.value })}
                required
              />
              <select
                value={serviceForm.categoryId}
                onChange={(e) => setServiceForm({ ...serviceForm, categoryId: e.target.value })}
                className="w-full bg-pearl/50 border border-gold/20 rounded p-3 text-sm focus:outline-none focus:border-gold"
                required
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <Button type="submit" className="w-full">
                  {isEditingService ? "Update Service" : "Save Service"}
                </Button>
                {isEditingService && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditingService(false);
                      setServiceForm({ id: null, name: "", description: "", price: "", durationMinutes: "", categoryId: "" });
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </div>

          <div className="lg:col-span-2 glass-panel p-6">
            <h3 className="font-display text-xl mb-4">Existing Services</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gold/20">
                    <th className="py-2">Name</th>
                    <th className="py-2">Category</th>
                    <th className="py-2">Duration</th>
                    <th className="py-2">Price</th>
                    <th className="py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((s) => (
                    <tr key={s.id} className="border-b border-gold/10 hover:bg-gold/5">
                      <td className="py-3 font-semibold">{s.name}</td>
                      <td className="py-3 text-ink/70">{s.categoryName}</td>
                      <td className="py-3 text-ink/70">{s.durationMinutes} mins</td>
                      <td className="py-3 font-semibold text-gold">{s.price} DT</td>
                      <td className="py-3 text-right space-x-2">
                        <button
                          onClick={() => {
                            setIsEditingService(true);
                            setServiceForm({
                              id: s.id,
                              name: s.name,
                              description: s.description,
                              price: s.price,
                              durationMinutes: s.durationMinutes,
                              categoryId: s.categoryId || ""
                            });
                          }}
                          className="text-xs text-gold font-semibold hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteService(s.id)}
                          className="text-xs text-red-600 font-semibold hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Packs Tab */}
      {activeTab === "packs" && (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1 glass-panel p-6 h-fit">
            <h3 className="font-display text-xl mb-4">
              {isEditingPack ? "Edit Package" : "Add Package"}
            </h3>
            <form onSubmit={handleSavePack} className="space-y-4">
              <Input
                placeholder="Pack Name"
                value={packForm.name}
                onChange={(e) => setPackForm({ ...packForm, name: e.target.value })}
                required
              />
              <Textarea
                placeholder="Pack Description"
                value={packForm.description}
                onChange={(e) => setPackForm({ ...packForm, description: e.target.value })}
                required
              />
              <Input
                type="number"
                placeholder="Price (DT)"
                value={packForm.price}
                onChange={(e) => setPackForm({ ...packForm, price: e.target.value })}
                required
              />
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-2">
                  Pack Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(e, "pack")}
                  disabled={uploading}
                  className="text-xs text-ink/70"
                />
                {packForm.image && (
                  <img src={packForm.image} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded" />
                )}
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="w-full" disabled={uploading}>
                  {isEditingPack ? "Update Pack" : "Save Pack"}
                </Button>
                {isEditingPack && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditingPack(false);
                      setPackForm({ id: null, name: "", description: "", price: "", image: "" });
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </div>

          <div className="lg:col-span-2 glass-panel p-6">
            <h3 className="font-display text-xl mb-4">Existing Packages</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {packs.map((p) => (
                <div key={p.id} className="border border-gold/20 p-4 rounded flex gap-4 bg-pearl/30">
                  {p.imageUrls && p.imageUrls[0] && (
                    <img src={p.imageUrls[0]} alt={p.name} className="h-16 w-16 object-cover rounded border" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-display font-semibold text-ink">{p.name}</h4>
                    <p className="text-xs text-ink/70 mt-1 line-clamp-2">{p.description}</p>
                    <p className="text-sm font-semibold text-gold mt-2">{p.price} DT</p>
                    <div className="mt-3 flex gap-2 justify-end">
                      <button
                        onClick={() => {
                          setIsEditingPack(true);
                          setPackForm({
                            id: p.id,
                            name: p.name,
                            description: p.description,
                            price: p.price,
                            image: p.imageUrls?.[0] || ""
                          });
                        }}
                        className="text-xs text-gold font-semibold hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePack(p.id)}
                        className="text-xs text-red-600 font-semibold hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Users & Roles Tab */}
      {activeTab === "users" && (
        <div className="glass-panel p-6">
          <h3 className="font-display text-xl mb-4">Users Role Administration</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-gold/20">
                  <th className="py-2">Email</th>
                  <th className="py-2">Current Role</th>
                  <th className="py-2">State</th>
                  <th className="py-2 text-right">Assign Role Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-gold/10 hover:bg-gold/5">
                    <td className="py-3 font-semibold">{u.email}</td>
                    <td className="py-3">
                      <span className="bg-gold/10 text-gold px-2 py-1 rounded text-xs font-semibold">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 text-ink/70">{u.enabled ? "Active" : "Disabled"}</td>
                    <td className="py-3 text-right space-x-2">
                      <button
                        onClick={() => handleRoleChange(u.id, "CLIENT")}
                        className={`text-xs px-2 py-1 rounded border ${
                          u.role === "CLIENT" ? "bg-gold text-white border-gold" : "border-gold/20 text-gold hover:bg-gold/10"
                        }`}
                      >
                        Client
                      </button>
                      <button
                        onClick={() => handleRoleChange(u.id, "ESTHETICIAN")}
                        className={`text-xs px-2 py-1 rounded border ${
                          u.role === "ESTHETICIAN" ? "bg-gold text-white border-gold" : "border-gold/20 text-gold hover:bg-gold/10"
                        }`}
                      >
                        Esthetician
                      </button>
                      <button
                        onClick={() => handleRoleChange(u.id, "ADMIN")}
                        className={`text-xs px-2 py-1 rounded border ${
                          u.role === "ADMIN" ? "bg-gold text-white border-gold" : "border-gold/20 text-gold hover:bg-gold/10"
                        }`}
                      >
                        Admin
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reservations Tab */}
      {activeTab === "reservations" && (
        <div className="glass-panel p-6">
          <h3 className="font-display text-xl mb-4">Manage Reservations</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-gold/20">
                  <th className="py-2">Client</th>
                  <th className="py-2">Esthetician</th>
                  <th className="py-2">Service</th>
                  <th className="py-2">Date & Time</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Status</th>
                  <th className="py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr key={r.id} className="border-b border-gold/10 hover:bg-gold/5">
                    <td className="py-3">
                      <div>{r.clientName}</div>
                      <div className="text-xs text-ink/50">{r.clientPhone}</div>
                    </td>
                    <td className="py-3 text-ink/70">{r.estheticianName}</td>
                    <td className="py-3 text-ink/70">{r.serviceName}</td>
                    <td className="py-3 text-ink/70">
                      {new Date(r.startTime).toLocaleString("fr-FR", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </td>
                    <td className="py-3 font-semibold text-gold">{r.totalPrice} DT</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          r.status === "PENDING"
                            ? "bg-amber-100 text-amber-700"
                            : r.status === "CONFIRMED"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3 text-right space-x-2">
                      {r.status === "PENDING" && (
                        <>
                          <button
                            onClick={() => handleReservationStatus(r.id, "CONFIRMED")}
                            className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleReservationStatus(r.id, "DECLINED")}
                            className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                          >
                            Decline
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Gallery Tab */}
      {activeTab === "gallery" && (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1 glass-panel p-6 h-fit">
            <h3 className="font-display text-xl mb-4">Add Gallery Item</h3>
            <form onSubmit={handleSaveGalleryItem} className="space-y-4">
              <Input
                placeholder="Title (e.g. Elegant Balayage)"
                value={galleryForm.title}
                onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                required
              />
              <select
                value={galleryForm.category}
                onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                className="w-full bg-pearl/50 border border-gold/20 rounded p-3 text-sm focus:outline-none focus:border-gold text-ink"
                required
              >
                <option value="HAIR">Hair</option>
                <option value="MAKEUP">Makeup</option>
                <option value="NAILS">Nails</option>
                <option value="FACIAL_CARE">Facial Care</option>
              </select>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-2">
                  Before Media (Image or Video)
                </label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => handleGalleryFileUpload(e, "before")}
                  disabled={uploadingBefore || uploadingAfter}
                  className="text-xs text-ink/70"
                />
                {uploadingBefore && <p className="text-xs text-gold mt-1 animate-pulse">Uploading before file...</p>}
                {galleryForm.beforeUrl && (
                  <div className="mt-2 h-24 w-full bg-black/10 rounded overflow-hidden flex items-center justify-center border border-gold/20">
                    {isVideoUrl(galleryForm.beforeUrl) ? (
                      <video src={galleryForm.beforeUrl} className="h-full w-full object-cover" muted autoPlay loop playsInline />
                    ) : (
                      <img src={galleryForm.beforeUrl} alt="Before preview" className="h-full w-full object-cover" />
                    )}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-2">
                  After Media (Image or Video)
                </label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => handleGalleryFileUpload(e, "after")}
                  disabled={uploadingBefore || uploadingAfter}
                  className="text-xs text-ink/70"
                />
                {uploadingAfter && <p className="text-xs text-gold mt-1 animate-pulse">Uploading after file...</p>}
                {galleryForm.afterUrl && (
                  <div className="mt-2 h-24 w-full bg-black/10 rounded overflow-hidden flex items-center justify-center border border-gold/20">
                    {isVideoUrl(galleryForm.afterUrl) ? (
                      <video src={galleryForm.afterUrl} className="h-full w-full object-cover" muted autoPlay loop playsInline />
                    ) : (
                      <img src={galleryForm.afterUrl} alt="After preview" className="h-full w-full object-cover" />
                    )}
                  </div>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={uploadingBefore || uploadingAfter}>
                Save Gallery Item
              </Button>
            </form>
          </div>

          <div className="lg:col-span-2 glass-panel p-6">
            <h3 className="font-display text-xl mb-4">Existing Gallery Items</h3>
            {galleryItems.length === 0 ? (
              <p className="text-sm text-ink/50 text-center py-6">No gallery items yet.</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {galleryItems.map((item) => (
                  <div key={item.id} className="border border-gold/20 rounded overflow-hidden bg-pearl/30 flex flex-col justify-between">
                    <div>
                      <div className="grid grid-cols-2 divide-x divide-gold/10">
                        <div className="relative h-24 bg-black/10 flex items-center justify-center overflow-hidden">
                          <div className="absolute top-1 left-1 z-10 bg-black/60 text-white text-[8px] uppercase tracking-wider px-1 py-0.5 rounded font-semibold">
                            Before
                          </div>
                          {isVideoUrl(item.beforeUrl) ? (
                            <video src={item.beforeUrl} className="w-full h-full object-cover" muted autoPlay loop playsInline />
                          ) : (
                            <img src={item.beforeUrl} alt="Before" className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="relative h-24 bg-black/10 flex items-center justify-center overflow-hidden">
                          <div className="absolute top-1 left-1 z-10 bg-gold/80 text-white text-[8px] uppercase tracking-wider px-1 py-0.5 rounded font-semibold">
                            After
                          </div>
                          {isVideoUrl(item.afterUrl) ? (
                            <video src={item.afterUrl} className="w-full h-full object-cover" muted autoPlay loop playsInline />
                          ) : (
                            <img src={item.afterUrl} alt="After" className="w-full h-full object-cover" />
                          )}
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-[10px] uppercase tracking-wider text-gold font-semibold">{item.category}</p>
                        <h4 className="font-display font-semibold text-ink mt-1 text-sm">{item.title}</h4>
                      </div>
                    </div>
                    <div className="p-3 bg-pearl/10 border-t border-gold/10 flex justify-end">
                      <button
                        onClick={() => handleDeleteGalleryItem(item.id)}
                        className="text-xs text-red-600 font-semibold hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminDashboard;
