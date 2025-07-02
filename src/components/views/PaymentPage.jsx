// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { useToast } from '@/components/ui/use-toast';
// import { ArrowLeft, Loader2, ExternalLink } from 'lucide-react';
// import ApiService from '@/apiService';

// const PaymentPage = () => {
//   const { projectId } = useParams(); // Optional: Keep for potential context
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [links, setLinks] = useState({
//     figma_url: '',
//     payment_url: '',
//   });
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchPaymentLinks = async () => {
//       setIsLoading(true);
//       try {
//         const token = localStorage.getItem('bizwizusertoken');
//         if (!token) {
//           throw new Error('Utilisateur non authentifié. Veuillez vous connecter.');
//         }

//         // Use /user-links endpoint (or fallback to /user-projects/${projectId}/payment-links if needed)
//         const endpoint = projectId
//           ? `/user-projects/${projectId}/payment-links`
//           : '/user-links';
//         console.log('Fetching from endpoint:', endpoint); // Debug log

//         const response = await ApiService(endpoint, 'GET', null, false, token);
//         console.log('API Response:', response); // Debug log

//         if (response.success && response.data) {
//           setLinks({
//             figma_url: response.data.figma_url || '',
//             payment_url: response.data.payment_url || '',
//           });
//         } else {
//           throw new Error(response.message || 'Aucun lien de paiement trouvé.');
//         }
//       } catch (error) {
//         console.error('Erreur lors de la récupération des liens:', error);
//         toast({
//           title: 'Erreur',
//           description: error.message || 'Impossible de charger les liens du projet.',
//           variant: 'destructive',
//         });
//         // Redirect to dashboard only on authentication errors
//         if (error.message.includes('authentifié') || error.response?.status === 403) {
//           navigate('/app/dashboard');
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPaymentLinks();
//   }, [projectId, navigate, toast]);

//   const handlePayClick = () => {
//     if (links.payment_url) {
//       window.open(links.payment_url, '_blank', 'noopener,noreferrer');
//     } else {
//       toast({
//         title: 'Erreur',
//         description: 'Aucun lien de paiement disponible.',
//         variant: 'destructive',
//       });
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-bizzwiz-deep-space">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
//           className="text-bizzwiz-electric-cyan"
//         >
//           Chargement...
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-[calc(100vh-var(--header-height,72px))] p-6 bg-bizzwiz-deep-space text-bizzwiz-star-white">
//       <div className="flex justify-between items-center mb-8">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-4xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare relative"
//         >
//           Gestion des Paiements
//           <span className="absolute -bottom-2 left-0 w-1/4 h-1 bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare rounded-full opacity-50 animate-pulse"></span>
//         </motion.h1>
//         <Button
//           variant="outline"
//           onClick={() => navigate('/app/dashboard')}
//           className="border-bizzwiz-electric-cyan text-bizzwiz-electric-cyan hover:bg-bizzwiz-electric-cyan/10"
//           aria-label="Retour au tableau de bord"
//         >
//           <ArrowLeft size={16} className="mr-2" />
//           Retour
//         </Button>
//       </div>

//       <AnimatePresence>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           className="p-6 rounded-xl border border-bizzwiz-electric-cyan/20 bg-bizzwiz-deep-space/30 backdrop-blur-lg shadow-lg max-w-2xl mx-auto"
//         >
//           <h2 className="text-2xl font-orbitron font-bold text-bizzwiz-magenta-flare mb-4">
//             Liens du Projet
//           </h2>
//           <div className="space-y-4 text-bizzwiz-comet-tail">
//             <div>
//               <p className="font-medium text-bizzwiz-star-white mb-2">Lien Figma</p>
//               {links.figma_url ? (
//                 <a
//                   href={links.figma_url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-bizzwiz-electric-cyan hover:text-bizzwiz-magenta-flare flex items-center gap-2"
//                 >
//                   <ExternalLink size={16} />
//                   {links.figma_url}
//                 </a>
//               ) : (
//                 <p className="text-bizzwiz-comet-tail">Aucun lien Figma défini.</p>
//               )}
//             </div>
//             <div>
//               <p className="font-medium text-bizzwiz-star-white mb-2">Lien de Paiement</p>
//               {links.payment_url ? (
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handlePayClick}
//                   className="bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare text-bizzwiz-deep-space px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-bizzwiz-electric-cyan/50 transition-all duration-300 w-full sm:w-auto flex items-center gap-2"
//                 >
//                   <ExternalLink size={16} />
//                   Payer Maintenant
//                 </motion.button>
//               ) : (
//                 <p className="text-bizzwiz-comet-tail">Aucun lien de paiement défini.</p>
//               )}
//             </div>
//           </div>
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// };

// export default PaymentPage;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { 
  ArrowLeft, 
  ExternalLink, 
  CreditCard, 
  Figma, 
  Copy, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  Shield,
  Clock,
  Link as LinkIcon
} from 'lucide-react';
import ApiService from '@/apiService';

const PaymentPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [links, setLinks] = useState({
    figma_url: '',
    payment_url: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('bizwizusertoken');
        if (!token) {
          throw new Error('Utilisateur non authentifié. Veuillez vous connecter.');
        }

        const endpoint = `/user-projects/${projectId}/payment-links`;
        console.log('Fetching from endpoint:', endpoint);
        const response = await ApiService(endpoint, 'GET', null, false, token);
        console.log('API Response:', response);

        if (response.success && response.data) {
          setLinks({
            figma_url: response.data.figma_url || '',
            payment_url: response.data.payment_url || '',
          });
        } else {
          throw new Error(response.message || 'Aucun lien de paiement trouvé.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        toast({
          title: 'Erreur',
          description: error.message || 'Impossible de charger les données du projet.',
          variant: 'destructive',
        });
        if (error.message.includes('authentifié') || error.response?.status === 403) {
          navigate('/app/dashboard');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectData();
  }, [projectId, navigate, toast]);

  const handlePayClick = () => {
    if (links.payment_url) {
      window.open(links.payment_url, '_blank', 'noopener,noreferrer');
    } else {
      toast({
        title: 'Erreur',
        description: 'Aucun lien de paiement disponible.',
        variant: 'destructive',
      });
    }
  };

  const handleCopyLink = async (url, type) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(type);
      toast({
        title: 'Copié !',
        description: 'Le lien a été copié dans le presse-papiers.',
      });
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de copier le lien.',
        variant: 'destructive',
      });
    }
  };

  const openFigmaLink = () => {
    if (links.figma_url) {
      window.open(links.figma_url, '_blank', 'noopener,noreferrer');
    }
  };

  const canAccessFigma = !!links.figma_url;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-bizzwiz-deep-space">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="text-[#8f00ff]"
        >
          <RefreshCw size={32} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bizzwiz-deep-space via-bizzwiz-deep-space/95 to-bizzwiz-deep-space text-bizzwiz-star-white">
      <div className="sticky top-0 z-10 bg-bizzwiz-deep-space/80 backdrop-blur-xl border-b border-[#8f00ff]/10">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="h-12 w-12 rounded-xl bg-[#8f00ff] flex items-center justify-center">
                <CreditCard size={24} className="text-bizzwiz-deep-space" />
              </div>
              <div>
                <h1 className="text-3xl font-orbitron font-bold text-[#8f00ff]">
                  Liens du Projet
                </h1>
                <p className="text-bizzwiz-comet-tail text-sm">
                  Accédez à vos ressources et effectuez le paiement
                </p>
              </div>
            </motion.div>
            
            <Button
              variant="outline"
              onClick={() => navigate('/app/dashboard')}
              className="border-[#8f00ff]/30 text-[#8f00ff] hover:bg-[#8f00ff]/10"
            >
              <ArrowLeft size={16} className="mr-2" />
              Retour
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="group"
          >
            <div className="bg-bizzwiz-deep-space/60 backdrop-blur-xl rounded-2xl border border-[#8f00ff]/20 overflow-hidden hover:border-[#8f00ff]/40 transition-all duration-300">
              <div className="p-6 bg-gradient-to-r from-[#8f00ff]/10 to-[#8f00ff]/10 border-b border-[#8f00ff]/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-[#8f00ff]/20 flex items-center justify-center">
                    <Figma size={20} className="text-[#8f00ff]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-orbitron font-bold text-[#8f00ff]">
                      Design Figma
                    </h2>
                    <p className="text-bizzwiz-comet-tail text-sm">
                      Consultez vos maquettes
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {canAccessFigma ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-bizzwiz-deep-space/40 rounded-xl border border-[#8f00ff]/10">
                      <div className="flex items-center gap-2 mb-2">
                        <LinkIcon size={14} className="text-[#8f00ff]" />
                        <span className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
                          Lien Figma
                        </span>
                      </div>
                      <p className="text-sm text-bizzwiz-comet-tail break-all font-mono">
                        {links.figma_url}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={openFigmaLink}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#8f00ff] text-white font-semibold shadow-lg hover:shadow-[#8f00ff]/25 transition-all duration-300"
                      >
                        <ExternalLink size={16} />
                        Ouvrir Figma
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCopyLink(links.figma_url, 'figma')}
                        className="px-4 py-3 rounded-xl bg-bizzwiz-deep-space/60 border border-[#8f00ff]/30 text-[#8f00ff] hover:bg-[#8f00ff]/10 transition-all duration-300"
                      >
                        {copiedLink === 'figma' ? (
                          <CheckCircle2 size={16} className="text-green-400" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </motion.button>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-green-400">
                      <CheckCircle2 size={14} />
                      <span>Lien disponible</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle size={16} className="text-red-400" />
                        <span className="text-sm font-medium text-red-400">
                          Lien non disponible
                        </span>
                      </div>
                      <p className="text-sm text-bizzwiz-comet-tail">
                        Vous pouvez accéder après le paiement.
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-bizzwiz-comet-tail">
                      <Clock size={14} />
                      <span>En attente de paiement</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="group"
          >
            <div className="bg-bizzwiz-deep-space/60 backdrop-blur-xl rounded-2xl border border-[#8f00ff]/20 overflow-hidden hover:border-[#8f00ff]/40 transition-all duration-300">
              <div className="p-6 bg-gradient-to-r from-[#8f00ff]/10 to-[#8f00ff]/10 border-b border-[#8f00ff]/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-[#8f00ff]/20 flex items-center justify-center">
                    <CreditCard size={20} className="text-[#8f00ff]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-orbitron font-bold text-[#8f00ff]">
                      Paiement Sécurisé
                    </h2>
                    <p className="text-bizzwiz-comet-tail text-sm">
                      Finalisez votre commande
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {links.payment_url ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-bizzwiz-deep-space/40 rounded-xl border border-[#8f00ff]/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield size={14} className="text-[#8f00ff]" />
                        <span className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
                          Lien de Paiement
                        </span>
                      </div>
                      <p className="text-sm text-bizzwiz-comet-tail break-all font-mono">
                        {links.payment_url}
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handlePayClick}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#8f00ff] text-bizzwiz-deep-space font-semibold shadow-lg hover:shadow-[#8f00ff]/40 transition-all duration-300"
                      >
                        <CreditCard size={16} />
                        Payer Maintenant
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCopyLink(links.payment_url, 'payment')}
                        className="px-4 py-3 rounded-xl bg-bizzwiz-deep-space/60 border border-[#8f00ff]/30 text-[#8f00ff] hover:bg-[#8f00ff]/10 transition-all duration-300"
                      >
                        {copiedLink === 'payment' ? (
                          <CheckCircle2 size={16} className="text-green-400" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </motion.button>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-green-400">
                      <CheckCircle2 size={14} />
                      <span>Paiement sécurisé disponible</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle size={16} className="text-red-400" />
                        <span className="text-sm font-medium text-red-400">
                          Paiement non disponible
                        </span>
                      </div>
                      <p className="text-sm text-bizzwiz-comet-tail">
                        Le lien de paiement n'a pas encore été configuré pour ce projet.
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-bizzwiz-comet-tail">
                      <Clock size={14} />
                      <span>En attente de configuration</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <div className="bg-bizzwiz-deep-space/40 backdrop-blur-xl rounded-2xl border border-[#8f00ff]/10 p-6">
            <h3 className="text-lg font-orbitron font-semibold text-[#8f00ff] mb-4">
              Informations Importantes
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-bizzwiz-comet-tail">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Shield size={16} className="text-[#8f00ff] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-bizzwiz-star-white mb-1">Sécurité</h4>
                    <p>Tous les paiements sont sécurisés et traités via des plateformes certifiées.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Figma size={16} className="text-[#8f00ff] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-bizzwiz-star-white mb-1">Accès Figma</h4>
                    <p>Les designs sont accessibles via le lien Figma fourni après le paiement.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <ExternalLink size={16} className="text-[#8f00ff] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-bizzwiz-star-white mb-1">Liens Externes</h4>
                    <p>Les liens s'ouvrent dans de nouveaux onglets pour votre sécurité.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Copy size={16} className="text-[#8f00ff] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-bizzwiz-star-white mb-1">Copier les Liens</h4>
                    <p>Utilisez le bouton copier pour partager les liens facilement.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-bizzwiz-deep-space/40 rounded-full border border-[#8f00ff]/10">
            <AlertCircle size={16} className="text-[#8f00ff]" />
            <span className="text-sm text-bizzwiz-comet-tail">
              Besoin d'aide ? Contactez notre support client
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentPage;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { useToast } from '@/components/ui/use-toast';
// import { ArrowLeft, Loader2, ExternalLink } from 'lucide-react';
// import ApiService from '@/apiService';

// const PaymentPage = () => {
//   const { projectId } = useParams(); // Still use projectId for context, if needed
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [links, setLinks] = useState({
//     figma_url: '',
//     payment_url: '',
//   });
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchPaymentLinks = async () => {
//       setIsLoading(true);
//       try {
//         const token = localStorage.getItem('bizwizusertoken');
//         // Use /user-links endpoint to fetch user-specific links
//         const response = await ApiService('/user-links', 'GET', null, false, token);
//         if (response.data) {
//           setLinks({
//             figma_url: response.data.figma_url || '',
//             payment_url: response.data.payment_url || '',
//           });
//         } else {
//           throw new Error('No payment links found');
//         }
//       } catch (error) {
//         toast({
//           title: 'Erreur',
//           description: error.response?.data?.message || 'Impossible de charger les liens du projet.',
//           variant: 'destructive',
//         });
//         if (error.response?.status === 403) {
//           navigate('/app/dashboard'); // Redirect if unauthorized
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPaymentLinks();
//   }, [navigate, toast]);

//   const handlePayClick = () => {
//     if (links.payment_url) {
//       window.open(links.payment_url, '_blank', 'noopener,noreferrer');
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Loader2 className="h-8 w-8 animate-spin text-red-500" />
//         <p className="ml-3 text-slate-300">Chargement des liens...</p>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="container max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"
//     >
//       <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
//         <Button
//           variant="ghost"
//           onClick={() => navigate('/app/dashboard')}
//           className="text-red-400 hover:bg-red-500/10 hover:text-red-300 w-full sm:w-auto"
//           aria-label="Retour au tableau de bord"
//         >
//           <ArrowLeft className="h-5 w-5 stroke-2 mr-2" />
//           Retour au Tableau de Bord
//         </Button>
//       </div>

//       <Card className="bg-slate-700/30 border-slate-600 shadow-lg">
//         <CardHeader className="border-b border-slate-600/70">
//           <CardTitle className="text-lg text-red-300 flex items-center gap-2">
//             <ExternalLink className="h-5 w-5 text-red-400 stroke-2" />
//             Liens du Projet
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4 p-4 md:p-6">
//           <div className="space-y-2">
//             <label className="text-slate-300 block font-semibold">Lien Figma</label>
//             {links.figma_url ? (
//               <a
//                 href={links.figma_url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-red-400 hover:text-red-300 underline flex items-center gap-2"
//               >
//                 <ExternalLink className="h-4 w-4 stroke-2" />
//                 {links.figma_url}
//               </a>
//             ) : (
//               <p className="text-slate-400">Aucun lien Figma défini.</p>
//             )}
//           </div>
//           <div className="space-y-2">
//             <label className="text-slate-300 block font-semibold">Lien de Paiement</label>
//             {links.payment_url ? (
//               <Button
//                 onClick={handlePayClick}
//                 className="bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto flex items-center gap-2"
//               >
//                 <ExternalLink className="h-4 w-4 stroke-2" />
//                 Payer Maintenant
//               </Button>
//             ) : (
//               <p className="text-slate-400">Aucun lien de paiement défini.</p>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// };

// export default PaymentPage;