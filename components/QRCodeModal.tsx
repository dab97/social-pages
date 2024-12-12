import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { QRCode } from "qrcode.react"
import { motion, AnimatePresence } from "framer-motion"

interface QRCodeModalProps {
  isOpen: boolean
  onClose: () => void
  link: string
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, link }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>QR-код для {link}</DialogTitle>
            </DialogHeader>
            <motion.div 
              className="flex justify-center p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <QRCode value={link} size={256} />
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}