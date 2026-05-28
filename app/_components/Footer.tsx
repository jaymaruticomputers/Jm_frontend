/* eslint-disable @next/next/no-html-link-for-pages */
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div>
            <a className="brand-pill" href="/">
              <div className="brand-mark">
                <Image src="/images/jm.jpeg" alt="JM Computers logo" width={40} height={40} />
              </div>
              <span>JM COMPUTERS</span>
            </a>
            <p>Pune&apos;s premium gaming &amp; computer store.</p>
            <p style={{ fontSize: 13 }}>
              Custom RTX gaming PCs, laptop repair, upgrades, AMC, CCTV &amp; networking — 18+ years on Tilak Road.
            </p>
            <div className="sub-row">
              <input type="email" placeholder="info@jmcomputers.in" />
              <button>Subscribe</button>
            </div>
          </div>
          <div>
            <h4>Services</h4>
            <a href="/builds">Custom RTX builds</a>
            <a href="/packages">Laptop repair</a>
            <a href="/packages">SSD &amp; RAM upgrades</a>
            <a href="/process">Repair process</a>
            <a href="/packages">CCTV &amp; networking</a>
            <a href="/packages">Annual maintenance</a>
          </div>
          <div>
            <h4>Visit us</h4>
            <a href="https://maps.google.com/?q=JM+Computers+Eiffel+Square+Tilak+Rd+Perugate+Sadashiv+Peth+Pune+411030" target="_blank" rel="noopener">Shop no 10, Eiffel Square</a>
            <a href="https://maps.google.com/?q=JM+Computers+Eiffel+Square+Tilak+Rd+Perugate+Sadashiv+Peth+Pune+411030" target="_blank" rel="noopener">Tilak Rd, Perugate</a>
            <a href="https://maps.google.com/?q=JM+Computers+Eiffel+Square+Tilak+Rd+Perugate+Sadashiv+Peth+Pune+411030" target="_blank" rel="noopener">Sadashiv Peth, Pune 411030</a>
            <a href="/contact">Mon – Sun · 10 AM – 8 PM</a>
          </div>
          <div>
            <h4>Contact</h4>
            <a href="tel:+918308310019"><i className="fa-solid fa-phone"></i> +91 83083 10019</a>
            <a href="https://wa.me/918308310019"><i className="fa-brands fa-whatsapp"></i> WhatsApp us</a>
            <a href="mailto:info@jmcomputers.in"><i className="fa-regular fa-envelope"></i> info@jmcomputers.in</a>
            <a href="https://www.instagram.com/jm_computers2022" target="_blank" rel="noopener"><i className="fa-brands fa-instagram"></i> @jm_computers2022</a>
            <a href="/faq">FAQs</a>
          </div>
        </div>
        <div className="foot-bot">
          <span>© <span id="yr">{new Date().getFullYear()}</span> JM COMPUTERS. All rights reserved. Shop no 10, Eiffel Square, Tilak Rd, Sadashiv Peth, Pune 411030.</span>
          <div className="foot-soc">
            <a href="https://www.instagram.com/jm_computers2022" target="_blank" rel="noopener" title="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://wa.me/918308310019" target="_blank" rel="noopener" title="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
            <a href="mailto:info@jmcomputers.in" title="Email"><i className="fa-regular fa-envelope"></i></a>
            <a href="tel:+918308310019" title="Call"><i className="fa-solid fa-phone"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
