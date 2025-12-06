import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import GrillCard from "@/components/grill/GrillCard";
import LeaderboardCard from "@/components/grill/LeaderboardCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X, Flame } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

// Import default grill image
import grillKettle2 from "@/assets/grill-kettle-2.png";

interface Grill {
  id: string;
  name: string;
  description: string;
  image?: string;
  imageUrl?: string;
  author: string;
  authorId?: string;
  location?: string;
  votes?: number;
  miciCount?: number;
  createdAt?: string;
}

// Date demo pentru grătare cu nume românești
const mockGrills: Grill[] = [
  {
    id: "demo-1",
    name: "Grătarul Domnesc",
    description: "Cel mai tare grătar din cartier, perfect pentru mici și cârnați de casă făcuți după rețeta bunicii. Acest grătar a fost moștenit de la bunicul meu și a trecut prin 3 generații de grătăragii. Este fabricat din oțel inoxidabil de cea mai bună calitate și are o suprafață de gătit de 60x40 cm. Perfect pentru petreceri de familie sau întâlniri cu prietenii în weekend.",
    imageUrl: grillKettle2,
    author: "Mihai Popescu",
    location: "București",
    miciCount: 1523,
  },
  {
    id: "demo-2",
    name: "BBQ Master Pro",
    description: "Grătar profesional pentru evenimente mari, poate găti pentru 50 de persoane simultan! Echipat cu sistem de rotiserie, termometru digital și trei zone de gătit separate. Ideal pentru catering și evenimente corporate. Include și un afumător lateral pentru cei care doresc să experimenteze cu aromele de lemn.",
    imageUrl: grillKettle2,
    author: "Andrei Ionescu",
    location: "Cluj",
    miciCount: 987,
  },
  {
    id: "demo-3",
    name: "Focul din Grădină",
    description: "Grătar rustic făcut manual din cărămidă refractară, ideal pentru weekend-uri cu familia. Construit cu propriile mâini în curtea casei, acest grătar reprezintă sufletul petrecerilor noastre de vară. Are un horn pentru evacuarea fumului și o masă laterală pentru prepararea ingredientelor.",
    imageUrl: grillKettle2,
    author: "Elena Dumitrescu",
    location: "Timișoara",
    miciCount: 756,
  },
  {
    id: "demo-4",
    name: "Mici Station",
    description: "Specializat în mici moldovenești, cu sistem de ventilație pentru fum perfect. Grătarul are o formă lungă, special concepută pentru a găti mici în cantități mari. Ventilația controlată asigură temperatura optimă pentru cei mai pufoși și aromați mici din Moldova!",
    imageUrl: grillKettle2,
    author: "Vasile Munteanu",
    location: "Iași",
    miciCount: 654,
  },
  {
    id: "demo-5",
    name: "Grătarul Vesel",
    description: "Compact și portabil, perfect pentru camping și picnicuri în natură. Se pliază în doar 30 de secunde și încape în portbagajul oricărei mașini. Fabricat din aluminiu ușor dar rezistent, cu picioare reglabile pentru teren accidentat. Include și geantă de transport.",
    imageUrl: grillKettle2,
    author: "Maria Stancu",
    location: "Brașov",
    miciCount: 543,
  },
  {
    id: "demo-6",
    name: "Carbune & Aromă",
    description: "Design modern cu termometru integrat pentru control perfect al temperaturii. Acest grătar combină estetica contemporană cu funcționalitatea maximă. Capac cu ventilație ajustabilă, tavă pentru cărbuni cu înălțime reglabilă și sistem de colectare a grăsimii.",
    imageUrl: grillKettle2,
    author: "George Popa",
    location: "Constanța",
    miciCount: 432,
  },
  {
    id: "demo-7",
    name: "Regele Grătarelor",
    description: "XL size pentru petreceri mari, suprafață dublă de gătit cu capac. Când vorbim de grătare serioase, acesta este regele! Cu o suprafață totală de 1.2 metri pătrați, poate găti simultan pentru o nuntă întreagă. Include și arzător lateral pentru sosuri.",
    imageUrl: grillKettle2,
    author: "Ion Rădulescu",
    location: "Sibiu",
    miciCount: 398,
  },
  {
    id: "demo-8",
    name: "Flacăra Vie",
    description: "Grătar tradițional românesc cu suport pentru ceaun inclus. Perfect pentru a prepara atât grătare cât și tocănițe sau ciorbe la ceaun. Design autentic țărănesc cu elemente decorative forjate manual. O piesă de rezistență pentru orice curte românească.",
    imageUrl: grillKettle2,
    author: "Ana Georgescu",
    location: "Oradea",
    miciCount: 321,
  },
  {
    id: "demo-9",
    name: "Smoky Delight",
    description: "Pentru iubitorii de afumat, cu cameră specială pentru lemn aromat. Afumătoare profesională cu control precis al temperaturii și fumului. Include seturi de așchii de lemn de măr, cireș și hickory pentru diverse arome. Capacitate: 20kg de carne.",
    imageUrl: grillKettle2,
    author: "Florin Marinescu",
    location: "Craiova",
    miciCount: 287,
  },
  {
    id: "demo-10",
    name: "Mini Grill Urban",
    description: "Perfect pentru balcon, dimensiuni compacte dar performanță maximă. Ideal pentru apartamente și spații mici. Sistem de filtrare a fumului pentru a nu deranja vecinii. Suprafață de gătit suficientă pentru 4 persoane. Design elegant în negru mat.",
    imageUrl: grillKettle2,
    author: "Cristina Voicu",
    location: "Galați",
    miciCount: 234,
  },
  {
    id: "demo-11",
    name: "Tradițional XXL",
    description: "Grătar masiv pentru nunți și botezuri, capabil să hrănească sate întregi. Acest monstru de oțel are 2 metri lungime și poate găti 200 de porții simultan. Folosit de cateringul familiei de peste 20 de ani la toate evenimentele importante din zonă.",
    imageUrl: grillKettle2,
    author: "Nicolae Barbu",
    location: "Pitești",
    miciCount: 198,
  },
  {
    id: "demo-12",
    name: "Grătarul Rapid",
    description: "Se încălzește în 5 minute, ideal pentru când ai chef de mici instant. Tehnologie de încălzire rapidă cu cărbuni speciali incluși. Perfect pentru grătăragii nerăbdători care vor mici ACUM! Compact, eficient și gata de acțiune în orice moment.",
    imageUrl: grillKettle2,
    author: "Roxana Dinu",
    location: "Ploiești",
    miciCount: 156,
  },
];

const BestGrills = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("most-mici");
  const [likedGrills, setLikedGrills] = useState<Set<string>>(new Set());
  const [allGrills, setAllGrills] = useState<Grill[]>([]);
  const [selectedGrill, setSelectedGrill] = useState<Grill | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Încărcăm grătarele din localStorage + cele demo
  useEffect(() => {
    loadGrills();
  }, []);

  const loadGrills = () => {
    const savedGrills = JSON.parse(localStorage.getItem('grills') || '[]');
    // Convertim grătarele salvate la formatul necesar
    const convertedSaved = savedGrills.map((g: Grill) => ({
      ...g,
      imageUrl: g.image || grillKettle2,
      miciCount: g.votes || 0,
      location: "România",
    }));
    const combinedGrills = [...convertedSaved, ...mockGrills];
    setAllGrills(combinedGrills);

    // Încărcăm like-urile
    const savedLikes = JSON.parse(localStorage.getItem('likedGrills') || '[]');
    setLikedGrills(new Set(savedLikes));
  };

  // Filtrare grătare după căutare
  let filteredGrills = allGrills.filter(
    (grill) =>
      grill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grill.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sortare
  if (sortBy === "most-mici") {
    filteredGrills = [...filteredGrills].sort((a, b) => (b.miciCount || 0) - (a.miciCount || 0));
  } else if (sortBy === "least-mici") {
    filteredGrills = [...filteredGrills].sort((a, b) => (a.miciCount || 0) - (b.miciCount || 0));
  }

  // Top 3 grătare pentru leaderboard
  const topGrills = [...allGrills]
    .sort((a, b) => (b.miciCount || 0) - (a.miciCount || 0))
    .slice(0, 3);

  const handleLike = (id: string) => {
    // Verificăm dacă utilizatorul este autentificat
    if (!user || !user.id) {
      toast({
        title: "Trebuie să fii logat",
        description: "Te rugăm să te conectezi pentru a putea vota!",
        variant: "destructive",
      });
      return;
    }

    setLikedGrills((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      localStorage.setItem('likedGrills', JSON.stringify([...newSet]));
      return newSet;
    });
  };

  const handleGrillClick = (id: string) => {
    const grill = allGrills.find(g => g.id === id);
    if (grill) {
      setSelectedGrill(grill);
    }
  };

  const handleCloseModal = () => {
    setSelectedGrill(null);
  };

  const handleDeleteGrill = (id: string) => {
    const savedGrills = JSON.parse(localStorage.getItem('grills') || '[]');
    const updatedGrills = savedGrills.filter((g: Grill) => g.id !== id);
    localStorage.setItem('grills', JSON.stringify(updatedGrills));
    
    toast({
      title: "Grătar șters!",
      description: "Grătarul a fost eliminat cu succes.",
    });
    
    setSelectedGrill(null);
    loadGrills();
  };

  const isOwner = (grill: Grill) => {
    return user && grill.authorId === user.id;
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-8 bg-primary">
        <div className="container">
          <h1 className="font-chewy text-4xl text-primary-foreground text-center">
            Best Grills
          </h1>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="py-12 bg-background">
        <div className="container">
          <h2 className="font-chewy text-2xl text-foreground mb-6">
            🏆 THE BEST GRILLS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topGrills.map((grill, index) => (
              <div key={grill.id} onClick={() => handleGrillClick(grill.id)} className="cursor-pointer">
                <LeaderboardCard
                  rank={index + 1}
                  name={grill.name}
                  author={grill.author}
                  imageUrl={grill.imageUrl || grillKettle2}
                  miciCount={(grill.miciCount || 0) + (likedGrills.has(grill.id) ? 1 : 0)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Grills Section */}
      <section className="py-12 bg-cream">
        <div className="container">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Caută grătare..."
                className="pl-10 h-12 bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 h-12 bg-background">
                <SelectValue placeholder="Sortează" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="most-mici">Cele mai votate</SelectItem>
                <SelectItem value="least-mici">Cele mai puțin votate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <h2 className="font-chewy text-2xl text-foreground mb-6">
            🔥 Grills for Pimps
          </h2>

          {/* Grills Grid */}
          {filteredGrills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGrills.map((grill) => (
                <GrillCard
                  key={grill.id}
                  id={grill.id}
                  name={grill.name}
                  description={grill.description}
                  imageUrl={grill.imageUrl || grillKettle2}
                  author={grill.author}
                  location={grill.location || "România"}
                  miciCount={(grill.miciCount || 0) + (likedGrills.has(grill.id) ? 1 : 0)}
                  isLiked={likedGrills.has(grill.id)}
                  onLike={handleLike}
                  onClick={handleGrillClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <span className="text-6xl block mb-4">🔍</span>
              <h3 className="font-chewy text-2xl text-foreground mb-2">
                Nu s-au găsit grătare
              </h3>
              <p className="text-muted-foreground">
                Încearcă să cauți altceva
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Modal pentru detalii grătar */}
      {selectedGrill && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            >
              <X className="h-8 w-8" />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-1/2 p-6 bg-gray-100 rounded-l-2xl">
                <img
                  src={selectedGrill.imageUrl || selectedGrill.image || grillKettle2}
                  alt={selectedGrill.name}
                  className="w-full h-64 md:h-full object-contain rounded-xl"
                />
              </div>

              {/* Content */}
              <div className="md:w-1/2 p-6 relative">
                {/* Close button for mobile */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 md:top-4 md:right-4"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Title */}
                <h2 className="font-chewy text-2xl md:text-3xl text-foreground mb-4 pr-8">
                  {selectedGrill.name}
                </h2>

                {/* Author */}
                <p className="text-lg text-foreground mb-4">
                  <span className="font-semibold">Pimp:</span>{" "}
                  <span className="text-primary font-bold">{selectedGrill.author}</span>
                </p>

                {/* Edit/Remove buttons (only for owner) */}
                {isOwner(selectedGrill) && (
                  <div className="flex gap-3 mb-4">
                    <Button 
                      variant="outline" 
                      className="bg-primary text-white hover:bg-primary/90 border-0"
                    >
                      Edit post
                    </Button>
                    <Button 
                      variant="outline"
                      className="bg-primary text-white hover:bg-primary/90 border-0"
                      onClick={() => handleDeleteGrill(selectedGrill.id)}
                    >
                      Remove post
                    </Button>
                  </div>
                )}

                {/* Mici count */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center px-3 py-1 bg-red-500 rounded text-white text-sm font-bold">
                    <Flame className="h-4 w-4 mr-1" />
                    <Flame className="h-4 w-4 mr-1" />
                    <Flame className="h-4 w-4" />
                  </span>
                  <span className="text-xl font-bold text-foreground">
                    {(selectedGrill.miciCount || 0) + (likedGrills.has(selectedGrill.id) ? 1 : 0)} Mici
                  </span>
                </div>

                {/* Description */}
                <div className="bg-gray-50 rounded-xl p-4 max-h-48 overflow-y-auto">
                  <p className="text-foreground leading-relaxed">
                    {selectedGrill.description}
                  </p>
                </div>

                {/* Location */}
                {selectedGrill.location && (
                  <p className="text-muted-foreground mt-4 text-sm">
                    📍 {selectedGrill.location}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default BestGrills;
