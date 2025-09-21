// Mock AI responses to simulate Google Cloud AI services
// In production, this would call your FastAPI backend

export interface AIAnalysisResult {
  tags: string[];
  description_en: string;
  description_hi: string;
  description_es: string;
  cultural_fact: string;
  image: string;
  artisan_id: string;
}

const sampleTags = [
  ['handmade', 'ceramic', 'pottery', 'artisan', 'rustic'],
  ['wooden', 'carved', 'natural', 'organic', 'handcrafted'],
  ['textile', 'woven', 'fiber art', 'traditional', 'colorful'],
  ['metal', 'forged', 'industrial', 'contemporary', 'minimalist'],
  ['glass', 'blown', 'transparent', 'artistic', 'delicate'],
];

const sampleDescriptions = [
  {
    en: "This beautiful handcrafted ceramic piece showcases the timeless artistry of traditional pottery. Each curve and texture tells a story of skilled hands working with natural clay, creating a unique piece that brings warmth and authenticity to any space.",
    hi: "यह सुंदर हस्तनिर्मित सिरेमिक टुकड़ा पारंपरिक मिट्टी के बर्तनों की कालातीत कलात्मकता को प्रदर्शित करता है। प्रत्येक वक्र और बनावट कुशल हाथों की कहानी कहती है जो प्राकृतिक मिट्टी के साथ काम करके एक अनूठा टुकड़ा बनाते हैं।",
    es: "Esta hermosa pieza de cerámica hecha a mano muestra la artesanía atemporal de la alfarería tradicional. Cada curva y textura cuenta la historia de manos hábiles trabajando con arcilla natural, creando una pieza única que aporta calidez y autenticidad.",
    cultural: "Pottery has been central to human civilization for over 20,000 years, with the oldest known ceramics discovered in China dating back to 18,000 BCE."
  },
  {
    en: "Carved from sustainably sourced wood, this artisan creation embodies the natural beauty of organic materials. The smooth finish and elegant grain patterns showcase hours of meticulous craftsmanship, resulting in a piece that celebrates both nature and human creativity.",
    hi: "टिकाऊ रूप से प्राप्त लकड़ी से तराशा गया, यह कारीगर रचना जैविक सामग्री की प्राकृतिक सुंदरता को मूर्त रूप देती है। चिकनी फिनिश और सुरुचिपूर्ण अनाज पैटर्न घंटों की सूक्ष्म शिल्प कौशल को प्रदर्शित करते हैं।",
    es: "Tallada en madera de origen sostenible, esta creación artesanal encarna la belleza natural de los materiales orgánicos. El acabado suave y los elegantes patrones de vetas muestran horas de artesanía meticulosa.",
    cultural: "Woodcarving traditions span across cultures, with Japanese woodcarving (mokuhanga) dating to 8th century and African wood sculptures serving as spiritual conduits for millennia."
  },
  {
    en: "This vibrant textile weaving combines traditional patterns with contemporary flair. The intricate threadwork demonstrates generations of inherited knowledge, where each color and pattern holds cultural significance and tells ancestral stories.",
    hi: "यह जीवंत वस्त्र बुनाई पारंपरिक पैटर्न को समकालीन स्वभाव के साथ जोड़ती है। जटिल धागे का काम पीढ़ियों के विरासत में मिले ज्ञान को प्रदर्शित करता है, जहाँ प्रत्येक रंग और पैटर्न सांस्कृतिक महत्व रखता है।",
    es: "Este vibrante tejido textil combina patrones tradicionales con estilo contemporáneo. El intrincado trabajo de hilos demuestra conocimientos heredados de generaciones, donde cada color y patrón tiene significado cultural.",
    cultural: "Textile weaving predates written history, with the oldest known textiles from Peru dating to 8000 BCE, representing humanity's earliest form of artistic expression."
  }
];

const additionalCulturalFacts = [
  "Metalworking began in the Copper Age around 5500 BCE, with early artisans in Anatolia creating the first smelted copper objects.",
  "Glass-making originated in Mesopotamia around 3500 BCE, where artisans discovered the transformative power of sand, soda, and lime under intense heat.",
  "Traditional hand-building techniques in ceramics predate the potter's wheel by thousands of years, representing humanity's first sculptural art form.",
  "Indigenous textile traditions worldwide use natural dyes from plants, minerals, and insects, creating colors that have remained vibrant for centuries.",
  "Basket weaving is considered one of the oldest crafts, with evidence found across all continents dating back over 12,000 years."
];

export const simulateAIAnalysis = async (image: File, note: string, audioNote?: Blob): Promise<AIAnalysisResult> => {
  // Simulate API processing time
  await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 2000));
  
  // Create image URL for display
  const imageUrl = URL.createObjectURL(image);
  
  // Generate unique artisan ID
  const artisan_id = `artisan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Randomly select mock data (in production, this would be AI-generated)
  const randomIndex = Math.floor(Math.random() * sampleTags.length);
  const tags = sampleTags[randomIndex];
  const description = sampleDescriptions[Math.floor(Math.random() * sampleDescriptions.length)];
  
  // Select cultural fact
  const cultural_fact = description.cultural || additionalCulturalFacts[Math.floor(Math.random() * additionalCulturalFacts.length)];
  
  // If user provided a note, incorporate it into the description
  let enhancedDescription = description;
  if (note.trim()) {
    enhancedDescription = {
      en: `${description.en} ${note.includes('handmade') || note.includes('artisan') ? 'The creator notes: ' + note : 'This piece reflects the artisan\'s vision: ' + note}`,
      hi: description.hi + (note ? ` कलाकार का नोट: ${note}` : ''),
      es: description.es + (note ? ` Nota del artesano: ${note}` : ''),
      cultural: description.cultural
    };
  }
  
  return {
    tags,
    description_en: enhancedDescription.en,
    description_hi: enhancedDescription.hi,
    description_es: enhancedDescription.es,
    cultural_fact,
    image: imageUrl,
    artisan_id
  };
};