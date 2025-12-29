'use client';

import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { InvoiceTemplate } from '@/components/InvoiceTemplate';
import { Plus, Printer, FileDown, Search } from 'lucide-react';

export default function InvoicesPage() {
    const componentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: 'Invoice',
    });

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
        <div className="space-y-12 pb-24">
            <div className="flex justify-between items-end">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-navy uppercase tracking-tight">Invoice Management</h1>
                    <p className="text-sm text-gray-400">Generate, print and track your business sales.</p>
                </div>
                <div className="flex space-x-4">
                    <button className="bg-navy text-white px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center space-x-2 hover:bg-gold transition-all">
                        <Plus className="w-4 h-4" />
                        <span>Create New Invoice</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Invoice List */}
                <div className="lg:col-span-1 border border-gray-100 bg-white p-8 shadow-sm h-fit">
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                        <input
                            type="text"
                            placeholder="Search Invoices..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-100 outline-none focus:border-gold text-xs font-medium"
                        />
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`p-4 border ${i === 1 ? 'border-gold bg-gold/5' : 'border-gray-50'} hover:border-gold/30 cursor-pointer transition-all`}>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-bold text-navy uppercase">INV/2025/00{i}</span>
                                    <span className="text-[9px] font-bold text-gray-400">29 Dec 2025</span>
                                </div>
                                <div className="text-xs font-bold text-navy uppercase mb-2">Zakki Distributors</div>
                                <div className="text-sm font-light">₹58,800.00</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Invoice Preview */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex justify-between items-center bg-white p-6 border border-gray-100 shadow-sm">
                        <div className="text-xs font-bold text-navy uppercase tracking-widest">Preview: {sampleData.invoiceNumber}</div>
                        <div className="flex space-x-4">
                            <button
                                onClick={handlePrint}
                                className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-navy hover:text-gold transition-colors"
                            >
                                <Printer className="w-4 h-4" />
                                <span>Print A4</span>
                            </button>
                            <button className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-navy hover:text-gold transition-colors">
                                <FileDown className="w-4 h-4" />
                                <span>Download PDF</span>
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto bg-gray-200 p-8 rounded-lg">
                        <InvoiceTemplate ref={componentRef} data={sampleData} />
                    </div>
                </div>
            </div>
        </div>
    );
}
