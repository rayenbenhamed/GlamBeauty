import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "@/api/client";
import Button from "@/components/ui/button.jsx";
import Input from "@/components/ui/input.jsx";
import { useLanguage } from "@/lib/LanguageContext.jsx";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await apiClient.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
        phone
      });
      const { token, role, userId } = response.data;
      
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);

      // Simple users sign up as simple client users
      navigate("/client");
      
      // Force page reload to refresh navbar state
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="section-shell py-20">
      <div className="mx-auto max-w-md glass-panel p-8">
        <h1 className="font-display text-3xl text-ink">{t("create_account_title")}</h1>
        <p className="mt-3 text-sm text-ink/70">
          {t("join_desc")}
        </p>

        {error && (
          <div className="mt-4 p-3 text-sm bg-red-50 text-red-600 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <Input 
            placeholder={t("first_name")} 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Input 
            placeholder={t("last_name")} 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <Input 
            placeholder={t("phone")} 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input 
            type="email" 
            placeholder={t("email")} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input 
            type="password" 
            placeholder={t("password")} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t("saving") : t("register_btn")}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default Register;
