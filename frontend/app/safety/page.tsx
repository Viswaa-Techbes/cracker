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
} from 'lucide-react';

export const metadata = {
  title: 'Safety Guidelines & Legal Compliance | Sparkle Crackers Sivakasi',
  description:
    'Dedicated pyrotechnic safety, transport regulations, PESO compliance, and offline purchase terms for fireworks.',
};

export default function SafetyPage() {
  return (
    <div className="py-14 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-700" />
            <span>Statutory Compliance & Fireworks Safety</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Safety & Legal Regulations
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Please read our essential safety guidelines, transport limitations, and offline ordering policies before purchasing or handling any pyrotechnic fireworks products.
          </p>
        </div>

        {/* Primary Legal Disclosures Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-base font-extrabold text-slate-900">
                1. Petroleum and Explosives Safety Organization (PESO) Compliance
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                All fireworks catalogued on this website are manufactured in strict compliance with
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
            <div className="space-y-2">
              <h2 className="text-base font-extrabold text-slate-900">
                2. Regional Transport & Service Areas
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pyrotechnics are classified as hazardous cargo and cannot be dispatched through standard
                postal or general courier services. Deliveries are exclusively routed through authorized
                licensed explosive transport carriers to certified regional drop points. Customers in
                unserviced postal codes may opt for store pickup at our Sivakasi facility.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-base font-extrabold text-slate-900">
                3. Age Restriction & Verification
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The minimum legal age for purchasing and receiving fireworks is <strong>18 years</strong>.
                Minors must strictly handle sparklers and flower pots only under direct adult supervision.
              </p>
            </div>
          </div>
        </div>

        {/* Dos and Don'ts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Recommended Dos */}
          <div className="bg-emerald-50/60 rounded-3xl border border-emerald-200 p-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm uppercase tracking-wider">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Recommended Safety Dos</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
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
          <div className="bg-rose-50/60 rounded-3xl border border-rose-200 p-6 space-y-4">
            <div className="flex items-center gap-2 text-rose-800 font-extrabold text-sm uppercase tracking-wider">
              <XCircle className="w-5 h-5 text-rose-600" />
              <span>Critical Don'ts</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
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
            Have Questions Regarding Regional Delivery?
          </h3>
          <p className="text-xs text-slate-500 max-w-lg mx-auto">
            Contact our Sivakasi logistics desk directly to check licensed carrier routes in your district.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Helpline: +91 98765 43210</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-100 text-slate-800 font-bold text-xs hover:bg-slate-200 transition-colors"
            >
              <span>Contact Page</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
