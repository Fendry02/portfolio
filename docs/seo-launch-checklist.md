# SEO launch checklist

Complete these steps after deploying the SEO changes.

## Google Search Console

1. Verify the domain property `bbenoit.fr` with DNS, or verify the
   `https://www.bbenoit.fr` URL-prefix property.
2. For HTML verification, copy Google's token into the Vercel environment
   variable `GOOGLE_SITE_VERIFICATION` and redeploy.
3. Submit `https://www.bbenoit.fr/sitemap.xml`.
4. Inspect and request indexing for:
   - `https://www.bbenoit.fr/`
   - `https://www.bbenoit.fr/services/creation-site-web-lyon`
   - `https://www.bbenoit.fr/services/automatisation-n8n-lyon`
   - `https://www.bbenoit.fr/jobs`
5. After Google recrawls them, confirm that `/mentions-legales` and
   `/confidentialite` are excluded by `noindex`.
6. Review the Page indexing report weekly and the Performance report for
   branded, freelance, developer and Lyon queries.

## Brand and local authority

- Use the same public identity everywhere:
  `Benoit Bruynbroeck — développeur web freelance à Lyon`.
- Complete the GitHub profile with the full name, Lyon, a short professional
  bio and `https://www.bbenoit.fr`.
- Align the LinkedIn and Malt headlines and add the canonical website wherever
  the platform allows it.
- With each client's approval, add a genuine attribution link from the delivered
  site to the relevant portfolio or service page.
- Create or complete a Google Business Profile only if the activity meets
  Google's eligibility rules, and keep its name, category, service area and
  website consistent with the site.
- Ask real clients for reviews; do not exchange, buy or manufacture reviews or
  links.

## Legal information

The verified legal identity was published on 2026-07-30:

- `Benoit Bruynbroeck EI`, entrepreneur individuel under the
  micro-entrepreneur regime;
- business address and phone number;
- SIREN `923 618 433` and SIRET `923 618 433 00018`;
- `TVA non applicable, art. 293 B du CGI`.

Update these values immediately if the business address, tax regime or
registration changes. The page remains out of the sitemap and has a
`noindex, follow` directive because it is a utility page, not an acquisition
landing page.
