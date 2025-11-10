import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Cookies() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-xl text-slate-300">Last updated: November 2025</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2>1. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit our website. They help us recognize you, remember your preferences, and understand how you use our site. Cookies are widely used on websites to enhance user experience and provide website functionality.
              </p>

              <h2>2. Types of Cookies We Use</h2>
              <h3>2.1 Essential Cookies</h3>
              <p>
                These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt-out of these cookies.
              </p>

              <h3>2.2 Performance Cookies</h3>
              <p>
                These cookies collect information about how you use our website, such as which pages you visit and how long you spend on them. This information helps us improve our website's performance and user experience.
              </p>

              <h3>2.3 Functional Cookies</h3>
              <p>
                These cookies remember your preferences and choices to provide a more personalized experience. They may remember your login information, language preferences, and other settings.
              </p>

              <h3>2.4 Marketing Cookies</h3>
              <p>
                These cookies track your online activity to display relevant advertisements. They may be set by us or by third-party advertising partners.
              </p>

              <h2>3. How We Use Cookies</h2>
              <p>
                We use cookies to:
              </p>
              <ul>
                <li>Authenticate users and prevent fraudulent use of user accounts</li>
                <li>Remember your preferences and settings</li>
                <li>Understand how you use our website</li>
                <li>Improve website performance and functionality</li>
                <li>Deliver personalized content and advertisements</li>
                <li>Analyze traffic and usage patterns</li>
              </ul>

              <h2>4. Third-Party Cookies</h2>
              <p>
                We may allow third-party service providers to place cookies on your device for analytics, advertising, and other purposes. These third parties may include:
              </p>
              <ul>
                <li>Analytics providers (Google Analytics)</li>
                <li>Advertising networks</li>
                <li>Social media platforms</li>
                <li>Payment processors</li>
              </ul>

              <h2>5. Cookie Duration</h2>
              <p>
                Some cookies are session-based and expire when you close your browser. Others are persistent and remain on your device for a specified period or until you delete them.
              </p>

              <h2>6. Managing Cookies</h2>
              <p>
                You have the right to control cookies on your device. You can:
              </p>
              <ul>
                <li>Accept or reject cookies through our cookie consent banner</li>
                <li>Manage cookie settings in your browser preferences</li>
                <li>Delete cookies from your device</li>
                <li>Opt-out of specific types of cookies</li>
              </ul>

              <h2>7. Browser Controls</h2>
              <p>
                Most web browsers allow you to control cookies through their settings. You can typically find these settings in your browser's preferences or privacy settings. Please note that disabling cookies may affect your ability to use certain features of our website.
              </p>

              <h2>8. Do Not Track</h2>
              <p>
                Some browsers include a "Do Not Track" feature. Our website does not currently respond to Do Not Track signals, but we provide you with choices regarding the collection and use of information as described in this policy.
              </p>

              <h2>9. Changes to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of significant changes by updating the "Last updated" date at the top of this policy.
              </p>

              <h2>10. Contact Us</h2>
              <p>
                If you have questions about our use of cookies or this Cookie Policy, please contact us at:
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
