import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Lock, Upload, Download, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import FileUploadZone from "./file-upload-zone";
import ProgressBar from "./progress-bar";
import { embedDataInImage } from "@/lib/steganography";
import { encryptData } from "@/lib/crypto";

interface EmbedSectionProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

export default function EmbedSection({ file, setFile }: EmbedSectionProps) {
  const [payload, setPayload] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleEmbed = async () => {
    if (!file || !payload) {
      toast({
        title: "Missing inputs",
        description: "Please select a file and enter a payload.",
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
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      // Encrypt the payload
      const encryptedPayload = await encryptData(payload);
      
      // Embed the encrypted data in the image
      const resultBlob = await embedDataInImage(file, encryptedPayload);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      // Create download URL
      const url = URL.createObjectURL(resultBlob);
      setResult(url);
      
      toast({
        title: "Embedding complete",
        description: "Your image now contains encrypted data invisible to the human eye.",
      });
    } catch (error) {
      console.error("Embedding failed:", error);
      toast({
        title: "Embedding failed",
        description: "An error occurred while processing your image.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      const link = document.createElement("a");
      link.href = result;
      link.download = `embedded_${file?.name || "image.png"}`;
      link.click();
    }
  };

  return (
    <div id="embed" className="glass-card p-8 rounded-2xl">
      <motion.div 
        className="flex items-center space-x-3 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
          <Plus className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold">Embed Data</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <FileUploadZone
          file={file}
          setFile={setFile}
          accept=".png"
          title="Drop your PNG here"
          subtitle="or click to browse files"
          note="Supports PNG with alpha channel • Max 10MB"
          icon={Upload}
        />
      </motion.div>

      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label className="block text-sm font-medium mb-2">Encrypted Payload</label>
        <Textarea
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          placeholder="Enter your secret data (max 256 bytes)..."
          className="w-full bg-[var(--glass-light)] border border-[var(--glass-border)] rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
          rows={4}
          maxLength={256}
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-muted-foreground">Will be encrypted with XChaCha20-Poly1305</span>
          <span className="text-xs text-muted-foreground">{payload.length}/256</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          onClick={handleEmbed}
          disabled={!file || !payload || isProcessing}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 transition-all font-semibold py-4 rounded-xl"
        >
          <Lock className="w-4 h-4 mr-2" />
          {isProcessing ? "Processing..." : "Embed & Encrypt"}
        </Button>
      </motion.div>

      {isProcessing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <ProgressBar progress={progress} text="Processing..." />
        </motion.div>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <div className="glass-card p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="font-medium">Embedding Complete</span>
              </div>
              <Button
                onClick={handleDownload}
                variant="ghost"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Your image now contains encrypted data invisible to the human eye.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
