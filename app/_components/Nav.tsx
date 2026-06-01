/* eslint-disable @next/next/no-html-link-for-pages */
import Image from "next/image";

/* Uses plain <a> instead of next/link so each navigation is a full document
   load — this lets /js/site.js re-initialise its IntersectionObservers,
   parallax handlers and count-up animations on every page. */

export default function Nav() {
  return (
    <div className="nav-wrap">
      <a className="brand-pill" href="/" aria-label="JM Computers home">
        <div className="brand-mark">
          <Image src="/images/jm.jpeg" alt="JM Computers logo" width={40} height={40} priority />
        </div>
      </a>
      <nav className="center-pill mega-nav">
        <a href="/" className="mn-link">Home</a>
        <div className="mn-item">
          <a href="/builds" className="mn-link">PC Builds <i className="fa-solid fa-chevron-down"></i></a>
          <div className="mn-panel mn-panel-2">
            <a href="/streaming-pc">Gaming &amp; Streaming PC</a>
            <a href="/build-streaming-simulator">Streaming &amp; Simulator PC</a>
            <a href="/build-music-production">Music Production PCs</a>
            <a href="/build-video-editing">Video Editing PC</a>
            <a href="/build-game-dev">Game Development PC</a>
            <a href="/build-architectural">Architectural PC</a>
            <a href="/build-3d-modelling">3D Modelling PC</a>
            <a href="/build-vfx">VFX Animation PC</a>
            <a href="/build-compositing">Compositing PC</a>
            <a href="/build-graphic-design">Graphic Designing PCs</a>
          </div>
        </div>
        <div className="mn-item">
          <a href="/products" className="mn-link">Gaming <i className="fa-solid fa-chevron-down"></i></a>
          <div className="mn-panel">
            <a href="/gaming-mouse">Gaming Mouse</a>
            <a href="/gaming-keyboard">Gaming Keyboard</a>
            <a href="/gaming-headphones">Gaming Headphones</a>
            <a href="/gaming-mousepad">Gaming Mousepad</a>
            <a href="/gaming-pc">Gaming PC</a>
            <a href="/gaming-chair">Gaming Chair</a>
            <a href="/controllers">Controllers / Gamepad</a>
          </div>
        </div>
        <div className="mn-item">
          <a href="/products" className="mn-link">Streaming <i className="fa-solid fa-chevron-down"></i></a>
          <div className="mn-panel">
            <a href="/webcam">Webcam</a>
            <a href="/microphones">Microphones</a>
            <a href="/elgato">Elgato</a>
            <a href="/streaming-pc">Gaming &amp; Streaming PC</a>
          </div>
        </div>
        <div className="mn-item">
          <a href="/products" className="mn-link">Components <i className="fa-solid fa-chevron-down"></i></a>
          <div className="mn-panel mn-panel-2">
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
        </div>
        <div className="mn-item">
          <a href="/products" className="mn-link">Networking <i className="fa-solid fa-chevron-down"></i></a>
          <div className="mn-panel">
            <a href="/wifi-adapter">WiFi Adapter</a>
            <a href="/network-switch">Network Switch</a>
            <a href="/router">Router</a>
            <a href="/lan-card">LAN Card</a>
            <a href="/docking-station">Docking Station</a>
          </div>
        </div>
        <div className="mn-item mn-right">
          <a href="/products" className="mn-link">Monitors <i className="fa-solid fa-chevron-down"></i></a>
          <div className="mn-panel">
            <a href="/monitors-by-size">Monitors By Size</a>
            <a href="/monitors-by-panel">Monitors by Panel</a>
            <a href="/monitors-by-refresh-rate">Monitors by Refresh Rate</a>
            <a href="/monitors-by-resolution">Monitors by Resolution</a>
            <a href="/monitors-by-brand">Monitors by Brand</a>
          </div>
        </div>
        <a href="/contact" className="mn-link">Custom PC Quote</a>
        <a href="/gallery" className="mn-link">Gallery</a>
      </nav>
      <div className="icon-pill">
        <a href="https://www.instagram.com/jm_computers2022" target="_blank" rel="noopener" title="Instagram"><i className="fa-brands fa-instagram"></i></a>
        <a href="/contact" title="Visit"><i className="fa-solid fa-location-dot"></i></a>
        <button className="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false">
          <span className="bar"></span>
        </button>
      </div>
    </div>
  );
}
