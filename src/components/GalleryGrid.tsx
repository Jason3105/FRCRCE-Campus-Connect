
import { useState } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Photo {
  id: string;
  title: string;
  event: string;
  date: string;
  imageUrl: string;
  category: string;
}

interface GalleryGridProps {
  photos: Photo[];
}

const GalleryGrid = ({ photos }: GalleryGridProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const openLightbox = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 hover-scale cursor-pointer"
            onClick={() => openLightbox(photo)}
          >
            <div className="h-60 overflow-hidden">
              <img 
                src={photo.imageUrl} 
                alt={photo.title} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg text-gray-900 mb-1">{photo.title}</h3>
              <p className="text-sm text-gray-600 mb-2">From: {photo.event}</p>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar size={14} className="mr-1" />
                <span>{photo.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Dialog open={selectedPhoto !== null} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-auto">
          {selectedPhoto && (
            <div className="flex flex-col">
              <div className="overflow-hidden">
                <img 
                  src={selectedPhoto.imageUrl} 
                  alt={selectedPhoto.title}
                  className="w-full object-contain max-h-[70vh]" 
                />
              </div>
              <div className="mt-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedPhoto.title}</h2>
                <p className="text-lg text-gray-700 mt-1">{selectedPhoto.event}</p>
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  <span>{selectedPhoto.date}</span>
                </div>
                <div className="mt-2">
                  <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                    {selectedPhoto.category}
                  </span>
                </div>
              </div>
              <DialogClose asChild>
                <Button className="mt-4 w-full">Close</Button>
              </DialogClose>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GalleryGrid;
