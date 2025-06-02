import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AtSign, Twitter, MessageSquare, Search, ExternalLink, Zap, Newspaper, Landmark, Users, Rss } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import SocialLinks from '@/components/SocialLinks'; // Using this for consistency if needed

const mockTweets = [
  { id: 't1', user: 'Elon Musk', handle: '@elonmusk', avatarText: 'EM', content: 'Solana to the moon! Just kidding... or am I? $SOL CA: SoLAnAgEnErAtEdCoNtRaCtAdDrEsS12345', timestamp: '2m ago', source: 'Celebrity', contract: 'SoLAnAgEnErAtEdCoNtRaCtAdDrEsS12345' },
  { id: 't2', user: 'CoinDesk', handle: '@CoinDesk', avatarText: 'CD', content: 'Breaking: Solana network upgrade successfully implemented. Analysts predict major price action. Read more: [link]', timestamp: '15m ago', source: 'Crypto News', contract: null },
  { id: 't3', user: 'Solana Legend', handle: '@SolanaLegend', avatarText: 'SL', content: 'Just aped into this new gem on Solana! Low cap, huge potential. DYOR. CA: GeMcOiNcOnTrAcTaDdReSsAbCdEfGhIjKlMnOp', timestamp: '30s ago', source: 'Influencer', contract: 'GeMcOiNcOnTrAcTaDdReSsAbCdEfGhIjKlMnOp' },
  { id: 't4', user: 'New York Times', handle: '@nytimes', avatarText: 'NYT', content: 'Global markets react to new tech regulations. Crypto implications discussed by experts.', timestamp: '1h ago', source: 'Global News', contract: null },
  { id: 't5', user: 'Mr. Whale', handle: '@CryptoWhale', avatarText: 'MW', content: 'My next 100x Solana call: $WHALE. Sending it. CA: WhAlEcOiNcOnTrAcTaDdReSsQwErTyUiOpAsDf', timestamp: '5m ago', source: 'Influencer', contract: 'WhAlEcOiNcOnTrAcTaDdReSsQwErTyUiOpAsDf' }
];

const generateRandomTweet = (id) => {
  const users = [
    { name: 'Vitalik Buterin', handle: '@VitalikButerin', avatar: 'VB', source: 'Influencer'},
    { name: 'CZ Binance', handle: '@cz_binance', avatar: 'CZ', source: 'Exchange'},
    { name: 'Solana Labs', handle: '@solanalabs', avatar: 'SL', source: 'Project'},
    { name: 'a16z Crypto', handle: '@a16zcrypto', avatar: 'AZ', source: 'VC'},
    { name: 'The Block', handle: '@TheBlock__', avatar: 'TB', source: 'Crypto News'}
  ];
  const randomUser = users[Math.floor(Math.random() * users.length)];
  const hasContract = Math.random() > 0.4;
  const contractAddress = hasContract ? 'SoLrAnDoMcOnTrAcT' + Math.random().toString(36).substring(2, 15).toUpperCase() : null;
  const contents = [
    `Just found an amazing new project on Solana! ${contractAddress ? `Check CA: ${contractAddress}` : ''}`,
    `Big news for the Solana ecosystem coming soon. Stay tuned!`,
    `What are your thoughts on the current state of Solana? #Solana ${contractAddress ? `$XYZ CA: ${contractAddress}` : ''}`,
    `Exploring some interesting new tokens. ${contractAddress ? `This one looks promising: ${contractAddress}` : 'More research needed.'}`,
    `Solana is pushing boundaries. Excited for what's next.`
  ];

  return {
    id: String(id),
    user: randomUser.name,
    handle: randomUser.handle,
    avatarText: randomUser.avatar,
    content: contents[Math.floor(Math.random() * contents.length)],
    timestamp: `${Math.floor(Math.random() * 59) + 1}m ago`,
    source: randomUser.source,
    contract: contractAddress,
  }
};

const TweetCard = ({ tweet, index }) => {
  const { toast } = useToast();

  const copyContract = (contractAddress) => {
    if (!contractAddress) return;
    navigator.clipboard.writeText(contractAddress);
    toast({
      title: "Contrato Copiado",
      description: `Dirección ${contractAddress.substring(0,6)}...${contractAddress.substring(contractAddress.length - 4)} copiada.`,
      className: "bg-card border-primary text-foreground",
    });
  };

  const highlightContracts = (text) => {
    if (!text) return '';
    const caRegex = /(?:CA:|ca:|Ca:)\s*([a-zA-Z0-9]{30,45})/g; // Basic Solana address regex
    return text.replace(caRegex, (match, ca) => 
      `<span class="font-mono bg-primary/20 text-primary px-1 py-0.5 rounded-md cursor-pointer hover:bg-primary/30" title="Copiar Contrato: ${ca}" onclick="this.dispatchEvent(new CustomEvent('copyca', { bubbles: true, detail: '${ca}' }))">${ca.substring(0,6)}...${ca.substring(ca.length-4)}</span>`
    );
  };
  
  useEffect(() => {
    const handler = (event) => copyContract(event.detail);
    document.addEventListener('copyca', handler);
    return () => document.removeEventListener('copyca', handler);
  }, []);


  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ delay: index * 0.07, duration: 0.35 }}
      className="glass-card overflow-hidden w-full"
    >
      <CardHeader className="p-4 border-b border-primary/30 flex flex-row items-center space-x-3">
         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-md font-bold text-primary-foreground shrink-0">
            {tweet.avatarText}
          </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-foreground">{tweet.user}</CardTitle>
            <a 
                href={`https://twitter.com/${tweet.handle.substring(1)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-primary hover:text-accent"
            >
                <Twitter size={16} />
            </a>
          </div>
          <CardDescription className="text-xs text-muted-foreground">{tweet.handle} · {tweet.timestamp}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 text-sm">
        <p className="text-foreground mb-2 break-words" dangerouslySetInnerHTML={{ __html: highlightContracts(tweet.content) }} />
        <div className="flex justify-between items-center mt-3 pt-2 border-t border-primary/10">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{tweet.source}</span>
            {tweet.contract && (
            <Button variant="outline" size="sm" className="text-xs border-accent text-accent hover:bg-accent/10" onClick={() => copyContract(tweet.contract)}>
                <Zap size={12} className="mr-1.5" /> Copiar Contrato
            </Button>
            )}
        </div>
      </CardContent>
    </motion.div>
  );
};

const XScannerPage = () => {
  const [tweets, setTweets] = useState(mockTweets);
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all'); // 'all', 'Celebrity', 'Crypto News', 'Influencer', 'Global News', 'Project', 'VC', 'Exchange'
  const [refreshInterval, setRefreshInterval] = useState(15000); // Default 15 seconds for "real-time" feel
  const { toast } = useToast();

  const fetchData = useCallback(() => {
    const newTweetCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 new tweets
    const newTweets = Array(newTweetCount).fill(null).map((_, i) => generateRandomTweet(Date.now() + i));
    
    setTweets(prev => [...newTweets, ...prev].slice(0, 50).sort((a,b) => { // Keep it sorted by "time" somewhat
        const timeA = parseInt(a.timestamp);
        const timeB = parseInt(b.timestamp);
        if (a.timestamp.includes('s')) return -1; // seconds first
        if (b.timestamp.includes('s') && a.timestamp.includes('m')) return 1;
        return timeA - timeB;
    }));
    
    toast({
      title: "XScanner Actualizado",
      description: "Nuevos tweets cargados.",
      className: "bg-card border-primary text-foreground text-xs",
      duration: 1500,
    });
  }, [toast]);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, refreshInterval);
    return () => clearInterval(intervalId);
  }, [fetchData, refreshInterval]);

  const filteredTweets = tweets.filter(tweet => {
    const matchesSearch = tweet.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tweet.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tweet.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (tweet.contract && tweet.contract.toLowerCase().includes(searchTerm.toLowerCase()));
    if (sourceFilter === 'all') return matchesSearch;
    return matchesSearch && tweet.source === sourceFilter;
  });

  const handleIntervalChange = (value) => {
    setRefreshInterval(Number(value));
  };

  const sourceIcons = {
    all: Rss,
    Celebrity: Users,
    'Crypto News': Newspaper,
    Influencer: Zap,
    'Global News': Landmark,
    Project: AtSign,
    VC: Landmark, // Placeholder
    Exchange: MessageSquare // Placeholder
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
          XScanner <AtSign size={36} className="inline text-primary" />
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Monitoriza en tiempo real los últimos posts de Solana en X (Twitter) de cuentas clave: KOLS, noticias, influencers y más.
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
            placeholder="Buscar contenido, usuario, contrato..."
            className="w-full pl-10 pr-3 py-2 rounded-md border-primary bg-input placeholder-muted-foreground"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
            <Label htmlFor="source-filter" className="text-sm text-muted-foreground whitespace-nowrap">Fuente:</Label>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger id="source-filter" className="w-full md:w-[180px] bg-input border-primary text-foreground">
                    <SelectValue placeholder="Filtrar Fuente" />
                </SelectTrigger>
                <SelectContent className="bg-card border-primary text-foreground">
                    {Object.entries(sourceIcons).map(([key, Icon]) => (
                         <SelectItem key={key} value={key}><Icon size={14} className="inline mr-2 text-muted-foreground"/>{key === 'all' ? 'Todas las Fuentes' : key}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
            <Label htmlFor="refresh-interval-x" className="text-sm text-muted-foreground whitespace-nowrap">Actualizar:</Label>
            <Select defaultValue={refreshInterval.toString()} onValueChange={handleIntervalChange}>
                <SelectTrigger id="refresh-interval-x" className="w-full md:w-[120px] bg-input border-primary text-foreground">
                    <SelectValue placeholder="Intervalo" />
                </SelectTrigger>
                <SelectContent className="bg-card border-primary text-foreground">
                    <SelectItem value="5000">5 seg</SelectItem>
                    <SelectItem value="10000">10 seg</SelectItem>
                    <SelectItem value="15000">15 seg</SelectItem>
                    <SelectItem value="30000">30 seg</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </motion.div>

      {filteredTweets.length > 0 ? (
        <div className="space-y-4 max-w-2xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredTweets.map((tweet, index) => (
              <TweetCard key={tweet.id} tweet={tweet} index={index} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
         <motion.div 
            initial={{ opacity: 0, scale:0.95 }}
            animate={{ opacity: 1, scale:1 }}
            className="text-center py-16 glass-card rounded-lg max-w-2xl mx-auto"
        >
            <Twitter className="mx-auto h-16 w-16 text-primary opacity-50 mb-4" />
            <p className="text-xl text-foreground">No se encontraron tweets que coincidan con tu búsqueda.</p>
            <p className="text-muted-foreground">Intenta ajustar los filtros o el término de búsqueda.</p>
        </motion.div>
      )}
    </div>
  );
};

export default XScannerPage;