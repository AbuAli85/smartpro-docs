import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-slate-300">Last updated: November 2025</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2>Introduction</h2>
              <p>
                TheSmartPro.io ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>

              <h2>1. Information We Collect</h2>
              <h3>1.1 Information You Provide</h3>
              <p>
                We collect information you voluntarily provide, including:
              </p>
              <ul>
                <li>Account registration information (name, email, phone number)</li>
                <li>Profile information (professional background, skills, experience)</li>
                <li>Payment and billing information</li>
                <li>Communication preferences</li>
                <li>Support requests and feedback</li>
              </ul>

              <h3>1.2 Automatically Collected Information</h3>
              <p>
                When you use our website, we automatically collect:
              </p>
              <ul>
                <li>Device information (browser type, operating system)</li>
                <li>IP address and location data</li>
                <li>Usage data and analytics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Analyze usage patterns and improve user experience</li>
                <li>Detect and prevent fraud and security issues</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>3. Data Sharing and Disclosure</h2>
              <p>
                We may share your information with:
              </p>
              <ul>
                <li>Service providers who assist us in operating our website</li>
                <li>Payment processors for transaction processing</li>
                <li>Law enforcement when required by law</li>
                <li>Other parties with your explicit consent</li>
              </ul>

              <h2>4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
              </p>

              <h2>5. Your Privacy Rights</h2>
              <p>
                Depending on your location, you may have the right to:
              </p>
              <ul>
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability</li>
              </ul>

              <h2>6. Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to enhance your experience. You can control cookie settings through your browser preferences.
              </p>

              <h2>7. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of external sites. We encourage you to review their privacy policies.
              </p>

              <h2>8. Children's Privacy</h2>
              <p>
                Our services are not intended for children under 13. We do not knowingly collect information from children under 13. If we become aware of such collection, we will take steps to delete the information promptly.
              </p>

              <h2>9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Last updated" date at the top of this policy.
              </p>

              <h2>10. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <ul>
                <li>Email: privacy@thesmartpro.io</li>
                <li>Address: 123 Business Street, New York, NY 10001</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
