"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, LineChart, Bell, UserCog, Settings, LogOut, Gem, Home, Activity, Database, Users, Shield, MessageSquare, UserCircle, Mail } from 'lucide-react';
import './navigation.css';

const Navigation = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [isInsightOpen, setInsightOpen] = useState(false);
    const [isNotificationOpen, setNotificationOpen] = useState(false);

    const profileRef = useRef<HTMLDivElement>(null);
    const insightRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setProfileOpen(false);
            }
            if (insightRef.current && !insightRef.current.contains(event.target as Node)) {
                setInsightOpen(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setNotificationOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const notifications = [
        { title: 'New Dataset Added', description: "The 'Fintech Adoption Rates' dataset has been updated.", time: '2 hours ago', unread: true },
        { title: 'New UGC Creator', description: "Ben Carter is now available for collaboration.", time: '1 day ago', unread: true },
        { title: 'Your Boost is Live!', description: "Your campaign with Alina V. has started.", time: '3 days ago', unread: false }
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <>
            <div id="sidebar-overlay" className={`sidebar-overlay ${isSidebarOpen ? 'is-visible' : ''}`} onClick={toggleSidebar}></div>
            <aside id="sidebar" className={`sidebar ${isSidebarOpen ? 'is-open' : ''}`}>
                <h2 className="sidebar-header">XOLVON</h2>
                <nav id="sidebar-nav-customer" className="sidebar-nav">
                    <Link href="#" className="sidebar-link sidebar-link-special active">
                        <Gem size={20} />
                        <span>Pricing</span>
                    </Link>
                    <Link href="#" className="sidebar-link">
                        <Home size={20} />
                        <span>Home</span>
                    </Link>
                    <Link href="#" className="sidebar-link">
                        <Activity size={20} />
                        <span>AI Data</span>
                    </Link>
                    <Link href="#" className="sidebar-link">
                        <Database size={20} />
                        <span>Data Market</span>
                    </Link>
                    <Link href="#" className="sidebar-link">
                        <Users size={20} />
                        <span>Attention Boost</span>
                    </Link>
                    <Link href="#" className="sidebar-link">
                        <Shield size={20} />
                        <span>Cyber Defense</span>
                    </Link>
                    <Link href="#" className="sidebar-link">
                        <MessageSquare size={20} />
                        <span>Community</span>
                    </Link>
                    <Link href="#" className="sidebar-link">
                        <UserCircle size={20} />
                        <span>Profile</span>
                    </Link>
                    <div className="mt-auto">
                        <Link href="#" className="sidebar-link">
                            <Mail size={20} />
                            <span>Contact Us</span>
                        </Link>
                    </div>
                </nav>
            </aside>

            <header className="navbar">
                <nav className="navbar-container">
                    <div className="navbar-left">
                        <button id="hamburger-menu" className="hamburger-button" onClick={toggleSidebar}>
                            <Menu size={24} />
                        </button>
                        <a href="#" className="navbar-logo">XOLVON</a>
                    </div>
                    <div className="navbar-menu">
                        <div className="dropdown" ref={insightRef}>
                            <button className="navbar-icon" onClick={() => setInsightOpen(!isInsightOpen)}>
                                <LineChart size={24} />
                            </button>
                            <div className={`dropdown-content insight-dropdown ${isInsightOpen ? 'is-active' : ''}`}>
                                <div className="insight-balance"><p>Rp 18.525.000</p></div>
                                <div className="insight-stats">
                                    <div className="stat-item"><Eye size={20} /><p className="stat-value">1.2M</p><p className="stat-percentage increase">+15%</p></div>
                                    <div className="stat-item"><Heart size={20} /><p className="stat-value">89k</p><p className="stat-percentage increase">+8%</p></div>
                                    <div className="stat-item"><Users size={20} /><p className="stat-value">12k</p><p className="stat-percentage decrease">-1.2%</p></div>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown" ref={notificationRef}>
                            <button className="navbar-icon" onClick={() => setNotificationOpen(!isNotificationOpen)}>
                                <Bell size={24} />
                                {unreadCount > 0 && <span id="notification-count-badge" className="notification-badge">{unreadCount}</span>}
                            </button>
                            <div className={`dropdown-content notification-dropdown ${isNotificationOpen ? 'is-active' : ''}`}>
                                <div className="notification-list">
                                    {notifications.map((n, i) => (
                                        <a href="#" className="notification-item" key={i}>
                                            <p className="notification-title">{n.title}</p>
                                            <p className="notification-description">{n.description} <span>{n.time}</span></p>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="dropdown" ref={profileRef}>
                            <button className="profile-avatar" onClick={() => setProfileOpen(!isProfileOpen)}>
                                <img src="https://placehold.co/40x40/3B82F6/FFFFFF?text=P" alt="Profile" />
                            </button>
                            <div className={`dropdown-content profile-dropdown ${isProfileOpen ? 'is-active' : ''}`}>
                                <div className="profile-menu">
                                    <a href="#" className="menu-item"><UserCog size={18} /><span>Edit Profile</span></a>
                                    <a href="#" className="menu-item"><Settings size={18} /><span>Settings</span></a>
                                </div>
                                <div className="profile-logout"><a href="#" className="menu-item logout-button"><LogOut size={18} /><span>Log out</span></a></div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

// Add these imports for the icons used in the insight dropdown
import { Eye, Heart } from 'lucide-react';

export default Navigation;
