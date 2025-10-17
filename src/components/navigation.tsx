"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LineChart, Bell, UserCog, Settings, LogOut, Gem, Home, Activity, Database, Users, Shield, MessageSquare, UserCircle, Mail, AlertTriangle, BarChart, ShoppingCart, FolderClock, HelpCircle } from 'lucide-react';
import './navigation.css';

const Navigation = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const isActive = (path: string) => pathname === path;

    return (
        <>
            <div id="sidebar-overlay" className={`sidebar-overlay ${isSidebarOpen ? 'is-visible' : ''}`} onClick={toggleSidebar}></div>
            <aside id="sidebar" className={`sidebar ${isSidebarOpen ? 'is-open' : ''}`}>
                <h2 className="sidebar-header">XOLVON</h2>
                <nav id="sidebar-nav-customer" className="sidebar-nav">
                    <Link href="/customer/pricing" className={`sidebar-link sidebar-link-special ${isActive('/customer/pricing') ? 'active' : ''}`}>
                        <Gem size={20} />
                        <span>Pricing</span>
                    </Link>
                    <Link href="/customer" className={`sidebar-link ${isActive('/customer') ? 'active' : ''}`}>
                        <Home size={20} />
                        <span>Home</span>
                    </Link>
                    <Link href="/customer/attention-boost" className={`sidebar-link ${isActive('/customer/attention-boost') ? 'active' : ''}`}>
                        <Users size={20} />
                        <span>Attention Boost</span>
                    </Link>
                    <Link href="/customer/attention-alert" className={`sidebar-link ${isActive('/customer/attention-alert') ? 'active' : ''}`}>
                        <AlertTriangle size={20} />
                        <span>Attention Alert</span>
                    </Link>
                    <Link href="/customer/cyberdefense" className={`sidebar-link ${isActive('/customer/cyberdefense') ? 'active' : ''}`}>
                        <Shield size={20} />
                        <span>Cyber Defense</span>
                    </Link>
                    <Link href="/customer/real-time-analysis" className={`sidebar-link ${isActive('/customer/real-time-analysis') ? 'active' : ''}`}>
                        <BarChart size={20} />
                        <span>Real Time Analysis</span>
                    </Link>
                    <Link href="/customer/xolvon-market" className={`sidebar-link ${isActive('/customer/xolvon-market') ? 'active' : ''}`}>
                        <ShoppingCart size={20} />
                        <span>Xolvon Market</span>
                    </Link>
                    <Link href="/customer/community" className={`sidebar-link ${isActive('/customer/community') ? 'active' : ''}`}>
                        <Users size={20} />
                        <span>Community</span>
                    </Link>
                    <Link href="#" className="sidebar-link">
                        <FolderClock size={20} />
                        <span>Upcoming Projects</span>
                    </Link>
                    <div className="mt-auto">
                        <Link href="/customer/contact-us" className={`sidebar-link ${isActive('/customer/contact-us') ? 'active' : ''}`}>
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
                        
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Navigation;
