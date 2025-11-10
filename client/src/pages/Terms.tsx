import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-slate-300">Last updated: November 2025</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using TheSmartPro.io website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2>2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on TheSmartPro.io for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul>
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on the site</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>

              <h2>3. Disclaimer</h2>
              <p>
                The materials on TheSmartPro.io are provided on an "as is" basis. TheSmartPro.io makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>

              <h2>4. Limitations</h2>
              <p>
                In no event shall TheSmartPro.io or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on TheSmartPro.io, even if TheSmartPro.io or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>

              <h2>5. Accuracy of Materials</h2>
              <p>
                The materials appearing on TheSmartPro.io could include technical, typographical, or photographic errors. TheSmartPro.io does not warrant that any of the materials on its website are accurate, complete, or current. TheSmartPro.io may make changes to the materials contained on its website at any time without notice.
              </p>

              <h2>6. Links</h2>
              <p>
                TheSmartPro.io has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by TheSmartPro.io of the site. Use of any such linked website is at the user's own risk.
              </p>

              <h2>7. Modifications</h2>
              <p>
                TheSmartPro.io may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>

              <h2>8. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>

              <h2>9. User Accounts</h2>
              <p>
                If you create an account on our website, you are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
              </p>

              <h2>10. Prohibited Conduct</h2>
              <p>
                You agree not to:
              </p>
              <ul>
                <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
                <li>Post or transmit obscene, offensive, or illegal content</li>
                <li>Harass, abuse, or threaten other users</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of the website</li>
              </ul>

              <h2>11. Intellectual Property Rights</h2>
              <p>
                All content on TheSmartPro.io, including text, graphics, logos, and images, is the property of TheSmartPro.io or its content suppliers and is protected by international copyright laws.
              </p>

              <h2>12. Limitation of Liability</h2>
              <p>
                In no case shall TheSmartPro.io, its directors, officers, or employees be liable to you or any third party for any indirect, incidental, special, consequential, or punitive damages, including lost profits, arising from your use of or inability to use the website or services.
              </p>

              <h2>13. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <ul>
                <li>Email: legal@thesmartpro.io</li>
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
