'use client';

import { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { InvoiceTemplate } from '@/components/InvoiceTemplate';
import { Plus, Printer, FileDown, Search, Filter, X, Trash2 } from 'lucide-react';
import { createInvoice } from '@/lib/actions';

export default function AdminInvoicesClient({ initialInvoices = [] }: { initialInvoices?: any[] }) {
    const componentRef = useRef<HTMLDivElement>(null);
    const [invoices, setInvoices] = useState(initialInvoices);
    const [isGenerating, setIsGenerating] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<any>(initialInvoices[0] || null);

    // Form State
    const [formData, setFormData] = useState({
        invoiceNumber: `INV/${new Date().getFullYear()}/${(invoices.length + 1).toString().padStart(3, '0')}`,
        customerName: '',
        customerAddress: '',
        customerContact: '',
        placeOfSupply: '',
        gstin: '',
        items: [{ productName: '', hsn: '', quantity: 1, rate: 0, unit: 'PRS', amount: 0 }]
    });

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `Invoice_${selectedInvoice?.invoiceNumber || 'New'}`,
    });

    const handleDownloadPDF = () => {
        setIsGenerating(true);
        setTimeout(() => {
            handlePrint();
            setIsGenerating(false);
        }, 800);
    };

    const addItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { productName: '', hsn: '', quantity: 1, rate: 0, unit: 'PRS', amount: 0 }]
        });
    };

    const removeItem = (index: number) => {
        const newItems = formData.items.filter((_, i) => i !== index);
        setFormData({ ...formData, items: newItems });
    };

    const updateItem = (index: number, field: string, value: string) => {
        const newItems = [...formData.items];
        let newValue: any = value;

        if (field === 'quantity') {
            newValue = parseInt(value) || 0;
        } else if (field === 'rate') {
            newValue = parseFloat(value) || 0;
        }

        newItems[index] = { ...newItems[index], [field]: newValue };
        newItems[index].amount = newItems[index].quantity * newItems[index].rate;
        setFormData({ ...formData, items: newItems });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const totalAmount = formData.items.reduce((sum, item) => sum + item.amount, 0);
        const newInvoice = await createInvoice({ ...formData, totalAmount });
        setInvoices([newInvoice, ...invoices]);
        setSelectedInvoice(newInvoice);
        setIsModalOpen(false);
    };

    const filteredInvoices = invoices.filter(inv =>
        inv.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 md:space-y-12 pb-24 text-navy">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end space-y-4 md:space-y-0 text-navy">
                <div className="space-y-2 text-navy">
                    <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">Invoice Management</h1>
                    <p className="text-sm text-gray-400">Generate, print and track your business sales.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full md:w-auto bg-navy text-white px-8 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-gold transition-all shadow-lg"
                >
                    <Plus className="w-4 h-4" />
                    <span>Create New Invoice</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* List */}
                <div className="lg:col-span-4 border border-gray-100 bg-white p-6 md:p-8 shadow-sm h-fit space-y-6">
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
                        {filteredInvoices.map(inv => (
                            <div
                                key={inv.id}
                                onClick={() => setSelectedInvoice(inv)}
                                className={`group p-4 border ${selectedInvoice?.id === inv.id ? 'border-gold bg-gold/5' : 'border-gray-50 bg-white'} hover:border-gold/30 cursor-pointer transition-all`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-black text-navy uppercase">{inv.invoiceNumber}</span>
                                    <span className="text-[9px] font-bold text-gray-400">{new Date(inv.date).toLocaleDateString()}</span>
                                </div>
                                <div className="text-xs font-bold text-navy uppercase mb-1">{inv.customerName}</div>
                                <div className="text-sm font-light text-gold italic">₹{inv.totalAmount.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Preview */}
                <div className="lg:col-span-8 space-y-6">
                    {selectedInvoice ? (
                        <>
                            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 border border-gray-100 shadow-sm space-y-4 md:space-y-0">
                                <div>
                                    <div className="text-xs font-black text-navy uppercase tracking-widest leading-none mb-1">Previewing</div>
                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{selectedInvoice.invoiceNumber}</div>
                                </div>
                                <div className="flex items-center space-x-3 w-full md:w-auto">
                                    <button
                                        onClick={handleDownloadPDF}
                                        disabled={isGenerating}
                                        className="flex-1 md:flex-initial flex items-center justify-center space-x-2 px-8 py-4 bg-navy text-white text-[10px] font-black uppercase tracking-widest hover:bg-gold transition-all shadow-md"
                                    >
                                        <FileDown className="w-4 h-4" />
                                        <span>Download PDF / Print (A4)</span>
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto bg-gray-100 p-4 md:p-12 rounded-lg border border-gray-200">
                                <div className="bg-white shadow-2xl mx-auto w-fit print-only">
                                    <InvoiceTemplate ref={componentRef} data={selectedInvoice} />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="bg-white border border-dashed border-gray-200 h-96 flex items-center justify-center">
                            <p className="text-gray-400 italic">Select an invoice to preview or create a new one.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white max-w-4xl w-full max-h-[90vh] shadow-2xl relative overflow-hidden flex flex-col">
                        <div className="bg-navy p-6 flex justify-between items-center text-white shrink-0">
                            <h2 className="font-black uppercase tracking-widest">Create New Tax Invoice</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-white/50 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest">Invoice Number</label>
                                    <input
                                        required
                                        value={formData.invoiceNumber}
                                        onChange={e => setFormData({ ...formData, invoiceNumber: e.target.value })}
                                        className="w-full p-4 bg-gray-50 border border-transparent focus:border-gold/30 focus:bg-white outline-none text-xs"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest">Customer Name</label>
                                    <input
                                        required
                                        placeholder="Firm Name"
                                        value={formData.customerName}
                                        onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                                        className="w-full p-4 bg-gray-50 border border-transparent focus:border-gold/30 focus:bg-white outline-none text-xs"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest">Billing Address</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={formData.customerAddress}
                                        onChange={e => setFormData({ ...formData, customerAddress: e.target.value })}
                                        className="w-full p-4 bg-gray-50 border border-transparent focus:border-gold/30 focus:bg-white outline-none text-xs resize-none"
                                    />
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest">Contact No.</label>
                                        <input
                                            required
                                            value={formData.customerContact}
                                            onChange={e => setFormData({ ...formData, customerContact: e.target.value })}
                                            className="w-full p-4 bg-gray-50 border border-transparent focus:border-gold/30 focus:bg-white outline-none text-xs"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest">GSTIN</label>
                                            <input
                                                value={formData.gstin}
                                                onChange={e => setFormData({ ...formData, gstin: e.target.value })}
                                                className="w-full p-4 bg-gray-50 border border-transparent focus:border-gold/30 focus:bg-white outline-none text-xs"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest">Place of Supply</label>
                                            <input
                                                value={formData.placeOfSupply}
                                                onChange={e => setFormData({ ...formData, placeOfSupply: e.target.value })}
                                                className="w-full p-4 bg-gray-50 border border-transparent focus:border-gold/30 focus:bg-white outline-none text-xs"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-navy pb-2">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest">Itemized List</h3>
                                    <button type="button" onClick={addItem} className="text-gold text-[10px] font-black uppercase tracking-widest hover:text-navy">+ Add Item</button>
                                </div>
                                {formData.items.map((item, index) => (
                                    <div key={index} className="grid grid-cols-12 gap-4 items-end">
                                        <div className="col-span-5 space-y-1">
                                            <input
                                                placeholder="Product Description"
                                                value={item.productName}
                                                required
                                                onChange={e => updateItem(index, 'productName', e.target.value)}
                                                className="w-full p-3 bg-gray-50 border border-transparent focus:border-gold/30 focus:bg-white outline-none text-xs"
                                            />
                                        </div>
                                        <div className="col-span-2 space-y-1">
                                            <input
                                                placeholder="HSN"
                                                value={item.hsn}
                                                onChange={e => updateItem(index, 'hsn', e.target.value)}
                                                className="w-full p-3 bg-gray-50 border border-transparent focus:border-gold/30 focus:bg-white outline-none text-xs"
                                            />
                                        </div>
                                        <div className="col-span-1 space-y-1">
                                            <input
                                                type="number"
                                                placeholder="Qty"
                                                value={item.quantity || ''}
                                                required
                                                onChange={e => updateItem(index, 'quantity', e.target.value)}
                                                className="w-full p-3 bg-gray-50 border border-transparent focus:border-gold/30 focus:bg-white outline-none text-xs"
                                            />
                                        </div>
                                        <div className="col-span-2 space-y-1">
                                            <div className="relative">
                                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-300">₹</span>
                                                <input
                                                    type="number"
                                                    placeholder="Rate"
                                                    value={item.rate || ''}
                                                    required
                                                    onChange={e => updateItem(index, 'rate', e.target.value)}
                                                    className="w-full pl-6 p-3 bg-gray-50 border border-transparent focus:border-gold/30 focus:bg-white outline-none text-xs"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-1 text-xs font-bold py-3 text-center">₹{item.amount}</div>
                                        <div className="col-span-1 py-1 flex justify-end">
                                            <button type="button" onClick={() => removeItem(index)} className="p-2 text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-gray-100 flex justify-end items-center space-x-8">
                                <div className="text-navy">
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Total Amount:</span>
                                    <span className="ml-2 text-xl font-black">₹{formData.items.reduce((sum, i) => sum + i.amount, 0).toLocaleString()}</span>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-navy text-white px-12 py-5 text-xs font-black uppercase tracking-[0.2em] hover:bg-gold transition-all shadow-xl"
                                >
                                    Confirm and Save Invoice
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
