export default function WhatsAppFab() {
  return (
    <div className="fab-wa" id="fabWa">
      <div className="fab-pop" id="fabPop" role="dialog" aria-label="Chat on WhatsApp">
        <button className="pop-close" id="fabClose" aria-label="Close">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="ttl">
          <i className="fa-solid fa-bolt-lightning" style={{ color: "#25D366", fontSize: 11 }}></i> JM COMPUTERS · Online
        </div>
        <p className="msg">Need a quote, build advice or a repair ETA? Chat with us — usually replies in minutes.</p>
        <a className="pop-cta" href="https://wa.me/918308310019?text=Hi%20JM%20COMPUTERS%2C%20I%20have%20a%20query." target="_blank" rel="noopener">
          <i className="fa-brands fa-whatsapp"></i> Start chat
        </a>
      </div>
      <a className="fab-btn" href="https://wa.me/918308310019?text=Hi%20JM%20COMPUTERS%2C%20I%20have%20a%20query." target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <i className="fa-brands fa-whatsapp"></i>
        <span className="fab-badge">1</span>
      </a>
    </div>
  );
}
