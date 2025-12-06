import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";

// BBQ Icons
import apronIcon from "@/assets/icons/apron.png";
import chiliIcon from "@/assets/icons/chili.png";
import kebabIcon from "@/assets/icons/kebab.png";
import grillGrateIcon from "@/assets/icons/grill-grate.png";
import spatulaIcon from "@/assets/icons/spatula.png";
import chefHatIcon from "@/assets/icons/chef-hat.png";
import burgerIcon from "@/assets/icons/burger.png";
import brushIcon from "@/assets/icons/brush.png";
import cleaverIcon from "@/assets/icons/cleaver.png";

// Grill images
import pimpCharacter from "@/assets/pimp-character.png";
import grillKettle1 from "@/assets/grill-kettle-1.png";
import grillKettle2 from "@/assets/grill-kettle-2.png";
import grillKettle3 from "@/assets/grill-kettle-3.png";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      {/* Hero Section - White background with icons */}
      <section className="bg-white py-12 md:py-20 relative overflow-hidden min-h-[60vh] flex items-center justify-center">
        <div className="container relative z-10">
          {/* Scattered BBQ Icons */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Left side icons */}
            <img src={chiliIcon} alt="" className="absolute top-4 left-[5%] w-16 md:w-20 opacity-80 -rotate-12" />
            <img src={kebabIcon} alt="" className="absolute top-[15%] left-[15%] w-20 md:w-28 opacity-80 rotate-45" />
            <img src={apronIcon} alt="" className="absolute top-[50%] left-[3%] w-18 md:w-24 opacity-80" />
            <img src={cleaverIcon} alt="" className="absolute top-[85%] left-[12%] w-18 md:w-24 opacity-80 -rotate-12" />
            
            {/* Right side icons */}
            <img src={spatulaIcon} alt="" className="absolute top-[5%] right-[15%] w-16 md:w-20 opacity-80 rotate-45" />
            <img src={grillGrateIcon} alt="" className="absolute top-[15%] right-[3%] w-20 md:w-28 opacity-80" />
            <img src={chefHatIcon} alt="" className="absolute top-[45%] right-[15%] w-18 md:w-24 opacity-80" />
            <img src={burgerIcon} alt="" className="absolute top-[65%] right-[5%] w-16 md:w-20 opacity-80 rotate-6" />
            <img src={brushIcon} alt="" className="absolute top-[80%] right-[12%] w-14 md:w-18 opacity-80 -rotate-45" />
          </div>

          {/* Center content */}
          <div className="flex flex-col items-center justify-center text-center relative z-20">
            <h1 className="font-chewy text-4xl md:text-6xl text-foreground mb-2">
              Pimp Your
            </h1>
            <div className="relative">
              {/* Speed lines */}
              <div className="absolute -left-8 md:-left-12 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                <span className="block w-6 md:w-10 h-0.5 bg-primary/60 rounded-full animate-pulse"></span>
                <span className="block w-8 md:w-14 h-0.5 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></span>
                <span className="block w-5 md:w-8 h-0.5 bg-primary/50 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
              </div>
              <h1 
                className="font-rye text-4xl md:text-6xl text-primary relative grill-text"
                style={{ 
                  letterSpacing: '0.15em',
                  textShadow: '3px 3px 0px rgba(101, 67, 33, 0.4), 6px 6px 0px rgba(101, 67, 33, 0.2), -1px -1px 0px rgba(255,255,255,0.5)',
                  transform: 'skewX(-5deg)',
                }}
              >
                GRILL
              </h1>
              {/* Speed lines right */}
              <div className="absolute -right-8 md:-right-12 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                <span className="block w-6 md:w-10 h-0.5 bg-primary/60 rounded-full animate-pulse"></span>
                <span className="block w-8 md:w-14 h-0.5 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: '0.15s' }}></span>
                <span className="block w-5 md:w-8 h-0.5 bg-primary/50 rounded-full animate-pulse" style={{ animationDelay: '0.25s' }}></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner - Dark red */}
      <section className="bg-primary py-6 md:py-8">
        <div className="container">
          <p className="text-lg md:text-xl text-primary-foreground text-center font-medium">
            {isAuthenticated ? (
              <>
                Bine ai revenit, mare grătăragiu!
                <br className="hidden md:block" />
                {" "}Explorează cele mai bune grătare din comunitate!
              </>
            ) : (
              <>
                Înregistrează-te pentru a intra și tu în cea mai mare
                <br className="hidden md:block" />
                {" "}rețea de grătăragii din lume!
              </>
            )}
          </p>
        </div>
      </section>

      {/* Grills Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            {/* Character with speech bubble */}
            <div className="relative">
              <div className="absolute -top-16 -left-4 bg-white border-2 border-foreground rounded-2xl px-4 py-3 max-w-[150px]">
                <p className="text-sm text-foreground font-medium">
                  Wow Louis! Grătarele astea sunt terifice!
                </p>
                {/* Speech bubble tail */}
                <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-r-2 border-b-2 border-foreground transform rotate-45"></div>
              </div>
              <img 
                src={pimpCharacter} 
                alt="Pimp character" 
                className="w-40 md:w-52 h-auto"
              />
            </div>

            {/* Grill images */}
            <div className="flex items-end gap-6 md:gap-10">
              <img 
                src={grillKettle1} 
                alt="Grill 1" 
                className="w-28 md:w-40 h-auto"
              />
              <img 
                src={grillKettle2} 
                alt="Grill 2" 
                className="w-32 md:w-48 h-auto"
              />
              <img 
                src={grillKettle3} 
                alt="Grill 3" 
                className="w-28 md:w-40 h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
