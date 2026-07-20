import CareerFlowChart from "./CareerFlowChart";
import React, { useState, useEffect } from "react";
import { Search, Shield, BookOpen, GraduationCap, Target, HeartPulse, Scale, Gavel, Cpu, Plane, Landmark, Briefcase, Award, Clock, Sparkles, CheckCircle, ChevronRight, Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { jsPDF } from "jspdf";
import { hindiCareers, hindiRoadmaps } from "../data/hindiRoadmaps";

const careers = [
  { id: 'nda', category: 'Defence', title: 'National Defence Academy (NDA)', icon: <Shield className="w-6 h-6 text-gold-400 font-semibold" />, shortDesc: 'Join the Indian Army, Navy, or Air Force directly after 12th.', stream: 'Any Stream (PCM for Navy/AF)', qualification: '12th Pass' },
  { id: 'cds', category: 'Defence', title: 'Combined Defence Services (CDS)', icon: <Target className="w-6 h-6 text-gold-400 font-semibold" />, shortDesc: 'Officer entry into the Armed Forces after graduation.', stream: 'Any Stream (Engg/Science for specific branches)', qualification: 'Graduation' },
  { id: 'drdo', category: 'Research', title: 'DRDO Scientist', icon: <Cpu className="w-6 h-6 text-blue-400" />, shortDesc: 'Research and development for India\'s defence systems.', stream: 'Engineering/Sciences', qualification: 'B.Tech/M.Sc/Ph.D' },
  { id: 'isro', category: 'Research', title: 'ISRO Scientist/Engineer', icon: <Plane className="w-6 h-6 text-indigo-400" />, shortDesc: 'Build India\'s future in space technology and exploration.', stream: 'Engineering/Sciences', qualification: 'B.Tech/M.Sc' },
  { id: 'engineering', category: 'Engineering', title: 'Software Engineering', icon: <Cpu className="w-6 h-6 text-emerald-400" />, shortDesc: 'Design and develop software systems and applications.', stream: 'PCM', qualification: 'B.Tech/B.E.' },
  { id: 'medical', category: 'Medical', title: 'Medicine (MBBS)', icon: <HeartPulse className="w-6 h-6 text-red-400" />, shortDesc: 'Become a doctor and serve in healthcare.', stream: 'PCB', qualification: 'MBBS' },
  { id: 'law', category: 'Law', title: 'Corporate Law', icon: <Gavel className="w-6 h-6 text-amber-400" />, shortDesc: 'Legal advisory for corporations and businesses.', stream: 'Any Stream', qualification: 'LLB/BA LLB' },
  { id: 'civil', category: 'Civil Services', title: 'UPSC Civil Services (IAS/IPS)', icon: <Landmark className="w-6 h-6 text-orange-400" />, shortDesc: 'Top administrative roles in the Indian government.', stream: 'Any Stream', qualification: 'Graduation' },
  { id: 'sainik', category: 'School Entrances (Class 5th-9th)', title: 'Sainik School Entrance (AISSEE)', icon: <Shield className="w-6 h-6 text-primary" />, shortDesc: 'Entrance to prestigious Sainik Schools for young cadets.', stream: 'Class 5th, 8th, 9th Students', qualification: 'School Level' },
  { id: 'rms', category: 'School Entrances (Class 5th-9th)', title: 'Rashtriya Military Schools (RMS)', icon: <Target className="w-6 h-6 text-primary" />, shortDesc: 'Top military colleges for developing future officers.', stream: 'Class 5th, 8th, 9th Students', qualification: 'School Level' },
  { id: 'rimc', category: 'School Entrances (Class 5th-9th)', title: 'Rashtriya Indian Military College (RIMC)', icon: <Award className="w-6 h-6 text-primary" />, shortDesc: 'Premier feeder institution for NDA.', stream: 'Class 7th Students', qualification: 'School Level' }
,
{ id: 'agniveer', category: 'Defence', title: 'Agniveer (Army, Navy, Air Force)', icon: <Shield className="w-6 h-6 text-gold-400 font-semibold" />, shortDesc: 'Short-term service in the Indian Armed Forces under the Agnipath scheme.', stream: 'Any Stream (Science for Technical)', qualification: '10th/12th Pass' },
  { id: 'capf-ac', category: 'Defence', title: 'CAPF Assistant Commandant (UPSC)', icon: <Shield className="w-6 h-6 text-gold-400 font-semibold" />, shortDesc: 'Officer role in BSF, CRPF, CISF, ITBP, SSB.', stream: 'Any Stream', qualification: 'Graduation' },
  { id: 'capf-si', category: 'Defence', title: 'CAPF Sub Inspector (SSC CPO)', icon: <Target className="w-6 h-6 text-gold-400 font-semibold" />, shortDesc: 'Sub Inspector roles in Delhi Police and CAPFs.', stream: 'Any Stream', qualification: 'Graduation' },
  { id: 'paramilitary', category: 'Defence', title: 'Paramilitary & State Police', icon: <Target className="w-6 h-6 text-gold-400 font-semibold" />, shortDesc: 'Constable and State level law enforcement roles.', stream: 'Any Stream', qualification: '10th/12th/Graduation' },
  { id: 'barc', category: 'Research', title: 'BARC Scientist (OCES/DGFS)', icon: <Cpu className="w-6 h-6 text-blue-400" />, shortDesc: 'Nuclear research and engineering at Bhabha Atomic Research Centre.', stream: 'Engineering/Science', qualification: 'B.Tech/M.Sc' },
  { id: 'marine', category: 'Engineering', title: 'Marine Engineering', icon: <Plane className="w-6 h-6 text-emerald-400" />, shortDesc: 'Design, build, and maintain ships and naval systems.', stream: 'PCM', qualification: 'B.Tech/B.E. (Marine)' },
  { id: 'afmc', category: 'Medical', title: 'Armed Forces Medical College (AFMC)', icon: <HeartPulse className="w-6 h-6 text-red-400" />, shortDesc: 'Premier medical institute for serving in the Armed Forces as doctors.', stream: 'PCB', qualification: 'NEET Qualified' },
  { id: 'bams', category: 'Medical', title: 'Ayurvedic Medicine (BAMS)', icon: <HeartPulse className="w-6 h-6 text-red-400" />, shortDesc: 'Bachelor of Ayurvedic Medicine and Surgery.', stream: 'PCB', qualification: 'NEET Qualified' },
  { id: 'bhms', category: 'Medical', title: 'Homeopathic Medicine (BHMS)', icon: <HeartPulse className="w-6 h-6 text-red-400" />, shortDesc: 'Bachelor of Homeopathic Medicine and Surgery.', stream: 'PCB', qualification: 'NEET Qualified' },
  { id: 'clat', category: 'Law', title: 'National Law Universities (CLAT)', icon: <Gavel className="w-6 h-6 text-amber-400" />, shortDesc: 'Undergraduate and postgraduate degree programs at NLUs.', stream: 'Any Stream', qualification: '12th Pass' },
  { id: 'ssc-cgl', category: 'Civil Services', title: 'SSC CGL', icon: <Landmark className="w-6 h-6 text-orange-400" />, shortDesc: 'Staff Selection Commission Combined Graduate Level examination.', stream: 'Any Stream', qualification: 'Graduation' },
  { id: 'ssc-chsl', category: 'Civil Services', title: 'SSC CHSL', icon: <Landmark className="w-6 h-6 text-orange-400" />, shortDesc: 'Staff Selection Commission Combined Higher Secondary Level.', stream: 'Any Stream', qualification: '12th Pass' },
  { id: 'state-pcs', category: 'Civil Services', title: 'State Civil Services (PCS)', icon: <Landmark className="w-6 h-6 text-orange-400" />, shortDesc: 'State Public Service Commission exams for administration.', stream: 'Any Stream', qualification: 'Graduation' },
  { id: 'ibps-po', category: 'Banking & Insurance', title: 'IBPS PO / SBI PO', icon: <Briefcase className="w-6 h-6 text-teal-400" />, shortDesc: 'Probationary Officer roles in public sector banks and SBI.', stream: 'Any Stream', qualification: 'Graduation' },
  { id: 'rbi-gradeb', category: 'Banking & Insurance', title: 'RBI Grade B Officer', icon: <Briefcase className="w-6 h-6 text-teal-400" />, shortDesc: 'Management and policy-making roles in the Reserve Bank of India.', stream: 'Any Stream', qualification: 'Graduation' },
  { id: 'lic-aao', category: 'Banking & Insurance', title: 'LIC AAO', icon: <Briefcase className="w-6 h-6 text-teal-400" />, shortDesc: 'Assistant Administrative Officer in Life Insurance Corporation.', stream: 'Any Stream', qualification: 'Graduation' }

];

interface RoadmapStep {
  number: number;
  title: string;
  duration: string;
  description: string;
  tip: string;
  milestone: string;
}

const roadmaps: Record<string, RoadmapStep[]> = {
  'agniveer': [
    { number: 1, title: 'Phase 1: Eligibility & Basics', duration: 'First 3-6 Months', description: 'Understand the exam pattern, syllabus, and physical/medical standards. Gather standard study materials.', tip: 'Make a fixed timetable and stick to it.', milestone: 'Syllabus Completion' },
    { number: 2, title: 'Phase 2: Practice & Mocks', duration: 'Next 3-6 Months', description: 'Solve previous year question papers and attempt regular mock tests to improve speed and accuracy.', tip: 'Analyze your mistakes in mocks and revise weak topics.', milestone: 'Consistent High Scores' },
    { number: 3, title: 'Phase 3: Final Selection', duration: 'Last 2 Months', description: 'Clear the written exam, followed by any interview, physical, or medical tests required.', tip: 'Maintain physical fitness and current affairs knowledge.', milestone: 'Final Merit List' }
  ],
  'capf-ac': [
    { number: 1, title: 'Phase 1: Eligibility & Basics', duration: 'First 3-6 Months', description: 'Understand the exam pattern, syllabus, and physical/medical standards. Gather standard study materials.', tip: 'Make a fixed timetable and stick to it.', milestone: 'Syllabus Completion' },
    { number: 2, title: 'Phase 2: Practice & Mocks', duration: 'Next 3-6 Months', description: 'Solve previous year question papers and attempt regular mock tests to improve speed and accuracy.', tip: 'Analyze your mistakes in mocks and revise weak topics.', milestone: 'Consistent High Scores' },
    { number: 3, title: 'Phase 3: Final Selection', duration: 'Last 2 Months', description: 'Clear the written exam, followed by any interview, physical, or medical tests required.', tip: 'Maintain physical fitness and current affairs knowledge.', milestone: 'Final Merit List' }
  ],
  'capf-si': [
    { number: 1, title: 'Phase 1: Eligibility & Basics', duration: 'First 3-6 Months', description: 'Understand the exam pattern, syllabus, and physical/medical standards. Gather standard study materials.', tip: 'Make a fixed timetable and stick to it.', milestone: 'Syllabus Completion' },
    { number: 2, title: 'Phase 2: Practice & Mocks', duration: 'Next 3-6 Months', description: 'Solve previous year question papers and attempt regular mock tests to improve speed and accuracy.', tip: 'Analyze your mistakes in mocks and revise weak topics.', milestone: 'Consistent High Scores' },
    { number: 3, title: 'Phase 3: Final Selection', duration: 'Last 2 Months', description: 'Clear the written exam, followed by any interview, physical, or medical tests required.', tip: 'Maintain physical fitness and current affairs knowledge.', milestone: 'Final Merit List' }
  ],
  'paramilitary': [
    { number: 1, title: 'Phase 1: Eligibility & Basics', duration: 'First 3-6 Months', description: 'Understand the exam pattern, syllabus, and physical/medical standards. Gather standard study materials.', tip: 'Make a fixed timetable and stick to it.', milestone: 'Syllabus Completion' },
    { number: 2, title: 'Phase 2: Practice & Mocks', duration: 'Next 3-6 Months', description: 'Solve previous year question papers and attempt regular mock tests to improve speed and accuracy.', tip: 'Analyze your mistakes in mocks and revise weak topics.', milestone: 'Consistent High Scores' },
    { number: 3, title: 'Phase 3: Final Selection', duration: 'Last 2 Months', description: 'Clear the written exam, followed by any interview, physical, or medical tests required.', tip: 'Maintain physical fitness and current affairs knowledge.', milestone: 'Final Merit List' }
  ],
  'barc': [
    { number: 1, title: 'Phase 1: Eligibility & Basics', duration: 'First 3-6 Months', description: 'Understand the exam pattern, syllabus, and physical/medical standards. Gather standard study materials.', tip: 'Make a fixed timetable and stick to it.', milestone: 'Syllabus Completion' },
    { number: 2, title: 'Phase 2: Practice & Mocks', duration: 'Next 3-6 Months', description: 'Solve previous year question papers and attempt regular mock tests to improve speed and accuracy.', tip: 'Analyze your mistakes in mocks and revise weak topics.', milestone: 'Consistent High Scores' },
    { number: 3, title: 'Phase 3: Final Selection', duration: 'Last 2 Months', description: 'Clear the written exam, followed by any interview, physical, or medical tests required.', tip: 'Maintain physical fitness and current affairs knowledge.', milestone: 'Final Merit List' }
  ],
  'marine': [
    { number: 1, title: 'Phase 1: Eligibility & Basics', duration: 'First 3-6 Months', description: 'Understand the exam pattern, syllabus, and physical/medical standards. Gather standard study materials.', tip: 'Make a fixed timetable and stick to it.', milestone: 'Syllabus Completion' },
    { number: 2, title: 'Phase 2: Practice & Mocks', duration: 'Next 3-6 Months', description: 'Solve previous year question papers and attempt regular mock tests to improve speed and accuracy.', tip: 'Analyze your mistakes in mocks and revise weak topics.', milestone: 'Consistent High Scores' },
    { number: 3, title: 'Phase 3: Final Selection', duration: 'Last 2 Months', description: 'Clear the written exam, followed by any interview, physical, or medical tests required.', tip: 'Maintain physical fitness and current affairs knowledge.', milestone: 'Final Merit List' }
  ],
  'afmc': [
    { number: 1, title: 'Phase 1: Eligibility & Basics', duration: 'First 3-6 Months', description: 'Understand the exam pattern, syllabus, and physical/medical standards. Gather standard study materials.', tip: 'Make a fixed timetable and stick to it.', milestone: 'Syllabus Completion' },
    { number: 2, title: 'Phase 2: Practice & Mocks', duration: 'Next 3-6 Months', description: 'Solve previous year question papers and attempt regular mock tests to improve speed and accuracy.', tip: 'Analyze your mistakes in mocks and revise weak topics.', milestone: 'Consistent High Scores' },
    { number: 3, title: 'Phase 3: Final Selection', duration: 'Last 2 Months', description: 'Clear the written exam, followed by any interview, physical, or medical tests required.', tip: 'Maintain physical fitness and current affairs knowledge.', milestone: 'Final Merit List' }
  ],
  'bams': [
    { number: 1, title: 'Phase 1: Eligibility & Basics', duration: 'First 3-6 Months', description: 'Understand the exam pattern, syllabus, and physical/medical standards. Gather standard study materials.', tip: 'Make a fixed timetable and stick to it.', milestone: 'Syllabus Completion' },
    { number: 2, title: 'Phase 2: Practice & Mocks', duration: 'Next 3-6 Months', description: 'Solve previous year question papers and attempt regular mock tests to improve speed and accuracy.', tip: 'Analyze your mistakes in mocks and revise weak topics.', milestone: 'Consistent High Scores' },
    { number: 3, title: 'Phase 3: Final Selection', duration: 'Last 2 Months', description: 'Clear the written exam, followed by any interview, physical, or medical tests required.', tip: 'Maintain physical fitness and current affairs knowledge.', milestone: 'Final Merit List' }
  ],
  'bhms': [
    { number: 1, title: 'Phase 1: Eligibility & Basics', duration: 'First 3-6 Months', description: 'Understand the exam pattern, syllabus, and physical/medical standards. Gather standard study materials.', tip: 'Make a fixed timetable and stick to it.', milestone: 'Syllabus Completion' },
    { number: 2, title: 'Phase 2: Practice & Mocks', duration: 'Next 3-6 Months', description: 'Solve previous year question papers and attempt regular mock tests to improve speed and accuracy.', tip: 'Analyze your mistakes in mocks and revise weak topics.', milestone: 'Consistent High Scores' },
    { number: 3, title: 'Phase 3: Final Selection', duration: 'Last 2 Months', description: 'Clear the written exam, followed by any interview, physical, or medical tests required.', tip: 'Maintain physical fitness and current affairs knowledge.', milestone: 'Final Merit List' }
  ],
  'clat': [
    { number: 1, title: 'Phase 1: Eligibility & Basics', duration: 'First 3-6 Months', description: 'Understand the exam pattern, syllabus, and physical/medical standards. Gather standard study materials.', tip: 'Make a fixed timetable and stick to it.', milestone: 'Syllabus Completion' },
    { number: 2, title: 'Phase 2: Practice & Mocks', duration: 'Next 3-6 Months', description: 'Solve previous year question papers and attempt regular mock tests to improve speed and accuracy.', tip: 'Analyze your mistakes in mocks and revise weak topics.', milestone: 'Consistent High Scores' },
    { number: 3, title: 'Phase 3: Final Selection', duration: 'Last 2 Months', description: 'Clear the written exam, followed by any interview, physical, or medical tests required.', tip: 'Maintain physical fitness and current affairs knowledge.', milestone: 'Final Merit List' }
  ],
  'ssc-cgl': [
    { number: 1, title: 'Phase 1: Eligibility & Basics', duration: 'First 3-6 Months', description: 'Understand the exam pattern, syllabus, and physical/medical standards. Gather standard study materials.', tip: 'Make a fixed timetable and stick to it.', milestone: 'Syllabus Completion' },
    { number: 2, title: 'Phase 2: Practice & Mocks', duration: 'Next 3-6 Months', description: 'Solve previous year question papers and attempt regular mock tests to improve speed and accuracy.', tip: 'Analyze your mistakes in mocks and revise weak topics.', milestone: 'Consistent High Scores' },
    { number: 3, title: 'Phase 3: Final Selection', duration: 'Last 2 Months', description: 'Clear the written exam, followed by any interview, physical, or medical tests required.', tip: 'Maintain physical fitness and current affairs knowledge.', milestone: 'Final Merit List' }
  ],
  'ssc-chsl': [
    { number: 1, title: 'Phase 1: Eligibility & Basics', duration: 'First 3-6 Months', description: 'Understand the exam pattern, syllabus, and physical/medical standards. Gather standard study materials.', tip: 'Make a fixed timetable and stick to it.', milestone: 'Syllabus Completion' },
    { number: 2, title: 'Phase 2: Practice & Mocks', duration: 'Next 3-6 Months', description: 'Solve previous year question papers and attempt regular mock tests to improve speed and accuracy.', tip: 'Analyze your mistakes in mocks and revise weak topics.', milestone: 'Consistent High Scores' },
    { number: 3, title: 'Phase 3: Final Selection', duration: 'Last 2 Months', description: 'Clear the written exam, followed by any interview, physical, or medical tests required.', tip: 'Maintain physical fitness and current affairs knowledge.', milestone: 'Final Merit List' }
  ],
  'state-pcs': [
    { number: 1, title: 'Phase 1: Eligibility & Basics', duration: 'First 3-6 Months', description: 'Understand the exam pattern, syllabus, and physical/medical standards. Gather standard study materials.', tip: 'Make a fixed timetable and stick to it.', milestone: 'Syllabus Completion' },
    { number: 2, title: 'Phase 2: Practice & Mocks', duration: 'Next 3-6 Months', description: 'Solve previous year question papers and attempt regular mock tests to improve speed and accuracy.', tip: 'Analyze your mistakes in mocks and revise weak topics.', milestone: 'Consistent High Scores' },
    { number: 3, title: 'Phase 3: Final Selection', duration: 'Last 2 Months', description: 'Clear the written exam, followed by any interview, physical, or medical tests required.', tip: 'Maintain physical fitness and current affairs knowledge.', milestone: 'Final Merit List' }
  ],
  'ibps-po': [
    { number: 1, title: 'Phase 1: Eligibility & Basics', duration: 'First 3-6 Months', description: 'Understand the exam pattern, syllabus, and physical/medical standards. Gather standard study materials.', tip: 'Make a fixed timetable and stick to it.', milestone: 'Syllabus Completion' },
    { number: 2, title: 'Phase 2: Practice & Mocks', duration: 'Next 3-6 Months', description: 'Solve previous year question papers and attempt regular mock tests to improve speed and accuracy.', tip: 'Analyze your mistakes in mocks and revise weak topics.', milestone: 'Consistent High Scores' },
    { number: 3, title: 'Phase 3: Final Selection', duration: 'Last 2 Months', description: 'Clear the written exam, followed by any interview, physical, or medical tests required.', tip: 'Maintain physical fitness and current affairs knowledge.', milestone: 'Final Merit List' }
  ],
  'rbi-gradeb': [
    { number: 1, title: 'Phase 1: Eligibility & Basics', duration: 'First 3-6 Months', description: 'Understand the exam pattern, syllabus, and physical/medical standards. Gather standard study materials.', tip: 'Make a fixed timetable and stick to it.', milestone: 'Syllabus Completion' },
    { number: 2, title: 'Phase 2: Practice & Mocks', duration: 'Next 3-6 Months', description: 'Solve previous year question papers and attempt regular mock tests to improve speed and accuracy.', tip: 'Analyze your mistakes in mocks and revise weak topics.', milestone: 'Consistent High Scores' },
    { number: 3, title: 'Phase 3: Final Selection', duration: 'Last 2 Months', description: 'Clear the written exam, followed by any interview, physical, or medical tests required.', tip: 'Maintain physical fitness and current affairs knowledge.', milestone: 'Final Merit List' }
  ],
  'lic-aao': [
    { number: 1, title: 'Phase 1: Eligibility & Basics', duration: 'First 3-6 Months', description: 'Understand the exam pattern, syllabus, and physical/medical standards. Gather standard study materials.', tip: 'Make a fixed timetable and stick to it.', milestone: 'Syllabus Completion' },
    { number: 2, title: 'Phase 2: Practice & Mocks', duration: 'Next 3-6 Months', description: 'Solve previous year question papers and attempt regular mock tests to improve speed and accuracy.', tip: 'Analyze your mistakes in mocks and revise weak topics.', milestone: 'Consistent High Scores' },
    { number: 3, title: 'Phase 3: Final Selection', duration: 'Last 2 Months', description: 'Clear the written exam, followed by any interview, physical, or medical tests required.', tip: 'Maintain physical fitness and current affairs knowledge.', milestone: 'Final Merit List' }
  ],
  sainik: [
    { number: 1, title: 'Early Preparation', duration: 'Class 4 & 5', description: 'Start basic preparation in Math, English, Intelligence, and GK.', tip: 'Enroll in foundation courses specifically for Sainik School.', milestone: 'Mock Test Readiness' },
    { number: 2, title: 'AISSEE Exam', duration: 'January', description: 'Clear the All India Sainik School Entrance Examination.', tip: 'Practice OMR filling and time management.', milestone: 'Written Clear' },
    { number: 3, title: 'Medical & Interview', duration: 'March-April', description: 'Clear the medical board fitness tests and personal interviews.', tip: 'Maintain physical fitness and confident communication.', milestone: 'Final Merit List' }
  ],
  rms: [
    { number: 1, title: 'Early Preparation', duration: 'Class 4 & 5', description: 'Start basic preparation in Math, English, Intelligence, and GK.', tip: 'Enroll in foundation courses specifically for RMS.', milestone: 'Mock Test Readiness' },
    { number: 2, title: 'CET Exam', duration: 'December', description: 'Clear the Common Entrance Test for RMS.', tip: 'Focus on high accuracy in Intelligence section.', milestone: 'Written Clear' },
    { number: 3, title: 'Interview & Medical', duration: 'Feb-March', description: 'Clear the final interview and medical examination.', tip: 'Develop good general awareness.', milestone: 'Final Merit List' }
  ],
  rimc: [
    { number: 1, title: 'Intensive Prep', duration: 'Class 6 & 7', description: 'Master English, Mathematics, and General Knowledge.', tip: 'RIMC subjective English and Math require rigorous writing practice.', milestone: 'Subjective Readiness' },
    { number: 2, title: 'Written Exam', duration: 'June/December', description: 'Clear the All India Entrance for RIMC.', tip: 'Speed and neat handwriting are crucial.', milestone: 'Written Clear' },
    { number: 3, title: 'Viva-Voce & Medical', duration: 'Post-Written', description: 'Clear the rigorous viva-voce and medical checkup.', tip: 'Exhibit officer-like qualities early on.', milestone: 'Final Merit List' }
  ],
  nda: [
    {
      number: 1,
      title: "Senior Secondary Foundation",
      duration: "Class 11 & 12 (PCM Recommended)",
      description: "Opt for Physics, Chemistry, and Mathematics (PCM) in high school to qualify for Army, Navy, and Air Force wings.",
      tip: "Focus on building strong mathematical fundamentals, particularly algebra, trigonometry, and calculus.",
      milestone: "12th Board Exams (Min 60%)"
    },
    {
      number: 2,
      title: "Sankalp Written Prep & Registration",
      duration: "6 - 12 Months",
      description: "Prepare intensively for Mathematics and General Ability Test (GAT) papers. Apply on UPSC portal when notification releases.",
      tip: "Utilize Sankalp Mock Exam Simulators to track your speed and accuracy.",
      milestone: "UPSC Registration & Admit Card"
    },
    {
      number: 3,
      title: "Clear UPSC NDA Written Examination",
      duration: "1 Day (Biannual)",
      description: "Sit for the offline UPSC exam. Score above the cutoff (historically around 350-380 out of 900) to qualify.",
      tip: "Solve the previous 10 years papers under strict timed conditions.",
      milestone: "Written Result (Roll Number in PDF)"
    },
    {
      number: 4,
      title: "Conquer the 5-Day SSB Selection Board",
      duration: "5 Days",
      description: "Undergo psychological tests, group tasks, outdoor obstacles, and personal interviews at military selection centers.",
      tip: "Develop 'Officer Like Qualities' (OLQ) such as effective communication, cooperation, and courage.",
      milestone: "SSB Recommendation Letter"
    },
    {
      number: 5,
      title: "Medical Standards & All-India Merit",
      duration: "1 - 2 Months",
      description: "Pass strict physical standards (height, weight, vision, dental points) at military hospitals and wait for final merit lists.",
      tip: "Keep physically active with running, pushups, and a clean diet during preparation.",
      milestone: "All-India Merit Rank List"
    },
    {
      number: 6,
      title: "Pre-Commission Joint Training (NDA)",
      duration: "3 Years (+ 1 Year Specialist)",
      description: "Receive world-class military training and earn a Bachelor's degree at NDA Khadakwasla, then proceed to IMA/INA/AFA.",
      tip: "Embrace discipline, physical endurance, and peer leadership during training.",
      milestone: "Commissioned Officer (Lieutenant / Sub-Lieutenant / Flying Officer)"
    }
  ],
  drdo: [
    {
      number: 1,
      title: "Higher Secondary Foundation",
      duration: "Class 11 & 12 (PCM Stream)",
      description: "Develop strong analytical skills in mathematics, physics, and computer science in high school.",
      tip: "Read scientific journals and simple electronics DIY kits to foster research curiosity.",
      milestone: "10+2 Board Clear"
    },
    {
      number: 2,
      title: "Undergraduate / Postgrad Specialization",
      duration: "4 Years (B.Tech) / 5 Years (Integrated M.Sc)",
      description: "Earn a first-class degree in Mechanical, CS, ECE, Aerospace or M.Sc in Applied Physics/Chemistry with minimum 60% aggregate.",
      tip: "Join research projects under college professors and publish short technical research papers if possible.",
      milestone: "B.Tech/M.Sc Degree (First Class)"
    },
    {
      number: 3,
      title: "Crack GATE Examination",
      duration: "1 Year Prep",
      description: "Secure an exceptional GATE score. Most direct entries to DRDO require rank in the top 1-5% of your branch.",
      tip: "Focus deeply on core conceptual questions and numerical accuracy.",
      milestone: "Qualified GATE Scorecard"
    },
    {
      number: 4,
      title: "Submit RAC Application & Review",
      duration: "1 - 3 Months",
      description: "Register at the DRDO Recruitment and Assessment Centre (RAC) portal with your valid credentials and GATE score.",
      tip: "Double-check eligibility codes and keep your final engineering transcripts ready.",
      milestone: "RAC Written Exam Shortlist"
    },
    {
      number: 5,
      title: "DRDO Technical Exam & Expert Interview",
      duration: "1 - 2 Days",
      description: "Qualify the RAC subjective technical paper testing core knowledge, followed by an intensive interview with defense scientists.",
      tip: "Be absolutely clear on your final year engineering project and fundamental concepts.",
      milestone: "Final DRDO Selection Offer"
    },
    {
      number: 6,
      title: "Induction as Scientist 'B'",
      duration: "Ongoing Research Careers",
      description: "Join a prestigious laboratory (like ADE, DLRL, or PXE) as a Gazetted Officer (Scientist 'B') working on strategic missile, radar, or weapon systems.",
      tip: "Complete the initial Orientation training program at DIAT Pune.",
      milestone: "Distinguished Defense Scientist"
    }
  ],
  isro: [
    {
      number: 1,
      title: "10+2 Higher Secondary Science",
      duration: "2 Years",
      description: "Pursue PCM with extreme focus on physics, mathematical calculations, and aerospace mechanics concepts.",
      tip: "Participate in local robotics and science exhibitions.",
      milestone: "PCM 12th Board Score (Min 75%)"
    },
    {
      number: 2,
      title: "B.Tech Engineering Degree",
      duration: "4 Years",
      description: "Graduate with first class (min 65% or 6.84 CGPA) in Mechanical, Electronics, Electrical, Computer Science, or Aerospace Engineering.",
      tip: "Aiming for IIST (Indian Institute of Space Science and Technology) provides a direct absorption path into ISRO for top graduates.",
      milestone: "First-Class B.Tech / M.Sc"
    },
    {
      number: 3,
      title: "ISRO ICRB Exam Preparation",
      duration: "6 - 12 Months",
      description: "Prepare for the ISRO Centralised Recruitment Board (ICRB) examination, focusing heavily on core technical engineering theories.",
      tip: "Practice quick numeric resolution without calculator aids.",
      milestone: "Written Exam Admit and Clear"
    },
    {
      number: 4,
      title: "ISRO Scientific Board Interview",
      duration: "1 Day",
      description: "Fulfill a rigorous technical panel interview evaluating your fundamental engineering application, design thinking, and stamina.",
      tip: "Never bluff on questions; ISRO panel values scientific honesty and clarity of thought.",
      milestone: "Final Recommended List"
    },
    {
      number: 5,
      title: "Security & Medical Clearances",
      duration: "1 Month",
      description: "Undergo standard medical screening and comprehensive government character & background verification for space agency standards.",
      tip: "Ensure your physical wellness and secure all official graduation documents.",
      milestone: "Official ISRO Joining Order"
    },
    {
      number: 6,
      title: "Join as Scientist / Engineer 'SC'",
      duration: "Lifelong Space Career",
      description: "Work on satellite payloads, cryogenic rocket engines, navigation modules, or interplanetary launches at SDSC, URSC, or VSSC.",
      tip: "Contribute to upcoming Gaganyaan, Chandrayaan, or interplanetary missions.",
      milestone: "ISRO Scientific Officer SC"
    }
  ],
  cds: [
    {
      number: 1,
      title: "Undergraduate Graduation",
      duration: "3 - 4 Years",
      description: "Complete your Bachelor's degree (B.Sc, B.Tech, B.Com, B.A) with standard academic passing marks.",
      tip: "B.Tech is highly recommended as it opens up the Navy and Air Force engineering entry points.",
      milestone: "College Graduation Degree"
    },
    {
      number: 2,
      title: "UPSC CDS Exam Preparation",
      duration: "6 Months",
      description: "Master the CDS syllabus containing English, General Knowledge, and Elementary Mathematics (not needed for OTA candidates).",
      tip: "Read national news daily and revise history, geography, and general science thoroughly.",
      milestone: "CDS Admit Card & Roll Number"
    },
    {
      number: 3,
      title: "UPSC Written Examination",
      duration: "1 Day (Biannual)",
      description: "Sit for the UPSC CDS exam. OTA cutoff ranges between 95-110, while IMA/INA/AFA cuts range higher from 120-150.",
      tip: "Manage negative marking carefully. Only attempt questions with high accuracy.",
      milestone: "Written Result (Shortlisted for SSB)"
    },
    {
      number: 4,
      title: "SSB 5-Day Interview Process",
      duration: "5 Days",
      description: "Undergo intelligence screenings (Stage-1), psychological profiling, obstacle challenges, group debates, and officer interviews (Stage-2).",
      tip: "Maintain authentic body language, stay physically fit, and lead group discussions naturally.",
      milestone: "SSB recommendation certificate"
    },
    {
      number: 5,
      title: "Specialist Medical & Merit",
      duration: "1 - 2 Months",
      description: "Clear strict physical and medical criteria at armed forces hospitals (eye standards, body mass, cardiac health).",
      tip: "Run 3-5 km regularly and maintain core physical conditioning.",
      milestone: "All-India CDS Merit list"
    },
    {
      number: 6,
      title: "Academy Induction & Commission",
      duration: "11 Months (OTA) / 1.5 Years (IMA)",
      description: "Receive specialized physical, tactical, and leadership drills at IMA Dehradun, OTA Chennai, INA, or AFA.",
      tip: "Earn your stripes and choose your regiment based on physical capabilities.",
      milestone: "Commissioned Lieutenant (Army / Navy / Air Force)"
    }
  ],
  engineering: [
    {
      number: 1,
      title: "Higher Secondary Stream Selection",
      duration: "2 Years",
      description: "Opt for PCM (Physics, Chemistry, Math) stream in 11th and 12th standards.",
      tip: "Focus heavily on logic building, algebra, and basic school coding classes if available.",
      milestone: "Class 12 Boards (Min 60%)"
    },
    {
      number: 2,
      title: "Earn Engineering Degree",
      duration: "4 Years",
      description: "Earn a B.Tech or B.E. in Computer Science or Information Technology from a recognized university.",
      tip: "Build your GitHub profile early. Push all code you write for projects to open source.",
      milestone: "Engineering Graduation"
    },
    {
      number: 3,
      title: "Master Data Structures & Algorithms",
      duration: "1 - 2 Years",
      description: "Familiarize yourself with algorithmic complexity, sorting, graphs, databases, and multi-threading concepts.",
      tip: "Practice problem-solving on portals like LeetCode, Codeforces, or HackerRank regularly.",
      milestone: "Proven Problem Solving Proficiency"
    },
    {
      number: 4,
      title: "Build Portfolio & Internships",
      duration: "6 - 12 Months",
      description: "Construct 2-3 complex full-stack web applications or AI projects. Complete industry internships to gain professional experience.",
      tip: "Ensure your applications have live hosted URLs and clear readme documentation.",
      milestone: "Industry Project Internships"
    },
    {
      number: 5,
      title: "Technical Placements & Interviews",
      duration: "3 - 6 Months",
      description: "Apply for campus placements or off-campus roles. Pass dynamic coding rounds, system design reviews, and hiring manager loops.",
      tip: "Practice mock interview communications. Explain your code step-by-step to your partner.",
      milestone: "SDE Placement Offer Letter"
    },
    {
      number: 6,
      title: "Launch Engineering Career",
      duration: "Continuous learning",
      description: "Join as a Software Development Engineer (SDE-1) or Associate Engineer, starting your path in software architecture.",
      tip: "Learn continuously. Tech stacks change, but solid engineering principles remain forever.",
      milestone: "Senior Software Architect"
    }
  ],
  medical: [
    {
      number: 1,
      title: "High School Biology Stream",
      duration: "2 Years",
      description: "Take up Biology, Physics, and Chemistry (PCB) in class 11 and 12.",
      tip: "Read NCERT biology books word-by-word. Memorize scientific classifications.",
      milestone: "Class 12th PCB Complete"
    },
    {
      number: 2,
      title: "Qualify NEET-UG",
      duration: "1 - 2 Years Preparation",
      description: "Prepare and clear the highly competitive NEET-UG exam to secure a medical seat in top government colleges.",
      tip: "Practice mock physics and chemistry problem sheets to balance out biology accuracy.",
      milestone: "NEET Rank List & College Counselling"
    },
    {
      number: 3,
      title: "Undergraduate Medical Course (MBBS)",
      duration: "4.5 Years",
      description: "Learn foundational medicine, anatomy, physiology, pathology, forensics, gynecology, and surgery theories.",
      tip: "Form small study circles to drill medical terms and practical slide identifications.",
      milestone: "MBBS Written University Exams"
    },
    {
      number: 4,
      title: "Compulsory Rotational Internship",
      duration: "1 Year",
      description: "Carry out hands-on rotations across clinical wards, casualty, surgery, pediatrics, and community healthcare units.",
      tip: "Be highly observant of case histories and develop empathetic patient communication.",
      milestone: "Clinical Internship Certificate"
    },
    {
      number: 5,
      title: "Licensure & Specialization Prep",
      duration: "1 Year",
      description: "Register with State Medical Councils. Prepare for NEET-PG/NEXT exams to earn specializing courses (MD/MS).",
      tip: "Identify early on whether you are inclined towards surgery or pure diagnostic research.",
      milestone: "State Medical Council Registration"
    },
    {
      number: 6,
      title: "Active Medical Practice",
      duration: "Ongoing",
      description: "Practice as a licensed medical officer, specialist doctor, or clinical surgeon healing families and communities.",
      tip: "Never stop updating your medical knowledge on latest drugs and healthcare technologies.",
      milestone: "Chief Medical Officer / Consultant Surgeon"
    }
  ],
  law: [
    {
      number: 1,
      title: "Higher Secondary Humanities / Commerce",
      duration: "2 Years",
      description: "Choose any stream (Arts/Commerce/Science) in school. Develop logical reasoning and critical thinking skills.",
      tip: "Read editorials daily. Participate in debates and public speaking events to build vocal confidence.",
      milestone: "Class 12 Boards Passed"
    },
    {
      number: 2,
      title: "Crack CLAT or LSAT Exams",
      duration: "1 Year Preparation",
      description: "Acquire high rank in CLAT (Common Law Admission Test) to join elite National Law Universities (NLUs).",
      tip: "Focus extensively on logical reasoning, English comprehension, and legal awareness sections.",
      milestone: "NLU Seat Allocation List"
    },
    {
      number: 3,
      title: "Earn Integrated Law Degree",
      duration: "5 Years",
      description: "Fulfill your integrated B.A. LL.B / B.B.A. LL.B course, studying criminal law, constitutional law, contracts, and torts.",
      tip: "Participate in national Moot Court competitions. This builds real advocacy skills.",
      milestone: "LL.B Graduation Degree"
    },
    {
      number: 4,
      title: "Corporate Firms & Court Internships",
      duration: "Throughout Law School",
      description: "Intern during breaks with tier-1 law firms, senior advocates, supreme court justices, or corporate legal departments.",
      tip: "Develop excellent drafting, research, and summarization skills. Accuracy is key.",
      milestone: "Comprehensive Internship Log"
    },
    {
      number: 5,
      title: "Qualify Bar & State Registration",
      duration: "3 - 6 Months",
      description: "Enroll with the State Bar Council and clear the open-book All India Bar Examination (AIBE).",
      tip: "Study previous years' bar exam trends and bare acts structures.",
      milestone: "AIBE Certificate of Practice"
    },
    {
      number: 6,
      title: "Launch Legal Career",
      duration: "Ongoing",
      description: "Work as an associate at premier law firms, corporate legal counsel, or litigate cases in judicial courts.",
      tip: "Uphold professional ethics and build specialization in high-demand fields like tech-law or corporate mergers.",
      milestone: "Corporate Partner / Senior Counsel"
    }
  ],
  civil: [
    {
      number: 1,
      title: "Undergraduate Graduation",
      duration: "3 - 4 Years",
      description: "Graduate with any stream from a UGC-recognized university. Maintain decent marks and general awareness.",
      tip: "Choose a graduation subject that you can select as your optional paper in UPSC Mains later.",
      milestone: "College Degree (Any Stream)"
    },
    {
      number: 2,
      title: "UPSC Syllabus Deciphering",
      duration: "1 - 2 Years Prep",
      description: "Understand the UPSC Civil Services Examination (CSE) pattern. Master history, polity, geography, economics, and ethics.",
      tip: "Read newspapers like 'The Hindu' or 'Indian Express' daily with strict focus on national editorial viewpoints.",
      milestone: "Strong General Studies Base"
    },
    {
      number: 3,
      title: "UPSC Preliminary Screening",
      duration: "1 Day (June)",
      description: "Clear the GS-1 paper (cutoff varies 85-100) and CSAT paper (qualifying at 33.3%). Only top 10,000-15,000 candidates qualify.",
      tip: "Practice negative-marking elimination strategies and logical deduction.",
      milestone: "UPSC Prelims Cleared Card"
    },
    {
      number: 4,
      title: "UPSC Mains Descriptive Papers",
      duration: "5 Days (September)",
      description: "Write 9 subjective essays, language, GS, and optional papers. Your analytical answer-writing determines your final score.",
      tip: "Practice writing 15-20 pages of high-quality descriptive answers every single day during active revision.",
      milestone: "UPSC Mains Qualified list"
    },
    {
      number: 5,
      title: "UPSC Personality Interview Board",
      duration: "1 Day (Feb-April)",
      description: "Fulfill the personality assessment board at UPSC Dholpur House, New Delhi, evaluating composure, leadership, and integrity.",
      tip: "Stay authentic, balanced, humble, and display a deep understanding of your Detailed Application Form (DAF).",
      milestone: "UPSC Final Rank Allocation list"
    },
    {
      number: 6,
      title: "LBSNAA Training & Cadet Post",
      duration: "2 Years Foundation",
      description: "Join Lal Bahadur Shastri National Academy of Administration in Mussoorie. Learn law, administration, policy, and start service as IAS/IPS/IFS.",
      tip: "Embrace rural and sub-divisional postings to learn real grassroots public policy.",
      milestone: "Sovereign Administrator (District Magistrate / SP / Ambassador)"
    }
  ]
};
export default function CareerLibrary({
 onBookCounselling }: { onBookCounselling: () => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [activeRoadmapStep, setActiveRoadmapStep] = useState<number>(1);
  const [language, setLanguage] = useState<"en" | "hi">("en");

  // Reset active roadmap step to 1 whenever the selected career changes
  useEffect(() => {
    setActiveRoadmapStep(1);
  }, [selectedCareer]);

  const handleDownloadPDF = (career: typeof careers[number]) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const primaryColor = [15, 23, 42]; // navy-900: #0f172a
    const accentColor = [212, 175, 55]; // gold-400/450: #d4af37
    const textColor = [51, 65, 85]; // slate-700
    const lightBgColor = [248, 250, 252]; // slate-50

    // Title / Header Banner
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 40, "F");

    // Accent line
    doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.rect(0, 40, 210, 3, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("SANKALP CAREER SOLUTIONS", 15, 18);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(212, 175, 55);
    doc.text("INDIA'S TRUSTED CAREER GUIDANCE & STRATEGIC PATHWAYS", 15, 25);

    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(`Generated: ${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}`, 150, 18);

    // Profile Details
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(career.title.toUpperCase(), 15, 55);

    doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.setLineWidth(0.5);
    doc.line(15, 58, 195, 58);

    // Details summary block
    doc.setFillColor(lightBgColor[0], lightBgColor[1], lightBgColor[2]);
    doc.rect(15, 62, 180, 26, "F");
    doc.setDrawColor(226, 232, 240);
    doc.rect(15, 62, 180, 26, "S");

    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Category:", 20, 69);
    doc.text("Stream Target:", 20, 75);
    doc.text("Qualification:", 20, 81);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text(career.category, 50, 69);
    doc.text(career.stream, 50, 75);
    doc.text(career.qualification, 50, 81);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("Description:", 110, 69);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    
    const splitDesc = doc.splitTextToSize(career.shortDesc, 78);
    doc.text(splitDesc, 110, 74);

    // Roadmap title
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("STEP-BY-STEP STRATEGIC ROADMAP", 15, 98);

    const careerSteps = roadmaps[career.id as keyof typeof roadmaps] || [];
    let currentY = 106;

    careerSteps.forEach((step, index) => {
      // Avoid overflow
      if (currentY > 245) {
        doc.addPage();
        currentY = 25;
      }

      // Step Number block
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(15, currentY - 4, 8, 8, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text(step.number.toString(), 18, currentY + 1.5);

      // Step Title
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.text(step.title.toUpperCase(), 27, currentY - 1);

      // Duration
      doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.text(`[ Duration: ${step.duration} ]`, 27, currentY + 3);

      currentY += 8;

      // Step description
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      const splitStepDesc = doc.splitTextToSize(step.description, 168);
      doc.text(splitStepDesc, 27, currentY);
      currentY += splitStepDesc.length * 4.5 + 1.5;

      // Advice / Tip
      doc.setTextColor(115, 115, 115);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8.5);
      const splitTip = doc.splitTextToSize(`Expert Tip: ${step.tip}`, 168);
      doc.text(splitTip, 27, currentY);
      currentY += splitTip.length * 4 + 1.5;

      // Verification Milestone
      doc.setTextColor(16, 124, 65);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.text(`Required Milestone: ${step.milestone}`, 27, currentY);
      
      if (index < careerSteps.length - 1) {
        currentY += 5;
        doc.setDrawColor(241, 245, 249);
        doc.setLineWidth(0.35);
        doc.line(27, currentY, 195, currentY);
        currentY += 8;
      } else {
        currentY += 8;
      }
    });

    // Add running footer to all pages
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 287, 210, 10, "F");
      
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text("SANKALP - India's Premier Strategic & Defence Career Platform", 15, 293);
      doc.text(`Page ${i} of ${pageCount}`, 180, 293);
    }

    doc.save(`Sankalp_Roadmap_${career.id}.pdf`);
  };

  const categories = ["All", "Defence", "Research", "Engineering", "Medical", "Law", "Civil Services", "Banking & Insurance", "School Entrances (Class 5th-9th)"];

  const filteredCareers = careers.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const detailedCareer = careers.find(c => c.id === selectedCareer);

  const translatedCareer = detailedCareer ? {
    ...detailedCareer,
    title: language === "hi" && hindiCareers[detailedCareer.id] ? hindiCareers[detailedCareer.id].title : detailedCareer.title,
    category: language === "hi" && hindiCareers[detailedCareer.id] ? hindiCareers[detailedCareer.id].category : detailedCareer.category,
    shortDesc: language === "hi" && hindiCareers[detailedCareer.id] ? hindiCareers[detailedCareer.id].shortDesc : detailedCareer.shortDesc,
    stream: language === "hi" && hindiCareers[detailedCareer.id] ? hindiCareers[detailedCareer.id].stream : detailedCareer.stream,
    qualification: language === "hi" && hindiCareers[detailedCareer.id] ? hindiCareers[detailedCareer.id].qualification : detailedCareer.qualification,
  } : null;

  const currentRoadmapSteps = detailedCareer 
    ? (language === "hi" ? hindiRoadmaps[detailedCareer.id] : roadmaps[detailedCareer.id]) || []
    : [];

  
  const handleDownloadStudySchedule = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const primaryColor = [15, 23, 42]; 
    const accentColor = [212, 175, 55]; 

    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 40, "F");
    doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.rect(0, 40, 210, 3, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("SANKALP CAREER SOLUTIONS", 15, 18);
    
    doc.setFontSize(10);
    doc.setTextColor(212, 175, 55);
    doc.text("STUDY SCHEDULE TEMPLATE", 15, 25);

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(16);
    doc.text("Weekly Study Planner", 15, 60);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    
    let y = 75;
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    days.forEach((day, i) => {
       doc.setFont("helvetica", "bold");
       doc.text(day, 15, y);
       doc.setFont("helvetica", "normal");
       doc.setDrawColor(200, 200, 200);
       doc.line(15, y + 2, 195, y + 2);
       
       doc.text("Morning (06:00 - 09:00): ___________________________", 15, y + 10);
       doc.text("Afternoon (14:00 - 17:00): ___________________________", 15, y + 18);
       doc.text("Evening (19:00 - 22:00): ___________________________", 15, y + 26);
       
       y += 40;
       
       if (y > 270 && i < days.length - 1) {
          doc.addPage();
          y = 30;
       }
    });

    doc.save("Sankalp_Study_Schedule.pdf");
  };

  const handleDownloadFitnessPlan = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const primaryColor = [15, 23, 42]; 
    const accentColor = [212, 175, 55]; 

    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 40, "F");
    doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.rect(0, 40, 210, 3, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("SANKALP CAREER SOLUTIONS", 15, 18);
    
    doc.setFontSize(10);
    doc.setTextColor(212, 175, 55);
    doc.text("PHYSICAL FITNESS PLAN", 15, 25);

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(16);
    doc.text("Tactical Fitness Routine for Defence & Police Services", 15, 60);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    
    doc.text("Endurance Training:", 15, 75);
    doc.text("- 2.4 km run in 10 minutes (3 times a week)", 20, 82);
    doc.text("- Swimming: 50 meters unassisted", 20, 89);
    
    doc.text("Strength & Conditioning:", 15, 105);
    doc.text("- Push-ups: 40 repetitions in 1 minute", 20, 112);
    doc.text("- Sit-ups: 40 repetitions in 1 minute", 20, 119);
    doc.text("- Chin-ups: Minimum 6-8 repetitions", 20, 126);
    
    doc.text("Flexibility & Agility:", 15, 142);
    doc.text("- 100-meter sprint in under 15 seconds", 20, 149);
    doc.text("- High jump (1.2 meters) & Long jump (3.6 meters)", 20, 156);
    
    doc.text("Dietary Guidelines:", 15, 172);
    doc.text("- High protein intake (1.5g per kg of body weight)", 20, 179);
    doc.text("- Hydration: Minimum 3-4 liters of water daily", 20, 186);

    doc.save("Sankalp_Fitness_Plan.pdf");
  };

  const getOverviewText = () => {
    if (language === 'hi') {
      switch(detailedCareer?.id) {
        case 'nda': return "विकास, नेतृत्व और राष्ट्र की सेवा के लिए अद्वितीय अवसर प्रदान करने वाला एक प्रतिष्ठित करियर मार्ग। उम्मीदवार एनडीए खडकवासला में 3 साल के कड़े प्रशिक्षण के बाद सेना, नौसेना या वायु सेना में अधिकारी बनते हैं।";
        case 'cds': return "स्नातक के बाद रक्षा बलों में सीधे अधिकारी बनने का एक शानदार अवसर। चयनित कैडेट आईएमए, ओटीए, आईएनए या एएफए में कठोर सैन्य नेतृत्व और सामरिक कौशल सीखते हैं।";
        case 'drdo': return "देश की रक्षा प्रणालियों और रणनीतिक हथियारों (जैसे मिसाइल, रडार) के अनुसंधान और विकास में शामिल होने का प्रतिष्ठित वैज्ञानिक करियर।";
        case 'isro': return "भारत के अंतरिक्ष मिशनों (जैसे चंद्रयान, गगनयान) और उपग्रह प्रौद्योगिकियों का हिस्सा बनकर देश को अंतरिक्ष अन्वेषण के क्षेत्र में वैश्विक नेता बनाने का अवसर।";
        case 'engineering': return "नवीनतम सॉफ्टवेयर तकनीकों, बड़े डेटा आर्किटेक्चर, और अभिनव तकनीकी उत्पादों का डिजाइन और निर्माण करने का एक अत्यधिक गतिशील और पुरस्कृत करियर।";
        case 'medical': return "एक लाइसेंस प्राप्त चिकित्सक के रूप में रोगियों का इलाज करने, नैदानिक अनुसंधान करने और स्वास्थ्य प्रणालियों को बेहतर बनाने का पुनीत और सम्मानित पेशा।";
        case 'law': return "कॉर्पोरेट अनुबंधों, विलय और अधिग्रहण, कानूनी पैरवी और नीतिगत अनुपालन में विशेषज्ञता हासिल करने का एक मांग वाला बौद्धंिक करियर।";
        case 'civil': return "देश के सर्वोच्च प्रशासनिक पदों (IAS/IPS) पर नीति निर्माण और सार्वजनिक सेवाओं को सीधे जमीनी स्तर पर क्रियान्वित करने का सर्वोच्च अवसर।";
        default: return "विकास, नेतृत्व और राष्ट्र की सेवा के लिए अद्वितीय अवसर प्रदान करने वाला एक प्रतिष्ठित करियर मार्ग। उम्मीदवार विश्व स्तरीय प्रशिक्षण के बाद कठोर चयन प्रक्रियाओं से गुजरते हैं।";
      }
    }
    return "A prestigious career path offering unparalleled opportunities for growth, leadership, and serving the nation. Candidates undergo rigorous selection processes followed by world-class training.";
  };

  const getAgeLimitText = () => {
    if (language === 'hi') {
      switch(detailedCareer?.id) {
        case 'nda': return "16.5 - 19.5 वर्ष (केवल अविवाहित पुरुष/महिला उम्मीदवार)";
        case 'cds': return "19 - 25 वर्ष (विंग और अकादमी के अनुसार भिन्न)";
        case 'drdo': return "अधिकतम 28 वर्ष (सामान्य श्रेणी के लिए, आरक्षित श्रेणियों के लिए सरकारी नियमानुसार छूट)";
        case 'isro': return "अधिकतम 35 वर्ष (सरकारी मानदंडों के अनुसार आयु में छूट)";
        case 'engineering': return "कोई विशिष्ट आयु सीमा नहीं (संस्था और पद के अनुसार)";
        case 'medical': return "प्रवेश परीक्षा के समय न्यूनतम 17 वर्ष पूर्ण होने चाहिए";
        case 'law': return "लॉ प्रवेश परीक्षाओं (CLAT/LSAT) के लिए कोई ऊपरी आयु सीमा नहीं";
        case 'civil': return "21 - 32 वर्ष (सामान्य श्रेणी के लिए, अन्य श्रेणियों के लिए नियमानुसार छूट)";
        default: return "पात्रता मानदंडों के अनुसार अलग-अलग है।";
      }
    }
    switch(detailedCareer?.id) {
      case 'nda': return "16.5 - 19.5 years (unmarried candidates)";
      case 'cds': return "19 - 25 years (varies by academy and wing)";
      case 'drdo': return "Max 28 years (relaxation applies for reserved categories)";
      case 'isro': return "Max 35 years (standard relaxation as per govt rules)";
      case 'engineering': return "No upper age limit (standard industry practice)";
      case 'medical': return "Min 17 years at admission; no upper limit";
      case 'law': return "No upper age limit for professional legal practice";
      case 'civil': return "21 - 32 years (relaxation for reserved categories)";
      default: return "Typically 18-32 years depending on category.";
    }
  };

  const getPhysicalText = () => {
    if (language === 'hi') {
      return "सख्त चिकित्सा और शारीरिक फिटनेस आवश्यकताएं (विशेषकर रक्षा शाखाओं के लिए)।";
    }
    return "Strict medical, fitness, and vision requirements apply.";
  };

  const getExamsText = () => {
    if (language === 'hi') {
      switch(detailedCareer?.id) {
        case 'nda': return "यूपीएससी द्वारा आयोजित एनडीए लिखित परीक्षा (वर्ष में दो बार) और 5-दिवसीय एसएसबी साक्षात्कार।";
        case 'cds': return "यूपीएससी द्वारा आयोजित सीडीएस लिखित परीक्षा (वर्ष में दो बार) और 5-दिवसीय एसएसबी साक्षात्कार।";
        case 'drdo': return "गेट (GATE) परीक्षा और भर्ती मूल्यांकन केंद्र (RAC) द्वारा आयोजित लिखित परीक्षा व विशेषज्ञ साक्षात्कार।";
        case 'isro': return "इसरो आईसीआरबी (ICRB) लिखित परीक्षा और वैज्ञानिक चयन बोर्ड द्वारा आयोजित व्यक्तिगत तकनीकी साक्षात्कार।";
        case 'engineering': return "कैंपस प्लेसमेंट कोडिंग टेस्ट, हैकथॉन और ऑफ-कैंपस तकनीकी कोडिंग राउंड।";
        case 'medical': return "राष्ट्रीय पात्रता सह प्रवेश परीक्षा (NEET-UG) और भविष्य में NEXT लाइसेंस परीक्षा।";
        case 'law': return "कॉमन लॉ एडमिशन टेस्ट (CLAT) या एलसैट (LSAT) राष्ट्रीय स्तर की परीक्षा।";
        case 'civil': return "यूपीएससी सिविल सेवा परीक्षा (CSE) - प्रारंभिक, मुख्य और साक्षात्कार के तीन चरण।";
        default: return "संबंधित राष्ट्रीय परीक्षा बोर्ड द्वारा आयोजित लिखित और साक्षात्कार दौर।";
      }
    }
    switch(detailedCareer?.id) {
      case 'nda': return "UPSC NDA Written Examination held biannually, followed by a 5-day SSB interview.";
      case 'cds': return "UPSC CDS Written Examination held biannually, followed by a 5-day SSB interview.";
      case 'drdo': return "GATE exam score followed by RAC subjective written examination and panel interviews.";
      case 'isro': return "ISRO ICRB technical written exam followed by scientific board personal interviews.";
      case 'engineering': return "Campus placement recruitment drives, technical hackathons, and direct coding rounds.";
      case 'medical': return "NEET-UG entrance exam, followed by continuous clinical evaluations and future NEXT exam.";
      case 'law': return "Common Law Admission Test (CLAT) or Law School Admission Test (LSAT).";
      case 'civil': return "UPSC Civil Services Examination consisting of Prelims, Mains, and Interview rounds.";
      default: return "National-level entrance exam followed by selection panel evaluation.";
    }
  };

  const getSalaryText = () => {
    if (language === 'hi') {
      switch(detailedCareer?.id) {
        case 'nda': return "₹56,100 - ₹1,77,500 (लेवल 10 + अतिरिक्त सैन्य भत्ते)";
        case 'cds': return "₹56,100 - ₹1,77,500 (लेवल 10 + रक्षा भत्ते)";
        case 'drdo': return "₹56,100 - ₹1,77,500 (लेवल 10 वैज्ञानिक 'बी' + भत्ते)";
        case 'isro': return "₹56,100 - ₹1,77,500 (वैज्ञानिक 'एससी' + एचआरए और सुविधाएं)";
        case 'engineering': return "₹6,00,000 - ₹35,00,000 प्रति वर्ष (कंपनी और अनुभव के अनुसार)";
        case 'medical': return "₹60,000 - ₹2,50,000 प्रति माह (सरकारी/निजी और विशेषज्ञता के अनुसार)";
        case 'law': return "₹8,00,000 - ₹24,00,000 प्रति वर्ष (शीर्ष लॉ फर्मों या स्वतंत्र वकालत में)";
        case 'civil': return "₹56,100 - ₹2,50,000 (लेवल 10 से शुरू + सरकारी आवास और सुविधाएं)";
        default: return "उद्योग और अनुभव के अनुसार प्रतिस्पर्धी पैकेज।";
      }
    }
    switch(detailedCareer?.id) {
      case 'nda': return "₹56,100 - ₹1,77,500 (Level 10 basic pay + military allowances)";
      case 'cds': return "₹56,100 - ₹1,77,500 (Level 10 basic pay + military allowances)";
      case 'drdo': return "₹56,100 - ₹1,77,500 (Level 10 basic pay + HRA, medical, allowances)";
      case 'isro': return "₹56,100 - ₹1,77,500 (Scientist 'SC' basic pay + space allowances)";
      case 'engineering': return "₹6,00,000 - ₹35,00,000 LPA (varies by startup or FAANG packages)";
      case 'medical': return "₹8,00,000 - ₹30,00,000 LPA (dependent on specialization/experience)";
      case 'law': return "₹8,00,000 - ₹25,00,000 LPA (Tier-1 firms or independent chambers)";
      case 'civil': return "₹56,100 - ₹2,50,000 (Level 10 start with official accommodation/transport)";
      default: return "Highly competitive pay scales based on industry and rank.";
    }
  };

  const getInstitutesText = () => {
    if (language === 'hi') {
      switch(detailedCareer?.id) {
        case 'nda': return "एनडीए खडकवासला (पुणे), आईएमए देहरादून, आईएनए एझिमाला, एएफए डुंडीगल";
        case 'cds': return "आईएमए देहरादून, ओटीए चेन्नई, भारतीय नौसेना अकादमी, वायु सेना अकादमी";
        case 'drdo': return "डीआईएटी पुणे, आईआईटी, एनआईटी, बिट्स पिलानी और प्रमुख राष्ट्रीय अनुसंधान संस्थान";
        case 'isro': return "आईआईएसटी तिरुवनंतपुरम, आईआईटी, आईआईएससी बैंगलोर, शीर्ष इंजीनियरिंग कॉलेज";
        case 'engineering': return "आईआईटी (IIT), एनआईटी (NIT), ट्रिपलआईटी (IIIT), बिट्स पिलानी और प्रमुख विश्वविद्यालय";
        case 'medical': return "एम्स (AIIMS), मौलाना आजाद मेडिकल कॉलेज, एएफएमसी पुणे, केजीएमयू लखनऊ";
        case 'law': return "एनएलएसआईयू बैंगलोर, नाल्सार हैदराबाद, एनयूजेएस कोलकाता, दिल्ली विश्वविद्यालय";
        case 'civil': return "लालबहादुर शास्त्री राष्ट्रीय प्रशासन अकादमी (LBSNAA) मसूरी, एसवीपीएनपीए हैदराबाद";
        default: return "शीर्ष श्रेणी के राष्ट्रीय विश्वविद्यालय और मान्यता प्राप्त बोर्ड।";
      }
    }
    switch(detailedCareer?.id) {
      case 'nda': return "NDA Khadakwasla, IMA Dehradun, INA Ezhimala, AFA Dundigal";
      case 'cds': return "IMA Dehradun, OTA Chennai, INA Ezhimala, AFA Dundigal";
      case 'drdo': return "DIAT Pune, IITs, NITs, BITS Pilani, and top national research centers";
      case 'isro': return "IIST Thiruvananthapuram, IITs, IISc Bangalore, top engineering institutes";
      case 'engineering': return "IITs, NITs, IIITs, BITS Pilani, and premier technology departments";
      case 'medical': return "AIIMS New Delhi, AFMC Pune, MAMC New Delhi, KGMU Lucknow";
      case 'law': return "NLSIU Bangalore, NALSAR Hyderabad, NUJS Kolkata, Faculty of Law DU";
      case 'civil': return "LBSNAA Mussoorie, SVPNPA Hyderabad, IGNFA Dehradun";
      default: return "Top-tier national universities and recognized boards.";
    }
  };

  const getPromotionsText = () => {
    if (language === 'hi') {
      switch(detailedCareer?.id) {
        case 'nda': return "लेफ्टिनेंट से लेफ्टिनेंट कर्नल तक समय-बद्ध पदोन्नति, उसके बाद चयन-आधारित जनरल रैंक तक।";
        case 'cds': return "लेफ्टिनेंट से कैप्टन, मेजर, लेफ्टिनेंट कर्नल और ब्रिगेडियर/जनरल तक समय-बद्ध और चयन पद।";
        case 'drdo': return "वैज्ञानिक 'बी' से वैज्ञानिक 'सी', 'डी', 'ई', 'एफ', 'जी' और विशिष्ट वैज्ञानिक/महानिदेशक तक।";
        case 'isro': return "वैज्ञानिक 'एससी' से वैज्ञानिक 'एसडी', 'एसई', 'एसएफ', 'एसजी' और उत्कृष्ट वैज्ञानिक/निदेशक तक।";
        case 'engineering': return "एसडीई-1 से एसडीई-2, वरिष्ठ एसडीई, टेक लीड, इंजीनियरिंग मैनेजर और मुख्य वास्तुकार (Architect)।";
        case 'medical': return "रेसिडेंट डॉक्टर से जूनियर कंसलटेंट, सीनियर कंसलटेंट, विभाग प्रमुख (HOD) और मेडिकल डायरेक्टर।";
        case 'law': return "एसोसिएट से सीनियर एसोसिएट, प्रिंसिपल एसोसिएट, और अंततः लॉ फर्म में पार्टनर।";
        case 'civil': return "एसडीएम से जिला मजिस्ट्रेट, सचिव, मुख्य सचिव, और भारत के कैबिनेट सचिव (सर्वोच्च पद)।";
        default: return "संगठनात्मक पदानुक्रम और योग्यता के अनुसार पदोन्नति।";
      }
    }
    switch(detailedCareer?.id) {
      case 'nda': return "Time-bound promotions up to Lt. Colonel; selection-based thereafter up to General rank.";
      case 'cds': return "Time-bound promotions up to Lt. Colonel; selection-based thereafter up to General rank.";
      case 'drdo': return "Scientist 'B' to Scientist 'C', 'D', 'E', 'F', 'G', Outstanding Scientist and Director General.";
      case 'isro': return "Scientist 'SC' to Scientist 'SD', 'SE', 'SF', 'SG', Outstanding Scientist and Director.";
      case 'engineering': return "SDE-1 to SDE-2, Senior Engineer, Tech Lead, Engineering Manager, Director, CTO.";
      case 'medical': return "Resident Physician to Junior Consultant, Senior Consultant, Head of Department (HOD).";
      case 'law': return "Junior Associate to Senior Associate, Principal Associate, and Equity Partner.";
      case 'civil': return "Assistant Commissioner to District Magistrate, State Secretary, Cabinet Secretary.";
      default: return "Performance-linked appraisals and hierarchical tenure promotions.";
    }
  };

  return (
    <div className="space-y-8" id="career_library_root">
      
      {/* Header */}
      <div className="bg-gradient-to-br from-navy-900 to-navy-850 p-8 rounded-3xl border border-gold-600/20 text-center relative overflow-hidden shadow-xl">
        <h1 className="text-3xl md:text-5xl font-black text-lightyellow-100 uppercase tracking-widest font-sans mb-4">
          Career Library
        </h1>
        <p className="text-sm text-lightyellow-200/80 max-w-2xl mx-auto mb-8 font-sans">
          Explore detailed career pathways, eligibility criteria, exams, and growth opportunities across top sectors in India, with a special focus on Defence & Strategic careers.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-400 w-5 h-5 font-semibold" />
          <input 
            type="text" 
            placeholder="Search careers, exams, or streams..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-navy-950 border border-gold-500/30 rounded-full py-4 pl-12 pr-6 text-sm text-lightyellow-100 focus:outline-none focus:border-gold-400 shadow-inner"
          />
        </div>
      </div>

      {selectedCareer && detailedCareer && translatedCareer ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-navy-900 border border-gold-600/30 rounded-3xl p-6 md:p-10 shadow-2xl"
        >
          {/* Top Row with Back Button and Language Switcher */}
          <div className="flex items-center justify-between gap-4 flex-wrap mb-6 border-b border-gold-500/10 pb-4">
            <button 
              onClick={() => setSelectedCareer(null)}
              className="text-gold-400 hover:text-gold-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              {language === 'hi' ? "← लाइब्रेरी पर वापस जाएं" : "← Back to Library"}
            </button>

            <div className="flex items-center gap-1 bg-navy-950 border border-gold-500/20 p-1.5 rounded-xl">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition cursor-pointer ${
                  language === 'en' 
                    ? 'bg-gradient-to-r from-gold-450 to-gold-500 text-navy-950 font-black shadow-lg' 
                    : 'text-lightyellow-200/60 hover:text-lightyellow-100'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition cursor-pointer ${
                  language === 'hi' 
                    ? 'bg-gradient-to-r from-gold-450 to-gold-500 text-navy-950 font-black shadow-lg' 
                    : 'text-lightyellow-200/60 hover:text-lightyellow-100'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          
          <div className="flex items-start gap-4 mb-8 border-b border-gold-500/20 pb-6">
            <div className="p-4 bg-navy-950 rounded-2xl border border-gold-500/30">
              {detailedCareer.icon}
            </div>
            <div>
              <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest border border-gold-500/30 px-2 py-0.5 rounded-full mb-2 inline-block font-semibold">
                {translatedCareer.category} {language === 'hi' ? "" : "Sector"}
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-lightyellow-100 uppercase tracking-tight">{translatedCareer.title}</h2>
              <p className="text-sm text-lightyellow-200/80 mt-2">{translatedCareer.shortDesc}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-gold-400 uppercase tracking-widest mb-2 border-b border-gold-500/20 pb-1">
                  {language === 'hi' ? "अवलोकन" : "Overview"}
                </h3>
                <p className="text-sm text-lightyellow-100/90 leading-relaxed">
                  {getOverviewText()}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-bold text-gold-400 uppercase tracking-widest mb-2 border-b border-gold-500/20 pb-1">
                  {language === 'hi' ? "पात्रता मापदंड" : "Eligibility Criteria"}
                </h3>
                <ul className="list-disc pl-5 text-sm text-lightyellow-100/90 space-y-2">
                  <li><strong>{language === 'hi' ? "आवश्यक स्ट्रीम:" : "Stream Required:"}</strong> {translatedCareer.stream}</li>
                  <li><strong>{language === 'hi' ? "न्यूनतम योग्यता:" : "Minimum Qualification:"}</strong> {translatedCareer.qualification}</li>
                  <li><strong>{language === 'hi' ? "आयु सीमा:" : "Age Limit:"}</strong> {getAgeLimitText()}</li>
                  <li><strong>{language === 'hi' ? "शारीरिक मानक:" : "Physical Standards:"}</strong> {getPhysicalText()}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gold-400 uppercase tracking-widest mb-2 border-b border-gold-500/20 pb-1">
                  {language === 'hi' ? "प्रवेश परीक्षाएं" : "Entrance Exams"}
                </h3>
                <p className="text-sm text-lightyellow-100/90 leading-relaxed">
                  {getExamsText()}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-navy-950 rounded-2xl p-6 border border-gold-500/20">
                <h3 className="text-sm font-bold text-gold-400 uppercase tracking-widest mb-4">
                  {language === 'hi' ? "करियर की मुख्य विशेषताएं" : "Career Highlights"}
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] text-lightyellow-200/60 font-mono uppercase">
                      {language === 'hi' ? "शुरुआती वेतन" : "Starting Salary"}
                    </span>
                    <p className="text-sm text-lightyellow-100 font-bold">{getSalaryText()}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-lightyellow-200/60 font-mono uppercase">
                      {language === 'hi' ? "शीर्ष संस्थान" : "Top Institutes"}
                    </span>
                    <p className="text-sm text-lightyellow-100 font-bold">{getInstitutesText()}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-lightyellow-200/60 font-mono uppercase">
                      {language === 'hi' ? "पदोन्नति" : "Promotions"}
                    </span>
                    <p className="text-sm text-lightyellow-100 font-bold">{getPromotionsText()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gold-500/10 rounded-2xl p-6 border border-gold-500/40 text-center">
                <h4 className="text-base font-bold text-lightyellow-100 uppercase tracking-tight mb-2">
                  {language === 'hi' ? "क्या आपको इस करियर के लिए मार्गदर्शन चाहिए?" : "Need Guidance for this Career?"}
                </h4>
                <p className="text-xs text-lightyellow-200/80 mb-4">
                  {language === 'hi' 
                    ? "अपनी तैयारी की रणनीति तैयार करने के लिए हमारे विशेषज्ञ सलाहकारों के साथ व्यक्तिगत सत्र बुक करें।" 
                    : "Book a personalized 1-on-1 session with our expert counselors to map your preparation strategy."}
                </p>
                <button 
                  onClick={onBookCounselling}
                  className="w-full py-3 bg-gold-450 hover:bg-gold-500 text-navy-950 font-bold text-sm uppercase tracking-widest rounded-xl transition cursor-pointer"
                >
                  {language === 'hi' ? "अभी काउंसलिंग बुक करें" : "Book Counselling Now"}
                </button>
              </div>
            </div>
          </div>

          {/* Visual Career Roadmap Component */}
          <div className="mt-12 bg-navy-950/80 border border-gold-600/20 rounded-2xl p-6 md:p-8 animate-fade-in" id="career_roadmap_section">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-gold-500/20">
              <div>
                <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest font-black flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" /> {language === 'hi' ? "संकल्प संप्रभुता पथ" : "SANKALP SOVEREIGN PATHWAY"}
                </span>
                <h3 className="text-xl md:text-2xl font-black text-lightyellow-100 uppercase tracking-tight font-sans">
                  {language === 'hi' ? "इंटरैक्टिव चरण-दर-चरण शैक्षिक रोडमैप" : "Interactive Step-by-Step Educational Roadmap"}
                </h3>
                <p className="text-xs text-lightyellow-200/70 mt-1 max-w-xl">
                  {language === 'hi' 
                    ? `कैंडिडेट्स के लिए तैयार किया गया एक व्यापक, उच्च-सटीकता मील का पत्थर अनुक्रम। विवरण देखने के लिए चरणों पर क्लिक करें।` 
                    : `A comprehensive, high-fidelity milestone sequence tailored for ${translatedCareer.title} aspirants. Click steps to view tactical action advice.`}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleDownloadPDF(detailedCareer)}
                  className="flex items-center gap-2 bg-gradient-to-r from-gold-450 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-navy-950 font-black text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all duration-200 shadow-[0_4px_12px_rgba(212,175,55,0.15)] hover:shadow-[0_4px_16px_rgba(212,175,55,0.3)] cursor-pointer"
                  title="Download offline career guide"
                >
                  <Download className="w-4 h-4" />
                  <span>{language === 'hi' ? "पीडीएफ गाइड डाउनलोड करें" : "Download PDF Guide"}</span>
                </button>
                <div className="flex items-center gap-2 bg-navy-900 border border-gold-500/20 px-3.5 py-2.5 rounded-xl text-xs font-mono text-gold-400 font-semibold">
                  <Clock className="w-4 h-4 text-gold-400 animate-spin font-semibold" style={{ animationDuration: '6s' }} />
                  <span>{language === 'hi' ? "कस्टम शिक्षण पथ" : "Custom Learning Path"}</span>
                </div>
              </div>
            </div>

            {/* Visual Roadmap Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Side: Timeline Navigation */}
              <div className="lg:col-span-4 space-y-3 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
                {currentRoadmapSteps.map((step) => {
                  const isActive = activeRoadmapStep === step.number;
                  return (
                    <button
                      key={step.number}
                      onClick={() => setActiveRoadmapStep(step.number)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-3.5 group cursor-pointer ${
                        isActive
                          ? "bg-gold-500/15 border-gold-450/80 shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                          : "bg-navy-900 border-gold-500/10 hover:border-gold-500/45 hover:bg-navy-850"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-black shrink-0 transition-all duration-300 ${
                          isActive
                            ? "bg-gold-450 text-navy-950 scale-105 shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                            : "bg-navy-950 text-gold-400 border border-gold-500/30 group-hover:border-gold-400"
                        }`}
                      >
                        {step.number}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4
                            className={`text-xs font-bold uppercase tracking-wider transition ${
                              isActive ? "text-gold-400" : "text-lightyellow-100 group-hover:text-gold-300"
                            }`}
                          >
                            {step.title}
                          </h4>
                          <ChevronRight
                            className={`w-4 h-4 text-gold-400/50 shrink-0 transition-transform ${
                              isActive ? "translate-x-1" : "group-hover:translate-x-0.5"
                            } font-semibold`}
                          />
                        </div>
                        <p className="text-[10px] text-lightyellow-200/60 font-mono font-semibold">
                          {step.duration}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Side: Step Detail Panel */}
              <div className="lg:col-span-8 bg-navy-900/60 border border-gold-500/10 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
                {(() => {
                  const activeStepObj = currentRoadmapSteps.find((s) => s.number === activeRoadmapStep) || currentRoadmapSteps[0];
                  
                  if (!activeStepObj) {
                    return (
                      <div className="text-center py-12 text-lightyellow-200/40 text-xs">
                        {language === 'hi' ? "विवरण देखने के लिए शैक्षिक सूची से एक चरण चुनें।" : "Select a step from the educational list to map out details."}
                      </div>
                    );
                  }

                  return (
                    <div className="space-y-6">
                      {/* Step Title Header */}
                      <div className="flex items-start justify-between gap-4 border-b border-gold-500/10 pb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="px-2 py-0.5 bg-gold-500/15 border border-gold-400/30 text-gold-400 text-[10px] font-mono uppercase font-black rounded">
                              {language === 'hi' ? `चरण ${activeStepObj.number} का ${currentRoadmapSteps.length}` : `Stage ${activeStepObj.number} of ${currentRoadmapSteps.length}`}
                            </span>
                            <span className="text-[10px] font-mono text-lightyellow-200/60">
                              {language === 'hi' ? "अनुमानित अवधि:" : "Estimated Duration:"} {activeStepObj.duration}
                            </span>
                          </div>
                          <h4 className="text-lg font-black text-lightyellow-100 uppercase tracking-tight">
                            {activeStepObj.title}
                          </h4>
                        </div>
                        <div className="p-2 bg-gold-500/10 rounded-xl border border-gold-500/20 text-gold-400 shrink-0 font-semibold">
                          <Award className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-4">
                        <div>
                          <h5 className="text-[11px] font-mono uppercase tracking-widest text-gold-400/80 mb-1.5 font-bold">
                            {language === 'hi' ? "चरण का उद्देश्य और कार्रवाई" : "Stage Objective & Actions"}
                          </h5>
                          <p className="text-sm text-lightyellow-100/95 leading-relaxed bg-navy-950/60 p-4 rounded-xl border border-gold-500/5">
                            {activeStepObj.description}
                          </p>
                        </div>

                        {/* Tactical Insider Tips */}
                        <div className="bg-gold-500/5 border border-gold-500/20 rounded-xl p-4 space-y-1.5">
                          <h5 className="text-[11px] font-mono uppercase tracking-widest text-gold-400 font-bold flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse font-semibold" /> {language === 'hi' ? "संकल्प विशेषज्ञ सलाह" : "SANKALP SPECIALIST ADVICE"}
                          </h5>
                          <p className="text-xs text-lightyellow-200/90 italic leading-relaxed">
                            "{activeStepObj.tip}"
                          </p>
                        </div>
                      </div>

                      {/* Milestone Achievement */}
                      <div className="flex items-center gap-3 bg-navy-950 border border-gold-500/20 p-3.5 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-gold-400 shrink-0 font-semibold" />
                        <div>
                          <span className="text-[9px] font-mono uppercase text-lightyellow-200/50">
                            {language === 'hi' ? "आवश्यक सत्यापन मील का पत्थर" : "Required Verification Milestone"}
                          </span>
                          <p className="text-xs text-lightyellow-100 font-bold tracking-tight">
                            {activeStepObj.milestone}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          <CareerFlowChart category={detailedCareer.category} />
          <div className="text-[10px] text-lightyellow-200/40 text-center italic mt-6">
            {language === 'hi' 
              ? "* अस्वीकरण: भर्ती नियम, पात्रता और रिक्तियों को हमेशा संबंधित संगठनों द्वारा जारी आधिकारिक अधिसूचनाओं के माध्यम से सत्यापित किया जाना चाहिए।" 
              : "* Disclaimer: Recruitment rules, eligibility, and vacancies should always be verified through official notifications issued by the relevant organisations."}
          </div>
        </motion.div>
      ) : (
        <>
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  activeCategory === cat 
                  ? 'bg-gold-450 text-navy-950' 
                  : 'bg-navy-900 text-lightyellow-200 border border-gold-500/20 hover:border-gold-500/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCareers.map((career) => (
              <div 
                key={career.id} 
                className="bg-navy-900 border border-gold-600/20 rounded-2xl p-6 hover:border-gold-500/60 transition shadow-lg group cursor-pointer flex flex-col h-full"
                onClick={() => setSelectedCareer(career.id)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-navy-950 rounded-xl border border-gold-500/20 group-hover:scale-110 transition-transform">
                    {career.icon}
                  </div>
                  <span className="text-[10px] font-mono text-gold-400 uppercase tracking-wider bg-navy-950 px-2 py-1 rounded border border-gold-500/20 font-semibold">
                    {career.category}
                  </span>
                </div>
                <h3 className="text-lg font-black text-lightyellow-100 tracking-tight leading-tight mb-2">
                  {career.title}
                </h3>
                <p className="text-xs text-lightyellow-200/70 mb-4 flex-grow">
                  {career.shortDesc}
                </p>
                <div className="mt-auto space-y-2 border-t border-gold-500/10 pt-4">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-lightyellow-200/50">Qualification:</span>
                    <span className="text-gold-400 font-bold text-right">{career.qualification}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-lightyellow-200/50">Stream:</span>
                    <span className="text-lightyellow-100 font-bold text-right">{career.stream}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredCareers.length === 0 && (
            <div className="text-center py-12 text-lightyellow-200/50">
              No careers found matching your criteria. Try adjusting your search.
            </div>
          )}

          {/* Downloadable Resources Section */}
          <div className="mt-16 bg-navy-900 border border-gold-600/20 rounded-3xl p-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
               <Download className="w-64 h-64 text-gold-500" />
             </div>
             
             <div className="relative z-10">
               <h3 className="text-2xl md:text-3xl font-black text-lightyellow-100 uppercase tracking-tight mb-2">
                 Downloadable Resources
               </h3>
               <p className="text-sm text-lightyellow-200/70 max-w-2xl mb-8">
                 Access high-quality PDF templates designed to help you prepare effectively. Get structured study schedules and tactical physical fitness plans.
               </p>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Study Schedule Template */}
                 <div className="bg-navy-950 border border-gold-500/20 rounded-2xl p-6 hover:border-gold-500/60 transition group cursor-pointer" onClick={handleDownloadStudySchedule}>
                   <div className="flex items-center gap-4 mb-4">
                     <div className="p-3 bg-gold-500/10 rounded-xl text-gold-400 group-hover:scale-110 transition-transform">
                       <BookOpen className="w-6 h-6" />
                     </div>
                     <div>
                       <h4 className="text-lg font-bold text-lightyellow-100">Study Schedule Template</h4>
                       <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest">PDF Planner</span>
                     </div>
                   </div>
                   <p className="text-xs text-lightyellow-200/70 mb-6">
                     A customizable weekly study planner focusing on time management, subject allocation, and revision cycles for competitive exams.
                   </p>
                   <button 
                     className="w-full flex items-center justify-center gap-2 bg-navy-900 border border-gold-500/30 hover:bg-gold-500/10 text-gold-400 font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all"
                   >
                     <Download className="w-4 h-4" /> Download PDF
                   </button>
                 </div>

                 {/* Physical Fitness Plan */}
                 <div className="bg-navy-950 border border-gold-500/20 rounded-2xl p-6 hover:border-gold-500/60 transition group cursor-pointer" onClick={handleDownloadFitnessPlan}>
                   <div className="flex items-center gap-4 mb-4">
                     <div className="p-3 bg-gold-500/10 rounded-xl text-gold-400 group-hover:scale-110 transition-transform">
                       <Target className="w-6 h-6" />
                     </div>
                     <div>
                       <h4 className="text-lg font-bold text-lightyellow-100">Physical Fitness Plan</h4>
                       <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest">PDF Guide</span>
                     </div>
                   </div>
                   <p className="text-xs text-lightyellow-200/70 mb-6">
                     A tactical fitness routine tailored for Defence and Police services, covering endurance, strength training, and dietary guidelines.
                   </p>
                   <button 
                     className="w-full flex items-center justify-center gap-2 bg-navy-900 border border-gold-500/30 hover:bg-gold-500/10 text-gold-400 font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all"
                   >
                     <Download className="w-4 h-4" /> Download PDF
                   </button>
                 </div>
               </div>
             </div>
          </div>
        </>
      )}
    </div>
  );
}
