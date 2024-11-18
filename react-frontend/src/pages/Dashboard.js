import React, {useEffect, useState} from 'react';
import AuthUser from '../components/AuthUser';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardContent from '../components/DashboardContent';
import TrackGoalsContent from '../components/TrackGoalsContent';
import StatsContent from '../components/StatsContent';

const Dashboard = () => {

  const [activetab, setactivetab] = useState('dashboard');
  const [IsMenuOpen , setMenuOpen] = useState(false);


  const {gettoken} = AuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    // After Mount Navigate back to SignIn page if no token.
    if (!gettoken()) {
      navigate('/Signin');
    }
  }, [gettoken, navigate]);

  // Return A Null Page (Blank Page) while page mounts,after mount it will navigate back to Signin.
  if (!gettoken()) {
    return null;
  }

  // Content to Display in Sections.

  const renderContent = () => {
    switch(activetab){
      case 'dashboard':
        return (
          <DashboardContent />
        );
        case 'track_goals':
          return (
            <TrackGoalsContent />
          );
        case 'stats':
          return (
            <div>
              <StatsContent />
            </div>
          );
        default:
          return null;
    }
  }

  // use this to block display of content while sidebar menu is opened.
  const styles = {
    display: IsMenuOpen ? 'none' : ''
  }

  return (
    <div className="container-fluid p-4 bg-white">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <Sidebar OnTabClick={setactivetab} OnMenuOpen={setMenuOpen}/>
        </div>
        {/* Main Content */}
        <div className="col-md-9 p-5" style={styles}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;