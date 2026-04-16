import React from 'react';
import { motion } from 'motion/react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-primary py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Privacy Policy
          </motion.h1>
          <p className="text-xl text-blue-200 mb-8 italic">Last updated on 16th April 2026</p>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Content */}
      <main className="container mx-auto px-4 py-16">
        <motion.div 
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-12"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          {[
            {
              id: 1,
              title: "Introduction",
              content: "Origin BI MindWorks Pvt Ltd (“Origin BI”, “we”, “our”, or “us”) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and safeguard your data when you access our website, participate in assessments, or use our behavioral intelligence, career guidance, and analytics services."
            },
            {
              id: 2,
              title: "Information We Collect",
              list: [
                "Personal details such as name, email address, phone number, age, gender",
                "Assessment responses, survey data, and psychometric inputs",
                "Usage data including device information, browser type, session activity",
                "Communication data when you contact us for support or queries via our Contact Us form"
              ]
            },
            {
              id: 3,
              title: "How We Use Your Information",
              list: [
                "To provide personalized reports, insights, and recommendations",
                "To improve platform performance and user experience",
                "To respond to queries, feedback, and support requests",
                "To comply with legal and regulatory obligations",
                "To process payments securely through Razorpay (we do not store payment details)"
              ]
            },
            {
              id: 4,
              title: "Payment Information",
              content: "All payments are processed securely via Razorpay. Origin BI does not collect or store your debit card, credit card, UPI, or banking credentials. Payment information is handled directly by Razorpay in compliance with applicable security standards."
            },
            {
              id: 5,
              title: "Data Sharing & Disclosure",
              content: "We do not sell or rent your personal data. Information may be shared only:",
              list: [
                "With trusted third-party service providers (such as secure email routing services) strictly for the purpose of communicating with you",
                "With trusted service providers under strict confidentiality",
                "When required by law, court order, or government authority",
                "In anonymized and aggregated form for analytics or research"
              ]
            },
            {
              id: 6,
              title: "Data Security & Retention",
              content: "We implement reasonable technical and organizational security measures to protect your data. Information is retained only as long as necessary for service delivery, legal compliance, or legitimate business purposes."
            },
            {
              id: 7,
              title: "Your Rights",
              list: [
                "Request access, correction, or deletion of your personal data",
                "Withdraw consent for non-essential communications",
                "Request clarification on data usage"
              ]
            },
            {
              id: 8,
              title: "Children’s Privacy",
              content: "Our services are not intended for children under the age of 13 without verified parental or guardian consent."
            },
            {
              id: 9,
              title: "Policy Updates",
              content: "This Privacy Policy may be updated periodically. Changes will be reflected on this page with an updated revision date."
            }
          ].map((section) => (
            <section key={section.id}>
              <h3 className="text-2xl font-bold mb-6 flex items-center text-primary">
                <span className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center mr-4 text-lg">{section.id}</span>
                {section.title}
              </h3>
              {section.content && <p className="text-gray-700 leading-relaxed mb-4">{section.content}</p>}
              {section.list && (
                <ul className="space-y-3 ml-14 text-gray-700 list-disc">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section>
            <h3 className="text-2xl font-bold mb-6 flex items-center text-primary">
              <span className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center mr-4 text-lg">10</span>
              Contact Us
            </h3>
            <div className="bg-blue-50 rounded-xl p-8 text-gray-700 space-y-3 border border-blue-100">
              <p><strong>Email:</strong> info@originbi.com</p>
              <p><strong>Mobile:</strong> +91-9445997283</p>
              <p><strong>Address:</strong> Origin BI MindWorks Pvt Ltd, 21B, First Floor, 5th Cross Street, South phase, Industrial Estate, Guindy, Chennai – 600032</p>
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
}
