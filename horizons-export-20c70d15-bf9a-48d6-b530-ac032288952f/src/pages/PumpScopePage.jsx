import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Zap, TrendingUp, CheckCircle, ExternalLink, BarChart2, CheckSquare, XSquare } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import SocialLinks from '@/components/SocialLinks';

const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateRandomName = () => {
  const prefixes = ["Alpha", "Beta", "Gamma", "Delta", "Omega", "Sigma", "Zeta"];
  const suffixes = ["Bot", "Ray", "Pulse", "Unit", "Fi", "DAO", "NFT"];
  return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
};

const generateMockCoin = (category) => {
  const ticker = generateRandomString(3) + generateRandomString(1).toUpperCase();
  const name = generateRandomName();
  let mc, vol, ageHours;
  const socialPlatforms = { website: `https://pump.fun/${ticker.toLowerCase()}`, twitter: `https://twitter.com/pump_${ticker.toLowerCase()}`, telegram: `https://t.me/pump_${ticker.toLowerCase()}`};
  const randomSocials = {};
  Object.keys(socialPlatforms).forEach(platform => {
    if (Math.random() > 0.3) randomSocials[platform] = socialPlatforms[platform];
  });


  switch (category) {
    case 'new':
      mc = getRandomNumber(6, 15); // $6k - $15k
      vol = getRandomNumber(10, 25); // $10k - $25k
      ageHours = getRandomNumber(1, 5) / 10; // 0.1 - 0.5 hours (6-30 mins)
      break;
    case 'growing':
      mc = getRandomNumber(20, 100); // $20k - $100k
      vol = getRandomNumber(30, 150); // $30k - $150k
      ageHours = getRandomNumber(1, 12); // 1-12 hours
      break;
    case 'migrated':
      mc = getRandomNumber(100, 500); // $100k - $500k
      vol = getRandomNumber(150, 1000); // $150k - $1M
      ageHours = getRandomNumber(12, 72); // 12-72 hours
      break;
    default:
      mc = 0; vol = 0; ageHours = 0;
  }
  
  return {
    id: generateRandomString(10),
    ticker: ticker,
    name: name,
    mc: mc * 1000,
    vol: vol * 1000,
    age: `${(ageHours < 1 ? Math.round(ageHours*60) : ageHours.toFixed(1))} ${ageHours < 1 ? 'min' : 'h'}`,
    priceChange: `${(Math.random() > 0.3 ? '+' : '-')}${getRandomNumber(5, 500)}%`,
    buyPressure: getRandomNumber(40, 90), // Percentage
    pumpLink: `https://pump.fun/${generateRandomString(8)}`,
    dexLink: category === 'migrated' ? `https://raydium.io/swap/?ammId=${generateRandomString(10)}` : null,
    dexScreenerBoost: Math.random() > 0.85, // Less common for pump.fun coins unless migrated
    cexListings: category === 'migrated' && Math.random() > 0.9 ? ['MEXC'] : [], // Rare for pump.fun
    socials: randomSocials,
    // Simulating sniper/insider/fresh wallet data (placeholders)
    snipers: getRandomNumber(0,5),
    insiders: getRandomNumber(0,2),
    freshWallets: getRandomNumber(5,20),
  };
};


const PumpScopeColumn = ({ title, coins, icon, color }) => {
  const { toast } = useToast();
  const IconComponent = icon;

  const handleViewChart = (coinName, coinTicker) => {
    toast({
      title: "Gráfico Próximamente!",
      description: `La visualización del gráfico para ${coinName} (${coinTicker}) está en camino. Incluirá análisis detallado de holders, actividad de snipers/insiders, etc.`,
      variant: "default",
      className: "bg-card border-primary text-foreground",
      duration: 5000,
    });
  };
  
  return (
    <Card className="glass-card flex-1 min-w-[300px] md:min-w-[350px] border-2 flex flex-col" style={{borderColor: color}}>
      <CardHeader className="pb-3 border-b-2" style={{borderColor: color}}>
        <CardTitle className="flex items-center text-xl">
          <IconComponent size={24} className="mr-2" style={{color: color}}/>
          <span style={{color: color}}>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 max-h-[600px] overflow-y-auto flex-grow">
        <AnimatePresence>
          {coins.map((coin, index) => (
            <motion.div
              key={coin.id}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="p-3 border-b border-border/50 hover:bg-primary/5 transition-colors"
            >
              <div className="flex justify-between items-center mb-1">
                <a href={coin.pumpLink} target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-foreground hover:text-primary flex items-center truncate" title={`${coin.name} (${coin.ticker})`}>
                  <span className="truncate max-w-[150px] sm:max-w-[200px]">{coin.name}</span> ({coin.ticker})
                  <ExternalLink size={12} className="ml-1.5 text-muted-foreground shrink-0" />
                </a>
                <span className={`text-sm font-medium ${coin.priceChange.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {coin.priceChange}
                </span>
              </div>
              <div className="text-xs text-muted-foreground space-y-0.5">
                <p>MC: ${coin.mc.toLocaleString()} | Vol: ${coin.vol.toLocaleString()}</p>
                <p>Edad: {coin.age} | Buy Pressure: <span style={{color}}>{coin.buyPressure}%</span></p>
                <p>Snipers: {coin.snipers} | Insiders: {coin.insiders} | Fresh: {coin.freshWallets}</p>
                 <div className="flex items-center mt-1">
                    <span className="text-muted-foreground mr-1">Boost:</span>
                    {coin.dexScreenerBoost ? <CheckSquare size={14} className="text-green-400" /> : <XSquare size={14} className="text-red-400" />}
                    {coin.cexListings && coin.cexListings.length > 0 && (
                        <span className="text-muted-foreground ml-2 mr-1">CEX:</span>
                    )}
                    {coin.cexListings && coin.cexListings.length > 0 && <span className="text-xs text-foreground truncate">{coin.cexListings.join(', ')}</span>}
                </div>
              </div>
              <SocialLinks socials={coin.socials} />
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-primary/10">
                {coin.dexLink && (
                   <Button variant="outline" size="sm" className="text-xs border-accent text-accent hover:bg-accent/20" onClick={() => window.open(coin.dexLink, '_blank')}>
                    Ver en DEX <ExternalLink size={12} className="ml-1" />
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary/80 ml-auto" onClick={() => handleViewChart(coin.name, coin.ticker)}>
                  <BarChart2 size={14} className="mr-1" /> Gráfico
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

const PumpScopePage = () => {
  const [newCoins, setNewCoins] = useState([]);
  const [growingCoins, setGrowingCoins] = useState([]);
  const [migratedCoins, setMigratedCoins] = useState([]);
  const [refreshInterval, setRefreshInterval] = useState(5000); // Default 5 seconds
  const { toast } = useToast();

  const fetchData = useCallback(() => {
    const newLaunchCount = getRandomNumber(1,3);
    const growingCount = getRandomNumber(1,2);
    const migratedCount = getRandomNumber(0,1);

    setNewCoins(prev => [...Array(newLaunchCount).fill(null).map(() => generateMockCoin('new')), ...prev].slice(0, 20).sort((a,b) => b.mc - a.mc));
    setGrowingCoins(prev => [...Array(growingCount).fill(null).map(() => generateMockCoin('growing')), ...prev].slice(0, 15).sort((a,b) => b.mc - a.mc));
    setMigratedCoins(prev => [...Array(migratedCount).fill(null).map(() => generateMockCoin('migrated')), ...prev].slice(0, 10).sort((a,b) => b.mc - a.mc));
    
    toast({
      title: "PumpScope Actualizado",
      description: "Nuevos datos cargados.",
      className: "bg-card border-primary text-foreground text-xs",
      duration: 1500,
    });
  }, [toast]);

  useEffect(() => {
    fetchData(); 
    const intervalId = setInterval(fetchData, refreshInterval);
    return () => clearInterval(intervalId);
  }, [fetchData, refreshInterval]);

  const handleIntervalChange = (value) => {
    setRefreshInterval(Number(value));
  };

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-emerald-500 to-teal-400">
          100xPumpScope
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Tu centro de mando para Pump.fun: sigue lanzamientos, crecimiento y migraciones a DEX en tiempo real.
        </p>
      </motion.section>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay:0.2 }}
        className="flex justify-end items-center space-x-3 mb-6"
      >
        <Label htmlFor="refresh-interval-pumpscope" className="text-sm text-muted-foreground">Actualizar cada:</Label>
        <Select defaultValue={refreshInterval.toString()} onValueChange={handleIntervalChange}>
          <SelectTrigger id="refresh-interval-pumpscope" className="w-[120px] bg-input border-primary text-foreground">
            <SelectValue placeholder="Intervalo" />
          </SelectTrigger>
          <SelectContent className="bg-card border-primary text-foreground">
            <SelectItem value="3000">3 seg</SelectItem>
            <SelectItem value="5000">5 seg</SelectItem>
            <SelectItem value="10000">10 seg</SelectItem>
            <SelectItem value="15000">15 seg</SelectItem>
            <SelectItem value="30000">30 seg</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div 
        className="flex flex-col md:flex-row gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.3,
            },
          },
          hidden: { opacity: 0 },
        }}
      >
        <motion.div variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }} className="flex">
          <PumpScopeColumn title="Nuevos Lanzamientos" coins={newCoins} icon={Zap} color="hsl(var(--primary))" />
        </motion.div>
        <motion.div variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }} className="flex">
          <PumpScopeColumn title="En Crecimiento" coins={growingCoins} icon={TrendingUp} color="hsl(var(--accent))" />
        </motion.div>
        <motion.div variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }} className="flex">
          <PumpScopeColumn title="Recién Migradas a DEX" coins={migratedCoins} icon={CheckCircle} color="hsl(180, 70%, 50%)" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PumpScopePage;