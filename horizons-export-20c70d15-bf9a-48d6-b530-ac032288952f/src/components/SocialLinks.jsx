import React from 'react';
import { Globe, Twitter, Send, MessageSquare, Disc, Youtube, Twitch, Instagram, Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const socialIconMap = {
  website: Globe,
  twitter: Twitter,
  telegram: Send,
  discord: MessageSquare, 
  medium: Disc, // Using Disc as a placeholder for Medium/Blog
  youtube: Youtube,
  twitch: Twitch,
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
  // Add more mappings as needed, e.g., tiktok
};

const SocialLinks = ({ socials }) => {
  if (!socials || Object.keys(socials).length === 0) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 mt-2">
      {Object.entries(socials).map(([platform, url]) => {
        const IconComponent = socialIconMap[platform.toLowerCase()];
        if (!IconComponent) return null;

        const hasLink = url && url.trim() !== '';

        return (
          <motion.a
            key={platform}
            href={hasLink ? url : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              ${hasLink ? 'text-primary hover:text-accent cursor-pointer' : 'text-muted-foreground opacity-50 cursor-not-allowed'}
              transition-colors duration-200
            `}
            whileHover={hasLink ? { scale: 1.2, rotate: 5 } : {}}
            whileTap={hasLink ? { scale: 0.9 } : {}}
            title={hasLink ? platform.charAt(0).toUpperCase() + platform.slice(1) : `${platform.charAt(0).toUpperCase() + platform.slice(1)} (No link)`}
          >
            <IconComponent size={18} />
          </motion.a>
        );
      })}
    </div>
  );
};

export default SocialLinks;