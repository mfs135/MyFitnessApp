import React, { useState } from "react";
import '../css/sidebar.css';
import AuthUser from "./AuthUser.js";

function Sidebar({OnTabClick,OnMenuOpen}){
    const [isOpen, setIsOpen] = useState(false);
    const [activeTabClass,setactivetabClass] = useState('dashboard');
    const {token,logout} = AuthUser();

    const toggleSidebar = () => {
        OnMenuOpen(!isOpen);
        setIsOpen(!isOpen);
    };

    const handleclick = (tab) => {
        if (tab === 'logout'){
            // Handle Logout
            if (token !== undefined)
                logout();
        }
        else{
            setactivetabClass(tab);
            OnTabClick(tab);
        }
    }

    return (
        <div>
            <button 
                className="mobile-sidebar-toggle d-lg-none"
                onClick={toggleSidebar}
            >
                {isOpen ? "✕ Close" : "☰ Menu"}
            </button>

            <nav 
                id="sidebarMenu" 
                className={`sidebar collapse d-lg-block bg-white ${isOpen ? 'show' : ''}`}
            >
                <div className="position-sticky">
                    <div className="list-group list-group-flush mx-3 mt-4">
                        <button 
                            className={`list-group-item list-group-item-action py-2 ripple ${activeTabClass === 'dashboard' ? 'active' : ''}`}
                            aria-current="true"
                            onClick={() => handleclick('dashboard')}
                        >
                            <i className="fas fa-tachometer-alt fa-fw me-3"></i>
                            <span>Main dashboard</span>
                        </button>

                        <button 
                            className={`list-group-item list-group-item-action py-2 ripple ${activeTabClass === 'track_goals' ? 'active' : ''}`}
                            onClick={() => handleclick('track_goals')}
                        >
                            <i className="fas fa-chart-area fa-fw me-3"></i>
                            <span>Track Goals</span>
                        </button>

                        <button 
                            className={`list-group-item list-group-item-action py-2 ripple ${activeTabClass === 'stats' ? 'active' : ''}`}
                            onClick={() => handleclick('stats')}
                        >
                            <i className="fas fa-lock fa-fw me-3"></i>
                            <span>Stats</span>
                        </button>

                        <button 
                            className={`list-group-item list-group-item-action py-2 ripple ${activeTabClass === 'logout' ? 'active' : ''}`}
                            onClick={() => handleclick('logout')}
                        >
                            <i className="fas fa-chart-line fa-fw me-3"></i>
                            <span>Logout</span>
                        </button>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar;