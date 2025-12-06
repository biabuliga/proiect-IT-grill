import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout/Layout";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import grillIcon from "@/assets/grill-icon.png";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Eroare",
        description: "Parolele nu coincid!",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Eroare",
        description: "Parola trebuie să aibă cel puțin 6 caractere!",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const success = await register(formData.name, formData.email, formData.phone, formData.password);
    
    setIsLoading(false);
    
    if (success) {
      toast({
        title: "Înregistrare reușită!",
        description: "Bine ai venit în comunitatea grătarelor!",
      });
      navigate("/profile");
    } else {
      toast({
        title: "Eroare",
        description: "Email-ul este deja folosit. Încearcă cu altul.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] bg-primary flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8 animate-scale-in">
          {/* Header */}
          <div className="text-center space-y-4">
            <img src={grillIcon} alt="Grill" className="h-16 w-16 mx-auto invert" />
            <h1 className="font-chewy text-3xl text-primary-foreground">
              Gata să devii șef pe grătare?
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-primary-foreground font-medium">
                Nume
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Ion Popescu"
                className="h-12 bg-white border-0"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-primary-foreground font-medium">
                Telefon
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="0700 000 000"
                className="h-12 bg-white border-0"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary-foreground font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email@exemplu.ro"
                className="h-12 bg-white border-0"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-primary-foreground font-medium">
                Parolă
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 pr-10 bg-white border-0"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-primary-foreground font-medium">
                Confirmă parola
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 pr-10 bg-white border-0"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="success"
              className="w-full mt-6"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Se creează contul..." : "Înregistrează-te"}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-primary-foreground/80">
            Ai deja un cont?{" "}
            <Link to="/login" className="text-primary-foreground font-bold hover:underline">
              Conectează-te
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
