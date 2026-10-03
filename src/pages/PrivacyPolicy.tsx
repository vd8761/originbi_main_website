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
      <section className="relative py-20 lg:py-32 bg-[url('/assets/images/Origin_BI_Background.webp')] bg-cover bg-center text-center">
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Privacy Policy
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
              OriginBI MindWorks Pvt Ltd ("OriginBI", "we", "us", or "our") operates <strong>https://originbi.com</strong> and its associated portals:
            </p>
            <ul className="space-y-2 ml-8 text-gray-700 list-disc mb-6">
              <li><strong>PickMyCareer (School Students):</strong> https://pickmycareer.originbi.com</li>
              <li><strong>Discover / Rolefitment (College Students):</strong> https://discover.originbi.com</li>
              <li><strong>Grow (Corporate Employees & Executives):</strong> https://grow.originbi.com</li>
            </ul>
            <p className="text-gray-700 leading-relaxed font-semibold">
              This Privacy Policy explains how we collect, process, store, and protect information across our evaluation platforms and analytical reporting services.
            </p>
          </section>

          {[
            {
              id: 1,
              title: "Information We Collect",
              list: [
                "User Profile & Registration Data: Name, email address, educational institution or employer details, department, and contact information.",
                "Assessment & Evaluation Responses: User-submitted responses provided while completing interactive questionnaires, skill evaluations, and self-assessment forms across our portals.",
                "Third-Party Connected Application Data (Read-Only Logs & Files): When an authorized user or enterprise customer explicitly connects third-party workspace tools (such as Google Drive, Google Sheets, Google Docs, Slack, ClickUp, Jira, Trello, Asana, Monday.com, Zoho CRM, or Microsoft Office 365), our system collects read-only metadata, system activity logs, and specific document contents designated by the user."
              ]
            },
            {
              id: 2,
              title: "Third-Party Integrations & Data Ingestion (Read-Only Analysis)",
              content: "OriginBI connects to third-party workspace applications strictly to extract authorized activity logs and files provided by the customer for evaluation and report generation:",
              list: [
                "Strict Read-Only Access: All third-party connections operate in a read-only capacity. OriginBI will never edit, modify, overwrite, inject code into, delete, or reconfigure any files, records, or settings within your connected external accounts.",
                "Single Purpose of Reporting: Data retrieved from third-party logs and files is processed solely to generate internal competency reports, execution insights, and decision-support analytics for the authorizing user or organization.",
                "No Third-Party Sharing or Sale: We do not sell, rent, trade, or transfer any data retrieved from connected applications to third-party brokers, advertisers, or outside platforms.",
                "No Public AI Model Training: Customer files and telemetry logs ingested from connected workplace tools are never used to train, retrain, or improve generalized public AI models or external foundation models."
              ]
            },
            {
              id: 3,
              title: "Google API Services & Drive Limited Use Disclosure",
              content: (
                <>
                  OriginBI's use and transfer of information received from Google APIs to any other application will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google API Services User Data Policy</a>, including the Limited Use requirements:
                </>
              ),
              list: [
                "Scope of Ingestion: OriginBI requests the minimum necessary read-only permissions to Google Drive, Google Docs, or Google Sheets strictly to read customer-selected files and logs to prepare evaluation reports.",
                "Human Inspection Restrictions: No human personnel at OriginBI read your private files from Google Drive unless: (1) We have received your prior explicit written permission for specific technical troubleshooting; (2) It is strictly required for cybersecurity verification or legal compliance; or (3) The data has been anonymized and aggregated for system performance verification.",
                "Zero Account Modification: OriginBI does not perform file uploads, modifications, permission changes, or deletions within your Google Drive account."
              ]
            },
            {
              id: 4,
              title: "Data Security & Storage",
              list: [
                "Encryption Standards: All network data transmission is secured using TLS 1.3 / HTTPS. All stored records, access tokens, and generated reports are encrypted at rest using AES-256.",
                "OAuth Vault Security: Authentication tokens and integration keys for Google Drive, Slack, Jira, and other services are stored in isolated cloud Key Management and Secret vaults with restricted role-based access.",
                "Data Retention & Disposal: Ingested workspace logs and processed files are retained only for the active duration of the user account or client enterprise agreement. Upon account termination, all associated authentication tokens and cached documents are permanently purged within 30 days."
              ]
            },
            {
              id: 5,
              title: "Managing Permissions & Revoking Access",
              list: [
                "Disconnecting via OriginBI: You can disconnect any integrated service at any time through the Integrations tab in your OriginBI portal dashboard.",
                (
                  <>
                    <strong className="text-gray-900">Revoking Google Permissions: </strong>
                    You can revoke OriginBI's access to your Google account at any time through your <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Account Permissions Settings</a>. Revoking access immediately terminates our authentication tokens and halts all future log retrieval.
                  </>
                ),
                "Data Deletion Requests: Users can request the permanent deletion of their account profile and generated reports by emailing privacy@originbi.com or info@originbi.com."
              ]
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
                    // Check if item is a React element
                    if (React.isValidElement(item)) {
                      return <li key={i}>{item}</li>;
                    }
                    // Handle string items with splitting for bold prefixes
                    if (typeof item === 'string') {
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
                    }
                    return null;
                  })}
                </ul>
              )}
            </section>
          ))}

          <section>
            <h3 className="text-2xl font-bold mb-6 flex items-center text-primary">
              <span className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center mr-4 text-lg shrink-0">6</span>
              Contact Information
            </h3>
            <div className="bg-blue-50 rounded-xl p-8 text-gray-700 space-y-3 border border-blue-100">
              <p><strong>Data Protection Officer (DPO)</strong></p>
              <p>OriginBI MindWorks Pvt Ltd</p>
              <p>Guindy, Chennai, Tamil Nadu, India</p>
              <p><strong>Email:</strong> <a href="mailto:info@originbi.com" className="text-primary hover:underline">info@originbi.com</a> | <a href="mailto:privacy@originbi.com" className="text-primary hover:underline">privacy@originbi.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+919445997283" className="text-primary hover:underline">+91-9445997283</a></p>
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
}
