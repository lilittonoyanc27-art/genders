import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Info,
  ArrowRight
} from 'lucide-react';

// --- Types ---

interface GenderCard {
  id: number;
  titleArm: string;
  ruleArm: string;
  examples: {
    spanish: string;
    armenian: string;
    image: string;
    gender: 'Masculino' | 'Femenino';
  }[];
}

// --- Data ---

const GENDER_CARDS: GenderCard[] = [
  {
    id: 1,
    titleArm: "Իսպաներենի գոյականների սեռերը",
    ruleArm: "Իսպաներենում բոլոր գոյականները լինում են կամ արական (Masculino), կամ իգական (Femenino): Չկա չեզոք սեռ:",
    examples: [
      { 
        spanish: "El género", 
        armenian: "Սեռը", 
        image: "https://picsum.photos/seed/gender/400/300",
        gender: 'Masculino'
      }
    ]
  },
  {
    id: 2,
    titleArm: "Արական սեռ (Masculino) - վերջավորություն «-o»",
    ruleArm: "Բառերի մեծ մասը, որոնք վերջանում են «-o» տառով, արական սեռի են և օգտագործում են «El» հոդը:",
    examples: [
      { 
        spanish: "El libro", 
        armenian: "Գիրքը", 
        image: "https://picsum.photos/seed/book/400/300",
        gender: 'Masculino'
      },
      { 
        spanish: "El perro", 
        armenian: "Շունը", 
        image: "https://picsum.photos/seed/dog/400/300",
        gender: 'Masculino'
      },
      { 
        spanish: "El niño", 
        armenian: "Տղան", 
        image: "https://picsum.photos/seed/boy/400/300",
        gender: 'Masculino'
      }
    ]
  },
  {
    id: 3,
    titleArm: "Իգական սեռ (Femenino) - վերջավորություն «-a»",
    ruleArm: "Բառերի մեծ մասը, որոնք վերջանում են «-a» տառով, իգական սեռի են և օգտագործում են «La» հոդը:",
    examples: [
      { 
        spanish: "La casa", 
        armenian: "Տունը", 
        image: "https://picsum.photos/seed/house/400/300",
        gender: 'Femenino'
      },
      { 
        spanish: "La mesa", 
        armenian: "Սեղանը", 
        image: "https://picsum.photos/seed/table/400/300",
        gender: 'Femenino'
      },
      { 
        spanish: "La niña", 
        armenian: "Աղջիկը", 
        image: "https://picsum.photos/seed/girl/400/300",
        gender: 'Femenino'
      }
    ]
  },
  {
    id: 4,
    titleArm: "Արական սեռ - վերջավորություն «-or»",
    ruleArm: "«-or»-ով վերջացող բառերը սովորաբար արական սեռի են:",
    examples: [
      { 
        spanish: "El profesor", 
        armenian: "Ուսուցիչը", 
        image: "https://picsum.photos/seed/teacher/400/300",
        gender: 'Masculino'
      },
      { 
        spanish: "El amor", 
        armenian: "Սերը", 
        image: "https://picsum.photos/seed/love/400/300",
        gender: 'Masculino'
      },
      { 
        spanish: "El calor", 
        armenian: "Տաքությունը", 
        image: "https://picsum.photos/seed/heat/400/300",
        gender: 'Masculino'
      }
    ]
  },
  {
    id: 5,
    titleArm: "Իգական սեռ - վերջավորություն «-ción» և «-sión»",
    ruleArm: "Այս վերջավորություններով բառերը միշտ իգական սեռի են:",
    examples: [
      { 
        spanish: "La canción", 
        armenian: "Երգը", 
        image: "https://picsum.photos/seed/song/400/300",
        gender: 'Femenino'
      },
      { 
        spanish: "La televisión", 
        armenian: "Հեռուստատեսությունը", 
        image: "https://picsum.photos/seed/tv/400/300",
        gender: 'Femenino'
      },
      { 
        spanish: "La lección", 
        armenian: "Դասը", 
        image: "https://picsum.photos/seed/lesson/400/300",
        gender: 'Femenino'
      }
    ]
  },
  {
    id: 6,
    titleArm: "Բացառություններ (Excepciones)",
    ruleArm: "Որոշ բառեր չեն հետևում ընդհանուր կանոններին:",
    examples: [
      { 
        spanish: "El mapa", 
        armenian: "Քարտեզը (վերջանում է -a, բայց արական է)", 
        image: "https://picsum.photos/seed/map/400/300",
        gender: 'Masculino'
      },
      { 
        spanish: "El día", 
        armenian: "Օրը (վերջանում է -a, բայց արական է)", 
        image: "https://picsum.photos/seed/sun/400/300",
        gender: 'Masculino'
      },
      { 
        spanish: "La mano", 
        armenian: "Ձեռքը (վերջանում է -o, բայց իգական է)", 
        image: "https://picsum.photos/seed/hand/400/300",
        gender: 'Femenino'
      }
    ]
  }
];

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const nextCard = () => {
    if (currentIdx < GENDER_CARDS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    }
  };

  const prevCard = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const currentCard = GENDER_CARDS[currentIdx];
  const progress = ((currentIdx + 1) / GENDER_CARDS.length) * 100;

  return (
    <div className="min-h-screen bg-[#38bdf8] bg-gradient-to-b from-[#7dd3fc] to-[#38bdf8] flex flex-col font-sans text-white overflow-hidden">
      {/* Header */}
      <header className="p-6 flex items-center gap-4 max-w-4xl mx-auto w-full">
        <div className="flex-1 h-3 bg-white/30 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          />
        </div>
        <div className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full border border-white/30">
          {currentIdx + 1} / {GENDER_CARDS.length}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-4 max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="w-full"
          >
            {/* Rule Header */}
            <div className="bg-white/20 backdrop-blur-md rounded-[32px] p-8 mb-8 border border-white/30 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white rounded-2xl text-[#1e40af]">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black tracking-tight">{currentCard.titleArm}</h2>
              </div>
              <p className="text-lg opacity-90 leading-relaxed font-medium">
                {currentCard.ruleArm}
              </p>
            </div>

            {/* Examples Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCard.examples.map((ex, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-[24px] overflow-hidden shadow-xl group hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="relative h-48">
                    <img 
                      src={ex.image} 
                      alt={ex.spanish}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      ex.gender === 'Masculino' ? 'bg-blue-500 text-white' : 'bg-pink-500 text-white'
                    }`}>
                      {ex.gender === 'Masculino' ? 'Արական' : 'Իգական'}
                    </div>
                  </div>
                  <div className="p-6 text-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-black text-[#1e40af]">{ex.spanish}</h3>
                      <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-50 transition-colors">
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-gray-500 font-medium flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      {ex.armenian}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Footer */}
      <footer className="p-8 max-w-4xl mx-auto w-full flex items-center justify-between gap-4">
        <button
          onClick={prevCard}
          disabled={currentIdx === 0}
          className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all ${
            currentIdx === 0 
              ? 'bg-white/10 text-white/30 cursor-not-allowed' 
              : 'bg-white/20 hover:bg-white/30 text-white active:scale-95'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          Նախորդը
        </button>

        <div className="flex gap-2">
          {GENDER_CARDS.map((_, i) => (
            <div 
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIdx ? 'w-8 bg-white' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextCard}
          disabled={currentIdx === GENDER_CARDS.length - 1}
          className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all ${
            currentIdx === GENDER_CARDS.length - 1
              ? 'bg-white/10 text-white/30 cursor-not-allowed' 
              : 'bg-white text-[#1e40af] hover:bg-opacity-90 active:scale-95 shadow-lg'
          }`}
        >
          Հաջորդը
          <ChevronRight className="w-5 h-5" />
        </button>
      </footer>
    </div>
  );
}
