/* eslint-disable @next/next/no-html-link-for-pages */
export default function MobileMenu() {
  return (
    <nav className="mobile-menu" id="mobileMenu" aria-hidden="true">
      <a href="/">Home</a>
      <details className="mm-group">
        <summary>Gaming</summary>
        <div className="mm-sub">
          <a href="/gaming-mouse">Gaming Mouse</a>
          <a href="/gaming-keyboard">Gaming Keyboard</a>
          <a href="/gaming-headphones">Gaming Headphones</a>
          <a href="/gaming-mousepad">Gaming Mousepad</a>
          <a href="/gaming-pc">Gaming PC</a>
          <a href="/gaming-chair">Gaming Chair</a>
          <a href="/controllers">Controllers / Gamepad</a>
        </div>
      </details>
      <details className="mm-group">
        <summary>Streaming</summary>
        <div className="mm-sub">
          <a href="/webcam">Webcam</a>
          <a href="/microphones">Microphones</a>
          <a href="/elgato">Elgato</a>
          <a href="/streaming-pc">Gaming &amp; Streaming PC</a>
        </div>
      </details>
      <details className="mm-group">
        <summary>Components</summary>
        <div className="mm-sub">
          <a href="/processor">Processor</a>
          <a href="/motherboard">Motherboard</a>
          <a href="/nvidia-graphics-card">NVIDIA Graphics Card</a>
          <a href="/amd-graphics-card">AMD Graphics Card</a>
          <a href="/ram">RAM</a>
          <a href="/storage">Computer Storage</a>
          <a href="/cabinet">Cabinet</a>
          <a href="/cpu-cooler">CPU Cooler</a>
          <a href="/power-supply">Power Supply</a>
        </div>
      </details>
      <details className="mm-group">
        <summary>Networking</summary>
        <div className="mm-sub">
          <a href="/wifi-adapter">WiFi Adapter</a>
          <a href="/network-switch">Network Switch</a>
          <a href="/router">Router</a>
          <a href="/lan-card">LAN Card</a>
          <a href="/docking-station">Docking Station</a>
        </div>
      </details>
      <details className="mm-group">
        <summary>PC Builds</summary>
        <div className="mm-sub">
          <a href="/streaming-pc">Gaming &amp; Streaming PC</a>
          <a href="/build-streaming-simulator">Streaming &amp; Simulator PC</a>
          <a href="/build-music-production">Music Production PCs</a>
          <a href="/build-video-editing">Video Editing PC</a>
          <a href="/build-layout-3d">Layout &amp; 3D Generalist PC</a>
          <a href="/build-game-dev">Game Development PC</a>
          <a href="/build-architectural">Architectural PC</a>
          <a href="/build-3d-modelling">3D Modelling PC</a>
          <a href="/build-vfx">VFX Animation PC</a>
          <a href="/build-compositing">Compositing PC</a>
          <a href="/build-graphic-design">Graphic Designing PCs</a>
          <a href="/build-corporate">Corporate Use Case</a>
        </div>
      </details>
      <details className="mm-group">
        <summary>Monitors</summary>
        <div className="mm-sub">
          <a href="/monitors-by-size">Monitors By Size</a>
          <a href="/monitors-by-panel">Monitors by Panel</a>
          <a href="/monitors-by-refresh-rate">Monitors by Refresh Rate</a>
          <a href="/monitors-by-resolution">Monitors by Resolution</a>
          <a href="/monitors-by-brand">Monitors by Brand</a>
        </div>
      </details>
      <a href="/contact">Custom PC Quote</a>
      <a href="/gallery">Gallery</a>
    </nav>
  );
}
