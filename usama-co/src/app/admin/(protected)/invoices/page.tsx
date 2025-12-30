'use client';

import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { InvoiceTemplate } from '@/components/InvoiceTemplate';
import { Plus, Printer, FileDown, Search, Filter, MoreVertical } from 'lucide-react';

export default function InvoicesPage() {
    const componentRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: 'Invoice',
    });

    const handleDownloadPDF = () => {
        setIsGenerating(true);
        // Simulate PDF generation
        setTimeout(() => {
            handlePrint();
            setIsGenerating(false);
        }, 1000);
    };

    // Sample data for demonstration
    const sampleData = {
        invoiceNumber: 'INV/2025/001',
        date: new Date(),
        customerName: 'ZAKKI DISTRIBUTORS',
        customerAddress: '45 Trade Center, Civil Lines, Agra, UP',
        customerContact: '+91 99999 99999',
        placeOfSupply: 'Uttar Pradesh (09)',
        gstin: '09AABCU1234F1Z1',
        items: [
            { productName: 'Premium Leather Oxfords (Brown)', hsn: '6403', quantity: 24, rate: 1850, unit: 'PRS' },
            { productName: 'Luxury Leather Tote Bag', hsn: '4202', quantity: 12, rate: 1200, unit: 'Nos' },
        ],
        bankDetails: {
            name: 'ICICI Bank',
            accountNo: 'XXXXXXXXXXXXXX',
            ifsc: 'ICIC000XXXX',
            branch: 'Main Branch, Agra'
        }
    };

    return (
        <div className="space-y-8 md:space-y-12 pb-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end space-y-4 md:space-y-0">
                <div className="space-y-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-navy uppercase tracking-tight">Invoice Management</h1>
                    <p className="text-sm text-gray-400">Generate, print and track your business sales.</p>
                </div>
                <button
                    onClick={() => alert("New Invoice Form functionality would trigger here.")}
                    className="w-full md:w-auto bg-navy text-white px-8 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-gold transition-all shadow-lg"
                >
                    <Plus className="w-4 h-4" />
                    <span>Create New Invoice</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Invoice List */}
                <div className="lg:col-span-4 border border-gray-100 bg-white p-6 md:p-8 shadow-sm h-fit space-y-6">
                    <div className="flex items-center justify-between uppercase tracking-widest text-[10px] font-black text-navy border-b border-gray-50 pb-4">
                        <span>Recent Transactions</span>
                        <Filter className="w-3.5 h-3.5 text-gray-300" />
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                        <input
                            type="text"
                            placeholder="Find invoice..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent outline-none focus:border-gold/30 focus:bg-white text-xs font-medium transition-all"
                        />
                    </div>
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`group p-4 border ${i === 1 ? 'border-gold bg-gold/5' : 'border-gray-50 bg-white'} hover:border-gold/30 cursor-pointer transition-all relative overflow-hidden`}>
                                {i === 1 && <div className="absolute top-0 right-0 w-8 h-8 bg-gold text-white flex items-center justify-center -rotate-45 translate-x-4 -translate-y-4"><span className="rotate-45 text-[8px] font-black mt-4">NEW</span></div>}
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-black text-navy uppercase">INV/2025/00{i}</span>
                                    <span className="text-[9px] font-bold text-gray-400">29 Dec 2025</span>
                                </div>
                                <div className="text-xs font-bold text-navy uppercase mb-1">Zakki Distributors</div>
                                <div className="flex justify-between items-end">
                                    <div className="text-sm font-light text-gold italic">₹58,800.00</div>
                                    <span className="text-[8px] font-black uppercase text-green-500 bg-green-50 px-1">Paid</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-navy/40 hover:text-navy transition-colors border-t border-gray-50">
                        View History
                    </button>
                </div>

                {/* Invoice Preview */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 border border-gray-100 shadow-sm space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gold/10 text-gold flex items-center justify-center rounded-sm">
                                <FileDown className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-xs font-black text-navy uppercase tracking-widest leading-none mb-1">Previewing</div>
                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{sampleData.invoiceNumber}</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 w-full md:w-auto">
                            <button
                                onClick={handlePrint}
                                className="flex-1 md:flex-initial flex items-center justify-center space-x-2 px-6 py-3 bg-gray-50 text-[10px] font-black uppercase tracking-widest text-navy hover:bg-navy hover:text-white transition-all border border-transparent"
                            >
                                <Printer className="w-4 h-4" />
                                <span>Print A4</span>
                            </button>
                            <button
                                onClick={handleDownloadPDF}
                                disabled={isGenerating}
                                className="flex-1 md:flex-initial flex items-center justify-center space-x-2 px-6 py-3 bg-gold text-white text-[10px] font-black uppercase tracking-widest hover:bg-gold-dark transition-all shadow-md disabled:opacity-50"
                            >
                                {isGenerating ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                                        <span>Exporting...</span>
                                    </>
                                ) : (
                                    <>
                                        <FileDown className="w-4 h-4" />
                                        <span>Download PDF</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto bg-gray-100 p-4 md:p-12 rounded-lg border border-gray-200">
                        <div className="bg-white shadow-2xl mx-auto max-w-[800px]">
                            <InvoiceTemplate ref={componentRef} data={sampleData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
