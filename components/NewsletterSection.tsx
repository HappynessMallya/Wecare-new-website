'use client';

export function NewsletterSection() {
  const handleSubscribe = () => {
    const input = document.getElementById('nlemail') as HTMLInputElement | null;
    const v = input?.value?.trim() ?? '';
    if (!v || !v.includes('@')) {
      alert('Please enter a valid email.');
      return;
    }
    alert('Thank you for subscribing to WeCare Foundation updates!');
    if (input) input.value = '';
  };

  return (
    <section id="nl">
      <div className="container">
        <div className="nli">
          <p className="ey wh ct">Stay Connected</p>
          <h2>Stay Updated With Our Work</h2>
          <p>
            Receive program updates, impact stories, and ECD insights from WeCare Foundation in
            Tanzania — straight to your inbox.
          </p>
          <div className="nlf">
            <input type="email" placeholder="Your email address" id="nlemail" />
            <button type="button" onClick={handleSubscribe}>Subscribe →</button>
          </div>
          <p className="note">No spam. Unsubscribe anytime. We respect your privacy.</p>
        </div>
      </div>
    </section>
  );
}
