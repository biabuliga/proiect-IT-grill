import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Plus } from "lucide-react";
import grillIcon from "@/assets/grill-icon.png";

// BBQ Icons
import apronIcon from "@/assets/icons/apron.png";
import chiliIcon from "@/assets/icons/chili.png";
import kebabIcon from "@/assets/icons/kebab.png";
import grillGrateIcon from "@/assets/icons/grill-grate.png";
import spatulaIcon from "@/assets/icons/spatula.png";
import cleaverIcon from "@/assets/icons/cleaver.png";

interface Grill {
  id: string;
  name: string;
  description: string;
  image: string;
  author: string;
  authorId: string;
  createdAt: string;
  votes: number;
}

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [userGrills, setUserGrills] = useState<Grill[]>([]);

  // Încărcăm grătarele utilizatorului din localStorage
  useEffect(() => {
    if (user) {
      const allGrills = JSON.parse(localStorage.getItem('grills') || '[]');
      const filteredGrills = allGrills.filter((grill: Grill) => grill.authorId === user.id);
      setUserGrills(filteredGrills);
    }
  }, [user]);

  // Dacă utilizatorul nu e autentificat, redirecționăm la login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      {/* Top Section - White with BBQ icons */}
      <section className="bg-white relative overflow-hidden py-12 md:py-16">
        {/* Scattered BBQ Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <img src={chiliIcon} alt="" className="absolute top-8 left-[5%] w-12 md:w-16 opacity-90 -rotate-12" />
          <img src={apronIcon} alt="" className="absolute top-[40%] left-[3%] w-14 md:w-20 opacity-90" />
          
          <img src={kebabIcon} alt="" className="absolute top-[15%] right-[15%] w-14 md:w-20 opacity-90 rotate-[30deg]" />
          <img src={grillGrateIcon} alt="" className="absolute top-[10%] right-[3%] w-16 md:w-24 opacity-90" />
          <img src={spatulaIcon} alt="" className="absolute bottom-[15%] right-[5%] w-12 md:w-16 opacity-90 -rotate-12" />
        </div>

        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            {/* User Info Card */}
            <div className="relative">
              {/* Grill icon on top */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
                <img src={grillIcon} alt="" className="w-10 h-10" />
              </div>
              
              <div className="bg-primary rounded-2xl p-6 pt-8 w-full max-w-md shadow-lg">
                <div className="space-y-4 text-primary-foreground">
                  <p className="text-lg">
                    <span className="font-semibold">Name:</span> {user.name}
                  </p>
                  <hr className="border-primary-foreground/40" />
                  <p className="text-lg">
                    <span className="font-semibold">E-mail:</span> {user.email}
                  </p>
                  <hr className="border-primary-foreground/40" />
                  <p className="text-lg">
                    <span className="font-semibold">Telephone:</span> {user.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Post a Grill Button */}
            <div className="flex items-center">
              <Link to="/add-grill">
                <Button variant="success" size="lg" className="text-xl font-semibold px-10 py-6 h-auto rounded-xl shadow-lg hover:scale-105 transition-transform">
                  Post a grill
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* My Grills Section - Bordeaux background */}
      <section className="bg-primary py-12 md:py-16 relative overflow-hidden">
        {/* Side icons */}
        <div className="absolute inset-0 pointer-events-none">
          <img src={cleaverIcon} alt="" className="absolute top-[30%] left-[3%] w-14 md:w-20 opacity-70 -rotate-12" />
          <img src={spatulaIcon} alt="" className="absolute top-[40%] right-[3%] w-12 md:w-16 opacity-70 rotate-12" />
        </div>

        <div className="container relative z-10">
          <h2 className="font-chewy text-3xl md:text-4xl text-primary-foreground text-center mb-10">
            My grills
          </h2>

          {userGrills.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {userGrills.map((grill) => (
                <div 
                  key={grill.id} 
                  className="bg-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  {/* Card Header */}
                  <div className="bg-gray-300 px-4 py-3">
                    <p className="text-foreground font-semibold">
                      Pimp: <span className="text-primary">{grill.author}</span>
                    </p>
                  </div>
                  
                  {/* Grill Image */}
                  <div className="bg-gray-200 p-2">
                    <img 
                      src={grill.image} 
                      alt={grill.name} 
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* Grill Info */}
                  <div className="bg-gray-200 px-4 pb-4">
                    <p className="text-foreground font-medium text-sm truncate">
                      {grill.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-primary-foreground/80 text-lg mb-6">
                Nu ai postat încă niciun grătar.
              </p>
              <Link to="/add-grill">
                <Button variant="outline" className="gap-2 bg-white text-primary hover:bg-gray-100">
                  <Plus className="h-5 w-5" />
                  Adaugă primul tău grătar
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
