'use client';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Privacy Policy</h1>
      <p className="text-muted">Last Updated: October 7, 2025</p>

      <p>
        Your privacy is critically important to us. This Privacy Policy outlines how <strong>Manufacturing ERP</strong> ("we," "us," or "our") collects, uses, discloses, and safeguards your information when you use our application (the "Service"). By using the Service, you agree to the collection and use of information in accordance with this policy.
      </p>

      <h4>1. Information We Collect</h4>
      <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
      
      {/* FIX: Changed the wrapping <p> to a <div> */}
      <div>
        <p><strong>a. Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to:</p>
        <ul>
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Company name and job title</li>
          <li>Phone number</li>
          <li>Billing and address information</li>
        </ul>
      </div>

      <p>
        <strong>b. Business Data:</strong> As an ERP service, you will upload and process data related to your business operations ("Business Data"). This includes information about inventory, production orders, sales, customers, suppliers, and financial data. We treat this data as strictly confidential. You retain all rights and ownership of your Business Data.
      </p>
      <p>
        <strong>c. Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's IP address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, and other diagnostic data.
      </p>

      <h4>2. How We Use Your Information</h4>
      <p>We use the collected data for various purposes:</p>
      <ul>
        <li>To provide, maintain, and operate our Service.</li>
        <li>To manage your account and provide customer support.</li>
        <li>To process your transactions and manage billing.</li>
        <li>To notify you about changes to our Service or policies.</li>
        <li>To monitor the usage of our Service for security and fraud prevention.</li>
        <li>To improve the Service, and for internal analysis and research.</li>
        <li>To provide you with news, special offers, and general information about other goods and services, where you have opted-in to receive such information.</li>
      </ul>

      <h4>3. Data Sharing and Disclosure</h4>
      <p><strong>We do not sell your Personal Data or Business Data.</strong> We may share your information only in the following limited circumstances:</p>
      <ul>
        <li>
          <strong>With Service Providers:</strong> We may employ third-party companies (e.g., cloud hosting providers like AWS, payment processors like Stripe) to facilitate our Service. These third parties have access to your data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
        </li>
        <li>
          <strong>For Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).
        </li>
      </ul>

      <h4>4. Data Security</h4>
      <p>
        The security of your data is a top priority for us. We use industry-standard administrative, technical, and physical security measures to protect your data from unauthorized access, use, or disclosure. This includes measures like encryption of data in transit (TLS/SSL) and at rest. However, please remember that no method of transmission over the Internet or method of electronic storage is 100% secure.
      </p>
      
      <h4>5. Cookies and Tracking Technologies</h4>
      <p>
        Our app uses "cookies" to collect information and improve our Service. Cookies are primarily used to maintain your login session and remember your preferences. You have the option to either accept or refuse these cookies and can configure your browser to do so. If you choose to refuse our cookies, you may not be able to use some portions of our Service.
      </p>

      <h4>6. Data Retention</h4>
      <p>
        We will retain your Personal Data and Business Data only for as long as is necessary for the purposes set out in this Privacy Policy, primarily as long as your account is active. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.
      </p>

      <h4>7. Your Data Protection Rights</h4>
      {/* FIX: Changed the wrapping <p> to a <div> */}
      <div>
        <p>You have certain data protection rights. We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data. You have the right to:</p>
        <ul>
          <li><strong>Access, update or delete</strong> the information we have on you.</li>
          <li><strong>Request correction</strong> of any information that is inaccurate or incomplete.</li>
       <li><strong>Request data portability</strong> for the information you provide.</li>
        </ul>
        <p>You may exercise these rights by contacting our support team.</p>
      </div>
      
      <h4>8. Children's Privacy</h4>
      <p>Our Service does not address anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 18.</p>

      <h4>9. Changes to This Privacy Policy</h4>
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
      </p>

      <hr />
      <p>
        If you have any questions about this Privacy Policy, please contact us at support@manufacturingerp.com. Also, read our <Link href="/terms">Terms of Service</Link> for more information.
      </p>
    </div>
  );
}