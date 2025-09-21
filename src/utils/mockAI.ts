// Mock AI responses to simulate Google Cloud AI services
// In production, this would call your FastAPI backend

export interface AIAnalysisResult {
  tags: string[];
  description_en: string;
  description_hi: string;
  description_es: string;
  image: string;
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
    es: "Esta hermosa pieza de cerámica hecha a mano muestra la artesanía atemporal de la alfarería tradicional. Cada curva y textura cuenta la historia de manos hábiles trabajando con arcilla natural, creando una pieza única que aporta calidez y autenticidad."
  },
  {
    en: "Carved from sustainably sourced wood, this artisan creation embodies the natural beauty of organic materials. The smooth finish and elegant grain patterns showcase hours of meticulous craftsmanship, resulting in a piece that celebrates both nature and human creativity.",
    hi: "टिकाऊ रूप से प्राप्त लकड़ी से तराशा गया, यह कारीगर रचना जैविक सामग्री की प्राकृतिक सुंदरता को मूर्त रूप देती है। चिकनी फिनिश और सुरुचिपूर्ण अनाज पैटर्न घंटों की सूक्ष्म शिल्प कौशल को प्रदर्शित करते हैं।",
    es: "Tallada en madera de origen sostenible, esta creación artesanal encarna la belleza natural de los materiales orgánicos. El acabado suave y los elegantes patrones de vetas muestran horas de artesanía meticulosa."
  }
];

export const simulateAIAnalysis = async (image: File, note: string): Promise<AIAnalysisResult> => {
  // Simulate API processing time
  await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 2000));
  
  // Create image URL for display
  const imageUrl = URL.createObjectURL(image);
  
  // Randomly select mock data (in production, this would be AI-generated)
  const randomIndex = Math.floor(Math.random() * sampleTags.length);
  const tags = sampleTags[randomIndex];
  const description = sampleDescriptions[Math.floor(Math.random() * sampleDescriptions.length)];
  
  // If user provided a note, incorporate it into the description
  let enhancedDescription = description;
  if (note.trim()) {
    enhancedDescription = {
      en: `${description.en} ${note.includes('handmade') || note.includes('artisan') ? 'The creator notes: ' + note : 'This piece reflects the artisan\'s vision: ' + note}`,
      hi: description.hi + (note ? ` कलाकार का नोट: ${note}` : ''),
      es: description.es + (note ? ` Nota del artesano: ${note}` : '')
    };
  }
  
  return {
    tags,
    description_en: enhancedDescription.en,
    description_hi: enhancedDescription.hi,
    description_es: enhancedDescription.es,
    image: imageUrl
  };
};