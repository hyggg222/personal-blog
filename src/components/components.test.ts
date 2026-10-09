import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import FormattedDate from './FormattedDate.astro';
import HeaderLink from './HeaderLink.astro';
import Footer from './Footer.astro';

describe('astro components', () => {
  describe('FormattedDate', () => {
    it('renders a <time> element with ISO datetime and a readable date', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(FormattedDate, {
        props: { date: new Date('2026-01-15T12:00:00Z') },
      });

      expect(html).toContain('<time datetime="2026-01-15T12:00:00.000Z">');
      expect(html).toContain('Jan 15, 2026');
    });
  });

  describe('HeaderLink', () => {
    it('renders an anchor with the given href and slot content', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(HeaderLink, {
        props: { href: '/about' },
        slots: { default: 'About' },
        request: new Request('http://localhost/blog'),
      });

      expect(html).toContain('href="/about"');
      expect(html).toContain('About');
      expect(html).not.toContain('active');
    });

    it('marks the link as active when it matches the current path', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(HeaderLink, {
        props: { href: '/blog' },
        slots: { default: 'Blog' },
        request: new Request('http://localhost/blog'),
      });

      expect(html).toContain('class="active"');
    });
  });

  describe('Footer', () => {
    it('renders the current year', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(Footer);

      expect(html).toContain(String(new Date().getFullYear()));
    });
  });
});
