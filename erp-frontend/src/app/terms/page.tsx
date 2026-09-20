'use client';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Terms of Service</h1>
      <p className="text-muted">Last Updated: October 7, 2025</p>
      
      <p>
        Welcome to <strong>Manufacturing ERP</strong> (the "Service"), a service provided by [Your Company Name] ("we," "us," or "our"). By accessing or using our application, you ("you," "user") agree to comply with and be bound by the following terms and conditions of use (the "Terms"). Please review them carefully.
      </p>

      <h4>1. Acceptance of Terms</h4>
      <p>
        By creating an account, accessing, or using our platform, you acknowledge that you have read, understood, and agree to be legally bound by these Terms and our <Link href="/privacy">Privacy Policy</Link>, which is incorporated herein by reference. If you do not agree to these terms, please do not use the Service.
      </p>

      <h4>2. User Accounts and Responsibilities</h4>
      <p>
        <strong>a. Account Creation:</strong> To use the Service, you must register for an account. You agree to provide information that is accurate, complete, and current at all times. Inaccurate information may result in the immediate termination of your account.
      </p>
      <p>
        <strong>b. Account Security:</strong> You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree to notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
      </p>
      <p>
        <strong>c. Authorized Users:</strong> You are responsible for all activity conducted by users who are granted access to your account ("Authorized Users").
      </p>

      <h4>3. License and Use of the Service</h4>
      <p>
        <strong>a. Grant of License:</strong> We grant you a limited, non-exclusive, non-transferable, and revocable license to use the Service strictly in accordance with these Terms for your internal business operations.
      </p>
      
      {/* FIX: Changed the wrapping <p> to a <div> to allow for valid <ul> nesting */}
      <div>
        <p><strong>b. Restrictions:</strong> You agree not to, and not to permit others to:</p>
        <ul>
          <li>Reverse engineer, decompile, disassemble, or otherwise attempt to discover the source code of the Service.</li>
          <li>Modify, translate, or create derivative works based on the Service.</li>
          <li>Use the Service for any illegal or unauthorized purpose, or engage in any activity that violates the rights of others.</li>
          <li>Attempt to gain unauthorized access to our systems or networks.</li>
          <li>Transmit any viruses, worms, or any other malicious code.</li>
        </ul>
      </div>

      <h4>4. Data & Privacy</h4>
      <p>
        We are committed to protecting your privacy and your data. Our collection and use of personal and business information in connection with the Service is described in our <Link href="/privacy">Privacy Policy</Link>. You retain all ownership rights to the data you submit to the Service ("User Data").
      </p>
      
      <h4>5. Fees and Payment</h4>
      <p>
        Certain features of the Service may be provided for a fee. You agree to pay all applicable fees as described on our website in connection with such services selected by you. We reserve the right to change our prices and will notify you 30 days in advance of any fee changes. All fees are non-refundable unless otherwise stated.
      </p>
      
      <h4>6. Intellectual Property</h4>
      <p>
        The Service and its original content (excluding User Data), features, and functionality are and will remain the exclusive property of [Your Company Name] and its licensors. The Service is protected by copyright, trademark, and other laws of both [Your Country] and foreign countries.
      </p>

      <h4>7. Termination</h4>
      <p>
        We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease. You will have a period of 30 days after termination to export your User Data.
      </p>
      
      <h4>8. Disclaimer of Warranties</h4>
      <p>
        The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We expressly disclaim all warranties of any kind, whether express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
      </p>
      
      <h4>9. Limitation of Liability</h4>
      <p>
        In no event shall [Your Company Name], nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, or other intangible losses, resulting from your access to or use of the Service.
      </p>

      <h4>10. Modifications to Terms</h4>
      <p>
        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect by posting the new terms on this page or by sending you an email. Your continued use of the Service after such modifications constitutes your acceptance of the new Terms.
      </p>
      
      <h4>11. Governing Law</h4>
      <p>
        These Terms shall be governed and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law provisions.
      </p>

      <hr />
      <p className="text-muted">
        For any questions about these Terms, please contact us at: support@manufacturingerp.com
      </p>
    </div>
  );
}