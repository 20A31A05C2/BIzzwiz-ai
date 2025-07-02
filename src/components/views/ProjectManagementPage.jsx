// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from '@/components/ui/use-toast';
// import ApiService from '@/apiService';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { RefreshCw, ExternalLink, Trash2 } from 'lucide-react';
// import { statusOptions } from '@/utils/constants';

// const ProjectManagementPage = () => {
//   const { projectId } = useParams();
//   const navigate = useNavigate();
//   const [projects, setProjects] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const getStatusLabel = (statusValue) => {
//     const normalized = statusValue?.toLowerCase().trim();
//     const match = statusOptions.find(s => s.value === normalized && s.value !== 'all');
//     return match ? match.label : statusValue || 'Pending';
//   };

//   const fetchUserProjects = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await ApiService('/user-projects', 'GET');
//       if (response.success) {
//         setProjects(response.data);
//         if (projectId) {
//           const project = response.data.find(p => p.id === parseInt(projectId));
//           setSelectedProject(project || null);
//           if (!project) {
//             navigate('/app/dashboard');
//             toast({ title: 'Erreur', description: 'Projet non trouvé.', variant: 'destructive' });
//           }
//         }
//       } else {
//         toast({ title: 'Erreur', description: response.message || 'Échec du chargement des projets', variant: 'destructive' });
//       }
//     } catch (error) {
//       console.error('Erreur lors de la récupération des projets:', error);
//       toast({ title: 'Erreur', description: error.message || 'Erreur inattendue', variant: 'destructive' });
//     } finally {
//       setLoading(false);
//     }
//   }, [projectId, navigate]);

//   useEffect(() => { fetchUserProjects(); }, [fetchUserProjects]);

//   const handleDeleteProject = async () => {
//     if (!selectedProject) return;
//     if (window.confirm(`Supprimer "${selectedProject.project_description || 'Projet'}" ?`)) {
//       try {
//         const response = await ApiService(`/user-projects/${selectedProject.id}`, 'DELETE');
//         if (response.success) {
//           toast({ title: 'Succès', description: 'Projet supprimé' });
//           setProjects(projects.filter(p => p.id !== selectedProject.id));
//           setSelectedProject(null);
//           navigate('/app/dashboard-project/default-user-project');
//         } else {
//           toast({ title: 'Erreur', description: response.message || 'Échec de suppression', variant: 'destructive' });
//         }
//       } catch (error) {
//         console.error('Erreur:', error);
//         toast({ title: 'Erreur', description: error.message || 'Erreur inattendue', variant: 'destructive' });
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-bizzwiz-deep-space">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
//           className="text-bizzwiz-electric-cyan font-orbitron text-xl"
//         >
//           Chargement...
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-b from-bizzwiz-deep-space via-bizzwiz-deep-space/90 to-bizzwiz-deep-space text-bizzwiz-star-white">
//       <div className="flex justify-between items-center mb-10">
//         <motion.h1
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-4xl font-orbitron font-bold bg-clip-text text-transparent bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare"
//         >
//           Vos projets
//         </motion.h1>
//         <Button
//           onClick={fetchUserProjects}
//           variant="outline"
//           className="border-bizzwiz-electric-cyan text-bizzwiz-electric-cyan hover:bg-bizzwiz-electric-cyan/10"
//         >
//           <RefreshCw size={16} className="mr-2" /> Rafraîchir
//         </Button>
//       </div>

//       {projects.length === 0 ? (
//         <div className="flex flex-col items-center mt-20">
//           <motion.h2
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-2xl font-semibold mb-2"
//           >
//             Aucun projet trouvé
//           </motion.h2>
//           <p className="mb-4 text-bizzwiz-comet-tail text-center">Créez votre premier projet pour commencer.</p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => navigate('/app/newproject')}
//             className="px-5 py-2 rounded-full bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare text-bizzwiz-deep-space font-semibold shadow hover:shadow-bizzwiz-electric-cyan/40"
//           >
//             Nouveau projet
//           </motion.button>
//         </div>
//       ) : (
//         <>
//           <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-10">
//             {projects.map(project => (
//               <motion.div
//                 key={project.id}
//                 whileHover={{ scale: 1.02 }}
//                 className={`p-4 rounded-xl border transition cursor-pointer ${
//                   selectedProject?.id === project.id
//                     ? 'border-bizzwiz-electric-cyan bg-bizzwiz-electric-cyan/10'
//                     : 'border-bizzwiz-deep-space/40 bg-bizzwiz-deep-space/70'
//                 } shadow hover:shadow-bizzwiz-electric-cyan/30`}
//                 onClick={() => {
//                   setSelectedProject(project);
//                   navigate(`/app/dashboard-project/${project.id}`);
//                 }}
//               >
//                 <h3 className="text-lg font-semibold truncate">{project.project_description || 'Projet sans titre'}</h3>
//                 <p className="text-xs text-bizzwiz-comet-tail mt-1">Statut: {getStatusLabel(project.status)}</p>
//                 <p className="text-xs text-bizzwiz-comet-tail">Créé le: {new Date(project.created_at).toLocaleDateString()}</p>
//               </motion.div>
//             ))}
//           </div>

//           <AnimatePresence>
//             {selectedProject && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="p-6 rounded-xl bg-bizzwiz-deep-space/70 border border-bizzwiz-electric-cyan/20 backdrop-blur shadow-lg"
//               >
//                 <h2 className="text-2xl font-orbitron font-bold mb-4 text-bizzwiz-magenta-flare">Détails du projet</h2>
//                 <div className="grid sm:grid-cols-2 gap-3 text-bizzwiz-comet-tail text-sm">
//                   <p><span className="font-medium text-bizzwiz-star-white">Entreprise:</span> {selectedProject.user_company || 'N/A'}</p>
//                   <p><span className="font-medium text-bizzwiz-star-white">Description:</span> {selectedProject.project_description}</p>
//                   <p><span className="font-medium text-bizzwiz-star-white">Type:</span> {selectedProject.solution_type}</p>
//                   <p><span className="font-medium text-bizzwiz-star-white">Audience:</span> {selectedProject.audience}</p>
//                   <p><span className="font-medium text-bizzwiz-star-white">Budget:</span> {selectedProject.budget}</p>
//                   <p><span className="font-medium text-bizzwiz-star-white">Statut:</span> {getStatusLabel(selectedProject.status)}</p>
//                 </div>
//                 <div className="flex flex-wrap gap-3 mt-6">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => navigate('/app/payment')}
//                     className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare text-bizzwiz-deep-space font-semibold shadow hover:shadow-bizzwiz-electric-cyan/40"
//                   >
//                     <ExternalLink size={16} className="mr-2" /> Voir liens utilisateur
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={handleDeleteProject}
//                     className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-bizzwiz-magenta-flare to-bizzwiz-electric-cyan text-bizzwiz-deep-space font-semibold shadow hover:shadow-bizzwiz-electric-cyan/40"
//                   >
//                     <Trash2 size={16} className="mr-2" /> Supprimer
//                   </motion.button>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </>
//       )}
//     </div>
//   );
// };

// export default ProjectManagementPage;

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import ApiService from '@/apiService';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  RefreshCw, 
  ExternalLink, 
  Trash2, 
  Calendar, 
  Building2, 
  Target, 
  Users, 
  DollarSign,
  FileText,
  ChevronRight,
  Plus,
  Search
} from 'lucide-react';
import { statusOptions } from '@/utils/constants';

const ProjectManagementPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusLabel = (statusValue) => {
    const normalized = statusValue?.toLowerCase().trim();
    const match = statusOptions.find(s => s.value === normalized && s.value !== 'all');
    return match ? match.label : statusValue || 'Pending';
  };

  const getStatusColor = (status) => {
    const normalized = status?.toLowerCase().trim();
    switch (normalized) {
      case 'completed': return 'text-green-400 bg-green-400/20';
      case 'in_progress': return 'text-blue-400 bg-blue-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      case 'cancelled': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const fetchUserProjects = useCallback(async () => {
    setLoading(true);
    try {
      const response = await ApiService('/user-projects', 'GET');
      if (response.success) {
        setProjects(response.data);
        if (projectId) {
          const project = response.data.find(p => p.id === parseInt(projectId));
          setSelectedProject(project || null);
          if (!project) {
            navigate('/app/dashboard');
            toast({ title: 'Erreur', description: 'Projet non trouvé.', variant: 'destructive' });
          }
        }
      } else {
        toast({ title: 'Erreur', description: response.message || 'Échec du chargement des projets', variant: 'destructive' });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des projets:', error);
      toast({ title: 'Erreur', description: error.message || 'Erreur inattendue', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [projectId, navigate]);

  useEffect(() => { fetchUserProjects(); }, [fetchUserProjects]);

  const handleDeleteProject = async () => {
    if (!selectedProject) return;
    if (window.confirm(`Supprimer "${selectedProject.project_description || 'Projet'}" ?`)) {
      try {
        const response = await ApiService(`/user-projects/${selectedProject.id}`, 'DELETE');
        if (response.success) {
          toast({ title: 'Succès', description: 'Projet supprimé' });
          setProjects(projects.filter(p => p.id !== selectedProject.id));
          setSelectedProject(null);
          navigate('/app/dashboard-project/default-user-project');
        } else {
          toast({ title: 'Erreur', description: response.message || 'Échec de suppression', variant: 'destructive' });
        }
      } catch (error) {
        console.error('Erreur:', error);
        toast({ title: 'Erreur', description: error.message || 'Erreur inattendue', variant: 'destructive' });
      }
    }
  };

  const filteredProjects = projects.filter(project =>
    project.project_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.user_company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-bizzwiz-deep-space">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="text-[#8f00ff] font-orbitron text-xl"
        >
          <RefreshCw size={32} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bizzwiz-deep-space via-bizzwiz-deep-space/95 to-bizzwiz-deep-space text-bizzwiz-star-white">
      {/* Header Section */}
      <div className="sticky top-0 z-10 bg-bizzwiz-deep-space/80 backdrop-blur-xl border-b border-[#8f00ff]/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4"
            >
              <div className="h-12 w-12 rounded-xl bg-[#8f00ff] flex items-center justify-center">
                <Building2 size={24} className="text-bizzwiz-deep-space" />
              </div>
              <div>
                <h1 className="text-3xl font-orbitron font-bold text-[#8f00ff]">
                  Gestion des Projets
                </h1>
                <p className="text-bizzwiz-comet-tail text-sm">
                  {projects.length} projet{projects.length !== 1 ? 's' : ''} total
                </p>
              </div>
            </motion.div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bizzwiz-comet-tail" />
                <input
                  type="text"
                  placeholder="Rechercher un projet..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-bizzwiz-deep-space/50 border border-[#8f00ff]/20 rounded-lg text-bizzwiz-star-white placeholder:text-bizzwiz-comet-tail focus:outline-none focus:border-[#8f00ff]/50"
                />
              </div>
              <Button
                onClick={fetchUserProjects}
                variant="outline"
                size="sm"
                className="border-[#8f00ff]/30 text-[#8f00ff] hover:bg-[#8f00ff]/10"
              >
                <RefreshCw size={16} className="mr-2" />
                Actualiser
              </Button>
              <Button
                onClick={() => navigate('/app/newproject')}
                size="sm"
                className="bg-[#8f00ff] text-bizzwiz-deep-space hover:shadow-lg hover:shadow-[#8f00ff]/25"
              >
                <Plus size={16} className="mr-2" />
                Nouveau
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="h-32 w-32 mx-auto mb-6 rounded-full bg-[#8f00ff]/20 flex items-center justify-center">
              <FileText size={48} className="text-bizzwiz-comet-tail" />
            </div>
            <h2 className="text-2xl font-orbitron font-semibold mb-3 text-[#8f00ff]">
              {searchTerm ? 'Aucun projet trouvé' : 'Commencez votre premier projet'}
            </h2>
            <p className="text-bizzwiz-comet-tail mb-8 max-w-md mx-auto">
              {searchTerm 
                ? 'Aucun projet ne correspond à votre recherche. Essayez avec d\'autres mots-clés.'
                : 'Créez votre premier projet pour commencer à gérer vos solutions digitales.'
              }
            </p>
            {!searchTerm && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/app/newproject')}
                className="px-8 py-3 rounded-xl bg-[#8f00ff] text-bizzwiz-deep-space font-semibold shadow-lg hover:shadow-[#8f00ff]/40 transition-all duration-300"
              >
                <Plus size={20} className="inline mr-2" />
                Créer un projet
              </motion.button>
            )}
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Projects Grid */}
            <div className="lg:col-span-2">
              <div className="grid gap-4">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    className={`group p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      selectedProject?.id === project.id
                        ? 'border-[#8f00ff] bg-[#8f00ff]/5 shadow-lg shadow-[#8f00ff]/20'
                        : 'border-bizzwiz-deep-space/30 bg-bizzwiz-deep-space/40 hover:border-[#8f00ff]/40 hover:bg-bizzwiz-deep-space/60'
                    } backdrop-blur-sm`}
                    onClick={() => {
                      setSelectedProject(project);
                      navigate(`/app/dashboard-project/${project.id}`);
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-bizzwiz-star-white mb-2 group-hover:text-[#8f00ff] transition-colors">
                          {project.project_description || 'Projet sans titre'}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-bizzwiz-comet-tail mb-3">
                          <Building2 size={14} />
                          <span>{project.user_company || 'Entreprise non spécifiée'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {getStatusLabel(project.status)}
                        </span>
                        <ChevronRight size={16} className="text-bizzwiz-comet-tail group-hover:text-[#8f00ff] transition-colors" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-bizzwiz-comet-tail">
                        <Target size={14} />
                        <span>{project.solution_type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-bizzwiz-comet-tail">
                        <DollarSign size={14} />
                        <span>{project.budget}</span>
                      </div>
                      <div className="flex items-center gap-2 text-bizzwiz-comet-tail">
                        <Users size={14} />
                        <span>{project.audience}</span>
                      </div>
                      <div className="flex items-center gap-2 text-bizzwiz-comet-tail">
                        <Calendar size={14} />
                        <span>{new Date(project.created_at).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Detailed View Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <AnimatePresence mode="wait">
                  {selectedProject ? (
                    <motion.div
                      key={selectedProject.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-bizzwiz-deep-space/60 backdrop-blur-xl rounded-2xl border border-[#8f00ff]/20 overflow-hidden"
                    >
                      {/* Header */}
                      <div className="p-6 bg-gradient-to-r from-[#8f00ff]/10 to-[#8f00ff]/10 border-b border-[#8f00ff]/20">
                        <h2 className="text-xl font-orbitron font-bold text-[#8f00ff] mb-2">
                          Détails du Projet
                        </h2>
                        <p className="text-bizzwiz-comet-tail text-sm">
                          ID: #{selectedProject.id}
                        </p>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-6">
                        {/* Project Info */}
                        <div className="space-y-4">
                          <div>
                            <label className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
                              Description
                            </label>
                            <p className="text-bizzwiz-star-white mt-1 font-medium">
                              {selectedProject.project_description}
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
                                Entreprise
                              </label>
                              <p className="text-bizzwiz-star-white mt-1">
                                {selectedProject.user_company || 'N/A'}
                              </p>
                            </div>
                            <div>
                              <label className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
                                Type
                              </label>
                              <p className="text-bizzwiz-star-white mt-1">
                                {selectedProject.solution_type}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
                                Audience
                              </label>
                              <p className="text-bizzwiz-star-white mt-1">
                                {selectedProject.audience}
                              </p>
                            </div>
                            <div>
                              <label className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
                                Budget
                              </label>
                              <p className="text-bizzwiz-star-white mt-1">
                                {selectedProject.budget}
                              </p>
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
                              Statut
                            </label>
                            <div className="mt-2">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedProject.status)}`}>
                                {getStatusLabel(selectedProject.status)}
                              </span>
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-medium text-[#8f00ff] uppercase tracking-wider">
                              Date de création
                            </label>
                            <p className="text-bizzwiz-star-white mt-1">
                              {new Date(selectedProject.created_at).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-4 border-t border-[#8f00ff]/20 space-y-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/app/payment')}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#8f00ff] text-bizzwiz-deep-space font-semibold shadow-lg hover:shadow-[#8f00ff]/40 transition-all duration-300"
                          >
                            <ExternalLink size={16} />
                            Voir les liens
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleDeleteProject}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 text-red-400 font-semibold hover:bg-red-500/30 transition-all duration-300"
                          >
                            <Trash2 size={16} />
                            Supprimer le projet
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-bizzwiz-deep-space/40 backdrop-blur-xl rounded-2xl border border-[#8f00ff]/10 p-8 text-center"
                    >
                      <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-[#8f00ff]/20 flex items-center justify-center">
                        <FileText size={24} className="text-[#8f00ff]" />
                      </div>
                      <h3 className="text-lg font-semibold text-[#8f00ff] mb-2">
                        Sélectionnez un projet
                      </h3>
                      <p className="text-bizzwiz-comet-tail text-sm">
                        Cliquez sur un projet dans la liste pour voir ses détails
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManagementPage;

// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from '@/components/ui/use-toast';
// import ApiService from '@/apiService';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { RefreshCw, ExternalLink } from 'lucide-react';
// import { statusOptions } from '@/utils/constants';

// const ProjectManagementPage = () => {
//   const { projectId } = useParams();
//   const navigate = useNavigate();
//   const [projects, setProjects] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const getStatusLabel = (statusValue) => {
//     const normalized = statusValue?.toLowerCase().trim();
//     const match = statusOptions.find(s => s.value === normalized && s.value !== 'all');
//     return match ? match.label : statusValue || 'Pending';
//   };

//   const fetchUserProjects = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await ApiService('/user-projects', 'GET');
//       if (response.success) {
//         setProjects(response.data);
//         if (projectId) {
//           const project = response.data.find(p => p.id === parseInt(projectId));
//           if (project) {
//             setSelectedProject(project);
//           } else {
//             navigate('/app/dashboard');
//             toast({
//               title: 'Erreur',
//               description: 'Projet non trouvé.',
//               variant: 'destructive',
//             });
//           }
//         }
//       } else {
//         toast({
//           title: 'Erreur',
//           description: response.message || 'Échec du chargement des projets',
//           variant: 'destructive',
//         });
//       }
//     } catch (error) {
//       console.error('Erreur lors de la récupération des projets:', error);
//       toast({
//         title: 'Erreur',
//         description: error.message || 'Une erreur s’est produite lors de la récupération des projets',
//         variant: 'destructive',
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, [projectId, navigate, toast]);

//   useEffect(() => {
//     fetchUserProjects();
//   }, [fetchUserProjects]);

//   const handleDeleteProject = async () => {
//     if (!selectedProject) return;

//     if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${selectedProject.project_description || 'Projet sans titre'}" ?`)) {
//       try {
//         const response = await ApiService(`/user-projects/${selectedProject.id}`, 'DELETE');
//         if (response.success) {
//           toast({ title: 'Succès', description: 'Projet supprimé avec succès' });
//           setProjects(projects.filter(p => p.id !== selectedProject.id));
//           setSelectedProject(null);
//           navigate('/app/dashboard-project/default-user-project');
//         } else {
//           toast({
//             title: 'Erreur',
//             description: response.message || 'Échec de la suppression du projet',
//             variant: 'destructive',
//           });
//         }
//       } catch (error) {
//         console.error('Erreur lors de la suppression du projet:', error);
//         toast({
//           title: 'Erreur',
//           description: error.message || 'Une erreur s’est produite lors de la suppression du projet',
//           variant: 'destructive',
//         });
//       }
//     }
//   };

//   if (loading) {
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

//   if (!projects.length) {
//     return (
//       <div className="min-h-[calc(100vh-var(--header-height,72px))] flex flex-col items-center justify-center p-6 bg-bizzwiz-deep-space text-bizzwiz-star-white">
//         <motion.h2
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-3xl font-orbitron font-bold text-bizzwiz-magenta-flare mb-4"
//         >
//           Aucun projet trouvé
//         </motion.h2>
//         <p className="text-bizzwiz-comet-tail text-center mb-6">
//           Vous n’avez pas encore créé de projets. Commencez par créer un nouveau projet !
//         </p>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => navigate('/app/newproject')}
//           className="bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare text-bizzwiz-deep-space px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-bizzwiz-electric-cyan/50 transition-all duration-300"
//         >
//           Créer un nouveau projet
//         </motion.button>
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
//           Gestion des projets
//           <span className="absolute -bottom-2 left-0 w-1/4 h-1 bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare rounded-full opacity-50 animate-pulse"></span>
//         </motion.h1>
//         <Button
//           onClick={fetchUserProjects}
//           variant="outline"
//           className="border-bizzwiz-electric-cyan text-bizzwiz-electric-cyan hover:bg-bizzwiz-electric-cyan/10"
//         >
//           <RefreshCw size={16} className="mr-2" />
//           Rafraîchir
//         </Button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//         {projects.map(project => (
//           <motion.div
//             key={project.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)' }}
//             className={`p-5 rounded-xl border ${selectedProject?.id === project.id
//               ? 'border-bizzwiz-electric-cyan bg-bizzwiz-electric-cyan/10'
//               : 'border-bizzwiz-deep-space/30 bg-bizzwiz-deep-space/50 backdrop-blur-md'
//             } cursor-pointer transition-all duration-300`}
//             onClick={() => navigate(`/app/dashboard-project/${project.id}`)}
//           >
//             <h3 className="text-xl font-satoshi font-semibold text-bizzwiz-star-white mb-2">
//               {project.project_description || 'Projet sans titre'}
//             </h3>
//             <p className="text-bizzwiz-comet-tail text-sm mb-1">
//               <span className="font-medium">Statut:</span> {getStatusLabel(project.status)}
//             </p>
//             <p className="text-bizzwiz-comet-tail text-sm">
//               <span className="font-medium">Créé le:</span> {new Date(project.created_at).toLocaleDateString()}
//             </p>
//           </motion.div>
//         ))}
//       </div>

//       <AnimatePresence>
//         {selectedProject && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="p-6 rounded-xl border border-bizzwiz-electric-cyan/20 bg-bizzwiz-deep-space/30 backdrop-blur-lg shadow-lg"
//           >
//             <h2 className="text-2xl font-orbitron font-bold text-bizzwiz-magenta-flare mb-4">
//               Détails du projet
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-bizzwiz-comet-tail">
//               <p><span className="font-medium text-bizzwiz-star-white">Entreprise:</span> {selectedProject.user_company || 'N/A'}</p>
//               <p><span className="font-medium text-bizzwiz-star-white">Description:</span> {selectedProject.project_description}</p>
//               <p><span className="font-medium text-bizzwiz-star-white">Type de solution:</span> {selectedProject.solution_type}</p>
//               <p><span className="font-medium text-bizzwiz-star-white">Audience:</span> {selectedProject.audience}</p>
//               <p><span className="font-medium text-bizzwiz-star-white">Budget:</span> {selectedProject.budget}</p>
//               <p><span className="font-medium text-bizzwiz-star-white">Statut:</span> {getStatusLabel(selectedProject.status)}</p>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-4 mt-6">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate('/app/payment')}
//                 className="bg-gradient-to-r from-bizzwiz-electric-cyan to-bizzwiz-magenta-flare text-bizzwiz-deep-space px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-bizzwiz-electric-cyan/50 transition-all duration-300"
//               >
//                 <ExternalLink size={16} className="inline mr-2" />
//                 Voir les liens utilisateur
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleDeleteProject}
//                 className="bg-gradient-to-r from-bizzwiz-magenta-flare to-bizzwiz-electric-cyan text-bizzwiz-deep-space px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-bizzwiz-electric-cyan/50 transition-all duration-300"
//               >
//                 Supprimer le projet
//               </motion.button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ProjectManagementPage;