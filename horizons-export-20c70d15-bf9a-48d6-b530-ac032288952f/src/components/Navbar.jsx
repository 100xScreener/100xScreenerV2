import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, TrendingUp, Users, AtSign, Target } from 'lucide-react'; // Changed Flame to LineChart, Activity to Users/AtSign
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeToggle';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 50, delay: 0.2 }}
      className="bg-black/60 backdrop-blur-lg shadow-lg shadow-primary/20 sticky top-0 z-50 border-b border-primary/30"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <LineChart className="h-8 w-8 text-primary animate-pulse" />
          </motion.div>
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400">
            100xScreener
          </h1>
        </Link>
        <div className="flex items-center space-x-1 md:space-x-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" asChild size="sm">
              <Link to="/" className="flex items-center space-x-1 text-slate-300 hover:text-primary">
                <TrendingUp size={18} />
                <span className="hidden sm:inline">Trending</span>
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" asChild size="sm">
              <Link to="/pumpscope" className="flex items-center space-x-1 text-slate-300 hover:text-primary">
                <Target size={18} />
                <span className="hidden sm:inline">PumpScope</span>
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" asChild size="sm">
              <Link to="/kolscanner" className="flex items-center space-x-1 text-slate-300 hover:text-primary">
                <Users size={18} />
                <span className="hidden sm:inline">KOLScan</span>
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" asChild size="sm">
              <Link to="/xscanner" className="flex items-center space-x-1 text-slate-300 hover:text-primary">
                <AtSign size={18} />
                <span className="hidden sm:inline">XScan</span>
              </Link>
            </Button>
          </motion.div>
          <ThemeToggle />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 text-xs px-3 py-1.5">
              Connect Wallet
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;