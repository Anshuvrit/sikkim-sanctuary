import { useState, useEffect, useMemo } from 'react';
import monasteriesData from '@/data/monasteries.json';
import festivalsData from '@/data/festivals.json';
import manuscriptsData from '@/data/manuscripts.json';

interface SearchSuggestion {
  type: 'monastery' | 'festival' | 'manuscript' | 'ai-suggestion';
  id: string;
  title: string;
  description: string;
  category?: string;
}

export const useSmartSearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // AI-style smart suggestions without external API
  const aiSuggestions = useMemo(() => ({
    'ancient': [
      { id: 'dubdi', title: 'Dubdi Monastery (1701)', description: "Sikkim's oldest monastery" },
      { id: 'tashiding', title: 'Tashiding Monastery (1641)', description: 'Sacred prophecy center' }
    ],
    'kagyu': [
      { id: 'rumtek', title: 'Rumtek Monastery', description: 'Main Kagyu seat' },
      { id: 'ralang', title: 'Ralang Monastery', description: 'Karma Kagyu tradition' }
    ],
    'nyingma': [
      { id: 'pemayangste', title: 'Pemayangste Monastery', description: 'Pure Nyingma lineage' },
      { id: 'enchey', title: 'Enchey Monastery', description: 'Nyingma city monastery' }
    ],
    'festivals': [
      { id: 'losar', title: 'Losar at Rumtek', description: 'Tibetan New Year celebration' },
      { id: 'bumchu', title: 'Bumchu at Tashiding', description: 'Sacred water prophecy' }
    ],
    'architecture': [
      { id: 'pemayangste', title: 'Seven-tiered Sculpture', description: 'Unique wooden architecture' },
      { id: 'rumtek', title: 'Golden Stupa', description: 'Traditional Tibetan design' }
    ],
    'meditation': [
      { id: 'sanga-choeling', title: 'Dzogchen Meditation', description: 'Advanced practices' },
      { id: 'dubdi', title: 'Forest Retreats', description: 'Mountain meditation' }
    ],
    'manuscripts': [
      { id: 'prajnaparamita-gold', title: 'Golden Manuscripts', description: 'Ancient wisdom texts' },
      { id: 'tantric-teachings', title: 'Tantric Collections', description: 'Esoteric practices' }
    ]
  }), []);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate AI processing delay for realism
    const searchTimeout = setTimeout(() => {
      const results: SearchSuggestion[] = [];
      const queryLower = query.toLowerCase();

      // Search monasteries with fuzzy matching
      monasteriesData.forEach(monastery => {
        const searchFields = [
          monastery.name,
          monastery.tibetanName,
          monastery.sect,
          monastery.district,
          monastery.description,
          ...monastery.specialFeatures,
          monastery.founder
        ].join(' ').toLowerCase();

        if (searchFields.includes(queryLower)) {
          results.push({
            type: 'monastery',
            id: monastery.id,
            title: monastery.name,
            description: `${monastery.sect} monastery in ${monastery.district}`,
            category: monastery.sect
          });
        }
      });

      // Search festivals
      festivalsData.forEach(festival => {
        const searchFields = [
          festival.name,
          festival.tibetanName,
          festival.type,
          festival.description,
          ...festival.rituals,
          ...festival.monasteries
        ].join(' ').toLowerCase();

        if (searchFields.includes(queryLower)) {
          results.push({
            type: 'festival',
            id: festival.id,
            title: festival.name,
            description: festival.type,
            category: 'Festival'
          });
        }
      });

      // Search manuscripts
      manuscriptsData.forEach(manuscript => {
        const searchFields = [
          manuscript.title,
          manuscript.type,
          manuscript.language,
          manuscript.description,
          manuscript.monasteryName
        ].join(' ').toLowerCase();

        if (searchFields.includes(queryLower)) {
          results.push({
            type: 'manuscript',
            id: manuscript.id,
            title: manuscript.title,
            description: `${manuscript.type} - ${manuscript.monasteryName}`,
            category: manuscript.type
          });
        }
      });

      // Add AI-style smart suggestions
      Object.keys(aiSuggestions).forEach(key => {
        if (queryLower.includes(key)) {
          aiSuggestions[key].forEach(suggestion => {
            results.push({
              type: 'ai-suggestion',
              id: suggestion.id,
              title: suggestion.title,
              description: suggestion.description,
              category: 'AI Suggestion'
            });
          });
        }
      });

      // Remove duplicates and limit results
      const uniqueResults = results.filter((result, index, self) => 
        index === self.findIndex(r => r.id === result.id && r.type === result.type)
      ).slice(0, 8);

      setSuggestions(uniqueResults);
      setIsLoading(false);
    }, 300); // Realistic search delay

    return () => clearTimeout(searchTimeout);
  }, [query, aiSuggestions]);

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
  };

  return {
    query,
    setQuery,
    suggestions,
    isLoading,
    clearSearch
  };
};