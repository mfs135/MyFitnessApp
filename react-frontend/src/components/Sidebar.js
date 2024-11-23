import React, { useState } from "react";
import AuthUser from "./AuthUser.js";
import '../css/sidebar.css';
import { Home, Target, BarChart2, LogOut } from "lucide-react";

function Sidebar({OnTabClick, OnMenuOpen}) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTabClass, setActiveTabClass] = useState('dashboard');
    const {token, logout} = AuthUser();

    const toggleSidebar = () => {
        OnMenuOpen(!isOpen);
        setIsOpen(!isOpen);
    };

    const handleClick = (tab) => {
        if (tab === 'logout') {
            if (token !== undefined) logout();
        } else {
            setActiveTabClass(tab);
            OnTabClick(tab);
        }
    }

    return (
        <div className="sidebar-wrapper">
            <button 
                className="mobile-sidebar-toggle rounded-lg hover:bg-gray-700"
                onClick={toggleSidebar}
            >
                {isOpen ? "✕" : "☰"}
            </button>

            <aside className={`sidebar ${isOpen ? 'show' : ''}`}>
                <div className="logo-section">
                    <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    FitLogix
                    </h1>
                </div>

                <nav className="menu-section">
                    <button 
                        className={`menu-item ${activeTabClass === 'dashboard' ? 'active' : ''}`}
                        onClick={() => handleClick('dashboard')}
                    >
                        <Home className="h-5 w-5" />
                        <span>Overview</span>
                    </button>

                    <button 
                        className={`menu-item ${activeTabClass === 'track_goals' ? 'active' : ''}`}
                        onClick={() => handleClick('track_goals')}
                    >
                        <Target className="h-5 w-5" />
                        <span>Track Goals</span>
                    </button>

                    <button 
                        className={`menu-item ${activeTabClass === 'stats' ? 'active' : ''}`}
                        onClick={() => handleClick('stats')}
                    >
                        <BarChart2 className="h-5 w-5" />
                        <span>Analytics</span>
                    </button>

                    <button 
                        className={`menu-item ${activeTabClass === 'logout' ? 'active' : ''}`}
                        onClick={() => handleClick('logout')}
                    >
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                    </button>
                </nav>
            </aside>
        </div>
    );
}

export default Sidebar;