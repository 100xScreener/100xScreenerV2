import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { TrendingUp, Zap, Filter, BarChart2, Users, Layers, AlertTriangle, Search, ExternalLink, CheckSquare, XSquare } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import SocialLinks from '@/components/SocialLinks';

const initialMockTrendingCoins = [
  { id: 1, name: 'Cypher Punk X', ticker: 'CPX', price: '$0.0012', change: '+1500%', mc: '$120k', blockchain: 'Solana', source: 'Pump.fun', score: 95, volume: '$50k', holders: 150, liquidity: '$20k', age: '2h', dexScreenerBoost: true, cexListings: ['Gate.io'], socials: { website: 'https://example.com', twitter: 'https://twitter.com/example', telegram: 'https://t.me/example' } },
  { id: 2, name: 'Neon Grid', ticker: 'NGRID', price: '$0.0005', change: '+800%', mc: '$50k', blockchain: 'Solana', source: 'Pump.fun', score: 92, volume: '$30k', holders: 90, liquidity: '$10k', age: '1h', dexScreenerBoost: false, cexListings: [], socials: { twitter: 'https://twitter.com/neongrid' } },
  { id: 3, name: 'Matrix Shard', ticker: 'MTRX', price: '$0.0020', change: '+650%', mc: '$200k', blockchain: 'Solana', source: 'Raydium', score: 88, volume: '$80k', holders: 250, liquidity: '$40k', age: '12h', dexScreenerBoost: true, cexListings: ['MEXC', 'BitMart'], socials: { website: 'https://matrixshard.io', telegram: 'https://t.me/matrixshard' } },
  { id: 4, name: 'Glitch Token', ticker: 'GLTCH', price: '$0.0008', change: '+1200%', mc: '$80k', blockchain: 'Solana', source: 'Pump.fun', score: 96, volume: '$45k', holders: 120, liquidity: '$15k', age: '30m', dexScreenerBoost: false, cexListings: [], socials: { discord: 'https://discord.gg/glitch' } },
  { id: 5, name: 'Byte Runner', ticker: 'BYTR', price: '$0.0050', change: '+400%', mc: '$500k', blockchain: 'Solana', source: 'Jupiter', score: 85, volume: '$150k', holders: 500, liquidity: '$100k', age: '1d', dexScreenerBoost: true, cexListings: ['KuCoin'], socials: { website: 'https://byterunner.dev', twitter: 'https://twitter.com/byterunner', medium: 'https://medium.com/byterunner'} },
];

const generateRandomName = () => {
  const prefixes = ["Quantum", "Cyber", "Nano", "Astro", "Bio", "Future", "Hyper", "Meta"];
  const suffixes = ["Leap", "Core", "Flux", "Drive", "Verse", "Chain", "Net", "Spark"];
  return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
};

const generateRandomTicker = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let ticker = "";
  for (let i = 0; i < 3 + Math.floor(Math.random() * 2) ; i++) {
    ticker += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ticker;
}

const generateNewMockCoin = (id) => {
  const name = generateRandomName();
  const ticker = generateRandomTicker();
  const price = parseFloat((Math.random() * 0.01).toFixed(4));
  const changeNum = (Math.random() * 2000 - 500);
  const change = `${changeNum > 0 ? '+' : ''}${changeNum.toFixed(0)}%`;
  const mc = Math.floor(Math.random() * 500 + 10) * 1000; 
  const sources = ['Pump.fun', 'Raydium', 'Jupiter', 'Orca'];
  const ages = ['10m', '30m', '1h', '5h', '12h', '1d', '3d'];
  const socialPlatforms = { website: `https://example.com/${ticker.toLowerCase()}`, twitter: `https://twitter.com/${ticker.toLowerCase()}`, telegram: `https://t.me/${ticker.toLowerCase()}`, discord: `https://discord.gg/${ticker.toLowerCase()}`};
  const randomSocials = {};
  Object.keys(socialPlatforms).forEach(platform => {
    if (Math.random() > 0.5) randomSocials[platform] = socialPlatforms[platform];
  });

  return {
    id,
    name,
    ticker,
    price: `${price.toFixed(4)}`,
    change,
    mc: `${(mc/1000).toFixed(0)}k`,
    blockchain: 'Solana',
    source: sources[Math.floor(Math.random() * sources.length)],
    score: Math.floor(Math.random() * 50 + 50),
    volume: `${(Math.floor(Math.random() * 200 + 20) * 1000 / 1000).toFixed(0)}k`,
    holders: Math.floor(Math.random() * 1000 + 50),
    liquidity: `${(Math.floor(Math.random() * 100 + 10) * 1000 / 1000).toFixed(0)}k`,
    age: ages[Math.floor(Math.random() * ages.length)],
    dexScreenerBoost: Math.random() > 0.7,
    cexListings: Math.random() > 0.8 ? ['MEXC'] : [],
    socials: randomSocials,
  };
};


const CoinCard = ({ coin, index }) => {
  const { toast } = useToast();

  const handleViewChart = () => {
    toast({
      title: "Gráfico Próximamente!",
      description: `La visualización del gráfico para ${coin.name} (${coin.ticker}) estará disponible pronto. Incluirá análisis de holders, datos de Solscan y más.`,
      variant: "default",
      className: "bg-card border-primary text-foreground",
      duration: 5000,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10}}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="glass-card overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 ease-out hover:shadow-primary/40 hover:shadow-xl flex flex-col"
    >
      <CardHeader className="p-4 border-b border-primary/30">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-300">
              {coin.name} <span className="text-xs text-muted-foreground">({coin.ticker})</span>
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">{coin.blockchain} - {coin.source}</CardDescription>
          </div>
          <div className={`px-2 py-1 rounded-md text-xs font-semibold ${coin.change.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {coin.change}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-2 text-sm flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between"><span className="text-muted-foreground">Precio:</span><span className="font-semibold text-foreground">{coin.price}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">MCap:</span><span className="font-semibold text-foreground">{coin.mc}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Vol (24h):</span><span className="font-semibold text-foreground">{coin.volume}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Holders:</span><span className="font-semibold text-foreground">{coin.holders}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Liquidez:</span><span className="font-semibold text-foreground">{coin.liquidity}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Edad:</span><span className="font-semibold text-foreground">{coin.age}</span></div>
          <div className="flex items-center mt-1">
            <span className="text-muted-foreground mr-2">Boost DexS:</span>
            {coin.dexScreenerBoost ? <CheckSquare size={16} className="text-green-400" /> : <XSquare size={16} className="text-red-400" />}
          </div>
          {coin.cexListings && coin.cexListings.length > 0 && (
            <div className="flex items-center mt-1">
              <span className="text-muted-foreground mr-2">CEX:</span>
              <span className="text-xs text-foreground truncate">{coin.cexListings.join(', ')}</span>
            </div>
          )}
        </div>
        
        <div>
          <SocialLinks socials={coin.socials} />
          <div className="flex items-center justify-between pt-3 mt-2 border-t border-primary/10">
            <div className="flex items-center space-x-1">
              <Zap size={16} className="text-yellow-400" />
              <span className="text-yellow-400 font-bold">{coin.score}/100</span>
            </div>
            <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/20 hover:text-primary font-semibold" onClick={handleViewChart}>
              <BarChart2 size={16} className="mr-2" />
              Ver Gráfico
            </Button>
          </div>
        </div>
      </CardContent>
    </motion.div>
  );
};


const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [trendingCoins, setTrendingCoins] = useState(initialMockTrendingCoins);
  const [pumpFunCoins, setPumpFunCoins] = useState(initialMockTrendingCoins.filter(c => c.source === 'Pump.fun'));
  const [refreshInterval, setRefreshInterval] = useState(300000); 
  const { toast } = useToast();

  const fetchData = useCallback((type) => {
    const newCoinCount = Math.floor(Math.random() * 3) + 1; 
    const newCoins = Array(newCoinCount).fill(null).map((_, i) => generateNewMockCoin(Date.now() + i));
    
    if (type === 'trending' || type === 'all') {
      setTrendingCoins(prev => [...newCoins, ...prev.slice(0, 15 - newCoinCount)].sort((a,b) => b.score - a.score));
    }
    if (type === 'pumpfun' || type === 'all') {
      const newPumpFunCoins = newCoins.filter(c => c.source === 'Pump.fun'); // Ensure new coins for pumpfun are actually from pumpfun
      setPumpFunCoins(prev => [...newPumpFunCoins, ...prev.filter(c => c.source === 'Pump.fun').slice(0, 10 - newPumpFunCoins.length)].sort((a,b) => b.score - a.score));
    }
    
    toast({
      title: "Datos Actualizados",
      description: `Nuevas monedas cargadas para ${type === 'all' ? 'todas las secciones' : type}.`,
      className: "bg-card border-primary text-foreground text-xs",
      duration: 2000,
    });

  }, [toast]);

  useEffect(() => {
    fetchData('all'); // Initial fetch
    const intervalId = setInterval(() => fetchData('all'), refreshInterval);
    return () => clearInterval(intervalId);
  }, [fetchData, refreshInterval]);

  const filteredTrendingCoins = trendingCoins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPumpFunCoins = pumpFunCoins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFeatureRequest = (featureName) => {
     toast({
      title: "¡Próximamente!",
      description: `La función "${featureName}" está en desarrollo y se lanzará pronto. ¡Gracias por tu paciencia!`,
      variant: "default",
      duration: 3000,
      className: "bg-card border-primary text-foreground",
    });
  };

  const handleIntervalChange = (value) => {
    setRefreshInterval(Number(value));
  };

  return (
    <div className="space-y-12">
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center py-12 bg-gradient-to-b from-black via-gray-900/50 to-black rounded-xl shadow-2xl shadow-primary/10 glass-card border-2 border-primary/20"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
          Encuentra la Próxima <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400">Gema 100x</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Tu radar definitivo para detectar micro-caps explosivas en Solana y Pump.fun. Anticipa las tendencias antes que nadie.
        </p>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative max-w-lg mx-auto"
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20}/>
          <Input
            type="search"
            placeholder="Buscar por nombre o ticker (ej: CPX, Neon Grid)..."
            className="w-full pl-12 pr-4 py-3 text-lg rounded-lg border-2 border-primary focus:ring-accent focus:border-accent bg-input placeholder-muted-foreground text-foreground"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>
      </motion.section>

      <div className="flex justify-end items-center space-x-3 mb-6">
        <Label htmlFor="refresh-interval-home" className="text-sm text-muted-foreground">Actualizar cada:</Label>
        <Select defaultValue={refreshInterval.toString()} onValueChange={handleIntervalChange}>
          <SelectTrigger id="refresh-interval-home" className="w-[150px] bg-input border-primary text-foreground">
            <SelectValue placeholder="Intervalo" />
          </SelectTrigger>
          <SelectContent className="bg-card border-primary text-foreground">
            <SelectItem value="30000">30 seg</SelectItem>
            <SelectItem value="60000">1 min</SelectItem>
            <SelectItem value="300000">5 min</SelectItem>
            <SelectItem value="600000">10 min</SelectItem>
            <SelectItem value="1800000">30 min</SelectItem>
            <SelectItem value="3600000">1 hora</SelectItem>
            <SelectItem value="21600000">6 horas</SelectItem>
            <SelectItem value="86400000">1 día</SelectItem>
            <SelectItem value="604800000">1 semana</SelectItem>
            <SelectItem value="2592000000">1 mes</SelectItem>
            <SelectItem value="15552000000">6 meses</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="trending" className="w-full">
        <motion.div 
          initial={{ opacity: 0, y:20 }}
          animate={{ opacity: 1, y:0 }}
          transition={{ delay: 0.2 }}
        >
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-3 gap-2 mb-6 bg-card p-1.5 rounded-lg border border-primary/30 max-w-2xl mx-auto">
          <TabsTrigger value="trending" className="text-sm md:text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/40 py-2.5 transition-all">
            <TrendingUp className="mr-1.5 md:mr-2 h-4 w-4 md:h-5 md:w-5" /> Tendencias Principales
          </TabsTrigger>
          <TabsTrigger value="pumpfun" className="text-sm md:text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/40 py-2.5 transition-all">
             <Zap className="mr-1.5 md:mr-2 text-yellow-400 h-4 w-4 md:h-5 md:w-5" /> Pump.fun Radar
          </TabsTrigger>
          <TabsTrigger value="new" className="text-sm md:text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/40 py-2.5 transition-all" onClick={() => handleFeatureRequest("Nuevos Listados")}>
            <Filter className="mr-1.5 md:mr-2 h-4 w-4 md:h-5 md:w-5" /> Nuevos Listados
          </TabsTrigger>
        </TabsList>
        </motion.div>

        <TabsContent value="trending">
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
              <TrendingUp className="mr-3 text-primary" size={32} /> Monedas en Tendencia en Solana
            </h2>
            {filteredTrendingCoins.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                {filteredTrendingCoins.map((coin, index) => (
                  <CoinCard key={coin.id} coin={coin} index={index} />
                ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-10 glass-card rounded-lg">
                <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
                <p className="text-xl text-foreground">No se encontraron monedas con "{searchTerm}".</p>
                <p className="text-muted-foreground">Intenta con otro término de búsqueda.</p>
              </div>
            )}
          </motion.section>
        </TabsContent>

        <TabsContent value="pumpfun">
           <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
              <Zap className="mr-3 text-yellow-400" size={32} /> Radar Exclusivo Pump.fun
            </h2>
            {filteredPumpFunCoins.length > 0 ? 
              (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                  {filteredPumpFunCoins.map((coin, index) => (
                    <CoinCard key={coin.id} coin={coin} index={index} />
                  ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                  <div className="col-span-full text-center py-10 glass-card rounded-lg">
                    <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
                    <p className="text-xl text-foreground">No se encontraron monedas de Pump.fun con "{searchTerm}".</p>
                    <p className="text-muted-foreground">Prueba a ajustar tu búsqueda o revisa más tarde.</p>
                  </div>
                )
              }
          </motion.section>
        </TabsContent>
        
        <TabsContent value="new">
          <div className="text-center py-20 glass-card rounded-lg">
            <Filter className="mx-auto h-16 w-16 text-primary mb-6 animate-pulse" />
            <h3 className="text-2xl font-semibold mb-3 text-foreground">Nuevos Listados - ¡Próximamente!</h3>
            <p className="text-muted-foreground max-w-md mx-auto">Esta sección mostrará los tokens más nuevos con filtros avanzados y actualización en tiempo real. ¡Vuelve pronto!</p>
          </div>
        </TabsContent>

      </Tabs>

      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="py-12"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">¿Por qué 100xScreener?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <motion.div whileHover={{ y: -5, boxShadow: "0 10px 20px hsla(var(--primary), 0.3)" }} className="glass-card p-6 transition-all duration-300">
            <Zap size={48} className="mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">Velocidad y Precisión</h3>
            <p className="text-muted-foreground text-sm">Datos actualizados y alertas para no perderte ni un pump.</p>
          </motion.div>
          <motion.div whileHover={{ y: -5, boxShadow: "0 10px 20px hsla(var(--accent), 0.3)" }} className="glass-card p-6 transition-all duration-300">
            <Layers size={48} className="mx-auto mb-4 text-accent" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">Análisis Profundo</h3>
            <p className="text-muted-foreground text-sm">Gráficos, holders, actividad de snipers y más (próximamente).</p>
          </motion.div>
          <motion.div whileHover={{ y: -5, boxShadow: "0 10px 20px hsla(120, 50%, 50%, 0.3)" }} className="glass-card p-6 transition-all duration-300">
            <Users size={48} className="mx-auto mb-4 text-green-400" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">Enfoque Comunitario</h3>
            <p className="text-muted-foreground text-sm">Conexión directa a redes sociales y comunidades de cada token.</p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;