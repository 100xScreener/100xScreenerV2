import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Users, Twitter, Wallet, BarChartHorizontalBig, Search, ExternalLink, TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon, Filter as FilterIcon } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const mockKols = [
  { id: '1', name: 'CryptoChad', twitterHandle: '@CryptoChadX', wallet: 'CHAD...wXyz', pnlWeekly: '+1500%', pnlMonthly: '+5000%', followers: '1.2M', lastActive: '2h ago', avatarText: 'CC', pnlHistory: [10, 20, 15, 40, 30, 60, 50] },
  { id: '2', name: 'SolanaQueen', twitterHandle: '@SolQueen', wallet: 'QUEE...abcd', pnlWeekly: '-50%', pnlMonthly: '+800%', followers: '850k', lastActive: '5m ago', avatarText: 'SQ', pnlHistory: [5, -2, 10, 12, 8, -5, 15] },
  { id: '3', name: '100xHunter', twitterHandle: '@GemHunter100', wallet: 'HUNT...efgh', pnlWeekly: '+300%', pnlMonthly: '+1200%', followers: '500k', lastActive: '1d ago', avatarText: 'GH', pnlHistory: [20, 25, 30, 22, 40, 35, 50] },
  { id: '4', name: 'DeFiDon', twitterHandle: '@DonDeFi', wallet: 'DONF...ijkl', pnlWeekly: '+50%', pnlMonthly: '+200%', followers: '320k', lastActive: '6h ago', avatarText: 'DD', pnlHistory: [2, 5, 3, 7, 6, 8, 4] },
];

const generateRandomKol = (id) => {
  const names = ["Whale", "Shark", "Alpha", "Sigma", "Guru", "Sensei"];
  const suffixes = ["Trades", "Calls", "Gems", "Plays", "Charts", "Tips"];
  const name = `${names[Math.floor(Math.random() * names.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
  const twitterHandle = `@${name.replace(/\s+/g, '')}${Math.floor(Math.random() * 100)}`;
  const walletStart = "xxxx".replace(/x/g, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 36)]);
  const walletEnd = "xxxx".replace(/x/g, () => "abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 36)]);
  const pnlWeeklyNum = Math.floor(Math.random() * 2000) - 500;
  const pnlMonthlyNum = Math.floor(Math.random() * 10000) - 2000;
  const followersNum = Math.floor(Math.random() * 2000);
  return {
    id: String(id),
    name: name,
    twitterHandle: twitterHandle,
    wallet: `${walletStart}...${walletEnd}`,
    pnlWeekly: `${pnlWeeklyNum >= 0 ? '+' : ''}${pnlWeeklyNum}%`,
    pnlMonthly: `${pnlMonthlyNum >= 0 ? '+' : ''}${pnlMonthlyNum}%`,
    followers: `${(followersNum / 1000).toFixed(1)}k`,
    lastActive: `${Math.floor(Math.random() * 23) + 1}h ago`,
    avatarText: name.substring(0,1) + suffixes[Math.floor(Math.random() * suffixes.length)].substring(0,1),
    pnlHistory: Array.from({length: 7}, () => Math.floor(Math.random() * 100) - 30)
  }
};


const KolCard = ({ kol, index }) => {
  const { toast } = useToast();
  const pnlValueWeekly = parseFloat(kol.pnlWeekly);
  const isPositiveWeekly = pnlValueWeekly > 0;

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado al portapapeles",
      description: `${fieldName} "${text}" copiado.`,
      className: "bg-card border-primary text-foreground",
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="glass-card overflow-hidden"
    >
      <CardHeader className="p-4 border-b border-primary/30">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl font-bold text-primary-foreground">
            {kol.avatarText}
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-300">
              {kol.name}
            </CardTitle>
            <a 
              href={`https://twitter.com/${kol.twitterHandle.substring(1)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary flex items-center"
            >
              {kol.twitterHandle} <ExternalLink size={12} className="ml-1" />
            </a>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3 text-sm">
        <div 
          className="flex items-center justify-between text-xs text-muted-foreground hover:text-foreground cursor-pointer"
          onClick={() => copyToClipboard(kol.wallet, 'Wallet')}
          title="Copiar Wallet"
        >
          <span className="flex items-center"><Wallet size={14} className="mr-1.5 text-primary" /> Wallet:</span>
          <span className="font-mono bg-input px-1.5 py-0.5 rounded">{kol.wallet}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">PNL Semanal:</span>
          <span className={`font-semibold ${isPositiveWeekly ? 'text-green-400' : 'text-red-400'}`}>
            {kol.pnlWeekly} {isPositiveWeekly ? <TrendingUpIcon size={14} className="inline ml-1"/> : <TrendingDownIcon size={14} className="inline ml-1"/>}
          </span>
        </div>
        <div className="flex justify-between"><span className="text-muted-foreground">PNL Mensual:</span><span className="font-semibold text-foreground">{kol.pnlMonthly}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Seguidores:</span><span className="font-semibold text-foreground">{kol.followers}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Últ. Activo:</span><span className="font-semibold text-foreground">{kol.lastActive}</span></div>
        
        <div className="pt-2">
          <Label className="text-xs text-muted-foreground mb-1 block">Progreso PNL Semanal (simulado)</Label>
          <div className="h-8 w-full bg-input rounded flex items-end space-x-px p-0.5">
            {kol.pnlHistory && kol.pnlHistory.map((val, i) => {
              const maxHeight = 28; 
              const barHeight = Math.max(2, ( (val + 30) / 130) * maxHeight); 
              return (
                 <motion.div 
                    key={i}
                    initial={{ height: 0, opacity:0 }}
                    animate={{ height: barHeight, opacity:1 }}
                    transition={{ type:"spring", stiffness: 200, damping:15, delay: i * 0.05 + 0.2 }}
                    className={`flex-1 rounded-sm ${val >= 0 ? 'bg-primary' : 'bg-destructive'}`}
                    title={`Día ${i+1}: ${val}%`}
                />
              )
            })}
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full mt-3 border-primary text-primary hover:bg-primary/20 hover:text-primary font-semibold">
          <BarChartHorizontalBig size={16} className="mr-2" /> Ver Trades (Próximamente)
        </Button>
      </CardContent>
    </motion.div>
  );
};


const KolScannerPage = () => {
  const [kols, setKols] = useState(mockKols);
  const [searchTerm, setSearchTerm] = useState('');
  const [pnlFilter, setPnlFilter] = useState('all'); 
  const [refreshInterval, setRefreshInterval] = useState(300000); 
  const { toast } = useToast();
  
  const fetchData = useCallback(() => {
    const newKolCount = Math.floor(Math.random() * 2) + 1;
    const newKols = Array(newKolCount).fill(null).map((_, i) => generateRandomKol(Date.now() + i));
    setKols(prev => [...newKols, ...prev.filter(k => !newKols.find(nk => nk.twitterHandle === k.twitterHandle))].slice(0, 20).sort((a,b) => parseFloat(b.followers) - parseFloat(a.followers)));
    
    toast({
      title: "KOLs Actualizados",
      description: "Lista de KOLs refrescada.",
      className: "bg-card border-primary text-foreground text-xs",
      duration: 2000,
    });
  }, [toast]);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, refreshInterval);
    return () => clearInterval(intervalId);
  }, [fetchData, refreshInterval]);

  const filteredKols = kols.filter(kol => {
    const matchesSearch = kol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          kol.twitterHandle.toLowerCase().includes(searchTerm.toLowerCase());
    if (pnlFilter === 'all') return matchesSearch;
    if (pnlFilter === 'positive') return matchesSearch && parseFloat(kol.pnlWeekly) > 0;
    if (pnlFilter === 'negative') return matchesSearch && parseFloat(kol.pnlWeekly) <= 0;
    return matchesSearch;
  });

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
          KOL Scanner
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Descubre y sigue a los Key Opinion Leaders más influyentes del ecosistema Solana. Analiza su PNL y actividad.
        </p>
      </motion.section>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 glass-card mb-6"
      >
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18}/>
          <Input
            type="search"
            placeholder="Buscar KOL por nombre o Twitter..."
            className="w-full pl-10 pr-3 py-2 rounded-md border-primary bg-input placeholder-muted-foreground"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
            <Label htmlFor="pnl-filter" className="text-sm text-muted-foreground whitespace-nowrap">Filtrar PNL Semanal:</Label>
            <Select value={pnlFilter} onValueChange={setPnlFilter}>
                <SelectTrigger id="pnl-filter" className="w-full md:w-[150px] bg-input border-primary text-foreground">
                    <SelectValue placeholder="PNL" />
                </SelectTrigger>
                <SelectContent className="bg-card border-primary text-foreground">
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="positive">Positivo</SelectItem>
                    <SelectItem value="negative">Negativo</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
            <Label htmlFor="refresh-interval-kol" className="text-sm text-muted-foreground whitespace-nowrap">Actualizar:</Label>
            <Select defaultValue={refreshInterval.toString()} onValueChange={handleIntervalChange}>
                <SelectTrigger id="refresh-interval-kol" className="w-full md:w-[120px] bg-input border-primary text-foreground">
                    <SelectValue placeholder="Intervalo" />
                </SelectTrigger>
                <SelectContent className="bg-card border-primary text-foreground">
                    <SelectItem value="60000">1 min</SelectItem>
                    <SelectItem value="300000">5 min</SelectItem>
                    <SelectItem value="600000">10 min</SelectItem>
                    <SelectItem value="1800000">30 min</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </motion.div>

      {filteredKols.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredKols.map((kol, index) => (
              <KolCard key={kol.id} kol={kol} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div 
            initial={{ opacity: 0, scale:0.95 }}
            animate={{ opacity: 1, scale:1 }}
            className="text-center py-16 glass-card rounded-lg"
        >
            <Users className="mx-auto h-16 w-16 text-primary opacity-50 mb-4" />
            <p className="text-xl text-foreground">No se encontraron KOLs que coincidan con tu búsqueda.</p>
            <p className="text-muted-foreground">Intenta ajustar los filtros o el término de búsqueda.</p>
        </motion.div>
      )}
    </div>
  );
};

export default KolScannerPage;