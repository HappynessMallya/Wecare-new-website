'use client';

export function HomeContact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="cg">
          <div className="cl rv">
            <p className="ey">Get In Touch</p>
            <h2>
              Let&apos;s Start a <span>Conversation</span>
            </h2>
            <p>
              Whether you&apos;re a potential funder, partner, researcher, community member, or
              journalist — Elizabeth and the WeCare team would love to hear from you.
            </p>
            <div className="cdet">
              <div className="crow">
                <div className="cico ci-r">📍</div>
                <div className="crt">
                  <strong>Office Location</strong>
                  <span>Mbeya, Tanzania</span>
                </div>
              </div>
              <div className="crow">
                <div className="cico ci-b">📧</div>
                <div className="crt">
                  <strong>Email — CEO Elizabeth Maginga</strong>
                  <a href="mailto:Wecarefoundation025@gmail.com">Wecarefoundation025@gmail.com</a>
                </div>
              </div>
              <div className="crow">
                <div className="cico ci-a">🌍</div>
                <div className="crt">
                  <strong>Regions Active</strong>
                  <span>Mbeya Region &amp; Mara Region, Tanzania</span>
                </div>
              </div>
              <div className="crow">
                <div className="cico ci-o">📸</div>
                <div className="crt">
                  <strong>Instagram</strong>
                  <span>@wecare foundation</span>
                </div>
              </div>
            </div>
            <div className="socs">
              <a className="socb" href="#" title="Instagram">
                📸
              </a>
              <a className="socb" href="#" title="Facebook">
                📘
              </a>
              <a className="socb" href="#" title="Twitter/X">
                🐦
              </a>
              <a className="socb" href="#" title="LinkedIn">
                💼
              </a>
              <a className="socb" href="#" title="YouTube">
                ▶️
              </a>
            </div>
          </div>
          <div className="cfbox rv d1">
            <h3>Send Us a Message</h3>
            <div className="frow">
              <div className="ff">
                <label>Full Name *</label>
                <input type="text" placeholder="Your full name" />
              </div>
              <div className="ff">
                <label>Organization</label>
                <input type="text" placeholder="Your organization" />
              </div>
            </div>
            <div className="ff">
              <label>Email Address *</label>
              <input type="email" placeholder="your@email.com" />
            </div>
            <div className="ff">
              <label>Inquiry Type</label>
              <select defaultValue="">
                <option value="">Select inquiry type...</option>
                <option>Partnership Opportunity</option>
                <option>Funding / Donation</option>
                <option>Volunteering</option>
                <option>Program Information</option>
                <option>Research &amp; Collaboration</option>
                <option>Media &amp; Press</option>
                <option>General Inquiry</option>
              </select>
            </div>
            <div className="ff">
              <label>Message *</label>
              <textarea placeholder="Tell us how you'd like to connect or support WeCare Foundation in Tanzania..." />
            </div>
            <button
              type="button"
              className="fsub"
              onClick={() => alert("Thank you for reaching out to WeCare Foundation. Elizabeth's team will be in touch within 48 hours.")}
            >
              Send Message →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

