import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onAnalyze: (image: File, note: string) => void;
  isAnalyzing: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onAnalyze, isAnalyzing }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleAnalyze = () => {
    if (selectedImage) {
      onAnalyze(selectedImage, note);
    }
  };

  return (
    <Card className="p-8 bg-gradient-card border-clay-orange/20 shadow-soft">
      <div className="space-y-6">
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300",
            dragActive 
              ? "border-clay-orange bg-clay-orange/5 scale-105" 
              : "border-clay-orange/30 hover:border-clay-orange hover:bg-clay-orange/5",
            selectedImage && "border-sage-green bg-sage-green/5"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-full max-h-64 mx-auto rounded-lg shadow-soft"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-8 w-8 rounded-full"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-clay-orange/10 rounded-full">
                  <ImageIcon className="h-12 w-12 text-clay-orange" />
                </div>
              </div>
              <div>
                <p className="text-lg font-medium text-warm-brown mb-2">
                  Upload your artisan product
                </p>
                <p className="text-muted-foreground">
                  Drag and drop an image here, or click to select
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="upload" className="cursor-pointer">
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Image
                </Button>
              </label>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-warm-brown">
            Add a note (optional)
          </label>
          <Textarea
            placeholder="Describe your product, materials used, inspiration, or any special details..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-20 border-clay-orange/20 focus:border-clay-orange"
          />
        </div>

        <Button
          variant="artisan"
          size="lg"
          className="w-full"
          onClick={handleAnalyze}
          disabled={!selectedImage || isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Analyzing with AI...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Generate Product Description
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};