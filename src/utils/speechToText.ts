// Mock Speech-to-Text functionality
// In production, this would call Google Cloud Speech-to-Text API

const sampleTranscriptions = [
  "This handcrafted ceramic bowl was made using traditional pottery techniques passed down through generations. The natural clay gives it a beautiful earthy texture.",
  "I created this wooden sculpture from sustainably sourced oak wood. The grain patterns tell a story of the tree's life, and I wanted to preserve that natural beauty.",
  "This textile piece represents months of careful weaving using traditional patterns from my grandmother's designs. Each thread was chosen for its color and texture.",
  "Forged from recycled metal, this piece combines modern minimalism with ancient blacksmithing techniques. The contrast creates a unique contemporary aesthetic.",
  "Hand-blown glass with natural imperfections that make each piece unique. The transparency captures light in unexpected ways, creating dancing shadows.",
  "Carved from reclaimed driftwood found on local beaches. The weathered surface tells the story of its journey through ocean currents and tides.",
  "Handwoven with organic cotton and natural dyes extracted from local plants. The colors change subtly depending on the light and viewing angle.",
  "This copper piece was hammered using traditional techniques. The patina developed naturally over time, giving it this beautiful green oxidation."
];

export const simulateSpeechToText = async (audioBlob: Blob): Promise<string> => {
  // Simulate API processing time
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
  
  // Return a random sample transcription
  const randomIndex = Math.floor(Math.random() * sampleTranscriptions.length);
  return sampleTranscriptions[randomIndex];
};

export const isAudioSupported = (): boolean => {
  return 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices;
};