"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ExternalLink, Moon, QrCode, Sun, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { socialLinks } from "@/data/socialLinks";
// import dynamic from 'next/dynamic'

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  link: string;
}

export default function SocialLinksPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [currentQRLink, setCurrentQRLink] = useState("");
  const [currentQRTitle, setCurrentQRTitle] = useState("");

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener("change", handleChange);

    return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const openQRModal = (link: string, title: string) => {
    setCurrentQRLink(link);
    setCurrentQRTitle(title);
    setIsQRModalOpen(true);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <motion.div
        className="fixed inset-0 z-0"
        animate={{
          background: isDarkMode
            ? "linear-gradient(45deg, #1a202c, #2d3748)"
            : "linear-gradient(45deg, #e6f2ff, #ffffff)",
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: isDarkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 255, 0.1)",
              }}
              animate={{
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
      <div className="relative z-10 min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <motion.header
            className="mb-8 text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-2 text-3xl font-bold md:text-4xl">
              РГСУ в Минске
            </h1>
            <p className="text-lg">
              Наши социальные сети
            </p>
          </motion.header>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              onClick={toggleDarkMode}
              className="mb-6 p-4 rounded-full text-lg"
              size="icon"
              variant="outline"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              {/* {isDarkMode ? 'Светлая тема' : 'Темная тема'} */}
            </Button>
          </motion.div>

          <motion.div
            className="grid gap-4"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate="show"
          >
            {socialLinks.map((link, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <Link href={link.href} target="_blank" className="group block">
                  <Card className="flex items-center gap-4 p-5 rounded-xl  transition-all border-1 bg-background/40 backdrop-blur duration-300 hover:scale-[1.02] hover:shadow-md dark:bg-gray-800 dark:text-white">
                    <div
                      className={`rounded-full ${link.bgColor} p-3 ${link.textColor} transition-colors group-hover:bg-opacity-80`}
                    >
                      <link.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-semibold text-blue-900 dark:text-blue-100 text-lg">
                        {link.title}
                      </h2>
                      <p className="text-sm text-blue-600 dark:text-blue-300">
                        {link.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="mr-2 hidden md:flex rounded-full"
                        onClick={(e) => {
                          e.preventDefault();
                          openQRModal(link.href, link.title);
                        }}
                      >
                        <QrCode className="h-5 w-5" />
                      </Button>
                      {/* <ExternalLink className="h-5 w-5 text-blue-400 transition-transform group-hover:translate-x-1" /> */}
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <Dialog open={isQRModalOpen} onOpenChange={setIsQRModalOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">QR Код</DialogTitle>
            <DialogDescription className="text-center">
              {currentQRTitle}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-2 bg-white rounded-lg">
              <QRCodeSVG
                value={currentQRLink}
                size={256}
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="text-sm text-center text-muted-foreground">
              Сканируйте QR код для доступа к ресурсу.
            </p>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button
              type="button"
              className="w-full"
              onClick={() => setIsQRModalOpen(false)}
            >
              Закрыть
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
