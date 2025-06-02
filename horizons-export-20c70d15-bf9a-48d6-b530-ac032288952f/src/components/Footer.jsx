import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-black/50 backdrop-blur-md py-8 text-center text-muted-foreground border-t border-primary/20"
    >
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; {currentYear} 100xScreener. Todos los derechos reservados.
        </p>
        <p className="text-xs mt-2">
          Hecho con <span className="text-primary animate-pulse">💚</span> para la comunidad cripto.
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <a href="#" className="hover:text-primary transition-colors">Twitter</a>
          <a href="#" className="hover:text-primary transition-colors">Telegram</a>
          <a href="#" className="hover:text-primary transition-colors">Discord</a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;