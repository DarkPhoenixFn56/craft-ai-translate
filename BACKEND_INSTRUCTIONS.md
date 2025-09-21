# ArtisansGoAI Backend Setup

This document provides instructions for setting up the FastAPI backend that integrates with Google Cloud APIs.

## Backend Architecture

```
backend/
├── main.py              # FastAPI application
├── services/
│   ├── vision_ai.py     # Google Cloud Vision AI service
│   ├── vertex_ai.py     # Vertex AI text generation
│   └── translation.py   # Cloud Translation API
├── models/
│   └── schemas.py       # Pydantic models
├── requirements.txt     # Python dependencies
├── .env.example         # Environment variables template
└── Dockerfile          # Container configuration
```

## Setup Instructions

### 1. Local Development

```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn python-multipart
pip install google-cloud-vision google-cloud-translate google-cloud-aiplatform
pip install python-dotenv pillow

# Set environment variables
cp .env.example .env
# Edit .env with your values
```

### 2. Environment Variables (.env)

```env
PROJECT_ID=your-gcp-project-id
LOCATION=us-central1
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account.json
BUCKET_NAME=your-storage-bucket-name
```

### 3. Sample FastAPI Code (main.py)

```python
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from services.vision_ai import analyze_image
from services.vertex_ai import generate_description
from services.translation import translate_text
import os

app = FastAPI(title="ArtisansGoAI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_product(
    image: UploadFile = File(...),
    note: str = Form("")
):
    # 1. Analyze image with Vision AI
    tags = await analyze_image(image)
    
    # 2. Generate description with Vertex AI
    description_en = await generate_description(tags, note)
    
    # 3. Translate to multiple languages
    description_hi = await translate_text(description_en, "hi")
    description_es = await translate_text(description_en, "es")
    
    return {
        "tags": tags,
        "description_en": description_en,
        "description_hi": description_hi,
        "description_es": description_es
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
```

### 4. Google Cloud Services Setup

#### Vision AI Service (services/vision_ai.py)
```python
from google.cloud import vision
import io

async def analyze_image(image_file):
    client = vision.ImageAnnotatorClient()
    
    content = await image_file.read()
    image = vision.Image(content=content)
    
    # Label detection
    response = client.label_detection(image=image)
    labels = response.label_annotations
    
    # Object detection for materials/styles
    objects = client.object_localization(image=image)
    
    tags = [label.description.lower() for label in labels[:10]]
    return tags
```

#### Vertex AI Service (services/vertex_ai.py)
```python
from google.cloud import aiplatform
import os

async def generate_description(tags, note):
    aiplatform.init(
        project=os.getenv("PROJECT_ID"),
        location=os.getenv("LOCATION")
    )
    
    prompt = f"""
    Create a compelling 3-4 sentence product description for an artisan product.
    Tags: {', '.join(tags)}
    Artisan note: {note}
    
    Style: Authentic, warm, highlights craftsmanship and uniqueness.
    """
    
    # Use Vertex AI text generation
    # Implementation depends on your chosen model (PaLM, Gemini, etc.)
    
    return generated_description
```

#### Translation Service (services/translation.py)
```python
from google.cloud import translate_v2 as translate

async def translate_text(text, target_language):
    client = translate.Client()
    
    result = client.translate(
        text,
        target_language=target_language,
        source_language='en'
    )
    
    return result['translatedText']
```

## Deployment

### Cloud Run Deployment

1. **Build and deploy:**
```bash
gcloud run deploy artisansgoai-api \
    --source . \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --set-env-vars PROJECT_ID=your-project-id,LOCATION=us-central1
```

2. **Update frontend API URL:**
```typescript
// In your React app
const API_BASE_URL = 'https://your-cloud-run-url.run.app';
```

### Cost Optimization

- **Vision AI**: ~$1.50 per 1000 images
- **Vertex AI**: ~$0.002 per 1000 tokens
- **Translation**: ~$20 per 1M characters
- **Cloud Run**: Free tier covers light usage

**Daily budget (~$3)**: ~500 image analyses with descriptions and translations.

## Frontend Connection

Update the mock function in your React app:

```typescript
// src/utils/mockAI.ts -> src/utils/realAI.ts
export const analyzeWithAI = async (image: File, note: string): Promise<AIAnalysisResult> => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('note', note);

  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  
  return {
    ...result,
    image: URL.createObjectURL(image)
  };
};
```

## Testing

```bash
# Run locally
uvicorn main:app --reload --port 8000

# Test endpoint
curl -X POST "http://localhost:8000/analyze" \
  -F "image=@test-image.jpg" \
  -F "note=Handmade ceramic bowl"
```

This backend structure provides a production-ready foundation that you can expand with user authentication, database storage, and additional AI features.