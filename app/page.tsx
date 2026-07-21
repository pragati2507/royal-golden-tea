import Image from "next/image";
import ExitOffer from "./ExitOffer";

const whatsappLink =
  "https://wa.me/?text=Hello%2C%20I%27d%20like%20to%20order%20Royal%20Golden%20Mix%20Tea.";

const bundles = [
  { name: "Single Pack", packs: "1 × 1 kg pack", serves: "A simple first order", badge: "Try it", price: "₹299", compareAt: "₹399" },
  { name: "Family Pack", packs: "3 × 1 kg packs", serves: "Save ₹298 today", badge: "Most popular", price: "₹899", compareAt: "₹1,197" },
  { name: "Value Case", packs: "6 × 1 kg packs", serves: "Save ₹595 today", badge: "Best value", price: "₹1,799", compareAt: "₹2,394" },
];

const reasons = [
  ["01", "Rich taste in every cup", "Get the same full flavour each time, without measuring multiple ingredients."],
  ["02", "Tea ready in minutes", "Make a satisfying cup quickly for your family, guests, or a busy morning."],
  ["03", "More cups, less effort", "Keep one easy mix ready at home and serve good tea whenever you want."],
];

const faqs = [
  ["What is Royal Golden Mix?", "It is a flavoured tea concentrate that helps you make rich, aromatic tea quickly and consistently."],
  ["How do I prepare it?", "Add the mix to hot water or milk according to your preferred strength, stir well, and serve hot."],
  ["Which bundle should I buy?", "Start with the Single Pack, choose the Family Pack for regular use, or get the Value Case for the biggest saving."],
  ["How do I order?", "Tap Buy Now, send the pre-filled WhatsApp message, and confirm your address. We will share delivery and payment details before confirming."],
];

function OrderLink({ label = "Order on WhatsApp", className = "" }: { label?: string; className?: string }) {
  return (
    <a className={`button ${className}`} href={whatsappLink} target="_blank" rel="noreferrer">
      {label}<span aria-hidden="true">→</span>
    </a>
  );
}

export default function Home() {
  return (
    <main>
      <div className="clearance-banner"><strong>Limited Stock Clearance</strong><span>Save up to ₹595 on bundle orders</span><a href="#bundles">Shop offers →</a></div>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Royal Golden Mix home">
          <span>ROYAL</span><small>GOLDEN MIX</small>
        </a>
        <nav aria-label="Main navigation">
          <a href="#product">Our tea</a><a href="#bundles">Bundles</a><a href="#story">Why us</a><a href="#contact">Contact</a>
        </nav>
        <OrderLink label="Buy now" className="header-order" />
      </header>

      <section id="top" className="hero">
        <Image src="/images/royal-golden-hero.jpeg" alt="Royal Golden Mix tea being prepared at home" fill priority sizes="100vw" className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow light">Rich tea, ready in minutes</p>
          <h1>Better tea.<br /><em>Less effort.</em></h1>
          <p className="hero-text">Make a rich, aromatic cup quickly with Royal Golden Mix. Order today while clearance stock lasts.</p>
          <div className="hero-actions"><OrderLink label="Buy now — from ₹299" /><a className="text-link light-link" href="#product">See why it works ↓</a></div>
        </div>
        <div className="hero-note"><span>Made in India</span><span>Home delivery</span><span>Secure ordering</span></div>
      </section>

      <section id="product" className="section product-section">
        <div className="product-photo reveal-card">
          <Image src="/images/royal-golden-pack.jpeg" alt="Original Royal Golden Mix tea pack with a prepared cup" fill sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <div className="product-copy">
          <p className="eyebrow">One mix. A better cup.</p>
          <h2>Full flavour.<br /><em>Ready faster.</em></h2>
          <p>Royal Golden Mix makes daily tea easier. Add it to hot water or milk, stir, and enjoy a rich cup without the usual preparation.</p>
          <div className="product-facts">
            <div><strong>Rich</strong><span>full tea flavour</span></div>
            <div><strong>Quick</strong><span>ready in minutes</span></div>
            <div><strong>Easy</strong><span>just mix and serve</span></div>
          </div>
          <a href="#bundles" className="text-link">See clearance bundles →</a>
        </div>
      </section>

      <section id="bundles" className="section bundles-section">
        <div className="section-heading"><div><p className="eyebrow">Clearance prices</p><h2>Buy more.<br /><em>Save more.</em></h2></div><p>Choose your pack size now. These offers are available only while current stock lasts.</p></div>
        <div className="bundle-grid">
          {bundles.map((bundle, index) => (
            <article className={`bundle-card ${index === 1 ? "featured" : ""}`} key={bundle.name}>
              <div className="bundle-top"><span>{bundle.badge}</span><small>0{index + 1}</small></div>
              <div className="mini-product"><Image src="/images/royal-golden-pack.jpeg" alt="Royal Golden Mix pack" fill sizes="260px" /></div>
              <h3>{bundle.name}</h3><p>{bundle.packs} · {bundle.serves}</p><div className="bundle-price"><strong>{bundle.price}</strong><del>{bundle.compareAt}</del></div>
              <OrderLink label={`Buy ${bundle.name}`} />
            </article>
          ))}
        </div>
      </section>

      <section id="story" className="section reasons-section">
        <div className="reasons-intro"><p className="eyebrow light">Why choose Royal Golden Mix</p><h2>Good tea made<br /><em>simple.</em></h2><p>Enjoy satisfying flavour with fewer steps, less waiting, and an easy mix you can keep ready at home.</p></div>
        <div className="reason-list">
          {reasons.map(([number, title, description]) => <div className="reason" key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></div>)}
        </div>
      </section>

      <section className="section preparation-section">
        <div className="prep-copy"><p className="eyebrow">Easy preparation</p><h2>Make it in<br /><em>three steps.</em></h2>
          <ol><li><span>1</span><div><strong>Heat</strong><p>Heat water or milk to your preferred temperature.</p></div></li><li><span>2</span><div><strong>Mix</strong><p>Add Royal Golden Mix to taste and stir well.</p></div></li><li><span>3</span><div><strong>Serve</strong><p>Pour into your cup and enjoy it hot.</p></div></li></ol>
        </div>
        <div className="prep-photo"><Image src="/images/royal-golden-preparation.jpeg" alt="Preparing a cup with Royal Golden Mix" fill sizes="(max-width: 768px) 100vw, 50vw" /></div>
      </section>

      <section className="section faq-section">
        <div><p className="eyebrow">Before you order</p><h2>Quick<br /><em>answers.</em></h2></div>
        <div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <section id="contact" className="contact-section">
        <Image src="/images/royal-golden-lifestyle.jpeg" alt="Friends enjoying tea together with Royal Golden Mix" fill sizes="100vw" />
        <div className="contact-shade" />
        <div className="contact-card"><p className="eyebrow light">Order before stock runs out</p><h2>Choose your bundle.<br /><em>We’ll handle the rest.</em></h2><p>Send us a WhatsApp message to confirm stock, home delivery, and your preferred payment method.</p><OrderLink label="Buy now on WhatsApp" /></div>
      </section>

      <footer><a href="#top" className="brand footer-brand"><span>ROYAL</span><small>GOLDEN MIX</small></a><p>Rich tea. Ready faster.</p><div className="footer-links"><a href="#product">Our tea</a><a href="#bundles">Bundles</a><a href="#story">Why us</a><a href="#contact">Contact</a></div><div className="footer-info"><strong>Shipping</strong><span>Home delivery available. Delivery time and charges are confirmed before your order is placed.</span><strong>Payment</strong><span>Secure ordering via WhatsApp. UPI and cash on delivery options are confirmed based on your location.</span></div><small>© 2026 Royal Golden Mix. All rights reserved.</small></footer>

      <a className="whatsapp-float" href={whatsappLink} target="_blank" rel="noreferrer" aria-label="Order Royal Golden Mix on WhatsApp"><span aria-hidden="true">●</span> WhatsApp</a>
      <ExitOffer />
      <div className="mobile-order"><a href="#bundles">Buy now — from ₹299 <span>→</span></a></div>
    </main>
  );
}
