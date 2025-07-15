import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FileUploadZoneProps {
  file: File | null;
  setFile: (file: File | null) => void;
  accept: string;
  title: string;
  subtitle: string;
  note: string;
  icon: LucideIcon;
}

export default function FileUploadZone({
  file,
  setFile,
  accept,
  title,
  subtitle,
  note,
  icon: Icon,
}: FileUploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const droppedFile = files[0];
      if (droppedFile.type === "image/png" || droppedFile.name.endsWith(".png")) {
        setFile(droppedFile);
      } else {
        alert("Please drop a PNG file only.");
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-6">
      <motion.div
        className={`upload-zone p-8 rounded-xl transition-all duration-300 cursor-pointer ${
          isDragOver ? "drag-over" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="text-center">
          <motion.div 
            className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 floating-element"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{subtitle}</p>
          <div className="text-xs text-muted-foreground/70">
            {note}
          </div>
          {file && (
            <div className="mt-4 text-sm text-primary font-medium">
              Selected: {file.name}
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />
      </motion.div>
    </div>
  );
}
