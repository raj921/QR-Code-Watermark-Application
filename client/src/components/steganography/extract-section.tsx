import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Unlock, Copy, CheckCircle, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import FileUploadZone from "./file-upload-zone";
import ProgressBar from "./progress-bar";
import { extractDataFromImage } from "@/lib/steganography";
import { decryptData } from "@/lib/crypto";

interface ExtractSectionProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

export default function ExtractSection({ file, setFile }: ExtractSectionProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleExtract = async () => {
    if (!file) {
      toast({
        title: "Missing file",
        description: "Please select a watermarked PNG file.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setResult(null);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 15, 90));
      }, 200);

      // Extract encrypted data from the image
      const encryptedData = await extractDataFromImage(file);
      
      if (!encryptedData) {
        throw new Error("No hidden data found in this image. Make sure you're using an image that was processed with the embed function.");
      }

      // Decrypt the extracted data
      const decryptedPayload = await decryptData(encryptedData);
      
      clearInterval(progressInterval);
      setProgress(100);
      setResult(decryptedPayload);
      
      toast({
        title: "Data extracted",
        description: "Successfully extracted and decrypted the hidden payload.",
      });
    } catch (error) {
      console.error("Extraction failed:", error);
      toast({
        title: "Extraction failed",
        description: error instanceof Error ? error.message : "An error occurred while extracting data.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast({
        title: "Copied to clipboard",
        description: "The extracted data has been copied to your clipboard.",
      });
    }
  };

  return (
    <div id="extract" className="glass-card p-8 rounded-2xl">
      <motion.div 
        className="flex items-center space-x-3 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center">
          <Search className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold">Extract Data</h2>
      </motion.div>

      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="glass-card p-6 rounded-xl scan-animation">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">WebAssembly Scanner</h3>
            <p className="text-muted-foreground text-sm">60 FPS QR detection with Web Worker</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <FileUploadZone
          file={file}
          setFile={setFile}
          accept=".png"
          title="Drop watermarked PNG"
          subtitle="or click to browse files"
          note="Supports PNG with hidden data • Max 10MB"
          icon={Eye}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          onClick={handleExtract}
          disabled={!file || isProcessing}
          className="w-full bg-gradient-to-r from-secondary to-primary hover:shadow-lg hover:shadow-secondary/30 transition-all font-semibold py-4 rounded-xl"
        >
          <Unlock className="w-4 h-4 mr-2" />
          {isProcessing ? "Analyzing..." : "Extract & Decrypt"}
        </Button>
      </motion.div>

      {isProcessing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <ProgressBar progress={progress} text="Analyzing..." />
        </motion.div>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <div className="glass-card p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="font-medium">Data Extracted</span>
              </div>
              <Button
                onClick={handleCopy}
                variant="ghost"
                className="text-secondary hover:text-secondary/80 transition-colors"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <div className="bg-black/50 rounded-lg p-3 font-mono text-sm text-green-300 break-all">
              {result}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
