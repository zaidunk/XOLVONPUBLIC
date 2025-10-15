"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './data-market.css';

const toolsItems = [
    {
        id: 7,
        category: 'SEO',
        rank: 1,
        title: 'AI-Powered Keyword Researcher',
        price: 'Rp 1.500.000/mo',
        imageUrl: 'https://images.unsplash.com/photo-1554232456-8727a67f2b54?q=80&w=2070&auto=format&fit=crop',
        alt: 'SEO Tool'
    },
    {
        id: 8,
        category: 'Social Media',
        rank: 2,
        title: 'Social Media Trend Analyzer',
        price: 'Rp 2.250.000/mo',
        imageUrl: 'https://images.unsplash.com/photo-1611926653458-092a4234cfb2?q=80&w=2070&auto=format&fit=crop',
        alt: 'Social Media Tool'
    },
    {
        id: 9,
        category: 'Content Creation',
        rank: 3,
        title: 'Automated Blog Post Generator',
        price: 'Rp 1.800.000/mo',
        imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop',
        alt: 'Content Tool'
    },
    {
        id: 13,
        category: 'Productivity',
        rank: 4,
        title: 'Smart Task & Project Manager',
        price: 'Rp 950.000/mo',
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
        alt: 'Productivity Tool'
    },
    {
        id: 14,
        category: 'Data Visualization',
        rank: 5,
        title: 'Interactive Chart & Dashboard Builder',
        price: 'Rp 3.100.000/mo',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
        alt: 'Data Visualization Tool'
    },
    {
        id: 15,
        category: 'Customer Support',
        rank: 6,
        title: 'AI Chatbot for Customer Service',
        price: 'Rp 2.750.000/mo',
        imageUrl: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2070&auto=format&fit=crop',
        alt: 'Customer Support Tool'
    },
];

const extensionItems = [
    {
        id: 20,
        category: 'Browser Extension',
        rank: 1,
        title: 'AI Content Summarizer & TL;DR Generator',
        price: 'Rp 350.000/mo',
        imageUrl: 'https://images.unsplash.com/photo-1580894732444-8ec136251b6c?q=80&w=2070&auto=format&fit=crop',
        alt: 'Browser Extension'
    },
    {
        id: 21,
        category: 'Browser Extension',
        rank: 2,
        title: 'Advanced Grammar & Style Checker',
        price: 'Rp 250.000/mo',
        imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973&auto=format&fit=crop',
        alt: 'Grammar Checker Extension'
    },
    {
        id: 22,
        category: 'Browser Extension',
        rank: 3,
        title: 'Secure Password Manager & Autofill',
        price: 'Rp 150.000/mo',
        imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
        alt: 'Password Manager Extension'
    },
];

const telebotItems = [
    {
        id: 23,
        category: 'Telegram Bot',
        rank: 1,
        title: 'Market News & Stock Alert Bot',
        price: 'Rp 500.000/mo',
        imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop',
        alt: 'Telegram Bot'
    },
    {
        id: 24,
        category: 'Telegram Bot',
        rank: 2,
        title: 'Personal Finance & Budgeting Bot',
        price: 'Rp 200.000/mo',
        imageUrl: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2070&auto=format&fit=crop',
        alt: 'Finance Bot'
    },
    {
        id: 25,
        category: 'Telegram Bot',
        rank: 3,
        title: 'Task & Reminder Automation Bot',
        price: 'Rp 180.000/mo',
        imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
        alt: 'Task Bot'
    },
];

const dataMap = {
    'tools': toolsItems,
    'extention': extensionItems,
    'telebot': telebotItems,
};

const DataCard = ({ item }: { item: any }) => (
    <div className="data-card">
        <Image src={item.imageUrl} alt={item.alt} width={400} height={180} className="data-card-image" />
        <div className="data-card-content">
            <div className="data-card-header">
                <span className="data-category">{item.category}</span>
                <span className="data-rank">Rank #{item.rank}</span>
            </div>
            <h2 className="data-title">{item.title}</h2>
            <div className="data-card-footer">
                <span className="data-price">{item.price}</span>
                <Link href={`/customer/xolvon-market/${item.id}`} className="details-button">
                    Details
                </Link>
            </div>
        </div>
    </div>
);

export default function XolvonMarketPage() {
    const [activeTab, setActiveTab] = useState('tools');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const getButtonClass = (tabName: string) => {
        return `tab-item ${activeTab === tabName ? 'active' : ''}`;
    };

    const currentData = dataMap[activeTab as keyof typeof dataMap];

    if (!isClient) {
        return null; 
    }

    return (
        <main className="main-content fade-in-on-load">
            <section>
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">XOLVON Market</h1>
                        <p className="mt-1 text-lg text-slate-500">Jelajahi dan dapatkan aset digital untuk mendorong inovasi Anda.</p>
                    </div>
                    <div className="dropdown-tabs">
                        <button onClick={() => setActiveTab('tools')} className={getButtonClass('tools')}>
                            Tools
                        </button>
                        <button onClick={() => setActiveTab('extention')} className={getButtonClass('extention')}>
                            Extention
                        </button>
                        <button onClick={() => setActiveTab('telebot')} className={getButtonClass('telebot')}>
                            Telebot
                        </button>
                    </div>
                </div>
                
                <div className="market-grid">
                    {currentData.map(item => (
                        <DataCard key={item.id} item={item} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-2xl font-semibold text-slate-500">More Soon</p>
                </div>
            </section>
        </main>
    );
}
