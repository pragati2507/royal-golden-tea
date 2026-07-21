import Image from "next/image";
import ExitOffer from "./ExitOffer";
import OrderForm from "./components/OrderForm";
import OrderTrigger from "./components/OrderTrigger";
import { BUNDLES } from "@/lib/bundles";

const reasons = [
  ["01", "Rich taste in every cup", "Get the same full flavour each time, without measuring multiple ingredients."],
  ["02", "Tea ready in minutes", "Make a satisfying cup quickly for your family, guests, or a busy morning."],
  ["03", "More cups, less effort", "Keep one easy mix ready at home and serve good tea whenever you want."],
];

const faqs = [
  ["What is Royal Golden Mix?", "It is a flavoured tea concentrate that helps you make rich, aromatic tea quickly and consistently."],
  ["How do I prepare it?", "Add the mix to hot water or milk according to your preferred strength, stir well, and serve hot."],
  ["Which product option should I buy?", "Choose from 10, 20, 50, or 100 sachets, or the 250g Pack. Prices are confirmed before your order is finalised."],
  ["How do I order?", "Tap Buy Now, complete the secure order form, and submit your request. We will share availability, delivery, and payment details before confirming."],
];

export default function Home() {
  return (
    <main>
      <div className="clearance-banner"><strong>Limited Stock Clearance</strong><span>Selected packs available while stock lasts</span><a href="#bundles">View options →</a></div>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Royal Golden Mix home">
          <span>ROYAL</span><small>GOLDEN MIX</small>
        </a>
        <nav aria-label="Main navigation">
          <a href="#product">Our tea</a><a href="#bundles">Bundles</a><a href="#story">Why us</a><a href="#contact">Contact</a>
        </nav>
        <OrderTrigger label="Buy now" className="header-order" />
      </header>

      <section id="top" className="hero">
        <Image src="/images/royal-golden-hero.jpeg" alt="Royal Golden Mix tea being prepared at home" fill priority sizes="100vw" className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow light">Rich tea, ready in minutes</p>
          <h1>Better tea.<br /><em>Less effort.</em></h1>
          <p className="hero-text">Make a rich, aromatic cup quickly with Royal Golden Mix. Choose the pack that suits your home.</p>
          <div className="hero-actions"><OrderTrigger label="Order online" /><a className="text-link light-link" href="#product">See why it works ↓</a></div>
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
        <div className="section-heading"><div><p className="eyebrow">Available products</p><h2>Choose your<br /><em>tea pack.</em></h2></div><p>Select the quantity that suits your home. Current prices are confirmed before your order is finalised.</p></div>
        <div className="bundle-grid">
          {BUNDLES.map((bundle, index) => (
            <article className={`bundle-card ${index === 2 ? "featured" : ""}`} key={bundle.id}>
              <div className="bundle-top"><span>{bundle.badge}</span><small>0{index + 1}</small></div>
              <div className="mini-product"><Image src="/images/royal-golden-pack.jpeg" alt="Royal Golden Mix pack" fill sizes="260px" /></div>
              <h3>{bundle.label}</h3><p>Royal Golden Mix Tea</p><div className="bundle-price"><strong>Price on confirmation</strong></div>
              <OrderTrigger label="Select this pack" bundle={bundle.label} />
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
        <div className="contact-card"><p className="eyebrow light">Order before stock runs out</p><h2>Choose your product.<br /><em>We’ll handle the rest.</em></h2><p>Submit your delivery details securely. No online payment is collected.</p><OrderTrigger label="Start my order" /></div>
      </section>

      <OrderForm />

      <footer><a href="#top" className="brand footer-brand"><span>ROYAL</span><small>GOLDEN MIX</small></a><p>Rich tea. Ready faster.</p><div className="footer-links"><a href="#product">Our tea</a><a href="#bundles">Bundles</a><a href="#story">Why us</a><a href="#contact">Contact</a></div><div className="footer-info"><strong>Shipping</strong><span>Home delivery available. Delivery time and charges are confirmed before your order is placed.</span><strong>Payment</strong><span>Secure ordering via WhatsApp. UPI and cash on delivery options are confirmed based on your location.</span></div><small>© 2026 Royal Golden Mix. All rights reserved.</small></footer>

      <ExitOffer />
      <div className="mobile-order"><a href="#order">Buy now <span>→</span></a></div>
    </main>
  );
}
