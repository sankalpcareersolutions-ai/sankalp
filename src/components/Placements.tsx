import React, { useState } from "react";
import { Internship } from "../types";
import { Search, ShieldAlert, BadgeCheck, FileText, CheckCircle, Navigation, MapPin, DollarSign, Calendar, SlidersHorizontal, Key, Send, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PlacementsProps {
  internships: Internship[];
  onApplyInternship: (id: string) => void;
  appliedJobs: Internship[];
}

export default function Placements({ internships, onApplyInternship, appliedJobs }: PlacementsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrg, setSelectedOrg] = useState<string>("All");
  const [showClearanceModalId, setShowClearanceModalId] = useState<string | null>(null);

  // Profile data states for "Tactical Clearance Verification"
  const [profileName, setProfileName] = useState("");
  const [profileGpa, setProfileGpa] = useState("");
  const [securityClearanceCleared, setSecurityClearanceCleared] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [validationError, setValidationError] = useState("");

  const organizations = ["All", "DRDO", "BARC", "ISRO", "Border Security Force", "DGQA"];

  const filteredInternships = internships.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keySkills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesOrg = selectedOrg === "All" || item.organization === selectedOrg;

    return matchesSearch && matchesOrg;
  });

  const handleOpenClearanceModal = (id: string) => {
    setShowClearanceModalId(id);
    setValidationError("");
  };

  const handleConfirmClearance = (id: string) => {
    if (!profileName.trim()) {
      setValidationError("Full Name on government credentials is required.");
      return;
    }
    if (!profileGpa || Number(profileGpa) < 55) {
      setValidationError("Minimum 55% academic performance metric is strictly mandatory.");
      return;
    }
    if (!securityClearanceCleared) {
      setValidationError("You must verify your Indian Citizenship background.");
      return;
    }
    if (!termsAgreed) {
      setValidationError("Agreeing to security declarations is required.");
      return;
    }

    onApplyInternship(id);
    setShowClearanceModalId(null);
    // Reset fields
    setProfileName("");
    setProfileGpa("");
    setSecurityClearanceCleared(false);
    setTermsAgreed(false);
    setValidationError("");
  };

  return (
    <div className="space-y-8" id="placements_tab_root">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#1c251d] to-[#3b4c3c] rounded-2xl p-8 border border-emerald-800/10 text-stone-105 shadow relative overflow-hidden" id="placements_banner">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="text-[10px] font-mono tracking-widest text-[#c5a059] uppercase bg-[#c5a059]/10 px-2.5 py-0.5 rounded border border-[#c5a059]/30 font-bold">
            Sovereign Placement Exchange
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold font-sans text-stone-100 uppercase tracking-tight">
            Apply To Trainee & Research Roles
          </h1>
          <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-sans">
            Bridge your academic study with deep technical operations. Secure Junior Fellowships and
            project trainee openings across localized military clusters, manufacturing chambers, and launch fields.
          </p>
        </div>
      </div>

      {/* Placement Controls Panel */}
      <div className="bg-white p-6 rounded-xl border border-stone-200/85 shadow-sm space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between gap-4" id="placements_filters">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
          <input
            id="internship_search_bar"
            type="text"
            placeholder="Search roles by key skills/tools (GATE, RF, etc)..."
            className="w-full pl-10 pr-4 py-2 text-stone-700 bg-stone-50 border border-stone-210 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-850 cursor-text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-xs font-mono font-bold text-stone-400 uppercase mr-1">Lab/Wing:</span>
          {organizations.map((org) => (
            <button
              id={`org_filter_btn_${org.replace(/\s+/g, '_')}`}
              key={org}
              onClick={() => setSelectedOrg(org)}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition cursor-pointer ${
                selectedOrg === org
                  ? "bg-emerald-800 text-stone-100 border border-emerald-750"
                  : "bg-stone-50 hover:bg-stone-100 text-stone-600 border border-stone-200"
              }`}
            >
              {org}
            </button>
          ))}
        </div>
      </div>

      {/* Internships List */}
      <div className="space-y-6" id="internships_grid_row">
        {filteredInternships.length > 0 ? (
          filteredInternships.map((job) => {
            const hasApplied = appliedJobs.some((item) => item.id === job.id);

            return (
              <motion.div
                id={`internship_block_${job.id}`}
                key={job.id}
                className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:border-emerald-800/25 transition flex flex-col lg:flex-row lg:items-start justify-between gap-6"
              >
                <div className="space-y-4 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-normal bg-emerald-50 text-emerald-850 border border-emerald-100 px-3 py-1 rounded font-mono font-bold">
                      {job.organization}
                    </span>
                    <span className="text-xs font-sans font-medium text-stone-500">
                      {job.type}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-stone-900 text-base font-sans">{job.title}</h3>
                    <div className="flex flex-wrap text-xs text-stone-500 gap-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-800" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1 font-mono font-semibold text-emerald-800">
                        💰 Stipend: {job.stipend}
                      </span>
                      <span className="flex items-center gap-1 text-red-600 font-mono font-semibold">
                        <Calendar className="w-3.5 h-3.5" /> Deadline: {job.deadline}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {job.description}
                  </p>

                  <div className="space-y-1 bg-stone-50 p-3 rounded-lg border border-stone-150">
                    <span className="text-[10px] font-mono font-extrabold uppercase text-stone-400 block">Eligibility Gate:</span>
                    <p className="text-[11px] text-stone-700 leading-normal font-sans">
                      {job.eligibility}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.keySkills.map((sk, skIdx) => (
                      <span
                        key={skIdx}
                        className="text-[10px] font-mono bg-[#f0f4ef] text-emerald-950 border border-emerald-100/60 px-2 py-0.5 rounded"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:w-48 text-left lg:text-right flex lg:flex-col justify-between lg:justify-center items-center lg:items-end gap-3 flex-shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-dashed border-stone-200">
                  <div className="text-left lg:text-right hidden sm:block">
                    <p className="text-[9px] font-mono text-stone-400 uppercase font-semibold">Security Clearance</p>
                    <p className="text-xs font-bold text-stone-700 font-sans">Level-3 Audit Required</p>
                  </div>

                  {hasApplied ? (
                    <span className="px-5 py-2.5 bg-emerald-50 text-emerald-850 font-bold border border-emerald-250/50 rounded-lg text-xs flex items-center justify-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-800" /> Screening Underway
                    </span>
                  ) : (
                    <button
                      id={`apply_btn_act_${job.id}`}
                      onClick={() => handleOpenClearanceModal(job.id)}
                      className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-950 text-stone-105 rounded-xl text-xs font-sans font-bold flex items-center justify-center gap-1 transition-transform active:scale-[0.98] cursor-pointer shadow-sm w-full lg:w-auto"
                    >
                      Verify Eligibility & Apply
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="bg-stone-50 rounded-2xl py-12 text-center border-2 border-dashed border-stone-200" id="placements_empty">
            <ShieldAlert className="w-12 h-12 text-stone-400 mx-auto mb-3 animate-bounce" />
            <h3 className="text-base font-bold text-stone-700">No active postings match your search queries</h3>
            <p className="text-stone-500 text-xs mt-1">Try deleting filter tags or broadening technology words.</p>
          </div>
        )}
      </div>

      {/* Interactive Verification Clearance Modal */}
      <AnimatePresence>
        {showClearanceModalId && (
          <div className="fixed inset-0 bg-stone-900/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm" id="clearance_verification_modal">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-stone-200 shadow-2xl p-6 max-w-md w-full space-y-6 relative"
            >
              {/* Close Button */}
              <button
                id="close_clearance_modal_btn"
                onClick={() => setShowClearanceModalId(null)}
                className="absolute right-4 top-4 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                ✕
              </button>

              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-red-700 bg-red-50 border border-red-100 px-2.5 py-0.5 rounded uppercase">
                  Sovereign Clearance Verification
                </span>
                <h3 className="text-base font-bold text-stone-950">
                  Credential Integrity Screening
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed font-sans">
                  The Indian Ministry of Defence-affiliated research centers mandate rigid academic performance and sovereign verification before application. Complete this profile.
                </p>
              </div>

              {validationError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-[11px] text-red-900 flex items-center gap-1.5 animate-pulse">
                  <AlertTriangle className="w-4 h-4 text-red-700 flex-shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              <div className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-705 block">
                    Full Name (As printed on Aadhaar / Matric Certificate):
                  </label>
                  <input
                    id="profile_name_input"
                    type="text"
                    required
                    placeholder="e.g. Lt Col Vikram Singh"
                    className="w-full bg-stone-50 border border-stone-220 rounded-lg p-2 text-xs font-sans text-stone-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                  />
                </div>

                {/* Academic Grade */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-705 block">
                    Aggregate Technical Graduation Metric (%):
                  </label>
                  <input
                    id="profile_gpa_input"
                    type="number"
                    required
                    placeholder="e.g. 78 or 85"
                    min="1"
                    max="100"
                    className="w-full bg-stone-50 border border-stone-220 rounded-lg p-2 text-xs font-sans text-stone-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    value={profileGpa}
                    onChange={(e) => setProfileGpa(e.target.value)}
                  />
                </div>

                {/* National Citizenship Verification Checklist */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      id="checkbox_citizenship"
                      type="checkbox"
                      className="mt-0.5 rounded border-stone-300 text-emerald-800 focus:ring-emerald-700 w-4 h-4 cursor-pointer"
                      checked={securityClearanceCleared}
                      onChange={(e) => setSecurityClearanceCleared(e.target.checked)}
                    />
                    <span className="text-[11px] text-stone-600 leading-normal">
                      I declare that I hold <b>valid Indian Citizenship</b> and do not possess dual nationality.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      id="checkbox_terms"
                      type="checkbox"
                      className="mt-0.5 rounded border-stone-300 text-emerald-800 focus:ring-emerald-700 w-4 h-4 cursor-pointer"
                      checked={termsAgreed}
                      onChange={(e) => setTermsAgreed(e.target.checked)}
                    />
                    <span className="text-[11px] text-stone-600 leading-normal">
                      I agree to submit self-attested academic transcripts and certify that all declarations made are true under Indian legal provisions.
                    </span>
                  </label>
                </div>

                {/* Submissions button row */}
                <div className="flex gap-3 pt-3">
                  <button
                    id="clearance_dismiss_btn"
                    onClick={() => setShowClearanceModalId(null)}
                    className="flex-1 py-1.5 border border-stone-200 text-stone-605 text-xs font-sans font-bold rounded-lg hover:bg-stone-50 transition cursor-pointer"
                  >
                    Dismiss
                  </button>
                  <button
                    id="clearance_verify_btn"
                    onClick={() => handleConfirmClearance(showClearanceModalId!)}
                    className="flex-1 py-1.5 bg-[#c5a059] hover:bg-[#b59049] text-stone-900 text-xs font-sans font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    Submit Clearance <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
