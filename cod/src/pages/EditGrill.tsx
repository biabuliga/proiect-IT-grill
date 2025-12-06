import { useState, useRef, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, X, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

// BBQ Icons
import apronIcon from "@/assets/icons/apron.png";
import chiliIcon from "@/assets/icons/chili.png";
import kebabIcon from "@/assets/icons/kebab.png";
import grillGrateIcon from "@/assets/icons/grill-grate.png";
import spatulaIcon from "@/assets/icons/spatula.png";
import chefHatIcon from "@/assets/icons/chef-hat.png";
import burgerIcon from "@/assets/icons/burger.png";
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

const EditGrill = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const { grillId } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [grill, setGrill] = useState<Grill | null>(null);
  const [editData, setEditData] = useState({
    name: "",
    description: "",
  });

  // Încărcăm grătarul la montarea componentei
  useEffect(() => {
    if (grillId) {
      const allGrills = JSON.parse(localStorage.getItem('grills') || '[]');
      const foundGrill = allGrills.find((g: Grill) => g.id === grillId);
      
      if (foundGrill) {
        setGrill(foundGrill);
        setEditData({
          name: foundGrill.name,
          description: foundGrill.description,
        });
        setSelectedImage(foundGrill.image);
      } else {
        toast({
          title: "Eroare",
          description: "Grătarul nu a fost găsit!",
          variant: "destructive",
        });
        navigate("/profile");
      }
    }
  }, [grillId, navigate, toast]);

  // Redirecționare dacă nu e autentificat
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Verificăm dacă utilizatorul este autorul grătarului
  if (grill && grill.authorId !== user?.id) {
    return <Navigate to="/profile" replace />;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Verificăm dacă e o imagine
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Eroare",
          description: "Te rugăm să selectezi o imagine validă!",
          variant: "destructive",
        });
        return;
      }

      // Verificăm dimensiunea (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Eroare",
          description: "Imaginea trebuie să fie mai mică de 5MB!",
          variant: "destructive",
        });
        return;
      }

      setImageFile(file);
      
      // Creăm preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmitGrill = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!editData.name.trim() || !editData.description.trim()) {
      toast({
        title: "Eroare",
        description: "Te rugăm să completezi toate câmpurile!",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!selectedImage) {
      toast({
        title: "Eroare",
        description: "Te rugăm să adaugi o poză cu grătarul!",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Actualizăm grătarul în localStorage
    const allGrills = JSON.parse(localStorage.getItem('grills') || '[]');
    const grillIndex = allGrills.findIndex((g: Grill) => g.id === grillId);
    
    if (grillIndex !== -1) {
      allGrills[grillIndex] = {
        ...allGrills[grillIndex],
        name: editData.name,
        description: editData.description,
        image: selectedImage,
      };
      localStorage.setItem('grills', JSON.stringify(allGrills));

      toast({
        title: "Succes!",
        description: "Grătarul a fost actualizat cu succes!",
      });
      setIsLoading(false);
      navigate("/profile");
    }
  };

  if (!grill) {
    return (
      <Layout>
        <section className="bg-white min-h-[calc(100vh-140px)] flex items-center justify-center">
          <p className="text-lg text-gray-600">Se încarcă...</p>
        </section>
      </Layout>
    );
  }

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

        <div className="w-full max-w-2xl px-4 relative z-10">
          <h1 className="font-chewy text-3xl text-primary text-center mb-8">
            Editează grătarul
          </h1>

          <form onSubmit={handleSubmitGrill} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">
                Nume grătar
              </label>
              <Input
                name="name"
                type="text"
                placeholder="Ex: Grătar cu ciuperci și brânză"
                className="h-12 bg-gray-100 border-0"
                value={editData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">
                Descriere
              </label>
              <Textarea
                name="description"
                placeholder="Descrie cum ai gătit-o, ingredientele, secretele tale..."
                className="min-h-32 bg-gray-100 border-0 resize-none"
                value={editData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Image */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-primary">
                Poză a grătarului
              </label>

              {selectedImage ? (
                <div className="relative w-full">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg border-2 border-primary"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleImageClick}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-lg cursor-pointer"
                  >
                    <Camera className="h-8 w-8 text-white" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={handleImageClick}
                  className="w-full border-2 border-dashed border-primary rounded-lg p-8 text-center cursor-pointer hover:bg-primary/5 transition-colors"
                >
                  <ImageIcon className="h-12 w-12 text-primary mx-auto mb-2" />
                  <p className="text-primary font-medium">
                    Apasă pentru a selecta o imagine
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, GIF până la 5MB
                  </p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="success"
              size="lg"
              className="w-full h-12 text-lg font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Se salvează..." : "Salvează modificările"}
            </Button>

            {/* Cancel Button */}
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full h-12 text-lg font-semibold"
              onClick={() => navigate("/profile")}
              disabled={isLoading}
            >
              Anulează
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default EditGrill;
