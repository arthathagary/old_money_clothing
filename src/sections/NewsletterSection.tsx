import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [preference, setPreference] = useState<'Both' | 'Gentlemen' | 'Ladies'>(
    'Both'
  );
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="newsletter" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-heritage-green text-ivory border border-champagne/40 p-8 sm:p-14 lg:p-16 overflow-hidden shadow-luxury-dark">
          {/* Decorative Ambient Gold Ring */}
          <div className="pointer-events-none absolute -right-24 -bottom-24 w-96 h-96 rounded-full border border-champagne/20" />
          <div className="pointer-events-none absolute -right-12 -bottom-12 w-72 h-72 rounded-full border border-champagne/15" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian/40 border border-champagne/30 text-[11px] font-mono uppercase tracking-[0.25em] text-champagne mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>03 / Private Salon Dispatch</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl leading-tight">
              Receive Private Drop Keys Before Public Release.
            </h2>

            <p className="mt-4 text-sm sm:text-base text-ivory/80 leading-relaxed">
              Our numbered batches of 310 GSM Supima tees and Belgian Gurkha
              trousers frequently allocate within 48 hours. Join the Private
              Register for early access and complimentary monogramming privileges
              (use code <span className="font-mono text-champagne">OLDMONEY10</span>).
            </p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-5 rounded-2xl bg-obsidian/55 border border-champagne/50 flex items-center gap-4"
                >
                  <CheckCircle2 className="w-7 h-7 text-champagne shrink-0" />
                  <div>
                    <h4 className="font-serif text-xl text-champagne">
                      Welcome to the Private Register
                    </h4>
                    <p className="text-xs font-mono text-ivory/80 mt-0.5">
                      Dispatches for {preference} editions will be sent to{' '}
                      <span className="underline">{email}</span>.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-4"
                >
                  {/* Edition Preference Pills */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-ivory/70 mr-2">
                      Tailoring Preference:
                    </span>
                    {(['Both', 'Gentlemen', 'Ladies'] as const).map((pref) => (
                      <button
                        key={pref}
                        type="button"
                        onClick={() => setPreference(pref)}
                        className={`px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider border transition ${
                          preference === pref
                            ? 'bg-champagne text-obsidian border-champagne font-semibold'
                            : 'border-ivory/25 text-ivory/80 hover:border-champagne'
                        }`}
                      >
                        {pref}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your private email address..."
                      className="flex-1 px-5 py-4 rounded-xl bg-obsidian/60 border border-ivory/20 text-ivory placeholder:text-ivory/50 text-sm focus:outline-none focus:border-champagne"
                    />
                    <button
                      type="submit"
                      className="px-7 py-4 rounded-xl bg-champagne text-obsidian hover:bg-champagne-light font-mono text-xs uppercase tracking-[0.22em] font-semibold flex items-center justify-center gap-2 shadow-gold-glow transition"
                    >
                      <span>Request Access</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
