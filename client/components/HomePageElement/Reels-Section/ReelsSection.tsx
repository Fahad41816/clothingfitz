"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const reels = [
  {
    id: 1,
    title: "Custom T-Shirt Printing Process",
    thumbnail:
      "https://i.pinimg.com/736x/ff/35/a0/ff35a030128e89e734bfab94b68122f7.jpg",
    videoUrl: "/sample-video-1.mp4",
    duration: "0:45",
  },
  {
    id: 2,
    title: "Hat Embroidery Techniques",
    thumbnail:
      "https://img.freepik.com/premium-psd/instagram-reels-cover-youtube-short-video-thumbnail-design_475351-777.jpg?w=360",
    videoUrl: "/sample-video-2.mp4",
    duration: "1:20",
  },
  {
    id: 3,
    title: "Hoodie Design Showcase",
    thumbnail:
      "https://img.freepik.com/premium-psd/instagram-reels-cover-youtube-short-video-thumbnail-design_475351-779.jpg",
    videoUrl: "/sample-video-3.mp4",
    duration: "0:55",
  },
  {
    id: 4,
    title: "Quality Check Process",
    thumbnail:
      "https://img.freepik.com/premium-psd/instagram-reels-cover-youtube-short-video-thumbnail-design_475351-773.jpg",
    videoUrl: "/sample-video-4.mp4",
    duration: "1:10",
  },
  {
    id: 5,
    title: "Customer Success Stories",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5w0A_78WxWKzRV8LKwSuj1rFjmcMPxzXD2A&s",
    videoUrl: "/sample-video-5.mp4",
    duration: "2:00",
  },
  {
    id: 6,
    title: "Behind the Scenes",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLAT8cctsi9xndOU7oL_6YBdnTzC2dhfupKg&s",
    videoUrl: "/sample-video-6.mp4",
    duration: "1:35",
  },
];

export function ReelsSection() {
  const [selectedReel, setSelectedReel] = useState<number | null>(null);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);

  const openReel = (reelId: number) => {
    const index = reels.findIndex((reel) => reel.id === reelId);
    setCurrentReelIndex(index);
    setSelectedReel(reelId);
  };

  const closeReel = () => {
    setSelectedReel(null);
  };

  const nextReel = () => {
    const nextIndex = (currentReelIndex + 1) % reels.length;
    setCurrentReelIndex(nextIndex);
    setSelectedReel(reels[nextIndex].id);
  };

  const prevReel = () => {
    const prevIndex =
      currentReelIndex === 0 ? reels.length - 1 : currentReelIndex - 1;
    setCurrentReelIndex(prevIndex);
    setSelectedReel(reels[prevIndex].id);
  };

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Behind the Scenes
            </h2>
            <p className="text-gray-300 text-lg">
              Watch how we bring your designs to life
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {reels.map((reel, index) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
                onClick={() => openReel(reel.id)}
              >
                <div className="relative aspect-[9/16] rounded-lg overflow-hidden bg-gray-700">
                  <Image
                    src={
                      reel.thumbnail || "/placeholder.svg?height=400&width=225"
                    }
                    alt={reel.title}
                    className="w-full h-full object-cover"
                    fill
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/30 transition-colors">
                      <Play className="h-6 w-6 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-medium truncate">
                      {reel.title}
                    </p>
                    <p className="text-white/70 text-xs">{reel.duration}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reel Modal */}
      <AnimatePresence>
        {selectedReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeReel}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-md w-full aspect-[9/16] bg-black rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                onClick={closeReel}
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Navigation buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={prevReel}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={nextReel}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Video content */}
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <Image
                  src={
                    reels[currentReelIndex].thumbnail ||
                    "/placeholder.svg?height=600&width=337"
                  }
                  fill
                  alt={reels[currentReelIndex].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <Play className="h-8 w-8 text-white fill-white" />
                  </div>
                </div>
              </div>

              {/* Reel info */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-semibold mb-1">
                  {reels[currentReelIndex].title}
                </h3>
                <p className="text-sm text-white/70">
                  {reels[currentReelIndex].duration}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
