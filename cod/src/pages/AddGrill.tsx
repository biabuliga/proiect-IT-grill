import { useState, useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
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

const AddGrill = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [newGrill, setNewGrill] = useState({
    name: "",
    description: "",
  });

  // Redirecționare dacă nu e autentificat
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewGrill((prev) => ({ ...prev, [name]: value }));
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
    
    if (!newGrill.name.trim() || !newGrill.description.trim()) {
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

    // Salvăm grătarul în localStorage
    const existingGrills = JSON.parse(localStorage.getItem('grills') || '[]');
    const newGrillData = {
      id: Date.now().toString(),
      name: newGrill.name,
      description: newGrill.description,
      image: selectedImage,
      author: user?.name || 'Anonim',
      authorId: user?.id,
      createdAt: new Date().toISOString(),
      votes: 0,
    };
    
    existingGrills.push(newGrillData);
    localStorage.setItem('grills', JSON.stringify(existingGrills));

    toast({
      title: "Grătar postat!",
      description: "Grătarul tău a fost adăugat cu succes!",
    });
    setNewGrill({ name: "", description: "" });
    setSelectedImage(null);
    setImageFile(null);
    setIsLoading(false);
    navigate("/profile");
  };

  return (
    <Layout>
      <section className="bg-white min-h-[calc(100vh-140px)] relative overflow-hidden flex items-center justify-center py-12">
        {/* Scattered BBQ Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Left side icons */}
          <img src={chiliIcon} alt="" className="absolute top-8 left-[8%] w-12 md:w-16 opacity-80 -rotate-12" />
          <img src={kebabIcon} alt="" className="absolute top-[20%] left-[5%] w-16 md:w-24 opacity-80 rotate-45" />
          <img src={apronIcon} alt="" className="absolute top-[55%] left-[3%] w-14 md:w-20 opacity-80" />
          <img src={cleaverIcon} alt="" className="absolute bottom-[15%] left-[15%] w-14 md:w-20 opacity-80 -rotate-12" />
          <img src={chefHatIcon} alt="" className="absolute bottom-[10%] left-[35%] w-12 md:w-16 opacity-80" />
          
          {/* Right side icons */}
          <img src={grillGrateIcon} alt="" className="absolute top-[10%] right-[5%] w-16 md:w-24 opacity-80" />
          <img src={burgerIcon} alt="" className="absolute top-[45%] right-[8%] w-12 md:w-16 opacity-80 rotate-6" />
          <img src={spatulaIcon} alt="" className="absolute top-[70%] right-[5%] w-12 md:w-16 opacity-80 rotate-12" />
        </div>

        {/* Add Grill Card */}
        <div className="bg-primary rounded-2xl p-8 md:p-12 w-full max-w-lg mx-4 relative z-10 shadow-xl">
          <form onSubmit={handleSubmitGrill} className="space-y-5">
            <div>
              <label className="text-primary-foreground text-sm font-medium mb-2 block">
                Grill name:
              </label>
              <Input
                name="name"
                placeholder=""
                value={newGrill.name}
                onChange={handleInputChange}
                className="bg-white border-0 h-12"
                required
              />
            </div>

            <div>
              <label className="text-primary-foreground text-sm font-medium mb-2 block">
                Description:
              </label>
              <Textarea
                name="description"
                placeholder=""
                value={newGrill.description}
                onChange={handleInputChange}
                className="bg-white border-0 min-h-[100px] resize-none"
                required
              />
            </div>

            {/* Image Upload Section */}
            <div className="space-y-3">
              <label className="text-primary-foreground text-sm font-medium block">
                Photo:
              </label>
              
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              
              {selectedImage ? (
                /* Image Preview */
                <div className="relative">
                  <div className="bg-white rounded-lg p-2 relative">
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-primary-foreground/70 text-xs text-center mt-2">
                    Click pe X pentru a schimba imaginea
                  </p>
                </div>
              ) : (
                /* Upload Button */
                <div
                  onClick={handleImageClick}
                  className="bg-white rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors border-2 border-dashed border-gray-300 hover:border-gray-400"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="bg-gray-100 rounded-full p-4">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-foreground font-medium">
                        Click pentru a încărca o poză
                      </p>
                      <p className="text-muted-foreground text-sm">
                        PNG, JPG sau GIF (max. 5MB)
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="gap-2"
                    >
                      <Camera className="h-4 w-4" />
                      Upload photo
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <Button
              type="submit"
              variant="success"
              className="w-full h-12 text-lg font-semibold mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Se postează..." : "Post this grill!"}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default AddGrill;
