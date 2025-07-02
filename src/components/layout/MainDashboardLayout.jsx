// import React, { useState, useEffect, useRef } from 'react';
// import Sidebar, { sidebarItems } from '@/components/layout/Sidebar';
// import Header from '@/components/layout/Header';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { toast } from '@/components/ui/use-toast';
// import ApiService from '@/apiService';

// const MainDashboardLayout = ({ children }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isMounted = useRef(false);

//   const [activeSection, setActiveSection] = useState('dashboard');
//   const [projects, setProjects] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);

//   useEffect(() => {
//     if (!isMounted.current) {
//       document.documentElement.style.setProperty('--sidebar-width', '256px');
//       document.documentElement.style.setProperty('--header-height', '72px');
//       fetchUserProjects();
//       isMounted.current = true;
//     }
//   }, []);

//   useEffect(() => {
//     const pathParts = location.pathname.split('/');
//     let currentSection = 'dashboard';
//     let projId = null;

//     if (pathParts[2] === 'newproject') {
//       currentSection = 'nouveauProjet';
//     } else if (pathParts[2] === 'dashboard-project' && pathParts[3]) {
//       if (pathParts[3] === 'user-settings') {
//         currentSection = 'parametres';
//       } else {
//         currentSection = 'projets';
//         projId = pathParts[3];
//       }
//     } else if (pathParts[2] === 'payment') {
//       currentSection = 'payment';
//     } else if (pathParts[2] === 'schedule-meet') {
//       currentSection = 'schedule';
//     } else if (pathParts[2] === 'roadmap') {
//       currentSection = 'roadmap';
//     } else if (pathParts[2] === 'dashboard') {
//       currentSection = 'dashboard';
//     }

//     if (projId) {
//       const foundProject = projects.find(p => p.id === parseInt(projId));
//       setSelectedProject(foundProject || null);
//     } else {
//       setSelectedProject(null);
//     }

//     setActiveSection(currentSection);
//   }, [location.pathname, projects]);

//   const fetchUserProjects = async () => {
//     try {
//       console.log('ApiService:', ApiService); // Debug ApiService import
//       const token = localStorage.getItem('bizwizusertoken');
//       if (!token) {
//         throw new Error('Utilisateur non authentifié. Veuillez vous connecter.');
//       }
//       console.log('Fetching projects with token:', token); // Debug token
//       const response = await ApiService('/user-projects', 'GET', null, false, token);
//       console.log('Fetch projects response:', response); // Debug response
//       if (response.success) {
//         setProjects(response.data);
//       } else {
//         console.error('API error:', response.message, response); // Debug API error
//         toast({
//           title: 'Error',
//           description: response.message || 'Failed to load projects',
//           variant: 'destructive',
//         });
//         // Set fallback projects if API fails
//         setProjects([{ id: 1, name: 'Test Project' }]);
//       }
//     } catch (error) {
//       console.error('Error fetching projects:', error, 'Response:', error.response); // Enhanced error logging
//       toast({
//         title: 'Error',
//         description: error.message || 'An error occurred while fetching projects',
//         variant: 'destructive',
//       });
//       // Set fallback projects if API fails
//       setProjects([{ id: 1, name: 'Test Project' }]);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('bizzwiz-userRole');
//     localStorage.removeItem('bizzwiz-userId');
//     localStorage.removeItem('bizwizusertoken'); // Clear token on logout
//     toast({ title: 'Déconnexion Réussie', description: 'Vous avez été déconnecté(e).' });
//     navigate('/login');
//   };

//   const handleSectionClick = (sectionId) => {
//     setSelectedProject(null);
//     const sectionConfig = sidebarItems.find(item => item.id === sectionId);
//     if (!sectionConfig) return;

//     console.log('Projects:', projects); // Debug projects array

//     if (sectionId === 'dashboard') {
//       navigate('/app/dashboard');
//     } else if (sectionId === 'projets') {
//       const firstProject = projects[0];
//       navigate(`/app/dashboard-project/${firstProject ? firstProject.id : 'default-user-project'}`);
//     } else if (sectionId === 'parametres') {
//       navigate('/app/dashboard-project/user-settings');
//     } else if (sectionId === 'nouveauProjet') {
//       navigate('/app/newproject');
//     } else if (sectionId === 'payment') {
//       const projectId = selectedProject?.id || projects[0]?.id ; 
//       console.log('Navigating to payment with projectId:', projectId);
//       navigate(`/app/payment/${projectId}`);
//     } else if (sectionId === 'schedule') {
//       navigate('/app/schedule-meet');
//     } else if (sectionId === 'roadmap') {
//       navigate('/app/roadmap');
//     } else if (sectionId === 'deconnexion') {
//       handleLogout();
//     }

//     setActiveSection(sectionId);
//   };

//   return (
//     <div className="flex h-screen bg-gradient-to-br from-bizzwiz-deep-space via-bizzwiz-nebula-purple/5 to-bizzwiz-deep-space text-bizzwiz-star-white">
//       <Sidebar
//         activeSection={activeSection}
//         onSectionClick={handleSectionClick}
//         onLogout={handleLogout}
//       />
//       <div className="flex-1 flex flex-col overflow-hidden ml-[var(--sidebar-width,256px)]">
//         <Header
//           activeSection={activeSection}
//           selectedProject={selectedProject}
//         />
//         <main className="flex-1 overflow-y-auto bg-bizzwiz-deep-space/30">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MainDashboardLayout;




import React, { useState, useEffect, useRef } from 'react';
import Sidebar, { sidebarItems } from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import ApiService from '@/apiService';

const MainDashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMounted = useRef(false);

  const [activeSection, setActiveSection] = useState('dashboard');
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (!isMounted.current) {
      document.documentElement.style.setProperty('--sidebar-width', '256px');
      document.documentElement.style.setProperty('--header-height', '72px');
      fetchUserProjects();
      isMounted.current = true;
    }
  }, []);

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    let currentSection = 'dashboard';
    let projId = null;

    if (pathParts[2] === 'newproject') {
      currentSection = 'nouveauProjet';
    } else if (pathParts[2] === 'dashboard-project' && pathParts[3]) {
      if (pathParts[3] === 'user-settings') {
        currentSection = 'parametres';
      } else {
        currentSection = 'projets';
        projId = pathParts[3];
      }
    } else if (pathParts[2] === 'payment') {
      currentSection = 'payment';
    } else if (pathParts[2] === 'schedule-meet') {
      currentSection = 'schedule';
    } else if (pathParts[2] === 'roadmap') {
      currentSection = 'roadmap';
    } else if (pathParts[2] === 'dashboard') {
      currentSection = 'dashboard';
    }

    if (projId) {
      const foundProject = projects.find(p => p.id === parseInt(projId));
      setSelectedProject(foundProject || null);
    } else {
      setSelectedProject(null);
    }

    setActiveSection(currentSection);
  }, [location.pathname, projects]);

  const fetchUserProjects = async () => {
    try {
      const token = localStorage.getItem('bizwizusertoken');
      if (!token) {
        throw new Error('Utilisateur non authentifié. Veuillez vous connecter.');
      }
      const response = await ApiService('/user-projects', 'GET', null, false, token);
      if (response.success) {
        setProjects(response.data);
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to load projects',
          variant: 'destructive',
        });
        setProjects([{ id: 1, name: 'Test Project' }]);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'An error occurred while fetching projects',
        variant: 'destructive',
      });
      setProjects([{ id: 1, name: 'Test Project' }]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bizzwiz-userRole');
    localStorage.removeItem('bizzwiz-userId');
    localStorage.removeItem('bizwizusertoken');
    toast({ title: 'Déconnexion Réussie', description: 'Vous avez été déconnecté(e).' });
    navigate('/login');
  };

  const handleSectionClick = (sectionId) => {
    setSelectedProject(null);
    const sectionConfig = sidebarItems.find(item => item.id === sectionId);
    if (!sectionConfig) return;

    if (sectionId === 'dashboard') {
      navigate('/app/dashboard');
    } else if (sectionId === 'projets') {
      const firstProject = projects[0];
      navigate(`/app/dashboard-project/${firstProject ? firstProject.id : 'default-user-project'}`);
    } else if (sectionId === 'parametres') {
      navigate('/app/dashboard-project/user-settings');
    } else if (sectionId === 'nouveauProjet') {
      navigate('/app/newproject');
    } else if (sectionId === 'payment') {
      const projectId = selectedProject?.id || projects[0]?.id; 
      navigate(`/app/payment/${projectId}`);
    } else if (sectionId === 'schedule') {
      navigate('/app/schedule-meet');
    } else if (sectionId === 'roadmap') {
      navigate('/app/roadmap');
    } else if (sectionId === 'deconnexion') {
      handleLogout();
    }

    setActiveSection(sectionId);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-bizzwiz-deep-space via-bizzwiz-nebula-purple/5 to-bizzwiz-deep-space text-bizzwiz-star-white">
      <Sidebar
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col overflow-hidden ml-[var(--sidebar-width,256px)]">
        <Header
          activeSection={activeSection}
          selectedProject={selectedProject}
        />
        <main className="flex-1 overflow-y-auto bg-bizzwiz-deep-space/30">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainDashboardLayout;
