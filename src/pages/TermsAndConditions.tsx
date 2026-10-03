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
      <section className="relative py-20 lg:py-32 bg-[url('/assets/images/Origin_BI_Background.webp')] bg-cover bg-center text-center">
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Terms of Use
          </motion.h1>
          <p className="text-xl text-gray-700 mb-8 italic">Effective Date: October 2026</p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
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
          {/* Introduction */}
          <section>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms of Use ("Terms") constitute a legally binding agreement between you ("User", "Client", or "Organization") and OriginBI MindWorks Pvt Ltd ("OriginBI", "we", "us", or "our"), governing your access to and use of <strong>https://originbi.com</strong> and its affiliated platforms:
            </p>
            <ul className="space-y-2 ml-8 text-gray-700 list-decimal mb-6">
              <li><strong>PickMyCareer (Schools):</strong> https://pickmycareer.originbi.com</li>
              <li><strong>Discover / Rolefitment (Colleges):</strong> https://discover.originbi.com</li>
              <li><strong>Grow (Enterprises & Executives):</strong> https://grow.originbi.com</li>
            </ul>
            <p className="text-gray-700 leading-relaxed font-semibold">
              By registering an account, submitting an evaluation, or connecting third-party workplace tools, you agree to these Terms.
            </p>
          </section>

          {[
            {
              id: 1,
              title: "Description of Services",
              content: "OriginBI provides competency evaluations, career-planning blueprints, and enterprise decision-support analytics. Our analytical engine processes user assessment answers and customer-authorized workspace activity to generate structured evaluation reports."
            },
            {
              id: 2,
              title: "Third-Party Integrations (Read-Only Data Ingestion)",
              list: [
                "Authority to Connect: If you connect third-party platforms (including Google Drive, Google Sheets, Slack, Jira, ClickUp, Trello, Asana, Monday.com, Zoho CRM, or Microsoft Office 365) to OriginBI, you confirm that you possess the lawful authority to grant OriginBI read-only access to those accounts.",
                "Report Preparation Only: You acknowledge that OriginBI accesses connected applications strictly to extract activity timestamps, system logs, and designated files to calculate performance benchmarks and generate analytical reports.",
                "Zero Account Alteration: OriginBI functions exclusively as a read-only analytical platform. OriginBI will not write to, modify, overwrite, update, publish within, or delete any records or configurations in your connected third-party tools.",
                "Revocation Rights: You may revoke connector permissions at any time through your OriginBI dashboard or through the third-party application's authorization settings."
              ]
            },
            {
              id: 3,
              title: "Proprietary Rights & Content Ownership",
              list: [
                "All software, evaluation architectures, scoring models, analytical algorithms, report templates, visual designs, and user interfaces are the proprietary intellectual property of OriginBI MindWorks Pvt Ltd.",
                "Users and client organizations receive a limited, revocable, non-exclusive license to view and download their individual or organizational assessment reports for internal educational or talent-planning purposes. You may not decompile, reverse-engineer, scrape, or commercially republish any OriginBI platform components."
              ]
            },
            {
              id: 4,
              title: "Decision-Support Disclaimer",
              content: "OriginBI reports, analytical scores, and automated insights are advisory, data-driven decision-support tools. They provide objective visibility into work patterns and competency alignment. OriginBI does not make binding employment, hiring, promotion, termination, or academic admission decisions; all final administrative actions remain the sole responsibility of the respective educational institution, employer, or individual user."
            },
            {
              id: 5,
              title: "Termination & Access Disconnection",
              content: "OriginBI reserves the right to suspend or terminate account access for users who violate these Terms, attempt unauthorized penetration testing, or provide invalid authorization tokens. You may discontinue platform use at any time by ceasing access and disconnecting any linked workplace accounts."
            },
            {
              id: 6,
              title: "Governing Law & Dispute Resolution",
              content: "These Terms shall be governed by and construed under the laws of India. Any legal actions or disputes arising from or related to these Terms or platform usage shall be subject to the exclusive jurisdiction of the competent courts in Chennai, Tamil Nadu, India."
            }
          ].map((section) => (
            <section key={section.id}>
              <h3 className="text-2xl font-bold mb-6 flex items-center text-primary">
                <span className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center mr-4 text-lg shrink-0">{section.id}</span>
                {section.title}
              </h3>
              {section.content && <p className="text-gray-700 leading-relaxed mb-4">{section.content}</p>}
              {section.list && (
                <ul className="space-y-4 ml-14 text-gray-700 list-disc mb-4">
                  {section.list.map((item, i) => {
                    const [boldPart, ...rest] = item.split(': ');
                    return (
                      <li key={i}>
                        {rest.length > 0 ? (
                          <>
                            <strong className="text-gray-900">{boldPart}: </strong>
                            {rest.join(': ')}
                          </>
                        ) : (
                          item
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          ))}

          <section>
            <h3 className="text-2xl font-bold mb-6 flex items-center text-primary">
              <span className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center mr-4 text-lg shrink-0">7</span>
              Contact Details
            </h3>
            <div className="bg-blue-50 rounded-xl p-8 text-gray-700 space-y-3 border border-blue-100">
              <p><strong>OriginBI MindWorks Pvt Ltd</strong></p>
              <p>Guindy, Chennai, Tamil Nadu, India</p>
              <p><strong>Email:</strong> <a href="mailto:info@originbi.com" className="text-primary hover:underline">info@originbi.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+919445997283" className="text-primary hover:underline">+91-9445997283</a></p>
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
}
