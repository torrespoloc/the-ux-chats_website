class UXFooter extends HTMLElement {
  connectedCallback() {
    const logo = this.getAttribute('logo-src') || 'img/logo.png';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        footer {
          background: var(--ink, #1C1430);
          color: var(--cream, #FBF3DD);
          border-top: 3px solid var(--purple, #6D28D9);
        }
        .wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 30px 20px;
          font-family: "Hanken Grotesk", sans-serif;
          font-weight: 600;
          font-size: 14px;
          opacity: .8;
        }
        .foot-brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
        }
        .foot-brand img {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          border: 2px solid var(--cream, #FBF3DD);
          display: block;
        }
      </style>
      <footer>
        <div class="wrap">
          <span class="foot-brand"><img src="${logo}" alt="UX Chats"> UX Chats &copy; 2026 &mdash; take off your tie and be yourself.</span>
          <span>@uxchats</span>
        </div>
      </footer>
    `;
  }
}
customElements.define('ux-footer', UXFooter);
