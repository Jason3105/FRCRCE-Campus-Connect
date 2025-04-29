
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryImage {
  id: string;
  title: string;
  url: string;
  description?: string;
  date?: string;
  event?: string;
}

interface GalleryCarouselProps {
  images: GalleryImage[];
  currentImage: GalleryImage | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const GalleryCarousel = ({ images, currentImage, isOpen, onOpenChange }: GalleryCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(() => {
    if (!currentImage) return 0;
    return images.findIndex(img => img.id === currentImage.id) || 0;
  });

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (!images.length || !isOpen) return null;

  const activeImage = images[activeIndex];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/90 border-none">
        <div className="relative flex items-center justify-center h-[90vh] max-h-[90vh]">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-white hover:bg-white/20 z-50"
            onClick={() => onOpenChange(false)}
          >
            <X />
          </Button>
          
          {/* Navigation buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 text-white hover:bg-white/20 rounded-full h-12 w-12"
            onClick={handlePrevious}
          >
            <ChevronLeft size={24} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 text-white hover:bg-white/20 rounded-full h-12 w-12"
            onClick={handleNext}
          >
            <ChevronRight size={24} />
          </Button>
          
          {/* Image */}
          <div className="w-full h-full flex flex-col">
            <div className="flex-grow flex items-center justify-center p-4">
              <img
                src={activeImage.url}
                alt={activeImage.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            
            {/* Caption */}
            <div className="bg-black/60 p-4 text-white">
              <h3 className="text-xl font-bold">{activeImage.title}</h3>
              {activeImage.description && <p className="mt-1 text-gray-300">{activeImage.description}</p>}
              <div className="flex items-center justify-between mt-2 text-sm text-gray-300">
                {activeImage.event && <span>Event: {activeImage.event}</span>}
                {activeImage.date && <span>{activeImage.date}</span>}
                <span>{activeIndex + 1} of {images.length}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryCarousel;
