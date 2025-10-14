"use client";

import { useEffect, useState } from 'react';
import { 
    Bot, Plus, UserCheck, MessageCircle, Dribbble, UtensilsCrossed, Shirt, Leaf, 
    Gamepad2, Plane, TrendingUp, TrendingDown, Minus, CheckCircle 
} from 'lucide-react';
import './attention-boost.css';

// Komponen untuk membuat grafik sparkline kecil
const SparklineChart = () => {
    const [points, setPoints] = useState('0,20 100,20');
    
    useEffect(() => {
        let generatedPoints = '0,20 ';
        for (let i = 1; i <= 10; i++) {
            generatedPoints += `${i * 10},${Math.random() * 20 + 10} `;
        }
        generatedPoints += '100,20';
        setPoints(generatedPoints);
    }, []);

    return (
        <svg viewBox="0 0 100 40" className="w-24 h-10" preserveAspectRatio="none">
            <polyline fill="none" stroke="var(--text-tertiary)" strokeWidth="2" points={points} />
        </svg>
    );
};

export default function AttentionBoostPage() {
    const [activeTab, setActiveTab] = useState('ugc');
    const [tableData, setTableData] = useState<( { rank: number; category: string; trend: string; sentiment: number; } | undefined)[]>([]);

    const categories = [
        "Fashion & Beauty", "Food & Beverage", "Technology & Gadgets", "Gaming & Esports", 
        "Travel & Lifestyle", "Education & Learning", "Health & Fitness", "Finance & Investment",
        "Business & Entrepreneurship", "Entertainment & Media", "Sports & Outdoor", 
        "Automotive & Mobility", "Home & Living", "Environment & Sustainability", "Culture & Community"
    ];

    // Fungsi untuk menghasilkan data tabel secara acak
    const generateTableData = () => {
        const trendOptions = ['up', 'down', 'stagnant'];
        const data = categories.map((category, index) => {
            const trend = trendOptions[Math.floor(Math.random() * 3)];
            const sentiment = Math.random() * 100;
            return { rank: index + 1, category, trend, sentiment };
        }).sort(() => Math.random() - 0.5);
        setTableData(data);
    };

    // Efek untuk animasi fade-in saat scroll
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
        
        // Generate data tabel saat komponen pertama kali dimuat
        generateTableData();

        // Cleanup observer
        return () => observer.disconnect();
    }, []);

    const handleTabClick = (type:string) => {
        setActiveTab(type);
        // Generate data baru saat tab diganti
        generateTableData();
    };

    return (
        <div className="max-w-7xl mx-auto pt-10 pb-10">
            <h1 className="text-4xl font-bold text-[--text-primary]">Attention Boost</h1>
            <p className="mt-2 text-lg text-[--text-secondary]">Boost your content’s reach.</p>

            {/* Human + AI Insights Banner */}
            <div className="mt-10 fade-in-up bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg inline-flex items-center gap-2 text-white flex-shrink-0">
                        <Bot className="w-6 h-6" />
                        <Plus className="w-5 h-5 opacity-75" />
                        <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold">Human + AI Powered Insights</h2>
                            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 text-xs font-semibold rounded-full">
                                Hybrid Power
                            </div>
                        </div>
                        <p className="mt-1 text-[--text-secondary] text-sm">Your attention score is powered by AI analytics & real human clippers.</p>
                    </div>
                </div>
                <button className="bg-[--brand-primary] text-white font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Chat Now
                </button>
            </div>
            
            {/* Create Your Own Boost */}
            <div className="mt-8 fade-in-up bg-[--bg-secondary] border-2 border-dashed border-[--border-primary] rounded-2xl flex flex-col sm:flex-row items-center justify-between text-left p-6 transition hover:border-[--brand-primary] hover:bg-[--bg-tertiary] cursor-pointer">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-12 h-12 rounded-full bg-[--bg-tertiary] flex items-center justify-center flex-shrink-0">
                        <Plus className="w-6 h-6 text-[--brand-primary]" />
                    </div>
                    <div>
                        <p className="font-bold text-lg">Create Your Own Boost</p>
                        <p className="text-sm text-[--text-secondary]">Target a specific audience for your next campaign.</p>
                    </div>
                </div>
                <button className="mt-4 sm:mt-0 bg-[--brand-primary] text-white font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition w-full sm:w-auto flex-shrink-0">
                    Start Now
                </button>
            </div>

            {/* Featured Opportunities Section */}
            <div className="mt-12 fade-in-up">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {/* Card 1 */}
                    <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center"><Dribbble className="w-5 h-5 text-cyan-500" /></div>
                            <p className="font-semibold">Kategori: Sports</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-[--border-primary] space-y-2">
                            <div className="flex justify-between text-sm"><span className="text-[--text-secondary]">Potensi:</span> <span className="font-semibold">~1.2M Attention</span></div>
                            <div className="flex justify-between items-baseline"><span className="text-[--text-secondary] text-sm">Potensi Konversi:</span> <span className="font-bold text-lg text-[--text-primary]">4.2% - 6.9%</span></div>
                            <div className="flex justify-between items-baseline"><span className="text-[--text-secondary] text-sm">Harga Mulai:</span> <span className="font-bold text-lg text-[--brand-primary]">Rp 15jt</span></div>
                        </div>
                         <button className="mt-4 w-full bg-[--bg-tertiary] text-[--text-primary] font-semibold py-2 rounded-lg hover:bg-opacity-80 transition">Lihat Detail</button>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center"><UtensilsCrossed className="w-5 h-5 text-red-500" /></div>
                            <p className="font-semibold">Kategori: Kuliner</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-[--border-primary] space-y-2">
                            <div className="flex justify-between text-sm"><span className="text-[--text-secondary]">Potensi:</span> <span className="font-semibold">~800k Attention</span></div>
                            <div className="flex justify-between items-baseline"><span className="text-[--text-secondary] text-sm">Potensi Konversi:</span> <span className="font-bold text-lg text-[--text-primary]">4.5% - 7.8%</span></div>
                            <div className="flex justify-between items-baseline"><span className="text-[--text-secondary] text-sm">Harga Mulai:</span> <span className="font-bold text-lg text-[--brand-primary]">Rp 8.2jt</span></div>
                        </div>
                         <button className="mt-4 w-full bg-[--bg-tertiary] text-[--text-primary] font-semibold py-2 rounded-lg hover:bg-opacity-80 transition">Lihat Detail</button>
                    </div>
                     {/* Card 3 */}
                    <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center"><Shirt className="w-5 h-5 text-pink-500" /></div>
                            <p className="font-semibold">Kategori: Fashion</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-[--border-primary] space-y-2">
                            <div className="flex justify-between text-sm"><span className="text-[--text-secondary]">Potensi:</span> <span className="font-semibold">~1.5M Attention</span></div>
                            <div className="flex justify-between items-baseline"><span className="text-[--text-secondary] text-sm">Potensi Konversi:</span> <span className="font-bold text-lg text-[--text-primary]">3.2% - 6.5%</span></div>
                            <div className="flex justify-between items-baseline"><span className="text-[--text-secondary] text-sm">Harga Mulai:</span> <span className="font-bold text-lg text-[--brand-primary]">Rp 25.5jt</span></div>
                        </div>
                         <button className="mt-4 w-full bg-[--bg-tertiary] text-[--text-primary] font-semibold py-2 rounded-lg hover:bg-opacity-80 transition">Lihat Detail</button>
                    </div>
                     {/* Card 4 */}
                    <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center"><Leaf className="w-5 h-5 text-green-500" /></div>
                            <p className="font-semibold">Kategori: Kesehatan</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-[--border-primary] space-y-2">
                            <div className="flex justify-between text-sm"><span className="text-[--text-secondary]">Potensi:</span> <span className="font-semibold">~950k Attention</span></div>
                            <div className="flex justify-between items-baseline"><span className="text-[--text-secondary] text-sm">Potensi Konversi:</span> <span className="font-bold text-lg text-[--text-primary]">5.5% - 8.2%</span></div>
                            <div className="flex justify-between items-baseline"><span className="text-[--text-secondary] text-sm">Harga Mulai:</span> <span className="font-bold text-lg text-[--brand-primary]">Rp 1.8jt</span></div>
                        </div>
                         <button className="mt-4 w-full bg-[--bg-tertiary] text-[--text-primary] font-semibold py-2 rounded-lg hover:bg-opacity-80 transition">Lihat Detail</button>
                    </div>
                     {/* Card 5 */}
                    <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center"><Gamepad2 className="w-5 h-5 text-purple-500" /></div>
                            <p className="font-semibold">Kategori: Gaming</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-[--border-primary] space-y-2">
                            <div className="flex justify-between text-sm"><span className="text-[--text-secondary]">Potensi:</span> <span className="font-semibold">~2.1M Attention</span></div>
                            <div className="flex justify-between items-baseline"><span className="text-[--text-secondary] text-sm">Potensi Konversi:</span> <span className="font-bold text-lg text-[--text-primary]">4.0% - 7.1%</span></div>
                            <div className="flex justify-between items-baseline"><span className="text-[--text-secondary] text-sm">Harga Mulai:</span> <span className="font-bold text-lg text-[--brand-primary]">Rp 30jt</span></div>
                        </div>
                         <button className="mt-4 w-full bg-[--bg-tertiary] text-[--text-primary] font-semibold py-2 rounded-lg hover:bg-opacity-80 transition">Lihat Detail</button>
                    </div>
                     {/* Card 6 */}
                    <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center"><Plane className="w-5 h-5 text-orange-500" /></div>
                            <p className="font-semibold">Kategori: Travel</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-[--border-primary] space-y-2">
                            <div className="flex justify-between text-sm"><span className="text-[--text-secondary]">Potensi:</span> <span className="font-semibold">~1.8M Attention</span></div>
                            <div className="flex justify-between items-baseline"><span className="text-[--text-secondary] text-sm">Potensi Konversi:</span> <span className="font-bold text-lg text-[--text-primary]">3.5% - 6.8%</span></div>
                            <div className="flex justify-between items-baseline"><span className="text-[--text-secondary] text-sm">Harga Mulai:</span> <span className="font-bold text-lg text-[--brand-primary]">Rp 22jt</span></div>
                        </div>
                         <button className="mt-4 w-full bg-[--bg-tertiary] text-[--text-primary] font-semibold py-2 rounded-lg hover:bg-opacity-80 transition">Lihat Detail</button>
                    </div>
                </div>
            </div>

            <div className="mt-12 fade-in-up">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                     <div className="p-1 bg-[--bg-tertiary] rounded-lg inline-flex gap-1 self-start">
                        <button onClick={() => handleTabClick('ugc')} className={`boost-tab px-6 py-2 text-sm font-semibold rounded-md ${activeTab === 'ugc' ? 'active' : ''}`}>UGC</button>
                        <button onClick={() => handleTabClick('clipper')} className={`boost-tab px-6 py-2 text-sm font-semibold rounded-md ${activeTab === 'clipper' ? 'active' : ''}`}>Clipper</button>
                     </div>
                </div>

                 <div className="mt-4 bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6 overflow-x-auto">
                    <table className="w-full text-left min-w-[700px]">
                        <thead>
                            <tr className="border-b border-[--border-primary]">
                                <th className="p-4 text-sm font-semibold text-[--text-secondary] w-[5%]">Trend</th>
                                <th className="p-4 text-sm font-semibold text-[--text-secondary] w-[5%]">Rank</th>
                                <th className="p-4 text-sm font-semibold text-[--text-secondary] w-[40%]">Category</th>
                                <th className="p-4 text-sm font-semibold text-[--text-secondary] w-[25%]">Sentiment</th>
                                <th className="p-4 text-sm font-semibold text-[--text-secondary] w-[25%]">History</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((item, index) => (
                                item && (
                                <tr key={index} className="border-b border-[--border-primary] last:border-0">
                                    <td className="p-4">
                                        {item.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-500" />}
                                        {item.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-500" />}
                                        {item.trend === 'stagnant' && <Minus className="w-5 h-5 text-gray-400" />}
                                    </td>
                                    <td className="p-4 font-bold text-lg text-[--text-secondary]">{index + 1}</td>
                                    <td className="p-4 font-semibold">{item.category}</td>
                                    <td className="p-4">
                                        <div className="sentiment-bar">
                                            <div className="sentiment-positive" style={{ width: `${item.sentiment}%` }}></div>
                                            <div className="sentiment-negative" style={{ width: `${100 - item.sentiment}%` }}></div>
                                        </div>
                                    </td>
                                    <td className="p-4"><SparklineChart /></td>
                                </tr>
                                )
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Section Tambahan */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-3">
                    <div className="fade-in-up bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6 h-full">
                        <h3 className="text-xl font-bold mb-4">Clipper Potential Attention</h3>
                        <div className="space-y-3">
                            <div className="bg-[--bg-tertiary] dark:bg-slate-700/50 border border-[--border-primary] rounded-lg p-4 flex justify-between items-center transition hover:border-[--brand-primary]">
                                <p className="font-semibold">Lifestyle & Tech</p>
                                <div className="text-right">
                                    <p className="font-semibold text-sm">125 clippers available</p>
                                    <p className="text-xs text-[--text-secondary]">est. reach 1.2M views</p>
                                </div>
                            </div>
                            <div className="bg-[--bg-tertiary] dark:bg-slate-700/50 border border-[--border-primary] rounded-lg p-4 flex justify-between items-center transition hover:border-[--brand-primary]">
                                <p className="font-semibold">Gaming & Esports</p>
                                <div className="text-right">
                                    <p className="font-semibold text-sm">250 clippers available</p>
                                    <p className="text-xs text-[--text-secondary]">est. reach 2.5M views</p>
                                </div>
                            </div>
                            <div className="bg-[--bg-tertiary] dark:bg-slate-700/50 border border-[--border-primary] rounded-lg p-4 flex justify-between items-center transition hover:border-[--brand-primary]">
                                <p className="font-semibold">Food & Beverage</p>
                                <div className="text-right">
                                    <p className="font-semibold text-sm">180 clippers available</p>
                                    <p className="text-xs text-[--text-secondary]">est. reach 1.9M views</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2">
                    <div className="fade-in-up bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6 h-full">
                        <h3 className="text-xl font-bold">Estimated Boost</h3>
                        <div className="flex items-center gap-4 mt-3">
                            <TrendingUp className="w-10 h-10 text-green-500" />
                            <p className="text-4xl font-bold text-green-500">+35%</p>
                            <p className="text-[--text-secondary] self-end pb-1">engagement potential</p>
                        </div>
                        <div className="w-full bg-[--bg-tertiary] rounded-full h-2.5 mt-2">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                        </div>

                        <hr className="border-[--border-primary] my-6" />

                        <h3 className="text-xl font-bold">Recent Success</h3>
                        <div className="mt-4 space-y-4">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <p className="text-sm text-[--text-secondary]"><span className="font-semibold text-[--text-primary]">UGC Food campaign</span> last week gained +42% reach.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <p className="text-sm text-[--text-secondary]"><span className="font-semibold text-[--text-primary]">Clipper in Gaming</span> got 200K extra views.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="mt-8 fade-in-up bg-blue-600 rounded-2xl p-8 text-center text-white">
                <h3 className="text-2xl font-bold">Ready to Amplify Your Reach?</h3>
                <p className="mt-2 text-blue-200">Submit your job and let our network of creators and clippers work for you.</p>
                <button className="mt-6 bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-opacity-90 transition transform hover:scale-105">
                    Start Boosting Now
                </button>
            </div>
        </div>
    );
}
