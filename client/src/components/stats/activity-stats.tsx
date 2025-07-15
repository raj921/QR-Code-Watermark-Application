import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, Activity, Upload, Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface StatsData {
  totalEmbeddings: number;
  totalExtractions: number;
  recentActivity: {
    embeddings: Array<{
      id: number;
      originalFilename: string;
      payloadSize: number;
      createdAt: string;
    }>;
    extractions: Array<{
      id: number;
      filename: string;
      success: string;
      createdAt: string;
    }>;
  };
}

export default function ActivityStats() {
  const { data: stats, isLoading } = useQuery<StatsData>({
    queryKey: ['/api/stats'],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  if (isLoading) {
    return (
      <motion.div 
        className="glass-card p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/3 mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-muted rounded w-full"></div>
            <div className="h-3 bg-muted rounded w-2/3"></div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!stats) return null;

  return (
    <motion.div 
      className="glass-card p-6 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold">Activity Statistics</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
          <Upload className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-primary">{stats.totalEmbeddings}</div>
          <div className="text-sm text-muted-foreground">Embeddings</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg">
          <Download className="w-6 h-6 text-secondary mx-auto mb-2" />
          <div className="text-2xl font-bold text-secondary">{stats.totalExtractions}</div>
          <div className="text-sm text-muted-foreground">Extractions</div>
        </div>
      </div>

      {stats.recentActivity.embeddings.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center">
            <Activity className="w-4 h-4 mr-2" />
            Recent Embeddings
          </h4>
          <div className="space-y-2">
            {stats.recentActivity.embeddings.map((embedding) => (
              <div key={embedding.id} className="flex justify-between items-center text-sm bg-primary/5 rounded-lg p-2">
                <span className="truncate">{embedding.originalFilename}</span>
                <span className="text-muted-foreground">{embedding.payloadSize}B</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats.recentActivity.extractions.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center">
            <Activity className="w-4 h-4 mr-2" />
            Recent Extractions
          </h4>
          <div className="space-y-2">
            {stats.recentActivity.extractions.map((extraction) => (
              <div key={extraction.id} className="flex justify-between items-center text-sm bg-secondary/5 rounded-lg p-2">
                <span className="truncate">{extraction.filename}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  extraction.success === 'true' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {extraction.success === 'true' ? 'Success' : 'Failed'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}