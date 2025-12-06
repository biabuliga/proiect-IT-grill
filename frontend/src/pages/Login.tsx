import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import { Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

// BBQ Icons
import apronIcon from "@/assets/icons/apron.png";
import chiliIcon from "@/assets/icons/chili.png";
import kebabIcon from "@/assets/icons/kebab.png";
import grillGrateIcon from "@/assets/icons/grill-grate.png";
import spatulaIcon from "@/assets/icons/spatula.png";
import burgerIcon from "@/assets/icons/burger.png";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Autentificare reușită!",
        description: "Bine ai revenit, grătăragiu!",
      });
      navigate("/profile");
    } else {
      toast({
        title: "Eroare",
        description: "Email sau parolă greșită. Încearcă din nou sau creează un cont.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <section className="bg-white min-h-[calc(100vh-140px)] relative overflow-hidden flex items-center justify-center py-12">
        {/* Scattered BBQ Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Left side icons */}
          <img src={chiliIcon} alt="" className="absolute top-8 left-[8%] w-12 md:w-16 opacity-80 -rotate-12" />
          <img src={kebabIcon} alt="" className="absolute top-[20%] left-[5%] w-16 md:w-24 opacity-80 rotate-45" />
          <img src={apronIcon} alt="" className="absolute top-[50%] left-[3%] w-14 md:w-20 opacity-80" />
          
          {/* Right side icons */}
          <img src={grillGrateIcon} alt="" className="absolute top-[10%] right-[5%] w-16 md:w-24 opacity-80" />
          <img src={burgerIcon} alt="" className="absolute top-[40%] right-[8%] w-12 md:w-16 opacity-80 rotate-6" />
          <img src={spatulaIcon} alt="" className="absolute top-[65%] right-[5%] w-12 md:w-16 opacity-80 rotate-12" />
        </div>

        {/* Login Card */}
        <div className="bg-primary rounded-2xl p-8 md:p-12 w-full max-w-md mx-4 relative z-10 shadow-xl">
          <h1 className="font-chewy text-2xl md:text-3xl text-primary-foreground text-center mb-8">
            Bine ai revenit
            <br />
            mare grătăragiu!
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white border-0 h-12"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-white border-0 h-12"
                required
              />
            </div>

            <Button
              type="submit"
              variant="success"
              className="w-full h-12 text-lg font-semibold mt-6"
              disabled={isLoading}
            >
              {isLoading ? "Se încarcă..." : "Log in"}
            </Button>
          </form>

          <div className="text-center mt-6 space-y-3">
            <button className="text-primary-foreground/80 hover:text-primary-foreground text-sm underline">
              Forgot password
            </button>
            
            <p className="text-primary-foreground/80 text-sm">
              No account? Press here to{" "}
              <Link to="/register" className="text-primary-foreground font-semibold underline hover:no-underline">
                Sign up
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
