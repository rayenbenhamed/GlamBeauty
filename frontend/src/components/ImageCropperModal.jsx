import { useState, useRef } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Button from "@/components/ui/button.jsx";

// Helper function to center the initial crop
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const ImageCropperModal = ({ imageSrc, onCropComplete, onCancel }) => {
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [isProcessing, setIsProcessing] = useState(false);

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  };

  const handleValidate = async () => {
    if (!completedCrop || !imgRef.current) return;

    setIsProcessing(true);
    try {
      const image = imgRef.current;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("No 2d context");
      }

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      // Set canvas size to the cropped area size
      canvas.width = completedCrop.width * scaleX;
      canvas.height = completedCrop.height * scaleY;

      ctx.imageSmoothingQuality = "high";

      // Draw the cropped image onto the canvas
      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Convert canvas to a blob (file)
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error("Canvas is empty");
        }
        // Give it a filename so FormData works properly
        const file = new File([blob], "profile-crop.jpg", { type: "image/jpeg" });
        onCropComplete(file);
      }, "image/jpeg", 0.95);
    } catch (err) {
      console.error("Error cropping image:", err);
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-display text-lg text-ink">Recadrer la photo</h3>
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1 flex justify-center items-center bg-gray-100 min-h-[300px]">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1}
            circularCrop
            className="max-h-[50vh]"
          >
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Crop preview"
              onLoad={onImageLoad}
              className="max-h-[50vh] object-contain"
            />
          </ReactCrop>
        </div>
        
        <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <Button 
            variant="outline" 
            onClick={onCancel}
            disabled={isProcessing}
            className="bg-white"
          >
            Annuler
          </Button>
          <Button 
            onClick={handleValidate}
            disabled={!completedCrop || isProcessing}
          >
            {isProcessing ? "Traitement..." : "Valider"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropperModal;
