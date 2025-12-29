'use client';

import React from 'react';
import { format } from 'date-fns';

interface InvoiceItem {
    productName: string;
    hsn: string;
    quantity: number;
    rate: number;
    unit: string;
}

interface InvoiceData {
    invoiceNumber: string;
    date: Date;
    customerName: string;
    customerAddress: string;
    customerContact: string;
    placeOfSupply: string;
    gstin: string;
    items: InvoiceItem[];
    bankDetails: {
        name: string;
        accountNo: string;
        ifsc: string;
        branch: string;
    };
}

export const InvoiceTemplate = React.forwardRef<HTMLDivElement, { data: InvoiceData }>((props, ref) => {
    const { data } = props;
    const subtotal = data.items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);
    const igst = subtotal * 0.18; // Example GST calculation
    const total = subtotal + igst;

    return (
        <div ref={ref} className="bg-white p-[1in] w-[8.27in] min-h-[11.69in] mx-auto text-navy shadow-lg print:shadow-none print:m-0">
            {/* Header */}
            <div className="flex justify-between items-start border-b-2 border-navy pb-8 mb-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-black uppercase tracking-tighter">Usama<span className="text-gold">&</span>Co</h1>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Premium Trading Solutions</p>
                    <div className="text-[10px] space-y-1 pt-4 font-medium uppercase text-gray-400">
                        <p>123 Business Avenue, Leather Market</p>
                        <p>Agra, Uttar Pradesh - 282001</p>
                        <p>GSTIN: 09XXXXXXXXXXXXZ1</p>
                    </div>
                </div>
                <div className="text-right space-y-4">
                    <h2 className="text-2xl font-bold uppercase tracking-widest italic text-gold">Tax Invoice</h2>
                    <div className="text-[10px] font-bold uppercase tracking-wider space-y-1">
                        <p><span className="text-gray-400">Invoice No:</span> {data.invoiceNumber}</p>
                        <p><span className="text-gray-400">Date:</span> {format(data.date, 'dd-MMM-yyyy')}</p>
                    </div>
                </div>
            </div>

            {/* Addresses */}
            <div className="grid grid-cols-2 gap-12 mb-12">
                <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-gray-100 pb-2">Bill To</h3>
                    <div className="text-xs space-y-2">
                        <p className="font-bold text-sm uppercase">{data.customerName}</p>
                        <p className="text-gray-500 whitespace-pre-line">{data.customerAddress}</p>
                        <p className="font-medium">Contact: {data.customerContact}</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-gray-100 pb-2">Details</h3>
                    <div className="text-xs space-y-2 uppercase font-bold text-gray-500">
                        <p>Place of Supply: <span className="text-navy">{data.placeOfSupply}</span></p>
                        <p>Customer GSTIN: <span className="text-navy">{data.gstin}</span></p>
                    </div>
                </div>
            </div>

            {/* Items Table */}
            <table className="w-full text-left border-collapse mb-12">
                <thead>
                    <tr className="bg-navy text-white text-[10px] font-bold uppercase tracking-widest">
                        <th className="p-3 border border-navy">S.No</th>
                        <th className="p-3 border border-navy w-1/3">Description of Goods</th>
                        <th className="p-3 border border-navy">HSN</th>
                        <th className="p-3 border border-navy">Qty</th>
                        <th className="p-3 border border-navy">Unit</th>
                        <th className="p-3 border border-navy">Rate</th>
                        <th className="p-3 border border-navy text-right">Amount</th>
                    </tr>
                </thead>
                <tbody className="text-[10px] font-bold uppercase">
                    {data.items.map((item, i) => (
                        <tr key={i} className="border-b border-gray-100 italic">
                            <td className="p-3 border-x border-gray-100">{i + 1}</td>
                            <td className="p-3 border-x border-gray-100">{item.productName}</td>
                            <td className="p-3 border-x border-gray-100 text-gray-400">{item.hsn}</td>
                            <td className="p-3 border-x border-gray-100">{item.quantity}</td>
                            <td className="p-3 border-x border-gray-100">{item.unit}</td>
                            <td className="p-3 border-x border-gray-100">₹{item.rate.toFixed(2)}</td>
                            <td className="p-3 border-x border-gray-100 text-right">₹{(item.quantity * item.rate).toFixed(2)}</td>
                        </tr>
                    ))}
                    {/* Empty rows to maintain height */}
                    {[...Array(Math.max(0, 8 - data.items.length))].map((_, i) => (
                        <tr key={`empty-${i}`} className="h-8 border-b border-white bg-gray-50/10">
                            <td className="p-3 border-x border-white"></td>
                            <td className="p-3 border-x border-white"></td>
                            <td className="p-3 border-x border-white"></td>
                            <td className="p-3 border-x border-white"></td>
                            <td className="p-3 border-x border-white"></td>
                            <td className="p-3 border-x border-white"></td>
                            <td className="p-3 border-x border-white text-right"></td>
                        </tr>
                    ))}
                </tbody>
                <tfoot className="text-[10px] font-bold uppercase">
                    <tr>
                        <td colSpan={5} className="p-3 border-t-2 border-navy text-right">Subtotal</td>
                        <td colSpan={2} className="p-3 border-t-2 border-navy text-right">₹{subtotal.toFixed(2)}</td>
                    </tr>
                    <tr className="text-gray-400">
                        <td colSpan={5} className="p-3 text-right">IGST (18%)</td>
                        <td colSpan={2} className="p-3 text-right">₹{igst.toFixed(2)}</td>
                    </tr>
                    <tr className="bg-navy text-white text-sm">
                        <td colSpan={5} className="p-4 text-right">Grand Total</td>
                        <td colSpan={2} className="p-4 text-right text-lg">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    </tr>
                </tfoot>
            </table>

            {/* Footer Info */}
            <div className="grid grid-cols-2 gap-12 mt-auto">
                <div className="space-y-4">
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-gold">Bank Details</h4>
                    <div className="text-[9px] font-bold space-y-1 text-gray-500 uppercase">
                        <p>Bank: <span className="text-navy">{data.bankDetails.name}</span></p>
                        <p>A/C No: <span className="text-navy">{data.bankDetails.accountNo}</span></p>
                        <p>IFSC: <span className="text-navy">{data.bankDetails.ifsc}</span></p>
                        <p>Branch: <span className="text-navy">{data.bankDetails.branch}</span></p>
                    </div>
                    <div className="pt-6 border-t border-gray-100 flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-50 border border-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-300">UPI QR</div>
                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">Scan to pay directly<br />via Any UPI App</p>
                    </div>
                </div>
                <div className="flex flex-col items-end justify-between text-right">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest">For Usama & Co</p>
                        <div className="h-16 w-32 border-b border-navy flex items-end justify-center">
                            <span className="text-[8px] italic text-gray-300">Authorized Signatory</span>
                        </div>
                    </div>
                    <p className="text-[8px] font-bold text-gray-300 uppercase tracking-widest italic pt-8">This is a computer generated invoice</p>
                </div>
            </div>
        </div>
    );
});

InvoiceTemplate.displayName = 'InvoiceTemplate';
