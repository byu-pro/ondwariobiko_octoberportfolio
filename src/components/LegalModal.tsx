import React from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
  type: 'terms' | 'privacy' | null;
  onClose: () => void;
}

export function LegalModal({ type, onClose }: LegalModalProps) {
  if (!type) return null;

  const isTerms = type === 'terms';

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div 
        className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-ink">Legal</p>
            <h2 className="font-display uppercase tracking-tight text-2xl sm:text-3xl font-extrabold text-white">
              {isTerms ? 'Terms of Service' : 'Privacy Policy'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full border border-neutral-800 hover:border-neon text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-ink/75 leading-relaxed font-sans">
          {isTerms ? (
            <>
              <div>
                <h3 className="font-display uppercase text-lg text-white mb-2">01. Overview</h3>
                <p>
                  These Terms of Service govern all design and development services provided by ondwariobiko ("I", "me", "my") to clients ("you", "the Client"). By engaging my services via this website, email, or messaging, you agree to these Terms.
                </p>
              </div>
              <div>
                <h3 className="font-display uppercase text-lg text-white mb-2">02. Services Provided</h3>
                <p>
                  I offer custom logo design, brand identity systems, mascot illustration, and website design & development services. The exact scope, deliverables, and timeline for each project are agreed upon in writing before work begins.
                </p>
              </div>
              <div>
                <h3 className="font-display uppercase text-lg text-white mb-2">03. Project Process & Revisions</h3>
                <p>
                  Projects typically begin with a discovery brief, followed by concept development, revisions, and final delivery. Each package includes agreed revision rounds. Additional revisions beyond scope will be quoted transparently.
                </p>
              </div>
              <div>
                <h3 className="font-display uppercase text-lg text-white mb-2">04. Ownership & Intellectual Property</h3>
                <p>
                  Upon final payment, full intellectual property and commercial rights for the approved deliverables are transferred to you. All source vector files (AI, EPS, SVG, PNG) are provided.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="font-display uppercase text-lg text-white mb-2">01. Information Collected</h3>
                <p>
                  I collect only the personal information you choose to provide (such as your name, email, and project details submitted through the contact or consultation forms).
                </p>
              </div>
              <div>
                <h3 className="font-display uppercase text-lg text-white mb-2">02. How Information Is Used</h3>
                <p>
                  Your information is used solely to respond to inquiries, scope design projects, and deliver agreed creative work. Your data is never sold, rented, or shared with third parties for marketing.
                </p>
              </div>
              <div>
                <h3 className="font-display uppercase text-lg text-white mb-2">03. Communications</h3>
                <p>
                  I communicate directly through official channels: ondwariobiko@gmail.com and WhatsApp (+254 702 255 575). You can request deletion of any project correspondence at any time.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-neon text-black font-mono text-xs uppercase tracking-wider font-semibold cursor-pointer hover:opacity-90 transition-opacity"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
