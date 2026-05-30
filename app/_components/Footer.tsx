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
              <input type="email" placeholder="jaymaruticomputers@gmail.com" />
              <button>Subscribe</button>
            </div>
          </div>
          <div>
            <h4>Services</h4>
            <span className="foot-static">Custom RTX builds</span>
            <span className="foot-static">Laptop repair</span>
            <span className="foot-static">SSD &amp; RAM upgrades</span>
            <span className="foot-static">Repair process</span>
            <span className="foot-static">CCTV &amp; networking</span>
            <span className="foot-static">Annual maintenance</span>
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
            <a href="https://wa.me/919166660201"><i className="fa-brands fa-whatsapp"></i> WhatsApp us</a>
            <a href="mailto:jaymaruticomputers@gmail.com"><i className="fa-regular fa-envelope"></i> jaymaruticomputers@gmail.com</a>
            <a href="https://www.instagram.com/jm_computers2022" target="_blank" rel="noopener"><i className="fa-brands fa-instagram"></i> @jm_computers2022</a>
            <a href="/faq">FAQs</a>
          </div>
        </div>
        <div className="foot-bot">
          <span>© <span id="yr">{new Date().getFullYear()}</span> JM COMPUTERS. All rights reserved. Shop no 10, Eiffel Square, Tilak Rd, Sadashiv Peth, Pune 411030.</span>
          <div className="foot-soc">
            <a href="https://www.instagram.com/jm_computers2022" target="_blank" rel="noopener" title="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://wa.me/919166660201" target="_blank" rel="noopener" title="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
            <a href="mailto:jaymaruticomputers@gmail.com" title="Email"><i className="fa-regular fa-envelope"></i></a>
            <a href="tel:+918308310019" title="Call"><i className="fa-solid fa-phone"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
