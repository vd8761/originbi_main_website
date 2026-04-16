import React from 'react';
import { motion } from 'motion/react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function TermsAndConditions() {
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
            Terms & Conditions
          </motion.h1>
          <p className="text-xl text-blue-200 mb-8 italic">Last updated on 10th July 2025</p>
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
              title: "Acceptance of Terms",
              content: "By accessing our website, using our services, or making payments through Razorpay, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.",
              extra: "We may update these Terms and Conditions at any time. Continued use of our services after any changes constitutes acceptance of the revised terms. Significant updates may be communicated via email or displayed as a notice on our website."
            },
            {
              id: 2,
              title: "Services Offered",
              content: "Origin BI MindWorks Pvt Ltd provides behavioral assessments, role fitment analysis, career direction insights, workforce analytics, and digital reports. All services are advisory in nature.",
              list: [
                "Assessments are generated based on user-provided information and proprietary algorithms; accuracy, outcomes, or interpretations are not guaranteed.",
                "Reports are typically delivered within 24–48 hours unless otherwise specified."
              ]
            },
            {
              id: 3,
              title: "Payments & Pricing",
              list: [
                "All prices are listed in Indian Rupees (INR) unless stated otherwise.",
                "Payments are processed securely via Razorpay.",
                "Origin BI does not store card, UPI, or banking credentials.",
                "Services are activated only after successful payment."
              ],
              extra: "Prices may include or exclude applicable taxes depending on the service. International payments may incur currency conversion or processing fees as determined by the payment provider. Origin BI reserves the right to decline, review, or cancel transactions flagged as suspicious or potentially fraudulent."
            },
            {
              id: 4,
              title: "Refund & Cancellation",
              content: "Payments once made are non-refundable except in cases of duplicate payment or technical failure where service delivery was not possible. Approved refunds will be processed to the original payment method within 7–10 working days."
            },
            {
              id: 5,
              title: "User Responsibilities",
              list: [
                "Provide accurate and complete information",
                "Use reports and insights ethically and lawfully",
                "Do not copy, resell, or redistribute reports without written consent"
              ],
              extra: "Any violation of these responsibilities may result in suspension or termination of access, legal action, or claims for damages where applicable."
            },
            {
              id: 6,
              title: "Intellectual Property",
              content: "You are granted a limited, non-transferable, non-exclusive license to use the reports and materials provided solely for personal or internal purposes. All intellectual property rights, including methodologies, content, and branding, remain with Origin BI MindWorks Pvt Ltd. All rights not expressly granted are reserved."
            },
            {
              id: 7,
              title: "Limitation of Liability",
              content: "Origin BI shall not be liable for decisions taken based on assessment or report outcomes. All insights are advisory in nature and should be used with independent judgment or professional consultation."
            },
            {
              id: 8,
              title: "Governing Law & Jurisdiction",
              content: "These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts located in India."
            }
          ].map((section) => (
            <section key={section.id}>
              <h3 className="text-2xl font-bold mb-6 flex items-center text-primary">
                <span className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center mr-4 text-lg">{section.id}</span>
                {section.title}
              </h3>
              {section.content && <p className="text-gray-700 leading-relaxed mb-4">{section.content}</p>}
              {section.list && (
                <ul className="space-y-3 ml-14 text-gray-700 list-disc mb-4">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
              {section.extra && <p className="text-gray-700 leading-relaxed italic">{section.extra}</p>}
            </section>
          ))}

          <section>
            <h3 className="text-2xl font-bold mb-6 flex items-center text-primary">
              <span className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center mr-4 text-lg">9</span>
              Contact Information
            </h3>
            <div className="bg-blue-50 rounded-xl p-8 text-gray-700 space-y-3 border border-blue-100">
              <p><strong>Email:</strong> info@originbi.com</p>
              <p><strong>Mobile:</strong> +91-9445997283</p>
              <p><strong>Address:</strong> Origin BI MindWorks Pvt Ltd, Guindy, Chennai, Tamil Nadu, India</p>
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
}
