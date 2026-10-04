import React from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  AlertTriangle,
  Flame,
  CheckCircle2,
  XCircle,
  Truck,
  PhoneCall,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { STORE_CONTACT } from '@/lib/catalogueData';

export const metadata = {
  title: 'Safety Guidelines & Legal Compliance | Sri Sai Traders Sivakasi',
  description:
    'Dedicated pyrotechnic safety, transport regulations, PESO compliance, and offline purchase terms for fireworks.',
};

export default function SafetyPage() {
  return (
    <div className="py-10 sm:py-14 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#D32F2F] transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-slate-900 font-bold">Safety & Legal</span>
        </nav>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#D32F2F] text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-[#D32F2F]" />
            <span>Statutory Compliance & Safety First</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Safety & Legal Regulations
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Please read our essential safety guidelines, transport limitations, and offline ordering policies before purchasing or handling any pyrotechnic fireworks products.
          </p>
        </div>

        {/* Primary Legal Disclosures Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-base font-extrabold text-slate-900">
                1. Petroleum and Explosives Safety Organization (PESO) Compliance
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                All fireworks catalogued by Sri Sai Traders are manufactured in strict compliance with
                the safety standards and chemical formulations approved by the Ministry of Commerce &
                Industry and PESO. We do not sell or deliver banned chemical formulations (such as barium-based
                sound fireworks where prohibited by state or court orders).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-700 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-base font-extrabold text-slate-900">
                2. Regional Transport & Service Areas
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Pyrotechnics are classified as hazardous cargo and cannot be dispatched through standard
                postal or general courier services. Deliveries are exclusively routed through authorized
                licensed explosive transport carriers to certified regional drop points. Customers in
                unserviced postal codes may opt for store pickup at our Kagganur depot.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-base font-extrabold text-slate-900">
                3. Age Restriction & Verification
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                The minimum legal age for purchasing and receiving fireworks is <strong>18 years</strong>.
                Minors must strictly handle sparklers and flower pots only under direct adult supervision.
              </p>
            </div>
          </div>
        </div>

        {/* Dos and Don'ts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Recommended Dos */}
          <div className="bg-emerald-50/70 rounded-3xl border border-emerald-200 p-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-900 font-black text-sm uppercase tracking-wider">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Recommended Safety Dos</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 leading-relaxed font-medium">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Always light crackers in open outdoor grounds, away from houses and dry foliage.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Keep two buckets of water or sand immediately accessible at all times.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Wear snug cotton clothes while bursting crackers; avoid loose synthetic fabrics.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Use an agarbatti (incense stick) or sparkler to light fireworks from an arm’s length.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Store unused fireworks in a cool, dry place inside a closed cardboard or metal container.</span>
              </li>
            </ul>
          </div>

          {/* Critical Don'ts */}
          <div className="bg-rose-50/70 rounded-3xl border border-rose-200 p-6 space-y-4">
            <div className="flex items-center gap-2 text-rose-900 font-black text-sm uppercase tracking-wider">
              <XCircle className="w-5 h-5 text-rose-600" />
              <span>Critical Don&apos;ts</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 leading-relaxed font-medium">
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>NEVER light fireworks inside houses, corridors, balconies, or near parked vehicles.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>NEVER attempt to re-ignite a dud or misfired cracker. Pour water over it and discard.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>NEVER burst crackers in your hand or throw lit fireworks towards persons or animals.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>NEVER ignite rockets towards windows or overhead power cables.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>NEVER store fireworks near kitchens, gas stoves, electrical panels, or matches.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Contact and Help */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm text-center space-y-4">
          <h3 className="text-lg font-black text-slate-900">
            Have Questions Regarding Regional Delivery or Bulk Safety?
          </h3>
          <p className="text-xs text-slate-500 max-w-lg mx-auto font-medium">
            Contact our Kagganur logistics desk directly to check licensed carrier routes in your district.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={`tel:${STORE_CONTACT.phones[0]}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#D32F2F] text-white font-bold text-xs hover:bg-[#B71C1C] transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Helpline: {STORE_CONTACT.phones[0]}</span>
            </a>
            <a
              href={`https://wa.me/${STORE_CONTACT.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] text-white font-bold text-xs hover:bg-[#1EBE5D] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
