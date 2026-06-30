import { useState, useEffect } from "react";
import apiClient from "@/api/client";
import Button from "@/components/ui/button.jsx";
import Input from "@/components/ui/input.jsx";
import Textarea from "@/components/ui/textarea.jsx";
import ImageCropperModal from "@/components/ImageCropperModal";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  // Image Upload and Cropping State
  const [uploading, setUploading] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await apiClient.get("/users/me");
      const data = response.data;
      setProfile(data);
      setFirstName(data.firstName || "");
      setLastName(data.lastName || "");
      setDisplayName(data.displayName || "");
      setPhone(data.phone || "");
      setBio(data.bio || "");
      setSkills(data.skills || "");
      setImageUrl(data.imageUrl || "");
    } catch (err) {
      setError("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setSelectedImageSrc(reader.result?.toString() || "");
        setIsCropperOpen(true);
      });
      reader.readAsDataURL(file);
      // Reset input so the same file can be selected again if needed
      e.target.value = "";
    }
  };

  const handleCropComplete = async (croppedFile) => {
    setIsCropperOpen(false);
    if (!croppedFile) return;

    const formData = new FormData();
    formData.append("file", croppedFile);

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      const response = await apiClient.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setImageUrl(response.data);
      setSuccess("Photo recadrée et uploadée avec succès ! Enregistrez pour appliquer.");
    } catch (err) {
      setError("Échec de l'upload de la photo. Vérifiez votre configuration Cloudinary.");
    } finally {
      setUploading(false);
      setSelectedImageSrc(null);
    }
  };

  const handleCropCancel = () => {
    setIsCropperOpen(false);
    setSelectedImageSrc(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await apiClient.put("/users/me", {
        id: profile.id,
        email: profile.email,
        role: profile.role,
        firstName,
        lastName,
        displayName,
        phone,
        bio,
        skills,
        imageUrl
      });
      setProfile(response.data);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="section-shell py-20 text-center text-ink/70">
        Loading profile...
      </div>
    );
  }

  const isEsthetician = profile?.role === "ESTHETICIAN";

  return (
    <main className="section-shell py-20">
      <div className="mx-auto max-w-2xl glass-panel p-8">
        <h1 className="font-display text-3xl text-ink">My Profile</h1>
        <p className="mt-3 text-sm text-ink/70">
          Update your personal details, credentials, and profile image.
        </p>

        {error && (
          <div className="mt-4 p-3 text-sm bg-red-50 text-red-600 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 p-3 text-sm bg-green-50 text-green-700 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full overflow-hidden bg-pearl border-2 border-gold/40 flex items-center justify-center">
              {imageUrl ? (
                <img src={imageUrl} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <span className="text-2xl text-ink/30 font-display">
                  {profile.email[0].toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-2">
                Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoSelect}
                disabled={uploading}
                className="text-xs text-ink/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gold/10 file:text-gold hover:file:bg-gold/20"
              />
              {uploading && <p className="mt-1 text-xs text-gold">Uploading photo...</p>}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1">
                Email
              </label>
              <Input type="email" value={profile.email} disabled className="opacity-60 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1">
                Role
              </label>
              <Input type="text" value={profile.role} disabled className="opacity-60 cursor-not-allowed" />
            </div>
          </div>

          {!isEsthetician ? (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1">
                  First Name
                </label>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1">
                  Last Name
                </label>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1">
                Display Name (for booking calendar)
              </label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1">
              Phone Number
            </label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +1 555-0199"
            />
          </div>

          {isEsthetician && (
            <>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1">
                  Bio / Professional background
                </label>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell clients about your expertise..."
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-1">
                  Skills (comma separated)
                </label>
                <Input
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g. Makeup, Skin Care, Coloring"
                />
              </div>
            </>
          )}

          <Button type="submit" className="w-full" disabled={saving || uploading}>
            {saving ? "Saving Changes..." : "Save Profile Details"}
          </Button>
        </form>

        {isCropperOpen && selectedImageSrc && (
          <ImageCropperModal
            imageSrc={selectedImageSrc}
            onCropComplete={handleCropComplete}
            onCancel={handleCropCancel}
          />
        )}
      </div>
    </main>
  );
};

export default UserProfile;
