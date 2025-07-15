import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
  text: string;
}

export default function ProgressBar({ progress, text }: ProgressBarProps) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span>{text}</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <motion.div
          className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
